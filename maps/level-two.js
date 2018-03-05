define([
    "terrain",
    "game-engine",
],function(
    Terrain,
    GameEngine,
){

	class LevelTwo {

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
                'i': [0, 6],
				'!': [1, 0],
				'[': [1, 4],
                '<': [1, 6],
				'{': [2, 0],
                '>': [2, 6],
				'_': [3, 0],
				'#': [3, 1],
				'-': [3, 4],
				'}': [4, 0],
				'j': [4, 3],
                '|': [4, 6],
				'l': [2, 3],
                '~': [6, 0],
				']': [6, 3],	
            }
            this.tileDimensions = {
                //boundWidth, boundHeight, offX, offY
                'i': [16, 32, 44, 0],
                '!': [16, 32, 44, 0],
                '[': [32, 32, 0, 0],
                '<': [16, 16, 44, 24],
                '{': [32, 32, 0, 0],
                '>': [16, 16, 0, 24],
                '_': [32, 32, 0, 0],
                '#': [32, 32, 0, 0],
                '-': [32, 32, 0, 0],
                '}': [32, 32, 0, 0],
                'j': [32, 32, 0, 0],
                '|': [16, 32, 4, 0],
                'l': [32, 32, 0, 0],
                '~': [32, 16, 0, 24],
                ']': [32, 32, 0, 0],
            }

// 20 lines from top to bottom
this.map = 
`                                                                                                                        #
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     |
                                                                               |                                             
                                                                               |                                                         
                                                                               |         
                                                                               |                                                         
                                                                               |
                                                                               |                           
                                                                       <                                                             
                                                                                 
                   <~~~~~>                                            <~~                                                                                                              
                                                                                   
                                                                       <                               
                                       []{}{______}{}{___}{}{_________}{}[]                                                     
                       {}              []ljl------jljl---jljl---------jlj[]                                                     
{___}{}{}{______}{}{___}{}{_________}{}[]                                                                                   
l---jljljl------jljl---jljl---------jlj[]                                                                                   
`.split('\n');
                

			this.constructTerrain();

		}




		constructTerrain() {
			console.log("constructing terrain...")
			console.log(this.map[0].length + " x " + this.map.length)
			for (var col = 0; col < this.map[0].length; col++) {
				for (var row = 0; row < this.map.length; row++) {
                    var tile = this.tileMap[this.map[row][col]]
                    if (tile != null) {
                        var tileDimension = this.tileDimensions[this.map[row][col]];
						this.gameEngine.addEntity(new Terrain(this.gameEngine, col * this.tileSize, row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile, tileDimension));

					}
				}
			}
			// this.gameEngine.addEntity(new Terrain(this.gameEngine, 100, 600, [32, 32], , this.ctx, 3, [[2,0], [3, 0], [4,0]]));
		}


		/* Define enemies */
        //DINO: 1885, 1254

	}

	return LevelTwo;
});