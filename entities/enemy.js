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
                this.parentClass = "Actor";
                this.movementSpeed = 0;
                this.damageType = "health";
                this.pointValue = 0;//Define this explicitly for relevant enemies
                //TODO (future development) make sight radius a part of Enemy definition for use in super constructors
                this.sightRadius = [900, 300] // x, y distance from current location
            }

            update() {
                super.update();
            }
        }
        return Enemy;
    });