define([
    'asset-manager',
    'game-engine',
    "game-board",
    "camera",
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
], function(
    AssetManager,
    GameEngine,
    GameBoard,
    Camera,
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
    ];

    let ASSET_MANAGER = new AssetManager(toload);

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        let canvas = document.getElementById('gameWorld');
        let ctx = canvas.getContext('2d');
        console.log(canvas.width);
        console.log(canvas.height);

        let gameEngine = new GameEngine();

        let levelOne = new LevelOne(gameEngine, ASSET_MANAGER, ctx);

        // let mapreader = new FileReader();
        // mapreader.onload = function(e) {
        //     console.log(mapreader.result);
        // }
        // mapreader.readAsText("maps/testmap");

        // gameEngine.showOutlines = true;

        // let gameboard = new GameBoard();

        // gameEngine.addEntity(gameboard);
        let camera = new Camera(gameEngine, 0, 0, null, ctx=ctx, 100,50, canvas.width, canvas.height) //Placeholder magic numbers until we decide on how to handle world boundary
        let player = new Hero(gameEngine, 0, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
        camera.follow(player);

        /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/
        gameEngine.addEntity(camera);
        gameEngine.addEntity(player);       

        gameEngine.addEntity(new Terrain(gameEngine, 0, 600, [32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx=ctx, scale=3, tiles=[[2,0], [3, 0], [4,0]]));
        
        
        // gameEngine.addEntity(new Leo(gameEngine, 200, 150, ASSET_MANAGER.getAsset("img/Leo.png"), ctx));
        // gameEngine.addEntity(new Flames(gameEngine, 200, 700, ASSET_MANAGER.getAsset("img/Leo.png"), ctx));
        // gameEngine.addEntity(new Soldier(gameEngine, 100, 0, ASSET_MANAGER.getAsset("img/EnemySheet1.png"), ctx));
        gameEngine.addEntity(new Soldier_Shield(gameEngine, 200, 300, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        gameEngine.addEntity(new Crow(gameEngine, 500, 300, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        gameEngine.addEntity(new Dino(gameEngine, 700, 350, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Terrain(gameEngine, 100, 600, 75, 75, [10,10], img=null, ctx=null, scale=null, tiles=null));

        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

