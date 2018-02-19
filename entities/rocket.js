define([
    "enemy",
    "terrain",
    "animation",
    "hero",
    "projectile",
], function (
    Enemy,
    Terrain,
    Animation,
    Hero,
    Projectile,
    ) {


        class Rocket extends Enemy {

            constructor(game, x, y, img = null, ctx = null, scale = 3, facingRight, spriteWidth = 50, spriteHeight = 50) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 3;
                this.pointValue = -5;
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
                this.damage = 2;
                this.health = 150;

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
                if (this.x - this.game.hero.x < 0) {
                    this.states.facingRight = true;
                    this.facing = 1;
                }
                else {
                    this.states.facingRight = false;
                    this.facing = -1;
                }
                if (this.states.active) {//TODO Tracking behavior
                        this.x += this.facing*this.movementSpeed;
                        this.boundX += this.facing*this.movementSpeed;
                        if (this.y - this.game.hero.y > 0) {// below hero;
                            this.y -= 2;
                            this.boundY -= 2;
                        }
                        else {
                            this.y += 2;
                            this.boundY += 2;
                        }
                    //if (this.animation.loops > 7) {
                    //    this.animation.elapsedTime = 0;
                    //    this.animation.loops = 0;
                    //    this.removeFromWorld = true;
                    //}
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
                if (other instanceof Terrain) {
                    this.removeFromWorld = true;
                }
                else if (other instanceof Hero) {
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
                this.drawOutline(ctx);
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            }
        }

        return Rocket;
    });