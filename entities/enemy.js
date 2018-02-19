define([
    "actor",
    "animation",
], function (
    Actor,
    Animation,
    ) {


        class Enemy extends Actor {

            constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth, spriteHeight) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 0;
                this.pointValue = 10;
                this.sightRadius = [900, 300] // x, y distance from current location
                //for demo
            }

            update() {
                super.update();
            }
        }
        return Enemy;
    });