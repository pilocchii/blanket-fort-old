//row 9, 40x30, 11 frames
define([
    "enemy",
    "animation",
    "terrain",
    "hurtbox",
    "projectile",
    "bomb",
], function (
    Enemy,
    Animation,
    Terrain,
    Hurtbox,
    Projectile,
    Bomb,
    ) {


    class Hand extends Enemy {

        constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 40, spriteHeight = 30) {
            super(game, x, y, img, ctx);
            this.movementSpeed = 7;
            this.yVelocity = 0;

            this.scale = scale;
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;

            this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
            this.boundWidth = 0;//updated in relevant state updates
            this.boundHeight = 0;
            this.boundX = this.centerX - (this.boundWidth / 2);
            this.boundY = this.y - this.boundHeight + 10;
            this.facing = -1;

            //Stats
            this.sightRadius[0] = 1200;
            this.sightRadius[1] = 700;
            this.health = 50; //three normal hits.
            this.damage = 1;
            this.throwtime = 4;
            this.cooldown = 120;
            this.cooldownvariance = 20
            this.cooldownTimer = 0;

            this.states = {
                "idling": true,
                "starting": false,
                "throwing": false,
                "hasThrown": false,
                "recovering": false,
                "facingRight": false,
            };
            this.animations = {
                "idle": new Animation(this.img, [spriteWidth, spriteHeight], 9, 11, 5, 1, true, this.scale),
                "startup": new Animation(this.img, [spriteWidth, spriteHeight], 9, 11, 5, 4, false, this.scale, 1),
                "throw": new Animation(this.img, [spriteWidth, spriteHeight], 9, 11, 3, 1, true, this.scale, 5),
                "recover": new Animation(this.img, [spriteWidth, spriteHeight], 9, 11, 6, 3, false, this.scale, 6),
            };
            this.animation = this.animations.idle;
        }

        update() {
            if (this.x - this.game.hero.x < 0) {
                this.states.facingRight = true;
                this.facing = 1;
            }
            else {
                this.states.facingRight = false;
                this.facing = -1;
            }

            if (this.states.idling) {
                this.updateHitbox(40, 30, 20, 5, 0, 10);
                this.damage = 0;
                //insert attack behavior. Loops for now.
                if (Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0]
                    && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]
                    && this.cooldownTimer <= 0) {
                    this.animation.elapsedTime = 0;
                    this.animation.loops = 0;
                    this.states.idling = false;
                    this.states.starting = true;
                }
            }
            if (this.states.starting) {
                this.damage = 1;
                this.updateHitbox(40, 30, 20, 20, 0, 10);
                if (this.animation.isDone()) {
                    this.states.starting = false;
                    this.states.throwing = true;
                    this.animation.elapsedTime = 0;
                }
            }
            if (this.states.throwing) {
                if (!this.states.hasThrown) {
                    //spawn bomb
                    this.game.addEntity(new Bomb(this.game, this.x + this.facing * 10, this.y - 20, this.img, this.ctx,
                        this.scale, this.spriteWidth, this.spriteHeight, this.states.facingRight,
                        Math.abs(this.x - this.game.hero.x) / 75));
                    //hasThrwon is true
                    this.states.hasThrown = true;
                }
                if (this.animation.loops > this.throwtime) {
                    this.animation.elapsedTime = 0;
                    this.animation.loops = 0;
                    this.states.hasThrown = false;
                    this.states.throwing = false;
                    this.states.recovering = true;
                }
            }
            if (this.states.recovering) {
                this.damage = 0;
                if (this.animation.isDone()) {
                    this.states.idling = true;
                    this.states.recovering = false;
                    this.animation.elapsedTime = 0;
                    this.cooldownTimer = this.cooldown;
                }
            }

            if (this.cooldownTimer > 0) {
                this.cooldownTimer--;
            }

            this.yVelocity += this.gravity * this.gravity;
            this.lastBoundY = this.boundY;
            this.changePos(0, this.yVelocity);
        }

        draw(ctx) {
            if (this.states.idling) {
                this.animation = this.animations.idle;
            }
            if (this.states.starting) {
                this.animation = this.animations.startup;
            }
            if (this.states.throwing) {
                this.animation = this.animations.throw;
            }
            if (this.states.recovering) {
                this.animation = this.animations.recover;
            }
            this.drawImg(ctx);
        }

        updateHitbox(fWidth, fHeight, bWidth, bHeight, xOff, yOff) {
            this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth;
            this.boundWidth = this.scale * bWidth;
            this.boundHeight = this.scale * bHeight;
            this.boundX = this.centerX - this.boundWidth / 2 + xOff;
            this.boundY = this.y - this.boundHeight + yOff;
        }

        collided(other, direction) {
            // collide with terrain
            if (other instanceof Terrain) {
                //TODO Add collision with terrain
                if (direction === 'bottom') {
                    this.boundY = other.boundY - this.boundHeight;
                    this.y = this.boundY + this.boundHeight - 10;
                    this.yVelocity = 0;
                    if (this.movementSpeed > 0) {
                        this.movementSpeed += this.facing * this.movementSpeed * this.friction;
                    }
                    if (this.states.launching) {
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.launching = false;
                        this.states.activating = true;
                    }
                }

                else if (direction === 'top') {
                    this.boundY = other.boundY + other.boundHeight;
                    this.y = this.boundY + this.boundHeight - 10;
                    this.yVelocity = 0;
                    this.lastBoundY = this.boundY;
                }
                //else if (direction === 'left') {
                //    this.boundX = other.boundX + other.boundWidth;
                //    this.x = this.boundX + 87;
                //    this.states.facingRight = true;
                //    this.facing = -1;
                //}
                //else if (direction === 'left') {
                //    this.boundX = other.boundX + other.boundWidth;
                //    this.x = this.boundX - 87;
                //    this.states.facingRight = false;
                //    this.facing = 1;
                //}
            }
            if (other instanceof Projectile && !this.states.hurt) {

            }
            if (other instanceof Hurtbox && !this.states.hurt) {
                other.hasOwnProperty("isEnemy");
                other.hasOwnProperty("damage");
                if (!other.isEnemy) {

                }
            }
        }

        drawOutline(ctx) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.rect(this.boundX,
                this.boundY,
                this.boundWidth, this.boundHeight);
            ctx.stroke();
            ctx.closePath();
        }

        drawImg(ctx) {
            //this.drawOutline(ctx);
            this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
        }
    }
    return Hand;
});
