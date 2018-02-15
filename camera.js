define([
    "animation",
],function(
    Animation,
){

    /***********
    Camera class
    xView, yView - position of camera (top left)
    vportWidth, vportHeight - viewport dimensions
    worldWidth, worldHeight - dimensions that represent the world's boundary

    ***********/
    class Camera {
        constructor(game, ctx, xView, yView, vportWidth, vportHeight, worldWidth, worldHeight) {
            this.game = game;
            this.ctx = ctx;

            // minimum distance from followed object to border before camera starts moving
            this.xDeadZone = 0;
            this.yDeadZone = 0;

            // possible axis the camera can move in
            this.axis = {
                "none": false,
                "horizontal": false,
                "vertical": false,
                "both": true
            }

            // object to be followed (the Hero)
            this.followed = null;

            // rectangle that represents the viewport
            this.viewportRect = ctx.rect(this.xView, this.yView, this.vportWidth, this.vportHeight);

            // rectangle that represents the world's boundary
            this.worldRect = ctx.rect(0,0, worldWidth, worldHeight);
        }

        follow (obj, xDeadZone, yDeadZone) {
            this.followed = obj;
            this.xDeadZone = xDeadZone;
            this.yDeadZone = yDeadZone;
        }

        update() {
            if (this.followed != null) {

                if (this.axis.horizontal || this.axis.both) {

                    if (this.followed.x - this.xView + this.xDeadZone > this.vportWidth) {
                        this.xView = this.followed.x - (this.vportWidth - this.xDeadZone);

                    } else if (this.followed.x - this.xDeadZone < this.xView) {
                        this.xView = this.followed.x - this.xDeadZone;
                    }

                } if (this.axis.vertical || this.axis.both) {
                    if (this.followed.y - this.yView + this.yDeadZone > this.vportHeight) {
                        this.yView = this.followed.y - (this.vportHeight - this.yDeadZone);

                    } else if (this.followed.y - this.yDeadZone < this.yView) {
                        this.yView = this.followed.y - this.yDeadZone;
                    }
                }
            }
            // Update viewport
            this.viewportRect = ctx.rect(this.xView, this.yView, this.vportWidth, this.vportHeight);

            // Prevent camera from leaving world boundary
            if (this.viewportRect.x < this.worldRect.x) {
                this.xView = this.worldRect.x;
            }

            if (this.viewportRect.x > this.worldRect.x + this.worldRect.worldWidth) {
                this.xView = (this.worldRect.x + this.worldRect.worldWidth) - this.vportWidth;
            }

            if (this.viewportRect.y < this.worldRect.y) {
                this.yView = this.worldRect.y;
            }

            if (this.viewportRect.y > this.worldRect.y + this.worldRect.worldHeight) {
                this.yVew = (this.worldRect.y + this.worldRect.worldHeight) - this.vportHeight;
            }


        }

    }

    return Camera;

});