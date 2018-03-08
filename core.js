define([
    'asset-manager',
    'game-engine',
    "game-board",
    "camera",
    "hud",
    "entity",
    "terrain",
    "background",
    "hero",
    "leo",
    "flames",
    "level-one",
    "level-two",
    "soldier-shield",
    "dino",
    "crow",  
    "bullet",
    "shotblast",
    "enemy",
    "hurtbox",
    "item",
    "hand",
    "hazards",
    "sound"

], function(
    AssetManager,
    GameEngine,
    GameBoard,
    Camera,
    Hud,
    Entity,
    Terrain,
    Background,
    Hero,
    Leo,
    Flames,
    LevelOne,
    LevelTwo,
    Soldier_Shield,
    Dino,
    Crow,  
    Bullet,
    Shotblast,
    Enemy,
    Hurtbox,
    Item,
    Hand,
    Hazards,
    Sound
) {

    let init = function() {
        console.log("init")
    };

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

        let gameEngine = new GameEngine(new Sound());
        let camera = new Camera(gameEngine, 0, 0, null, ctx = ctx, canvas.width, canvas.height, 2000, 2000);
        let hero = new Hero(gameEngine, 400, 1120, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
        let hud = new Hud(gameEngine, ASSET_MANAGER.getAsset("img/hud.png"), hero, [0, 0], [0, 0], [100, 100], 3, camera);
        
        // ### music ###
        let audio = new Audio("./audio/track_1.wav");
        audio.volume = 1;
        audio.play();
        //TODO: Placeholder magic numbers until we decide on how to handle world boundary and camera

        /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/

        gameEngine.addEntity(camera);


        let background = new Background(gameEngine, ASSET_MANAGER, ctx, camera);
        let levelOne = new LevelOne(gameEngine, ASSET_MANAGER, ctx);
        let levelTwo = new LevelTwo(gameEngine, ASSET_MANAGER, ctx);
        let board = new GameBoard(gameEngine, hero);

        //hero as global variable
        gameEngine.hero = hero;

        // let mapreader = new FileReader();
        // mapreader.onload = function(e) {
        //     console.log(mapreader.result);
        // }
        // mapreader.readAsText("maps/testmap");

        // gameEngine.showOutlines = true;

        // let gameboard = new GameBoard();

        // gameEngine.addEntity(gameboard);


        camera.follow(hero);
        gameEngine.addEntity(hero);
        gameEngine.addEntity(hud);
        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

