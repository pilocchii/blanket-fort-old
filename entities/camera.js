define([
    "entity",
    "animation"
],function(
    Entity,
    Animation
){

    /***********
    Camera class
    xView, yView - position of camera (top left)
    canvasWidth, canvasHeight - camera dimensions
    worldWidth, worldHeight - dimensions that represent the world's boundary

    ***********/
    class Camera extends Entity {
        constructor(game, xView, yView=0, img=null, ctx=null, canvasWidth, canvasHeight, worldWidth, worldHeight) {
            super(game, xView, yView, img, ctx);
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.worldWidth = worldWidth;
            this.worldHeight = worldHeight;


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
             ctx.setTransform(1, 0, 0, 1, 0, 0); //reset transform matrix
             ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // clear viewport after matrix is reset
            ctx.translate(this.xView, this.yView);
        }


        update() {
            if (this.followed != null) {

                if (-this.followed.x + this.canvasWidth/2 < 0) {
                    this.xView = 0;
                }

                else if (-this.followed.x > this.worldWidth - this.canvasWidth) {
                    this.xView = this.worldWidth- this.canvasWidth;
                }
                else this.xView = -this.followed.x + this.canvasWidth/2;

                if (-this.followed.y + this.canvasHeight/2 < 0) {
                    this.yView = 0;
                }

                else if (-this.followed.y + this.canvasHeight/2 > this.worldHeight - this.canvasHeight) {
                    this.yView = this.worldHeight - this.canvasHeight;
                }

                else this.yView = -this.followed.y + this.canvasHeight/2;
            
            }
            
            // console.log("xView: " + this.xView);
            // console.log("yView: " + this.yView);

        }

    }
    return Camera;

});