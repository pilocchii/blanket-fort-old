define([
    "enemy",
    "animation",
    "shotblast",
    "bullet",
    "terrain",
    "projectile",
    "hurtbox",
], function (
    Enemy,
    Animation,
    Shotblast,
    Bullet,
    Terrain,
    Projectile,
    Hurtbox,
    ) {

        //TODO (long term): ALL ACTORS - "Check if in range" helper function
        class Soldier_Shield extends Enemy {

            constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 50, spriteHeight = 50) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 7;
                this.yVelocity = 0;

                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = this.scale * 45;
                this.boundHeight = this.scale * 45;
                this.boundX = this.centerX - (this.boundWidth / 2);
                this.boundY = this.y - this.boundHeight + (this.spriteHeight / 2 - 10);
                this.updateHitbox(50, 50, 38, 40);

                //Stats
                this.health = 50;
                this.damage = 1;
                this.facing = -1;

                // Behavior parameters
                this.runProb = 5;
                this.runAwayCooldown = 250;
                this.runAwayCooldownTimer = 0;
                this.runAwayTime = 75;
                this.runAwayTimer = 0;
                this.sightRadius[0] = 1000;
                this.sightRadius[1] = 350;

                this.states = {
                    "active": false, //currently unused
                    "idling": true,
                    "running": false,
                    "shooting_startup": false,
                    "shooting_active": false,
                    "shooting_recover": false,
                    "hasShot": false,
                    "slashing_start": false,
                    "slashing_end": false,
                    "blocking": false,
                    "turning": false,
                    "framelocked": false,
                    "facingRight": false,
                    "runningAway": false,
                };
                this.animations = {
                    "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 15, 5, 6, true, this.scale),
                    "turn": new Animation(this.img, [spriteWidth, spriteHeight], 0, 15, 3, 5, false, this.scale, 6),
                    "block": new Animation(this.img, [spriteWidth, spriteHeight], 0, 15, 9, 4, false, this.scale, 11),
                    "run": new Animation(this.img, [spriteWidth, spriteHeight], 1, 12, 3, 12, true, this.scale),
                    "shoot_startup": new Animation(this.img, [spriteWidth, spriteHeight], 2, 18, 2, 5, false, this.scale),
                    "shoot_active": new Animation(this.img, [spriteWidth, spriteHeight], 2, 18, 4, 5, false, this.scale, 5),
                    "shoot_recover": new Animation(this.img, [spriteWidth, spriteHeight], 2, 18, 4, 1, true, this.scale, 9),
                    "slash_start": new Animation(this.img, [100, 60], 3, 16, 2, 9, false, this.scale),
                    "slash_end": new Animation(this.img, [100, 60], 3, 16, 3, 7, false, this.scale, 9),
                };
                this.animation = this.animations.idle;
            }


            update() {
                if (Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
                    this.states.active = true;
                }
                /**** BEGIN BEHAVIOR CODE ****/
                if (this.states.active) {
                    //idling - This is where most behavior will start, and most will return.
                    if (this.states.idling && !this.states.runningAway
                        && Math.abs(this.x - this.game.hero.x) < this.sightRadius[0]
                        && Math.abs(this.y - this.game.hero.y) < this.sightRadius[1]) {
                        //Face Enemy
                        if (this.game.hero.x > this.x && !this.states.facingRight && !this.states.blocking) {
                            this.updateHitbox(50, 50, 38, 40);
                            this.states.turning = true;
                            this.states.idling = false;
                        }
                        else if (this.game.hero.x < this.x && this.states.facingRight && !this.states.blocking) {
                            this.updateHitbox(50, 50, 38, 40);
                            this.states.turning = true;
                            this.states.idling = false;
                        }
                        //Slash when in range
                        if (Math.abs(this.x - this.game.hero.x) <= 250 && Math.abs(this.y - this.game.hero.y) < 50
                            && Math.random() * 100 <= 5 && this.animation.loops > 1) { //added random activation as a test.
                            this.states.slashing_start = true;
                            this.states.idling = false;
                            this.animation.elapsedTime = 0;
                            this.animation.loops = 0;
                            this.updateHitbox(80, 60, 50, 40);
                        }
                        //Shoot when in range
                        if (Math.abs(this.x - this.game.hero.x) >= 200
                            && Math.abs(this.x - this.game.hero.x) <= 1000
                            && this.animation.loops >= 3) { //shot cooldown based on idle time (measured by animation loops)

                            if (Math.abs(this.x - this.game.hero.x) <= 600
                                && Math.random() * 10 <= this.runProb
                                && this.runAwayCooldownTimer == 0) {
                                console.log("running away");
                                this.runProb -= 2.5;
                                this.runAwayTimer = this.runAwayTime;
                                this.runAwayCooldownTimer = this.runAwayCooldown;
                                this.states.runningAway = true;
                                this.states.shooting_startup = true;
                                this.states.turning = false;
                                this.states.idling = false;
                            } else {
                                this.animation.elapsedTime = 0;
                                this.animation.loops = 0;
                                this.states.shooting_startup = true;
                                this.states.idling = false;
                                this.updateHitbox(50, 50, 38, 40);
                            }
                        }
                    }


                    /**** UPDATE BEHAVIOR PARAMS ****/
                    if (!this.states.shooting_active && !this.states.shooting_startup) {
                        if (this.runAwayCooldownTimer > 0) {
                            this.runAwayCooldownTimer -= 1;
                        }
                        if (this.runAwayTimer > 0) {
                            this.runAwayTimer -= 1;
                        }
                    }
                    /**** END BEHAVIOR CODE ****/

                    //Run Away Routine
                    if (this.states.runningAway && !this.states.shooting_startup && !this.states.shooting_active && !this.states.shooting_recover) {
                        if (this.runAwayTimer == this.runAwayTime - 1) {
                            this.states.turning = true;
                        }
                        if (this.runAwayTimer == 0) {
                            this.states.runningAway = false;
                            this.states.running = false;
                            this.states.turning = true;
                            // this.states.idling = true;
                        }
                        else if (this.runAwayTimer > 0 && !this.states.turning) {
                            this.states.running = true;
                            this.states.idling = false;
                        }

                    }

                    if (this.states.running) { //running
                        this.x += this.facing * this.movementSpeed;
                        this.boundX += this.facing * this.movementSpeed;
                        if (this.animation.loops >= 1) {
                            this.animation.elapsedTime = 0;
                            this.animation.loops = 0;
                            this.states.running = false;
                            this.states.idle = true;
                        }
                    }
                    if (this.states.shooting_startup && !this.states.framelocked) { //shooting start: this.updateHitbox(50, 50, 38, 40);
                        if (this.animation.isDone()) {
                            this.animation.elapsedTime = 0;
                            this.states.shooting_startup = false;
                            this.states.shooting_active = true;
                            this.updateHitbox(50, 50, 38, 40);
                        }
                    }
                    if (this.states.shooting_active) { //shooting active
                        if (!this.states.hasShot) {
                            this.game.addEntity(new Shotblast(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
                            this.game.addEntity(new Bullet(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
                            this.states.hasShot = true;
                        }
                        if (this.animation.isDone()) {
                            this.animation.elapsedTime = 0;
                            this.animation.loops = 0;
                            this.states.shooting_active = false;
                            this.states.hasShot = false;
                            //this.states.shooting_recover = true;
                            if (!this.states.runningAway)
                                this.states.idling = true;
                        }
                    }
                    //TODO: Decide whether to use this
                    //TODO: Figure out why this causes "run away" to happen in the wrong direction
                    if (this.states.shooting_recover) { 
                        if (this.animation.loops > 2) {
                            this.animation.elapsedTime = 0;
                            this.animation.loops = 0;
                            this.states.shooting_recover = false;
                            if (!this.states.runningAway)
                                this.states.idling = true;
                        }
                    }
                    if (this.states.slashing_start && !this.states.framelocked) { //slashing start  this.updateHitbox(80, 60, 50, 40);
                        if (this.animation.currentFrame() === 8) {
                            if (this.states.facingRight)
                                this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, 40, 100,
                                    this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, this.states.facingRight, true));
                            else
                                this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 85, 100,
                                    this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, this.states.facingRight, true));
                        }
                        if (this.animation.isDone()) {
                            this.animation.elapsedTime = 0;
                            this.states.slashing_start = false;
                            this.states.slashing_end = true;
                            this.updateHitbox(100, 60, 50, 40);
                        }
                    }
                    if (this.states.slashing_end) { //slashing end
                        if (this.animation.currentFrame() >= 0 && this.animation.currentFrame() <= 1) {
                            if (this.states.facingRight)
                                this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, 25, 100,
                                    this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, this.states.facingRight, true));
                            else
                                this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 80, 100,
                                    this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, this.states.facingRight, true));
                        }
                        if (this.animation.isDone()) {
                            this.animation.elapsedTime = 0;
                            this.states.slashing_end = false;
                            this.states.idling = true;
                            this.updateHitbox(50, 50, 38, 40);
                        }
                    }
                    if (this.states.blocking) { //blocking
                        //this.UpdateHitbox(50, 50, 45, 45);
                        // a little knockback
                        if (this.states.facingRight) {
                            this.x -= 1;
                            this.boundX -= 1;
                        } else {
                            this.x += 1;
                            this.boundX += 1;
                        }


                        if (this.animation.isDone()) {
                            this.animation.elapsedTime = 0;
                            this.animation.loops = 0;
                            this.states.blocking = false;
                            //for demo                        
                            this.states.idling = true;
                            this.updateHitbox(50, 50, 38, 40);
                        }
                    }
                    if (this.states.turning) { //turning
                        this.states.framelocked = true;
                        if (this.animation.isDone()) {
                            this.animation.elapsedTime = 0;
                            this.states.turning = false;
                            this.states.facingRight = !this.states.facingRight;
                            this.facing *= -1; //see above statement
                            this.states.framelocked = false;
                            this.states.idling = true;
                            this.updateHitbox(50, 50, 38, 40);
                        }
                    }
                    this.yVelocity += this.gravity * this.gravity;
                    this.y += this.yVelocity;
                    this.lastBoundY = this.boundY;
                    this.boundY += this.yVelocity;

                    if (this.health <= 0)
                        this.removeFromWorld = true;
                }
            }

            draw(ctx) {
                if (this.states.idling) {
                    this.animation = this.animations.idle;
                }
                if (this.states.running) {
                    this.animation = this.animations.run;
                }
                if (this.states.shooting_startup) {
                    this.animation = this.animations.shoot_startup;
                }
                if (this.states.shooting_active) {
                    this.animation = this.animations.shoot_active;
                }
                if (this.states.shooting_recover) {
                    this.animation = this.animations.shoot_recover;
                }
                if (this.states.slashing_start) {
                    this.animation = this.animations.slash_start;
                }
                if (this.states.slashing_end) {
                    this.animation = this.animations.slash_end;
                }
                if (this.states.blocking) {
                    this.animation = this.animations.block;
                }
                if (this.states.turning) {
                    this.animation = this.animations.turn;
                }
                this.drawImg(ctx);
            }

            //used to easily update hitbox based on state/animation
            updateHitbox(fWidth, fHeight, bWidth, bHeight) {
                this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth;
                this.boundWidth = this.scale * bWidth;
                this.boundHeight = this.scale * bHeight;
                this.boundX = this.centerX - this.boundWidth / 2;
                this.boundY = this.y - this.boundHeight + (fHeight / 2 - 10);
            }

            collided(other, direction) {
                if (other instanceof Terrain) {
                    if (direction === 'bottom') {
                        this.boundY = other.boundY - this.boundHeight;
                        this.y = this.boundY + this.boundHeight - 20; //fix magic number (drawn slightly below hitbox without the 20 offset)
                        this.yVelocity = 0;
                        this.jumpsLeft = this.maxJumps;
                        this.states.jumping = false;
                    }
                    else if (direction === 'top') {
                        this.boundY = other.boundY + other.boundHeight;
                        this.y = this.boundY + this.boundHeight;
                        this.lastBoundY = this.boundY;
                    }

                    else if (direction === 'left') {
                        this.boundX = other.boundX + other.boundWidth;
                        this.x = this.boundX;
                    }

                    else if (direction === 'right') {
                        this.boundX = other.boundX - this.boundWidth;
                        this.x = this.boundX;
                    }
                }
                if (other instanceof Projectile) {
                    // blocking from left & right
                    if (this.states.idling || this.states.blocking) {
                        if (this.x - this.game.hero.x < 0 && this.states.facingRight/*direction == 'left' && other.x < this.x*/) {
                            this.states.blocking = true;
                            this.states.idling = false;
                        }
                        else if (this.x - this.game.hero.x > 0 && !this.states.facingRight/*direction == 'right' && other.x > this.x*/) {
                            this.states.blocking = true;
                            this.states.idling = false;
                        }
                        else {
                            this.health -= other.damage;
                        } 
                    } else {
                        // blood or something goes here
                        // this.game.addEntity(...)
                        this.health -= other.damage;
                        console.log("OUCH!")
                    }
                }
                if (other instanceof Hurtbox) {
                    other.hasOwnProperty("isEnemy");
                    other.hasOwnProperty("damage");
                    // blocking from left & right
                    if (!other.isEnemy) {
                        if (this.states.idling || this.states.blocking) {
                            if (this.x - this.game.hero.x < 0 && this.states.facingRight/*direction == 'left' && other.x < this.x*/) {
                                this.states.blocking = true;
                                this.states.idling = false;
                            }
                            else if (this.x - this.game.hero.x > 0 && !this.states.facingRight/*direction == 'right' && other.x > this.x*/) {
                                this.states.blocking = true;
                                this.states.idling = false;
                            }
                            else {
                                this.health -= other.damage;
                                console.log("OUCH!")
                            }
                        }
                        else {
                            this.health -= other.damage;
                            console.log("OUCH!")
                        }
                    }
                }
            }

            drawOutline(ctx) {
                ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.rect(this.boundX,
                    this.boundY,
                    this.boundWidth, this.boundHeight);
                ctx.stroke();
                ctx.closePath();
            }

            drawImg(ctx) {
                //this.drawOutline(ctx);
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            }
        }
        return Soldier_Shield;
    });