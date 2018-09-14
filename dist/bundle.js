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

/***/ "./src/animation.js":
/*!**************************!*\
  !*** ./src/animation.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/asset-manager.js");
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

/***/ "./src/asset-manager.js":
/*!******************************!*\
  !*** ./src/asset-manager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities */ "./src/entities/index.js");
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

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/asset-manager.js");
/* harmony import */ var _game_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-engine */ "./src/game-engine.js");
/* harmony import */ var _entities_game_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/game-board */ "./src/entities/game-board.js");
/* harmony import */ var _entities_camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/camera */ "./src/entities/camera.js");
/* harmony import */ var _hud__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hud */ "./src/hud.js");
/* harmony import */ var _entities_terrain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/terrain */ "./src/entities/terrain.js");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./background */ "./src/background.js");
/* harmony import */ var _entities_hero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entities/hero */ "./src/entities/hero.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sound */ "./src/sound.js");









/* harmony default export */ __webpack_exports__["default"] = (function () {
  // the "main" code begins here
  toload = ["img/ZXe.png", "img/Leo.png", "img/EnemySheet1.png", "img/pipes.png", "img/Enemies.png", "img/hud.png", "img/healthpack.png", "img/energypack.png", "img/bg/1_bg.png", "img/bg/2_farbuildings.png", "img/bg/3_buildings.png", "img/bg/4_foreground.png", "img/bg/bot_fill.png"];
  var ASSET_MANAGER = new _asset_manager__WEBPACK_IMPORTED_MODULE_0__["default"](toload);
  ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    console.log("canvas width: " + canvas.width);
    console.log("canvas height: " + canvas.height);
    var gameEngine = new _game_engine__WEBPACK_IMPORTED_MODULE_1__["default"]();
    var camera = new _entities_camera__WEBPACK_IMPORTED_MODULE_3__["default"](gameEngine, 0, 0, null, ctx = ctx, canvas.width, canvas.height, 2000, 2000);
    var hero = new _entities_hero__WEBPACK_IMPORTED_MODULE_7__["default"](gameEngine, 0, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
    var board = new _entities_game_board__WEBPACK_IMPORTED_MODULE_2__["default"](gameEngine, ASSET_MANAGER, ctx);
    gameEngine.hero = hero;
    gameEngine.gameboard = board;
    var hud = new _hud__WEBPACK_IMPORTED_MODULE_4__["default"](gameEngine, ASSET_MANAGER.getAsset("img/hud.png"), hero, [0, 0], [0, 0], [100, 100], 3, camera);
    board.hud = hud;
    board.hero = hero; // ### music ###
    //TODO: Placeholder magic numbers until we decide on how to handle world boundary and camera

    /**NOTE: IT IS VERY IMPORTANT CAMERA IS THE FIRST ADDED ENTITY**/

    gameEngine.addEntity(camera);
    gameEngine.camera = camera;
    var background = new _background__WEBPACK_IMPORTED_MODULE_6__["default"](gameEngine, ASSET_MANAGER, ctx, camera); //Loads level n

    board.getLevel(1);
    camera.follow(hero);
    gameEngine.addEntity(board); //gameEngine.addEntity(hero);
    //gameEngine.addEntity(hud);

    gameEngine.init(ctx);
    gameEngine.start();
  });
});

/***/ }),

/***/ "./src/entities/actor.js":
/*!*******************************!*\
  !*** ./src/entities/actor.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


/***********
Actor interface
This interface is designed to encompass any Entity that acts upon the game level. This class should not be instantiated.
Any action shared between actors is located here.

game - a reference to the game in which this entity exists
x, y - entity's coordinates
removeFromWorld - a flag that denotes when to remove this entity from the game
************/

var Actor =
/*#__PURE__*/
function (_Entity) {
  _inherits(Actor, _Entity);

  function Actor(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

    _classCallCheck(this, Actor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Actor).call(this, game, x, y, img, ctx));
    _this.parentClass = "Entity";
    _this.facing = null;
    _this.states = null;
    _this.animations = null;
    _this.animation = null; //Added theses post-hoc for better future development. (not currently used in any 'super' construction calls)

    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    return _this;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(Actor, [{
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(Actor.prototype), "update", this).call(this);
    }
    /***HELPER FUNCTIONS***/

  }, {
    key: "updatePos",
    value: function updatePos(x, y) {
      this.x += x;
      this.boundX += x;
      this.y += y;
      this.boundY += y;
    }
  }, {
    key: "setPos",
    value: function setPos() {
      var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
      this.x = coordinates[0];
      this.boundX = coordinates[0];
      this.y = coordinates[1];
      this.boundY = coordinates[1];
    }
  }]);

  return Actor;
}(___WEBPACK_IMPORTED_MODULE_0__["Entity"]);

/* harmony default export */ __webpack_exports__["default"] = (Actor);

/***/ }),

/***/ "./src/entities/bomb.js":
/*!******************************!*\
  !*** ./src/entities/bomb.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 //row 9, 40x30, offset 11, 4 frames

var Bomb =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Bomb, _Enemy);

  function Bomb(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 40;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 30;
    var facingRight = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
    var xVelocity = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 7;
    var yVelocity = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : -20;

    _classCallCheck(this, Bomb);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bomb).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.xVelocity = xVelocity;
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = _this.scale * 20;
    _this.boundHeight = _this.scale * 15;
    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight + 15; //Stats

    _this.sightRadius[0] = 500;
    _this.sightRadius[1] = 700;
    _this.health = 50;
    _this.damage = 0;
    _this.launchtime = 25;
    _this.countdown = 4;
    _this.startup = 3;
    _this.yVelocity = yVelocity;
    _this.friction = .03;
    _this.states = {
      "active": false,
      "launching": true,
      "activating": false,
      "detonating": false,
      "exploding": false,
      "exploded": false,
      "reflected": false,
      "facingRight": facingRight
    };
    _this.animations = {
      "launch": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 9, 17, 5, 1, true, _this.scale, 11),
      "activate": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 9, 17, 7, 2, true, _this.scale, 12),
      "detonate": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 9, 17, 6, 1, true, _this.scale, 14),
      "explode": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [60, 60], 4, 17, 5, 7, false, _this.scale + 3, 10)
    };

    if (_this.states.facingRight) {
      _this.facing = 1;
    } else {
      _this.facing = -1;
    }

    _this.animation = _this.animations.launch;
    return _this;
  }

  _createClass(Bomb, [{
    key: "update",
    value: function update() {
      if (this.states.launching) {
        this.updatePos(this.facing * this.xVelocity, 0);
      }

      if (this.states.activating) {
        this.updatePos(this.facing * this.xVelocity, 0);

        if (this.animation.loops > this.countdown) {
          this.animation.reset();
          this.states.activating = false;
          this.states.detonating = true;
        }
      }

      if (this.states.detonating) {
        //This "Facing Hero" check makes sure that, if Hero crosses axis before explosion,
        //Hero will be pushed back in the correct direction on stun
        if (this.x - this.game.hero.x < 0) {
          this.states.facingRight = true;
          this.facing = 1;
        } else {
          this.states.facingRight = false;
          this.facing = -1;
        }

        if (this.animation.loops > this.startup) {
          //Spawn explosion hurtbox
          this.animation.reset();
          this.states.detonating = false;
          this.states.exploding = true;
        }
      }

      if (this.states.exploding) {
        if (!this.states.exploded) {
          this.spriteHeight = 60;
          this.spriteWidth = 60;
          this.states.facingRight = true;
          this.x -= 2 * this.spriteWidth - 30;
          this.y += 30;
          var explosionX = 150;
          var explosionY = 150;
          this.game.playSound("explosion_1");
          var hurtbox = new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX, this.boundY, -1.75 * explosionX + 10, this.spriteHeight - 20, this.spriteWidth, this.spriteHeight, explosionX, explosionY, this.scale + 2, Math.max(4, this.damage), this.states.facingRight, !this.states.reflected, "health", 15);
          hurtbox.parent = this.name;
          this.game.addEntity(hurtbox);
          this.states.exploded = true;
        }

        if (this.animation.isDone()) {
          this.removeFromWorld = true;
        }
      }

      if (!this.states.exploding) {
        this.yVelocity += this.gravity * this.gravity;
        this.lastBoundY = this.boundY;
        this.updatePos(0, this.yVelocity);
      }

      if (this.health <= 0) {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.launching) {
        this.animation = this.animations.launch;
      }

      if (this.states.activating) {
        this.animation = this.animations.activate;
      }

      if (this.states.detonating) {
        this.animation = this.animations.detonate;
      }

      if (this.states.exploding) {
        this.animation = this.animations.explode;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight) {
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2;
      this.boundY = this.y - this.boundHeight;
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Terrain") {
        //TODO Add collision with terrain
        if (direction === 'bottom' && !this.states.exploding) {
          this.boundY = other.boundY - this.boundHeight;
          this.y = this.boundY + this.boundHeight - 10;
          this.yVelocity = 0;

          if (this.xVelocity > 0) {
            if (this.states.facingRight) {
              this.xVelocity -= this.facing * this.xVelocity * this.friction;
            } else {
              this.xVelocity += this.facing * this.xVelocity * this.friction;
            }
          }

          if (this.states.launching) {
            this.animation.reset();
            this.states.launching = false;
            this.states.activating = true;
          }
        } else if (direction === 'top') {
          this.boundY = other.boundY + other.boundHeight;
          this.y = this.boundY + this.boundHeight - 10;
          this.yVelocity = 0;
          this.lastBoundY = this.boundY;
        } else if (direction === 'left') {
          this.boundX = other.boundX + other.boundWidth;
          this.x = this.boundX;
        } else if (direction === 'right') {
          this.boundX = other.boundX - this.boundWidth;
          this.x = this.boundX;
        }
      }

      if (other.name === "Projectile") {
        this.states.launching = false, this.states.activating = false;
        this.states.detonating = false;
        this.states.exploding = true;
        this.gravity = 0;
        this.yVelocity = 0;
      }

      if (other.name === "Hurtbox") {
        if (!other.isEnemy) {
          //If hero is cleaving, do...
          //Hit bomb away
          //Else
          this.states.launching = false, this.states.activating = false;
          this.states.detonating = false;
          this.states.exploding = true;
          this.gravity = 0;
          this.yVelocity = 0;
        }
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Bomb;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Bomb);

/***/ }),

/***/ "./src/entities/bullet.js":
/*!********************************!*\
  !*** ./src/entities/bullet.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Bullet =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Bullet, _Enemy);

  function Bullet(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var facingRight = arguments.length > 6 ? arguments[6] : undefined;
    var spriteWidth = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 50;
    var spriteHeight = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 50;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.movementSpeed = 7;

    if (facingRight) {
      _this.x += 100;
    } else {
      _this.x -= 100;
    }

    ; //offset to match gun

    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = 30;
    _this.boundHeight = 30;
    _this.boundY = _this.y - _this.boundHeight - _this.spriteHeight - 7;

    if (!facingRight) {
      _this.boundX = _this.centerX - _this.boundWidth / 2 - 2 * _this.spriteWidth; //+100 aligns with the gun
    } else {
      _this.boundX = _this.centerX - _this.boundWidth / 2 + 2 * _this.spriteWidth;
    } //Stats


    _this.damage = 1;
    _this.health = 150;
    _this.states = {
      "active": true,
      "facingRight": facingRight
    };
    _this.animations = {
      "bullet": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 18, 20, 2, true, _this.scale, 16)
    };
    _this.animation = _this.animations.bullet;
    return _this;
  }

  _createClass(Bullet, [{
    key: "update",
    value: function update() {
      //TODO
      if (this.states.active) {
        if (this.states.facingRight) {
          this.x += this.movementSpeed;
          this.boundX += this.movementSpeed; //this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y,
          //    0, 0, this.spriteWidth, this.spriteHeight, 10, 10, this.scale, 50, this.facingRight));
        } else {
          this.x -= this.movementSpeed;
          this.boundX -= this.movementSpeed;
        }

        if (this.animation.loops > 7) {
          this.animation.reset();
          this.states.steady = false;
          this.removeFromWorld = true;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.active) {
        this.animation = this.animations.bullet;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Terrain" || other.name === "Spikes" || other.name === "Hero") {
        this.removeFromWorld = true;
      } else if (other.name === "Projectile") {
        this.health -= other.damage;
      } else if (other.name === "Hurtbox") {
        //other.hasOwnProperty("isEnemy");
        //other.hasOwnProperty("damage");
        if (!other.isEnemy) {
          this.removeFromWorld = true;
        }
      }

      if (other.name === "Reflectbox") {
        this.states.facingRight = !this.states.facingRight;
        this.name = "Projectile";
        this.health = 1;
        this.damage = 150;
      }

      if (this.name === "Projectile") {
        if (other.name === "Bullet") {
          other.removeFromWorld = true;
          this.removeFromWorld = true;
        }

        if (other.parentClass === "Enemy") {
          this.removeFromWorld = true;
        }
      }

      if (this.health <= 0) {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight) {
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth + 5;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2;
      this.boundY = this.y - this.boundHeight;
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Bullet;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Bullet);

/***/ }),

/***/ "./src/entities/camera.js":
/*!********************************!*\
  !*** ./src/entities/camera.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
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
Camera class
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
}(_entity__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Camera);

/***/ }),

/***/ "./src/entities/crow.js":
/*!******************************!*\
  !*** ./src/entities/crow.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Crow =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Crow, _Enemy);

  function Crow(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 50;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 40;
    var sightRadius = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [700, 500];
    var murderLeader = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
    var murderDroogs = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [[0, 0], [0, 0]];

    _classCallCheck(this, Crow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Crow).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = _this.scale * 20;
    _this.boundHeight = _this.scale * 15;
    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight; //Stats

    _this.murderLeader = murderLeader;
    _this.pointValue = 10;
    _this.xSpeed = 4;
    _this.ySpeed = 8;
    _this.maxX = 5;
    _this.maxY = 9;
    _this.xAccel = .35;
    _this.yAccel = .4;
    _this.attackAngle1 = 2;
    _this.attackAngle2 = 10;
    _this.xAttack = 17;
    _this.xRecover = 7;
    _this.yRecover = 4;
    _this.recoverDistance = 400;
    _this.xRecoverDistance;
    _this.yRecoverDistance;

    if (_this.murderLeader) {
      _this.droogOne = murderDroogs[0];
      _this.droogTwo = murderDroogs[1];
    }

    _this.sightRadius[0] = sightRadius[0];
    _this.sightRadius[1] = sightRadius[1];
    _this.health = 100;
    _this.damage = 0;
    _this.facing = 1;
    _this.rand = 0;
    _this.states = {
      "active": true,
      "flying": false,
      "attacking": false,
      "attacking_final": false,
      "recovering": false,
      "hurt": false,
      "idling": true,
      "facingRight": false
    };
    _this.animations = {
      "fly": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 8, 11, 5, 5, true, _this.scale),
      "attack": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 8, 11, 6, 3, false, _this.scale, 5),
      "attack_final": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 8, 11, 6, 2, true, _this.scale, 8),
      "hurt": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 8, 11, 5, 1, true, _this.scale, 10) //TODO: Add "smokebomb" effect for activation

    };
    _this.animation = _this.animations.fly;
    return _this;
  }

  _createClass(Crow, [{
    key: "update",
    value: function update() {
      if (!this.states.recovering && !this.states.attacking_final) {
        if (this.x - this.game.hero.x < 0) {
          this.states.facingRight = true;
          this.facing = 1;
        } else if (!this.states.recovering) {
          this.states.facingRight = false;
          this.facing = -1;
        }
      }

      if (this.states.idling) {
        if (Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0] && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
          //disable states
          this.states.idling = false; //enable states

          this.states.flying = true;

          if (this.murderLeader) {
            var droog1 = new Crow(this.game, this.x + this.droogOne[0], this.y + this.droogOne[1], this.img, this.ctx, this.scale, this.spriteWidth, this.spriteHeight, [2000, 2000]);
            var droog2 = new Crow(this.game, this.x + this.droogTwo[0], this.y + this.droogTwo[1], this.img, this.ctx, this.scale, this.spriteWidth, this.spriteHeight, [2000, 2000]);
            droog1.level = this.level;
            droog1.section = this.section;
            droog2.level = this.level;
            droog2.section = this.section;
            this.game.addEntity(droog1);
            this.game.addEntity(droog2);
          }
        }
      }

      if (this.states.flying) {
        //this.updateHitbox(50, 40, 20, 15);
        //Apply speed updates and chase Hero/stay in attack range
        if (this.xSpeed < this.maxX && this.facing === 1 || this.xSpeed > -this.maxX && this.facing === -1) {
          this.xSpeed += this.facing * this.xAccel;
        }

        if (this.y - this.game.hero.y >= -125) {
          if (this.ySpeed > -this.maxY) {
            this.ySpeed -= this.yAccel;
          }

          this.y += this.ySpeed;
          this.boundY += this.ySpeed;
        } else if (this.y - this.game.hero.y <= -200) {
          if (this.ySpeed < this.maxY) {
            this.ySpeed += this.yAccel;
          }

          this.y += this.ySpeed;
          this.boundY += this.ySpeed;
        } //Stay within Crow's attack radius


        if (Math.abs(this.x - this.game.hero.x) >= 500 && this.states.active) {
          this.x += this.xSpeed;
          this.boundX += this.xSpeed;
        } else if (Math.abs(this.x - this.game.hero.x) <= 250 && this.states.active) {
          this.x -= this.xSpeed;
          this.boundX -= this.xSpeed;
        } // below hero;
        //if (this.y - this.game.hero.y <= 100) {
        //    this.y += this.ySpeed;
        //    this.boundY += this.ySpeed;
        //}
        //// above hero
        //else if (this.y - this.game.hero.y >= 200) {
        //    this.y += this.ySpeed;
        //    this.boundY += this.ySpeed;
        //}
        //ATTACK!!!


        if (Math.abs(this.x - this.game.hero.x) <= 700 && this.y - this.game.hero.y < -100 && this.y - this.game.hero.y > -200 && this.animation.loops > 1 && Math.random() * 100 <= 10) {
          this.animation.reset();
          this.states.attacking = true;
          this.states.flying = false;
          this.rand = Math.floor(Math.random() * 3);
          this.game.sound.play("crow_caw");
        }
      }

      if (this.states.attacking) {
        if (this.rand === 0) {
          //this.y -= this.attackAngle1;
          //this.boundY -= this.attackAngle2;
          this.updatePos(-this.facing * this.xAttack / 2, -this.attackAngle1);
        } else {
          //this.y -= this.attackAngle2;
          //this.boundY -= this.attackAngle2;
          this.updatePos(-this.facing * this.xAttack / 2, -this.attackAngle2);
        } //this.x -= this.facing*7;
        //this.boundX -= this.facing*7;                    


        if (this.animation.isDone()) {
          this.animation.reset();
          this.states.attacking = false; //randomly determine angle of attack (makes prediction harder)
          //min attack angle of 2
          //this.attackAngle = 2 + Math.random() * 8; 

          this.states.attacking_final = true;
        }
      }

      if (this.states.attacking_final) {
        if (this.rand === 0) {
          this.y += this.attackAngle1;
          this.boundY += this.attackAngle1;
        } else {
          this.y += this.attackAngle2;
          this.boundY += this.attackAngle2;
        }

        this.x += this.facing * this.xAttack;
        this.boundX += this.facing * this.xAttack; //console.log("y: " + this.y);
        //Spawn Hurtbox

        if (this.states.facingRight) this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.x, this.y, -45, 10, this.spriteWidth, this.spriteHeight, 40, 40, this.scale, 1, this.states.facingRight, true));else this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.x, this.y, -45 - this.spriteWidth - 30, 10, this.spriteWidth, this.spriteHeight, 40, 40, this.scale, 1, this.states.facingRight, true)); //state finished

        if (this.animation.loops > 3) {
          this.states.attacking_final = false;
          this.animation.reset();
          this.animation.reset();
          this.states.recovering = true;
        }
      }

      if (this.states.recovering) {
        //after attack is finished
        //fly away
        this.x += this.facing * this.xRecover;
        this.boundX += this.facing * this.xRecover;
        this.y -= this.yRecover;
        this.boundY -= this.yRecover;

        if (Math.abs(this.x - this.game.hero.x) >= this.recoverDistance) {
          this.states.recovering = false;
          this.states.flying = true;
        }
      }

      if (this.states.hurt) {
        if (this.health <= 0) {
          // DEATH RATTLE
          if (Math.random() < .5) {
            this.y += Math.random() * 5;
            this.x += Math.random() * 5;
          } else {
            this.y -= Math.random() * 5;
            this.x -= Math.random() * 5;
          }
        }

        if (this.animation.loops > 8) {
          //reset animation
          this.animation.reset();
          this.animation.reset(); //disable states

          this.states.hurt = false; //enable states

          this.states.flying = true;
          this.states.facingRight = !this.states.facingRight; //update hitbox

          this.updateHitbox(50, 40, 20, 15);

          if (this.health <= 0) {
            this.removeFromWorld = true;

            if (Math.random() * 100 <= 27) {
              this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Item"].HealthPack(this.game, this.x, this.y, this.game.gameboard.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 3, 5));
              this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Item"].EnergyPack(this.game, this.x + 30, this.y, this.game.gameboard.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 3, 5));
            }
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.flying || this.states.idling || this.states.recovering) {
        this.animation = this.animations.fly;
      }

      if (this.states.attacking) {
        this.animation = this.animations.attack;
      }

      if (this.states.attacking_final) {
        this.animation = this.animations.attack_final;
      }

      if (this.states.hurt) {
        this.animation = this.animations.hurt;
      }

      if (!this.states.idling) {
        this.drawImg(ctx);
      }
    }
  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight) {
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2;
      this.boundY = this.y - this.boundHeight;
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Terrain") {//null
      }

      if (other.name === "Projectile" && !this.states.hurt && !this.states.idling) {
        this.health -= other.damage;
        this.states.flying = false;
        this.states.attacking = false;
        this.states.attacking_final = false;
        this.states.idling = false;
        this.states.hurt = true;
      }

      if (other.name === "Hurtbox" && !this.states.hurt && !this.states.idling) {
        if (!other.isEnemy) {
          this.health -= other.damage;
          this.states.flying = false;
          this.states.attacking = false;
          this.states.attacking_final = false;
          this.states.idling = false;
          this.states.hurt = true;
        }
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      if (this.states.active) {
        this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
      }

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Crow;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Crow);

/***/ }),

/***/ "./src/entities/dino.js":
/*!******************************!*\
  !*** ./src/entities/dino.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Dino =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Dino, _Enemy);

  function Dino(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 90;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 60;
    var patrolDistance = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var shotTimeOffset = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

    _classCallCheck(this, Dino);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dino).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.movementSpeed = 2;
    _this.hero = _this.game.hero;
    _this.y = y;
    _this.x = x;
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = _this.scale * 35;
    _this.boundHeight = _this.scale * 35;
    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight + _this.spriteHeight / 2;
    _this.facing = 1;
    _this.startX = x;
    _this.maxX = _this.startX + patrolDistance; //Change this to alter dino's patrol distance
    //Timers

    _this.shotCooldown = 250;
    _this.shotCooldownTimer = shotTimeOffset; //Stats

    _this.pointValue = 15;
    _this.health = 200;
    _this.damage = 1;
    _this.yVelocity = 0;
    _this.sightRadius[0] = 1500;
    _this.sightRadius[1] = 1000;
    _this.states = {
      "active": true,
      "idling": true,
      "shooting": false,
      "walking": false,
      "grounded": false,
      "patrolling": false,
      "framelocked": false,
      "facingRight": true
    };
    _this.animations = {
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [90, 60], 6, 13, 5, 1, true, _this.scale, 12),
      "walk_straight": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [90, 60], 6, 13, 9, 6, true, _this.scale),
      //"walk_down":        new Animation(this.img, [90, 60], 6, 13, 7, 6, true, this.scale, 6),
      //"walk_up":          new Animation(this.img, [90, 70], 6, 18, 7, 6, true, this.scale),//90x70
      //"shoot_up":         new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 6),//90x70
      "shoot_diagonal": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [90, 70], 6, 18, 7, 4, false, _this.scale, 10) //90x70
      //"shoot_straight":   new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 14),//90x70                    

    };

    if (patrolDistance > 0) {
      _this.states.patrolling = true;
    }

    _this.animation = _this.animations.idle;
    return _this;
  }

  _createClass(Dino, [{
    key: "update",
    value: function update() {
      /****BEGIN BEHAVIOR****/
      //Turn towards Hero
      // if (!this.states.framelocked && !this.states.patrolling) {
      //     this.states.patrolling = true;
      if (this.states.patrolling && !this.states.shooting) {
        this.states.walking = true;

        if (this.x <= this.startX) {
          this.states.facingRight = true;
          this.facing = 1;
        }

        if (this.x >= this.maxX) {
          this.states.facingRight = false;
          this.facing = -1;
        }
      } else {
        if (this.x - this.game.hero.x < 0) {
          this.states.facingRight = true;
          this.facing = 1;
        } else {
          this.states.facingRight = false;
          this.facing = -1;
        }
      } // }


      if (this.states.walking) {
        this.x += this.facing * this.movementSpeed;

        if (this.shotCooldownTimer <= 0 && this.yVelocity === 0 && (Math.abs(this.maxX - this.x) <= 5 || Math.abs(this.startX - this.x) <= 5) && Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0] && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
          this.animation.reset();
          this.animation.reset();
          this.states.shooting = true;
          this.states.walking = false;
        }
      } else if (this.states.idling) {
        if (this.shotCooldownTimer <= 0 && this.yVelocity === 0 && Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0] && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
          this.states.shooting = true;
          this.states.idling = false;
        }
      }

      if (this.states.shooting) {
        if (!this.states.framelocked) {
          this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Rocket"](this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
          this.states.framelocked = true;
          this.game.playSound("energy_launcher");
        }

        if (this.animation.isDone()) {
          this.animation.reset();
          this.states.shooting = false;
          this.shotCooldownTimer = this.shotCooldown;
          if (this.states.patrolling) this.states.walking = true;else this.states.idling = true;
          this.states.framelocked = false;
        }
      } //Timers


      if (this.shotCooldownTimer > 0) {
        this.shotCooldownTimer -= 1;
      } //Apply Gravity


      this.yVelocity += this.gravity * this.gravity;
      this.y += this.yVelocity;
      this.lastBoundY = this.boundY;
      this.boundY += this.yVelocity; //console.log(this.y);
      //Health checks

      if (this.health <= 0) {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.idling) {
        this.updateHitbox(90, 60, 25, 45);
        this.animation = this.animations.idle;
      }

      if (this.states.walking) {
        this.updateHitbox(90, 60, 25, 45);
        this.animation = this.animations.walk_straight;
      }

      if (this.states.shooting) {
        this.updateHitbox(90, 70, 25, 45);
        this.animation = this.animations.shoot_diagonal;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      if (other.name === "Terrain") {
        if (direction === 'bottom') {
          this.boundY = other.boundY - this.boundHeight;
          this.y = this.boundY + this.boundHeight; //fix magic number (drawn slightly below hitbox without the 20 offset)

          this.yVelocity = 0;
        } else if (direction === 'top') {
          this.boundY = other.boundY + other.boundHeight;
          this.y = this.boundY + this.boundHeight;
          this.lastBoundY = this.boundY;
        } else if (direction === 'left') {
          this.boundX = other.boundX + other.boundWidth;
          this.x = this.boundX + 87;
          this.states.facingRight = true;
          this.facing = -1;
        } else if (direction === 'left') {
          this.boundX = other.boundX + other.boundWidth;
          this.x = this.boundX - 87;
          this.states.facingRight = false;
          this.facing = 1;
        }
      }

      if (other.name === "Projectile") {
        this.health -= other.damage;
      }

      if (other.name === "Hurtbox") {
        //other.hasOwnProperty("isEnemy");
        //other.hasOwnProperty("damage");
        // blocking from left & right
        if (!other.isEnemy) {
          this.health -= other.damage;
        }
      }
    }
  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight) {
      var offX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var offY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2 + offX;
      this.boundY = this.y - this.boundHeight + offY;
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Dino;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Dino);

/***/ }),

/***/ "./src/entities/enemy.js":
/*!*******************************!*\
  !*** ./src/entities/enemy.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Enemy =
/*#__PURE__*/
function (_Actor) {
  _inherits(Enemy, _Actor);

  function Enemy(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 ? arguments[6] : undefined;
    var spriteHeight = arguments.length > 7 ? arguments[7] : undefined;

    _classCallCheck(this, Enemy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Enemy).call(this, game, x, y, img, ctx));
    _this.parentClass = "Actor";
    _this.movementSpeed = 0;
    _this.damageType = "health";
    _this.pointValue = 0; //Define this explicitly for relevant enemies
    //TODO (future development) make sight radius a part of Enemy definition for use in super constructors

    _this.sightRadius = [900, 300]; // x, y distance from current location

    return _this;
  }

  _createClass(Enemy, [{
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(Enemy.prototype), "update", this).call(this);
    }
  }]);

  return Enemy;
}(___WEBPACK_IMPORTED_MODULE_1__["Actor"]);

/* harmony default export */ __webpack_exports__["default"] = (Enemy);

/***/ }),

/***/ "./src/entities/entity.js":
/*!********************************!*\
  !*** ./src/entities/entity.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
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
  function Entity(game, x, y) {
    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Entity);

    this.name = this.constructor.name;
    this.game = game;
    this.level = null;
    this.section = null;
    this.parentClass = null;
    this.type = null;
    this.x = x;
    this.y = y;
    this.gravity = .9;
    this.img = img;
    this.removeFromWorld = false;
    this.ctx = ctx; // used for simple rect hitbox

    this.boundX = null;
    this.boundY = null;
    this.lastBoundY = null;
    this.boundWidth = null;
    this.boundHeight = null;
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
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.closePath();
    }
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
    value: function draw(ctx) {
      if (this.game.showOutlines && this.boundX) {
        drawOutline(ctx);
      }

      if (this.img) {
        this.animation.drawFrame(this.clockTick, ctx, this.x, this.y, true);
      }
    }
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

/***/ "./src/entities/flames.js":
/*!********************************!*\
  !*** ./src/entities/flames.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Flames =
/*#__PURE__*/
function (_Actor) {
  _inherits(Flames, _Actor);

  function Flames(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 20;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 40;

    _classCallCheck(this, Flames);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Flames).call(this, game, x, y, img, ctx));
    _this.movementSpeed = 1;
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.states = {
      "active": false,
      "facingRight": false
    };
    _this.animations = {
      "demo": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 8, 9, 10, 9, true, _this.scale)
    };
    _this.animation = _this.animations.demo;
    return _this;
  }

  _createClass(Flames, [{
    key: "update",
    value: function update() {
      //TODO
      if (this.isDone) {
        this.elapsedTime = 0;
        this.x = this.origX;
        this.y = this.origY;
      }
    }
  }]);

  return Flames;
}(___WEBPACK_IMPORTED_MODULE_1__["Actor"]);

/* harmony default export */ __webpack_exports__["default"] = (Flames);

/***/ }),

/***/ "./src/entities/game-board.js":
/*!************************************!*\
  !*** ./src/entities/game-board.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**************
GameBoard class
**************/

var GameBoard =
/*#__PURE__*/
function (_Entity) {
  _inherits(GameBoard, _Entity);

  // so this prototype.call() is calling the Entity constructor with (game=null, x=0, y=0)
  function GameBoard(game, assetManager, ctx, hero, hud) {
    var _this;

    _classCallCheck(this, GameBoard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameBoard).call(this, game, 0, 0, null, ctx));
    _this.testPos = [11570, 300]; //DBG/Dev Tool

    _this.game = game;
    _this.assetManager = assetManager; //used for recalling a section's non-terrain, non-hazard actors on death

    _this.levelNum;
    _this.sectionNum; //point value timer

    _this.pvt = 0;
    _this.pvtt = 20;
    _this.lostScore = 0;
    _this.deadEnemies = [[[0, 0], 0, 0]];
    _this.score = 0;
    _this.time;
    _this.hero = hero;
    _this.hud = hud;
    _this.level;
    _this.checkNode = null;
    _this.lastCheckpoint = null;
    _this.states = {
      "newBoard": true,
      "loadingLevel": false,
      "loadedLevel": false,
      "populateLevel": false,
      "respawnLevel": false,
      "loadingSection": false,
      "loadedSection": false,
      "respawnSection": false,
      "newLevel": false,
      "loadNextLevel": false,
      "showPointValues": false
    };
    return _this;
  }

  _createClass(GameBoard, [{
    key: "update",
    value: function update() {
      if (this.states.loadNextLevel) {
        console.log("entered loadNextLevel");
        var nextLevel = this.level.nextLevel;
        this.level = null;
        this.clearStates();
        this.getLevel(nextLevel);
      } else {
        if (!this.states.loadedLevel) {
          this.level.load();
          this.states.loadingLevel = true;
          this.level.populateMap(-1);
          this.states.loadingLevel = false;
          this.hero.setPos([this.checkNode.x, this.checkNode.y]);
          this.nextNode = this.checkpoints.next;
          this.states.loadedLevel = true;
          this.states.newLevel = false;
          this.game.addEntity(this.hero);
          this.game.addEntity(this.level.portal);
          this.hero.removeFromWorld = false;
          this.hero.states.active = true;
          this.game.addEntity(this.hud);
          this.hud.removeFromWorld = false;
        }

        if (this.states.loadingSection) {
          this.states.respawnSection = true;
          this.level.populateMap(this.sectionNum);
          this.states.loadingSection = false;
          console.log("reloaded section " + this.sectionNum);
        }

        if (this.level.nextLevel > 0 && this.checkNode.states.isBack) {
          this.clearBoard("level");
        } //If entering next checkpoint


        if (!this.checkNode.states.isBack && this.hero.x >= this.checkNode.next.x) {
          this.checkNode.states.active = false;
          this.checkNode = this.checkNode.next;

          if (!this.checkNode.states.activated) {
            this.checkNode.states.activated = true;
            this.lastCheckpoint = this.checkNode;
          }

          this.checkNode.states.active = true;
          this.game.camera.absOffX = this.checkNode.camOffX;
          this.game.camera.absOffY = this.checkNode.camOffY;
          this.game.camera.camSpeedX = this.checkNode.nextCamSpeed;
          this.game.camera.camSpeedY = this.checkNode.nextCamSpeed;
        } //If entering previous checkpoint
        else if (!this.checkNode.states.isFront && this.hero.x < this.checkNode.x && this.hero.x >= this.checkNode.prev.x) {
            this.checkNode.states.active = false;
            this.checkNode = this.checkNode.prev;
            this.checkNode.active = true;
            this.game.camera.absOffX = this.checkNode.camOffX;
            this.game.camera.absOffY = this.checkNode.camOffY;
            this.game.camera.camSpeedX = this.checkNode.prevCamSpeed;
            this.game.camera.camSpeedY = this.checkNode.prevCamSpeed;
          }

        if (this.hero.states.respawned) {
          //this.clearBoard("level");
          this.hero.respawn();
          this.hero.setPos([this.lastCheckpoint.x, this.lastCheckpoint.y - 10]);
          this.clearBoard("actors");
          console.log("respawn");
          this.respawnMessage = 2 * this.pvtt;
        }

        if (this.states.showPointValues) {
          if (this.pvt > 0) {
            this.pvt--;
          } else {
            this.states.showPointValues = false;
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.respawnMessage > 0) {
        console.log("draw");
        this.ctx.font = "Bold 25px Verdana";
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillText("-" + this.lostScore + " points", this.game.hero.x + 10, this.game.hero.y - 150);
        this.respawnMessage--;
      }

      if (this.deadEnemies.length > 0) {
        for (var i = this.deadEnemies.length - 1; i >= 0; --i) {
          if (this.deadEnemies[i][2] === 0) {
            this.deadEnemies.splice(i, 1);
          } else {
            console.log("draw");
            this.ctx.font = "20px Verdana";
            this.ctx.fillStyle = "#00ff00";
            this.ctx.fillText("+" + this.deadEnemies[i][1] + " points", this.deadEnemies[i][0][0] + 10, this.deadEnemies[i][0][1] - 150);
            this.deadEnemies[i][2]--;
          }
        }
      }
    }
  }, {
    key: "clearBoard",
    value: function clearBoard(scope) {
      //scope will range from actors only, to the entire level.
      if (scope === "actors") {
        this.states.loadingSection = true;
        this.sectionNum = this.lastCheckpoint.num;
      } else if (scope === "level") {
        this.hero.states.active = false;
        this.states.newLevel = true;
      }

      console.log("Board Cleared");
    }
  }, {
    key: "clearStates",
    value: function clearStates() {
      this.states.loadingLevel = false;
      this.states.loadedLevel = false;
      this.states.populateLevel = false;
      this.states.respawnLevel = false;
      this.states.loadingSection = false;
      this.states.loadedSection = false;
      this.states.respawnSection = false;
      this.states.newLevel = false;
      this.states.loadNextLevel = false;
    }
  }, {
    key: "getLevel",
    value: function getLevel(level) {
      if (level === 1) {
        this.level = new Levels["level-one"](this.game, this.assetManager, this.ctx);
        this.levelNum = level; //Should move this into the LevelTwo class(?)
        //Create checkpoint linked list.

        var currCheckPos = this.level.checkpoints[0];
        var currCheckX = currCheckPos[0];
        var currCheckY = currCheckPos[1];
        var listFront = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, 0, this.level.camVals[0], this.level.camSpeeds[0], null, null);
        listFront.states.isFront = true;
        this.states.hasPrev = false;
        listFront.num = 0;
        listFront.active = true;
        listFront.activated = true;
        var currCheck = null;
        var prevCheck = listFront; //instantiate checkpoint linked list

        for (var i = 1; i < this.level.checkpoints.length; i++) {
          currCheckPos = this.level.checkpoints[i];
          currCheckX = currCheckPos[0];
          currCheckY = currCheckPos[1];

          if (i === this.level.checkpoints.length - 1) {
            currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
            currCheck.states.hasNext = false;
            currCheck.states.isBack = true;
          } else {
            currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
            currCheck.num = i;
            currCheck.states.hasNext = true;
          }

          currCheck.num = i;
          prevCheck.addNext(currCheck);
          prevCheck.setBounds();
          prevCheck = currCheck;
        }

        currCheck.setBounds();
        this.checkpoints = listFront;
        this.checkNode = listFront;
        this.lastCheckpoint = this.checkNode;
        this.game.camera.absOffX = this.checkNode.camOffX;
        this.game.camera.absOffY = this.checkNode.camOffY;
      }

      if (level === 2) {
        this.level = new Levels["level-two"](this.game, this.assetManager, this.ctx);
        this.levelNum = level; //Should move this into the LevelTwo class(?)
        //Create checkpoint linked list.

        var currCheckPos = this.level.checkpoints[0];
        var currCheckX = currCheckPos[0];
        var currCheckY = currCheckPos[1];
        var listFront = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, 0, this.level.camVals[0], this.level.camSpeeds[0], null, null);
        listFront.states.isFront = true;
        this.states.hasPrev = false;
        listFront.num = 0;
        listFront.active = true;
        listFront.activated = true;
        var currCheck = null;
        var prevCheck = listFront; //instantiate checkpoint linked list

        for (var i = 1; i < this.level.checkpoints.length; i++) {
          currCheckPos = this.level.checkpoints[i];
          currCheckX = currCheckPos[0];
          currCheckY = currCheckPos[1];

          if (i === this.level.checkpoints.length - 1) {
            currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
            currCheck.states.hasNext = false;
            currCheck.states.isBack = true;
          } else {
            currCheck = new Checkpoint(this.game, currCheckX, currCheckY, this.ctx, i, this.level.camVals[i], this.level.camSpeeds[i], null, prevCheck);
            currCheck.num = i;
            currCheck.states.hasNext = true;
          }

          currCheck.num = i;
          prevCheck.addNext(currCheck);
          prevCheck.setBounds();
          prevCheck = currCheck;
        }

        currCheck.setBounds();
        this.checkpoints = listFront;
        this.checkNode = listFront;
        this.lastCheckpoint = this.checkNode;
        this.game.camera.absOffX = this.checkNode.camOffX;
        this.game.camera.absOffY = this.checkNode.camOffY;
      }
    } //on hero death, pause game updates and save states of all entities prior to the checkpoint

  }]);

  return GameBoard;
}(_entity__WEBPACK_IMPORTED_MODULE_0__["default"]); // end GameBoard class
//Checkpoint "node"


var Checkpoint =
/*#__PURE__*/
function (_Entity2) {
  _inherits(Checkpoint, _Entity2);

  function Checkpoint(game, x, y, ctx, num) {
    var _this2;

    var cameraShift = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [2, 1.5];
    var cameraSpeed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [8, 8];
    var next = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var prev = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;

    _classCallCheck(this, Checkpoint);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Checkpoint).call(this, game, x, y, null, ctx));
    _this2.next = next;
    _this2.prev = prev;
    _this2.camOffX = cameraShift[0];
    _this2.camOffY = cameraShift[1];
    _this2.nextCamSpeed = cameraSpeed[0];
    _this2.prevCamSpeed = cameraSpeed[1];
    _this2.rightBound = _this2.x;
    _this2.leftBound = _this2.x - 1;
    _this2.activationRadius = [60, 60];
    _this2.num = num; //Checkpoint's order in list

    _this2.states = {
      "isFront": false,
      "isBack": false,
      "active": false,
      "activated": false,
      "hasNext": false,
      "hasPrev": false
    };

    if (_this2.next !== null) {
      _this2.states.hasNext = true;
    }

    if (_this2.prev !== null) {
      _this2.states.hasPrev = true;
    }

    return _this2;
  }

  _createClass(Checkpoint, [{
    key: "update",
    value: function update() {}
  }, {
    key: "addNext",
    value: function addNext(next) {
      this.next = next;
      this.states.hasNext = true;
    }
  }, {
    key: "setBounds",
    value: function setBounds() {
      if (this.next !== null) {
        this.rightBound = Math.floor((this.next.x + this.x) / 2) - 1;
      } else {
        this.rightBound = this.x;
      }

      if (this.prev !== null) {
        this.leftBound = Math.floor((this.prev.x + this.x) / 2) + 1;
      } else {
        this.leftBound = this.x;
      }
    }
  }, {
    key: "draw",
    value: function draw() {}
  }]);

  return Checkpoint;
}(_entity__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GameBoard);

/***/ }),

/***/ "./src/entities/hand.js":
/*!******************************!*\
  !*** ./src/entities/hand.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 //row 9, 40x30, 11 frames

var Hand =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Hand, _Enemy);

  function Hand(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 40;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 30;

    _classCallCheck(this, Hand);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hand).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.movementSpeed = 7;
    _this.yVelocity = 0;
    _this.distance = 125;
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = 0; //updated in relevant state updates

    _this.boundHeight = 0;
    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight + 10;
    _this.facing = -1; //Stats

    _this.pointValue = 10;
    _this.sightRadius[0] = 4000;
    _this.sightRadius[1] = 700;
    _this.health = 50; //three normal hits.

    _this.damage = 1;
    _this.throwtime = 4;
    _this.cooldown = 120;
    _this.cooldownvariance = 20;
    _this.cooldownTimer = 0;
    _this.states = {
      "idling": true,
      "starting": false,
      "throwing": false,
      "hasThrown": false,
      "recovering": false,
      "facingRight": false
    };
    _this.animations = {
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 9, 11, 5, 1, true, _this.scale),
      "startup": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 9, 11, 5, 4, false, _this.scale, 1),
      "throw": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 9, 11, 3, 1, true, _this.scale, 5),
      "recover": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 9, 11, 6, 3, false, _this.scale, 6)
    };
    _this.animation = _this.animations.idle;
    return _this;
  }

  _createClass(Hand, [{
    key: "update",
    value: function update() {
      if (this.x - this.game.hero.x < 0) {
        this.states.facingRight = true;
        this.facing = 1;
      } else {
        this.states.facingRight = false;
        this.facing = -1;
      }

      if (this.states.idling) {
        this.updateHitbox(40, 30, 20, 5, 0, 10);
        this.damage = 0; //insert attack behavior. Loops for now.

        if (Math.abs(this.x - this.game.hero.x) <= this.sightRadius[0] && Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1] && this.cooldownTimer <= 0) {
          this.animation.reset();
          this.animation.reset();
          this.states.idling = false;
          this.states.starting = true;
        }
      }

      if (this.states.starting) {
        this.damage = 1;
        this.updateHitbox(40, 30, 20, 20, 0, 10);

        if (this.animation.isDone()) {
          this.states.starting = false;
          this.states.throwing = true;
          this.animation.reset();
        }
      }

      if (this.states.throwing) {
        if (!this.states.hasThrown) {
          this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Bomb"](this.game, this.x + this.facing * 10, this.y - 20, this.img, this.ctx, this.scale, this.spriteWidth, this.spriteHeight, this.states.facingRight, Math.abs(this.x - this.game.hero.x) / this.distance)); //value of 75 explodes on stationary Hero

          this.states.hasThrown = true;
        }

        if (this.animation.loops > this.throwtime) {
          this.animation.reset();
          this.animation.reset();
          this.states.hasThrown = false;
          this.states.throwing = false;
          this.states.recovering = true;
        }
      }

      if (this.states.recovering) {
        this.damage = 0;

        if (this.animation.isDone()) {
          this.states.idling = true;
          this.states.recovering = false;
          this.animation.reset();
          this.cooldownTimer = this.cooldown;
        }
      }

      if (this.cooldownTimer > 0) {
        this.cooldownTimer--;
      }

      this.yVelocity += this.gravity * this.gravity;
      this.lastBoundY = this.boundY;
      this.updatePos(0, this.yVelocity);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.idling) {
        this.animation = this.animations.idle;
      }

      if (this.states.starting) {
        this.animation = this.animations.startup;
      }

      if (this.states.throwing) {
        this.animation = this.animations.throw;
      }

      if (this.states.recovering) {
        this.animation = this.animations.recover;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight, xOff, yOff) {
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2 + xOff;
      this.boundY = this.y - this.boundHeight + yOff;
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Terrain") {
        //TODO Add collision with terrain
        if (direction === 'bottom') {
          this.boundY = other.boundY - this.boundHeight;
          this.y = this.boundY + this.boundHeight - 10;
          this.yVelocity = 0;
        } else if (direction === 'top') {
          this.boundY = other.boundY + other.boundHeight;
          this.y = this.boundY + this.boundHeight - 10;
          this.yVelocity = 0;
          this.lastBoundY = this.boundY;
        } //else if (direction === 'left') {
        //    this.boundX = other.boundX + other.boundWidth;
        //    this.x = this.boundX + 87;
        //    this.states.facingRight = true;
        //    this.facing = -1;
        //}
        //else if (direction === 'left') {
        //    this.boundX = other.boundX + other.boundWidth;
        //    this.x = this.boundX - 87;
        //    this.states.facingRight = false;
        //    this.facing = 1;
        //}

      }

      if (other.name === "Projectile" && !this.states.hurt) {//nothing for now
      }

      if (other.name === "Hurtbox" && !this.states.hurt) {
        other.hasOwnProperty("isEnemy");
        other.hasOwnProperty("damage");

        if (!other.isEnemy) {
          this.removeFromWorld = true;
        }
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Hand;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Hand);

/***/ }),

/***/ "./src/entities/hazards.js":
/*!*********************************!*\
  !*** ./src/entities/hazards.js ***!
  \*********************************/
/*! exports provided: Lava, Fireball, Spikes, ProjectileHazard, ProjectileCircle, Launcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lava", function() { return Lava; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fireball", function() { return Fireball; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spikes", function() { return Spikes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectileHazard", function() { return ProjectileHazard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectileCircle", function() { return ProjectileCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Launcher", function() { return Launcher; });
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
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
game - a reference to the game in which this entity exists
x, y - entity's coordinates
removeFromWorld - a flag that denotes when to remove this entity from the game
************/

var Lava =
/*#__PURE__*/
function (_Entity) {
  _inherits(Lava, _Entity);

  function Lava(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 64;

    _classCallCheck(this, Lava);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Lava).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.type = "Hazard";
    _this.y += 96 * 3 - 6 * 3;
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = 128;
    _this.centerX = x + _this.spriteWidth * _this.scale / 2 - _this.spriteWidth;
    _this.boundWidth = _this.spriteWidth * _this.scale;
    _this.boundHeight = _this.scale * (_this.spriteHeight - 32);
    _this.boundX = _this.x - _this.spriteWidth;
    _this.boundY = _this.y - _this.spriteHeight * _this.scale + 37 * _this.scale;
    _this.fireCooldownTimer = 0;
    _this.fireCooldown = 1000;
    _this.damage = 1; //this.game.hero.x.maxHealth

    _this.states = {
      "active": true,
      "facingRight": true
    };
    _this.animations = {
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, 128], 7, 1, 7, 8, true, _this.scale)
    };
    _this.animation = _this.animations.active;
    return _this;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(Lava, [{
    key: "update",
    value: function update() {////Have Lava spawn fireballs **I don't like this, but I'm leaving the code for posterity's sake.**
      //if (Math.abs(this.x - this.game.hero.x) <= 500 && this.fireCooldownTimer <= 0) {
      //    this.game.addEntity(new Fireball(this.game, this.x - 32, this.y - this.spriteHeight*2, this.img, this.ctx, 4, 15));
      //    this.fireCooldownTimer = this.fireCooldown;
      //}
      //if (this.fireCooldownTimer > 0) {
      //    this.fireCooldownTimer--;
      //}
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.active) this.drawImg(ctx);
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Lava;
}(___WEBPACK_IMPORTED_MODULE_1__["Entity"]);

var Fireball =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Fireball, _Enemy);

  function Fireball(game, x, y) {
    var _this2;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var cooldown = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 150;
    var ySpeed = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 12;
    var spawnOffset = arguments.length > 8 ? arguments[8] : undefined;

    _classCallCheck(this, Fireball);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Fireball).call(this, game, x, y, img, ctx));
    _this2.parentClass = "Enemy";
    _this2.type = "Hazard";
    _this2.scale = scale;
    _this2.spriteWidth = 60;
    _this2.spriteHeight = 60;
    _this2.centerX = x + _this2.spriteWidth * _this2.scale / 2 - _this2.spriteWidth;
    _this2.boundWidth = 6 * _this2.scale;
    _this2.boundHeight = 20 * _this2.scale;
    _this2.boundX = _this2.centerX - _this2.boundWidth / 2;
    _this2.boundY = _this2.y - _this2.spriteHeight * _this2.scale / 2;
    _this2.origX = _this2.x;
    _this2.origY = _this2.y;
    _this2.origBoundX = _this2.boundX;
    _this2.origBoundY = _this2.boundY;
    _this2.ySpeed = ySpeed;
    _this2.damage = 2;
    _this2.cooldownTimer = spawnOffset;
    _this2.cooldown = cooldown;
    _this2.states = {
      "active": true,
      "start": true,
      "middle_up": false,
      "peak_up": false,
      "peak_down": false,
      "middle_down": false,
      "finish": false,
      "facingRight": true
    };
    _this2.animations = {
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 6, true, _this2.scale, 6),
      "start": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 6),
      "middle_up": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 7),
      "peak_up": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 8),
      "peak_down": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 9),
      "middle_down": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 10),
      "finish": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 11)
    };
    _this2.animation = _this2.animations.start;
    console.log(_this2.gravity);
    return _this2;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(Fireball, [{
    key: "update",
    value: function update() {
      if (this.states.active) {
        if (this.states.start) {
          if (this.animation.loops == 1) {
            if (Math.abs(this.x - this.game.hero.x) < 1000 && Math.abs(this.y - this.game.hero.y) < 1000) {
              this.game.playSound("lava_ball", 0.5);
            }
          }

          this.updatePos(0, -1 * this.ySpeed);

          if (this.animation.loops > 5) {
            this.animation.reset();
            this.animation.reset();
            this.states.start = false;
            this.states.middle_up = true;
          }
        }

        if (this.states.middle_up) {
          this.updatePos(0, -.5 * this.ySpeed);

          if (this.animation.loops > 3) {
            this.animation.reset();
            this.animation.reset();
            this.states.middle_up = false;
            this.states.peak_up = true;
          }
        }

        if (this.states.peak_up) {
          this.updatePos(0, -.1 * this.ySpeed);

          if (this.animation.loops > 2) {
            this.animation.reset();
            this.animation.reset();
            this.states.peak_up = false;
            this.states.peak_down = true;
          }
        }

        if (this.states.peak_down) {
          this.updatePos(0, .1 * this.ySpeed);

          if (this.animation.loops > 2) {
            this.animation.reset();
            this.animation.reset();
            this.states.peak_down = false;
            this.states.middle_down = true;
          }
        }

        if (this.states.middle_down) {
          this.updatePos(0, .5 * this.ySpeed);

          if (this.animation.loops > 3) {
            this.animation.reset();
            this.animation.reset();
            this.states.middle_down = false;
            this.states.finish = true;
          }
        }

        if (this.states.finish) {
          this.updatePos(0, this.ySpeed);

          if (this.animation.loops > 5) {
            this.animation.reset();
            this.animation.reset();
            this.states.finish = false;
            this.states.start = true;
            this.states.active = true;
            this.cooldownTimer = this.cooldown;
            this.x = this.origX;
            this.y = this.origY;
            this.boundX = this.origBoundX;
            this.boundY = this.origBoundY;
          }
        }
      }

      if (this.cooldownTimer > 0) {
        this.cooldownTimer--;
        this.states.active = false;
      } else {
        this.states.active = true;
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.start) {
        this.animation = this.animations.start;
      }

      if (this.states.middle_up) {
        this.animation = this.animations.middle_up;
      }

      if (this.states.peak_up) {
        this.animation = this.animations.peak_up;
      }

      if (this.states.peak_down) {
        this.animation = this.animations.peak_down;
      }

      if (this.states.middle_down) {
        this.animation = this.animations.middle_down;
      }

      if (this.states.finish) {
        this.animation = this.animations.finish;
      }

      if (this.states.active) {
        this.drawImg(ctx);
      }
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Fireball;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

var Spikes =
/*#__PURE__*/
function (_Entity2) {
  _inherits(Spikes, _Entity2);

  function Spikes(game, x, y) {
    var _this3;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var active = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var timer = arguments.length > 7 ? arguments[7] : undefined;
    var timeOffset = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var length = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var interval = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 20;

    _classCallCheck(this, Spikes);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Spikes).call(this, game, x, y, img, ctx));
    _this3.parentClass = "Entity";
    _this3.type = "Hazard";
    _this3.scale = scale;
    _this3.spriteWidth = 60;
    _this3.spriteHeight = 60;
    _this3.centerX = x + _this3.spriteWidth * _this3.scale / 2 - _this3.spriteWidth;
    _this3.boundWidth = _this3.scale * (_this3.spriteWidth - 28);
    _this3.boundHeight = _this3.scale * (_this3.spriteHeight / 2 + 3);
    _this3.boundX = _this3.x - _this3.spriteWidth + _this3.scale * 14;
    _this3.boundY = _this3.y - _this3.spriteHeight * _this3.scale + 37 * _this3.scale;
    _this3.spikeCooldownTimer = timeOffset;
    _this3.spikeCooldown = timer;
    _this3.damage = 1; //this.game.hero.maxHealth

    _this3.interval = interval;
    _this3.states = {
      "active": false,
      "inactive_up": !active,
      //"inactive_up_spawned": false, //Doesn't work, unused for now
      "inactive_down": active,
      "facingRight": true
    };
    _this3.animations = {
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this3.img, [_this3.spriteWidth, _this3.spriteHeight], 9, 6, 5, 5, false, _this3.scale, 1),
      "inactive_up": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this3.img, [_this3.spriteWidth, _this3.spriteHeight], 9, 6, 10, 1, true, _this3.scale, 3),
      "inactive_down": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this3.img, [_this3.spriteWidth, _this3.spriteHeight], 9, 6, 3, 1, true, _this3.scale)
    };
    _this3.animation = _this3.animations.inactive_down;

    if (length > 0) {
      var nextOffset = timeOffset + _this3.interval;
      length--;

      _this3.game.addEntity(new Spikes(_this3.game, _this3.x + _this3.spriteWidth, _this3.y, _this3.img, ctx, 2, _this3.active, _this3.spikeCooldown, nextOffset, length, _this3.interval));
    }

    return _this3;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(Spikes, [{
    key: "update",
    value: function update() {
      if (this.states.active && this.spikeCooldownTimer === 0) {
        if (this.animation.currentFrame() !== 1 && this.animation.currentFrame() !== 5) {
          this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX + 19, this.boundY, -this.spriteWidth - .5 * this.boundWidth, 0, this.spriteWidth / 2, this.spriteHeight / 2, this.boundWidth - 13, this.boundHeight - 42, this.scale, this.damage, this.states.facingRight, "health", 2, true));
        } else {
          this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX + 19, this.boundY, -this.spriteWidth - .5 * this.boundWidth, 0, this.spriteWidth / 2, this.spriteHeight / 2, this.boundWidth - 13, this.boundHeight - 56, this.scale, this.damage, this.states.facingRight, "health", 2, true));
        }

        if (this.animation.isDone()) {
          this.animation.reset();
          this.states.active = false;
          this.states.inactive_down = true;
          this.spikeCooldownTimer = this.spikeCooldown;
        }
      }

      if (this.spikeCooldownTimer > 0) {
        this.spikeCooldownTimer--;
      }

      if (this.states.inactive_down) {
        if (this.spikeCooldownTimer === 0) {
          this.animation.reset();
          this.states.active = true;
          this.states.inactive_down = false; //this.spikeCooldownTimer = this.spikeCooldown;
        }
      } else if (this.states.inactive_up) {
        if (Math.abs(this.x - this.game.hero.x) < 300 && Math.abs(this.y - this.game.hero.y) < 300) {
          this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX + 3, this.boundY, -this.spriteWidth - .5 * this.boundWidth, 0, this.spriteWidth / 2, this.spriteHeight / 2, this.boundWidth - 13, this.boundHeight - 42, this.scale, this.damage, this.states.facingRight, "health", this.damage, this.states.facingRight));
        }
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.active) {
        this.animation = this.animations.active;
      }

      if (this.states.inactive_down) {
        this.animation = this.animations.inactive_down;
      }

      if (this.states.inactive_up) {
        this.animation = this.animations.inactive_up;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Spikes;
}(___WEBPACK_IMPORTED_MODULE_1__["Entity"]);

var ProjectileHazard =
/*#__PURE__*/
function (_Enemy2) {
  _inherits(ProjectileHazard, _Enemy2);

  function ProjectileHazard(game, x, y) {
    var _this4;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var xSpeed = arguments.length > 6 ? arguments[6] : undefined;
    var ySpeed = arguments.length > 7 ? arguments[7] : undefined;
    var directions = arguments.length > 8 ? arguments[8] : undefined;
    var lifespan = arguments.length > 9 ? arguments[9] : undefined;

    _classCallCheck(this, ProjectileHazard);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(ProjectileHazard).call(this, game, x, y, img, ctx));
    _this4.parentClass = "Enemy";
    _this4.type = "Hazard"; //this.y += 44; Give a +44 offset when instantiating 

    _this4.scale = scale;
    _this4.origX = _this4.x;
    _this4.origY = _this4.y;
    _this4.spriteWidth = 60;
    _this4.spriteHeight = 60;
    _this4.centerX = x + _this4.spriteWidth * _this4.scale / 2 - _this4.spriteWidth;
    _this4.boundWidth = _this4.scale * 8 + 3;
    _this4.boundHeight = _this4.scale * 8 + 3;
    _this4.boundX = _this4.centerX - _this4.scale * 5;
    _this4.boundY = _this4.y - _this4.spriteHeight * _this4.scale / 2 + 5 * _this4.scale;
    _this4.xSpeed = xSpeed;
    _this4.ySpeed = ySpeed;
    _this4.xDir = directions[0];
    _this4.yDir = directions[1];
    _this4.lifespan = lifespan;
    _this4.damage = 1;
    _this4.tick = 1;
    _this4.states = {
      "active": true
    };
    _this4.animations = {
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this4.img, [_this4.spriteWidth, _this4.spriteHeight], 9, 13, 3, 1, true, _this4.scale, 12)
    };
    _this4.animation = _this4.animations.active;
    return _this4;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(ProjectileHazard, [{
    key: "update",
    value: function update() {
      this.updatePos(this.xSpeed * this.xDir, this.ySpeed * this.yDir);

      if (this.lifespan > 0) {
        this.lifespan--;
      } else {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Terrain") {
        this.removeFromWorld = true;
      } //TODO refactor this (artifact from instanceof days)
      else if (other.name === "Actor" && !(other.name === "Enemy")) {
          //Hero collision
          if (other.name === "Projectile") {
            if (this.tick === 0) {
              this.removeFromWorld = true;
            }

            this.tick--;
            other.health -= 1;
          } else {
            this.removeFromWorld = true;
          }
        } else if (other.name === "Hurtbox") {
          //other.hasOwnProperty("isEnemy");
          //other.hasOwnProperty("damage");
          if (!other.isEnemy) {
            this.removeFromWorld = true;
          }
        }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.active) {
        this.animation = this.animations.active;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return ProjectileHazard;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

var ProjectileCircle =
/*#__PURE__*/
function (_Enemy3) {
  _inherits(ProjectileCircle, _Enemy3);

  function ProjectileCircle(game, x, y) {
    var _this5;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var xSpeed = arguments.length > 6 ? arguments[6] : undefined;
    var ySpeed = arguments.length > 7 ? arguments[7] : undefined;
    var radius = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 10;
    var timer = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 100;

    _classCallCheck(this, ProjectileCircle);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ProjectileCircle).call(this, game, x, y, img, ctx));
    _this5.parentClass = "Enemy";
    _this5.type = "Hazard"; //this.y += 44; Give a +44 offset when instantiating 

    _this5.scale = scale;
    _this5.origX = _this5.x;
    _this5.origY = _this5.y;
    _this5.radius = radius;
    _this5.timer = timer;

    _this5.updatePos(0, -_this5.radius);

    _this5.spriteWidth = 60;
    _this5.spriteHeight = 60;
    _this5.centerX = x + _this5.spriteWidth * _this5.scale / 2 - _this5.spriteWidth;
    _this5.boundWidth = _this5.scale * 8 + 3;
    _this5.boundHeight = _this5.scale * 8 + 3;
    _this5.boundX = _this5.centerX - _this5.scale * 5;
    _this5.boundY = _this5.y - _this5.spriteHeight * _this5.scale / 2 + 5 * _this5.scale;
    _this5.xSpeed = xSpeed;
    _this5.ySpeed = ySpeed;
    _this5.quadrants = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
    _this5.quadrant = 0;
    _this5.damage = 1;
    _this5.tick = 1;
    _this5.states = {
      "active": true
    };
    _this5.animations = {
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this5.img, [_this5.spriteWidth, _this5.spriteHeight], 9, 13, 3, 1, true, _this5.scale, 12)
    };
    _this5.animation = _this5.animations.active;
    return _this5;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(ProjectileCircle, [{
    key: "update",
    value: function update() {
      if (this.x - this.origX >= 0 && this.y - this.origY <= 0) {
        this.quadrant = 0;
      } else if (this.x - this.origX >= 0 && this.y - this.origY > 0) {
        this.quadrant = 1;
      } else if (this.x - this.origX < 0 && this.y - this.origY > 0) {
        this.quadrant = 2;
      } else if (this.x - this.origX < 0 && this.y - this.origY <= 0) {
        this.quadrant = 3;
      }

      this.updatePos(this.xSpeed * this.quadrants[this.quadrant][0], this.ySpeed * this.quadrants[this.quadrant][1]);
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {//// collide with terrain
      //if (other.name === "Terrain") {
      //    this.removeFromWorld = true;
      //}
      ////TODO refactor this (artifact from instanceof days)
      //else if (other.name === "Actor" && !(other.name === "Enemy")) {//Hero collision
      //    if (other.name === "Projectile") {
      //        if (this.tick === 0) {
      //            this.removeFromWorld = true;
      //        }
      //        this.tick--;
      //        other.health -= 1;
      //    } else {
      //        this.removeFromWorld = true;
      //    }
      //}
      //else if (other.name === "Hurtbox") {
      //    //other.hasOwnProperty("isEnemy");
      //    //other.hasOwnProperty("damage");
      //    if (!other.isEnemy) {
      //        this.removeFromWorld = true;
      //    }
      //}
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.active) {
        this.animation = this.animations.active;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return ProjectileCircle;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

var Launcher =
/*#__PURE__*/
function (_Entity3) {
  _inherits(Launcher, _Entity3);

  function Launcher(game, x, y) {
    var _this6;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var xSpeed = arguments.length > 6 ? arguments[6] : undefined;
    var ySpeed = arguments.length > 7 ? arguments[7] : undefined;
    var directions = arguments.length > 8 ? arguments[8] : undefined;
    var cooldown = arguments.length > 9 ? arguments[9] : undefined;
    var projectileLifespan = arguments.length > 10 ? arguments[10] : undefined;
    var launchTimeOffset = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;

    _classCallCheck(this, Launcher);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Launcher).call(this, game, x, y, img, ctx));
    _this6.parentClass = "Entity";
    _this6.type = "Hazard"; //this.y += 44; Give a +44 offset when instantiating 

    _this6.scale = scale;
    _this6.spriteWidth = 60;
    _this6.spriteHeight = 60;
    _this6.centerX = x + _this6.spriteWidth * _this6.scale / 2 - _this6.spriteWidth;
    _this6.boundWidth = _this6.scale * 8;
    _this6.boundHeight = _this6.scale * 8;
    _this6.boundX = _this6.x - _this6.spriteWidth + _this6.scale * 8;
    _this6.boundY = _this6.y - _this6.spriteHeight * _this6.scale + 8 * _this6.scale;
    _this6.xSpeed = xSpeed;
    _this6.ySpeed = ySpeed;
    _this6.xDir = directions[0];
    _this6.yDir = directions[1];
    _this6.shotCooldownTimer = launchTimeOffset;
    _this6.shotCooldown = cooldown;
    _this6.projectileLifespan = projectileLifespan;
    _this6.states = {
      "active": true
    };
    _this6.animations = {
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this6.img, [_this6.spriteWidth, _this6.spriteHeight], 9, 13, 3, 1, true, _this6.scale, 20)
    };
    _this6.animation = _this6.animations.active;
    return _this6;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(Launcher, [{
    key: "update",
    value: function update() {
      if (
      /*Math.abs(this.x - this.game.hero.x) <= 5000 &&*/
      this.shotCooldownTimer === 0) {
        this.game.addEntity(new ProjectileHazard(this.game, this.x - this.spriteWidth, this.y - this.spriteHeight, this.img, this.ctx, this.scale, this.xSpeed, this.ySpeed, [this.xDir, this.yDir], this.projectileLifespan));
        this.shotCooldownTimer = this.shotCooldown;
      }

      if (this.shotCooldownTimer > 0) {
        this.shotCooldownTimer--;
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.drawImg(ctx);
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      //this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);
      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Launcher;
}(___WEBPACK_IMPORTED_MODULE_1__["Entity"]);



/***/ }),

/***/ "./src/entities/hero.js":
/*!******************************!*\
  !*** ./src/entities/hero.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var _terrain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terrain */ "./src/entities/terrain.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectile */ "./src/entities/projectile.js");
/* harmony import */ var _projectile_sword__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectile-sword */ "./src/entities/projectile-sword.js");
/* harmony import */ var _soldier_shield__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./soldier-shield */ "./src/entities/soldier-shield.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enemy */ "./src/entities/enemy.js");
/* harmony import */ var _hurtbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hurtbox */ "./src/entities/hurtbox.js");
/* harmony import */ var _reflectbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reflectbox */ "./src/entities/reflectbox.js");
/* harmony import */ var _hazards__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./hazards */ "./src/entities/hazards.js");
/* harmony import */ var _rocket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rocket */ "./src/entities/rocket.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var Hero =
/*#__PURE__*/
function (_Actor) {
  _inherits(Hero, _Actor);

  function Hero(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 60;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 60;

    _classCallCheck(this, Hero);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hero).call(this, game, x, y, img, ctx));
    _this.parentClass = "Actor";
    _this.origY = _this.y; //For jumping

    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.yVelocity = 0;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = 60;
    _this.boundHeight = 110;
    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight;
    _this.lastBoundY = _this.boundY; // This will help stop Hero from slipping at edges, particularly for horizontally longer blocks of terrain

    /***STATS***/

    _this.movementSpeed = 8;
    _this.dashSpeed = 17;
    _this.jumpStrength = 20;
    _this.jumpsLeft = 2;
    _this.maxJumps = 2;
    _this.terminalVelocity = 15;
    _this.maxHealth = 30;
    _this.maxEnergy = 30;
    _this.energy = 30;
    _this.health = 30;
    _this.slashEnergyCost = 25;
    _this.cleaveEnergyCost = 15;
    _this.shootCost = 2;
    _this.shootEnergyCost = 10;
    _this.dashEnergyCost = 7;
    _this.stunDir = 0;
    _this.multiplier = 1;
    _this.difficulty = 1; //Timers

    _this.damageCooldownTimer = 0;
    _this.damageCooldown = 16;
    _this.energyCooldownTimer = 0;
    _this.energyCooldown = 15 / (_this.multiplier * 2);
    _this.energyCooldownMin = 15 / (_this.multiplier * 2);
    _this.energyDelay = 20;
    _this.energyDelayTimer = 0;
    _this.velocityCooldown = 2;
    _this.velocityCooldownTimer = 0;
    _this.jumpTimer = 0;
    _this.jumpCooldown = 20;
    _this.shootCooldownTimer = 0;
    _this.shootCooldown = 0; //DEV TOOLS

    _this.godModeEnergyMin = 0;
    _this.notGodModeEnergyMin = _this.energyCooldownMin;
    _this.godEnergyDelay = 0;
    _this.notGodEnergyDelay = _this.energyDelay;
    _this.states = {
      "energized": false,
      "invulnerable": false,
      "running": false,
      "jumping": false,
      "dashing": false,
      "energyDash": false,
      "dashingStart": false,
      "dashingMid": false,
      "dashingEnd": false,
      "hasDashed": false,
      "shooting": false,
      "hasShot": false,
      //TODO Implement to replace shotlocked
      "slashing": false,
      "hasSlashed": false,
      "cleaving": false,
      "hasCleaved": false,
      "shotlocked": false,
      "framelocked": false,
      "stunned": false,
      "dead": false,
      "respawned": false,
      "grounded": true,
      "hasGravity": true,
      "facingRight": true,
      "isGod": false,
      "active": true
    };
    _this.animations = {
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, _this.scale),
      //50x50
      "stun": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 0, 13, 4, 4, false, _this.scale, 9),
      "dead": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 0, 18, 5, 5, true, _this.scale, 13),
      "run": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 1, 22, 3, 11, true, _this.scale),
      //50x50
      //Takeoff?
      "ascend": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 8, 3, 4, true, _this.scale, 2),
      //50x50
      "descend": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 14, 3, 4, true, _this.scale, 8),
      //50x50
      //Land?
      "airshoot": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 20, 3, 6, false, _this.scale, 14),
      //50x50
      "shoot": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [80, 60], 3, 3, 6, 3, false, _this.scale),
      //80x60
      "gunrun": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [60, 60], 1, 22, 3, 11, true, _this.scale, 11),
      //50x50
      "slash": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [90, 60], 4, 11, 2, 11, false, _this.scale),
      //80x50
      "cleave": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [100, 70], 9, 13, 2, 13, false, _this.scale),
      //80x60
      "dash": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [60, 60], 5, 7, 3, 7, false, _this.scale),
      "dash_start": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [60, 60], 5, 7, 3, 1, false, _this.scale),
      "dash_mid": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [60, 60], 5, 7, 3, 5, false, _this.scale, 1),
      "dash_end": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [60, 60], 5, 7, 3, 1, false, _this.scale, 5)
    };
    return _this;
  }

  _createClass(Hero, [{
    key: "update",
    value: function update() {
      //TODO (maybe) find a better solution to the framelocked logic. (Too many exceptions for things like slash)
      //Dev Tool Updates
      if (this.states.active) {
        if (this.setPosTimer > 0) {
          this.setPosTimer--;
        }

        if (this.godToggleTimer > 0) {
          this.godToggleTimer--;
        } /////////// all button checks go here ///////////
        // KEY DOWN
        //run right


        if (this.game.controlKeys[this.game.controls.right].active && !this.states.framelocked
        /*&& this.states.canRun*/
        ) {
            if (!this.states.facingRight) {
              this.states.facingRight = true;
            }

            ;
            this.states.running = true;
          } //run left
        else if (this.game.controlKeys[this.game.controls.left].active && !this.states.framelocked
          /*&& this.states.canRun*/
          ) {
              if (this.states.facingRight) {
                this.states.facingRight = false;
              }

              ;
              this.states.running = true;
            } //energize


        if (this.game.controlKeys[this.game.controls.energize].active) {
          this.states.energized = true;
        } //jump


        if (this.game.controlKeys[this.game.controls.jump].active && !this.states.jumping && !this.states.framelocked
        /*&& this.states.canJump*/
        ) {
            this.states.jumping = true;
            this.states.grounded = false;
          } //shoot


        if (this.game.controlKeys[this.game.controls.shoot].active && !this.states.framelocked && !this.states.shotlocked) {
          this.states.shooting = true;
        } //cleave


        if (this.game.controlKeys[this.game.controls.cleave].active && this.states.grounded && !this.states.framelocked) {
          this.animation.reset();
          this.game.playSound("sword_swing");
          this.setStates(false, false, false, true, this.states.facingRight, false, false, false, true, this.states.energized, false, false);
          this.states.cleaving = true;
          this.states.framelocked = true;
        } //slash


        if (this.game.controlKeys[this.game.controls.slash].active && this.states.grounded && (!this.states.framelocked || this.states.dashing)) {
          if (this.game.controlKeys[this.game.controls.right].active) {
            this.states.facingRight = true;
          } else if (this.game.controlKeys[this.game.controls.left].active) {
            this.states.facingRight = false;
          }

          this.animation.reset();
          this.game.playSound("sword_swing");
          this.setStates(false, false, false, false, this.states.facingRight, false, true, false, true, this.states.energized, false, false);
        } //dash


        if (this.game.controlKeys[this.game.controls.dash].active && !this.states.framelocked && !this.states.shooting) {
          if (this.energy >= this.dashEnergyCost) {
            this.states.dashing = true;
            this.states.dashingStart = true;
            this.states.hasDashed = true;
            this.states.running = false;
            this.states.framelocked = true;
          } else {
            this.game.playSound("out_of_energy");
          }
        } //KEY UP


        if (!(this.game.controlKeys[this.game.controls.right].active || this.game.controlKeys[this.game.controls.left].active) && this.states.running) {
          this.states.running = false;
        }

        if (!this.game.controlKeys[this.game.controls.energize].active) {
          this.states.energized = false;
        } ///////////// THEN do actions //////////////


        if (this.jumpTimer > 0) {
          this.jumpTimer -= 1;
        } // Running


        if (this.states.running) {
          if (this.states.facingRight) {
            this.x += this.movementSpeed; //this.centerX += this.movementSpeed;

            this.boundX += this.movementSpeed;
          } else {
            this.x -= this.movementSpeed; //this.centerX -= this.movementSpeed;

            this.boundX -= this.movementSpeed;
          }
        } //Jumping


        if (this.states.jumping) {
          this.states.jumping = false;

          if (this.jumpsLeft > 0 && this.jumpTimer == 0) {
            this.jumpsLeft -= 1;
            this.jumpTimer = this.jumpCooldown;
            this.yVelocity = 0;
            this.yVelocity -= this.jumpStrength;
          }
        } //Cleaving


        if (this.states.cleaving) {
          if (!this.states.energized && !this.states.hasReflected) {
            if (this.animation.currentFrame() >= 3 && this.animation.currentFrame() <= 6) {
              //Upper hurtbbox
              if (this.states.facingRight) this.game.addEntity(new _hurtbox__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.ctx, this.boundX, this.boundY, -230, 0, this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 150, this.states.facingRight));else this.game.addEntity(new _hurtbox__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.ctx, this.boundX, this.boundY, -70 - this.spriteWidth - 150, 0, this.spriteWidth, this.spriteHeight, 150, 50, this.scale, 150, this.states.facingRight));
            }

            if (this.animation.currentFrame() >= 3 && this.animation.currentFrame() <= 6) {
              //Lower hurtbox
              if (this.states.facingRight) this.game.addEntity(new _hurtbox__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.ctx, this.boundX, this.boundY, -60, 100, this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 150, this.states.facingRight));else this.game.addEntity(new _hurtbox__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 120, 100, this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 150, this.states.facingRight));
            }
          } else {
            if (this.states.energized && !this.states.hasReflected && this.animation.currentFrame() >= 3 && this.animation.currentFrame() <= 6) {
              if (this.energy >= this.cleaveEnergyCost) {
                if (this.states.facingRight) {
                  this.game.addEntity(new _reflectbox__WEBPACK_IMPORTED_MODULE_7__["default"](this.game, this.ctx, this.boundX, this.boundY, 30, 100, this.spriteWidth, this.spriteHeight, 40, 120, this.scale, this.states.facingRight, this, 4));
                } else {
                  this.game.addEntity(new _reflectbox__WEBPACK_IMPORTED_MODULE_7__["default"](this.game, this.ctx, this.boundX, this.boundY, 60, 100, this.spriteWidth, this.spriteHeight, 40, 120, this.scale, this.states.facingRight, this, 4));
                }

                this.useEnergy(this.cleaveEnergyCost);
                this.states.hasReflected = true;
              } else {
                this.game.playSound("out_of_energy");
              }
            }
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.cleaving = false;
            this.states.framelocked = false;
            this.states.hasReflected = false;
          }
        } //Shooting


        if (this.states.shooting && !(this.shootCooldownTimer > 0)) {
          if (!this.states.shotlocked) {
            if (this.energy >= this.shootEnergyCost && this.states.energized) {
              this.game.addEntity(new _projectile__WEBPACK_IMPORTED_MODULE_2__["default"](this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight, this.states.energized));
              this.useEnergy(this.shootEnergyCost);
              this.states.shotlocked = true;
              this.game.playSound("hero_shoot");
            } else if (this.energy >= this.shootCost && !this.states.energized) {
              this.game.addEntity(new _projectile__WEBPACK_IMPORTED_MODULE_2__["default"](this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight, false));
              this.energy -= this.shootCost;
              this.states.shotlocked = true;
              this.game.playSound("hero_shoot");
            } else {
              this.animation.reset();
              this.states.shooting = false;
              this.shootCooldownTimer = this.shootCooldown;
              this.states.framelocked = false;
              this.states.shotlocked = false;
              this.game.playSound("out_of_energy");
            }
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.shooting = false;
            this.shootCooldownTimer = this.shootCooldown;
            this.states.framelocked = false;
            this.states.shotlocked = false;
          }
        } //Slashing


        if (this.states.slashing) {
          this.states.hasGravity = true; //Fixes super-duper jump bug. (When interrupting dash, dash doesn't enter isDone() so grav isn't reset)

          if (this.animation.currentFrame() === 2 && this.states.energized && !this.states.shotlocked) {
            if (this.energy >= this.slashEnergyCost) {
              this.game.addEntity(new _projectile_sword__WEBPACK_IMPORTED_MODULE_3__["default"](this.game, this.x + 20, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
              this.states.shotlocked = true;
              this.useEnergy(this.slashEnergyCost);
            } else {
              this.game.playSound("out_of_energy");
            }
          }

          if (this.animation.currentFrame() >= 2 && this.animation.currentFrame() <= 6) {
            //Hurtbox
            if (this.states.facingRight) //facing right
              this.game.addEntity(new _hurtbox__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.ctx, this.boundX, this.boundY, -60, 100, this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));else //facing left
              this.game.addEntity(new _hurtbox__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 120, 100, this.spriteWidth, this.spriteHeight, 80, 100, this.scale, 50, this.states.facingRight));
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.slashing = false;
            this.states.hasSlashed = false;
            this.states.shotlocked = false;
            this.states.framelocked = false;
          }
        } //Dashing


        if (this.states.dashing) {
          if (this.states.facingRight) {
            this.updatePos(this.dashSpeed, 0);
          } else {
            this.updatePos(-this.dashSpeed, 0);
          } //Three part dash (better invulnerability implementation) 


          if (this.states.dashingStart) {
            if (this.states.hasDashed) {
              this.updateHitbox(60, 60, 25, 25);
              this.states.hasGravity = false;
              this.yVelocity = 0;

              if (this.energy >= this.dashEnergyCost) {
                this.energy -= this.dashEnergyCost;
                this.states.energyDash = true;
              }

              this.energyDelayTimer = this.energyDelay;
              this.states.hasDashed = false;
            }

            if (this.animation.isDone()) {
              this.animation.reset();
              this.states.dashingStart = false;
              this.updateHitbox(60, 60, 37, 15, 0, -10);
              this.states.dashingMid = true;
              if (this.states.energyDash) this.states.invulnerable = true;
            }
          } else if (this.states.dashingMid) {
            if (this.animation.isDone()) {
              this.animation.reset();
              this.states.invulnerable = false;
              this.states.energyDash = false;
              this.states.dashingMid = false;
              this.states.dashingEnd = true;
              this.updateHitbox(60, 60, 25, 25);
            }
          } else if (this.states.dashingEnd) {
            if (this.animation.isDone()) {
              this.animation.reset();
              this.states.hasDashed = false;
              this.states.dashingEnd = false;
              this.states.dashing = false;
              this.states.hasGravity = true;
              this.states.framelocked = false;
              this.updateHitbox(50, 50, 20, 35);
            }
          }
        } //Stunned


        if (this.states.stunned) {
          //move away from the direction of the attack
          this.x += this.stunDir * 1;
          this.states.hasGravity = false;
          this.yVelocity = 0;

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.stunned = false;
            this.states.framelocked = false;
            this.damageCooldownTimer = this.damageCooldown;
            this.states.hasGravity = true;
            this.multiplier = 1;
          }
        } //DEAD


        if (this.states.dead) {
          if (this.animation.loops > 3) {
            this.animation.reset();
            this.states.dead = false;
            this.states.respawned = true;
          }
        } //Respawn


        if (this.states.respawned) {} //respawn (can define things like activity cooldown, respawn animation, etc...)
        //Timer Checks


        if (this.energyDelayTimer > 0) {
          this.energyDelayTimer--;
        } else {
          if (this.energyCooldownTimer > 0) {
            this.energyCooldownTimer--;
          } else if (this.energy < this.maxEnergy) {
            this.energy++;

            if (this.energyCooldown > this.energyCooldownMin) {
              //energy cooldown time decreases non-linearly
              this.energyCooldown *= .5;
            } else if (this.energyCooldown - this.energyCooldownMin < -.5) {
              console.log(this.energyCooldown);
              this.energyCooldown *= 1.1;
            } else {
              console.log(this.energyCooldown);
              this.energyCooldown = this.energyCooldownMin;
            }

            this.energyCooldownTimer = this.energyCooldown;
          }
        }

        if (this.damageCooldownTimer > 0) {
          this.damageCooldownTimer--;
        }

        if (this.shootCooldownTimer > 0) {
          this.shootCooldownTimer--;
        } // update velocities based on gravity and friction


        if (this.states.hasGravity && this.yVelocity < this.terminalVelocity) {
          this.yVelocity += this.gravity * this.gravity;
        }

        this.y += this.yVelocity;
        this.lastBoundY = this.boundY;
        this.boundY += this.yVelocity; //Health checks and position checks

        if (this.health <= 0) {
          this.clearStates();
          this.states.dead = true;
          this.states.framelocked = true;
          this.states.hasGravity = false;
          this.yVelocity = 0;
        } //GOD MODE


        if (this.states.isGod) {
          this.energy = this.maxEnergy;
          this.jumpsLeft = 1;
        }
      }
    } //END Update

  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.yVelocity < 0 && !this.states.shooting) {
        //ascending
        this.updateHitbox(50, 50, 15, 30, -10, -20);
        this.animation = this.animations.ascend;
      } else if (this.yVelocity > 0 && !this.states.shooting) {
        //descending
        this.updateHitbox(50, 50, 15, 35);
        this.animation = this.animations.descend;
      } else if (this.states.running && this.animation && !this.states.shooting) {
        //gunrunning
        this.updateHitbox(50, 50, 20, 35);
        this.animation = this.animations.gunrun;
      } else if (this.states.shooting && this.states.grounded) {
        //shooting
        this.updateHitbox(70, 50, 20, 35);
        this.animation = this.animations.shoot;
      } else if (this.states.shooting && !this.states.grounded) {
        //air shooting
        this.updateHitbox(50, 50, 20, 35);
        this.animation = this.animations.airshoot;
      } else if (this.states.cleaving) {
        //cleaving
        this.updateHitbox(80, 60, 20, 35);
        this.animation = this.animations.cleave;
      } else if (this.states.slashing) {
        //slashing
        this.updateHitbox(80, 50, 20, 35);
        this.animation = this.animations.slash;
      } else if (this.states.dashingStart) {
        //dashing start
        this.animation = this.animations.dash_start;
      } else if (this.states.dashingMid) {
        //dashing mid
        this.animation = this.animations.dash_mid;
      } else if (this.states.dashingEnd) {
        //dashing end
        this.animation = this.animations.dash_end;
      } else if (this.states.stunned) {
        this.updateHitbox(50, 50, 20, 35);
        this.animation = this.animations.stun;
      } else if (this.states.dead) {
        this.animation = this.animations.dead;
      } else {
        this.updateHitbox(50, 50, 20, 35);
        this.animation = this.animations.idle;
      }

      if (this.animation && this.states.active) {
        this.drawImg(ctx);
      }
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      //TERRAIN COLLISION
      if (other.name === "Terrain" || other.name === "Spikes") {
        // Hero above terrain
        if (direction === 'bottom') {
          this.boundY = other.boundY - this.boundHeight;
          this.y = this.boundY + this.boundHeight;

          if (this.yVelocity > 0) {
            this.yVelocity = 0;
          }

          this.jumpsLeft = this.maxJumps;
          this.states.jumping = false;
          this.states.grounded = true;
        } // Hero jumps into terrain
        else if (direction === 'top') {
            this.boundY = other.boundY + other.boundHeight;
            this.y = this.boundY + this.boundHeight;
            this.lastBoundY = this.boundY;
            this.yVelocity = 0;
          } // Hero collides with terrain to the left
          else if (direction === 'left') {
              this.boundX = other.boundX + other.boundWidth;
              this.x = this.boundX;
            } // Hero collides with terrain to the right
            else if (direction === 'right') {
                this.boundX = other.boundX - this.boundWidth;
                this.x = this.boundX;
              } //console.log(`${this.name} colliding with ${other.name} from ${direction}`);

      }

      if (other.name === "Lava" && !this.states.dead && !this.states.isGod) {
        this.clearStates();
        this.health = 0;
        this.states.stunned = true;
        this.states.framelocked = true;
        this.boundY = other.boundY - this.boundHeight;
        this.y = this.boundY + this.boundHeight - 5;
        this.game.playSound("hero_hurt");
      } //If Hero can take damage, check if...


      if (!this.states.isGod && this.damageCooldownTimer <= 0 && !this.states.invulnerable && !this.states.dead && !this.states.stunned) {
        if (other.parentClass === "Enemy" && other.name !== "Bomb") {
          if (other.damage > 0) {
            //Determine interaction based on other's damage type
            if (other.damageType === "health") {
              this.game.playSound("hero_hurt");
              this.health -= this.difficulty * other.damage; //reset states and put into stun anim and stunlock

              this.hurt(); //determine which way hero should move during stun

              if (other.states.facingRight) {
                this.stunDir = 1;
              } else {
                this.stunDir = -1;
              }

              if (this.x - other.x < 0) {
                this.boundX = other.boundX - this.boundWidth;
                this.x = this.boundX;
              } else {
                this.boundX = other.boundX + other.boundWidth;
                this.x = this.boundX;
              }
            } else if (other.damageType === "energy" && this.energy > 0) {
              this.energyCooldown = this.energyCooldownMin * 26;
              this.energy = Math.floor(this.energy / 2);
            }
          }
        }

        if (other.name === "Fireball") {
          this.game.playSound("hero_hurt");
          this.health -= other.damage;
          this.damageCooldownTimer = this.damageCooldown;
          this.hurt();

          if (other.states.facingRight) {
            this.stunDir = 1;
          } else {
            this.stunDir = -1;
          }
        }

        if (other.name === "Projectile") {
          this.health -= this.difficulty * other.damage;
          other.removeFromWorld = true;
          this.clearStates();
          this.states.stunned = true;
          this.states.framelocked = true;

          if (other.states.facingRight) {
            this.stunDir = 1;
          } else {
            this.stunDir = -1;
          }
        }

        if (other.name === "Hurtbox") {
          other.hasOwnProperty("isEnemy");
          other.hasOwnProperty("damage");

          if (other.isEnemy) {
            this.game.playSound("hero_hurt");
            this.health -= this.difficulty * other.damage;
            this.damageCooldownTimer = this.damageCooldown; //reset states and put into stun anim and stunlock

            this.clearStates();
            this.states.stunned = true;
            this.states.framelocked = true;

            if (other.states.facingRight) {
              this.stunDir = 1;
            } else {
              this.stunDir = -1;
            }
          }
        }
      }
    }
    /***HELPER CLASSES***/

  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight) {
      var offX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var offY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth + 5;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2 + offX;
      this.boundY = this.y - this.boundHeight + offY;
    }
  }, {
    key: "setStates",
    value: function setStates(running, jumping, shooting, cleaving, facingRight, grounded, slashing, shotlocked, framelocked, energized, dashing, hasDashed) {
      this.states.running = running;
      this.states.jumping = jumping;
      this.states.shooting = shooting;
      this.states.cleaving = cleaving;
      this.states.facingRight = facingRight;
      this.states.grounded = grounded;
      this.states.slashing = slashing;
      this.states.shotlocked = shotlocked;
      this.states.framelocked = framelocked;
      this.states.energized = energized;
      this.states.dashing = dashing;

      if (!this.states.dashing) {
        this.states.dashingStart = false;
        this.states.dashingMid = false;
        this.states.dashingEnd = false;
      }

      this.states.hasDashed = hasDashed;
    }
  }, {
    key: "clearStates",
    value: function clearStates() {
      this.setStates(false, false, false, false, this.states.facingRight, false, false, false, false, this.states.energized, false, false);
      this.states.hasGravity = true;
      this.states.stunned = false;
      this.states.dead = false;
    }
  }, {
    key: "hurt",
    value: function hurt() {
      this.clearStates();
      this.animation.reset();
      this.states.stunned = true;
      this.states.framelocked = true;
    }
  }, {
    key: "useEnergy",
    value: function useEnergy(cost) {
      this.energy -= cost;
      this.energyDelayTimer = this.energyDelayCooldown;
    }
  }, {
    key: "respawn",
    value: function respawn() {
      this.states.respawned = false;
      this.clearStates();
      this.yVelocity = 0;
      this.health = this.maxHealth;
      this.energy = this.maxEnergy;
      this.game.gameboard.lostScore = this.game.gameboard.score / 2;
      this.game.gameboard.score = this.game.gameboard.lostScore;
      this.multiplier = 1;
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Hero;
}(Actor);

/* harmony default export */ __webpack_exports__["default"] = (Hero);

/***/ }),

/***/ "./src/entities/hurtbox.js":
/*!*********************************!*\
  !*** ./src/entities/hurtbox.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/* For copy paste jobs:
this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, offX, offY,
    this.spriteWidth/2, this.spriteHeight/2, hurtWidth, hurtHeight, this.scale, this.damage, this.states.facingRight));   
*/

var Hurtbox =
/*#__PURE__*/
function (_Actor) {
  _inherits(Hurtbox, _Actor);

  //Note that img is required for super(), even though Hurtbox is never animated.
  function Hurtbox(game) {
    var _this;

    var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var x = arguments.length > 2 ? arguments[2] : undefined;
    var y = arguments.length > 3 ? arguments[3] : undefined;
    var offX = arguments.length > 4 ? arguments[4] : undefined;
    var offY = arguments.length > 5 ? arguments[5] : undefined;
    var parentWidth = arguments.length > 6 ? arguments[6] : undefined;
    var parentHeight = arguments.length > 7 ? arguments[7] : undefined;
    var hurtWidth = arguments.length > 8 ? arguments[8] : undefined;
    var hurtHeight = arguments.length > 9 ? arguments[9] : undefined;
    var scale = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 3;
    var damage = arguments.length > 11 ? arguments[11] : undefined;
    var facingRight = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : true;
    var isEnemy = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
    var damageType = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : "health";
    var frames = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 2;
    var persistent = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : false;
    var img = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : null;

    _classCallCheck(this, Hurtbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hurtbox).call(this, game, x, y, img, ctx));
    _this.parentClass = "Actor";
    _this.parent = null;
    _this.movementSpeed = 0;
    _this.scale = scale;
    _this.isEnemy = isEnemy;
    _this.damageType = damageType;
    _this.boundWidth = hurtWidth;
    _this.boundHeight = hurtHeight;
    _this.boundY = y - _this.boundHeight + offY;
    _this.boundX = x + parentWidth + _this.boundWidth + offX; //Stats

    _this.damage = damage;
    _this.frames = frames;
    _this.persistent = persistent;
    _this.states = {
      "facingRight": facingRight
    };
    return _this;
  }

  _createClass(Hurtbox, [{
    key: "update",
    value: function update() {
      //hitbox persists for two ticks. (two prevents random hitbox "gaps")
      if (this.frames < 0) {//persist
        //TODO: Figure out why hitbox doesn't persist
      } else if (this.frames >= 0) {
        if (this.frames === 0) {
          this.removeFromWorld = true;
        }

        this.frames--;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.drawImg(ctx);
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Terrain") {//console.log("clink");
      } else if (other.name === "Hero") {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Hurtbox;
}(___WEBPACK_IMPORTED_MODULE_1__["Actor"]);

/* harmony default export */ __webpack_exports__["default"] = (Hurtbox);

/***/ }),

/***/ "./src/entities/index.js":
/*!*******************************!*\
  !*** ./src/entities/index.js ***!
  \*******************************/
/*! exports provided: Actor, Bomb, Bullet, Camera, Crow, Dino, Enemy, Entity, Flames, GameBoard, Hand, Lava, Fireball, Spikes, ProjectileHazard, ProjectileCircle, Launcher, Hero, Hurtbox, Item, EnergyPack, HealthPack, Leo, ProjectileSword, Projectile, Reflectbox, Rocket, Shotblast, SoldierShield, TerrainMobile, Terrain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor */ "./src/entities/actor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Actor", function() { return _actor__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _bomb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bomb */ "./src/entities/bomb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bomb", function() { return _bomb__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bullet */ "./src/entities/bullet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bullet", function() { return _bullet__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./camera */ "./src/entities/camera.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _camera__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _crow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crow */ "./src/entities/crow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Crow", function() { return _crow__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _dino__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dino */ "./src/entities/dino.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dino", function() { return _dino__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enemy */ "./src/entities/enemy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Enemy", function() { return _enemy__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _flames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./flames */ "./src/entities/flames.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Flames", function() { return _flames__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game-board */ "./src/entities/game-board.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameBoard", function() { return _game_board__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./hand */ "./src/entities/hand.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hand", function() { return _hand__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _hazards__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hazards */ "./src/entities/hazards.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lava", function() { return _hazards__WEBPACK_IMPORTED_MODULE_11__["Lava"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fireball", function() { return _hazards__WEBPACK_IMPORTED_MODULE_11__["Fireball"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spikes", function() { return _hazards__WEBPACK_IMPORTED_MODULE_11__["Spikes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileHazard", function() { return _hazards__WEBPACK_IMPORTED_MODULE_11__["ProjectileHazard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileCircle", function() { return _hazards__WEBPACK_IMPORTED_MODULE_11__["ProjectileCircle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Launcher", function() { return _hazards__WEBPACK_IMPORTED_MODULE_11__["Launcher"]; });

/* harmony import */ var _hero__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./hero */ "./src/entities/hero.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hero", function() { return _hero__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _hurtbox__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./hurtbox */ "./src/entities/hurtbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hurtbox", function() { return _hurtbox__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./item */ "./src/entities/item.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return _item__WEBPACK_IMPORTED_MODULE_14__["Item"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EnergyPack", function() { return _item__WEBPACK_IMPORTED_MODULE_14__["EnergyPack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HealthPack", function() { return _item__WEBPACK_IMPORTED_MODULE_14__["HealthPack"]; });

/* harmony import */ var _leo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./leo */ "./src/entities/leo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Leo", function() { return _leo__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _projectile_sword__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./projectile-sword */ "./src/entities/projectile-sword.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileSword", function() { return _projectile_sword__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./projectile */ "./src/entities/projectile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Projectile", function() { return _projectile__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _reflectbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./reflectbox */ "./src/entities/reflectbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reflectbox", function() { return _reflectbox__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _rocket__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./rocket */ "./src/entities/rocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rocket", function() { return _rocket__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _shotblast__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./shotblast */ "./src/entities/shotblast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shotblast", function() { return _shotblast__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _soldier_shield__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./soldier-shield */ "./src/entities/soldier-shield.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SoldierShield", function() { return _soldier_shield__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _terrain_mobile__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./terrain-mobile */ "./src/entities/terrain-mobile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TerrainMobile", function() { return _terrain_mobile__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _terrain__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./terrain */ "./src/entities/terrain.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Terrain", function() { return _terrain__WEBPACK_IMPORTED_MODULE_23__["default"]; });


























/***/ }),

/***/ "./src/entities/item.js":
/*!******************************!*\
  !*** ./src/entities/item.js ***!
  \******************************/
/*! exports provided: Item, HealthPack, EnergyPack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return Item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthPack", function() { return HealthPack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnergyPack", function() { return EnergyPack; });
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Item =
/*#__PURE__*/
function (_Entity) {
  _inherits(Item, _Entity);

  function Item(game, x, y, img, ctx, width, height) {
    var _this;

    var scale = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 3;

    _classCallCheck(this, Item);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Item).call(this, game, x, y, img, ctx));
    _this.parentClass = "Entity";
    _this.width = width;
    _this.height = height;
    _this.scale = scale;
    _this.img = img;
    _this.removeFromWorld = false;
    _this.yVelocity = 0;
    _this.boundX = _this.x;
    _this.boundY = _this.y;
    _this.boundWidth = _this.width * _this.scale;
    _this.boundHeight = _this.height * _this.scale;
    return _this;
  }

  _createClass(Item, [{
    key: "on_pickup",
    value: function on_pickup() {}
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.animation.drawFrame(1, ctx, this.x + this.xOffset, this.y + this.yOffset, true);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      if (other.name === "Hero") {
        this.on_pickup(other);
      } else if (other.name === "Terrain" || other.name === "Spikes") {
        this.boundY = other.boundY - this.boundHeight;
        this.y = this.boundY + this.boundHeight;
        this.yVelocity = 0;
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.yVelocity += this.gravity * this.gravity;
      this.y += this.yVelocity;
      this.boundY += this.yVelocity;
    }
  }]);

  return Item;
}(___WEBPACK_IMPORTED_MODULE_1__["Entity"]);
/*
    A health pack that restores the Hero's health
*/


var HealthPack =
/*#__PURE__*/
function (_Item) {
  _inherits(HealthPack, _Item);

  function HealthPack(game, x, y, img, ctx, width, height) {
    var _this2;

    var scale = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 3;
    var health_value = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 15;

    _classCallCheck(this, HealthPack);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(HealthPack).call(this, game, x, y, img, ctx, width, height, scale));
    _this2.health_value = health_value;
    _this2.animation = new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this2.img, [10, 8], 0, 4, 4, 4, true, _this2.scale, 0);
    _this2.xOffset = 10;
    _this2.yOffset = -30;
    return _this2;
  }

  _createClass(HealthPack, [{
    key: "on_pickup",
    value: function on_pickup(hero) {
      if (hero.health < hero.maxHealth) hero.health += this.health_value;
      if (hero.health > hero.maxHealth) hero.health = hero.maxHealth;
      this.removeFromWorld = true;
    }
  }]);

  return HealthPack;
}(Item);
/*
   An energy pack that restores the Hero's energy
*/


var EnergyPack =
/*#__PURE__*/
function (_Item2) {
  _inherits(EnergyPack, _Item2);

  function EnergyPack(game, x, y, img, ctx, width, height) {
    var _this3;

    var scale = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 3;
    var energy_value = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 15;

    _classCallCheck(this, EnergyPack);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(EnergyPack).call(this, game, x, y, img, ctx, width, height, scale));
    _this3.energy_value = 15;
    _this3.animation = new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this3.img, [8, 8], 0, 4, 4, 4, true, _this3.scale, 0);
    _this3.xOffset = 10;
    _this3.yOffset = -30;
    return _this3;
  }

  _createClass(EnergyPack, [{
    key: "on_pickup",
    value: function on_pickup(hero) {
      if (hero.energy < hero.maxEnergy) hero.energy += this.energy_value;
      if (hero.energy > hero.maxEnergy) hero.energy = hero.maxEnergy;
      this.removeFromWorld = true;
    }
  }]);

  return EnergyPack;
}(Item);



/***/ }),

/***/ "./src/entities/leo.js":
/*!*****************************!*\
  !*** ./src/entities/leo.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Leo =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Leo, _Enemy);

  function Leo(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 80;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 60;

    _classCallCheck(this, Leo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Leo).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.origX = x; // TODO: demo

    _this.origY = y; // TODO: demo

    _this.movementSpeed = 12;
    _this.jumpSpeed = -10;
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.timerStart = Date.now(); //Contains detailed spritesheet info: [FWidth, FHeight, Row, Column, Frames (sheet width)]

    _this.sprinfo = [//each five-tuple is from a row of the sprite sheet
    [80, 60, 0, 0, 7], [50, 70, 1, 0, 5], [70, 70, 2, 0, 8], [70, 80, 3, 0, 11]]; //Actor States

    _this.states = {
      //DS3: These state and animation names are tentative.
      "lunging": true,
      //row 0; 1-3, 4-7
      "attacking": false,
      //row 3; 7-10
      "grappling": false,
      //row 3; 1-4
      "evading": false,
      //row 1; 1
      "firelunging": false,
      //row 2; 1-2, 3-6, 7-8
      "demoloop": true,
      "facingRight": false
    };
    _this.animations = {
      "lunge": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [80, 60], 0, 7, 7, 7, false, _this.scale),
      "attack": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [70, 80], 3, 11, 7, 11, false, _this.scale),
      "firelunge": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [70, 70], 2, 8, 7, 8, false, _this.scale),
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [80, 60], 3, 11, 100, 1, true, _this.scale)
    };
    _this.animation = _this.animations.lunge;
    return _this;
  }

  _createClass(Leo, [{
    key: "update",
    value: function update() {
      if (this.states.demoloop) {
        //lunge (shoulder slam)
        if (this.states.lunging && !this.states.attacking && this.animation) {
          this.spriteHeight = 80;
          this.spriteWidth = 60;

          if (this.animation.currentFrame() > 3) {
            this.x += this.movementSpeed;
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.lunging = false;
            this.states.attacking = true;
            this.y -= 40;
          }
        } //grapple/slam (shoulder slam)
        else if (!this.states.lunging && this.states.attacking && this.animation) {
            this.spriteHeight = 70;
            this.spriteWidth = 80;

            if (this.animation.isDone()) {
              this.animation.reset();
              this.states.lunging = false;
              this.states.attacking = false;
              this.states.firelunging = true;
              this.timerStart = Date.now();
              this.y += 30;
            }
          } //fire lunge
          else if (this.states.firelunging) {
              this.animation = this.animations.firelunge;
              this.spriteHeight = 70;
              this.spriteWidth = 70;

              if (this.animation.currentFrame() > 2 && this.animation.currentFrame() < 5) {
                this.x += this.movementSpeed;
              }

              if (this.animation.isDone()) {
                this.animation.reset();
                this.x = this.origX;
                this.y = this.origY;
                this.states.firelunging = false;
                this.states.lunging = true;
                this.states.attacking = false;
              }
            }
      } //Same as above, but not in "demo" form.
      //else if (this.states.lunging && !this.states.attacking && this.animation) {
      //    this.spriteHeight = 80;
      //    this.spriteWidth = 60;
      //    if (this.animation.currentFrame > 3) {
      //        this.x += this.movementSpeed;
      //    }
      //    if (this.animation.isDone()) {
      //        this.animation.reset();
      //        this.states.lunging = false;
      //        this.states.attacking = true;
      //        this.y -= 40;
      //    }
      //}
      //else if (!this.states.lunging && this.states.attacking && this.animation) {
      //    this.spriteHeight = 70;
      //    this.spriteWidth = 80;
      //    //This will potentially be used to flag different levels of "vulnerability" (ex: counterable)
      //    if (this.animation.isDone()) {
      //        this.animation.reset();
      //        this.states.lunging = false;
      //        this.states.attacking = false;
      //    }
      //    console.log("attacking");
      //}
      //else if (this.states.firelunging) {
      //    this.spriteHeight = 70;
      //    this.spriteWidth = 70;
      //    if (this.animation.currentFrame() > 2 && this.animation.currentFrame() < 5) {
      //        this.x += this.movementSpeed;
      //    }
      //    if (this.animation.elapsedTime >= this.animation.totalTime - 1) {
      //        this.animation.reset();
      //        this.x = this.origX;
      //    }
      //}
      //else {
      //        if (/*this.animation.isDone*/1) {
      //            this.states.lunging = true;
      //            this.states.attacking = false;
      //            this.x = this.origX;
      //            this.y = this.origY;
      //        }
      //}

    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.lunging && !this.states.attacking) {
        this.animation = this.animations.lunge;
      } else if (this.states.attacking && !this.states.lunging) {
        this.animation = this.animations.attack;
      } else if (this.states.firelunging) {
        this.animation = this.animations.firelunge;
      } else {
        try {//this.animation = this.animations.idle;
        } catch (e) {
          console.log("animation does not exist", e);
        }
      }

      this.animation.drawFrame(this.clockTick, ctx, this.x, this.y);
    }
  }]);

  return Leo;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Leo);

/***/ }),

/***/ "./src/entities/projectile-sword.js":
/*!******************************************!*\
  !*** ./src/entities/projectile-sword.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Projectile_Sword =
/*#__PURE__*/
function (_Actor) {
  _inherits(Projectile_Sword, _Actor);

  function Projectile_Sword(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var facingRight = arguments.length > 6 ? arguments[6] : undefined;
    var spriteWidth = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 90;
    var spriteHeight = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 60;

    _classCallCheck(this, Projectile_Sword);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Projectile_Sword).call(this, game, x, y, img, ctx));
    _this.parentClass = "Actor";
    _this.movementSpeed = 10;

    if (facingRight) {
      _this.x += 95;
    } else {
      _this.x -= 95;
    }

    ; //offset to match gun

    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = 0; //180

    _this.boundHeight = 0; //120

    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight;
    _this.lastBoundY = _this.boundY; //Stats

    _this.health = 5;
    _this.damage = 150;
    _this.states = {
      "starting": true,
      "stablized": false,
      "recovering": false,
      "facingRight": facingRight
    };
    _this.animations = {
      "start": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 4, 18, 7, 2, false, _this.scale, 11),
      "stable": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 4, 18, 7, 1, true, _this.scale, 13),
      "recovery": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 4, 18, 7, 4, false, _this.scale, 14)
    };
    _this.animation = _this.animations.start;
    return _this;
  }

  _createClass(Projectile_Sword, [{
    key: "update",
    value: function update() {
      //TODO
      if (this.states.facingRight) {
        this.x += this.movementSpeed;
        this.boundX += this.movementSpeed;
      } else {
        this.x -= this.movementSpeed;
        this.boundX -= this.movementSpeed;
      }

      if (this.states.starting) {
        if (this.animation.isDone()) {
          this.animation.reset();
          this.states.starting = false;
          this.states.stablized = true;
        }
      } else if (this.states.stablized) {
        if (this.animation.loops > 1) {
          this.animation.reset();
          this.animation.reset();
          this.states.stablized = false;
          this.states.recovering = true;
        }
      } else if (this.states.recovering) {
        if (this.animation.isDone()) {
          this.animation.reset();
          this.removeFromWorld = true;
        }
      }

      if (!this.states.recovering) {
        //Hurtbox  active unless in recovery frames
        if (this.states.facingRight) {
          var hurtbox = new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX, this.boundY, -100 - 80 - 40, 0, this.spriteWidth, this.spriteHeight, 170, 90, this.scale, this.damage, this.states.facingRight);
          hurtbox.parent = this.name;
          this.game.addEntity(hurtbox);
        } else {
          var hurtbox = new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX, this.boundY, -100 - 150 - 200 - 15, 0, this.spriteWidth, this.spriteHeight, 170, 90, this.scale, this.damage, this.states.facingRight);
          hurtbox.parent = this.name;
          this.game.addEntity(hurtbox);
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.starting) {
        this.animation = this.animations.start;
      }

      if (this.states.stablized) {
        this.animation = this.animations.stable;
      } else if (this.states.recovering) {
        this.animation = this.animations.recovery;
      }

      this.drawImg(ctx);
    } //collided(other, direction) {
    //    if (other.name ===  "Terrain") {
    //        this.removeFromWorld = true;
    //    }
    //    else if (other.name ===  "Bullet") {
    //        this.health -= other.damage;
    //    }
    //    if (this.health <= 0) {
    //        this.removeFromWorld = true;
    //    }
    //}

  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Projectile_Sword;
}(___WEBPACK_IMPORTED_MODULE_1__["Actor"]);

/* harmony default export */ __webpack_exports__["default"] = (Projectile_Sword);

/***/ }),

/***/ "./src/entities/projectile.js":
/*!************************************!*\
  !*** ./src/entities/projectile.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Projectile =
/*#__PURE__*/
function (_Actor) {
  _inherits(Projectile, _Actor);

  //Added energized (BEFORE DIMENSIONS) to choose correct projectile
  function Projectile(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var facingRight = arguments.length > 6 ? arguments[6] : undefined;
    var energized = arguments.length > 7 ? arguments[7] : undefined;
    var spriteWidth = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 60;
    var spriteHeight = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 60;

    _classCallCheck(this, Projectile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Projectile).call(this, game, x, y, img, ctx));
    _this.parentClass = "Actor";
    _this.movementSpeed = 13;

    if (facingRight) {
      _this.x += 100;
    } else {
      _this.x -= 100;
    }

    ; //offset to match gun

    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = 50;
    _this.boundHeight = 50;

    if (facingRight) {
      _this.boundX = _this.centerX - _this.boundWidth / 2 + 100; //+100 aligns with the gun

      _this.boundY = _this.y - _this.boundHeight - (_this.spriteHeight - 10); // the -10 offset accounts for the "padding" I added to each frame in the sprite sheet
    } else {
      _this.boundX = _this.centerX - _this.boundWidth / 2 - 100;
      _this.boundY = _this.y - _this.boundHeight - (_this.spriteHeight - 10);
    } //Stats


    if (energized) {
      _this.damage = 200;
      _this.health = 2;
      _this.movementSpeed = 17;
    } else {
      _this.damage = 50;
      _this.health = 1;
    }

    _this.states = {
      "green": !energized,
      "blue": energized,
      "active": true,
      "stablized": false,
      "facingRight": facingRight
    };
    _this.animations = {
      "green_exiting": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 15, 6, 8, false, _this.scale, 4),
      "green_stable": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 15, 6, 4, true, _this.scale, 11),
      "blue_exiting": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 23, 6, 8, false, _this.scale, 15),
      "blue_stable": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 23, 6, 3, true, _this.scale, 20)
    };

    if (_this.states.green) {
      _this.animation = _this.animations.green_exiting;
    } else {
      _this.animation = _this.animations.blue_exiting;
    }

    return _this;
  }

  _createClass(Projectile, [{
    key: "update",
    value: function update() {
      //TODO
      if (this.states.facingRight) {
        this.x += this.movementSpeed;
        this.boundX += this.movementSpeed;
      } else {
        this.x -= this.movementSpeed;
        this.boundX -= this.movementSpeed;
      }

      if (this.states.active) {
        if (this.animation.isDone()) {
          this.animation.reset();
          this.states.active = false;
          this.states.stablized = true;
        }
      } else if (this.states.stablized) {
        if (this.animation.loops > 1) {
          this.animation.reset();
          this.animation.reset();
          this.states.stablized = false;
          this.removeFromWorld = true;
        }
      }

      if (this.health <= 0) {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.green) {
        if (this.states.active) {
          this.animation = this.animations.green_exiting;
        }

        if (this.states.stablized) {
          this.animation = this.animations.green_stable;
        }

        this.drawImg(ctx);
      } else if (this.states.blue) {
        if (this.states.active) {
          this.animation = this.animations.blue_exiting;
        }

        if (this.states.stablized) {
          this.animation = this.animations.blue_stable;
        }

        this.drawImg(ctx);
      }
    }
    /*COLLISION*/

  }, {
    key: "collided",
    value: function collided(other, direction) {
      //commented is for eventual implementation of projectile "armor"/toughness.
      if (other.name === "Terrain") {
        this.removeFromWorld = true;
      } //else if (other.name ===  "Bullet") {
      //    this.health -= other.damage;
      //}
      else if (other.parentClass === "Enemy") {
          this.removeFromWorld = true;
        } //if (this.health <= 0) {
      //    this.removeFromWorld = true;
      //} 

    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Projectile;
}(___WEBPACK_IMPORTED_MODULE_1__["Actor"]);

/* harmony default export */ __webpack_exports__["default"] = (Projectile);

/***/ }),

/***/ "./src/entities/reflectbox.js":
/*!************************************!*\
  !*** ./src/entities/reflectbox.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/* For copy paste jobs:
    this.game.addEntity(new Hurtbox(this.game, this.ctx, this.x, this.y, offX, offY,
        this.spriteWidth/2, this.spriteHeight/2, hurtWidth, hurtHeight, this.scale, this.damage, this.states.facingRight));   
 */

var Reflectbox =
/*#__PURE__*/
function (_Actor) {
  _inherits(Reflectbox, _Actor);

  //Note that img is required for super(), even though Reflectbox is never animated.
  function Reflectbox(game) {
    var _this;

    var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var x = arguments.length > 2 ? arguments[2] : undefined;
    var y = arguments.length > 3 ? arguments[3] : undefined;
    var offX = arguments.length > 4 ? arguments[4] : undefined;
    var offY = arguments.length > 5 ? arguments[5] : undefined;
    var parentWidth = arguments.length > 6 ? arguments[6] : undefined;
    var parentHeight = arguments.length > 7 ? arguments[7] : undefined;
    var hurtWidth = arguments.length > 8 ? arguments[8] : undefined;
    var hurtHeight = arguments.length > 9 ? arguments[9] : undefined;
    var scale = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 3;
    var facingRight = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : true;
    var parent = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : null;
    var frames = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 2;
    var img = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : null;

    _classCallCheck(this, Reflectbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Reflectbox).call(this, game, x, y, img, ctx));
    _this.parentClass = "Actor";
    _this.parent = parent;
    _this.movementSpeed = 0;
    _this.scale = scale;
    _this.boundWidth = hurtWidth;
    _this.boundHeight = hurtHeight;
    _this.boundY = y - _this.boundHeight + offY;

    if (facingRight) {
      _this.boundX = x + parentWidth + _this.boundWidth + offX;
    } else {
      _this.boundX = x - _this.boundWidth - offX;
    } //Stats


    _this.frames = frames;

    if (facingRight) {
      _this.facing = 1;
    } else {
      _this.facing = -1;
    }

    _this.states = {
      "facingRight": facingRight
    };
    return _this;
  }

  _createClass(Reflectbox, [{
    key: "update",
    value: function update() {
      //hitbox persists for two ticks. (two prevents random hitbox "gaps")
      if (this.frames >= 0) {
        if (this.frames === 0) {
          this.removeFromWorld = true;
        }

        this.frames--;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.drawImg(ctx);
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Bullet") {
        console.log("SUCCESS!"); //other.states.facingRight = !other.states.facingRight;
        //other.name = "Projectile";
        //other.damage = 1;
      }

      if (other.name === "Rocket") {
        console.log("NO SOUP FOR YOU!");
        other.pointValue = 5;
        other.removeFromWorld = true;

        if (this.parent !== null) {
          //this.parent.energy += 10;
          this.parent.energyCooldown /= 4.2;
        }
      }

      if (other.name === "Bomb") {
        other.xVelocity = -this.facing * 5;
        other.yVelocity = -20;
        other.damage = 50;
        other.states.reflected = true;
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Reflectbox;
}(___WEBPACK_IMPORTED_MODULE_1__["Actor"]);

/* harmony default export */ __webpack_exports__["default"] = (Reflectbox);

/***/ }),

/***/ "./src/entities/rocket.js":
/*!********************************!*\
  !*** ./src/entities/rocket.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Rocket =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Rocket, _Enemy);

  function Rocket(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var facingRight = arguments.length > 6 ? arguments[6] : undefined;
    var spriteWidth = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 50;
    var spriteHeight = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 50;

    _classCallCheck(this, Rocket);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rocket).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.xSpeed = 0;
    _this.ySpeed = 0;
    _this.maxX = 8;
    _this.maxY = 4;
    _this.xAccel = .4;
    _this.yAccel = .17;
    _this.y -= 70;

    if (!facingRight) {
      _this.x -= 100;
    } else {
      _this.x += 100;
    }

    ; //offset to match gun

    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = 30;
    _this.boundHeight = 30;

    if (facingRight) {
      _this.boundX = _this.centerX - _this.boundWidth / 2 + 120; //+100 aligns with the gun

      _this.boundY = _this.y - _this.boundHeight - _this.spriteHeight;
    } else {
      _this.boundX = _this.centerX - _this.boundWidth / 2 + 2 * _this.spriteWidth - 180;
      _this.boundY = _this.y - _this.boundHeight - _this.spriteHeight;
    } //Stats


    _this.damageType = "energy";
    _this.drainTime = 120;
    _this.damage = 2;
    _this.health = 50;
    _this.bounceCount = 0;
    _this.bounceTimer = 0;
    _this.bounceTime = 35;
    _this.timer = 500;
    _this.safeTimer = 0;
    _this.states = {
      "active": true,
      "facingRight": facingRight
    };
    _this.animations = {
      "rocket": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [90, 60], 6, 20, 5, 7, true, _this.scale, 13)
    };
    _this.animation = _this.animations.rocket;

    if (_this.states.facingRight) {
      _this.facing = 1;
    } else {
      _this.facing = -1;
    }

    return _this;
  }

  _createClass(Rocket, [{
    key: "update",
    value: function update() {
      //TODO
      if (!this.states.facingRight && this.x - this.game.hero.x < 0) {
        this.states.facingRight = true;
        this.facing = 1;
      } else if (this.states.facingRight && this.x - this.game.hero.x >= 0) {
        this.states.facingRight = false;
        this.facing = -1;
      }

      if (this.states.active) {
        //TODO Tracking behavior
        if (this.xSpeed < this.maxX && this.facing === 1 || this.xSpeed > -this.maxX && this.facing === -1) {
          this.xSpeed += this.facing * this.xAccel;
        }

        this.x += this.xSpeed;
        this.boundX += this.xSpeed;

        if (this.y - this.game.hero.y >= 0) {
          // below hero;
          if (this.ySpeed > -this.maxY) {
            this.ySpeed -= this.yAccel;
          }

          this.y += this.ySpeed;
          this.boundY += this.ySpeed;
        } else {
          // above hero
          if (this.ySpeed < this.maxY) {
            this.ySpeed += this.yAccel;
          }

          this.y += this.ySpeed; // + Math.floor(Math.abs(this.y - this.game.hero.y) / 300) * 1.5;

          this.boundY += this.ySpeed; // + Math.floor(Math.abs(this.y - this.game.hero.y) / 300) * 1.5;
        }

        if (this.animation.loops > 15) {
          this.animation.reset();
          this.removeFromWorld = true;
        }

        if (this.bounceTimer > 0) {
          this.bounceTimer--;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.active) {
        this.animation = this.animations.rocket;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      // collide with terrain
      if (other.name === "Terrain" && this.animation.loops > 3) {
        this.removeFromWorld = true;
      }

      if (other.name === "Hero") {
        if (other.name === "Hero" && other.states.invulnerable) {//keep on the map
        } else {
          this.removeFromWorld = true;
        }
      } else if (other.name === "Hurtbox" && !other.isEnemy && this.game.hero.states.slashing) {
        this.drainTime += 10;
        this.xSpeed = -this.facing * this.maxX * 2;

        if (Math.random() * 100 < 50) {
          this.ySpeed = -1;
        } else {
          this.ySpeed = 1;
        } //if (this.bounceCount > 3) {
        //    this.removeFromWorld = true;
        //}
        //else {
        //    this.bounceTimer = this.bounceTime;
        //    this.bounceCount++;
        //}

      } else if (other.name === "Projectile" && other.states.blue || other.parent === "Projectile_Sword") {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight) {
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth + 5;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2;
      this.boundY = this.y - this.boundHeight;
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Rocket;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Rocket);

/***/ }),

/***/ "./src/entities/shotblast.js":
/*!***********************************!*\
  !*** ./src/entities/shotblast.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Shotblast =
/*#__PURE__*/
function (_Actor) {
  _inherits(Shotblast, _Actor);

  function Shotblast(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var facingRight = arguments.length > 6 ? arguments[6] : undefined;
    var spriteWidth = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 50;
    var spriteHeight = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 50;

    _classCallCheck(this, Shotblast);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Shotblast).call(this, game, x, y, img, ctx));
    _this.movementSpeed = 7;

    if (facingRight) {
      _this.x += 100;
    } else {
      _this.x -= 100;
    }

    ; //offset to match gun

    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2;
    _this.boundWidth = 0;
    _this.boundHeight = 0;
    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight - 500; //Stats

    _this.states = {
      "active": true,
      "facingRight": facingRight
    };
    _this.animations = {
      "shotblast": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 18, 4, 6, false, _this.scale, 10)
    };
    _this.animation = _this.animations.shotblast;
    return _this;
  }

  _createClass(Shotblast, [{
    key: "update",
    value: function update() {
      //TODO
      if (this.states.active) {
        if (this.animation.isDone()) {
          this.animation.reset();
          this.states.active = false;
          this.removeFromWorld = true;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.active) {
        this.animation = this.animations.shotblast;
      }

      this.drawImg(ctx);
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Shotblast;
}(___WEBPACK_IMPORTED_MODULE_1__["Actor"]);

/* harmony default export */ __webpack_exports__["default"] = (Shotblast);

/***/ }),

/***/ "./src/entities/soldier-shield.js":
/*!****************************************!*\
  !*** ./src/entities/soldier-shield.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 //TODO (long term): ALL ACTORS - "Check if in range" helper function

var Soldier_Shield =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Soldier_Shield, _Enemy);

  function Soldier_Shield(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var spriteWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 50;
    var spriteHeight = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 50;

    _classCallCheck(this, Soldier_Shield);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Soldier_Shield).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.movementSpeed = 7;
    _this.yVelocity = 0;
    _this.scale = scale;
    _this.spriteWidth = spriteWidth;
    _this.spriteHeight = spriteHeight;
    _this.centerX = x + spriteWidth * scale / 2 - spriteWidth;
    _this.boundWidth = _this.scale * 45;
    _this.boundHeight = _this.scale * 45;
    _this.boundX = _this.centerX - _this.boundWidth / 2;
    _this.boundY = _this.y - _this.boundHeight + (_this.spriteHeight / 2 - 10); //this.updateHitbox(50, 50, 38, 40);
    //Stats

    _this.pointValue = 30;
    _this.health = 50;
    _this.damage = 1;
    _this.facing = -1; // Behavior parameters

    _this.runProb = 5;
    _this.runAwayCooldown = 250;
    _this.runAwayCooldownTimer = 0;
    _this.runAwayTime = 75;
    _this.runAwayTimer = 0;
    _this.sightRadius[0] = 1000;
    _this.sightRadius[1] = 350;
    _this.states = {
      "active": false,
      //currently unused
      "idling": true,
      "running": false,
      "shooting_startup": false,
      "shooting_active": false,
      "shooting_recover": false,
      "hasShot": false,
      "slashing_start": false,
      "slashing_end": false,
      "blocking": false,
      "turning": false,
      "framelocked": false,
      "facingRight": false,
      "runningAway": false
    };
    _this.animations = {
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 0, 15, 5, 6, true, _this.scale),
      "turn": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 0, 15, 3, 5, false, _this.scale, 6),
      "block": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 0, 15, 9, 4, false, _this.scale, 11),
      "run": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 1, 12, 3, 12, true, _this.scale),
      "shoot_startup": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 18, 2, 5, false, _this.scale),
      "shoot_active": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 18, 4, 5, false, _this.scale, 5),
      "shoot_recover": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [spriteWidth, spriteHeight], 2, 18, 4, 1, true, _this.scale, 9),
      "slash_start": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [100, 60], 3, 16, 2, 9, false, _this.scale),
      "slash_end": new _animation__WEBPACK_IMPORTED_MODULE_0__["default"](_this.img, [100, 60], 3, 16, 3, 7, false, _this.scale, 9)
    };
    _this.animation = _this.animations.idle;
    return _this;
  }

  _createClass(Soldier_Shield, [{
    key: "update",
    value: function update() {
      if (Math.abs(this.y - this.game.hero.y) <= this.sightRadius[1]) {
        this.states.active = true;
      }
      /**** BEGIN BEHAVIOR CODE ****/


      if (this.states.active) {
        //idling - This is where most behavior will start, and most will return.
        if (this.states.idling && !this.states.runningAway && Math.abs(this.x - this.game.hero.x) < this.sightRadius[0] && Math.abs(this.y - this.game.hero.y) < this.sightRadius[1]) {
          //Face Enemy
          if (this.game.hero.x > this.x && !this.states.facingRight && !this.states.blocking) {
            this.states.turning = true;
            this.states.idling = false;
          } else if (this.game.hero.x < this.x && this.states.facingRight && !this.states.blocking) {
            this.states.turning = true;
            this.states.idling = false;
          } //Slash when in range


          if (Math.abs(this.x - this.game.hero.x) <= 250 && Math.abs(this.y - this.game.hero.y) < 50 && Math.random() * 100 <= 5 && this.animation.loops > 1) {
            //added random activation as a test.
            this.states.slashing_start = true;
            this.states.idling = false;
            this.animation.reset();

            if (!this.states.facingRight) {
              this.x -= 20;
            }
          } //Shoot when in range


          if (Math.abs(this.x - this.game.hero.x) >= 200 && Math.abs(this.x - this.game.hero.x) <= 1000 && this.animation.loops >= 3) {
            //shot cooldown based on idle time (measured by animation loops)
            if (Math.abs(this.x - this.game.hero.x) <= 600 && Math.random() * 10 <= this.runProb && this.runAwayCooldownTimer == 0) {
              console.log("running away");
              this.runProb -= 2.5;
              this.runAwayTimer = this.runAwayTime;
              this.runAwayCooldownTimer = this.runAwayCooldown;
              this.states.runningAway = true;
              this.states.shooting_startup = true;
              this.states.turning = false;
              this.states.idling = false;
            } else {
              this.animation.reset();
              this.animation.reset();
              this.states.shooting_startup = true;
              this.states.idling = false;
            }
          }
        }
        /**** UPDATE BEHAVIOR PARAMS ****/


        if (!this.states.shooting_active && !this.states.shooting_startup) {
          if (this.runAwayCooldownTimer > 0) {
            this.runAwayCooldownTimer -= 1;
          }

          if (this.runAwayTimer > 0) {
            this.runAwayTimer -= 1;
          }
        }
        /**** END BEHAVIOR CODE ****/
        //Run Away Routine


        if (this.states.runningAway && !this.states.shooting_startup && !this.states.shooting_active && !this.states.shooting_recover) {
          if (this.runAwayTimer == this.runAwayTime - 1) {
            this.states.turning = true;
          }

          if (this.runAwayTimer == 0) {
            this.states.runningAway = false;
            this.states.running = false;
            this.states.turning = true;
          } else if (this.runAwayTimer > 0 && !this.states.turning) {
            this.states.running = true;
            this.states.idling = false;
          }
        }

        if (this.states.running) {
          //running
          this.x += this.facing * this.movementSpeed;
          this.boundX += this.facing * this.movementSpeed;

          if (this.animation.loops >= 1) {
            this.animation.reset();
            this.states.running = false;
            this.states.idle = true;
          }
        }

        if (this.states.shooting_startup && !this.states.framelocked) {
          //shooting start: this.updateHitbox(50, 50, 38, 40);
          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.shooting_startup = false;
            this.states.shooting_active = true;
          }
        }

        if (this.states.shooting_active) {
          //shooting active
          if (!this.states.hasShot) {
            this.game.playSound("enemy_shoot");
            this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Shotblast"](this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
            this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Bullet"](this.game, this.x, this.y, this.img, this.ctx, this.scale, this.states.facingRight));
            this.states.hasShot = true;
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.animation.reset();
            this.states.shooting_active = false;
            this.states.hasShot = false; //this.states.shooting_recover = true;

            if (!this.states.runningAway) this.states.idling = true;
          }
        }

        if (this.states.shooting_recover) {
          if (this.animation.loops > 2) {
            this.animation.reset();
            this.states.shooting_recover = false;
            if (!this.states.runningAway) this.states.idling = true;
          }
        }

        if (this.states.slashing_start && !this.states.framelocked) {
          //slashing start
          if (this.animation.currentFrame() === 8) {
            if (this.states.facingRight) this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX, this.boundY, 5, 100, this.spriteWidth, this.spriteHeight, 70, 100, this.scale, 2 * this.damage, this.states.facingRight, true));else this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 2 * 65, 100, this.spriteWidth, this.spriteHeight, 70, 100, this.scale, 2 * this.damage, this.states.facingRight, true));
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.slashing_start = false;
            this.states.slashing_end = true;
          }
        }

        if (this.states.slashing_end) {
          //slashing end
          if (this.animation.currentFrame() >= 0 && this.animation.currentFrame() <= 1) {
            if (this.states.facingRight) this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX, this.boundY, 5, 100, this.spriteWidth, this.spriteHeight, 70, 100, this.scale, 2 * this.damage, this.states.facingRight, true));else this.game.addEntity(new ___WEBPACK_IMPORTED_MODULE_1__["Hurtbox"](this.game, this.ctx, this.boundX, this.boundY, -60 - this.spriteWidth - 2 * 65, 100, this.spriteWidth, this.spriteHeight, 70, 100, this.scale, 2 * this.damage, this.states.facingRight, true));
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.slashing_end = false;
            this.states.idling = true;

            if (!this.states.facingRight) {
              this.x += 20;
            }
          }
        }

        if (this.states.blocking) {
          //blocking
          // a little knockback
          if (this.states.facingRight) {
            this.x -= 1;
            this.boundX -= 1;
          } else {
            this.x += 1;
            this.boundX += 1;
          }

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.blocking = false;
            this.states.idling = true;
          }
        }

        if (this.states.turning) {
          //turning
          this.states.framelocked = true;

          if (this.animation.isDone()) {
            this.animation.reset();
            this.states.turning = false;
            this.states.facingRight = !this.states.facingRight;
            this.facing *= -1; //see above statement

            this.states.framelocked = false;
            this.states.idling = true;
          }
        }

        this.yVelocity += this.gravity * this.gravity;
        this.y += this.yVelocity;
        this.lastBoundY = this.boundY;
        this.boundY += this.yVelocity;
        if (this.health <= 0) this.removeFromWorld = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.states.idling) {
        this.updateHitbox(50, 50, 30, 35, 10, 0);
        this.animation = this.animations.idle;
      }

      if (this.states.running) {
        this.updateHitbox(50, 50, 30, 35, 5, 0);
        this.animation = this.animations.run;
      }

      if (this.states.shooting_startup) {
        this.updateHitbox(50, 50, 30, 35, 5, 0);
        this.animation = this.animations.shoot_startup;
      }

      if (this.states.shooting_active) {
        this.updateHitbox(50, 50, 30, 35, 5, 0);
        this.animation = this.animations.shoot_active;
      }

      if (this.states.shooting_recover) {
        this.updateHitbox(50, 50, 30, 35, 5, 0);
        this.animation = this.animations.shoot_recover;
      }

      if (this.states.slashing_start) {
        this.updateHitbox(100, 60, 25, 35, -15, 0);
        this.animation = this.animations.slash_start;
      }

      if (this.states.slashing_end) {
        this.updateHitbox(100, 60, 25, 35, -15, 0);
        this.animation = this.animations.slash_end;
      }

      if (this.states.blocking) {
        this.updateHitbox(50, 50, 30, 35, -10, 0);
        this.animation = this.animations.block;
      }

      if (this.states.turning) {
        this.updateHitbox(50, 50, 30, 35, -10, 0);
        this.animation = this.animations.turn;
      }

      this.drawImg(ctx);
    } //used to easily update hitbox based on state/animation

  }, {
    key: "updateHitbox",
    value: function updateHitbox(fWidth, fHeight, bWidth, bHeight, offX, offY) {
      this.centerX = this.x + fWidth * this.scale / 2 - fWidth;
      this.boundWidth = this.scale * bWidth;
      this.boundHeight = this.scale * bHeight;
      this.boundX = this.centerX - this.boundWidth / 2 + this.facing * offX;
      this.boundY = this.y - this.boundHeight + (fHeight / 2 - 10);
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {
      if (other.name === "Terrain") {
        if (direction === 'bottom') {
          this.boundY = other.boundY - this.boundHeight;
          this.y = this.boundY + this.boundHeight - 10; //fix magic number (drawn slightly below hitbox without the 20 offset)

          this.yVelocity = 0;
          this.jumpsLeft = this.maxJumps;
          this.states.jumping = false;
        } else if (direction === 'top') {
          this.boundY = other.boundY + other.boundHeight;
          this.y = this.boundY + this.boundHeight;
          this.lastBoundY = this.boundY;
        } else if (direction === 'left') {
          this.boundX = other.boundX + other.boundWidth;
          this.x = this.boundX;
        } else if (direction === 'right') {
          this.boundX = other.boundX - this.boundWidth;
          this.x = this.boundX;
        }
      }

      if (other.name === "Projectile") {
        // blocking from left & right
        if (this.states.idling || this.states.blocking) {
          if (this.x - this.game.hero.x < 0 && this.states.facingRight
          /*direction == 'left' && other.x < this.x*/
          ) {
              this.states.blocking = true;
              this.states.idling = false;
              this.game.playSound("shield_block");
            } else if (this.x - this.game.hero.x > 0 && !this.states.facingRight
          /*direction == 'right' && other.x > this.x*/
          ) {
              this.states.blocking = true;
              this.states.idling = false;
              this.game.playSound("shield_block");
            } else {
            this.health -= other.damage;
            this.game.playSound("enemy_hurt_1");
          }
        } else {
          // blood or something goes here
          // this.game.addEntity(...)
          this.health -= other.damage;
          console.log("OUCH!");
        }
      }

      if (other.name === "Hurtbox") {
        // blocking from left & right
        if (!other.isEnemy) {
          if (other.parent === "Bomb") {
            if (this.states.idling || this.states.blocking) {
              if (this.x - other.x < 0 && this.states.facingRight
              /*direction == 'left' && other.x < this.x*/
              ) {
                  this.states.blocking = true;
                  this.states.idling = false;
                } else if (this.x - other.x > 0 && !this.states.facingRight
              /*direction == 'right' && other.x > this.x*/
              ) {
                  this.states.blocking = true;
                  this.states.idling = false;
                } else {
                this.health -= other.damage;
                console.log("OUCH!");
              }
            } else {
              this.health -= other.damage;
              console.log("OUCH!");
            }
          } else {
            if (this.states.idling || this.states.blocking) {
              if (this.x - this.game.hero.x < 0 && this.states.facingRight
              /*direction == 'left' && other.x < this.x*/
              ) {
                  this.states.blocking = true;
                  this.states.idling = false;
                } else if (this.x - this.game.hero.x > 0 && !this.states.facingRight
              /*direction == 'right' && other.x > this.x*/
              ) {
                  this.states.blocking = true;
                  this.states.idling = false;
                } else {
                this.health -= other.damage;
                console.log("OUCH!");
              }
            } else {
              this.health -= other.damage;
              console.log("OUCH!");
            }
          }
        }
      }
    }
  }, {
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawImg",
    value: function drawImg(ctx) {
      this.animation.drawFrame(1, ctx, this.x, this.y, this.states.facingRight);

      if (this.game.drawBoxes) {
        this.drawOutline(ctx);
      }
    }
  }]);

  return Soldier_Shield;
}(___WEBPACK_IMPORTED_MODULE_1__["Enemy"]);

/* harmony default export */ __webpack_exports__["default"] = (Soldier_Shield);

/***/ }),

/***/ "./src/entities/terrain-mobile.js":
/*!****************************************!*\
  !*** ./src/entities/terrain-mobile.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//will return multiple different subtypes of moving platforms


var TerrainMobile =
/*#__PURE__*/
function (_Terrain) {
  _inherits(TerrainMobile, _Terrain);

  function TerrainMobile(game, x, y, dimensions) {
    var _this;

    var img = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var ctx = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var tiles = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

    _classCallCheck(this, TerrainMobile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TerrainMobile).call(this, game, x, y, img, ctx, "Terrain"));
    _this.states = null;
    _this.animations = null;
    _this.animation = null;
    _this.tiles = tiles;
    _this.scale = scale;
    _this.src_width = dimensions[0];
    _this.src_height = dimensions[1];
    _this.boundX = _this.x;
    _this.boundY = _this.y + 6;
    _this.boundWidth = 96;
    _this.boundHeight = 96;
    return _this;
  }

  _createClass(TerrainMobile, [{
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.x, this.y, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.tiles != null) {
        for (var i = 0; i < 1; i++) {
          var col = this.tiles[0];
          var row = this.tiles[1];
          ctx.drawImage(this.img, col * this.src_width, row * this.src_height, this.src_width, this.src_height, this.x, this.y, this.src_width * 3, this.src_height * 3);

          if (this.game.drawBoxes) {
            this.drawOutline(ctx);
          }
        }
      }
    }
    /*Updates the entity each game loop. i.e. what does this entity do? */

  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(TerrainMobile.prototype), "update", this).call(this);
    }
  }]);

  return TerrainMobile;
}(___WEBPACK_IMPORTED_MODULE_0__["Terrain"]); // end Terrain


/* harmony default export */ __webpack_exports__["default"] = (TerrainMobile);

/***/ }),

/***/ "./src/entities/terrain.js":
/*!*********************************!*\
  !*** ./src/entities/terrain.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Terrain =
/*#__PURE__*/
function (_Entity) {
  _inherits(Terrain, _Entity);

  function Terrain(game, x, y, dimensions) {
    var _this;

    var img = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var ctx = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var tiles = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var bounds = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [0, 0, 0, 0];

    _classCallCheck(this, Terrain);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Terrain).call(this, game, x, y, img, ctx));
    _this.parentClass = "Entity";
    _this.type = "Terrain";
    _this.states = null;
    _this.animations = null;
    _this.animation = null;
    _this.tiles = tiles;
    _this.scale = scale;
    _this.src_width = dimensions[0];
    _this.src_height = dimensions[1];
    _this.boundX = _this.x + bounds[2];
    _this.boundY = _this.y + bounds[3];
    _this.boundWidth = _this.scale * bounds[0];
    _this.boundHeight = _this.scale * bounds[1];
    return _this;
  }

  _createClass(Terrain, [{
    key: "drawOutline",
    value: function drawOutline(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(this.boundX, this.boundY, this.boundWidth, this.boundHeight);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.tiles != null) {
        for (var i = 0; i < 1; i++) {
          var col = this.tiles[0];
          var row = this.tiles[1];
          ctx.drawImage(this.img, col * this.src_width, row * this.src_height, this.src_width, this.src_height, this.x, this.y, this.src_width * 3, this.src_height * 3);

          if (this.game.drawBoxes) {
            this.drawOutline(ctx);
          }
        }
      }
    }
    /*Updates the entity each game loop. i.e. what does this entity do? */

  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(Terrain.prototype), "update", this).call(this);
    }
  }]);

  return Terrain;
}(_entity__WEBPACK_IMPORTED_MODULE_0__["default"]); // end Terrain


/* harmony default export */ __webpack_exports__["default"] = (Terrain);

/***/ }),

/***/ "./src/game-engine.js":
/*!****************************!*\
  !*** ./src/game-engine.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/asset-manager.js");
/* harmony import */ var _entities_hero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/hero */ "./src/entities/hero.js");
/* harmony import */ var _hud__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hud */ "./src/hud.js");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./background */ "./src/background.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sound */ "./src/sound.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






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
    this.sound = new _sound__WEBPACK_IMPORTED_MODULE_4__["default"]();
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

/***/ "./src/hud.js":
/*!********************!*\
  !*** ./src/hud.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/asset-manager.js");
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
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
  /* function */
  callback,
  /* DOMElement */
  element) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

_core__WEBPACK_IMPORTED_MODULE_0__["default"].init();

/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvYWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2JvbWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2J1bGxldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9jcm93LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9kaW5vLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9lbmVteS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9mbGFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhemFyZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2h1cnRib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9sZW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUtc3dvcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JlZmxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvc2hvdGJsYXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9zb2xkaWVyLXNoaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvdGVycmFpbi1tb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3RlcnJhaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9odWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvdW5kLmpzIl0sIm5hbWVzIjpbIkFuaW1hdGlvbiIsInNwcml0ZVNoZWV0IiwiZnJhbWVEaW1lbnNpb25zIiwicm93Iiwic2hlZXRXaWR0aCIsImZyYW1lRHVyYXRpb24iLCJmcmFtZXMiLCJsb29wIiwic2NhbGUiLCJjb2x1bW5PZmZzZXQiLCJmcmFtZVdpZHRoIiwiZnJhbWVIZWlnaHQiLCJ0b3RhbFRpbWUiLCJlbGFwc2VkVGltZSIsImxvb3BzIiwidGljayIsImN0eCIsIngiLCJ5IiwiZmFjaW5nUmlnaHQiLCJpc0RvbmUiLCJmcmFtZSIsImN1cnJlbnRGcmFtZSIsInhpbmRleCIsInlpbmRleCIsImRyb3ciLCJNYXRoIiwiZmxvb3IiLCJzYXZlIiwidHJhbnNsYXRlIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsIkFzc2V0TWFuYWdlciIsImRvd25sb2FkUXVldWUiLCJzdWNjZXNzQ291bnQiLCJlcnJvckNvdW50IiwiY2FjaGUiLCJwYXRoIiwicHVzaCIsImxlbmd0aCIsImNhbGxiYWNrIiwid2luZG93Iiwic2V0VGltZW91dCIsImkiLCJpbWciLCJJbWFnZSIsInRoYXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3JjIiwiTGF5ZXIiLCJzcmNfZGltZW5zaW9ucyIsImNhbWVyYSIsInNjcm9sbF9zcGVlZCIsImhlaWdodF9mYWN0b3IiLCJkZXN0X3kiLCJzdHJldGNoIiwic3JjX3dpZHRoIiwic3JjX2hlaWdodCIsImNhbWVyYV9kaW1lbnNpb25zIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJkX2hlaWdodCIsImRfeSIsInhWaWV3IiwiQmFja2dyb3VuZCIsImdhbWVfZW5naW5lIiwiYXNzZXRfbWFuYWdlciIsImxheWVycyIsIm1ha2VfYmFja2dyb3VuZCIsImFkZEJhY2tncm91bmRMYXllciIsImdldEFzc2V0IiwidG9sb2FkIiwiQVNTRVRfTUFOQUdFUiIsImRvd25sb2FkQWxsIiwiY29uc29sZSIsImxvZyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiLCJnYW1lRW5naW5lIiwiaGVybyIsImJvYXJkIiwiZ2FtZWJvYXJkIiwiaHVkIiwiYWRkRW50aXR5IiwiYmFja2dyb3VuZCIsImdldExldmVsIiwiZm9sbG93IiwiaW5pdCIsInN0YXJ0IiwiQWN0b3IiLCJnYW1lIiwic3ByaXRlV2lkdGgiLCJzcHJpdGVIZWlnaHQiLCJwYXJlbnRDbGFzcyIsImZhY2luZyIsInN0YXRlcyIsImFuaW1hdGlvbnMiLCJhbmltYXRpb24iLCJib3VuZFgiLCJib3VuZFkiLCJjb29yZGluYXRlcyIsIkJvbWIiLCJ4VmVsb2NpdHkiLCJ5VmVsb2NpdHkiLCJjZW50ZXJYIiwiYm91bmRXaWR0aCIsImJvdW5kSGVpZ2h0Iiwic2lnaHRSYWRpdXMiLCJoZWFsdGgiLCJkYW1hZ2UiLCJsYXVuY2h0aW1lIiwiY291bnRkb3duIiwic3RhcnR1cCIsImZyaWN0aW9uIiwibGF1bmNoIiwibGF1bmNoaW5nIiwidXBkYXRlUG9zIiwiYWN0aXZhdGluZyIsInJlc2V0IiwiZGV0b25hdGluZyIsImV4cGxvZGluZyIsImV4cGxvZGVkIiwiZXhwbG9zaW9uWCIsImV4cGxvc2lvblkiLCJwbGF5U291bmQiLCJodXJ0Ym94IiwibWF4IiwicmVmbGVjdGVkIiwicGFyZW50IiwibmFtZSIsInJlbW92ZUZyb21Xb3JsZCIsImdyYXZpdHkiLCJsYXN0Qm91bmRZIiwiYWN0aXZhdGUiLCJkZXRvbmF0ZSIsImV4cGxvZGUiLCJkcmF3SW1nIiwiZldpZHRoIiwiZkhlaWdodCIsImJXaWR0aCIsImJIZWlnaHQiLCJvdGhlciIsImRpcmVjdGlvbiIsImlzRW5lbXkiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsInJlY3QiLCJzdHJva2UiLCJjbG9zZVBhdGgiLCJkcmF3RnJhbWUiLCJkcmF3Qm94ZXMiLCJkcmF3T3V0bGluZSIsIkJ1bGxldCIsIm1vdmVtZW50U3BlZWQiLCJidWxsZXQiLCJhY3RpdmUiLCJzdGVhZHkiLCJDYW1lcmEiLCJ5VmlldyIsIndvcmxkV2lkdGgiLCJ3b3JsZEhlaWdodCIsImFic09mZlgiLCJhYnNPZmZZIiwib2ZmWCIsIm9mZlkiLCJjYW1TcGVlZFgiLCJjYW1TcGVlZFkiLCJheGlzIiwiZm9sbG93ZWQiLCJvYmoiLCJ1cGRhdGVCb3VuZHMiLCJ2YWwiLCJtaW4iLCJDcm93IiwibXVyZGVyTGVhZGVyIiwibXVyZGVyRHJvb2dzIiwicG9pbnRWYWx1ZSIsInhTcGVlZCIsInlTcGVlZCIsIm1heFgiLCJtYXhZIiwieEFjY2VsIiwieUFjY2VsIiwiYXR0YWNrQW5nbGUxIiwiYXR0YWNrQW5nbGUyIiwieEF0dGFjayIsInhSZWNvdmVyIiwieVJlY292ZXIiLCJyZWNvdmVyRGlzdGFuY2UiLCJ4UmVjb3ZlckRpc3RhbmNlIiwieVJlY292ZXJEaXN0YW5jZSIsImRyb29nT25lIiwiZHJvb2dUd28iLCJyYW5kIiwiZmx5IiwicmVjb3ZlcmluZyIsImF0dGFja2luZ19maW5hbCIsImlkbGluZyIsImFicyIsImZseWluZyIsImRyb29nMSIsImRyb29nMiIsImxldmVsIiwic2VjdGlvbiIsInJhbmRvbSIsImF0dGFja2luZyIsInNvdW5kIiwicGxheSIsImh1cnQiLCJ1cGRhdGVIaXRib3giLCJIZWFsdGhQYWNrIiwiYXNzZXRNYW5hZ2VyIiwiRW5lcmd5UGFjayIsImF0dGFjayIsImF0dGFja19maW5hbCIsIkRpbm8iLCJwYXRyb2xEaXN0YW5jZSIsInNob3RUaW1lT2Zmc2V0Iiwic3RhcnRYIiwic2hvdENvb2xkb3duIiwic2hvdENvb2xkb3duVGltZXIiLCJwYXRyb2xsaW5nIiwiaWRsZSIsInNob290aW5nIiwid2Fsa2luZyIsImZyYW1lbG9ja2VkIiwid2Fsa19zdHJhaWdodCIsInNob290X2RpYWdvbmFsIiwiRW5lbXkiLCJkYW1hZ2VUeXBlIiwiRW50aXR5IiwiY29uc3RydWN0b3IiLCJ0eXBlIiwiYXJjIiwicmFkaXVzIiwiUEkiLCJzaG93T3V0bGluZXMiLCJjbG9ja1RpY2siLCJyZWN0MSIsInJlY3QyIiwiY29sbGlzaW9uIiwiZHgiLCJkeSIsImxhc3RkeSIsImxhc3RZIiwiY3Jvc3NXaWR0aCIsImxhc3RDcm9zc1dpZHRoIiwiY3Jvc3NIZWlnaHQiLCJGbGFtZXMiLCJkZW1vIiwib3JpZ1giLCJvcmlnWSIsIkdhbWVCb2FyZCIsInRlc3RQb3MiLCJsZXZlbE51bSIsInNlY3Rpb25OdW0iLCJwdnQiLCJwdnR0IiwibG9zdFNjb3JlIiwiZGVhZEVuZW1pZXMiLCJzY29yZSIsInRpbWUiLCJjaGVja05vZGUiLCJsYXN0Q2hlY2twb2ludCIsImxvYWROZXh0TGV2ZWwiLCJuZXh0TGV2ZWwiLCJjbGVhclN0YXRlcyIsImxvYWRlZExldmVsIiwibG9hZCIsImxvYWRpbmdMZXZlbCIsInBvcHVsYXRlTWFwIiwic2V0UG9zIiwibmV4dE5vZGUiLCJjaGVja3BvaW50cyIsIm5leHQiLCJuZXdMZXZlbCIsInBvcnRhbCIsImxvYWRpbmdTZWN0aW9uIiwicmVzcGF3blNlY3Rpb24iLCJpc0JhY2siLCJjbGVhckJvYXJkIiwiYWN0aXZhdGVkIiwiY2FtT2ZmWCIsImNhbU9mZlkiLCJuZXh0Q2FtU3BlZWQiLCJpc0Zyb250IiwicHJldiIsInByZXZDYW1TcGVlZCIsInJlc3Bhd25lZCIsInJlc3Bhd24iLCJyZXNwYXduTWVzc2FnZSIsInNob3dQb2ludFZhbHVlcyIsImZvbnQiLCJmaWxsU3R5bGUiLCJmaWxsVGV4dCIsInNwbGljZSIsInNjb3BlIiwibnVtIiwicG9wdWxhdGVMZXZlbCIsInJlc3Bhd25MZXZlbCIsImxvYWRlZFNlY3Rpb24iLCJMZXZlbHMiLCJjdXJyQ2hlY2tQb3MiLCJjdXJyQ2hlY2tYIiwiY3VyckNoZWNrWSIsImxpc3RGcm9udCIsIkNoZWNrcG9pbnQiLCJjYW1WYWxzIiwiY2FtU3BlZWRzIiwiaGFzUHJldiIsImN1cnJDaGVjayIsInByZXZDaGVjayIsImhhc05leHQiLCJhZGROZXh0Iiwic2V0Qm91bmRzIiwiY2FtZXJhU2hpZnQiLCJjYW1lcmFTcGVlZCIsInJpZ2h0Qm91bmQiLCJsZWZ0Qm91bmQiLCJhY3RpdmF0aW9uUmFkaXVzIiwiSGFuZCIsImRpc3RhbmNlIiwidGhyb3d0aW1lIiwiY29vbGRvd24iLCJjb29sZG93bnZhcmlhbmNlIiwiY29vbGRvd25UaW1lciIsInN0YXJ0aW5nIiwidGhyb3dpbmciLCJoYXNUaHJvd24iLCJ0aHJvdyIsInJlY292ZXIiLCJ4T2ZmIiwieU9mZiIsImhhc093blByb3BlcnR5IiwiTGF2YSIsImZpcmVDb29sZG93blRpbWVyIiwiZmlyZUNvb2xkb3duIiwiRmlyZWJhbGwiLCJzcGF3bk9mZnNldCIsIm9yaWdCb3VuZFgiLCJvcmlnQm91bmRZIiwibWlkZGxlX3VwIiwicGVha191cCIsInBlYWtfZG93biIsIm1pZGRsZV9kb3duIiwiZmluaXNoIiwiU3Bpa2VzIiwidGltZXIiLCJ0aW1lT2Zmc2V0IiwiaW50ZXJ2YWwiLCJzcGlrZUNvb2xkb3duVGltZXIiLCJzcGlrZUNvb2xkb3duIiwiaW5hY3RpdmVfZG93biIsIm5leHRPZmZzZXQiLCJpbmFjdGl2ZV91cCIsIlByb2plY3RpbGVIYXphcmQiLCJkaXJlY3Rpb25zIiwibGlmZXNwYW4iLCJ4RGlyIiwieURpciIsIlByb2plY3RpbGVDaXJjbGUiLCJxdWFkcmFudHMiLCJxdWFkcmFudCIsIkxhdW5jaGVyIiwicHJvamVjdGlsZUxpZmVzcGFuIiwibGF1bmNoVGltZU9mZnNldCIsIkhlcm8iLCJkYXNoU3BlZWQiLCJqdW1wU3RyZW5ndGgiLCJqdW1wc0xlZnQiLCJtYXhKdW1wcyIsInRlcm1pbmFsVmVsb2NpdHkiLCJtYXhIZWFsdGgiLCJtYXhFbmVyZ3kiLCJlbmVyZ3kiLCJzbGFzaEVuZXJneUNvc3QiLCJjbGVhdmVFbmVyZ3lDb3N0Iiwic2hvb3RDb3N0Iiwic2hvb3RFbmVyZ3lDb3N0IiwiZGFzaEVuZXJneUNvc3QiLCJzdHVuRGlyIiwibXVsdGlwbGllciIsImRpZmZpY3VsdHkiLCJkYW1hZ2VDb29sZG93blRpbWVyIiwiZGFtYWdlQ29vbGRvd24iLCJlbmVyZ3lDb29sZG93blRpbWVyIiwiZW5lcmd5Q29vbGRvd24iLCJlbmVyZ3lDb29sZG93bk1pbiIsImVuZXJneURlbGF5IiwiZW5lcmd5RGVsYXlUaW1lciIsInZlbG9jaXR5Q29vbGRvd24iLCJ2ZWxvY2l0eUNvb2xkb3duVGltZXIiLCJqdW1wVGltZXIiLCJqdW1wQ29vbGRvd24iLCJzaG9vdENvb2xkb3duVGltZXIiLCJzaG9vdENvb2xkb3duIiwiZ29kTW9kZUVuZXJneU1pbiIsIm5vdEdvZE1vZGVFbmVyZ3lNaW4iLCJnb2RFbmVyZ3lEZWxheSIsIm5vdEdvZEVuZXJneURlbGF5Iiwic2V0UG9zVGltZXIiLCJnb2RUb2dnbGVUaW1lciIsImNvbnRyb2xLZXlzIiwiY29udHJvbHMiLCJyaWdodCIsInJ1bm5pbmciLCJsZWZ0IiwiZW5lcmdpemUiLCJlbmVyZ2l6ZWQiLCJqdW1wIiwianVtcGluZyIsImdyb3VuZGVkIiwic2hvb3QiLCJzaG90bG9ja2VkIiwiY2xlYXZlIiwic2V0U3RhdGVzIiwiY2xlYXZpbmciLCJzbGFzaCIsImRhc2hpbmciLCJkYXNoIiwiZGFzaGluZ1N0YXJ0IiwiaGFzRGFzaGVkIiwiaGFzUmVmbGVjdGVkIiwidXNlRW5lcmd5Iiwic2xhc2hpbmciLCJoYXNHcmF2aXR5IiwiaGFzU2xhc2hlZCIsImVuZXJneURhc2giLCJkYXNoaW5nTWlkIiwiaW52dWxuZXJhYmxlIiwiZGFzaGluZ0VuZCIsInN0dW5uZWQiLCJkZWFkIiwiaXNHb2QiLCJhc2NlbmQiLCJkZXNjZW5kIiwiZ3VucnVuIiwiYWlyc2hvb3QiLCJkYXNoX3N0YXJ0IiwiZGFzaF9taWQiLCJkYXNoX2VuZCIsInN0dW4iLCJjb3N0IiwiZW5lcmd5RGVsYXlDb29sZG93biIsIkh1cnRib3giLCJwYXJlbnRXaWR0aCIsInBhcmVudEhlaWdodCIsImh1cnRXaWR0aCIsImh1cnRIZWlnaHQiLCJwZXJzaXN0ZW50IiwiSXRlbSIsInhPZmZzZXQiLCJ5T2Zmc2V0Iiwib25fcGlja3VwIiwiaGVhbHRoX3ZhbHVlIiwiZW5lcmd5X3ZhbHVlIiwiTGVvIiwianVtcFNwZWVkIiwidGltZXJTdGFydCIsIkRhdGUiLCJub3ciLCJzcHJpbmZvIiwibHVuZ2UiLCJkZW1vbG9vcCIsImx1bmdpbmciLCJmaXJlbHVuZ2luZyIsImZpcmVsdW5nZSIsImUiLCJQcm9qZWN0aWxlX1N3b3JkIiwic3RhYmxpemVkIiwic3RhYmxlIiwicmVjb3ZlcnkiLCJQcm9qZWN0aWxlIiwiZ3JlZW4iLCJncmVlbl9leGl0aW5nIiwiYmx1ZV9leGl0aW5nIiwiZ3JlZW5fc3RhYmxlIiwiYmx1ZSIsImJsdWVfc3RhYmxlIiwiUmVmbGVjdGJveCIsIlJvY2tldCIsImRyYWluVGltZSIsImJvdW5jZUNvdW50IiwiYm91bmNlVGltZXIiLCJib3VuY2VUaW1lIiwic2FmZVRpbWVyIiwicm9ja2V0IiwiU2hvdGJsYXN0Iiwic2hvdGJsYXN0IiwiU29sZGllcl9TaGllbGQiLCJydW5Qcm9iIiwicnVuQXdheUNvb2xkb3duIiwicnVuQXdheUNvb2xkb3duVGltZXIiLCJydW5Bd2F5VGltZSIsInJ1bkF3YXlUaW1lciIsInJ1bm5pbmdBd2F5IiwiYmxvY2tpbmciLCJ0dXJuaW5nIiwic2xhc2hpbmdfc3RhcnQiLCJzaG9vdGluZ19zdGFydHVwIiwic2hvb3RpbmdfYWN0aXZlIiwic2hvb3RpbmdfcmVjb3ZlciIsImhhc1Nob3QiLCJzbGFzaGluZ19lbmQiLCJydW4iLCJzaG9vdF9zdGFydHVwIiwic2hvb3RfYWN0aXZlIiwic2hvb3RfcmVjb3ZlciIsInNsYXNoX3N0YXJ0Iiwic2xhc2hfZW5kIiwiYmxvY2siLCJ0dXJuIiwiVGVycmFpbk1vYmlsZSIsImRpbWVuc2lvbnMiLCJ0aWxlcyIsImNvbCIsIlRlcnJhaW4iLCJib3VuZHMiLCJHYW1lRW5naW5lIiwiZGV2TW9kZSIsImVudGl0aWVzIiwiYmFja2dyb3VuZExheWVycyIsImNsaWNrIiwibW91c2UiLCJ3aGVlbCIsInN1cmZhY2VXaWR0aCIsInN1cmZhY2VIZWlnaHQiLCJtdXNpYyIsImFkZGVkcG9pbnRzIiwidG9nZ2xlQ29vbGRvd24iLCJib3hUb2dnbGVUaW1lciIsImNoZWNrcG9pbnRDeWNsZUNvdW50IiwicGF1c2VkIiwicGF1c2VUb2dnbGVDb29sZG93biIsInBhdXNlR2VuZXJhbCIsInBhdXNlTGF5b3V0QSIsInBhdXNlTGF5b3V0QiIsInBhdXNlRmxhdm9yWCIsInBhdXNlRmxhdm9yWSIsImNvbnRyb2xMYXlvdXRBIiwiY29udHJvbExheW91dEIiLCJzdGFydElucHV0IiwiQXVkaW8iLCJ2b2x1bWUiLCJnYW1lTG9vcCIsInJlcXVlc3RBbmltRnJhbWUiLCJzb3VuZF9uYW1lIiwiZ2FtZVRpbWUiLCJtYXhTdGVwIiwid2FsbExhc3RUaW1lc3RhbXAiLCJ3YWxsQ3VycmVudCIsIndhbGxEZWx0YSIsImdhbWVEZWx0YSIsInRhYkluZGV4IiwiZ2V0WGFuZFkiLCJjbGllbnRYIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WSIsInRvcCIsIm1hcCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIndoaWNoIiwic3BhY2UiLCJwcmV2ZW50RGVmYXVsdCIsImNvZGUiLCJlbnRpdHkiLCJsYXllciIsImRyYXdDYWxsYmFjayIsImNsZWFyUmVjdCIsImRyYXciLCJlbnRpdGllc0NvdW50IiwidXBkYXRlIiwiaiIsImRpc3QiLCJpc0NvbGxpZGluZyIsImNvbGxpZGVkIiwiY3VycmVudFRpbWUiLCJlYXN5bW9kZSIsImhhcmRtb2RlIiwibGF5b3V0QSIsImxheW91dEIiLCJwYXVzZSIsImdldFBvcyIsImdvZFRvZ2dsZSIsInRvZ2dsZUJveGVzIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiSHVkIiwic3JjX2Nvb3JkaW5hdGVzIiwiZGVzdF9jb29yZGluYXRlcyIsImhlYWx0aGJhciIsIkhlYWx0aEJhciIsImVuZXJneWJhciIsIkVuZXJneUJhciIsInNjb3JlYm9hcmQiLCJTY29yZUJvYXJkIiwiY29tcG9uZW50cyIsImdyYWRpZW50U3RvcDEiLCJncmFkaWVudFN0b3AyIiwiZ3JhZGllbnRTdG9wMyIsImRlc3RfY29vcmRzIiwiZ3JhZGllbnQiLCJjcmVhdGVMaW5lYXJHcmFkaWVudCIsImFkZENvbG9yU3RvcCIsIlJlc291cmNlQmFyIiwic3JjX2Nvb3JkcyIsInNyY19kaW1zIiwibGFzdHkiLCJwYXJ0cyIsInBhcnQiLCJkcmF3UGFydCIsImRlc3RfeF9vZmZzZXQiLCJkZXN0X3lfb2Zmc2V0IiwicmVzb3VyY2VCYXJTZWdtZW50IiwibWlkZGxlMSIsIm1pZGRsZTIiLCJtaWRkbGUzIiwibWlkZGxlNCIsIm1pZGRsZTUiLCJib3R0b20iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJlbGVtZW50IiwiU291bmQiLCJzb3VuZHMiLCJuX2R1cHMiLCJtYWtlX2R1cGxpY2F0ZXMiLCJuX2R1cCIsImN1cnJfc291bmQiLCJzb3VuZF9saXN0IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJpbmRleCIsImVuZGVkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QzNELFdBQXRDLEdBQW9ELENBQXBEO0FBQ0EsYUFBS21ELE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsUUFBbkIsRUFBNkI4YSxLQUFLLEdBQUMsQ0FBbkMsRUFBc0M3RixNQUF0QyxHQUErQ0EsTUFBL0M7QUFDQSxhQUFLcUYsTUFBTCxDQUFZdGEsS0FBWixFQUFtQixRQUFuQixFQUE2QjhhLEtBQUssR0FBQyxDQUFuQyxFQUFzQzdhLElBQXRDO0FBQ0EsYUFBS3FhLE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsU0FBbkIsS0FBaUMsQ0FBakM7QUFDSCxPQUxELE1BS087QUFDSCxhQUFLc2EsTUFBTCxDQUFZdGEsS0FBWixFQUFtQixRQUFuQixFQUE2QjhhLEtBQTdCLEVBQW9DM0QsV0FBcEMsR0FBa0QsQ0FBbEQ7QUFDQSxhQUFLbUQsTUFBTCxDQUFZdGEsS0FBWixFQUFtQixRQUFuQixFQUE2QjhhLEtBQTdCLEVBQW9DN0YsTUFBcEMsR0FBNkNBLE1BQTdDO0FBQ0EsYUFBS3FGLE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsUUFBbkIsRUFBNkI4YSxLQUE3QixFQUFvQzdhLElBQXBDO0FBQ0g7QUFHSjs7Ozs7O0FBR1UsK0RBQUFvYSxLQUFmLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5cblxuLyoqKioqKioqKioqKioqXG5BbmltYXRpb24gY2xhc3NcblxuUHJvcGVydGllczpcbnNwcml0ZVNoZWV0IC0gYW4gSW1hZ2Ugb2JqZWN0IG9mIHRoaXMgYW5pbWF0aW9uJ3Mgc3ByaXRlc2hlZXQuXG5mcmFtZURpbWVuc2lvbnNbd2lkdGgsIGhlaWdodF0gLSBhbiBhcnJheSBvZiBsZW5ndGggMiwgZGVub3RpbmcgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgXG4gICAgb25lIGZyYW1lIGluIHRoZSBzZXJpZXMuXG5yb3cgLSBhbiBpbnRlZ2VyIGRlbm90aW5nIHRoZSByb3cgKGJlZ2lubmluZyB3aXRoIDApIG9mIHRoZSBzcHJpdGVzaGVldCB0byBwbGF5Llxuc2hlZXRXaWR0aCAtIGFuIGludGVnZXIgZGVub3RpbmcgdGhlIG51bWJlciBvZiBmcmFtZXMgaW4gb25lIHJvdy4gSWYgc2hlZXRXaWR0aCBpcyBncmVhdGVyXG4gICAgdGhhbiB0aGlzIEFuaW1hdGlvbidzIGZyYW1lcyBwcm9wZXJ0eSwgaXQgd2lsbCBjb250aW51ZSB0byB0aGUgZmlyc3QgY29sdW1uIG9uIHRoZSBuZXh0IHJvdy5cbmZyYW1lRHVyYXRpb24gLSB0aGUgbnVtYmVyIG9mIGZyYW1lcyBlYWNoIHNwcml0ZSBpbiB0aGUgYW5pbWF0aW9uIHdpbGwgYmUgc2hvd24gZm9yLlxuZnJhbWVzIC0gdGhlIG51bWJlciBvZiBmcmFtZXMgaW4gdGhpcyBhbmltYXRpb24uXG5sb29wIC0gYSBib29sZWFuIGRlbm90aW5nIHdoZXRoZXIgdGhpcyBhbmltYXRpb24gc2hvdWxkIHJlcGxheSBvciBub3QuXG5zY2FsZSAtIGEgdmFsdWUgdG8gbXVsdGlwbHkgdGhlIG9yaWdpbmFsIHNwcml0ZSdzIHNpemUgYnkuXG5jb2x1bW5PZmZzZXQgLSBhZGRlZCB0byB0aGlzLmN1cnJlbnRGcmFtZSB0byBnZXQgc3RhcnRpbmcgcG9pbnQgb2YgYW55IGFuaW1hdGlvbnMgdGhhdCBzdGFydCBwYXJ0d2F5IGludG8gYSBzaGVldC5cbiovXG5jbGFzcyBBbmltYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQsIGZyYW1lRGltZW5zaW9ucywgcm93LCBzaGVldFdpZHRoLCBmcmFtZUR1cmF0aW9uLCBmcmFtZXMsIGxvb3AsIHNjYWxlLCBjb2x1bW5PZmZzZXQ9MCkge1xuXG4gICAgICAgIHRoaXMuc3ByaXRlU2hlZXQgPSBzcHJpdGVTaGVldDtcbiAgICAgICAgdGhpcy5mcmFtZVdpZHRoID0gZnJhbWVEaW1lbnNpb25zWzBdO1xuICAgICAgICB0aGlzLmZyYW1lRHVyYXRpb24gPSBmcmFtZUR1cmF0aW9uO1xuICAgICAgICB0aGlzLmZyYW1lSGVpZ2h0ID0gZnJhbWVEaW1lbnNpb25zWzFdOyAvL2Nhbid0IGFkZCAxIGhlcmUuIE1lc3NlcyB1cCBmcmFtZXMgbG93ZXIgZG93biB0aGUgc3ByaXRlIHNoZWV0XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbHVtbk9mZnNldCA9IGNvbHVtbk9mZnNldDtcbiAgICAgICAgdGhpcy5zaGVldFdpZHRoID0gc2hlZXRXaWR0aDtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gZnJhbWVEdXJhdGlvbiAqIGZyYW1lcztcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XG4gICAgICAgIHRoaXMubG9vcHMgPSAwO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgfVxuXG5cbiAgICBkcmF3RnJhbWUodGljaywgY3R4LCB4LCB5LCBmYWNpbmdSaWdodCkge1xuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRpY2s7XG4gICAgICAgIGlmICh0aGlzLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29wcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmcmFtZSA9IHRoaXMuY3VycmVudEZyYW1lKCk7XG4gICAgICAgIHZhciB4aW5kZXggPSAwO1xuICAgICAgICB2YXIgeWluZGV4ID0gMDtcbiAgICAgICAgbGV0IGRyb3cgPSAodGhpcy5yb3cgKiB0aGlzLmZyYW1lSGVpZ2h0KVxuICAgICAgICB4aW5kZXggPSBmcmFtZSAlIHRoaXMuc2hlZXRXaWR0aDtcbiAgICAgICAgeWluZGV4ID0gTWF0aC5mbG9vcigoZnJhbWUpIC8gdGhpcy5zaGVldFdpZHRoKTtcblxuXG4gICAgICAgIC8vIERyYXcgZmFjaW5nIGxlZnRcbiAgICAgICAgaWYgKCFmYWNpbmdSaWdodCkge1xuXG4gICAgICAgICAgICAvLyBTYXZlIG9yaWdpbmFsIGNvbnRleHRcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgICAgIC8vIFNldCBjb250ZXh0IHRvIGhvcml6b250YWwgY2VudGVyIG9mIGltYWdlIChkb24ndCBjYXJlIGFib3V0IGNoYW5naW5nIHkncyBwb3NpdGlvbilcbiAgICAgICAgXHRjdHgudHJhbnNsYXRlKHggKyAodGhpcy5zY2FsZSAqIHRoaXMuZnJhbWVXaWR0aCkgLyAyLCAwKTtcbiAgICAgICAgICAgICAgICBcblx0XHQgICAgLy8gU2NhbGUgeCBieSAtMSB0byBmbGlwIGhvcml6b250YWxseVxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcblxuICAgICAgICAgICAgLy8gRHJhdyBpbWFnZSBvbiB0aGUgdHJhbnNmb3JtZWQgY29udGV4dFxuICAgICAgICAgICAgLy8gTm90ZTogYWZ0ZXIgdHJhbnNmb3JtaW5nIFswLDBdIGlzIHZpc3VhbGx5IFstd2lkdGgvMiwgMF1cbiAgICAgICAgICAgIC8vIHNvIHRoZSBpbWFnZSBuZWVkcyB0byBiZSBvZmZzZXQgYWNjb3JkaW5nbHkgd2hlbiBkcmF3blxuICAgICAgICBcdGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGVTaGVldCxcbiAgICAgICAgICAgICAgICAgICAgICh4aW5kZXggKiB0aGlzLmZyYW1lV2lkdGgpLCAoeWluZGV4ICogdGhpcy5mcmFtZUhlaWdodCkgKyBkcm93LCAgLy8gc291cmNlIGZyb20gc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVXaWR0aCwgdGhpcy5mcmFtZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgIC0odGhpcy5mcmFtZVdpZHRoICogMikgKyAodGhpcy5mcmFtZVdpZHRoIC8gMilcbiAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5mcmFtZVdpZHRoLCAvLyBPZmZzZXQgZHhcbiAgICAgICAgICAgICAgICAgICAgIHkgLSB0aGlzLnNjYWxlKnRoaXMuZnJhbWVIZWlnaHQgKyB0aGlzLnNjYWxlKjEwLFxuXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGggKiB0aGlzLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZUhlaWdodCAqIHRoaXMuc2NhbGUpO1xuXG4gICAgICAgICAgICAvLyBSZXN0b3JlIG9yaWdpbmFsIGNvbnRleHRcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAvLyBvbWcgaXQncyBmaW5hbGx5IHdvcmtpbmcgOy07XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gRHJhdyBmYWNpbmcgcmlnaHRcbiAgICAgICAgXHRjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlU2hlZXQsXG4gICAgICAgICAgICAgICAgICAgICAoeGluZGV4ICogdGhpcy5mcmFtZVdpZHRoKSwgKHlpbmRleCAqIHRoaXMuZnJhbWVIZWlnaHQpICsgZHJvdywgIC8vIHNvdXJjZSBmcm9tIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGgsIHRoaXMuZnJhbWVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICB4IC0gdGhpcy5mcmFtZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgeSAtIHRoaXMuc2NhbGUgKiB0aGlzLmZyYW1lSGVpZ2h0ICsgdGhpcy5zY2FsZSAqIDEwLCBcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVXaWR0aCAqIHRoaXMuc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVpZ2h0ICogdGhpcy5zY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKDUwLCA1MCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGN1cnJlbnRGcmFtZSAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZWxhcHNlZFRpbWUgLyB0aGlzLmZyYW1lRHVyYXRpb24pICsgdGhpcy5jb2x1bW5PZmZzZXQ7XG4gICAgfVxuXG4gICAgaXNEb25lICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmVsYXBzZWRUaW1lID49IHRoaXMudG90YWxUaW1lIC0gMSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmxvb3BzID0gMDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbjsiLCJcbi8qKioqKioqKioqKioqKioqKlxuQXNzZXRNYW5hZ2VyIGNsYXNzXG5cbnN1Y2Nlc3NDb3VudCAtIHRoZSBudW1iZXIgb2Ygc3VjY2Vzc2VzIGZldGNoaW5nIGFzc2V0c1xuZXJyb3JDb3VudCAtIHRoZSBudW1iZXIgb2YgZmFpbHVyZXMgZmV0Y2hpbmcgYXNzZXRzXG5jYWNoZSAtIHRoZSBhc3NldCBjYWNoZVxuZG93bmxvYWRRdWV1ZSAtIHRoZSBxdWV1ZSBvZiBhc3NldHMgdG8gZG93bmxvYWRcbioqKioqKioqKioqKioqKioqL1xuY2xhc3MgQXNzZXRNYW5hZ2VyIHtcblxuICAgIGNvbnN0cnVjdG9yIChkb3dubG9hZFF1ZXVlID0gW10pIHtcbiAgICAgICAgdGhpcy5zdWNjZXNzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmVycm9yQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmNhY2hlID0gW107XG4gICAgICAgIHRoaXMuZG93bmxvYWRRdWV1ZSA9IGRvd25sb2FkUXVldWU7XG4gICAgfVxuXG4gICAgLypcbiAgICBBZGRzIGFuIGFzc2V0IHBhdGggdG8gdGhlIGRvd25sb2FkIHF1ZXVlXG4gICAgKi9cbiAgICBxdWV1ZURvd25sb2FkIChwYXRoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZG93bmxvYWRRdWV1ZS5wdXNoKHBhdGgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgQ2hlY2tzIGlmIGFsbCBhc3NldHMgaGF2ZSBiZWVuIHJlc3BvbmRlZCB0byAoZWl0aGVyIHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAqL1xuICAgIGlzRG9uZSAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kb3dubG9hZFF1ZXVlLmxlbmd0aCA9PSB0aGlzLnN1Y2Nlc3NDb3VudCArIHRoaXMuZXJyb3JDb3VudCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBBdHRlbXB0cyB0byBkb3dubG9hZCBlYWNoIGFzc2V0IGluIHRoZSBxdWV1ZVxuICAgICovXG4gICAgZG93bmxvYWRBbGwgKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLmRvd25sb2FkUXVldWUubGVuZ3RoID09PSAwKSB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRvd25sb2FkUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5kb3dubG9hZFF1ZXVlW2ldO1xuICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImR1bjogXCIgKyB0aGlzLnNyYy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0aGF0LnN1Y2Nlc3NDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGF0LmlzRG9uZSgpKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5lcnJvckNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuaXNEb25lKCkpIHsgY2FsbGJhY2soKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbWcuc3JjID0gcGF0aDtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVbcGF0aF0gPSBpbWc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIEdldHMgYW4gYXNzZXRcbiAgICAqL1xuICAgIGdldEFzc2V0IChwYXRoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cocGF0aC50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbcGF0aF07XG4gICAgfVxuICAgIFxufSAvLyBlbmQgb2YgQXNzZXRNYW5hZ2VyXG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0TWFuYWdlcjtcblxuIiwiaW1wb3J0IHsgQ2FtZXJhLCBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdGllc1wiXG5cblxuY2xhc3MgTGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGltZywgc3JjX2RpbWVuc2lvbnMsIGNhbWVyYSwgc2Nyb2xsX3NwZWVkLCBoZWlnaHRfZmFjdG9yLCBkZXN0X3ksIHN0cmV0Y2g9ZmFsc2UsIHNjYWxlPTMpIHtcbiAgICAgICAgdGhpcy5pbWcgPSBpbWdcbiAgICAgICAgdGhpcy5zcmNfd2lkdGggPSBzcmNfZGltZW5zaW9uc1swXVxuICAgICAgICB0aGlzLnNyY19oZWlnaHQgPSBzcmNfZGltZW5zaW9uc1sxXVxuICAgICAgICB0aGlzLnNjcm9sbF9zcGVlZCA9IHNjcm9sbF9zcGVlZFxuICAgICAgICB0aGlzLmhlaWdodF9mYWN0b3IgPSBoZWlnaHRfZmFjdG9yXG4gICAgICAgIHRoaXMuc3RyZXRjaCA9IHN0cmV0Y2hcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFcbiAgICAgICAgdGhpcy5jYW1lcmFfZGltZW5zaW9ucyA9IFtjYW1lcmEuY2FudmFzV2lkdGgsIGNhbWVyYS5jYW52YXNIZWlnaHRdXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZVxuICAgICAgICB0aGlzLmRlc3RfeSA9IGRlc3RfeVxuICAgICAgICBcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvLyByZXBlYXQgYXMgbWFueSB0aW1lcyBhcyBuZWNlc3NhcnkgdG8gZmlsbCBjYW1lcmEgc2l6ZVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwIC0gdGhpcy5zcmNfd2lkdGg7IGkgPCB0aGlzLmNhbWVyYV9kaW1lbnNpb25zWzBdICsgdGhpcy5zcmNfd2lkdGg7IGkgKz0gdGhpcy5zcmNfd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZF9oZWlnaHQgPSAodGhpcy5jYW1lcmFfZGltZW5zaW9uc1sxXSAqIHRoaXMuaGVpZ2h0X2ZhY3RvcilcbiAgICAgICAgICAgICAgICBsZXQgZF95ID0gdGhpcy5kZXN0X3kgKiB0aGlzLmhlaWdodF9mYWN0b3JcbiAgICAgICAgICAgICAgICAvLyAwICsgKCh0aGlzLmhlaWdodF9mYWN0b3IpKSAqIHRoaXMuY2FtZXJhX2RpbWVuc2lvbnNbMV1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0cmV0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZF9oZWlnaHQgPSB0aGlzLmNhbWVyYV9kaW1lbnNpb25zWzFdXG4gICAgICAgICAgICAgICAgICAgIC8vIGRfeSA9IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCwgdGhpcy5zcmNfaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAoaSArICgodGhpcy5jYW1lcmEueFZpZXcqIHRoaXMuc2Nyb2xsX3NwZWVkKSAlICh0aGlzLnNyY193aWR0aCkpKSogdGhpcy5zY2FsZSwgXG4gICAgICAgICAgICAgICAgICAgIGRfeSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGggKiB0aGlzLnNjYWxlLCBcbiAgICAgICAgICAgICAgICAgICAgZF9oZWlnaHRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5jbGFzcyBCYWNrZ3JvdW5kIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBhc3NldF9tYW5hZ2VyLCBjdHgsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLmdhbWVfZW5naW5lID0gZ2FtZV9lbmdpbmVcbiAgICAgICAgdGhpcy5hc3NldF9tYW5hZ2VyID0gYXNzZXRfbWFuYWdlclxuICAgICAgICB0aGlzLmN0eCA9IGN0eFxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYVxuICAgICAgICB0aGlzLmxheWVycyA9IFtcbiAgICAgICAgICAgIFwiaW1nL2JnLzFfYmcucG5nXCIsXG4gICAgICAgICAgICBcImltZy9iZy8yX2ZhcmJ1aWxkaW5ncy5wbmdcIixcbiAgICAgICAgICAgIFwiaW1nL2JnLzNfYnVpbGRpbmdzLnBuZ1wiLFxuICAgICAgICAgICAgXCJpbWcvYmcvNF9mb3JlZ3JvdW5kLnBuZ1wiLFxuICAgICAgICAgICAgXCJpbWcvYmcvYm90X2ZpbGwucG5nXCJcbiAgICAgICAgXVxuXG4gICAgICAgIHRoaXMubWFrZV9iYWNrZ3JvdW5kKClcblxuXG4gICAgfVxuXG4gICAgbWFrZV9iYWNrZ3JvdW5kICgpIHtcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy8xX2JnLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjcyLCAxNjBdLCB0aGlzLmNhbWVyYSwgMC4xLCAxLCAwLCB0cnVlKSlcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy8yX2ZhcmJ1aWxkaW5ncy5wbmdcIiksIFxuICAgICAgICAgICAgWzIxMywgMTQyXSwgdGhpcy5jYW1lcmEsIDAuMTUsIDAuMzUsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy8zX2J1aWxkaW5ncy5wbmdcIiksIFxuICAgICAgICAgICAgWzI3MiwgMTUwXSwgdGhpcy5jYW1lcmEsIDAuMiwgMC40LCB0aGlzLmNhbWVyYS5jYW52YXNIZWlnaHQvMikpXG4gICAgICAgIC8vIHRoaXMuZ2FtZV9lbmdpbmUuYWRkQmFja2dyb3VuZExheWVyKG5ldyBMYXllcih0aGlzLmFzc2V0X21hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvYmcvNF9mb3JlZ3JvdW5kLnBuZ1wiKSwgXG4gICAgICAgICAgICAvLyBbMjcyLCAxMDRdLCB0aGlzLmNhbWVyYSwgMC4yNSwgLjUsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy9ib3RfZmlsbC5wbmdcIiksIFxuICAgICAgICAgICAgWzI1MCwgMjUwXSwgdGhpcy5jYW1lcmEsIDEsIDEsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFja2dyb3VuZDsiLCJpbXBvcnQgQXNzZXRNYW5hZ2VyIGZyb20gXCIuL2Fzc2V0LW1hbmFnZXJcIlxuaW1wb3J0IEdhbWVFbmdpbmUgZnJvbSBcIi4vZ2FtZS1lbmdpbmVcIlxuaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9lbnRpdGllcy9nYW1lLWJvYXJkXCJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4vZW50aXRpZXMvY2FtZXJhXCJcbmltcG9ydCBIdWQgZnJvbSBcIi4vaHVkXCJcbmltcG9ydCBUZXJyYWluIGZyb20gXCIuL2VudGl0aWVzL3RlcnJhaW5cIlxuaW1wb3J0IEJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZFwiXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9lbnRpdGllcy9oZXJvXCJcbmltcG9ydCBTb3VuZCBmcm9tIFwiLi9zb3VuZFwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gdGhlIFwibWFpblwiIGNvZGUgYmVnaW5zIGhlcmVcblxuICAgIHRvbG9hZCA9IFtcbiAgICAgICAgXCJpbWcvWlhlLnBuZ1wiLFxuICAgICAgICBcImltZy9MZW8ucG5nXCIsXG4gICAgICAgIFwiaW1nL0VuZW15U2hlZXQxLnBuZ1wiLFxuICAgICAgICBcImltZy9waXBlcy5wbmdcIixcbiAgICAgICAgXCJpbWcvRW5lbWllcy5wbmdcIixcbiAgICAgICAgXCJpbWcvaHVkLnBuZ1wiLFxuICAgICAgICBcImltZy9oZWFsdGhwYWNrLnBuZ1wiLFxuICAgICAgICBcImltZy9lbmVyZ3lwYWNrLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy8xX2JnLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy8yX2ZhcmJ1aWxkaW5ncy5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvM19idWlsZGluZ3MucG5nXCIsXG4gICAgICAgIFwiaW1nL2JnLzRfZm9yZWdyb3VuZC5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvYm90X2ZpbGwucG5nXCJcbiAgICBdO1xuXG4gICAgbGV0IEFTU0VUX01BTkFHRVIgPSBuZXcgQXNzZXRNYW5hZ2VyKHRvbG9hZCk7XG5cbiAgICBBU1NFVF9NQU5BR0VSLmRvd25sb2FkQWxsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydGluZyB1cCBkYSBzaGVpbGRcIik7XG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVdvcmxkJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYW52YXMgd2lkdGg6IFwiICsgY2FudmFzLndpZHRoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYW52YXMgaGVpZ2h0OiBcIiArIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGxldCBnYW1lRW5naW5lID0gbmV3IEdhbWVFbmdpbmUoKTtcbiAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBDYW1lcmEoZ2FtZUVuZ2luZSwgMCwgMCwgbnVsbCwgY3R4ID0gY3R4LCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIDIwMDAsIDIwMDApO1xuICAgICAgICBsZXQgaGVybyA9IG5ldyBIZXJvKGdhbWVFbmdpbmUsIDAsIDAsIEFTU0VUX01BTkFHRVIuZ2V0QXNzZXQoXCJpbWcvWlhlLnBuZ1wiKSwgY3R4KTtcbiAgICAgICAgbGV0IGJvYXJkID0gbmV3IEdhbWVCb2FyZChnYW1lRW5naW5lLCBBU1NFVF9NQU5BR0VSLCBjdHgpO1xuICAgICAgICBnYW1lRW5naW5lLmhlcm8gPSBoZXJvO1xuICAgICAgICBnYW1lRW5naW5lLmdhbWVib2FyZCA9IGJvYXJkO1xuICAgICAgICBsZXQgaHVkID0gbmV3IEh1ZChnYW1lRW5naW5lLCBBU1NFVF9NQU5BR0VSLmdldEFzc2V0KFwiaW1nL2h1ZC5wbmdcIiksIGhlcm8sIFswLCAwXSwgWzAsIDBdLCBbMTAwLCAxMDBdLCAzLCBjYW1lcmEpO1xuICAgICAgICBib2FyZC5odWQgPSBodWQ7XG4gICAgICAgIGJvYXJkLmhlcm8gPSBoZXJvO1xuICAgICAgICBcbiAgICAgICAgLy8gIyMjIG11c2ljICMjI1xuICAgICAgICBcbiAgICAgICAgLy9UT0RPOiBQbGFjZWhvbGRlciBtYWdpYyBudW1iZXJzIHVudGlsIHdlIGRlY2lkZSBvbiBob3cgdG8gaGFuZGxlIHdvcmxkIGJvdW5kYXJ5IGFuZCBjYW1lcmFcblxuICAgICAgICAvKipOT1RFOiBJVCBJUyBWRVJZIElNUE9SVEFOVCBDQU1FUkEgSVMgVEhFIEZJUlNUIEFEREVEIEVOVElUWSoqL1xuXG4gICAgICAgIGdhbWVFbmdpbmUuYWRkRW50aXR5KGNhbWVyYSk7XG4gICAgICAgIGdhbWVFbmdpbmUuY2FtZXJhID0gY2FtZXJhO1xuXG4gICAgICAgIGxldCBiYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoZ2FtZUVuZ2luZSwgQVNTRVRfTUFOQUdFUiwgY3R4LCBjYW1lcmEpO1xuXG4gICAgICAgIC8vTG9hZHMgbGV2ZWwgblxuICAgICAgICBib2FyZC5nZXRMZXZlbCgxKTtcblxuICAgICAgICBjYW1lcmEuZm9sbG93KGhlcm8pO1xuICAgICAgICBnYW1lRW5naW5lLmFkZEVudGl0eShib2FyZCk7XG4gICAgICAgIC8vZ2FtZUVuZ2luZS5hZGRFbnRpdHkoaGVybyk7XG4gICAgICAgIC8vZ2FtZUVuZ2luZS5hZGRFbnRpdHkoaHVkKTtcbiAgICAgICAgZ2FtZUVuZ2luZS5pbml0KGN0eCk7XG4gICAgICAgIGdhbWVFbmdpbmUuc3RhcnQoKTtcbiAgICB9KTtcbn0iLCJpbXBvcnQge0VudGl0eX0gZnJvbSBcIi4vXCJcblxuXG4vKioqKioqKioqKipcbkFjdG9yIGludGVyZmFjZVxuVGhpcyBpbnRlcmZhY2UgaXMgZGVzaWduZWQgdG8gZW5jb21wYXNzIGFueSBFbnRpdHkgdGhhdCBhY3RzIHVwb24gdGhlIGdhbWUgbGV2ZWwuIFRoaXMgY2xhc3Mgc2hvdWxkIG5vdCBiZSBpbnN0YW50aWF0ZWQuXG5BbnkgYWN0aW9uIHNoYXJlZCBiZXR3ZWVuIGFjdG9ycyBpcyBsb2NhdGVkIGhlcmUuXG5cbmdhbWUgLSBhIHJlZmVyZW5jZSB0byB0aGUgZ2FtZSBpbiB3aGljaCB0aGlzIGVudGl0eSBleGlzdHNcbngsIHkgLSBlbnRpdHkncyBjb29yZGluYXRlc1xucmVtb3ZlRnJvbVdvcmxkIC0gYSBmbGFnIHRoYXQgZGVub3RlcyB3aGVuIHRvIHJlbW92ZSB0aGlzIGVudGl0eSBmcm9tIHRoZSBnYW1lXG4qKioqKioqKioqKiovXG5jbGFzcyBBY3RvciBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IgKGdhbWUsIHgsIHksIGltZz1udWxsLCBjdHg9bnVsbCwgc2NhbGU9bnVsbCwgc3ByaXRlV2lkdGggPSAwLCBzcHJpdGVIZWlnaHQgPSAwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW50aXR5XCI7XG5cbiAgICAgICAgdGhpcy5mYWNpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcblxuICAgICAgICAvL0FkZGVkIHRoZXNlcyBwb3N0LWhvYyBmb3IgYmV0dGVyIGZ1dHVyZSBkZXZlbG9wbWVudC4gKG5vdCBjdXJyZW50bHkgdXNlZCBpbiBhbnkgJ3N1cGVyJyBjb25zdHJ1Y3Rpb24gY2FsbHMpXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcbiAgICB9XG4gICAgXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSAoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKipIRUxQRVIgRlVOQ1RJT05TKioqL1xuICAgIHVwZGF0ZVBvcyh4LCB5KSB7XG4gICAgICAgIHRoaXMueCArPSB4O1xuICAgICAgICB0aGlzLmJvdW5kWCArPSB4O1xuICAgICAgICB0aGlzLnkgKz0geTtcbiAgICAgICAgdGhpcy5ib3VuZFkgKz0geTtcbiAgICB9XG5cbiAgICBzZXRQb3MoY29vcmRpbmF0ZXMgPSBbMCwgMF0pIHtcbiAgICAgICAgdGhpcy54ID0gY29vcmRpbmF0ZXNbMF07XG4gICAgICAgIHRoaXMuYm91bmRYID0gY29vcmRpbmF0ZXNbMF07XG4gICAgICAgIHRoaXMueSA9IGNvb3JkaW5hdGVzWzFdO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IGNvb3JkaW5hdGVzWzFdO1xuICAgIH1cbn0gXG5leHBvcnQgZGVmYXVsdCBBY3RvcjsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBIdXJ0Ym94LCAgICBcbiAgICBQcm9qZWN0aWxlLFxuICAgIFRlcnJhaW5cbn0gZnJvbSBcIi4vXCJcblxuXG4vL3JvdyA5LCA0MHgzMCwgb2Zmc2V0IDExLCA0IGZyYW1lc1xuY2xhc3MgQm9tYiBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSA0MCwgc3ByaXRlSGVpZ2h0ID0gMzAsIGZhY2luZ1JpZ2h0ID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIC8qVW5pcXVlIHRvIEJvbWIqL3hWZWxvY2l0eSA9IDcsIHlWZWxvY2l0eSA9IC0yMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0geFZlbG9jaXR5O1xuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiAyMDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiAxNTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArIDE1O1xuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1swXSA9IDUwMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IDcwMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICB0aGlzLmxhdW5jaHRpbWUgPSAyNTtcbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSA0O1xuICAgICAgICB0aGlzLnN0YXJ0dXAgPSAzO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IHlWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IC4wMztcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsYXVuY2hpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYWN0aXZhdGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGV0b25hdGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZXhwbG9kaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJleHBsb2RlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVmbGVjdGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJsYXVuY2hcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxNywgNSwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTEpLFxuICAgICAgICAgICAgXCJhY3RpdmF0ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDE3LCA3LCAyLCB0cnVlLCB0aGlzLnNjYWxlLCAxMiksXG4gICAgICAgICAgICBcImRldG9uYXRlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTcsIDYsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDE0KSxcbiAgICAgICAgICAgIFwiZXhwbG9kZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNCwgMTcsIDUsIDcsIGZhbHNlLCB0aGlzLnNjYWxlICsgMywgMTApLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5mYWNpbmcgPSAxOyB9IGVsc2UgeyB0aGlzLmZhY2luZyA9IC0xOyB9XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmxhdW5jaDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5sYXVuY2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKHRoaXMuZmFjaW5nKnRoaXMueFZlbG9jaXR5LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZhdGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3ModGhpcy5mYWNpbmcgKiB0aGlzLnhWZWxvY2l0eSwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiB0aGlzLmNvdW50ZG93bikge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRldG9uYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5kZXRvbmF0aW5nKSB7XG4gICAgICAgICAgICAvL1RoaXMgXCJGYWNpbmcgSGVyb1wiIGNoZWNrIG1ha2VzIHN1cmUgdGhhdCwgaWYgSGVybyBjcm9zc2VzIGF4aXMgYmVmb3JlIGV4cGxvc2lvbixcbiAgICAgICAgICAgIC8vSGVybyB3aWxsIGJlIHB1c2hlZCBiYWNrIGluIHRoZSBjb3JyZWN0IGRpcmVjdGlvbiBvbiBzdHVuXG4gICAgICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gdGhpcy5zdGFydHVwKSB7XG4gICAgICAgICAgICAgICAgLy9TcGF3biBleHBsb3Npb24gaHVydGJveFxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGV0b25hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmV4cGxvZGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmV4cGxvZGluZykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5leHBsb2RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gMiAqIHRoaXMuc3ByaXRlV2lkdGggLSAzMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gMzA7XG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvblggPSAxNTA7XG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvblkgPSAxNTA7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImV4cGxvc2lvbl8xXCIpXG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xLjc1ICogZXhwbG9zaW9uWCArIDEwLCB0aGlzLnNwcml0ZUhlaWdodCAtIDIwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgZXhwbG9zaW9uWCwgZXhwbG9zaW9uWSwgdGhpcy5zY2FsZSArIDIsIE1hdGgubWF4KDQsIHRoaXMuZGFtYWdlKSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsICF0aGlzLnN0YXRlcy5yZWZsZWN0ZWQsIFwiaGVhbHRoXCIsIDE1KTtcbiAgICAgICAgICAgICAgICBodXJ0Ym94LnBhcmVudCA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGh1cnRib3gpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmV4cGxvZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZXhwbG9kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIHRoaXMueVZlbG9jaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubGF1bmNoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sYXVuY2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2YXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5kZXRvbmF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZXRvbmF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZXhwbG9kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5leHBsb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIC8vVE9ETyBBZGQgY29sbGlzaW9uIHdpdGggdGVycmFpblxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScgJiYgIXRoaXMuc3RhdGVzLmV4cGxvZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQgLSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueFZlbG9jaXR5ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueFZlbG9jaXR5IC09IHRoaXMuZmFjaW5nICogdGhpcy54VmVsb2NpdHkgKiB0aGlzLmZyaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54VmVsb2NpdHkgKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhWZWxvY2l0eSAqIHRoaXMuZnJpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxhdW5jaGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sYXVuY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZhdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCAtIHRoaXMuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxhdW5jaGluZyA9IGZhbHNlLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGV0b25hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZXhwbG9kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IDA7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICAvL0lmIGhlcm8gaXMgY2xlYXZpbmcsIGRvLi4uXG4gICAgICAgICAgICAgICAgICAgIC8vSGl0IGJvbWIgYXdheVxuICAgICAgICAgICAgICAgIC8vRWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxhdW5jaGluZyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kZXRvbmF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZXhwbG9kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvbWI7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW5lbXksXG4gICAgVGVycmFpbixcbiAgICBIZXJvLFxuICAgIFByb2plY3RpbGUsXG4gICAgSHVydGJveCxcbiAgICBBY3RvclxufSBmcm9tIFwiLi9cIlxuXG5cblxuY2xhc3MgQnVsbGV0IGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNTApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSA3O1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHsgdGhpcy54ICs9IDEwMDsgfSBlbHNlIHsgdGhpcy54IC09IDEwMCB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSAzMDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDMwO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgLSAodGhpcy5zcHJpdGVIZWlnaHQpIC0gNztcbiAgICAgICAgaWYgKCFmYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMikgLSAyKnRoaXMuc3ByaXRlV2lkdGg7IC8vKzEwMCBhbGlnbnMgd2l0aCB0aGUgZ3VuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDIqdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDE1MDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImJ1bGxldFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDE4LCAyMCwgMiwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTYpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5idWxsZXQ7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL1RPRE9cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy54LCB0aGlzLnksXG4gICAgICAgICAgICAgICAgLy8gICAgMCwgMCwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDEwLCAxMCwgdGhpcy5zY2FsZSwgNTAsIHRoaXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiA3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYnVsbGV0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiIHx8IG90aGVyLm5hbWUgPT09IFwiU3Bpa2VzXCIgfHwgb3RoZXIubmFtZSA9PT0gXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiaXNFbmVteVwiKTtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiUmVmbGVjdGJveFwiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9ICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IFwiUHJvamVjdGlsZVwiO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSAxO1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAxNTA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkJ1bGxldFwiKSB7XG4gICAgICAgICAgICAgICAgb3RoZXIucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3RoZXIucGFyZW50Q2xhc3MgPT09IFwiRW5lbXlcIikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aCArIDU7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ7XG4iLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiXG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuXG5cbi8qKioqKioqKioqKlxuQ2FtZXJhIGNsYXNzXG54VmlldywgeVZpZXcgLSBwb3NpdGlvbiBvZiBjYW1lcmEgKHRvcCBsZWZ0KVxuY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCAtIGNhbWVyYSBkaW1lbnNpb25zXG53b3JsZFdpZHRoLCB3b3JsZEhlaWdodCAtIGRpbWVuc2lvbnMgdGhhdCByZXByZXNlbnQgdGhlIHdvcmxkJ3MgYm91bmRhcnlcblxuKioqKioqKioqKiovXG5jbGFzcyBDYW1lcmEgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHhWaWV3LCB5Vmlldz0wLCBpbWc9bnVsbCwgY3R4PW51bGwsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHdvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHhWaWV3LCB5VmlldywgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gY2FudmFzV2lkdGg7IC8vdGhpcyBpcyB0aGUgdmlld3BvcnQsIE5PVCB0aGUgc2FtZSBhcyBjYW52YXMgaW4gY29yZS5qc1xuICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNhbnZhc0hlaWdodDsgLy90aGlzIGlzIHRoZSB2aWV3cG9ydCwgTk9UIHRoZSBzYW1lIGFzIGNhbnZhcyBpbiBjb3JlLmpzXG4gICAgICAgIHRoaXMud29ybGRXaWR0aCA9IHdvcmxkV2lkdGg7XG4gICAgICAgIHRoaXMud29ybGRIZWlnaHQgPSB3b3JsZEhlaWdodDtcbiAgICAgICAgdGhpcy5hYnNPZmZYID0gMjtcbiAgICAgICAgdGhpcy5hYnNPZmZZID0gMS41O1xuICAgICAgICB0aGlzLm9mZlggPSB0aGlzLmNhbnZhc1dpZHRoL3RoaXMuYWJzT2ZmWDtcbiAgICAgICAgdGhpcy5vZmZZID0gdGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkgKyAxMDA7XG4gICAgICAgIHRoaXMuY2FtU3BlZWRYID0gODtcbiAgICAgICAgdGhpcy5jYW1TcGVlZFkgPSA4O1xuXG5cbiAgICAgICAgLy8gcG9zc2libGUgYXhpcyB0aGUgY2FtZXJhIGNhbiBtb3ZlIGluLiBub3QgaW1wbGVtZW50ZWQgeWV0XG4gICAgICAgIHRoaXMuYXhpcyA9IHtcbiAgICAgICAgICAgIFwibm9uZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaG9yaXpvbnRhbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwidmVydGljYWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImJvdGhcIjogdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gb2JqZWN0IHRvIGJlIGZvbGxvd2VkICh0aGUgSGVybylcbiAgICAgICAgdGhpcy5mb2xsb3dlZCA9IG51bGw7XG4gICAgfVxuXG4gICAgZm9sbG93IChvYmopIHtcbiAgICAgICAgdGhpcy5mb2xsb3dlZCA9IG9iajtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvLyAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy9yZXNldCB0cmFuc2Zvcm0gbWF0cml4XG4gICAgICAgIC8vICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KTsgLy8gY2xlYXIgdmlld3BvcnQgYWZ0ZXIgbWF0cml4IGlzIHJlc2V0XG4gICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnhWaWV3LCB0aGlzLnlWaWV3KTtcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vIE5vdGU6IHRoaXMgbG9naWMgZmVlbHMgSE9SUklCTFkgd3JvbmcsIGJ1dCBpdCB3b3JrcyBmb3Igbm93LCBzbyB5YXk/XG4gICAgICAgIGlmICh0aGlzLmZvbGxvd2VkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQm91bmRzKCk7XG4gICAgICAgICAgICAvL1RPRE86IG5lZWQgdG8gZmlndXJlIG91dCB3b3JsZCBib3VuZHMgZm9yIG1pbiBhbmQgbWF4IGNsYW1waW5nXG4gICAgICAgICAgICB0aGlzLnhWaWV3ID0gLXRoaXMuZm9sbG93ZWQueCArIHRoaXMub2ZmWDtcbiAgICAgICAgICAgIHRoaXMueVZpZXcgPSAtdGhpcy5mb2xsb3dlZC55ICsgdGhpcy5vZmZZO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgLy9jb25zb2xlLmxvZyhcInhWaWV3OiBcIiArIHRoaXMueFZpZXcpO1xuICAgICAgICAgLy9jb25zb2xlLmxvZyhcInlWaWV3OiBcIiArIHRoaXMueVZpZXcpO1xuICAgICAgICAgLy9jb25zb2xlLmxvZyhcImhlcm8geDogXCIgKyB0aGlzLmZvbGxvd2VkLngpO1xuICAgICAgICAgLy9jb25zb2xlLmxvZyhcImhlcm8geTogXCIgKyB0aGlzLmZvbGxvd2VkLnkpO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlQm91bmRzKCkge1xuICAgICAgICBpZiAoISh0aGlzLm9mZlggPT09IHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZYICsgMTAgPCBNYXRoLmZsb29yKHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpKSB7IHRoaXMub2ZmWCArPSB0aGlzLmNhbVNwZWVkWDsgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vZmZYIC0gMTAgPiBNYXRoLmZsb29yKHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpKSB7IHRoaXMub2ZmWCAtPSB0aGlzLmNhbVNwZWVkWDsgfVxuICAgICAgICAgICAgZWxzZSAodGhpcy5vZmZYID0gdGhpcy5jYW52YXNXaWR0aCAvIHRoaXMuYWJzT2ZmWCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEodGhpcy5vZmZZID09PSB0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9mZlkgKyAxMCA8IE1hdGguZmxvb3IodGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkpKSB7IHRoaXMub2ZmWSArPSB0aGlzLmNhbVNwZWVkWTsgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vZmZZIC0gMTAgPiBNYXRoLmZsb29yKHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZKSkgeyB0aGlzLm9mZlkgLT0gdGhpcy5jYW1TcGVlZFk7IH1cbiAgICAgICAgICAgIGVsc2UgKHRoaXMub2ZmWSA9IHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJvdW5kc0NoZWNrKHZhbCwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbCwgbWluKSwgbWF4KTtcbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IENhbWVyYTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBIZXJvLFxuICAgIEh1cnRib3gsXG4gICAgSXRlbSxcbiAgICBQcm9qZWN0aWxlLFxuICAgIFRlcnJhaW5cbn0gZnJvbSBcIi4vXCJcblxuXG5jbGFzcyBDcm93IGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDUwLCBzcHJpdGVIZWlnaHQgPSA0MCxcbiAgICAgICAgICAgICAgICAgICAgLypVbmlxdWUgdG8gQ3Jvdyovc2lnaHRSYWRpdXMgPSBbNzAwLCA1MDBdLCBtdXJkZXJMZWFkZXIgPSBmYWxzZSwgbXVyZGVyRHJvb2dzID0gW1swLCAwXSwgWzAsIDBdXSkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiAyMDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiAxNTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMubXVyZGVyTGVhZGVyID0gbXVyZGVyTGVhZGVyO1xuICAgICAgICB0aGlzLnBvaW50VmFsdWUgPSAxMDtcbiAgICAgICAgdGhpcy54U3BlZWQgPSA0O1xuICAgICAgICB0aGlzLnlTcGVlZCA9IDg7XG4gICAgICAgIHRoaXMubWF4WCA9IDU7XG4gICAgICAgIHRoaXMubWF4WSA9IDk7XG4gICAgICAgIHRoaXMueEFjY2VsID0gLjM1O1xuICAgICAgICB0aGlzLnlBY2NlbCA9IC40O1xuXG4gICAgICAgIHRoaXMuYXR0YWNrQW5nbGUxID0gMjtcbiAgICAgICAgdGhpcy5hdHRhY2tBbmdsZTIgPSAxMDtcbiAgICAgICAgdGhpcy54QXR0YWNrID0gMTdcbiAgICAgICAgdGhpcy54UmVjb3ZlciA9IDc7XG4gICAgICAgIHRoaXMueVJlY292ZXIgPSA0O1xuICAgICAgICB0aGlzLnJlY292ZXJEaXN0YW5jZSA9IDQwMDtcbiAgICAgICAgdGhpcy54UmVjb3ZlckRpc3RhbmNlO1xuICAgICAgICB0aGlzLnlSZWNvdmVyRGlzdGFuY2U7XG4gICAgICAgIGlmICh0aGlzLm11cmRlckxlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5kcm9vZ09uZSA9IG11cmRlckRyb29nc1swXTtcbiAgICAgICAgICAgIHRoaXMuZHJvb2dUd28gPSBtdXJkZXJEcm9vZ3NbMV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gc2lnaHRSYWRpdXNbMF07XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMV0gPSBzaWdodFJhZGl1c1sxXTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICB0aGlzLnJhbmQgPSAwO1xuXG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmbHlpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImF0dGFja2luZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYXR0YWNraW5nX2ZpbmFsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZWNvdmVyaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJodXJ0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpZGxpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZmx5XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOCwgMTEsIDUsIDUsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJhdHRhY2tcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA4LCAxMSwgNiwgMywgZmFsc2UsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICAgICAgXCJhdHRhY2tfZmluYWxcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA4LCAxMSwgNiwgMiwgdHJ1ZSwgdGhpcy5zY2FsZSwgOCksXG4gICAgICAgICAgICBcImh1cnRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA4LCAxMSwgNSwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTApLFxuICAgICAgICAgICAgLy9UT0RPOiBBZGQgXCJzbW9rZWJvbWJcIiBlZmZlY3QgZm9yIGFjdGl2YXRpb25cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmx5O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5yZWNvdmVyaW5nICYmICF0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gdGhpcy5zaWdodFJhZGl1c1swXVxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzFdKSB7XG4gICAgICAgICAgICAgICAgLy9kaXNhYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vZW5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVyZGVyTGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9vZzEgPSBuZXcgQ3Jvdyh0aGlzLmdhbWUsIHRoaXMueCArIHRoaXMuZHJvb2dPbmVbMF0sIHRoaXMueSArIHRoaXMuZHJvb2dPbmVbMV0sIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIFsyMDAwLCAyMDAwXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9vZzIgPSBuZXcgQ3Jvdyh0aGlzLmdhbWUsIHRoaXMueCArIHRoaXMuZHJvb2dUd29bMF0sIHRoaXMueSArIHRoaXMuZHJvb2dUd29bMV0sIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIFsyMDAwLCAyMDAwXSk7XG4gICAgICAgICAgICAgICAgICAgIGRyb29nMS5sZXZlbCA9IHRoaXMubGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIGRyb29nMS5zZWN0aW9uID0gdGhpcy5zZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBkcm9vZzIubGV2ZWwgPSB0aGlzLmxldmVsO1xuICAgICAgICAgICAgICAgICAgICBkcm9vZzIuc2VjdGlvbiA9IHRoaXMuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShkcm9vZzEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGRyb29nMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mbHlpbmcpIHsgLy90aGlzLnVwZGF0ZUhpdGJveCg1MCwgNDAsIDIwLCAxNSk7XG4gICAgICAgICAgICAvL0FwcGx5IHNwZWVkIHVwZGF0ZXMgYW5kIGNoYXNlIEhlcm8vc3RheSBpbiBhdHRhY2sgcmFuZ2VcbiAgICAgICAgICAgIGlmICgodGhpcy54U3BlZWQgPCB0aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IDEpIHx8ICh0aGlzLnhTcGVlZCA+IC10aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IC0xKSkge1xuICAgICAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuZmFjaW5nICogdGhpcy54QWNjZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA+PSAtMTI1KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVNwZWVkID4gLXRoaXMubWF4WSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlTcGVlZCAtPSB0aGlzLnlBY2NlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA8PSAtMjAwKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U3BlZWQgPCB0aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgKz0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU3RheSB3aXRoaW4gQ3JvdydzIGF0dGFjayByYWRpdXNcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA+PSA1MDAgJiYgdGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMueFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMueFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gMjUwICYmIHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCAtPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGJlbG93IGhlcm87XG4gICAgICAgICAgICAvL2lmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55IDw9IDEwMCkge1xuICAgICAgICAgICAgLy8gICAgdGhpcy55ICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vLy8gYWJvdmUgaGVyb1xuICAgICAgICAgICAgLy9lbHNlIGlmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55ID49IDIwMCkge1xuICAgICAgICAgICAgLy8gICAgdGhpcy55ICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgLy9BVFRBQ0shISFcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA3MDBcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA8IC0xMDAgJiYgKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpID4gLTIwMFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDEgJiYgTWF0aC5yYW5kb20oKSAqIDEwMCA8PSAxMCkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNvdW5kLnBsYXkoXCJjcm93X2Nhd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYXR0YWNraW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yYW5kID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnkgLT0gdGhpcy5hdHRhY2tBbmdsZTE7XG4gICAgICAgICAgICAgICAgLy90aGlzLmJvdW5kWSAtPSB0aGlzLmF0dGFja0FuZ2xlMjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygtdGhpcy5mYWNpbmcgKiB0aGlzLnhBdHRhY2svMiwgLXRoaXMuYXR0YWNrQW5nbGUxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy55IC09IHRoaXMuYXR0YWNrQW5nbGUyO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5ib3VuZFkgLT0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoLXRoaXMuZmFjaW5nICogdGhpcy54QXR0YWNrLzIsIC10aGlzLmF0dGFja0FuZ2xlMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMueCAtPSB0aGlzLmZhY2luZyo3O1xuICAgICAgICAgICAgLy90aGlzLmJvdW5kWCAtPSB0aGlzLmZhY2luZyo3OyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy9yYW5kb21seSBkZXRlcm1pbmUgYW5nbGUgb2YgYXR0YWNrIChtYWtlcyBwcmVkaWN0aW9uIGhhcmRlcilcbiAgICAgICAgICAgICAgICAvL21pbiBhdHRhY2sgYW5nbGUgb2YgMlxuICAgICAgICAgICAgICAgIC8vdGhpcy5hdHRhY2tBbmdsZSA9IDIgKyBNYXRoLnJhbmRvbSgpICogODsgXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsKSB7XG4gICAgICAgICAgICBpZih0aGlzLnJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5hdHRhY2tBbmdsZTE7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy5hdHRhY2tBbmdsZTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhBdHRhY2s7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLmZhY2luZyAqIHRoaXMueEF0dGFjaztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ5OiBcIiArIHRoaXMueSk7XG5cblxuICAgICAgICAgICAgLy9TcGF3biBIdXJ0Ym94XG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlcy5mYWNpbmdSaWdodClcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMueCwgdGhpcy55LCAtNDUsIDEwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNDAsIDQwLCB0aGlzLnNjYWxlLCAxLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy54LCB0aGlzLnksIC00NSAtIHRoaXMuc3ByaXRlV2lkdGggLSAzMCwgMTAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA0MCwgNDAsIHRoaXMuc2NhbGUsIDEsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG5cbiAgICAgICAgICAgIC8vc3RhdGUgZmluaXNoZWRcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHsgLy9hZnRlciBhdHRhY2sgaXMgZmluaXNoZWRcbiAgICAgICAgICAgIC8vZmx5IGF3YXlcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLmZhY2luZyAqIHRoaXMueFJlY292ZXI7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLmZhY2luZyAqIHRoaXMueFJlY292ZXI7XG4gICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy55UmVjb3ZlcjtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZIC09IHRoaXMueVJlY292ZXI7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPj0gdGhpcy5yZWNvdmVyRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZWNvdmVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaHVydCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHsgLy8gREVBVEggUkFUVExFXG4gICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5yYW5kb20oKSAqIDU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSBNYXRoLnJhbmRvbSgpICogNVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSBNYXRoLnJhbmRvbSgpICogNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IE1hdGgucmFuZG9tKCkgKiA1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDgpIHtcbiAgICAgICAgICAgICAgICAvL3Jlc2V0IGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgc3RhdGVzXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaHVydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vZW5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQ7XG4gICAgICAgICAgICAgICAgLy91cGRhdGUgaGl0Ym94XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDQwLCAyMCwgMTUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgKiAxMDAgPD0gMjcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEl0ZW0uSGVhbHRoUGFjayh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmdhbWUuZ2FtZWJvYXJkLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9oZWFsdGhwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCAzLCA1KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBJdGVtLkVuZXJneVBhY2sodGhpcy5nYW1lLCB0aGlzLnggKyAzMCwgdGhpcy55LCB0aGlzLmdhbWUuZ2FtZWJvYXJkLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9lbmVyZ3lwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCAzLCA1KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmx5aW5nIHx8IHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5mbHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmF0dGFja2luZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYXR0YWNrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmF0dGFja19maW5hbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaHVydCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaHVydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAvL251bGxcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiUHJvamVjdGlsZVwiICYmICF0aGlzLnN0YXRlcy5odXJ0ICYmICF0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaHVydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIkh1cnRib3hcIiAmJiAhdGhpcy5zdGF0ZXMuaHVydCAmJiAhdGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaHVydCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyb3c7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW5lbXksXG4gICAgVGVycmFpbixcbiAgICBQcm9qZWN0aWxlLFxuICAgIFJvY2tldCxcbiAgICBIdXJ0Ym94LFxufSBmcm9tIFwiLi9cIlxuXG5cbmNsYXNzIERpbm8gZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoID0gOTAsIHNwcml0ZUhlaWdodCA9IDYwLCBwYXRyb2xEaXN0YW5jZSA9IDAsIHNob3RUaW1lT2Zmc2V0ID0gMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDI7XG4gICAgICAgIHRoaXMuaGVybyA9IHRoaXMuZ2FtZS5oZXJvO1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogMzU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogMzU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAodGhpcy5zcHJpdGVIZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuXG4gICAgICAgIHRoaXMuc3RhcnRYID0geDtcbiAgICAgICAgdGhpcy5tYXhYID0gdGhpcy5zdGFydFggKyBwYXRyb2xEaXN0YW5jZTsgLy9DaGFuZ2UgdGhpcyB0byBhbHRlciBkaW5vJ3MgcGF0cm9sIGRpc3RhbmNlXG4gICAgICAgIFxuICAgICAgICAvL1RpbWVyc1xuICAgICAgICB0aGlzLnNob3RDb29sZG93biA9IDI1MDtcbiAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciA9IHNob3RUaW1lT2Zmc2V0O1xuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDE1XG4gICAgICAgIHRoaXMuaGVhbHRoID0gMjAwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1swXSA9IDE1MDA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMV0gPSAxMDAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaWRsaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcInNob290aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJ3YWxraW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJncm91bmRlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicGF0cm9sbGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZnJhbWVsb2NrZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiAgICAgICAgICAgICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDYwXSwgNiwgMTMsIDUsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEyKSxcbiAgICAgICAgICAgIFwid2Fsa19zdHJhaWdodFwiOiAgICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDYwXSwgNiwgMTMsIDksIDYsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgLy9cIndhbGtfZG93blwiOiAgICAgICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA2MF0sIDYsIDEzLCA3LCA2LCB0cnVlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgICAgIC8vXCJ3YWxrX3VwXCI6ICAgICAgICAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNzBdLCA2LCAxOCwgNywgNiwgdHJ1ZSwgdGhpcy5zY2FsZSksLy85MHg3MFxuICAgICAgICAgICAgLy9cInNob290X3VwXCI6ICAgICAgICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA3MF0sIDYsIDE4LCA3LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgNiksLy85MHg3MFxuICAgICAgICAgICAgXCJzaG9vdF9kaWFnb25hbFwiOiAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNzBdLCA2LCAxOCwgNywgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDEwKSwvLzkweDcwXG4gICAgICAgICAgICAvL1wic2hvb3Rfc3RyYWlnaHRcIjogICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDcwXSwgNiwgMTgsIDcsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxNCksLy85MHg3MCAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChwYXRyb2xEaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnBhdHJvbGxpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvKioqKkJFR0lOIEJFSEFWSU9SKioqKi9cbiAgICAgICAgLy9UdXJuIHRvd2FyZHMgSGVyb1xuICAgICAgICAvLyBpZiAoIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkICYmICF0aGlzLnN0YXRlcy5wYXRyb2xsaW5nKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnN0YXRlcy5wYXRyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnBhdHJvbGxpbmcgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy53YWxraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnggPD0gdGhpcy5zdGFydFgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMueCA+PSB0aGlzLm1heFgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMud2Fsa2luZykge1xuXG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLm1vdmVtZW50U3BlZWQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNob3RDb29sZG93blRpbWVyIDw9IDAgJiYgdGhpcy55VmVsb2NpdHkgPT09IDBcbiAgICAgICAgICAgICAgICAmJiAoTWF0aC5hYnModGhpcy5tYXhYIC0gdGhpcy54KSA8PSA1IHx8IE1hdGguYWJzKHRoaXMuc3RhcnRYIC0gdGhpcy54KSA8PSA1KVxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzBdICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLndhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG90Q29vbGRvd25UaW1lciA8PSAwICYmIHRoaXMueVZlbG9jaXR5ID09PSAwICYmIE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMF0gJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPD0gdGhpcy5zaWdodFJhZGl1c1sxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFJvY2tldCh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJlbmVyZ3lfbGF1bmNoZXJcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSBmYWxzZTsgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciA9IHRoaXMuc2hvdENvb2xkb3duO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5wYXRyb2xsaW5nKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy53YWxraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vVGltZXJzXG4gICAgICAgIGlmICh0aGlzLnNob3RDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BcHBseSBHcmF2aXR5XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbG9jaXR5O1xuICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnkpO1xuICAgICAgICAvL0hlYWx0aCBjaGVja3NcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDkwLCA2MCwgMjUsIDQ1KVxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMud2Fsa2luZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goOTAsIDYwLCAyNSwgNDUpXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy53YWxrX3N0cmFpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goOTAsIDcwLCAyNSwgNDUpXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdF9kaWFnb25hbDsgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodDsgLy9maXggbWFnaWMgbnVtYmVyIChkcmF3biBzbGlnaHRseSBiZWxvdyBoaXRib3ggd2l0aG91dCB0aGUgMjAgb2Zmc2V0KVxuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFggKyA4NztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYIC0gODc7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgICAgIC8vIGJsb2NraW5nIGZyb20gbGVmdCAmIHJpZ2h0XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCwgb2ZmWCA9IDAsIG9mZlkgPSAwKSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDIgKyBvZmZYO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyBvZmZZO1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlubzsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtBY3Rvcn0gZnJvbSBcIi4vXCJcblxuXG5jbGFzcyBFbmVteSBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlVHlwZSA9IFwiaGVhbHRoXCI7XG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDA7Ly9EZWZpbmUgdGhpcyBleHBsaWNpdGx5IGZvciByZWxldmFudCBlbmVtaWVzXG4gICAgICAgIC8vVE9ETyAoZnV0dXJlIGRldmVsb3BtZW50KSBtYWtlIHNpZ2h0IHJhZGl1cyBhIHBhcnQgb2YgRW5lbXkgZGVmaW5pdGlvbiBmb3IgdXNlIGluIHN1cGVyIGNvbnN0cnVjdG9yc1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzID0gWzkwMCwgMzAwXSAvLyB4LCB5IGRpc3RhbmNlIGZyb20gY3VycmVudCBsb2NhdGlvblxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmVteTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuXG4vKioqKioqKioqKipcbkVudGl0eSBjbGFzc1xuXG5nYW1lIC0gYSByZWZlcmVuY2UgdG8gdGhlIGdhbWUgaW4gd2hpY2ggdGhpcyBlbnRpdHkgZXhpc3RzXG54LCB5IC0gZW50aXR5J3MgY29vcmRpbmF0ZXNcbnJlbW92ZUZyb21Xb3JsZCAtIGEgZmxhZyB0aGF0IGRlbm90ZXMgd2hlbiB0byByZW1vdmUgdGhpcyBlbnRpdHkgZnJvbSB0aGUgZ2FtZVxuKioqKioqKioqKioqL1xuY2xhc3MgRW50aXR5IHtcblxuICAgIGNvbnN0cnVjdG9yIChnYW1lLCB4LCB5LCBpbWc9bnVsbCwgY3R4PW51bGwpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmxldmVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IG51bGw7XG4gICAgICAgIHRoaXMudHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IC45O1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG5cbiAgICAgICAgLy8gdXNlZCBmb3Igc2ltcGxlIHJlY3QgaGl0Ym94XG4gICAgICAgIHRoaXMuYm91bmRYID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSBudWxsO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSBudWxsO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBUT0RPLCBpbXBsZW1lbnQgYSBsaXN0IG9mIGJvdW5kaW5nIHNoYXBlcywgaXRlcmF0ZSB0aHJvdWdoIGRlcGVuZGluZyBvbiB0eXBlIChjaXJjbGUgb3IgcmVjdCkgXG4gICAgcmVjdGFuZ2xlKCkge1xuXG4gICAgfVxuICAgIGNpcmNsZSgpIHtcblxuICAgIH1cblxuICAgIC8qIERyYXdzIHRoZSBvdXRsaW5lIG9mIHRoaXMgZW50aXR5ICovXG4gICAgZHJhd091dGxpbmUgKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wXG4gICAgaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/XG4gICAgKi9cbiAgICB1cGRhdGUgKCkgeyB9XG5cbiAgICAvKiBEcmF3cyB0aGlzIGVudGl0eS4gQ2FsbGVkIGV2ZXJ5IGN5Y2xlIG9mIHRoZSBnYW1lIGVuZ2luZS4gKi9cbiAgICBkcmF3IChjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5zaG93T3V0bGluZXMgJiYgdGhpcy5ib3VuZFgpIHtcbiAgICAgICAgICAgIGRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW1nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUodGhpcy5jbG9ja1RpY2ssIGN0eCwgdGhpcy54LCB0aGlzLnksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBDb2xsaXNpb24gZGV0ZWN0aW9uLCByZWN0YW5nbGVcbiAgICAqL1xuICAgIGlzQ29sbGlkaW5nKG90aGVyKSB7XG4gICAgICAgIGxldCByZWN0MSA9IHtcbiAgICAgICAgICAgIFwieFwiIDogdGhpcy5ib3VuZFgsXG4gICAgICAgICAgICBcInlcIiA6IHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgXCJsYXN0WVwiIDogdGhpcy5sYXN0Qm91bmRZLFxuICAgICAgICAgICAgXCJ3aWR0aFwiIDogdGhpcy5ib3VuZFdpZHRoLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogdGhpcy5ib3VuZEhlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlY3QyID0ge1xuICAgICAgICAgICAgXCJ4XCIgOiBvdGhlci5ib3VuZFgsXG4gICAgICAgICAgICBcInlcIiA6IG90aGVyLmJvdW5kWSxcbiAgICAgICAgICAgIFwid2lkdGhcIiA6IG90aGVyLmJvdW5kV2lkdGgsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBvdGhlci5ib3VuZEhlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlY3QxLndpZHRoID09PSAwIHx8IHJlY3QxLmhlaWdodCA9PT0gMCB8fCByZWN0Mi53aWR0aCA9PT0gMCB8fCByZWN0Mi5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnbm9uZSdcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBzYW1lIGFzIE1hcmlvdHQncyBtZXRob2QsIGp1c3QgZm9ybWF0dGVkIGRpZmZlcmVudGx5XG4gICAgICAgIGxldCBjb2xsaXNpb24gPSAnbm9uZSc7XG4gICAgICAgIHZhciBkeCA9IChyZWN0MS54ICsgcmVjdDEud2lkdGgvMikgLSAocmVjdDIueCArIHJlY3QyLndpZHRoLzIpO1xuICAgICAgICB2YXIgZHkgPSAocmVjdDEueSArIHJlY3QxLmhlaWdodC8yKSAtIChyZWN0Mi55ICsgcmVjdDIuaGVpZ2h0LzIpO1xuICAgICAgICB2YXIgbGFzdGR5ID0gKHJlY3QxLmxhc3RZICsgcmVjdDEuaGVpZ2h0LzIpIC0gKHJlY3QyLnkgKyByZWN0Mi5oZWlnaHQvMik7XG4gICAgICAgIHZhciB3aWR0aCA9IChyZWN0MS53aWR0aCArIHJlY3QyLndpZHRoKSAvIDI7XG4gICAgICAgIHZhciBoZWlnaHQgPSAocmVjdDEuaGVpZ2h0ICsgcmVjdDIuaGVpZ2h0KSAvIDI7XG4gICAgICAgIHZhciBjcm9zc1dpZHRoID0gd2lkdGggKiBkeTtcbiAgICAgICAgdmFyIGxhc3RDcm9zc1dpZHRoID0gd2lkdGggKiBsYXN0ZHk7XG4gICAgICAgIHZhciBjcm9zc0hlaWdodCA9IGhlaWdodCAqIGR4O1xuICAgICAgICBcbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgcmVjdDEgYW5kIHJlY3QyIGFyZSBjbG9zZSBlbm91Z2ggdG8gZXZlbiBjb2xsaWRlLiBUaGVuIGNoZWNrIHRoZSBpbnRlcnNlY3Rpb24gZGVwdGhzIHRvIGRldGVybWluZSB3aGljaCBzaWRlIHdhcyBtb3N0IGludm9sdmVkIGluIHRoZSBjb2xsaXNpb24uXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA8PSB3aWR0aCAmJiBNYXRoLmFicyhkeSkgPD0gaGVpZ2h0KSB7XG5cbiAgICAgICAgICAgIC8vVE9ETyBzdG9yZSBsYXN0IGJvdHRvbSBvZiByZWN0MSwgY29tcGFyZSB0byBib3VuZCBvZiByZWN0MiwgZGV0ZXJtaW5lIGlmIGkgc2hvdWxkIGZhbGwgb3Igbm90XG4gICAgICAgICAgICBpZiAoY3Jvc3NXaWR0aCA+IGNyb3NzSGVpZ2h0ICYmIGxhc3RDcm9zc1dpZHRoID4gY3Jvc3NIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAoY3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpKSAmJiBsYXN0Q3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpID8gY29sbGlzaW9uID0gJ3JpZ2h0JyA6IGNvbGxpc2lvbiA9ICd0b3AnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyb3NzV2lkdGggPiAoLWNyb3NzSGVpZ2h0KSAmJiBsYXN0Q3Jvc3NXaWR0aCA+ICgtY3Jvc3NIZWlnaHQpID8gY29sbGlzaW9uID0gJ2xlZnQnIDogY29sbGlzaW9uID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MSBjdXI6IFwiICsgcmVjdDEueSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MSBsYXN0OiBcIiArIHJlY3QxLmxhc3RZKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlY3QyOiBcIiArIHJlY3QyLnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICByZXR1cm4gY29sbGlzaW9uO1xuXG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgIH1cbn0gLy8gZW5kIG9mIEVudGl0eSBjbGFzc1xuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHkiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtBY3Rvcn0gZnJvbSBcIi4vXCJcblxuY2xhc3MgRmxhbWVzIGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDIwLCBzcHJpdGVIZWlnaHQgPSA0MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDE7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHsgXCJhY3RpdmVcIjogZmFsc2UsIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHsgXCJkZW1vXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDgsIDksIDEwLCA5LCB0cnVlLCB0aGlzLnNjYWxlKSB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZW1vO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgICAgIGlmICh0aGlzLmlzRG9uZSkge1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLm9yaWdYO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRmxhbWVzO1xuXG4gICAiLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiXG5pbXBvcnQge0xldmVsT25lLCBMZXZlbFR3b30gZnJvbSBcIi4vXCJcblxuXG4vKioqKioqKioqKioqKipcbkdhbWVCb2FyZCBjbGFzc1xuKioqKioqKioqKioqKiovXG5jbGFzcyBHYW1lQm9hcmQgZXh0ZW5kcyBFbnRpdHkge1xuXG4gICAgLy8gc28gdGhpcyBwcm90b3R5cGUuY2FsbCgpIGlzIGNhbGxpbmcgdGhlIEVudGl0eSBjb25zdHJ1Y3RvciB3aXRoIChnYW1lPW51bGwsIHg9MCwgeT0wKVxuICAgIGNvbnN0cnVjdG9yIChnYW1lLCBhc3NldE1hbmFnZXIsIGN0eCwgaGVybywgaHVkKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIDAsIDAsIG51bGwsIGN0eCk7XG4gICAgICAgIHRoaXMudGVzdFBvcyA9IFsxMTU3MCwgMzAwXTsgLy9EQkcvRGV2IFRvb2xcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIgPSBhc3NldE1hbmFnZXI7XG4gICAgICAgIC8vdXNlZCBmb3IgcmVjYWxsaW5nIGEgc2VjdGlvbidzIG5vbi10ZXJyYWluLCBub24taGF6YXJkIGFjdG9ycyBvbiBkZWF0aFxuICAgICAgICB0aGlzLmxldmVsTnVtO1xuICAgICAgICB0aGlzLnNlY3Rpb25OdW07XG4gICAgICAgIC8vcG9pbnQgdmFsdWUgdGltZXJcbiAgICAgICAgdGhpcy5wdnQgPSAwO1xuICAgICAgICB0aGlzLnB2dHQgPSAyMDtcbiAgICAgICAgdGhpcy5sb3N0U2NvcmUgPSAwO1xuXG4gICAgICAgIHRoaXMuZGVhZEVuZW1pZXMgPSBbW1swLDBdLCAwLCAwXV07XG5cbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMudGltZTtcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5odWQgPSBodWQ7XG4gICAgICAgIHRoaXMubGV2ZWw7XG4gICAgICAgIHRoaXMuY2hlY2tOb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2twb2ludCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJuZXdCb2FyZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJsb2FkaW5nTGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWRlZExldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwb3B1bGF0ZUxldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZXNwYXduTGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWRpbmdTZWN0aW9uXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsb2FkZWRTZWN0aW9uXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZXNwYXduU2VjdGlvblwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibmV3TGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWROZXh0TGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob3dQb2ludFZhbHVlc1wiOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxvYWROZXh0TGV2ZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZW50ZXJlZCBsb2FkTmV4dExldmVsXCIpO1xuICAgICAgICAgICAgdmFyIG5leHRMZXZlbCA9IHRoaXMubGV2ZWwubmV4dExldmVsO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICB0aGlzLmdldExldmVsKG5leHRMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmxvYWRlZExldmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbC5sb2FkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ0xldmVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsLnBvcHVsYXRlTWFwKC0xKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nTGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc2V0UG9zKFt0aGlzLmNoZWNrTm9kZS54LCB0aGlzLmNoZWNrTm9kZS55XSlcbiAgICAgICAgICAgICAgICB0aGlzLm5leHROb2RlID0gdGhpcy5jaGVja3BvaW50cy5uZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxvYWRlZExldmVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5uZXdMZXZlbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkodGhpcy5oZXJvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KHRoaXMubGV2ZWwucG9ydGFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8ucmVtb3ZlRnJvbVdvcmxkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkodGhpcy5odWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVkLnJlbW92ZUZyb21Xb3JsZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxvYWRpbmdTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3blNlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwucG9wdWxhdGVNYXAodGhpcy5zZWN0aW9uTnVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVsb2FkZWQgc2VjdGlvbiBcIiArIHRoaXMuc2VjdGlvbk51bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbC5uZXh0TGV2ZWwgPiAwICYmIHRoaXMuY2hlY2tOb2RlLnN0YXRlcy5pc0JhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQm9hcmQoXCJsZXZlbFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9JZiBlbnRlcmluZyBuZXh0IGNoZWNrcG9pbnRcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja05vZGUuc3RhdGVzLmlzQmFjayAmJiB0aGlzLmhlcm8ueCA+PSB0aGlzLmNoZWNrTm9kZS5uZXh0LngpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUgPSB0aGlzLmNoZWNrTm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja05vZGUuc3RhdGVzLmFjdGl2YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2twb2ludCA9IHRoaXMuY2hlY2tOb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlggPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZYO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWSA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5jYW1TcGVlZFggPSB0aGlzLmNoZWNrTm9kZS5uZXh0Q2FtU3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5jYW1TcGVlZFkgPSB0aGlzLmNoZWNrTm9kZS5uZXh0Q2FtU3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0lmIGVudGVyaW5nIHByZXZpb3VzIGNoZWNrcG9pbnRcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuaXNGcm9udCAmJiB0aGlzLmhlcm8ueCA8IHRoaXMuY2hlY2tOb2RlLnhcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmhlcm8ueCA+PSB0aGlzLmNoZWNrTm9kZS5wcmV2LngpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUgPSB0aGlzLmNoZWNrTm9kZS5wcmV2O1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZYID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlkgPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZZO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuY2FtU3BlZWRYID0gdGhpcy5jaGVja05vZGUucHJldkNhbVNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuY2FtU3BlZWRZID0gdGhpcy5jaGVja05vZGUucHJldkNhbVNwZWVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5oZXJvLnN0YXRlcy5yZXNwYXduZWQpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2xlYXJCb2FyZChcImxldmVsXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5yZXNwYXduKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnNldFBvcyhbdGhpcy5sYXN0Q2hlY2twb2ludC54LCB0aGlzLmxhc3RDaGVja3BvaW50LnkgLSAxMF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJCb2FyZChcImFjdG9yc1wiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3Bhd25cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwYXduTWVzc2FnZSA9IDIqdGhpcy5wdnR0O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wdnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHZ0LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3Bhd25NZXNzYWdlID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkcmF3XCIpXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCJCb2xkIDI1cHggVmVyZGFuYVwiO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIi1cIiArIHRoaXMubG9zdFNjb3JlICsgXCIgcG9pbnRzXCIsXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlcm8ueCArIDEwLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5oZXJvLnkgLSAxNTBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnJlc3Bhd25NZXNzYWdlLS07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGVhZEVuZW1pZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuZGVhZEVuZW1pZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWFkRW5lbWllc1tpXVsyXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRFbmVtaWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZHJhd1wiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyMHB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjMDBmZjAwXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiK1wiICsgdGhpcy5kZWFkRW5lbWllc1tpXVsxXSArIFwiIHBvaW50c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkRW5lbWllc1tpXVswXVswXSArIDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkRW5lbWllc1tpXVswXVsxXSAtIDE1MFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRFbmVtaWVzW2ldWzJdLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJCb2FyZChzY29wZSkge1xuICAgICAgICAvL3Njb3BlIHdpbGwgcmFuZ2UgZnJvbSBhY3RvcnMgb25seSwgdG8gdGhlIGVudGlyZSBsZXZlbC5cbiAgICAgICAgaWYgKHNjb3BlID09PSBcImFjdG9yc1wiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nU2VjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25OdW0gPSB0aGlzLmxhc3RDaGVja3BvaW50Lm51bTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzY29wZSA9PT0gXCJsZXZlbFwiKSB7XG4gICAgICAgICAgICB0aGlzLmhlcm8uc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMubmV3TGV2ZWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQm9hcmQgQ2xlYXJlZFwiKTtcbiAgICB9XG5cbiAgICBjbGVhclN0YXRlcygpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ0xldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWRlZExldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLnBvcHVsYXRlTGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3bkxldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWRpbmdTZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWRlZFNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3blNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubmV3TGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubG9hZE5leHRMZXZlbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldExldmVsKGxldmVsKSB7XG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IG5ldyBMZXZlbHNbXCJsZXZlbC1vbmVcIl0odGhpcy5nYW1lLCB0aGlzLmFzc2V0TWFuYWdlciwgdGhpcy5jdHgpO1xuICAgICAgICAgICAgdGhpcy5sZXZlbE51bSA9IGxldmVsO1xuICAgICAgICAgICAgLy9TaG91bGQgbW92ZSB0aGlzIGludG8gdGhlIExldmVsVHdvIGNsYXNzKD8pXG4gICAgICAgICAgICAvL0NyZWF0ZSBjaGVja3BvaW50IGxpbmtlZCBsaXN0LlxuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1BvcyA9IHRoaXMubGV2ZWwuY2hlY2twb2ludHNbMF07XG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrWCA9IGN1cnJDaGVja1Bvc1swXTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tZID0gY3VyckNoZWNrUG9zWzFdO1xuICAgICAgICAgICAgdmFyIGxpc3RGcm9udCA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIDAsIHRoaXMubGV2ZWwuY2FtVmFsc1swXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbMF0sIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgbGlzdEZyb250LnN0YXRlcy5pc0Zyb250ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1ByZXYgPSBmYWxzZTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5udW0gPSAwO1xuICAgICAgICAgICAgbGlzdEZyb250LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBsaXN0RnJvbnQuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2sgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHByZXZDaGVjayA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIC8vaW5zdGFudGlhdGUgY2hlY2twb2ludCBsaW5rZWQgbGlzdFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB0aGlzLmxldmVsLmNoZWNrcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrUG9zID0gdGhpcy5sZXZlbC5jaGVja3BvaW50c1tpXTtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tYID0gY3VyckNoZWNrUG9zWzBdO1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1kgPSBjdXJyQ2hlY2tQb3NbMV07XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2sgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCBpLCB0aGlzLmxldmVsLmNhbVZhbHNbaV0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzW2ldLCBudWxsLCBwcmV2Q2hlY2spO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5pc0JhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgaSwgdGhpcy5sZXZlbC5jYW1WYWxzW2ldLCB0aGlzLmxldmVsLmNhbVNwZWVkc1tpXSwgbnVsbCwgcHJldkNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLm51bSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJDaGVjay5udW0gPSBpO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjay5hZGROZXh0KGN1cnJDaGVjayk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrLnNldEJvdW5kcygpO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjayA9IGN1cnJDaGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJDaGVjay5zZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2twb2ludHMgPSBsaXN0RnJvbnQ7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTm9kZSA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIHRoaXMubGFzdENoZWNrcG9pbnQgPSB0aGlzLmNoZWNrTm9kZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWCA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlg7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlkgPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxldmVsID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbmV3IExldmVsc1tcImxldmVsLXR3b1wiXSh0aGlzLmdhbWUsIHRoaXMuYXNzZXRNYW5hZ2VyLCB0aGlzLmN0eCk7XG4gICAgICAgICAgICB0aGlzLmxldmVsTnVtID0gbGV2ZWw7XG4gICAgICAgICAgICAvL1Nob3VsZCBtb3ZlIHRoaXMgaW50byB0aGUgTGV2ZWxUd28gY2xhc3MoPylcbiAgICAgICAgICAgIC8vQ3JlYXRlIGNoZWNrcG9pbnQgbGlua2VkIGxpc3QuXG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrUG9zID0gdGhpcy5sZXZlbC5jaGVja3BvaW50c1swXTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tYID0gY3VyckNoZWNrUG9zWzBdO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1kgPSBjdXJyQ2hlY2tQb3NbMV07XG4gICAgICAgICAgICB2YXIgbGlzdEZyb250ID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgMCwgdGhpcy5sZXZlbC5jYW1WYWxzWzBdLCB0aGlzLmxldmVsLmNhbVNwZWVkc1swXSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBsaXN0RnJvbnQuc3RhdGVzLmlzRnJvbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzUHJldiA9IGZhbHNlO1xuICAgICAgICAgICAgbGlzdEZyb250Lm51bSA9IDA7XG4gICAgICAgICAgICBsaXN0RnJvbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5hY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVjayA9IG51bGw7XG4gICAgICAgICAgICB2YXIgcHJldkNoZWNrID0gbGlzdEZyb250O1xuICAgICAgICAgICAgLy9pbnN0YW50aWF0ZSBjaGVja3BvaW50IGxpbmtlZCBsaXN0XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRoaXMubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tQb3MgPSB0aGlzLmxldmVsLmNoZWNrcG9pbnRzW2ldO1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1ggPSBjdXJyQ2hlY2tQb3NbMF07XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrWSA9IGN1cnJDaGVja1Bvc1sxXTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5sZXZlbC5jaGVja3BvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjayA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIGksIHRoaXMubGV2ZWwuY2FtVmFsc1tpXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbaV0sIG51bGwsIHByZXZDaGVjayk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmlzQmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2sgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCBpLCB0aGlzLmxldmVsLmNhbVZhbHNbaV0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzW2ldLCBudWxsLCBwcmV2Q2hlY2spO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2subnVtID0gaTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5oYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrLm51bSA9IGk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrLmFkZE5leHQoY3VyckNoZWNrKTtcbiAgICAgICAgICAgICAgICBwcmV2Q2hlY2suc2V0Qm91bmRzKCk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrID0gY3VyckNoZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VyckNoZWNrLnNldEJvdW5kcygpO1xuICAgICAgICAgICAgdGhpcy5jaGVja3BvaW50cyA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlID0gbGlzdEZyb250O1xuICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2twb2ludCA9IHRoaXMuY2hlY2tOb2RlO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZYID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWSA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL29uIGhlcm8gZGVhdGgsIHBhdXNlIGdhbWUgdXBkYXRlcyBhbmQgc2F2ZSBzdGF0ZXMgb2YgYWxsIGVudGl0aWVzIHByaW9yIHRvIHRoZSBjaGVja3BvaW50XG59IC8vIGVuZCBHYW1lQm9hcmQgY2xhc3NcblxuLy9DaGVja3BvaW50IFwibm9kZVwiXG5jbGFzcyBDaGVja3BvaW50IGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBjdHgsIG51bSwgY2FtZXJhU2hpZnQgPSBbMiwgMS41XSwgY2FtZXJhU3BlZWQgPSBbOCwgOF0sIG5leHQgPSBudWxsLCBwcmV2ID0gbnVsbCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBudWxsLCBjdHgpO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXh0O1xuICAgICAgICB0aGlzLnByZXYgPSBwcmV2O1xuICAgICAgICB0aGlzLmNhbU9mZlggPSBjYW1lcmFTaGlmdFswXTtcbiAgICAgICAgdGhpcy5jYW1PZmZZID0gY2FtZXJhU2hpZnRbMV07XG4gICAgICAgIHRoaXMubmV4dENhbVNwZWVkID0gY2FtZXJhU3BlZWRbMF07XG4gICAgICAgIHRoaXMucHJldkNhbVNwZWVkID0gY2FtZXJhU3BlZWRbMV07XG4gICAgICAgIHRoaXMucmlnaHRCb3VuZCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5sZWZ0Qm91bmQgPSB0aGlzLnggLSAxO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25SYWRpdXMgPSBbNjAsIDYwXVxuICAgICAgICB0aGlzLm51bSA9IG51bTsgLy9DaGVja3BvaW50J3Mgb3JkZXIgaW4gbGlzdFxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiaXNGcm9udFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaXNCYWNrXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogZmFsc2UsXG4gICAgICAgICAgICBcImFjdGl2YXRlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaGFzTmV4dFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaGFzUHJldlwiOiBmYWxzZSxcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNQcmV2ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcblxuICAgIH1cblxuICAgIGFkZE5leHQobmV4dCkge1xuICAgICAgICB0aGlzLm5leHQgPSBuZXh0O1xuICAgICAgICB0aGlzLnN0YXRlcy5oYXNOZXh0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRCb3VuZHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHRCb3VuZCA9IE1hdGguZmxvb3IoKHRoaXMubmV4dC54ICsgdGhpcy54KSAvIDIpIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHRCb3VuZCA9IHRoaXMueDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRCb3VuZCA9IE1hdGguZmxvb3IoKHRoaXMucHJldi54ICsgdGhpcy54KSAvIDIpICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGVmdEJvdW5kID0gdGhpcy54O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdygpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkO1xuIiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW5lbXksXG4gICAgVGVycmFpbixcbiAgICBIdXJ0Ym94LFxuICAgIFByb2plY3RpbGUsXG4gICAgQm9tYixcbn0gZnJvbSBcIi4vXCJcblxuXG4vL3JvdyA5LCA0MHgzMCwgMTEgZnJhbWVzXG5jbGFzcyBIYW5kIGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDQwLCBzcHJpdGVIZWlnaHQgPSAzMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDc7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IDEyNTtcblxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSAwOy8vdXBkYXRlZCBpbiByZWxldmFudCBzdGF0ZSB1cGRhdGVzXG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgMTA7XG4gICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLnBvaW50VmFsdWUgPSAxMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1swXSA9IDQwMDA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMV0gPSA3MDA7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gNTA7IC8vdGhyZWUgbm9ybWFsIGhpdHMuXG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy50aHJvd3RpbWUgPSA0O1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gMTIwO1xuICAgICAgICB0aGlzLmNvb2xkb3dudmFyaWFuY2UgPSAyMFxuICAgICAgICB0aGlzLmNvb2xkb3duVGltZXIgPSAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJpZGxpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhcnRpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcInRocm93aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNUaHJvd25cIjogZmFsc2UsXG4gICAgICAgICAgICBcInJlY292ZXJpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImlkbGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxMSwgNSwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcInN0YXJ0dXBcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxMSwgNSwgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDEpLFxuICAgICAgICAgICAgXCJ0aHJvd1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDExLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA1KSxcbiAgICAgICAgICAgIFwicmVjb3ZlclwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDExLCA2LCAzLCBmYWxzZSwgdGhpcy5zY2FsZSwgNiksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNDAsIDMwLCAyMCwgNSwgMCwgMTApO1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICAgICAgLy9pbnNlcnQgYXR0YWNrIGJlaGF2aW9yLiBMb29wcyBmb3Igbm93LlxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMF1cbiAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzFdXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jb29sZG93blRpbWVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhcnRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNDAsIDMwLCAyMCwgMjAsIDAsIDEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudGhyb3dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnRocm93aW5nKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmhhc1Rocm93bikge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEJvbWIodGhpcy5nYW1lLCB0aGlzLnggKyB0aGlzLmZhY2luZyAqIDEwLCB0aGlzLnkgLSAyMCwgdGhpcy5pbWcsIHRoaXMuY3R4LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlLCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIC8gdGhpcy5kaXN0YW5jZSkpOyAvL3ZhbHVlIG9mIDc1IGV4cGxvZGVzIG9uIHN0YXRpb25hcnkgSGVyb1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1Rocm93biA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiB0aGlzLnRocm93dGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNUaHJvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50aHJvd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlY292ZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlY292ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29vbGRvd25UaW1lciA9IHRoaXMuY29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyLS07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCB0aGlzLnlWZWxvY2l0eSk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhcnRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0dXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnRocm93aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy50aHJvdztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMucmVjb3ZlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICB1cGRhdGVIaXRib3goZldpZHRoLCBmSGVpZ2h0LCBiV2lkdGgsIGJIZWlnaHQsIHhPZmYsIHlPZmYpIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJIZWlnaHQ7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoIC8gMiArIHhPZmY7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArIHlPZmY7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAvL1RPRE8gQWRkIGNvbGxpc2lvbiB3aXRoIHRlcnJhaW5cbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodCAtIDEwO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSArIG90aGVyLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodCAtIDEwO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMueCA9IHRoaXMuYm91bmRYICsgODc7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2Vsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnggPSB0aGlzLmJvdW5kWCAtIDg3O1xuICAgICAgICAgICAgLy8gICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJQcm9qZWN0aWxlXCIgJiYgIXRoaXMuc3RhdGVzLmh1cnQpIHtcbiAgICAgICAgICAgIC8vbm90aGluZyBmb3Igbm93XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIkh1cnRib3hcIiAmJiAhdGhpcy5zdGF0ZXMuaHVydCkge1xuICAgICAgICAgICAgb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSGFuZDsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbnRpdHksXG4gICAgSGVybyxcbiAgICBIdXJ0Ym94LFxuICAgIFRlcnJhaW4sXG4gICAgQWN0b3IsXG4gICAgRW5lbXksXG4gICAgUHJvamVjdGlsZSxcbn0gZnJvbSBcIi4vXCJcblxuXG4vKioqKioqKioqKipcbmdhbWUgLSBhIHJlZmVyZW5jZSB0byB0aGUgZ2FtZSBpbiB3aGljaCB0aGlzIGVudGl0eSBleGlzdHNcbngsIHkgLSBlbnRpdHkncyBjb29yZGluYXRlc1xucmVtb3ZlRnJvbVdvcmxkIC0gYSBmbGFnIHRoYXQgZGVub3RlcyB3aGVuIHRvIHJlbW92ZSB0aGlzIGVudGl0eSBmcm9tIHRoZSBnYW1lXG4qKioqKioqKioqKiovXG5jbGFzcyBMYXZhIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIHNwcml0ZVdpZHRoID0gNjQpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICB0aGlzLnkgKz0gKDk2ICogMyAtIDYgKiAzKTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gMTI4O1xuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKCh0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqICh0aGlzLnNwcml0ZUhlaWdodCAtIDMyKTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLnggLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0ICogdGhpcy5zY2FsZSArIDM3ICogdGhpcy5zY2FsZTtcblxuICAgICAgICB0aGlzLmZpcmVDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5maXJlQ29vbGRvd24gPSAxMDAwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDEvL3RoaXMuZ2FtZS5oZXJvLngubWF4SGVhbHRoXG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgMTI4XSwgNywgMSwgNywgOCwgdHJ1ZSwgdGhpcy5zY2FsZSksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvLy8vSGF2ZSBMYXZhIHNwYXduIGZpcmViYWxscyAqKkkgZG9uJ3QgbGlrZSB0aGlzLCBidXQgSSdtIGxlYXZpbmcgdGhlIGNvZGUgZm9yIHBvc3Rlcml0eSdzIHNha2UuKipcbiAgICAgICAgLy9pZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gNTAwICYmIHRoaXMuZmlyZUNvb2xkb3duVGltZXIgPD0gMCkge1xuICAgICAgICAvLyAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBGaXJlYmFsbCh0aGlzLmdhbWUsIHRoaXMueCAtIDMyLCB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCoyLCB0aGlzLmltZywgdGhpcy5jdHgsIDQsIDE1KSk7XG4gICAgICAgIC8vICAgIHRoaXMuZmlyZUNvb2xkb3duVGltZXIgPSB0aGlzLmZpcmVDb29sZG93bjtcbiAgICAgICAgLy99XG4gICAgICAgIC8vaWYgKHRoaXMuZmlyZUNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMuZmlyZUNvb2xkb3duVGltZXItLTtcbiAgICAgICAgLy99XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSlcbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIEZpcmViYWxsIGV4dGVuZHMgRW5lbXkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgY29vbGRvd24gPSAxNTAsIHlTcGVlZCA9IDEyLCBzcGF3bk9mZnNldCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDYwO1xuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKCh0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDYgKiB0aGlzLnNjYWxlO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMjAgKiB0aGlzLnNjYWxlO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aC8yO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0KnRoaXMuc2NhbGUvMjtcblxuICAgICAgICB0aGlzLm9yaWdYID0gdGhpcy54O1xuICAgICAgICB0aGlzLm9yaWdZID0gdGhpcy55O1xuICAgICAgICB0aGlzLm9yaWdCb3VuZFggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgdGhpcy5vcmlnQm91bmRZID0gdGhpcy5ib3VuZFk7XG5cbiAgICAgICAgdGhpcy55U3BlZWQgPSB5U3BlZWQ7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMjtcbiAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gc3Bhd25PZmZzZXQ7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSBjb29sZG93bjtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YXJ0XCI6IHRydWUsXG4gICAgICAgICAgICBcIm1pZGRsZV91cFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicGVha191cFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicGVha19kb3duXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJtaWRkbGVfZG93blwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmluaXNoXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgNiwgdHJ1ZSwgdGhpcy5zY2FsZSwgNiksXG4gICAgICAgICAgICBcInN0YXJ0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgICAgIFwibWlkZGxlX3VwXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA3KSxcbiAgICAgICAgICAgIFwicGVha191cFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgOCksXG4gICAgICAgICAgICBcInBlYWtfZG93blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgOSksXG4gICAgICAgICAgICBcIm1pZGRsZV9kb3duXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMCksXG4gICAgICAgICAgICBcImZpbmlzaFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTEpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zdGFydDtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ncmF2aXR5KTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPCAxMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8IDEwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJsYXZhX2JhbGxcIiwgMC41KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLTEgKiB0aGlzLnlTcGVlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5taWRkbGVfdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5taWRkbGVfdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCAtLjUgKiB0aGlzLnlTcGVlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5taWRkbGVfdXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucGVha191cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnBlYWtfdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCAtLjEgKiB0aGlzLnlTcGVlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5wZWFrX3VwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnBlYWtfZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnBlYWtfZG93bikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC4xICogdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucGVha19kb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLm1pZGRsZV9kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMubWlkZGxlX2Rvd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCAuNSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLm1pZGRsZV9kb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZpbmlzaCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZpbmlzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29vbGRvd25UaW1lciA9IHRoaXMuY29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMub3JpZ1k7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5vcmlnQm91bmRYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMub3JpZ0JvdW5kWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29vbGRvd25UaW1lci0tO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zdGFydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubWlkZGxlX3VwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5taWRkbGVfdXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnBlYWtfdXApIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnBlYWtfdXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnBlYWtfZG93bikge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMucGVha19kb3duO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5taWRkbGVfZG93bikge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMubWlkZGxlX2Rvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZpbmlzaCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmluaXNoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFNwaWtlcyBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLCBhY3RpdmUgPSB0cnVlLCB0aW1lciwgdGltZU9mZnNldCA9IDAsIGxlbmd0aCA9IDAsIGludGVydmFsID0gMjApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbnRpdHlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSoodGhpcy5zcHJpdGVXaWR0aCAtIDI4KTtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiAodGhpcy5zcHJpdGVIZWlnaHQvMiArIDMpO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueCAtIHRoaXMuc3ByaXRlV2lkdGggKyB0aGlzLnNjYWxlKjE0O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0ICogdGhpcy5zY2FsZSArIDM3ICogdGhpcy5zY2FsZTtcblxuICAgICAgICB0aGlzLnNwaWtlQ29vbGRvd25UaW1lciA9IHRpbWVPZmZzZXQ7XG4gICAgICAgIHRoaXMuc3Bpa2VDb29sZG93biA9IHRpbWVyO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7IC8vdGhpcy5nYW1lLmhlcm8ubWF4SGVhbHRoXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpbmFjdGl2ZV91cFwiOiAhYWN0aXZlLFxuICAgICAgICAgICAgLy9cImluYWN0aXZlX3VwX3NwYXduZWRcIjogZmFsc2UsIC8vRG9lc24ndCB3b3JrLCB1bnVzZWQgZm9yIG5vd1xuICAgICAgICAgICAgXCJpbmFjdGl2ZV9kb3duXCI6IGFjdGl2ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgNiwgNSwgNSwgZmFsc2UsIHRoaXMuc2NhbGUsIDEpLFxuICAgICAgICAgICAgXCJpbmFjdGl2ZV91cFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCA2LCAxMCwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMyksXG4gICAgICAgICAgICBcImluYWN0aXZlX2Rvd25cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgNiwgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaW5hY3RpdmVfZG93bjtcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBuZXh0T2Zmc2V0ID0gdGltZU9mZnNldCArIHRoaXMuaW50ZXJ2YWw7XG4gICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFNwaWtlcyh0aGlzLmdhbWUsIHRoaXMueCArIHRoaXMuc3ByaXRlV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy55LCB0aGlzLmltZywgY3R4LCAyLCB0aGlzLmFjdGl2ZSwgdGhpcy5zcGlrZUNvb2xkb3duLCBuZXh0T2Zmc2V0LCBsZW5ndGgsIHRoaXMuaW50ZXJ2YWwpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUgJiYgdGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSAhPT0gMSAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSAhPT0gNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFggKyAxOSwgdGhpcy5ib3VuZFksIC10aGlzLnNwcml0ZVdpZHRoIC0gLjUgKiB0aGlzLmJvdW5kV2lkdGgsIDAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggLyAyLCB0aGlzLnNwcml0ZUhlaWdodCAvIDIsIHRoaXMuYm91bmRXaWR0aCAtIDEzLCB0aGlzLmJvdW5kSGVpZ2h0IC0gNDIsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCxcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFsdGhcIiwgMiwgdHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCArIDE5LCB0aGlzLmJvdW5kWSwgLXRoaXMuc3ByaXRlV2lkdGggLSAuNSAqIHRoaXMuYm91bmRXaWR0aCwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCAvIDIsIHRoaXMuc3ByaXRlSGVpZ2h0IC8gMiwgdGhpcy5ib3VuZFdpZHRoIC0gMTMsIHRoaXMuYm91bmRIZWlnaHQgLSA1NiwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBcImhlYWx0aFwiLCAyLCB0cnVlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaW5hY3RpdmVfZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPSB0aGlzLnNwaWtlQ29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3Bpa2VDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zcGlrZUNvb2xkb3duVGltZXItLTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaW5hY3RpdmVfZG93bikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3Bpa2VDb29sZG93blRpbWVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmluYWN0aXZlX2Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuc3Bpa2VDb29sZG93blRpbWVyID0gdGhpcy5zcGlrZUNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmluYWN0aXZlX3VwKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPCAzMDAgJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPCAzMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYICsgMywgdGhpcy5ib3VuZFksIC10aGlzLnNwcml0ZVdpZHRoIC0gLjUqdGhpcy5ib3VuZFdpZHRoLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoIC8gMiwgdGhpcy5zcHJpdGVIZWlnaHQgLyAyLCB0aGlzLmJvdW5kV2lkdGggLSAxMywgdGhpcy5ib3VuZEhlaWdodCAtIDQyLCB0aGlzLnNjYWxlLCB0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhbHRoXCIsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pbmFjdGl2ZV9kb3duKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pbmFjdGl2ZV9kb3duO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pbmFjdGl2ZV91cCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaW5hY3RpdmVfdXA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdGlsZUhhemFyZCBleHRlbmRzIEVuZW15IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIHhTcGVlZCwgeVNwZWVkLCBkaXJlY3Rpb25zLCBsaWZlc3Bhbikge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIC8vdGhpcy55ICs9IDQ0OyBHaXZlIGEgKzQ0IG9mZnNldCB3aGVuIGluc3RhbnRpYXRpbmcgXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5vcmlnWCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5vcmlnWSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDYwO1xuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKCh0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiA4ICsgMztcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiA4ICsgMztcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLnNjYWxlICogNTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCAqIHRoaXMuc2NhbGUvMiArIDUgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMueFNwZWVkID0geFNwZWVkO1xuICAgICAgICB0aGlzLnlTcGVlZCA9IHlTcGVlZDtcbiAgICAgICAgdGhpcy54RGlyID0gZGlyZWN0aW9uc1swXTtcbiAgICAgICAgdGhpcy55RGlyID0gZGlyZWN0aW9uc1sxXTtcbiAgICAgICAgdGhpcy5saWZlc3BhbiA9IGxpZmVzcGFuO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMudGljayA9IDE7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTIpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQb3ModGhpcy54U3BlZWQgKiB0aGlzLnhEaXIsIHRoaXMueVNwZWVkICogdGhpcy55RGlyKTtcbiAgICAgICAgaWYgKHRoaXMubGlmZXNwYW4gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxpZmVzcGFuLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vVE9ETyByZWZhY3RvciB0aGlzIChhcnRpZmFjdCBmcm9tIGluc3RhbmNlb2YgZGF5cylcbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJBY3RvclwiICYmICEob3RoZXIubmFtZSA9PT0gXCJFbmVteVwiKSkgey8vSGVybyBjb2xsaXNpb25cbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpY2sgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRpY2stLTtcbiAgICAgICAgICAgICAgICBvdGhlci5oZWFsdGggLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiaXNFbmVteVwiKTtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdGlsZUNpcmNsZSBleHRlbmRzIEVuZW15IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIHhTcGVlZCwgeVNwZWVkLCByYWRpdXMgPSAxMCwgdGltZXIgPSAxMDApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICAvL3RoaXMueSArPSA0NDsgR2l2ZSBhICs0NCBvZmZzZXQgd2hlbiBpbnN0YW50aWF0aW5nIFxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMub3JpZ1ggPSB0aGlzLng7XG4gICAgICAgIHRoaXMub3JpZ1kgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLnRpbWVyID0gdGltZXI7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC10aGlzLnJhZGl1cyk7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogOCArIDM7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogOCArIDM7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5zY2FsZSAqIDU7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlIC8gMiArIDUgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMueFNwZWVkID0geFNwZWVkO1xuICAgICAgICB0aGlzLnlTcGVlZCA9IHlTcGVlZDtcbiAgICAgICAgdGhpcy5xdWFkcmFudHMgPSBbWzEsIDFdLCBbLTEsIDFdLCBbLTEsIC0xXSwgWzEsIC0xXV07XG4gICAgICAgIHRoaXMucXVhZHJhbnQgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMudGljayA9IDE7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTIpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMub3JpZ1ggPj0gMCAmJiB0aGlzLnkgLSB0aGlzLm9yaWdZIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucXVhZHJhbnQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIHRoaXMub3JpZ1ggPj0gMCAmJiB0aGlzLnkgLSB0aGlzLm9yaWdZID4gMCkge1xuICAgICAgICAgICAgdGhpcy5xdWFkcmFudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54IC0gdGhpcy5vcmlnWCA8IDAgJiYgdGhpcy55IC0gdGhpcy5vcmlnWSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucXVhZHJhbnQgPSAyO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmICh0aGlzLnggLSB0aGlzLm9yaWdYIDwgMCAmJiB0aGlzLnkgLSB0aGlzLm9yaWdZIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucXVhZHJhbnQgPSAzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlUG9zKHRoaXMueFNwZWVkICogdGhpcy5xdWFkcmFudHNbdGhpcy5xdWFkcmFudF1bMF0sIHRoaXMueVNwZWVkICogdGhpcy5xdWFkcmFudHNbdGhpcy5xdWFkcmFudF1bMV0pO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8vLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICAvL2lmIChvdGhlci5uYW1lID09PSBcIlRlcnJhaW5cIikge1xuICAgICAgICAvLyAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIC8vfVxuICAgICAgICAvLy8vVE9ETyByZWZhY3RvciB0aGlzIChhcnRpZmFjdCBmcm9tIGluc3RhbmNlb2YgZGF5cylcbiAgICAgICAgLy9lbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkFjdG9yXCIgJiYgIShvdGhlci5uYW1lID09PSBcIkVuZW15XCIpKSB7Ly9IZXJvIGNvbGxpc2lvblxuICAgICAgICAvLyAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgLy8gICAgICAgIGlmICh0aGlzLnRpY2sgPT09IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICB0aGlzLnRpY2stLTtcbiAgICAgICAgLy8gICAgICAgIG90aGVyLmhlYWx0aCAtPSAxO1xuICAgICAgICAvLyAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuICAgICAgICAvL2Vsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgIC8vICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAvLyAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiZGFtYWdlXCIpO1xuICAgICAgICAvLyAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL31cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5jbGFzcyBMYXVuY2hlciBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICB4U3BlZWQsIHlTcGVlZCwgZGlyZWN0aW9ucywgY29vbGRvd24sIHByb2plY3RpbGVMaWZlc3BhbiwgbGF1bmNoVGltZU9mZnNldCA9IDApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbnRpdHlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgLy90aGlzLnkgKz0gNDQ7IEdpdmUgYSArNDQgb2Zmc2V0IHdoZW4gaW5zdGFudGlhdGluZyBcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogODtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLnggLSB0aGlzLnNwcml0ZVdpZHRoICsgdGhpcy5zY2FsZSAqIDg7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlICsgOCAqIHRoaXMuc2NhbGU7XG5cbiAgICAgICAgdGhpcy54U3BlZWQgPSB4U3BlZWQ7XG4gICAgICAgIHRoaXMueVNwZWVkID0geVNwZWVkO1xuICAgICAgICB0aGlzLnhEaXIgPSBkaXJlY3Rpb25zWzBdO1xuICAgICAgICB0aGlzLnlEaXIgPSBkaXJlY3Rpb25zWzFdO1xuICAgICAgICB0aGlzLnNob3RDb29sZG93blRpbWVyID0gbGF1bmNoVGltZU9mZnNldDtcbiAgICAgICAgdGhpcy5zaG90Q29vbGRvd24gPSBjb29sZG93bjtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlTGlmZXNwYW4gPSBwcm9qZWN0aWxlTGlmZXNwYW47XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMjApLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKC8qTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gNTAwMCAmJiovIHRoaXMuc2hvdENvb2xkb3duVGltZXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFByb2plY3RpbGVIYXphcmQodGhpcy5nYW1lLCB0aGlzLnggLSB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLFxuICAgICAgICAgICAgICAgIHRoaXMueFNwZWVkLCB0aGlzLnlTcGVlZCwgW3RoaXMueERpciwgdGhpcy55RGlyXSwgdGhpcy5wcm9qZWN0aWxlTGlmZXNwYW4pKTtcbiAgICAgICAgICAgIHRoaXMuc2hvdENvb2xkb3duVGltZXIgPSB0aGlzLnNob3RDb29sZG93bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaG90Q29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdENvb2xkb3duVGltZXItLTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIC8vdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBMYXZhLFxuICAgIEZpcmViYWxsLFxuICAgIFNwaWtlcyxcbiAgICBQcm9qZWN0aWxlSGF6YXJkLFxuICAgIFByb2plY3RpbGVDaXJjbGUsXG4gICAgTGF1bmNoZXJcbn1cbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQgVGVycmFpbiBmcm9tIFwiLi90ZXJyYWluXCJcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3Byb2plY3RpbGVcIlxuaW1wb3J0IFByb2plY3RpbGVfU3dvcmQgZnJvbSBcIi4vcHJvamVjdGlsZS1zd29yZFwiXG5pbXBvcnQgU29sZGllcl9TaGllbGQgZnJvbSBcIi4vc29sZGllci1zaGllbGRcIlxuaW1wb3J0IEVuZW15IGZyb20gXCIuL2VuZW15XCJcbmltcG9ydCBIdXJ0Ym94IGZyb20gXCIuL2h1cnRib3hcIlxuaW1wb3J0IFJlZmxlY3Rib3ggZnJvbSBcIi4vcmVmbGVjdGJveFwiXG5pbXBvcnQgSGF6YXJkcyBmcm9tIFwiLi9oYXphcmRzXCJcbmltcG9ydCBSb2NrZXQgZnJvbSBcIi4vcm9ja2V0XCJcblxuXG5jbGFzcyBIZXJvIGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgY29uc3RydWN0b3IgKGdhbWUsIHgsIHksIGltZz1udWxsLCBjdHg9bnVsbCwgc2NhbGU9Mywgc3ByaXRlV2lkdGg9NjAsIHNwcml0ZUhlaWdodD02MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMub3JpZ1kgPSB0aGlzLnk7IC8vRm9yIGp1bXBpbmdcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDExMDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7IC8vIFRoaXMgd2lsbCBoZWxwIHN0b3AgSGVybyBmcm9tIHNsaXBwaW5nIGF0IGVkZ2VzLCBwYXJ0aWN1bGFybHkgZm9yIGhvcml6b250YWxseSBsb25nZXIgYmxvY2tzIG9mIHRlcnJhaW5cblxuICAgICAgICAvKioqU1RBVFMqKiovXG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9ICg4KTtcbiAgICAgICAgdGhpcy5kYXNoU3BlZWQgPSAxN1xuICAgICAgICB0aGlzLmp1bXBTdHJlbmd0aCA9ICgyMCk7XG4gICAgICAgIHRoaXMuanVtcHNMZWZ0ID0gMjtcbiAgICAgICAgdGhpcy5tYXhKdW1wcyA9IDI7XG4gICAgICAgIHRoaXMudGVybWluYWxWZWxvY2l0eSA9IDE1O1xuXG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gMzA7XG4gICAgICAgIHRoaXMubWF4RW5lcmd5ID0gMzA7XG4gICAgICAgIHRoaXMuZW5lcmd5ID0gMzA7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gMzA7XG4gICAgICAgIHRoaXMuc2xhc2hFbmVyZ3lDb3N0ID0gMjU7XG4gICAgICAgIHRoaXMuY2xlYXZlRW5lcmd5Q29zdCA9IDE1O1xuICAgICAgICB0aGlzLnNob290Q29zdCA9IDI7XG4gICAgICAgIHRoaXMuc2hvb3RFbmVyZ3lDb3N0ID0gMTA7XG4gICAgICAgIHRoaXMuZGFzaEVuZXJneUNvc3QgPSA3O1xuXG4gICAgICAgIHRoaXMuc3R1bkRpciA9IDA7XG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IDE7XG4gICAgICAgIFxuICAgICAgICAvL1RpbWVyc1xuICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duID0gMTY7XG4gICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gPSAxNSAvICh0aGlzLm11bHRpcGxpZXIgKiAyKTtcbiAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93bk1pbiA9IDE1IC8gKHRoaXMubXVsdGlwbGllciAqIDIpO1xuICAgICAgICB0aGlzLmVuZXJneURlbGF5ID0gMjA7XG4gICAgICAgIHRoaXMuZW5lcmd5RGVsYXlUaW1lciA9IDA7XG4gICAgICAgIHRoaXMudmVsb2NpdHlDb29sZG93biA9IDI7XG4gICAgICAgIHRoaXMudmVsb2NpdHlDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5qdW1wVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmp1bXBDb29sZG93biA9IDIwO1xuICAgICAgICB0aGlzLnNob290Q29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDA7XG5cbiAgICAgICAgLy9ERVYgVE9PTFNcbiAgICAgICAgdGhpcy5nb2RNb2RlRW5lcmd5TWluID0gMDtcbiAgICAgICAgdGhpcy5ub3RHb2RNb2RlRW5lcmd5TWluID0gdGhpcy5lbmVyZ3lDb29sZG93bk1pbjtcbiAgICAgICAgdGhpcy5nb2RFbmVyZ3lEZWxheSA9IDA7XG4gICAgICAgIHRoaXMubm90R29kRW5lcmd5RGVsYXkgPSB0aGlzLmVuZXJneURlbGF5O1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJlbmVyZ2l6ZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImludnVsbmVyYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicnVubmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwianVtcGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGFzaGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZW5lcmd5RGFzaFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGFzaGluZ1N0YXJ0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nTWlkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nRW5kXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNEYXNoZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob290aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNTaG90XCI6IGZhbHNlLC8vVE9ETyBJbXBsZW1lbnQgdG8gcmVwbGFjZSBzaG90bG9ja2VkXG4gICAgICAgICAgICBcInNsYXNoaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNTbGFzaGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJjbGVhdmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaGFzQ2xlYXZlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvdGxvY2tlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZnJhbWVsb2NrZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInN0dW5uZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImRlYWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInJlc3Bhd25lZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZ3JvdW5kZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaGFzR3Jhdml0eVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJpc0dvZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDksIDMsIDksIHRydWUsIHRoaXMuc2NhbGUpLCAvLzUweDUwXG4gICAgICAgICAgICBcInN0dW5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAwLCAxMywgNCwgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDkpLFxuICAgICAgICAgICAgXCJkZWFkXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgMTgsIDUsIDUsIHRydWUsIHRoaXMuc2NhbGUsIDEzKSxcbiAgICAgICAgICAgIFwicnVuXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMSwgMjIsIDMsIDExLCB0cnVlLCB0aGlzLnNjYWxlKSwgLy81MHg1MFxuICAgICAgICAgICAgLy9UYWtlb2ZmP1xuICAgICAgICAgICAgXCJhc2NlbmRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCA4LCAzLCA0LCB0cnVlLCB0aGlzLnNjYWxlLCAyKSwgLy81MHg1MFxuICAgICAgICAgICAgXCJkZXNjZW5kXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTQsIDMsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDgpLCAvLzUweDUwXG4gICAgICAgICAgICAvL0xhbmQ/XG4gICAgICAgICAgICBcImFpcnNob290XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMjAsIDMsIDYsIGZhbHNlLCB0aGlzLnNjYWxlLCAxNCksIC8vNTB4NTBcbiAgICAgICAgICAgIFwic2hvb3RcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDMsIDMsIDYsIDMsIGZhbHNlLCB0aGlzLnNjYWxlKSwgLy84MHg2MFxuICAgICAgICAgICAgXCJndW5ydW5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDEsIDIyLCAzLCAxMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTEpLCAvLzUweDUwXG4gICAgICAgICAgICBcInNsYXNoXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA0LCAxMSwgMiwgMTEsIGZhbHNlLCB0aGlzLnNjYWxlKSwgLy84MHg1MFxuICAgICAgICAgICAgXCJjbGVhdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzEwMCwgNzBdLCA5LCAxMywgMiwgMTMsIGZhbHNlLCB0aGlzLnNjYWxlKSwgLy84MHg2MFxuICAgICAgICAgICAgXCJkYXNoXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs2MCwgNjBdLCA1LCA3LCAzLCA3LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcImRhc2hfc3RhcnRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDEsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiZGFzaF9taWRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDUsIGZhbHNlLCB0aGlzLnNjYWxlLCAxKSxcbiAgICAgICAgICAgIFwiZGFzaF9lbmRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDEsIGZhbHNlLCB0aGlzLnNjYWxlLCA1KSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7Ly9UT0RPIChtYXliZSkgZmluZCBhIGJldHRlciBzb2x1dGlvbiB0byB0aGUgZnJhbWVsb2NrZWQgbG9naWMuIChUb28gbWFueSBleGNlcHRpb25zIGZvciB0aGluZ3MgbGlrZSBzbGFzaClcbiAgICAgICAgLy9EZXYgVG9vbCBVcGRhdGVzXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldFBvc1RpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdvZFRvZ2dsZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLy8vLy8vLy8vIGFsbCBidXR0b24gY2hlY2tzIGdvIGhlcmUgLy8vLy8vLy8vLy9cbiAgICAgICAgICAgIC8vIEtFWSBET1dOXG4gICAgICAgICAgICAvL3J1biByaWdodFxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMucmlnaHRdLmFjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgLyomJiB0aGlzLnN0YXRlcy5jYW5SdW4qLykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3J1biBsZWZ0XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmxlZnRdLmFjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgLyomJiB0aGlzLnN0YXRlcy5jYW5SdW4qLykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2VuZXJnaXplXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5lbmVyZ2l6ZV0uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmdpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vanVtcFxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMuanVtcF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5qdW1waW5nICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAvKiYmIHRoaXMuc3RhdGVzLmNhbkp1bXAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmp1bXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmdyb3VuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3Nob290XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5zaG9vdF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAmJiAhdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY2xlYXZlXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5jbGVhdmVdLmFjdGl2ZSAmJiB0aGlzLnN0YXRlcy5ncm91bmRlZCAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJzd29yZF9zd2luZ1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmNsZWF2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3NsYXNoXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5zbGFzaF0uYWN0aXZlICYmIHRoaXMuc3RhdGVzLmdyb3VuZGVkICYmICghdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgfHwgdGhpcy5zdGF0ZXMuZGFzaGluZykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5yaWdodF0uYWN0aXZlKSB7IHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMubGVmdF0uYWN0aXZlKSB7IHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7IH1cbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJzd29yZF9zd2luZ1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIGZhbHNlLCB0cnVlLCBmYWxzZSwgdHJ1ZSwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9kYXNoXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5kYXNoXS5hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLmRhc2hFbmVyZ3lDb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNEYXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJvdXRfb2ZfZW5lcmd5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9LRVkgVVBcbiAgICAgICAgICAgIGlmICghKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMucmlnaHRdLmFjdGl2ZSB8fCB0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmxlZnRdLmFjdGl2ZSlcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmVuZXJnaXplXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vIFRIRU4gZG8gYWN0aW9ucyAvLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgaWYgKHRoaXMuanVtcFRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuanVtcFRpbWVyIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSdW5uaW5nXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY2VudGVyWCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY2VudGVyWCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0p1bXBpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5qdW1waW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuanVtcGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanVtcHNMZWZ0ID4gMCAmJiB0aGlzLmp1bXBUaW1lciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHNMZWZ0IC09IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcFRpbWVyID0gdGhpcy5qdW1wQ29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgLT0gdGhpcy5qdW1wU3RyZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9DbGVhdmluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmNsZWF2aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgJiYgIXRoaXMuc3RhdGVzLmhhc1JlZmxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPj0gMyAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8PSA2KSB7Ly9VcHBlciBodXJ0YmJveFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtMjMwLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTUwLCA1MCwgdGhpcy5zY2FsZSwgMTUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNzAgLSB0aGlzLnNwcml0ZVdpZHRoIC0gMTUwLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTUwLCA1MCwgdGhpcy5zY2FsZSwgMTUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAzICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHsvL0xvd2VyIGh1cnRib3hcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA4MCwgMTAwLCB0aGlzLnNjYWxlLCAxNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC02MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAxMjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDE1MCwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmVuZXJnaXplZCAmJiAhdGhpcy5zdGF0ZXMuaGFzUmVmbGVjdGVkICYmdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPj0gMyAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5jbGVhdmVFbmVyZ3lDb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFJlZmxlY3Rib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAzMCwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDQwLCAxMjAsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0aGlzLCA0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFJlZmxlY3Rib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCA2MCwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDQwLCAxMjAsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0aGlzLCA0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VFbmVyZ3kodGhpcy5jbGVhdmVFbmVyZ3lDb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNSZWZsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmNsZWF2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1JlZmxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TaG9vdGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nICYmICEodGhpcy5zaG9vdENvb2xkb3duVGltZXIgPiAwKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5zaG9vdEVuZXJneUNvc3QgJiYgdGhpcy5zdGF0ZXMuZW5lcmdpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBQcm9qZWN0aWxlKHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRoaXMuc3RhdGVzLmVuZXJnaXplZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VFbmVyZ3kodGhpcy5zaG9vdEVuZXJneUNvc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19zaG9vdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLnNob290Q29zdCAmJiAhdGhpcy5zdGF0ZXMuZW5lcmdpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBQcm9qZWN0aWxlKHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSAtPSB0aGlzLnNob290Q29zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9fc2hvb3RcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyID0gdGhpcy5zaG9vdENvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJvdXRfb2ZfZW5lcmd5XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290Q29vbGRvd25UaW1lciA9IHRoaXMuc2hvb3RDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU2xhc2hpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSB0cnVlOyAvL0ZpeGVzIHN1cGVyLWR1cGVyIGp1bXAgYnVnLiAoV2hlbiBpbnRlcnJ1cHRpbmcgZGFzaCwgZGFzaCBkb2Vzbid0IGVudGVyIGlzRG9uZSgpIHNvIGdyYXYgaXNuJ3QgcmVzZXQpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID09PSAyICYmIHRoaXMuc3RhdGVzLmVuZXJnaXplZCAmJiAhdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5zbGFzaEVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFByb2plY3RpbGVfU3dvcmQodGhpcy5nYW1lLCB0aGlzLnggKyAyMCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlRW5lcmd5KHRoaXMuc2xhc2hFbmVyZ3lDb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJvdXRfb2ZfZW5lcmd5XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAyICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHsvL0h1cnRib3hcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KS8vZmFjaW5nIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIC8vZmFjaW5nIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAgLSB0aGlzLnNwcml0ZVdpZHRoIC0gMTIwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNTbGFzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rhc2hpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMudXBkYXRlUG9zKHRoaXMuZGFzaFNwZWVkLCAwKTsgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyB0aGlzLnVwZGF0ZVBvcygtdGhpcy5kYXNoU3BlZWQsIDApOyB9XG4gICAgICAgICAgICAgICAgLy9UaHJlZSBwYXJ0IGRhc2ggKGJldHRlciBpbnZ1bG5lcmFiaWxpdHkgaW1wbGVtZW50YXRpb24pIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNjAsIDYwLCAyNSwgMjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5lcmd5ID49IHRoaXMuZGFzaEVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSAtPSB0aGlzLmRhc2hFbmVyZ3lDb3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmVuZXJneURhc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lEZWxheVRpbWVyID0gdGhpcy5lbmVyZ3lEZWxheTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNjAsIDYwLCAzNywgMTUsIDAsIC0xMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nTWlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5lbmVyZ3lEYXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmludnVsbmVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ01pZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pbnZ1bG5lcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmVuZXJneURhc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdNaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNjAsIDYwLCAyNSwgMjUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzRGFzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1N0dW5uZWRcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdHVubmVkKSB7XG4gICAgICAgICAgICAgICAgLy9tb3ZlIGF3YXkgZnJvbSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBhdHRhY2tcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5zdHVuRGlyICogMTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA9IHRoaXMuZGFtYWdlQ29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxpZXIgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vREVBRFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRlYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3bmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1Jlc3Bhd25cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5yZXNwYXduZWQpIHtcbiAgICAgICAgICAgICAgICAvL3Jlc3Bhd24gKGNhbiBkZWZpbmUgdGhpbmdzIGxpa2UgYWN0aXZpdHkgY29vbGRvd24sIHJlc3Bhd24gYW5pbWF0aW9uLCBldGMuLi4pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vVGltZXIgQ2hlY2tzXG4gICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3lEZWxheVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5RGVsYXlUaW1lci0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3lDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duVGltZXItLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lbmVyZ3kgPCB0aGlzLm1heEVuZXJneSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3lDb29sZG93biA+IHRoaXMuZW5lcmd5Q29vbGRvd25NaW4pIHsgLy9lbmVyZ3kgY29vbGRvd24gdGltZSBkZWNyZWFzZXMgbm9uLWxpbmVhcmx5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duICo9IC41O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZW5lcmd5Q29vbGRvd24gLSB0aGlzLmVuZXJneUNvb2xkb3duTWluIDwgLS41KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVuZXJneUNvb2xkb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gKj0gMS4xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbmVyZ3lDb29sZG93bik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duID0gdGhpcy5lbmVyZ3lDb29sZG93bk1pbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duVGltZXIgPSB0aGlzLmVuZXJneUNvb2xkb3duO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNob290Q29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob290Q29vbGRvd25UaW1lci0tO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdmVsb2NpdGllcyBiYXNlZCBvbiBncmF2aXR5IGFuZCBmcmljdGlvblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgJiYgdGhpcy55VmVsb2NpdHkgPCB0aGlzLnRlcm1pbmFsVmVsb2NpdHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgICAgICAvL0hlYWx0aCBjaGVja3MgYW5kIHBvc2l0aW9uIGNoZWNrc1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vR09EIE1PREVcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5pc0dvZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5ID0gdGhpcy5tYXhFbmVyZ3k7XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wc0xlZnQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfS8vRU5EIFVwZGF0ZVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMueVZlbG9jaXR5IDwgMCAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHsvL2FzY2VuZGluZ1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAxNSwgMzAsIC0xMCwgLTIwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFzY2VuZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnlWZWxvY2l0eSA+IDAgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7Ly9kZXNjZW5kaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDE1LCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZXNjZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnJ1bm5pbmcgJiYgdGhpcy5hbmltYXRpb24gJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7Ly9ndW5ydW5uaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ndW5ydW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmcgJiYgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQpIHsvL3Nob290aW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg3MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZyAmJiAhdGhpcy5zdGF0ZXMuZ3JvdW5kZWQpIHsvL2FpciBzaG9vdGluZ1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAyMCwgMzUpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWlyc2hvb3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuY2xlYXZpbmcpIHsvL2NsZWF2aW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg4MCwgNjAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5jbGVhdmU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc2xhc2hpbmcpIHsvL3NsYXNoaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg4MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zbGFzaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQpIHsvL2Rhc2hpbmcgc3RhcnRcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRhc2hfc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ01pZCkgey8vZGFzaGluZyBtaWRcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRhc2hfbWlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQpIHsvL2Rhc2hpbmcgZW5kXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kYXNoX2VuZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zdHVubmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zdHVuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRlYWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbiAmJiB0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vVEVSUkFJTiBDT0xMSVNJT05cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiIHx8IG90aGVyLm5hbWUgPT09IFwiU3Bpa2VzXCIpIHtcblxuICAgICAgICAgICAgLy8gSGVybyBhYm92ZSB0ZXJyYWluXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVZlbG9jaXR5ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuanVtcHNMZWZ0ID0gdGhpcy5tYXhKdW1wcztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5qdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIZXJvIGp1bXBzIGludG8gdGVycmFpblxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSGVybyBjb2xsaWRlcyB3aXRoIHRlcnJhaW4gdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIZXJvIGNvbGxpZGVzIHdpdGggdGVycmFpbiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYIC0gdGhpcy5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGNvbGxpZGluZyB3aXRoICR7b3RoZXIubmFtZX0gZnJvbSAke2RpcmVjdGlvbn1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJMYXZhXCIgJiYgIXRoaXMuc3RhdGVzLmRlYWQgJiYgIXRoaXMuc3RhdGVzLmlzR29kKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodCAtIDU7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgIH1cbiAgICAgICAgLy9JZiBIZXJvIGNhbiB0YWtlIGRhbWFnZSwgY2hlY2sgaWYuLi5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5pc0dvZCAmJiB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPD0gMCAmJiAhdGhpcy5zdGF0ZXMuaW52dWxuZXJhYmxlICYmICF0aGlzLnN0YXRlcy5kZWFkICYmICF0aGlzLnN0YXRlcy5zdHVubmVkKSB7IFxuICAgICAgICAgICAgaWYgKG90aGVyLnBhcmVudENsYXNzID09PSBcIkVuZW15XCIgJiYgb3RoZXIubmFtZSAhPT0gXCJCb21iXCIpIHsgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLmRhbWFnZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9EZXRlcm1pbmUgaW50ZXJhY3Rpb24gYmFzZWQgb24gb3RoZXIncyBkYW1hZ2UgdHlwZVxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXIuZGFtYWdlVHlwZSA9PT0gXCJoZWFsdGhcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9faHVydFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gdGhpcy5kaWZmaWN1bHR5Km90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXQgc3RhdGVzIGFuZCBwdXQgaW50byBzdHVuIGFuaW0gYW5kIHN0dW5sb2NrXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh1cnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGV0ZXJtaW5lIHdoaWNoIHdheSBoZXJvIHNob3VsZCBtb3ZlIGR1cmluZyBzdHVuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3R1bkRpciA9IDE7IH0gZWxzZSB7IHRoaXMuc3R1bkRpciA9IC0xOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54IC0gb3RoZXIueCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCAtIHRoaXMuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvdGhlci5kYW1hZ2VUeXBlID09PSBcImVuZXJneVwiICYmIHRoaXMuZW5lcmd5ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93biA9IHRoaXMuZW5lcmd5Q29vbGRvd25NaW4qMjY7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSA9IE1hdGguZmxvb3IodGhpcy5lbmVyZ3kvMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJGaXJlYmFsbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9faHVydFwiKVxuICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPSB0aGlzLmRhbWFnZUNvb2xkb3duO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVydCgpO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlci5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdHVuRGlyID0gMTsgfSBlbHNlIHsgdGhpcy5zdHVuRGlyID0gLTE7IH1cbiAgICAgICAgICAgIH0gaWYgKG90aGVyLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gdGhpcy5kaWZmaWN1bHR5Km90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICBvdGhlci5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0dW5EaXIgPSAxOyB9IGVsc2UgeyB0aGlzLnN0dW5EaXIgPSAtMTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAgICAgb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgICAgIG90aGVyLmhhc093blByb3BlcnR5KFwiZGFtYWdlXCIpO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlci5pc0VuZW15KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9faHVydFwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLmRpZmZpY3VsdHkqb3RoZXIuZGFtYWdlOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VDb29sZG93blRpbWVyID0gdGhpcy5kYW1hZ2VDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBzdGF0ZXMgYW5kIHB1dCBpbnRvIHN0dW4gYW5pbSBhbmQgc3R1bmxvY2tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3R1bkRpciA9IDE7IH0gZWxzZSB7IHRoaXMuc3R1bkRpciA9IC0xOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKkhFTFBFUiBDTEFTU0VTKioqL1xuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCwgb2ZmWCA9IDAsIG9mZlkgPSAwKSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aCArIDU7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyICsgb2ZmWDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgb2ZmWTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZXMocnVubmluZywganVtcGluZywgc2hvb3RpbmcsIGNsZWF2aW5nLCBmYWNpbmdSaWdodCwgZ3JvdW5kZWQsIHNsYXNoaW5nLCBzaG90bG9ja2VkLCBmcmFtZWxvY2tlZCwgZW5lcmdpemVkLCBkYXNoaW5nLCBoYXNEYXNoZWQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHJ1bm5pbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLmp1bXBpbmcgPSBqdW1waW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IHNob290aW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5jbGVhdmluZyA9IGNsZWF2aW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhY2luZ1JpZ2h0O1xuICAgICAgICB0aGlzLnN0YXRlcy5ncm91bmRlZCA9IGdyb3VuZGVkO1xuICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZyA9IHNsYXNoaW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gc2hvdGxvY2tlZDtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmcmFtZWxvY2tlZDtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmdpemVkID0gZW5lcmdpemVkO1xuICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nID0gZGFzaGluZztcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5kYXNoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdNaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlcy5oYXNEYXNoZWQgPSBoYXNEYXNoZWQ7XG4gICAgfVxuXG4gICAgY2xlYXJTdGF0ZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRoaXMuc3RhdGVzLmVuZXJnaXplZCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZGVhZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGh1cnQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuc3R1bm5lZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1c2VFbmVyZ3koY29zdCkge1xuICAgICAgICB0aGlzLmVuZXJneSAtPSBjb3N0O1xuICAgICAgICB0aGlzLmVuZXJneURlbGF5VGltZXIgPSB0aGlzLmVuZXJneURlbGF5Q29vbGRvd247XG4gICAgfVxuXG4gICAgcmVzcGF3bigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3bmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMubWF4SGVhbHRoO1xuICAgICAgICB0aGlzLmVuZXJneSA9IHRoaXMubWF4RW5lcmd5O1xuICAgICAgICB0aGlzLmdhbWUuZ2FtZWJvYXJkLmxvc3RTY29yZSA9IHRoaXMuZ2FtZS5nYW1lYm9hcmQuc2NvcmUgLyAyO1xuICAgICAgICB0aGlzLmdhbWUuZ2FtZWJvYXJkLnNjb3JlID0gdGhpcy5nYW1lLmdhbWVib2FyZC5sb3N0U2NvcmU7XG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUgKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsIFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksIFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nIChjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVybzsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBBY3RvcixcbiAgICBUZXJyYWluLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG59IGZyb20gXCIuL1wiXG5cblxuLyogRm9yIGNvcHkgcGFzdGUgam9iczpcbnRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy54LCB0aGlzLnksIG9mZlgsIG9mZlksXG4gICAgdGhpcy5zcHJpdGVXaWR0aC8yLCB0aGlzLnNwcml0ZUhlaWdodC8yLCBodXJ0V2lkdGgsIGh1cnRIZWlnaHQsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpOyAgIFxuKi9cblxuY2xhc3MgSHVydGJveCBleHRlbmRzIEFjdG9yIHtcblxuICAgIC8vTm90ZSB0aGF0IGltZyBpcyByZXF1aXJlZCBmb3Igc3VwZXIoKSwgZXZlbiB0aG91Z2ggSHVydGJveCBpcyBuZXZlciBhbmltYXRlZC5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBjdHggPSBudWxsLCB4LCB5LCBvZmZYLCBvZmZZLCBwYXJlbnRXaWR0aCwgcGFyZW50SGVpZ2h0LCBodXJ0V2lkdGgsIGh1cnRIZWlnaHQsIHNjYWxlID0gMyxcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlLCBmYWNpbmdSaWdodCA9IHRydWUsIGlzRW5lbXkgPSBmYWxzZSwgZGFtYWdlVHlwZSA9IFwiaGVhbHRoXCIsIGZyYW1lcyA9IDIsIHBlcnNpc3RlbnQgPSBmYWxzZSwgaW1nID0gbnVsbCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmlzRW5lbXkgPSBpc0VuZW15O1xuICAgICAgICB0aGlzLmRhbWFnZVR5cGUgPSBkYW1hZ2VUeXBlO1xuXG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IGh1cnRXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IGh1cnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5ib3VuZFkgPSB5IC0gdGhpcy5ib3VuZEhlaWdodCArIG9mZlk7XG4gICAgICAgIHRoaXMuYm91bmRYID0geCArIHBhcmVudFdpZHRoICsgdGhpcy5ib3VuZFdpZHRoICsgb2ZmWDtcbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG4gICAgICAgIHRoaXMucGVyc2lzdGVudCA9IHBlcnNpc3RlbnQ7XG5cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL2hpdGJveCBwZXJzaXN0cyBmb3IgdHdvIHRpY2tzLiAodHdvIHByZXZlbnRzIHJhbmRvbSBoaXRib3ggXCJnYXBzXCIpXG4gICAgICAgIGlmICh0aGlzLmZyYW1lcyA8IDApIHtcbiAgICAgICAgICAgIC8vcGVyc2lzdFxuICAgICAgICAgICAgLy9UT0RPOiBGaWd1cmUgb3V0IHdoeSBoaXRib3ggZG9lc24ndCBwZXJzaXN0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmZyYW1lcyA+PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYW1lcy0tO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2xpbmtcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBIdXJ0Ym94OyIsImV4cG9ydCB7ZGVmYXVsdCBhcyBBY3Rvcn0gZnJvbSBcIi4vYWN0b3JcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEJvbWJ9IGZyb20gXCIuL2JvbWJcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEJ1bGxldH0gZnJvbSBcIi4vYnVsbGV0XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBDYW1lcmF9IGZyb20gXCIuL2NhbWVyYVwiXG5leHBvcnQge2RlZmF1bHQgYXMgQ3Jvd30gZnJvbSBcIi4vY3Jvd1wiXG5leHBvcnQge2RlZmF1bHQgYXMgRGlub30gZnJvbSBcIi4vZGlub1wiXG5leHBvcnQge2RlZmF1bHQgYXMgRW5lbXl9IGZyb20gXCIuL2VuZW15XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBFbnRpdHl9IGZyb20gXCIuL2VudGl0eVwiXG5leHBvcnQge2RlZmF1bHQgYXMgRmxhbWVzfSBmcm9tIFwiLi9mbGFtZXNcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEdhbWVCb2FyZH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiXG5leHBvcnQge2RlZmF1bHQgYXMgSGFuZH0gZnJvbSBcIi4vaGFuZFwiXG5leHBvcnQgeyAgICBcbiAgICBMYXZhLFxuICAgIEZpcmViYWxsLFxuICAgIFNwaWtlcyxcbiAgICBQcm9qZWN0aWxlSGF6YXJkLFxuICAgIFByb2plY3RpbGVDaXJjbGUsXG4gICAgTGF1bmNoZXIgfSBmcm9tIFwiLi9oYXphcmRzXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBIZXJvfSBmcm9tIFwiLi9oZXJvXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBIdXJ0Ym94fSBmcm9tIFwiLi9odXJ0Ym94XCJcbmV4cG9ydCB7XG4gICAgSXRlbSwgXG4gICAgRW5lcmd5UGFjaywgXG4gICAgSGVhbHRoUGFjayB9IGZyb20gXCIuL2l0ZW1cIlxuZXhwb3J0IHtkZWZhdWx0IGFzIExlb30gZnJvbSBcIi4vbGVvXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBQcm9qZWN0aWxlU3dvcmR9IGZyb20gXCIuL3Byb2plY3RpbGUtc3dvcmRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFByb2plY3RpbGV9IGZyb20gXCIuL3Byb2plY3RpbGVcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFJlZmxlY3Rib3h9IGZyb20gXCIuL3JlZmxlY3Rib3hcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFJvY2tldH0gZnJvbSBcIi4vcm9ja2V0XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTaG90Ymxhc3R9IGZyb20gXCIuL3Nob3RibGFzdFwiXG5leHBvcnQge2RlZmF1bHQgYXMgU29sZGllclNoaWVsZH0gZnJvbSBcIi4vc29sZGllci1zaGllbGRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFRlcnJhaW5Nb2JpbGV9IGZyb20gXCIuL3RlcnJhaW4tbW9iaWxlXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBUZXJyYWlufSBmcm9tIFwiLi90ZXJyYWluXCJcblxuIiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW50aXR5LCBcbiAgICBIYXphcmRzLFxuICAgIEhlcm8sIFxuICAgIFRlcnJhaW5cbn0gZnJvbSBcIi4vXCIgICAgXG5cblxuY2xhc3MgSXRlbSBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlPTMpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbnRpdHlcIjtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuXG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMuc2NhbGU7XG4gICAgfVxuXG4gICAgb25fcGlja3VwKCkge31cblxuICAgIGRyYXcgKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLnggKyB0aGlzLnhPZmZzZXQsIHRoaXMueSArIHRoaXMueU9mZnNldCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZSAoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZCAob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSGVyb1wiKSB7XG4gICAgICAgICAgICB0aGlzLm9uX3BpY2t1cChvdGhlcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiIHx8IG90aGVyLm5hbWUgPT09ICBcIlNwaWtlc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbG9jaXR5O1xuICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICB9XG5cbn1cblxuXG4vKlxuICAgIEEgaGVhbHRoIHBhY2sgdGhhdCByZXN0b3JlcyB0aGUgSGVybydzIGhlYWx0aFxuKi9cbmNsYXNzIEhlYWx0aFBhY2sgZXh0ZW5kcyBJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZywgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzY2FsZT0zLCBoZWFsdGhfdmFsdWU9MTUpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlKTtcbiAgICAgICAgdGhpcy5oZWFsdGhfdmFsdWUgPSBoZWFsdGhfdmFsdWU7ICAgICAgICAgIFxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFsxMCwgOF0sIDAsIDQsIDQsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDApO1xuICAgICAgICB0aGlzLnhPZmZzZXQgPSAxMFxuICAgICAgICB0aGlzLnlPZmZzZXQgPSAtMzBcbiAgICB9XG5cbiAgICBvbl9waWNrdXAoaGVybykge1xuICAgICAgICBpZiAoaGVyby5oZWFsdGggPCBoZXJvLm1heEhlYWx0aClcbiAgICAgICAgICAgIGhlcm8uaGVhbHRoICs9IHRoaXMuaGVhbHRoX3ZhbHVlO1xuICAgICAgICBpZiAoaGVyby5oZWFsdGggPiBoZXJvLm1heEhlYWx0aClcbiAgICAgICAgICAgIGhlcm8uaGVhbHRoID0gaGVyby5tYXhIZWFsdGg7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICB9XG59XG5cblxuIC8qXG4gICAgQW4gZW5lcmd5IHBhY2sgdGhhdCByZXN0b3JlcyB0aGUgSGVybydzIGVuZXJneVxuKi9cbmNsYXNzIEVuZXJneVBhY2sgZXh0ZW5kcyBJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZywgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzY2FsZT0zLCBlbmVyZ3lfdmFsdWU9MTUpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlKTtcbiAgICAgICAgdGhpcy5lbmVyZ3lfdmFsdWUgPSAxNTsgICAgICAgICAgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgsIDhdLCAwLCA0LCA0LCA0LCB0cnVlLCB0aGlzLnNjYWxlLCAwKTtcbiAgICAgICAgdGhpcy54T2Zmc2V0ID0gMTA7XG4gICAgICAgIHRoaXMueU9mZnNldCA9IC0zMDtcbiAgICB9XG5cbiAgICBvbl9waWNrdXAoaGVybykge1xuICAgICAgICBpZihoZXJvLmVuZXJneSA8IGhlcm8ubWF4RW5lcmd5KVxuICAgICAgICAgICAgaGVyby5lbmVyZ3kgKz0gdGhpcy5lbmVyZ3lfdmFsdWU7XG4gICAgICAgIGlmIChoZXJvLmVuZXJneSA+IGhlcm8ubWF4RW5lcmd5KVxuICAgICAgICAgICAgaGVyby5lbmVyZ3kgPSBoZXJvLm1heEVuZXJneTtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgSXRlbSwgSGVhbHRoUGFjaywgRW5lcmd5UGFjayB9IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgQWN0b3IsXG4gICAgRW5lbXlcbn0gZnJvbSBcIi4vXCJcblxuY2xhc3MgTGVvIGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDgwLCBzcHJpdGVIZWlnaHQgPSA2MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMub3JpZ1ggPSB4OyAvLyBUT0RPOiBkZW1vXG4gICAgICAgIHRoaXMub3JpZ1kgPSB5OyAvLyBUT0RPOiBkZW1vXG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDEyO1xuICAgICAgICB0aGlzLmp1bXBTcGVlZCA9IC0xMDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuICAgICAgICB0aGlzLnRpbWVyU3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICAvL0NvbnRhaW5zIGRldGFpbGVkIHNwcml0ZXNoZWV0IGluZm86IFtGV2lkdGgsIEZIZWlnaHQsIFJvdywgQ29sdW1uLCBGcmFtZXMgKHNoZWV0IHdpZHRoKV1cbiAgICAgICAgdGhpcy5zcHJpbmZvID0gWy8vZWFjaCBmaXZlLXR1cGxlIGlzIGZyb20gYSByb3cgb2YgdGhlIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgWzgwLCA2MCwgMCwgMCwgN10sIFs1MCwgNzAsIDEsIDAsIDVdLFxuICAgICAgICAgICAgWzcwLCA3MCwgMiwgMCwgOF0sIFs3MCwgODAsIDMsIDAsIDExXVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vQWN0b3IgU3RhdGVzXG4gICAgICAgIHRoaXMuc3RhdGVzID0geyAvL0RTMzogVGhlc2Ugc3RhdGUgYW5kIGFuaW1hdGlvbiBuYW1lcyBhcmUgdGVudGF0aXZlLlxuICAgICAgICAgICAgXCJsdW5naW5nXCI6IHRydWUsIC8vcm93IDA7IDEtMywgNC03XG4gICAgICAgICAgICBcImF0dGFja2luZ1wiOiBmYWxzZSwgLy9yb3cgMzsgNy0xMFxuICAgICAgICAgICAgXCJncmFwcGxpbmdcIjogZmFsc2UsIC8vcm93IDM7IDEtNFxuICAgICAgICAgICAgXCJldmFkaW5nXCI6IGZhbHNlLCAvL3JvdyAxOyAxXG4gICAgICAgICAgICBcImZpcmVsdW5naW5nXCI6IGZhbHNlLCAvL3JvdyAyOyAxLTIsIDMtNiwgNy04XG4gICAgICAgICAgICBcImRlbW9sb29wXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhbHNlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwibHVuZ2VcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDAsIDcsIDcsIDcsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiYXR0YWNrXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs3MCwgODBdLCAzLCAxMSwgNywgMTEsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiZmlyZWx1bmdlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs3MCwgNzBdLCAyLCA4LCA3LCA4LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcImlkbGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDMsIDExLCAxMDAsIDEsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sdW5nZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5kZW1vbG9vcCkge1xuICAgICAgICAgICAgLy9sdW5nZSAoc2hvdWxkZXIgc2xhbSlcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5sdW5naW5nICYmICF0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDgwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSA0MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vZ3JhcHBsZS9zbGFtIChzaG91bGRlciBzbGFtKVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuc3RhdGVzLmx1bmdpbmcgJiYgdGhpcy5zdGF0ZXMuYXR0YWNraW5nICYmIHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gODA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lclN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IDMwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vZmlyZSBsdW5nZVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZmlyZWx1bmdpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maXJlbHVuZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNzA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID4gMiAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMub3JpZ1k7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL1NhbWUgYXMgYWJvdmUsIGJ1dCBub3QgaW4gXCJkZW1vXCIgZm9ybS5cbiAgICAgICAgLy9lbHNlIGlmICh0aGlzLnN0YXRlcy5sdW5naW5nICYmICF0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA4MDtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lID4gMykge1xuICAgICAgICAvLyAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgdGhpcy55IC09IDQwO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuICAgICAgICAvL2Vsc2UgaWYgKCF0aGlzLnN0YXRlcy5sdW5naW5nICYmIHRoaXMuc3RhdGVzLmF0dGFja2luZyAmJiB0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDcwO1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZVdpZHRoID0gODA7XG4gICAgICAgIC8vICAgIC8vVGhpcyB3aWxsIHBvdGVudGlhbGx5IGJlIHVzZWQgdG8gZmxhZyBkaWZmZXJlbnQgbGV2ZWxzIG9mIFwidnVsbmVyYWJpbGl0eVwiIChleDogY291bnRlcmFibGUpXG4gICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiYXR0YWNraW5nXCIpO1xuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIGlmICh0aGlzLnN0YXRlcy5maXJlbHVuZ2luZykge1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDcwO1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZVdpZHRoID0gNzA7XG4gICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+IDIgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPCA1KSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5lbGFwc2VkVGltZSA+PSB0aGlzLmFuaW1hdGlvbi50b3RhbFRpbWUgLSAxKSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAvLyAgICAgICAgdGhpcy54ID0gdGhpcy5vcmlnWDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgLy8gICAgICAgIGlmICgvKnRoaXMuYW5pbWF0aW9uLmlzRG9uZSovMSkge1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy99XG5cbiAgICB9O1xuXG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubHVuZ2luZyAmJiAhdGhpcy5zdGF0ZXMuYXR0YWNraW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sdW5nZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgIXRoaXMuc3RhdGVzLmx1bmdpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmF0dGFjaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5maXJlbHVuZ2luZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmlyZWx1bmdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbmltYXRpb24gZG9lcyBub3QgZXhpc3RcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKHRoaXMuY2xvY2tUaWNrLCBjdHgsIHRoaXMueCwgdGhpcy55KTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBMZW87XG5cblxuXG5cbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIEJ1bGxldCxcbiAgICBUZXJyYWluLFxuICAgIEh1cnRib3gsXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgUHJvamVjdGlsZV9Td29yZCBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIHNwcml0ZVdpZHRoID0gOTAsIHNwcml0ZUhlaWdodCA9IDYwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiQWN0b3JcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMTA7XG4gICAgICAgIGlmIChmYWNpbmdSaWdodCkgeyB0aGlzLnggKz0gOTU7IH0gZWxzZSB7IHRoaXMueCAtPSA5NSB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSAwOyAvLzE4MFxuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMDsgLy8xMjBcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDU7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTUwO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwic3RhcnRpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhYmxpemVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZWNvdmVyaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcInN0YXJ0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDQsIDE4LCA3LCAyLCBmYWxzZSwgdGhpcy5zY2FsZSwgMTEpLFxuICAgICAgICAgICAgXCJzdGFibGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgNCwgMTgsIDcsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEzKSxcbiAgICAgICAgICAgIFwicmVjb3ZlcnlcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgNCwgMTgsIDcsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxNCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhYmxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zdGFibGl6ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhYmxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7Ly9IdXJ0Ym94ICBhY3RpdmUgdW5sZXNzIGluIHJlY292ZXJ5IGZyYW1lc1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xMDAgLSA4MCAtIDQwLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTcwLCA5MCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgICAgICAgICBodXJ0Ym94LnBhcmVudCA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGh1cnRib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xMDAgLSAxNTAgLSAyMDAgLSAxNSwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDE3MCwgOTAsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgICAgICAgICAgaHVydGJveC5wYXJlbnQgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShodXJ0Ym94KTsgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YWJsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJlY292ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIC8vY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgIC8vICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAvLyAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgIC8vICAgIH1cbiAgICAvLyAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSAgXCJCdWxsZXRcIikge1xuICAgIC8vICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgLy8gICAgfVxuICAgIC8vICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgLy8gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAvLyAgICB9XG4gICAgLy99XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGVfU3dvcmQ7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG5BY3RvciwgXG5CdWxsZXQsIFxuRW5lbXksIFxuVGVycmFpblxufSBmcm9tIFwiLi9cIlxuXG5jbGFzcyBQcm9qZWN0aWxlIGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgLy9BZGRlZCBlbmVyZ2l6ZWQgKEJFRk9SRSBESU1FTlNJT05TKSB0byBjaG9vc2UgY29ycmVjdCBwcm9qZWN0aWxlXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgZW5lcmdpemVkLCBzcHJpdGVXaWR0aCA9IDYwLCBzcHJpdGVIZWlnaHQgPSA2MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDEzO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHsgdGhpcy54ICs9IDEwMDsgfSBlbHNlIHsgdGhpcy54IC09IDEwMCB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDUwO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpICsgMTAwOyAvLysxMDAgYWxpZ25zIHdpdGggdGhlIGd1blxuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gKHRoaXMuc3ByaXRlSGVpZ2h0IC0gMTApOyAvLyB0aGUgLTEwIG9mZnNldCBhY2NvdW50cyBmb3IgdGhlIFwicGFkZGluZ1wiIEkgYWRkZWQgdG8gZWFjaCBmcmFtZSBpbiB0aGUgc3ByaXRlIHNoZWV0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSAtIDEwMDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCAtIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgaWYgKGVuZXJnaXplZCkge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAyMDA7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDI7XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAxN1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSA1MDtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMTtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG5cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZ3JlZW5cIjogIWVuZXJnaXplZCxcbiAgICAgICAgICAgIFwiYmx1ZVwiOiBlbmVyZ2l6ZWQsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGFibGl6ZWRcIjogZmFsc2UsICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZ3JlZW5fZXhpdGluZ1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAzLCAxNSwgNiwgOCwgZmFsc2UsIHRoaXMuc2NhbGUsIDQpLFxuICAgICAgICAgICAgXCJncmVlbl9zdGFibGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgMywgMTUsIDYsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDExKSxcbiAgICAgICAgICAgIFwiYmx1ZV9leGl0aW5nXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDMsIDIzLCA2LCA4LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTUpLFxuICAgICAgICAgICAgXCJibHVlX3N0YWJsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAzLCAyMywgNiwgMywgdHJ1ZSwgdGhpcy5zY2FsZSwgMjApLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZ3JlZW4pIHsgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZ3JlZW5fZXhpdGluZzsgfSBlbHNlIHsgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYmx1ZV9leGl0aW5nOyB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL1RPRE9cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5ncmVlbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmdyZWVuX2V4aXRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZ3JlZW5fc3RhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuYmx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmJsdWVfZXhpdGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFibGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ibHVlX3N0YWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypDT0xMSVNJT04qL1xuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHsgLy9jb21tZW50ZWQgaXMgZm9yIGV2ZW50dWFsIGltcGxlbWVudGF0aW9uIG9mIHByb2plY3RpbGUgXCJhcm1vclwiL3RvdWdobmVzcy5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gIFwiQnVsbGV0XCIpIHtcbiAgICAgICAgLy8gICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAvL31cbiAgICAgICAgZWxzZSBpZiAob3RoZXIucGFyZW50Q2xhc3MgPT09ICBcIkVuZW15XCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2lmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy99IFxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBBY3RvcixcbiAgICBUZXJyYWluLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG59IGZyb20gXCIuL1wiXG5cblxuLyogRm9yIGNvcHkgcGFzdGUgam9iczpcbiAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMueCwgdGhpcy55LCBvZmZYLCBvZmZZLFxuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLzIsIHRoaXMuc3ByaXRlSGVpZ2h0LzIsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7ICAgXG4gKi9cbmNsYXNzIFJlZmxlY3Rib3ggZXh0ZW5kcyBBY3RvciB7XG5cbiAgICAvL05vdGUgdGhhdCBpbWcgaXMgcmVxdWlyZWQgZm9yIHN1cGVyKCksIGV2ZW4gdGhvdWdoIFJlZmxlY3Rib3ggaXMgbmV2ZXIgYW5pbWF0ZWQuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4ID0gbnVsbCwgeCwgeSwgb2ZmWCwgb2ZmWSwgcGFyZW50V2lkdGgsIHBhcmVudEhlaWdodCwgaHVydFdpZHRoLCBodXJ0SGVpZ2h0LCBzY2FsZSA9IDMsIGZhY2luZ1JpZ2h0ID0gdHJ1ZSwgcGFyZW50ID0gbnVsbCwgZnJhbWVzID0gMiwgaW1nID0gbnVsbCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcblxuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSBodXJ0V2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSBodXJ0SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuYm91bmRZID0geSAtIHRoaXMuYm91bmRIZWlnaHQgKyBvZmZZO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0geCArIHBhcmVudFdpZHRoICsgdGhpcy5ib3VuZFdpZHRoICsgb2ZmWDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0geCAtIHRoaXMuYm91bmRXaWR0aCAtIG9mZlg7XG4gICAgICAgIH1cbiAgICAgICAgLy9TdGF0c1xuXG4gICAgICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL2hpdGJveCBwZXJzaXN0cyBmb3IgdHdvIHRpY2tzLiAodHdvIHByZXZlbnRzIHJhbmRvbSBoaXRib3ggXCJnYXBzXCIpXG4gICAgICAgIGlmICh0aGlzLmZyYW1lcyA+PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYW1lcy0tO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiQnVsbGV0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1VDQ0VTUyFcIilcbiAgICAgICAgICAgIC8vb3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gIW90aGVyLnN0YXRlcy5mYWNpbmdSaWdodDtcbiAgICAgICAgICAgIC8vb3RoZXIubmFtZSA9IFwiUHJvamVjdGlsZVwiO1xuICAgICAgICAgICAgLy9vdGhlci5kYW1hZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlJvY2tldFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5PIFNPVVAgRk9SIFlPVSFcIik7XG4gICAgICAgICAgICBvdGhlci5wb2ludFZhbHVlID0gNTtcbiAgICAgICAgICAgIG90aGVyLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGFyZW50LmVuZXJneSArPSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbmVyZ3lDb29sZG93biAvPSA0LjI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiQm9tYlwiKSB7XG4gICAgICAgICAgICBvdGhlci54VmVsb2NpdHkgPSAtdGhpcy5mYWNpbmcgKiA1O1xuICAgICAgICAgICAgb3RoZXIueVZlbG9jaXR5ID0gLTIwO1xuICAgICAgICAgICAgb3RoZXIuZGFtYWdlID0gNTA7XG4gICAgICAgICAgICBvdGhlci5zdGF0ZXMucmVmbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBSZWZsZWN0Ym94OyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG4gICAgUHJvamVjdGlsZSxcbiAgICBUZXJyYWluXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgUm9ja2V0IGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNTApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMueVNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5tYXhYID0gODtcbiAgICAgICAgdGhpcy5tYXhZID0gNDtcbiAgICAgICAgdGhpcy54QWNjZWwgPSAuNDtcbiAgICAgICAgdGhpcy55QWNjZWwgPSAuMTc7XG4gICAgICAgIHRoaXMueSAtPSA3MFxuICAgICAgICBpZiAoIWZhY2luZ1JpZ2h0KSB7IHRoaXMueCAtPSAxMDA7IH0gZWxzZSB7IHRoaXMueCArPSAxMDAgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gMzA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAzMDtcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDEyMDsgLy8rMTAwIGFsaWducyB3aXRoIHRoZSBndW5cbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDIgKiB0aGlzLnNwcml0ZVdpZHRoIC0gMTgwO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gKHRoaXMuc3ByaXRlSGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5kYW1hZ2VUeXBlID0gXCJlbmVyZ3lcIjtcbiAgICAgICAgdGhpcy5kcmFpblRpbWUgPSAxMjA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMjtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDtcbiAgICAgICAgdGhpcy5ib3VuY2VDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYm91bmNlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmJvdW5jZVRpbWUgPSAzNTtcbiAgICAgICAgdGhpcy50aW1lciA9IDUwMDtcbiAgICAgICAgdGhpcy5zYWZlVGltZXIgPSAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwicm9ja2V0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA2LCAyMCwgNSwgNywgdHJ1ZSwgdGhpcy5zY2FsZSwgMTMpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5yb2NrZXQ7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLmZhY2luZyA9IDE7IH0gZWxzZSB7IHRoaXMuZmFjaW5nID0gLTE7fVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgJiYgdGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCAmJiB0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHsvL1RPRE8gVHJhY2tpbmcgYmVoYXZpb3JcbiAgICAgICAgICAgIGlmICgodGhpcy54U3BlZWQgPCB0aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IDEpIHx8ICh0aGlzLnhTcGVlZCA+IC10aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IC0xKSkge1xuICAgICAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuZmFjaW5nICogdGhpcy54QWNjZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55ID49IDApIHsvLyBiZWxvdyBoZXJvO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTcGVlZCA+IC10aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgLT0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugey8vIGFib3ZlIGhlcm9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U3BlZWQgPCB0aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgKz0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDsvLyArIE1hdGguZmxvb3IoTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgLyAzMDApICogMS41O1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkOy8vICsgTWF0aC5mbG9vcihNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSAvIDMwMCkgKiAxLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYm91bmNlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuY2VUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJvY2tldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlRlcnJhaW5cIiAmJiB0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkhlcm9cIiAmJiBvdGhlci5zdGF0ZXMuaW52dWxuZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgLy9rZWVwIG9uIHRoZSBtYXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkh1cnRib3hcIiAmJiAhb3RoZXIuaXNFbmVteSAmJiB0aGlzLmdhbWUuaGVyby5zdGF0ZXMuc2xhc2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhaW5UaW1lICs9IDEwO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAtdGhpcy5mYWNpbmcgKiB0aGlzLm1heFggKiAyO1xuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgKiAxMDAgPCA1MCkge1xuICAgICAgICAgICAgICAgIHRoaXMueVNwZWVkID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlTcGVlZCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2lmICh0aGlzLmJvdW5jZUNvdW50ID4gMykge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuY2VUaW1lciA9IHRoaXMuYm91bmNlVGltZTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmNlQ291bnQrKztcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIiAmJiBvdGhlci5zdGF0ZXMuYmx1ZSkgfHwgb3RoZXIucGFyZW50ID09PSBcIlByb2plY3RpbGVfU3dvcmRcIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aCArIDU7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2NrZXQ7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7QWN0b3J9IGZyb20gXCIuL1wiXG5cbmNsYXNzIFNob3RibGFzdCBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIHNwcml0ZVdpZHRoID0gNTAsIHNwcml0ZUhlaWdodCA9IDUwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gNztcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7IHRoaXMueCArPSAxMDA7IH0gZWxzZSB7IHRoaXMueCAtPSAxMDAgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcblxuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgLSA1MDA7XG5cbiAgICAgICAgLy9TdGF0c1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwic2hvdGJsYXN0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTgsIDQsIDYsIGZhbHNlLCB0aGlzLnNjYWxlLCAxMCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob3RibGFzdDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vVE9ET1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG90Ymxhc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaG90Ymxhc3Q7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgQnVsbGV0LFxuICAgIEVuZW15LFxuICAgIFRlcnJhaW4sXG4gICAgUHJvamVjdGlsZSxcbiAgICBIdXJ0Ym94LFxuICAgIFNob3RibGFzdFxufSBmcm9tIFwiLi9cIlxuXG5cbi8vVE9ETyAobG9uZyB0ZXJtKTogQUxMIEFDVE9SUyAtIFwiQ2hlY2sgaWYgaW4gcmFuZ2VcIiBoZWxwZXIgZnVuY3Rpb25cbmNsYXNzIFNvbGRpZXJfU2hpZWxkIGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDUwLCBzcHJpdGVIZWlnaHQgPSA1MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDc7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcblxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogNDU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogNDU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAodGhpcy5zcHJpdGVIZWlnaHQgLyAyIC0gMTApO1xuICAgICAgICAvL3RoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzgsIDQwKTtcblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDMwO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDUwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG5cbiAgICAgICAgLy8gQmVoYXZpb3IgcGFyYW1ldGVyc1xuICAgICAgICB0aGlzLnJ1blByb2IgPSA1O1xuICAgICAgICB0aGlzLnJ1bkF3YXlDb29sZG93biA9IDI1MDtcbiAgICAgICAgdGhpcy5ydW5Bd2F5Q29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMucnVuQXdheVRpbWUgPSA3NTtcbiAgICAgICAgdGhpcy5ydW5Bd2F5VGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gMTAwMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IDM1MDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IGZhbHNlLCAvL2N1cnJlbnRseSB1bnVzZWRcbiAgICAgICAgICAgIFwiaWRsaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcInJ1bm5pbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob290aW5nX3N0YXJ0dXBcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob290aW5nX2FjdGl2ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvb3RpbmdfcmVjb3ZlclwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaGFzU2hvdFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2xhc2hpbmdfc3RhcnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNsYXNoaW5nX2VuZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYmxvY2tpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcInR1cm5pbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZyYW1lbG9ja2VkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicnVubmluZ0F3YXlcIjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDE1LCA1LCA2LCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwidHVyblwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDE1LCAzLCA1LCBmYWxzZSwgdGhpcy5zY2FsZSwgNiksXG4gICAgICAgICAgICBcImJsb2NrXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgMTUsIDksIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxMSksXG4gICAgICAgICAgICBcInJ1blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDEsIDEyLCAzLCAxMiwgdHJ1ZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcInNob290X3N0YXJ0dXBcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxOCwgMiwgNSwgZmFsc2UsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJzaG9vdF9hY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxOCwgNCwgNSwgZmFsc2UsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICAgICAgXCJzaG9vdF9yZWNvdmVyXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTgsIDQsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDkpLFxuICAgICAgICAgICAgXCJzbGFzaF9zdGFydFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbMTAwLCA2MF0sIDMsIDE2LCAyLCA5LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcInNsYXNoX2VuZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbMTAwLCA2MF0sIDMsIDE2LCAzLCA3LCBmYWxzZSwgdGhpcy5zY2FsZSwgOSksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgfVxuXG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzFdKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKioqIEJFR0lOIEJFSEFWSU9SIENPREUgKioqKi9cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgLy9pZGxpbmcgLSBUaGlzIGlzIHdoZXJlIG1vc3QgYmVoYXZpb3Igd2lsbCBzdGFydCwgYW5kIG1vc3Qgd2lsbCByZXR1cm4uXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nICYmICF0aGlzLnN0YXRlcy5ydW5uaW5nQXdheVxuICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDwgdGhpcy5zaWdodFJhZGl1c1swXVxuICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDwgdGhpcy5zaWdodFJhZGl1c1sxXSkge1xuICAgICAgICAgICAgICAgIC8vRmFjZSBFbmVteVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaGVyby54ID4gdGhpcy54ICYmICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCAmJiAhdGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudHVybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdhbWUuaGVyby54IDwgdGhpcy54ICYmIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ICYmICF0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2xhc2ggd2hlbiBpbiByYW5nZVxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSAyNTAgJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPCA1MFxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLnJhbmRvbSgpICogMTAwIDw9IDUgJiYgdGhpcy5hbmltYXRpb24ubG9vcHMgPiAxKSB7IC8vYWRkZWQgcmFuZG9tIGFjdGl2YXRpb24gYXMgYSB0ZXN0LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZ19zdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gMjA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TaG9vdCB3aGVuIGluIHJhbmdlXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpID49IDIwMFxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSAxMDAwXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYW5pbWF0aW9uLmxvb3BzID49IDMpIHsgLy9zaG90IGNvb2xkb3duIGJhc2VkIG9uIGlkbGUgdGltZSAobWVhc3VyZWQgYnkgYW5pbWF0aW9uIGxvb3BzKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA2MDBcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIE1hdGgucmFuZG9tKCkgKiAxMCA8PSB0aGlzLnJ1blByb2JcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMucnVuQXdheUNvb2xkb3duVGltZXIgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJydW5uaW5nIGF3YXlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1blByb2IgLT0gMi41O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Bd2F5VGltZXIgPSB0aGlzLnJ1bkF3YXlUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Bd2F5Q29vbGRvd25UaW1lciA9IHRoaXMucnVuQXdheUNvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZ0F3YXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKioqKiBVUERBVEUgQkVIQVZJT1IgUEFSQU1TICoqKiovXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLnNob290aW5nX2FjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkF3YXlDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bkF3YXlDb29sZG93blRpbWVyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkF3YXlUaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Bd2F5VGltZXIgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKioqKiBFTkQgQkVIQVZJT1IgQ09ERSAqKioqL1xuXG4gICAgICAgICAgICAvL1J1biBBd2F5IFJvdXRpbmVcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSAmJiAhdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucnVuQXdheVRpbWVyID09IHRoaXMucnVuQXdheVRpbWUgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ydW5Bd2F5VGltZXIgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnJ1bkF3YXlUaW1lciA+IDAgJiYgIXRoaXMuc3RhdGVzLnR1cm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJ1bm5pbmcpIHsgLy9ydW5uaW5nXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZmFjaW5nICogdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMuZmFjaW5nICogdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXAgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkKSB7IC8vc2hvb3Rpbmcgc3RhcnQ6IHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzgsIDQwKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUpIHsgLy9zaG9vdGluZyBhY3RpdmVcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmhhc1Nob3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImVuZW15X3Nob290XCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFNob3RibGFzdCh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEJ1bGxldCh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1Nob3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1Nob3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX3JlY292ZXIpIHsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMucnVubmluZ0F3YXkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZ19zdGFydCAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQpIHsgLy9zbGFzaGluZyBzdGFydFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA9PT0gOCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgNSwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA3MCwgMTAwLCB0aGlzLnNjYWxlLCAyKnRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwIC0gdGhpcy5zcHJpdGVXaWR0aCAtIDIqNjUsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNzAsIDEwMCwgdGhpcy5zY2FsZSwgMip0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nX3N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nX2VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNsYXNoaW5nX2VuZCkgeyAvL3NsYXNoaW5nIGVuZFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAwICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIDUsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNzAsIDEwMCwgdGhpcy5zY2FsZSwgMip0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC02MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAyKjY1LCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDcwLCAxMDAsIHRoaXMuc2NhbGUsIDIqdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZ19lbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IDIwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmJsb2NraW5nKSB7IC8vYmxvY2tpbmdcbiAgICAgICAgICAgICAgICAvLyBhIGxpdHRsZSBrbm9ja2JhY2tcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IGZhbHNlOyAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMudHVybmluZykgeyAvL3R1cm5pbmdcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nICo9IC0xOyAvL3NlZSBhYm92ZSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMClcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgMTAsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucnVubmluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIDUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMucnVuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdF9zdGFydHVwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCA1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob290X2FjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmdfcmVjb3Zlcikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIDUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2hvb3RfcmVjb3ZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2xhc2hpbmdfc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDEwMCwgNjAsIDI1LCAzNSwgLTE1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNsYXNoX3N0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZ19lbmQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDEwMCwgNjAsIDI1LCAzNSwgLTE1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNsYXNoX2VuZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCAtMTAsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnR1cm5pbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCAtMTAsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMudHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICAvL3VzZWQgdG8gZWFzaWx5IHVwZGF0ZSBoaXRib3ggYmFzZWQgb24gc3RhdGUvYW5pbWF0aW9uXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0LCBvZmZYLCBvZmZZKSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDIgKyB0aGlzLmZhY2luZypvZmZYO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAoZkhlaWdodCAvIDIgLSAxMCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQgLTEwOyAvL2ZpeCBtYWdpYyBudW1iZXIgKGRyYXduIHNsaWdodGx5IGJlbG93IGhpdGJveCB3aXRob3V0IHRoZSAyMCBvZmZzZXQpXG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuanVtcHNMZWZ0ID0gdGhpcy5tYXhKdW1wcztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5qdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgKyBvdGhlci5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCAtIHRoaXMuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICAvLyBibG9ja2luZyBmcm9tIGxlZnQgJiByaWdodFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCAmJiB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdsZWZ0JyAmJiBvdGhlci54IDwgdGhpcy54Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcInNoaWVsZF9ibG9ja1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54ID4gMCAmJiAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQvKmRpcmVjdGlvbiA9PSAncmlnaHQnICYmIG90aGVyLnggPiB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwic2hpZWxkX2Jsb2NrXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJlbmVteV9odXJ0XzFcIilcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBibG9vZCBvciBzb21ldGhpbmcgZ29lcyBoZXJlXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lLmFkZEVudGl0eSguLi4pXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAvLyBibG9ja2luZyBmcm9tIGxlZnQgJiByaWdodFxuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLnBhcmVudCA9PT0gXCJCb21iXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueCAtIG90aGVyLnggPCAwICYmIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ2xlZnQnICYmIG90aGVyLnggPCB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIG90aGVyLnggPiAwICYmICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdyaWdodCcgJiYgb3RoZXIueCA+IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwICYmIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ2xlZnQnICYmIG90aGVyLnggPCB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPiAwICYmICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdyaWdodCcgJiYgb3RoZXIueCA+IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNvbGRpZXJfU2hpZWxkOyIsIi8vd2lsbCByZXR1cm4gbXVsdGlwbGUgZGlmZmVyZW50IHN1YnR5cGVzIG9mIG1vdmluZyBwbGF0Zm9ybXNcbmltcG9ydCB7VGVycmFpbn0gZnJvbSBcIi4vXCJcblxuY2xhc3MgVGVycmFpbk1vYmlsZSBleHRlbmRzIFRlcnJhaW4ge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGRpbWVuc2lvbnMsIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgdGlsZXMgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4LCBcIlRlcnJhaW5cIik7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnRpbGVzID0gdGlsZXM7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcmNfd2lkdGggPSBkaW1lbnNpb25zWzBdO1xuICAgICAgICB0aGlzLnNyY19oZWlnaHQgPSBkaW1lbnNpb25zWzFdO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgKyA2O1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA5NjtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDk2O1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy54LCB0aGlzLnksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy50aWxlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjb2wgPSB0aGlzLnRpbGVzWzBdXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMudGlsZXNbMV1cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxuICAgICAgICAgICAgICAgICAgICAoY29sICogdGhpcy5zcmNfd2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICAocm93ICogdGhpcy5zcmNfaGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX2hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54LCB0aGlzLnksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoICogMyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfaGVpZ2h0ICogM1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgfVxufSAvLyBlbmQgVGVycmFpblxuXG5leHBvcnQgZGVmYXVsdCBUZXJyYWluTW9iaWxlO1xuXG4iLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiXG5cbmNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBFbnRpdHkge1xuICAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgeCwgeSwgZGltZW5zaW9ucywgaW1nPW51bGwsIGN0eD1udWxsLCBzY2FsZT1udWxsLCB0aWxlcz1udWxsLCBib3VuZHMgPSBbMCwgMCwgMCwgMF0pIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbnRpdHlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJUZXJyYWluXCI7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnRpbGVzID0gdGlsZXM7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcmNfd2lkdGggPSBkaW1lbnNpb25zWzBdO1xuICAgICAgICB0aGlzLnNyY19oZWlnaHQgPSBkaW1lbnNpb25zWzFdO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueCArIGJvdW5kc1syXTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgKyBib3VuZHNbM107XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBib3VuZHNbMF07XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYm91bmRzWzFdO1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lIChjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy50aWxlcyAhPSBudWxsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29sID0gdGhpcy50aWxlc1swXVxuICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMudGlsZXNbMV1cbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIFxuICAgICAgICAgICAgICAgIChjb2wgKiB0aGlzLnNyY193aWR0aCksXG4gICAgICAgICAgICAgICAgKHJvdyAqIHRoaXMuc3JjX2hlaWdodCksXG4gICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5zcmNfaGVpZ2h0LCBcbiAgICAgICAgICAgICAgICB0aGlzLngsIHRoaXMueSxcbiAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCozLCBcbiAgICAgICAgICAgICAgICB0aGlzLnNyY19oZWlnaHQqMyBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUgKCkge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIH1cbn0gLy8gZW5kIFRlcnJhaW5cblxuZXhwb3J0IGRlZmF1bHQgVGVycmFpbjtcbiIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9lbnRpdGllcy9oZXJvXCJcbmltcG9ydCBIdWQgZnJvbSBcIi4vaHVkXCJcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gXCIuL2JhY2tncm91bmRcIlxuaW1wb3J0IFNvdW5kIGZyb20gXCIuL3NvdW5kXCJcblxuXG4gLyoqKioqKioqKioqKioqKlxuR2FtZUVuZ2luZSBjbGFzc1xuKioqKioqKioqKioqKioqKi9cbmNsYXNzIEdhbWVFbmdpbmUge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZWJvYXJkLCBoZXJvKSB7XG4gICAgICAgIHRoaXMuZHJhd0JveGVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGV2TW9kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc291bmQgPSBuZXcgU291bmQoKTtcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IFtdO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnMgPSBbXTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdHggPSBudWxsO1xuICAgICAgICB0aGlzLmNsaWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3VzZSA9IG51bGw7XG4gICAgICAgIHRoaXMud2hlZWwgPSBudWxsO1xuICAgICAgICB0aGlzLnN1cmZhY2VXaWR0aCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3VyZmFjZUhlaWdodCA9IG51bGw7XG4gICAgICAgIHRoaXMubXVzaWMgPSBudWxsO1xuICAgICAgICB0aGlzLmFkZGVkcG9pbnRzID0gMDtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gXCJOb3JtYWwgKEJ1dCBLaW5kYSBFYXN5KVwiO1xuXG4gICAgICAgIC8vREVWIFRPT0wgRklFTERTXG4gICAgICAgIHRoaXMudG9nZ2xlQ29vbGRvd249IDIwO1xuICAgICAgICB0aGlzLmJveFRvZ2dsZVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zZXRQb3NUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmNoZWNrcG9pbnRDeWNsZUNvdW50ID0gMTtcblxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhdXNlVG9nZ2xlQ29vbGRvd24gPSAwO1xuICAgICAgICB0aGlzLnBhdXNlR2VuZXJhbCA9IDQwO1xuICAgICAgICB0aGlzLnBhdXNlTGF5b3V0QSA9IDM1MDtcbiAgICAgICAgdGhpcy5wYXVzZUxheW91dEIgPSAzNTA7XG4gICAgICAgIHRoaXMucGF1c2VGbGF2b3JYID0gODAwO1xuICAgICAgICB0aGlzLnBhdXNlRmxhdm9yWSA9IDI1MDtcblxuICAgICAgICAvLyBLQiBpbnB1dCBrZXljb2Rlc1xuICAgICAgICB0aGlzLmNvbnRyb2xLZXlzID0ge1xuICAgICAgICAgICAgXCJTcGFjZVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVdcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlTXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5RFwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUFcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlSXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5RlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUdcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlFXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5SlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUtcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlMXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5TVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVBcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlUXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5WVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVZcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlDXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiRW50ZXJcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQxXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkMlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDNcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQ0XCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkNVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDZcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQ5XCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgfVxuICAgICAgICAvLyBjb250cm9sIG1hcHBpbmdcbiAgICAgICAgdGhpcy5jb250cm9sTGF5b3V0QSA9IHtcbiAgICAgICAgICAgIFwianVtcFwiOiBcIlNwYWNlXCIsXG4gICAgICAgICAgICBcInJpZ2h0XCI6IFwiS2V5RFwiLFxuICAgICAgICAgICAgXCJsZWZ0XCI6IFwiS2V5QVwiLFxuICAgICAgICAgICAgXCJzaG9vdFwiOiBcIk51bXBhZDRcIixcbiAgICAgICAgICAgIFwic2xhc2hcIjogXCJOdW1wYWQ1XCIsXG4gICAgICAgICAgICBcImNsZWF2ZVwiOiBcIk51bXBhZDZcIixcbiAgICAgICAgICAgIFwiZW5lcmdpemVcIjogXCJLZXlXXCIsXG4gICAgICAgICAgICBcImRhc2hcIjogXCJOdW1wYWQxXCIsXG4gICAgICAgICAgICBcImdldFBvc1wiOiBcIktleUVcIixcbiAgICAgICAgICAgIFwic2V0UG9zXCI6IFwiS2V5UlwiLFxuICAgICAgICAgICAgXCJnb2RUb2dnbGVcIjogXCJLZXlHXCIsXG4gICAgICAgICAgICBcImhhcmRtb2RlXCI6IFwiS2V5VFwiLFxuICAgICAgICAgICAgXCJlYXN5bW9kZVwiOiBcIktleVlcIixcbiAgICAgICAgICAgIFwibGF5b3V0QVwiOiBcIk51bXBhZDlcIixcbiAgICAgICAgICAgIFwibGF5b3V0QlwiOiBcIktleVBcIixcbiAgICAgICAgICAgIFwidGVzdFBvc1wiOiBcIktleVZcIixcbiAgICAgICAgICAgIFwidG9nZ2xlQm94ZXNcIjogXCJLZXlDXCIsXG4gICAgICAgICAgICBcInBhdXNlXCI6IFwiRW50ZXJcIixcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRyb2xMYXlvdXRCID0ge1xuICAgICAgICAgICAgXCJqdW1wXCI6IFwiU3BhY2VcIixcbiAgICAgICAgICAgIFwicmlnaHRcIjogXCJLZXlEXCIsXG4gICAgICAgICAgICBcImxlZnRcIjogXCJLZXlBXCIsXG4gICAgICAgICAgICBcInNob290XCI6IFwiS2V5SlwiLFxuICAgICAgICAgICAgXCJzbGFzaFwiOiBcIktleUtcIixcbiAgICAgICAgICAgIFwiY2xlYXZlXCI6IFwiS2V5TFwiLFxuICAgICAgICAgICAgXCJlbmVyZ2l6ZVwiOiBcIktleVdcIixcbiAgICAgICAgICAgIFwiZGFzaFwiOiBcIktleU1cIixcbiAgICAgICAgICAgIFwiZ2V0UG9zXCI6IFwiS2V5RVwiLFxuICAgICAgICAgICAgXCJzZXRQb3NcIjogXCJLZXlSXCIsXG4gICAgICAgICAgICBcImdvZFRvZ2dsZVwiOiBcIktleUdcIixcbiAgICAgICAgICAgIFwiaGFyZG1vZGVcIjogXCJLZXlUXCIsXG4gICAgICAgICAgICBcImVhc3ltb2RlXCI6IFwiS2V5WVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRBXCI6IFwiTnVtcGFkOVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRCXCI6IFwiS2V5UFwiLFxuICAgICAgICAgICAgXCJ0ZXN0UG9zXCI6IFwiS2V5VlwiLFxuICAgICAgICAgICAgXCJ0b2dnbGVCb3hlc1wiOiBcIktleUNcIixcbiAgICAgICAgICAgIFwicGF1c2VcIjogXCJFbnRlclwiLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xMYXlvdXRBO1xuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgIH1cblxuICAgIC8qXG4gICAgSW5pdGlhbGl6ZXMgdGhlIGdhbWUgZW5naW5lXG4gICAgKi9cbiAgICBpbml0IChjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuc3VyZmFjZVdpZHRoID0gdGhpcy5jdHguY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLnN1cmZhY2VIZWlnaHQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnN0YXJ0SW5wdXQoKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBpbml0aWFsaXplZCcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgU3RhcnRzIHRoZSBnYW1lIGVuZ2luZVxuICAgICovXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIGdhbWVcIik7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5tdXNpYyA9IG5ldyBBdWRpbyhcIi4vYXVkaW8vdHJhY2tfMS53YXZcIik7XG4gICAgICAgIHRoaXMubXVzaWMudm9sdW1lID0gMTtcbiAgICAgICAgdGhpcy5tdXNpYy5wbGF5KCk7XG4gICAgICAgIChmdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICAgICAgICAgIHRoYXQubG9vcCgpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lTG9vcCwgdGhhdC5jdHguY2FudmFzKTtcbiAgICAgICAgfSkoKTtcbiAgICB9XG5cbiAgICBwbGF5U291bmQoc291bmRfbmFtZSwgdm9sdW1lPTEpIHtcbiAgICAgICAgdGhpcy5zb3VuZC5wbGF5KHNvdW5kX25hbWUsIHZvbHVtZSlcbiAgICB9XG5cbiAgICAvL1RpbWVyIGNsYXNzXG4gICAgVGltZXIoKSB7Ly9BZGRlZCB0aGlzIGZvciB3aGVuIHdlIGltcGxlbWVudCBhIHBhdXNlIGZ1bmN0aW9uLlxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5tYXhTdGVwID0gMC4wNTtcbiAgICAgICAgdGhpcy53YWxsTGFzdFRpbWVzdGFtcCA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICAgICAgICB2YXIgd2FsbEN1cnJlbnQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdmFyIHdhbGxEZWx0YSA9ICh3YWxsQ3VycmVudCAtIHRoaXMud2FsbExhc3RUaW1lc3RhbXApIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMud2FsbExhc3RUaW1lc3RhbXAgPSB3YWxsQ3VycmVudDtcblxuICAgICAgICAgICAgdmFyIGdhbWVEZWx0YSA9IE1hdGgubWluKHdhbGxEZWx0YSwgdGhpcy5tYXhTdGVwKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVRpbWUgKz0gZ2FtZURlbHRhO1xuICAgICAgICAgICAgcmV0dXJuIGdhbWVEZWx0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgSW5wdXQgaGFuZGxpbmcsIGluaXRpYWxpemVzIGxpc3RlbmVyc1xuICAgICovXG4gICAgc3RhcnRJbnB1dCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBpbnB1dCcpO1xuXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy50YWJJbmRleCA9IDA7O1xuXG4gICAgICAgIGxldCBnZXRYYW5kWSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCAtIHRoYXQuY3R4LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICAgICAgbGV0IHkgPSBlLmNsaWVudFkgLSB0aGF0LmN0eC5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICBpZiAoeCA8IDEwMjQpIHtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcih4IC8gMzIpO1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKHkgLyAzMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgICAgICAvLyBjb250cm9sIGV2ZW50IGxpc3RlbmVycyBnbyBoZXJlXG4gICAgICAgIGxldCBtYXAgPSB7fTtcblxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKSA9PT0gJyAnKSB0aGF0LnNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghdGhhdC5jb250cm9sS2V5cy5oYXNPd25Qcm9wZXJ0eShlLmNvZGUpKSB7IHRoYXQuY29udHJvbEtleXNbZS5jb2RlXSA9IHtcImFjdGl2ZVwiOiB0cnVlfTsgfVxuICAgICAgICAgICAgaWYgKHRoYXQuY29udHJvbEtleXNbZS5jb2RlXS5hY3RpdmUgPT0gZmFsc2UpIHsgdGhhdC5jb250cm9sS2V5c1tlLmNvZGVdLmFjdGl2ZSA9IHRydWU7IH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2UuY29kZX0gaXMgJHt0aGF0LmNvbnRyb2xzW2UuY29kZV0uYWN0aXZlfWApO1xuXG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIFx0aWYgKCF0aGF0LmNvbnRyb2xLZXlzLmhhc093blByb3BlcnR5KGUuY29kZSkpIHsgdGhhdC5jb250cm9sS2V5c1tlLmNvZGVdID0ge1wiYWN0aXZlXCI6IGZhbHNlfTsgfVxuICAgICAgICAgICAgaWYgKHRoYXQuY29udHJvbEtleXNbZS5jb2RlXS5hY3RpdmUgPT0gdHJ1ZSkgeyB0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0uYWN0aXZlID0gZmFsc2UgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7ZS5jb2RlfSBpcyAke3RoYXQuY29udHJvbHNbZS5jb2RlXS5hY3RpdmV9YCk7XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnB1dCBzdGFydGVkJyk7XG4gICAgfVxuXG4gICAgLypcbiAgICBBZGRzIGFuIGVudGl0eSB0byB0aGUgZ2FtZVxuICAgICovXG4gICAgYWRkRW50aXR5IChlbnRpdHkpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYWRkZWQgZW50aXR5Jyk7XG4gICAgICAgIGlmICh0aGlzLmdhbWVib2FyZC5zdGF0ZXMubG9hZGluZ0xldmVsIHx8IHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbikge1xuICAgICAgICAgICAgZW50aXR5LmxldmVsID0gdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW07XG4gICAgICAgICAgICBlbnRpdHkuc2VjdGlvbiA9IHRoaXMuZ2FtZWJvYXJkLmxldmVsLnNlY3Rpb25OdW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgfVxuXG4gICAgYWRkQmFja2dyb3VuZExheWVyIChsYXllcikge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnMucHVzaChsYXllcik7XG4gICAgfVxuXG5cbiAgICAvKlxuICAgIERyYXdzIGFsbCBlbnRpdGllcyBpbiB0aGUgbGlzdFxuICAgICovXG5cbiAgICBkcmF3IChkcmF3Q2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5jdHguY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhY2tncm91bmRMYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vRHJhdyB0aGUgY2FtZXJhIGFuZCBodWQgZmlyc3RcblxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzW2ldLmRyYXcodGhpcy5jdHgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLy8vRHJhdyBvbmx5IHRlcnJhaW4gdGhhdCBpcyB3aXRoaW4gdGhlIGNhbnZhcyB2aWV3IChudW1iZXJzIGFyZSBuZWdhdGl2ZSBiZWNhdXNlIHRoZSBjYW1lcmEgaXMgd2VpcmQgbGlrZSB0aGF0LlxuICAgICAgICAgICAgLy8vL3Bvc3RpdmUgbnVtYmVycyB3b3VsZCBzY3JldyB0aGUgdHJhbnNsYXRlIHByb2Nlc3MpXG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS50eXBlID09PSBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgICAgIGlmKCgtdGhpcy5lbnRpdGllc1tpXS54IC0gdGhpcy5lbnRpdGllc1tpXS5ib3VuZFdpZHRoIDwgdGhpcy5lbnRpdGllc1swXS54VmlldyBcbiAgICAgICAgICAgICAgICAmJiAtdGhpcy5lbnRpdGllc1tpXS54ID4gdGhpcy5lbnRpdGllc1swXS54VmlldyAtIHRoaXMuY3R4LmNhbnZhcy53aWR0aCBcbiAgICAgICAgICAgICAgICAmJiAtdGhpcy5lbnRpdGllc1tpXS55IC0gdGhpcy5lbnRpdGllc1tpXS5ib3VuZEhlaWdodDwgdGhpcy5lbnRpdGllc1swXS55VmlldyBcbiAgICAgICAgICAgICAgICAmJiAtdGhpcy5lbnRpdGllc1tpXS55ID4gdGhpcy5lbnRpdGllc1swXS55VmlldyAtIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5wYXVzZWQgfHwgdGhpcy5lbnRpdGllc1tpXS5uYW1lID09PSBcIkNhbWVyYVwiKSBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMjVweCBWZXJkYW5hXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI2U1ZTVlNVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlVuaXZlcnNhbCBDb250cm9sc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDQwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUnVuIGxlZnQ6IFNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJ1biByaWdodDogRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAxMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkVuZXJnaXplOiBXXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDE2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiSnVtcDogU3BhY2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMjAwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJOb3JtYWwgRGlmZmljdWx0eSAoZGVmYXVsdCk6IFlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAyNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlRvdWdoIERpZmZpY3VsdHkgKG5vdCBkZWZhdWx0KTogVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDI4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR29kIE1vZGUgVG9nZ2xlIChmb3IgY2hlYXRlcnMpOiBHXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMzIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJBYmlsaXRpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlBvd2VyIFNob3Q6IEVuZXJnaXplICsgU2hvb3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlN3b3JkIEJsYXN0OiBFbmVyZ2l6ZSArIFNsYXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDEyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUmVmbGVjdDogRW5lcmdpemUgKyBDbGVhdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMTYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJMYXlvdXQgQSAoTnVtcGFkIDkpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMjAwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU2hvb3Q6IE51bXBhZCA0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QSArIDI0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiRGFzaDogTnVtcGFkIDFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMjgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJTbGFzaDogTnVtcGFkIDVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMzIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDbGVhdmU6IE51bXBhZCA2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QSArIDM2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiTGF5b3V0IEIgKFApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDIwMFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlNob290OiBKXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDI0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiRGFzaDogTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEIgKyAyODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlNsYXNoOiBLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDMyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ2xlYXZlOiBMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDM2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ3VycmVudCBEaWZmaWN1bHR5IGlzIFwiICsgdGhpcy5kaWZmaWN1bHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyMHB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCIodGhpcyBjYW4gYmUgY2hhbmdlZCBhdCBhbnkgdGltZSwgaW5jbHVkaW5nIHdoaWxlIHBhdXNlZClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDExMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiSXRhbGljIDQwcHggVGltZXMgTmV3IFJvbWFuXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiVGhlIGZvcmNlcyBvZiBldmlsIGFyZSBzdGlsbCBmaW5pc2hpbmcgYXJyYW5nZW1lbnRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VGbGF2b3JZICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIm9uIHRoZSBleHBhbnNpb24gb2YgdGhlaXIgZHVuZ2VvbnMgYW5kIHRocm9uZSByb29tcy5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIHRoaXMucGF1c2VGbGF2b3JYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclkgKyAxMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlByZXBhcmUgZm9yIHRoZSBpbmV2aXRhYmxlIHNob3dkb3duIHdpdGggdGhpcyB2aWxsaWFub3VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VGbGF2b3JZICsgMTYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJzY3VtIGJ5IHRyeWluZyB0byBnZXQgYXMgaGlnaCBhIHNjb3JlIGFzIHBvc3NpYmxlLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWSArIDIwMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIGlmIChkcmF3Q2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRyYXdDYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBVcGRhdGVzIGFsbCBlbnRpdGllcywgY2FsbHMgdGhlaXIgdXBkYXRlIG1ldGhvZHNcbiAgICAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgbGV0IGVudGl0aWVzQ291bnQgPSB0aGlzLmVudGl0aWVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50aXRpZXNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5LmxldmVsID09PSB0aGlzLmdhbWVib2FyZC5sZXZlbE51bSAmJiBlbnRpdHkuc2VjdGlvbiA9PT0gdGhpcy5nYW1lYm9hcmQuc2VjdGlvbk51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInZhbHVlcyAtIGxldmVsOiBcIiArIHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtICsgXCIsIHNlY3Rpb246IFwiICsgdGhpcy5nYW1lYm9hcmQuc2VjdGlvbk51bSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW50aXR5IC0gbGV2ZWw6IFwiICsgZW50aXR5LmxldmVsICsgXCIsIHNlY3Rpb246IFwiICsgZW50aXR5LnNlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucG9pbnRWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLm5ld0xldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkubGV2ZWwgPT09IHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtIHx8IGVudGl0eS5uYW1lID09PSBcIlRlcnJhaW5cIiB8fCBlbnRpdHkubmFtZSA9PT0gXCJIZXJvXCIgfHwgZW50aXR5Lm5hbWUgPT09IFwiSFVEXCIgfHwgZW50aXR5Lm5hbWUgPT09IFwiUG9ydGFsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ2YWx1ZXMgLSBsZXZlbDogXCIgKyB0aGlzLmdhbWVib2FyZC5sZXZlbE51bSArIFwiLCBzZWN0aW9uOiBcIiArIHRoaXMuZ2FtZWJvYXJkLnNlY3Rpb25OdW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImVudGl0eSAtIGxldmVsOiBcIiArIGVudGl0eS5sZXZlbCArIFwiLCBzZWN0aW9uOiBcIiArIGVudGl0eS5zZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnBvaW50VmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZW50aXR5LnJlbW92ZUZyb21Xb3JsZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHkudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5uZXdMZXZlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5uZXdMZXZlbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5sb2FkTmV4dExldmVsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UT0RPIE1vdmUgaW50byBmaXJzdCB1cGRhdGUoKSBmb3IgbG9vcD9cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmVudGl0aWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0ucmVtb3ZlRnJvbVdvcmxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLmhhc093blByb3BlcnR5KFwicG9pbnRWYWx1ZVwiKSAmJiAhdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS5wb2ludFZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyBSZWZhY3RvciBoZXJvIG11bHRpcGxpZXIgYW5kIGRpZmZpY3VsdHkgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuZ2FtZWJvYXJkLnB2dCA9IHRoaXMuZ2FtZWJvYXJkLnB2dHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRlZHBvaW50cyA9IHRoaXMuaGVyby5kaWZmaWN1bHR5ICogdGhpcy5lbnRpdGllc1tpXS5wb2ludFZhbHVlICogdGhpcy5oZXJvLm11bHRpcGxpZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuZGVhZEVuZW1pZXMucHVzaChbW3RoaXMuZW50aXRpZXNbaV0ueCwgdGhpcy5lbnRpdGllc1tpXS55XSwgdGhpcy5hZGRlZHBvaW50cywgMzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zY29yZSArPSB0aGlzLmFkZGVkcG9pbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyby5tdWx0aXBsaWVyICs9IHRoaXMuaGVyby5kaWZmaWN1bHR5ICogLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG90aGVyID0gdGhpcy5lbnRpdGllc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBwcmV2ZW50cyBlYWNoIHBpZWNlIG9mIHRlcnJhaW4gZnJvbSBjaGVja2luZyBjb2xsaXNpb24sIGNhdXNpbmcgc2xvd2Rvd25cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eS50eXBlID09PSBcIlRlcnJhaW5cIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyLnR5cGUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IE1hdGguYWJzKGVudGl0eS54IC0gb3RoZXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkgIT0gb3RoZXIgJiYgZW50aXR5LmlzQ29sbGlkaW5nKG90aGVyKSAhPSAnbm9uZScpIHsgLy8vIEQucHJvdG90eXBlID0gbmV3IEMoKSwgbGlua3MgQyB0byBwcm90b3R5cGUgbGlua2FnZSBvZiBEIE9SIHB1dCBwcm9wZXJ0eSBcInNvbWV0aGluZ190eXBlXCIgb3Igd2hhdGV2ZXIgYW5kIGNoZWNrIGZvciB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBlbnRpdHkuaXNDb2xsaWRpbmcob3RoZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkuY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZW50aXR5ICE9IG90aGVyICYmIGVudGl0eS5pc0NvbGxpZGluZyhvdGhlcikgIT0gJ25vbmUnKSB7IC8vLyBELnByb3RvdHlwZSA9IG5ldyBDKCksIGxpbmtzIEMgdG8gcHJvdG90eXBlIGxpbmthZ2Ugb2YgRCBPUiBwdXQgcHJvcGVydHkgXCJzb21ldGhpbmdfdHlwZVwiIG9yIHdoYXRldmVyIGFuZCBjaGVjayBmb3IgdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGVudGl0eS5pc0NvbGxpZGluZyhvdGhlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkuY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbXVzaWNcbiAgICAgICAgaWYgKHRoaXMubXVzaWMuY3VycmVudFRpbWUgPj0gNjMuOTUpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWMuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tdXNpYy5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1BMQVlFUiBTRVRUSU5HU1xuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmVhc3ltb2RlXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIC8vVE9ETyBNb3ZlIGRpZmZpY3VsdHkgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSBcIk5vcm1hbCAoQnV0IEtpbmRhIEVhc3kpXCI7XG4gICAgICAgICAgICB0aGlzLmhlcm8uZGlmZmljdWx0eSA9IDE7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zY29yZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5oYXJkbW9kZV0uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSBcIlRvdWdoXCI7XG4gICAgICAgICAgICB0aGlzLmhlcm8uZGlmZmljdWx0eSA9IDM7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zY29yZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5sYXlvdXRBXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xMYXlvdXRBO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMubGF5b3V0Ql0uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5jb250cm9sTGF5b3V0QjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnBhdXNlXS5hY3RpdmUgJiYgdGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9ICF0aGlzLnBhdXNlZDtcbiAgICAgICAgICAgIHRoaXMucGF1c2VUb2dnbGVDb29sZG93biA9IHRoaXMudG9nZ2xlQ29vbGRvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF1c2VUb2dnbGVDb29sZG93biA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VUb2dnbGVDb29sZG93bi0tO1xuICAgICAgICB9XG4gICAgICAgIC8vREVWIFRPT0xTXG4gICAgICAgIGlmICh0aGlzLmRldk1vZGUgJiYgIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmdldFBvc10uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ4OiBcIiArIHRoaXMuaGVyby54ICsgXCIsIHk6IFwiICsgdGhpcy5oZXJvLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5zZXRQb3NdLmFjdGl2ZSAmJiB0aGlzLnNldFBvc1RpbWVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc2V0UG9zKHRoaXMuZ2FtZWJvYXJkLmxldmVsLmNoZWNrcG9pbnRzW3RoaXMuY2hlY2twb2ludEN5Y2xlQ291bnRdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvc1RpbWVyID0gdGhpcy50b2dnbGVDb29sZG93bjtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrcG9pbnRDeWNsZUNvdW50ID0gKHRoaXMuY2hlY2twb2ludEN5Y2xlQ291bnQgKyAxKSAlIHRoaXMuZ2FtZWJvYXJkLmxldmVsLmNoZWNrcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuZ29kVG9nZ2xlXS5hY3RpdmUgJiYgdGhpcy5nb2RUb2dnbGVUaW1lciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnN0YXRlcy5pc0dvZCA9ICF0aGlzLmhlcm8uc3RhdGVzLmlzR29kO1xuICAgICAgICAgICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXIgPSB0aGlzLnRvZ2dsZUNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy50ZXN0UG9zXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc2V0UG9zKHRoaXMuZ2FtZWJvYXJkLnRlc3RQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy50b2dnbGVCb3hlc10uYWN0aXZlICYmIHRoaXMuYm94VG9nZ2xlVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0JveGVzID0gIXRoaXMuZHJhd0JveGVzO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94VG9nZ2xlVGltZXIgPSB0aGlzLnRvZ2dsZUNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9Ub2dnbGUgdGltZXJzIChzaG91bGQgZmluYWxseSBsZWFybiBob3cgdG8gdXNlIGFuIFwib24ga2V5dXBcIiBmb3Iga2V5cylcbiAgICAgICAgICAgIGlmICh0aGlzLmJveFRvZ2dsZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm94VG9nZ2xlVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNldFBvc1RpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdvZFRvZ2dsZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdCYWNrZ3JvdW5kKGRyYXdDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmFja2dyb3VuZExheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy9EcmF3IHRoZSBjYW1lcmEgYW5kIGh1ZCBmaXJzdFxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzW2ldLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkcmF3Q2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRyYXdDYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBEZWZpbmVzIHRoZSBnYW1lIGxvb3BcbiAgICAqL1xuICAgIGxvb3AgKCkge1xuICAgICAgICB0aGlzLmN0eC53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLmN0eC5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIHRoaXMuY2xpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLndoZWVsID0gbnVsbDtcbiAgICB9XG5cbn0gLy8gZW5kIG9mIEdhbWVFbmdpbmVcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUVuZ2luZTtcbiIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5cblxuY2xhc3MgSHVkIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHRoaXMuaGVhbHRoYmFyID0gbmV3IEhlYWx0aEJhcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpO1xuICAgICAgICB0aGlzLmVuZXJneWJhciA9IG5ldyBFbmVyZ3lCYXIoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKTtcbiAgICAgICAgdGhpcy5zY29yZWJvYXJkID0gbmV3IFNjb3JlQm9hcmQoZ2FtZV9lbmdpbmUsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlLCBjYW1lcmEpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbdGhpcy5oZWFsdGhiYXIsIHRoaXMuZW5lcmd5YmFyLCB0aGlzLnNjb3JlYm9hcmRdO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcDEgPSAwO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcDIgPSAxO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcDMgPSAyO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHNbaV0uZHJhdyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzQ29sbGlkaW5nKCkge31cbiAgICBjb2xsaWRlZCgpIHt9XG5cbn1cblxuXG5jbGFzcyBTY29yZUJvYXJkIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5zY29yZSA9IGdhbWVfZW5naW5lLmdhbWVib2FyZC5zY29yZTtcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZSA9IGdhbWVfZW5naW5lO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gZGVzdF9jb29yZGluYXRlcztcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBNYXRoLmZsb29yKHRoaXMuZ2FtZV9lbmdpbmUuZ2FtZWJvYXJkLnNjb3JlKTtcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IFstdGhpcy5jYW1lcmEueFZpZXcgKyAyMDAsIC10aGlzLmNhbWVyYS55VmlldyArIDEwMF1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguZm9udCA9IFwiaXRhbGljIGJvbGQgMjVweCBWZXJkYW5hXCIgO1xuICAgICAgICB2YXIgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQodGhpcy5kZXN0X2Nvb3Jkc1swXSAtIDEwMCwgdGhpcy5kZXN0X2Nvb3Jkc1sxXSAtIDEwLCB0aGlzLmRlc3RfY29vcmRzWzBdLCB0aGlzLmRlc3RfY29vcmRzWzFdIC0gMTApO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCxcIm1hZ2VudGFcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCguNSAsXCJibHVlXCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSAsXCJncmVlblwiKTtcbiAgICAgICAgLy8gRmlsbCB3aXRoIGdyYWRpZW50XG4gICAgICAgIGN0eC5maWxsU3R5bGU9Z3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUsXG4gICAgICAgICAgICB0aGlzLmRlc3RfY29vcmRzWzBdIC0gMTAwLCBcbiAgICAgICAgICAgIHRoaXMuZGVzdF9jb29yZHNbMV0gLSAxMFxuICAgICAgICApO1xuICAgICAgICAvL2lmICh0aGlzLmdhbWVfZW5naW5lLmdhbWVib2FyZC5zdGF0ZXMuc2hvd1BvaW50VmFsdWVzKSB7XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiZHJhd1wiKVxuICAgICAgICAvLyAgICBjdHguZm9udCA9IFwiMjBweCBWZXJkYW5hXCI7XG4gICAgICAgIC8vICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgLy8gICAgY3R4LmZpbGxUZXh0KFwiK1wiICsgdGhpcy5nYW1lX2VuZ2luZS5hZGRlZHBvaW50cyArIFwiIHBvaW50c1wiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5oZXJvLnggKyAxMCxcbiAgICAgICAgLy8gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUuaGVyby55IC0gMTUwXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vfVxuICAgIH1cbn1cblxuXG4vKlxuICAgIFJlc291cmNlQmFyIHN1cGVyY2xhc3NcbiovXG5jbGFzcyBSZXNvdXJjZUJhciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUgPSBnYW1lX2VuZ2luZTtcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5pbWcgPSBpbWc7XG4gICAgICAgIHRoaXMuc3JjX2Nvb3JkcyA9IHNyY19jb29yZGluYXRlcztcbiAgICAgICAgdGhpcy5zcmNfZGltcyA9IHNyY19kaW1lbnNpb25zO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gZGVzdF9jb29yZGluYXRlcztcbiAgICAgICAgLy8gdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgbGV0IGxhc3R5ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGFydCA9IHRoaXMucGFydHNbaV1cbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSA9IGxhc3R5ICsgcGFydFtcInNyY19oZWlnaHRcIl07IC8vIHRoaXMgY2F1c2VzIGVhY2ggc2VnbWVudCB0byBiZSBkcmF3biB2ZXJ0aWNhbGx5IG9uIHRvcCBvZiB0aGUgbGFzdFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzb3VyY2VCYXJTZWdtZW50KGltZywgc3JjX2Nvb3Jkcywgc3JjX2RpbXMsIGRlc3RfeF9vZmZzZXQ9MCwgZGVzdF95X29mZnNldD0wKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFwiaW1nXCI6IGltZyxcbiAgICAgICAgICAgICAgICBcInNyY194XCI6IHNyY19jb29yZHNbMF0sXG4gICAgICAgICAgICAgICAgXCJzcmNfeVwiOiBzcmNfY29vcmRzWzFdLFxuICAgICAgICAgICAgICAgIFwic3JjX3dpZHRoXCI6IHNyY19kaW1zWzBdLFxuICAgICAgICAgICAgICAgIFwic3JjX2hlaWdodFwiOiBzcmNfZGltc1sxXSxcbiAgICAgICAgICAgICAgICBcImRlc3RfeF9vZmZzZXRcIjogZGVzdF94X29mZnNldCxcbiAgICAgICAgICAgICAgICBcImRlc3RfeV9vZmZzZXRcIjogZGVzdF95X29mZnNldCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgIC8vIHRoaXMuZGVzdF94ID0gZGVzdF9jb29yZHNbMF1cbiAgICAgICAgICAgLy8gdGhpcy5kZXN0X3kgPSBkZXN0X2Nvb3Jkc1sxXVxuICAgICAgICAgICAvLyB0aGlzLmRlc3Rfd2lkdGggPSBkZXN0X2RpbWVuc2lvbnNbMF1cbiAgICAgICAgICAgLy8gdGhpcy5kZXN0X2hlaWdodCA9IGRlc3RfZGltZW5zaW9uc1sxXVxuICAgIH1cbn1cblxuXG4vKlxuICAgIFByb3ZpZGVzIGEgaGVhbHRoIGJhciBmb3IgdGhlIEhlcm8uXG4gICAgQ29uc3RydWN0ZWQgb2YgcmVzb3VyY2VCYXJTZWdtZW50cywgZGVmaW5lZCBpbiBSZXNvdXJjZUJhci5cbiAgICBIZWFsdGggZ3Jvd3MgdXB3YXJkLlxuKi9cbmNsYXNzIEhlYWx0aEJhciBleHRlbmRzIFJlc291cmNlQmFyIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICBzdXBlcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zKTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZXJvLmhlYWx0aDsgLy8gaGFzIHJvb20gZm9yIDYgdGlja3NcbiAgICAgICAgdGhpcy53aWR0aCA9IDE0OyAvLyB0aGUgcGl4ZWwgYXJ0IHdpZHRoXG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuXG4gICAgICAgIC8vIGJhciBzZWdtZW50c1xuICAgICAgICB0aGlzLnRvcCA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZywgXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfZGltZW5zaW9uc1sxXSArIDBdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDNdKTtcbiAgICAgICAgdGhpcy5taWRkbGUxID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlMiA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlMyA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlNCA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlNSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMuYm90dG9tID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDE5XSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxOF0pO1xuICAgICAgICB0aGlzLnRpY2sgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsIFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSArIDMsIHNyY19jb29yZGluYXRlc1sxXSArIDE2XSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLTcsIDNdLFxuICAgICAgICAgICAgOSwgMTEpO1xuICAgICAgICB0aGlzLnBhcnRzID0gW3RoaXMudG9wLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZGRsZTEsIHRoaXMubWlkZGxlMiwgdGhpcy5taWRkbGUzLCB0aGlzLm1pZGRsZTQsIHRoaXMubWlkZGxlNSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3R0b21dXG5cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgbGFzdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXJ0ID0gdGhpcy5wYXJ0c1tpXVxuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5ID0gbGFzdHkgKyBwYXJ0W1wic3JjX2hlaWdodFwiXTsgLy8gdGhpcyBjYXVzZXMgZWFjaCBzZWdtZW50IHRvIGJlIGRyYXduIHZlcnRpY2FsbHkgb24gdG9wIG9mIHRoZSBsYXN0XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0eSAtPSB0aGlzLmJvdHRvbVtcInNyY19oZWlnaHRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmhlYWx0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHRoaXMudGljaywgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgLT0gMiAvLyB0aGlzIGNhdXNlcyBoZWFsdGggdG8gZ3JvdyB1cHdhcmQgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsXG4gICAgICAgICAgICBwYXJ0W1wic3JjX3hcIl0sIHBhcnRbXCJzcmNfeVwiXSwgLy8gc3JjIHgsIHlcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfd2lkdGhcIl0sIHBhcnRbXCJzcmNfaGVpZ2h0XCJdLCAvLyBzcmMgd2lkdGgsIGhlaWdodFxuICAgICAgICAgICAgdGhpcy5kZXN0X2Nvb3Jkc1swXSArIHBhcnRbXCJkZXN0X3hfb2Zmc2V0XCJdLCB0aGlzLmRlc3RfY29vcmRzWzFdICsgKGxhc3R5ICogdGhpcy5zY2FsZSkgLSBwYXJ0W1wiZGVzdF95X29mZnNldFwiXSwgLy8gZGVzdCB4LCB5XG4gICAgICAgICAgICBwYXJ0W1wic3JjX3dpZHRoXCJdICogdGhpcy5zY2FsZSwgcGFydFtcInNyY19oZWlnaHRcIl0gKiB0aGlzLnNjYWxlLCAvLyBkZXN0IHdpZHRoLCBoZWlnaHRcbiAgICAgICAgKSBcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy5oZXJvLmhlYWx0aDtcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IFstdGhpcy5jYW1lcmEueFZpZXcgKyAxMDAsIC10aGlzLmNhbWVyYS55VmlldyArIDEwMF1cbiAgICB9XG4gICAgaXNDb2xsaWRpbmcoKSB7fVxuICAgIGNvbGxpZGVkKCkge31cblxufVxuXG5cbi8qXG4gICAgUHJvdmlkZXMgYW4gZW5lcmd5IGJhciBmb3IgdGhlIEhlcm8uXG4gICAgQ29uc3RydWN0ZWQgb2YgcmVzb3VyY2VCYXJTZWdtZW50cywgZGVmaW5lZCBpbiBSZXNvdXJjZUJhci5cbiAgICBFbmVyZ3kgZ3Jvd3MgdXB3YXJkLlxuKi9cbmNsYXNzIEVuZXJneUJhciBleHRlbmRzIFJlc291cmNlQmFyIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICBzdXBlcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zKTtcbiAgICAgICAgdGhpcy5lbmVyZ3kgPSBoZXJvLmVuZXJneTsgLy8gaGFzIHJvb20gZm9yIDYgdGlja3NcbiAgICAgICAgdGhpcy53aWR0aCA9IDE0OyAvLyB0aGUgcGl4ZWwgYXJ0IHdpZHRoXG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICBzcmNfY29vcmRpbmF0ZXMgPSBbc3JjX2Nvb3JkaW5hdGVzWzBdICsgMTUsIHNyY19jb29yZGluYXRlc1sxXV1cblxuICAgICAgICAvLyBiYXIgc2VnbWVudHNcbiAgICAgICAgdGhpcy50b3AgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfZGltZW5zaW9uc1sxXSArIDBdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDNdKTtcbiAgICAgICAgdGhpcy5taWRkbGUxID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUyID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUzID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU0ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU1ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcblxuICAgICAgICB0aGlzLmJvdHRvbSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDE5XSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxOF0pO1xuICAgICAgICB0aGlzLnRpY2sgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdICsgMywgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTZdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGggLSA3LCAzXSxcbiAgICAgICAgICAgIDksIDExKTtcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFt0aGlzLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taWRkbGUxLCB0aGlzLm1pZGRsZTIsIHRoaXMubWlkZGxlMywgdGhpcy5taWRkbGU0LCB0aGlzLm1pZGRsZTUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tXVxuXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgbGV0IGxhc3R5ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGFydCA9IHRoaXMucGFydHNbaV1cbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSA9IGxhc3R5ICsgcGFydFtcInNyY19oZWlnaHRcIl07IC8vIHRoaXMgY2F1c2VzIGVhY2ggc2VnbWVudCB0byBiZSBkcmF3biB2ZXJ0aWNhbGx5IG9uIHRvcCBvZiB0aGUgbGFzdFxuICAgICAgICB9XG5cbiAgICAgICAgbGFzdHkgLT0gdGhpcy5ib3R0b21bXCJzcmNfaGVpZ2h0XCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5lbmVyZ3k7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCB0aGlzLnRpY2ssIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5IC09IDIgLy8gdGhpcyBjYXVzZXMgZW5lcmd5IHRvIGdyb3cgdXB3YXJkIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxuICAgICAgICAgICAgcGFydFtcInNyY194XCJdLCBwYXJ0W1wic3JjX3lcIl0sIC8vIHNyYyB4LCB5XG4gICAgICAgICAgICBwYXJ0W1wic3JjX3dpZHRoXCJdLCBwYXJ0W1wic3JjX2hlaWdodFwiXSwgLy8gc3JjIHdpZHRoLCBoZWlnaHRcbiAgICAgICAgICAgIHRoaXMuZGVzdF9jb29yZHNbMF0gKyBwYXJ0W1wiZGVzdF94X29mZnNldFwiXSwgdGhpcy5kZXN0X2Nvb3Jkc1sxXSArIChsYXN0eSAqIHRoaXMuc2NhbGUpIC0gcGFydFtcImRlc3RfeV9vZmZzZXRcIl0sIC8vIGRlc3QgeCwgeVxuICAgICAgICAgICAgcGFydFtcInNyY193aWR0aFwiXSAqIHRoaXMuc2NhbGUsIHBhcnRbXCJzcmNfaGVpZ2h0XCJdICogdGhpcy5zY2FsZSwgLy8gZGVzdCB3aWR0aCwgaGVpZ2h0XG4gICAgICAgICkgXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmVuZXJneSA9IHRoaXMuaGVyby5lbmVyZ3k7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBbLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTUwLCAtdGhpcy5jYW1lcmEueVZpZXcgKyAxMDBdXG4gICAgfVxuICAgIGlzQ29sbGlkaW5nKCkge31cbiAgICBjb2xsaWRlZCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh1ZDsiLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlXCJcblxud2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoLyogZnVuY3Rpb24gKi8gY2FsbGJhY2ssIC8qIERPTUVsZW1lbnQgKi8gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfTtcbn0pKCk7XG5cbkNvcmUuaW5pdCgpXG4iLCJjbGFzcyBTb3VuZCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zb3VuZHMgPSB7XG4gICAgICAgICAgICBcImhlcm9faHVydFwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2Rzb29mLndhdlwiKSxcbiAgICAgICAgICAgIFwiaGVyb19zaG9vdFwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2hlcm8tc2hvb3Qud2F2XCIpLFxuICAgICAgICAgICAgXCJlbmVteV9zaG9vdFwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL3Nob290LTEud2F2XCIpLFxuICAgICAgICAgICAgXCJhcnJvd19maXJlXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vQXJyb3ctRmlyZS53YXZcIiksXG4gICAgICAgICAgICBcImNyb3dfY2F3XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vY3Jvdy1jYXcud2F2XCIpLFxuICAgICAgICAgICAgXCJlbmVteV9odXJ0XzFcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9lbmVteS1odXJ0LTEud2F2XCIpLFxuICAgICAgICAgICAgXCJlbmVyZ3lfbGF1bmNoZXJcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9lbmVyZ3ktbGF1bmNoZXIud2F2XCIpLFxuICAgICAgICAgICAgXCJleHBsb3Npb25fMVwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2V4cGxvc2lvbi0xLndhdlwiKSxcbiAgICAgICAgICAgIFwibGF2YV9iYWxsXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vbGF2YS1iYWxsLndhdlwiKSxcbiAgICAgICAgICAgIFwic2hpZWxkX2Jsb2NrXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vc2hpZWxkLWJsb2NrLndhdlwiKSxcbiAgICAgICAgICAgIFwic3dvcmRfc3dpbmdcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9zd29yZC1zd2luZy53YXZcIiksXG4gICAgICAgICAgICBcIm91dF9vZl9lbmVyZ3lcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9vb2Uud2F2XCIpLFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5fZHVwcyA9IDVcbiAgICAgICAgZm9yICh2YXIgc291bmQgaW4gdGhpcy5zb3VuZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNvdW5kcy5oYXNPd25Qcm9wZXJ0eShzb3VuZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3VycmVudFwiOiAwLFxuICAgICAgICAgICAgICAgICAgICBcIm1heFwiOiBuX2R1cHMsXG4gICAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6IHRoaXMubWFrZV9kdXBsaWNhdGVzKHNvdW5kLCBuX2R1cHMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKiBSZXR1cm5zIGEgbGlzdCBvZiBuX2R1cCBkdXBsaWNhdGVkIEF1ZGlvIG9iamVjdHMgKi9cbiAgICBtYWtlX2R1cGxpY2F0ZXMoc291bmQsIG5fZHVwPTUpIHtcbiAgICAgICAgbGV0IGN1cnJfc291bmQgPSB0aGlzLnNvdW5kc1tzb3VuZF1cbiAgICAgICAgbGV0IHNvdW5kX2xpc3QgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuX2R1cDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2xvbmUgPSBjdXJyX3NvdW5kLmNsb25lTm9kZSgpXG4gICAgICAgICAgICBzb3VuZF9saXN0LnB1c2goY2xvbmUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvdW5kX2xpc3RcbiAgICB9XG5cblxuICAgIC8qIHBsYXlzIGEgc291bmQgKi9cbiAgICBwbGF5KHNvdW5kLCB2b2x1bWU9MC41KSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuc291bmRzW3NvdW5kXVtcImN1cnJlbnRcIl1cbiAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuc291bmRzW3NvdW5kXVtcIm1heFwiXS0xKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJjdXJyZW50XCJdID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4XS5lbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4KzFdLmN1cnJlbnRUaW1lID0gMFxuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4KzFdLnZvbHVtZSA9IHZvbHVtZVxuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4KzFdLnBsYXkoKVxuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wiY3VycmVudFwiXSArPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXhdLmN1cnJlbnRUaW1lID0gMFxuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4XS52b2x1bWUgPSB2b2x1bWVcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleF0ucGxheSgpXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvdW5kOyJdLCJzb3VyY2VSb290IjoiIn0=