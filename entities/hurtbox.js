define([
    'actor',
    'animation',
    "terrain",
    "enemy",
], function (
    Actor,
    Animation,
    Terrain,
    Enemy,
    ) {


        class Hurtbox extends Actor {

            //Note that img is required for super(), even though Hurtbox is never animated.
            constructor(game, ctx = null, x, y, offX, offY, boxWidth, boxHeight, boundWidth, boundHeight, scale = 3, damage, facingRight = true, img = null) {
                super(game, x, y, img, ctx);
                if (facingRight) { this.x += offX } else { this.x -= (2*boundWidth + offX); }
                this.y += offY;
                this.movementSpeed = 0;
                this.scale = scale;

                this.centerX = this.x + ((boxWidth * scale) / 2) - boxWidth;
                this.boundWidth = boundWidth;
                this.boundHeight = boundHeight;
                this.boundX = this.centerX + (this.boundWidth / 2);
                this.boundY = this.y - this.boundHeight - (boxHeight - 10);

                //Stats
                this.damage = damage;
                this.frames = 1;


                this.states = {
                    "active": true,
                    "facingRight": facingRight,
                };
                this.animations = {

                };
            }

            update() {
                //hitbox persists for a single frame.
                //Keeping this as an if in case we want semi-persistent hurtboxes
                if (this.frames === 1) {
                    this.removeFromWorld = true;
                }
                this.frames--;
            };

            draw(ctx) {
                this.drawImg(ctx);
            }

            collided(other) {
                // collide with terrain
                if (other instanceof Terrain) {
                    console.log("clink");
                }
                else if (other instanceof Enemy) {
                    this.ctx.strokeStyle = "blue";
                }
            }

            drawOutline(ctx) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.rect(this.boundX,
                    this.boundY,
                    this.boundWidth, this.boundHeight);
                ctx.stroke();
                ctx.closePath();
            }


            drawImg(ctx) {
                this.drawOutline(ctx);
            }
        }

        return Hurtbox;
    });

