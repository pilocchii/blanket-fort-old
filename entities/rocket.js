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
                this.movementSpeed = 7;
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
                    this.boundX = this.centerX - (this.boundWidth / 2) + 180; //+100 aligns with the gun
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
            }

            update() {
                //TODO

                if (this.states.active) {//TODO Tracking behavior
                    if (this.states.facingRight) {
                        this.x += this.movementSpeed;
                        this.boundX += this.movementSpeed;
                        //this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y,
                        //    0, 0, this.spriteWidth, this.spriteHeight, 10, 10, this.scale, 50, this.facingRight));
                    } else {
                        this.x -= this.movementSpeed;
                        this.boundX -= this.movementSpeed;
                    }
                    if (this.animation.loops > 7) {
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.steady = false;
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