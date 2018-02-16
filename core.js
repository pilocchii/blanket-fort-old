define([
    'asset-manager',
    'game-engine',
    "game-board",
    "camera",
    "entity",
    "hero",
    "leo",
    "flames",
    "solider",
    "terrain"
], function(
    AssetManager,
    GameEngine,
    GameBoard,
    Camera,
    Entity,
    Hero,
    Leo,
    Flames,
    Soldier,
    Terrain
) {

    let init = function() {
        console.log("init")
    };

    // the "main" code begins here

    toload = [
        "img/ZXe.png",
        "img/Leo.png",
        "img/EnemySheet1.png",
        "img/pipes.png"
    ];

    let ASSET_MANAGER = new AssetManager(toload);

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        let canvas = document.getElementById('gameWorld');
        canvas.width = 5000;
        canvas.height = 5000;
        let ctx = canvas.getContext('2d');
        console.log(canvas.width);
        console.log(canvas.height);

        let gameEngine = new GameEngine();

        // gameEngine.showOutlines = true;
        // let gameboard = new GameBoard();

        // gameEngine.addEntity(gameboard);
        let camera = new Camera(gameEngine, 0, 0, null, ctx=ctx, 1000, 1000, canvas.width, canvas.height) //Placeholder magic numbers until we decide on how to handle world boundary
        let player = new Hero(gameEngine, 200, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
        camera.follow(player);

        /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/
        gameEngine.addEntity(camera);
        gameEngine.addEntity(player);       

        gameEngine.addEntity(new Terrain(gameEngine, 0, 600, [32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx=ctx, scale=3, tiles=[[2,0], [3, 0], [4,0]]));
        
        
        // gameEngine.addEntity(new Leo(gameEngine, 200, 150, ASSET_MANAGER.getAsset("img/Leo.png"), ctx));
        // gameEngine.addEntity(new Flames(gameEngine, 200, 700, ASSET_MANAGER.getAsset("img/Leo.png"), ctx));
        // gameEngine.addEntity(new Soldier(gameEngine, 100, 0, ASSET_MANAGER.getAsset("img/EnemySheet1.png"), ctx));
        // gameEngine.addEntitySet()


        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

