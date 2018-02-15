define([
    "terrain",
    "game-engine"
],function(
    Terrain,
    GameEngine
){

	class LevelOne {

	/* Define terrain */
	constructor(gameEngine) {

		// instance variables
		this.gameEngine = gameEngine;

	}


	constructTerrain() {

		gameEngine.addEntity(new Terrain(gameEngine, 100, 600, [32, 32], ASSET_MANAGER.getAsset("img/pipes.png"), ctx=ctx, scale=3, tiles=[[2,0], [3, 0], [4,0]]));
	}


	/* Define enemies */

	}

	return LevelOne;
}