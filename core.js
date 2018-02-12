define([
    'asset-manager',
    'game-engine',
    "game-board",
    "entity",
    "terrain",
    "hero",
    "leo",
    "flames",
    "solider",
    "soldier-shield",
    "crow",    
], function(
    AssetManager,
    GameEngine,
    GameBoard,
    Entity,
    Terrain,
    Hero,
    Leo,
    Flames,
    Soldier,
    Soldier_Shield,
    Crow,  
) {

    let init = function() {
        console.log("init")
    };

    // the "main" code begins here

    toload = [
        "img/ZXe.png",
        "img/Leo.png",
        "img/EnemySheet1.png",
        "img/Enemies.png",
    ];

    let ASSET_MANAGER = new AssetManager(toload);

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        let canvas = document.getElementById('gameWorld');
        let ctx = canvas.getContext('2d');

        let gameEngine = new GameEngine();

        // gameEngine.showOutlines = true;
        // let gameboard = new GameBoard();

        // gameEngine.addEntity(gameboard);
        //(game, x, y, img=null, ctx=null, scale=3, spriteWidth=50, spriteHeight=50)
        gameEngine.addEntity(new Hero(gameEngine, 400, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx));
        // gameEngine.addEntity(new Leo(gameEngine, 200, 150, ASSET_MANAGER.getAsset("img/Leo.png"), ctx));
        // gameEngine.addEntity(new Flames(gameEngine, 200, 700, ASSET_MANAGER.getAsset("img/Leo.png"), ctx));
        // gameEngine.addEntity(new Soldier(gameEngine, 100, 0, ASSET_MANAGER.getAsset("img/EnemySheet1.png"), ctx));
        gameEngine.addEntity(new Soldier_Shield(gameEngine, 100, 100, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        gameEngine.addEntity(new Crow(gameEngine, 400, 100, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx))
        gameEngine.addEntity(new Terrain(gameEngine, 300, 600, null, ctx));

        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

