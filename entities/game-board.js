define([
    "entity",
],function(
    Entity,
){

    /**************
    GameBoard class
    **************/
    class GameBoard extends Entity {

        // so this prototype.call() is calling the Entity constructor with (game=null, x=0, y=0)
        constructor (game, hero) {
            super(game, 0, 0);
        }

        update () {
            
        }

        draw(ctx) {

        }

        clearBoard(scope) {

        }

        //on hero death, pause game updates and save states of all entities prior to the checkpoint
    } // end GameBoard class

    return GameBoard;
});