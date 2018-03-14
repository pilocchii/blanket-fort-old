define([
    "asset-manager",
], function (
    AssetManager,
){

    class Hud {

        constructor(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3, camera) {
            this.img = img;
            this.hero = hero;
            this.camera = camera;
            this.healthbar = new HealthBar(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3, camera);
            this.energybar = new EnergyBar(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3, camera);
            this.scoreboard = new ScoreBoard(game_engine, dest_coordinates, scale, camera);
            this.components = [this.healthbar, this.energybar, this.scoreboard];
            this.gradientStop1 = 0;
            this.gradientStop2 = 1;
            this.gradientStop3 = 2;
        }

        update() {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].update();
            }
        }

        draw(ctx) {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].draw(ctx);
            }
        }
        isColliding() {}
        collided() {}

    }


    class ScoreBoard {

        constructor(game_engine, dest_coordinates, scale=3, camera) {
            this.score = game_engine.gameboard.score;
            this.game_engine = game_engine;
            this.camera = camera;
            this.scale = scale;
            this.dest_coords = dest_coordinates;
        }

        update() {
            this.score = Math.floor(this.game_engine.gameboard.score);
            this.dest_coords = [-this.camera.xView + 200, -this.camera.yView + 100]
        }

        draw(ctx) {
            ctx.font = "italic bold 25px Verdana" ;
            var gradient = ctx.createLinearGradient(this.dest_coords[0] - 100, this.dest_coords[1] - 10, this.dest_coords[0], this.dest_coords[1] - 10);
            gradient.addColorStop(0,"magenta");
            gradient.addColorStop(.5 ,"blue");
            gradient.addColorStop(1 ,"green");
            // Fill with gradient
            ctx.fillStyle=gradient;
            ctx.fillText("Score: " + this.score,
                this.dest_coords[0] - 100, 
                this.dest_coords[1] - 10
            );
            if (this.game_engine.gameboard.states.showPointValues) {
                console.log("draw")
                ctx.font = "20px Verdana";
                ctx.fillStyle = "#00ff00";
                ctx.fillText("+" + this.game_engine.addedpoints + " points",
                    this.game_engine.hero.x + 10,
                    this.game_engine.hero.y - 150
                );
            }
        }
    }


    /*
        ResourceBar superclass
    */
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
            let lasty = 0;
            for (var i = 0; i < this.parts.length; i++) {
                let part = this.parts[i]
                this.drawPart(ctx, part, lasty);
                lasty = lasty + part["src_height"]; // this causes each segment to be drawn vertically on top of the last
            }
        }

        resourceBarSegment(img, src_coords, src_dims, dest_x_offset=0, dest_y_offset=0) {
                return {
                    "img": img,
                    "src_x": src_coords[0],
                    "src_y": src_coords[1],
                    "src_width": src_dims[0],
                    "src_height": src_dims[1],
                    "dest_x_offset": dest_x_offset,
                    "dest_y_offset": dest_y_offset,
                }
               
               // this.dest_x = dest_coords[0]
               // this.dest_y = dest_coords[1]
               // this.dest_width = dest_dimensions[0]
               // this.dest_height = dest_dimensions[1]
        }
    }


    /*
        Provides a health bar for the Hero.
        Constructed of resourceBarSegments, defined in ResourceBar.
        Health grows upward.
    */
    class HealthBar extends ResourceBar {

        constructor(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3, camera) {
            super(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3);
            this.health = hero.health; // has room for 6 ticks
            this.width = 14; // the pixel art width
            this.hero = hero;
            this.camera = camera;

            // bar segments
            this.top = this.resourceBarSegment(img, 
                [src_coordinates[0], src_dimensions[1] + 0],
                [this.width, 3]);
            this.middle1 = this.resourceBarSegment(img, 
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle2 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle3 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle4 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle5 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.bottom = this.resourceBarSegment(img, 
                [src_coordinates[0], src_coordinates[1] + 19],
                [this.width, 18]);
            this.tick = this.resourceBarSegment(img, 
                [src_coordinates[0] + 3, src_coordinates[1] + 16],
                [this.width-7, 3],
                9, 11);
            this.parts = [this.top,
                        this.middle1, this.middle2, this.middle3, this.middle4, this.middle5,
                        this.bottom]

        }

        draw(ctx) {
            let lasty = 0;
            for (var i = 0; i < this.parts.length; i++) {
                let part = this.parts[i]
                this.drawPart(ctx, part, lasty);
                lasty = lasty + part["src_height"]; // this causes each segment to be drawn vertically on top of the last
            }

            lasty -= this.bottom["src_height"];
            for (var i = this.health; i > 0; i--) {
                this.drawPart(ctx, this.tick, lasty);
                lasty -= 2 // this causes health to grow upward 
            }
        }

        drawPart(ctx, part, lasty) {
            ctx.drawImage(this.img,
                part["src_x"], part["src_y"], // src x, y
                part["src_width"], part["src_height"], // src width, height
                this.dest_coords[0] + part["dest_x_offset"], this.dest_coords[1] + (lasty * this.scale) - part["dest_y_offset"], // dest x, y
                part["src_width"] * this.scale, part["src_height"] * this.scale, // dest width, height
            ) 
        }

        update() {
            this.health = this.hero.health;
            this.dest_coords = [-this.camera.xView + 100, -this.camera.yView + 100]
        }
        isColliding() {}
        collided() {}

    }


    /*
        Provides an energy bar for the Hero.
        Constructed of resourceBarSegments, defined in ResourceBar.
        Energy grows upward.
    */
    class EnergyBar extends ResourceBar {

        constructor(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3, camera) {
            super(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale=3);
            this.energy = hero.energy; // has room for 6 ticks
            this.width = 14; // the pixel art width
            this.hero = hero;
            this.camera = camera;
            src_coordinates = [src_coordinates[0] + 15, src_coordinates[1]]

            // bar segments
            this.top = this.resourceBarSegment(img,
                [src_coordinates[0], src_dimensions[1] + 0],
                [this.width, 3]);
            this.middle1 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle2 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle3 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle4 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);
            this.middle5 = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 3],
                [this.width, 14]);

            this.bottom = this.resourceBarSegment(img,
                [src_coordinates[0], src_coordinates[1] + 19],
                [this.width, 18]);
            this.tick = this.resourceBarSegment(img,
                [src_coordinates[0] + 3, src_coordinates[1] + 16],
                [this.width - 7, 3],
                9, 11);
            this.parts = [this.top,
                        this.middle1, this.middle2, this.middle3, this.middle4, this.middle5,
                        this.bottom]

        }

        draw(ctx) {
            let lasty = 0;
            for (var i = 0; i < this.parts.length; i++) {
                let part = this.parts[i]
                this.drawPart(ctx, part, lasty);
                lasty = lasty + part["src_height"]; // this causes each segment to be drawn vertically on top of the last
            }

            lasty -= this.bottom["src_height"];
            for (var i = this.energy; i > 0; i--) {
                this.drawPart(ctx, this.tick, lasty);
                lasty -= 2 // this causes energy to grow upward 
            }
        }

        drawPart(ctx, part, lasty) {
            ctx.drawImage(this.img,
                part["src_x"], part["src_y"], // src x, y
                part["src_width"], part["src_height"], // src width, height
                this.dest_coords[0] + part["dest_x_offset"], this.dest_coords[1] + (lasty * this.scale) - part["dest_y_offset"], // dest x, y
                part["src_width"] * this.scale, part["src_height"] * this.scale, // dest width, height
            ) 
        }

        update() {
            this.energy = this.hero.energy;
            this.dest_coords = [-this.camera.xView + 150, -this.camera.yView + 100]
        }
        isColliding() {}
        collided() {}
    }

    return Hud;

});