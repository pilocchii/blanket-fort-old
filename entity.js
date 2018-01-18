define([
    'animation'
],function(
    Animation
){

    /***********
    Entity class

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Entity {

        constructor (game, x, y, img=null, jsondata=null, ctx=null) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.img = img;
            this.jsondata = jsondata;
            this.removeFromWorld = false;
            this.ctx = ctx;
        }


        /*
        Draws the outline of this entity
        */
        drawOutline (ctx) {
            ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.stroke();
                ctx.closePath();
        }

        /*

        */
        drawImg (ctx) {
            if (!this.animation) {
                //this.animation = new Animation(this.img, [50, 50], 1, 11, 4, 11, true, 3);

            }
            this.animation.drawFrame(1, ctx, this.x, this.y, "run");
        }


        /*
        Updates the entity each game loop
        i.e. what does this entity do?
        */
        update () {
            // this.drawImg(this.ctx);
        }

        /*
        Draws this entity. Called every cycle of the game engine.
        */
        draw (ctx) {
            if (this.game.showOutlines && this.radius) {
                drawOutline(ctx)
            }
            if (this.img) {
                this.drawImg(ctx)
            }
        }

        /*
        todo: probably not necessary
        */
        rotateAndCache (image, angle) {
            let offscreenCanvas = document.createElement('canvas');
            let size = Math.max(image.width, image.height);
            offscreenCanvas.width = size;
            offscreenCanvas.height = size;
            let offscreenCtx = offscreenCanvas.getContext('2d');
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


    /***********
    Actor class
    This class encompasses any Entity that acts upon the game level

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Actor extends Entity {

        /*
        Updates the entity each game loop
        i.e. what does this entity do?
        */
        update () {
            super.update()
        }

        

       


    } // end of Entity class


    class Hero extends Entity {
        
    }


    return {
        "Entity": Entity,
        "Hero": Hero
    };
});