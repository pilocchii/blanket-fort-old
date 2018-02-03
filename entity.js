define([
    'animation',
    'game-engine'
],function(
    Animation,
    GameEngine,
){

    /***********
    Entity class

    game - a reference to the game in which this entity exists
    x, y - entity's coordinates
    removeFromWorld - a flag that denotes when to remove this entity from the game
    ************/
    class Entity {

        constructor (game, x, y, img=null, ctx=null) {
            this.name = this.constructor.name;
            this.game = game;
            this.x = x;
            this.y = y;
            this.origX = x;
            this.origY = y;
            this.gravity = 0.5;
            this.img = img;
            // this.jsondata = jsondata;
            this.removeFromWorld = false;
            this.ctx = ctx;
            // this.states = null;
            // this.currentState = null;
            this.boundX = null;
            this.boundY = null;
            this.boundWidth = null;
            this.boundHeight = null;
        }

        /*
        Returns the distance between two points
        */
        distance(a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy);
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
            this.animation.drawFrame(this.clockTick, ctx, this.x, this.y, "run");
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
        Collision detection, rectangle
        */
        collide(other) {
            let rect1 = {
                "x" : this.boundX,
                "y" : this.boundY,
                "width" : this.boundWidth,
                "height": this.boundHeight
            }

            let rect2 = {
                "x" : other.boundX,
                "y" : other.boundY,
                "width" : other.boundWidth,
                "height": other.boundHeight
            }

            if(rect1.x < rect2.x + rect2.width && 
                rect1.x + rect1.width > rect2.x && 
                rect1.y < rect2.y + rect2.height && 
                rect1.height + rect1.y > rect2.y) {
                // collision detected!
                console.log(`${this.name} colliding with ${other.name}` )
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

        drawOutline(ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(this.x + (this.spriteWidth / 2), this.y + ((this.spriteHeight * this.scale) / 2), this.radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }

        drawImg(ctx) {
            this.drawOutline(ctx);
            try {
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            } catch (e) {
                console.log(e);
            }

        }
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();
        }

    } // end of Entity class


    class Hero extends Actor {

        constructor (game, x, y, img=null, ctx=null, scale=3, spriteWidth=50, spriteHeight=50) {
            super(game, x, y, img, ctx);
            this.origY = this.y; //For jumping
            this.movementSpeed = 8;
            this.jumpSpeed = -10;
            this.origJumpSpeed;
            this.jumpTime = 2;
            this.maxHeight = this.origY -200; // Down is positive
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;

            this.centerX = x + ((spriteWidth*scale)/2)
            this.boundWidth = 60
            this.boundHeight = 110
            this.boundX = this.centerX - (this.boundWidth/2);
            this.boundY = this.y + (this.spriteHeight*this.scale - this.boundHeight);


            // experimental

            // this.centerX = x + ((spriteWidth*scale)/2)

            // collection of booleans for states

            this.jumpStart = y;
            this.states = {
                "running": false,
                "jumping": false,
                "swordAttack": false,
                "facingRight": true,
            };
            this.animations = {
                "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, this.scale),
                "run": new Animation(this.img, [spriteWidth, spriteHeight], 1, 11, 3, 11, true, this.scale),
                "jump": new Animation(this.img, [spriteWidth, spriteHeight], 2, 6, 3, 6, true, this.scale),
            };

        }

        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.rect(this.boundX, 
                this.boundY, 
                this.boundWidth, this.boundHeight);
            ctx.stroke();
            ctx.closePath();
        }

        drawImg (ctx) {
            this.drawOutline(ctx);
            if(this.states.jumping || this.states.falling) {
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

            } else this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

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
                this.origY = this.y;
                this.origJumpSpeed = this.jumpSpeed;
                this.states.jumping = true;
                console.log("Jump");
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
                    this.centerX += this.movementSpeed;
                    this.boundX += this.movementSpeed;
                } else {
                    this.x -= this.movementSpeed;
                    this.centerX -= this.movementSpeed;
                    this.boundX -= this.movementSpeed;

                }
            }

            // // Jumping
            //TODO: time is VERY important for animating jumps properly. w/o proper ticking o/ clock,
            //zero ends up simply jumping to where he should end up at the end of the jump if conditional.

            // jump logic
            //I have no idea wtf is real anymore
            // //I THINK THIS FINALLY WORKS (linear jump tho)
            // if (this.states.jumping && !this.states.falling) {

            //     if (this.y > this.maxHeight) {
            //         this.y -= this.y*this.jumpTimeTotal - this.ju
            //     } else {
            //         this.states.falling = true;
            //     }
            // }

            // if (this.states.falling) {
            //     if (this.y < this.origY) {
            //         this.y +=this.jumpSpeed;
            //     } else {
            //         this.states.jumping = false;
            //         this.states.falling = false;
            //     }
            // }

            if (this.states.jumping) {
               this.y += this.jumpSpeed*this.jumpTime;
               this.jumpSpeed += this.gravity*this.jumpTime;
                
               if (this.y > 500) { //TODO this will change when we handle collision
                   this.y = 500;
                   this.jumpSpeed = this.origJumpSpeed;
                   this.states.jumping = false;
               }
                
             
            }
        
        }
        /////////////////////
        draw (ctx) {
            if(this.states.jumping) {
                this.animation = this.animations.jump;
            }
        	else if (this.states.running && this.animation) {
                this.animation = this.animations.run;
            } else {
                this.animation = this.animations.idle;
            }
            this.drawImg(ctx);
        }
    }

    class Leo extends Actor {

        constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 80, spriteHeight = 60) {
            super(game, x, y, img, ctx);
            this.movementSpeed = 12;
            this.jumpSpeed = -10;
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
            this.timerStart = Date.now();
            //Contains detailed spritesheet info: [FWidth, FHeight, Row, Column, Frames (sheet width)]
            this.sprinfo = [//each five-tuple is from a row of the sprite sheet
                [80, 60, 0, 0, 7], [50, 70, 1, 0, 5],
                [70, 70, 2, 0, 8], [70, 80, 3, 0, 11]
            ];

            //Actor States
            this.states = { //DS3: These state and animation names are tentative.
                "lunging": true, //row 0; 1-3, 4-7
                "attacking": false, //row 3; 7-10
                "grappling": false, //row 3; 1-4
                "evading": false, //row 1; 1
                "firelunging": false, //row 2; 1-2, 3-6, 7-8
                "demoloop": true,
                "facingRight": false,
            };

            this.animations = {
                "lunge": new Animation(this.img, [80, 60], 0, 7, 7, 7, false, this.scale),
                "attack": new Animation(this.img, [70, 80], 3, 11, 7, 11, false, this.scale),
                "firelunge": new Animation(this.img, [70, 70], 2, 8, 7, 8, false, this.scale),
                "idle": new Animation(this.img, [80, 60], 3, 11, 100, 1, true, this.scale),
            };
            this.animation = this.animations.lunge;
        }

        update() {
            if (this.states.demoloop) {
                //lunge (shoulder slam)
                if (this.states.lunging && !this.states.attacking && this.animation) {
                    this.spriteHeight = 80;
                    this.spriteWidth = 60;
                    if (this.animation.currentFrame() > 3) {
                        this.x += this.movementSpeed;
                    }
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.lunging = false;
                        this.states.attacking = true;
                        this.y -= 40;
                    }
                } //grapple/slam (shoulder slam)
                else if (!this.states.lunging && this.states.attacking && this.animation) {
                    this.spriteHeight = 70;
                    this.spriteWidth = 80;
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.lunging = false;
                        this.states.attacking = false;
                        this.states.firelunging = true;
                        this.timerStart = Date.now();
                        this.y += 30
                    }
                }//fire lunge
                else if (this.states.firelunging) {
                    this.animation = this.animations.firelunge;
                    this.spriteHeight = 70;
                    this.spriteWidth = 70;
                    if (this.animation.currentFrame() > 2 && this.animation.currentFrame() < 5) {
                        this.x += this.movementSpeed;
                    }
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.x = this.origX;
                        this.y = this.origY;
                        this.states.firelunging = false;
                        this.states.lunging = true;
                        this.states.attacking = false;
                    }                    
                }
            }
            //Same as above, but not in "demo" form.
            //else if (this.states.lunging && !this.states.attacking && this.animation) {
            //    this.spriteHeight = 80;
            //    this.spriteWidth = 60;
            //    if (this.animation.currentFrame > 3) {
            //        this.x += this.movementSpeed;
            //    }
            //    if (this.animation.isDone()) {
            //        this.animation.elapsedTime = 0;
            //        this.states.lunging = false;
            //        this.states.attacking = true;
            //        this.y -= 40;
            //    }
            //}
            //else if (!this.states.lunging && this.states.attacking && this.animation) {
            //    this.spriteHeight = 70;
            //    this.spriteWidth = 80;
            //    //This will potentially be used to flag different levels of "vulnerability" (ex: counterable)
            //    if (this.animation.isDone()) {
            //        this.animation.elapsedTime = 0;
            //        this.states.lunging = false;
            //        this.states.attacking = false;
            //    }
            //    console.log("attacking");
            //}
            //else if (this.states.firelunging) {
            //    this.spriteHeight = 70;
            //    this.spriteWidth = 70;
            //    if (this.animation.currentFrame() > 2 && this.animation.currentFrame() < 5) {
            //        this.x += this.movementSpeed;
            //    }
            //    if (this.animation.elapsedTime >= this.animation.totalTime - 1) {
            //        this.animation.elapsedTime = 0;
            //        this.x = this.origX;
            //    }
            //}
            //else {
            //        if (/*this.animation.isDone*/1) {
            //            this.states.lunging = true;
            //            this.states.attacking = false;
            //            this.x = this.origX;
            //            this.y = this.origY;
            //        }
            //}

        };


        draw(ctx) {
            if (this.states.lunging && !this.states.attacking) {
                this.animation = this.animations.lunge;
            }
            else if (this.states.attacking && !this.states.lunging) {
                this.animation = this.animations.attack;
            }
            else if (this.states.firelunging) {
                this.animation = this.animations.firelunge;
            }
            else {
                try {
                    //this.animation = this.animations.idle;
                } catch (e) {
                    console.log("animation does not exist", e);
                }
            }
            this.drawImg(ctx);
        };
    }

    class Soldier extends Actor {
        constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 40, spriteHeight = 50) {
            super(game, x, y, img, ctx);
            this.movementSpeed = 7;
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;

            this.states = { "demo": false, "running": true, "facingRight": false, };
            this.animations = {
                "demo": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 0, 8, 7, 8, true, this.scale),
                "run": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 0, 8, 7, 4, true, this.scale, 4)
            };
            this.animation = this.animations.demo;
        }

        update() {

            if (this.states.running) {
                this.animation = this.animations.run;
                if (!this.states.facingRight) {
                    this.x += this.movementSpeed;
                    if (this.x > 450) {
                        this.states.facingRight = true;
                    }
                }
                else if (this.states.facingRight) {
                    this.x -= this.movementSpeed;
                    if (this.x < 100) {
                        this.states.facingRight = false;
                    }
                }
                

            }
            else if (this.states.demo && this.animation.currentFrame() >= 5) {
                this.x += this.movementSpeed;
            }
        };

        draw(ctx) {
            this.drawImg(ctx);
        };
    }

    class Flames extends Actor {

        constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 20, spriteHeight = 40) {
            super(game, x, y, img, ctx);
            this.movementSpeed = 1;
            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;

            this.states = { "active": false, "facingRight": false, };
            this.animations = { "demo": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 8, 9, 10, 9, true, this.scale) };
            this.animation = this.animations.demo;
        }

        update() {
            //TODO
            if (this.isDone) {
                this.elapsedTime = 0;
                this.x = this.origX;
                this.y = this.origY;
            }
        };

        draw(ctx) {
            this.drawImg(ctx);
        };

    }

    class Terrain extends Entity {
         constructor (game, x, y, img=null, jsondata=null, ctx=null, scale=null) {
            super(game, x, y, img, jsondata, ctx);
            this.states = null;
            this.animations = null;
            this.animation = null;

            this.boundX = this.x;
            this.boundY = this.y;
            this.boundWidth = 500;
            this.boundHeight = 50;
        }

        drawOutline (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, 
                this.boundWidth, this.boundHeight);
            ctx.stroke();
            ctx.closePath();
        }

        draw(ctx) {
            this.drawImg(ctx);
        };

        drawImg(ctx) {
            this.drawOutline(ctx);
        }
        
        /*Updates the entity each game loop. i.e. what does this entity do? */
        update () {
            super.update();

        }
    }

    return {
        "Entity": Entity,
        "Hero": Hero,
        "Leo": Leo,
        "Soldier": Soldier,
        "Flames": Flames,
        "Camera": Camera,
        "Terrain": Terrain
    };
});
