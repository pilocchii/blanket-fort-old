define([
    'entity',
],function(
    Entity,
){


    class Terrain extends Entity {
         constructor (game, x, y, img=null, jsondata=null, ctx=null, scale=null) {
            super(game, x, y, img, jsondata, ctx);
            this.states = null;
            this.animations = null;
            this.animation = null;

            this.boundX = this.x;
            this.boundY = this.y;
            this.boundWidth = 500;
            this.boundHeight = 50;
        }

        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, 
                this.boundWidth, this.boundHeight);
            ctx.stroke();
            ctx.closePath();
        }

        draw(ctx) {
            this.drawImg(ctx);
        };

        drawImg(ctx) {
            this.drawOutline(ctx);
        }
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();

        }
    } // end Terrain

    return Terrain;
});



