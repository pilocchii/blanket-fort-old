define([
    "enemy",
    "terrain",
    "animation",
    "hero",
], function (
    Enemy,
    Terrain,
    Animation,
    Hero,
    ) {


        class Bullet extends Enemy {

            constructor(game, x, y, img = null, ctx = null, scale = 3, facingRight, spriteWidth = 50, spriteHeight = 50) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 7;
                if (!facingRight) { this.x += 100; } else { this.x -= 100 };//offset to match gun
                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = 30;
                this.boundHeight = 30;
                if (facingRight) {
                    this.boundX = this.centerX - (this.boundWidth / 2) - 2*this.spriteWidth; //+100 aligns with the gun
                    this.boundY = this.y - this.boundHeight - (this.spriteHeight) -7; // -7 for pixel padding
                }
                else {
                    this.boundX = this.centerX - (this.boundWidth / 2) + 2*this.spriteWidth;
                    this.boundY = this.y - this.boundHeight - (this.spriteHeight) -7; // -7 for pixel padding
                }

                //Stats
                this.damage = 2;

                this.states = {
                    "active": true,
                    "facingRight": !facingRight,
                };
                this.animations = {
                    "bullet": new Animation(this.img, [spriteWidth, spriteHeight], 2, 18, 20, 2, true, this.scale, 16),
                };
                this.animation = this.animations.bullet;
            }

            update() {
                //TODO

                if (this.states.active) {
                    if (this.states.facingRight) {
                        this.x += this.movementSpeed;
                        this.boundX += this.movementSpeed;
                        //this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y,
                        //    0, 0, this.spriteWidth, this.spriteHeight, 10, 10, this.scale, 50, this.facingRight));
                    } else {
                        this.x -= this.movementSpeed;
                        this.boundX -= this.movementSpeed;
                    }
                    if (this.animation.loops > 1) {
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.steady = false;
                        this.removeFromWorld = true;
                    }
                }
            };

            draw(ctx) {
                if (this.states.active) {
                    this.animation = this.animations.bullet;
                }
                this.drawImg(ctx);
            }

            collided(other) {
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

        return Bullet;
    });
