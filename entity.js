define([

],function(

){
    /***********
    Entity class

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Entity {

        constructor (game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.removeFromWorld = false;
        }

        /*
        Updates the entity each game loop
        i.e. what does this entity do?
        */
        update () {
        }

        /*
        Draws this entity
        */
        draw (ctx) {
            if (this.game.showOutlines && this.radius) {
                ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.stroke();
                ctx.closePath();
            }
        }

        /*
        todo: what does this do?
        */
        rotateAndCache (image, angle) {
            var offscreenCanvas = document.createElement('canvas');
            var size = Math.max(image.width, image.height);
            offscreenCanvas.width = size;
            offscreenCanvas.height = size;
            var offscreenCtx = offscreenCanvas.getContext('2d');
            offscreenCtx.save();
            offscreenCtx.translate(size / 2, size / 2);
            offscreenCtx.rotate(angle);
            offscreenCtx.translate(0, 0);
            offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
            offscreenCtx.restore();
            //offscreenCtx.strokeStyle = "red";
            //offscreenCtx.strokeRect(0,0,size,size);
            return offscreenCanvas;
        }


    } // end of Entity class

    return Entity;
});