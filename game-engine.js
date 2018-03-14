define([
    "asset-manager",
    "hero",
    "hud",
    "background",
    "sound"
], function (
    AssetManager,
    Hero,
    Hud,
    Background,
    Sound
){

     /***************
    GameEngine class
    ****************/
    class GameEngine {

        constructor(gameboard, hero) {
            this.drawBoxes = false;
            this.devMode = false;
            this.sound = new Sound();
            this.entities = [];
            this.backgroundLayers = [];
            this.gameboard = gameboard;
            this.camera = null;
            this.ctx = null;
            this.click = null;
            this.mouse = null;
            this.wheel = null;
            this.surfaceWidth = null;
            this.surfaceHeight = null;
            this.music = null;

            //DEV TOOL FIELDS
            this.toggleCooldown= 20;
            this.boxToggleTimer = 0;
            this.setPosTimer = 0;
            this.godToggleTimer = 0;
            this.checkpointCycleCount = 1;

            // KB input keycodes
            this.controlKeys = {
                "Space": { "active": false },
                "KeyW": { "active": false },
                "KeyS": { "active": false },
                "KeyD": { "active": false },
                "KeyA": { "active": false },
                "KeyR": { "active": false },
                "KeyF": { "active": false },
                "KeyG": { "active": false },
                "KeyE": { "active": false },
                "KeyJ": { "active": false },
                "KeyK": { "active": false },
                "KeyL": { "active": false },
                "KeyM": { "active": false },
                "KeyP": { "active": false },
                "KeyT": { "active": false },
                "KeyY": { "active": false },
                "KeyV": { "active": false },
                "KeyC": { "active": false },
                "Numpad1": { "active": false },
                "Numpad2": { "active": false },
                "Numpad3": { "active": false },
                "Numpad4": { "active": false },
                "Numpad5": { "active": false },
                "Numpad6": { "active": false },
                "Numpad9": { "active": false },
            }
            // control mapping
            this.controlLayoutA = {
                "jump": "Space",
                "right": "KeyD",
                "left": "KeyA",
                "shoot": "Numpad4",
                "slash": "Numpad5",
                "cleave": "Numpad6",
                "energize": "KeyW",
                "dash": "Numpad1",
                "getPos": "KeyE",
                "setPos": "KeyR",
                "godToggle": "KeyG",
                "hardmode": "KeyT",
                "easymode": "KeyY",
                "layoutA": "Numpad9",
                "layoutB": "KeyP",
                "testPos": "KeyV",
                "toggleBoxes": "KeyC",
            }
            this.controlLayoutB = {
                "jump": "Space",
                "right": "KeyD",
                "left": "KeyA",
                "shoot": "KeyJ",
                "slash": "KeyK",
                "cleave": "KeyL",
                "energize": "KeyW",
                "dash": "KeyM",
                "getPos": "KeyE",
                "setPos": "KeyR",
                "godToggle": "KeyG",
                "hardmode": "KeyT",
                "easymode": "KeyY",
                "layoutA": "Numpad9",
                "layoutB": "KeyP",
                "testPos": "KeyV",
                "toggleBoxes": "KeyC",
            }
            this.controls = this.controlLayoutA;
            this.hero = hero;
        }

        /*
        Initializes the game engine
        */
        init (ctx) {
            this.ctx = ctx;
            this.surfaceWidth = this.ctx.canvas.width;
            this.surfaceHeight = this.ctx.canvas.height;
            this.startInput();

            console.log('game initialized');
        }

        /*
        Starts the game engine
        */
        start () {
            console.log("starting game");
            let that = this;
            this.music = new Audio("./audio/track_1.wav");
            this.music.volume = 1;
            this.music.play();
            (function gameLoop() {
                that.loop();
                requestAnimFrame(gameLoop, that.ctx.canvas);
            })();
        }

        playSound(sound_name, volume=1) {
            this.sound.play(sound_name, volume)
        }

        //Timer class
        Timer() {//Added this for when we implement a pause function.
            this.gameTime = 0;
            this.maxStep = 0.05;
            this.wallLastTimestamp = 0;
            function tick() {
                var wallCurrent = Date.now();
                var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
                this.wallLastTimestamp = wallCurrent;

                var gameDelta = Math.min(wallDelta, this.maxStep);
                this.gameTime += gameDelta;
                return gameDelta;
            }
        }

        /*
        Input handling, initializes listeners
        */
        startInput () {
            console.log('Starting input');

            this.ctx.canvas.tabIndex = 0;;

            let getXandY = function (e) {
                let x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
                let y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

                if (x < 1024) {
                    x = Math.floor(x / 32);
                    y = Math.floor(y / 32);
                }

                return { x: x, y: y };
            }

            let that = this;

            // control event listeners go here
            let map = {};

            this.ctx.canvas.addEventListener("keypress", function (e) {
                if (String.fromCharCode(e.which) === ' ') that.space = true;
                e.preventDefault();
                if (!that.controlKeys.hasOwnProperty(e.code)) { that.controlKeys[e.code] = {"active": true}; }
                if (that.controlKeys[e.code].active == false) { that.controlKeys[e.code].active = true; }
                // console.log(`${e.code} is ${that.controls[e.code].active}`);

            }, false);

            this.ctx.canvas.addEventListener("keyup", function (e) {
            	if (!that.controlKeys.hasOwnProperty(e.code)) { that.controlKeys[e.code] = {"active": false}; }
                if (that.controlKeys[e.code].active == true) { that.controlKeys[e.code].active = false }
                // console.log(`${e.code} is ${that.controls[e.code].active}`);

            }, false);

            console.log('Input started');
        }

        /*
        Adds an entity to the game
        */
        addEntity (entity) {
            //console.log('added entity');
            if (this.gameboard.states.loadingLevel || this.gameboard.states.respawnSection) {
                entity.level = this.gameboard.levelNum;
                entity.section = this.gameboard.level.sectionNum;
            }
            this.entities.push(entity);
        }

        addBackgroundLayer (layer) {
            this.backgroundLayers.push(layer);
        }


        /*
        Draws all entities in the list
        */

        draw (drawCallback) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.save();
            for (let i = 0; i < this.backgroundLayers.length; i++) {
                //Draw the camera and hud first

                this.backgroundLayers[i].draw(this.ctx);

            }
            for (let i = 0; i < this.entities.length; i++) {
                ////Draw only terrain that is within the canvas view (numbers are negative because the camera is weird like that.
                ////postive numbers would screw the translate process)
                if (this.entities[i].type === "Terrain") {
                    if((-this.entities[i].x - this.entities[i].boundWidth < this.entities[0].xView 
                    && -this.entities[i].x > this.entities[0].xView - this.ctx.canvas.width 
                    && -this.entities[i].y - this.entities[i].boundHeight< this.entities[0].yView 
                    && -this.entities[i].y > this.entities[0].yView - this.ctx.canvas.height)) {
                       this.entities[i].draw(this.ctx);
                    }
                }
                else {
                    this.entities[i].draw(this.ctx);
                }
            }
            

            if (drawCallback) {
                drawCallback(this);
            }
            this.ctx.restore();
        }

        /*
        Updates all entities, calls their update methods
        */
        update () {
            let entitiesCount = this.entities.length;
            for (let i = 0; i < entitiesCount; i++) {
                let entity = this.entities[i];
                if (this.gameboard.states.respawnSection) {
                    if (entity.level === this.gameboard.levelNum && entity.section === this.gameboard.sectionNum) {
                        //console.log("values - level: " + this.gameboard.levelNum + ", section: " + this.gameboard.sectionNum);
                        //console.log("entity - level: " + entity.level + ", section: " + entity.section);
                        entity.removeFromWorld = true;
                        entity.pointValue = 0;
                    }
                }
                else if (this.gameboard.states.newLevel) {
                    if (entity.level === this.gameboard.levelNum || entity.name === "Terrain" || entity.name === "Hero") {
                        //console.log("values - level: " + this.gameboard.levelNum + ", section: " + this.gameboard.sectionNum);
                        //console.log("entity - level: " + entity.level + ", section: " + entity.section);
                        entity.removeFromWorld = true;
                        entity.pointValue = 0;
                    }
                }
                if (!entity.removeFromWorld) {
                    entity.update();
                }
            }
            if (this.gameboard.states.respawnSection) {
                this.gameboard.states.respawnSection = false;
            }
            if (this.gameboard.states.newLevel) {
                this.gameboard.states.newLevel = false;
                this.gameboard.states.loadNextLevel = true;
            }

            //TODO Move into first update() for loop?
            for (let i = this.entities.length - 1; i >= 0; --i) {
                if (this.entities[i].removeFromWorld) {
                    if (this.entities[i].hasOwnProperty("pointValue") && !this.gameboard.states.respawnSection) {
                        if (this.entities[i].pointValue > 0) {
                            //TODO Refactor hero multiplier and difficulty to gameboard
                            this.gameboard.score += this.hero.difficulty * this.entities[i].pointValue * this.hero.multiplier;
                            this.hero.multiplier += this.hero.difficulty * .5;
                        }
                    }
                    this.entities.splice(i, 1);
                }
            }

            for (let i = 0; i < this.entities.length; i++) {
                let entity = this.entities[i];
                for (let j = 0; j < this.entities.length; j++) {
                    let other = this.entities[j];
                    // this prevents each piece of terrain from checking collision, causing slowdown
                    if (entity.type === "Terrain") continue;
                    else if (other.type === "Terrain") {
                        let dist = Math.abs(entity.x - other.x);
                        if (dist < 100) {
                            if (entity != other && entity.isColliding(other) != 'none') { /// D.prototype = new C(), links C to prototype linkage of D OR put property "something_type" or whatever and check for that
                                let direction = entity.isColliding(other);
                                entity.collided(other, direction);
                            }
                        }

                    }
                    else if (entity != other && entity.isColliding(other) != 'none') { /// D.prototype = new C(), links C to prototype linkage of D OR put property "something_type" or whatever and check for that
                        let direction = entity.isColliding(other);
                        entity.collided(other, direction);
                    }

                }
                
            }

            // music
            if (this.music.currentTime >= 63.95) {
                 this.music.currentTime = 0;
                 this.music.play();
            }

            //PLAYER SETTINGS
            if (this.controlKeys[this.controls.easymode].active) {
                //TODO Move difficulty to gameboard
                this.hero.difficulty = 1;
                this.gameboard.score = 0;
            }
            if (this.controlKeys[this.controls.hardmode].active) {
                this.hero.difficulty = 3;
                this.gameboard.score = 0;
            }
            if (this.controlKeys[this.controls.layoutA].active) {
                this.controls = this.controlLayoutA;
            }
            if (this.controlKeys[this.controls.layoutB].active) {
                this.controls = this.controlLayoutB;
            }
            if (this.controlKeys[this.controls.setPos].active && this.setPosTimer <= 0) {
                this.hero.setPos(this.gameboard.level.checkpoints[this.checkpointCycleCount]);
                this.setPosTimer = this.toggleCooldown;
                this.checkpointCycleCount = (this.checkpointCycleCount + 1) % this.gameboard.level.checkpoints.length;
            }
            if (this.controlKeys[this.controls.godToggle].active && this.godToggleTimer <= 0) {
                this.hero.states.isGod = !this.hero.states.isGod;
                this.godToggleTimer = this.toggleCooldown;
            }
            //DEV TOOLS
            if (this.devMode) {
                if (this.controlKeys[this.controls.getPos].active) {
                    console.log("x: " + this.hero.x + ", y: " + this.hero.y);
                }
                if (this.controlKeys[this.controls.setPos].active && this.setPosTimer <= 0) {
                    this.hero.setPos(this.gameboard.level.checkpoints[this.checkpointCycleCount]);
                    this.setPosTimer = this.toggleCooldown;
                    this.checkpointCycleCount = (this.checkpointCycleCount + 1) % this.gameboard.level.checkpoints.length;
                }
                if (this.controlKeys[this.controls.godToggle].active && this.godToggleTimer <= 0) {
                    this.hero.states.isGod = !this.hero.states.isGod;
                    this.godToggleTimer = this.toggleCooldown;
                }
                if (this.controlKeys[this.controls.testPos].active) {
                    this.hero.setPos(this.gameboard.testPos);
                }
                if (this.controlKeys[this.controls.toggleBoxes].active && this.boxToggleTimer <= 0) {
                    this.drawBoxes = !this.drawBoxes;
                    this.boxToggleTimer = this.toggleCooldown;
                }
                //Toggle timers (should finally learn how to use an "on keyup" for keys)
                if (this.boxToggleTimer > 0) {
                    this.boxToggleTimer--;
                }
                if (this.setPosTimer > 0) {
                    this.setPosTimer--;
                }
                if (this.godToggleTimer > 0) {
                    this.godToggleTimer--;
                }
            }
        }

        drawBackground(drawCallback) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.save();
            for (let i = 0; i < this.backgroundLayers.length; i++) {
                //Draw the camera and hud first
                this.backgroundLayers[i].draw(this.ctx);

            }
            if (drawCallback) {
                drawCallback(this);
            }
            this.ctx.restore();
        }

        /*
        Defines the game loop
        */
        loop () {
            this.ctx.width = window.innerWidth;
            this.ctx.height = window.innerHeight;

            this.update();
            this.draw();
            this.click = null;
            this.wheel = null;
        }

    } // end of GameEngine
    
    return GameEngine;

});