define([
    'actor',
    'animation',
],function(
    Actor,
    Animation,
){


    class Flames extends Actor {

        constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 20, spriteHeight = 40) {
            super(game, x, y, img, ctx);
            this.movementSpeed = 1;
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;

            this.states = { "active": false, "facingRight": false, };
            this.animations = { "demo": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 8, 9, 10, 9, true, this.scale) };
            this.animation = this.animations.demo;
        }

        update() {
            //TODO
            if (this.isDone) {
                this.elapsedTime = 0;
                this.x = this.origX;
                this.y = this.origY;
            }
        };
    }


    return {
        "Flames": Flames,
    };
});



   