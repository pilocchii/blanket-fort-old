define([
    "enemy",
    "animation",
    "terrain",
    "rocket",
    "projectile",
    "hurtbox",
], function (
    Enemy,
    Animation,
    Terrain,
    Rocket,
    Projectile,
    Hurtbox,
    ) {


        class Dino extends Enemy {

            constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 90, spriteHeight = 60, patrolDistance = 0, shotTimeOffset = 0) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 2;
                this.hero = this.game.hero;
                this.y = y;
                this.x = x;
                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = this.scale * 35;
                this.boundHeight = this.scale * 35;
                this.boundX = this.centerX - (this.boundWidth / 2);
                this.boundY = this.y - this.boundHeight + (this.spriteHeight / 2);
                this.facing = 1;

                this.startX = x;
                this.maxX = this.startX + patrolDistance; //Change this to alter dino's patrol distance
                
                //Timers
                this.shotCooldown = 500;
                this.shotCooldownTimer = shotTimeOffset;
                //Stats
                this.pointValue = 15
                this.health = 200;
                this.damage = 1;
                this.yVelocity = 0;
                this.sightRadius[0] = 1500;
                this.sightRadius[1] = 1000;

                this.states = {
                    "active": true,
                    "idling": true,
                    "shooting": false,
                    "walking": false,
                    "grounded": false,
                    "patrolling": false,
                    "framelocked": false,
                    "facingRight": true,
                };
                this.animations = {
                    "idle":             new Animation(this.img, [90, 60], 6, 13, 5, 1, true, this.scale, 12),
                    "walk_straight":    new Animation(this.img, [90, 60], 6, 13, 9, 6, true, this.scale),
                    //"walk_down":        new Animation(this.img, [90, 60], 6, 13, 7, 6, true, this.scale, 6),
                    //"walk_up":          new Animation(this.img, [90, 70], 6, 18, 7, 6, true, this.scale),//90x70
                    //"shoot_up":         new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 6),//90x70
                    "shoot_diagonal":   new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 10),//90x70
                    //"shoot_straight":   new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 14),//90x70                    
                };
                if (patrolDistance > 0) {
                    this.states.patrolling = true;
                }
                this.animation = this.animations.idle;
            }

            update() {
                /****BEGIN BEHAVIOR****/
                //Turn towards Hero
                // if (!this.states.framelocked && !this.states.patrolling) {
                //     this.states.patrolling = true;
                if (this.states.patrolling && !this.states.shooting) {
                    this.states.walking = true;
                    if (this.x <= this.startX) {
                        this.states.facingRight = true;
                        this.facing = 1;
                    }
                    if (this.x >= this.maxX) {
                        this.states.facingRight = false;
                        this.facing = -1;
                    }
                }
                else {
                    if (this.x - this.game.hero.x < 0) {
                        this.states.facingRight = true;
                        this.facing = 1;
                    }
                    else {
                        this.states.facingRight = false;
                        this.facing = -1;
                    }
                }

                // }
                if (this.states.walking) {

                    this.x += this.facing * this.movementSpeed;

                    if (this.shotCooldownTimer <= 0 && this.yVelocity === 0
                        && (Math.abs(this.maxX - this.x) <= 5 || Math.abs(this.startX - this.x) <= 5)
                            && Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0] && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.shooting = true;
                        this.states.walking = false;
                    }


                }
                else if (this.states.idling) {
                    if (this.shotCooldownTimer <= 0 && this.yVelocity === 0 && Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0] && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
                        this.states.shooting = true;
                        this.states.idling = false;
                    }                        
                }
                if (this.states.shooting) {

                    if (!this.states.framelocked) {
                        this.game.addEntity(new Rocket(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
                        this.states.framelocked = true;
                    }
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.shooting = false;    
                        this.shotCooldownTimer = this.shotCooldown;
                        if (this.states.patrolling)
                            this.states.walking = true;
                        else
                            this.states.idling = true;
                        this.states.framelocked = false;
                    }
                }

                //Timers
                if (this.shotCooldownTimer > 0) {
                    this.shotCooldownTimer -= 1;
                }

                //Apply Gravity
                this.yVelocity += this.gravity * this.gravity;
                this.y += this.yVelocity;
                this.lastBoundY = this.boundY;
                this.boundY += this.yVelocity;

                //console.log(this.y);
                //Health checks
                if (this.health <= 0) {
                    this.removeFromWorld = true;
                }
            }

            draw(ctx) {
                if (this.states.idling) {
                    this.updateHitbox(90, 60, 50, 45)
                    this.animation = this.animations.idle;
                }
                if (this.states.walking) {
                    this.updateHitbox(90, 60, 50, 45, -this.facing * 10)
                    this.animation = this.animations.walk_straight;
                }
                if (this.states.shooting) {
                    this.updateHitbox(90, 70, 50, 45, -this.facing * 10)
                    this.animation = this.animations.shoot_diagonal;   
                }
                this.drawImg(ctx);
            }

            collided(other, direction) {
                if (other instanceof Terrain) {
                    if (direction === 'bottom') {
                        this.boundY = other.boundY - this.boundHeight;
                        this.y = this.boundY + this.boundHeight; //fix magic number (drawn slightly below hitbox without the 20 offset)
                        this.yVelocity = 0;
                    }

                    else if (direction === 'top') {
                        this.boundY = other.boundY + other.boundHeight;
                        this.y = this.boundY + this.boundHeight;
                        this.lastBoundY = this.boundY;
                    }
                    else if (direction === 'left') {
                        this.boundX = other.boundX + other.boundWidth;
                        this.x = this.boundX + 87;
                        this.states.facingRight = true;
                        this.facing = -1;
                    }
                    else if (direction === 'left') {
                        this.boundX = other.boundX + other.boundWidth;
                        this.x = this.boundX - 87;
                        this.states.facingRight = false;
                        this.facing = 1;
                    }
                }
                if (other instanceof Projectile) {
                    this.health -= other.damage;
                }
                if (other instanceof Hurtbox) {
                    other.hasOwnProperty("isEnemy");
                    other.hasOwnProperty("damage");
                    // blocking from left & right
                    if (!other.isEnemy) {
                        this.health -= other.damage;
                    }
                }
            }


            updateHitbox(fWidth, fHeight, bWidth, bHeight, offX = 0, offY = 0) {
                this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth;
                this.boundWidth = this.scale * bWidth;
                this.boundHeight = this.scale * bHeight;
                this.boundX = this.centerX - this.boundWidth / 2 + offX;
                this.boundY = this.y - this.boundHeight + offY;
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

        return Dino;
    });