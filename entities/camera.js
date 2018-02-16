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

        draw() {
            this.animation.drawFrame(1, ctx, this.xView, this.yView, null, true);
        }


        update() {
            if (this.followed != null) {

                if (this.followed.x + this.canvasWidth/2 < 0) {
                    this.xView = 0;
                }

                else if (this.followed.x > this.worldWidth) {
                    this.xView = this.worldWidth;
                }
                else this.xView = this.followed.x;

                if (this.followed.y + this.canvasHeight/2 < 0) {
                    this.yView = 0;
                }

                else if (this.followed.y + this.canvasHeight/2 > this.worldHeight) {
                    this.yView = this.worldHeight;
                }

                else this.yView = this.followed.y;
            
            }
            
            console.log("xView: " + this.xView);
            console.log("yView: " + this.yView);

        }

    }
    return Camera;

});