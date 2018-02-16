define([
    'actor',
    'animation',
],function(
    Actor,
    Animation,
){


    class Soldier extends Actor {
        constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 40, spriteHeight = 50) {
            super(game, x, y, img, ctx);
            this.movementSpeed = 7;
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;

            this.states = { "demo": false, "running": true, "facingRight": false, };
            this.animations = {
                "demo": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 0, 8, 7, 8, true, this.scale),
                "run": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 0, 8, 7, 4, true, this.scale, 4)
            };
            this.animation = this.animations.demo;
        }

        update() {

            if (this.states.running) {
                this.animation = this.animations.run;
                if (!this.states.facingRight) {
                    this.x += this.movementSpeed;
                    if (this.x > 450) {
                        this.states.facingRight = true;
                    }
                }
                else if (this.states.facingRight) {
                    this.x -= this.movementSpeed;
                    if (this.x < 100) {
                        this.states.facingRight = false;
                    }
                }
                

            }
            else if (this.states.demo && this.animation.currentFrame() >= 5) {
                this.x += this.movementSpeed;
            }
        };

    }
    return Soldier
});


