define([
    'asset-manager',
    'game-engine',
    "game-board",
    "camera",
    "hud",
    "entity",
    "terrain",
    "hero",
    "leo",
    "flames",
    "solider",
    "level-one",
    "soldier-shield",
    "dino",
    "crow",  
    "bullet",
    "shotblast",
    "enemy",
    "hurtbox",
    "item",


], function(
    AssetManager,
    GameEngine,
    GameBoard,
    Camera,
    Hud,
    Entity,
    Terrain,
    Hero,
    Leo,
    Flames,
    Soldier,
    LevelOne,
    Soldier_Shield,
    Dino,
    Crow,  
    Bullet,
    Shotblast,
    Enemy,
    Hurtbox,
    Item,
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
        "img/energypack.png"
    ];

    let ASSET_MANAGER = new AssetManager(toload);

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        let canvas = document.getElementById('gameWorld');
        let ctx = canvas.getContext('2d');
        console.log("canvas width: " + canvas.width);
        console.log("canvas height: " + canvas.height);
        let vPortWidth = 500; // Distance from left side of screen
        let vPortHeight = 500; // Distance from top of screen

        let gameEngine = new GameEngine();
        let camera = new Camera(gameEngine, 0, 0, null, ctx=ctx, vPortWidth, vPortHeight, canvas.width, canvas.height) //Placeholder magic numbers until we decide on how to handle world boundary and camera
        gameEngine.addEntity(camera);
        
        /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/

        let levelOne = new LevelOne(gameEngine, ASSET_MANAGER, ctx);

        let hero = new Hero(gameEngine, 250, 1400, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
        let hud = new Hud(gameEngine, ASSET_MANAGER.getAsset("img/hud.png"), hero, [0, 0], [0, 0], [100, 100], 3, camera);
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
        //gameEngine.addEntity(new Item.HealthPack(gameEngine, 250, 1400, ASSET_MANAGER.getAsset("img/healthpack.png"), ctx, 10, 8));
        //gameEngine.addEntity(new Item.EnergyPack(gameEngine, 350, 1400, ASSET_MANAGER.getAsset("img/energypack.png"), ctx, 10, 8));

        gameEngine.addEntity(new Soldier_Shield(gameEngine, 1800, 1450, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        gameEngine.addEntity(new Crow(gameEngine, 2000, 1300, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Dino(gameEngine, 1250, 1450, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Terrain(gameEngine, 0, 600, [32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx=ctx, scale=3, tiles=[[2,0], [3, 0], [4,0]]));
        
        gameEngine.addEntity(hud);
        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

