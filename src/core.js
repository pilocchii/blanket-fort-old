import AssetManager from "./asset-manager"
import GameEngine from "./game-engine"
import GameBoard from "./entities/game-board"
import Camera from "./entities/camera"
import Hud from "./hud"
import Terrain from "./entities/terrain"
import Background from "./background"
import Hero from "./entities/hero"
import Sound from "./sound"

export default function() {

    // the "main" code begins here

    toload = [
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

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        let canvas = document.getElementById('gameWorld');
        let ctx = canvas.getContext('2d');
        console.log("canvas width: " + canvas.width);
        console.log("canvas height: " + canvas.height);

        let gameEngine = new GameEngine();
        let camera = new Camera(gameEngine, 0, 0, null, ctx = ctx, canvas.width, canvas.height, 2000, 2000);
        let hero = new Hero(gameEngine, 0, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
        let board = new GameBoard(gameEngine, ASSET_MANAGER, ctx);
        gameEngine.hero = hero;
        gameEngine.gameboard = board;
        let hud = new Hud(gameEngine, ASSET_MANAGER.getAsset("img/hud.png"), hero, [0, 0], [0, 0], [100, 100], 3, camera);
        board.hud = hud;
        board.hero = hero;
        
        // ### music ###
        
        //TODO: Placeholder magic numbers until we decide on how to handle world boundary and camera

        /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/

        gameEngine.addEntity(camera);
        gameEngine.camera = camera;

        let background = new Background(gameEngine, ASSET_MANAGER, ctx, camera);

        //Loads level n
        board.getLevel(1);

        camera.follow(hero);
        gameEngine.addEntity(board);
        //gameEngine.addEntity(hero);
        //gameEngine.addEntity(hud);
        gameEngine.init(ctx);
        gameEngine.start();
    });
}