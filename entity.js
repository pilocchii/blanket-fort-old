define([
    'animation'
],function(
    Animation
){

    /***********
    Entity class

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Entity {

        constructor (game, x, y, img=null, ctx=null) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.img = img;
            // this.jsondata = jsondata;
            this.removeFromWorld = false;
            this.ctx = ctx;
            // this.states = null;
            // this.currentState = null;
        }


        /*
        Draws the outline of this entity
        */
        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }

        /*

        */
        drawImg (ctx) {
            if (!this.animation) {
                //this.animation = new Animation(this.img, [50, 50], 1, 11, 4, 11, true, 3);

            }
            this.animation.drawFrame(1, ctx, this.x, this.y, "run");
        }


        /*
        Updates the entity each game loop
        i.e. what does this entity do?
        */
        update () {
            // this.drawImg(this.ctx);
        }

        /*
        Draws this entity. Called every cycle of the game engine.
        */
        draw (ctx) {
            if (this.game.showOutlines && this.radius) {
                drawOutline(ctx)
            }
            if (this.img) {
                this.drawImg(ctx)
            }
        }

        /*
        todo: probably not necessary
        */
        rotateAndCache (image, angle) {
            let offscreenCanvas = document.createElement('canvas');
            let size = Math.max(image.width, image.height);
            offscreenCanvas.width = size;
            offscreenCanvas.height = size;
            let offscreenCtx = offscreenCanvas.getContext('2d');
            offscreenCtx.save();
            offscreenCtx.translate(size / 2, size / 2);
            offscreenCtx.rotate(angle);
            offscreenCtx.translate(0, 0);
            offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
            offscreenCtx.restore();
            //offscreenCtx.strokeStyle = "red";
            //offscreenCtx.strokeRect(0,0,size,size);
            return offscreenCanvas;
        }


    } // end of Entity class


    /***********
    Camera Class
    This class controls where in the gameboard the camera is located, and where to draw.
    ************/
    class Camera extends Entity {

        draw(ctx) {}
    }


    /***********
    Actor interface
    This interface is designed to encompass any Entity that acts upon the game level. This class should not be instantiated.
    Any action shared between actors is located here.

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Actor extends Entity {
        constructor (game, x, y, img=null, jsondata=null, ctx=null, scale=null) {
            super(game, x, y, img, jsondata, ctx);
            this.facing = null;
            this.states = null;
            this.animations = null;
            this.animation = null;
        }
        
        /*
        Updates the entity each game loop
        i.e. what does this entity do?
        */
        update () {
            super.update();
        }

    } // end of Entity class


    class Hero extends Actor {

        constructor (game, x, y, img=null, ctx=null, scale=3, spriteWidth=50, spriteHeight=50) {
            super(game, x, y, img, ctx);
            this.movementSpeed = 8;
            this.maxHeight = 200;
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
            // collection of booleans for states

            this.jumpStart = y;
            this.states = {
                "running": false,
                "jumping": false,
                "falling": false,
                "swordAttack": false,
                "facingRight": true,
            };
            this.animations = {
                "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, this.scale),
                "run": new Animation(this.img, [spriteWidth, spriteHeight], 1, 11, 3, 11, true, this.scale),
                "jump": new Animation(this.img, [spriteWidth, spriteHeight], 1, 11, 3, 11, true, this.scale),
            };
            // this.animation = this.animations.idle;
        }

        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(this.x + (this.spriteWidth/2), this.y + ((this.spriteHeight*this.scale)/2), this.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }

        drawImg (ctx) {
            this.drawOutline(ctx);
            this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

        }

        update () {

            /////////// all button checks go here ///////////
            // check if button pressed
            // Moving left and right are mutually exclusive, thus else-if
            if (this.game.controlKeys[this.game.controls.right].active) { //run right
                if (!this.states.facingRight) { this.states.facingRight = true };
                this.states.running = true;
            } else if (this.game.controlKeys[this.game.controls.left].active) { //run left
                if (this.states.facingRight) { this.states.facingRight = false };
                this.states.running = true;
            }
            if (this.game.controlKeys[this.game.controls.jump].active && !this.states.jumping) { // jump
                this.states.jumping = true;
            }

            // check if button NOT pressed, if state is supposed to change...
            if (!(this.game.controlKeys[this.game.controls.right].active || this.game.controlKeys[this.game.controls.left].active)
                && this.states.running) { 
                this.states.running = false;
            }


            ///////////// THEN do actions //////////////
            // Running
            if (this.states.running) {
                if (this.states.facingRight) {
                    this.x += this.movementSpeed;
                } else {
                    this.x -= this.movementSpeed;
                }
            }

            // // Jumping
            // if (this.game.controlKeys[this.game.controls.jump].active && !this.states.jumping) { // jump control
            //     this.states.jumping = true;
            //     this.jumpStart = this.y;
            //     console.log("jump start")
            // }
            // // jump logic
            // if (this.states.jumping) {
            //     // if (this.animations.jump.isDone()) {
            //     //     this.animations.jump.elapsedTime = 0;
            //     //     this.states.jumping = false;
            //     // }
            //     let jumpDistance = this.animations.jump.elapsedTime / this.animations.jump.totalTime;

            //     if (jumpDistance > .5) {
            //         jumpDistance = 1 - jumpDistance;
            //     }

            //     let height = this.maxHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));
            //     this.y = this.jumpStart - height;
            // }

            // // check if jump over
            // if (this.y == this.jumpStart && this.states.jumping) {
            //     console.log("jump end")
            //     this.states.jumping = false;
            //     // this.states.idle = true;
            // }




            // FINALLY assign a single active animation
            // if (this.states.running && this.animation != this.animations.run) {
            //     this.animation = this.animations.run;
            // } else {
            //     this.animation = this.animations.idle;
            // }
        }

        /////////////////////
        draw (ctx) {
        	if (this.states.running && this.animation) {
                this.animation = this.animations.run;
            } else {
                this.animation = this.animations.idle;
            }
            this.drawImg(ctx);
        }
    }


    return {
        "Entity": Entity,
        "Hero": Hero,
        "Camera": Camera
    };
});