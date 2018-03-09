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
            this.nextCheck = null;
            this.states = {
                "performanceMode": false,
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
                if (this.states.performanceMode) {
                    this.level.populateMap(0);
                }
                else {
                    this.level.populateMap(0);
                    this.level.populateMap(1);
                    this.level.populateMap(2);
                    this.game.addEntity(this.hero);
                }
                this.nextCheck = this.level.checkpoints[this.checkpoint + 1];
                this.states.loadedLevel = true;
            }
            //loads sections as player moved. Only needed if performance is an issue.
            if (Math.abs(this.hero.x - this.nextCheck[0]) <= 5 && !this.level.activatedCheckpoints[this.checkpoint + 1]) {//TODO: implement distance function in Hero
                if (this.states.performanceMode) {
                    this.level.populateMap(this.checkpoint + 1);
                    this.level.activatedCheckpoints[this.checkpoint] = true;
                    this.checkCoords = this.level.checkpoints[this.checkpoint];
                }
                this.checkpoint++;
                this.nextCheck = this.level.checkpoints[this.checkpoint + 1];
                this.level.activatedCheckpoints[this.checkpoint] = true;
                console.log("checkpoint: " + this.checkpoint);
            }
            if (this.hero.states.respawned) {
                var respawn = this.level.checkpoints[this.checkpoint];
                //this.clearBoard("level");
                this.hero.respawn();
                this.hero.setPos(respawn);
                console.log("respawn");
            }
        }

        draw(ctx) {

        }

        clearBoard(scope) {
            //scope will range from actors only, to the entire level.
            if (scope === "actors") {
                for (let i = 0; i < this.game.entitiesCount; i++) {
                    let entity = this.game.entities[i];
                    if (entity.parentClass === "Enemy" || (entity.parentClass === "Actor" && entity.name !== "Hero")
                        || entity.type === "Hazard" || entity.name === "Item") {
                        entity.removeFromWorld = true;
                    }
                }
            }
            else if (scope === "level") {
                for (let i = 0; i < this.game.entitiesCount; i++) {
                    let entity = this.game.entities[i];
                    if (entity.parentClass === "Enemy" || (entity.parentClass === "Actor" && entity.name !== "Hero")
                        || entity.type === "Hazard" || entity.name === "Item" || entity.name === "Terrain") {
                        entity.removeFromWorld = true;
                    }
                }
            }
            console.log("Board Cleared");
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