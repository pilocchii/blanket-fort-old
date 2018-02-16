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
            this.tiles = tiles;
            this.scale = scale;
            this.width = dimensions[0];
            this.height = dimensions[1];

            this.boundX = this.x;
            this.boundY = this.y+6;
            this.boundWidth = 75;
            this.boundHeight = 75;
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
            if (this.tiles != null) {
            for (var i = 0; i < 1; i++) {
                let col = this.tiles[0]
                let row = this.tiles[1]
                this.drawOutline(ctx);
                ctx.drawImage(this.img, 
                    (col * this.width),
                    (row * this.height),
                    this.width,
                    this.height, 
                    this.x + (i * this.width), this.y,
                    this.width*this.scale, 
                    this.height*this.scale
                );
            }
            }
        }
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();

        }
    } // end Terrain

    return Terrain;
});
