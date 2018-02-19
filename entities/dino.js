define([
    "enemy",
    "animation",
    "terrain",
    "rocket",
], function (
    Enemy,
    Animation,
    Terrain,
    Rocket,
    ) {


        class Dino extends Enemy {

            constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 90, spriteHeight = 60) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 7;
                this.hero = this.game.hero;

                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = 60*this.scale;
                this.boundHeight = 50*this.scale;
                this.boundX = this.centerX - (this.boundWidth / 2);
                this.boundY = this.y - this.boundHeight + (this.spriteHeight / 2 - 10); //DS3DRAWCHANGE2
                this.facing = 1;

                //Timers
                this.shotCooldown = 90;
                this.shotCooldownTimer = 0;
                //Stats
                this.health = 200;
                this.damage = 3;

                this.states = {
                    "active": true,
                    "idling": true,
                    "shooting": false,
                    "walking": false,
                    "grounded": false,
                    "framelocked": false,
                    "facingRight": true,
                };
                this.animations = {
                    "idle":             new Animation(this.img, [90, 60], 6, 13, 5, 1, true, this.scale, 12),
                    "walk_straight":    new Animation(this.img, [90, 60], 6, 13, 7, 6, true, this.scale),
                    //"walk_down":        new Animation(this.img, [90, 60], 6, 13, 7, 6, true, this.scale, 6),
                    //"walk_up":          new Animation(this.img, [90, 70], 6, 18, 7, 6, true, this.scale),//90x70
                    //"shoot_up":         new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 6),//90x70
                    "shoot_diagonal":   new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 10),//90x70
                    //"shoot_straight":   new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 14),//90x70                    
                };
                this.animation = this.animations.idle;
            }

            update() {
                /****BEGIN BEHAVIOR****/
                //Turn towards Hero
                if (!this.states.framelocked) {
                    if (this.x - this.game.hero.x < 0) {
                        this.states.facingRight = true;
                        this.facing = 1;
                    }
                    else if ( true ) {
                        this.states.facingRight = false;
                        this.facing = -1;
                    }
                }
                if (this.states.idling && this.states.active) {//FROM: Idle
                    //If Hero is within X and Dino can shoot, shoot!
                    if (Math.abs(this.x - this.hero.x) <= 750 && this.shotCooldownTimer <= 0) {
                        this.states.shooting = true;
                    }
                    else {
                        this.states.walking = true;
                    }
                }
                if (this.states.walking) {
                    if (Math.abs(this.x - this.hero.x) <= 750 && this.shotCooldownTimer <= 0) {
                        this.states.shooting = true;
                        this.states.walking = false;
                    }
                }
                if (this.states.shooting) {
                    if (!this.states.framelocked) {
                        this.game.addEntity(new Rocket(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
                        this.states.framelocked = true;
                    }
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.shooting = false;    
                        this.shotCooldownTimer = this.shotCooldown;
                        this.states.walking = true;
                        this.states.framelocked = false;
                    }
                }

                //Timers
                if (this.shotCooldownTimer > 0) {
                    this.shotCooldownTimer--;
                }

                //Apply Gravity
                this.yVelocity += this.gravity * this.gravity;
                this.y += this.yVelocity;
                this.lastBoundY = this.boundY;
                this.boundY += this.yVelocity;

                //Health checks
                if (this.health <= 0) {
                    this.removeFromWorld = true;
                }
            }

            draw(ctx) {
                if (this.states.idling) {
                    //console.log("idle");
                    this.animation = this.animations.idle;
                }
                if (this.states.walking) {
                    this.animation = this.animations.walk_straight;
                }
                if (this.states.shooting) {
                    //console.log("shoot diagonal");
                    this.animation = this.animations.shoot_diagonal;   
                }
                this.drawImg(ctx);
            }

            collided(other, direction) {
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
            }


            updateHitbox(fWidth, fHeight, bWidth, bHeight) {
                this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth;
                this.boundWidth = this.scale * bWidth;
                this.boundHeight = this.scale * bHeight;
                this.boundX = this.centerX - this.boundWidth / 2;
                this.boundY = this.y - this.boundHeight;
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

        return Dino;
    });