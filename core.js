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
    "solider",
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
    Soldier,
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

        let gameEngine = new GameEngine();
        let camera = new Camera(gameEngine, 0, 0, null, ctx=ctx, canvas.width, canvas.height, 2000, 2000)
        let hero = new Hero(gameEngine, 100, 1400, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
        let hud = new Hud(gameEngine, ASSET_MANAGER.getAsset("img/hud.png"), hero, [0, 0], [0, 0], [100, 100], 3, camera);
        
        //TODO: Placeholder magic numbers until we decide on how to handle world boundary and camera

        /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/
        
        gameEngine.addEntity(camera);


        let background = new Background(gameEngine, ASSET_MANAGER, ctx, camera);
        //let levelOne = new LevelOne(gameEngine, ASSET_MANAGER, ctx);
        let levelTwo = new LevelTwo(gameEngine, ASSET_MANAGER, ctx);       
        
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

        //***LEVEL ONE***
        //gameEngine.addEntity(new Item.HealthPack(gameEngine, 2935, 1200, ASSET_MANAGER.getAsset("img/healthpack.png"), ctx, 10, 8));
        //gameEngine.addEntity(new Item.EnergyPack(gameEngine, 2965, 1200, ASSET_MANAGER.getAsset("img/energypack.png"), ctx, 10, 8));
        //gameEngine.addEntity(new Item.HealthPack(gameEngine, 300, 400, ASSET_MANAGER.getAsset("img/healthpack.png"), ctx, 10, 8));
        //gameEngine.addEntity(new Item.EnergyPack(gameEngine, 330, 400, ASSET_MANAGER.getAsset("img/energypack.png"), ctx, 10, 8));

        //gameEngine.addEntity(new Soldier_Shield(gameEngine, 1800, 1450, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Crow(gameEngine, 1350, 1300, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Crow(gameEngine, 2950, 1700, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Soldier_Shield(gameEngine, 1300, 1100, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Crow(gameEngine, 400, 300, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));


        //gameEngine.addEntity(new Dino(gameEngine, 2130, 1061, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx, 3, 90, 60, 400, 250));
        //gameEngine.addEntity(new Dino(gameEngine, 1980, 582, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));

        ////TODO: What is this? Can we remove it?
        //gameEngine.addEntity(new Terrain(gameEngine, 0, 600, [32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx=ctx, scale=3, tiles=[[2,0], [3, 0], [4,0]]));

        //***LEVEL TWO***
        //gameEngine.addEntity(new Hand(gameEngine, 1885, 1350, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Dino(gameEngine, 1960, 984, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx, 3, 90, 60, 400, 250));
        //gameEngine.addEntity(new Crow(gameEngine, 2200, 1750, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Crow(gameEngine, 1960, 984, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Crow(gameEngine, 2700, 1200, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        //gameEngine.addEntity(new Soldier_Shield(gameEngine, 1300, 1440, ASSET_MANAGER.getAsset("img/Enemies.png"), ctx));
        gameEngine.addEntity(new Hazards["lava"](gameEngine, 700, 1440 + (96 * 3 - 6 * 3), ASSET_MANAGER.getAsset("img/Enemies.png"), ctx, 3, 64)); //96*3 - 6*3 aligns with floor
        gameEngine.addEntity(new Hazards["fireball"](gameEngine, 700, 1440 + (96 * 3 - 6 * 3), ASSET_MANAGER.getAsset("img/Enemies.png"), ctx, 3, 64));
        //gameEngine.addEntity(new Lava(gameEngine, 1450, 1440 + (96 * 3 - 6 * 3), ASSET_MANAGER.getAsset("img/Enemies.png"), ctx, 3, 320)); //96*3 - 6*3 aligns with floor
        
        gameEngine.addEntity(hud);
        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

