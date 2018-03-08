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

            constructor(game, x, y, img = null, ctx = null, scale = 3, spriteWidth = 50, spriteHeight = 40,
                            /*Unique to Crow*/sightRadius = [700, 500], murderLeader = false, murderDroogs = [[0, 0], [0, 0]]) {
                super(game, x, y, img, ctx);
                this.parentClass = "Enemy";
                this.scale = scale;
                this.spriteWidth = spriteWidth;
                this.spriteHeight = spriteHeight;

                this.centerX = x + ((spriteWidth * scale) / 2) - spriteWidth;
                this.boundWidth = this.scale * 20;
                this.boundHeight = this.scale * 15;
                this.boundX = this.centerX - (this.boundWidth / 2);
                this.boundY = this.y - this.boundHeight;

                //Stats
                this.murderLeader = murderLeader;
                this.pointValue = 10;
                this.xSpeed = 4;
                this.ySpeed = 8;
                this.maxX = 5;
                this.maxY = 9;
                this.xAccel = .35;
                this.yAccel = .4;

                this.attackAngle1 = 2;
                this.attackAngle2 = 10;
                this.xAttack = 17
                this.xRecover = 7;
                this.yRecover = 4;
                this.recoverDistance = 400;
                this.xRecoverDistance;
                this.yRecoverDistance;
                if (this.murderLeader) {
                    this.droogOne = murderDroogs[0];
                    this.droogTwo = murderDroogs[1];
                }

                this.sightRadius[0] = sightRadius[0];
                this.sightRadius[1] = sightRadius[1];
                this.health = 100;
                this.damage = 0;
                this.facing = 1;
                this.rand = 0;


                this.states = {
                    "active": true,
                    "flying": false,
                    "attacking": false,
                    "attacking_final": false,
                    "recovering": false,
                    "hurt": false,
                    "idling": true,
                    "facingRight": false,
                };
                this.animations = {
                    "fly": new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 5, 5, true, this.scale),
                    "attack": new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 6, 3, false, this.scale, 5),
                    "attack_final": new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 6, 2, true, this.scale, 8),
                    "hurt": new Animation(this.img, [spriteWidth, spriteHeight], 8, 11, 5, 1, true, this.scale, 10),
                    //TODO: Add "smokebomb" effect for activation
                };
                this.animation = this.animations.fly;
            }

            update() {
                if (!this.states.recovering && !this.states.attacking_final) {
                    if (this.x - this.game.hero.x < 0) {
                        this.states.facingRight = true;
                        this.facing = 1;
                    }
                    else if (!this.states.recovering) {
                        this.states.facingRight = false;
                        this.facing = -1;
                    }
                }
                if (this.states.idling) {
                    if (Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0]
                            && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
                        //disable states
                        this.states.idling = false;
                        //enable states
                        this.states.flying = true;
                        if (this.murderLeader) {
                            this.game.addEntity(new Crow(this.game, this.x + this.droogOne[0], this.y + this.droogOne[1], this.img, this.ctx, this.scale, this.spriteWidth, this.spriteHeight));
                            this.game.addEntity(new Crow(this.game, this.x + this.droogTwo[0], this.y + this.droogTwo[1], this.img, this.ctx, this.scale, this.spriteWidth, this.spriteHeight));
                        }
                    }
                }
                if (this.states.flying) { //this.updateHitbox(50, 40, 20, 15);
                    //Apply speed updates and chase Hero/stay in attack range
                    if ((this.xSpeed < this.maxX && this.facing === 1) || (this.xSpeed > -this.maxX && this.facing === -1)) {
                        this.xSpeed += this.facing * this.xAccel;
                    }
                    if (this.y - this.game.hero.y >= -125) {
                        if (this.ySpeed > -this.maxY) {
                            this.ySpeed -= this.yAccel;
                        }
                        this.y += this.ySpeed;
                        this.boundY += this.ySpeed;
                    }
                    else if (this.y - this.game.hero.y <= -200){
                        if (this.ySpeed < this.maxY) {
                            this.ySpeed += this.yAccel;
                        }
                        this.y += this.ySpeed;
                        this.boundY += this.ySpeed;
                    }
                    //Stay within Crow's attack radius
                    if (Math.abs(this.x - this.game.hero.x) >= 500 && this.states.active) {
                        this.x += this.xSpeed;
                        this.boundX += this.xSpeed;
                    }
                    else if (Math.abs(this.x - this.game.hero.x) <= 250 && this.states.active) {
                        this.x -= this.xSpeed;
                        this.boundX -= this.xSpeed;
                    }
                    // below hero;
                    //if (this.y - this.game.hero.y <= 100) {
                    //    this.y += this.ySpeed;
                    //    this.boundY += this.ySpeed;
                    //}
                    //// above hero
                    //else if (this.y - this.game.hero.y >= 200) {
                    //    this.y += this.ySpeed;
                    //    this.boundY += this.ySpeed;
                    //}

                    //ATTACK!!!
                    if (Math.abs(this.x - this.game.hero.x) <= 700
                            && this.y - this.game.hero.y < -100 && (this.y - this.game.hero.y) > -200
                            && this.animation.loops > 1 && Math.random() * 100 <= 10) { 
                        this.animation.reset();
                        this.states.attacking = true;
                        this.states.flying = false;
                        this.game.sound.play("crow_caw");
                    }
                }
                if (this.states.attacking) {
                    this.y -= 4;
                    this.boundY -= 4;
                    this.x -= this.facing*7;
                    this.boundX -= this.facing*7;                    
                    
                    if (this.animation.isDone()) {
                        this.animation.reset();
                        this.states.attacking = false;
                        //randomly determine angle of attack (makes prediction harder)
                        //min attack angle of 2
                        //this.attackAngle = 2 + Math.random() * 8; 
                        this.rand = Math.floor(Math.random() * 3);
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
                    this.x += this.facing * this.xAttack;
                    this.boundX += this.facing * this.xAttack;
                    //console.log("y: " + this.y);


                    //Spawn Hurtbox
                    if(this.states.facingRight)
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, -45, 10,
                            this.spriteWidth, this.spriteHeight, 40, 40, this.scale, 1, this.states.facingRight, true));
                    else
                        this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, -45 - this.spriteWidth - 30, 10,
                            this.spriteWidth, this.spriteHeight, 40, 40, this.scale, 1, this.states.facingRight, true));

                    //state finished
                    if (this.animation.loops > 3) {
                        this.states.attacking_final = false;
                        this.animation.reset();
                        this.animation.reset();
                        this.states.recovering = true;
                    }
                }
                if (this.states.recovering) { //after attack is finished
                    //fly away
                    this.x += this.facing * this.xRecover;
                    this.boundX += this.facing * this.xRecover;
                    this.y -= this.yRecover;
                    this.boundY -= this.yRecover;
                    if (Math.abs(this.x - this.game.hero.x) >= this.recoverDistance) {
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
                        this.damage = 1;
                        this.animation.reset();
                        this.animation.reset();
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
                if (this.states.flying || this.states.idling || this.states.recovering) {
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
                if (other.name ===  "Terrain") {
                    //null
                }
                if (other.name ===  "Projectile" && !this.states.hurt && !this.states.idling) {
                    this.health -= other.damage;
                    this.states.flying = false;
                    this.states.attacking = false;
                    this.states.attacking_final = false;
                    this.states.idling = false;
                    this.states.hurt = true;
                }
                if (other.name ===  "Hurtbox" && !this.states.hurt && !this.states.idling) {
                    //other.hasOwnProperty("isEnemy");
                    //other.hasOwnProperty("damage");
                    if (!other.isEnemy) {
                        this.health -= other.damage;
                        this.states.flying = false;
                        this.states.attacking = false;
                        this.states.attacking_final = false;
                        this.states.idling = false;
                        this.states.hurt = true;
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
                this.drawOutline(ctx);
                if(this.states.active)
                    this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
            }
        }
        return Crow;
    });