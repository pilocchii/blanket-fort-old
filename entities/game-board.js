define([
    "entity",
    "levels",
],function(
    Entity,
    Levels,
){

    /**************
    GameBoard class
    **************/
    class GameBoard extends Entity {

        // so this prototype.call() is calling the Entity constructor with (game=null, x=0, y=0)
        constructor (game, assetManager, ctx, hero) {
            super(game, 0, 0, null, ctx);
            this.game = game;
            this.assetManager = assetManager;
            this.hero = hero;
            this.level;
            this.checkpoint = 0; //current checkpoint for this.level (-1 is for unloaded)
            this.checkCoords = null;
            this.states = {
                "loadedLevel": false,
                "loadedCheckpoint": false,
                "newLevel": false,
            }
            ////unimplemented, but better than having these in Hero (imo)
            //this.score = score;
            //this.time = time;
        }

        update () {
            if (!this.states.loadedLevel) {
                this.level.load();
                this.checkCoords = this.level.checkpoints[this.checkpoint];
                this.hero.setPos(this.checkCoords);
                ////placeholder populates until checkpoint system is actually finished
                this.level.populateMap(0);
                this.level.populateMap(1);
                this.level.populateMap(2);
                this.states.loadedLevel = true;
            }
            //if (Math.abs(this.hero.x - this.checkCoords[0]) <= 5 && !this.states.loadedCheckpoint) {//TODO: implement distance function in Hero
            //    this.level.populateMap(this.checkpoint);
            //    this.checkpoint++;
            //    this.checkCoords = this.level.checkpoints[this.checkpoint];
            //    this.states.loadedCheckpoint = true;
            //}
        }

        draw(ctx) {

        }

        clearBoard(scope) {

        }

        getLevel(level) {
            if (level === 1) {
                this.level = new Levels["level-one"](this.game, this.assetManager, this.ctx);
            }
            if (level === 2) {
                this.level = new Levels["level-two"](this.game, this.assetManager, this.ctx)
            }
        }

        //on hero death, pause game updates and save states of all entities prior to the checkpoint
    } // end GameBoard class

    return GameBoard;
});