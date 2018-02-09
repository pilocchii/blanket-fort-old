define([
    'entity',
],function(
    Entity,
){


    class Terrain extends Entity {
         constructor (game, x, y, dimensions, img=null, ctx=null, scale=null, tiles=null) {
            super(game, x, y, img, ctx);
            this.states = null;
            this.animations = null;
            this.animation = null;
            this.tile = tiles;

            this.width = dimensions[0];
            this.height = dimensions[1];
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
            for (var tile in this.tiles) {
                let col = tile[0]
                let row = tile[1]
                ctx.drawImage(this.img, 
                    // col * this.width,
                    0, 
                    // (row * height),
                    0,
                    // this.width, 
                    600, 600,
                    // this.height, 
                    this.width*this.scale, 
                    this.height*this.scale
                );
            }
            this.drawOutline(ctx);
        };
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();

        }


    } // end Terrain

    return Terrain;
});



