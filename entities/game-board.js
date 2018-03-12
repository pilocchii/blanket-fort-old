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
            this.testPos = [3056, 192]; //DBG/Dev Tool
            this.game = game;
            this.assetManager = assetManager;
            //used for recalling a section's non-terrain, non-hazard actors on death
            this.levelNum;
            this.sectionNum;

            this.score = 0;
            this.time;
            this.hero = hero;
            this.hud = hud;
            this.level;
            this.checkNode = null;
            this.lastCheckpoint = null;
            this.states = {
                "newBoard": true,
                "loadingLevel": false,
                "loadedLevel": false,
                "populateLevel": false,
                "respawnLevel": false,
                "loadingSection": false,
                "loadedSection": false,
                "respawnSection": false,
                "newLevel": false,
                "loadNextLevel": false,
            }
        }

        update() {
            if (this.states.loadNextLevel) {
                console.log("entered loadNextLevel");
                var nextLevel = this.level.nextLevel;
                this.level = null;
                this.clearStates();
                this.getLevel(nextLevel);
            }
            else {
                if (!this.states.loadedLevel) {
                    this.level.load();
                    this.states.loadingLevel = true;
                    this.level.populateMap(-1);
                    this.states.loadingLevel = false;
                    this.hero.setPos([this.checkNode.x, this.checkNode.y])
                    this.nextNode = this.checkpoints.next;
                    this.states.loadedLevel = true;
                    this.states.newLevel = false;
                    this.game.addEntity(this.hero);
                    this.hero.removeFromWorld = false;
                    this.hero.states.active = true;
                    if (this.states.newBoard) {
                        this.game.addEntity(this.hud);
                        this.states.newBoard = false;
                    }
                }
                if (this.states.loadingSection) {
                    this.states.respawnSection = true;
                    this.level.populateMap(this.sectionNum);
                    this.states.loadingSection = false;
                    console.log("reloaded section " + this.sectionNum);
                }
                if (this.level.nextLevel > 0 && this.checkNode.states.isBack) {
                    this.clearBoard("level");
                }

                //If entering next checkpoint
                if (!this.checkNode.states.isBack && this.hero.x >= this.checkNode.next.x) {
                    this.checkNode.states.active = false;
                    this.checkNode = this.checkNode.next;
                    if (!this.checkNode.states.activated) {
                        this.checkNode.states.activated = true;
                        this.lastCheckpoint = this.checkNode;
                    }
                    this.checkNode.states.active = true;
                    this.game.camera.absOffX = this.checkNode.camOffX;
                    this.game.camera.absOffY = this.checkNode.camOffY;
                    this.game.camera.camSpeedX = this.checkNode.nextCamSpeed;
                    this.game.camera.camSpeedY = this.checkNode.nextCamSpeed;
                }
                //If entering previous checkpoint
                else if (!this.checkNode.states.isFront && this.hero.x < this.checkNode.x
                    && this.hero.x >= this.checkNode.prev.x) {
                    this.checkNode.states.active = false;
                    this.checkNode = this.checkNode.prev;
                    this.checkNode.active = true;
                    this.game.camera.absOffX = this.checkNode.camOffX;
                    this.game.camera.absOffY = this.checkNode.camOffY;
                    this.game.camera.camSpeedX = this.checkNode.prevCamSpeed;
                    this.game.camera.camSpeedY = this.checkNode.prevCamSpeed;
                }

                if (this.hero.states.respawned) {
                    //this.clearBoard("level");
                    this.hero.respawn();
                    this.hero.setPos([this.lastCheckpoint.x, this.lastCheckpoint.y - 10]);
                    this.clearBoard("actors");
                    console.log("respawn");
                }
            }
        }

        draw(ctx) {

        }

        clearBoard(scope) {
            //scope will range from actors only, to the entire level.
            if (scope === "actors") {
                this.states.loadingSection = true;
                this.sectionNum = this.lastCheckpoint.num;
            }
            else if (scope === "level") {
                this.hero.states.active = false;
                this.states.newLevel = true;
            }
            console.log("Board Cleared");
        }

        clearStates() {
            this.states.loadingLevel = false;
            this.states.loadedLevel = false;
            this.states.populateLevel = false;
            this.states.respawnLevel = false;
            this.states.loadingSection = false;
            this.states.loadedSection = false;
            this.states.respawnSection = false;
            this.states.newLevel = false;
            this.states.loadNextLevel = false;
        }

        getLevel(level) {
            if (level === 1) {
                this.level = new Levels["level-one"](this.game, this.assetManager, this.ctx);
                this.levelNum = level;
                //Should move this into the LevelTwo class(?)
                //Create checkpoint linked list.
                var currCheckPos = this.level.checkpoints[0];
                var currCheckX = currCheckPos[0];
                var currCheckY = currCheckPos[1];
                var listFront = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, 0, this.level.camVals[0], this.level.camSpeeds[0], null, null);
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
                    currCheckX = currCheckPos[0];
                    currCheckY = currCheckPos[1];
                    if (i === this.level.checkpoints.length - 1) {
                        currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
                        currCheck.states.hasNext = false;
                        currCheck.states.isBack = true;
                    }
                    else {
                        currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
                        currCheck.num = i;
                        currCheck.states.hasNext = true;
                    }
                    currCheck.num = i;
                    prevCheck.addNext(currCheck);
                    prevCheck.setBounds();
                    prevCheck = currCheck;
                }
                currCheck.setBounds();
                this.checkpoints = listFront;
                this.checkNode = listFront;
                this.lastCheckpoint = this.checkNode;
                this.game.camera.absOffX = this.checkNode.camOffX;
                this.game.camera.absOffY = this.checkNode.camOffY;
            }

            if (level === 2) {
                this.level = new Levels["level-two"](this.game, this.assetManager, this.ctx);
                this.levelNum = level;
                //Should move this into the LevelTwo class(?)
                //Create checkpoint linked list.
                var currCheckPos = this.level.checkpoints[0];
                var currCheckX = currCheckPos[0];
                var currCheckY = currCheckPos[1];
                var listFront = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, 0, this.level.camVals[0], this.level.camSpeeds[0], null, null);
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
                    currCheckX = currCheckPos[0];
                    currCheckY = currCheckPos[1];
                    if (i === this.level.checkpoints.length - 1) {
                        currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
                        currCheck.states.hasNext = false;
                        currCheck.states.isBack = true;
                    }
                    else {
                        currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
                        currCheck.num = i;
                        currCheck.states.hasNext = true;
                    }
                    currCheck.num = i;
                    prevCheck.addNext(currCheck);
                    prevCheck.setBounds();
                    prevCheck = currCheck;
                }
                currCheck.setBounds();
                this.checkpoints = listFront;
                this.checkNode = listFront;
                this.lastCheckpoint = this.checkNode;
                this.game.camera.absOffX = this.checkNode.camOffX;
                this.game.camera.absOffY = this.checkNode.camOffY;
            }
        }

        //on hero death, pause game updates and save states of all entities prior to the checkpoint
    } // end GameBoard class

    //Checkpoint "node"
    class Checkpoint extends Entity {
        constructor(game, x, y, ctx, num, cameraShift = [2, 1.5], cameraSpeed = [8, 8], next = null, prev = null) {
            super(game, x, y, null, ctx);
            this.next = next;
            this.prev = prev;
            this.camOffX = cameraShift[0];
            this.camOffY = cameraShift[1];
            this.nextCamSpeed = cameraSpeed[0];
            this.prevCamSpeed = cameraSpeed[1];
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