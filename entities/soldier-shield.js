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
                this.health = 400;
                this.damage = 3;
                this.facing = 1;

                // Behavior parameters
                this.runAwayCooldown = 300;
                this.runAwayCooldownTimer = 0;
                this.runAwayTime = 75;
                this.runAwayTimer = 0;

                this.states = {
                    "active": false, //currently unused
                    "idling": true,
                    "running": false,
                    "shooting_startup": false,
                    "shooting_active": false,
                    "hasShot": false,
                    "slashing_start": false,
                    "slashing_end": false,
                    "blocking": false,
                    "turning": false,
                    "facingRight": false,
                    "runningAway": false,
                };
                this.animations = {
                    "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 15, 5, 6, true, this.scale),
                    "turn": new Animation(this.img, [spriteWidth, spriteHeight], 0, 15, 4, 5, false, this.scale, 6),
                    "block": new Animation(this.img, [spriteWidth, spriteHeight], 0, 15, 5, 4, true, this.scale, 11),
                    "run": new Animation(this.img, [spriteWidth, spriteHeight], 1, 12, 3, 12, true, this.scale),
                    "shoot_startup": new Animation(this.img, [spriteWidth, spriteHeight], 2, 18, 3, 5, false, this.scale),
                    "shoot_active": new Animation(this.img, [spriteWidth, spriteHeight], 2, 18, 3, 5, false, this.scale, 5),
                    "slash_start": new Animation(this.img, [80, 60], 3, 9, 3, 9, false, this.scale),
                    "slash_end": new Animation(this.img, [100, 60], 4, 11, 3, 7, false, this.scale),
                };
                this.animation = this.animations.idle;
            }


            update() {

                /**** BEGIN BEHAVIOR CODE ****/

                if (this.states.idling && !this.states.runningAway) { //idling - This is where most behavior will start, and most will return. 
                   if (this.game.hero.x > this.x && this.states.facingRight) {
                    this.updateHitbox(50, 50, 38, 40);
                    this.states.turning = true;
                    this.states.idling = false;
                    }
                    else if (this.game.hero.x < this.x && !this.states.facingRight) {
                        this.updateHitbox(50, 50, 38, 40);
                        this.states.turning = true;
                        this.states.idling = false;
                    }
                    //Slash when in range
                    if (Math.abs(this.x - this.game.hero.x) <= 250 && Math.abs(this.y - this.game.hero.y) < 50
                            && Math.random()*100 <= 5) { //added random activation as a test.
                        this.states.slashing_start = true;
                        this.states.idling = false;
                        this.updateHitbox(80, 60, 50, 40);
                    }
                    //Shoot at this range
                    if (Math.abs(this.x - this.game.hero.x) >= 200 
                        && Math.abs(this.x - this.game.hero.x) <= 1000
                        && this.animation.loops >= 2) { //shot cooldown based on idle time (measured by animation loops)

                        if (Math.abs(this.x - this.game.hero.x) <= 600
                                && Math.random()*100 <= 50
                                && this.runAwayCooldownTimer == 0) {
                            console.log("running away")
                            this.runAwayTimer = this.runAwayTime;
                            this.runAwayCooldownTimer = this.runAwayCooldown;
                            this.states.runningAway = true;
                            this.states.turning = false;
                            this.states.idling = false;
                        } else {
                            this.animation.loops = 0;
                            this.states.shooting_startup = true;
                            this.states.idling = false;
                            this.updateHitbox(50, 50, 38, 40);
                        }       
                    }
                }
                

                /**** UPDATE BEHAVIOR PARAMS ****/
                if (this.runAwayCooldownTimer > 0) {
                    this.runAwayCooldownTimer -= 1;
                }
                if (this.runAwayTimer > 0) {
                    this.runAwayTimer -= 1;
                }

                /**** END BEHAVIOR CODE ****/

                if (this.states.runningAway) {
                    if (this.runAwayTimer == this.runAwayTime-1) {
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
                        //for demo
                        //this.states.shooting_startup = true;
                    }
                }
                if (this.states.shooting_startup) { //shooting start: this.updateHitbox(50, 50, 38, 40);
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
                        this.states.idling = true;
                        //for demo
                        //this.states.slashing_start = true;
                        this.updateHitbox(50, 50, 38, 40);
                        
                    }
                }
                if (this.states.slashing_start) { //slashing start  this.updateHitbox(80, 60, 50, 40);
                    if (this.animation.currentFrame() === 8) {
                        if(!this.states.facingRight)
                            this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, 40, 100,
                                    this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, !this.states.facingRight, true));
                        else
                            this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 85, 100,
                                this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, !this.states.facingRight, true));
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
                        if(!this.states.facingRight)
                            this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, 25, 100,
                                this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, !this.states.facingRight, true));
                        else
                            this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 80, 100,
                                this.spriteWidth, this.spriteHeight, 70, 100, this.scale, this.damage, !this.states.facingRight, true));
                    }
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.slashing_end = false;
                        //for demo
                        this.states.idling = true;
                        this.updateHitbox(50, 50, 38, 40);
                    }
                }
                if (this.states.blocking) { //blocking
                    //this.UpdateHitbox(50, 50, 45, 45);
                    if (this.animation.loops > 2) {
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.blocking = false;
                        //for demo                        
                        this.states.idling = true;
                        this.updateHitbox(50, 50, 38, 40);
                        this.states.facingRight = !this.states.facingRight;
                    }
                }
                if (this.states.turning) { //turning
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.turning = false;
                        this.states.facingRight = !this.states.facingRight;
                        this.facing *= -1; //see above statement
                        //for demo
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
                this.boundWidth = this.scale*bWidth;
                this.boundHeight = this.scale*bHeight;
                this.boundX = this.centerX - this.boundWidth/2;
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
                    this.health -= other.damage;
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
                this.drawOutline(ctx);
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            }
        }
        return Soldier_Shield;
    });