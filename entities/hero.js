define([
    "actor",
    "animation",
    "terrain",
    "projectile",
],function(
    Actor,
    Animation,
    Terrain,
    Projectile,
){


    class Hero extends Actor {

        constructor (game, x, y, img=null, ctx=null, scale=3, spriteWidth=50, spriteHeight=50) {
            super(game, x, y, img, ctx);
            this.origY = this.y; //For jumping
            //this.y = y - spriteHeight*scale;
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


            this.states = {
                "running": false,
                "jumping": false,
                "shooting": false,
                "cleaving": false,
                "facingRight": true,
                "grounded": false,
                "slashing": false,
                "shotlocked": false,
            };
            this.animations = {
                "idle": new Animation(this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, this.scale), //50x50
                "run": new Animation(this.img, [spriteWidth, spriteHeight], 1, 11, 3, 11, true, this.scale), //50x50
                "ascend": new Animation(this.img, [spriteWidth, spriteHeight], 2, 10, 3, 4, true, this.scale, 2), //50x50
                "descend": new Animation(this.img, [spriteWidth, spriteHeight], 2, 16, 3, 4, true, this.scale, 8), //50x50
                "airshoot": new Animation(this.img, [spriteWidth, spriteHeight], 2, 20, 3, 6, true, this.scale, 14), //50x50
                "shoot": new Animation(this.img, [70, 50], 6, 3, 6, 3, false, this.scale), //70x50
                "gunrun": new Animation(this.img, [50, 50], 5, 11, 3, 11, true, this.scale), //50x50
                "cleave": new Animation(this.img, [80, 60], 3, 13, 3, 13, false, this.scale), //80x60
                "slash": new Animation(this.img, [80, 50], 7, 11, 3, 11, false, this.scale), //80x50
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

        draw(ctx) {
            if (this.yVelocity < 0 && !this.states.shooting) {
                this.spriteHeight = 50;
                this.spriteWidth = 50;
                this.animation = this.animations.ascend;
            }
            else if (this.yVelocity > 0 && !this.states.shooting) {
                this.spriteHeight = 50;
                this.spriteWidth = 50;
                this.animation = this.animations.descend;
            }
            else if (this.states.running && this.animation && !this.states.shooting) {
                this.spriteHeight = 50;
                this.spriteWidth = 50;
                this.animation = this.animations.gunrun;
            }
            else if (this.states.shooting && !this.states.jumping && this.animation) {
                this.spriteHeight = 50;
                this.spriteWidth = 70;
                this.animation = this.animations.shoot;
            }
            else if (this.states.shooting && this.states.jumping && this.animation) {
                this.spriteHeight = 50;
                this.spriteWidth = 50;
                this.animation = this.animations.airshoot;
            }
            else if (this.states.cleaving && this.animation) {
                this.spriteHeight = 60;
                this.spriteWidth = 80;
                this.animation = this.animations.cleave;
            }
            else if (this.states.slashing && this.animation) {
                this.spriteHeight = 50;
                this.spriteWidth = 80;
                this.animation = this.animations.slash;
            }
            else {
                this.spriteHeight = 50;
                this.spriteWidth = 50;
                this.animation = this.animations.idle;
            }
            this.drawImg(ctx);
        }

        update() {
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
            if (this.game.controlKeys[this.game.controls.shoot].active) { //shoot
                this.states.shooting = true;
            }
            if (this.game.controlKeys[this.game.controls.cleave].active && !this.states.jumping && !this.states.shooting) { //cleave
                this.states.cleaving = true;
            }
            if (this.game.controlKeys[this.game.controls.slash].active && !this.states.jumping && !this.states.shooting) { //slash
                this.states.slashing = true;
            }

            // check if button NOT pressed, if state is supposed to change...
            if (!(this.game.controlKeys[this.game.controls.right].active || this.game.controlKeys[this.game.controls.left].active)
                && this.states.running) {
                this.states.running = false;
            }
            //if (!this.game.controlKeys[this.game.controls.shoot].active) {
            //    this.states.shooting = false;
            //}


            ///////////// THEN do actions //////////////
            if (this.jumpTimer > 0) {
                this.jumpTimer -= 1;
            }

            // Running
            if (this.states.running) {
                //this.spriteHeight = 50;
                //this.spriteWidth = 70;
                if (this.states.facingRight) {
                    //this.x += this.movementSpeed;
                    //this.centerX += this.movementSpeed;
                    //this.boundX += this.movementSpeed;
                } else {
                    //this.x -= this.movementSpeed;
                    //this.centerX -= this.movementSpeed;
                    //this.boundX -= this.movementSpeed;

                }
            }

            if (this.states.jumping) {
                //this.spriteHeight = 50;
                //this.spriteWidth = 50;
                this.states.jumping = false; //TODO: Find a workaround to allow for easier "is jumping" checks
                if (this.jumpsLeft > 0 && this.jumpTimer == 0) {
                    this.jumpsLeft -= 1;
                    this.jumpTimer = this.jumpCooldown;
                    this.yVelocity -= this.jumpStrength;
                }
            }

            if (this.states.cleaving) {
                //this.spriteHeight = 70;
                //this.spriteWidth = 80;
                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.states.cleaving = false;
                }
            }

            if (this.states.shooting) {
                if (!this.states.shotlocked) {
                    this.game.addEntity(new Projectile(this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight))
                    this.states.shotlocked = true;
                }
                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.states.shooting = false;
                    this.states.shotlocked = false;
                }
            }

            if (this.states.slashing) {
                if (this.animation.isDone()) {
                    this.animation.elapsedTime = 0;
                    this.states.slashing = false;
                }
            }

            // update velocities based on gravity and friction
            this.yVelocity += this.gravity * this.gravity;
            this.y += this.yVelocity;
            this.boundY += this.yVelocity;
        }


        collided (other) {
            // collide with terrain
            if (other instanceof Terrain) {
                this.y = other.boundY - this.spriteHeight*this.scale;
                this.boundY = other.boundY - this.boundHeight;
                this.yVelocity = 0;
                this.jumpsLeft = this.maxJumps;
                this.states.jumping = false;
        }

        }
    }

    return Hero;
});



