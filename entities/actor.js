define([
    'entity',
],function(
    Entity,
){


    /***********
    Actor interface
    This interface is designed to encompass any Entity that acts upon the game level. This class should not be instantiated.
    Any action shared between actors is located here.

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Actor extends Entity {
        constructor (game, x, y, img=null, ctx=null, scale=null, spriteWidth = 0, spriteHeight = 0) {
            super(game, x, y, img, ctx);
            this.parentClass = "Entity";

            this.facing = null;
            this.states = null;
            this.animations = null;
            this.animation = null;

            //Added theses post-hoc for better future development. (not currently used in any 'super' construction calls)
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
        }
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();
        }

        /***HELPER FUNCTIONS***/
        updatePos(x, y) {
            this.x += x;
            this.boundX += x;
            this.y += y;
            this.boundY += y;
        }

        setPos(x, y) {
            this.x = x;
            this.boundX = x;
            this.y = y;
            this.boundY = y;
        }
    } 
    return Actor;
});

