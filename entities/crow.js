define([
    "enemy",
    "animation",
    "terrain",
    "hurtbox",
    "projectile",

], function (
    Enemy,
    Animation,
    Terrain,
    Hurtbox,
    Projectile,

    ) {


        class Crow extends Enemy {

            constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 50, spriteHeight = 40) {
                super(game, x, y, img, ctx);
                this.movementSpeed = 7;
                //for demo
                this.origy = this.y;
                this.origx = this.x;

                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = this.scale*20;
                this.boundHeight = this.scale*15;
                this.boundX = this.centerX - (this.boundWidth / 2);
                this.boundY = this.y - this.boundHeight;

                //Stats
                this.health = 150;
                this.damage = 1;
                this.facing = 1;


                this.states = {
                    "flying": true,
                    "attacking": false,
                    "attacking_final": false,
                    "hurt": false,
                    "hiding": false,
                    "facingRight": true,
                };
                this.animations = {
                    "fly":          new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 10, 5, true, this.scale),
                    "attack":       new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 10, 3, false, this.scale, 5),
                    "attack_final": new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 5, 2, true, this.scale, 8),
                    "hurt":         new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 10, 1, true, this.scale, 10),
                    "hiding":       new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 10, 1, true, this.scale, 10),
                };
                this.animation = this.animations.hiding;
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
                if (this.states.hurt) {

                }
                if (this.states.hiding) {
                    if (Math.abs(this.x - this.game.hero.x) <= 500 && Math.abs(this.y - this.game.hero.y) <= 350) {
                        //disable states
                        this.states.hiding = false;
                        //enable states
                        this.states.flying = true;
                        //update hitbox
                        this.updateHitbox(50, 40, 20, 15);                        
                    }
                }
                if (this.states.flying) { //this.updateHitbox(50, 40, 20, 15);
                    if (Math.abs(this.x - this.game.hero.x) >= 300) { //chase in x direction
                        this.x += this.facing * 2;
                        this.boundX += this.facing * 2;
                    }
                    if (Math.abs(this.y - this.game.hero.y) >= 50) { //chase in y direction
                        var ydir = Math.abs(this.y - this.game.hero.y) / (this.y - this.game.hero.y);
                        this.y -= ydir*3;
                        this.boundY -= ydir*3;
                    }
                }
                if (this.states.attacking) {
                    this.y -= 1;
                    this.boundY -= 1;
                    if (this.states.facingRight) {
                        this.x -= 2;
                        this.boundX -= 2;
                    }
                    else {
                        this.x += 2;
                        this.boundX += 2;
                    }
                    
                    
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.attacking = false;
                        this.states.attacking_final = true;
                        //for demo
                        //this.states.hurt = true;
                    }
                }
                if (this.states.attacking_final) {
                    this.y += 3;
                    this.boundY += 3;
                    if (this.states.facingRight) {
                        this.x += 5;
                        this.boundX += 5;
                    }
                    else {
                        this.x -= 5;
                        this.boundX -= 5;
                    }
                    if(this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, -45, 10,
                            this.spriteWidth, this.spriteHeight, 40, 40, this.scale, this.damage, this.states.facingRight));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, -45 - this.spriteWidth - 30, 10,
                            this.spriteWidth, this.spriteHeight, 40, 40, this.scale, this.damage, this.states.facingRight));

                    if (this.animation.loops > 3) {
                        this.states.attacking_final = false;
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.hurt = true;
                    }
                }
                if (this.states.hurt) {
                    if (this.health <= 0) {
                        if (Math.random() < .5) {
                            this.y += Math.random() * 5;
                            this.x += Math.random() * 5
                        } else {
                            this.y -= Math.random() * 5;
                            this.x -= Math.random() * 5;
                        }
                    }
                    if (this.animation.loops > 2) {
                        //reset animation
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        //disable states
                        this.states.hurt = false;
                        //enable states
                        this.states.flying = true;
                        this.states.facingRight = !this.states.facingRight;
                        //update hitbox
                        this.updateHitbox(50, 40, 20, 15);
                        if (this.health <= 0) {
                            this.removeFromWorld = true;
                        }
                    }
                }
            }

            draw(ctx) {
                if (this.states.flying) {
                    this.animation = this.animations.fly;
                }
                if (this.states.attacking) {
                    this.animation = this.animations.attack;
                }
                if (this.states.attacking_final) {
                    this.animation = this.animations.attack_final;
                }
                if (this.states.hurt) {
                    this.animation = this.animations.hurt;
                }
                this.drawImg(ctx);
            }

            updateHitbox(fWidth, fHeight, bWidth, bHeight) {
                this.centerX = this.x + ((fWidth * this.scale) / 2) - fWidth;
                this.boundWidth = this.scale * bWidth;
                this.boundHeight = this.scale * bHeight;
                this.boundX = this.centerX - this.boundWidth / 2;
                this.boundY = this.y - this.boundHeight;
            }

            collided(other, direction) {
                // collide with terrain
                if (other instanceof Terrain) {
                    if (direction === 'bottom') {
                        this.boundY = other.boundY - this.boundHeight;
                        this.y = this.boundY + this.boundHeight;
                        this.yVelocity = 0;
                        this.jumpsLeft = this.maxJumps;
                        this.states.jumping = false;
                    }
                    else if (direction === 'top') {
                        this.boundY = other.boundY + other.boundHeight;
                        this.y = this.boundY + this.boundHeight;
                        this.lastBoundY = this.boundY;
                    }
                    else if (direction === 'left') {
                        this.boundX = other.boundX + other.boundWidth;
                        this.x = this.boundX;
                    }
                    else if (direction === 'right') {
                        this.boundX = other.boundX - this.boundWidth;
                        this.x = this.boundX;
                    }
                }
                if (other instanceof Projectile) {
                    this.health -= other.damage;
                    this.states.flying = false;
                    this.states.attacking = false;
                    this.states.hiding = false;
                    this.states.hurt = true;
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
                this.drawOutline(ctx);
                this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            }
        }

        return Crow;
    });