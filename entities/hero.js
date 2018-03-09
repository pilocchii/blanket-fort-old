define([
    "actor",
    "animation",
    "terrain",
    "projectile",
    "projectile-sword",
    "soldier-shield",
    "enemy",
    "hurtbox",
    "hazards",
    "rocket",
], function (
    Actor,
    Animation,
    Terrain,
    Projectile,
    Projectile_Sword,
    Soldier_Shield,
    Enemy,
    Hurtbox,
    Hazards,
    Rocket,
){


    class Hero extends Actor {

        constructor (game, x, y, img=null, ctx=null, scale=3, spriteWidth=60, spriteHeight=60) {
            super(game, x, y, img, ctx);
            this.parentClass = "Actor";
            this.origY = this.y; //For jumping
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
            this.yVelocity = 0;

            this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
            this.boundWidth = 60;
            this.boundHeight = 110;
            this.boundX = this.centerX - (this.boundWidth / 2);
            this.boundY = this.y - this.boundHeight;
            this.lastBoundY = this.boundY; // This will help stop Hero from slipping at edges, particularly for horizontally longer blocks of terrain

            /***STATS***/
            this.movementSpeed = (8);
            this.dashSpeed = 17
            this.jumpStrength = (20);
            this.jumpsLeft = 2;
            this.maxJumps = 2;

            this.maxHealth = 10;
            this.maxEnergy = 10;
            this.energy = 10;
            this.health = 10;
            this.slashEnergyCost = 10;
            this.shootEnergyCost = 5;
            this.dashEnergyCost = 3;

            this.stunDir = 0;
            this.multiplier = 1;
            
            //Timers
            this.damageCooldownTimer = 0;
            this.damageCooldown = 16;
            this.energyCooldownTimer = 0;
            this.energyCooldown = 60 / (this.multiplier * 2);
            this.energyDelay = 20;
            this.enregyDelayTimer = 0;
            this.velocityCooldown = 2;
            this.velocityCooldownTimer = 0;
            this.jumpTimer = 0;
            this.jumpCooldown = 20;

            //Dev Tools
            this.setPosTimer = 0;
            this.godToggleTimer = 0;
            this.iPC = 0;

            this.states = {
                "energized": false,
                "invulnerable": false,
                "running": false,
                "jumping": false,
                "dashing": false,
                "dashingStart": false,
                "dashingMid": false,
                "dashingEnd": false,
                "hasDashed": false,
                "shooting": false,
                "hasShot": false,//TODO Implement to replace shotlocked
                "slashing": false,
                "hasSlashed": false,
                "cleaving": false,
                "hasCleaved": false,
                "shotlocked": false,
                "framelocked": false,
                "stunned": false,
                "dead": false,
                "respawned": false,
                "grounded": true,
                "hasGravity": true,
                "facingRight": true,
                "isGod": false,
            };
            this.animations = {
                "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, this.scale), //50x50
                "stun": new Animation(this.img, [spriteWidth, spriteHeight], 0, 13, 4, 4, false, this.scale, 9),
                "dead": new Animation(this.img, [spriteWidth, spriteHeight], 0, 18, 5, 5, true, this.scale, 13),
                "run": new Animation(this.img, [spriteWidth, spriteHeight], 1, 22, 3, 11, true, this.scale), //50x50
                //Takeoff?
                "ascend": new Animation(this.img, [spriteWidth, spriteHeight], 2, 8, 3, 4, true, this.scale, 2), //50x50
                "descend": new Animation(this.img, [spriteWidth, spriteHeight], 2, 14, 3, 4, true, this.scale, 8), //50x50
                //Land?
                "airshoot": new Animation(this.img, [spriteWidth, spriteHeight], 2, 20, 3, 6, false, this.scale, 14), //50x50
                "shoot": new Animation(this.img, [80, 60], 3, 3, 6, 3, false, this.scale), //80x60
                "gunrun": new Animation(this.img, [60, 60], 1, 22, 3, 11, true, this.scale, 11), //50x50
                "slash": new Animation(this.img, [90, 60], 4, 11, 2, 11, false, this.scale), //80x50
                "cleave": new Animation(this.img, [100, 70], 9, 13, 2, 13, false, this.scale), //80x60
                "dash": new Animation(this.img, [60, 60], 5, 7, 3, 7, false, this.scale),
                "dash_start": new Animation(this.img, [60, 60], 5, 7, 3, 1, false, this.scale),
                "dash_mid": new Animation(this.img, [60, 60], 5, 7, 3, 5, false, this.scale, 1),
                "dash_end": new Animation(this.img, [60, 60], 5, 7, 3, 1, false, this.scale, 6),
            };
        }

        update() {//TODO (maybe) find a better solution to the framelocked logic. (Too many exceptions for things like slash)
            //Dev Tool Updates
            if (this.setPosTimer > 0) {
                this.setPosTimer--;
            }
            if (this.godToggleTimer > 0) {
                this.godToggleTimer--;
            }
            /////////// all button checks go here ///////////
            // KEY DOWN
            //run right
            if (this.game.controlKeys[this.game.controls.right].active && !this.states.framelocked /*&& this.states.canRun*/) {
                if (!this.states.facingRight) { this.states.facingRight = true };
                this.states.running = true;
            }
            //run left
            else if (this.game.controlKeys[this.game.controls.left].active && !this.states.framelocked /*&& this.states.canRun*/) {
                if (this.states.facingRight) { this.states.facingRight = false };
                this.states.running = true;
            }
            //energize
            if (this.game.controlKeys[this.game.controls.energize].active) {
                this.states.energized = true;
            }
            //jump
            if (this.game.controlKeys[this.game.controls.jump].active && !this.states.jumping && !this.states.framelocked /*&& this.states.canJump*/) {
                this.states.jumping = true;
                this.states.grounded = false;
            }
            //shoot
            if (this.game.controlKeys[this.game.controls.shoot].active && !this.states.framelocked) {
                this.states.shooting = true;
            }
            //cleave
            if (this.game.controlKeys[this.game.controls.cleave].active && this.states.grounded && !this.states.framelocked) {
                this.animation.reset();
                this.game.playSound("sword_swing")
                this.setStates(false, false, false, true, this.states.facingRight, false, false, false, true, this.states.energized, false, false);
                this.states.cleaving = true;
                this.states.framelocked = true;
            }
            //slash
            if (this.game.controlKeys[this.game.controls.slash].active && this.states.grounded && (!this.states.framelocked || this.states.dashing)) {
                if (this.game.controlKeys[this.game.controls.right].active) { this.states.facingRight = true; }
                else if (this.game.controlKeys[this.game.controls.left].active) { this.states.facingRight = false; }
                this.animation.reset();
                this.game.playSound("sword_swing")
                this.setStates(false, false, false, false, this.states.facingRight, false, true, false, true, this.states.energized, false, false);
            }
            //dash
            if (this.game.controlKeys[this.game.controls.dash].active && !this.states.framelocked && this.energy >= this.dashEnergyCost && !this.states.shooting) {
                this.states.dashing = true;
                this.states.dashingStart = true;
                this.states.hasDashed = true;
                this.states.running = false;
                this.states.framelocked = true;
            }

            //KEY UP
            if (!(this.game.controlKeys[this.game.controls.right].active || this.game.controlKeys[this.game.controls.left].active)
                && this.states.running) {
                this.states.running = false;
            }
            if (!this.game.controlKeys[this.game.controls.energize].active) {
                this.states.energized = false;
            }


            ///////////// THEN do actions //////////////
            if (this.jumpTimer > 0) {
                this.jumpTimer -= 1;
            }
            // Running
            if (this.states.running) {
                if (this.states.facingRight) {
                    this.x += this.movementSpeed;
                    //this.centerX += this.movementSpeed;
                    this.boundX += this.movementSpeed;
                } else {
                    this.x -= this.movementSpeed;
                    //this.centerX -= this.movementSpeed;
                    this.boundX -= this.movementSpeed;
                }
            }
            //Jumping
            if (this.states.jumping) {
                this.states.jumping = false;

                if (this.jumpsLeft > 0 && this.jumpTimer == 0) {
                    this.jumpsLeft -= 1;
                    this.jumpTimer = this.jumpCooldown;
                    this.yVelocity = 0;
                    this.yVelocity -= this.jumpStrength;
                }
            }
            //Cleaving
            if (this.states.cleaving) {
                if (this.animation.currentFrame() >= 3 && this.animation.currentFrame() <= 6) {//Upper hurtbbox
                    if (this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -230, 0,
                            this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 150, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -70 - this.spriteWidth - 150, 0,
                            this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 150, this.states.facingRight));
                }
                if (this.animation.currentFrame() >= 3 && this.animation.currentFrame() <= 6) {//Lower hurtbox
                    if (this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 150, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 120, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 150, this.states.facingRight));
                }
                if (this.animation.isDone()) {
                    this.animation.reset();
                    this.states.cleaving = false;
                    this.states.framelocked = false;
                }
            }
            //Shooting
            if (this.states.shooting) {
                if (!this.states.shotlocked) {
                    if (this.energy >= this.shootEnergyCost && this.states.energized) {
                        this.game.addEntity(new Projectile(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight, this.states.energized))
                        this.energy -= this.shootEnergyCost;
                        this.energyDelayTimer = this.energyDelay;
                    }
                    else {
                        this.game.addEntity(new Projectile(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight, false));
                    }
                    this.game.playSound("hero_shoot")
                    this.states.shotlocked = true;
                }
                if (this.animation.isDone()) {
                    this.animation.reset();
                    this.states.shooting = false;
                    this.states.framelocked = false;
                    this.states.shotlocked = false;
                }
            }
            //Slashing
            if (this.states.slashing) {
                this.states.hasGravity = true; //Fixes super-duper jump bug. (When interrupting dash, dash doesn't enter isDone() so grav isn't reset)
                if (this.animation.currentFrame() === 2 && this.states.energized
                    && !this.states.shotlocked && this.energy >= this.slashEnergyCost) {
                    this.game.addEntity(new Projectile_Sword(this.game, this.x + 20, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
                    this.states.shotlocked = true;
                    this.energy -= this.slashEnergyCost;
                    this.energyDelayTimer = this.energyDelayCooldown;
                }
                if (this.animation.currentFrame() >= 2 && this.animation.currentFrame() <= 6) {//Hurtbox
                    if (this.states.facingRight)//facing right
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));
                    else //facing left
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 120, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));

                }
                if (this.animation.isDone()) {
                    this.animation.reset();
                    this.states.slashing = false;
                    this.states.hasSlashed = false;
                    this.states.shotlocked = false;
                    this.states.framelocked = false;
                }
            }
            //Dashing
            if (this.states.dashing) {
                if (this.states.facingRight) { this.updatePos(this.dashSpeed, 0); }
                else { this.updatePos(-this.dashSpeed, 0); }
                //Three part dash (better invulnerability implementation) 
                if (this.states.dashingStart) {
                    if (this.states.hasDashed) {
                        this.updateHitbox(60, 60, 25, 25);
                        this.states.hasGravity = false;
                        this.yVelocity = 0;
                        console.log(this.energy);
                        this.energy -= this.dashEnergyCost;
                        console.log(this.energy);
                        this.energyDelayTimer = this.energyDelay;
                        this.states.hasDashed = false;
                    }
                    if (this.animation.isDone()) {
                        this.animation.reset();
                        this.states.dashingStart = false;
                        this.updateHitbox(60, 60, 37, 15, 0, -10);
                        this.states.dashingMid = true;
                        this.states.invulnerable = true;
                    }
                }
                else if (this.states.dashingMid) {
                    if (this.animation.isDone()) {
                        this.animation.reset();
                        this.states.invulnerable = false;
                        this.states.dashingMid = false;
                        this.states.dashingEnd = true;
                        this.updateHitbox(60, 60, 25, 25);
                    }
                }
                else if (this.states.dashingEnd) {
                    if (this.animation.isDone()) {
                        this.animation.reset();
                        this.states.hasDashed = false;
                        this.states.dashingEnd = false;
                        this.states.dashing = false;
                        this.states.hasGravity = true;
                        this.states.framelocked = false;
                        this.updateHitbox(50, 50, 20, 35);
                    }
                }
            }
            //Stunned
            if (this.states.stunned) {
                //move away from the direction of the attack
                this.x += this.stunDir * 1;
                this.states.hasGravity = false;
                this.yVelocity = 0;
                if (this.animation.isDone()) {
                    this.animation.reset();
                    this.states.stunned = false;
                    this.states.framelocked = false;
                    this.damageCooldownTimer = this.damageCooldown;
                    this.states.hasGravity = true;
                    this.multiplier = 1;
                }
            }
            //DEAD
            if (this.states.dead) {
                if (this.animation.loops > 3) {
                    this.animation.reset();
                    this.states.dead = false;
                    this.states.respawned = true;
                }
            }
            //Respawn
            if (this.states.respawned) {
                //respawn
            }

            //Timer Checks
            if (this.energyCooldownTimer > 0) {
                this.energyCooldownTimer--;
            }
            else if (this.energy < this.maxEnergy) {
                this.energy++;
                this.energyCooldownTimer = this.energyCooldown;
            }
            if (this.damageCooldownTimer > 0) {
                this.damageCooldownTimer--;
            }

            //Grounded state logic
            if (this.yVelocity === 0 && this.velocityCooldownTimer > 0) {
                this.velocityCooldownTimer--;
            }
            else if (this.yVelocity === 0 && this.velocityCooldownTimer === 0) {
                this.states.grounded = true;
            }
            else if (this.yVelocity !== 0) {
                this.velocityCooldownTimer = this.velocityCooldown;
                this.states.grounded = false;
            }

            // update velocities based on gravity and friction
            if (this.states.hasGravity) {
                this.yVelocity += this.gravity * this.gravity;
            }
            this.y += this.yVelocity;
            this.lastBoundY = this.boundY;
            this.boundY += this.yVelocity;

            //Health checks and position checks
            if (this.health <= 0) {
                this.clearStates();
                this.states.dead = true;
                this.states.framelocked = true;
                this.states.hasGravity = false;
                this.yVelocity = 0;
            }
        }

        draw(ctx) {
            if (this.yVelocity < 0 && !this.states.shooting) {//ascending
                this.updateHitbox(50, 50, 15, 30, -10, -20);
                this.animation = this.animations.ascend;
            }
            else if (this.yVelocity > 0 && !this.states.shooting) {//descending
                this.updateHitbox(50, 50, 15, 35);
                this.animation = this.animations.descend;
            }
            else if (this.states.running && this.animation && !this.states.shooting) {//gunrunning
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.gunrun;
            }
            else if (this.states.shooting && this.states.grounded) {//shooting
                this.updateHitbox(70, 50, 20, 35);
                this.animation = this.animations.shoot;
            }
            else if (this.states.shooting && !this.states.grounded) {//air shooting
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.airshoot;
            }
            else if (this.states.cleaving) {//cleaving
                this.updateHitbox(80, 60, 20, 35);
                this.animation = this.animations.cleave;
            }
            else if (this.states.slashing) {//slashing
                this.updateHitbox(80, 50, 20, 35);
                this.animation = this.animations.slash;
            }
            else if (this.states.dashingStart) {//dashing start
                this.animation = this.animations.dash_start;
            }
            else if (this.states.dashingMid) {//dashing mid
                this.animation = this.animations.dash_mid;
            }
            else if (this.states.dashingEnd) {//dashing end
                this.animation = this.animations.dash_end;
            }
            else if (this.states.stunned) {
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.stun;
            }
            else if (this.states.dead) {
                this.animation = this.animations.dead;
            }
            else {
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.idle;
            }
            if (this.animation) {
                this.drawImg(ctx);
            }
        }


        collided(other, direction) {
            //TERRAIN COLLISION
            if (other.name === "Terrain" || other.name === "Spikes") {

                // Hero above terrain
                if (direction === 'bottom') {
                    this.boundY = other.boundY - this.boundHeight;
                    this.y = this.boundY + this.boundHeight;
                    if (this.yVelocity > 0) {
                        this.yVelocity = 0;
                    }
                    this.jumpsLeft = this.maxJumps;
                    this.states.jumping = false;
                    this.states.grounded = true;
                }

                // Hero jumps into terrain
                else if (direction === 'top') {
                    this.boundY = other.boundY + other.boundHeight;
                    this.y = this.boundY + this.boundHeight;
                    this.lastBoundY = this.boundY;
                    this.yVelocity = 0;
                }

                // Hero collides with terrain to the left
                else if (direction === 'left') {
                    this.boundX = other.boundX + other.boundWidth;
                    this.x = this.boundX;
                }

                // Hero collides with terrain to the right
                else if (direction === 'right') {
                    this.boundX = other.boundX - this.boundWidth;
                    this.x = this.boundX;
                }
                //console.log(`${this.name} colliding with ${other.name} from ${direction}`);
            }
            if (other.name === "Lava" && !this.states.dead) {
                this.clearStates();
                this.health = 0;
                this.states.stunned = true;
                this.states.framelocked = true;
                this.boundY = other.boundY - this.boundHeight;
                this.y = this.boundY + this.boundHeight - 5;
                this.game.playSound("hero_hurt")
            }
            //If Hero can take damage, check if...
            if (!this.states.isGod && this.damageCooldownTimer <= 0 && !this.states.invulnerable && !this.states.dead && !this.states.stunned) { 
                if (other.parentClass === "Enemy") {             
                    if (other.damage > 0) {
                        //Determine interaction based on other's damage type
                        if (other.damageType === "health") {
                            this.game.playSound("hero_hurt")
                            this.health -= other.damage;
                            //reset states and put into stun anim and stunlock
                            this.hurt();
                            //determine which way hero should move during stun
                            if (other.states.facingRight) { this.stunDir = 1; } else { this.stunDir = -1; }
                            if (this.x - other.x < 0) {
                                this.boundX = other.boundX - this.boundWidth;
                                this.x = this.boundX;
                            }
                            else {
                                this.boundX = other.boundX + other.boundWidth;
                                this.x = this.boundX;
                            }
                        }
                        else if (other.damageType === "energy" && this.energy > 0) {
                            this.energy -= other.damage;
                        }
                    }
                }
                if (other.name === "Fireball") {
                    this.game.playSound("hero_hurt")
                    this.health -= other.damage;
                    this.damageCooldownTimer = this.damageCooldown;
                    this.hurt();
                    if (other.states.facingRight) { this.stunDir = 1; } else { this.stunDir = -1; }
                } if (other.name === "Projectile") {
                    this.health -= other.damage;
                    other.removeFromWorld = true;
                    this.clearStates();
                    this.states.stunned = true;
                    this.states.framelocked = true;
                    if (other.states.facingRight) { this.stunDir = 1; } else { this.stunDir = -1; }
                }
                if (other.name === "Hurtbox") {
                    other.hasOwnProperty("isEnemy");
                    other.hasOwnProperty("damage");
                    if (other.isEnemy) {

                        this.game.playSound("hero_hurt")
                        this.health -= other.damage; 
                        this.damageCooldownTimer = this.damageCooldown;
                        //reset states and put into stun anim and stunlock
                        this.clearStates();
                        this.states.stunned = true;
                        this.states.framelocked = true;
                        if (other.states.facingRight) { this.stunDir = 1; } else { this.stunDir = -1; }
                    }
                }
            }
        }

        /***HELPER CLASSES***/
        updateHitbox(fWidth, fHeight, bWidth, bHeight, offX = 0, offY = 0) {
            this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth + 5;
            this.boundWidth = this.scale * bWidth;
            this.boundHeight = this.scale * bHeight;
            this.boundX = this.centerX - this.boundWidth / 2 + offX;
            this.boundY = this.y - this.boundHeight + offY;
        }

        setStates(running, jumping, shooting, cleaving, facingRight, grounded, slashing, shotlocked, framelocked, energized, dashing, hasDashed) {
            this.states.running = running;
            this.states.jumping = jumping;
            this.states.shooting = shooting;
            this.states.cleaving = cleaving;
            this.states.facingRight = facingRight;
            this.states.grounded = grounded;
            this.states.slashing = slashing;
            this.states.shotlocked = shotlocked;
            this.states.framelocked = framelocked;
            this.states.energized = energized;
            this.states.dashing = dashing;
            if (!this.states.dashing) {
                this.states.dashingStart = false;
                this.states.dashingMid = false;
                this.states.dashingEnd = false;
            }
            this.states.hasDashed = hasDashed;
        }

        clearStates() {
            this.setStates(false, false, false, false, this.states.facingRight, false, false, false, false, this.states.energized, false, false);
            this.states.hasGravity = true;
            this.states.stunned = false;
            this.states.dead = false;
        }

        hurt() {
            this.clearStates();
            this.animation.reset();
            this.states.stunned = true;
            this.states.framelocked = true;
        }

        respawn() {
            this.states.respawned = false;
            this.clearStates();
            this.yVelocity = 0;
            this.health = this.maxHealth;
            this.energy = this.maxEnergy;
            this.game.gameboard.score = this.game.gameboard.score/2;
            this.multiplier = 1;
        }

        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.rect(this.boundX, 
                this.boundY, 
                this.boundWidth, this.boundHeight);
            ctx.stroke();
            ctx.closePath();
        }


        drawImg (ctx) {
            this.drawOutline(ctx);
            this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
        }
    }

    return Hero;
});



