define([
    'actor',
    'animation',
    "hurtbox",
    "bullet",
    "terrain",
], function (
    Actor,
    Animation,
    Hurtbox,
    Bullet,
    Terrain,
    ) {


        class Projectile_Sword extends Actor {

            constructor(game, x, y, img = null, ctx = null, scale = 3, facingRight, spriteWidth = 90, spriteHeight = 60) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 10;
                if (facingRight) { this.x += 95; } else { this.x -= 95 };//offset to match gun
                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = 180;
                this.boundHeight = 120;
                this.boundX = this.centerX - (this.boundWidth / 2);
                this.boundY = this.y - this.boundHeight;
                this.lastBoundY = this.boundY; // This will help stop Hero from slipping at edges, particularly for horizontally longer blocks of terrain

                //Stats
                this.health = 5;
                this.damage = 500;
                this.states = {
                    "starting": true,
                    "stablized": false,
                    "recovering": false,
                    "facingRight": facingRight
                };
                this.animations = {
                    "start": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 4, 18, 7, 2, false, this.scale, 11),
                    "stable": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 4, 18, 7, 1, true, this.scale, 13),
                    "recovery": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 4, 18, 7, 4, false, this.scale, 14),
                };
                this.animation = this.animations.start;
            }

            update() {
                //TODO

                if (this.states.facingRight) {
                    this.x += this.movementSpeed;
                    this.boundX += this.movementSpeed;

                } else {
                    this.x -= this.movementSpeed;
                    this.boundX -= this.movementSpeed;
                    
                }

                if (this.states.starting) {
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.starting = false;
                        this.states.stablized = true;
                    }
                }
                else if (this.states.stablized) {
                    if (this.animation.loops > 1) {
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.stablized = false;
                        this.states.recovering = true;
                    }
                }
                else if (this.states.recovering) {
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.removeFromWorld = true;
                    }
                }
                if (!this.states.recovering) {//Hurtbox  active unless in recovery frames
                    if(this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -100, 100,
                            this.spriteWidth, this.spriteHeight, 150, 100, this.scale, this.damage, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.boundX, this.boundY, -100 - this.spriteWidth - 200, 100,
                            this.spriteWidth, this.spriteHeight, 150, 100, this.scale, this.damage, this.states.facingRight));  
                }

            };

            draw(ctx) {
                if (this.states.starting) {
                    this.animation = this.animations.start;
                }
                if (this.states.stablized) {
                    this.animation = this.animations.stable;
                }
                else if (this.states.recovering) {
                    this.animation = this.animations.recovery;
                }
                this.drawImg(ctx);
            }

            //collided(other, direction) {
            //    if (other.name ===  "Terrain") {
            //        this.removeFromWorld = true;
            //    }
            //    else if (other.name ===  "Bullet") {
            //        this.health -= other.damage;
            //    }
            //    if (this.health <= 0) {
            //        this.removeFromWorld = true;
            //    }
            //}

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

        return Projectile_Sword;
    });
