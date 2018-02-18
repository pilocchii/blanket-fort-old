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

    /* For copy paste jobs:
        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, offX, offY,
            this.spriteWidth/2, this.spriteHeight/2, hurtWidth, hurtHeight, this.scale, this.damage, this.states.facingRight));   
     */

        class Hurtbox extends Actor {

            //Note that img is required for super(), even though Hurtbox is never animated.
            constructor(game, ctx = null, x, y, offX, offY, parentWidth, parentHeight, hurtWidth, hurtHeight, scale = 3, damage, facingRight = true, isEnemy = false, img = null) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 0;
                this.scale = scale;
                this.isEnemy = isEnemy;

                this.hurtWidth = hurtWidth;
                this.hurtHeight = hurtHeight;

                this.boundY = y - this.hurtHeight + offY;
                this.boundX = x + parentWidth + this.hurtWidth + offX;
                //Stats
                this.damage = damage;
                this.frames = 1;


                this.states = {
                    "facingRight": facingRight,
                };
            }

            update() {
                //hitbox persists for two ticks. (two prevents random hitbox "gaps")
                if (this.frames === 0) {
                    this.removeFromWorld = true;
                }
                this.frames--;
            };

            draw(ctx) {
                this.drawImg(ctx);
            }

            collided(other, direction) {
                // collide with terrain
                if (other instanceof Terrain) {
                    console.log("clink");
                }
            }

            drawOutline(ctx) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.rect(this.boundX,
                    this.boundY,
                    this.hurtWidth, this.hurtHeight);
                ctx.stroke();
                ctx.closePath();
            }


            drawImg(ctx) {
                this.drawOutline(ctx);
            }
        }

        return Hurtbox;
    });
