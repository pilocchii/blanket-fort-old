define([
    ['actor'],
    ['animation'],
],function(
    Actor,
    Animation,
){


    class Leo extends Actor {

        constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 80, spriteHeight = 60) {
            super(game, x, y, img, ctx);
            this.origX = x; // TODO: demo
            this.origY = y; // TODO: demo
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
            this.animation.drawFrame(this.clockTick, ctx, this.x, this.y);
        };
    }

    return Leo;
});




