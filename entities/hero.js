define([
    "actor",
    "animation",
    "terrain",
    "projectile",
    "projectile-sword",
    "soldier-shield",
    "enemy",
    "hurtbox",
], function (
    Actor,
    Animation,
    Terrain,
    Projectile,
    Projectile_Sword,
    Soldier_Shield,
    Enemy,
    Hurtbox,
){


    class Hero extends Actor {

        constructor (game, x, y, img=null, ctx=null, scale=3, spriteWidth=60, spriteHeight=60) {
            super(game, x, y, img, ctx);
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

            this.movementSpeed = (8);
            this.dashSpeed = 17
            this.jumpStrength = (20);
            this.jumpsLeft = 2;
            this.maxJumps = 2;
            this.jumpTimer = 0;
            this.jumpCooldown = 20;

            this.maxHealth = 6;
            this.maxEnergy = 6;
            this.energy = 5;
            this.health = 5;
            this.slashEnergyCost = 4;
            this.shootEnergyCost = 2;
            this.dashEnergyCost = 1;
            
            //Timers
            this.damageCooldownTimer = 0;
            this.damageCooldown = 20;
            this.energyCooldownTimer = 0;
            this.energyCooldown = 240; 
            this.velocityCooldown = 2;
            this.velocityCooldownTimer = 0;

            this.states = {
                "running": false,
                "jumping": false,
                "shooting": false,
                "cleaving": false,
                "facingRight": true,
                "grounded": true,
                "slashing": false,
                "shotlocked": false,
                "framelocked": false,
                "energized": false,
                "dashing": false,
                "hasDashed": false,
            };
            this.animations = {
                "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, this.scale), //50x50
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
            };
        }

        update () {
            /////////// all button checks go here ///////////
            // check if button pressed
            // Moving left and right are mutually exclusive, thus else-if
            // this.setStates(running, jumping, shooting, cleaving, facingRight, grounded, slashing, shotlocked, framelocked, energized, dashing, hasDashed)
            if (this.game.controlKeys[this.game.controls.right].active && !this.states.framelocked) { //run right
                if (!this.states.facingRight) { this.states.facingRight = true };
                this.states.running = true;
            } else if (this.game.controlKeys[this.game.controls.left].active && !this.states.framelocked) { //run left
                if (this.states.facingRight) { this.states.facingRight = false };
                this.states.running = true;
            }
            if (this.game.controlKeys[this.game.controls.energize].active) { //energize
                this.states.energized = true;
            }
            if (this.game.controlKeys[this.game.controls.jump].active && !this.states.jumping && !this.states.framelocked) { // jump
                this.states.jumping = true;
            }
            if (this.game.controlKeys[this.game.controls.shoot].active && !this.states.framelocked) { //shoot
                this.states.shooting = true;
            }
            if (this.game.controlKeys[this.game.controls.cleave].active && this.states.grounded && !this.states.framelocked) { //cleave
                this.animation.elapsedTime = 0;
                this.animation.loops = 0;
                this.states.cleaving = true;
                this.states.framelocked = true;
            }
            if (this.game.controlKeys[this.game.controls.slash].active && this.states.grounded && (!this.states.framelocked || this.states.dashing)) { //slash
                this.animation.elapsedTime = 0;
                this.animation.loops = 0;
                this.setStates(false, false, false, false, this.states.facingRight, false, true, false, true, this.states.energized, false, false);
            }
            if (this.game.controlKeys[this.game.controls.dash].active && !this.states.framelocked && this.energy > 0 && !this.states.shooting) { //dash
                this.states.dashing = true;
                this.states.hasDashed = true;
                this.damageCooldownTimer = 19;
                this.states.running = false;
                this.states.framelocked = true;
            }

            // check if button NOT pressed, if state is supposed to change...
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
                    this.centerX += this.movementSpeed;
                    this.boundX += this.movementSpeed;
                } else {
                    this.x -= this.movementSpeed;
                    this.centerX -= this.movementSpeed;
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
                    if(this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -230, 0,
                            this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 150, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -70 - this.spriteWidth - 150, 0,
                            this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 150, this.states.facingRight));
                }
                if (this.animation.currentFrame() >= 3 && this.animation.currentFrame() <= 11) {//Lower hurtbox
                    if (this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 150, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 120, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 150, this.states.facingRight));
                }
                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
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
                        //this.energyCooldownTimer = this.energyCooldown;
                    }
                    else {
                        this.game.addEntity(new Projectile(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight, false));
                    }
                    this.states.shotlocked = true;
                }
                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.states.shooting = false;
                    this.states.framelocked = false;
                    this.states.shotlocked = false;
                }
            }
            //Slashing
            if (this.states.slashing) {
                if (this.animation.currentFrame() === 2 && this.states.energized 
                    && !this.states.shotlocked && this.energy >= this.maxEnergy/2) {
                    this.game.addEntity(new Projectile_Sword(this.game, this.x + 20, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
                    this.states.shotlocked = true;
                    this.energy -= this.slashEnergyCost;
                    //this.energyCooldownTimer = this.energyCooldown;
                }
                if (this.animation.currentFrame() >= 2 && this.animation.currentFrame() <= 6) {//Hurtbox
                    if (this.states.facingRight)//facing right
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));
                    else //facing left
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 -this.spriteWidth -120, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));

                }
                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.states.slashing = false;
                    this.states.hasSlashed = false;
                    this.states.shotlocked = false;
                    this.states.framelocked = false;
                }
            }
            //Dashing
            if (this.states.dashing) {
                this.yVelocity = 0;
                if (this.states.hasDashed) {
                    //this.energyCooldownTimer = this.energyCooldown;
                    this.yVelocity = 0;
                    this.energy -= this.dashEnergyCost;
                    this.states.hasDashed = false;
                }

                if (this.states.facingRight) {this.x += this.dashSpeed; this.boundX += this.dashSpeed;}
                else { this.x -= this.dashSpeed; this.boundX -= this.dashSpeed; }

                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.animation.loops = 0;
                    this.states.dashing = false;
                    this.states.framelocked = false;
                }
            }
            //Timer Checks
            if (this.energyCooldownTimer > 0) {
                this.energyCooldownTimer--;
            }
            else if (this.energy < this.maxEnergy) {
                this.energy++;
                this.energyCooldownTimer = this.energyCooldown;// Energy restores more slowly (one energy per cooldown)
            }
            if (this.damageCooldownTimer > 0) {
                this.damageCooldownTimer--;
                console.log(this.damageCooldownTimer);
            }

            if (this.yVelocity === 0 && this.velocityCooldownTimer > 0) {
                this.velocityCooldownTimer--;
            }
            else if (this.yVelocity === 0 && this.velocityCooldownTimer === 0) {
                this.states.grounded = true;
            }
            else if (this.yVelocity != 0) {
                this.velocityCooldownTimer = this.velocityCooldown;
                this.states.grounded = false;
            }

            // update velocities based on gravity and friction
            this.yVelocity += this.gravity * this.gravity;
            this.y += this.yVelocity;
            this.lastBoundY = this.boundY;
            this.boundY += this.yVelocity;

            //Health checks and position checks
            if (this.health <= 0) {
                this.removeFromWorld = true;
            }
        }

        draw(ctx) {
            if (this.yVelocity < 0 && !this.states.shooting && !this.states.dashing) {//ascending
                this.updateHitbox(50, 50, 20, 30, 0, -20);
                this.animation = this.animations.ascend;
            }
            else if (this.yVelocity > 0 && !this.states.shooting && !this.states.dashing) {//descending
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.descend;
            }
            else if (this.states.running && this.animation && !this.states.shooting) {//gunrunning
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.gunrun;
            }
            else if (this.states.shooting && this.yVelocity == 0 && this.animation) {//shooting

                this.updateHitbox(70, 50, 20, 35);
                this.animation = this.animations.shoot;
            }
            else if (this.states.shooting && this.yVelocity != 0 && this.animation) {//air shooting
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.airshoot;
            }
            else if (this.states.cleaving && this.animation) {//cleaving
                this.updateHitbox(80, 60, 20, 35);
                this.animation = this.animations.cleave;
            }
            else if (this.states.slashing && this.animation) {//slashing
                this.updateHitbox(80, 50, 20, 35);
                this.animation = this.animations.slash;
            }
            else if (this.states.dashing && this.animation) { //dashing
                this.updateHitbox(60, 60, 45, 15, 0, -10);
                this.animation = this.animations.dash;
            }
            else {
                this.updateHitbox(50, 50, 20, 35);
                this.animation = this.animations.idle;
            }
            this.drawImg(ctx);
        }


        collided(other, direction) {
            // collide with terrain
            if (other instanceof Terrain) {

                // Hero above terrain
                // TODO store lastBottom, when landing, check to see if lastBottom is above other.BoundX. if it is, I SHOULD land. else i slide off like a chump. might work? idk yet
                if (direction === 'bottom') {
                    this.boundY = other.boundY - this.boundHeight;
                    this.y = this.boundY + this.boundHeight; //DS3DRAWCHANGE1:
                    if(this.yVelocity > 0) //DS3 2/18: stops Hero from becoming grounded when jumping onto a platform when he grazes the side
                        this.yVelocity = 0;
                    this.jumpsLeft = this.maxJumps;
                    this.states.jumping = false;
                }

                // Hero jumps into terrain
                else if (direction === 'top') {
                    this.boundY = other.boundY + other.boundHeight;
                    this.y = this.boundY + this.boundHeight;
                    this.lastBoundY = this.boundY;
                    this.yVelocity = 1; //DS3 2/18: Causes Hero to immediately descend when hitting a ceiling
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

            if (this.damageCooldownTimer <= 0) { //If Hero can take damage, check if
                if (other instanceof Enemy) {
                    this.health -= other.damage;
                    this.damageCooldownTimer = this.damageCooldown;
                } 
                if (other instanceof Hurtbox) {
                    other.hasOwnProperty("isEnemy");
                    other.hasOwnProperty("damage");
                    if (other.isEnemy) {
                        this.health -= other.damage;
                        this.damageCooldownTimer = this.damageCooldown;
                    }
                }
            }
        }

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
            this.states.hasDashed = hasDashed;
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



