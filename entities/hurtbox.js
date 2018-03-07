define([
    'actor',
    'animation',
    "terrain",
    "enemy",
    "hero",
], function (
    Actor,
    Animation,
    Terrain,
    Enemy,
    Hero,
    ) {

    /* For copy paste jobs:
        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, offX, offY,
            this.spriteWidth/2, this.spriteHeight/2, hurtWidth, hurtHeight, this.scale, this.damage, this.states.facingRight));   
     */

        class Hurtbox extends Actor {

            //Note that img is required for super(), even though Hurtbox is never animated.
            constructor(game, ctx = null, x, y, offX, offY, parentWidth, parentHeight, hurtWidth, hurtHeight, scale = 3,
                            damage, facingRight = true, isEnemy = false, damageType = "health", frames = 2, persistent = false, img = null) {
                super(game, x, y, img, ctx, "Actor");
                this.movementSpeed = 0;
                this.scale = scale;
                this.isEnemy = isEnemy;
                this.damageType = damageType;

                this.boundWidth = hurtWidth;
                this.boundHeight = hurtHeight;

                this.boundY = y - this.boundHeight + offY;
                this.boundX = x + parentWidth + this.boundWidth + offX;
                //Stats
                this.damage = damage;
                this.frames = frames;
                this.persistent = persistent;


                this.states = {
                    "facingRight": facingRight,
                };
            }

            update() {
                //hitbox persists for two ticks. (two prevents random hitbox "gaps")
                if (this.frames < 0) {
                    //persist
                    //TODO: Figure out why hitbox doesn't persist
                }
                else if(this.frames >= 0) {
                    if (this.frames === 0) {
                        this.removeFromWorld = true;
                    }
                    this.frames--;
                }
            };

            draw(ctx) {
                this.drawImg(ctx);
            }

            collided(other, direction) {
                // collide with terrain
                if (other.name === "Terrain") {
                    //console.log("clink");
                }
                else if (other.name === "Hero") {
                    this.removeFromWorld = true;
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
                //this.drawOutline(ctx);
            }
        }
        return Hurtbox;
    });

