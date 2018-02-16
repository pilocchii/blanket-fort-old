define([
    "asset-manager",
    'soldier-shield',
], function (
    AssetManager,
    Soldier_Shield,
){

    class Hud {

        constructor(img, hero) {
            this.img = img;
            this.hero = hero;
            this.healthbar = new healthbar(this.hero);
            this.energybar = new energybar(this.hero);

        }

        update() {

        }


    }

    class ResourceBar {

        constructor(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3) {
            this.game_engine = game_engine;
            this.hero = hero;
            this.img = img;
            this.src_coords = src_coordinates;
            this.src_dims = src_dimensions;
            this.dest_coords = dest_coordinates;
            // this.ctx = ctx;
            this.scale = scale;
            
        }

        draw(ctx) {
            ctx.drawImage(this.img, 
                    (col * this.width),
                    (row * this.height),
                    this.width,
                    this.height, 
                    this.x + (i * this.width), this.y,
                    this.width*this.scale, 
                    this.height*this.scale
                );
        }
    }

    class HealthBar extends ResourceBar {

        constructor(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3) {
            super(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3);
            this.health = hero.health;
            this.width = 14;
            this.top = [this.src_coords[0], this.src_coords[1], this.width, 3, 0];
            this.middle = [this.src_coords[0], this.src_coords[1] + 3, this.width, 14, 3];
            this.bottom = [this.src_coords[0], this.src_coords[1] + 19, this.width, 18, 17];
            this.tick = [this.src_coords[0] + 4, this.src_coords[1] + 14, this.width - 4, 2];
            this.parts = [this.top, this.middle, this.bottom]

        }

        draw(ctx) {
            for (var i = 0; i < this.parts.length; i++) {
                let part = this.parts[i]
                this.drawPart(ctx, part);
            }

            for (var i = this.health; i > 0; i--) {
                this.drawPart(ctx, )
            }
        }

        drawPart(ctx, part) {
            ctx.drawImage(this.img,
                part[0], part[1], // src x, y
                part[2], part[3], // src width, height
                this.dest_coords[0], this.dest_coords[1] + part[4] * this.scale, // dest x, y
                part[2] * this.scale, part[3] * this.scale, // dest width, height
                ) 
        }

        update() {}
        isColliding() {}
        collided() {}

    }

    class EnergyBar extends ResourceBar {

        constructor(img, hero) {
            super(img, hero);
            this.energy = hero.health;
        }
    }

    return {
        "HealthBar": HealthBar,
    };

});