define([
    'entity',
    "animation",
], function (
    Entity,
    Animation,
    ) {

        class Fireball extends Entity {
            constructor(game, x, y, img = null, ctx = null, scale = null) {
                super(game, x, y, img, ctx);
                this.scale = scale;
                this.spriteWidth = 60;
                this.spriteHeight = 60;
                this.centerX = x + ((this.spriteWidth * this.scale) / 2) - this.spriteWidth;
                this.boundWidth = this.spriteWidth * this.scale;
                this.boundHeight = this.scale * (this.spriteHeight - 32);
                this.boundX = this.x - this.spriteWidth;
                this.boundY = this.y - this.spriteHeight * this.scale + 37 * this.scale;

                this.states = {
                    "active": true,
                    "looping": false,
                    "facingRight": true,
                };
                this.animations = {
                    "active": new Animation(this.img, [this.spriteWidth, 128], 9, 13, 5, 6, true, this.scale),
                };
                this.animation = this.animations.active;
            }

            /*Updates the entity each game loop. i.e. what does this entity do? */
            update() {
                super.update();
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

            draw(ctx) {
                if (this.states.active)
                    this.drawImg(ctx);
            }

            drawImg(ctx) {

                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
                this.drawOutline(ctx);
            }
        }
    });
