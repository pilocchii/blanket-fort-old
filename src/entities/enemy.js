import Animation from "../animation"
import {Actor} from "./"


class Enemy extends Actor {

    //constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth, spriteHeight) {
    constructor({
        game,
        x,
        y,
        img,
        ctx,

        parentClass = "Actor",
        movementSpeed = 0,
        damageType = "health",
        pointValue = 0,
        sightRadius = [900, 300],
        yVelocity = 0,
        scale = 3,
        spriteWidth = 0,
        spriteHeight = 0,



    } = {}) {
        super(game, x, y, img, ctx);


        this.parentClass = parentClass;
        this.movementSpeed = movementSpeed;
        this.damageType = damageType;
        //Define this explicitly for relevant enemies
        this.pointValue = pointValue;
        // x, y distance from current location
        this.sightRadius = sightRadius; 
        this.yVelocity = yVelocity;
        this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
    }

    update() {
        super.update();
    }
}

export default Enemy;