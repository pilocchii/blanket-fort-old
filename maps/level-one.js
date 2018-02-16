define([
    "terrain",
    "game-engine",
],function(
    Terrain,
    GameEngine,
){

	class LevelOne {

		/* Define terrain */
		constructor(gameEngine, assetManager, ctx) {

			// instance variables
			this.gameEngine = gameEngine;
			this.assetManager = assetManager;
			this.ctx = ctx;
			this.tilesheet = assetManager.getAsset("img/pipes.png");

			this.tileSize = 96;

			this.tileMap = {
				' ': null,
				// '\n': null,
				'|': [1, 0],
				'[': [1, 4],
				'{': [2, 0],
				'_': [3, 0],
				'#': [3, 1],
				'-': [3, 4],
				'}': [4, 0],
				'j': [4, 3],
				'l': [2, 3],
				']': [6, 3],
				
				
			}

this.map = 
`          []                                      
          []
          []
          [] 
          []        {____}
          lj        l----j
                    
               
  {______}{}{___}{}    
 {[######]lj[###]lj     
{[[######]{}[###]                   `.split('\n');


			this.constructTerrain();

		}




		constructTerrain() {
			console.log("constructing terrain...")
			console.log(this.map[0].length + " x " + this.map.length)
			for (var col = 0; col < this.map[0].length; col++) {
				for (var row = 0; row < this.map.length; row++) {
					var tile = this.tileMap[this.map[row][col]]
					if (tile != null) {
						this.gameEngine.addEntity(new Terrain(this.gameEngine, col * this.tileSize, row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile));

					}
				}
			}

			// this.gameEngine.addEntity(new Terrain(this.gameEngine, 100, 600, [32, 32], , this.ctx, 3, [[2,0], [3, 0], [4,0]]));


		}


		/* Define enemies */

	}

	return LevelOne;
});