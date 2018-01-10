define([
    'asset-manager',
    'game-engine',
    'game-board'
], function(
    AssetManager,
    GameEngine,
    GameBoard,
) {

    let init = function() {
        console.log("init")
    };

    // the "main" code begins here

    let ASSET_MANAGER = new AssetManager();

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        var canvas = document.getElementById('gameWorld');
        var ctx = canvas.getContext('2d');

        var gameEngine = new GameEngine();
        var gameboard = new GameBoard();

        gameEngine.addEntity(gameboard);
     
        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

