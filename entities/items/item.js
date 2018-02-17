define([
    "entity",
    "hero",
    "animation",
    "terrain"
],function(
    Entity,
    Hero,
    Animation,
    Terrain
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
        }

        on_pickup() {}

        draw() {}

    }

    class HealthPack extends Item {

        constructor(game, x, y, img, ctx, width, height, scale=3, health_value=1) {
            super(game, x, y, img, ctx, width, height, scale);
            this.health_value = health_value;
            this.boundX = this.x;
            this.boundY = this.y;
            this.boundWidth = this.width * this.scale;
            this.boundHeight = this.height * this.scale;
            this.img = img;
            this.animation = new Animation(this.img, [10, 8], 0, 4, 4, 4, true, 3, 0);
            this.xOffset = 10
            this.yOffset = -30
        }

        on_pickup(hero) {
            hero.health += this.health_value;
            this.removeFromWorld = true;
            console.log("healthpack picked up")
        }

        draw (ctx) {
            this.animation.drawFrame(1, ctx, this.x + this.xOffset, this.y + this.yOffset, true);
            this.drawOutline(ctx);
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
                console.log("collided with hero")
            } else if (other instanceof Terrain) {
                this.boundY = other.boundY - this.boundHeight;
                this.y = this.boundY + this.boundHeight; //DS3DRAWCHANGE1:
                this.yVelocity = 0;
            }
        }

        update () {
            this.yVelocity += this.gravity * this.gravity;
            this.y += this.yVelocity;
            this.boundY += this.yVelocity;
        }
    }

    return {
        "Item": Item,
        "HealthPack": HealthPack,
    }

});