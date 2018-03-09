define([
    "entity",
    "hero",
    "animation",
    "terrain",
    "hazards",
],function(
    Entity,
    Hero,
    Animation,
    Terrain,
    Hazards,
){

    class Item extends Entity {
        constructor(game, x, y, img, ctx, width, height, scale=3) {
            super(game, x, y, img, ctx);
            this.parentClass = "Entity";
            this.width = width;
            this.height = height;
            this.scale = scale;
            this.img = img;
            this.removeFromWorld = false;
            this.yVelocity = 0;

            this.boundX = this.x;
            this.boundY = this.y;
            this.boundWidth = this.width * this.scale;
            this.boundHeight = this.height * this.scale;
        }

        on_pickup() {}

        draw (ctx) {
            this.animation.drawFrame(1, ctx, this.x + this.xOffset, this.y + this.yOffset, true);
            //this.drawOutline(ctx);
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

        collided (other, direction) {
            if (other.name ===  "Hero") {
                this.on_pickup(other);
            } else if (other.name ===  "Terrain" || other.name ===  "Spikes") {
                this.boundY = other.boundY - this.boundHeight;
                this.y = this.boundY + this.boundHeight;
                this.yVelocity = 0;
            }
        }

        update() {
            this.yVelocity += this.gravity * this.gravity;
            this.y += this.yVelocity;
            this.boundY += this.yVelocity;
        }

    }


    /*
        A health pack that restores the Hero's health
    */
    class HealthPack extends Item {

        constructor(game, x, y, img, ctx, width, height, scale=3, health_value=15) {
            super(game, x, y, img, ctx, width, height, scale);
            this.health_value = health_value;          
            this.animation = new Animation(this.img, [10, 8], 0, 4, 4, 4, true, this.scale, 0);
            this.xOffset = 10
            this.yOffset = -30
        }

        on_pickup(hero) {
            console.log("HEEEYYY")
            if (hero.health < hero.maxHealth)
                hero.health += 15;
            if (hero.health > hero.maxHealth)
                hero.health = hero.maxHealth;
            this.removeFromWorld = true;
        }
    }


     /*
        An energy pack that restores the Hero's energy
    */
    class EnergyPack extends Item {

        constructor(game, x, y, img, ctx, width, height, scale=3, energy_value=15) {
            super(game, x, y, img, ctx, width, height, scale);
            this.energy_value = 15;          
            this.animation = new Animation(this.img, [8, 8], 0, 4, 4, 4, true, this.scale, 0);
            this.xOffset = 10;
            this.yOffset = -30;
        }

        on_pickup(hero) {
            console.log("HEEEYYY")
            if(hero.energy < hero.maxEnergy)
                hero.energy += 15;
            if (hero.energy > hero.maxEnergy)
                hero.energy = hero.maxEnergy;
            this.removeFromWorld = true;
        }
    }

    return {
        "Item": Item,
        "HealthPack": HealthPack,
        "EnergyPack": EnergyPack
    }

});