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
    "sound"
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
    Sound
) {

	class LevelTwo {

		/* Define terrain */
		constructor(gameEngine, assetManager, ctx) {

			// instance variables
			this.gameEngine = gameEngine;
			this.assetManager = assetManager;
			this.ctx = ctx;
            this.tilesheet = assetManager.getAsset("img/pipes.png");
            this.checkpoints = [[], [], []];
            this.activatedCheckpoints = { "start": true, "first": false, "second": false, "third": false }
            this.currentCheckpoint = "start";

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
`                                                                                                                                                                #
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     |
                                                                               |                                             
                                                                               |                                                          
                                                                               |                      []{}{______}{}{___}{}{_________}{}[]
                                                                               |                      []ljl------jljl---jljl---------jlj[]                
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
                
		}

        load() {
            this.constructTerrain();
            this.populateMap();
        }

		constructTerrain() {
			console.log("constructing terrain...")
			console.log(this.map[0].length + " x " + this.map.length)
			for (var col = 0; col < this.map[0].length; col++) {
				for (var row = 0; row < this.map.length; row++) {
                    var tile = this.tileMap[this.map[row][col]];
                    if (tile != null) {
                        var tileDimension = this.tileDimensions[this.map[row][col]];
						this.gameEngine.addEntity(new Terrain(this.gameEngine, col * this.tileSize, row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile, tileDimension));
					}
				}
			}
		}

        populateMap() {
            //if (this.checkpointArray(true, false, false, false)) {
            //    this.section_1();
            //}
            section_1();
            section_2();
            section_3();
        }

        /*Define Sections*/
        section_1() {
            /***HAZARDS***/

            /***ENEMIES***/
            this.gameEngine.addEntity(new Hand(this.gameEngine, 2283, 1344, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
            this.gameEngine.addEntity(new Dino(this.gameEngine, 1960, 984, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 90, 60, 400, 250));
            this.gameEngine.addEntity(new Crow(this.gameEngine, 750, 1000, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40,
                /*sightRadius*/[400, 400], /*Murder Parameters*/true, [[-600, 200], [400, 400]]));
            this.gameEngine.addEntity(new Soldier_Shield(this.gameEngine, 1300, 1440, this.assetManager.getAsset("img/Enemies.png"), this.ctx));//x: 8652, y: 1152

            /***ITEMS***/

            /***TOP LAYER ENTITIES***/
            
        }

        section_2() {
            this.gameEngine.addEntity(new Hazards["launcher"](this.gameEngine, 6875, 792 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 90, 370, 20))
            this.gameEngine.addEntity(new Hazards["launcher"](this.gameEngine, 6875 - 95, 984 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 90, 370, 50))
            this.gameEngine.addEntity(new Hazards["launcher"](this.gameEngine, 6875, 1176 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 45, 370, 60))
        }

        section_3() {

            /***HAZARDS***/
            this.gameEngine.addEntity(new Hazards["fireball"](this.gameEngine, 7300, 1450 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 4,
                                /*cooldown*/ 50, /*speed*/ 20));
            this.gameEngine.addEntity(new Hazards["fireball"](this.gameEngine, 7820, 1450 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 4,
                                /*cooldown*/ 50, /*speed*/ 20, /*offset*/ 25));
            //this.gameEngine.addEntity(new Hazards["spikes"](this.gameEngine, 700,
            //                        1440 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20*6, 0, 18));
            this.gameEngine.addEntity(new Hazards["spikes"](this.gameEngine, 7512,
                1152 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4, 0, 3));
            this.gameEngine.addEntity(new Hazards["spikes"](this.gameEngine, 7980,
                1056 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4, 20, 3));
            this.gameEngine.addEntity(new Hazards["spikes"](this.gameEngine, 8665,

                1150 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 3.5, 40, 0));
            this.gameEngine.addEntity(new Hazards["spikes"](this.gameEngine, 7692,
                700 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4.5, 0, 3));
            this.gameEngine.addEntity(new Hazards["spikes"](this.gameEngine, 8064,
                250 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 5, 40, 20));

            this.gameEngine.addEntity(new Hazards["launcher"](this.gameEngine, 7965, -300, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 7, 7, [0, 1], 120, 160))

            /***ENEMIES***/
            this.gameEngine.addEntity(new Crow(this.gameEngine, 9600, -200, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40,
                [1000, 700], true, [[-400, 600], [-800, 2000]]));
            this.gameEngine.addEntity(new Hand(this.gameEngine, 6825, 984, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
            this.gameEngine.addEntity(new Soldier_Shield(this.gameEngine, 10598, 384, this.assetManager.getAsset("img/Enemies.png"), this.ctx));//x: 8652, y: 1152
            this.gameEngine.addEntity(new Dino(this.gameEngine, 11980, 384, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3));

           
            /***ITEMS***/
            this.gameEngine.addEntity(new Item.HealthPack(this.gameEngine, 7050, 1248, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 3, 1));
            this.gameEngine.addEntity(new Item.EnergyPack(this.gameEngine, 7080, 1248, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 3, 1));
            this.gameEngine.addEntity(new Item.HealthPack(this.gameEngine, 8665, 950, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 3, 1));
            this.gameEngine.addEntity(new Item.EnergyPack(this.gameEngine, 8635, 1000, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 3, 1));

            /***TOP LAYER ENTITIES***/
            this.gameEngine.addEntity(new Hazards["lava"](this.gameEngine, 7500, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
            this.gameEngine.addEntity(new Hazards["lava"](this.gameEngine, 8400, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
            this.gameEngine.addEntity(new Hazards["lava"](this.gameEngine, 9300, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));

        }

        checkpointArray(start, first, second, third) {
            if (this.states.activatedCheckpionts.start === start) {
                if (this.states.activatedCheckpoints.first === first) {
                    if (this.states.activatedCheckpoints.second === second) {
                        if (this.states.activatedCheckpoints.third === third) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }

	return LevelTwo;
});