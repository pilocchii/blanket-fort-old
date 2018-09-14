import Animation from "../animation"
import {
    Actor,
    Terrain,
    Enemy,
    Hero,
} from "./"


/* For copy paste jobs:
    this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, offX, offY,
        this.spriteWidth/2, this.spriteHeight/2, hurtWidth, hurtHeight, this.scale, this.damage, this.states.facingRight));   
 */
class Reflectbox extends Actor {

    //Note that img is required for super(), even though Reflectbox is never animated.
    constructor(game, ctx = null, x, y, offX, offY, parentWidth, parentHeight, hurtWidth, hurtHeight, scale = 3, facingRight = true, parent = null, frames = 2, img = null) {
        super(game, x, y, img, ctx);
        this.parentClass = "Actor";
        this.parent = parent
        this.movementSpeed = 0;
        this.scale = scale;

        this.boundWidth = hurtWidth;
        this.boundHeight = hurtHeight;

        this.boundY = y - this.boundHeight + offY;
        if (facingRight) {
            this.boundX = x + parentWidth + this.boundWidth + offX;
        }
        else {
            this.boundX = x - this.boundWidth - offX;
        }
        //Stats

        this.frames = frames;
        if (facingRight) {
            this.facing = 1;
        }
        else {
            this.facing = -1;
        }

        this.states = {
            "facingRight": facingRight,
        };
    }

    update() {
        //hitbox persists for two ticks. (two prevents random hitbox "gaps")
        if (this.frames >= 0) {
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
        if (other.name === "Bullet") {
            console.log("SUCCESS!")
            //other.states.facingRight = !other.states.facingRight;
            //other.name = "Projectile";
            //other.damage = 1;
        }
        if (other.name === "Rocket") {
            console.log("NO SOUP FOR YOU!");
            other.pointValue = 5;
            other.removeFromWorld = true;
            if (this.parent !== null) {
                //this.parent.energy += 10;
                this.parent.energyCooldown /= 4.2;
            }
        }
        if (other.name === "Bomb") {
            other.xVelocity = -this.facing * 5;
            other.yVelocity = -20;
            other.damage = 50;
            other.states.reflected = true;
        }
    }

    drawOutline(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.rect(this.boundX,
            this.boundY,
            this.boundWidth, this.boundHeight);
        ctx.stroke();
        ctx.closePath();
    }


    drawImg(ctx) {
        if (this.game.drawBoxes) {
            this.drawOutline(ctx);
        }
    }
}
export default Reflectbox;