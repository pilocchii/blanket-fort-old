import AssetManager from "../asset-manager"
import GameEngine from "../game-engine"
import Hud from "../hud"
import Background from "../background"
import Sound from "../sound"
import Animation from "../animation"

import {
    GameBoard,
    Camera,
    Entity,
    Terrain,
    Hero,
    Leo,
    Flames,
    SoldierShield,
    Dino,
    Crow,
    Bullet,
    Shotblast,
    Enemy,
    Hurtbox,
    Hand,
    Hazards,
    HealthPack,
    EnergyPack
} from "../entities"


class LevelOne {

    /* Define terrain */
    constructor(gameEngine, assetManager, ctx) {

        //instance variables
        this.gameEngine = gameEngine;
        this.assetManager = assetManager;
        this.ctx = ctx;
        this.tilesheet = assetManager.getAsset("img/pipes.png");
        this.levelNum = 1;
        this.sectionNum;
        this.checkpoints = [[15, 1824], [3870, 0]];
        this.camVals = [[2, 1.5], [2, 1.5]];
        this.camSpeeds = [[7, 7], [7, 7]];
        this.activatedCheckpoints = [true, false, false, false];
        this.nextLevel = 2;
        this.activatedCheckpoints = [true, false];
        this.portal = new Portal(this.gameEngine, 3870, -20, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, true);

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
`{____________________________}    {}   {_}                                                        
l----------------------------j    []   l-j 
!                             {}  []
!                             lj  []
!   {________}                    []
!   l--------j                    []
!             {}    {}      {____}[]
!             lj    lj      l----j[]
<~~~~~~~~~>                      |[]
      {}                     |[]               
      []                     |[]
      []{____}    {____}     |[]
      []l----j    l----j     |[]
      []                     |[]
      lj                     |[]
                          {__}[]
                          l--j[]
{}{______}{}{___}{}{_________}{}[]
lj[------]lj[###]lj[#########]lj[]
{}{}[]!~~|[]{}l---j{}l---------j{}[]
lj[][]!  |[]lj~~~~~lj           lj[]
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
                var tile = this.tileMap[this.map[row][col]]
                if (tile != null) {
                    var tileDimension = this.tileDimensions[this.map[row][col]];
                    this.gameEngine.addEntity(new Terrain(this.gameEngine, col * this.tileSize, row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile, tileDimension));
                }
            }
        }
    }

    populateMap(checkpoint) {
        if (checkpoint === -1) {
            this.section_1();
        }
        else {
            if (checkpoint === 0) {
                this.section_1();
            }
        }
    }

    section_1() {
        this.sectionNum = 0;
        this.gameEngine.addEntity(new HealthPack(this.gameEngine, 2935, 1200, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4));
        this.gameEngine.addEntity(new EnergyPack(this.gameEngine, 2965, 1200, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4));
        this.gameEngine.addEntity(new HealthPack(this.gameEngine, 300, 400, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4));
        this.gameEngine.addEntity(new EnergyPack(this.gameEngine, 330, 400, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4));

        this.gameEngine.addEntity(new Hand(this.gameEngine, 2300, 1450, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
        this.gameEngine.addEntity(new SoldierShield(this.gameEngine, 1800, 1450, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
        this.gameEngine.addEntity(new Crow(this.gameEngine, 1350, 1300, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
        this.gameEngine.addEntity(new Crow(this.gameEngine, 2950, 1700, this.assetManager.getAsset("img/Enemies.png"), this.ctx));


        this.gameEngine.addEntity(new SoldierShield(this.gameEngine, 1300, 1100, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
        this.gameEngine.addEntity(new Crow(this.gameEngine, 400, 300, this.assetManager.getAsset("img/Enemies.png"), this.ctx));

        this.gameEngine.addEntity(new Dino(this.gameEngine, 2130, 1061, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 90, 60, 400, 250));
        this.gameEngine.addEntity(new Dino(this.gameEngine, 1980, 582, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
    }
}

class LevelTwo {

    /* Define terrain */
    constructor(gameEngine, assetManager, ctx) {

        // instance variables
        this.gameEngine = gameEngine;
        this.assetManager = assetManager;
        this.ctx = ctx;
        this.tilesheet = assetManager.getAsset("img/pipes.png");
        this.levelNum = 2;
        this.sectionNum;
        this.checkpoints = [[-570, 1440], [3200, 1440], [7000, 1200], [9955, 384]];
        this.camVals = [[2, 1.5], [2.75, 1.75], [2, 1.5], [2, 2]];
        this.camSpeeds = [[7, 7], [7, 4], [4, 4], [4, 4]];
        this.activatedCheckpoints = [true, false, false, false];
        this.nextLevel = -1;
        this.portal = new Portal(this.gameEngine, -570, 1420, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, true);

        //I'd like to use an array of functions (will let us have an actual Level superclass)
        //this.sectionFunctions = null;

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
                                                                           |                       {}
                                                                           |                       []                     
                                                                           |                       []               
                                                                           |                       []                  
                                                                   <                               []              
                                                                                                   []
         <~~~~~>                                                  <~~                              []                                                                             
                                                                                                   []                           
                                                                   <                               []                          
                                   {}{}{______}{}{___}{}{_________}{}{}                            []                          ]
                   {}              []ljl------jljl---jljl---------jlj[]                            []                          ]
{___}{}{}{______}{}{___}{}{_________}{}[]                                []                            lj                          ]
[###]ljlj[######]ljl---j[]l---------jlj[]                                lj--------------------------------------------------------j
[###]    [######]       []             []                                                              
[###]    [######]       []             []                                
[###]    [######]       []             []                                                      
`.split('\n');

        this.mapStart = 
`{_}
l-j
`.split('\n');

    }

    load() {
        this.constructTerrain();
        //mapStart (this saves work for now. Not good practice. Unless we formalize it?)
        for (var col = 0; col < this.mapStart[0].length; col++) {
            for (var row = 0; row < this.mapStart.length; row++) {
                var tile = this.tileMap[this.mapStart[row][col]];
                if (tile != null) {
                    var tileDimension = this.tileDimensions[this.mapStart[row][col]];
                    this.gameEngine.addEntity(new Terrain(this.gameEngine, -650 + col * this.tileSize, 1440 + row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile, tileDimension));
                }
            }
        }
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

    populateMap(checkpoint) {
        if (checkpoint === -1) {
            this.section_1();
            this.section_2();
            this.section_3();
            this.section_4();
        }
        else {
            if (checkpoint === 0) {
                this.section_1();
            }
            if (checkpoint === 1) {
                this.section_2();
            }
            if (checkpoint === 2) {
                this.section_3();
            }
            if (checkpoint === 3) {
                this.section_4();
            }
        }
    }

    /*Define Sections*/
    section_1() {
        this.sectionNum = 0;
        /***HAZARDS***/

        /***ENEMIES***/
        var hand1 = new Hand(this.gameEngine, 2283, 1344, this.assetManager.getAsset("img/Enemies.png"), this.ctx);
        hand1.distance = 75;
        hand1.sightRadius[0] = 2300;
        this.gameEngine.addEntity(hand1);
        this.gameEngine.addEntity(new Crow(this.gameEngine, 500, 1000, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40, [300, 1000]));
        this.gameEngine.addEntity(new Dino(this.gameEngine, 1460, 984, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 90, 60, /*patrol distance*/300, /*shot time offset*/ 0));
        this.gameEngine.addEntity(new Crow(this.gameEngine, 2300, 1000, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40,
            /*sightRadius*/[300, 1000], /*Murder Parameters*/true, [[-600, 200], [400, 400]]));
        this.gameEngine.addEntity(new SoldierShield(this.gameEngine, 1000, 1440, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
        this.gameEngine.addEntity(new Hand(this.gameEngine, 3200, 1440, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
        //this.gameEngine.addEntity(new Dino(this.gameEngine, 3000, 1440, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 90, 60, /*patrol distance*/0, /*shot time offset*/ 125));

        /***ITEMS***/

        /***TOP LAYER ENTITIES***/

    }

    section_2() {
        this.sectionNum = 1;
        this.gameEngine.addEntity(new Hand(this.gameEngine, 6825, 984, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
        this.gameEngine.addEntity(new Launcher(this.gameEngine, 6875, 792 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 90, 350, 20))
        this.gameEngine.addEntity(new Launcher(this.gameEngine, 6875 - 95, 984 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 90, 350, 50))
        this.gameEngine.addEntity(new Launcher(this.gameEngine, 6875, 1176 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 45, 350, 60))
    }

    section_3() {
        this.sectionNum = 2;
        /***BOTTOM LAYER ENTITIES***/
        this.gameEngine.addEntity(new HealthPack(this.gameEngine, 8665, 950, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4, 15));
        this.gameEngine.addEntity(new EnergyPack(this.gameEngine, 8635, 1000, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4, 15));

        /***HAZARDS***/
        this.gameEngine.addEntity(new Fireball(this.gameEngine, 7300, 1450 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 4,
                            /*cooldown*/ 50, /*speed*/ 20));
        this.gameEngine.addEntity(new Fireball(this.gameEngine, 7820, 1450 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 4,
                            /*cooldown*/ 50, /*speed*/ 20, /*offset*/ 25));
        this.gameEngine.addEntity(new Spikes(this.gameEngine, 7512,
            1152 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4, 0, 3));
        this.gameEngine.addEntity(new Spikes(this.gameEngine, 7980,
            1056 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4, 20, 3));
        this.gameEngine.addEntity(new Spikes(this.gameEngine, 8665,

            1150 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 3.5, 40, 0));
        this.gameEngine.addEntity(new Spikes(this.gameEngine, 7692,
            700 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4.5, 0, 3));
        this.gameEngine.addEntity(new Spikes(this.gameEngine, 8064,
            250 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 7, 40, 20));

        this.gameEngine.addEntity(new Launcher(this.gameEngine, 7965, -300, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 7, 7, [0, 1], 120, 160))

        /***ENEMIES***/
        this.gameEngine.addEntity(new Crow(this.gameEngine, 8650, -300, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40,
            [25, 1000], true, [[-600, 250], [600, 250]]));

        /***ITEMS***/
        this.gameEngine.addEntity(new HealthPack(this.gameEngine, 7050, 1248, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4, 15));
        this.gameEngine.addEntity(new EnergyPack(this.gameEngine, 7080, 1248, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4, 15));

        /***TOP LAYER ENTITIES***/
        this.gameEngine.addEntity(new Lava(this.gameEngine, 7500, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
        this.gameEngine.addEntity(new Lava(this.gameEngine, 8400, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
        this.gameEngine.addEntity(new Lava(this.gameEngine, 9300, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
    }

    section_4() {
        this.sectionNum = 3;
        var spikesOrigin = [10570 - 28, 790 + 46]
        var spikeOffsets = [
            [0, 0],
            [1 * 450 - 200, 1 * -250],
            [2 * 450 - 125, 2 * -250],
            [3 * 450 - 125, 2 * -250],
            [4 * 450 - 200, 1 * -250],
            [5 * 450 - 375, 0 * -250],
            [3 * 450 - 75, -1 * -250],
            [2 * 450 - 225, -1 * -250],
            [3 * 450 - 350, 1 * -50],
        ]
        var i = 0;
        var time = 80;
        /***HAZARDS***/
        var spikes1 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 40, 2, 0);

        var spikes2 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 60, 2, 0);

        var spikes3 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 80, 2, 0);

        var spikes4 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 80, 2, 0);

        var spikes5 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 60, 2, 0);

        var spikes6 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 40, 2, 0);

        var spikes7 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 20, 2, 0);

        var spikes8 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 20, 2, 0);

        var spikes9 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1],
            this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true,
            time, 0, 2, 0);
        //this.gameEngine.addEntity(new Hazards["projectile-circle"](this.gameEngine, 11600, 800, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 10, 10, 100))


      
        /***ENEMIES***/
        this.gameEngine.addEntity(new Crow(this.gameEngine, 12150, 900, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40,
            [650, 500], true, [[-1200, 0], [-600, -700]]));

        /***ITEMS***/

        /***TOP LAYER ENTITIES***/
        this.gameEngine.addEntity(new Lava(this.gameEngine, 10200, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
        this.gameEngine.addEntity(new Lava(this.gameEngine, 11100, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
        this.gameEngine.addEntity(new Lava(this.gameEngine, 12000, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
        var spikesBorder = new Spikes(this.gameEngine, 12543 - 20,
            1248 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 5, 20 * 3, 2, 0);
    }
}

class Portal extends Entity {
    constructor(game, x, y, img = null, ctx = null, scale = null, facingRight) {
        super(game, x, y, img, ctx);
        this.parentClass = "Enemy";
        this.type = "Hazard";
        //this.y += 44; Give a +44 offset when instantiating 
        this.scale = scale;
        this.spriteWidth = 60;
        this.spriteHeight = 60;
        this.centerX = x + ((this.spriteWidth * this.scale) / 2) - this.spriteWidth;
        this.boundWidth = this.scale * 8 + 3;
        this.boundHeight = this.scale * 8 + 3;
        this.boundX = this.centerX - this.scale * 5;
        this.boundY = this.y - this.spriteHeight * this.scale / 2 + 5 * this.scale;

        this.cooldown = 20;
        this.cooldownTimer = 0;

        this.states = {
            "facingRight": facingRight,
            "active": true,
        };
        this.animations = {
            "active": new Animation(this.img, [this.spriteWidth, this.spriteHeight], 11, 8, 5, 8, false, this.scale),
        };
        this.animation = this.animations.active;
    }

    /*Updates the entity each game loop. i.e. what does this entity do? */
    update() {
        if (this.states.active) {
            if (this.animation.isDone()) {
                this.states.active = false;
                this.animation.reset();
                this.cooldownTimer = this.cooldown;
            }
        }
        else if (this.cooldownTimer > 0) {
            this.cooldownTimer--;
        }
        else {
            this.states.active = true;
        }

    }

    collided(other, direction) {
        //Make noise when hero collides?
    }

    drawOutline(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.rect(this.boundX,
            this.boundY,
            this.boundWidth, this.boundHeight);
        ctx.stroke();
        ctx.closePath();
    }

    draw(ctx) {
        if (this.states.active) {
            this.animation = this.animations.active;
            this.drawImg(ctx);
        }
    }

    drawImg(ctx) {
        this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
        if (this.game.drawBoxes) {
            this.drawOutline(ctx);
        }
    }
}

export {LevelOne, LevelTwo}