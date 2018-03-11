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
            this.checkNode = null;
            this.lastCheckpoint = null;
            this.cameraCheck = null;
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
                this.level.populateMap(-1);
                this.game.addEntity(this.hud);
                this.game.addEntity(this.hero);
                //this.hero.setPos(this.level.checkpoints[this.checkpoint]);
                //this.nextCheck = this.level.checkpoints[this.checkpoint + 1];
                this.hero.setPos([this.checkNode.x, this.checkNode.y])
                this.nextNode = this.checkpoints.next;
                this.states.loadedLevel = true;
                this.states.newLevel = false;
            }
            //loads sections as player moves. Only needed if performance is an issue.

            //if (this.nextLevel !== 0 && this.states.finalcheck) {//next level checkpoint
            //    //this.clearBoard("level");
            //    this.states.newLevel = true;
            //    this.states.loadedLevel = false;
            //    this.getLevel(this.nextLevel);
            //}
            //else if (Math.abs(this.hero.x - this.nextCheck[0]) <= 5 && !this.level.activatedCheckpoints[this.checkpoint + 1] && !this.states.finalcheck) {//TODO: implement distance function in Hero
            //    this.checkpoint++;
            //    if (this.checkpoint + 1 < this.level.checkpoints.length) {
            //        this.nextCheck = this.level.checkpoints[this.checkpoint + 1];
            //    }
            //    else {
            //        this.states.finalcheck = true;
            //    }
            //    this.level.activatedCheckpoints[this.checkpoint] = true;
            //    console.log("checkpoint: " + this.checkpoint);
            //}
            //If at next checkpoint
            if (!this.checkNode.states.isBack && this.hero.x >= this.checkNode.next.x) {
                //at next checkpoint
                this.checkNode.states.active = false;
                this.checkNode = this.checkNode.next;
                if (!this.checkNode.states.activated) {
                    this.checkNode.states.activated = true;
                    this.lastCheckpoint = this.checkNode;
                }
                this.checkNode.states.active = true;
                this.game.camera.absOffX = this.checkNode.camOffX;
                this.game.camera.absOffY = this.checkNode.camOffY;
            }
            else if (!this.checkNode.states.isFront && this.hero.x < this.checkNode.x
                        && this.hero.x >= this.checkNode.prev.x) {
                this.checkNode.states.active = false;
                this.checkNode = this.checkNode.prev;
                this.checkNode.active = true;
                this.game.camera.absOffX = this.checkNode.camOffX;
                this.game.camera.absOffY = this.checkNode.camOffY;
            }

            ////Check if camera should be offset
            //if (this.hero.x - this.cameraCheck >= 0 && this.game.camera.absOffY !== 2) {
            //    this.game.camera.absOffY = 2;
            //    this.states.changedCamera = true;
            //}
            //else if (this.hero.x - this.cameraCheck < 0 && this.game.camera.absOffY !== 1.5) {
            //    this.game.camera.absOffY = 1.5;
            //}

            if (this.hero.states.respawned) {
                //this.clearBoard("level");
                this.hero.respawn();
                this.hero.setPos([this.lastCheckpoint.x, this.lastCheckpoint.y - 10]);
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
                this.level = new Levels["level-two"](this.game, this.assetManager, this.ctx);
                //Should move this into the LevelTwo class
                var currCheckPos = this.level.checkpoints[0];
                var currCheckX = currCheckPos[0];
                var currCheckY = currCheckPos[1];
                var listFront = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, 0, this.level.camVals[0], null, null);
                listFront.states.isFront = true;
                this.states.hasPrev = false;
                listFront.num = 0;
                listFront.active = true;
                listFront.activated = true;
                var currCheck = null;
                var prevCheck = listFront;
                //instantiate checkpoint linked list
                for (var i = 1; i < this.level.checkpoints.length; i++) {
                    currCheckPos = this.level.checkpoints[i];
                    console.log(currCheckPos);
                    currCheckX = currCheckPos[0];
                    currCheckY = currCheckPos[1];
                    if (i === this.level.checkpoints.length - 1) {
                        currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], null, prevCheck);
                        currCheck.states.hasNext = false;
                        currCheck.states.isBack = true;
                    }
                    else {
                        currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], null, prevCheck);
                        currCheck.num = i;
                        currCheck.states.hasNext = true;
                    }
                    currCheck.num = i;
                    prevCheck.addNext(currCheck);
                    prevCheck.setBounds();
                    prevCheck = currCheck;
                }
                currCheck.setBounds();
                ///*DBG*/
                //var printCheck = listFront;
                //while (printCheck !== null) {
                //    console.log("Stats: " + printCheck.states.hasNext + ", " + printCheck.num + ", (" + printCheck.x + ", " + printCheck.y + "), ["
                //        + printCheck.camOffX + ", " + printCheck.camOffY + "], " + printCheck.leftBound + " " + printCheck.rightBound);
                //    printCheck = printCheck.next;
                //}
                this.checkpoints = listFront;
                this.checkNode = listFront;
                this.lastCheckpoint = this.checkNode;
                this.game.camera.absOffX = this.checkNode.camOffX;
                this.game.camera.absOffY = this.checkNode.camOffY;
                //temp
                var temp = this.level.checkpoints[3];
                this.cameraCheck = temp[0];
            }
        }

        //on hero death, pause game updates and save states of all entities prior to the checkpoint
    } // end GameBoard class

    //Checkpoint "node"
    class Checkpoint extends Entity {
        constructor(game, x, y, ctx, num, cameraShift = [2, 1.5], next = null, prev = null) {
            super(game, x, y, null, ctx);
            this.next = next;
            this.prev = prev;
            this.camOffX = cameraShift[0];
            this.camOffY = cameraShift[1];
            this.rightBound = this.x;
            this.leftBound = this.x - 1;
            this.activationRadius = [60, 60]
            this.num = num; //Checkpoint's order in list
            this.states = {
                "isFront": false,
                "isBack": false,
                "active": false,
                "activated": false,
                "hasNext": false,
                "hasPrev": false,
            }
            if (this.next !== null) {
                this.states.hasNext = true;
            }
            if (this.prev !== null) {
                this.states.hasPrev = true;
            }
        }

        update() {

        }

        addNext(next) {
            this.next = next;
            this.states.hasNext = true;
        }

        setBounds() {
            if (this.next !== null) {
                this.rightBound = Math.floor((this.next.x + this.x) / 2) - 1;
            }
            else {
                this.rightBound = this.x;
            }
            if (this.prev !== null) {
                this.leftBound = Math.floor((this.prev.x + this.x) / 2) + 1;
            }
            else {
                this.leftBound = this.x;
            }
        }

        draw() {

        }
    }

    return GameBoard;
});