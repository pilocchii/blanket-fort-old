import { Camera, Entity } from "./entities"


class Layer {
    constructor(img, src_dimensions, camera, scroll_speed, height_factor, dest_y, stretch=false, scale=3) {
        this.img = img
        this.src_width = src_dimensions[0]
        this.src_height = src_dimensions[1]
        this.scroll_speed = scroll_speed
        this.height_factor = height_factor
        this.stretch = stretch
        this.camera = camera
        this.camera_dimensions = [camera.canvasWidth, camera.canvasHeight]
        this.scale = scale
        this.dest_y = dest_y
        
    }

    draw(ctx) {
        // repeat as many times as necessary to fill camera size

        for (var i = 0 - this.src_width; i < this.camera_dimensions[0] + this.src_width; i += this.src_width) {
                let d_height = (this.camera_dimensions[1] * this.height_factor)
                let d_y = this.dest_y * this.height_factor
                // 0 + ((this.height_factor)) * this.camera_dimensions[1]

                if (this.stretch) {
                    d_height = this.camera_dimensions[1]
                    // d_y = 
                }
                ctx.drawImage(this.img,
                    0, 0,
                    this.src_width, this.src_height,
                    (i + ((this.camera.xView* this.scroll_speed) % (this.src_width)))* this.scale, 
                    d_y,
                    this.src_width * this.scale, 
                    d_height
                )
        }
        
    }
}

class Background {

    constructor(game_engine, asset_manager, ctx, camera) {
        this.game_engine = game_engine
        this.asset_manager = asset_manager
        this.ctx = ctx
        this.camera = camera
        this.layers = [
            "img/bg/1_bg.png",
            "img/bg/2_farbuildings.png",
            "img/bg/3_buildings.png",
            "img/bg/4_foreground.png",
            "img/bg/bot_fill.png"
        ]

        this.make_background()


    }

    make_background () {
        this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/1_bg.png"), 
            [272, 160], this.camera, 0.1, 1, 0, true))
        this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/2_farbuildings.png"), 
            [213, 142], this.camera, 0.15, 0.35, this.camera.canvasHeight/2))
        this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/3_buildings.png"), 
            [272, 150], this.camera, 0.2, 0.4, this.camera.canvasHeight/2))
        // this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/4_foreground.png"), 
            // [272, 104], this.camera, 0.25, .5, this.camera.canvasHeight/2))
        this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/bot_fill.png"), 
            [250, 250], this.camera, 1, 1, this.camera.canvasHeight/2))
    }

}

export default Background;