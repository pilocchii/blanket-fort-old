import {
    AssetManager,
    GameEngine,
    //Hud,
    Background
} from "./engine"

import {
   // GameBoard,
    Camera,
    //Hero
} from "./entities"

import {Logging as L} from "./util"
import C from "./util/const.json"


/* Assembles and starts the game. */
export default function() {

    let canvasId = C.canvasId;
    let toload = [
        "img/ZXe.png",
        "img/Leo.png",
        "img/EnemySheet1.png",
        "img/pipes.png",
        "img/Enemies.png",
        "img/hud.png",
        "img/healthpack.png",
        "img/energypack.png",
        "img/bg/1_bg.png",
        "img/bg/2_farbuildings.png",
        "img/bg/3_buildings.png",
        "img/bg/4_foreground.png",
        "img/bg/bot_fill.png"
    ];

    let ASSET_MANAGER = new AssetManager(toload);
    L.debug("Starting asset manager download...")

    // callback after AssetManager is finished... downloads every asset before beginning. what's a better way?
    ASSET_MANAGER.downloadAll(() => {
        
        let canvas = document.getElementById(canvasId);
        let ctx = canvas.getContext('2d');
        L.debug("canvas width: " + canvas.width);
        L.debug("canvas height: " + canvas.height);

        let gameEngine = new GameEngine();
        let camera = new Camera(gameEngine, 0, 0, null, ctx = ctx, canvas.width, canvas.height, C.settings.canvasWidth, C.settings.canvasHeight);
        // let hero = new Hero(gameEngine, 0, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
        // let board = new GameBoard(gameEngine, ASSET_MANAGER, ctx);
        gameEngine.hero = null;
        // gameEngine.gameboard = board;
        // let hud = new Hud(gameEngine, ASSET_MANAGER.getAsset("img/hud.png"), hero, [0, 0], [0, 0], [100, 100], 3, camera);
        // board.hud = hud;
        // board.hero = hero;
        
        // ### music ###
        
        //TODO: Placeholder magic numbers until we decide on how to handle world boundary and camera

        /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/

        gameEngine.addEntity(camera);
        gameEngine.camera = camera;

        let background = new Background(gameEngine, ASSET_MANAGER, ctx, camera);

        //Loads level n
        // board.getLevel(1);

        camera.follow(hero);
        gameEngine.addEntity(board);
        //gameEngine.addEntity(hero);
        //gameEngine.addEntity(hud);
        gameEngine.init(ctx);
        gameEngine.start();
    });
}