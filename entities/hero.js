define([
    "actor",
    "animation",
    "terrain"
],function(
    Actor,
    Animation,
    Terrain
){


    class Hero extends Actor {

        constructor (game, x, y, img=null, ctx=null, scale=3, spriteWidth=50, spriteHeight=50) {
            super(game, x, y, img, ctx);
            this.origY = this.y; //For jumping
            this.movementSpeed = (8);

            this.jumpStrength = (20);
            this.jumpsLeft = 2;
            this.maxJumps = 2;
            this.jumpTimer = 0;
            this.jumpCooldown = 20;

            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
            this.yVelocity = 0;

            this.centerX = x + ((spriteWidth*scale)/2);
            this.boundWidth = 60;
            this.boundHeight = 110;
            this.boundX = this.centerX - (this.boundWidth/2);
            this.boundY = this.y + (this.spriteHeight*this.scale - this.boundHeight);
            this.lastboundY = this.y + (this.spriteHeight*this.scale - this.boundHeight); // This will help stop Hero from slipping at edges, particularly for horizontally longer blocks of terrain



            this.states = {
                "running": false,
                "jumping": false,
                "swordAttack": false,
                "facingRight": true,
                "grounded" : false
            };
            this.animations = {
                "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, this.scale),
                "run": new Animation(this.img, [spriteWidth, spriteHeight], 1, 11, 3, 11, true, this.scale),
                "ascending": new Animation(this.img, [spriteWidth, spriteHeight], 2, 10, 3, 4, true, this.scale, 2),
                "descending": new Animation(this.img, [spriteWidth, spriteHeight], 2, 16, 3, 4, true, this.scale, 8),

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
            if(this.yVelocity < 0) {
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

            } else this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

        }


        draw (ctx) {
            if(this.yVelocity < 0) {
                this.animation = this.animations.ascending;
            }
            else if (this.yVelocity > 0) {
                this.animation = this.animations.descending;
            }
            else if (this.states.running && this.animation) {
                this.animation = this.animations.run;
            } else {
                this.animation = this.animations.idle;
            }
            this.drawImg(ctx);
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
                this.lastboundY === this.y + (this.spriteHeight*this.scale - this.boundHeight);
                this.states.jumping = true;
            }

            // check if button NOT pressed, if state is supposed to change...
            if (!(this.game.controlKeys[this.game.controls.right].active || this.game.controlKeys[this.game.controls.left].active)
                && this.states.running) { 
                this.states.running = false;
            }


            ///////////// THEN do actions //////////////
            if (this.jumpTimer > 0) {
                this.jumpTimer -= 1;
            }

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

            if (this.states.jumping) {

                this.states.jumping = false;
                if (this.jumpsLeft > 0 && this.jumpTimer == 0) {
                    this.jumpsLeft -= 1;
                    this.jumpTimer = this.jumpCooldown;
                    this.yVelocity = 0;
                    this.yVelocity -= this.jumpStrength;
                }
            }

            // update velocities based on gravity and friction
            this.yVelocity += this.gravity * this.gravity;
            this.y += this.yVelocity;
            this.boundY += this.yVelocity;

        }


        collided (other, direction) {
            // collide with terrain
            if (other instanceof Terrain) {

                // Hero above terrain
                // TODO store lastBottom, when landing, check to see if lastBottom is above other.BoundX. if it is, I SHOULD land. else i slide off like a chump. might work? idk yet
                if (direction === 'bottom') {
                    this.boundY = other.boundY - this.boundHeight;
                    this.y = this.boundY - (this.spriteHeight*this.scale - this.boundHeight);
                    this.yVelocity = 0;
                    this.jumpsLeft = this.maxJumps;
                    this.states.jumping = false;
                    //this.lastboundY === this.boundY;

                }

                // Hero jumps into terrain
                else if (direction === 'top') {
                    this.boundY = other.boundY + other.boundHeight;
                    this.y = this.boundY - (this.spriteHeight*this.scale - this.boundHeight);

                }

                // Hero collides with terrain to the left
                else if (direction === 'left') {
                    this.boundX = other.boundX + other.boundWidth;
                    this.x = this.boundX - this.spriteWidth;
                }

                // Hero collides with terrain to the right
                else if (direction === 'right') {
                    this.boundX = other.boundX - this.boundWidth;
                    this.x = this.boundX - this.spriteWidth;
                }
                //console.log(`${this.name} colliding with ${other.name} from ${direction}`);
                //console.log(direction);
        }

        }
    }

    return Hero;
});



