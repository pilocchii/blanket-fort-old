define([
    "animation",
],function(
    Animation,
){

    /***********
    Entity class

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Entity {

        constructor (game, x, y, img=null, ctx=null) {
            this.name = this.constructor.name;
            this.game = game;
            this.x = x;
            this.y = y;
            this.gravity = .9;
            this.img = img;
            this.removeFromWorld = false;
            this.ctx = ctx;

            // used for simple rect hitbox
            this.boundX = null;
            this.boundY = null;
            this.boundWidth = null;
            this.boundHeight = null;
        }

        // TODO, implement a list of bounding shapes, iterate through depending on type (circle or rect) 
        rectangle () {

        }
        circle () {

        }
 

        /* Draws the outline of this entity */
        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }

        /*
        Updates the entity each game loop
        i.e. what does this entity do?
        */
        update () { }

        /* Draws this entity. Called every cycle of the game engine. */
        draw (ctx) {
            if (this.game.showOutlines && this.boundX) {
                drawOutline(ctx)
            }
            if (this.img) {
                this.animation.drawFrame(this.clockTick, ctx, this.x, this.y, true);
            }
        }

        /*
        Collision detection, rectangle
        */
        isColliding(other) {
            let rect1 = {
                "x" : this.boundX,
                "y" : this.boundY,
                "width" : this.boundWidth,
                "height": this.boundHeight
            }

            let rect2 = {
                "x" : other.boundX,
                "y" : other.boundY,
                "width" : other.boundWidth,
                "height": other.boundHeight
            }

            if(rect1.x < rect2.x + rect2.width && 
                rect1.x + rect1.width > rect2.x && 
                rect1.y < rect2.y + rect2.height && 
                rect1.height + rect1.y > rect2.y) {
                // collision detected!
                return true
            }
            return false

        }

        collided(other) {
            //console.log(`${this.name} colliding with ${other.name}` )
        }
    } // end of Entity class

    return Entity;
});
