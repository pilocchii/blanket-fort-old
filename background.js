define([
    "camera",
    "entity"
], function (
    Camera,
    Entity,
){

    class Layer {
        constructor(img, src_dimensions, camera_dimensions, scale=3) {
            
        }

        draw(ctx) {
            // repeat as many times as necessary to fill camera size
            ctx.drawImage(this.img,
                this.src_width, this.src_height,
                0 + , 0 + ,
                this.src_width * this.scale, this.src_height * this.scale)
        }
    }

    class Background {

        constructor(game_engine, asset_manager, ctx) {
            this.game_engine = game_engine
            this.asset_manager = asset_manager
            this.ctx = ctx
            this.layers = [
                "img/bg/1_bg.png",
                "img/bg/2_farbuildings.png",
                "img/bg/1_buildings.png",
                "img/bg/1_foreground.png",
            ]


        }

        make_background () {
            this.gameEngine.addBackgroundLayer(new Layer(this.game_engine, ))

        }

    }

    return Background
});