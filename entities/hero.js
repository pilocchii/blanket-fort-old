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
            //this.y = y - spriteHeight*scale;
            this.movementSpeed = (8);

            this.jumpStrength = (20);
            this.jumpsLeft = 2;
            this.maxJumps = 2;
            this.jumpTimer = 0;
            this.jumpCooldown = 20;

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

            this.maxHealth = 6;
            this.maxEnergy = 6;
            this.energy = 4;
            this.health = 4;
            this.energyCooldownTimer = 0;
            this.energyCooldown = 60; 
            this.slashEnergyCost = 3;
            this.shootEnergyCost = 2;
            this.dashEnergyCost = 1;

            this.states = {
                "running": false,
                "jumping": false,
                "shooting": false,
                "cleaving": false,
                "facingRight": true,
                "grounded": false,
                "slashing": false,
                "shotlocked": false,
                "framelocked": false,
                "energized": false,
                "dashing": false,
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
                "slash": new Animation(this.img, [90, 60], 4, 11, 3, 11, false, this.scale), //80x50
                "cleave": new Animation(this.img, [100, 70], 9, 13, 3, 13, false, this.scale), //80x60
                "dash": new Animation(this.img, [90, 60], 4, 11, 2, 11, false, 2),
            };
        }

        update () {
            /////////// all button checks go here ///////////
            // check if button pressed
            // Moving left and right are mutually exclusive, thus else-if
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
            if (this.game.controlKeys[this.game.controls.cleave].active && !this.states.jumping && !this.states.framelocked) { //cleave
                this.states.cleaving = true;
                this.states.framelocked = true;
            }
            if (this.game.controlKeys[this.game.controls.slash].active && !this.states.jumping && !this.states.framelocked) { //slash
                this.states.slashing = true;
                this.states.framelocked = true;
            }
            if (this.game.controlKeys[this.game.controls.dash].active && !this.states.framelocked && this.energy > 0) {
                this.states.dashing = true;
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

            if (this.states.jumping) {
                this.states.jumping = false;

                if (this.jumpsLeft > 0 && this.jumpTimer == 0) {
                    this.jumpsLeft -= 1;
                    this.jumpTimer = this.jumpCooldown;
                    this.yVelocity = 0;
                    this.yVelocity -= this.jumpStrength;
                }
            }

            if (this.states.cleaving) {
                
                if (this.animation.currentFrame() >= 2 && this.animation.currentFrame() <= 6) {//Upper hurtbbox
                    if(this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -200, 0,
                            this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 50, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -100 - this.spriteWidth - 150, 0,
                            this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 50, this.states.facingRight));
                }
                if (this.animation.currentFrame() >= 2 && this.animation.currentFrame() <= 11) {//Lower hurtbox
                    if (this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 120, 100,
                            this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));
                }

                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.states.cleaving = false;
                    this.states.framelocked = false;
                }
            }

            if (this.states.shooting) { //Shooting
                if (!this.states.shotlocked) {
                    if (this.energy >= this.shootEnergyCost && this.states.energized) {
                        this.game.addEntity(new Projectile(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight, this.states.energized))
                        this.energy -= this.shootEnergyCost;
                        this.energyCooldownTimer = this.energyCooldown;
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

            if (this.states.slashing) {
                if (this.animation.currentFrame() === 2 && this.states.energized 
                    && !this.states.shotlocked && this.energy >= this.maxEnergy/2) {
                    this.game.addEntity(new Projectile_Sword(this.game, this.x + 20, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
                    this.states.shotlocked = true;
                    this.energy -= this.slashEnergyCost;
                    this.energyCooldownTimer = this.energyCooldown;
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

            if (this.states.dashing) {
                this.yVelocity = 0;
                this.gravity = 0;
                if (!this.states.framelocked) {
                    this.energy -= this.dashEnergyCost;
                    this.states.framelocked = true;
                }
                this.yVelocity = 0;
                if (this.states.facingRight) {
                    this.x += 25;
                    this.boundX += 25;
                }
                else {
                    this.x -= 17
                    this.boundX -= 17;
                }
                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.animation.loops = 0;
                    this.states.dashing = false;
                    this.states.framelocked = false;
                    this.gravity = .9;
                }
            }

            if (this.energyCooldownTimer > 0) {
                this.energyCooldownTimer--;
            }
            else if (this.energy < this.maxEnergy) {
                this.energy++;
                this.energyCooldownTimer = 60;// Energy restores more slowly (one energy per cooldown)
            }

            // update velocities based on gravity and friction
            this.yVelocity += this.gravity * this.gravity;
            this.y += this.yVelocity;
            this.lastBoundY = this.boundY;
            this.boundY += this.yVelocity;

            if (this.health <= 0) {
                //this.removeFromWorld = true;
                console.log("POW! Right in the kisser!");
                this.health = 4;
            }
        }

        draw(ctx) {
            if (this.yVelocity < 0 && !this.states.shooting && !this.states.dashing) {//ascending
                this.updateHitbox(50, 50, 20, 35);
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
            else if (this.states.dashing && this.animation) {
                this.updateHitbox(40, 25, 10, 17);
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

            if (other instanceof Enemy) {
                this.health -= other.damage;
            }
        }

        updateHitbox(fWidth, fHeight, bWidth, bHeight) {
            this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth + 5;
            this.boundWidth = this.scale * bWidth;
            this.boundHeight = this.scale * bHeight;
            this.boundX = this.centerX - this.boundWidth / 2;
            this.boundY = this.y - this.boundHeight;
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



