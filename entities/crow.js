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
                this.movementSpeed = 12;
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
                this.attackAngle1 = 2;
                this.attackAngle2 = 10;
                this.rand = 0;


                this.states = {
                    "active": false,
                    "flying": false,
                    "attacking": false,
                    "attacking_final": false,
                    "recovering": false,
                    "hurt": false,
                    "hiding": true,
                    "facingRight": true,
                };
                this.animations = {                   
                    "fly":          new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 5, 5, true, this.scale),
                    "attack":       new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 6, 3, false, this.scale, 5),
                    "attack_final": new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 6, 2, true, this.scale, 8),
                    "hurt":         new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 5, 1, true, this.scale, 10),    
                    //TEMPORARY
                    //"hiding":       new Animation(this.img, [spriteWidth, spriteHeight], 8, 12, 1, 1, true, this.scale, 11),  
                };
                this.animation = null;
            }

            update() {
                if (!this.states.hiding && !this.states.recovering && !this.states.attacking_final) {
                    if (this.x - this.game.hero.x < 0) {
                        this.states.facingRight = true;
                        this.facing = 1;
                    }
                    else if (!this.states.recovering) {
                        this.states.facingRight = false;
                        this.facing = -1;
                    }
                }
                if (this.states.hiding) {
                    if (Math.abs(this.x - this.game.hero.x) <= 800) {
                        //disable states
                        this.states.hiding = false;
                        //enable states
                        this.states.flying = true;
                        this.states.active = true;
                        //update hitbox
                        this.updateHitbox(50, 40, 20, 15);      
                        //PREVENTS BUG, BUT AGAINST THE BEST PRACTICE CODING GUIDLINES
                        this.animation = this.animations.fly;
                    }
                }
                if (this.states.flying) { //this.updateHitbox(50, 40, 20, 15);
                    //chase in x direction
                    if (Math.abs(this.x - this.game.hero.x) >= 500 && this.states.active) { 
                        this.x += this.facing * 3;
                        this.boundX += this.facing * 3;
                    }
                    //chase in y direction
                    if (Math.abs(this.y - this.game.hero.y) <= 200) { //stay away by 200
                        this.y -= 5;
                        this.boundY -= 5;
                    }
                    else if (Math.abs(this.y - this.game.hero.y) >= 300) { //stay within 300
                        this.y += 5;
                        this.boundY += 5;
                    }
                    //if (all of this stuff) ATTACK!!!
                    if (Math.abs(this.x - this.game.hero.x) <= 700 && this.y - this.game.hero.y < 0
                        && this.animation.loops > 2 && Math.random() * 100 <= 30) { 
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.attacking = true;
                        this.states.flying = false;
                    }
                }
                if (this.states.attacking) {
                    this.y -= 4;
                    this.boundY -= 4;
                    this.x -= this.facing*7;
                    this.boundX -= this.facing*7;                    
                    
                    if (this.animation.isDone()) {
                        this.animation.elapsedTime = 0;
                        this.states.attacking = false;
                        //randomly determine angle of attack (makes prediction harder)
                        //min attack angle of 2
                        //this.attackAngle = 2 + Math.random() * 8; 
                        this.rand = Math.floor(Math.random() * 2);
                        this.states.attacking_final = true;
                    }
                }
                if (this.states.attacking_final) {
                    if(this.rand === 0) {
                        this.y += this.attackAngle1;
                        this.boundY += this.attackAngle1;
                    }
                    else {
                        this.y += this.attackAngle2;
                        this.boundY += this.attackAngle2;
                    }
                    console.log(this.rand);
                    this.x += this.facing * 17;
                    this.boundX += this.facing * 17;
                    //console.log("y: " + this.y);


                    //Spawn Hurtbox
                    if(this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, -45, 10,
                            this.spriteWidth, this.spriteHeight, 40, 40, this.scale, this.damage, this.states.facingRight, true));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, -45 - this.spriteWidth - 30, 10,
                            this.spriteWidth, this.spriteHeight, 40, 40, this.scale, this.damage, this.states.facingRight, true));

                    //state finished
                    if (this.animation.loops > 3) {
                        this.states.attacking_final = false;
                        this.animation.elapsedTime = 0;
                        this.animation.loops = 0;
                        this.states.recovering = true;
                    }
                }
                if (this.states.recovering) { //after attack is finished
                    //fly away
                    this.x += this.facing*7;
                    this.boundX += this.facing*7;
                    if (Math.abs(this.x - this.game.hero.x) >= 300) {
                        this.states.recovering = false;
                        this.states.flying = true;
                    }
                }
                if (this.states.hurt) {
                    if (this.health <= 0) { // DEATH RATTLE
                        if (Math.random() < .5) {
                            this.y += Math.random() * 5;
                            this.x += Math.random() * 5
                        } else {
                            this.y -= Math.random() * 5;
                            this.x -= Math.random() * 5;
                        }
                    }
                    if (this.animation.loops > 8) {
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
                if (this.states.recovering) {
                    this.animation = this.animations.fly;
                }
                if (this.states.hurt) {
                    this.animation = this.animations.hurt;
                }
                //if (this.states.hiding) {
                //    this.animation = this.animations.hiding;
                //}
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
                    //null
                }
                if (other instanceof Projectile) {
                    this.health -= other.damage;
                    this.states.flying = false;
                    this.states.attacking = false;
                    this.states.attacking_final = false;
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
                if(this.states.active)
                    this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            }
        }
        return Crow;
    });