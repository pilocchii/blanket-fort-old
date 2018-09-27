/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./src/engine/index.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ "./src/entities/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
/* harmony import */ var _util_const_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/const.json */ "./src/util/const.json");
var _util_const_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./util/const.json */ "./src/util/const.json", 1);




/* Assembles and starts the game. */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var canvasId = _util_const_json__WEBPACK_IMPORTED_MODULE_3__.canvasId;
  var toload = ["img/ZXe.png", "img/Leo.png", "img/EnemySheet1.png", "img/pipes.png", "img/Enemies.png", "img/hud.png", "img/healthpack.png", "img/energypack.png", "img/bg/1_bg.png", "img/bg/2_farbuildings.png", "img/bg/3_buildings.png", "img/bg/4_foreground.png", "img/bg/bot_fill.png"];
  var ASSET_MANAGER = new _engine__WEBPACK_IMPORTED_MODULE_0__["AssetManager"](toload);
  _util__WEBPACK_IMPORTED_MODULE_2__["Logging"].debug("Starting asset manager download..."); // callback after AssetManager is finished... downloads every asset before beginning. what's a better way?

  ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    _util__WEBPACK_IMPORTED_MODULE_2__["Logging"].debug("canvas width: " + canvas.width);
    _util__WEBPACK_IMPORTED_MODULE_2__["Logging"].debug("canvas height: " + canvas.height);
    var gameEngine = new _engine__WEBPACK_IMPORTED_MODULE_0__["GameEngine"]();
    var camera = new _entities__WEBPACK_IMPORTED_MODULE_1__["Camera"](gameEngine, 0, 0, null, ctx = ctx, canvas.width, canvas.height, _util_const_json__WEBPACK_IMPORTED_MODULE_3__.settings.canvasWidth, _util_const_json__WEBPACK_IMPORTED_MODULE_3__.settings.canvasHeight); // let hero = new Hero(gameEngine, 0, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
    // let board = new GameBoard(gameEngine, ASSET_MANAGER, ctx);

    gameEngine.hero = null; // gameEngine.gameboard = board;
    // let hud = new Hud(gameEngine, ASSET_MANAGER.getAsset("img/hud.png"), hero, [0, 0], [0, 0], [100, 100], 3, camera);
    // board.hud = hud;
    // board.hero = hero;
    // ### music ###
    //TODO: Placeholder magic numbers until we decide on how to handle world boundary and camera

    /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/

    gameEngine.addEntity(camera);
    gameEngine.camera = camera;
    var background = new _engine__WEBPACK_IMPORTED_MODULE_0__["Background"](gameEngine, ASSET_MANAGER, ctx, camera); //Loads level n
    // board.getLevel(1);

    camera.follow(hero);
    gameEngine.addEntity(board); //gameEngine.addEntity(hero);
    //gameEngine.addEntity(hud);

    gameEngine.init(ctx);
    gameEngine.start();
  });
});

/***/ }),

/***/ "./src/engine/animation.js":
/*!*********************************!*\
  !*** ./src/engine/animation.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/engine/asset-manager.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**************
Animation class

Properties:
spriteSheet - an Image object of this animation's spritesheet.
frameDimensions[width, height] - an array of length 2, denoting the width and height of 
    one frame in the series.
row - an integer denoting the row (beginning with 0) of the spritesheet to play.
sheetWidth - an integer denoting the number of frames in one row. If sheetWidth is greater
    than this Animation's frames property, it will continue to the first column on the next row.
frameDuration - the number of frames each sprite in the animation will be shown for.
frames - the number of frames in this animation.
loop - a boolean denoting whether this animation should replay or not.
scale - a value to multiply the original sprite's size by.
columnOffset - added to this.currentFrame to get starting point of any animations that start partway into a sheet.
*/

var Animation =
/*#__PURE__*/
function () {
  function Animation(spriteSheet, frameDimensions, row, sheetWidth, frameDuration, frames, loop, scale) {
    var columnOffset = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;

    _classCallCheck(this, Animation);

    this.spriteSheet = spriteSheet;
    this.frameWidth = frameDimensions[0];
    this.frameDuration = frameDuration;
    this.frameHeight = frameDimensions[1]; //can't add 1 here. Messes up frames lower down the sprite sheet

    this.row = row;
    this.columnOffset = columnOffset;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.loops = 0;
    this.scale = scale;
  }

  _createClass(Animation, [{
    key: "drawFrame",
    value: function drawFrame(tick, ctx, x, y, facingRight) {
      this.elapsedTime += tick;

      if (this.isDone()) {
        if (this.loop) {
          this.elapsedTime = 0;
          this.loops++;
        }
      }

      var frame = this.currentFrame();
      var xindex = 0;
      var yindex = 0;
      var drow = this.row * this.frameHeight;
      xindex = frame % this.sheetWidth;
      yindex = Math.floor(frame / this.sheetWidth); // Draw facing left

      if (!facingRight) {
        // Save original context
        ctx.save(); // Set context to horizontal center of image (don't care about changing y's position)

        ctx.translate(x + this.scale * this.frameWidth / 2, 0); // Scale x by -1 to flip horizontally

        ctx.scale(-1, 1); // Draw image on the transformed context
        // Note: after transforming [0,0] is visually [-width/2, 0]
        // so the image needs to be offset accordingly when drawn

        ctx.drawImage(this.spriteSheet, xindex * this.frameWidth, yindex * this.frameHeight + drow, // source from sheet
        this.frameWidth, this.frameHeight, -(this.frameWidth * 2) + this.frameWidth / 2 + this.frameWidth, // Offset dx
        y - this.scale * this.frameHeight + this.scale * 10, this.frameWidth * this.scale, this.frameHeight * this.scale); // Restore original context

        ctx.restore(); // omg it's finally working ;-;
      } else {
        // Draw facing right
        ctx.drawImage(this.spriteSheet, xindex * this.frameWidth, yindex * this.frameHeight + drow, // source from sheet
        this.frameWidth, this.frameHeight, x - this.frameWidth, y - this.scale * this.frameHeight + this.scale * 10, this.frameWidth * this.scale, this.frameHeight * this.scale);
      } //ctx.translate(50, 50);

    }
  }, {
    key: "currentFrame",
    value: function currentFrame() {
      return Math.floor(this.elapsedTime / this.frameDuration) + this.columnOffset;
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.elapsedTime >= this.totalTime - 1;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.elapsedTime = 0;
      this.loops = 0;
    }
  }]);

  return Animation;
}();

/* harmony default export */ __webpack_exports__["default"] = (Animation);

/***/ }),

/***/ "./src/engine/asset-manager.js":
/*!*************************************!*\
  !*** ./src/engine/asset-manager.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: this can all be managed by es6 promises

/*****************
AssetManager class

successCount - the number of successes fetching assets
errorCount - the number of failures fetching assets
cache - the asset cache
downloadQueue - the queue of assets to download
*****************/
var AssetManager =
/*#__PURE__*/
function () {
  function AssetManager() {
    var downloadQueue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, AssetManager);

    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.downloadQueue = downloadQueue;
  }
  /*
  Adds an asset path to the download queue
  */


  _createClass(AssetManager, [{
    key: "queueDownload",
    value: function queueDownload(path) {
      // console.log(path.toString());
      this.downloadQueue.push(path);
    }
    /*
    Checks if all assets have been responded to (either success or failure)
    */

  }, {
    key: "isDone",
    value: function isDone() {
      return this.downloadQueue.length == this.successCount + this.errorCount;
    }
    /*
    Attempts to download each asset in the queue
    */

  }, {
    key: "downloadAll",
    value: function downloadAll(callback) {
      var _this = this;

      if (this.downloadQueue.length === 0) window.setTimeout(callback, 100);

      var _loop = function _loop(i) {
        var path = _this.downloadQueue[i];
        var img = new Image();
        var that = _this;
        img.addEventListener("load", function () {
          // console.log("dun: " + this.src.toString());
          that.successCount += 1;

          if (that.isDone()) {
            callback();
          }
        });
        img.addEventListener("error", function () {
          that.errorCount += 1;

          if (that.isDone()) {
            callback();
          }
        });
        img.src = path;
        _this.cache[path] = img;
      };

      for (var i = 0; i < this.downloadQueue.length; i++) {
        _loop(i);
      }
    }
    /*
    Gets an asset
    */

  }, {
    key: "getAsset",
    value: function getAsset(path) {
      //console.log(path.toString());
      return this.cache[path];
    }
  }]);

  return AssetManager;
}(); // end of AssetManager


/* harmony default export */ __webpack_exports__["default"] = (AssetManager);

/***/ }),

/***/ "./src/engine/background.js":
/*!**********************************!*\
  !*** ./src/engine/background.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities */ "./src/entities/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Layer =
/*#__PURE__*/
function () {
  function Layer(img, src_dimensions, camera, scroll_speed, height_factor, dest_y) {
    var stretch = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var scale = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 3;

    _classCallCheck(this, Layer);

    this.img = img;
    this.src_width = src_dimensions[0];
    this.src_height = src_dimensions[1];
    this.scroll_speed = scroll_speed;
    this.height_factor = height_factor;
    this.stretch = stretch;
    this.camera = camera;
    this.camera_dimensions = [camera.canvasWidth, camera.canvasHeight];
    this.scale = scale;
    this.dest_y = dest_y;
  }

  _createClass(Layer, [{
    key: "draw",
    value: function draw(ctx) {
      // repeat as many times as necessary to fill camera size
      for (var i = 0 - this.src_width; i < this.camera_dimensions[0] + this.src_width; i += this.src_width) {
        var d_height = this.camera_dimensions[1] * this.height_factor;
        var d_y = this.dest_y * this.height_factor; // 0 + ((this.height_factor)) * this.camera_dimensions[1]

        if (this.stretch) {
          d_height = this.camera_dimensions[1]; // d_y = 
        }

        ctx.drawImage(this.img, 0, 0, this.src_width, this.src_height, (i + this.camera.xView * this.scroll_speed % this.src_width) * this.scale, d_y, this.src_width * this.scale, d_height);
      }
    }
  }]);

  return Layer;
}();

var Background =
/*#__PURE__*/
function () {
  function Background(game_engine, asset_manager, ctx, camera) {
    _classCallCheck(this, Background);

    this.game_engine = game_engine;
    this.asset_manager = asset_manager;
    this.ctx = ctx;
    this.camera = camera;
    this.layers = ["img/bg/1_bg.png", "img/bg/2_farbuildings.png", "img/bg/3_buildings.png", "img/bg/4_foreground.png", "img/bg/bot_fill.png"];
    this.make_background();
  }

  _createClass(Background, [{
    key: "make_background",
    value: function make_background() {
      this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/1_bg.png"), [272, 160], this.camera, 0.1, 1, 0, true));
      this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/2_farbuildings.png"), [213, 142], this.camera, 0.15, 0.35, this.camera.canvasHeight / 2));
      this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/3_buildings.png"), [272, 150], this.camera, 0.2, 0.4, this.camera.canvasHeight / 2)); // this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/4_foreground.png"), 
      // [272, 104], this.camera, 0.25, .5, this.camera.canvasHeight/2))

      this.game_engine.addBackgroundLayer(new Layer(this.asset_manager.getAsset("img/bg/bot_fill.png"), [250, 250], this.camera, 1, 1, this.camera.canvasHeight / 2));
    }
  }]);

  return Background;
}();

/* harmony default export */ __webpack_exports__["default"] = (Background);

/***/ }),

/***/ "./src/engine/game-engine.js":
/*!***********************************!*\
  !*** ./src/engine/game-engine.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/engine/asset-manager.js");
/* harmony import */ var _hud__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hud */ "./src/engine/hud.js");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background */ "./src/engine/background.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sound */ "./src/engine/sound.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // import Hero from "./entities/hero"




/***************
GameEngine class
****************/

var GameEngine =
/*#__PURE__*/
function () {
  function GameEngine(gameboard, hero) {
    _classCallCheck(this, GameEngine);

    this.drawBoxes = false;
    this.devMode = true;
    this.sound = new _sound__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.entities = [];
    this.backgroundLayers = [];
    this.gameboard = gameboard;
    this.camera = null;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.music = null;
    this.addedpoints = 0;
    this.difficulty = "Normal (But Kinda Easy)"; //DEV TOOL FIELDS

    this.toggleCooldown = 20;
    this.boxToggleTimer = 0;
    this.setPosTimer = 0;
    this.godToggleTimer = 0;
    this.checkpointCycleCount = 1;
    this.paused = false;
    this.pauseToggleCooldown = 0;
    this.pauseGeneral = 40;
    this.pauseLayoutA = 350;
    this.pauseLayoutB = 350;
    this.pauseFlavorX = 800;
    this.pauseFlavorY = 250; // KB input keycodes

    this.controlKeys = {
      "Space": {
        "active": false
      },
      "KeyW": {
        "active": false
      },
      "KeyS": {
        "active": false
      },
      "KeyD": {
        "active": false
      },
      "KeyA": {
        "active": false
      },
      "KeyR": {
        "active": false
      },
      "KeyF": {
        "active": false
      },
      "KeyG": {
        "active": false
      },
      "KeyE": {
        "active": false
      },
      "KeyJ": {
        "active": false
      },
      "KeyK": {
        "active": false
      },
      "KeyL": {
        "active": false
      },
      "KeyM": {
        "active": false
      },
      "KeyP": {
        "active": false
      },
      "KeyT": {
        "active": false
      },
      "KeyY": {
        "active": false
      },
      "KeyV": {
        "active": false
      },
      "KeyC": {
        "active": false
      },
      "Enter": {
        "active": false
      },
      "Numpad1": {
        "active": false
      },
      "Numpad2": {
        "active": false
      },
      "Numpad3": {
        "active": false
      },
      "Numpad4": {
        "active": false
      },
      "Numpad5": {
        "active": false
      },
      "Numpad6": {
        "active": false
      },
      "Numpad9": {
        "active": false
      } // control mapping

    };
    this.controlLayoutA = {
      "jump": "Space",
      "right": "KeyD",
      "left": "KeyA",
      "shoot": "Numpad4",
      "slash": "Numpad5",
      "cleave": "Numpad6",
      "energize": "KeyW",
      "dash": "Numpad1",
      "getPos": "KeyE",
      "setPos": "KeyR",
      "godToggle": "KeyG",
      "hardmode": "KeyT",
      "easymode": "KeyY",
      "layoutA": "Numpad9",
      "layoutB": "KeyP",
      "testPos": "KeyV",
      "toggleBoxes": "KeyC",
      "pause": "Enter"
    };
    this.controlLayoutB = {
      "jump": "Space",
      "right": "KeyD",
      "left": "KeyA",
      "shoot": "KeyJ",
      "slash": "KeyK",
      "cleave": "KeyL",
      "energize": "KeyW",
      "dash": "KeyM",
      "getPos": "KeyE",
      "setPos": "KeyR",
      "godToggle": "KeyG",
      "hardmode": "KeyT",
      "easymode": "KeyY",
      "layoutA": "Numpad9",
      "layoutB": "KeyP",
      "testPos": "KeyV",
      "toggleBoxes": "KeyC",
      "pause": "Enter"
    };
    this.controls = this.controlLayoutA;
    this.hero = hero;
  }
  /*
  Initializes the game engine
  */


  _createClass(GameEngine, [{
    key: "init",
    value: function init(ctx) {
      this.ctx = ctx;
      this.surfaceWidth = this.ctx.canvas.width;
      this.surfaceHeight = this.ctx.canvas.height;
      this.startInput();
      console.log('game initialized');
    }
    /*
    Starts the game engine
    */

  }, {
    key: "start",
    value: function start() {
      console.log("starting game");
      var that = this;
      this.music = new Audio("./audio/track_1.wav");
      this.music.volume = 1;
      this.music.play();

      (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
      })();
    }
  }, {
    key: "playSound",
    value: function playSound(sound_name) {
      var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.sound.play(sound_name, volume);
    } //Timer class

  }, {
    key: "Timer",
    value: function Timer() {
      //Added this for when we implement a pause function.
      this.gameTime = 0;
      this.maxStep = 0.05;
      this.wallLastTimestamp = 0;

      function tick() {
        var wallCurrent = Date.now();
        var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
        this.wallLastTimestamp = wallCurrent;
        var gameDelta = Math.min(wallDelta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
      }
    }
    /*
    Input handling, initializes listeners
    */

  }, {
    key: "startInput",
    value: function startInput() {
      console.log('Starting input');
      this.ctx.canvas.tabIndex = 0;
      ;

      var getXandY = function getXandY(e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
          x = Math.floor(x / 32);
          y = Math.floor(y / 32);
        }

        return {
          x: x,
          y: y
        };
      };

      var that = this; // control event listeners go here

      var map = {};
      this.ctx.canvas.addEventListener("keypress", function (e) {
        if (String.fromCharCode(e.which) === ' ') that.space = true;
        e.preventDefault();

        if (!that.controlKeys.hasOwnProperty(e.code)) {
          that.controlKeys[e.code] = {
            "active": true
          };
        }

        if (that.controlKeys[e.code].active == false) {
          that.controlKeys[e.code].active = true;
        } // console.log(`${e.code} is ${that.controls[e.code].active}`);

      }, false);
      this.ctx.canvas.addEventListener("keyup", function (e) {
        if (!that.controlKeys.hasOwnProperty(e.code)) {
          that.controlKeys[e.code] = {
            "active": false
          };
        }

        if (that.controlKeys[e.code].active == true) {
          that.controlKeys[e.code].active = false;
        } // console.log(`${e.code} is ${that.controls[e.code].active}`);

      }, false);
      console.log('Input started');
    }
    /*
    Adds an entity to the game
    */

  }, {
    key: "addEntity",
    value: function addEntity(entity) {
      //console.log('added entity');
      if (this.gameboard.states.loadingLevel || this.gameboard.states.respawnSection) {
        entity.level = this.gameboard.levelNum;
        entity.section = this.gameboard.level.sectionNum;
      }

      this.entities.push(entity);
    }
  }, {
    key: "addBackgroundLayer",
    value: function addBackgroundLayer(layer) {
      this.backgroundLayers.push(layer);
    }
    /*
    Draws all entities in the list
    */

  }, {
    key: "draw",
    value: function draw(drawCallback) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.save();

      for (var i = 0; i < this.backgroundLayers.length; i++) {
        //Draw the camera and hud first
        this.backgroundLayers[i].draw(this.ctx);
      }

      for (var _i = 0; _i < this.entities.length; _i++) {
        ////Draw only terrain that is within the canvas view (numbers are negative because the camera is weird like that.
        ////postive numbers would screw the translate process)
        if (this.entities[_i].type === "Terrain") {
          if (-this.entities[_i].x - this.entities[_i].boundWidth < this.entities[0].xView && -this.entities[_i].x > this.entities[0].xView - this.ctx.canvas.width && -this.entities[_i].y - this.entities[_i].boundHeight < this.entities[0].yView && -this.entities[_i].y > this.entities[0].yView - this.ctx.canvas.height) {
            this.entities[_i].draw(this.ctx);
          }
        } else {
          if (!this.paused || this.entities[_i].name === "Camera") this.entities[_i].draw(this.ctx);

          if (this.paused) {
            this.ctx.font = "25px Verdana";
            this.ctx.fillStyle = "#e5e5e5";
            this.ctx.fillText("Universal Controls", -this.camera.xView + 50, -this.camera.yView + this.pauseGeneral + 40);
            this.ctx.fillText("Run left: S", -this.camera.xView + 125, -this.camera.yView + this.pauseGeneral + 80);
            this.ctx.fillText("Run right: D", -this.camera.xView + 125, -this.camera.yView + this.pauseGeneral + 120);
            this.ctx.fillText("Energize: W", -this.camera.xView + 125, -this.camera.yView + this.pauseGeneral + 160);
            this.ctx.fillText("Jump: Space", -this.camera.xView + 125, -this.camera.yView + this.pauseGeneral + 200);
            this.ctx.fillText("Normal Difficulty (default): Y", -this.camera.xView + 50, -this.camera.yView + this.pauseGeneral + 240);
            this.ctx.fillText("Tough Difficulty (not default): T", -this.camera.xView + 50, -this.camera.yView + this.pauseGeneral + 280);
            this.ctx.fillText("God Mode Toggle (for cheaters): G", -this.camera.xView + 50, -this.camera.yView + this.pauseGeneral + 320);
            this.ctx.fillText("Abilities", -this.camera.xView + 500, -this.camera.yView + this.pauseGeneral + 40);
            this.ctx.fillText("Power Shot: Energize + Shoot", -this.camera.xView + 500, -this.camera.yView + this.pauseGeneral + 80);
            this.ctx.fillText("Sword Blast: Energize + Slash", -this.camera.xView + 500, -this.camera.yView + this.pauseGeneral + 120);
            this.ctx.fillText("Reflect: Energize + Cleave", -this.camera.xView + 500, -this.camera.yView + this.pauseGeneral + 160);
            this.ctx.fillText("Layout A (Numpad 9)", -this.camera.xView + 50, -this.camera.yView + this.pauseLayoutA + 200);
            this.ctx.fillText("Shoot: Numpad 4", -this.camera.xView + 125, -this.camera.yView + this.pauseLayoutA + 240);
            this.ctx.fillText("Dash: Numpad 1", -this.camera.xView + 125, -this.camera.yView + this.pauseLayoutA + 280);
            this.ctx.fillText("Slash: Numpad 5", -this.camera.xView + 125, -this.camera.yView + this.pauseLayoutA + 320);
            this.ctx.fillText("Cleave: Numpad 6", -this.camera.xView + 125, -this.camera.yView + this.pauseLayoutA + 360);
            this.ctx.fillText("Layout B (P)", -this.camera.xView + 500, -this.camera.yView + this.pauseLayoutB + 200);
            this.ctx.fillText("Shoot: J", -this.camera.xView + 575, -this.camera.yView + this.pauseLayoutB + 240);
            this.ctx.fillText("Dash: M", -this.camera.xView + 575, -this.camera.yView + this.pauseLayoutB + 280);
            this.ctx.fillText("Slash: K", -this.camera.xView + 575, -this.camera.yView + this.pauseLayoutB + 320);
            this.ctx.fillText("Cleave: L", -this.camera.xView + 575, -this.camera.yView + this.pauseLayoutB + 360);
            this.ctx.fillText("Current Difficulty is " + this.difficulty, -this.camera.xView + 1100, -this.camera.yView + this.pauseGeneral + 40);
            this.ctx.font = "20px Verdana";
            this.ctx.fillText("(this can be changed at any time, including while paused)", -this.camera.xView + 1100, -this.camera.yView + this.pauseGeneral + 80);
            this.ctx.font = "Italic 40px Times New Roman";
            this.ctx.fillText("The forces of evil are still finishing arrangements", -this.camera.xView + this.pauseFlavorX, -this.camera.yView + this.pauseFlavorY + 80);
            this.ctx.fillText("on the expansion of their dungeons and throne rooms.", -this.camera.xView + this.pauseFlavorX, -this.camera.yView + this.pauseFlavorY + 120);
            this.ctx.fillText("Prepare for the inevitable showdown with this villianous", -this.camera.xView + this.pauseFlavorX, -this.camera.yView + this.pauseFlavorY + 160);
            this.ctx.fillText("scum by trying to get as high a score as possible.", -this.camera.xView + this.pauseFlavorX, -this.camera.yView + this.pauseFlavorY + 200);
          }
        }
      }

      if (drawCallback) {
        drawCallback(this);
      }

      this.ctx.restore();
    }
    /*
    Updates all entities, calls their update methods
    */

  }, {
    key: "update",
    value: function update() {
      if (!this.paused) {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
          var entity = this.entities[i];

          if (this.gameboard.states.respawnSection) {
            if (entity.level === this.gameboard.levelNum && entity.section === this.gameboard.sectionNum) {
              //console.log("values - level: " + this.gameboard.levelNum + ", section: " + this.gameboard.sectionNum);
              //console.log("entity - level: " + entity.level + ", section: " + entity.section);
              entity.removeFromWorld = true;
              entity.pointValue = 0;
            }
          } else if (this.gameboard.states.newLevel) {
            if (entity.level === this.gameboard.levelNum || entity.name === "Terrain" || entity.name === "Hero" || entity.name === "HUD" || entity.name === "Portal") {
              //console.log("values - level: " + this.gameboard.levelNum + ", section: " + this.gameboard.sectionNum);
              //console.log("entity - level: " + entity.level + ", section: " + entity.section);
              entity.removeFromWorld = true;
              entity.pointValue = 0;
            }
          }

          if (!entity.removeFromWorld) {
            entity.update();
          }
        }

        if (this.gameboard.states.respawnSection) {
          this.gameboard.states.respawnSection = false;
        }

        if (this.gameboard.states.newLevel) {
          this.gameboard.states.newLevel = false;
          this.gameboard.states.loadNextLevel = true;
        } //TODO Move into first update() for loop?


        for (var _i2 = this.entities.length - 1; _i2 >= 0; --_i2) {
          if (this.entities[_i2].removeFromWorld) {
            if (this.entities[_i2].hasOwnProperty("pointValue") && !this.gameboard.states.respawnSection) {
              if (this.entities[_i2].pointValue > 0) {
                //TODO Refactor hero multiplier and difficulty to gameboard
                //if (!this.gameboard.states.showPointValues) {
                //    this.gameboard.states.showPointValues = true;
                //    this.gameboard.pvt = this.gameboard.pvtt;
                //}
                this.addedpoints = this.hero.difficulty * this.entities[_i2].pointValue * this.hero.multiplier;
                this.gameboard.deadEnemies.push([[this.entities[_i2].x, this.entities[_i2].y], this.addedpoints, 30]);
                this.gameboard.score += this.addedpoints;
                this.hero.multiplier += this.hero.difficulty * .5;
              }
            }

            this.entities.splice(_i2, 1);
          }
        }

        for (var _i3 = 0; _i3 < this.entities.length; _i3++) {
          var _entity = this.entities[_i3];

          for (var j = 0; j < this.entities.length; j++) {
            var other = this.entities[j]; // this prevents each piece of terrain from checking collision, causing slowdown

            if (_entity.type === "Terrain") continue;else if (other.type === "Terrain") {
              var dist = Math.abs(_entity.x - other.x);

              if (dist < 100) {
                if (_entity != other && _entity.isColliding(other) != 'none') {
                  /// D.prototype = new C(), links C to prototype linkage of D OR put property "something_type" or whatever and check for that
                  var direction = _entity.isColliding(other);

                  _entity.collided(other, direction);
                }
              }
            } else if (_entity != other && _entity.isColliding(other) != 'none') {
              /// D.prototype = new C(), links C to prototype linkage of D OR put property "something_type" or whatever and check for that
              var _direction = _entity.isColliding(other);

              _entity.collided(other, _direction);
            }
          }
        }
      } // music


      if (this.music.currentTime >= 63.95) {
        this.music.currentTime = 0;
        this.music.play();
      } //PLAYER SETTINGS


      if (this.controlKeys[this.controls.easymode].active) {
        //TODO Move difficulty to gameboard
        this.difficulty = "Normal (But Kinda Easy)";
        this.hero.difficulty = 1;
        this.gameboard.score = 0;
      }

      if (this.controlKeys[this.controls.hardmode].active) {
        this.difficulty = "Tough";
        this.hero.difficulty = 3;
        this.gameboard.score = 0;
      }

      if (this.controlKeys[this.controls.layoutA].active) {
        this.controls = this.controlLayoutA;
      }

      if (this.controlKeys[this.controls.layoutB].active) {
        this.controls = this.controlLayoutB;
      }

      if (this.controlKeys[this.controls.pause].active && this.pauseToggleCooldown === 0) {
        this.paused = !this.paused;
        this.pauseToggleCooldown = this.toggleCooldown;
      }

      if (this.pauseToggleCooldown > 0) {
        this.pauseToggleCooldown--;
      } //DEV TOOLS


      if (this.devMode && !this.paused) {
        if (this.controlKeys[this.controls.getPos].active) {
          console.log("x: " + this.hero.x + ", y: " + this.hero.y);
        }

        if (this.controlKeys[this.controls.setPos].active && this.setPosTimer <= 0) {
          this.hero.setPos(this.gameboard.level.checkpoints[this.checkpointCycleCount]);
          this.setPosTimer = this.toggleCooldown;
          this.checkpointCycleCount = (this.checkpointCycleCount + 1) % this.gameboard.level.checkpoints.length;
        }

        if (this.controlKeys[this.controls.godToggle].active && this.godToggleTimer <= 0) {
          this.hero.states.isGod = !this.hero.states.isGod;
          this.godToggleTimer = this.toggleCooldown;
        }

        if (this.controlKeys[this.controls.testPos].active) {
          this.hero.setPos(this.gameboard.testPos);
        }

        if (this.controlKeys[this.controls.toggleBoxes].active && this.boxToggleTimer <= 0) {
          this.drawBoxes = !this.drawBoxes;
          this.boxToggleTimer = this.toggleCooldown;
        } //Toggle timers (should finally learn how to use an "on keyup" for keys)


        if (this.boxToggleTimer > 0) {
          this.boxToggleTimer--;
        }

        if (this.setPosTimer > 0) {
          this.setPosTimer--;
        }

        if (this.godToggleTimer > 0) {
          this.godToggleTimer--;
        }
      }
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(drawCallback) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.save();

      for (var i = 0; i < this.backgroundLayers.length; i++) {
        //Draw the camera and hud first
        this.backgroundLayers[i].draw(this.ctx);
      }

      if (drawCallback) {
        drawCallback(this);
      }

      this.ctx.restore();
    }
    /*
    Defines the game loop
    */

  }, {
    key: "loop",
    value: function loop() {
      this.ctx.width = window.innerWidth;
      this.ctx.height = window.innerHeight;
      this.update();
      this.draw();
      this.click = null;
      this.wheel = null;
    }
  }]);

  return GameEngine;
}(); // end of GameEngine


/* harmony default export */ __webpack_exports__["default"] = (GameEngine);

/***/ }),

/***/ "./src/engine/hud.js":
/*!***************************!*\
  !*** ./src/engine/hud.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/engine/asset-manager.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Hud =
/*#__PURE__*/
function () {
  function Hud(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates) {
    var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 3;
    var camera = arguments.length > 7 ? arguments[7] : undefined;

    _classCallCheck(this, Hud);

    this.img = img;
    this.hero = hero;
    this.camera = camera;
    this.healthbar = new HealthBar(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale = 3, camera);
    this.energybar = new EnergyBar(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale = 3, camera);
    this.scoreboard = new ScoreBoard(game_engine, dest_coordinates, scale, camera);
    this.components = [this.healthbar, this.energybar, this.scoreboard];
    this.gradientStop1 = 0;
    this.gradientStop2 = 1;
    this.gradientStop3 = 2;
  }

  _createClass(Hud, [{
    key: "update",
    value: function update() {
      for (var i = 0; i < this.components.length; i++) {
        this.components[i].update();
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      for (var i = 0; i < this.components.length; i++) {
        this.components[i].draw(ctx);
      }
    }
  }, {
    key: "isColliding",
    value: function isColliding() {}
  }, {
    key: "collided",
    value: function collided() {}
  }]);

  return Hud;
}();

var ScoreBoard =
/*#__PURE__*/
function () {
  function ScoreBoard(game_engine, dest_coordinates) {
    var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var camera = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, ScoreBoard);

    this.score = game_engine.gameboard.score;
    this.game_engine = game_engine;
    this.camera = camera;
    this.scale = scale;
    this.dest_coords = dest_coordinates;
  }

  _createClass(ScoreBoard, [{
    key: "update",
    value: function update() {
      this.score = Math.floor(this.game_engine.gameboard.score);
      this.dest_coords = [-this.camera.xView + 200, -this.camera.yView + 100];
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.font = "italic bold 25px Verdana";
      var gradient = ctx.createLinearGradient(this.dest_coords[0] - 100, this.dest_coords[1] - 10, this.dest_coords[0], this.dest_coords[1] - 10);
      gradient.addColorStop(0, "magenta");
      gradient.addColorStop(.5, "blue");
      gradient.addColorStop(1, "green"); // Fill with gradient

      ctx.fillStyle = gradient;
      ctx.fillText("Score: " + this.score, this.dest_coords[0] - 100, this.dest_coords[1] - 10); //if (this.game_engine.gameboard.states.showPointValues) {
      //    console.log("draw")
      //    ctx.font = "20px Verdana";
      //    ctx.fillStyle = "#00ff00";
      //    ctx.fillText("+" + this.game_engine.addedpoints + " points",
      //        this.game_engine.hero.x + 10,
      //        this.game_engine.hero.y - 150
      //    );
      //}
    }
  }]);

  return ScoreBoard;
}();
/*
    ResourceBar superclass
*/


var ResourceBar =
/*#__PURE__*/
function () {
  function ResourceBar(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates) {
    var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 3;

    _classCallCheck(this, ResourceBar);

    this.game_engine = game_engine;
    this.hero = hero;
    this.img = img;
    this.src_coords = src_coordinates;
    this.src_dims = src_dimensions;
    this.dest_coords = dest_coordinates; // this.ctx = ctx;

    this.scale = scale;
  }

  _createClass(ResourceBar, [{
    key: "draw",
    value: function draw(ctx) {
      var lasty = 0;

      for (var i = 0; i < this.parts.length; i++) {
        var part = this.parts[i];
        this.drawPart(ctx, part, lasty);
        lasty = lasty + part["src_height"]; // this causes each segment to be drawn vertically on top of the last
      }
    }
  }, {
    key: "resourceBarSegment",
    value: function resourceBarSegment(img, src_coords, src_dims) {
      var dest_x_offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var dest_y_offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      return {
        "img": img,
        "src_x": src_coords[0],
        "src_y": src_coords[1],
        "src_width": src_dims[0],
        "src_height": src_dims[1],
        "dest_x_offset": dest_x_offset,
        "dest_y_offset": dest_y_offset // this.dest_x = dest_coords[0]
        // this.dest_y = dest_coords[1]
        // this.dest_width = dest_dimensions[0]
        // this.dest_height = dest_dimensions[1]

      };
    }
  }]);

  return ResourceBar;
}();
/*
    Provides a health bar for the Hero.
    Constructed of resourceBarSegments, defined in ResourceBar.
    Health grows upward.
*/


var HealthBar =
/*#__PURE__*/
function (_ResourceBar) {
  _inherits(HealthBar, _ResourceBar);

  function HealthBar(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates) {
    var _this;

    var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 3;
    var camera = arguments.length > 7 ? arguments[7] : undefined;

    _classCallCheck(this, HealthBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HealthBar).call(this, game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale = 3));
    _this.health = hero.health; // has room for 6 ticks

    _this.width = 14; // the pixel art width

    _this.hero = hero;
    _this.camera = camera; // bar segments

    _this.top = _this.resourceBarSegment(img, [src_coordinates[0], src_dimensions[1] + 0], [_this.width, 3]);
    _this.middle1 = _this.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this.width, 14]);
    _this.middle2 = _this.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this.width, 14]);
    _this.middle3 = _this.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this.width, 14]);
    _this.middle4 = _this.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this.width, 14]);
    _this.middle5 = _this.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this.width, 14]);
    _this.bottom = _this.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 19], [_this.width, 18]);
    _this.tick = _this.resourceBarSegment(img, [src_coordinates[0] + 3, src_coordinates[1] + 16], [_this.width - 7, 3], 9, 11);
    _this.parts = [_this.top, _this.middle1, _this.middle2, _this.middle3, _this.middle4, _this.middle5, _this.bottom];
    return _this;
  }

  _createClass(HealthBar, [{
    key: "draw",
    value: function draw(ctx) {
      var lasty = 0;

      for (var i = 0; i < this.parts.length; i++) {
        var part = this.parts[i];
        this.drawPart(ctx, part, lasty);
        lasty = lasty + part["src_height"]; // this causes each segment to be drawn vertically on top of the last
      }

      lasty -= this.bottom["src_height"];

      for (var i = this.health; i > 0; i--) {
        this.drawPart(ctx, this.tick, lasty);
        lasty -= 2; // this causes health to grow upward 
      }
    }
  }, {
    key: "drawPart",
    value: function drawPart(ctx, part, lasty) {
      ctx.drawImage(this.img, part["src_x"], part["src_y"], // src x, y
      part["src_width"], part["src_height"], // src width, height
      this.dest_coords[0] + part["dest_x_offset"], this.dest_coords[1] + lasty * this.scale - part["dest_y_offset"], // dest x, y
      part["src_width"] * this.scale, part["src_height"] * this.scale // dest width, height
      );
    }
  }, {
    key: "update",
    value: function update() {
      this.health = this.hero.health;
      this.dest_coords = [-this.camera.xView + 100, -this.camera.yView + 100];
    }
  }, {
    key: "isColliding",
    value: function isColliding() {}
  }, {
    key: "collided",
    value: function collided() {}
  }]);

  return HealthBar;
}(ResourceBar);
/*
    Provides an energy bar for the Hero.
    Constructed of resourceBarSegments, defined in ResourceBar.
    Energy grows upward.
*/


var EnergyBar =
/*#__PURE__*/
function (_ResourceBar2) {
  _inherits(EnergyBar, _ResourceBar2);

  function EnergyBar(game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates) {
    var _this2;

    var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 3;
    var camera = arguments.length > 7 ? arguments[7] : undefined;

    _classCallCheck(this, EnergyBar);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(EnergyBar).call(this, game_engine, img, hero, src_coordinates, src_dimensions, dest_coordinates, scale = 3));
    _this2.energy = hero.energy; // has room for 6 ticks

    _this2.width = 14; // the pixel art width

    _this2.hero = hero;
    _this2.camera = camera;
    src_coordinates = [src_coordinates[0] + 15, src_coordinates[1]]; // bar segments

    _this2.top = _this2.resourceBarSegment(img, [src_coordinates[0], src_dimensions[1] + 0], [_this2.width, 3]);
    _this2.middle1 = _this2.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this2.width, 14]);
    _this2.middle2 = _this2.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this2.width, 14]);
    _this2.middle3 = _this2.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this2.width, 14]);
    _this2.middle4 = _this2.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this2.width, 14]);
    _this2.middle5 = _this2.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 3], [_this2.width, 14]);
    _this2.bottom = _this2.resourceBarSegment(img, [src_coordinates[0], src_coordinates[1] + 19], [_this2.width, 18]);
    _this2.tick = _this2.resourceBarSegment(img, [src_coordinates[0] + 3, src_coordinates[1] + 16], [_this2.width - 7, 3], 9, 11);
    _this2.parts = [_this2.top, _this2.middle1, _this2.middle2, _this2.middle3, _this2.middle4, _this2.middle5, _this2.bottom];
    return _this2;
  }

  _createClass(EnergyBar, [{
    key: "draw",
    value: function draw(ctx) {
      var lasty = 0;

      for (var i = 0; i < this.parts.length; i++) {
        var part = this.parts[i];
        this.drawPart(ctx, part, lasty);
        lasty = lasty + part["src_height"]; // this causes each segment to be drawn vertically on top of the last
      }

      lasty -= this.bottom["src_height"];

      for (var i = this.energy; i > 0; i--) {
        this.drawPart(ctx, this.tick, lasty);
        lasty -= 2; // this causes energy to grow upward 
      }
    }
  }, {
    key: "drawPart",
    value: function drawPart(ctx, part, lasty) {
      ctx.drawImage(this.img, part["src_x"], part["src_y"], // src x, y
      part["src_width"], part["src_height"], // src width, height
      this.dest_coords[0] + part["dest_x_offset"], this.dest_coords[1] + lasty * this.scale - part["dest_y_offset"], // dest x, y
      part["src_width"] * this.scale, part["src_height"] * this.scale // dest width, height
      );
    }
  }, {
    key: "update",
    value: function update() {
      this.energy = this.hero.energy;
      this.dest_coords = [-this.camera.xView + 150, -this.camera.yView + 100];
    }
  }, {
    key: "isColliding",
    value: function isColliding() {}
  }, {
    key: "collided",
    value: function collided() {}
  }]);

  return EnergyBar;
}(ResourceBar);

/* harmony default export */ __webpack_exports__["default"] = (Hud);

/***/ }),

/***/ "./src/engine/index.js":
/*!*****************************!*\
  !*** ./src/engine/index.js ***!
  \*****************************/
/*! exports provided: Animation, AssetManager, Background, GameEngine, Hud, Sound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ "./src/engine/animation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return _animation__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asset-manager */ "./src/engine/asset-manager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssetManager", function() { return _asset_manager__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background */ "./src/engine/background.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Background", function() { return _background__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _game_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game-engine */ "./src/engine/game-engine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameEngine", function() { return _game_engine__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _hud__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hud */ "./src/engine/hud.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hud", function() { return _hud__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sound */ "./src/engine/sound.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sound", function() { return _sound__WEBPACK_IMPORTED_MODULE_5__["default"]; });








/***/ }),

/***/ "./src/engine/sound.js":
/*!*****************************!*\
  !*** ./src/engine/sound.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sound =
/*#__PURE__*/
function () {
  function Sound() {
    _classCallCheck(this, Sound);

    this.sounds = {
      "hero_hurt": new Audio("./audio/dsoof.wav"),
      "hero_shoot": new Audio("./audio/hero-shoot.wav"),
      "enemy_shoot": new Audio("./audio/shoot-1.wav"),
      "arrow_fire": new Audio("./audio/Arrow-Fire.wav"),
      "crow_caw": new Audio("./audio/crow-caw.wav"),
      "enemy_hurt_1": new Audio("./audio/enemy-hurt-1.wav"),
      "energy_launcher": new Audio("./audio/energy-launcher.wav"),
      "explosion_1": new Audio("./audio/explosion-1.wav"),
      "lava_ball": new Audio("./audio/lava-ball.wav"),
      "shield_block": new Audio("./audio/shield-block.wav"),
      "sword_swing": new Audio("./audio/sword-swing.wav"),
      "out_of_energy": new Audio("./audio/ooe.wav")
    };
    var n_dups = 5;

    for (var sound in this.sounds) {
      if (this.sounds.hasOwnProperty(sound)) {
        this.sounds[sound] = {
          "current": 0,
          "max": n_dups,
          "sounds": this.make_duplicates(sound, n_dups)
        };
      }
    }
  }
  /* Returns a list of n_dup duplicated Audio objects */


  _createClass(Sound, [{
    key: "make_duplicates",
    value: function make_duplicates(sound) {
      var n_dup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var curr_sound = this.sounds[sound];
      var sound_list = [];

      for (var i = 0; i <= n_dup; i++) {
        var clone = curr_sound.cloneNode();
        sound_list.push(clone);
      }

      return sound_list;
    }
    /* plays a sound */

  }, {
    key: "play",
    value: function play(sound) {
      var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var index = this.sounds[sound]["current"];

      if (index >= this.sounds[sound]["max"] - 1) {
        this.sounds[sound]["current"] = 0;
      }

      if (!this.sounds[sound]["sounds"][index].ended) {
        this.sounds[sound]["sounds"][index + 1].currentTime = 0;
        this.sounds[sound]["sounds"][index + 1].volume = volume;
        this.sounds[sound]["sounds"][index + 1].play();
        this.sounds[sound]["current"] += 1;
      } else {
        this.sounds[sound]["sounds"][index].currentTime = 0;
        this.sounds[sound]["sounds"][index].volume = volume;
        this.sounds[sound]["sounds"][index].play();
      }
    }
  }]);

  return Sound;
}();

/* harmony default export */ __webpack_exports__["default"] = (Sound);

/***/ }),

/***/ "./src/entities/camera.js":
/*!********************************!*\
  !*** ./src/entities/camera.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities */ "./src/entities/index.js");
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../engine */ "./src/engine/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/***********
2-D side-scrolling Camera class

xView, yView - position of camera (top left)
canvasWidth, canvasHeight - camera dimensions
worldWidth, worldHeight - dimensions that represent the world's boundary

***********/

var Camera =
/*#__PURE__*/
function (_Entity) {
  _inherits(Camera, _Entity);

  function Camera(game, xView) {
    var _this;

    var yView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var canvasWidth = arguments.length > 5 ? arguments[5] : undefined;
    var canvasHeight = arguments.length > 6 ? arguments[6] : undefined;
    var worldWidth = arguments.length > 7 ? arguments[7] : undefined;
    var worldHeight = arguments.length > 8 ? arguments[8] : undefined;

    _classCallCheck(this, Camera);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Camera).call(this, game, xView, yView, img, ctx));
    _this.canvasWidth = canvasWidth; //this is the viewport, NOT the same as canvas in core.js

    _this.canvasHeight = canvasHeight; //this is the viewport, NOT the same as canvas in core.js

    _this.worldWidth = worldWidth;
    _this.worldHeight = worldHeight;
    _this.absOffX = 2;
    _this.absOffY = 1.5;
    _this.offX = _this.canvasWidth / _this.absOffX;
    _this.offY = _this.canvasHeight / _this.absOffY + 100;
    _this.camSpeedX = 8;
    _this.camSpeedY = 8; // possible axis the camera can move in. not implemented yet

    _this.axis = {
      "none": false,
      "horizontal": false,
      "vertical": false,
      "both": true // object to be followed (the Hero)

    };
    _this.followed = null;
    return _this;
  }

  _createClass(Camera, [{
    key: "follow",
    value: function follow(obj) {
      this.followed = obj;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      //  ctx.setTransform(1, 0, 0, 1, 0, 0); //reset transform matrix
      //  ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // clear viewport after matrix is reset
      ctx.translate(this.xView, this.yView);
    }
  }, {
    key: "update",
    value: function update() {
      // Note: this logic feels HORRIBLY wrong, but it works for now, so yay?
      if (this.followed != null) {
        this.updateBounds(); //TODO: need to figure out world bounds for min and max clamping

        this.xView = -this.followed.x + this.offX;
        this.yView = -this.followed.y + this.offY;
      } //console.log("xView: " + this.xView);
      //console.log("yView: " + this.yView);
      //console.log("hero x: " + this.followed.x);
      //console.log("hero y: " + this.followed.y);

    }
  }, {
    key: "updateBounds",
    value: function updateBounds() {
      if (!(this.offX === this.canvasWidth / this.absOffX)) {
        if (this.offX + 10 < Math.floor(this.canvasWidth / this.absOffX)) {
          this.offX += this.camSpeedX;
        } else if (this.offX - 10 > Math.floor(this.canvasWidth / this.absOffX)) {
          this.offX -= this.camSpeedX;
        } else this.offX = this.canvasWidth / this.absOffX;
      }

      if (!(this.offY === this.canvasHeight / this.absOffY)) {
        if (this.offY + 10 < Math.floor(this.canvasHeight / this.absOffY)) {
          this.offY += this.camSpeedY;
        } else if (this.offY - 10 > Math.floor(this.canvasHeight / this.absOffY)) {
          this.offY -= this.camSpeedY;
        } else this.offY = this.canvasHeight / this.absOffY;
      }
    }
  }, {
    key: "boundsCheck",
    value: function boundsCheck(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }
  }]);

  return Camera;
}(_entities__WEBPACK_IMPORTED_MODULE_0__["Entity"]);

/* harmony default export */ __webpack_exports__["default"] = (Camera);

/***/ }),

/***/ "./src/entities/entity.ts":
/*!********************************!*\
  !*** ./src/entities/entity.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_const_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/const.json */ "./src/util/const.json");
var _util_const_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../util/const.json */ "./src/util/const.json", 1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/***********
Entity class

game - a reference to the game in which this entity exists
x, y - entity's coordinates
removeFromWorld - a flag that denotes when to remove this entity from the game
************/

var Entity =
/*#__PURE__*/
function () {
  function Entity(game) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        _ref$img = _ref.img,
        img = _ref$img === void 0 ? null : _ref$img,
        _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? null : _ref$ctx,
        _ref$level = _ref.level,
        level = _ref$level === void 0 ? null : _ref$level,
        _ref$section = _ref.section,
        section = _ref$section === void 0 ? null : _ref$section,
        _ref$parentClass = _ref.parentClass,
        parentClass = _ref$parentClass === void 0 ? null : _ref$parentClass,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? null : _ref$type,
        _ref$gravity = _ref.gravity,
        gravity = _ref$gravity === void 0 ? _util_const_json__WEBPACK_IMPORTED_MODULE_0__["gameSettings"].gravity : _ref$gravity,
        _ref$removeFromWorld = _ref.removeFromWorld,
        removeFromWorld = _ref$removeFromWorld === void 0 ? false : _ref$removeFromWorld,
        _ref$boundX = _ref.boundX,
        boundX = _ref$boundX === void 0 ? null : _ref$boundX,
        _ref$boundY = _ref.boundY,
        boundY = _ref$boundY === void 0 ? null : _ref$boundY,
        _ref$lastBoundY = _ref.lastBoundY,
        lastBoundY = _ref$lastBoundY === void 0 ? null : _ref$lastBoundY,
        _ref$boundWidth = _ref.boundWidth,
        boundWidth = _ref$boundWidth === void 0 ? null : _ref$boundWidth,
        _ref$boundHeight = _ref.boundHeight,
        boundHeight = _ref$boundHeight === void 0 ? null : _ref$boundHeight;

    _classCallCheck(this, Entity);

    // this.name = this.constructor.name;
    this.game = game;
  } // TODO, implement a list of bounding shapes, iterate through depending on type (circle or rect) 


  _createClass(Entity, [{
    key: "rectangle",
    value: function rectangle() {}
  }, {
    key: "circle",
    value: function circle() {}
    /* Draws the outline of this entity */

  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {}
    /*
    Updates the entity each game loop
    i.e. what does this entity do?
    */

  }, {
    key: "update",
    value: function update() {}
    /* Draws this entity. Called every cycle of the game engine. */

  }, {
    key: "draw",
    value: function draw(ctx) {}
    /*
    Collision detection, rectangle
    */

  }, {
    key: "isColliding",
    value: function isColliding(other) {
      var rect1 = {
        "x": this.boundX,
        "y": this.boundY,
        "lastY": this.lastBoundY,
        "width": this.boundWidth,
        "height": this.boundHeight
      };
      var rect2 = {
        "x": other.boundX,
        "y": other.boundY,
        "width": other.boundWidth,
        "height": other.boundHeight
      };

      if (rect1.width === 0 || rect1.height === 0 || rect2.width === 0 || rect2.height === 0) {
        return 'none';
      } // This is the same as Mariott's method, just formatted differently


      var collision = 'none';
      var dx = rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2);
      var dy = rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2);
      var lastdy = rect1.lastY + rect1.height / 2 - (rect2.y + rect2.height / 2);
      var width = (rect1.width + rect2.width) / 2;
      var height = (rect1.height + rect2.height) / 2;
      var crossWidth = width * dy;
      var lastCrossWidth = width * lastdy;
      var crossHeight = height * dx; // First check if rect1 and rect2 are close enough to even collide. Then check the intersection depths to determine which side was most involved in the collision.

      if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
        //TODO store last bottom of rect1, compare to bound of rect2, determine if i should fall or not
        if (crossWidth > crossHeight && lastCrossWidth > crossHeight) {
          crossWidth < -crossHeight && lastCrossWidth < -crossHeight ? collision = 'right' : collision = 'top';
        } else {
          crossWidth > -crossHeight && lastCrossWidth > -crossHeight ? collision = 'left' : collision = 'bottom'; // console.log("rect1 cur: " + rect1.y);
          // console.log("rect1 last: " + rect1.lastY);
          // console.log("rect2: " + rect2.y);
        }
      }

      return collision;
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {}
  }]);

  return Entity;
}(); // end of Entity class


/* harmony default export */ __webpack_exports__["default"] = (Entity);

/***/ }),

/***/ "./src/entities/index.js":
/*!*******************************!*\
  !*** ./src/entities/index.js ***!
  \*******************************/
/*! exports provided: Entity, Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.ts */ "./src/entities/entity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera */ "./src/entities/camera.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _camera__WEBPACK_IMPORTED_MODULE_1__["default"]; });

// export {default as Terrain} from "./terrain"
 // export {default as Actor} from "./actor"
// export {default as Enemy} from "./enemy"

 // export {default as GameBoard} from "./game-board"
// export {default as Hero} from "./hero"
// export {default as Hurtbox} from "./hurtbox"
// export {
//     Item, 
//     EnergyPack, 
//     HealthPack } from "./item"
// export {default as Reflectbox} from "./reflectbox"

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/core.js");


window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

Object(_core__WEBPACK_IMPORTED_MODULE_0__["default"])();

/***/ }),

/***/ "./src/util/const.json":
/*!*****************************!*\
  !*** ./src/util/const.json ***!
  \*****************************/
/*! exports provided: debug, canvasSettings, gameSettings, default */
/***/ (function(module) {

module.exports = {"debug":true,"canvasSettings":{"canvasID":"gameWorld","canvasWidth":2000,"canvasHeight":2000},"gameSettings":{"gravity":0.9}};

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! exports provided: Logging, Const */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logging */ "./src/util/logging.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logging", function() { return _logging__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _const_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const.json */ "./src/util/const.json");
var _const_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./const.json */ "./src/util/const.json", 1);
/* harmony reexport (default from named exports) */ __webpack_require__.d(__webpack_exports__, "Const", function() { return _const_json__WEBPACK_IMPORTED_MODULE_1__; });



/***/ }),

/***/ "./src/util/logging.js":
/*!*****************************!*\
  !*** ./src/util/logging.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.json */ "./src/util/const.json");
var _const_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./const.json */ "./src/util/const.json", 1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Logging =
/*#__PURE__*/
function () {
  function Logging() {
    _classCallCheck(this, Logging);
  }

  _createClass(Logging, null, [{
    key: "debug",
    value: function debug(msg) {
      if (_const_json__WEBPACK_IMPORTED_MODULE_0__.settings.debug) {
        console.log(msg);
      }
    }
  }]);

  return Logging;
}();

/* harmony default export */ __webpack_exports__["default"] = (Logging);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9hbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9hc3NldC1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lL2dhbWUtZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvaHVkLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9zb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2xvZ2dpbmcuanMiXSwibmFtZXMiOlsiY2FudmFzSWQiLCJ0b2xvYWQiLCJBU1NFVF9NQU5BR0VSIiwiTCIsImRlYnVnIiwiZG93bmxvYWRBbGwiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIndpZHRoIiwiaGVpZ2h0IiwiZ2FtZUVuZ2luZSIsImNhbWVyYSIsInNldHRpbmdzIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJoZXJvIiwiYWRkRW50aXR5IiwiYmFja2dyb3VuZCIsImZvbGxvdyIsImJvYXJkIiwiaW5pdCIsInN0YXJ0IiwiQW5pbWF0aW9uIiwic3ByaXRlU2hlZXQiLCJmcmFtZURpbWVuc2lvbnMiLCJyb3ciLCJzaGVldFdpZHRoIiwiZnJhbWVEdXJhdGlvbiIsImZyYW1lcyIsImxvb3AiLCJzY2FsZSIsImNvbHVtbk9mZnNldCIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsInRvdGFsVGltZSIsImVsYXBzZWRUaW1lIiwibG9vcHMiLCJ0aWNrIiwieCIsInkiLCJmYWNpbmdSaWdodCIsImlzRG9uZSIsImZyYW1lIiwiY3VycmVudEZyYW1lIiwieGluZGV4IiwieWluZGV4IiwiZHJvdyIsIk1hdGgiLCJmbG9vciIsInNhdmUiLCJ0cmFuc2xhdGUiLCJkcmF3SW1hZ2UiLCJyZXN0b3JlIiwiQXNzZXRNYW5hZ2VyIiwiZG93bmxvYWRRdWV1ZSIsInN1Y2Nlc3NDb3VudCIsImVycm9yQ291bnQiLCJjYWNoZSIsInBhdGgiLCJwdXNoIiwibGVuZ3RoIiwiY2FsbGJhY2siLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiaSIsImltZyIsIkltYWdlIiwidGhhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzcmMiLCJMYXllciIsInNyY19kaW1lbnNpb25zIiwic2Nyb2xsX3NwZWVkIiwiaGVpZ2h0X2ZhY3RvciIsImRlc3RfeSIsInN0cmV0Y2giLCJzcmNfd2lkdGgiLCJzcmNfaGVpZ2h0IiwiY2FtZXJhX2RpbWVuc2lvbnMiLCJkX2hlaWdodCIsImRfeSIsInhWaWV3IiwiQmFja2dyb3VuZCIsImdhbWVfZW5naW5lIiwiYXNzZXRfbWFuYWdlciIsImxheWVycyIsIm1ha2VfYmFja2dyb3VuZCIsImFkZEJhY2tncm91bmRMYXllciIsImdldEFzc2V0IiwiR2FtZUVuZ2luZSIsImdhbWVib2FyZCIsImRyYXdCb3hlcyIsImRldk1vZGUiLCJzb3VuZCIsImVudGl0aWVzIiwiYmFja2dyb3VuZExheWVycyIsImNsaWNrIiwibW91c2UiLCJ3aGVlbCIsInN1cmZhY2VXaWR0aCIsInN1cmZhY2VIZWlnaHQiLCJtdXNpYyIsImFkZGVkcG9pbnRzIiwiZGlmZmljdWx0eSIsInRvZ2dsZUNvb2xkb3duIiwiYm94VG9nZ2xlVGltZXIiLCJzZXRQb3NUaW1lciIsImdvZFRvZ2dsZVRpbWVyIiwiY2hlY2twb2ludEN5Y2xlQ291bnQiLCJwYXVzZWQiLCJwYXVzZVRvZ2dsZUNvb2xkb3duIiwicGF1c2VHZW5lcmFsIiwicGF1c2VMYXlvdXRBIiwicGF1c2VMYXlvdXRCIiwicGF1c2VGbGF2b3JYIiwicGF1c2VGbGF2b3JZIiwiY29udHJvbEtleXMiLCJjb250cm9sTGF5b3V0QSIsImNvbnRyb2xMYXlvdXRCIiwiY29udHJvbHMiLCJzdGFydElucHV0IiwiY29uc29sZSIsImxvZyIsIkF1ZGlvIiwidm9sdW1lIiwicGxheSIsImdhbWVMb29wIiwicmVxdWVzdEFuaW1GcmFtZSIsInNvdW5kX25hbWUiLCJnYW1lVGltZSIsIm1heFN0ZXAiLCJ3YWxsTGFzdFRpbWVzdGFtcCIsIndhbGxDdXJyZW50IiwiRGF0ZSIsIm5vdyIsIndhbGxEZWx0YSIsImdhbWVEZWx0YSIsIm1pbiIsInRhYkluZGV4IiwiZ2V0WGFuZFkiLCJlIiwiY2xpZW50WCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJjbGllbnRZIiwidG9wIiwibWFwIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwid2hpY2giLCJzcGFjZSIsInByZXZlbnREZWZhdWx0IiwiaGFzT3duUHJvcGVydHkiLCJjb2RlIiwiYWN0aXZlIiwiZW50aXR5Iiwic3RhdGVzIiwibG9hZGluZ0xldmVsIiwicmVzcGF3blNlY3Rpb24iLCJsZXZlbCIsImxldmVsTnVtIiwic2VjdGlvbiIsInNlY3Rpb25OdW0iLCJsYXllciIsImRyYXdDYWxsYmFjayIsImNsZWFyUmVjdCIsImRyYXciLCJ0eXBlIiwiYm91bmRXaWR0aCIsImJvdW5kSGVpZ2h0IiwieVZpZXciLCJuYW1lIiwiZm9udCIsImZpbGxTdHlsZSIsImZpbGxUZXh0IiwiZW50aXRpZXNDb3VudCIsInJlbW92ZUZyb21Xb3JsZCIsInBvaW50VmFsdWUiLCJuZXdMZXZlbCIsInVwZGF0ZSIsImxvYWROZXh0TGV2ZWwiLCJtdWx0aXBsaWVyIiwiZGVhZEVuZW1pZXMiLCJzY29yZSIsInNwbGljZSIsImoiLCJvdGhlciIsImRpc3QiLCJhYnMiLCJpc0NvbGxpZGluZyIsImRpcmVjdGlvbiIsImNvbGxpZGVkIiwiY3VycmVudFRpbWUiLCJlYXN5bW9kZSIsImhhcmRtb2RlIiwibGF5b3V0QSIsImxheW91dEIiLCJwYXVzZSIsImdldFBvcyIsInNldFBvcyIsImNoZWNrcG9pbnRzIiwiZ29kVG9nZ2xlIiwiaXNHb2QiLCJ0ZXN0UG9zIiwidG9nZ2xlQm94ZXMiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJIdWQiLCJzcmNfY29vcmRpbmF0ZXMiLCJkZXN0X2Nvb3JkaW5hdGVzIiwiaGVhbHRoYmFyIiwiSGVhbHRoQmFyIiwiZW5lcmd5YmFyIiwiRW5lcmd5QmFyIiwic2NvcmVib2FyZCIsIlNjb3JlQm9hcmQiLCJjb21wb25lbnRzIiwiZ3JhZGllbnRTdG9wMSIsImdyYWRpZW50U3RvcDIiLCJncmFkaWVudFN0b3AzIiwiZGVzdF9jb29yZHMiLCJncmFkaWVudCIsImNyZWF0ZUxpbmVhckdyYWRpZW50IiwiYWRkQ29sb3JTdG9wIiwiUmVzb3VyY2VCYXIiLCJzcmNfY29vcmRzIiwic3JjX2RpbXMiLCJsYXN0eSIsInBhcnRzIiwicGFydCIsImRyYXdQYXJ0IiwiZGVzdF94X29mZnNldCIsImRlc3RfeV9vZmZzZXQiLCJoZWFsdGgiLCJyZXNvdXJjZUJhclNlZ21lbnQiLCJtaWRkbGUxIiwibWlkZGxlMiIsIm1pZGRsZTMiLCJtaWRkbGU0IiwibWlkZGxlNSIsImJvdHRvbSIsImVuZXJneSIsIlNvdW5kIiwic291bmRzIiwibl9kdXBzIiwibWFrZV9kdXBsaWNhdGVzIiwibl9kdXAiLCJjdXJyX3NvdW5kIiwic291bmRfbGlzdCIsImNsb25lIiwiY2xvbmVOb2RlIiwiaW5kZXgiLCJlbmRlZCIsIkNhbWVyYSIsImdhbWUiLCJ3b3JsZFdpZHRoIiwid29ybGRIZWlnaHQiLCJhYnNPZmZYIiwiYWJzT2ZmWSIsIm9mZlgiLCJvZmZZIiwiY2FtU3BlZWRYIiwiY2FtU3BlZWRZIiwiYXhpcyIsImZvbGxvd2VkIiwib2JqIiwidXBkYXRlQm91bmRzIiwidmFsIiwibWF4IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZWxlbWVudCIsIkxvZ2dpbmciLCJtc2ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQU1BO0FBQ0E7QUFHQTs7QUFDZSwyRUFBVztBQUV0QixNQUFJQSxRQUFRLEdBQUcsNkNBQUMsQ0FBQ0EsUUFBakI7QUFDQSxNQUFJQyxNQUFNLEdBQUcsQ0FDVCxhQURTLEVBRVQsYUFGUyxFQUdULHFCQUhTLEVBSVQsZUFKUyxFQUtULGlCQUxTLEVBTVQsYUFOUyxF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Q2lOLHdCQUZSLElBR0NqTixNQUFNLENBQUNrTixzQkFIUixJQUlDbE4sTUFBTSxDQUFDbU4sdUJBSlIsSUFLQyxVQUFVcE4sUUFBVixFQUFvQnFOLE9BQXBCLEVBQTZCO0FBQ3pCcE4sVUFBTSxDQUFDQyxVQUFQLENBQWtCRixRQUFsQixFQUE0QixPQUFPLEVBQW5DO0FBQ0gsR0FQVDtBQVFILENBVHlCLEVBQTFCOztBQVdBLHFEQUFJLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJQUdNc04sTzs7Ozs7Ozs7OzBCQUVXQyxHLEVBQUs7QUFDZCxVQUFJLHdDQUFTLENBQUN4USxRQUFWLENBQW1CWCxLQUF2QixFQUE4QjtBQUMxQndILGVBQU8sQ0FBQ0MsR0FBUixDQUFZMEosR0FBWjtBQUNIO0FBQ0o7Ozs7OztBQUdVLCtEQUFBRCxPQUFmLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCB7XG4gICAgQXNzZXRNYW5hZ2VyLFxuICAgIEdhbWVFbmdpbmUsXG4gICAgLy9IdWQsXG4gICAgQmFja2dyb3VuZFxufSBmcm9tIFwiLi9lbmdpbmVcIlxuXG5pbXBvcnQge1xuICAgLy8gR2FtZUJvYXJkLFxuICAgIENhbWVyYSxcbiAgICAvL0hlcm9cbn0gZnJvbSBcIi4vZW50aXRpZXNcIlxuXG5pbXBvcnQge0xvZ2dpbmcgYXMgTH0gZnJvbSBcIi4vdXRpbFwiXG5pbXBvcnQgQyBmcm9tIFwiLi91dGlsL2NvbnN0Lmpzb25cIlxuXG5cbi8qIEFzc2VtYmxlcyBhbmQgc3RhcnRzIHRoZSBnYW1lLiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgY2FudmFzSWQgPSBDLmNhbnZhc0lkO1xuICAgIGxldCB0b2xvYWQgPSBbXG4gICAgICAgIFwiaW1nL1pYZS5wbmdcIixcbiAgICAgICAgXCJpbWcvTGVvLnBuZ1wiLFxuICAgICAgICBcImltZy9FbmVteVNoZWV0MS5wbmdcIixcbiAgICAgICAgXCJpbWcvcGlwZXMucG5nXCIsXG4gICAgICAgIFwiaW1nL0VuZW1pZXMucG5nXCIsXG4gICAgICAgIFwiaW1nL2h1ZC5wbmdcIixcbiAgICAgICAgXCJpbWcvaGVhbHRocGFjay5wbmdcIixcbiAgICAgICAgXCJpbWcvZW5lcmd5cGFjay5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvMV9iZy5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvMl9mYXJidWlsZGluZ3MucG5nXCIsXG4gICAgICAgIFwiaW1nL2JnLzNfYnVpbGRpbmdzLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy80X2ZvcmVncm91bmQucG5nXCIsXG4gICAgICAgIFwiaW1nL2JnL2JvdF9maWxsLnBuZ1wiXG4gICAgXTtcblxuICAgIGxldCBBU1NFVF9NQU5BR0VSID0gbmV3IEFzc2V0TWFuYWdlcih0b2xvYWQpO1xuICAgIEwuZGVidWcoXCJTdGFydGluZyBhc3NldCBtYW5hZ2VyIGRvd25sb2FkLi4uXCIpXG5cbiAgICAvLyBjYWxsYmFjayBhZnRlciBBc3NldE1hbmFnZXIgaXMgZmluaXNoZWQuLi4gZG93bmxvYWRzIGV2ZXJ5IGFzc2V0IGJlZm9yZSBiZWdpbm5pbmcuIHdoYXQncyBhIGJldHRlciB3YXk/XG4gICAgQVNTRVRfTUFOQUdFUi5kb3dubG9hZEFsbCgoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIEwuZGVidWcoXCJjYW52YXMgd2lkdGg6IFwiICsgY2FudmFzLndpZHRoKTtcbiAgICAgICAgTC5kZWJ1ZyhcImNhbnZhcyBoZWlnaHQ6IFwiICsgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgbGV0IGdhbWVFbmdpbmUgPSBuZXcgR2FtZUVuZ2luZSgpO1xuICAgICAgICBsZXQgY2FtZXJhID0gbmV3IENhbWVyYShnYW1lRW5naW5lLCAwLCAwLCBudWxsLCBjdHggPSBjdHgsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgQy5zZXR0aW5ncy5jYW52YXNXaWR0aCwgQy5zZXR0aW5ncy5jYW52YXNIZWlnaHQpO1xuICAgICAgICAvLyBsZXQgaGVybyA9IG5ldyBIZXJvKGdhbWVFbmdpbmUsIDAsIDAsIEFTU0VUX01BTkFHRVIuZ2V0QXNzZXQoXCJpbWcvWlhlLnBuZ1wiKSwgY3R4KTtcbiAgICAgICAgLy8gbGV0IGJvYXJkID0gbmV3IEdhbWVCb2FyZChnYW1lRW5naW5lLCBBU1NFVF9NQU5BR0VSLCBjdHgpO1xuICAgICAgICBnYW1lRW5naW5lLmhlcm8gPSBudWxsO1xuICAgICAgICAvLyBnYW1lRW5naW5lLmdhbWVib2FyZCA9IGJvYXJkO1xuICAgICAgICAvLyBsZXQgaHVkID0gbmV3IEh1ZChnYW1lRW5naW5lLCBBU1NFVF9NQU5BR0VSLmdldEFzc2V0KFwiaW1nL2h1ZC5wbmdcIiksIGhlcm8sIFswLCAwXSwgWzAsIDBdLCBbMTAwLCAxMDBdLCAzLCBjYW1lcmEpO1xuICAgICAgICAvLyBib2FyZC5odWQgPSBodWQ7XG4gICAgICAgIC8vIGJvYXJkLmhlcm8gPSBoZXJvO1xuICAgICAgICBcbiAgICAgICAgLy8gIyMjIG11c2ljICMjI1xuICAgICAgICBcbiAgICAgICAgLy9UT0RPOiBQbGFjZWhvbGRlciBtYWdpYyBudW1iZXJzIHVudGlsIHdlIGRlY2lkZSBvbiBob3cgdG8gaGFuZGxlIHdvcmxkIGJvdW5kYXJ5IGFuZCBjYW1lcmFcblxuICAgICAgICAvKipOT1RFOiBJVCBJUyBWRVJZIElNUE9SVEFOVCBDQU1FUkEgSVMgVEhFIEZJUlNUIEFEREVEIEVOVElUWSoqL1xuXG4gICAgICAgIGdhbWVFbmdpbmUuYWRkRW50aXR5KGNhbWVyYSk7XG4gICAgICAgIGdhbWVFbmdpbmUuY2FtZXJhID0gY2FtZXJhO1xuXG4gICAgICAgIGxldCBiYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoZ2FtZUVuZ2luZSwgQVNTRVRfTUFOQUdFUiwgY3R4LCBjYW1lcmEpO1xuXG4gICAgICAgIC8vTG9hZHMgbGV2ZWwgblxuICAgICAgICAvLyBib2FyZC5nZXRMZXZlbCgxKTtcblxuICAgICAgICBjYW1lcmEuZm9sbG93KGhlcm8pO1xuICAgICAgICBnYW1lRW5naW5lLmFkZEVudGl0eShib2FyZCk7XG4gICAgICAgIC8vZ2FtZUVuZ2luZS5hZGRFbnRpdHkoaGVybyk7XG4gICAgICAgIC8vZ2FtZUVuZ2luZS5hZGRFbnRpdHkoaHVkKTtcbiAgICAgICAgZ2FtZUVuZ2luZS5pbml0KGN0eCk7XG4gICAgICAgIGdhbWVFbmdpbmUuc3RhcnQoKTtcbiAgICB9KTtcbn0iLCJpbXBvcnQgQXNzZXRNYW5hZ2VyIGZyb20gXCIuL2Fzc2V0LW1hbmFnZXJcIlxuXG5cbi8qKioqKioqKioqKioqKlxuQW5pbWF0aW9uIGNsYXNzXG5cblByb3BlcnRpZXM6XG5zcHJpdGVTaGVldCAtIGFuIEltYWdlIG9iamVjdCBvZiB0aGlzIGFuaW1hdGlvbidzIHNwcml0ZXNoZWV0LlxuZnJhbWVEaW1lbnNpb25zW3dpZHRoLCBoZWlnaHRdIC0gYW4gYXJyYXkgb2YgbGVuZ3RoIDIsIGRlbm90aW5nIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIFxuICAgIG9uZSBmcmFtZSBpbiB0aGUgc2VyaWVzLlxucm93IC0gYW4gaW50ZWdlciBkZW5vdGluZyB0aGUgcm93IChiZWdpbm5pbmcgd2l0aCAwKSBvZiB0aGUgc3ByaXRlc2hlZXQgdG8gcGxheS5cbnNoZWV0V2lkdGggLSBhbiBpbnRlZ2VyIGRlbm90aW5nIHRoZSBudW1iZXIgb2YgZnJhbWVzIGluIG9uZSByb3cuIElmIHNoZWV0V2lkdGggaXMgZ3JlYXRlclxuICAgIHRoYW4gdGhpcyBBbmltYXRpb24ncyBmcmFtZXMgcHJvcGVydHksIGl0IHdpbGwgY29udGludWUgdG8gdGhlIGZpcnN0IGNvbHVtbiBvbiB0aGUgbmV4dCByb3cuXG5mcmFtZUR1cmF0aW9uIC0gdGhlIG51bWJlciBvZiBmcmFtZXMgZWFjaCBzcHJpdGUgaW4gdGhlIGFuaW1hdGlvbiB3aWxsIGJlIHNob3duIGZvci5cbmZyYW1lcyAtIHRoZSBudW1iZXIgb2YgZnJhbWVzIGluIHRoaXMgYW5pbWF0aW9uLlxubG9vcCAtIGEgYm9vbGVhbiBkZW5vdGluZyB3aGV0aGVyIHRoaXMgYW5pbWF0aW9uIHNob3VsZCByZXBsYXkgb3Igbm90Llxuc2NhbGUgLSBhIHZhbHVlIHRvIG11bHRpcGx5IHRoZSBvcmlnaW5hbCBzcHJpdGUncyBzaXplIGJ5LlxuY29sdW1uT2Zmc2V0IC0gYWRkZWQgdG8gdGhpcy5jdXJyZW50RnJhbWUgdG8gZ2V0IHN0YXJ0aW5nIHBvaW50IG9mIGFueSBhbmltYXRpb25zIHRoYXQgc3RhcnQgcGFydHdheSBpbnRvIGEgc2hlZXQuXG4qL1xuY2xhc3MgQW5pbWF0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKHNwcml0ZVNoZWV0LCBmcmFtZURpbWVuc2lvbnMsIHJvdywgc2hlZXRXaWR0aCwgZnJhbWVEdXJhdGlvbiwgZnJhbWVzLCBsb29wLCBzY2FsZSwgY29sdW1uT2Zmc2V0PTApIHtcblxuICAgICAgICB0aGlzLnNwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7XG4gICAgICAgIHRoaXMuZnJhbWVXaWR0aCA9IGZyYW1lRGltZW5zaW9uc1swXTtcbiAgICAgICAgdGhpcy5mcmFtZUR1cmF0aW9uID0gZnJhbWVEdXJhdGlvbjtcbiAgICAgICAgdGhpcy5mcmFtZUhlaWdodCA9IGZyYW1lRGltZW5zaW9uc1sxXTsgLy9jYW4ndCBhZGQgMSBoZXJlLiBNZXNzZXMgdXAgZnJhbWVzIGxvd2VyIGRvd24gdGhlIHNwcml0ZSBzaGVldFxuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5jb2x1bW5PZmZzZXQgPSBjb2x1bW5PZmZzZXQ7XG4gICAgICAgIHRoaXMuc2hlZXRXaWR0aCA9IHNoZWV0V2lkdGg7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IGZyYW1lRHVyYXRpb24gKiBmcmFtZXM7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmxvb3AgPSBsb29wO1xuICAgICAgICB0aGlzLmxvb3BzID0gMDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIH1cblxuXG4gICAgZHJhd0ZyYW1lKHRpY2ssIGN0eCwgeCwgeSwgZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSArPSB0aWNrO1xuICAgICAgICBpZiAodGhpcy5pc0RvbmUoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubG9vcHMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZnJhbWUgPSB0aGlzLmN1cnJlbnRGcmFtZSgpO1xuICAgICAgICB2YXIgeGluZGV4ID0gMDtcbiAgICAgICAgdmFyIHlpbmRleCA9IDA7XG4gICAgICAgIGxldCBkcm93ID0gKHRoaXMucm93ICogdGhpcy5mcmFtZUhlaWdodClcbiAgICAgICAgeGluZGV4ID0gZnJhbWUgJSB0aGlzLnNoZWV0V2lkdGg7XG4gICAgICAgIHlpbmRleCA9IE1hdGguZmxvb3IoKGZyYW1lKSAvIHRoaXMuc2hlZXRXaWR0aCk7XG5cblxuICAgICAgICAvLyBEcmF3IGZhY2luZyBsZWZ0XG4gICAgICAgIGlmICghZmFjaW5nUmlnaHQpIHtcblxuICAgICAgICAgICAgLy8gU2F2ZSBvcmlnaW5hbCBjb250ZXh0XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgICAgICAvLyBTZXQgY29udGV4dCB0byBob3Jpem9udGFsIGNlbnRlciBvZiBpbWFnZSAoZG9uJ3QgY2FyZSBhYm91dCBjaGFuZ2luZyB5J3MgcG9zaXRpb24pXG4gICAgICAgIFx0Y3R4LnRyYW5zbGF0ZSh4ICsgKHRoaXMuc2NhbGUgKiB0aGlzLmZyYW1lV2lkdGgpIC8gMiwgMCk7XG4gICAgICAgICAgICAgICAgXG5cdFx0ICAgIC8vIFNjYWxlIHggYnkgLTEgdG8gZmxpcCBob3Jpem9udGFsbHlcbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG5cbiAgICAgICAgICAgIC8vIERyYXcgaW1hZ2Ugb24gdGhlIHRyYW5zZm9ybWVkIGNvbnRleHRcbiAgICAgICAgICAgIC8vIE5vdGU6IGFmdGVyIHRyYW5zZm9ybWluZyBbMCwwXSBpcyB2aXN1YWxseSBbLXdpZHRoLzIsIDBdXG4gICAgICAgICAgICAvLyBzbyB0aGUgaW1hZ2UgbmVlZHMgdG8gYmUgb2Zmc2V0IGFjY29yZGluZ2x5IHdoZW4gZHJhd25cbiAgICAgICAgXHRjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlU2hlZXQsXG4gICAgICAgICAgICAgICAgICAgICAoeGluZGV4ICogdGhpcy5mcmFtZVdpZHRoKSwgKHlpbmRleCAqIHRoaXMuZnJhbWVIZWlnaHQpICsgZHJvdywgIC8vIHNvdXJjZSBmcm9tIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGgsIHRoaXMuZnJhbWVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAtKHRoaXMuZnJhbWVXaWR0aCAqIDIpICsgKHRoaXMuZnJhbWVXaWR0aCAvIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMuZnJhbWVXaWR0aCwgLy8gT2Zmc2V0IGR4XG4gICAgICAgICAgICAgICAgICAgICB5IC0gdGhpcy5zY2FsZSp0aGlzLmZyYW1lSGVpZ2h0ICsgdGhpcy5zY2FsZSoxMCxcblxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVdpZHRoICogdGhpcy5zY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVIZWlnaHQgKiB0aGlzLnNjYWxlKTtcblxuICAgICAgICAgICAgLy8gUmVzdG9yZSBvcmlnaW5hbCBjb250ZXh0XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICAgICAgLy8gb21nIGl0J3MgZmluYWxseSB3b3JraW5nIDstO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIERyYXcgZmFjaW5nIHJpZ2h0XG4gICAgICAgIFx0Y3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZVNoZWV0LFxuICAgICAgICAgICAgICAgICAgICAgKHhpbmRleCAqIHRoaXMuZnJhbWVXaWR0aCksICh5aW5kZXggKiB0aGlzLmZyYW1lSGVpZ2h0KSArIGRyb3csICAvLyBzb3VyY2UgZnJvbSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVdpZHRoLCB0aGlzLmZyYW1lSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgeCAtIHRoaXMuZnJhbWVXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgIHkgLSB0aGlzLnNjYWxlICogdGhpcy5mcmFtZUhlaWdodCArIHRoaXMuc2NhbGUgKiAxMCwgXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGggKiB0aGlzLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZUhlaWdodCAqIHRoaXMuc2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSg1MCwgNTApO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjdXJyZW50RnJhbWUgKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmVsYXBzZWRUaW1lIC8gdGhpcy5mcmFtZUR1cmF0aW9uKSArIHRoaXMuY29sdW1uT2Zmc2V0O1xuICAgIH1cblxuICAgIGlzRG9uZSAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5lbGFwc2VkVGltZSA+PSB0aGlzLnRvdGFsVGltZSAtIDEpO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5sb29wcyA9IDA7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb247IiwiLy8gVE9ETzogdGhpcyBjYW4gYWxsIGJlIG1hbmFnZWQgYnkgZXM2IHByb21pc2VzXG5cbi8qKioqKioqKioqKioqKioqKlxuQXNzZXRNYW5hZ2VyIGNsYXNzXG5cbnN1Y2Nlc3NDb3VudCAtIHRoZSBudW1iZXIgb2Ygc3VjY2Vzc2VzIGZldGNoaW5nIGFzc2V0c1xuZXJyb3JDb3VudCAtIHRoZSBudW1iZXIgb2YgZmFpbHVyZXMgZmV0Y2hpbmcgYXNzZXRzXG5jYWNoZSAtIHRoZSBhc3NldCBjYWNoZVxuZG93bmxvYWRRdWV1ZSAtIHRoZSBxdWV1ZSBvZiBhc3NldHMgdG8gZG93bmxvYWRcbioqKioqKioqKioqKioqKioqL1xuY2xhc3MgQXNzZXRNYW5hZ2VyIHtcblxuICAgIGNvbnN0cnVjdG9yIChkb3dubG9hZFF1ZXVlID0gW10pIHtcbiAgICAgICAgdGhpcy5zdWNjZXNzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmVycm9yQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmNhY2hlID0gW107XG4gICAgICAgIHRoaXMuZG93bmxvYWRRdWV1ZSA9IGRvd25sb2FkUXVldWU7XG4gICAgfVxuXG4gICAgLypcbiAgICBBZGRzIGFuIGFzc2V0IHBhdGggdG8gdGhlIGRvd25sb2FkIHF1ZXVlXG4gICAgKi9cbiAgICBxdWV1ZURvd25sb2FkIChwYXRoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZG93bmxvYWRRdWV1ZS5wdXNoKHBhdGgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgQ2hlY2tzIGlmIGFsbCBhc3NldHMgaGF2ZSBiZWVuIHJlc3BvbmRlZCB0byAoZWl0aGVyIHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAqL1xuICAgIGlzRG9uZSAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kb3dubG9hZFF1ZXVlLmxlbmd0aCA9PSB0aGlzLnN1Y2Nlc3NDb3VudCArIHRoaXMuZXJyb3JDb3VudCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBBdHRlbXB0cyB0byBkb3dubG9hZCBlYWNoIGFzc2V0IGluIHRoZSBxdWV1ZVxuICAgICovXG4gICAgZG93bmxvYWRBbGwgKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLmRvd25sb2FkUXVldWUubGVuZ3RoID09PSAwKSB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRvd25sb2FkUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5kb3dubG9hZFF1ZXVlW2ldO1xuICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImR1bjogXCIgKyB0aGlzLnNyYy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0aGF0LnN1Y2Nlc3NDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGF0LmlzRG9uZSgpKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5lcnJvckNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuaXNEb25lKCkpIHsgY2FsbGJhY2soKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbWcuc3JjID0gcGF0aDtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVbcGF0aF0gPSBpbWc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIEdldHMgYW4gYXNzZXRcbiAgICAqL1xuICAgIGdldEFzc2V0IChwYXRoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cocGF0aC50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbcGF0aF07XG4gICAgfVxuICAgIFxufSAvLyBlbmQgb2YgQXNzZXRNYW5hZ2VyXG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0TWFuYWdlcjtcblxuIiwiaW1wb3J0IHsgQ2FtZXJhLCBFbnRpdHkgfSBmcm9tIFwiLi4vZW50aXRpZXNcIlxuXG5cbmNsYXNzIExheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihpbWcsIHNyY19kaW1lbnNpb25zLCBjYW1lcmEsIHNjcm9sbF9zcGVlZCwgaGVpZ2h0X2ZhY3RvciwgZGVzdF95LCBzdHJldGNoPWZhbHNlLCBzY2FsZT0zKSB7XG4gICAgICAgIHRoaXMuaW1nID0gaW1nXG4gICAgICAgIHRoaXMuc3JjX3dpZHRoID0gc3JjX2RpbWVuc2lvbnNbMF1cbiAgICAgICAgdGhpcy5zcmNfaGVpZ2h0ID0gc3JjX2RpbWVuc2lvbnNbMV1cbiAgICAgICAgdGhpcy5zY3JvbGxfc3BlZWQgPSBzY3JvbGxfc3BlZWRcbiAgICAgICAgdGhpcy5oZWlnaHRfZmFjdG9yID0gaGVpZ2h0X2ZhY3RvclxuICAgICAgICB0aGlzLnN0cmV0Y2ggPSBzdHJldGNoXG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhXG4gICAgICAgIHRoaXMuY2FtZXJhX2RpbWVuc2lvbnMgPSBbY2FtZXJhLmNhbnZhc1dpZHRoLCBjYW1lcmEuY2FudmFzSGVpZ2h0XVxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGVcbiAgICAgICAgdGhpcy5kZXN0X3kgPSBkZXN0X3lcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgLy8gcmVwZWF0IGFzIG1hbnkgdGltZXMgYXMgbmVjZXNzYXJ5IHRvIGZpbGwgY2FtZXJhIHNpemVcblxuICAgICAgICBmb3IgKHZhciBpID0gMCAtIHRoaXMuc3JjX3dpZHRoOyBpIDwgdGhpcy5jYW1lcmFfZGltZW5zaW9uc1swXSArIHRoaXMuc3JjX3dpZHRoOyBpICs9IHRoaXMuc3JjX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRfaGVpZ2h0ID0gKHRoaXMuY2FtZXJhX2RpbWVuc2lvbnNbMV0gKiB0aGlzLmhlaWdodF9mYWN0b3IpXG4gICAgICAgICAgICAgICAgbGV0IGRfeSA9IHRoaXMuZGVzdF95ICogdGhpcy5oZWlnaHRfZmFjdG9yXG4gICAgICAgICAgICAgICAgLy8gMCArICgodGhpcy5oZWlnaHRfZmFjdG9yKSkgKiB0aGlzLmNhbWVyYV9kaW1lbnNpb25zWzFdXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdHJldGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRfaGVpZ2h0ID0gdGhpcy5jYW1lcmFfZGltZW5zaW9uc1sxXVxuICAgICAgICAgICAgICAgICAgICAvLyBkX3kgPSBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZyxcbiAgICAgICAgICAgICAgICAgICAgMCwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGgsIHRoaXMuc3JjX2hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgKGkgKyAoKHRoaXMuY2FtZXJhLnhWaWV3KiB0aGlzLnNjcm9sbF9zcGVlZCkgJSAodGhpcy5zcmNfd2lkdGgpKSkqIHRoaXMuc2NhbGUsIFxuICAgICAgICAgICAgICAgICAgICBkX3ksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoICogdGhpcy5zY2FsZSwgXG4gICAgICAgICAgICAgICAgICAgIGRfaGVpZ2h0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuY2xhc3MgQmFja2dyb3VuZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lX2VuZ2luZSwgYXNzZXRfbWFuYWdlciwgY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZSA9IGdhbWVfZW5naW5lXG4gICAgICAgIHRoaXMuYXNzZXRfbWFuYWdlciA9IGFzc2V0X21hbmFnZXJcbiAgICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFcbiAgICAgICAgdGhpcy5sYXllcnMgPSBbXG4gICAgICAgICAgICBcImltZy9iZy8xX2JnLnBuZ1wiLFxuICAgICAgICAgICAgXCJpbWcvYmcvMl9mYXJidWlsZGluZ3MucG5nXCIsXG4gICAgICAgICAgICBcImltZy9iZy8zX2J1aWxkaW5ncy5wbmdcIixcbiAgICAgICAgICAgIFwiaW1nL2JnLzRfZm9yZWdyb3VuZC5wbmdcIixcbiAgICAgICAgICAgIFwiaW1nL2JnL2JvdF9maWxsLnBuZ1wiXG4gICAgICAgIF1cblxuICAgICAgICB0aGlzLm1ha2VfYmFja2dyb3VuZCgpXG5cblxuICAgIH1cblxuICAgIG1ha2VfYmFja2dyb3VuZCAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUuYWRkQmFja2dyb3VuZExheWVyKG5ldyBMYXllcih0aGlzLmFzc2V0X21hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvYmcvMV9iZy5wbmdcIiksIFxuICAgICAgICAgICAgWzI3MiwgMTYwXSwgdGhpcy5jYW1lcmEsIDAuMSwgMSwgMCwgdHJ1ZSkpXG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUuYWRkQmFja2dyb3VuZExheWVyKG5ldyBMYXllcih0aGlzLmFzc2V0X21hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvYmcvMl9mYXJidWlsZGluZ3MucG5nXCIpLCBcbiAgICAgICAgICAgIFsyMTMsIDE0Ml0sIHRoaXMuY2FtZXJhLCAwLjE1LCAwLjM1LCB0aGlzLmNhbWVyYS5jYW52YXNIZWlnaHQvMikpXG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUuYWRkQmFja2dyb3VuZExheWVyKG5ldyBMYXllcih0aGlzLmFzc2V0X21hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvYmcvM19idWlsZGluZ3MucG5nXCIpLCBcbiAgICAgICAgICAgIFsyNzIsIDE1MF0sIHRoaXMuY2FtZXJhLCAwLjIsIDAuNCwgdGhpcy5jYW1lcmEuY2FudmFzSGVpZ2h0LzIpKVxuICAgICAgICAvLyB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnLzRfZm9yZWdyb3VuZC5wbmdcIiksIFxuICAgICAgICAgICAgLy8gWzI3MiwgMTA0XSwgdGhpcy5jYW1lcmEsIDAuMjUsIC41LCB0aGlzLmNhbWVyYS5jYW52YXNIZWlnaHQvMikpXG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUuYWRkQmFja2dyb3VuZExheWVyKG5ldyBMYXllcih0aGlzLmFzc2V0X21hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvYmcvYm90X2ZpbGwucG5nXCIpLCBcbiAgICAgICAgICAgIFsyNTAsIDI1MF0sIHRoaXMuY2FtZXJhLCAxLCAxLCB0aGlzLmNhbWVyYS5jYW52YXNIZWlnaHQvMikpXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tncm91bmQ7IiwiaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi9hc3NldC1tYW5hZ2VyXCJcbi8vIGltcG9ydCBIZXJvIGZyb20gXCIuL2VudGl0aWVzL2hlcm9cIlxuaW1wb3J0IEh1ZCBmcm9tIFwiLi9odWRcIlxuaW1wb3J0IEJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZFwiXG5pbXBvcnQgU291bmQgZnJvbSBcIi4vc291bmRcIlxuXG5cbiAvKioqKioqKioqKioqKioqXG5HYW1lRW5naW5lIGNsYXNzXG4qKioqKioqKioqKioqKioqL1xuY2xhc3MgR2FtZUVuZ2luZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lYm9hcmQsIGhlcm8pIHtcbiAgICAgICAgdGhpcy5kcmF3Qm94ZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZXZNb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBTb3VuZCgpO1xuICAgICAgICB0aGlzLmVudGl0aWVzID0gW107XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZExheWVycyA9IFtdO1xuICAgICAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBudWxsO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2xpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdXNlID0gbnVsbDtcbiAgICAgICAgdGhpcy53aGVlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3VyZmFjZVdpZHRoID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdXJmYWNlSGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5tdXNpYyA9IG51bGw7XG4gICAgICAgIHRoaXMuYWRkZWRwb2ludHMgPSAwO1xuICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSBcIk5vcm1hbCAoQnV0IEtpbmRhIEVhc3kpXCI7XG5cbiAgICAgICAgLy9ERVYgVE9PTCBGSUVMRFNcbiAgICAgICAgdGhpcy50b2dnbGVDb29sZG93bj0gMjA7XG4gICAgICAgIHRoaXMuYm94VG9nZ2xlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNldFBvc1RpbWVyID0gMDtcbiAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuY2hlY2twb2ludEN5Y2xlQ291bnQgPSAxO1xuXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGF1c2VUb2dnbGVDb29sZG93biA9IDA7XG4gICAgICAgIHRoaXMucGF1c2VHZW5lcmFsID0gNDA7XG4gICAgICAgIHRoaXMucGF1c2VMYXlvdXRBID0gMzUwO1xuICAgICAgICB0aGlzLnBhdXNlTGF5b3V0QiA9IDM1MDtcbiAgICAgICAgdGhpcy5wYXVzZUZsYXZvclggPSA4MDA7XG4gICAgICAgIHRoaXMucGF1c2VGbGF2b3JZID0gMjUwO1xuXG4gICAgICAgIC8vIEtCIGlucHV0IGtleWNvZGVzXG4gICAgICAgIHRoaXMuY29udHJvbEtleXMgPSB7XG4gICAgICAgICAgICBcIlNwYWNlXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5V1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVNcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlEXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5QVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVJcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlGXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5R1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUVcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlKXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5S1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUxcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlNXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5UFwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVRcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlZXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5VlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUNcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJFbnRlclwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDFcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQyXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkM1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDRcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQ1XCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkNlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDlcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnRyb2wgbWFwcGluZ1xuICAgICAgICB0aGlzLmNvbnRyb2xMYXlvdXRBID0ge1xuICAgICAgICAgICAgXCJqdW1wXCI6IFwiU3BhY2VcIixcbiAgICAgICAgICAgIFwicmlnaHRcIjogXCJLZXlEXCIsXG4gICAgICAgICAgICBcImxlZnRcIjogXCJLZXlBXCIsXG4gICAgICAgICAgICBcInNob290XCI6IFwiTnVtcGFkNFwiLFxuICAgICAgICAgICAgXCJzbGFzaFwiOiBcIk51bXBhZDVcIixcbiAgICAgICAgICAgIFwiY2xlYXZlXCI6IFwiTnVtcGFkNlwiLFxuICAgICAgICAgICAgXCJlbmVyZ2l6ZVwiOiBcIktleVdcIixcbiAgICAgICAgICAgIFwiZGFzaFwiOiBcIk51bXBhZDFcIixcbiAgICAgICAgICAgIFwiZ2V0UG9zXCI6IFwiS2V5RVwiLFxuICAgICAgICAgICAgXCJzZXRQb3NcIjogXCJLZXlSXCIsXG4gICAgICAgICAgICBcImdvZFRvZ2dsZVwiOiBcIktleUdcIixcbiAgICAgICAgICAgIFwiaGFyZG1vZGVcIjogXCJLZXlUXCIsXG4gICAgICAgICAgICBcImVhc3ltb2RlXCI6IFwiS2V5WVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRBXCI6IFwiTnVtcGFkOVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRCXCI6IFwiS2V5UFwiLFxuICAgICAgICAgICAgXCJ0ZXN0UG9zXCI6IFwiS2V5VlwiLFxuICAgICAgICAgICAgXCJ0b2dnbGVCb3hlc1wiOiBcIktleUNcIixcbiAgICAgICAgICAgIFwicGF1c2VcIjogXCJFbnRlclwiLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbExheW91dEIgPSB7XG4gICAgICAgICAgICBcImp1bXBcIjogXCJTcGFjZVwiLFxuICAgICAgICAgICAgXCJyaWdodFwiOiBcIktleURcIixcbiAgICAgICAgICAgIFwibGVmdFwiOiBcIktleUFcIixcbiAgICAgICAgICAgIFwic2hvb3RcIjogXCJLZXlKXCIsXG4gICAgICAgICAgICBcInNsYXNoXCI6IFwiS2V5S1wiLFxuICAgICAgICAgICAgXCJjbGVhdmVcIjogXCJLZXlMXCIsXG4gICAgICAgICAgICBcImVuZXJnaXplXCI6IFwiS2V5V1wiLFxuICAgICAgICAgICAgXCJkYXNoXCI6IFwiS2V5TVwiLFxuICAgICAgICAgICAgXCJnZXRQb3NcIjogXCJLZXlFXCIsXG4gICAgICAgICAgICBcInNldFBvc1wiOiBcIktleVJcIixcbiAgICAgICAgICAgIFwiZ29kVG9nZ2xlXCI6IFwiS2V5R1wiLFxuICAgICAgICAgICAgXCJoYXJkbW9kZVwiOiBcIktleVRcIixcbiAgICAgICAgICAgIFwiZWFzeW1vZGVcIjogXCJLZXlZXCIsXG4gICAgICAgICAgICBcImxheW91dEFcIjogXCJOdW1wYWQ5XCIsXG4gICAgICAgICAgICBcImxheW91dEJcIjogXCJLZXlQXCIsXG4gICAgICAgICAgICBcInRlc3RQb3NcIjogXCJLZXlWXCIsXG4gICAgICAgICAgICBcInRvZ2dsZUJveGVzXCI6IFwiS2V5Q1wiLFxuICAgICAgICAgICAgXCJwYXVzZVwiOiBcIkVudGVyXCIsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250cm9scyA9IHRoaXMuY29udHJvbExheW91dEE7XG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgfVxuXG4gICAgLypcbiAgICBJbml0aWFsaXplcyB0aGUgZ2FtZSBlbmdpbmVcbiAgICAqL1xuICAgIGluaXQgKGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5zdXJmYWNlV2lkdGggPSB0aGlzLmN0eC5jYW52YXMud2lkdGg7XG4gICAgICAgIHRoaXMuc3VyZmFjZUhlaWdodCA9IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dCgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdnYW1lIGluaXRpYWxpemVkJyk7XG4gICAgfVxuXG4gICAgLypcbiAgICBTdGFydHMgdGhlIGdhbWUgZW5naW5lXG4gICAgKi9cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgZ2FtZVwiKTtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLm11c2ljID0gbmV3IEF1ZGlvKFwiLi9hdWRpby90cmFja18xLndhdlwiKTtcbiAgICAgICAgdGhpcy5tdXNpYy52b2x1bWUgPSAxO1xuICAgICAgICB0aGlzLm11c2ljLnBsYXkoKTtcbiAgICAgICAgKGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAgICAgICAgICAgdGhhdC5sb29wKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVMb29wLCB0aGF0LmN0eC5jYW52YXMpO1xuICAgICAgICB9KSgpO1xuICAgIH1cblxuICAgIHBsYXlTb3VuZChzb3VuZF9uYW1lLCB2b2x1bWU9MSkge1xuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoc291bmRfbmFtZSwgdm9sdW1lKVxuICAgIH1cblxuICAgIC8vVGltZXIgY2xhc3NcbiAgICBUaW1lcigpIHsvL0FkZGVkIHRoaXMgZm9yIHdoZW4gd2UgaW1wbGVtZW50IGEgcGF1c2UgZnVuY3Rpb24uXG4gICAgICAgIHRoaXMuZ2FtZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLm1heFN0ZXAgPSAwLjA1O1xuICAgICAgICB0aGlzLndhbGxMYXN0VGltZXN0YW1wID0gMDtcbiAgICAgICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgICAgICAgIHZhciB3YWxsQ3VycmVudCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB2YXIgd2FsbERlbHRhID0gKHdhbGxDdXJyZW50IC0gdGhpcy53YWxsTGFzdFRpbWVzdGFtcCkgLyAxMDAwO1xuICAgICAgICAgICAgdGhpcy53YWxsTGFzdFRpbWVzdGFtcCA9IHdhbGxDdXJyZW50O1xuXG4gICAgICAgICAgICB2YXIgZ2FtZURlbHRhID0gTWF0aC5taW4od2FsbERlbHRhLCB0aGlzLm1heFN0ZXApO1xuICAgICAgICAgICAgdGhpcy5nYW1lVGltZSArPSBnYW1lRGVsdGE7XG4gICAgICAgICAgICByZXR1cm4gZ2FtZURlbHRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBJbnB1dCBoYW5kbGluZywgaW5pdGlhbGl6ZXMgbGlzdGVuZXJzXG4gICAgKi9cbiAgICBzdGFydElucHV0ICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGlucHV0Jyk7XG5cbiAgICAgICAgdGhpcy5jdHguY2FudmFzLnRhYkluZGV4ID0gMDs7XG5cbiAgICAgICAgbGV0IGdldFhhbmRZID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGxldCB4ID0gZS5jbGllbnRYIC0gdGhhdC5jdHguY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgICAgICBsZXQgeSA9IGUuY2xpZW50WSAtIHRoYXQuY3R4LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgICAgICAgIGlmICh4IDwgMTAyNCkge1xuICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHggLyAzMik7XG4gICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoeSAvIDMyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgICAgIC8vIGNvbnRyb2wgZXZlbnQgbGlzdGVuZXJzIGdvIGhlcmVcbiAgICAgICAgbGV0IG1hcCA9IHt9O1xuXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpID09PSAnICcpIHRoYXQuc3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCF0aGF0LmNvbnRyb2xLZXlzLmhhc093blByb3BlcnR5KGUuY29kZSkpIHsgdGhhdC5jb250cm9sS2V5c1tlLmNvZGVdID0ge1wiYWN0aXZlXCI6IHRydWV9OyB9XG4gICAgICAgICAgICBpZiAodGhhdC5jb250cm9sS2V5c1tlLmNvZGVdLmFjdGl2ZSA9PSBmYWxzZSkgeyB0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0uYWN0aXZlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7ZS5jb2RlfSBpcyAke3RoYXQuY29udHJvbHNbZS5jb2RlXS5hY3RpdmV9YCk7XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgXHRpZiAoIXRoYXQuY29udHJvbEtleXMuaGFzT3duUHJvcGVydHkoZS5jb2RlKSkgeyB0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0gPSB7XCJhY3RpdmVcIjogZmFsc2V9OyB9XG4gICAgICAgICAgICBpZiAodGhhdC5jb250cm9sS2V5c1tlLmNvZGVdLmFjdGl2ZSA9PSB0cnVlKSB7IHRoYXQuY29udHJvbEtleXNbZS5jb2RlXS5hY3RpdmUgPSBmYWxzZSB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtlLmNvZGV9IGlzICR7dGhhdC5jb250cm9sc1tlLmNvZGVdLmFjdGl2ZX1gKTtcblxuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ0lucHV0IHN0YXJ0ZWQnKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBnYW1lXG4gICAgKi9cbiAgICBhZGRFbnRpdHkgKGVudGl0eSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdhZGRlZCBlbnRpdHknKTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5sb2FkaW5nTGV2ZWwgfHwgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICBlbnRpdHkubGV2ZWwgPSB0aGlzLmdhbWVib2FyZC5sZXZlbE51bTtcbiAgICAgICAgICAgIGVudGl0eS5zZWN0aW9uID0gdGhpcy5nYW1lYm9hcmQubGV2ZWwuc2VjdGlvbk51bTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICB9XG5cbiAgICBhZGRCYWNrZ3JvdW5kTGF5ZXIgKGxheWVyKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZExheWVycy5wdXNoKGxheWVyKTtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgRHJhd3MgYWxsIGVudGl0aWVzIGluIHRoZSBsaXN0XG4gICAgKi9cblxuICAgIGRyYXcgKGRyYXdDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmFja2dyb3VuZExheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy9EcmF3IHRoZSBjYW1lcmEgYW5kIGh1ZCBmaXJzdFxuXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnNbaV0uZHJhdyh0aGlzLmN0eCk7XG5cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vLy9EcmF3IG9ubHkgdGVycmFpbiB0aGF0IGlzIHdpdGhpbiB0aGUgY2FudmFzIHZpZXcgKG51bWJlcnMgYXJlIG5lZ2F0aXZlIGJlY2F1c2UgdGhlIGNhbWVyYSBpcyB3ZWlyZCBsaWtlIHRoYXQuXG4gICAgICAgICAgICAvLy8vcG9zdGl2ZSBudW1iZXJzIHdvdWxkIHNjcmV3IHRoZSB0cmFuc2xhdGUgcHJvY2VzcylcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLnR5cGUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAgICAgaWYoKC10aGlzLmVudGl0aWVzW2ldLnggLSB0aGlzLmVudGl0aWVzW2ldLmJvdW5kV2lkdGggPCB0aGlzLmVudGl0aWVzWzBdLnhWaWV3IFxuICAgICAgICAgICAgICAgICYmIC10aGlzLmVudGl0aWVzW2ldLnggPiB0aGlzLmVudGl0aWVzWzBdLnhWaWV3IC0gdGhpcy5jdHguY2FudmFzLndpZHRoIFxuICAgICAgICAgICAgICAgICYmIC10aGlzLmVudGl0aWVzW2ldLnkgLSB0aGlzLmVudGl0aWVzW2ldLmJvdW5kSGVpZ2h0PCB0aGlzLmVudGl0aWVzWzBdLnlWaWV3IFxuICAgICAgICAgICAgICAgICYmIC10aGlzLmVudGl0aWVzW2ldLnkgPiB0aGlzLmVudGl0aWVzWzBdLnlWaWV3IC0gdGhpcy5jdHguY2FudmFzLmhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzW2ldLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhdXNlZCB8fCB0aGlzLmVudGl0aWVzW2ldLm5hbWUgPT09IFwiQ2FtZXJhXCIpIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzW2ldLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNXB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjZTVlNWU1XCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiVW5pdmVyc2FsIENvbnRyb2xzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgNDBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJSdW4gbGVmdDogU1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUnVuIHJpZ2h0OiBEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDEyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiRW5lcmdpemU6IFdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMTYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJKdW1wOiBTcGFjZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAyMDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIk5vcm1hbCBEaWZmaWN1bHR5IChkZWZhdWx0KTogWVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDI0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiVG91Z2ggRGlmZmljdWx0eSAobm90IGRlZmF1bHQpOiBUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMjgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJHb2QgTW9kZSBUb2dnbGUgKGZvciBjaGVhdGVycyk6IEdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAzMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkFiaWxpdGllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUG93ZXIgU2hvdDogRW5lcmdpemUgKyBTaG9vdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU3dvcmQgQmxhc3Q6IEVuZXJnaXplICsgU2xhc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMTIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJSZWZsZWN0OiBFbmVyZ2l6ZSArIENsZWF2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAxNjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkxheW91dCBBIChOdW1wYWQgOSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAyMDBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJTaG9vdDogTnVtcGFkIDRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMjQwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJEYXNoOiBOdW1wYWQgMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAyODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlNsYXNoOiBOdW1wYWQgNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAzMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNsZWF2ZTogTnVtcGFkIDZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMzYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJMYXlvdXQgQiAoUClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMjAwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU2hvb3Q6IEpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDU3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMjQwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJEYXNoOiBNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDI4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU2xhc2g6IEtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDU3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMzIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDbGVhdmU6IExcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDU3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMzYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDdXJyZW50IERpZmZpY3VsdHkgaXMgXCIgKyB0aGlzLmRpZmZpY3VsdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjIwcHggVmVyZGFuYVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIih0aGlzIGNhbiBiZSBjaGFuZ2VkIGF0IGFueSB0aW1lLCBpbmNsdWRpbmcgd2hpbGUgcGF1c2VkKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCJJdGFsaWMgNDBweCBUaW1lcyBOZXcgUm9tYW5cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJUaGUgZm9yY2VzIG9mIGV2aWwgYXJlIHN0aWxsIGZpbmlzaGluZyBhcnJhbmdlbWVudHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIHRoaXMucGF1c2VGbGF2b3JYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclkgKyA4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwib24gdGhlIGV4cGFuc2lvbiBvZiB0aGVpciBkdW5nZW9ucyBhbmQgdGhyb25lIHJvb21zLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWSArIDEyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUHJlcGFyZSBmb3IgdGhlIGluZXZpdGFibGUgc2hvd2Rvd24gd2l0aCB0aGlzIHZpbGxpYW5vdXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIHRoaXMucGF1c2VGbGF2b3JYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclkgKyAxNjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInNjdW0gYnkgdHJ5aW5nIHRvIGdldCBhcyBoaWdoIGEgc2NvcmUgYXMgcG9zc2libGUuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VGbGF2b3JZICsgMjAwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgaWYgKGRyYXdDYWxsYmFjaykge1xuICAgICAgICAgICAgZHJhd0NhbGxiYWNrKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIFVwZGF0ZXMgYWxsIGVudGl0aWVzLCBjYWxscyB0aGVpciB1cGRhdGUgbWV0aG9kc1xuICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICBsZXQgZW50aXRpZXNDb3VudCA9IHRoaXMuZW50aXRpZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRpdGllc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkubGV2ZWwgPT09IHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtICYmIGVudGl0eS5zZWN0aW9uID09PSB0aGlzLmdhbWVib2FyZC5zZWN0aW9uTnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmFsdWVzIC0gbGV2ZWw6IFwiICsgdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW0gKyBcIiwgc2VjdGlvbjogXCIgKyB0aGlzLmdhbWVib2FyZC5zZWN0aW9uTnVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbnRpdHkgLSBsZXZlbDogXCIgKyBlbnRpdHkubGV2ZWwgKyBcIiwgc2VjdGlvbjogXCIgKyBlbnRpdHkuc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5wb2ludFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdhbWVib2FyZC5zdGF0ZXMubmV3TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eS5sZXZlbCA9PT0gdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW0gfHwgZW50aXR5Lm5hbWUgPT09IFwiVGVycmFpblwiIHx8IGVudGl0eS5uYW1lID09PSBcIkhlcm9cIiB8fCBlbnRpdHkubmFtZSA9PT0gXCJIVURcIiB8fCBlbnRpdHkubmFtZSA9PT0gXCJQb3J0YWxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInZhbHVlcyAtIGxldmVsOiBcIiArIHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtICsgXCIsIHNlY3Rpb246IFwiICsgdGhpcy5nYW1lYm9hcmQuc2VjdGlvbk51bSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW50aXR5IC0gbGV2ZWw6IFwiICsgZW50aXR5LmxldmVsICsgXCIsIHNlY3Rpb246IFwiICsgZW50aXR5LnNlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucG9pbnRWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlbnRpdHkucmVtb3ZlRnJvbVdvcmxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLm5ld0xldmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLm5ld0xldmVsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLmxvYWROZXh0TGV2ZWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1RPRE8gTW92ZSBpbnRvIGZpcnN0IHVwZGF0ZSgpIGZvciBsb29wP1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuZW50aXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS5yZW1vdmVGcm9tV29ybGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0uaGFzT3duUHJvcGVydHkoXCJwb2ludFZhbHVlXCIpICYmICF0aGlzLmdhbWVib2FyZC5zdGF0ZXMucmVzcGF3blNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLnBvaW50VmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPIFJlZmFjdG9yIGhlcm8gbXVsdGlwbGllciBhbmQgZGlmZmljdWx0eSB0byBnYW1lYm9hcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnNob3dQb2ludFZhbHVlcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnNob3dQb2ludFZhbHVlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5nYW1lYm9hcmQucHZ0ID0gdGhpcy5nYW1lYm9hcmQucHZ0dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZGVkcG9pbnRzID0gdGhpcy5oZXJvLmRpZmZpY3VsdHkgKiB0aGlzLmVudGl0aWVzW2ldLnBvaW50VmFsdWUgKiB0aGlzLmhlcm8ubXVsdGlwbGllcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5kZWFkRW5lbWllcy5wdXNoKFtbdGhpcy5lbnRpdGllc1tpXS54LCB0aGlzLmVudGl0aWVzW2ldLnldLCB0aGlzLmFkZGVkcG9pbnRzLCAzMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnNjb3JlICs9IHRoaXMuYWRkZWRwb2ludHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvLm11bHRpcGxpZXIgKz0gdGhpcy5oZXJvLmRpZmZpY3VsdHkgKiAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLmVudGl0aWVzW2ldO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3RoZXIgPSB0aGlzLmVudGl0aWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHByZXZlbnRzIGVhY2ggcGllY2Ugb2YgdGVycmFpbiBmcm9tIGNoZWNraW5nIGNvbGxpc2lvbiwgY2F1c2luZyBzbG93ZG93blxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5LnR5cGUgPT09IFwiVGVycmFpblwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3RoZXIudHlwZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gTWF0aC5hYnMoZW50aXR5LnggLSBvdGhlci54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eSAhPSBvdGhlciAmJiBlbnRpdHkuaXNDb2xsaWRpbmcob3RoZXIpICE9ICdub25lJykgeyAvLy8gRC5wcm90b3R5cGUgPSBuZXcgQygpLCBsaW5rcyBDIHRvIHByb3RvdHlwZSBsaW5rYWdlIG9mIEQgT1IgcHV0IHByb3BlcnR5IFwic29tZXRoaW5nX3R5cGVcIiBvciB3aGF0ZXZlciBhbmQgY2hlY2sgZm9yIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGVudGl0eS5pc0NvbGxpZGluZyhvdGhlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5jb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbnRpdHkgIT0gb3RoZXIgJiYgZW50aXR5LmlzQ29sbGlkaW5nKG90aGVyKSAhPSAnbm9uZScpIHsgLy8vIEQucHJvdG90eXBlID0gbmV3IEMoKSwgbGlua3MgQyB0byBwcm90b3R5cGUgbGlua2FnZSBvZiBEIE9SIHB1dCBwcm9wZXJ0eSBcInNvbWV0aGluZ190eXBlXCIgb3Igd2hhdGV2ZXIgYW5kIGNoZWNrIGZvciB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gZW50aXR5LmlzQ29sbGlkaW5nKG90aGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5jb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtdXNpY1xuICAgICAgICBpZiAodGhpcy5tdXNpYy5jdXJyZW50VGltZSA+PSA2My45NSkge1xuICAgICAgICAgICAgdGhpcy5tdXNpYy5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLm11c2ljLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vUExBWUVSIFNFVFRJTkdTXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuZWFzeW1vZGVdLmFjdGl2ZSkge1xuICAgICAgICAgICAgLy9UT0RPIE1vdmUgZGlmZmljdWx0eSB0byBnYW1lYm9hcmRcbiAgICAgICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IFwiTm9ybWFsIChCdXQgS2luZGEgRWFzeSlcIjtcbiAgICAgICAgICAgIHRoaXMuaGVyby5kaWZmaWN1bHR5ID0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnNjb3JlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmhhcmRtb2RlXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IFwiVG91Z2hcIjtcbiAgICAgICAgICAgIHRoaXMuaGVyby5kaWZmaWN1bHR5ID0gMztcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnNjb3JlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmxheW91dEFdLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IHRoaXMuY29udHJvbExheW91dEE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5sYXlvdXRCXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xMYXlvdXRCO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMucGF1c2VdLmFjdGl2ZSAmJiB0aGlzLnBhdXNlVG9nZ2xlQ29vbGRvd24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gIXRoaXMucGF1c2VkO1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duID0gdGhpcy50b2dnbGVDb29sZG93bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duLS07XG4gICAgICAgIH1cbiAgICAgICAgLy9ERVYgVE9PTFNcbiAgICAgICAgaWYgKHRoaXMuZGV2TW9kZSAmJiAhdGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuZ2V0UG9zXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIng6IFwiICsgdGhpcy5oZXJvLnggKyBcIiwgeTogXCIgKyB0aGlzLmhlcm8ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnNldFBvc10uYWN0aXZlICYmIHRoaXMuc2V0UG9zVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zZXRQb3ModGhpcy5nYW1lYm9hcmQubGV2ZWwuY2hlY2twb2ludHNbdGhpcy5jaGVja3BvaW50Q3ljbGVDb3VudF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zVGltZXIgPSB0aGlzLnRvZ2dsZUNvb2xkb3duO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2twb2ludEN5Y2xlQ291bnQgPSAodGhpcy5jaGVja3BvaW50Q3ljbGVDb3VudCArIDEpICUgdGhpcy5nYW1lYm9hcmQubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5nb2RUb2dnbGVdLmFjdGl2ZSAmJiB0aGlzLmdvZFRvZ2dsZVRpbWVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc3RhdGVzLmlzR29kID0gIXRoaXMuaGVyby5zdGF0ZXMuaXNHb2Q7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lciA9IHRoaXMudG9nZ2xlQ29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnRlc3RQb3NdLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zZXRQb3ModGhpcy5nYW1lYm9hcmQudGVzdFBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnRvZ2dsZUJveGVzXS5hY3RpdmUgJiYgdGhpcy5ib3hUb2dnbGVUaW1lciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Qm94ZXMgPSAhdGhpcy5kcmF3Qm94ZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3hUb2dnbGVUaW1lciA9IHRoaXMudG9nZ2xlQ29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1RvZ2dsZSB0aW1lcnMgKHNob3VsZCBmaW5hbGx5IGxlYXJuIGhvdyB0byB1c2UgYW4gXCJvbiBrZXl1cFwiIGZvciBrZXlzKVxuICAgICAgICAgICAgaWYgKHRoaXMuYm94VG9nZ2xlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3hUb2dnbGVUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0UG9zVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ29kVG9nZ2xlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhY2tncm91bmQoZHJhd0NhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmN0eC5jYW52YXMud2lkdGgsIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL0RyYXcgdGhlIGNhbWVyYSBhbmQgaHVkIGZpcnN0XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnNbaV0uZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRyYXdDYWxsYmFjaykge1xuICAgICAgICAgICAgZHJhd0NhbGxiYWNrKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIERlZmluZXMgdGhlIGdhbWUgbG9vcFxuICAgICovXG4gICAgbG9vcCAoKSB7XG4gICAgICAgIHRoaXMuY3R4LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMuY3R4LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgdGhpcy5jbGljayA9IG51bGw7XG4gICAgICAgIHRoaXMud2hlZWwgPSBudWxsO1xuICAgIH1cblxufSAvLyBlbmQgb2YgR2FtZUVuZ2luZVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lRW5naW5lO1xuIiwiaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi9hc3NldC1tYW5hZ2VyXCJcblxuXG5jbGFzcyBIdWQge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuaW1nID0gaW1nO1xuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5oZWFsdGhiYXIgPSBuZXcgSGVhbHRoQmFyKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSk7XG4gICAgICAgIHRoaXMuZW5lcmd5YmFyID0gbmV3IEVuZXJneUJhcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpO1xuICAgICAgICB0aGlzLnNjb3JlYm9hcmQgPSBuZXcgU2NvcmVCb2FyZChnYW1lX2VuZ2luZSwgZGVzdF9jb29yZGluYXRlcywgc2NhbGUsIGNhbWVyYSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFt0aGlzLmhlYWx0aGJhciwgdGhpcy5lbmVyZ3liYXIsIHRoaXMuc2NvcmVib2FyZF07XG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wMSA9IDA7XG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wMiA9IDE7XG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wMyA9IDI7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tpXS5kcmF3KGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNDb2xsaWRpbmcoKSB7fVxuICAgIGNvbGxpZGVkKCkge31cblxufVxuXG5cbmNsYXNzIFNjb3JlQm9hcmQge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLnNjb3JlID0gZ2FtZV9lbmdpbmUuZ2FtZWJvYXJkLnNjb3JlO1xuICAgICAgICB0aGlzLmdhbWVfZW5naW5lID0gZ2FtZV9lbmdpbmU7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBkZXN0X2Nvb3JkaW5hdGVzO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5nYW1lX2VuZ2luZS5nYW1lYm9hcmQuc2NvcmUpO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gWy10aGlzLmNhbWVyYS54VmlldyArIDIwMCwgLXRoaXMuY2FtZXJhLnlWaWV3ICsgMTAwXVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5mb250ID0gXCJpdGFsaWMgYm9sZCAyNXB4IFZlcmRhbmFcIiA7XG4gICAgICAgIHZhciBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCh0aGlzLmRlc3RfY29vcmRzWzBdIC0gMTAwLCB0aGlzLmRlc3RfY29vcmRzWzFdIC0gMTAsIHRoaXMuZGVzdF9jb29yZHNbMF0sIHRoaXMuZGVzdF9jb29yZHNbMV0gLSAxMCk7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLFwibWFnZW50YVwiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKC41ICxcImJsdWVcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxICxcImdyZWVuXCIpO1xuICAgICAgICAvLyBGaWxsIHdpdGggZ3JhZGllbnRcbiAgICAgICAgY3R4LmZpbGxTdHlsZT1ncmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiU2NvcmU6IFwiICsgdGhpcy5zY29yZSxcbiAgICAgICAgICAgIHRoaXMuZGVzdF9jb29yZHNbMF0gLSAxMDAsIFxuICAgICAgICAgICAgdGhpcy5kZXN0X2Nvb3Jkc1sxXSAtIDEwXG4gICAgICAgICk7XG4gICAgICAgIC8vaWYgKHRoaXMuZ2FtZV9lbmdpbmUuZ2FtZWJvYXJkLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMpIHtcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJkcmF3XCIpXG4gICAgICAgIC8vICAgIGN0eC5mb250ID0gXCIyMHB4IFZlcmRhbmFcIjtcbiAgICAgICAgLy8gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwZmYwMFwiO1xuICAgICAgICAvLyAgICBjdHguZmlsbFRleHQoXCIrXCIgKyB0aGlzLmdhbWVfZW5naW5lLmFkZGVkcG9pbnRzICsgXCIgcG9pbnRzXCIsXG4gICAgICAgIC8vICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmhlcm8ueCArIDEwLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5oZXJvLnkgLSAxNTBcbiAgICAgICAgLy8gICAgKTtcbiAgICAgICAgLy99XG4gICAgfVxufVxuXG5cbi8qXG4gICAgUmVzb3VyY2VCYXIgc3VwZXJjbGFzc1xuKi9cbmNsYXNzIFJlc291cmNlQmFyIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMpIHtcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZSA9IGdhbWVfZW5naW5lO1xuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5zcmNfY29vcmRzID0gc3JjX2Nvb3JkaW5hdGVzO1xuICAgICAgICB0aGlzLnNyY19kaW1zID0gc3JjX2RpbWVuc2lvbnM7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBkZXN0X2Nvb3JkaW5hdGVzO1xuICAgICAgICAvLyB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgbGFzdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXJ0ID0gdGhpcy5wYXJ0c1tpXVxuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5ID0gbGFzdHkgKyBwYXJ0W1wic3JjX2hlaWdodFwiXTsgLy8gdGhpcyBjYXVzZXMgZWFjaCBzZWdtZW50IHRvIGJlIGRyYXduIHZlcnRpY2FsbHkgb24gdG9wIG9mIHRoZSBsYXN0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBzcmNfY29vcmRzLCBzcmNfZGltcywgZGVzdF94X29mZnNldD0wLCBkZXN0X3lfb2Zmc2V0PTApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgXCJpbWdcIjogaW1nLFxuICAgICAgICAgICAgICAgIFwic3JjX3hcIjogc3JjX2Nvb3Jkc1swXSxcbiAgICAgICAgICAgICAgICBcInNyY195XCI6IHNyY19jb29yZHNbMV0sXG4gICAgICAgICAgICAgICAgXCJzcmNfd2lkdGhcIjogc3JjX2RpbXNbMF0sXG4gICAgICAgICAgICAgICAgXCJzcmNfaGVpZ2h0XCI6IHNyY19kaW1zWzFdLFxuICAgICAgICAgICAgICAgIFwiZGVzdF94X29mZnNldFwiOiBkZXN0X3hfb2Zmc2V0LFxuICAgICAgICAgICAgICAgIFwiZGVzdF95X29mZnNldFwiOiBkZXN0X3lfb2Zmc2V0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgLy8gdGhpcy5kZXN0X3ggPSBkZXN0X2Nvb3Jkc1swXVxuICAgICAgICAgICAvLyB0aGlzLmRlc3RfeSA9IGRlc3RfY29vcmRzWzFdXG4gICAgICAgICAgIC8vIHRoaXMuZGVzdF93aWR0aCA9IGRlc3RfZGltZW5zaW9uc1swXVxuICAgICAgICAgICAvLyB0aGlzLmRlc3RfaGVpZ2h0ID0gZGVzdF9kaW1lbnNpb25zWzFdXG4gICAgfVxufVxuXG5cbi8qXG4gICAgUHJvdmlkZXMgYSBoZWFsdGggYmFyIGZvciB0aGUgSGVyby5cbiAgICBDb25zdHJ1Y3RlZCBvZiByZXNvdXJjZUJhclNlZ21lbnRzLCBkZWZpbmVkIGluIFJlc291cmNlQmFyLlxuICAgIEhlYWx0aCBncm93cyB1cHdhcmQuXG4qL1xuY2xhc3MgSGVhbHRoQmFyIGV4dGVuZHMgUmVzb3VyY2VCYXIge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKSB7XG4gICAgICAgIHN1cGVyKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMpO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlcm8uaGVhbHRoOyAvLyBoYXMgcm9vbSBmb3IgNiB0aWNrc1xuICAgICAgICB0aGlzLndpZHRoID0gMTQ7IC8vIHRoZSBwaXhlbCBhcnQgd2lkdGhcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cbiAgICAgICAgLy8gYmFyIHNlZ21lbnRzXG4gICAgICAgIHRoaXMudG9wID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19kaW1lbnNpb25zWzFdICsgMF0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgM10pO1xuICAgICAgICB0aGlzLm1pZGRsZTEgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsIFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUyID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUzID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU0ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU1ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5ib3R0b20gPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsIFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTldLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE4XSk7XG4gICAgICAgIHRoaXMudGljayA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZywgXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdICsgMywgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTZdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgtNywgM10sXG4gICAgICAgICAgICA5LCAxMSk7XG4gICAgICAgIHRoaXMucGFydHMgPSBbdGhpcy50b3AsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlkZGxlMSwgdGhpcy5taWRkbGUyLCB0aGlzLm1pZGRsZTMsIHRoaXMubWlkZGxlNCwgdGhpcy5taWRkbGU1LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbV1cblxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGxldCBsYXN0eSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhcnQgPSB0aGlzLnBhcnRzW2ldXG4gICAgICAgICAgICB0aGlzLmRyYXdQYXJ0KGN0eCwgcGFydCwgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgPSBsYXN0eSArIHBhcnRbXCJzcmNfaGVpZ2h0XCJdOyAvLyB0aGlzIGNhdXNlcyBlYWNoIHNlZ21lbnQgdG8gYmUgZHJhd24gdmVydGljYWxseSBvbiB0b3Agb2YgdGhlIGxhc3RcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3R5IC09IHRoaXMuYm90dG9tW1wic3JjX2hlaWdodFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuaGVhbHRoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdQYXJ0KGN0eCwgdGhpcy50aWNrLCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSAtPSAyIC8vIHRoaXMgY2F1c2VzIGhlYWx0aCB0byBncm93IHVwd2FyZCBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdQYXJ0KGN0eCwgcGFydCwgbGFzdHkpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZyxcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfeFwiXSwgcGFydFtcInNyY195XCJdLCAvLyBzcmMgeCwgeVxuICAgICAgICAgICAgcGFydFtcInNyY193aWR0aFwiXSwgcGFydFtcInNyY19oZWlnaHRcIl0sIC8vIHNyYyB3aWR0aCwgaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmRlc3RfY29vcmRzWzBdICsgcGFydFtcImRlc3RfeF9vZmZzZXRcIl0sIHRoaXMuZGVzdF9jb29yZHNbMV0gKyAobGFzdHkgKiB0aGlzLnNjYWxlKSAtIHBhcnRbXCJkZXN0X3lfb2Zmc2V0XCJdLCAvLyBkZXN0IHgsIHlcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfd2lkdGhcIl0gKiB0aGlzLnNjYWxlLCBwYXJ0W1wic3JjX2hlaWdodFwiXSAqIHRoaXMuc2NhbGUsIC8vIGRlc3Qgd2lkdGgsIGhlaWdodFxuICAgICAgICApIFxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLmhlcm8uaGVhbHRoO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gWy10aGlzLmNhbWVyYS54VmlldyArIDEwMCwgLXRoaXMuY2FtZXJhLnlWaWV3ICsgMTAwXVxuICAgIH1cbiAgICBpc0NvbGxpZGluZygpIHt9XG4gICAgY29sbGlkZWQoKSB7fVxuXG59XG5cblxuLypcbiAgICBQcm92aWRlcyBhbiBlbmVyZ3kgYmFyIGZvciB0aGUgSGVyby5cbiAgICBDb25zdHJ1Y3RlZCBvZiByZXNvdXJjZUJhclNlZ21lbnRzLCBkZWZpbmVkIGluIFJlc291cmNlQmFyLlxuICAgIEVuZXJneSBncm93cyB1cHdhcmQuXG4qL1xuY2xhc3MgRW5lcmd5QmFyIGV4dGVuZHMgUmVzb3VyY2VCYXIge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKSB7XG4gICAgICAgIHN1cGVyKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMpO1xuICAgICAgICB0aGlzLmVuZXJneSA9IGhlcm8uZW5lcmd5OyAvLyBoYXMgcm9vbSBmb3IgNiB0aWNrc1xuICAgICAgICB0aGlzLndpZHRoID0gMTQ7IC8vIHRoZSBwaXhlbCBhcnQgd2lkdGhcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHNyY19jb29yZGluYXRlcyA9IFtzcmNfY29vcmRpbmF0ZXNbMF0gKyAxNSwgc3JjX2Nvb3JkaW5hdGVzWzFdXVxuXG4gICAgICAgIC8vIGJhciBzZWdtZW50c1xuICAgICAgICB0aGlzLnRvcCA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19kaW1lbnNpb25zWzFdICsgMF0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgM10pO1xuICAgICAgICB0aGlzLm1pZGRsZTEgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTIgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTMgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTQgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTUgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuXG4gICAgICAgIHRoaXMuYm90dG9tID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTldLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE4XSk7XG4gICAgICAgIHRoaXMudGljayA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0gKyAzLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAxNl0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCAtIDcsIDNdLFxuICAgICAgICAgICAgOSwgMTEpO1xuICAgICAgICB0aGlzLnBhcnRzID0gW3RoaXMudG9wLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZGRsZTEsIHRoaXMubWlkZGxlMiwgdGhpcy5taWRkbGUzLCB0aGlzLm1pZGRsZTQsIHRoaXMubWlkZGxlNSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3R0b21dXG5cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgbGFzdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXJ0ID0gdGhpcy5wYXJ0c1tpXVxuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5ID0gbGFzdHkgKyBwYXJ0W1wic3JjX2hlaWdodFwiXTsgLy8gdGhpcyBjYXVzZXMgZWFjaCBzZWdtZW50IHRvIGJlIGRyYXduIHZlcnRpY2FsbHkgb24gdG9wIG9mIHRoZSBsYXN0XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0eSAtPSB0aGlzLmJvdHRvbVtcInNyY19oZWlnaHRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmVuZXJneTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHRoaXMudGljaywgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgLT0gMiAvLyB0aGlzIGNhdXNlcyBlbmVyZ3kgdG8gZ3JvdyB1cHdhcmQgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsXG4gICAgICAgICAgICBwYXJ0W1wic3JjX3hcIl0sIHBhcnRbXCJzcmNfeVwiXSwgLy8gc3JjIHgsIHlcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfd2lkdGhcIl0sIHBhcnRbXCJzcmNfaGVpZ2h0XCJdLCAvLyBzcmMgd2lkdGgsIGhlaWdodFxuICAgICAgICAgICAgdGhpcy5kZXN0X2Nvb3Jkc1swXSArIHBhcnRbXCJkZXN0X3hfb2Zmc2V0XCJdLCB0aGlzLmRlc3RfY29vcmRzWzFdICsgKGxhc3R5ICogdGhpcy5zY2FsZSkgLSBwYXJ0W1wiZGVzdF95X29mZnNldFwiXSwgLy8gZGVzdCB4LCB5XG4gICAgICAgICAgICBwYXJ0W1wic3JjX3dpZHRoXCJdICogdGhpcy5zY2FsZSwgcGFydFtcInNyY19oZWlnaHRcIl0gKiB0aGlzLnNjYWxlLCAvLyBkZXN0IHdpZHRoLCBoZWlnaHRcbiAgICAgICAgKSBcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuZW5lcmd5ID0gdGhpcy5oZXJvLmVuZXJneTtcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IFstdGhpcy5jYW1lcmEueFZpZXcgKyAxNTAsIC10aGlzLmNhbWVyYS55VmlldyArIDEwMF1cbiAgICB9XG4gICAgaXNDb2xsaWRpbmcoKSB7fVxuICAgIGNvbGxpZGVkKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHVkOyIsImV4cG9ydCB7ZGVmYXVsdCBhcyBBbmltYXRpb259IGZyb20gXCIuL2FuaW1hdGlvblwiXG5leHBvcnQge2RlZmF1bHQgYXMgQXNzZXRNYW5hZ2VyfSBmcm9tIFwiLi9hc3NldC1tYW5hZ2VyXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBCYWNrZ3JvdW5kfSBmcm9tIFwiLi9iYWNrZ3JvdW5kXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBHYW1lRW5naW5lfSBmcm9tIFwiLi9nYW1lLWVuZ2luZVwiXG5leHBvcnQge2RlZmF1bHQgYXMgSHVkfSBmcm9tIFwiLi9odWRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFNvdW5kfSBmcm9tIFwiLi9zb3VuZFwiIiwiY2xhc3MgU291bmQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc291bmRzID0ge1xuICAgICAgICAgICAgXCJoZXJvX2h1cnRcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9kc29vZi53YXZcIiksXG4gICAgICAgICAgICBcImhlcm9fc2hvb3RcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9oZXJvLXNob290LndhdlwiKSxcbiAgICAgICAgICAgIFwiZW5lbXlfc2hvb3RcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9zaG9vdC0xLndhdlwiKSxcbiAgICAgICAgICAgIFwiYXJyb3dfZmlyZVwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL0Fycm93LUZpcmUud2F2XCIpLFxuICAgICAgICAgICAgXCJjcm93X2Nhd1wiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2Nyb3ctY2F3LndhdlwiKSxcbiAgICAgICAgICAgIFwiZW5lbXlfaHVydF8xXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZW5lbXktaHVydC0xLndhdlwiKSxcbiAgICAgICAgICAgIFwiZW5lcmd5X2xhdW5jaGVyXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZW5lcmd5LWxhdW5jaGVyLndhdlwiKSxcbiAgICAgICAgICAgIFwiZXhwbG9zaW9uXzFcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9leHBsb3Npb24tMS53YXZcIiksXG4gICAgICAgICAgICBcImxhdmFfYmFsbFwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2xhdmEtYmFsbC53YXZcIiksXG4gICAgICAgICAgICBcInNoaWVsZF9ibG9ja1wiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL3NoaWVsZC1ibG9jay53YXZcIiksXG4gICAgICAgICAgICBcInN3b3JkX3N3aW5nXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vc3dvcmQtc3dpbmcud2F2XCIpLFxuICAgICAgICAgICAgXCJvdXRfb2ZfZW5lcmd5XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vb29lLndhdlwiKSxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuX2R1cHMgPSA1XG4gICAgICAgIGZvciAodmFyIHNvdW5kIGluIHRoaXMuc291bmRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3VuZHMuaGFzT3duUHJvcGVydHkoc291bmQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdID0ge1xuICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRcIjogMCxcbiAgICAgICAgICAgICAgICAgICAgXCJtYXhcIjogbl9kdXBzLFxuICAgICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOiB0aGlzLm1ha2VfZHVwbGljYXRlcyhzb3VuZCwgbl9kdXBzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyogUmV0dXJucyBhIGxpc3Qgb2Ygbl9kdXAgZHVwbGljYXRlZCBBdWRpbyBvYmplY3RzICovXG4gICAgbWFrZV9kdXBsaWNhdGVzKHNvdW5kLCBuX2R1cD01KSB7XG4gICAgICAgIGxldCBjdXJyX3NvdW5kID0gdGhpcy5zb3VuZHNbc291bmRdXG4gICAgICAgIGxldCBzb3VuZF9saXN0ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbl9kdXA7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNsb25lID0gY3Vycl9zb3VuZC5jbG9uZU5vZGUoKVxuICAgICAgICAgICAgc291bmRfbGlzdC5wdXNoKGNsb25lKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3VuZF9saXN0XG4gICAgfVxuXG5cbiAgICAvKiBwbGF5cyBhIHNvdW5kICovXG4gICAgcGxheShzb3VuZCwgdm9sdW1lPTAuNSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNvdW5kc1tzb3VuZF1bXCJjdXJyZW50XCJdXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLnNvdW5kc1tzb3VuZF1bXCJtYXhcIl0tMSkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wiY3VycmVudFwiXSA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleF0uZW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleCsxXS5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleCsxXS52b2x1bWUgPSB2b2x1bWVcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleCsxXS5wbGF5KClcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcImN1cnJlbnRcIl0gKz0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4XS5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleF0udm9sdW1lID0gdm9sdW1lXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXhdLnBsYXkoKVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb3VuZDsiLCJpbXBvcnQge0VudGl0eX0gZnJvbSBcIi4uL2VudGl0aWVzXCJcbmltcG9ydCB7QW5pbWF0aW9ufSBmcm9tIFwiLi4vZW5naW5lXCJcblxuXG4vKioqKioqKioqKipcbjItRCBzaWRlLXNjcm9sbGluZyBDYW1lcmEgY2xhc3NcblxueFZpZXcsIHlWaWV3IC0gcG9zaXRpb24gb2YgY2FtZXJhICh0b3AgbGVmdClcbmNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQgLSBjYW1lcmEgZGltZW5zaW9uc1xud29ybGRXaWR0aCwgd29ybGRIZWlnaHQgLSBkaW1lbnNpb25zIHRoYXQgcmVwcmVzZW50IHRoZSB3b3JsZCdzIGJvdW5kYXJ5XG5cbioqKioqKioqKioqL1xuY2xhc3MgQ2FtZXJhIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4VmlldywgeVZpZXc9MCwgaW1nPW51bGwsIGN0eD1udWxsLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCB3b3JsZFdpZHRoLCB3b3JsZEhlaWdodCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4VmlldywgeVZpZXcsIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IGNhbnZhc1dpZHRoOyAvL3RoaXMgaXMgdGhlIHZpZXdwb3J0LCBOT1QgdGhlIHNhbWUgYXMgY2FudmFzIGluIGNvcmUuanNcbiAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBjYW52YXNIZWlnaHQ7IC8vdGhpcyBpcyB0aGUgdmlld3BvcnQsIE5PVCB0aGUgc2FtZSBhcyBjYW52YXMgaW4gY29yZS5qc1xuICAgICAgICB0aGlzLndvcmxkV2lkdGggPSB3b3JsZFdpZHRoO1xuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XG4gICAgICAgIHRoaXMuYWJzT2ZmWCA9IDI7XG4gICAgICAgIHRoaXMuYWJzT2ZmWSA9IDEuNTtcbiAgICAgICAgdGhpcy5vZmZYID0gdGhpcy5jYW52YXNXaWR0aC90aGlzLmFic09mZlg7XG4gICAgICAgIHRoaXMub2ZmWSA9IHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZICsgMTAwO1xuICAgICAgICB0aGlzLmNhbVNwZWVkWCA9IDg7XG4gICAgICAgIHRoaXMuY2FtU3BlZWRZID0gODtcblxuXG4gICAgICAgIC8vIHBvc3NpYmxlIGF4aXMgdGhlIGNhbWVyYSBjYW4gbW92ZSBpbi4gbm90IGltcGxlbWVudGVkIHlldFxuICAgICAgICB0aGlzLmF4aXMgPSB7XG4gICAgICAgICAgICBcIm5vbmVcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhvcml6b250YWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcInZlcnRpY2FsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJib3RoXCI6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9iamVjdCB0byBiZSBmb2xsb3dlZCAodGhlIEhlcm8pXG4gICAgICAgIHRoaXMuZm9sbG93ZWQgPSBudWxsO1xuICAgIH1cblxuICAgIGZvbGxvdyAob2JqKSB7XG4gICAgICAgIHRoaXMuZm9sbG93ZWQgPSBvYmo7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgLy8gIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7IC8vcmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuICAgICAgICAvLyAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7IC8vIGNsZWFyIHZpZXdwb3J0IGFmdGVyIG1hdHJpeCBpcyByZXNldFxuICAgICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy54VmlldywgdGhpcy55Vmlldyk7XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIGxvZ2ljIGZlZWxzIEhPUlJJQkxZIHdyb25nLCBidXQgaXQgd29ya3MgZm9yIG5vdywgc28geWF5P1xuICAgICAgICBpZiAodGhpcy5mb2xsb3dlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJvdW5kcygpO1xuICAgICAgICAgICAgLy9UT0RPOiBuZWVkIHRvIGZpZ3VyZSBvdXQgd29ybGQgYm91bmRzIGZvciBtaW4gYW5kIG1heCBjbGFtcGluZ1xuICAgICAgICAgICAgdGhpcy54VmlldyA9IC10aGlzLmZvbGxvd2VkLnggKyB0aGlzLm9mZlg7XG4gICAgICAgICAgICB0aGlzLnlWaWV3ID0gLXRoaXMuZm9sbG93ZWQueSArIHRoaXMub2ZmWTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJ4VmlldzogXCIgKyB0aGlzLnhWaWV3KTtcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJ5VmlldzogXCIgKyB0aGlzLnlWaWV3KTtcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJoZXJvIHg6IFwiICsgdGhpcy5mb2xsb3dlZC54KTtcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJoZXJvIHk6IFwiICsgdGhpcy5mb2xsb3dlZC55KTtcblxuICAgIH1cblxuICAgIHVwZGF0ZUJvdW5kcygpIHtcbiAgICAgICAgaWYgKCEodGhpcy5vZmZYID09PSB0aGlzLmNhbnZhc1dpZHRoIC8gdGhpcy5hYnNPZmZYKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub2ZmWCArIDEwIDwgTWF0aC5mbG9vcih0aGlzLmNhbnZhc1dpZHRoIC8gdGhpcy5hYnNPZmZYKSkgeyB0aGlzLm9mZlggKz0gdGhpcy5jYW1TcGVlZFg7IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub2ZmWCAtIDEwID4gTWF0aC5mbG9vcih0aGlzLmNhbnZhc1dpZHRoIC8gdGhpcy5hYnNPZmZYKSkgeyB0aGlzLm9mZlggLT0gdGhpcy5jYW1TcGVlZFg7IH1cbiAgICAgICAgICAgIGVsc2UgKHRoaXMub2ZmWCA9IHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKHRoaXMub2ZmWSA9PT0gdGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZZICsgMTAgPCBNYXRoLmZsb29yKHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZKSkgeyB0aGlzLm9mZlkgKz0gdGhpcy5jYW1TcGVlZFk7IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub2ZmWSAtIDEwID4gTWF0aC5mbG9vcih0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSkpIHsgdGhpcy5vZmZZIC09IHRoaXMuY2FtU3BlZWRZOyB9XG4gICAgICAgICAgICBlbHNlICh0aGlzLm9mZlkgPSB0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib3VuZHNDaGVjayh2YWwsIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWwsIG1pbiksIG1heCk7XG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiaW1wb3J0IHtBbmltYXRpb259IGZyb20gXCIuLi9lbmdpbmVcIlxuaW1wb3J0ICogYXMgQyBmcm9tIFwiLi4vdXRpbC9jb25zdC5qc29uXCJcbmRlY2xhcmUgbW9kdWxlIFwiKi5qc29uXCJcblxuLyoqKioqKioqKioqXG5FbnRpdHkgY2xhc3NcblxuZ2FtZSAtIGEgcmVmZXJlbmNlIHRvIHRoZSBnYW1lIGluIHdoaWNoIHRoaXMgZW50aXR5IGV4aXN0c1xueCwgeSAtIGVudGl0eSdzIGNvb3JkaW5hdGVzXG5yZW1vdmVGcm9tV29ybGQgLSBhIGZsYWcgdGhhdCBkZW5vdGVzIHdoZW4gdG8gcmVtb3ZlIHRoaXMgZW50aXR5IGZyb20gdGhlIGdhbWVcbioqKioqKioqKioqKi9cbmNsYXNzIEVudGl0eSB7XG5cbiAgICB4PzogbnVtYmVyO1xuICAgIHk/OiBudW1iZXI7XG4gICAgaW1nPzogYW55O1xuICAgIGN0eD86IGFueTtcbiAgICBsZXZlbD86IGFueTtcbiAgICBzZWN0aW9uPzogYW55O1xuICAgIHBhcmVudENsYXNzPzogc3RyaW5nO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgZ3Jhdml0eT86IG51bWJlcjtcbiAgICByZW1vdmVGcm9tV29ybGQ/OiBib29sZWFuO1xuXG4gICAgYm91bmRYPzogbnVtYmVyOyBcbiAgICBib3VuZFk/OiBudW1iZXI7XG4gICAgbGFzdEJvdW5kWT86IG51bWJlcjtcbiAgICBib3VuZFdpZHRoPzogbnVtYmVyO1xuICAgIGJvdW5kSGVpZ2h0PzogbnVtYmVyO1xuXG4gICAgbmFtZTogYW55O1xuICAgIGdhbWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yIChnYW1lOiBhbnksIHsgXG5cbiAgICAgICAgeCA9IDAsXG4gICAgICAgIHkgPSAwLFxuICAgICAgICBpbWcgPSBudWxsLFxuICAgICAgICBjdHggPSBudWxsLFxuICAgICAgICBsZXZlbCA9IG51bGwsXG4gICAgICAgIHNlY3Rpb24gPSBudWxsLFxuICAgICAgICBwYXJlbnRDbGFzcyA9IG51bGwsXG4gICAgICAgIHR5cGUgPSBudWxsLFxuICAgICAgICBncmF2aXR5ID0gQy5nYW1lU2V0dGluZ3MuZ3Jhdml0eSxcbiAgICAgICAgcmVtb3ZlRnJvbVdvcmxkID0gZmFsc2UsXG5cbiAgICAgICAgYm91bmRYID0gbnVsbCwgIFxuICAgICAgICBib3VuZFkgPSBudWxsLFxuICAgICAgICBsYXN0Qm91bmRZID0gbnVsbCxcbiAgICAgICAgYm91bmRXaWR0aCA9IG51bGwsXG4gICAgICAgIGJvdW5kSGVpZ2h0ID0gbnVsbFxuXG4gICAgfSA6IHtcbiAgICAgICAgeD86IG51bWJlcixcbiAgICAgICAgeT86IG51bWJlcixcbiAgICAgICAgaW1nPzogYW55LFxuICAgICAgICBjdHg/OiBhbnksXG4gICAgICAgIGxldmVsPzogYW55LFxuICAgICAgICBzZWN0aW9uPzogYW55LFxuICAgICAgICBwYXJlbnRDbGFzcz86IHN0cmluZyxcbiAgICAgICAgdHlwZT86IHN0cmluZyxcbiAgICAgICAgZ3Jhdml0eT86IG51bWJlcixcbiAgICAgICAgcmVtb3ZlRnJvbVdvcmxkPzogYm9vbGVhbixcblxuICAgICAgICBib3VuZFg/OiBudW1iZXIsXG4gICAgICAgIGJvdW5kWT86IG51bWJlcixcbiAgICAgICAgbGFzdEJvdW5kWT86IG51bWJlcixcbiAgICAgICAgYm91bmRXaWR0aD86IG51bWJlcixcbiAgICAgICAgYm91bmRIZWlnaHQ/OiBudW1iZXIsXG5cbiAgICAgICAgbmFtZT86IGFueSxcbiAgICAgICAgZ2FtZT86IGFueVxuICAgIH0gPSB7fSkge1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIH1cblxuICAgIC8vIFRPRE8sIGltcGxlbWVudCBhIGxpc3Qgb2YgYm91bmRpbmcgc2hhcGVzLCBpdGVyYXRlIHRocm91Z2ggZGVwZW5kaW5nIG9uIHR5cGUgKGNpcmNsZSBvciByZWN0KSBcbiAgICByZWN0YW5nbGUoKTogdm9pZCB7XG5cbiAgICB9XG4gICAgXG4gICAgY2lyY2xlKCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgLyogRHJhd3MgdGhlIG91dGxpbmUgb2YgdGhpcyBlbnRpdHkgKi9cbiAgICBkcmF3T3V0bGluZSAoY3R4OiBhbnkpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIC8qXG4gICAgVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wXG4gICAgaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/XG4gICAgKi9cbiAgICB1cGRhdGUgKCk6IHZvaWQgeyB9XG5cbiAgICAvKiBEcmF3cyB0aGlzIGVudGl0eS4gQ2FsbGVkIGV2ZXJ5IGN5Y2xlIG9mIHRoZSBnYW1lIGVuZ2luZS4gKi9cbiAgICBkcmF3IChjdHg6IGFueSk6IHZvaWQge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKlxuICAgIENvbGxpc2lvbiBkZXRlY3Rpb24sIHJlY3RhbmdsZVxuICAgICovXG4gICAgaXNDb2xsaWRpbmcob3RoZXI6IEVudGl0eSk6IHN0cmluZyB7XG4gICAgICAgIGxldCByZWN0MSA9IHtcbiAgICAgICAgICAgIFwieFwiIDogdGhpcy5ib3VuZFgsXG4gICAgICAgICAgICBcInlcIiA6IHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgXCJsYXN0WVwiIDogdGhpcy5sYXN0Qm91bmRZLFxuICAgICAgICAgICAgXCJ3aWR0aFwiIDogdGhpcy5ib3VuZFdpZHRoLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogdGhpcy5ib3VuZEhlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlY3QyID0ge1xuICAgICAgICAgICAgXCJ4XCIgOiBvdGhlci5ib3VuZFgsXG4gICAgICAgICAgICBcInlcIiA6IG90aGVyLmJvdW5kWSxcbiAgICAgICAgICAgIFwid2lkdGhcIiA6IG90aGVyLmJvdW5kV2lkdGgsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBvdGhlci5ib3VuZEhlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlY3QxLndpZHRoID09PSAwIHx8IHJlY3QxLmhlaWdodCA9PT0gMCB8fCByZWN0Mi53aWR0aCA9PT0gMCB8fCByZWN0Mi5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnbm9uZSdcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBzYW1lIGFzIE1hcmlvdHQncyBtZXRob2QsIGp1c3QgZm9ybWF0dGVkIGRpZmZlcmVudGx5XG4gICAgICAgIGxldCBjb2xsaXNpb24gPSAnbm9uZSc7XG4gICAgICAgIHZhciBkeCA9IChyZWN0MS54ICsgcmVjdDEud2lkdGgvMikgLSAocmVjdDIueCArIHJlY3QyLndpZHRoLzIpO1xuICAgICAgICB2YXIgZHkgPSAocmVjdDEueSArIHJlY3QxLmhlaWdodC8yKSAtIChyZWN0Mi55ICsgcmVjdDIuaGVpZ2h0LzIpO1xuICAgICAgICB2YXIgbGFzdGR5ID0gKHJlY3QxLmxhc3RZICsgcmVjdDEuaGVpZ2h0LzIpIC0gKHJlY3QyLnkgKyByZWN0Mi5oZWlnaHQvMik7XG4gICAgICAgIHZhciB3aWR0aCA9IChyZWN0MS53aWR0aCArIHJlY3QyLndpZHRoKSAvIDI7XG4gICAgICAgIHZhciBoZWlnaHQgPSAocmVjdDEuaGVpZ2h0ICsgcmVjdDIuaGVpZ2h0KSAvIDI7XG4gICAgICAgIHZhciBjcm9zc1dpZHRoID0gd2lkdGggKiBkeTtcbiAgICAgICAgdmFyIGxhc3RDcm9zc1dpZHRoID0gd2lkdGggKiBsYXN0ZHk7XG4gICAgICAgIHZhciBjcm9zc0hlaWdodCA9IGhlaWdodCAqIGR4O1xuICAgICAgICBcbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgcmVjdDEgYW5kIHJlY3QyIGFyZSBjbG9zZSBlbm91Z2ggdG8gZXZlbiBjb2xsaWRlLiBUaGVuIGNoZWNrIHRoZSBpbnRlcnNlY3Rpb24gZGVwdGhzIHRvIGRldGVybWluZSB3aGljaCBzaWRlIHdhcyBtb3N0IGludm9sdmVkIGluIHRoZSBjb2xsaXNpb24uXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA8PSB3aWR0aCAmJiBNYXRoLmFicyhkeSkgPD0gaGVpZ2h0KSB7XG5cbiAgICAgICAgICAgIC8vVE9ETyBzdG9yZSBsYXN0IGJvdHRvbSBvZiByZWN0MSwgY29tcGFyZSB0byBib3VuZCBvZiByZWN0MiwgZGV0ZXJtaW5lIGlmIGkgc2hvdWxkIGZhbGwgb3Igbm90XG4gICAgICAgICAgICBpZiAoY3Jvc3NXaWR0aCA+IGNyb3NzSGVpZ2h0ICYmIGxhc3RDcm9zc1dpZHRoID4gY3Jvc3NIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAoY3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpKSAmJiBsYXN0Q3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpID8gY29sbGlzaW9uID0gJ3JpZ2h0JyA6IGNvbGxpc2lvbiA9ICd0b3AnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyb3NzV2lkdGggPiAoLWNyb3NzSGVpZ2h0KSAmJiBsYXN0Q3Jvc3NXaWR0aCA+ICgtY3Jvc3NIZWlnaHQpID8gY29sbGlzaW9uID0gJ2xlZnQnIDogY29sbGlzaW9uID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MSBjdXI6IFwiICsgcmVjdDEueSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MSBsYXN0OiBcIiArIHJlY3QxLmxhc3RZKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlY3QyOiBcIiArIHJlY3QyLnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICByZXR1cm4gY29sbGlzaW9uO1xuXG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXI6IEVudGl0eSwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB9XG59IC8vIGVuZCBvZiBFbnRpdHkgY2xhc3NcblxuZXhwb3J0IGRlZmF1bHQgRW50aXR5IiwiXG4vLyBleHBvcnQge2RlZmF1bHQgYXMgVGVycmFpbn0gZnJvbSBcIi4vdGVycmFpblwiXG5leHBvcnQge2RlZmF1bHQgYXMgRW50aXR5fSBmcm9tIFwiLi9lbnRpdHkudHNcIiBcbi8vIGV4cG9ydCB7ZGVmYXVsdCBhcyBBY3Rvcn0gZnJvbSBcIi4vYWN0b3JcIlxuLy8gZXhwb3J0IHtkZWZhdWx0IGFzIEVuZW15fSBmcm9tIFwiLi9lbmVteVwiXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBDYW1lcmF9IGZyb20gXCIuL2NhbWVyYVwiXG4vLyBleHBvcnQge2RlZmF1bHQgYXMgR2FtZUJvYXJkfSBmcm9tIFwiLi9nYW1lLWJvYXJkXCJcbi8vIGV4cG9ydCB7ZGVmYXVsdCBhcyBIZXJvfSBmcm9tIFwiLi9oZXJvXCJcbi8vIGV4cG9ydCB7ZGVmYXVsdCBhcyBIdXJ0Ym94fSBmcm9tIFwiLi9odXJ0Ym94XCJcbi8vIGV4cG9ydCB7XG4vLyAgICAgSXRlbSwgXG4vLyAgICAgRW5lcmd5UGFjaywgXG4vLyAgICAgSGVhbHRoUGFjayB9IGZyb20gXCIuL2l0ZW1cIlxuLy8gZXhwb3J0IHtkZWZhdWx0IGFzIFJlZmxlY3Rib3h9IGZyb20gXCIuL3JlZmxlY3Rib3hcIlxuXG4iLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlXCJcblxud2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgIH1cbn0pKCk7XG5cbkNvcmUoKTtcbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBMb2dnaW5nfSBmcm9tIFwiLi9sb2dnaW5nXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBDb25zdH0gZnJvbSBcIi4vY29uc3QuanNvblwiIiwiaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi9jb25zdC5qc29uXCJcblxuXG5jbGFzcyBMb2dnaW5nIHtcblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgaWYgKENvbnN0YW50cy5zZXR0aW5ncy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2luZyJdLCJzb3VyY2VSb290IjoiIn0=