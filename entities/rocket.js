define([
    "enemy",
    "terrain",
    "animation",
    "hero",
    "projectile",
    "actor",
], function (
    Enemy,
    Terrain,
    Animation,
    Hero,
    Projectile,
    Actor,
    ) {


        class Rocket extends Enemy {

            constructor(game, x, y, img = null, ctx = null, scale = 3, facingRight, spriteWidth = 50, spriteHeight = 50) {
                super(game, x, y, img, ctx);
                this.parentClass = "Enemy";
                this.xSpeed = 8;
                this.ySpeed = 4;
                this.maxX = 8;
                this.maxY = 4;
                this.xAccel = .25;
                this.yAccel = .1;
                this.y -= 70
                if (!facingRight) { this.x -= 100; } else { this.x += 100 };//offset to match gun
                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = 30;
                this.boundHeight = 30;
                if (facingRight) {
                    this.boundX = this.centerX - (this.boundWidth / 2) + 120; //+100 aligns with the gun
                    this.boundY = this.y - this.boundHeight - (this.spriteHeight);
                }
                else {
                    this.boundX = this.centerX - (this.boundWidth / 2) + 2 * this.spriteWidth - 180;
                    this.boundY = this.y - this.boundHeight - (this.spriteHeight);
                }

                //Stats
                this.damageType = "energy";
                this.damage = 2;
                this.health = 50;

                this.states = {
                    "active": true,
                    "facingRight": facingRight,
                };
                this.animations = {
                    "rocket": new Animation(this.img, [90, 60], 6, 20, 5, 7, true, this.scale, 13),
                };
                this.animation = this.animations.rocket;
                if (this.states.facingRight) { this.facing = 1; } else { this.facing = -1;}
            }

            update() {
                //TODO
                if (!this.states.facingRight && this.x - this.game.hero.x < 0) {
                    this.states.facingRight = true;
                    this.facing = 1;
                }
                else if (this.states.facingRight && this.x - this.game.hero.x >= 0) {
                    this.states.facingRight = false;
                    this.facing = -1;
                }
                if (this.states.active) {//TODO Tracking behavior
                    if ((this.xSpeed < this.maxX && this.facing === 1) || (this.xSpeed > -this.maxX && this.facing === -1)) {
                        this.xSpeed += this.facing * this.xAccel;
                    }
                    this.x += this.xSpeed;
                    this.boundX += this.xSpeed;
                    if (this.y - this.game.hero.y >= 0) {// below hero;
                        if (this.ySpeed > -this.maxY) {
                            this.ySpeed -= this.yAccel;
                        }
                        this.y += this.ySpeed;
                        this.boundY += this.ySpeed;
                    }
                    else {// above hero
                        if (this.ySpeed < this.maxY) {
                            this.ySpeed += this.yAccel;
                        }
                        this.y += this.ySpeed;// + Math.floor(Math.abs(this.y - this.game.hero.y) / 300) * 1.5;
                        this.boundY += this.ySpeed;// + Math.floor(Math.abs(this.y - this.game.hero.y) / 300) * 1.5;
                    }
                    if (this.animation.loops > 15) {
                        this.animation.reset();
                        this.animation.reset();
                        this.removeFromWorld = true;
                    }
                }
            };

            draw(ctx) {
                if (this.states.active) {
                    this.animation = this.animations.rocket;
                }
                this.drawImg(ctx);
            }

            collided(other, direction) {
                // collide with terrain
                if (other.name ===  "Terrain") {
                    if (this.animation.loops > 3)
                        this.removeFromWorld = true;
                }
                else if (other.name === "Hero" || other.name === "Projectile") {
                    this.removeFromWorld = true;
                }
            }

            updateHitbox(fWidth, fHeight, bWidth, bHeight) {
                this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth + 5;
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
                //this.drawOutline(ctx);
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            }
        }

        return Rocket;
    });