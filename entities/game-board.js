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
        constructor (game, assetManager, ctx, hero, hud) {
            super(game, 0, 0, null, ctx);
            this.game = game;
            this.assetManager = assetManager;
            this.score = 0;
            this.hero = hero;
            this.hud = hud;
            this.level;
            this.checkpoint = 0; //current checkpoint for this.level (-1 is for unloaded)
            this.nextCheck = null;
            this.states = {
                "performanceMode": false,
                "loadedLevel": false,
                "loadedCheckpoint": false,
                "newLevel": false,
                "finalcheck": false,
                "changedCamera": false,
            }
            ////unimplemented, but better than having these in Hero (imo)
            //this.score = score;
            //this.time = time;
        }

        update () {
            if (!this.states.loadedLevel) {
                this.level.load();
                this.checkpoint = 0;
                this.checkCoords = this.level.checkpoints[this.checkpoint];
                this.hero.setPos(this.checkCoords);

                if (this.states.performanceMode) {
                    this.level.populateMap(0);
                }
                else {
                    this.level.populateMap(-1);
                    //this.level.populateMap(0);
                    //this.level.populateMap(1);
                    //this.level.populateMap(2);
                    this.game.addEntity(this.hud);
                    this.game.addEntity(this.hero);
                    this.hero.setPos(this.level.checkpoints[this.checkpoint]);
                }
                this.nextCheck = this.level.checkpoints[this.checkpoint + 1];
                this.states.loadedLevel = true;
                this.states.newLevel = false;
            }
            //loads sections as player moves. Only needed if performance is an issue.

            if (this.nextLevel !== 0 && this.states.finalcheck) {//next level checkpoint
                //this.clearBoard("level");
                this.states.newLevel = true;
                this.states.loadedLevel = false;
                this.getLevel(this.nextLevel);
            }
            else if (Math.abs(this.hero.x - this.nextCheck[0]) <= 5 && !this.level.activatedCheckpoints[this.checkpoint + 1] && !this.states.finalcheck) {//TODO: implement distance function in Hero
                this.checkpoint++;
                if (this.checkpoint + 1 < this.level.checkpoints.length) {
                    this.nextCheck = this.level.checkpoints[this.checkpoint + 1];
                }
                else {
                    this.states.finalcheck = true;
                }
                this.level.activatedCheckpoints[this.checkpoint] = true;
                console.log("checkpoint: " + this.checkpoint);
            }

            if (this.hero.states.respawned) {
                var respawn = this.level.checkpoints[this.checkpoint];
                respawn[1] -= 10;
                //this.clearBoard("level");
                this.hero.respawn();
                this.hero.setPos(respawn);
                console.log("respawn");
            }
            if (this.checkpoint === 3 && !this.states.changedCamera) {
                this.game.camera.absOffY = 2;
                this.states.changedCamera = true;
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