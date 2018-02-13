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
            console.log(this.tiles[0])
            for (var i = 0; i < this.tiles.length; i++) {
                let col = this.tiles[i][0]
                let row = this.tiles[i][1]
                ctx.drawImage(this.img, 
                    (col * this.width),
                    // 0, 
                    (row * this.height),
                    // 0,
                    this.width, 
                    // 32, 32,
                    this.height, 
                    this.x + (i * this.width*this.scale), this.y,
                    this.width*this.scale, 
                    this.height*this.scale
                );
                // ctx.drawImage(this.img, 
                //     this.x, this.y, this.width*this.scale, this.height*this.scale
                // );

            }
            this.drawOutline(ctx);
        };
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            // super.update();

        }


    } // end Terrain

    return Terrain;
});



