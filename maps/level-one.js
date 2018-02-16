define([
    "terrain",
    "game-engine",
    // "text!testmap"
],function(
    Terrain,
    GameEngine,
    // testmap
){

	class LevelOne {

		/* Define terrain */
		constructor(gameEngine, assetManager, ctx) {

			// instance variables
			this.gameEngine = gameEngine;
			this.assetManager = assetManager;
			this.ctx = ctx;
			this.tilesheet = assetManager.getAsset("img/pipes.png");

			this.tileSize = 75;

			this.tileMap = {
				' ': null,
				'+': [2, 0],
				'|': [1, 0],
				'_': [3, 0]
			}

			this.map = [ 
			['|', ' ', ' ', ' ', ' ', ' ', ' '],
			['|', ' ', ' ', ' ', ' ', ' ', ' '],
			['|', ' ', ' ', ' ', ' ', ' ', ' '],
			['|', ' ', ' ', ' ', ' ', ' ', ' '],
			['|', ' ', ' ', ' ', ' ', ' ', ' '],
			['|', '+', '_', '_', '_', '_', '_'],
			];

			this.constructTerrain();

		}


		constructTerrain() {

			for (var col = 0; col < this.map[0].length; col++) {
				for (var row = 0; row < this.map.length; row++) {
					var tile = this.map[row][col]
					if (tile != null && tile != ' ') {
						this.gameEngine.addEntity(new Terrain(this.gameEngine, col * this.tileSize, row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, this.tileMap[this.map[row][col]]));

					}
				}
			}

			// this.gameEngine.addEntity(new Terrain(this.gameEngine, 100, 600, [32, 32], , this.ctx, 3, [[2,0], [3, 0], [4,0]]));


		}


		/* Define enemies */

	}

	return LevelOne;
});