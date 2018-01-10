define([

],function(

){

     /***************
    GameEngine class
    ****************/
    class GameEngine {

        constructor () {
            this.entities = [];
            this.ctx = null;
            this.click = null;
            this.mouse = null;
            this.wheel = null;
            this.surfaceWidth = null;
            this.surfaceHeight = null;
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
            var that = this;
            (function gameLoop() {
                that.loop();
                requestAnimFrame(gameLoop, that.ctx.canvas);
            })();
        }

        /*
        Input handling, initializes listeners
        */
        startInput () {
            console.log('Starting input');

            var getXandY = function (e) {
                var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
                var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

                if (x < 1024) {
                    x = Math.floor(x / 32);
                    y = Math.floor(y / 32);
                }

                return { x: x, y: y };
            }

            var that = this;

            this.ctx.canvas.addEventListener("click", function (e) {
                that.click = getXandY(e);
            }, false);

            this.ctx.canvas.addEventListener("mousemove", function (e) {
                that.mouse = getXandY(e);
            }, false);

            this.ctx.canvas.addEventListener("mousewheel", function (e) {
                that.wheel = e;
            }, false);

            console.log('Input started');
        }

        /*
        Adds an entity to the game
        */
        addEntity (entity) {
            console.log('added entity');
            this.entities.push(entity);
        }


        /*
        Draws all entities in the list
        */
        draw (drawCallback) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.save();
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw(this.ctx);
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
            var entitiesCount = this.entities.length;

            for (var i = 0; i < entitiesCount; i++) {
                var entity = this.entities[i];

                if (!entity.removeFromWorld) {
                    entity.update();
                }
            }

            for (var i = this.entities.length - 1; i >= 0; --i) {
                if (this.entities[i].removeFromWorld) {
                    // todo: what does this do?
                    this.entities.splice(i, 1);
                }
            }
        }

        /*
        Defines the game loop
        */
        loop () {
            this.update();
            this.draw();
            this.click = null;
            this.wheel = null;
        }

    } // end of GameEngine
    
    return GameEngine;

});