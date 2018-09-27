import {Entity} from "../entities"
import {Animation} from "../engine"


/***********
2-D side-scrolling Camera class

xView, yView - position of camera (top left)
canvasWidth, canvasHeight - camera dimensions
worldWidth, worldHeight - dimensions that represent the world's boundary

***********/
class Camera extends Entity {
    constructor(game, xView, yView=0, img=null, ctx=null, canvasWidth, canvasHeight, worldWidth, worldHeight) {
        super(game, xView, yView, img, ctx);
        this.canvasWidth = canvasWidth; //this is the viewport, NOT the same as canvas in core.js
        this.canvasHeight = canvasHeight; //this is the viewport, NOT the same as canvas in core.js
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.absOffX = 2;
        this.absOffY = 1.5;
        this.offX = this.canvasWidth/this.absOffX;
        this.offY = this.canvasHeight / this.absOffY + 100;
        this.camSpeedX = 8;
        this.camSpeedY = 8;


        // possible axis the camera can move in. not implemented yet
        this.axis = {
            "none": false,
            "horizontal": false,
            "vertical": false,
            "both": true
        }

        // object to be followed (the Hero)
        this.followed = null;
    }

    follow (obj) {
        this.followed = obj;
    }

    draw(ctx) {
        //  ctx.setTransform(1, 0, 0, 1, 0, 0); //reset transform matrix
        //  ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // clear viewport after matrix is reset
          ctx.translate(this.xView, this.yView);
        
    }


    update() {
        // Note: this logic feels HORRIBLY wrong, but it works for now, so yay?
        if (this.followed != null) {
            this.updateBounds();
            //TODO: need to figure out world bounds for min and max clamping
            this.xView = -this.followed.x + this.offX;
            this.yView = -this.followed.y + this.offY;
        }
        
         //console.log("xView: " + this.xView);
         //console.log("yView: " + this.yView);
         //console.log("hero x: " + this.followed.x);
         //console.log("hero y: " + this.followed.y);

    }

    updateBounds() {
        if (!(this.offX === this.canvasWidth / this.absOffX)) {
            if (this.offX + 10 < Math.floor(this.canvasWidth / this.absOffX)) { this.offX += this.camSpeedX; }
            else if (this.offX - 10 > Math.floor(this.canvasWidth / this.absOffX)) { this.offX -= this.camSpeedX; }
            else (this.offX = this.canvasWidth / this.absOffX);
        }
        if (!(this.offY === this.canvasHeight / this.absOffY)) {
            if (this.offY + 10 < Math.floor(this.canvasHeight / this.absOffY)) { this.offY += this.camSpeedY; }
            else if (this.offY - 10 > Math.floor(this.canvasHeight / this.absOffY)) { this.offY -= this.camSpeedY; }
            else (this.offY = this.canvasHeight / this.absOffY);
        }
    }

    boundsCheck(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

}
export default Camera;