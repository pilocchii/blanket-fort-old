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
            if (other instanceof Hero) {
                this.on_pickup(other);
            } else if (other instanceof Terrain || other instanceof Hazards["spikes"]) {
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

        constructor(game, x, y, img, ctx, width, height, scale=3, health_value=1) {
            super(game, x, y, img, ctx, width, height, scale);
            this.health_value = health_value;          
            this.animation = new Animation(this.img, [10, 8], 0, 4, 4, 4, true, this.scale, 0);
            this.xOffset = 10
            this.yOffset = -30
        }

        on_pickup(hero) {
            if(hero.health < hero.maxHealth)
                hero.health += this.health_value;
            this.removeFromWorld = true;
        }
    }


     /*
        An energy pack that restores the Hero's energy
    */
    class EnergyPack extends Item {

        constructor(game, x, y, img, ctx, width, height, scale=3, energy_value=1) {
            super(game, x, y, img, ctx, width, height, scale);
            this.energy_value = energy_value;          
            this.animation = new Animation(this.img, [8, 8], 0, 4, 4, 4, true, this.scale, 0);
            this.xOffset = 10;
            this.yOffset = -30;
        }

        on_pickup(hero) {
            if(hero.energy < hero.maxEnergy)
                hero.energy += this.energy_value;
            this.removeFromWorld = true;
        }
    }

    return {
        "Item": Item,
        "HealthPack": HealthPack,
        "EnergyPack": EnergyPack
    }

});