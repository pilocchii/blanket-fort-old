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
  var toload = ["img/ZXe.png", "img/Leo.png", "img/EnemySheet1.png", "img/pipes.png", "img/Enemies.png", "img/hud.png", "img/healthpack.png", "img/energypack.png", "img/bg/1_bg.png", "img/bg/2_farbuildings.png", "img/bg/3_buildings.png", "img/bg/4_foreground.png", "img/bg/bot_fill.png"];
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
/* harmony import */ var _maps_levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../maps/levels */ "./src/maps/levels.js");
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
        this.level = new _maps_levels__WEBPACK_IMPORTED_MODULE_1__["LevelOne"](this.game, this.assetManager, this.ctx);
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
        this.level = new _maps_levels__WEBPACK_IMPORTED_MODULE_1__["LevelTwo"](this.game, this.assetManager, this.ctx);
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
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./actor */ "./src/entities/actor.js");
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
}(_actor__WEBPACK_IMPORTED_MODULE_10__["default"]);

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
/*! exports provided: Terrain, Entity, Actor, Enemy, Bomb, Bullet, Camera, Crow, Dino, Flames, GameBoard, Hand, Lava, Fireball, Spikes, ProjectileHazard, ProjectileCircle, Launcher, Hero, Hurtbox, Item, EnergyPack, HealthPack, Leo, ProjectileSword, Projectile, Reflectbox, Rocket, Shotblast, SoldierShield, TerrainMobile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _terrain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terrain */ "./src/entities/terrain.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Terrain", function() { return _terrain__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actor */ "./src/entities/actor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Actor", function() { return _actor__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy */ "./src/entities/enemy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Enemy", function() { return _enemy__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _bomb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bomb */ "./src/entities/bomb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bomb", function() { return _bomb__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _bullet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bullet */ "./src/entities/bullet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bullet", function() { return _bullet__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./camera */ "./src/entities/camera.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _camera__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _crow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./crow */ "./src/entities/crow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Crow", function() { return _crow__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _dino__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dino */ "./src/entities/dino.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dino", function() { return _dino__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _flames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./flames */ "./src/entities/flames.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Flames", function() { return _flames__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./game-board */ "./src/entities/game-board.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameBoard", function() { return _game_board__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hand */ "./src/entities/hand.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hand", function() { return _hand__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _hazards__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./hazards */ "./src/entities/hazards.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lava", function() { return _hazards__WEBPACK_IMPORTED_MODULE_12__["Lava"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fireball", function() { return _hazards__WEBPACK_IMPORTED_MODULE_12__["Fireball"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spikes", function() { return _hazards__WEBPACK_IMPORTED_MODULE_12__["Spikes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileHazard", function() { return _hazards__WEBPACK_IMPORTED_MODULE_12__["ProjectileHazard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileCircle", function() { return _hazards__WEBPACK_IMPORTED_MODULE_12__["ProjectileCircle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Launcher", function() { return _hazards__WEBPACK_IMPORTED_MODULE_12__["Launcher"]; });

/* harmony import */ var _hero__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./hero */ "./src/entities/hero.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hero", function() { return _hero__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _hurtbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./hurtbox */ "./src/entities/hurtbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hurtbox", function() { return _hurtbox__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./item */ "./src/entities/item.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return _item__WEBPACK_IMPORTED_MODULE_15__["Item"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EnergyPack", function() { return _item__WEBPACK_IMPORTED_MODULE_15__["EnergyPack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HealthPack", function() { return _item__WEBPACK_IMPORTED_MODULE_15__["HealthPack"]; });

/* harmony import */ var _leo__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./leo */ "./src/entities/leo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Leo", function() { return _leo__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _projectile_sword__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./projectile-sword */ "./src/entities/projectile-sword.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileSword", function() { return _projectile_sword__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./projectile */ "./src/entities/projectile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Projectile", function() { return _projectile__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _reflectbox__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./reflectbox */ "./src/entities/reflectbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reflectbox", function() { return _reflectbox__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _rocket__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./rocket */ "./src/entities/rocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rocket", function() { return _rocket__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _shotblast__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./shotblast */ "./src/entities/shotblast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shotblast", function() { return _shotblast__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _soldier_shield__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./soldier-shield */ "./src/entities/soldier-shield.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SoldierShield", function() { return _soldier_shield__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _terrain_mobile__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./terrain-mobile */ "./src/entities/terrain-mobile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TerrainMobile", function() { return _terrain_mobile__WEBPACK_IMPORTED_MODULE_23__["default"]; });


























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

Object(_core__WEBPACK_IMPORTED_MODULE_0__["default"])();

/***/ }),

/***/ "./src/maps/levels.js":
/*!****************************!*\
  !*** ./src/maps/levels.js ***!
  \****************************/
/*! exports provided: LevelOne, LevelTwo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelOne", function() { return LevelOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelTwo", function() { return LevelTwo; });
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../asset-manager */ "./src/asset-manager.js");
/* harmony import */ var _game_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-engine */ "./src/game-engine.js");
/* harmony import */ var _hud__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hud */ "./src/hud.js");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../background */ "./src/background.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sound */ "./src/sound.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entities */ "./src/entities/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var LevelOne =
/*#__PURE__*/
function () {
  /* Define terrain */
  function LevelOne(gameEngine, assetManager, ctx) {
    _classCallCheck(this, LevelOne);

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
      ']': [6, 3]
    };
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
      ']': [32, 32, 0, 0] // 20 lines from top to bottom

    };
    this.map = "{____________________________}    {}   {_}                                                        \nl----------------------------j    []   l-j \n!                             {}  []\n!                             lj  []\n!   {________}                    []\n!   l--------j                    []\n!             {}    {}      {____}[]\n!             lj    lj      l----j[]\n<~~~~~~~~~>                      |[]\n      {}                     |[]               \n      []                     |[]\n      []{____}    {____}     |[]\n      []l----j    l----j     |[]\n      []                     |[]\n      lj                     |[]\n                          {__}[]\n                          l--j[]\n{}{______}{}{___}{}{_________}{}[]\nlj[------]lj[###]lj[#########]lj[]\n{}{}[]!~~|[]{}l---j{}l---------j{}[]\nlj[][]!  |[]lj~~~~~lj           lj[]\n".split('\n');
  }

  _createClass(LevelOne, [{
    key: "load",
    value: function load() {
      this.constructTerrain();
      this.populateMap();
    }
  }, {
    key: "constructTerrain",
    value: function constructTerrain() {
      console.log("constructing terrain...");
      console.log(this.map[0].length + " x " + this.map.length);

      for (var col = 0; col < this.map[0].length; col++) {
        for (var row = 0; row < this.map.length; row++) {
          var tile = this.tileMap[this.map[row][col]];

          if (tile != null) {
            var tileDimension = this.tileDimensions[this.map[row][col]];
            this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Terrain"](this.gameEngine, col * this.tileSize, row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile, tileDimension));
          }
        }
      }
    }
  }, {
    key: "populateMap",
    value: function populateMap(checkpoint) {
      if (checkpoint === -1) {
        this.section_1();
      } else {
        if (checkpoint === 0) {
          this.section_1();
        }
      }
    }
  }, {
    key: "section_1",
    value: function section_1() {
      this.sectionNum = 0;
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["HealthPack"](this.gameEngine, 2935, 1200, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["EnergyPack"](this.gameEngine, 2965, 1200, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["HealthPack"](this.gameEngine, 300, 400, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["EnergyPack"](this.gameEngine, 330, 400, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Hand"](this.gameEngine, 2300, 1450, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["SoldierShield"](this.gameEngine, 1800, 1450, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Crow"](this.gameEngine, 1350, 1300, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Crow"](this.gameEngine, 2950, 1700, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["SoldierShield"](this.gameEngine, 1300, 1100, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Crow"](this.gameEngine, 400, 300, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Dino"](this.gameEngine, 2130, 1061, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 90, 60, 400, 250));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Dino"](this.gameEngine, 1980, 582, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
    }
  }]);

  return LevelOne;
}();

var LevelTwo =
/*#__PURE__*/
function () {
  /* Define terrain */
  function LevelTwo(gameEngine, assetManager, ctx) {
    _classCallCheck(this, LevelTwo);

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
    this.portal = new Portal(this.gameEngine, -570, 1420, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, true); //I'd like to use an array of functions (will let us have an actual Level superclass)
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
      ']': [6, 3]
    };
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
      ']': [32, 32, 0, 0] // 20 lines from top to bottom

    };
    this.map = "                                                                                                                                                                #\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     |\n                                                                           |                                              \n                                                                           |                                   \n                                                                           |                       {}\n                                                                           |                       []                     \n                                                                           |                       []               \n                                                                           |                       []                  \n                                                                   <                               []              \n                                                                                                   []\n         <~~~~~>                                                  <~~                              []                                                                             \n                                                                                                   []                           \n                                                                   <                               []                          \n                                   {}{}{______}{}{___}{}{_________}{}{}                            []                          ]\n                   {}              []ljl------jljl---jljl---------jlj[]                            []                          ]\n{___}{}{}{______}{}{___}{}{_________}{}[]                                []                            lj                          ]\n[###]ljlj[######]ljl---j[]l---------jlj[]                                lj--------------------------------------------------------j\n[###]    [######]       []             []                                                              \n[###]    [######]       []             []                                \n[###]    [######]       []             []                                                      \n".split('\n');
    this.mapStart = "{_}\nl-j\n".split('\n');
  }

  _createClass(LevelTwo, [{
    key: "load",
    value: function load() {
      this.constructTerrain(); //mapStart (this saves work for now. Not good practice. Unless we formalize it?)

      for (var col = 0; col < this.mapStart[0].length; col++) {
        for (var row = 0; row < this.mapStart.length; row++) {
          var tile = this.tileMap[this.mapStart[row][col]];

          if (tile != null) {
            var tileDimension = this.tileDimensions[this.mapStart[row][col]];
            this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Terrain"](this.gameEngine, -650 + col * this.tileSize, 1440 + row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile, tileDimension));
          }
        }
      }

      this.populateMap();
    }
  }, {
    key: "constructTerrain",
    value: function constructTerrain() {
      console.log("constructing terrain...");
      console.log(this.map[0].length + " x " + this.map.length);

      for (var col = 0; col < this.map[0].length; col++) {
        for (var row = 0; row < this.map.length; row++) {
          var tile = this.tileMap[this.map[row][col]];

          if (tile != null) {
            var tileDimension = this.tileDimensions[this.map[row][col]];
            this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Terrain"](this.gameEngine, col * this.tileSize, row * this.tileSize, [32, 32], this.tilesheet, this.ctx, 3, tile, tileDimension));
          }
        }
      }
    }
  }, {
    key: "populateMap",
    value: function populateMap(checkpoint) {
      if (checkpoint === -1) {
        this.section_1();
        this.section_2();
        this.section_3();
        this.section_4();
      } else {
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

  }, {
    key: "section_1",
    value: function section_1() {
      this.sectionNum = 0;
      /***HAZARDS***/

      /***ENEMIES***/

      var hand1 = new _entities__WEBPACK_IMPORTED_MODULE_6__["Hand"](this.gameEngine, 2283, 1344, this.assetManager.getAsset("img/Enemies.png"), this.ctx);
      hand1.distance = 75;
      hand1.sightRadius[0] = 2300;
      this.gameEngine.addEntity(hand1);
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Crow"](this.gameEngine, 500, 1000, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40, [300, 1000]));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Dino"](this.gameEngine, 1460, 984, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 90, 60,
      /*patrol distance*/
      300,
      /*shot time offset*/
      0));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Crow"](this.gameEngine, 2300, 1000, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40,
      /*sightRadius*/
      [300, 1000],
      /*Murder Parameters*/
      true, [[-600, 200], [400, 400]]));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["SoldierShield"](this.gameEngine, 1000, 1440, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Hand"](this.gameEngine, 3200, 1440, this.assetManager.getAsset("img/Enemies.png"), this.ctx)); //this.gameEngine.addEntity(new Dino(this.gameEngine, 3000, 1440, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 90, 60, /*patrol distance*/0, /*shot time offset*/ 125));

      /***ITEMS***/

      /***TOP LAYER ENTITIES***/
    }
  }, {
    key: "section_2",
    value: function section_2() {
      this.sectionNum = 1;
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Hand"](this.gameEngine, 6825, 984, this.assetManager.getAsset("img/Enemies.png"), this.ctx));
      this.gameEngine.addEntity(new Launcher(this.gameEngine, 6875, 792 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 90, 350, 20));
      this.gameEngine.addEntity(new Launcher(this.gameEngine, 6875 - 95, 984 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 90, 350, 50));
      this.gameEngine.addEntity(new Launcher(this.gameEngine, 6875, 1176 + 2 * 70, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 8, 8, [-1, 0], 45, 350, 60));
    }
  }, {
    key: "section_3",
    value: function section_3() {
      this.sectionNum = 2;
      /***BOTTOM LAYER ENTITIES***/

      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["HealthPack"](this.gameEngine, 8665, 950, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4, 15));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["EnergyPack"](this.gameEngine, 8635, 1000, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4, 15));
      /***HAZARDS***/

      this.gameEngine.addEntity(new Fireball(this.gameEngine, 7300, 1450 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 4,
      /*cooldown*/
      50,
      /*speed*/
      20));
      this.gameEngine.addEntity(new Fireball(this.gameEngine, 7820, 1450 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 4,
      /*cooldown*/
      50,
      /*speed*/
      20,
      /*offset*/
      25));
      this.gameEngine.addEntity(new Spikes(this.gameEngine, 7512, 1152 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4, 0, 3));
      this.gameEngine.addEntity(new Spikes(this.gameEngine, 7980, 1056 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4, 20, 3));
      this.gameEngine.addEntity(new Spikes(this.gameEngine, 8665, 1150 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 3.5, 40, 0));
      this.gameEngine.addEntity(new Spikes(this.gameEngine, 7692, 700 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 4.5, 0, 3));
      this.gameEngine.addEntity(new Spikes(this.gameEngine, 8064, 250 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 7, 40, 20));
      this.gameEngine.addEntity(new Launcher(this.gameEngine, 7965, -300, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 7, 7, [0, 1], 120, 160));
      /***ENEMIES***/

      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Crow"](this.gameEngine, 8650, -300, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40, [25, 1000], true, [[-600, 250], [600, 250]]));
      /***ITEMS***/

      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["HealthPack"](this.gameEngine, 7050, 1248, this.assetManager.getAsset("img/healthpack.png"), this.ctx, 10, 8, 4, 15));
      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["EnergyPack"](this.gameEngine, 7080, 1248, this.assetManager.getAsset("img/energypack.png"), this.ctx, 10, 8, 4, 15));
      /***TOP LAYER ENTITIES***/

      this.gameEngine.addEntity(new Lava(this.gameEngine, 7500, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
      this.gameEngine.addEntity(new Lava(this.gameEngine, 8400, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
      this.gameEngine.addEntity(new Lava(this.gameEngine, 9300, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
    }
  }, {
    key: "section_4",
    value: function section_4() {
      this.sectionNum = 3;
      var spikesOrigin = [10570 - 28, 790 + 46];
      var spikeOffsets = [[0, 0], [1 * 450 - 200, 1 * -250], [2 * 450 - 125, 2 * -250], [3 * 450 - 125, 2 * -250], [4 * 450 - 200, 1 * -250], [5 * 450 - 375, 0 * -250], [3 * 450 - 75, -1 * -250], [2 * 450 - 225, -1 * -250], [3 * 450 - 350, 1 * -50]];
      var i = 0;
      var time = 80;
      /***HAZARDS***/

      var spikes1 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 40, 2, 0);
      var spikes2 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 60, 2, 0);
      var spikes3 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 80, 2, 0);
      var spikes4 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 80, 2, 0);
      var spikes5 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 60, 2, 0);
      var spikes6 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 40, 2, 0);
      var spikes7 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 20, 2, 0);
      var spikes8 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 20, 2, 0);
      var spikes9 = new Spikes(this.gameEngine, spikesOrigin[0] + spikeOffsets[i][0], spikesOrigin[1] + spikeOffsets[i++][1], this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, time, 0, 2, 0); //this.gameEngine.addEntity(new Hazards["projectile-circle"](this.gameEngine, 11600, 800, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 10, 10, 100))

      /***ENEMIES***/

      this.gameEngine.addEntity(new _entities__WEBPACK_IMPORTED_MODULE_6__["Crow"](this.gameEngine, 12150, 900, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 50, 40, [650, 500], true, [[-1200, 0], [-600, -700]]));
      /***ITEMS***/

      /***TOP LAYER ENTITIES***/

      this.gameEngine.addEntity(new Lava(this.gameEngine, 10200, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
      this.gameEngine.addEntity(new Lava(this.gameEngine, 11100, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
      this.gameEngine.addEntity(new Lava(this.gameEngine, 12000, 1400 - 140, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 3, 300));
      var spikesBorder = new Spikes(this.gameEngine, 12543 - 20, 1248 + 44, this.assetManager.getAsset("img/Enemies.png"), this.ctx, 2, true, 20 * 5, 20 * 3, 2, 0);
    }
  }]);

  return LevelTwo;
}();

var Portal =
/*#__PURE__*/
function (_Entity) {
  _inherits(Portal, _Entity);

  function Portal(game, x, y) {
    var _this;

    var img = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var ctx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var facingRight = arguments.length > 6 ? arguments[6] : undefined;

    _classCallCheck(this, Portal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portal).call(this, game, x, y, img, ctx));
    _this.parentClass = "Enemy";
    _this.type = "Hazard"; //this.y += 44; Give a +44 offset when instantiating 

    _this.scale = scale;
    _this.spriteWidth = 60;
    _this.spriteHeight = 60;
    _this.centerX = x + _this.spriteWidth * _this.scale / 2 - _this.spriteWidth;
    _this.boundWidth = _this.scale * 8 + 3;
    _this.boundHeight = _this.scale * 8 + 3;
    _this.boundX = _this.centerX - _this.scale * 5;
    _this.boundY = _this.y - _this.spriteHeight * _this.scale / 2 + 5 * _this.scale;
    _this.cooldown = 20;
    _this.cooldownTimer = 0;
    _this.states = {
      "facingRight": facingRight,
      "active": true
    };
    _this.animations = {
      "active": new _animation__WEBPACK_IMPORTED_MODULE_5__["default"](_this.img, [_this.spriteWidth, _this.spriteHeight], 11, 8, 5, 8, false, _this.scale)
    };
    _this.animation = _this.animations.active;
    return _this;
  }
  /*Updates the entity each game loop. i.e. what does this entity do? */


  _createClass(Portal, [{
    key: "update",
    value: function update() {
      if (this.states.active) {
        if (this.animation.isDone()) {
          this.states.active = false;
          this.animation.reset();
          this.cooldownTimer = this.cooldown;
        }
      } else if (this.cooldownTimer > 0) {
        this.cooldownTimer--;
      } else {
        this.states.active = true;
      }
    }
  }, {
    key: "collided",
    value: function collided(other, direction) {//Make noise when hero collides?
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

  return Portal;
}(_entities__WEBPACK_IMPORTED_MODULE_6__["Entity"]);



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvYWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2JvbWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2J1bGxldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9jcm93LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9kaW5vLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9lbmVteS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9mbGFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhemFyZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2h1cnRib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9sZW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUtc3dvcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JlZmxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvc2hvdGJsYXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9zb2xkaWVyLXNoaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvdGVycmFpbi1tb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3RlcnJhaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9odWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcHMvbGV2ZWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC5qcyJdLCJuYW1lcyI6WyJBbmltYXRpb24iLCJzcHJpdGVTaGVldCIsImZyYW1lRGltZW5zaW9ucyIsInJvdyIsInNoZWV0V2lkdGgiLCJmcmFtZUR1cmF0aW9uIiwiZnJhbWVzIiwibG9vcCIsInNjYWxlIiwiY29sdW1uT2Zmc2V0IiwiZnJhbWVXaWR0aCIsImZyYW1lSGVpZ2h0IiwidG90YWxUaW1lIiwiZWxhcHNlZFRpbWUiLCJsb29wcyIsInRpY2siLCJjdHgiLCJ4IiwieSIsImZhY2luZ1JpZ2h0IiwiaXNEb25lIiwiZnJhbWUiLCJjdXJyZW50RnJhbWUiLCJ4aW5kZXgiLCJ5aW5kZXgiLCJkcm93IiwiTWF0aCIsImZsb29yIiwic2F2ZSIsInRyYW5zbGF0ZSIsImRyYXdJbWFnZSIsInJlc3RvcmUiLCJBc3NldE1hbmFnZXIiLCJkb3dubG9hZFF1ZXVlIiwic3VjY2Vzc0NvdW50IiwiZXJyb3JDb3VudCIsImNhY2hlIiwicGF0aCIsInB1c2giLCJsZW5ndGgiLCJjYWxsYmFjayIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJpIiwiaW1nIiwiSW1hZ2UiLCJ0aGF0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNyYyIsIkxheWVyIiwic3JjX2RpbWVuc2lvbnMiLCJjYW1lcmEiLCJzY3JvbGxfc3BlZWQiLCJoZWlnaHRfZmFjdG9yIiwiZGVzdF95Iiwic3RyZXRjaCIsInNyY193aWR0aCIsInNyY19oZWlnaHQiLCJjYW1lcmFfZGltZW5zaW9ucyIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwiZF9oZWlnaHQiLCJkX3kiLCJ4VmlldyIsIkJhY2tncm91bmQiLCJnYW1lX2VuZ2luZSIsImFzc2V0X21hbmFnZXIiLCJsYXllcnMiLCJtYWtlX2JhY2tncm91bmQiLCJhZGRCYWNrZ3JvdW5kTGF5ZXIiLCJnZXRBc3NldCIsInRvbG9hZCIsIkFTU0VUX01BTkFHRVIiLCJkb3dubG9hZEFsbCIsImNvbnNvbGUiLCJsb2ciLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsIndpZHRoIiwiaGVpZ2h0IiwiZ2FtZUVuZ2luZSIsImhlcm8iLCJib2FyZCIsImdhbWVib2FyZCIsImh1ZCIsImFkZEVudGl0eSIsImJhY2tncm91bmQiLCJnZXRMZXZlbCIsImZvbGxvdyIsImluaXQiLCJzdGFydCIsIkFjdG9yIiwiZ2FtZSIsInNwcml0ZVdpZHRoIiwic3ByaXRlSGVpZ2h0IiwicGFyZW50Q2xhc3MiLCJmYWNpbmciLCJzdGF0ZXMiLCJhbmltYXRpb25zIiwiYW5pbWF0aW9uIiwiYm91bmRYIiwiYm91bmRZIiwiY29vcmRpbmF0ZXMiLCJCb21iIiwieFZlbG9jaXR5IiwieVZlbG9jaXR5IiwiY2VudGVyWCIsImJvdW5kV2lkdGgiLCJib3VuZEhlaWdodCIsInNpZ2h0UmFkaXVzIiwiaGVhbHRoIiwiZGFtYWdlIiwibGF1bmNodGltZSIsImNvdW50ZG93biIsInN0YXJ0dXAiLCJmcmljdGlvbiIsImxhdW5jaCIsImxhdW5jaGluZyIsInVwZGF0ZVBvcyIsImFjdGl2YXRpbmciLCJyZXNldCIsImRldG9uYXRpbmciLCJleHBsb2RpbmciLCJleHBsb2RlZCIsImV4cGxvc2lvblgiLCJleHBsb3Npb25ZIiwicGxheVNvdW5kIiwiaHVydGJveCIsIm1heCIsInJlZmxlY3RlZCIsInBhcmVudCIsIm5hbWUiLCJyZW1vdmVGcm9tV29ybGQiLCJncmF2aXR5IiwibGFzdEJvdW5kWSIsImFjdGl2YXRlIiwiZGV0b25hdGUiLCJleHBsb2RlIiwiZHJhd0ltZyIsImZXaWR0aCIsImZIZWlnaHQiLCJiV2lkdGgiLCJiSGVpZ2h0Iiwib3RoZXIiLCJkaXJlY3Rpb24iLCJpc0VuZW15IiwiYmVnaW5QYXRoIiwic3Ryb2tlU3R5bGUiLCJyZWN0Iiwic3Ryb2tlIiwiY2xvc2VQYXRoIiwiZHJhd0ZyYW1lIiwiZHJhd0JveGVzIiwiZHJhd091dGxpbmUiLCJCdWxsZXQiLCJtb3ZlbWVudFNwZWVkIiwiYnVsbGV0IiwiYWN0aXZlIiwic3RlYWR5IiwiQ2FtZXJhIiwieVZpZXciLCJ3b3JsZFdpZHRoIiwid29ybGRIZWlnaHQiLCJhYnNPZmZYIiwiYWJzT2ZmWSIsIm9mZlgiLCJvZmZZIiwiY2FtU3BlZWRYIiwiY2FtU3BlZWRZIiwiYXhpcyIsImZvbGxvd2VkIiwib2JqIiwidXBkYXRlQm91bmRzIiwidmFsIiwibWluIiwiQ3JvdyIsIm11cmRlckxlYWRlciIsIm11cmRlckRyb29ncyIsInBvaW50VmFsdWUiLCJ4U3BlZWQiLCJ5U3BlZWQiLCJtYXhYIiwibWF4WSIsInhBY2NlbCIsInlBY2NlbCIsImF0dGFja0FuZ2xlMSIsImF0dGFja0FuZ2xlMiIsInhBdHRhY2siLCJ4UmVjb3ZlciIsInlSZWNvdmVyIiwicmVjb3ZlckRpc3RhbmNlIiwieFJlY292ZXJEaXN0YW5jZSIsInlSZWNvdmVyRGlzdGFuY2UiLCJkcm9vZ09uZSIsImRyb29nVHdvIiwicmFuZCIsImZseSIsInJlY292ZXJpbmciLCJhdHRhY2tpbmdfZmluYWwiLCJpZGxpbmciLCJhYnMiLCJmbHlpbmciLCJkcm9vZzEiLCJkcm9vZzIiLCJsZXZlbCIsInNlY3Rpb24iLCJyYW5kb20iLCJhdHRhY2tpbmciLCJzb3VuZCIsInBsYXkiLCJodXJ0IiwidXBkYXRlSGl0Ym94IiwiSGVhbHRoUGFjayIsImFzc2V0TWFuYWdlciIsIkVuZXJneVBhY2siLCJhdHRhY2siLCJhdHRhY2tfZmluYWwiLCJEaW5vIiwicGF0cm9sRGlzdGFuY2UiLCJzaG90VGltZU9mZnNldCIsInN0YXJ0WCIsInNob3RDb29sZG93biIsInNob3RDb29sZG93blRpbWVyIiwicGF0cm9sbGluZyIsImlkbGUiLCJzaG9vdGluZyIsIndhbGtpbmciLCJmcmFtZWxvY2tlZCIsIndhbGtfc3RyYWlnaHQiLCJzaG9vdF9kaWFnb25hbCIsIkVuZW15IiwiZGFtYWdlVHlwZSIsIkVudGl0eSIsImNvbnN0cnVjdG9yIiwidHlwZSIsImFyYyIsInJhZGl1cyIsIlBJIiwic2hvd091dGxpbmVzIiwiY2xvY2tUaWNrIiwicmVjdDEiLCJyZWN0MiIsImNvbGxpc2lvbiIsImR4IiwiZHkiLCJsYXN0ZHkiLCJsYXN0WSIsImNyb3NzV2lkdGgiLCJsYXN0Q3Jvc3NXaWR0aCIsImNyb3NzSGVpZ2h0IiwiRmxhbWVzIiwiZGVtbyIsIm9yaWdYIiwib3JpZ1kiLCJHYW1lQm9hcmQiLCJ0ZXN0UG9zIiwibGV2ZWxOdW0iLCJzZWN0aW9uTnVtIiwicHZ0IiwicHZ0dCIsImxvc3RTY29yZSIsImRlYWRFbmVtaWVzIiwic2NvcmUiLCJ0aW1lIiwiY2hlY2tOb2RlIiwibGFzdENoZWNrcG9pbnQiLCJsb2FkTmV4dExldmVsIiwibmV4dExldmVsIiwiY2xlYXJTdGF0ZXMiLCJsb2FkZWRMZXZlbCIsImxvYWQiLCJsb2FkaW5nTGV2ZWwiLCJwb3B1bGF0ZU1hcCIsInNldFBvcyIsIm5leHROb2RlIiwiY2hlY2twb2ludHMiLCJuZXh0IiwibmV3TGV2ZWwiLCJwb3J0YWwiLCJsb2FkaW5nU2VjdGlvbiIsInJlc3Bhd25TZWN0aW9uIiwiaXNCYWNrIiwiY2xlYXJCb2FyZCIsImFjdGl2YXRlZCIsImNhbU9mZlgiLCJjYW1PZmZZIiwibmV4dENhbVNwZWVkIiwiaXNGcm9udCIsInByZXYiLCJwcmV2Q2FtU3BlZWQiLCJyZXNwYXduZWQiLCJyZXNwYXduIiwicmVzcGF3bk1lc3NhZ2UiLCJzaG93UG9pbnRWYWx1ZXMiLCJmb250IiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiLCJzcGxpY2UiLCJzY29wZSIsIm51bSIsInBvcHVsYXRlTGV2ZWwiLCJyZXNwYXduTGV2ZWwiLCJsb2FkZWRTZWN0aW9uIiwiY3VyckNoZWNrUG9zIiwiY3VyckNoZWNrWCIsImN1cnJDaGVja1kiLCJsaXN0RnJvbnQiLCJDaGVja3BvaW50IiwiY2FtVmFscyIsImNhbVNwZWVkcyIsImhhc1ByZXYiLCJjdXJyQ2hlY2siLCJwcmV2Q2hlY2siLCJoYXNOZXh0IiwiYWRkTmV4dCIsInNldEJvdW5kcyIsImNhbWVyYVNoaWZ0IiwiY2FtZXJhU3BlZWQiLCJyaWdodEJvdW5kIiwibGVmdEJvdW5kIiwiYWN0aXZhdGlvblJhZGl1cyIsIkhhbmQiLCJkaXN0YW5jZSIsInRocm93dGltZSIsImNvb2xkb3duIiwiY29vbGRvd252YXJpYW5jZSIsImNvb2xkb3duVGltZXIiLCJzdGFydGluZyIsInRocm93aW5nIiwiaGFzVGhyb3duIiwidGhyb3ciLCJyZWNvdmVyIiwieE9mZiIsInlPZmYiLCJoYXNPd25Qcm9wZXJ0eSIsIkxhdmEiLCJmaXJlQ29vbGRvd25UaW1lciIsImZpcmVDb29sZG93biIsIkZpcmViYWxsIiwic3Bhd25PZmZzZXQiLCJvcmlnQm91bmRYIiwib3JpZ0JvdW5kWSIsIm1pZGRsZV91cCIsInBlYWtfdXAiLCJwZWFrX2Rvd24iLCJtaWRkbGVfZG93biIsImZpbmlzaCIsIlNwaWtlcyIsInRpbWVyIiwidGltZU9mZnNldCIsImludGVydmFsIiwic3Bpa2VDb29sZG93blRpbWVyIiwic3Bpa2VDb29sZG93biIsImluYWN0aXZlX2Rvd24iLCJuZXh0T2Zmc2V0IiwiaW5hY3RpdmVfdXAiLCJQcm9qZWN0aWxlSGF6YXJkIiwiZGlyZWN0aW9ucyIsImxpZmVzcGFuIiwieERpciIsInlEaXIiLCJQcm9qZWN0aWxlQ2lyY2xlIiwicXVhZHJhbnRzIiwicXVhZHJhbnQiLCJMYXVuY2hlciIsInByb2plY3RpbGVMaWZlc3BhbiIsImxhdW5jaFRpbWVPZmZzZXQiLCJIZXJvIiwiZGFzaFNwZWVkIiwianVtcFN0cmVuZ3RoIiwianVtcHNMZWZ0IiwibWF4SnVtcHMiLCJ0ZXJtaW5hbFZlbG9jaXR5IiwibWF4SGVhbHRoIiwibWF4RW5lcmd5IiwiZW5lcmd5Iiwic2xhc2hFbmVyZ3lDb3N0IiwiY2xlYXZlRW5lcmd5Q29zdCIsInNob290Q29zdCIsInNob290RW5lcmd5Q29zdCIsImRhc2hFbmVyZ3lDb3N0Iiwic3R1bkRpciIsIm11bHRpcGxpZXIiLCJkaWZmaWN1bHR5IiwiZGFtYWdlQ29vbGRvd25UaW1lciIsImRhbWFnZUNvb2xkb3duIiwiZW5lcmd5Q29vbGRvd25UaW1lciIsImVuZXJneUNvb2xkb3duIiwiZW5lcmd5Q29vbGRvd25NaW4iLCJlbmVyZ3lEZWxheSIsImVuZXJneURlbGF5VGltZXIiLCJ2ZWxvY2l0eUNvb2xkb3duIiwidmVsb2NpdHlDb29sZG93blRpbWVyIiwianVtcFRpbWVyIiwianVtcENvb2xkb3duIiwic2hvb3RDb29sZG93blRpbWVyIiwic2hvb3RDb29sZG93biIsImdvZE1vZGVFbmVyZ3lNaW4iLCJub3RHb2RNb2RlRW5lcmd5TWluIiwiZ29kRW5lcmd5RGVsYXkiLCJub3RHb2RFbmVyZ3lEZWxheSIsInNldFBvc1RpbWVyIiwiZ29kVG9nZ2xlVGltZXIiLCJjb250cm9sS2V5cyIsImNvbnRyb2xzIiwicmlnaHQiLCJydW5uaW5nIiwibGVmdCIsImVuZXJnaXplIiwiZW5lcmdpemVkIiwianVtcCIsImp1bXBpbmciLCJncm91bmRlZCIsInNob290Iiwic2hvdGxvY2tlZCIsImNsZWF2ZSIsInNldFN0YXRlcyIsImNsZWF2aW5nIiwic2xhc2giLCJkYXNoaW5nIiwiZGFzaCIsImRhc2hpbmdTdGFydCIsImhhc0Rhc2hlZCIsImhhc1JlZmxlY3RlZCIsInVzZUVuZXJneSIsInNsYXNoaW5nIiwiaGFzR3Jhdml0eSIsImhhc1NsYXNoZWQiLCJlbmVyZ3lEYXNoIiwiZGFzaGluZ01pZCIsImludnVsbmVyYWJsZSIsImRhc2hpbmdFbmQiLCJzdHVubmVkIiwiZGVhZCIsImlzR29kIiwiYXNjZW5kIiwiZGVzY2VuZCIsImd1bnJ1biIsImFpcnNob290IiwiZGFzaF9zdGFydCIsImRhc2hfbWlkIiwiZGFzaF9lbmQiLCJzdHVuIiwiY29zdCIsImVuZXJneURlbGF5Q29vbGRvd24iLCJIdXJ0Ym94IiwicGFyZW50V2lkdGgiLCJwYXJlbnRIZWlnaHQiLCJodXJ0V2lkdGgiLCJodXJ0SGVpZ2h0IiwicGVyc2lzdGVudCIsIkl0ZW0iLCJ4T2Zmc2V0IiwieU9mZnNldCIsIm9uX3BpY2t1cCIsImhlYWx0aF92YWx1ZSIsImVuZXJneV92YWx1ZSIsIkxlbyIsImp1bXBTcGVlZCIsInRpbWVyU3RhcnQiLCJEYXRlIiwibm93Iiwic3ByaW5mbyIsImx1bmdlIiwiZGVtb2xvb3AiLCJsdW5naW5nIiwiZmlyZWx1bmdpbmciLCJmaXJlbHVuZ2UiLCJlIiwiUHJvamVjdGlsZV9Td29yZCIsInN0YWJsaXplZCIsInN0YWJsZSIsInJlY292ZXJ5IiwiUHJvamVjdGlsZSIsImdyZWVuIiwiZ3JlZW5fZXhpdGluZyIsImJsdWVfZXhpdGluZyIsImdyZWVuX3N0YWJsZSIsImJsdWUiLCJibHVlX3N0YWJsZSIsIlJlZmxlY3Rib3giLCJSb2NrZXQiLCJkcmFpblRpbWUiLCJib3VuY2VDb3VudCIsImJvdW5jZVRpbWVyIiwiYm91bmNlVGltZSIsInNhZmVUaW1lciIsInJvY2tldCIsIlNob3RibGFzdCIsInNob3RibGFzdCIsIlNvbGRpZXJfU2hpZWxkIiwicnVuUHJvYiIsInJ1bkF3YXlDb29sZG93biIsInJ1bkF3YXlDb29sZG93blRpbWVyIiwicnVuQXdheVRpbWUiLCJydW5Bd2F5VGltZXIiLCJydW5uaW5nQXdheSIsImJsb2NraW5nIiwidHVybmluZyIsInNsYXNoaW5nX3N0YXJ0Iiwic2hvb3Rpbmdfc3RhcnR1cCIsInNob290aW5nX2FjdGl2ZSIsInNob290aW5nX3JlY292ZXIiLCJoYXNTaG90Iiwic2xhc2hpbmdfZW5kIiwicnVuIiwic2hvb3Rfc3RhcnR1cCIsInNob290X2FjdGl2ZSIsInNob290X3JlY292ZXIiLCJzbGFzaF9zdGFydCIsInNsYXNoX2VuZCIsImJsb2NrIiwidHVybiIsIlRlcnJhaW5Nb2JpbGUiLCJkaW1lbnNpb25zIiwidGlsZXMiLCJjb2wiLCJUZXJyYWluIiwiYm91bmRzIiwiR2FtZUVuZ2luZSIsImRldk1vZGUiLCJlbnRpdGllcyIsImJhY2tncm91bmRMYXllcnMiLCJjbGljayIsIm1vdXNlIiwid2hlZWwiLCJzdXJmYWNlV2lkdGgiLCJzdXJmYWNlSGVpZ2h0IiwibXVzaWMiLCJhZGRlZHBvaW50cyIsInRvZ2dsZUNvb2xkb3duIiwiYm94VG9nZ2xlVGltZXIiLCJjaGVja3BvaW50Q3ljbGVDb3VudCIsInBhdXNlZCIsInBhdXNlVG9nZ2xlQ29vbGRvd24iLCJwYXVzZUdlbmVyYWwiLCJwYXVzZUxheW91dEEiLCJwYXVzZUxheW91dEIiLCJwYXVzZUZsYXZvclgiLCJwYXVzZUZsYXZvclkiLCJjb250cm9sTGF5b3V0QSIsImNvbnRyb2xMYXlvdXRCIiwic3RhcnRJbnB1dCIsIkF1ZGlvIiwidm9sdW1lIiwiZ2FtZUxvb3AiLCJyZXF1ZXN0QW5pbUZyYW1lIiwic291bmRfbmFtZSIsImdhbWVUaW1lIiwibWF4U3RlcCIsIndhbGxMYXN0VGltZXN0YW1wIiwid2FsbEN1cnJlbnQiLCJ3YWxsRGVsdGEiLCJnYW1lRGVsdGEiLCJ0YWJJbmRleCIsImdldFhhbmRZIiwiY2xpZW50WCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFkiLCJ0b3AiLCJtYXAiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ3aGljaCIsInNwYWNlIiwicHJldmVudERlZmF1bHQiLCJjb2RlIiwiZW50aXR5IiwibGF5ZXIiLCJkcmF3Q2FsbGJhY2siLCJjbGVhclJlY3QiLCJkcmF3IiwiZW50aXRpZXNDb3VudCIsInVwZGF0ZSIsImoiLCJkaXN0IiwiaXNDb2xsaWRpbmciLCJjb2xsaWRlZCIsImN1cnJlbnRUaW1lIiwiZWFzeW1vZGUiLCJoYXJkbW9kZSIsImxheW91dEEiLCJsYXlvdXRCIiwicGF1c2UiLCJnZXRQb3MiLCJnb2RUb2dnbGUiLCJ0b2dnbGVCb3hlcyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIkh1ZCIsInNyY19jb29yZGluYXRlcyIsImRlc3RfY29vcmRpbmF0ZXMiLCJoZWFsdGhiYXIiLCJIZWFsdGhCYXIiLCJlbmVyZ3liYXIiLCJFbmVyZ3lCYXIiLCJzY29yZWJvYXJkIiwiU2NvcmVCb2FyZCIsImNvbXBvbmVudHMiLCJncmFkaWVudFN0b3AxIiwiZ3JhZGllbnRTdG9wMiIsImdyYWRpZW50U3RvcDMiLCJkZXN0X2Nvb3JkcyIsImdyYWRpZW50IiwiY3JlYXRlTGluZWFyR3JhZGllbnQiLCJhZGRDb2xvclN0b3AiLCJSZXNvdXJjZUJhciIsInNyY19jb29yZHMiLCJzcmNfZGltcyIsImxhc3R5IiwicGFydHMiLCJwYXJ0IiwiZHJhd1BhcnQiLCJkZXN0X3hfb2Zmc2V0IiwiZGVzdF95X29mZnNldCIsInJlc291cmNlQmFyU2VnbWVudCIsIm1pZGRsZTEiLCJtaWRkbGUyIiwibWlkZGxlMyIsIm1pZGRsZTQiLCJtaWRkbGU1IiwiYm90dG9tIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZWxlbWVudCIsIkxldmVsT25lIiwidGlsZXNoZWV0IiwiYWN0aXZhdGVkQ2hlY2twb2ludHMiLCJQb3J0YWwiLCJ0aWxlU2l6ZSIsInRpbGVNYXAiLCJ0aWxlRGltZW5zaW9ucyIsInNwbGl0IiwiY29uc3RydWN0VGVycmFpbiIsInRpbGUiLCJ0aWxlRGltZW5zaW9uIiwiY2hlY2twb2ludCIsInNlY3Rpb25fMSIsIkxldmVsVHdvIiwibWFwU3RhcnQiLCJzZWN0aW9uXzIiLCJzZWN0aW9uXzMiLCJzZWN0aW9uXzQiLCJoYW5kMSIsInNwaWtlc09yaWdpbiIsInNwaWtlT2Zmc2V0cyIsInNwaWtlczEiLCJzcGlrZXMyIiwic3Bpa2VzMyIsInNwaWtlczQiLCJzcGlrZXM1Iiwic3Bpa2VzNiIsInNwaWtlczciLCJzcGlrZXM4Iiwic3Bpa2VzOSIsInNwaWtlc0JvcmRlciIsIlNvdW5kIiwic291bmRzIiwibl9kdXBzIiwibWFrZV9kdXBsaWNhdGVzIiwibl9kdXAiLCJjdXJyX3NvdW5kIiwic291bmRfbGlzdCIsImNsb25lIiwiY2xvbmVOb2RlIiwiaW5kZXgiLCJlbmRlZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JNQSxTOzs7QUFFRixxQkFBWUMsV0FBWixFQUF5QkMsZUFBekIsRUFBMENDLEdBQTFDLEVBQStDQyxVQUEvQyxFQUEyREMsYUFBM0QsRUFBMEVDLE1BQTFFLEVBQWtGQyxJQUFsRixFQUF3RkMsS0FBeEYsRUFBK0c7QUFBQSxRQUFoQkMsWUFBZ0IsdUVBQUgsQ0FBRzs7QUFBQTs7QUFFM0csU0FBS1IsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLUyxVQUFMLEdBQWtCUixlQUFlLENBQUMsQ0FBRCxDQUFqQztBQUNBLFNBQUtHLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsU0FBS00sV0FBTCxHQUFtQlQsZUFBZSxDQUFDLENBQUQsQ0FBbEMsQ0FMMkcsQ0FLcEU7O0FBQ3ZDLFNBQUtDLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtNLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS0wsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLTSxTQUFMLEdBQWlCUCxhQUFhLEdBQUdDLE1BQWpDO0FBQ0EsU0FBS08sV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtOLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtPLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS04sS0FBTCxHQUFhQSxLQUFiO0FBQ0g7Ozs7OEJBR1NPLEksRUFBTUMsRyxFQUFLQyxDLEVBQUdDLEMsRUFBR0MsVyxFQUFhO0FBQ3BDLFdBQUtOLFdBQUwsSUFBb0JFLElBQXBCOztBQUNBLFVBQUksS0FBS0ssTUFBTCxFQUFKLEVBQW1CO0FBQ2YsWUFBSSxLQUFLYixJQUFULEVBQWU7QUFDWCxlQUFLTSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsZUFBS0MsS0FBTDtBQUNIO0FBQ0o7O0FBQ0QsVUFBSU8sS0FBSyxHQUFHLEtBQUtDLFlBQUwsRUFBWjtBQUNBLFVBQUlDLE1BQU0sR0FBRyxDQUFiO0FBQ0EsVUFBSUMsTUFBTSxHQUFHLENBQWI7QUFDQSxVQUFJQyxJQUFJLEdBQUksS0FBS3RCLEdBQUwsR0FBVyxLQUFLUSxXQUE1QjtBQUNBWSxZQUFNLEdBQUdGLEtBQUssR0FBRyxLQUFLakIsVUFBdEI7QUFDQW9CLFlBQU0sR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVlOLEtBQUQsR0FBVSxLQUFLakIsVUFBMUIsQ0FBVCxDQWJvQyxDQWdCcEM7O0FBQ0EsVUFBSSxDQUFDZSxXQUFMLEVBQWtCO0FBRWQ7QUFDQUgsV0FBRyxDQUFDWSxJQUFKLEdBSGMsQ0FLZDs7QUFDSFosV0FBRyxDQUFDYSxTQUFKLENBQWNaLENBQUMsR0FBSSxLQUFLVCxLQUFMLEdBQWEsS0FBS0UsVUFBbkIsR0FBaUMsQ0FBbkQsRUFBc0QsQ0FBdEQsRUFOaUIsQ0FRcEI7O0FBQ01NLFdBQUcsQ0FBQ1IsS0FBSixDQUFVLENBQUMsQ0FBWCxFQUFjLENBQWQsRUFUYyxDQVdkO0FBQ0E7QUFDQTs7QUFDSFEsV0FBRyxDQUFDYyxTQUFKLENBQWMsS0FBSzdCLFdBQW5CLEVBQ2FzQixNQUFNLEdBQUcsS0FBS2IsVUFEM0IsRUFDeUNjLE1BQU0sR0FBRyxLQUFLYixXQUFmLEdBQThCYyxJQUR0RSxFQUM2RTtBQUNqRSxhQUFLZixVQUZqQixFQUU2QixLQUFLQyxXQUZsQyxFQUdZLEVBQUUsS0FBS0QsVUFBTCxHQUFrQixDQUFwQixJQUEwQixLQUFLQSxVQUFMLEdBQWtCLENBQTVDLEdBQ0ssS0FBS0EsVUFKdEIsRUFJa0M7QUFDdEJRLFNBQUMsR0FBRyxLQUFLVixLQUFMLEdBQVcsS0FBS0csV0FBcEIsR0FBa0MsS0FBS0gsS0FBTCxHQUFXLEVBTHpELEVBT1ksS0FBS0UsVUFBTCxHQUFrQixLQUFLRixLQVBuQyxFQVFZLEtBQUtHLFdBQUwsR0FBbUIsS0FBS0gsS0FScEMsRUFkaUIsQ0F3QmQ7O0FBQ0FRLFdBQUcsQ0FBQ2UsT0FBSixHQXpCYyxDQTBCZDtBQUVILE9BNUJELE1BNEJPO0FBQUU7QUFDUmYsV0FBRyxDQUFDYyxTQUFKLENBQWMsS0FBSzdCLFdBQW5CLEVBQ2FzQixNQUFNLEdBQUcsS0FBS2IsVUFEM0IsRUFDeUNjLE1BQU0sR0FBRyxLQUFLYixXQUFmLEdBQThCYyxJQUR0RSxFQUM2RTtBQUNqRSxhQUFLZixVQUZqQixFQUU2QixLQUFLQyxXQUZsQyxFQUdZTSxDQUFDLEdBQUcsS0FBS1AsVUFIckIsRUFJWVEsQ0FBQyxHQUFHLEtBQUtWLEtBQUwsR0FBYSxLQUFLRyxXQUF0QixHQUFvQyxLQUFLSCxLQUFMLEdBQWEsRUFKN0QsRUFLWSxLQUFLRSxVQUFMLEdBQWtCLEtBQUtGLEtBTG5DLEVBTVksS0FBS0csV0FBTCxHQUFtQixLQUFLSCxLQU5wQztBQU9BLE9BckRtQyxDQXNEcEM7O0FBRUg7OzttQ0FFZTtBQUNaLGFBQU9rQixJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLZCxXQUFMLEdBQW1CLEtBQUtSLGFBQW5DLElBQW9ELEtBQUtJLFlBQWhFO0FBQ0g7Ozs2QkFFUztBQUNOLGFBQVEsS0FBS0ksV0FBTCxJQUFvQixLQUFLRCxTQUFMLEdBQWlCLENBQTdDO0FBQ0g7Ozs0QkFFTztBQUNKLFdBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxXQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNIOzs7Ozs7QUFHVSwrREFBQWQsU0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUdBOzs7Ozs7OztJQVFNZ0MsWTs7O0FBRUYsMEJBQWlDO0FBQUEsUUFBcEJDLGFBQW9CLHVFQUFKLEVBQUk7O0FBQUE7O0FBQzdCLFNBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLSCxhQUFMLEdBQXFCQSxhQUFyQjtBQUNIO0FBRUQ7Ozs7Ozs7a0NBR2VJLEksRUFBTTtBQUNqQjtBQUNBLFdBQUtKLGFBQUwsQ0FBbUJLLElBQW5CLENBQXdCRCxJQUF4QjtBQUNIO0FBRUQ7Ozs7Ozs2QkFHVTtBQUNOLGFBQVEsS0FBS0osYUFBTCxDQUFtQk0sTUFBbkIsSUFBNkIsS0FBS0wsWUFBTCxHQUFvQixLQUFLQyxVQUE5RDtBQUNIO0FBRUQ7Ozs7OztnQ0FHYUssUSxFQUFVO0FBQUE7O0FBQ25CLFVBQUksS0FBS1AsYUFBTCxDQUFtQk0sTUFBbkIsS0FBOEIsQ0FBbEMsRUFBcUNFLE1BQU0sQ0FBQ0MsVUFBUCxDQUFrQkYsUUFBbEIsRUFBNEIsR0FBNUI7O0FBRGxCLGlDQUVWRyxDQUZVO0FBR2YsWUFBSU4sSUFBSSxHQUFHLEtBQUksQ0FBQ0osYUFBTCxDQUFtQlUsQ0FBbkIsQ0FBWDtBQUNBLFlBQUlDLEdBQUcsR0FBRyxJQUFJQyxLQUFKLEVBQVY7QUFDQSxZQUFJQyxJQUFJLEdBQUcsS0FBWDtBQUNBRixXQUFHLENBQUNHLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLFlBQVk7QUFDckM7QUFDQUQsY0FBSSxDQUFDWixZQUFMLElBQXFCLENBQXJCOztBQUNBLGNBQUlZLElBQUksQ0FBQzFCLE1BQUwsRUFBSixFQUFtQjtBQUFFb0Isb0JBQVE7QUFBSztBQUNyQyxTQUpEO0FBS0FJLFdBQUcsQ0FBQ0csZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsWUFBWTtBQUN0Q0QsY0FBSSxDQUFDWCxVQUFMLElBQW1CLENBQW5COztBQUNBLGNBQUlXLElBQUksQ0FBQzFCLE1BQUwsRUFBSixFQUFtQjtBQUFFb0Isb0JBQVE7QUFBSztBQUNyQyxTQUhEO0FBSUFJLFdBQUcsQ0FBQ0ksR0FBSixHQUFVWCxJQUFWO0FBQ0EsYUFBSSxDQUFDRCxLQUFMLENBQVdDLElBQVgsSUFBbUJPLEdBQW5CO0FBaEJlOztBQUVuQixXQUFLLElBQUlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1YsYUFBTCxDQUFtQk0sTUFBdkMsRUFBK0NJLENBQUMsRUFBaEQsRUFBb0Q7QUFBQSxjQUEzQ0EsQ0FBMkM7QUFlbkQ7QUFDSjtBQUVEOzs7Ozs7NkJBR1VOLEksRUFBTTtBQUNaO0FBQ0EsYUFBTyxLQUFLRCxLQUFMLENBQVdDLElBQVgsQ0FBUDtBQUNIOzs7O0tBRUg7OztBQUVhLCtEQUFBTCxZQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBOztJQUdNaUIsSzs7O0FBQ0YsaUJBQVlMLEdBQVosRUFBaUJNLGNBQWpCLEVBQWlDQyxNQUFqQyxFQUF5Q0MsWUFBekMsRUFBdURDLGFBQXZELEVBQXNFQyxNQUF0RSxFQUFzRztBQUFBLFFBQXhCQyxPQUF3Qix1RUFBaEIsS0FBZ0I7QUFBQSxRQUFUL0MsS0FBUyx1RUFBSCxDQUFHOztBQUFBOztBQUNsRyxTQUFLb0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS1ksU0FBTCxHQUFpQk4sY0FBYyxDQUFDLENBQUQsQ0FBL0I7QUFDQSxTQUFLTyxVQUFMLEdBQWtCUCxjQUFjLENBQUMsQ0FBRCxDQUFoQztBQUNBLFNBQUtFLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLRSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLSixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLTyxpQkFBTCxHQUF5QixDQUFDUCxNQUFNLENBQUNRLFdBQVIsRUFBcUJSLE1BQU0sQ0FBQ1MsWUFBNUIsQ0FBekI7QUFDQSxTQUFLcEQsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBSzhDLE1BQUwsR0FBY0EsTUFBZDtBQUVIOzs7O3lCQUVJdEMsRyxFQUFLO0FBQ047QUFFQSxXQUFLLElBQUkyQixDQUFDLEdBQUcsSUFBSSxLQUFLYSxTQUF0QixFQUFpQ2IsQ0FBQyxHQUFHLEtBQUtlLGlCQUFMLENBQXVCLENBQXZCLElBQTRCLEtBQUtGLFNBQXRFLEVBQWlGYixDQUFDLElBQUksS0FBS2EsU0FBM0YsRUFBc0c7QUFDOUYsWUFBSUssUUFBUSxHQUFJLEtBQUtILGlCQUFMLENBQXVCLENBQXZCLElBQTRCLEtBQUtMLGFBQWpEO0FBQ0EsWUFBSVMsR0FBRyxHQUFHLEtBQUtSLE1BQUwsR0FBYyxLQUFLRCxhQUE3QixDQUY4RixDQUc5Rjs7QUFFQSxZQUFJLEtBQUtFLE9BQVQsRUFBa0I7QUFDZE0sa0JBQVEsR0FBRyxLQUFLSCxpQkFBTCxDQUF1QixDQUF2QixDQUFYLENBRGMsQ0FFZDtBQUNIOztBQUNEMUMsV0FBRyxDQUFDYyxTQUFKLENBQWMsS0FBS2MsR0FBbkIsRUFDSSxDQURKLEVBQ08sQ0FEUCxFQUVJLEtBQUtZLFNBRlQsRUFFb0IsS0FBS0MsVUFGekIsRUFHSSxDQUFDZCxDQUFDLEdBQUssS0FBS1EsTUFBTCxDQUFZWSxLQUFaLEdBQW1CLEtBQUtYLFlBQXpCLEdBQTBDLEtBQUtJLFNBQXJELElBQW1FLEtBQUtoRCxLQUg1RSxFQUlJc0QsR0FKSixFQUtJLEtBQUtOLFNBQUwsR0FBaUIsS0FBS2hELEtBTDFCLEVBTUlxRCxRQU5KO0FBUVA7QUFFSjs7Ozs7O0lBR0NHLFU7OztBQUVGLHNCQUFZQyxXQUFaLEVBQXlCQyxhQUF6QixFQUF3Q2xELEdBQXhDLEVBQTZDbUMsTUFBN0MsRUFBcUQ7QUFBQTs7QUFDakQsU0FBS2MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtsRCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLbUMsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS2dCLE1BQUwsR0FBYyxDQUNWLGlCQURVLEVBRVYsMkJBRlUsRUFHVix3QkFIVSxFQUlWLHlCQUpVLEVBS1YscUJBTFUsQ0FBZDtBQVFBLFNBQUtDLGVBQUw7QUFHSDs7OztzQ0FFa0I7QUFDZixXQUFLSCxXQUFMLENBQWlCSSxrQkFBakIsQ0FBb0MsSUFBSXBCLEtBQUosQ0FBVSxLQUFLaUIsYUFBTCxDQUFtQkksUUFBbkIsQ0FBNEIsaUJBQTVCLENBQVYsRUFDaEMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQURnQyxFQUNwQixLQUFLbkIsTUFEZSxFQUNQLEdBRE8sRUFDRixDQURFLEVBQ0MsQ0FERCxFQUNJLElBREosQ0FBcEM7QUFFQSxXQUFLYyxXQUFMLENBQWlCSSxrQkFBakIsQ0FBb0MsSUFBSXBCLEtBQUosQ0FBVSxLQUFLaUIsYUFBTCxDQUFtQkksUUFBbkIsQ0FBNEIsMkJBQTVCLENBQVYsRUFDaEMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQURnQyxFQUNwQixLQUFLbkIsTUFEZSxFQUNQLElBRE8sRUFDRCxJQURDLEVBQ0ssS0FBS0EsTUFBTCxDQUFZUyxZQUFaLEdBQXlCLENBRDlCLENBQXBDO0FBRUEsV0FBS0ssV0FBTCxDQUFpQkksa0JBQWpCLENBQW9DLElBQUlwQixLQUFKLENBQVUsS0FBS2lCLGFBQUwsQ0FBbUJJLFFBQW5CLENBQTRCLHdCQUE1QixDQUFWLEVBQ2hDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FEZ0MsRUFDcEIsS0FBS25CLE1BRGUsRUFDUCxHQURPLEVBQ0YsR0FERSxFQUNHLEtBQUtBLE1BQUwsQ0FBWVMsWUFBWixHQUF5QixDQUQ1QixDQUFwQyxFQUxlLENBT2Y7QUFDSTs7QUFDSixXQUFLSyxXQUFMLENBQWlCSSxrQkFBakIsQ0FBb0MsSUFBSXBCLEtBQUosQ0FBVSxLQUFLaUIsYUFBTCxDQUFtQkksUUFBbkIsQ0FBNEIscUJBQTVCLENBQVYsRUFDaEMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQURnQyxFQUNwQixLQUFLbkIsTUFEZSxFQUNQLENBRE8sRUFDSixDQURJLEVBQ0QsS0FBS0EsTUFBTCxDQUFZUyxZQUFaLEdBQXlCLENBRHhCLENBQXBDO0FBRUg7Ozs7OztBQUlVLCtEQUFBSSxVQUFmLEU7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVlLDJFQUFXO0FBRXRCO0FBRUEsTUFBSU8sTUFBTSxHQUFHLENBQ1QsYUFEUyxFQUVULGFBRlMsRUFHVCxxQkFIUyxFQUlULGVBSlMsRUFLVCxpQkFMUyxFQU1ULGFBTlMsRUFPVCxvQkFQUyxFQVFULG9CQVJTLEVBU1QsaUJBVFMsRUFVVCwyQkFWUyxFQVdULHdCQVhTLEVBWVQseUJBWlMsRUFhVCxxQkFiUyxDQUFiO0FBZ0JBLE1BQUlDLGFBQWEsR0FBRyxJQUFJLHNEQUFKLENBQWlCRCxNQUFqQixDQUFwQjtBQUVBQyxlQUFhLENBQUNDLFdBQWQsQ0FBMEIsWUFBWTtBQUNsQ0MsV0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVo7QUFDQSxRQUFJQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFiO0FBQ0EsUUFBSTlELEdBQUcsR0FBRzRELE1BQU0sQ0FBQ0csVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0FMLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFtQkMsTUFBTSxDQUFDSSxLQUF0QztBQUNBTixXQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBb0JDLE1BQU0sQ0FBQ0ssTUFBdkM7QUFFQSxRQUFJQyxVQUFVLEdBQUcsSUFBSSxvREFBSixFQUFqQjtBQUNBLFFBQUkvQixNQUFNLEdBQUcsSUFBSSx3REFBSixDQUFXK0IsVUFBWCxFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixJQUE3QixFQUFtQ2xFLEdBQUcsR0FBR0EsR0FBekMsRUFBOEM0RCxNQUFNLENBQUNJLEtBQXJELEVBQTRESixNQUFNLENBQUNLLE1BQW5FLEVBQTJFLElBQTNFLEVBQWlGLElBQWpGLENBQWI7QUFDQSxRQUFJRSxJQUFJLEdBQUcsSUFBSSxzREFBSixDQUFTRCxVQUFULEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCVixhQUFhLENBQUNGLFFBQWQsQ0FBdUIsYUFBdkIsQ0FBM0IsRUFBa0V0RCxHQUFsRSxDQUFYO0FBQ0EsUUFBSW9FLEtBQUssR0FBRyxJQUFJLDREQUFKLENBQWNGLFVBQWQsRUFBMEJWLGFBQTFCLEVBQXlDeEQsR0FBekMsQ0FBWjtBQUNBa0UsY0FBVSxDQUFDQyxJQUFYLEdBQWtCQSxJQUFsQjtBQUNBRCxjQUFVLENBQUNHLFNBQVgsR0FBdUJELEtBQXZCO0FBQ0EsUUFBSUUsR0FBRyxHQUFHLElBQUksNENBQUosQ0FBUUosVUFBUixFQUFvQlYsYUFBYSxDQUFDRixRQUFkLENBQXVCLGFBQXZCLENBQXBCLEVBQTJEYSxJQUEzRCxFQUFpRSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpFLEVBQXlFLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBekUsRUFBaUYsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFqRixFQUE2RixDQUE3RixFQUFnR2hDLE1BQWhHLENBQVY7QUFDQWlDLFNBQUssQ0FBQ0UsR0FBTixHQUFZQSxHQUFaO0FBQ0FGLFNBQUssQ0FBQ0QsSUFBTixHQUFhQSxJQUFiLENBZmtDLENBaUJsQztBQUVBOztBQUVBOztBQUVBRCxjQUFVLENBQUNLLFNBQVgsQ0FBcUJwQyxNQUFyQjtBQUNBK0IsY0FBVSxDQUFDL0IsTUFBWCxHQUFvQkEsTUFBcEI7QUFFQSxRQUFJcUMsVUFBVSxHQUFHLElBQUksbURBQUosQ0FBZU4sVUFBZixFQUEyQlYsYUFBM0IsRUFBMEN4RCxHQUExQyxFQUErQ21DLE1BQS9DLENBQWpCLENBMUJrQyxDQTRCbEM7O0FBQ0FpQyxTQUFLLENBQUNLLFFBQU4sQ0FBZSxDQUFmO0FBRUF0QyxVQUFNLENBQUN1QyxNQUFQLENBQWNQLElBQWQ7QUFDQUQsY0FBVSxDQUFDSyxTQUFYLENBQXFCSCxLQUFyQixFQWhDa0MsQ0FpQ2xDO0FBQ0E7O0FBQ0FGLGNBQVUsQ0FBQ1MsSUFBWCxDQUFnQjNFLEdBQWhCO0FBQ0FrRSxjQUFVLENBQUNVLEtBQVg7QUFDSCxHQXJDRDtBQXNDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RUQ7QUFHQTs7Ozs7Ozs7OztJQVNNQyxLOzs7OztBQUNGLGlCQUFhQyxJQUFiLEVBQW1CN0UsQ0FBbkIsRUFBc0JDLENBQXRCLEVBQTRGO0FBQUE7O0FBQUEsUUFBbkUwQixHQUFtRSx1RUFBL0QsSUFBK0Q7QUFBQSxRQUF6RDVCLEdBQXlELHVFQUFyRCxJQUFxRDtBQUFBLFFBQS9DUixLQUErQyx1RUFBekMsSUFBeUM7QUFBQSxRQUFuQ3VGLFdBQW1DLHVFQUFyQixDQUFxQjtBQUFBLFFBQWxCQyxZQUFrQix1RUFBSCxDQUFHOztBQUFBOztBQUN4RiwrRUFBTUYsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLFFBQW5CO0FBRUEsVUFBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxVQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLElBQWpCLENBUHdGLENBU3hGOztBQUNBLFVBQUs3RixLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLdUYsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQVp3RjtBQWEzRjtBQUVEOzs7Ozs2QkFDVTtBQUNOO0FBQ0g7QUFFRDs7Ozs4QkFDVS9FLEMsRUFBR0MsQyxFQUFHO0FBQ1osV0FBS0QsQ0FBTCxJQUFVQSxDQUFWO0FBQ0EsV0FBS3FGLE1BQUwsSUFBZXJGLENBQWY7QUFDQSxXQUFLQyxDQUFMLElBQVVBLENBQVY7QUFDQSxXQUFLcUYsTUFBTCxJQUFlckYsQ0FBZjtBQUNIOzs7NkJBRTRCO0FBQUEsVUFBdEJzRixXQUFzQix1RUFBUixDQUFDLENBQUQsRUFBSSxDQUFKLENBQVE7QUFDekIsV0FBS3ZGLENBQUwsR0FBU3VGLFdBQVcsQ0FBQyxDQUFELENBQXBCO0FBQ0EsV0FBS0YsTUFBTCxHQUFjRSxXQUFXLENBQUMsQ0FBRCxDQUF6QjtBQUNBLFdBQUt0RixDQUFMLEdBQVNzRixXQUFXLENBQUMsQ0FBRCxDQUFwQjtBQUNBLFdBQUtELE1BQUwsR0FBY0MsV0FBVyxDQUFDLENBQUQsQ0FBekI7QUFDSDs7OztFQWxDZSx3Qzs7QUFvQ0wsK0RBQUFYLEtBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERBO0NBU0E7O0lBQ01ZLEk7Ozs7O0FBRUYsZ0JBQVlYLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFDa0U7QUFBQTs7QUFBQSxRQUQxQzBCLEdBQzBDLHVFQURwQyxJQUNvQztBQUFBLFFBRDlCNUIsR0FDOEIsdUVBRHhCLElBQ3dCO0FBQUEsUUFEbEJSLEtBQ2tCLHVFQURWLENBQ1U7QUFBQSxRQURQdUYsV0FDTyx1RUFETyxFQUNQO0FBQUEsUUFEV0MsWUFDWCx1RUFEMEIsRUFDMUI7QUFBQSxRQUQ4QjdFLFdBQzlCLHVFQUQ0QyxLQUM1QztBQUFBLFFBQWhDdUYsU0FBZ0MsdUVBQXBCLENBQW9CO0FBQUEsUUFBakJDLFNBQWlCLDBFQUFMLENBQUMsRUFBSTs7QUFBQTs7QUFDOUQsOEVBQU1iLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLaUYsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFVBQUtTLFNBQUwsR0FBaUJBLFNBQWpCO0FBRUEsVUFBS2xHLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUt1RixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBRUEsVUFBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLOEUsV0FBVyxHQUFHdkYsS0FBZixHQUF3QixDQUE3QixHQUFrQ3VGLFdBQWpEO0FBQ0EsVUFBS2MsVUFBTCxHQUFrQixNQUFLckcsS0FBTCxHQUFhLEVBQS9CO0FBQ0EsVUFBS3NHLFdBQUwsR0FBbUIsTUFBS3RHLEtBQUwsR0FBYSxFQUFoQztBQUNBLFVBQUs4RixNQUFMLEdBQWMsTUFBS00sT0FBTCxHQUFnQixNQUFLQyxVQUFMLEdBQWtCLENBQWhEO0FBQ0EsVUFBS04sTUFBTCxHQUFjLE1BQUtyRixDQUFMLEdBQVMsTUFBSzRGLFdBQWQsR0FBNEIsRUFBMUMsQ0FiOEQsQ0FlOUQ7O0FBQ0EsVUFBS0MsV0FBTCxDQUFpQixDQUFqQixJQUFzQixHQUF0QjtBQUNBLFVBQUtBLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsR0FBdEI7QUFDQSxVQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFVBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxVQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLFVBQUtULFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsVUFBS1UsUUFBTCxHQUFnQixHQUFoQjtBQUVBLFVBQUtsQixNQUFMLEdBQWM7QUFDVixnQkFBVSxLQURBO0FBRVYsbUJBQWEsSUFGSDtBQUdWLG9CQUFjLEtBSEo7QUFJVixvQkFBYyxLQUpKO0FBS1YsbUJBQWEsS0FMSDtBQU1WLGtCQUFZLEtBTkY7QUFPVixtQkFBYSxLQVBIO0FBUVYscUJBQWVoRjtBQVJMLEtBQWQ7QUFVQSxVQUFLaUYsVUFBTCxHQUFrQjtBQUNkLGdCQUFVLElBQUksa0RBQUosQ0FBYyxNQUFLeEQsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxJQUFsRSxFQUF3RSxNQUFLeEYsS0FBN0UsRUFBb0YsRUFBcEYsQ0FESTtBQUVkLGtCQUFZLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxJQUFsRSxFQUF3RSxNQUFLeEYsS0FBN0UsRUFBb0YsRUFBcEYsQ0FGRTtBQUdkLGtCQUFZLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxJQUFsRSxFQUF3RSxNQUFLeEYsS0FBN0UsRUFBb0YsRUFBcEYsQ0FIRTtBQUlkLGlCQUFXLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QixFQUFrQyxDQUFsQyxFQUFxQyxFQUFyQyxFQUF5QyxDQUF6QyxFQUE0QyxDQUE1QyxFQUErQyxLQUEvQyxFQUFzRCxNQUFLcEMsS0FBTCxHQUFhLENBQW5FLEVBQXNFLEVBQXRFO0FBSkcsS0FBbEI7O0FBTUEsUUFBSSxNQUFLMkYsTUFBTCxDQUFZaEYsV0FBaEIsRUFBNkI7QUFBRSxZQUFLK0UsTUFBTCxHQUFjLENBQWQ7QUFBa0IsS0FBakQsTUFBdUQ7QUFBRSxZQUFLQSxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQW1COztBQUM1RSxVQUFLRyxTQUFMLEdBQWlCLE1BQUtELFVBQUwsQ0FBZ0JrQixNQUFqQztBQTNDOEQ7QUE0Q2pFOzs7OzZCQUVRO0FBQ0wsVUFBSSxLQUFLbkIsTUFBTCxDQUFZb0IsU0FBaEIsRUFBMkI7QUFDdkIsYUFBS0MsU0FBTCxDQUFlLEtBQUt0QixNQUFMLEdBQVksS0FBS1EsU0FBaEMsRUFBMkMsQ0FBM0M7QUFDSDs7QUFDRCxVQUFJLEtBQUtQLE1BQUwsQ0FBWXNCLFVBQWhCLEVBQTRCO0FBQ3hCLGFBQUtELFNBQUwsQ0FBZSxLQUFLdEIsTUFBTCxHQUFjLEtBQUtRLFNBQWxDLEVBQTZDLENBQTdDOztBQUNBLFlBQUksS0FBS0wsU0FBTCxDQUFldkYsS0FBZixHQUF1QixLQUFLcUcsU0FBaEMsRUFBMkM7QUFDdkMsZUFBS2QsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVlzQixVQUFaLEdBQXlCLEtBQXpCO0FBQ0EsZUFBS3RCLE1BQUwsQ0FBWXdCLFVBQVosR0FBeUIsSUFBekI7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS3hCLE1BQUwsQ0FBWXdCLFVBQWhCLEVBQTRCO0FBQ3hCO0FBQ0E7QUFDQSxZQUFJLEtBQUsxRyxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBeEIsR0FBNEIsQ0FBaEMsRUFBbUM7QUFDL0IsZUFBS2tGLE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsSUFBMUI7QUFDQSxlQUFLK0UsTUFBTCxHQUFjLENBQWQ7QUFDSCxTQUhELE1BSUs7QUFDRCxlQUFLQyxNQUFMLENBQVloRixXQUFaLEdBQTBCLEtBQTFCO0FBQ0EsZUFBSytFLE1BQUwsR0FBYyxDQUFDLENBQWY7QUFDSDs7QUFDRCxZQUFJLEtBQUtHLFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsS0FBS3NHLE9BQWhDLEVBQXlDO0FBQ3JDO0FBQ0EsZUFBS2YsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVl3QixVQUFaLEdBQXlCLEtBQXpCO0FBQ0EsZUFBS3hCLE1BQUwsQ0FBWXlCLFNBQVosR0FBd0IsSUFBeEI7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS3pCLE1BQUwsQ0FBWXlCLFNBQWhCLEVBQTJCO0FBQ3ZCLFlBQUksQ0FBQyxLQUFLekIsTUFBTCxDQUFZMEIsUUFBakIsRUFBMkI7QUFDdkIsZUFBSzdCLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxlQUFLRCxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsZUFBS0ksTUFBTCxDQUFZaEYsV0FBWixHQUEwQixJQUExQjtBQUNBLGVBQUtGLENBQUwsSUFBVSxJQUFJLEtBQUs4RSxXQUFULEdBQXVCLEVBQWpDO0FBQ0EsZUFBSzdFLENBQUwsSUFBVSxFQUFWO0FBQ0EsY0FBSTRHLFVBQVUsR0FBRyxHQUFqQjtBQUNBLGNBQUlDLFVBQVUsR0FBRyxHQUFqQjtBQUNBLGVBQUtqQyxJQUFMLENBQVVrQyxTQUFWLENBQW9CLGFBQXBCO0FBQ0EsY0FBSUMsT0FBTyxHQUFHLElBQUkseUNBQUosQ0FBWSxLQUFLbkMsSUFBakIsRUFBdUIsS0FBSzlFLEdBQTVCLEVBQWlDLEtBQUtzRixNQUF0QyxFQUE4QyxLQUFLQyxNQUFuRCxFQUEyRCxDQUFDLElBQUQsR0FBUXVCLFVBQVIsR0FBcUIsRUFBaEYsRUFBb0YsS0FBSzlCLFlBQUwsR0FBb0IsRUFBeEcsRUFDVixLQUFLRCxXQURLLEVBQ1EsS0FBS0MsWUFEYixFQUMyQjhCLFVBRDNCLEVBQ3VDQyxVQUR2QyxFQUNtRCxLQUFLdkgsS0FBTCxHQUFhLENBRGhFLEVBQ21Fa0IsSUFBSSxDQUFDd0csR0FBTCxDQUFTLENBQVQsRUFBWSxLQUFLakIsTUFBakIsQ0FEbkUsRUFDNkYsS0FBS2QsTUFBTCxDQUFZaEYsV0FEekcsRUFDc0gsQ0FBQyxLQUFLZ0YsTUFBTCxDQUFZZ0MsU0FEbkksRUFDOEksUUFEOUksRUFDd0osRUFEeEosQ0FBZDtBQUVBRixpQkFBTyxDQUFDRyxNQUFSLEdBQWlCLEtBQUtDLElBQXRCO0FBQ0EsZUFBS3ZDLElBQUwsQ0FBVVAsU0FBVixDQUFvQjBDLE9BQXBCO0FBQ0EsZUFBSzlCLE1BQUwsQ0FBWTBCLFFBQVosR0FBdUIsSUFBdkI7QUFDSDs7QUFDRCxZQUFJLEtBQUt4QixTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIsZUFBS2tILGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOztBQUVELFVBQUksQ0FBQyxLQUFLbkMsTUFBTCxDQUFZeUIsU0FBakIsRUFBNEI7QUFDeEIsYUFBS2pCLFNBQUwsSUFBa0IsS0FBSzRCLE9BQUwsR0FBZSxLQUFLQSxPQUF0QztBQUNBLGFBQUtDLFVBQUwsR0FBa0IsS0FBS2pDLE1BQXZCO0FBQ0EsYUFBS2lCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQUtiLFNBQXZCO0FBQ0g7O0FBRUQsVUFBSSxLQUFLSyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsYUFBS3NCLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOzs7eUJBRUl0SCxHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVlvQixTQUFoQixFQUEyQjtBQUN2QixhQUFLbEIsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCa0IsTUFBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUtuQixNQUFMLENBQVlzQixVQUFoQixFQUE0QjtBQUN4QixhQUFLcEIsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCcUMsUUFBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUt0QyxNQUFMLENBQVl3QixVQUFoQixFQUE0QjtBQUN4QixhQUFLdEIsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCc0MsUUFBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUt2QyxNQUFMLENBQVl5QixTQUFoQixFQUEyQjtBQUN2QixhQUFLdkIsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCdUMsT0FBakM7QUFDSDs7QUFDRCxXQUFLQyxPQUFMLENBQWE1SCxHQUFiO0FBQ0g7OztpQ0FFWTZILE0sRUFBUUMsTyxFQUFTQyxNLEVBQVFDLE8sRUFBUztBQUMzQyxXQUFLcEMsT0FBTCxHQUFlLEtBQUszRixDQUFMLEdBQVc0SCxNQUFNLEdBQUcsS0FBS3JJLEtBQWYsR0FBd0IsQ0FBbEMsR0FBdUNxSSxNQUF0RDtBQUNBLFdBQUtoQyxVQUFMLEdBQWtCLEtBQUtyRyxLQUFMLEdBQWF1SSxNQUEvQjtBQUNBLFdBQUtqQyxXQUFMLEdBQW1CLEtBQUt0RyxLQUFMLEdBQWF3SSxPQUFoQztBQUNBLFdBQUsxQyxNQUFMLEdBQWMsS0FBS00sT0FBTCxHQUFlLEtBQUtDLFVBQUwsR0FBa0IsQ0FBL0M7QUFDQSxXQUFLTixNQUFMLEdBQWMsS0FBS3JGLENBQUwsR0FBUyxLQUFLNEYsV0FBNUI7QUFDSDs7OzZCQUVRbUMsSyxFQUFPQyxTLEVBQVc7QUFDdkI7QUFDQSxVQUFJRCxLQUFLLENBQUNaLElBQU4sS0FBZSxTQUFuQixFQUE4QjtBQUMxQjtBQUNBLFlBQUlhLFNBQVMsS0FBSyxRQUFkLElBQTBCLENBQUMsS0FBSy9DLE1BQUwsQ0FBWXlCLFNBQTNDLEVBQXNEO0FBQ2xELGVBQUtyQixNQUFMLEdBQWMwQyxLQUFLLENBQUMxQyxNQUFOLEdBQWUsS0FBS08sV0FBbEM7QUFDQSxlQUFLNUYsQ0FBTCxHQUFTLEtBQUtxRixNQUFMLEdBQWMsS0FBS08sV0FBbkIsR0FBaUMsRUFBMUM7QUFDQSxlQUFLSCxTQUFMLEdBQWlCLENBQWpCOztBQUNBLGNBQUksS0FBS0QsU0FBTCxHQUFpQixDQUFyQixFQUF3QjtBQUNwQixnQkFBSSxLQUFLUCxNQUFMLENBQVloRixXQUFoQixFQUE2QjtBQUN6QixtQkFBS3VGLFNBQUwsSUFBa0IsS0FBS1IsTUFBTCxHQUFjLEtBQUtRLFNBQW5CLEdBQStCLEtBQUtXLFFBQXREO0FBQ0gsYUFGRCxNQUdLO0FBQ0QsbUJBQUtYLFNBQUwsSUFBa0IsS0FBS1IsTUFBTCxHQUFjLEtBQUtRLFNBQW5CLEdBQStCLEtBQUtXLFFBQXREO0FBQ0g7QUFDSjs7QUFDRCxjQUFJLEtBQUtsQixNQUFMLENBQVlvQixTQUFoQixFQUEyQjtBQUN2QixpQkFBS2xCLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWW9CLFNBQVosR0FBd0IsS0FBeEI7QUFDQSxpQkFBS3BCLE1BQUwsQ0FBWXNCLFVBQVosR0FBeUIsSUFBekI7QUFDSDtBQUNKLFNBakJELE1Ba0JLLElBQUl5QixTQUFTLEtBQUssS0FBbEIsRUFBeUI7QUFDMUIsZUFBSzNDLE1BQUwsR0FBYzBDLEtBQUssQ0FBQzFDLE1BQU4sR0FBZTBDLEtBQUssQ0FBQ25DLFdBQW5DO0FBQ0EsZUFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBTCxHQUFjLEtBQUtPLFdBQW5CLEdBQWlDLEVBQTFDO0FBQ0EsZUFBS0gsU0FBTCxHQUFpQixDQUFqQjtBQUNBLGVBQUs2QixVQUFMLEdBQWtCLEtBQUtqQyxNQUF2QjtBQUNILFNBTEksTUFNQSxJQUFJMkMsU0FBUyxLQUFLLE1BQWxCLEVBQTBCO0FBQzNCLGVBQUs1QyxNQUFMLEdBQWMyQyxLQUFLLENBQUMzQyxNQUFOLEdBQWUyQyxLQUFLLENBQUNwQyxVQUFuQztBQUNBLGVBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQWQ7QUFDSCxTQUhJLE1BSUEsSUFBSTRDLFNBQVMsS0FBSyxPQUFsQixFQUEyQjtBQUM1QixlQUFLNUMsTUFBTCxHQUFjMkMsS0FBSyxDQUFDM0MsTUFBTixHQUFlLEtBQUtPLFVBQWxDO0FBQ0EsZUFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBZDtBQUNIO0FBQ0o7O0FBQ0QsVUFBSTJDLEtBQUssQ0FBQ1osSUFBTixLQUFlLFlBQW5CLEVBQWlDO0FBQzdCLGFBQUtsQyxNQUFMLENBQVlvQixTQUFaLEdBQXdCLEtBQXhCLEVBQ0EsS0FBS3BCLE1BQUwsQ0FBWXNCLFVBQVosR0FBeUIsS0FEekI7QUFFQSxhQUFLdEIsTUFBTCxDQUFZd0IsVUFBWixHQUF5QixLQUF6QjtBQUNBLGFBQUt4QixNQUFMLENBQVl5QixTQUFaLEdBQXdCLElBQXhCO0FBQ0EsYUFBS1csT0FBTCxHQUFlLENBQWY7QUFDQSxhQUFLNUIsU0FBTCxHQUFpQixDQUFqQjtBQUNIOztBQUNELFVBQUlzQyxLQUFLLENBQUNaLElBQU4sS0FBZSxTQUFuQixFQUE4QjtBQUMxQixZQUFJLENBQUNZLEtBQUssQ0FBQ0UsT0FBWCxFQUFvQjtBQUNoQjtBQUNJO0FBQ0o7QUFDQSxlQUFLaEQsTUFBTCxDQUFZb0IsU0FBWixHQUF3QixLQUF4QixFQUNBLEtBQUtwQixNQUFMLENBQVlzQixVQUFaLEdBQXlCLEtBRHpCO0FBRUEsZUFBS3RCLE1BQUwsQ0FBWXdCLFVBQVosR0FBeUIsS0FBekI7QUFDQSxlQUFLeEIsTUFBTCxDQUFZeUIsU0FBWixHQUF3QixJQUF4QjtBQUNBLGVBQUtXLE9BQUwsR0FBZSxDQUFmO0FBQ0EsZUFBSzVCLFNBQUwsR0FBaUIsQ0FBakI7QUFDSDtBQUNKO0FBQ0o7OztnQ0FFVzNGLEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7NEJBRU94SSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUFsTmMsdUM7O0FBcU5KLCtEQUFBeUYsSUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTkE7QUFDQTs7SUFXTW1ELE07Ozs7O0FBRUYsa0JBQVk5RCxJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQTZHO0FBQUE7O0FBQUEsUUFBckYwQixHQUFxRix1RUFBL0UsSUFBK0U7QUFBQSxRQUF6RTVCLEdBQXlFLHVFQUFuRSxJQUFtRTtBQUFBLFFBQTdEUixLQUE2RCx1RUFBckQsQ0FBcUQ7QUFBQSxRQUFsRFcsV0FBa0Q7QUFBQSxRQUFyQzRFLFdBQXFDLHVFQUF2QixFQUF1QjtBQUFBLFFBQW5CQyxZQUFtQix1RUFBSixFQUFJOztBQUFBOztBQUN6RyxnRkFBTUYsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsVUFBSzRELGFBQUwsR0FBcUIsQ0FBckI7O0FBQ0EsUUFBSTFJLFdBQUosRUFBaUI7QUFBRSxZQUFLRixDQUFMLElBQVUsR0FBVjtBQUFnQixLQUFuQyxNQUF5QztBQUFFLFlBQUtBLENBQUwsSUFBVSxHQUFWO0FBQWU7O0FBQUEsS0FKK0MsQ0FJOUM7O0FBQzNELFVBQUtULEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUt1RixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBRUEsVUFBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLOEUsV0FBVyxHQUFHdkYsS0FBZixHQUF3QixDQUE3QixHQUFrQ3VGLFdBQWpEO0FBQ0EsVUFBS2MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxVQUFLUCxNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBUyxNQUFLNEYsV0FBZCxHQUE2QixNQUFLZCxZQUFsQyxHQUFrRCxDQUFoRTs7QUFDQSxRQUFJLENBQUM3RSxXQUFMLEVBQWtCO0FBQ2QsWUFBS21GLE1BQUwsR0FBYyxNQUFLTSxPQUFMLEdBQWdCLE1BQUtDLFVBQUwsR0FBa0IsQ0FBbEMsR0FBdUMsSUFBRSxNQUFLZCxXQUE1RCxDQURjLENBQzJEO0FBQzVFLEtBRkQsTUFHSztBQUNELFlBQUtPLE1BQUwsR0FBYyxNQUFLTSxPQUFMLEdBQWdCLE1BQUtDLFVBQUwsR0FBa0IsQ0FBbEMsR0FBdUMsSUFBRSxNQUFLZCxXQUE1RDtBQUNILEtBbEJ3RyxDQW9Cekc7OztBQUNBLFVBQUtrQixNQUFMLEdBQWMsQ0FBZDtBQUNBLFVBQUtELE1BQUwsR0FBYyxHQUFkO0FBRUEsVUFBS2IsTUFBTCxHQUFjO0FBQ1YsZ0JBQVUsSUFEQTtBQUVWLHFCQUFlaEY7QUFGTCxLQUFkO0FBSUEsVUFBS2lGLFVBQUwsR0FBa0I7QUFDZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsTUFBS3hELEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsRUFBNUQsRUFBZ0UsQ0FBaEUsRUFBbUUsSUFBbkUsRUFBeUUsTUFBS3hGLEtBQTlFLEVBQXFGLEVBQXJGO0FBREksS0FBbEI7QUFHQSxVQUFLNkYsU0FBTCxHQUFpQixNQUFLRCxVQUFMLENBQWdCMEQsTUFBakM7QUEvQnlHO0FBZ0M1Rzs7Ozs2QkFFUTtBQUNMO0FBRUEsVUFBSSxLQUFLM0QsTUFBTCxDQUFZNEQsTUFBaEIsRUFBd0I7QUFDcEIsWUFBSSxLQUFLNUQsTUFBTCxDQUFZaEYsV0FBaEIsRUFBNkI7QUFDekIsZUFBS0YsQ0FBTCxJQUFVLEtBQUs0SSxhQUFmO0FBQ0EsZUFBS3ZELE1BQUwsSUFBZSxLQUFLdUQsYUFBcEIsQ0FGeUIsQ0FHekI7QUFDQTtBQUNILFNBTEQsTUFLTztBQUNILGVBQUs1SSxDQUFMLElBQVUsS0FBSzRJLGFBQWY7QUFDQSxlQUFLdkQsTUFBTCxJQUFlLEtBQUt1RCxhQUFwQjtBQUNIOztBQUNELFlBQUksS0FBS3hELFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsZUFBS3VGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLdkIsTUFBTCxDQUFZNkQsTUFBWixHQUFxQixLQUFyQjtBQUNBLGVBQUsxQixlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSjtBQUNKOzs7eUJBRUl0SCxHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVk0RCxNQUFoQixFQUF3QjtBQUNwQixhQUFLMUQsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCMEQsTUFBakM7QUFDSDs7QUFDRCxXQUFLbEIsT0FBTCxDQUFhNUgsR0FBYjtBQUNIOzs7NkJBRVFpSSxLLEVBQU9DLFMsRUFBVztBQUN2QjtBQUNBLFVBQUlELEtBQUssQ0FBQ1osSUFBTixLQUFlLFNBQWYsSUFBNEJZLEtBQUssQ0FBQ1osSUFBTixLQUFlLFFBQTNDLElBQXVEWSxLQUFLLENBQUNaLElBQU4sS0FBZSxNQUExRSxFQUFrRjtBQUM5RSxhQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0gsT0FGRCxNQUdLLElBQUlXLEtBQUssQ0FBQ1osSUFBTixLQUFlLFlBQW5CLEVBQWlDO0FBQ2xDLGFBQUtyQixNQUFMLElBQWVpQyxLQUFLLENBQUNoQyxNQUFyQjtBQUNILE9BRkksTUFHQSxJQUFJZ0MsS0FBSyxDQUFDWixJQUFOLEtBQWUsU0FBbkIsRUFBOEI7QUFDL0I7QUFDQTtBQUNBLFlBQUksQ0FBQ1ksS0FBSyxDQUFDRSxPQUFYLEVBQW9CO0FBQ2hCLGVBQUtiLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOztBQUNELFVBQUlXLEtBQUssQ0FBQ1osSUFBTixLQUFlLFlBQW5CLEVBQWlDO0FBQzdCLGFBQUtsQyxNQUFMLENBQVloRixXQUFaLEdBQTBCLENBQUMsS0FBS2dGLE1BQUwsQ0FBWWhGLFdBQXZDO0FBQ0EsYUFBS2tILElBQUwsR0FBWSxZQUFaO0FBQ0EsYUFBS3JCLE1BQUwsR0FBYyxDQUFkO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLEdBQWQ7QUFDSDs7QUFDRCxVQUFJLEtBQUtvQixJQUFMLEtBQWMsWUFBbEIsRUFBZ0M7QUFDNUIsWUFBSVksS0FBSyxDQUFDWixJQUFOLEtBQWUsUUFBbkIsRUFBNkI7QUFDekJZLGVBQUssQ0FBQ1gsZUFBTixHQUF3QixJQUF4QjtBQUNBLGVBQUtBLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDs7QUFDRCxZQUFJVyxLQUFLLENBQUNoRCxXQUFOLEtBQXNCLE9BQTFCLEVBQW1DO0FBQy9CLGVBQUtxQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSjs7QUFDRCxVQUFJLEtBQUt0QixNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsYUFBS3NCLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOzs7aUNBRVlPLE0sRUFBUUMsTyxFQUFTQyxNLEVBQVFDLE8sRUFBUztBQUMzQyxXQUFLcEMsT0FBTCxHQUFlLEtBQUszRixDQUFMLEdBQVc0SCxNQUFNLEdBQUcsS0FBS3JJLEtBQWYsR0FBd0IsQ0FBbEMsR0FBdUNxSSxNQUF2QyxHQUFnRCxDQUEvRDtBQUNBLFdBQUtoQyxVQUFMLEdBQWtCLEtBQUtyRyxLQUFMLEdBQWF1SSxNQUEvQjtBQUNBLFdBQUtqQyxXQUFMLEdBQW1CLEtBQUt0RyxLQUFMLEdBQWF3SSxPQUFoQztBQUNBLFdBQUsxQyxNQUFMLEdBQWMsS0FBS00sT0FBTCxHQUFlLEtBQUtDLFVBQUwsR0FBa0IsQ0FBL0M7QUFDQSxXQUFLTixNQUFMLEdBQWMsS0FBS3JGLENBQUwsR0FBUyxLQUFLNEYsV0FBNUI7QUFDSDs7O2dDQUVXOUYsRyxFQUFLO0FBQ2JBLFNBQUcsQ0FBQ29JLFNBQUo7QUFDQXBJLFNBQUcsQ0FBQ3FJLFdBQUosR0FBa0IsT0FBbEI7QUFDQXJJLFNBQUcsQ0FBQ3NJLElBQUosQ0FBUyxLQUFLaEQsTUFBZCxFQUNJLEtBQUtDLE1BRFQsRUFFSSxLQUFLTSxVQUZULEVBRXFCLEtBQUtDLFdBRjFCO0FBR0E5RixTQUFHLENBQUN1SSxNQUFKO0FBQ0F2SSxTQUFHLENBQUN3SSxTQUFKO0FBQ0g7Ozs0QkFHT3hJLEcsRUFBSztBQUNULFdBQUtxRixTQUFMLENBQWVvRCxTQUFmLENBQXlCLENBQXpCLEVBQTRCekksR0FBNUIsRUFBaUMsS0FBS0MsQ0FBdEMsRUFBeUMsS0FBS0MsQ0FBOUMsRUFBaUQsS0FBS2lGLE1BQUwsQ0FBWWhGLFdBQTdEOztBQUNBLFVBQUksS0FBSzJFLElBQUwsQ0FBVTRELFNBQWQsRUFBeUI7QUFDckIsYUFBS0MsV0FBTCxDQUFpQjNJLEdBQWpCO0FBQ0g7QUFDSjs7OztFQTNIZ0IsdUM7O0FBOEhOLCtEQUFBNEksTUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSUE7QUFDQTtBQUdBOzs7Ozs7OztJQU9NSyxNOzs7OztBQUNGLGtCQUFZbkUsSUFBWixFQUFrQi9CLEtBQWxCLEVBQTBHO0FBQUE7O0FBQUEsUUFBakZtRyxLQUFpRix1RUFBM0UsQ0FBMkU7QUFBQSxRQUF4RXRILEdBQXdFLHVFQUFwRSxJQUFvRTtBQUFBLFFBQTlENUIsR0FBOEQsdUVBQTFELElBQTBEO0FBQUEsUUFBcEQyQyxXQUFvRDtBQUFBLFFBQXZDQyxZQUF1QztBQUFBLFFBQXpCdUcsVUFBeUI7QUFBQSxRQUFiQyxXQUFhOztBQUFBOztBQUN0RyxnRkFBTXRFLElBQU4sRUFBWS9CLEtBQVosRUFBbUJtRyxLQUFuQixFQUEwQnRILEdBQTFCLEVBQStCNUIsR0FBL0I7QUFDQSxVQUFLMkMsV0FBTCxHQUFtQkEsV0FBbkIsQ0FGc0csQ0FFdEU7O0FBQ2hDLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCLENBSHNHLENBR3BFOztBQUNsQyxVQUFLdUcsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLEdBQWY7QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBSzVHLFdBQUwsR0FBaUIsTUFBSzBHLE9BQWxDO0FBQ0EsVUFBS0csSUFBTCxHQUFZLE1BQUs1RyxZQUFMLEdBQW9CLE1BQUswRyxPQUF6QixHQUFtQyxHQUEvQztBQUNBLFVBQUtHLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLENBQWpCLENBWHNHLENBY3RHOztBQUNBLFVBQUtDLElBQUwsR0FBWTtBQUNSLGNBQVEsS0FEQTtBQUVSLG9CQUFjLEtBRk47QUFHUixrQkFBWSxLQUhKO0FBSVIsY0FBUSxJQUpBLENBT1o7O0FBUFksS0FBWjtBQVFBLFVBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUF2QnNHO0FBd0J6Rzs7OzsyQkFFT0MsRyxFQUFLO0FBQ1QsV0FBS0QsUUFBTCxHQUFnQkMsR0FBaEI7QUFDSDs7O3lCQUVJN0osRyxFQUFLO0FBQ047QUFDQTtBQUNFQSxTQUFHLENBQUNhLFNBQUosQ0FBYyxLQUFLa0MsS0FBbkIsRUFBMEIsS0FBS21HLEtBQS9CO0FBRUw7Ozs2QkFHUTtBQUNMO0FBQ0EsVUFBSSxLQUFLVSxRQUFMLElBQWlCLElBQXJCLEVBQTJCO0FBQ3ZCLGFBQUtFLFlBQUwsR0FEdUIsQ0FFdkI7O0FBQ0EsYUFBSy9HLEtBQUwsR0FBYSxDQUFDLEtBQUs2RyxRQUFMLENBQWMzSixDQUFmLEdBQW1CLEtBQUtzSixJQUFyQztBQUNBLGFBQUtMLEtBQUwsR0FBYSxDQUFDLEtBQUtVLFFBQUwsQ0FBYzFKLENBQWYsR0FBbUIsS0FBS3NKLElBQXJDO0FBQ0gsT0FQSSxDQVNKO0FBQ0E7QUFDQTtBQUNBOztBQUVKOzs7bUNBRWM7QUFDWCxVQUFJLEVBQUUsS0FBS0QsSUFBTCxLQUFjLEtBQUs1RyxXQUFMLEdBQW1CLEtBQUswRyxPQUF4QyxDQUFKLEVBQXNEO0FBQ2xELFlBQUksS0FBS0UsSUFBTCxHQUFZLEVBQVosR0FBaUI3SSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLZ0MsV0FBTCxHQUFtQixLQUFLMEcsT0FBbkMsQ0FBckIsRUFBa0U7QUFBRSxlQUFLRSxJQUFMLElBQWEsS0FBS0UsU0FBbEI7QUFBOEIsU0FBbEcsTUFDSyxJQUFJLEtBQUtGLElBQUwsR0FBWSxFQUFaLEdBQWlCN0ksSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS2dDLFdBQUwsR0FBbUIsS0FBSzBHLE9BQW5DLENBQXJCLEVBQWtFO0FBQUUsZUFBS0UsSUFBTCxJQUFhLEtBQUtFLFNBQWxCO0FBQThCLFNBQWxHLE1BQ0MsS0FBS0YsSUFBTCxHQUFZLEtBQUs1RyxXQUFMLEdBQW1CLEtBQUswRyxPQUFyQztBQUNSOztBQUNELFVBQUksRUFBRSxLQUFLRyxJQUFMLEtBQWMsS0FBSzVHLFlBQUwsR0FBb0IsS0FBSzBHLE9BQXpDLENBQUosRUFBdUQ7QUFDbkQsWUFBSSxLQUFLRSxJQUFMLEdBQVksRUFBWixHQUFpQjlJLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtpQyxZQUFMLEdBQW9CLEtBQUswRyxPQUFwQyxDQUFyQixFQUFtRTtBQUFFLGVBQUtFLElBQUwsSUFBYSxLQUFLRSxTQUFsQjtBQUE4QixTQUFuRyxNQUNLLElBQUksS0FBS0YsSUFBTCxHQUFZLEVBQVosR0FBaUI5SSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLaUMsWUFBTCxHQUFvQixLQUFLMEcsT0FBcEMsQ0FBckIsRUFBbUU7QUFBRSxlQUFLRSxJQUFMLElBQWEsS0FBS0UsU0FBbEI7QUFBOEIsU0FBbkcsTUFDQyxLQUFLRixJQUFMLEdBQVksS0FBSzVHLFlBQUwsR0FBb0IsS0FBSzBHLE9BQXRDO0FBQ1I7QUFDSjs7O2dDQUVXUyxHLEVBQUtDLEcsRUFBSzlDLEcsRUFBSztBQUN2QixhQUFPeEcsSUFBSSxDQUFDc0osR0FBTCxDQUFTdEosSUFBSSxDQUFDd0csR0FBTCxDQUFTNkMsR0FBVCxFQUFjQyxHQUFkLENBQVQsRUFBNkI5QyxHQUE3QixDQUFQO0FBQ0g7Ozs7RUF0RWdCLCtDOztBQXlFTiwrREFBQStCLE1BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7O0lBVU1nQixJOzs7OztBQUVGLGdCQUFZbkYsSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUNtSDtBQUFBOztBQUFBLFFBRDNGMEIsR0FDMkYsdUVBRHJGLElBQ3FGO0FBQUEsUUFEL0U1QixHQUMrRSx1RUFEekUsSUFDeUU7QUFBQSxRQURuRVIsS0FDbUUsdUVBRDNELENBQzJEO0FBQUEsUUFEeER1RixXQUN3RCx1RUFEMUMsRUFDMEM7QUFBQSxRQUR0Q0MsWUFDc0MsdUVBRHZCLEVBQ3VCO0FBQUEsUUFBakZlLFdBQWlGLHVFQUFuRSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQW1FO0FBQUEsUUFBdkRtRSxZQUF1RCx1RUFBeEMsS0FBd0M7QUFBQSxRQUFqQ0MsWUFBaUMsMEVBQWxCLENBQUMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFELEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFULENBQWtCOztBQUFBOztBQUMvRyw4RUFBTXJGLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLaUYsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFVBQUt6RixLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLdUYsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUVBLFVBQUtZLE9BQUwsR0FBZTNGLENBQUMsR0FBSzhFLFdBQVcsR0FBR3ZGLEtBQWYsR0FBd0IsQ0FBN0IsR0FBa0N1RixXQUFqRDtBQUNBLFVBQUtjLFVBQUwsR0FBa0IsTUFBS3JHLEtBQUwsR0FBYSxFQUEvQjtBQUNBLFVBQUtzRyxXQUFMLEdBQW1CLE1BQUt0RyxLQUFMLEdBQWEsRUFBaEM7QUFDQSxVQUFLOEYsTUFBTCxHQUFjLE1BQUtNLE9BQUwsR0FBZ0IsTUFBS0MsVUFBTCxHQUFrQixDQUFoRDtBQUNBLFVBQUtOLE1BQUwsR0FBYyxNQUFLckYsQ0FBTCxHQUFTLE1BQUs0RixXQUE1QixDQVgrRyxDQWEvRzs7QUFDQSxVQUFLb0UsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLRSxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxVQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFVBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxVQUFLQyxNQUFMLEdBQWMsR0FBZDtBQUNBLFVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBRUEsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxVQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLFVBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxVQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsVUFBS0MsZUFBTCxHQUF1QixHQUF2QjtBQUNBLFVBQUtDLGdCQUFMO0FBQ0EsVUFBS0MsZ0JBQUw7O0FBQ0EsUUFBSSxNQUFLaEIsWUFBVCxFQUF1QjtBQUNuQixZQUFLaUIsUUFBTCxHQUFnQmhCLFlBQVksQ0FBQyxDQUFELENBQTVCO0FBQ0EsWUFBS2lCLFFBQUwsR0FBZ0JqQixZQUFZLENBQUMsQ0FBRCxDQUE1QjtBQUNIOztBQUVELFVBQUtwRSxXQUFMLENBQWlCLENBQWpCLElBQXNCQSxXQUFXLENBQUMsQ0FBRCxDQUFqQztBQUNBLFVBQUtBLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0JBLFdBQVcsQ0FBQyxDQUFELENBQWpDO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLEdBQWQ7QUFDQSxVQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFVBQUtmLE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS21HLElBQUwsR0FBWSxDQUFaO0FBR0EsVUFBS2xHLE1BQUwsR0FBYztBQUNWLGdCQUFVLElBREE7QUFFVixnQkFBVSxLQUZBO0FBR1YsbUJBQWEsS0FISDtBQUlWLHlCQUFtQixLQUpUO0FBS1Ysb0JBQWMsS0FMSjtBQU1WLGNBQVEsS0FORTtBQU9WLGdCQUFVLElBUEE7QUFRVixxQkFBZTtBQVJMLEtBQWQ7QUFVQSxVQUFLQyxVQUFMLEdBQWtCO0FBQ2QsYUFBTyxJQUFJLGtEQUFKLENBQWMsTUFBS3hELEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsSUFBbEUsRUFBd0UsTUFBS3hGLEtBQTdFLENBRE87QUFFZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsS0FBbEUsRUFBeUUsTUFBS3hGLEtBQTlFLEVBQXFGLENBQXJGLENBRkk7QUFHZCxzQkFBZ0IsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELEVBQXhELEVBQTRELENBQTVELEVBQStELENBQS9ELEVBQWtFLElBQWxFLEVBQXdFLE1BQUt4RixLQUE3RSxFQUFvRixDQUFwRixDQUhGO0FBSWQsY0FBUSxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsSUFBbEUsRUFBd0UsTUFBS3hGLEtBQTdFLEVBQW9GLEVBQXBGLENBSk0sQ0FLZDs7QUFMYyxLQUFsQjtBQU9BLFVBQUs2RixTQUFMLEdBQWlCLE1BQUtELFVBQUwsQ0FBZ0JrRyxHQUFqQztBQTdEK0c7QUE4RGxIOzs7OzZCQUVRO0FBQ0wsVUFBSSxDQUFDLEtBQUtuRyxNQUFMLENBQVlvRyxVQUFiLElBQTJCLENBQUMsS0FBS3BHLE1BQUwsQ0FBWXFHLGVBQTVDLEVBQTZEO0FBQ3pELFlBQUksS0FBS3ZMLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUF4QixHQUE0QixDQUFoQyxFQUFtQztBQUMvQixlQUFLa0YsTUFBTCxDQUFZaEYsV0FBWixHQUEwQixJQUExQjtBQUNBLGVBQUsrRSxNQUFMLEdBQWMsQ0FBZDtBQUNILFNBSEQsTUFJSyxJQUFJLENBQUMsS0FBS0MsTUFBTCxDQUFZb0csVUFBakIsRUFBNkI7QUFDOUIsZUFBS3BHLE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxlQUFLK0UsTUFBTCxHQUFjLENBQUMsQ0FBZjtBQUNIO0FBQ0o7O0FBQ0QsVUFBSSxLQUFLQyxNQUFMLENBQVlzRyxNQUFoQixFQUF3QjtBQUNwQixZQUFJL0ssSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsS0FBdUMsS0FBSzhGLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBdkMsSUFDT3JGLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLeEwsQ0FBTCxHQUFTLEtBQUs0RSxJQUFMLENBQVVYLElBQVYsQ0FBZWpFLENBQWpDLEtBQXVDLEtBQUs2RixXQUFMLENBQWlCLENBQWpCLENBRGxELEVBQ3VFO0FBQ25FO0FBQ0EsZUFBS1osTUFBTCxDQUFZc0csTUFBWixHQUFxQixLQUFyQixDQUZtRSxDQUduRTs7QUFDQSxlQUFLdEcsTUFBTCxDQUFZd0csTUFBWixHQUFxQixJQUFyQjs7QUFDQSxjQUFJLEtBQUt6QixZQUFULEVBQXVCO0FBQ25CLGdCQUFJMEIsTUFBTSxHQUFHLElBQUkzQixJQUFKLENBQVMsS0FBS25GLElBQWQsRUFBb0IsS0FBSzdFLENBQUwsR0FBUyxLQUFLa0wsUUFBTCxDQUFjLENBQWQsQ0FBN0IsRUFBK0MsS0FBS2pMLENBQUwsR0FBUyxLQUFLaUwsUUFBTCxDQUFjLENBQWQsQ0FBeEQsRUFBMEUsS0FBS3ZKLEdBQS9FLEVBQW9GLEtBQUs1QixHQUF6RixFQUE4RixLQUFLUixLQUFuRyxFQUEwRyxLQUFLdUYsV0FBL0csRUFBNEgsS0FBS0MsWUFBakksRUFBK0ksQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUEvSSxDQUFiO0FBQ0EsZ0JBQUk2RyxNQUFNLEdBQUcsSUFBSTVCLElBQUosQ0FBUyxLQUFLbkYsSUFBZCxFQUFvQixLQUFLN0UsQ0FBTCxHQUFTLEtBQUttTCxRQUFMLENBQWMsQ0FBZCxDQUE3QixFQUErQyxLQUFLbEwsQ0FBTCxHQUFTLEtBQUtrTCxRQUFMLENBQWMsQ0FBZCxDQUF4RCxFQUEwRSxLQUFLeEosR0FBL0UsRUFBb0YsS0FBSzVCLEdBQXpGLEVBQThGLEtBQUtSLEtBQW5HLEVBQTBHLEtBQUt1RixXQUEvRyxFQUE0SCxLQUFLQyxZQUFqSSxFQUErSSxDQUFDLElBQUQsRUFBTyxJQUFQLENBQS9JLENBQWI7QUFDQTRHLGtCQUFNLENBQUNFLEtBQVAsR0FBZSxLQUFLQSxLQUFwQjtBQUNBRixrQkFBTSxDQUFDRyxPQUFQLEdBQWlCLEtBQUtBLE9BQXRCO0FBQ0FGLGtCQUFNLENBQUNDLEtBQVAsR0FBZSxLQUFLQSxLQUFwQjtBQUNBRCxrQkFBTSxDQUFDRSxPQUFQLEdBQWlCLEtBQUtBLE9BQXRCO0FBQ0EsaUJBQUtqSCxJQUFMLENBQVVQLFNBQVYsQ0FBb0JxSCxNQUFwQjtBQUNBLGlCQUFLOUcsSUFBTCxDQUFVUCxTQUFWLENBQW9Cc0gsTUFBcEI7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsVUFBSSxLQUFLMUcsTUFBTCxDQUFZd0csTUFBaEIsRUFBd0I7QUFBRTtBQUN0QjtBQUNBLFlBQUssS0FBS3RCLE1BQUwsR0FBYyxLQUFLRSxJQUFuQixJQUEyQixLQUFLckYsTUFBTCxLQUFnQixDQUE1QyxJQUFtRCxLQUFLbUYsTUFBTCxHQUFjLENBQUMsS0FBS0UsSUFBcEIsSUFBNEIsS0FBS3JGLE1BQUwsS0FBZ0IsQ0FBQyxDQUFwRyxFQUF3RztBQUNwRyxlQUFLbUYsTUFBTCxJQUFlLEtBQUtuRixNQUFMLEdBQWMsS0FBS3VGLE1BQWxDO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLdkssQ0FBTCxHQUFTLEtBQUs0RSxJQUFMLENBQVVYLElBQVYsQ0FBZWpFLENBQXhCLElBQTZCLENBQUMsR0FBbEMsRUFBdUM7QUFDbkMsY0FBSSxLQUFLb0ssTUFBTCxHQUFjLENBQUMsS0FBS0UsSUFBeEIsRUFBOEI7QUFDMUIsaUJBQUtGLE1BQUwsSUFBZSxLQUFLSSxNQUFwQjtBQUNIOztBQUNELGVBQUt4SyxDQUFMLElBQVUsS0FBS29LLE1BQWY7QUFDQSxlQUFLL0UsTUFBTCxJQUFlLEtBQUsrRSxNQUFwQjtBQUNILFNBTkQsTUFPSyxJQUFJLEtBQUtwSyxDQUFMLEdBQVMsS0FBSzRFLElBQUwsQ0FBVVgsSUFBVixDQUFlakUsQ0FBeEIsSUFBNkIsQ0FBQyxHQUFsQyxFQUFzQztBQUN2QyxjQUFJLEtBQUtvSyxNQUFMLEdBQWMsS0FBS0UsSUFBdkIsRUFBNkI7QUFDekIsaUJBQUtGLE1BQUwsSUFBZSxLQUFLSSxNQUFwQjtBQUNIOztBQUNELGVBQUt4SyxDQUFMLElBQVUsS0FBS29LLE1BQWY7QUFDQSxlQUFLL0UsTUFBTCxJQUFlLEtBQUsrRSxNQUFwQjtBQUNILFNBbEJtQixDQW1CcEI7OztBQUNBLFlBQUk1SixJQUFJLENBQUNnTCxHQUFMLENBQVMsS0FBS3pMLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUFqQyxLQUF1QyxHQUF2QyxJQUE4QyxLQUFLa0YsTUFBTCxDQUFZNEQsTUFBOUQsRUFBc0U7QUFDbEUsZUFBSzlJLENBQUwsSUFBVSxLQUFLb0ssTUFBZjtBQUNBLGVBQUsvRSxNQUFMLElBQWUsS0FBSytFLE1BQXBCO0FBQ0gsU0FIRCxNQUlLLElBQUkzSixJQUFJLENBQUNnTCxHQUFMLENBQVMsS0FBS3pMLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUFqQyxLQUF1QyxHQUF2QyxJQUE4QyxLQUFLa0YsTUFBTCxDQUFZNEQsTUFBOUQsRUFBc0U7QUFDdkUsZUFBSzlJLENBQUwsSUFBVSxLQUFLb0ssTUFBZjtBQUNBLGVBQUsvRSxNQUFMLElBQWUsS0FBSytFLE1BQXBCO0FBQ0gsU0EzQm1CLENBNEJwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQSxZQUFJM0osSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsS0FBdUMsR0FBdkMsSUFDTyxLQUFLQyxDQUFMLEdBQVMsS0FBSzRFLElBQUwsQ0FBVVgsSUFBVixDQUFlakUsQ0FBeEIsR0FBNEIsQ0FBQyxHQURwQyxJQUM0QyxLQUFLQSxDQUFMLEdBQVMsS0FBSzRFLElBQUwsQ0FBVVgsSUFBVixDQUFlakUsQ0FBekIsR0FBOEIsQ0FBQyxHQUQxRSxJQUVPLEtBQUttRixTQUFMLENBQWV2RixLQUFmLEdBQXVCLENBRjlCLElBRW1DWSxJQUFJLENBQUNzTCxNQUFMLEtBQWdCLEdBQWhCLElBQXVCLEVBRjlELEVBRWtFO0FBQzlELGVBQUszRyxTQUFMLENBQWVxQixLQUFmO0FBQ0EsZUFBS3ZCLE1BQUwsQ0FBWThHLFNBQVosR0FBd0IsSUFBeEI7QUFDQSxlQUFLOUcsTUFBTCxDQUFZd0csTUFBWixHQUFxQixLQUFyQjtBQUNBLGVBQUtOLElBQUwsR0FBWTNLLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNzTCxNQUFMLEtBQWdCLENBQTNCLENBQVo7QUFDQSxlQUFLbEgsSUFBTCxDQUFVb0gsS0FBVixDQUFnQkMsSUFBaEIsQ0FBcUIsVUFBckI7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS2hILE1BQUwsQ0FBWThHLFNBQWhCLEVBQTJCO0FBQ3ZCLFlBQUksS0FBS1osSUFBTCxLQUFjLENBQWxCLEVBQXFCO0FBQ2pCO0FBQ0E7QUFDQSxlQUFLN0UsU0FBTCxDQUFlLENBQUMsS0FBS3RCLE1BQU4sR0FBZSxLQUFLMkYsT0FBcEIsR0FBNEIsQ0FBM0MsRUFBOEMsQ0FBQyxLQUFLRixZQUFwRDtBQUNILFNBSkQsTUFLSztBQUNEO0FBQ0E7QUFDQSxlQUFLbkUsU0FBTCxDQUFlLENBQUMsS0FBS3RCLE1BQU4sR0FBZSxLQUFLMkYsT0FBcEIsR0FBNEIsQ0FBM0MsRUFBOEMsQ0FBQyxLQUFLRCxZQUFwRDtBQUNILFNBVnNCLENBV3ZCO0FBQ0E7OztBQUVBLFlBQUksS0FBS3ZGLFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixlQUFLaUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVk4RyxTQUFaLEdBQXdCLEtBQXhCLENBRnlCLENBR3pCO0FBQ0E7QUFDQTs7QUFDQSxlQUFLOUcsTUFBTCxDQUFZcUcsZUFBWixHQUE4QixJQUE5QjtBQUNIO0FBQ0o7O0FBQ0QsVUFBSSxLQUFLckcsTUFBTCxDQUFZcUcsZUFBaEIsRUFBaUM7QUFDN0IsWUFBRyxLQUFLSCxJQUFMLEtBQWMsQ0FBakIsRUFBb0I7QUFDaEIsZUFBS25MLENBQUwsSUFBVSxLQUFLeUssWUFBZjtBQUNBLGVBQUtwRixNQUFMLElBQWUsS0FBS29GLFlBQXBCO0FBQ0gsU0FIRCxNQUlLO0FBQ0QsZUFBS3pLLENBQUwsSUFBVSxLQUFLMEssWUFBZjtBQUNBLGVBQUtyRixNQUFMLElBQWUsS0FBS3FGLFlBQXBCO0FBQ0g7O0FBQ0QsYUFBSzNLLENBQUwsSUFBVSxLQUFLaUYsTUFBTCxHQUFjLEtBQUsyRixPQUE3QjtBQUNBLGFBQUt2RixNQUFMLElBQWUsS0FBS0osTUFBTCxHQUFjLEtBQUsyRixPQUFsQyxDQVY2QixDQVc3QjtBQUdBOztBQUNBLFlBQUcsS0FBSzFGLE1BQUwsQ0FBWWhGLFdBQWYsRUFDSSxLQUFLMkUsSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUkseUNBQUosQ0FBWSxLQUFLTyxJQUFqQixFQUF1QixLQUFLOUUsR0FBNUIsRUFBaUMsS0FBS0MsQ0FBdEMsRUFBeUMsS0FBS0MsQ0FBOUMsRUFBaUQsQ0FBQyxFQUFsRCxFQUFzRCxFQUF0RCxFQUNoQixLQUFLNkUsV0FEVyxFQUNFLEtBQUtDLFlBRFAsRUFDcUIsRUFEckIsRUFDeUIsRUFEekIsRUFDNkIsS0FBS3hGLEtBRGxDLEVBQ3lDLENBRHpDLEVBQzRDLEtBQUsyRixNQUFMLENBQVloRixXQUR4RCxFQUNxRSxJQURyRSxDQUFwQixFQURKLEtBSUksS0FBSzJFLElBQUwsQ0FBVVAsU0FBVixDQUFvQixJQUFJLHlDQUFKLENBQVksS0FBS08sSUFBakIsRUFBdUIsS0FBSzlFLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELENBQUMsRUFBRCxHQUFNLEtBQUs2RSxXQUFYLEdBQXlCLEVBQTFFLEVBQThFLEVBQTlFLEVBQ2hCLEtBQUtBLFdBRFcsRUFDRSxLQUFLQyxZQURQLEVBQ3FCLEVBRHJCLEVBQ3lCLEVBRHpCLEVBQzZCLEtBQUt4RixLQURsQyxFQUN5QyxDQUR6QyxFQUM0QyxLQUFLMkYsTUFBTCxDQUFZaEYsV0FEeEQsRUFDcUUsSUFEckUsQ0FBcEIsRUFuQnlCLENBc0I3Qjs7QUFDQSxZQUFJLEtBQUtrRixTQUFMLENBQWV2RixLQUFmLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCLGVBQUtxRixNQUFMLENBQVlxRyxlQUFaLEdBQThCLEtBQTlCO0FBQ0EsZUFBS25HLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVlvRyxVQUFaLEdBQXlCLElBQXpCO0FBQ0g7QUFDSjs7QUFDRCxVQUFJLEtBQUtwRyxNQUFMLENBQVlvRyxVQUFoQixFQUE0QjtBQUFFO0FBQzFCO0FBQ0EsYUFBS3RMLENBQUwsSUFBVSxLQUFLaUYsTUFBTCxHQUFjLEtBQUs0RixRQUE3QjtBQUNBLGFBQUt4RixNQUFMLElBQWUsS0FBS0osTUFBTCxHQUFjLEtBQUs0RixRQUFsQztBQUNBLGFBQUs1SyxDQUFMLElBQVUsS0FBSzZLLFFBQWY7QUFDQSxhQUFLeEYsTUFBTCxJQUFlLEtBQUt3RixRQUFwQjs7QUFDQSxZQUFJckssSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsS0FBdUMsS0FBSytLLGVBQWhELEVBQWlFO0FBQzdELGVBQUs3RixNQUFMLENBQVlvRyxVQUFaLEdBQXlCLEtBQXpCO0FBQ0EsZUFBS3BHLE1BQUwsQ0FBWXdHLE1BQVosR0FBcUIsSUFBckI7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS3hHLE1BQUwsQ0FBWWlILElBQWhCLEVBQXNCO0FBQ2xCLFlBQUksS0FBS3BHLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUFFO0FBQ3BCLGNBQUl0RixJQUFJLENBQUNzTCxNQUFMLEtBQWdCLEVBQXBCLEVBQXdCO0FBQ3BCLGlCQUFLOUwsQ0FBTCxJQUFVUSxJQUFJLENBQUNzTCxNQUFMLEtBQWdCLENBQTFCO0FBQ0EsaUJBQUsvTCxDQUFMLElBQVVTLElBQUksQ0FBQ3NMLE1BQUwsS0FBZ0IsQ0FBMUI7QUFDSCxXQUhELE1BR087QUFDSCxpQkFBSzlMLENBQUwsSUFBVVEsSUFBSSxDQUFDc0wsTUFBTCxLQUFnQixDQUExQjtBQUNBLGlCQUFLL0wsQ0FBTCxJQUFVUyxJQUFJLENBQUNzTCxNQUFMLEtBQWdCLENBQTFCO0FBQ0g7QUFDSjs7QUFDRCxZQUFJLEtBQUszRyxTQUFMLENBQWV2RixLQUFmLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCO0FBQ0EsZUFBS3VGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLckIsU0FBTCxDQUFlcUIsS0FBZixHQUgwQixDQUkxQjs7QUFDQSxlQUFLdkIsTUFBTCxDQUFZaUgsSUFBWixHQUFtQixLQUFuQixDQUwwQixDQU0xQjs7QUFDQSxlQUFLakgsTUFBTCxDQUFZd0csTUFBWixHQUFxQixJQUFyQjtBQUNBLGVBQUt4RyxNQUFMLENBQVloRixXQUFaLEdBQTBCLENBQUMsS0FBS2dGLE1BQUwsQ0FBWWhGLFdBQXZDLENBUjBCLENBUzFCOztBQUNBLGVBQUtrTSxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCOztBQUNBLGNBQUksS0FBS3JHLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNsQixpQkFBS3NCLGVBQUwsR0FBdUIsSUFBdkI7O0FBQ0EsZ0JBQUk1RyxJQUFJLENBQUNzTCxNQUFMLEtBQWdCLEdBQWhCLElBQXVCLEVBQTNCLEVBQStCO0FBQzNCLG1CQUFLbEgsSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUksc0NBQUksQ0FBQytILFVBQVQsQ0FBb0IsS0FBS3hILElBQXpCLEVBQStCLEtBQUs3RSxDQUFwQyxFQUF1QyxLQUFLQyxDQUE1QyxFQUErQyxLQUFLNEUsSUFBTCxDQUFVVCxTQUFWLENBQW9Ca0ksWUFBcEIsQ0FBaUNqSixRQUFqQyxDQUEwQyxvQkFBMUMsQ0FBL0MsRUFBZ0gsS0FBS3RELEdBQXJILEVBQTBILEVBQTFILEVBQThILENBQTlILEVBQWlJLENBQWpJLEVBQW9JLENBQXBJLENBQXBCO0FBQ0EsbUJBQUs4RSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSxzQ0FBSSxDQUFDaUksVUFBVCxDQUFvQixLQUFLMUgsSUFBekIsRUFBK0IsS0FBSzdFLENBQUwsR0FBUyxFQUF4QyxFQUE0QyxLQUFLQyxDQUFqRCxFQUFvRCxLQUFLNEUsSUFBTCxDQUFVVCxTQUFWLENBQW9Ca0ksWUFBcEIsQ0FBaUNqSixRQUFqQyxDQUEwQyxvQkFBMUMsQ0FBcEQsRUFBcUgsS0FBS3RELEdBQTFILEVBQStILEVBQS9ILEVBQW1JLENBQW5JLEVBQXNJLENBQXRJLEVBQXlJLENBQXpJLENBQXBCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSjs7O3lCQUVJQSxHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVl3RyxNQUFaLElBQXNCLEtBQUt4RyxNQUFMLENBQVlzRyxNQUFsQyxJQUE0QyxLQUFLdEcsTUFBTCxDQUFZb0csVUFBNUQsRUFBd0U7QUFDcEUsYUFBS2xHLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQmtHLEdBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLbkcsTUFBTCxDQUFZOEcsU0FBaEIsRUFBMkI7QUFDdkIsYUFBSzVHLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQnFILE1BQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLdEgsTUFBTCxDQUFZcUcsZUFBaEIsRUFBaUM7QUFDN0IsYUFBS25HLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQnNILFlBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLdkgsTUFBTCxDQUFZaUgsSUFBaEIsRUFBc0I7QUFDbEIsYUFBSy9HLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQmdILElBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDLEtBQUtqSCxNQUFMLENBQVlzRyxNQUFqQixFQUF5QjtBQUNyQixhQUFLN0QsT0FBTCxDQUFhNUgsR0FBYjtBQUNIO0FBRUo7OztpQ0FFWTZILE0sRUFBUUMsTyxFQUFTQyxNLEVBQVFDLE8sRUFBUztBQUMzQyxXQUFLcEMsT0FBTCxHQUFlLEtBQUszRixDQUFMLEdBQVc0SCxNQUFNLEdBQUcsS0FBS3JJLEtBQWYsR0FBd0IsQ0FBbEMsR0FBdUNxSSxNQUF0RDtBQUNBLFdBQUtoQyxVQUFMLEdBQWtCLEtBQUtyRyxLQUFMLEdBQWF1SSxNQUEvQjtBQUNBLFdBQUtqQyxXQUFMLEdBQW1CLEtBQUt0RyxLQUFMLEdBQWF3SSxPQUFoQztBQUNBLFdBQUsxQyxNQUFMLEdBQWMsS0FBS00sT0FBTCxHQUFlLEtBQUtDLFVBQUwsR0FBa0IsQ0FBL0M7QUFDQSxXQUFLTixNQUFMLEdBQWMsS0FBS3JGLENBQUwsR0FBUyxLQUFLNEYsV0FBNUI7QUFDSDs7OzZCQUVRbUMsSyxFQUFPQyxTLEVBQVc7QUFDdkI7QUFDQSxVQUFJRCxLQUFLLENBQUNaLElBQU4sS0FBZ0IsU0FBcEIsRUFBK0IsQ0FDM0I7QUFDSDs7QUFDRCxVQUFJWSxLQUFLLENBQUNaLElBQU4sS0FBZ0IsWUFBaEIsSUFBZ0MsQ0FBQyxLQUFLbEMsTUFBTCxDQUFZaUgsSUFBN0MsSUFBcUQsQ0FBQyxLQUFLakgsTUFBTCxDQUFZc0csTUFBdEUsRUFBOEU7QUFDMUUsYUFBS3pGLE1BQUwsSUFBZWlDLEtBQUssQ0FBQ2hDLE1BQXJCO0FBQ0EsYUFBS2QsTUFBTCxDQUFZd0csTUFBWixHQUFxQixLQUFyQjtBQUNBLGFBQUt4RyxNQUFMLENBQVk4RyxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsYUFBSzlHLE1BQUwsQ0FBWXFHLGVBQVosR0FBOEIsS0FBOUI7QUFDQSxhQUFLckcsTUFBTCxDQUFZc0csTUFBWixHQUFxQixLQUFyQjtBQUNBLGFBQUt0RyxNQUFMLENBQVlpSCxJQUFaLEdBQW1CLElBQW5CO0FBQ0g7O0FBQ0QsVUFBSW5FLEtBQUssQ0FBQ1osSUFBTixLQUFnQixTQUFoQixJQUE2QixDQUFDLEtBQUtsQyxNQUFMLENBQVlpSCxJQUExQyxJQUFrRCxDQUFDLEtBQUtqSCxNQUFMLENBQVlzRyxNQUFuRSxFQUEyRTtBQUN2RSxZQUFJLENBQUN4RCxLQUFLLENBQUNFLE9BQVgsRUFBb0I7QUFDaEIsZUFBS25DLE1BQUwsSUFBZWlDLEtBQUssQ0FBQ2hDLE1BQXJCO0FBQ0EsZUFBS2QsTUFBTCxDQUFZd0csTUFBWixHQUFxQixLQUFyQjtBQUNBLGVBQUt4RyxNQUFMLENBQVk4RyxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsZUFBSzlHLE1BQUwsQ0FBWXFHLGVBQVosR0FBOEIsS0FBOUI7QUFDQSxlQUFLckcsTUFBTCxDQUFZc0csTUFBWixHQUFxQixLQUFyQjtBQUNBLGVBQUt0RyxNQUFMLENBQVlpSCxJQUFaLEdBQW1CLElBQW5CO0FBQ0g7QUFDSjtBQUNKOzs7Z0NBRVdwTSxHLEVBQUs7QUFDYkEsU0FBRyxDQUFDb0ksU0FBSjtBQUNBcEksU0FBRyxDQUFDcUksV0FBSixHQUFrQixPQUFsQjtBQUNBckksU0FBRyxDQUFDc0ksSUFBSixDQUFTLEtBQUtoRCxNQUFkLEVBQ0ksS0FBS0MsTUFEVCxFQUVJLEtBQUtNLFVBRlQsRUFFcUIsS0FBS0MsV0FGMUI7QUFHQTlGLFNBQUcsQ0FBQ3VJLE1BQUo7QUFDQXZJLFNBQUcsQ0FBQ3dJLFNBQUo7QUFDSDs7OzRCQUVPeEksRyxFQUFLO0FBQ1QsVUFBSSxLQUFLbUYsTUFBTCxDQUFZNEQsTUFBaEIsRUFBd0I7QUFDcEIsYUFBSzFELFNBQUwsQ0FBZW9ELFNBQWYsQ0FBeUIsQ0FBekIsRUFBNEJ6SSxHQUE1QixFQUFpQyxLQUFLQyxDQUF0QyxFQUF5QyxLQUFLQyxDQUE5QyxFQUFpRCxLQUFLaUYsTUFBTCxDQUFZaEYsV0FBN0Q7QUFDSDs7QUFDRCxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUF4VGMsdUM7O0FBMlRKLCtEQUFBaUssSUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0VUE7QUFDQTs7SUFTTTBDLEk7Ozs7O0FBRUYsZ0JBQVk3SCxJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdJO0FBQUE7O0FBQUEsUUFBaEgwQixHQUFnSCx1RUFBMUcsSUFBMEc7QUFBQSxRQUFwRzVCLEdBQW9HLHVFQUE5RixJQUE4RjtBQUFBLFFBQXhGUixLQUF3Rix1RUFBaEYsQ0FBZ0Y7QUFBQSxRQUE3RXVGLFdBQTZFLHVFQUEvRCxFQUErRDtBQUFBLFFBQTNEQyxZQUEyRCx1RUFBNUMsRUFBNEM7QUFBQSxRQUF4QzRILGNBQXdDLHVFQUF2QixDQUF1QjtBQUFBLFFBQXBCQyxjQUFvQix1RUFBSCxDQUFHOztBQUFBOztBQUNwSSw4RUFBTS9ILElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLaUYsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFVBQUs0RCxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsVUFBSzFFLElBQUwsR0FBWSxNQUFLVyxJQUFMLENBQVVYLElBQXRCO0FBQ0EsVUFBS2pFLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFVBQUtELENBQUwsR0FBU0EsQ0FBVDtBQUNBLFVBQUtULEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUt1RixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBRUEsVUFBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLOEUsV0FBVyxHQUFHdkYsS0FBZixHQUF3QixDQUE3QixHQUFrQ3VGLFdBQWpEO0FBQ0EsVUFBS2MsVUFBTCxHQUFrQixNQUFLckcsS0FBTCxHQUFhLEVBQS9CO0FBQ0EsVUFBS3NHLFdBQUwsR0FBbUIsTUFBS3RHLEtBQUwsR0FBYSxFQUFoQztBQUNBLFVBQUs4RixNQUFMLEdBQWMsTUFBS00sT0FBTCxHQUFnQixNQUFLQyxVQUFMLEdBQWtCLENBQWhEO0FBQ0EsVUFBS04sTUFBTCxHQUFjLE1BQUtyRixDQUFMLEdBQVMsTUFBSzRGLFdBQWQsR0FBNkIsTUFBS2QsWUFBTCxHQUFvQixDQUEvRDtBQUNBLFVBQUtFLE1BQUwsR0FBYyxDQUFkO0FBRUEsVUFBSzRILE1BQUwsR0FBYzdNLENBQWQ7QUFDQSxVQUFLc0ssSUFBTCxHQUFZLE1BQUt1QyxNQUFMLEdBQWNGLGNBQTFCLENBbkJvSSxDQW1CMUY7QUFFMUM7O0FBQ0EsVUFBS0csWUFBTCxHQUFvQixHQUFwQjtBQUNBLFVBQUtDLGlCQUFMLEdBQXlCSCxjQUF6QixDQXZCb0ksQ0F3QnBJOztBQUNBLFVBQUt6QyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS3BFLE1BQUwsR0FBYyxHQUFkO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxVQUFLTixTQUFMLEdBQWlCLENBQWpCO0FBQ0EsVUFBS0ksV0FBTCxDQUFpQixDQUFqQixJQUFzQixJQUF0QjtBQUNBLFVBQUtBLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsSUFBdEI7QUFFQSxVQUFLWixNQUFMLEdBQWM7QUFDVixnQkFBVSxJQURBO0FBRVYsZ0JBQVUsSUFGQTtBQUdWLGtCQUFZLEtBSEY7QUFJVixpQkFBVyxLQUpEO0FBS1Ysa0JBQVksS0FMRjtBQU1WLG9CQUFjLEtBTko7QUFPVixxQkFBZSxLQVBMO0FBUVYscUJBQWU7QUFSTCxLQUFkO0FBVUEsVUFBS0MsVUFBTCxHQUFrQjtBQUNkLGNBQW9CLElBQUksa0RBQUosQ0FBYyxNQUFLeEQsR0FBbkIsRUFBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QixFQUFrQyxDQUFsQyxFQUFxQyxFQUFyQyxFQUF5QyxDQUF6QyxFQUE0QyxDQUE1QyxFQUErQyxJQUEvQyxFQUFxRCxNQUFLcEMsS0FBMUQsRUFBaUUsRUFBakUsQ0FETjtBQUVkLHVCQUFvQixJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBeEIsRUFBa0MsQ0FBbEMsRUFBcUMsRUFBckMsRUFBeUMsQ0FBekMsRUFBNEMsQ0FBNUMsRUFBK0MsSUFBL0MsRUFBcUQsTUFBS3BDLEtBQTFELENBRk47QUFHZDtBQUNBO0FBQ0E7QUFDQSx3QkFBb0IsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXhCLEVBQWtDLENBQWxDLEVBQXFDLEVBQXJDLEVBQXlDLENBQXpDLEVBQTRDLENBQTVDLEVBQStDLEtBQS9DLEVBQXNELE1BQUtwQyxLQUEzRCxFQUFrRSxFQUFsRSxDQU5OLENBTTRFO0FBQzFGOztBQVBjLEtBQWxCOztBQVNBLFFBQUlvTixjQUFjLEdBQUcsQ0FBckIsRUFBd0I7QUFDcEIsWUFBS3pILE1BQUwsQ0FBWThILFVBQVosR0FBeUIsSUFBekI7QUFDSDs7QUFDRCxVQUFLNUgsU0FBTCxHQUFpQixNQUFLRCxVQUFMLENBQWdCOEgsSUFBakM7QUF0RG9JO0FBdUR2STs7Ozs2QkFFUTtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBSSxLQUFLL0gsTUFBTCxDQUFZOEgsVUFBWixJQUEwQixDQUFDLEtBQUs5SCxNQUFMLENBQVlnSSxRQUEzQyxFQUFxRDtBQUNqRCxhQUFLaEksTUFBTCxDQUFZaUksT0FBWixHQUFzQixJQUF0Qjs7QUFDQSxZQUFJLEtBQUtuTixDQUFMLElBQVUsS0FBSzZNLE1BQW5CLEVBQTJCO0FBQ3ZCLGVBQUszSCxNQUFMLENBQVloRixXQUFaLEdBQTBCLElBQTFCO0FBQ0EsZUFBSytFLE1BQUwsR0FBYyxDQUFkO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLakYsQ0FBTCxJQUFVLEtBQUtzSyxJQUFuQixFQUF5QjtBQUNyQixlQUFLcEYsTUFBTCxDQUFZaEYsV0FBWixHQUEwQixLQUExQjtBQUNBLGVBQUsrRSxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQ0g7QUFDSixPQVZELE1BV0s7QUFDRCxZQUFJLEtBQUtqRixDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBeEIsR0FBNEIsQ0FBaEMsRUFBbUM7QUFDL0IsZUFBS2tGLE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsSUFBMUI7QUFDQSxlQUFLK0UsTUFBTCxHQUFjLENBQWQ7QUFDSCxTQUhELE1BSUs7QUFDRCxlQUFLQyxNQUFMLENBQVloRixXQUFaLEdBQTBCLEtBQTFCO0FBQ0EsZUFBSytFLE1BQUwsR0FBYyxDQUFDLENBQWY7QUFDSDtBQUNKLE9BekJJLENBMkJMOzs7QUFDQSxVQUFJLEtBQUtDLE1BQUwsQ0FBWWlJLE9BQWhCLEVBQXlCO0FBRXJCLGFBQUtuTixDQUFMLElBQVUsS0FBS2lGLE1BQUwsR0FBYyxLQUFLMkQsYUFBN0I7O0FBRUEsWUFBSSxLQUFLbUUsaUJBQUwsSUFBMEIsQ0FBMUIsSUFBK0IsS0FBS3JILFNBQUwsS0FBbUIsQ0FBbEQsS0FDSWpGLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLbkIsSUFBTCxHQUFZLEtBQUt0SyxDQUExQixLQUFnQyxDQUFoQyxJQUFxQ1MsSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUtvQixNQUFMLEdBQWMsS0FBSzdNLENBQTVCLEtBQWtDLENBRDNFLEtBRU9TLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLekwsQ0FBTCxHQUFTLEtBQUs2RSxJQUFMLENBQVVYLElBQVYsQ0FBZWxFLENBQWpDLEtBQXVDLEtBQUs4RixXQUFMLENBQWlCLENBQWpCLENBRjlDLElBRXFFckYsSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt4TCxDQUFMLEdBQVMsS0FBSzRFLElBQUwsQ0FBVVgsSUFBVixDQUFlakUsQ0FBakMsS0FBdUMsS0FBSzZGLFdBQUwsQ0FBaUIsQ0FBakIsQ0FGaEgsRUFFcUk7QUFDakksZUFBS1YsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUtyQixTQUFMLENBQWVxQixLQUFmO0FBQ0EsZUFBS3ZCLE1BQUwsQ0FBWWdJLFFBQVosR0FBdUIsSUFBdkI7QUFDQSxlQUFLaEksTUFBTCxDQUFZaUksT0FBWixHQUFzQixLQUF0QjtBQUNIO0FBR0osT0FkRCxNQWVLLElBQUksS0FBS2pJLE1BQUwsQ0FBWXNHLE1BQWhCLEVBQXdCO0FBQ3pCLFlBQUksS0FBS3VCLGlCQUFMLElBQTBCLENBQTFCLElBQStCLEtBQUtySCxTQUFMLEtBQW1CLENBQWxELElBQXVEakYsSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsS0FBdUMsS0FBSzhGLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBOUYsSUFBcUhyRixJQUFJLENBQUNnTCxHQUFMLENBQVMsS0FBS3hMLENBQUwsR0FBUyxLQUFLNEUsSUFBTCxDQUFVWCxJQUFWLENBQWVqRSxDQUFqQyxLQUF1QyxLQUFLNkYsV0FBTCxDQUFpQixDQUFqQixDQUFoSyxFQUFxTDtBQUNqTCxlQUFLWixNQUFMLENBQVlnSSxRQUFaLEdBQXVCLElBQXZCO0FBQ0EsZUFBS2hJLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsS0FBckI7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS3RHLE1BQUwsQ0FBWWdJLFFBQWhCLEVBQTBCO0FBRXRCLFlBQUksQ0FBQyxLQUFLaEksTUFBTCxDQUFZa0ksV0FBakIsRUFBOEI7QUFDMUIsZUFBS3ZJLElBQUwsQ0FBVVAsU0FBVixDQUFvQixJQUFJLHdDQUFKLENBQVcsS0FBS08sSUFBaEIsRUFBc0IsS0FBSzdFLENBQTNCLEVBQThCLEtBQUtDLENBQW5DLEVBQXNDLEtBQUswQixHQUEzQyxFQUFnRCxLQUFLNUIsR0FBckQsRUFBMEQsS0FBS1IsS0FBL0QsRUFBc0UsS0FBSzJGLE1BQUwsQ0FBWWhGLFdBQWxGLENBQXBCO0FBQ0EsZUFBS2dGLE1BQUwsQ0FBWWtJLFdBQVosR0FBMEIsSUFBMUI7QUFDQSxlQUFLdkksSUFBTCxDQUFVa0MsU0FBVixDQUFvQixpQkFBcEI7QUFDSDs7QUFDRCxZQUFJLEtBQUszQixTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIsZUFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLdkIsTUFBTCxDQUFZZ0ksUUFBWixHQUF1QixLQUF2QjtBQUNBLGVBQUtILGlCQUFMLEdBQXlCLEtBQUtELFlBQTlCO0FBQ0EsY0FBSSxLQUFLNUgsTUFBTCxDQUFZOEgsVUFBaEIsRUFDSSxLQUFLOUgsTUFBTCxDQUFZaUksT0FBWixHQUFzQixJQUF0QixDQURKLEtBR0ksS0FBS2pJLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsSUFBckI7QUFDSixlQUFLdEcsTUFBTCxDQUFZa0ksV0FBWixHQUEwQixLQUExQjtBQUNIO0FBQ0osT0FsRUksQ0FvRUw7OztBQUNBLFVBQUksS0FBS0wsaUJBQUwsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsYUFBS0EsaUJBQUwsSUFBMEIsQ0FBMUI7QUFDSCxPQXZFSSxDQXlFTDs7O0FBQ0EsV0FBS3JILFNBQUwsSUFBa0IsS0FBSzRCLE9BQUwsR0FBZSxLQUFLQSxPQUF0QztBQUNBLFdBQUtySCxDQUFMLElBQVUsS0FBS3lGLFNBQWY7QUFDQSxXQUFLNkIsVUFBTCxHQUFrQixLQUFLakMsTUFBdkI7QUFDQSxXQUFLQSxNQUFMLElBQWUsS0FBS0ksU0FBcEIsQ0E3RUssQ0ErRUw7QUFDQTs7QUFDQSxVQUFJLEtBQUtLLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNsQixhQUFLc0IsZUFBTCxHQUF1QixJQUF2QjtBQUNIO0FBQ0o7Ozt5QkFFSXRILEcsRUFBSztBQUNOLFVBQUksS0FBS21GLE1BQUwsQ0FBWXNHLE1BQWhCLEVBQXdCO0FBQ3BCLGFBQUtZLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUI7QUFDQSxhQUFLaEgsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCOEgsSUFBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUsvSCxNQUFMLENBQVlpSSxPQUFoQixFQUF5QjtBQUNyQixhQUFLZixZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCO0FBQ0EsYUFBS2hILFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQmtJLGFBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLbkksTUFBTCxDQUFZZ0ksUUFBaEIsRUFBMEI7QUFDdEIsYUFBS2QsWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QjtBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JtSSxjQUFqQztBQUNIOztBQUNELFdBQUszRixPQUFMLENBQWE1SCxHQUFiO0FBQ0g7Ozs2QkFFUWlJLEssRUFBT0MsUyxFQUFXO0FBQ3ZCLFVBQUlELEtBQUssQ0FBQ1osSUFBTixLQUFnQixTQUFwQixFQUErQjtBQUMzQixZQUFJYSxTQUFTLEtBQUssUUFBbEIsRUFBNEI7QUFDeEIsZUFBSzNDLE1BQUwsR0FBYzBDLEtBQUssQ0FBQzFDLE1BQU4sR0FBZSxLQUFLTyxXQUFsQztBQUNBLGVBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQUwsR0FBYyxLQUFLTyxXQUE1QixDQUZ3QixDQUVpQjs7QUFDekMsZUFBS0gsU0FBTCxHQUFpQixDQUFqQjtBQUNILFNBSkQsTUFNSyxJQUFJdUMsU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQzFCLGVBQUszQyxNQUFMLEdBQWMwQyxLQUFLLENBQUMxQyxNQUFOLEdBQWUwQyxLQUFLLENBQUNuQyxXQUFuQztBQUNBLGVBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQUwsR0FBYyxLQUFLTyxXQUE1QjtBQUNBLGVBQUswQixVQUFMLEdBQWtCLEtBQUtqQyxNQUF2QjtBQUNILFNBSkksTUFLQSxJQUFJMkMsU0FBUyxLQUFLLE1BQWxCLEVBQTBCO0FBQzNCLGVBQUs1QyxNQUFMLEdBQWMyQyxLQUFLLENBQUMzQyxNQUFOLEdBQWUyQyxLQUFLLENBQUNwQyxVQUFuQztBQUNBLGVBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQUwsR0FBYyxFQUF2QjtBQUNBLGVBQUtILE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsSUFBMUI7QUFDQSxlQUFLK0UsTUFBTCxHQUFjLENBQUMsQ0FBZjtBQUNILFNBTEksTUFNQSxJQUFJZ0QsU0FBUyxLQUFLLE1BQWxCLEVBQTBCO0FBQzNCLGVBQUs1QyxNQUFMLEdBQWMyQyxLQUFLLENBQUMzQyxNQUFOLEdBQWUyQyxLQUFLLENBQUNwQyxVQUFuQztBQUNBLGVBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQUwsR0FBYyxFQUF2QjtBQUNBLGVBQUtILE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxlQUFLK0UsTUFBTCxHQUFjLENBQWQ7QUFDSDtBQUNKOztBQUNELFVBQUkrQyxLQUFLLENBQUNaLElBQU4sS0FBZ0IsWUFBcEIsRUFBa0M7QUFDOUIsYUFBS3JCLE1BQUwsSUFBZWlDLEtBQUssQ0FBQ2hDLE1BQXJCO0FBQ0g7O0FBQ0QsVUFBSWdDLEtBQUssQ0FBQ1osSUFBTixLQUFnQixTQUFwQixFQUErQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxZQUFJLENBQUNZLEtBQUssQ0FBQ0UsT0FBWCxFQUFvQjtBQUNoQixlQUFLbkMsTUFBTCxJQUFlaUMsS0FBSyxDQUFDaEMsTUFBckI7QUFDSDtBQUNKO0FBQ0o7OztpQ0FHWTRCLE0sRUFBUUMsTyxFQUFTQyxNLEVBQVFDLE8sRUFBNkI7QUFBQSxVQUFwQnVCLElBQW9CLHVFQUFiLENBQWE7QUFBQSxVQUFWQyxJQUFVLHVFQUFILENBQUc7QUFDL0QsV0FBSzVELE9BQUwsR0FBZSxLQUFLM0YsQ0FBTCxHQUFXNEgsTUFBTSxHQUFHLEtBQUtySSxLQUFmLEdBQXdCLENBQWxDLEdBQXVDcUksTUFBdEQ7QUFDQSxXQUFLaEMsVUFBTCxHQUFrQixLQUFLckcsS0FBTCxHQUFhdUksTUFBL0I7QUFDQSxXQUFLakMsV0FBTCxHQUFtQixLQUFLdEcsS0FBTCxHQUFhd0ksT0FBaEM7QUFDQSxXQUFLMUMsTUFBTCxHQUFjLEtBQUtNLE9BQUwsR0FBZSxLQUFLQyxVQUFMLEdBQWtCLENBQWpDLEdBQXFDMEQsSUFBbkQ7QUFDQSxXQUFLaEUsTUFBTCxHQUFjLEtBQUtyRixDQUFMLEdBQVMsS0FBSzRGLFdBQWQsR0FBNEIwRCxJQUExQztBQUNIOzs7Z0NBRVd4SixHLEVBQUs7QUFDYkEsU0FBRyxDQUFDb0ksU0FBSjtBQUNBcEksU0FBRyxDQUFDcUksV0FBSixHQUFrQixPQUFsQjtBQUNBckksU0FBRyxDQUFDc0ksSUFBSixDQUFTLEtBQUtoRCxNQUFkLEVBQ0ksS0FBS0MsTUFEVCxFQUVJLEtBQUtNLFVBRlQsRUFFcUIsS0FBS0MsV0FGMUI7QUFHQTlGLFNBQUcsQ0FBQ3VJLE1BQUo7QUFDQXZJLFNBQUcsQ0FBQ3dJLFNBQUo7QUFDSDs7OzRCQUVPeEksRyxFQUFLO0FBQ1QsV0FBS3FGLFNBQUwsQ0FBZW9ELFNBQWYsQ0FBeUIsQ0FBekIsRUFBNEJ6SSxHQUE1QixFQUFpQyxLQUFLQyxDQUF0QyxFQUF5QyxLQUFLQyxDQUE5QyxFQUFpRCxLQUFLaUYsTUFBTCxDQUFZaEYsV0FBN0Q7O0FBQ0EsVUFBSSxLQUFLMkUsSUFBTCxDQUFVNEQsU0FBZCxFQUF5QjtBQUNyQixhQUFLQyxXQUFMLENBQWlCM0ksR0FBakI7QUFDSDtBQUNKOzs7O0VBaE9jLHVDOztBQW9PSiwrREFBQTJNLElBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlPQTtBQUNBOztJQUdNYSxLOzs7OztBQUVGLGlCQUFZMUksSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUFzRjtBQUFBOztBQUFBLFFBQTlEMEIsR0FBOEQsdUVBQXhELElBQXdEO0FBQUEsUUFBbEQ1QixHQUFrRCx1RUFBNUMsSUFBNEM7QUFBQSxRQUF0Q1IsS0FBc0MsdUVBQTlCLENBQThCO0FBQUEsUUFBM0J1RixXQUEyQjtBQUFBLFFBQWRDLFlBQWM7O0FBQUE7O0FBQ2xGLCtFQUFNRixJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsVUFBS2lGLFdBQUwsR0FBbUIsT0FBbkI7QUFDQSxVQUFLNEQsYUFBTCxHQUFxQixDQUFyQjtBQUNBLFVBQUs0RSxVQUFMLEdBQWtCLFFBQWxCO0FBQ0EsVUFBS3JELFVBQUwsR0FBa0IsQ0FBbEIsQ0FMa0YsQ0FLOUQ7QUFDcEI7O0FBQ0EsVUFBS3JFLFdBQUwsR0FBbUIsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFuQixDQVBrRixDQU9wRDs7QUFQb0Q7QUFRckY7Ozs7NkJBRVE7QUFDTDtBQUNIOzs7O0VBZGUsdUM7O0FBaUJMLCtEQUFBeUgsS0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUVBOzs7Ozs7OztJQU9NRSxNOzs7QUFFRixrQkFBYTVJLElBQWIsRUFBbUI3RSxDQUFuQixFQUFzQkMsQ0FBdEIsRUFBNkM7QUFBQSxRQUFwQjBCLEdBQW9CLHVFQUFoQixJQUFnQjtBQUFBLFFBQVY1QixHQUFVLHVFQUFOLElBQU07O0FBQUE7O0FBQ3pDLFNBQUtxSCxJQUFMLEdBQVksS0FBS3NHLFdBQUwsQ0FBaUJ0RyxJQUE3QjtBQUNBLFNBQUt2QyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLZ0gsS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUs5RyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBSzJJLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSzNOLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtxSCxPQUFMLEdBQWUsRUFBZjtBQUNBLFNBQUszRixHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLMEYsZUFBTCxHQUF1QixLQUF2QjtBQUNBLFNBQUt0SCxHQUFMLEdBQVdBLEdBQVgsQ0FaeUMsQ0FjekM7O0FBQ0EsU0FBS3NGLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLaUMsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUszQixVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNILEcsQ0FFRDs7Ozs7Z0NBQ1ksQ0FFWDs7OzZCQUNRLENBRVI7QUFFRDs7OztnQ0FDYTlGLEcsRUFBSztBQUNkQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUM2TixHQUFKLENBQVEsS0FBSzVOLENBQWIsRUFBZ0IsS0FBS0MsQ0FBckIsRUFBd0IsS0FBSzROLE1BQTdCLEVBQXFDLENBQXJDLEVBQXdDcE4sSUFBSSxDQUFDcU4sRUFBTCxHQUFVLENBQWxELEVBQXFELEtBQXJEO0FBQ0EvTixTQUFHLENBQUN1SSxNQUFKO0FBQ0F2SSxTQUFHLENBQUN3SSxTQUFKO0FBQ0g7QUFFRDs7Ozs7Ozs2QkFJVSxDQUFHO0FBRWI7Ozs7eUJBQ014SSxHLEVBQUs7QUFDUCxVQUFJLEtBQUs4RSxJQUFMLENBQVVrSixZQUFWLElBQTBCLEtBQUsxSSxNQUFuQyxFQUEyQztBQUN2Q3FELG1CQUFXLENBQUMzSSxHQUFELENBQVg7QUFDSDs7QUFDRCxVQUFJLEtBQUs0QixHQUFULEVBQWM7QUFDVixhQUFLeUQsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixLQUFLd0YsU0FBOUIsRUFBeUNqTyxHQUF6QyxFQUE4QyxLQUFLQyxDQUFuRCxFQUFzRCxLQUFLQyxDQUEzRCxFQUE4RCxJQUE5RDtBQUNIO0FBQ0o7QUFFRDs7Ozs7O2dDQUdZK0gsSyxFQUFPO0FBQ2YsVUFBSWlHLEtBQUssR0FBRztBQUNSLGFBQU0sS0FBSzVJLE1BREg7QUFFUixhQUFNLEtBQUtDLE1BRkg7QUFHUixpQkFBVSxLQUFLaUMsVUFIUDtBQUlSLGlCQUFVLEtBQUszQixVQUpQO0FBS1Isa0JBQVUsS0FBS0M7QUFMUCxPQUFaO0FBUUEsVUFBSXFJLEtBQUssR0FBRztBQUNSLGFBQU1sRyxLQUFLLENBQUMzQyxNQURKO0FBRVIsYUFBTTJDLEtBQUssQ0FBQzFDLE1BRko7QUFHUixpQkFBVTBDLEtBQUssQ0FBQ3BDLFVBSFI7QUFJUixrQkFBVW9DLEtBQUssQ0FBQ25DO0FBSlIsT0FBWjs7QUFPQSxVQUFJb0ksS0FBSyxDQUFDbEssS0FBTixLQUFnQixDQUFoQixJQUFxQmtLLEtBQUssQ0FBQ2pLLE1BQU4sS0FBaUIsQ0FBdEMsSUFBMkNrSyxLQUFLLENBQUNuSyxLQUFOLEtBQWdCLENBQTNELElBQWdFbUssS0FBSyxDQUFDbEssTUFBTixLQUFpQixDQUFyRixFQUF3RjtBQUNwRixlQUFPLE1BQVA7QUFDSCxPQWxCYyxDQW1CZjs7O0FBQ0EsVUFBSW1LLFNBQVMsR0FBRyxNQUFoQjtBQUNBLFVBQUlDLEVBQUUsR0FBSUgsS0FBSyxDQUFDak8sQ0FBTixHQUFVaU8sS0FBSyxDQUFDbEssS0FBTixHQUFZLENBQXZCLElBQTZCbUssS0FBSyxDQUFDbE8sQ0FBTixHQUFVa08sS0FBSyxDQUFDbkssS0FBTixHQUFZLENBQW5ELENBQVQ7QUFDQSxVQUFJc0ssRUFBRSxHQUFJSixLQUFLLENBQUNoTyxDQUFOLEdBQVVnTyxLQUFLLENBQUNqSyxNQUFOLEdBQWEsQ0FBeEIsSUFBOEJrSyxLQUFLLENBQUNqTyxDQUFOLEdBQVVpTyxLQUFLLENBQUNsSyxNQUFOLEdBQWEsQ0FBckQsQ0FBVDtBQUNBLFVBQUlzSyxNQUFNLEdBQUlMLEtBQUssQ0FBQ00sS0FBTixHQUFjTixLQUFLLENBQUNqSyxNQUFOLEdBQWEsQ0FBNUIsSUFBa0NrSyxLQUFLLENBQUNqTyxDQUFOLEdBQVVpTyxLQUFLLENBQUNsSyxNQUFOLEdBQWEsQ0FBekQsQ0FBYjtBQUNBLFVBQUlELEtBQUssR0FBRyxDQUFDa0ssS0FBSyxDQUFDbEssS0FBTixHQUFjbUssS0FBSyxDQUFDbkssS0FBckIsSUFBOEIsQ0FBMUM7QUFDQSxVQUFJQyxNQUFNLEdBQUcsQ0FBQ2lLLEtBQUssQ0FBQ2pLLE1BQU4sR0FBZWtLLEtBQUssQ0FBQ2xLLE1BQXRCLElBQWdDLENBQTdDO0FBQ0EsVUFBSXdLLFVBQVUsR0FBR3pLLEtBQUssR0FBR3NLLEVBQXpCO0FBQ0EsVUFBSUksY0FBYyxHQUFHMUssS0FBSyxHQUFHdUssTUFBN0I7QUFDQSxVQUFJSSxXQUFXLEdBQUcxSyxNQUFNLEdBQUdvSyxFQUEzQixDQTVCZSxDQThCZjs7QUFDQSxVQUFHM04sSUFBSSxDQUFDZ0wsR0FBTCxDQUFTMkMsRUFBVCxLQUFnQnJLLEtBQWhCLElBQXlCdEQsSUFBSSxDQUFDZ0wsR0FBTCxDQUFTNEMsRUFBVCxLQUFnQnJLLE1BQTVDLEVBQW9EO0FBRWhEO0FBQ0EsWUFBSXdLLFVBQVUsR0FBR0UsV0FBYixJQUE0QkQsY0FBYyxHQUFHQyxXQUFqRCxFQUE4RDtBQUN6REYsb0JBQVUsR0FBRyxDQUFFRSxXQUFoQixJQUFpQ0QsY0FBYyxHQUFHLENBQUVDLFdBQXBELEdBQW1FUCxTQUFTLEdBQUcsT0FBL0UsR0FBeUZBLFNBQVMsR0FBRyxLQUFyRztBQUVILFNBSEQsTUFHTztBQUNISyxvQkFBVSxHQUFJLENBQUNFLFdBQWYsSUFBK0JELGNBQWMsR0FBSSxDQUFDQyxXQUFsRCxHQUFpRVAsU0FBUyxHQUFHLE1BQTdFLEdBQXNGQSxTQUFTLEdBQUcsUUFBbEcsQ0FERyxDQUVIO0FBQ0E7QUFDQTtBQUNIO0FBRUo7O0FBQ0wsYUFBT0EsU0FBUDtBQUVDOzs7NkJBRVFuRyxLLEVBQU9DLFMsRUFBVyxDQUMxQjs7OztLQUNIOzs7QUFFYSwrREFBQXdGLE1BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUhBO0FBQ0E7O0lBRU1rQixNOzs7OztBQUVGLGtCQUFZOUosSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUFnRztBQUFBOztBQUFBLFFBQXhFMEIsR0FBd0UsdUVBQWxFLElBQWtFO0FBQUEsUUFBNUQ1QixHQUE0RCx1RUFBdEQsSUFBc0Q7QUFBQSxRQUFoRFIsS0FBZ0QsdUVBQXhDLENBQXdDO0FBQUEsUUFBckN1RixXQUFxQyx1RUFBdkIsRUFBdUI7QUFBQSxRQUFuQkMsWUFBbUIsdUVBQUosRUFBSTs7QUFBQTs7QUFDNUYsZ0ZBQU1GLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLNkksYUFBTCxHQUFxQixDQUFyQjtBQUNBLFVBQUtySixLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLdUYsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUVBLFVBQUtHLE1BQUwsR0FBYztBQUFFLGdCQUFVLEtBQVo7QUFBbUIscUJBQWU7QUFBbEMsS0FBZDtBQUNBLFVBQUtDLFVBQUwsR0FBa0I7QUFBRSxjQUFRLElBQUksa0RBQUosQ0FBYyxNQUFLeEQsR0FBbkIsRUFBd0IsQ0FBQyxNQUFLbUQsV0FBTixFQUFtQixNQUFLQyxZQUF4QixDQUF4QixFQUErRCxDQUEvRCxFQUFrRSxDQUFsRSxFQUFxRSxFQUFyRSxFQUF5RSxDQUF6RSxFQUE0RSxJQUE1RSxFQUFrRixNQUFLeEYsS0FBdkY7QUFBVixLQUFsQjtBQUNBLFVBQUs2RixTQUFMLEdBQWlCLE1BQUtELFVBQUwsQ0FBZ0J5SixJQUFqQztBQVQ0RjtBQVUvRjs7Ozs2QkFFUTtBQUNMO0FBQ0EsVUFBSSxLQUFLek8sTUFBVCxFQUFpQjtBQUNiLGFBQUtQLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxhQUFLSSxDQUFMLEdBQVMsS0FBSzZPLEtBQWQ7QUFDQSxhQUFLNU8sQ0FBTCxHQUFTLEtBQUs2TyxLQUFkO0FBQ0g7QUFDSjs7OztFQXJCZ0IsdUM7O0FBeUJOLCtEQUFBSCxNQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBR0E7Ozs7SUFHTUksUzs7Ozs7QUFFRjtBQUNBLHFCQUFhbEssSUFBYixFQUFtQnlILFlBQW5CLEVBQWlDdk0sR0FBakMsRUFBc0NtRSxJQUF0QyxFQUE0Q0csR0FBNUMsRUFBaUQ7QUFBQTs7QUFBQTs7QUFDN0MsbUZBQU1RLElBQU4sRUFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixJQUFsQixFQUF3QjlFLEdBQXhCO0FBQ0EsVUFBS2lQLE9BQUwsR0FBZSxDQUFDLEtBQUQsRUFBUSxHQUFSLENBQWYsQ0FGNkMsQ0FFaEI7O0FBQzdCLFVBQUtuSyxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLeUgsWUFBTCxHQUFvQkEsWUFBcEIsQ0FKNkMsQ0FLN0M7O0FBQ0EsVUFBSzJDLFFBQUw7QUFDQSxVQUFLQyxVQUFMLENBUDZDLENBUTdDOztBQUNBLFVBQUtDLEdBQUwsR0FBVyxDQUFYO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBRUEsVUFBS0MsV0FBTCxHQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBUixFQUFXLENBQVgsQ0FBRCxDQUFuQjtBQUVBLFVBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsVUFBS0MsSUFBTDtBQUNBLFVBQUt0TCxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLRyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxVQUFLd0gsS0FBTDtBQUNBLFVBQUs0RCxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNBLFVBQUt4SyxNQUFMLEdBQWM7QUFDVixrQkFBWSxJQURGO0FBRVYsc0JBQWdCLEtBRk47QUFHVixxQkFBZSxLQUhMO0FBSVYsdUJBQWlCLEtBSlA7QUFLVixzQkFBZ0IsS0FMTjtBQU1WLHdCQUFrQixLQU5SO0FBT1YsdUJBQWlCLEtBUFA7QUFRVix3QkFBa0IsS0FSUjtBQVNWLGtCQUFZLEtBVEY7QUFVVix1QkFBaUIsS0FWUDtBQVdWLHlCQUFtQjtBQVhULEtBQWQ7QUF0QjZDO0FBbUNoRDs7Ozs2QkFFUTtBQUNMLFVBQUksS0FBS0EsTUFBTCxDQUFZeUssYUFBaEIsRUFBK0I7QUFDM0JsTSxlQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBLFlBQUlrTSxTQUFTLEdBQUcsS0FBSy9ELEtBQUwsQ0FBVytELFNBQTNCO0FBQ0EsYUFBSy9ELEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBS2dFLFdBQUw7QUFDQSxhQUFLckwsUUFBTCxDQUFjb0wsU0FBZDtBQUNILE9BTkQsTUFPSztBQUNELFlBQUksQ0FBQyxLQUFLMUssTUFBTCxDQUFZNEssV0FBakIsRUFBOEI7QUFDMUIsZUFBS2pFLEtBQUwsQ0FBV2tFLElBQVg7QUFDQSxlQUFLN0ssTUFBTCxDQUFZOEssWUFBWixHQUEyQixJQUEzQjtBQUNBLGVBQUtuRSxLQUFMLENBQVdvRSxXQUFYLENBQXVCLENBQUMsQ0FBeEI7QUFDQSxlQUFLL0ssTUFBTCxDQUFZOEssWUFBWixHQUEyQixLQUEzQjtBQUNBLGVBQUs5TCxJQUFMLENBQVVnTSxNQUFWLENBQWlCLENBQUMsS0FBS1QsU0FBTCxDQUFlelAsQ0FBaEIsRUFBbUIsS0FBS3lQLFNBQUwsQ0FBZXhQLENBQWxDLENBQWpCO0FBQ0EsZUFBS2tRLFFBQUwsR0FBZ0IsS0FBS0MsV0FBTCxDQUFpQkMsSUFBakM7QUFDQSxlQUFLbkwsTUFBTCxDQUFZNEssV0FBWixHQUEwQixJQUExQjtBQUNBLGVBQUs1SyxNQUFMLENBQVlvTCxRQUFaLEdBQXVCLEtBQXZCO0FBQ0EsZUFBS3pMLElBQUwsQ0FBVVAsU0FBVixDQUFvQixLQUFLSixJQUF6QjtBQUNBLGVBQUtXLElBQUwsQ0FBVVAsU0FBVixDQUFvQixLQUFLdUgsS0FBTCxDQUFXMEUsTUFBL0I7QUFDQSxlQUFLck0sSUFBTCxDQUFVbUQsZUFBVixHQUE0QixLQUE1QjtBQUNBLGVBQUtuRCxJQUFMLENBQVVnQixNQUFWLENBQWlCNEQsTUFBakIsR0FBMEIsSUFBMUI7QUFDQSxlQUFLakUsSUFBTCxDQUFVUCxTQUFWLENBQW9CLEtBQUtELEdBQXpCO0FBQ0EsZUFBS0EsR0FBTCxDQUFTZ0QsZUFBVCxHQUEyQixLQUEzQjtBQUNIOztBQUNELFlBQUksS0FBS25DLE1BQUwsQ0FBWXNMLGNBQWhCLEVBQWdDO0FBQzVCLGVBQUt0TCxNQUFMLENBQVl1TCxjQUFaLEdBQTZCLElBQTdCO0FBQ0EsZUFBSzVFLEtBQUwsQ0FBV29FLFdBQVgsQ0FBdUIsS0FBS2YsVUFBNUI7QUFDQSxlQUFLaEssTUFBTCxDQUFZc0wsY0FBWixHQUE2QixLQUE3QjtBQUNBL00saUJBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFzQixLQUFLd0wsVUFBdkM7QUFDSDs7QUFDRCxZQUFJLEtBQUtyRCxLQUFMLENBQVcrRCxTQUFYLEdBQXVCLENBQXZCLElBQTRCLEtBQUtILFNBQUwsQ0FBZXZLLE1BQWYsQ0FBc0J3TCxNQUF0RCxFQUE4RDtBQUMxRCxlQUFLQyxVQUFMLENBQWdCLE9BQWhCO0FBQ0gsU0F6QkEsQ0EyQkQ7OztBQUNBLFlBQUksQ0FBQyxLQUFLbEIsU0FBTCxDQUFldkssTUFBZixDQUFzQndMLE1BQXZCLElBQWlDLEtBQUt4TSxJQUFMLENBQVVsRSxDQUFWLElBQWUsS0FBS3lQLFNBQUwsQ0FBZVksSUFBZixDQUFvQnJRLENBQXhFLEVBQTJFO0FBQ3ZFLGVBQUt5UCxTQUFMLENBQWV2SyxNQUFmLENBQXNCNEQsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxlQUFLMkcsU0FBTCxHQUFpQixLQUFLQSxTQUFMLENBQWVZLElBQWhDOztBQUNBLGNBQUksQ0FBQyxLQUFLWixTQUFMLENBQWV2SyxNQUFmLENBQXNCMEwsU0FBM0IsRUFBc0M7QUFDbEMsaUJBQUtuQixTQUFMLENBQWV2SyxNQUFmLENBQXNCMEwsU0FBdEIsR0FBa0MsSUFBbEM7QUFDQSxpQkFBS2xCLGNBQUwsR0FBc0IsS0FBS0QsU0FBM0I7QUFDSDs7QUFDRCxlQUFLQSxTQUFMLENBQWV2SyxNQUFmLENBQXNCNEQsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxlQUFLakUsSUFBTCxDQUFVM0MsTUFBVixDQUFpQmtILE9BQWpCLEdBQTJCLEtBQUtxRyxTQUFMLENBQWVvQixPQUExQztBQUNBLGVBQUtoTSxJQUFMLENBQVUzQyxNQUFWLENBQWlCbUgsT0FBakIsR0FBMkIsS0FBS29HLFNBQUwsQ0FBZXFCLE9BQTFDO0FBQ0EsZUFBS2pNLElBQUwsQ0FBVTNDLE1BQVYsQ0FBaUJzSCxTQUFqQixHQUE2QixLQUFLaUcsU0FBTCxDQUFlc0IsWUFBNUM7QUFDQSxlQUFLbE0sSUFBTCxDQUFVM0MsTUFBVixDQUFpQnVILFNBQWpCLEdBQTZCLEtBQUtnRyxTQUFMLENBQWVzQixZQUE1QztBQUNILFNBWkQsQ0FhQTtBQWJBLGFBY0ssSUFBSSxDQUFDLEtBQUt0QixTQUFMLENBQWV2SyxNQUFmLENBQXNCOEwsT0FBdkIsSUFBa0MsS0FBSzlNLElBQUwsQ0FBVWxFLENBQVYsR0FBYyxLQUFLeVAsU0FBTCxDQUFlelAsQ0FBL0QsSUFDRixLQUFLa0UsSUFBTCxDQUFVbEUsQ0FBVixJQUFlLEtBQUt5UCxTQUFMLENBQWV3QixJQUFmLENBQW9CalIsQ0FEckMsRUFDd0M7QUFDekMsaUJBQUt5UCxTQUFMLENBQWV2SyxNQUFmLENBQXNCNEQsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxpQkFBSzJHLFNBQUwsR0FBaUIsS0FBS0EsU0FBTCxDQUFld0IsSUFBaEM7QUFDQSxpQkFBS3hCLFNBQUwsQ0FBZTNHLE1BQWYsR0FBd0IsSUFBeEI7QUFDQSxpQkFBS2pFLElBQUwsQ0FBVTNDLE1BQVYsQ0FBaUJrSCxPQUFqQixHQUEyQixLQUFLcUcsU0FBTCxDQUFlb0IsT0FBMUM7QUFDQSxpQkFBS2hNLElBQUwsQ0FBVTNDLE1BQVYsQ0FBaUJtSCxPQUFqQixHQUEyQixLQUFLb0csU0FBTCxDQUFlcUIsT0FBMUM7QUFDQSxpQkFBS2pNLElBQUwsQ0FBVTNDLE1BQVYsQ0FBaUJzSCxTQUFqQixHQUE2QixLQUFLaUcsU0FBTCxDQUFleUIsWUFBNUM7QUFDQSxpQkFBS3JNLElBQUwsQ0FBVTNDLE1BQVYsQ0FBaUJ1SCxTQUFqQixHQUE2QixLQUFLZ0csU0FBTCxDQUFleUIsWUFBNUM7QUFDSDs7QUFFRCxZQUFJLEtBQUtoTixJQUFMLENBQVVnQixNQUFWLENBQWlCaU0sU0FBckIsRUFBZ0M7QUFDNUI7QUFDQSxlQUFLak4sSUFBTCxDQUFVa04sT0FBVjtBQUNBLGVBQUtsTixJQUFMLENBQVVnTSxNQUFWLENBQWlCLENBQUMsS0FBS1IsY0FBTCxDQUFvQjFQLENBQXJCLEVBQXdCLEtBQUswUCxjQUFMLENBQW9CelAsQ0FBcEIsR0FBd0IsRUFBaEQsQ0FBakI7QUFDQSxlQUFLMFEsVUFBTCxDQUFnQixRQUFoQjtBQUNBbE4saUJBQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVo7QUFDQSxlQUFLMk4sY0FBTCxHQUFzQixJQUFFLEtBQUtqQyxJQUE3QjtBQUVIOztBQUVELFlBQUksS0FBS2xLLE1BQUwsQ0FBWW9NLGVBQWhCLEVBQWlDO0FBQzdCLGNBQUksS0FBS25DLEdBQUwsR0FBVyxDQUFmLEVBQWtCO0FBQ2QsaUJBQUtBLEdBQUw7QUFDSCxXQUZELE1BR0s7QUFDRCxpQkFBS2pLLE1BQUwsQ0FBWW9NLGVBQVosR0FBOEIsS0FBOUI7QUFDSDtBQUNKO0FBRUo7QUFDSjs7O3lCQUVJdlIsRyxFQUFLO0FBQ04sVUFBSSxLQUFLc1IsY0FBTCxHQUFzQixDQUExQixFQUE2QjtBQUN6QjVOLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQSxhQUFLM0QsR0FBTCxDQUFTd1IsSUFBVCxHQUFnQixtQkFBaEI7QUFDQSxhQUFLeFIsR0FBTCxDQUFTeVIsU0FBVCxHQUFxQixTQUFyQjtBQUNBLGFBQUt6UixHQUFMLENBQVMwUixRQUFULENBQWtCLE1BQU0sS0FBS3BDLFNBQVgsR0FBdUIsU0FBekMsRUFDSSxLQUFLeEssSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUFmLEdBQW1CLEVBRHZCLEVBRUksS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlakUsQ0FBZixHQUFtQixHQUZ2QjtBQUlBLGFBQUtvUixjQUFMO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLL0IsV0FBTCxDQUFpQmhPLE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDO0FBQzdCLGFBQUssSUFBSUksQ0FBQyxHQUFHLEtBQUs0TixXQUFMLENBQWlCaE8sTUFBakIsR0FBMEIsQ0FBdkMsRUFBMENJLENBQUMsSUFBSSxDQUEvQyxFQUFrRCxFQUFFQSxDQUFwRCxFQUF1RDtBQUNuRCxjQUFJLEtBQUs0TixXQUFMLENBQWlCNU4sQ0FBakIsRUFBb0IsQ0FBcEIsTUFBMkIsQ0FBL0IsRUFBa0M7QUFDOUIsaUJBQUs0TixXQUFMLENBQWlCb0MsTUFBakIsQ0FBd0JoUSxDQUF4QixFQUEyQixDQUEzQjtBQUNILFdBRkQsTUFHSztBQUNEK0IsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQSxpQkFBSzNELEdBQUwsQ0FBU3dSLElBQVQsR0FBZ0IsY0FBaEI7QUFDQSxpQkFBS3hSLEdBQUwsQ0FBU3lSLFNBQVQsR0FBcUIsU0FBckI7QUFDQSxpQkFBS3pSLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsTUFBTSxLQUFLbkMsV0FBTCxDQUFpQjVOLENBQWpCLEVBQW9CLENBQXBCLENBQU4sR0FBK0IsU0FBakQsRUFDSSxLQUFLNE4sV0FBTCxDQUFpQjVOLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLElBQTRCLEVBRGhDLEVBRUksS0FBSzROLFdBQUwsQ0FBaUI1TixDQUFqQixFQUFvQixDQUFwQixFQUF1QixDQUF2QixJQUE0QixHQUZoQztBQUlBLGlCQUFLNE4sV0FBTCxDQUFpQjVOLENBQWpCLEVBQW9CLENBQXBCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7OzsrQkFFVWlRLEssRUFBTztBQUNkO0FBQ0EsVUFBSUEsS0FBSyxLQUFLLFFBQWQsRUFBd0I7QUFDcEIsYUFBS3pNLE1BQUwsQ0FBWXNMLGNBQVosR0FBNkIsSUFBN0I7QUFDQSxhQUFLdEIsVUFBTCxHQUFrQixLQUFLUSxjQUFMLENBQW9Ca0MsR0FBdEM7QUFDSCxPQUhELE1BSUssSUFBSUQsS0FBSyxLQUFLLE9BQWQsRUFBdUI7QUFDeEIsYUFBS3pOLElBQUwsQ0FBVWdCLE1BQVYsQ0FBaUI0RCxNQUFqQixHQUEwQixLQUExQjtBQUNBLGFBQUs1RCxNQUFMLENBQVlvTCxRQUFaLEdBQXVCLElBQXZCO0FBQ0g7O0FBQ0Q3TSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0g7OztrQ0FFYTtBQUNWLFdBQUt3QixNQUFMLENBQVk4SyxZQUFaLEdBQTJCLEtBQTNCO0FBQ0EsV0FBSzlLLE1BQUwsQ0FBWTRLLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxXQUFLNUssTUFBTCxDQUFZMk0sYUFBWixHQUE0QixLQUE1QjtBQUNBLFdBQUszTSxNQUFMLENBQVk0TSxZQUFaLEdBQTJCLEtBQTNCO0FBQ0EsV0FBSzVNLE1BQUwsQ0FBWXNMLGNBQVosR0FBNkIsS0FBN0I7QUFDQSxXQUFLdEwsTUFBTCxDQUFZNk0sYUFBWixHQUE0QixLQUE1QjtBQUNBLFdBQUs3TSxNQUFMLENBQVl1TCxjQUFaLEdBQTZCLEtBQTdCO0FBQ0EsV0FBS3ZMLE1BQUwsQ0FBWW9MLFFBQVosR0FBdUIsS0FBdkI7QUFDQSxXQUFLcEwsTUFBTCxDQUFZeUssYUFBWixHQUE0QixLQUE1QjtBQUNIOzs7NkJBRVE5RCxLLEVBQU87QUFDWixVQUFJQSxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNiLGFBQUtBLEtBQUwsR0FBYSxJQUFJLHFEQUFKLENBQWEsS0FBS2hILElBQWxCLEVBQXdCLEtBQUt5SCxZQUE3QixFQUEyQyxLQUFLdk0sR0FBaEQsQ0FBYjtBQUNBLGFBQUtrUCxRQUFMLEdBQWdCcEQsS0FBaEIsQ0FGYSxDQUdiO0FBQ0E7O0FBQ0EsWUFBSW1HLFlBQVksR0FBRyxLQUFLbkcsS0FBTCxDQUFXdUUsV0FBWCxDQUF1QixDQUF2QixDQUFuQjtBQUNBLFlBQUk2QixVQUFVLEdBQUdELFlBQVksQ0FBQyxDQUFELENBQTdCO0FBQ0EsWUFBSUUsVUFBVSxHQUFHRixZQUFZLENBQUMsQ0FBRCxDQUE3QjtBQUNBLFlBQUlHLFNBQVMsR0FBRyxJQUFJQyxVQUFKLENBQWUsS0FBS3ZOLElBQXBCLEVBQTBCb04sVUFBMUIsRUFBc0NDLFVBQXRDLEVBQWtELEtBQUtuUyxHQUF2RCxFQUE0RCxDQUE1RCxFQUErRCxLQUFLOEwsS0FBTCxDQUFXd0csT0FBWCxDQUFtQixDQUFuQixDQUEvRCxFQUFzRixLQUFLeEcsS0FBTCxDQUFXeUcsU0FBWCxDQUFxQixDQUFyQixDQUF0RixFQUErRyxJQUEvRyxFQUFxSCxJQUFySCxDQUFoQjtBQUNBSCxpQkFBUyxDQUFDak4sTUFBVixDQUFpQjhMLE9BQWpCLEdBQTJCLElBQTNCO0FBQ0EsYUFBSzlMLE1BQUwsQ0FBWXFOLE9BQVosR0FBc0IsS0FBdEI7QUFDQUosaUJBQVMsQ0FBQ1AsR0FBVixHQUFnQixDQUFoQjtBQUNBTyxpQkFBUyxDQUFDckosTUFBVixHQUFtQixJQUFuQjtBQUNBcUosaUJBQVMsQ0FBQ3ZCLFNBQVYsR0FBc0IsSUFBdEI7QUFDQSxZQUFJNEIsU0FBUyxHQUFHLElBQWhCO0FBQ0EsWUFBSUMsU0FBUyxHQUFHTixTQUFoQixDQWZhLENBZ0JiOztBQUNBLGFBQUssSUFBSXpRLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS21LLEtBQUwsQ0FBV3VFLFdBQVgsQ0FBdUI5TyxNQUEzQyxFQUFtREksQ0FBQyxFQUFwRCxFQUF3RDtBQUNwRHNRLHNCQUFZLEdBQUcsS0FBS25HLEtBQUwsQ0FBV3VFLFdBQVgsQ0FBdUIxTyxDQUF2QixDQUFmO0FBQ0F1USxvQkFBVSxHQUFHRCxZQUFZLENBQUMsQ0FBRCxDQUF6QjtBQUNBRSxvQkFBVSxHQUFHRixZQUFZLENBQUMsQ0FBRCxDQUF6Qjs7QUFDQSxjQUFJdFEsQ0FBQyxLQUFLLEtBQUttSyxLQUFMLENBQVd1RSxXQUFYLENBQXVCOU8sTUFBdkIsR0FBZ0MsQ0FBMUMsRUFBNkM7QUFDekNrUixxQkFBUyxHQUFHLElBQUlKLFVBQUosQ0FBZSxLQUFLdk4sSUFBcEIsRUFBMEJvTixVQUExQixFQUFzQ0MsVUFBdEMsRUFBa0QsS0FBS25TLEdBQXZELEVBQTREMkIsQ0FBNUQsRUFBK0QsS0FBS21LLEtBQUwsQ0FBV3dHLE9BQVgsQ0FBbUIzUSxDQUFuQixDQUEvRCxFQUFzRixLQUFLbUssS0FBTCxDQUFXeUcsU0FBWCxDQUFxQjVRLENBQXJCLENBQXRGLEVBQStHLElBQS9HLEVBQXFIK1EsU0FBckgsQ0FBWjtBQUNBRCxxQkFBUyxDQUFDdE4sTUFBVixDQUFpQndOLE9BQWpCLEdBQTJCLEtBQTNCO0FBQ0FGLHFCQUFTLENBQUN0TixNQUFWLENBQWlCd0wsTUFBakIsR0FBMEIsSUFBMUI7QUFDSCxXQUpELE1BS0s7QUFDRDhCLHFCQUFTLEdBQUcsSUFBSUosVUFBSixDQUFlLEtBQUt2TixJQUFwQixFQUEwQm9OLFVBQTFCLEVBQXNDQyxVQUF0QyxFQUFrRCxLQUFLblMsR0FBdkQsRUFBNEQyQixDQUE1RCxFQUErRCxLQUFLbUssS0FBTCxDQUFXd0csT0FBWCxDQUFtQjNRLENBQW5CLENBQS9ELEVBQXNGLEtBQUttSyxLQUFMLENBQVd5RyxTQUFYLENBQXFCNVEsQ0FBckIsQ0FBdEYsRUFBK0csSUFBL0csRUFBcUgrUSxTQUFySCxDQUFaO0FBQ0FELHFCQUFTLENBQUNaLEdBQVYsR0FBZ0JsUSxDQUFoQjtBQUNBOFEscUJBQVMsQ0FBQ3ROLE1BQVYsQ0FBaUJ3TixPQUFqQixHQUEyQixJQUEzQjtBQUNIOztBQUNERixtQkFBUyxDQUFDWixHQUFWLEdBQWdCbFEsQ0FBaEI7QUFDQStRLG1CQUFTLENBQUNFLE9BQVYsQ0FBa0JILFNBQWxCO0FBQ0FDLG1CQUFTLENBQUNHLFNBQVY7QUFDQUgsbUJBQVMsR0FBR0QsU0FBWjtBQUNIOztBQUNEQSxpQkFBUyxDQUFDSSxTQUFWO0FBQ0EsYUFBS3hDLFdBQUwsR0FBbUIrQixTQUFuQjtBQUNBLGFBQUsxQyxTQUFMLEdBQWlCMEMsU0FBakI7QUFDQSxhQUFLekMsY0FBTCxHQUFzQixLQUFLRCxTQUEzQjtBQUNBLGFBQUs1SyxJQUFMLENBQVUzQyxNQUFWLENBQWlCa0gsT0FBakIsR0FBMkIsS0FBS3FHLFNBQUwsQ0FBZW9CLE9BQTFDO0FBQ0EsYUFBS2hNLElBQUwsQ0FBVTNDLE1BQVYsQ0FBaUJtSCxPQUFqQixHQUEyQixLQUFLb0csU0FBTCxDQUFlcUIsT0FBMUM7QUFDSDs7QUFFRCxVQUFJakYsS0FBSyxLQUFLLENBQWQsRUFBaUI7QUFDYixhQUFLQSxLQUFMLEdBQWEsSUFBSSxxREFBSixDQUFhLEtBQUtoSCxJQUFsQixFQUF3QixLQUFLeUgsWUFBN0IsRUFBMkMsS0FBS3ZNLEdBQWhELENBQWI7QUFDQSxhQUFLa1AsUUFBTCxHQUFnQnBELEtBQWhCLENBRmEsQ0FHYjtBQUNBOztBQUNBLFlBQUltRyxZQUFZLEdBQUcsS0FBS25HLEtBQUwsQ0FBV3VFLFdBQVgsQ0FBdUIsQ0FBdkIsQ0FBbkI7QUFDQSxZQUFJNkIsVUFBVSxHQUFHRCxZQUFZLENBQUMsQ0FBRCxDQUE3QjtBQUNBLFlBQUlFLFVBQVUsR0FBR0YsWUFBWSxDQUFDLENBQUQsQ0FBN0I7QUFDQSxZQUFJRyxTQUFTLEdBQUcsSUFBSUMsVUFBSixDQUFlLEtBQUt2TixJQUFwQixFQUEwQm9OLFVBQTFCLEVBQXNDQyxVQUF0QyxFQUFrRCxLQUFLblMsR0FBdkQsRUFBNEQsQ0FBNUQsRUFBK0QsS0FBSzhMLEtBQUwsQ0FBV3dHLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBL0QsRUFBc0YsS0FBS3hHLEtBQUwsQ0FBV3lHLFNBQVgsQ0FBcUIsQ0FBckIsQ0FBdEYsRUFBK0csSUFBL0csRUFBcUgsSUFBckgsQ0FBaEI7QUFDQUgsaUJBQVMsQ0FBQ2pOLE1BQVYsQ0FBaUI4TCxPQUFqQixHQUEyQixJQUEzQjtBQUNBLGFBQUs5TCxNQUFMLENBQVlxTixPQUFaLEdBQXNCLEtBQXRCO0FBQ0FKLGlCQUFTLENBQUNQLEdBQVYsR0FBZ0IsQ0FBaEI7QUFDQU8saUJBQVMsQ0FBQ3JKLE1BQVYsR0FBbUIsSUFBbkI7QUFDQXFKLGlCQUFTLENBQUN2QixTQUFWLEdBQXNCLElBQXRCO0FBQ0EsWUFBSTRCLFNBQVMsR0FBRyxJQUFoQjtBQUNBLFlBQUlDLFNBQVMsR0FBR04sU0FBaEIsQ0FmYSxDQWdCYjs7QUFDQSxhQUFLLElBQUl6USxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUttSyxLQUFMLENBQVd1RSxXQUFYLENBQXVCOU8sTUFBM0MsRUFBbURJLENBQUMsRUFBcEQsRUFBd0Q7QUFDcERzUSxzQkFBWSxHQUFHLEtBQUtuRyxLQUFMLENBQVd1RSxXQUFYLENBQXVCMU8sQ0FBdkIsQ0FBZjtBQUNBdVEsb0JBQVUsR0FBR0QsWUFBWSxDQUFDLENBQUQsQ0FBekI7QUFDQUUsb0JBQVUsR0FBR0YsWUFBWSxDQUFDLENBQUQsQ0FBekI7O0FBQ0EsY0FBSXRRLENBQUMsS0FBSyxLQUFLbUssS0FBTCxDQUFXdUUsV0FBWCxDQUF1QjlPLE1BQXZCLEdBQWdDLENBQTFDLEVBQTZDO0FBQ3pDa1IscUJBQVMsR0FBRyxJQUFJSixVQUFKLENBQWUsS0FBS3ZOLElBQXBCLEVBQTBCb04sVUFBMUIsRUFBc0NDLFVBQXRDLEVBQWtELEtBQUtuUyxHQUF2RCxFQUE0RDJCLENBQTVELEVBQStELEtBQUttSyxLQUFMLENBQVd3RyxPQUFYLENBQW1CM1EsQ0FBbkIsQ0FBL0QsRUFBc0YsS0FBS21LLEtBQUwsQ0FBV3lHLFNBQVgsQ0FBcUI1USxDQUFyQixDQUF0RixFQUErRyxJQUEvRyxFQUFxSCtRLFNBQXJILENBQVo7QUFDQUQscUJBQVMsQ0FBQ3ROLE1BQVYsQ0FBaUJ3TixPQUFqQixHQUEyQixLQUEzQjtBQUNBRixxQkFBUyxDQUFDdE4sTUFBVixDQUFpQndMLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0gsV0FKRCxNQUtLO0FBQ0Q4QixxQkFBUyxHQUFHLElBQUlKLFVBQUosQ0FBZSxLQUFLdk4sSUFBcEIsRUFBMEJvTixVQUExQixFQUFzQ0MsVUFBdEMsRUFBa0QsS0FBS25TLEdBQXZELEVBQTREMkIsQ0FBNUQsRUFBK0QsS0FBS21LLEtBQUwsQ0FBV3dHLE9BQVgsQ0FBbUIzUSxDQUFuQixDQUEvRCxFQUFzRixLQUFLbUssS0FBTCxDQUFXeUcsU0FBWCxDQUFxQjVRLENBQXJCLENBQXRGLEVBQStHLElBQS9HLEVBQXFIK1EsU0FBckgsQ0FBWjtBQUNBRCxxQkFBUyxDQUFDWixHQUFWLEdBQWdCbFEsQ0FBaEI7QUFDQThRLHFCQUFTLENBQUN0TixNQUFWLENBQWlCd04sT0FBakIsR0FBMkIsSUFBM0I7QUFDSDs7QUFDREYsbUJBQVMsQ0FBQ1osR0FBVixHQUFnQmxRLENBQWhCO0FBQ0ErUSxtQkFBUyxDQUFDRSxPQUFWLENBQWtCSCxTQUFsQjtBQUNBQyxtQkFBUyxDQUFDRyxTQUFWO0FBQ0FILG1CQUFTLEdBQUdELFNBQVo7QUFDSDs7QUFDREEsaUJBQVMsQ0FBQ0ksU0FBVjtBQUNBLGFBQUt4QyxXQUFMLEdBQW1CK0IsU0FBbkI7QUFDQSxhQUFLMUMsU0FBTCxHQUFpQjBDLFNBQWpCO0FBQ0EsYUFBS3pDLGNBQUwsR0FBc0IsS0FBS0QsU0FBM0I7QUFDQSxhQUFLNUssSUFBTCxDQUFVM0MsTUFBVixDQUFpQmtILE9BQWpCLEdBQTJCLEtBQUtxRyxTQUFMLENBQWVvQixPQUExQztBQUNBLGFBQUtoTSxJQUFMLENBQVUzQyxNQUFWLENBQWlCbUgsT0FBakIsR0FBMkIsS0FBS29HLFNBQUwsQ0FBZXFCLE9BQTFDO0FBQ0g7QUFDSixLLENBRUQ7Ozs7O0VBNVFvQiwrQyxHQTZRdEI7QUFFRjs7O0lBQ01zQixVOzs7OztBQUNGLHNCQUFZdk4sSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkYsR0FBeEIsRUFBNkI2UixHQUE3QixFQUEwRztBQUFBOztBQUFBLFFBQXhFaUIsV0FBd0UsdUVBQTFELENBQUMsQ0FBRCxFQUFJLEdBQUosQ0FBMEQ7QUFBQSxRQUFoREMsV0FBZ0QsdUVBQWxDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBa0M7QUFBQSxRQUExQnpDLElBQTBCLHVFQUFuQixJQUFtQjtBQUFBLFFBQWJZLElBQWEsdUVBQU4sSUFBTTs7QUFBQTs7QUFDdEcscUZBQU1wTSxJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IsSUFBbEIsRUFBd0JGLEdBQXhCO0FBQ0EsV0FBS3NRLElBQUwsR0FBWUEsSUFBWjtBQUNBLFdBQUtZLElBQUwsR0FBWUEsSUFBWjtBQUNBLFdBQUtKLE9BQUwsR0FBZWdDLFdBQVcsQ0FBQyxDQUFELENBQTFCO0FBQ0EsV0FBSy9CLE9BQUwsR0FBZStCLFdBQVcsQ0FBQyxDQUFELENBQTFCO0FBQ0EsV0FBSzlCLFlBQUwsR0FBb0IrQixXQUFXLENBQUMsQ0FBRCxDQUEvQjtBQUNBLFdBQUs1QixZQUFMLEdBQW9CNEIsV0FBVyxDQUFDLENBQUQsQ0FBL0I7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLE9BQUsvUyxDQUF2QjtBQUNBLFdBQUtnVCxTQUFMLEdBQWlCLE9BQUtoVCxDQUFMLEdBQVMsQ0FBMUI7QUFDQSxXQUFLaVQsZ0JBQUwsR0FBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QjtBQUNBLFdBQUtyQixHQUFMLEdBQVdBLEdBQVgsQ0FYc0csQ0FXdEY7O0FBQ2hCLFdBQUsxTSxNQUFMLEdBQWM7QUFDVixpQkFBVyxLQUREO0FBRVYsZ0JBQVUsS0FGQTtBQUdWLGdCQUFVLEtBSEE7QUFJVixtQkFBYSxLQUpIO0FBS1YsaUJBQVcsS0FMRDtBQU1WLGlCQUFXO0FBTkQsS0FBZDs7QUFRQSxRQUFJLE9BQUttTCxJQUFMLEtBQWMsSUFBbEIsRUFBd0I7QUFDcEIsYUFBS25MLE1BQUwsQ0FBWXdOLE9BQVosR0FBc0IsSUFBdEI7QUFDSDs7QUFDRCxRQUFJLE9BQUt6QixJQUFMLEtBQWMsSUFBbEIsRUFBd0I7QUFDcEIsYUFBSy9MLE1BQUwsQ0FBWXFOLE9BQVosR0FBc0IsSUFBdEI7QUFDSDs7QUF6QnFHO0FBMEJ6Rzs7Ozs2QkFFUSxDQUVSOzs7NEJBRU9sQyxJLEVBQU07QUFDVixXQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxXQUFLbkwsTUFBTCxDQUFZd04sT0FBWixHQUFzQixJQUF0QjtBQUNIOzs7Z0NBRVc7QUFDUixVQUFJLEtBQUtyQyxJQUFMLEtBQWMsSUFBbEIsRUFBd0I7QUFDcEIsYUFBSzBDLFVBQUwsR0FBa0J0UyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDLEtBQUsyUCxJQUFMLENBQVVyUSxDQUFWLEdBQWMsS0FBS0EsQ0FBcEIsSUFBeUIsQ0FBcEMsSUFBeUMsQ0FBM0Q7QUFDSCxPQUZELE1BR0s7QUFDRCxhQUFLK1MsVUFBTCxHQUFrQixLQUFLL1MsQ0FBdkI7QUFDSDs7QUFDRCxVQUFJLEtBQUtpUixJQUFMLEtBQWMsSUFBbEIsRUFBd0I7QUFDcEIsYUFBSytCLFNBQUwsR0FBaUJ2UyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDLEtBQUt1USxJQUFMLENBQVVqUixDQUFWLEdBQWMsS0FBS0EsQ0FBcEIsSUFBeUIsQ0FBcEMsSUFBeUMsQ0FBMUQ7QUFDSCxPQUZELE1BR0s7QUFDRCxhQUFLZ1QsU0FBTCxHQUFpQixLQUFLaFQsQ0FBdEI7QUFDSDtBQUNKOzs7MkJBRU0sQ0FFTjs7OztFQXZEb0IsK0M7O0FBMERWLCtEQUFBK08sU0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqVkE7Q0FVQTs7SUFDTW1FLEk7Ozs7O0FBRUYsZ0JBQVlyTyxJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQWdHO0FBQUE7O0FBQUEsUUFBeEUwQixHQUF3RSx1RUFBbEUsSUFBa0U7QUFBQSxRQUE1RDVCLEdBQTRELHVFQUF0RCxJQUFzRDtBQUFBLFFBQWhEUixLQUFnRCx1RUFBeEMsQ0FBd0M7QUFBQSxRQUFyQ3VGLFdBQXFDLHVFQUF2QixFQUF1QjtBQUFBLFFBQW5CQyxZQUFtQix1RUFBSixFQUFJOztBQUFBOztBQUM1Riw4RUFBTUYsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsVUFBSzRELGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxVQUFLbEQsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFVBQUt5TixRQUFMLEdBQWdCLEdBQWhCO0FBRUEsVUFBSzVULEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUt1RixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBRUEsVUFBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLOEUsV0FBVyxHQUFHdkYsS0FBZixHQUF3QixDQUE3QixHQUFrQ3VGLFdBQWpEO0FBQ0EsVUFBS2MsVUFBTCxHQUFrQixDQUFsQixDQVo0RixDQVl4RTs7QUFDcEIsVUFBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFVBQUtSLE1BQUwsR0FBYyxNQUFLTSxPQUFMLEdBQWdCLE1BQUtDLFVBQUwsR0FBa0IsQ0FBaEQ7QUFDQSxVQUFLTixNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBUyxNQUFLNEYsV0FBZCxHQUE0QixFQUExQztBQUNBLFVBQUtaLE1BQUwsR0FBYyxDQUFDLENBQWYsQ0FoQjRGLENBa0I1Rjs7QUFDQSxVQUFLa0YsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFVBQUtyRSxXQUFMLENBQWlCLENBQWpCLElBQXNCLElBQXRCO0FBQ0EsVUFBS0EsV0FBTCxDQUFpQixDQUFqQixJQUFzQixHQUF0QjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxFQUFkLENBdEI0RixDQXNCMUU7O0FBQ2xCLFVBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS29OLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxVQUFLQyxRQUFMLEdBQWdCLEdBQWhCO0FBQ0EsVUFBS0MsZ0JBQUwsR0FBd0IsRUFBeEI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBRUEsVUFBS3JPLE1BQUwsR0FBYztBQUNWLGdCQUFVLElBREE7QUFFVixrQkFBWSxLQUZGO0FBR1Ysa0JBQVksS0FIRjtBQUlWLG1CQUFhLEtBSkg7QUFLVixvQkFBYyxLQUxKO0FBTVYscUJBQWU7QUFOTCxLQUFkO0FBUUEsVUFBS0MsVUFBTCxHQUFrQjtBQUNkLGNBQVEsSUFBSSxrREFBSixDQUFjLE1BQUt4RCxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELEVBQXhELEVBQTRELENBQTVELEVBQStELENBQS9ELEVBQWtFLElBQWxFLEVBQXdFLE1BQUt4RixLQUE3RSxDQURNO0FBRWQsaUJBQVcsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELEVBQXhELEVBQTRELENBQTVELEVBQStELENBQS9ELEVBQWtFLEtBQWxFLEVBQXlFLE1BQUt4RixLQUE5RSxFQUFxRixDQUFyRixDQUZHO0FBR2QsZUFBUyxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsSUFBbEUsRUFBd0UsTUFBS3hGLEtBQTdFLEVBQW9GLENBQXBGLENBSEs7QUFJZCxpQkFBVyxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsS0FBbEUsRUFBeUUsTUFBS3hGLEtBQTlFLEVBQXFGLENBQXJGO0FBSkcsS0FBbEI7QUFNQSxVQUFLNkYsU0FBTCxHQUFpQixNQUFLRCxVQUFMLENBQWdCOEgsSUFBakM7QUEzQzRGO0FBNEMvRjs7Ozs2QkFFUTtBQUNMLFVBQUksS0FBS2pOLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUF4QixHQUE0QixDQUFoQyxFQUFtQztBQUMvQixhQUFLa0YsTUFBTCxDQUFZaEYsV0FBWixHQUEwQixJQUExQjtBQUNBLGFBQUsrRSxNQUFMLEdBQWMsQ0FBZDtBQUNILE9BSEQsTUFJSztBQUNELGFBQUtDLE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxhQUFLK0UsTUFBTCxHQUFjLENBQUMsQ0FBZjtBQUNIOztBQUVELFVBQUksS0FBS0MsTUFBTCxDQUFZc0csTUFBaEIsRUFBd0I7QUFDcEIsYUFBS1ksWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixDQUE5QixFQUFpQyxDQUFqQyxFQUFvQyxFQUFwQztBQUNBLGFBQUtwRyxNQUFMLEdBQWMsQ0FBZCxDQUZvQixDQUdwQjs7QUFDQSxZQUFJdkYsSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsS0FBdUMsS0FBSzhGLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBdkMsSUFDR3JGLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLeEwsQ0FBTCxHQUFTLEtBQUs0RSxJQUFMLENBQVVYLElBQVYsQ0FBZWpFLENBQWpDLEtBQXVDLEtBQUs2RixXQUFMLENBQWlCLENBQWpCLENBRDFDLElBRUcsS0FBS3lOLGFBQUwsSUFBc0IsQ0FGN0IsRUFFZ0M7QUFDNUIsZUFBS25PLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVlzRyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsZUFBS3RHLE1BQUwsQ0FBWXNPLFFBQVosR0FBdUIsSUFBdkI7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS3RPLE1BQUwsQ0FBWXNPLFFBQWhCLEVBQTBCO0FBQ3RCLGFBQUt4TixNQUFMLEdBQWMsQ0FBZDtBQUNBLGFBQUtvRyxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLENBQWxDLEVBQXFDLEVBQXJDOztBQUNBLFlBQUksS0FBS2hILFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixlQUFLK0UsTUFBTCxDQUFZc08sUUFBWixHQUF1QixLQUF2QjtBQUNBLGVBQUt0TyxNQUFMLENBQVl1TyxRQUFaLEdBQXVCLElBQXZCO0FBQ0EsZUFBS3JPLFNBQUwsQ0FBZXFCLEtBQWY7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS3ZCLE1BQUwsQ0FBWXVPLFFBQWhCLEVBQTBCO0FBQ3RCLFlBQUksQ0FBQyxLQUFLdk8sTUFBTCxDQUFZd08sU0FBakIsRUFBNEI7QUFDeEIsZUFBSzdPLElBQUwsQ0FBVVAsU0FBVixDQUFvQixJQUFJLHNDQUFKLENBQVMsS0FBS08sSUFBZCxFQUFvQixLQUFLN0UsQ0FBTCxHQUFTLEtBQUtpRixNQUFMLEdBQWMsRUFBM0MsRUFBK0MsS0FBS2hGLENBQUwsR0FBUyxFQUF4RCxFQUE0RCxLQUFLMEIsR0FBakUsRUFBc0UsS0FBSzVCLEdBQTNFLEVBQ2hCLEtBQUtSLEtBRFcsRUFDSixLQUFLdUYsV0FERCxFQUNjLEtBQUtDLFlBRG5CLEVBQ2lDLEtBQUtHLE1BQUwsQ0FBWWhGLFdBRDdDLEVBRWhCTyxJQUFJLENBQUNnTCxHQUFMLENBQVMsS0FBS3pMLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUFqQyxJQUFzQyxLQUFLbVQsUUFGM0IsQ0FBcEIsRUFEd0IsQ0FHbUM7O0FBQzNELGVBQUtqTyxNQUFMLENBQVl3TyxTQUFaLEdBQXdCLElBQXhCO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLdE8sU0FBTCxDQUFldkYsS0FBZixHQUF1QixLQUFLdVQsU0FBaEMsRUFBMkM7QUFDdkMsZUFBS2hPLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVl3TyxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsZUFBS3hPLE1BQUwsQ0FBWXVPLFFBQVosR0FBdUIsS0FBdkI7QUFDQSxlQUFLdk8sTUFBTCxDQUFZb0csVUFBWixHQUF5QixJQUF6QjtBQUNIO0FBQ0o7O0FBQ0QsVUFBSSxLQUFLcEcsTUFBTCxDQUFZb0csVUFBaEIsRUFBNEI7QUFDeEIsYUFBS3RGLE1BQUwsR0FBYyxDQUFkOztBQUNBLFlBQUksS0FBS1osU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLGVBQUsrRSxNQUFMLENBQVlzRyxNQUFaLEdBQXFCLElBQXJCO0FBQ0EsZUFBS3RHLE1BQUwsQ0FBWW9HLFVBQVosR0FBeUIsS0FBekI7QUFDQSxlQUFLbEcsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUs4TSxhQUFMLEdBQXFCLEtBQUtGLFFBQTFCO0FBQ0g7QUFDSjs7QUFFRCxVQUFJLEtBQUtFLGFBQUwsR0FBcUIsQ0FBekIsRUFBNEI7QUFDeEIsYUFBS0EsYUFBTDtBQUNIOztBQUVELFdBQUs3TixTQUFMLElBQWtCLEtBQUs0QixPQUFMLEdBQWUsS0FBS0EsT0FBdEM7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLEtBQUtqQyxNQUF2QjtBQUNBLFdBQUtpQixTQUFMLENBQWUsQ0FBZixFQUFrQixLQUFLYixTQUF2QjtBQUNIOzs7eUJBRUkzRixHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVlzRyxNQUFoQixFQUF3QjtBQUNwQixhQUFLcEcsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCOEgsSUFBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUsvSCxNQUFMLENBQVlzTyxRQUFoQixFQUEwQjtBQUN0QixhQUFLcE8sU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCZ0IsT0FBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUtqQixNQUFMLENBQVl1TyxRQUFoQixFQUEwQjtBQUN0QixhQUFLck8sU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCd08sS0FBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUt6TyxNQUFMLENBQVlvRyxVQUFoQixFQUE0QjtBQUN4QixhQUFLbEcsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCeU8sT0FBakM7QUFDSDs7QUFDRCxXQUFLak0sT0FBTCxDQUFhNUgsR0FBYjtBQUNIOzs7aUNBRVk2SCxNLEVBQVFDLE8sRUFBU0MsTSxFQUFRQyxPLEVBQVM4TCxJLEVBQU1DLEksRUFBTTtBQUN2RCxXQUFLbk8sT0FBTCxHQUFlLEtBQUszRixDQUFMLEdBQVc0SCxNQUFNLEdBQUcsS0FBS3JJLEtBQWYsR0FBd0IsQ0FBbEMsR0FBdUNxSSxNQUF0RDtBQUNBLFdBQUtoQyxVQUFMLEdBQWtCLEtBQUtyRyxLQUFMLEdBQWF1SSxNQUEvQjtBQUNBLFdBQUtqQyxXQUFMLEdBQW1CLEtBQUt0RyxLQUFMLEdBQWF3SSxPQUFoQztBQUNBLFdBQUsxQyxNQUFMLEdBQWMsS0FBS00sT0FBTCxHQUFlLEtBQUtDLFVBQUwsR0FBa0IsQ0FBakMsR0FBcUNpTyxJQUFuRDtBQUNBLFdBQUt2TyxNQUFMLEdBQWMsS0FBS3JGLENBQUwsR0FBUyxLQUFLNEYsV0FBZCxHQUE0QmlPLElBQTFDO0FBQ0g7Ozs2QkFFUTlMLEssRUFBT0MsUyxFQUFXO0FBQ3ZCO0FBQ0EsVUFBSUQsS0FBSyxDQUFDWixJQUFOLEtBQWdCLFNBQXBCLEVBQStCO0FBQzNCO0FBQ0EsWUFBSWEsU0FBUyxLQUFLLFFBQWxCLEVBQTRCO0FBQ3hCLGVBQUszQyxNQUFMLEdBQWMwQyxLQUFLLENBQUMxQyxNQUFOLEdBQWUsS0FBS08sV0FBbEM7QUFDQSxlQUFLNUYsQ0FBTCxHQUFTLEtBQUtxRixNQUFMLEdBQWMsS0FBS08sV0FBbkIsR0FBaUMsRUFBMUM7QUFDQSxlQUFLSCxTQUFMLEdBQWlCLENBQWpCO0FBQ0gsU0FKRCxNQUtLLElBQUl1QyxTQUFTLEtBQUssS0FBbEIsRUFBeUI7QUFDMUIsZUFBSzNDLE1BQUwsR0FBYzBDLEtBQUssQ0FBQzFDLE1BQU4sR0FBZTBDLEtBQUssQ0FBQ25DLFdBQW5DO0FBQ0EsZUFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBTCxHQUFjLEtBQUtPLFdBQW5CLEdBQWlDLEVBQTFDO0FBQ0EsZUFBS0gsU0FBTCxHQUFpQixDQUFqQjtBQUNBLGVBQUs2QixVQUFMLEdBQWtCLEtBQUtqQyxNQUF2QjtBQUNILFNBWjBCLENBYTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDSDs7QUFDRCxVQUFJMEMsS0FBSyxDQUFDWixJQUFOLEtBQWdCLFlBQWhCLElBQWdDLENBQUMsS0FBS2xDLE1BQUwsQ0FBWWlILElBQWpELEVBQXVELENBQ25EO0FBQ0g7O0FBQ0QsVUFBSW5FLEtBQUssQ0FBQ1osSUFBTixLQUFnQixTQUFoQixJQUE2QixDQUFDLEtBQUtsQyxNQUFMLENBQVlpSCxJQUE5QyxFQUFvRDtBQUNoRG5FLGFBQUssQ0FBQytMLGNBQU4sQ0FBcUIsU0FBckI7QUFDQS9MLGFBQUssQ0FBQytMLGNBQU4sQ0FBcUIsUUFBckI7O0FBQ0EsWUFBSSxDQUFDL0wsS0FBSyxDQUFDRSxPQUFYLEVBQW9CO0FBQ2hCLGVBQUtiLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKO0FBQ0o7OztnQ0FFV3RILEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7NEJBRU94SSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUFqTWMsdUM7O0FBbU1KLCtEQUFBbVQsSUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5TUE7QUFDQTtBQVdBOzs7Ozs7SUFLTWMsSTs7Ozs7QUFDRixnQkFBWW5QLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBZ0Y7QUFBQTs7QUFBQSxRQUF4RDBCLEdBQXdELHVFQUFsRCxJQUFrRDtBQUFBLFFBQTVDNUIsR0FBNEMsdUVBQXRDLElBQXNDO0FBQUEsUUFBaENSLEtBQWdDLHVFQUF4QixJQUF3QjtBQUFBLFFBQWxCdUYsV0FBa0IsdUVBQUosRUFBSTs7QUFBQTs7QUFDNUUsOEVBQU1ELElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLaUYsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFVBQUsySSxJQUFMLEdBQVksUUFBWjtBQUNBLFVBQUsxTixDQUFMLElBQVcsS0FBSyxDQUFMLEdBQVMsSUFBSSxDQUF4QjtBQUNBLFVBQUtWLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUt1RixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsR0FBcEI7QUFDQSxVQUFLWSxPQUFMLEdBQWUzRixDQUFDLEdBQUssTUFBSzhFLFdBQUwsR0FBbUIsTUFBS3ZGLEtBQXpCLEdBQWtDLENBQXZDLEdBQTRDLE1BQUt1RixXQUFoRTtBQUNBLFVBQUtjLFVBQUwsR0FBa0IsTUFBS2QsV0FBTCxHQUFtQixNQUFLdkYsS0FBMUM7QUFDQSxVQUFLc0csV0FBTCxHQUFtQixNQUFLdEcsS0FBTCxJQUFjLE1BQUt3RixZQUFMLEdBQW9CLEVBQWxDLENBQW5CO0FBQ0EsVUFBS00sTUFBTCxHQUFjLE1BQUtyRixDQUFMLEdBQVMsTUFBSzhFLFdBQTVCO0FBQ0EsVUFBS1EsTUFBTCxHQUFjLE1BQUtyRixDQUFMLEdBQVMsTUFBSzhFLFlBQUwsR0FBb0IsTUFBS3hGLEtBQWxDLEdBQTBDLEtBQUssTUFBS0EsS0FBbEU7QUFFQSxVQUFLMFUsaUJBQUwsR0FBeUIsQ0FBekI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsVUFBS2xPLE1BQUwsR0FBYyxDQUFkLENBaEI0RSxDQWdCN0Q7O0FBRWYsVUFBS2QsTUFBTCxHQUFjO0FBQ1YsZ0JBQVUsSUFEQTtBQUVWLHFCQUFlO0FBRkwsS0FBZDtBQUlBLFVBQUtDLFVBQUwsR0FBa0I7QUFDZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsTUFBS3hELEdBQW5CLEVBQXdCLENBQUMsTUFBS21ELFdBQU4sRUFBbUIsR0FBbkIsQ0FBeEIsRUFBaUQsQ0FBakQsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsQ0FBMUQsRUFBNkQsSUFBN0QsRUFBbUUsTUFBS3ZGLEtBQXhFO0FBREksS0FBbEI7QUFHQSxVQUFLNkYsU0FBTCxHQUFpQixNQUFLRCxVQUFMLENBQWdCMkQsTUFBakM7QUF6QjRFO0FBMEIvRTtBQUVEOzs7Ozs2QkFDUyxDQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7O2dDQUVXL0ksRyxFQUFLO0FBQ2JBLFNBQUcsQ0FBQ29JLFNBQUo7QUFDQXBJLFNBQUcsQ0FBQ3FJLFdBQUosR0FBa0IsT0FBbEI7QUFDQXJJLFNBQUcsQ0FBQ3NJLElBQUosQ0FBUyxLQUFLaEQsTUFBZCxFQUNJLEtBQUtDLE1BRFQsRUFFSSxLQUFLTSxVQUZULEVBRXFCLEtBQUtDLFdBRjFCO0FBR0E5RixTQUFHLENBQUN1SSxNQUFKO0FBQ0F2SSxTQUFHLENBQUN3SSxTQUFKO0FBQ0g7Ozt5QkFFSXhJLEcsRUFBSztBQUNOLFVBQUksS0FBS21GLE1BQUwsQ0FBWTRELE1BQWhCLEVBQ0ksS0FBS25CLE9BQUwsQ0FBYTVILEdBQWI7QUFDUDs7OzRCQUVPQSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUE3RGMsd0M7O0lBZ0Vib1UsUTs7Ozs7QUFDRixvQkFBWXRQLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0c7QUFBQTs7QUFBQSxRQUFoRjBCLEdBQWdGLHVFQUExRSxJQUEwRTtBQUFBLFFBQXBFNUIsR0FBb0UsdUVBQTlELElBQThEO0FBQUEsUUFBeERSLEtBQXdELHVFQUFoRCxJQUFnRDtBQUFBLFFBQTFDOFQsUUFBMEMsdUVBQS9CLEdBQStCO0FBQUEsUUFBMUJoSixNQUEwQix1RUFBakIsRUFBaUI7QUFBQSxRQUFiK0osV0FBYTs7QUFBQTs7QUFDcEcsbUZBQU12UCxJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsV0FBS2lGLFdBQUwsR0FBbUIsT0FBbkI7QUFDQSxXQUFLMkksSUFBTCxHQUFZLFFBQVo7QUFDQSxXQUFLcE8sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBS3VGLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxXQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsV0FBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLLE9BQUs4RSxXQUFMLEdBQW1CLE9BQUt2RixLQUF6QixHQUFrQyxDQUF2QyxHQUE0QyxPQUFLdUYsV0FBaEU7QUFDQSxXQUFLYyxVQUFMLEdBQWtCLElBQUksT0FBS3JHLEtBQTNCO0FBQ0EsV0FBS3NHLFdBQUwsR0FBbUIsS0FBSyxPQUFLdEcsS0FBN0I7QUFDQSxXQUFLOEYsTUFBTCxHQUFjLE9BQUtNLE9BQUwsR0FBZSxPQUFLQyxVQUFMLEdBQWdCLENBQTdDO0FBQ0EsV0FBS04sTUFBTCxHQUFjLE9BQUtyRixDQUFMLEdBQVMsT0FBSzhFLFlBQUwsR0FBa0IsT0FBS3hGLEtBQXZCLEdBQTZCLENBQXBEO0FBRUEsV0FBS3NQLEtBQUwsR0FBYSxPQUFLN08sQ0FBbEI7QUFDQSxXQUFLOE8sS0FBTCxHQUFhLE9BQUs3TyxDQUFsQjtBQUNBLFdBQUtvVSxVQUFMLEdBQWtCLE9BQUtoUCxNQUF2QjtBQUNBLFdBQUtpUCxVQUFMLEdBQWtCLE9BQUtoUCxNQUF2QjtBQUVBLFdBQUsrRSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxXQUFLckUsTUFBTCxHQUFjLENBQWQ7QUFDQSxXQUFLdU4sYUFBTCxHQUFxQmEsV0FBckI7QUFDQSxXQUFLZixRQUFMLEdBQWdCQSxRQUFoQjtBQUVBLFdBQUtuTyxNQUFMLEdBQWM7QUFDVixnQkFBVSxJQURBO0FBRVYsZUFBUyxJQUZDO0FBR1YsbUJBQWEsS0FISDtBQUlWLGlCQUFXLEtBSkQ7QUFLVixtQkFBYSxLQUxIO0FBTVYscUJBQWUsS0FOTDtBQU9WLGdCQUFVLEtBUEE7QUFRVixxQkFBZTtBQVJMLEtBQWQ7QUFVQSxXQUFLQyxVQUFMLEdBQWtCO0FBQ2QsZ0JBQVUsSUFBSSxrREFBSixDQUFjLE9BQUt4RCxHQUFuQixFQUF3QixDQUFDLE9BQUttRCxXQUFOLEVBQW1CLE9BQUtDLFlBQXhCLENBQXhCLEVBQStELENBQS9ELEVBQWtFLEVBQWxFLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLEVBQTRFLElBQTVFLEVBQWtGLE9BQUt4RixLQUF2RixFQUE4RixDQUE5RixDQURJO0FBRWQsZUFBUyxJQUFJLGtEQUFKLENBQWMsT0FBS29DLEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsT0FBS3hGLEtBQXZGLEVBQThGLENBQTlGLENBRks7QUFHZCxtQkFBYSxJQUFJLGtEQUFKLENBQWMsT0FBS29DLEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsT0FBS3hGLEtBQXZGLEVBQThGLENBQTlGLENBSEM7QUFJZCxpQkFBVyxJQUFJLGtEQUFKLENBQWMsT0FBS29DLEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsT0FBS3hGLEtBQXZGLEVBQThGLENBQTlGLENBSkc7QUFLZCxtQkFBYSxJQUFJLGtEQUFKLENBQWMsT0FBS29DLEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsT0FBS3hGLEtBQXZGLEVBQThGLENBQTlGLENBTEM7QUFNZCxxQkFBZSxJQUFJLGtEQUFKLENBQWMsT0FBS29DLEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsT0FBS3hGLEtBQXZGLEVBQThGLEVBQTlGLENBTkQ7QUFPZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsT0FBS29DLEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsT0FBS3hGLEtBQXZGLEVBQThGLEVBQTlGO0FBUEksS0FBbEI7QUFTQSxXQUFLNkYsU0FBTCxHQUFpQixPQUFLRCxVQUFMLENBQWdCUixLQUFqQztBQUNBbEIsV0FBTyxDQUFDQyxHQUFSLENBQVksT0FBSzRELE9BQWpCO0FBM0NvRztBQTRDdkc7QUFFRDs7Ozs7NkJBQ1M7QUFDTCxVQUFJLEtBQUtwQyxNQUFMLENBQVk0RCxNQUFoQixFQUF3QjtBQUNwQixZQUFJLEtBQUs1RCxNQUFMLENBQVlQLEtBQWhCLEVBQXVCO0FBQ25CLGNBQUksS0FBS1MsU0FBTCxDQUFldkYsS0FBZixJQUF3QixDQUE1QixFQUErQjtBQUMzQixnQkFBSVksSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsSUFBc0MsSUFBdEMsSUFDR1MsSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt4TCxDQUFMLEdBQVMsS0FBSzRFLElBQUwsQ0FBVVgsSUFBVixDQUFlakUsQ0FBakMsSUFBc0MsSUFEN0MsRUFDbUQ7QUFDL0MsbUJBQUs0RSxJQUFMLENBQVVrQyxTQUFWLENBQW9CLFdBQXBCLEVBQWlDLEdBQWpDO0FBQ0g7QUFDSjs7QUFFRCxlQUFLUixTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFDLENBQUQsR0FBSyxLQUFLOEQsTUFBNUI7O0FBQ0EsY0FBSSxLQUFLakYsU0FBTCxDQUFldkYsS0FBZixHQUF1QixDQUEzQixFQUE4QjtBQUMxQixpQkFBS3VGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3JCLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWVAsS0FBWixHQUFvQixLQUFwQjtBQUNBLGlCQUFLTyxNQUFMLENBQVlxUCxTQUFaLEdBQXdCLElBQXhCO0FBQ0g7QUFDSjs7QUFDRCxZQUFJLEtBQUtyUCxNQUFMLENBQVlxUCxTQUFoQixFQUEyQjtBQUN2QixlQUFLaE8sU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBQyxFQUFELEdBQU0sS0FBSzhELE1BQTdCOztBQUNBLGNBQUksS0FBS2pGLFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsaUJBQUt1RixTQUFMLENBQWVxQixLQUFmO0FBQ0EsaUJBQUtyQixTQUFMLENBQWVxQixLQUFmO0FBQ0EsaUJBQUt2QixNQUFMLENBQVlxUCxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsaUJBQUtyUCxNQUFMLENBQVlzUCxPQUFaLEdBQXNCLElBQXRCO0FBQ0g7QUFDSjs7QUFDRCxZQUFJLEtBQUt0UCxNQUFMLENBQVlzUCxPQUFoQixFQUF5QjtBQUNyQixlQUFLak8sU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBQyxFQUFELEdBQU0sS0FBSzhELE1BQTdCOztBQUNBLGNBQUksS0FBS2pGLFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsaUJBQUt1RixTQUFMLENBQWVxQixLQUFmO0FBQ0EsaUJBQUtyQixTQUFMLENBQWVxQixLQUFmO0FBQ0EsaUJBQUt2QixNQUFMLENBQVlzUCxPQUFaLEdBQXNCLEtBQXRCO0FBQ0EsaUJBQUt0UCxNQUFMLENBQVl1UCxTQUFaLEdBQXdCLElBQXhCO0FBQ0g7QUFDSjs7QUFDRCxZQUFJLEtBQUt2UCxNQUFMLENBQVl1UCxTQUFoQixFQUEyQjtBQUN2QixlQUFLbE8sU0FBTCxDQUFlLENBQWYsRUFBa0IsS0FBSyxLQUFLOEQsTUFBNUI7O0FBQ0EsY0FBSSxLQUFLakYsU0FBTCxDQUFldkYsS0FBZixHQUF1QixDQUEzQixFQUE4QjtBQUMxQixpQkFBS3VGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3JCLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWXVQLFNBQVosR0FBd0IsS0FBeEI7QUFDQSxpQkFBS3ZQLE1BQUwsQ0FBWXdQLFdBQVosR0FBMEIsSUFBMUI7QUFDSDtBQUNKOztBQUNELFlBQUksS0FBS3hQLE1BQUwsQ0FBWXdQLFdBQWhCLEVBQTZCO0FBQ3pCLGVBQUtuTyxTQUFMLENBQWUsQ0FBZixFQUFrQixLQUFLLEtBQUs4RCxNQUE1Qjs7QUFDQSxjQUFJLEtBQUtqRixTQUFMLENBQWV2RixLQUFmLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCLGlCQUFLdUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLdkIsTUFBTCxDQUFZd1AsV0FBWixHQUEwQixLQUExQjtBQUNBLGlCQUFLeFAsTUFBTCxDQUFZeVAsTUFBWixHQUFxQixJQUFyQjtBQUNIO0FBQ0o7O0FBQ0QsWUFBSSxLQUFLelAsTUFBTCxDQUFZeVAsTUFBaEIsRUFBd0I7QUFDcEIsZUFBS3BPLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQUs4RCxNQUF2Qjs7QUFDQSxjQUFJLEtBQUtqRixTQUFMLENBQWV2RixLQUFmLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCLGlCQUFLdUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLdkIsTUFBTCxDQUFZeVAsTUFBWixHQUFxQixLQUFyQjtBQUNBLGlCQUFLelAsTUFBTCxDQUFZUCxLQUFaLEdBQW9CLElBQXBCO0FBQ0EsaUJBQUtPLE1BQUwsQ0FBWTRELE1BQVosR0FBcUIsSUFBckI7QUFDQSxpQkFBS3lLLGFBQUwsR0FBcUIsS0FBS0YsUUFBMUI7QUFDQSxpQkFBS3JULENBQUwsR0FBUyxLQUFLNk8sS0FBZDtBQUNBLGlCQUFLNU8sQ0FBTCxHQUFTLEtBQUs2TyxLQUFkO0FBQ0EsaUJBQUt6SixNQUFMLEdBQWMsS0FBS2dQLFVBQW5CO0FBQ0EsaUJBQUsvTyxNQUFMLEdBQWMsS0FBS2dQLFVBQW5CO0FBQ0g7QUFDSjtBQUNKOztBQUNELFVBQUksS0FBS2YsYUFBTCxHQUFxQixDQUF6QixFQUE0QjtBQUN4QixhQUFLQSxhQUFMO0FBQ0EsYUFBS3JPLE1BQUwsQ0FBWTRELE1BQVosR0FBcUIsS0FBckI7QUFDSCxPQUhELE1BSUs7QUFDRCxhQUFLNUQsTUFBTCxDQUFZNEQsTUFBWixHQUFxQixJQUFyQjtBQUNIO0FBQ0o7OztnQ0FFVy9JLEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7eUJBRUl4SSxHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVlQLEtBQWhCLEVBQXVCO0FBQ25CLGFBQUtTLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQlIsS0FBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUtPLE1BQUwsQ0FBWXFQLFNBQWhCLEVBQTJCO0FBQ3ZCLGFBQUtuUCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JvUCxTQUFqQztBQUNIOztBQUNELFVBQUksS0FBS3JQLE1BQUwsQ0FBWXNQLE9BQWhCLEVBQXlCO0FBQ3JCLGFBQUtwUCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JxUCxPQUFqQztBQUNIOztBQUNELFVBQUksS0FBS3RQLE1BQUwsQ0FBWXVQLFNBQWhCLEVBQTJCO0FBQ3ZCLGFBQUtyUCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JzUCxTQUFqQztBQUNIOztBQUNELFVBQUksS0FBS3ZQLE1BQUwsQ0FBWXdQLFdBQWhCLEVBQTZCO0FBQ3pCLGFBQUt0UCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0J1UCxXQUFqQztBQUNIOztBQUNELFVBQUksS0FBS3hQLE1BQUwsQ0FBWXlQLE1BQWhCLEVBQXdCO0FBQ3BCLGFBQUt2UCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0J3UCxNQUFqQztBQUNIOztBQUNELFVBQUksS0FBS3pQLE1BQUwsQ0FBWTRELE1BQWhCLEVBQXdCO0FBQ3BCLGFBQUtuQixPQUFMLENBQWE1SCxHQUFiO0FBQ0g7QUFDSjs7OzRCQUVPQSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUF0S2tCLHVDOztJQXlLakI2VSxNOzs7OztBQUNGLGtCQUFZL1AsSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUErSDtBQUFBOztBQUFBLFFBQXZHMEIsR0FBdUcsdUVBQWpHLElBQWlHO0FBQUEsUUFBM0Y1QixHQUEyRix1RUFBckYsSUFBcUY7QUFBQSxRQUEvRVIsS0FBK0UsdUVBQXZFLElBQXVFO0FBQUEsUUFBakV1SixNQUFpRSx1RUFBeEQsSUFBd0Q7QUFBQSxRQUFsRCtMLEtBQWtEO0FBQUEsUUFBM0NDLFVBQTJDLHVFQUE5QixDQUE4QjtBQUFBLFFBQTNCeFQsTUFBMkIsdUVBQWxCLENBQWtCO0FBQUEsUUFBZnlULFFBQWUsMEVBQUosRUFBSTs7QUFBQTs7QUFDM0gsaUZBQU1sUSxJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsV0FBS2lGLFdBQUwsR0FBbUIsUUFBbkI7QUFDQSxXQUFLMkksSUFBTCxHQUFZLFFBQVo7QUFDQSxXQUFLcE8sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBS3VGLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxXQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsV0FBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLLE9BQUs4RSxXQUFMLEdBQW1CLE9BQUt2RixLQUF6QixHQUFrQyxDQUF2QyxHQUE0QyxPQUFLdUYsV0FBaEU7QUFDQSxXQUFLYyxVQUFMLEdBQWtCLE9BQUtyRyxLQUFMLElBQVksT0FBS3VGLFdBQUwsR0FBbUIsRUFBL0IsQ0FBbEI7QUFDQSxXQUFLZSxXQUFMLEdBQW1CLE9BQUt0RyxLQUFMLElBQWMsT0FBS3dGLFlBQUwsR0FBa0IsQ0FBbEIsR0FBc0IsQ0FBcEMsQ0FBbkI7QUFDQSxXQUFLTSxNQUFMLEdBQWMsT0FBS3JGLENBQUwsR0FBUyxPQUFLOEUsV0FBZCxHQUE0QixPQUFLdkYsS0FBTCxHQUFXLEVBQXJEO0FBQ0EsV0FBSytGLE1BQUwsR0FBYyxPQUFLckYsQ0FBTCxHQUFTLE9BQUs4RSxZQUFMLEdBQW9CLE9BQUt4RixLQUFsQyxHQUEwQyxLQUFLLE9BQUtBLEtBQWxFO0FBRUEsV0FBS3lWLGtCQUFMLEdBQTBCRixVQUExQjtBQUNBLFdBQUtHLGFBQUwsR0FBcUJKLEtBQXJCO0FBQ0EsV0FBSzdPLE1BQUwsR0FBYyxDQUFkLENBZjJILENBZTFHOztBQUNqQixXQUFLK08sUUFBTCxHQUFnQkEsUUFBaEI7QUFFQSxXQUFLN1AsTUFBTCxHQUFjO0FBQ1YsZ0JBQVUsS0FEQTtBQUVWLHFCQUFlLENBQUM0RCxNQUZOO0FBR1Y7QUFDQSx1QkFBaUJBLE1BSlA7QUFLVixxQkFBZTtBQUxMLEtBQWQ7QUFPQSxXQUFLM0QsVUFBTCxHQUFrQjtBQUNkLGdCQUFVLElBQUksa0RBQUosQ0FBYyxPQUFLeEQsR0FBbkIsRUFBd0IsQ0FBQyxPQUFLbUQsV0FBTixFQUFtQixPQUFLQyxZQUF4QixDQUF4QixFQUErRCxDQUEvRCxFQUFrRSxDQUFsRSxFQUFxRSxDQUFyRSxFQUF3RSxDQUF4RSxFQUEyRSxLQUEzRSxFQUFrRixPQUFLeEYsS0FBdkYsRUFBOEYsQ0FBOUYsQ0FESTtBQUVkLHFCQUFlLElBQUksa0RBQUosQ0FBYyxPQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQyxPQUFLbUQsV0FBTixFQUFtQixPQUFLQyxZQUF4QixDQUF4QixFQUErRCxDQUEvRCxFQUFrRSxDQUFsRSxFQUFxRSxFQUFyRSxFQUF5RSxDQUF6RSxFQUE0RSxJQUE1RSxFQUFrRixPQUFLeEYsS0FBdkYsRUFBOEYsQ0FBOUYsQ0FGRDtBQUdkLHVCQUFpQixJQUFJLGtEQUFKLENBQWMsT0FBS29DLEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsQ0FBbEUsRUFBcUUsQ0FBckUsRUFBd0UsQ0FBeEUsRUFBMkUsSUFBM0UsRUFBaUYsT0FBS3hGLEtBQXRGO0FBSEgsS0FBbEI7QUFLQSxXQUFLNkYsU0FBTCxHQUFpQixPQUFLRCxVQUFMLENBQWdCK1AsYUFBakM7O0FBQ0EsUUFBSTVULE1BQU0sR0FBRyxDQUFiLEVBQWdCO0FBQ1osVUFBSTZULFVBQVUsR0FBR0wsVUFBVSxHQUFHLE9BQUtDLFFBQW5DO0FBQ0F6VCxZQUFNOztBQUNOLGFBQUt1RCxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSXNRLE1BQUosQ0FBVyxPQUFLL1AsSUFBaEIsRUFBc0IsT0FBSzdFLENBQUwsR0FBUyxPQUFLOEUsV0FBcEMsRUFDaEIsT0FBSzdFLENBRFcsRUFDUixPQUFLMEIsR0FERyxFQUNFNUIsR0FERixFQUNPLENBRFAsRUFDVSxPQUFLK0ksTUFEZixFQUN1QixPQUFLbU0sYUFENUIsRUFDMkNFLFVBRDNDLEVBQ3VEN1QsTUFEdkQsRUFDK0QsT0FBS3lULFFBRHBFLENBQXBCO0FBRUg7O0FBcEMwSDtBQXFDOUg7QUFFRDs7Ozs7NkJBQ1M7QUFDTCxVQUFJLEtBQUs3UCxNQUFMLENBQVk0RCxNQUFaLElBQXNCLEtBQUtrTSxrQkFBTCxLQUE0QixDQUF0RCxFQUF5RDtBQUNyRCxZQUFJLEtBQUs1UCxTQUFMLENBQWUvRSxZQUFmLE9BQWtDLENBQWxDLElBQXVDLEtBQUsrRSxTQUFMLENBQWUvRSxZQUFmLE9BQWtDLENBQTdFLEVBQWdGO0FBQzVFLGVBQUt3RSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSx5Q0FBSixDQUFZLEtBQUtPLElBQWpCLEVBQXVCLEtBQUs5RSxHQUE1QixFQUFpQyxLQUFLc0YsTUFBTCxHQUFjLEVBQS9DLEVBQW1ELEtBQUtDLE1BQXhELEVBQWdFLENBQUMsS0FBS1IsV0FBTixHQUFvQixLQUFLLEtBQUtjLFVBQTlGLEVBQTBHLENBQTFHLEVBQ2hCLEtBQUtkLFdBQUwsR0FBbUIsQ0FESCxFQUNNLEtBQUtDLFlBQUwsR0FBb0IsQ0FEMUIsRUFDNkIsS0FBS2EsVUFBTCxHQUFrQixFQUQvQyxFQUNtRCxLQUFLQyxXQUFMLEdBQW1CLEVBRHRFLEVBQzBFLEtBQUt0RyxLQUQvRSxFQUNzRixLQUFLeUcsTUFEM0YsRUFDbUcsS0FBS2QsTUFBTCxDQUFZaEYsV0FEL0csRUFFaEIsUUFGZ0IsRUFFTixDQUZNLEVBRUgsSUFGRyxDQUFwQjtBQUdILFNBSkQsTUFLSztBQUNELGVBQUsyRSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSx5Q0FBSixDQUFZLEtBQUtPLElBQWpCLEVBQXVCLEtBQUs5RSxHQUE1QixFQUFpQyxLQUFLc0YsTUFBTCxHQUFjLEVBQS9DLEVBQW1ELEtBQUtDLE1BQXhELEVBQWdFLENBQUMsS0FBS1IsV0FBTixHQUFvQixLQUFLLEtBQUtjLFVBQTlGLEVBQTBHLENBQTFHLEVBQ2hCLEtBQUtkLFdBQUwsR0FBbUIsQ0FESCxFQUNNLEtBQUtDLFlBQUwsR0FBb0IsQ0FEMUIsRUFDNkIsS0FBS2EsVUFBTCxHQUFrQixFQUQvQyxFQUNtRCxLQUFLQyxXQUFMLEdBQW1CLEVBRHRFLEVBQzBFLEtBQUt0RyxLQUQvRSxFQUNzRixLQUFLeUcsTUFEM0YsRUFDbUcsS0FBS2QsTUFBTCxDQUFZaEYsV0FEL0csRUFFaEIsUUFGZ0IsRUFFTixDQUZNLEVBRUgsSUFGRyxDQUFwQjtBQUdIOztBQUVELFlBQUksS0FBS2tGLFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixlQUFLaUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVk0RCxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsZUFBSzVELE1BQUwsQ0FBWWdRLGFBQVosR0FBNEIsSUFBNUI7QUFDQSxlQUFLRixrQkFBTCxHQUEwQixLQUFLQyxhQUEvQjtBQUNIO0FBQ0o7O0FBQ0QsVUFBSSxLQUFLRCxrQkFBTCxHQUEwQixDQUE5QixFQUFpQztBQUM3QixhQUFLQSxrQkFBTDtBQUNIOztBQUNELFVBQUksS0FBSzlQLE1BQUwsQ0FBWWdRLGFBQWhCLEVBQStCO0FBQzNCLFlBQUksS0FBS0Ysa0JBQUwsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDL0IsZUFBSzVQLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLdkIsTUFBTCxDQUFZNEQsTUFBWixHQUFxQixJQUFyQjtBQUNBLGVBQUs1RCxNQUFMLENBQVlnUSxhQUFaLEdBQTRCLEtBQTVCLENBSCtCLENBSS9CO0FBQ0g7QUFDSixPQVBELE1BUUssSUFBSSxLQUFLaFEsTUFBTCxDQUFZa1EsV0FBaEIsRUFBNkI7QUFDOUIsWUFBSTNVLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLekwsQ0FBTCxHQUFTLEtBQUs2RSxJQUFMLENBQVVYLElBQVYsQ0FBZWxFLENBQWpDLElBQXNDLEdBQXRDLElBQTZDUyxJQUFJLENBQUNnTCxHQUFMLENBQVMsS0FBS3hMLENBQUwsR0FBUyxLQUFLNEUsSUFBTCxDQUFVWCxJQUFWLENBQWVqRSxDQUFqQyxJQUFzQyxHQUF2RixFQUE0RjtBQUN4RixlQUFLNEUsSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUkseUNBQUosQ0FBWSxLQUFLTyxJQUFqQixFQUF1QixLQUFLOUUsR0FBNUIsRUFBaUMsS0FBS3NGLE1BQUwsR0FBYyxDQUEvQyxFQUFrRCxLQUFLQyxNQUF2RCxFQUErRCxDQUFDLEtBQUtSLFdBQU4sR0FBb0IsS0FBRyxLQUFLYyxVQUEzRixFQUF1RyxDQUF2RyxFQUNoQixLQUFLZCxXQUFMLEdBQW1CLENBREgsRUFDTSxLQUFLQyxZQUFMLEdBQW9CLENBRDFCLEVBQzZCLEtBQUthLFVBQUwsR0FBa0IsRUFEL0MsRUFDbUQsS0FBS0MsV0FBTCxHQUFtQixFQUR0RSxFQUMwRSxLQUFLdEcsS0FEL0UsRUFDc0YsS0FBS3lHLE1BRDNGLEVBQ21HLEtBQUtkLE1BQUwsQ0FBWWhGLFdBRC9HLEVBRWhCLFFBRmdCLEVBRU4sS0FBSzhGLE1BRkMsRUFFTyxLQUFLZCxNQUFMLENBQVloRixXQUZuQixDQUFwQjtBQUdIO0FBQ0o7QUFDSjs7O2dDQUVXSCxHLEVBQUs7QUFDYkEsU0FBRyxDQUFDb0ksU0FBSjtBQUNBcEksU0FBRyxDQUFDcUksV0FBSixHQUFrQixPQUFsQjtBQUNBckksU0FBRyxDQUFDc0ksSUFBSixDQUFTLEtBQUtoRCxNQUFkLEVBQ0ksS0FBS0MsTUFEVCxFQUVJLEtBQUtNLFVBRlQsRUFFcUIsS0FBS0MsV0FGMUI7QUFHQTlGLFNBQUcsQ0FBQ3VJLE1BQUo7QUFDQXZJLFNBQUcsQ0FBQ3dJLFNBQUo7QUFDSDs7O3lCQUVJeEksRyxFQUFLO0FBQ04sVUFBSSxLQUFLbUYsTUFBTCxDQUFZNEQsTUFBaEIsRUFBd0I7QUFDcEIsYUFBSzFELFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQjJELE1BQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLNUQsTUFBTCxDQUFZZ1EsYUFBaEIsRUFBK0I7QUFDM0IsYUFBSzlQLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQitQLGFBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLaFEsTUFBTCxDQUFZa1EsV0FBaEIsRUFBNkI7QUFDekIsYUFBS2hRLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQmlRLFdBQWpDO0FBQ0g7O0FBQ0QsV0FBS3pOLE9BQUwsQ0FBYTVILEdBQWI7QUFDSDs7OzRCQUVPQSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUE3R2dCLHdDOztJQWdIZnNWLGdCOzs7OztBQUNGLDRCQUFZeFEsSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUFvRztBQUFBOztBQUFBLFFBQTVFMEIsR0FBNEUsdUVBQXRFLElBQXNFO0FBQUEsUUFBaEU1QixHQUFnRSx1RUFBMUQsSUFBMEQ7QUFBQSxRQUFwRFIsS0FBb0QsdUVBQTVDLElBQTRDO0FBQUEsUUFBdEM2SyxNQUFzQztBQUFBLFFBQTlCQyxNQUE4QjtBQUFBLFFBQXRCaUwsVUFBc0I7QUFBQSxRQUFWQyxRQUFVOztBQUFBOztBQUNoRywyRkFBTTFRLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxXQUFLaUYsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFdBQUsySSxJQUFMLEdBQVksUUFBWixDQUhnRyxDQUloRzs7QUFDQSxXQUFLcE8sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBS3NQLEtBQUwsR0FBYSxPQUFLN08sQ0FBbEI7QUFDQSxXQUFLOE8sS0FBTCxHQUFhLE9BQUs3TyxDQUFsQjtBQUNBLFdBQUs2RSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLFdBQUtZLE9BQUwsR0FBZTNGLENBQUMsR0FBSyxPQUFLOEUsV0FBTCxHQUFtQixPQUFLdkYsS0FBekIsR0FBa0MsQ0FBdkMsR0FBNEMsT0FBS3VGLFdBQWhFO0FBQ0EsV0FBS2MsVUFBTCxHQUFrQixPQUFLckcsS0FBTCxHQUFhLENBQWIsR0FBaUIsQ0FBbkM7QUFDQSxXQUFLc0csV0FBTCxHQUFtQixPQUFLdEcsS0FBTCxHQUFhLENBQWIsR0FBaUIsQ0FBcEM7QUFDQSxXQUFLOEYsTUFBTCxHQUFjLE9BQUtNLE9BQUwsR0FBZSxPQUFLcEcsS0FBTCxHQUFhLENBQTFDO0FBQ0EsV0FBSytGLE1BQUwsR0FBYyxPQUFLckYsQ0FBTCxHQUFTLE9BQUs4RSxZQUFMLEdBQW9CLE9BQUt4RixLQUF6QixHQUErQixDQUF4QyxHQUE0QyxJQUFJLE9BQUtBLEtBQW5FO0FBRUEsV0FBSzZLLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUttTCxJQUFMLEdBQVlGLFVBQVUsQ0FBQyxDQUFELENBQXRCO0FBQ0EsV0FBS0csSUFBTCxHQUFZSCxVQUFVLENBQUMsQ0FBRCxDQUF0QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsV0FBS3ZQLE1BQUwsR0FBYyxDQUFkO0FBQ0EsV0FBS2xHLElBQUwsR0FBWSxDQUFaO0FBRUEsV0FBS29GLE1BQUwsR0FBYztBQUNWLGdCQUFVO0FBREEsS0FBZDtBQUdBLFdBQUtDLFVBQUwsR0FBa0I7QUFDZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsT0FBS3hELEdBQW5CLEVBQXdCLENBQUMsT0FBS21ELFdBQU4sRUFBbUIsT0FBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsT0FBS3hGLEtBQXZGLEVBQThGLEVBQTlGO0FBREksS0FBbEI7QUFHQSxXQUFLNkYsU0FBTCxHQUFpQixPQUFLRCxVQUFMLENBQWdCMkQsTUFBakM7QUE5QmdHO0FBK0JuRztBQUVEOzs7Ozs2QkFDUztBQUNMLFdBQUt2QyxTQUFMLENBQWUsS0FBSzZELE1BQUwsR0FBYyxLQUFLb0wsSUFBbEMsRUFBd0MsS0FBS25MLE1BQUwsR0FBYyxLQUFLb0wsSUFBM0Q7O0FBQ0EsVUFBSSxLQUFLRixRQUFMLEdBQWdCLENBQXBCLEVBQXVCO0FBQ25CLGFBQUtBLFFBQUw7QUFDSCxPQUZELE1BR0s7QUFDRCxhQUFLbE8sZUFBTCxHQUF1QixJQUF2QjtBQUNIO0FBQ0o7Ozs2QkFFUVcsSyxFQUFPQyxTLEVBQVc7QUFDdkI7QUFDQSxVQUFJRCxLQUFLLENBQUNaLElBQU4sS0FBZSxTQUFuQixFQUE4QjtBQUMxQixhQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0gsT0FGRCxDQUdBO0FBSEEsV0FJSyxJQUFJVyxLQUFLLENBQUNaLElBQU4sS0FBZSxPQUFmLElBQTBCLEVBQUVZLEtBQUssQ0FBQ1osSUFBTixLQUFlLE9BQWpCLENBQTlCLEVBQXlEO0FBQUM7QUFDM0QsY0FBSVksS0FBSyxDQUFDWixJQUFOLEtBQWUsWUFBbkIsRUFBaUM7QUFDN0IsZ0JBQUksS0FBS3RILElBQUwsS0FBYyxDQUFsQixFQUFxQjtBQUNqQixtQkFBS3VILGVBQUwsR0FBdUIsSUFBdkI7QUFDSDs7QUFDRCxpQkFBS3ZILElBQUw7QUFDQWtJLGlCQUFLLENBQUNqQyxNQUFOLElBQWdCLENBQWhCO0FBQ0gsV0FORCxNQU1PO0FBQ0gsaUJBQUtzQixlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSixTQVZJLE1BV0EsSUFBSVcsS0FBSyxDQUFDWixJQUFOLEtBQWUsU0FBbkIsRUFBOEI7QUFDL0I7QUFDQTtBQUNBLGNBQUksQ0FBQ1ksS0FBSyxDQUFDRSxPQUFYLEVBQW9CO0FBQ2hCLGlCQUFLYixlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSjtBQUNKOzs7Z0NBRVd0SCxHLEVBQUs7QUFDYkEsU0FBRyxDQUFDb0ksU0FBSjtBQUNBcEksU0FBRyxDQUFDcUksV0FBSixHQUFrQixPQUFsQjtBQUNBckksU0FBRyxDQUFDc0ksSUFBSixDQUFTLEtBQUtoRCxNQUFkLEVBQ0ksS0FBS0MsTUFEVCxFQUVJLEtBQUtNLFVBRlQsRUFFcUIsS0FBS0MsV0FGMUI7QUFHQTlGLFNBQUcsQ0FBQ3VJLE1BQUo7QUFDQXZJLFNBQUcsQ0FBQ3dJLFNBQUo7QUFDSDs7O3lCQUVJeEksRyxFQUFLO0FBQ04sVUFBSSxLQUFLbUYsTUFBTCxDQUFZNEQsTUFBaEIsRUFBd0I7QUFDcEIsYUFBSzFELFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQjJELE1BQWpDO0FBQ0g7O0FBQ0QsV0FBS25CLE9BQUwsQ0FBYTVILEdBQWI7QUFDSDs7OzRCQUVPQSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUE3RjBCLHVDOztJQWdHekIyVixnQjs7Ozs7QUFDRiw0QkFBWTdRLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0c7QUFBQTs7QUFBQSxRQUFoRjBCLEdBQWdGLHVFQUExRSxJQUEwRTtBQUFBLFFBQXBFNUIsR0FBb0UsdUVBQTlELElBQThEO0FBQUEsUUFBeERSLEtBQXdELHVFQUFoRCxJQUFnRDtBQUFBLFFBQTFDNkssTUFBMEM7QUFBQSxRQUFsQ0MsTUFBa0M7QUFBQSxRQUExQndELE1BQTBCLHVFQUFqQixFQUFpQjtBQUFBLFFBQWJnSCxLQUFhLHVFQUFMLEdBQUs7O0FBQUE7O0FBQ3BHLDJGQUFNaFEsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFdBQUtpRixXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsV0FBSzJJLElBQUwsR0FBWSxRQUFaLENBSG9HLENBSXBHOztBQUNBLFdBQUtwTyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxXQUFLc1AsS0FBTCxHQUFhLE9BQUs3TyxDQUFsQjtBQUNBLFdBQUs4TyxLQUFMLEdBQWEsT0FBSzdPLENBQWxCO0FBQ0EsV0FBSzROLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUtnSCxLQUFMLEdBQWFBLEtBQWI7O0FBQ0EsV0FBS3RPLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQUMsT0FBS3NILE1BQXhCOztBQUNBLFdBQUsvSSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLFdBQUtZLE9BQUwsR0FBZTNGLENBQUMsR0FBSyxPQUFLOEUsV0FBTCxHQUFtQixPQUFLdkYsS0FBekIsR0FBa0MsQ0FBdkMsR0FBNEMsT0FBS3VGLFdBQWhFO0FBQ0EsV0FBS2MsVUFBTCxHQUFrQixPQUFLckcsS0FBTCxHQUFhLENBQWIsR0FBaUIsQ0FBbkM7QUFDQSxXQUFLc0csV0FBTCxHQUFtQixPQUFLdEcsS0FBTCxHQUFhLENBQWIsR0FBaUIsQ0FBcEM7QUFDQSxXQUFLOEYsTUFBTCxHQUFjLE9BQUtNLE9BQUwsR0FBZSxPQUFLcEcsS0FBTCxHQUFhLENBQTFDO0FBQ0EsV0FBSytGLE1BQUwsR0FBYyxPQUFLckYsQ0FBTCxHQUFTLE9BQUs4RSxZQUFMLEdBQW9CLE9BQUt4RixLQUF6QixHQUFpQyxDQUExQyxHQUE4QyxJQUFJLE9BQUtBLEtBQXJFO0FBRUEsV0FBSzZLLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUtzTCxTQUFMLEdBQWlCLENBQUMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFELEVBQVMsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBQVQsRUFBa0IsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFDLENBQU4sQ0FBbEIsRUFBNEIsQ0FBQyxDQUFELEVBQUksQ0FBQyxDQUFMLENBQTVCLENBQWpCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFdBQUs1UCxNQUFMLEdBQWMsQ0FBZDtBQUNBLFdBQUtsRyxJQUFMLEdBQVksQ0FBWjtBQUVBLFdBQUtvRixNQUFMLEdBQWM7QUFDVixnQkFBVTtBQURBLEtBQWQ7QUFHQSxXQUFLQyxVQUFMLEdBQWtCO0FBQ2QsZ0JBQVUsSUFBSSxrREFBSixDQUFjLE9BQUt4RCxHQUFuQixFQUF3QixDQUFDLE9BQUttRCxXQUFOLEVBQW1CLE9BQUtDLFlBQXhCLENBQXhCLEVBQStELENBQS9ELEVBQWtFLEVBQWxFLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLEVBQTRFLElBQTVFLEVBQWtGLE9BQUt4RixLQUF2RixFQUE4RixFQUE5RjtBQURJLEtBQWxCO0FBR0EsV0FBSzZGLFNBQUwsR0FBaUIsT0FBS0QsVUFBTCxDQUFnQjJELE1BQWpDO0FBaENvRztBQWlDdkc7QUFFRDs7Ozs7NkJBQ1M7QUFDTCxVQUFJLEtBQUs5SSxDQUFMLEdBQVMsS0FBSzZPLEtBQWQsSUFBdUIsQ0FBdkIsSUFBNEIsS0FBSzVPLENBQUwsR0FBUyxLQUFLNk8sS0FBZCxJQUF1QixDQUF2RCxFQUEwRDtBQUN0RCxhQUFLOEcsUUFBTCxHQUFnQixDQUFoQjtBQUNILE9BRkQsTUFHSyxJQUFJLEtBQUs1VixDQUFMLEdBQVMsS0FBSzZPLEtBQWQsSUFBdUIsQ0FBdkIsSUFBNEIsS0FBSzVPLENBQUwsR0FBUyxLQUFLNk8sS0FBZCxHQUFzQixDQUF0RCxFQUF5RDtBQUMxRCxhQUFLOEcsUUFBTCxHQUFnQixDQUFoQjtBQUNILE9BRkksTUFHQSxJQUFJLEtBQUs1VixDQUFMLEdBQVMsS0FBSzZPLEtBQWQsR0FBc0IsQ0FBdEIsSUFBMkIsS0FBSzVPLENBQUwsR0FBUyxLQUFLNk8sS0FBZCxHQUFzQixDQUFyRCxFQUF3RDtBQUN6RCxhQUFLOEcsUUFBTCxHQUFnQixDQUFoQjtBQUNILE9BRkksTUFHQSxJQUFJLEtBQUs1VixDQUFMLEdBQVMsS0FBSzZPLEtBQWQsR0FBc0IsQ0FBdEIsSUFBMkIsS0FBSzVPLENBQUwsR0FBUyxLQUFLNk8sS0FBZCxJQUF1QixDQUF0RCxFQUF5RDtBQUMxRCxhQUFLOEcsUUFBTCxHQUFnQixDQUFoQjtBQUNIOztBQUNELFdBQUtyUCxTQUFMLENBQWUsS0FBSzZELE1BQUwsR0FBYyxLQUFLdUwsU0FBTCxDQUFlLEtBQUtDLFFBQXBCLEVBQThCLENBQTlCLENBQTdCLEVBQStELEtBQUt2TCxNQUFMLEdBQWMsS0FBS3NMLFNBQUwsQ0FBZSxLQUFLQyxRQUFwQixFQUE4QixDQUE5QixDQUE3RTtBQUNIOzs7NkJBRVE1TixLLEVBQU9DLFMsRUFBVyxDQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7OztnQ0FFV2xJLEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7eUJBRUl4SSxHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVk0RCxNQUFoQixFQUF3QjtBQUNwQixhQUFLMUQsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCMkQsTUFBakM7QUFDSDs7QUFDRCxXQUFLbkIsT0FBTCxDQUFhNUgsR0FBYjtBQUNIOzs7NEJBRU9BLEcsRUFBSztBQUNULFdBQUtxRixTQUFMLENBQWVvRCxTQUFmLENBQXlCLENBQXpCLEVBQTRCekksR0FBNUIsRUFBaUMsS0FBS0MsQ0FBdEMsRUFBeUMsS0FBS0MsQ0FBOUMsRUFBaUQsS0FBS2lGLE1BQUwsQ0FBWWhGLFdBQTdEOztBQUNBLFVBQUksS0FBSzJFLElBQUwsQ0FBVTRELFNBQWQsRUFBeUI7QUFDckIsYUFBS0MsV0FBTCxDQUFpQjNJLEdBQWpCO0FBQ0g7QUFDSjs7OztFQXJHMEIsdUM7O0lBeUd6QjhWLFE7Ozs7O0FBQ0Ysb0JBQVloUixJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQ2dHO0FBQUE7O0FBQUEsUUFEeEUwQixHQUN3RSx1RUFEbEUsSUFDa0U7QUFBQSxRQUQ1RDVCLEdBQzRELHVFQUR0RCxJQUNzRDtBQUFBLFFBRGhEUixLQUNnRCx1RUFEeEMsSUFDd0M7QUFBQSxRQUFoRjZLLE1BQWdGO0FBQUEsUUFBeEVDLE1BQXdFO0FBQUEsUUFBaEVpTCxVQUFnRTtBQUFBLFFBQXBEakMsUUFBb0Q7QUFBQSxRQUExQ3lDLGtCQUEwQztBQUFBLFFBQXRCQyxnQkFBc0IsMEVBQUgsQ0FBRzs7QUFBQTs7QUFDNUYsbUZBQU1sUixJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsV0FBS2lGLFdBQUwsR0FBbUIsUUFBbkI7QUFDQSxXQUFLMkksSUFBTCxHQUFZLFFBQVosQ0FINEYsQ0FJNUY7O0FBQ0EsV0FBS3BPLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFdBQUt1RixXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLFdBQUtZLE9BQUwsR0FBZTNGLENBQUMsR0FBSyxPQUFLOEUsV0FBTCxHQUFtQixPQUFLdkYsS0FBekIsR0FBa0MsQ0FBdkMsR0FBNEMsT0FBS3VGLFdBQWhFO0FBQ0EsV0FBS2MsVUFBTCxHQUFrQixPQUFLckcsS0FBTCxHQUFhLENBQS9CO0FBQ0EsV0FBS3NHLFdBQUwsR0FBbUIsT0FBS3RHLEtBQUwsR0FBYSxDQUFoQztBQUNBLFdBQUs4RixNQUFMLEdBQWMsT0FBS3JGLENBQUwsR0FBUyxPQUFLOEUsV0FBZCxHQUE0QixPQUFLdkYsS0FBTCxHQUFhLENBQXZEO0FBQ0EsV0FBSytGLE1BQUwsR0FBYyxPQUFLckYsQ0FBTCxHQUFTLE9BQUs4RSxZQUFMLEdBQW9CLE9BQUt4RixLQUFsQyxHQUEwQyxJQUFJLE9BQUtBLEtBQWpFO0FBRUEsV0FBSzZLLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUttTCxJQUFMLEdBQVlGLFVBQVUsQ0FBQyxDQUFELENBQXRCO0FBQ0EsV0FBS0csSUFBTCxHQUFZSCxVQUFVLENBQUMsQ0FBRCxDQUF0QjtBQUNBLFdBQUt2SSxpQkFBTCxHQUF5QmdKLGdCQUF6QjtBQUNBLFdBQUtqSixZQUFMLEdBQW9CdUcsUUFBcEI7QUFDQSxXQUFLeUMsa0JBQUwsR0FBMEJBLGtCQUExQjtBQUVBLFdBQUs1USxNQUFMLEdBQWM7QUFDVixnQkFBVTtBQURBLEtBQWQ7QUFHQSxXQUFLQyxVQUFMLEdBQWtCO0FBQ2QsZ0JBQVUsSUFBSSxrREFBSixDQUFjLE9BQUt4RCxHQUFuQixFQUF3QixDQUFDLE9BQUttRCxXQUFOLEVBQW1CLE9BQUtDLFlBQXhCLENBQXhCLEVBQStELENBQS9ELEVBQWtFLEVBQWxFLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLEVBQTRFLElBQTVFLEVBQWtGLE9BQUt4RixLQUF2RixFQUE4RixFQUE5RjtBQURJLEtBQWxCO0FBR0EsV0FBSzZGLFNBQUwsR0FBaUIsT0FBS0QsVUFBTCxDQUFnQjJELE1BQWpDO0FBNUI0RjtBQTZCL0Y7QUFFRDs7Ozs7NkJBQ1M7QUFDTDtBQUFJO0FBQW1ELFdBQUtpRSxpQkFBTCxLQUEyQixDQUFsRixFQUFxRjtBQUNqRixhQUFLbEksSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUkrUSxnQkFBSixDQUFxQixLQUFLeFEsSUFBMUIsRUFBZ0MsS0FBSzdFLENBQUwsR0FBUyxLQUFLOEUsV0FBOUMsRUFBMkQsS0FBSzdFLENBQUwsR0FBUyxLQUFLOEUsWUFBekUsRUFBdUYsS0FBS3BELEdBQTVGLEVBQWlHLEtBQUs1QixHQUF0RyxFQUEyRyxLQUFLUixLQUFoSCxFQUNoQixLQUFLNkssTUFEVyxFQUNILEtBQUtDLE1BREYsRUFDVSxDQUFDLEtBQUttTCxJQUFOLEVBQVksS0FBS0MsSUFBakIsQ0FEVixFQUNrQyxLQUFLSyxrQkFEdkMsQ0FBcEI7QUFFQSxhQUFLL0ksaUJBQUwsR0FBeUIsS0FBS0QsWUFBOUI7QUFDSDs7QUFDRCxVQUFJLEtBQUtDLGlCQUFMLEdBQXlCLENBQTdCLEVBQWdDO0FBQzVCLGFBQUtBLGlCQUFMO0FBQ0g7QUFDSjs7O2dDQUVXaE4sRyxFQUFLO0FBQ2JBLFNBQUcsQ0FBQ29JLFNBQUo7QUFDQXBJLFNBQUcsQ0FBQ3FJLFdBQUosR0FBa0IsT0FBbEI7QUFDQXJJLFNBQUcsQ0FBQ3NJLElBQUosQ0FBUyxLQUFLaEQsTUFBZCxFQUNJLEtBQUtDLE1BRFQsRUFFSSxLQUFLTSxVQUZULEVBRXFCLEtBQUtDLFdBRjFCO0FBR0E5RixTQUFHLENBQUN1SSxNQUFKO0FBQ0F2SSxTQUFHLENBQUN3SSxTQUFKO0FBQ0g7Ozt5QkFFSXhJLEcsRUFBSztBQUNOLFdBQUs0SCxPQUFMLENBQWE1SCxHQUFiO0FBQ0g7Ozs0QkFFT0EsRyxFQUFLO0FBQ1Q7QUFDQSxVQUFJLEtBQUs4RSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUFoRWtCLHdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25qQnZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBR01pVyxJOzs7OztBQUVGLGdCQUFhblIsSUFBYixFQUFtQjdFLENBQW5CLEVBQXNCQyxDQUF0QixFQUF1RjtBQUFBOztBQUFBLFFBQTlEMEIsR0FBOEQsdUVBQTFELElBQTBEO0FBQUEsUUFBcEQ1QixHQUFvRCx1RUFBaEQsSUFBZ0Q7QUFBQSxRQUExQ1IsS0FBMEMsdUVBQXBDLENBQW9DO0FBQUEsUUFBakN1RixXQUFpQyx1RUFBckIsRUFBcUI7QUFBQSxRQUFqQkMsWUFBaUIsdUVBQUosRUFBSTs7QUFBQTs7QUFDbkYsOEVBQU1GLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLaUYsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFVBQUs4SixLQUFMLEdBQWEsTUFBSzdPLENBQWxCLENBSG1GLENBRzlEOztBQUNyQixVQUFLVixLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLdUYsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFVBQUtXLFNBQUwsR0FBaUIsQ0FBakI7QUFFQSxVQUFLQyxPQUFMLEdBQWUzRixDQUFDLEdBQUs4RSxXQUFXLEdBQUd2RixLQUFmLEdBQXdCLENBQTdCLEdBQWtDdUYsV0FBakQ7QUFDQSxVQUFLYyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixHQUFuQjtBQUNBLFVBQUtSLE1BQUwsR0FBYyxNQUFLTSxPQUFMLEdBQWdCLE1BQUtDLFVBQUwsR0FBa0IsQ0FBaEQ7QUFDQSxVQUFLTixNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBUyxNQUFLNEYsV0FBNUI7QUFDQSxVQUFLMEIsVUFBTCxHQUFrQixNQUFLakMsTUFBdkIsQ0FkbUYsQ0FjcEQ7O0FBRS9COztBQUNBLFVBQUtzRCxhQUFMLEdBQXNCLENBQXRCO0FBQ0EsVUFBS3FOLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxVQUFLQyxZQUFMLEdBQXFCLEVBQXJCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFVBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxVQUFLQyxnQkFBTCxHQUF3QixFQUF4QjtBQUVBLFVBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxVQUFLelEsTUFBTCxHQUFjLEVBQWQ7QUFDQSxVQUFLMFEsZUFBTCxHQUF1QixFQUF2QjtBQUNBLFVBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFVBQUtDLGVBQUwsR0FBdUIsRUFBdkI7QUFDQSxVQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBRUEsVUFBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixDQUFsQixDQXBDbUYsQ0FzQ25GOztBQUNBLFVBQUtDLG1CQUFMLEdBQTJCLENBQTNCO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixFQUF0QjtBQUNBLFVBQUtDLG1CQUFMLEdBQTJCLENBQTNCO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixNQUFNLE1BQUtMLFVBQUwsR0FBa0IsQ0FBeEIsQ0FBdEI7QUFDQSxVQUFLTSxpQkFBTCxHQUF5QixNQUFNLE1BQUtOLFVBQUwsR0FBa0IsQ0FBeEIsQ0FBekI7QUFDQSxVQUFLTyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsVUFBS0MsZ0JBQUwsR0FBd0IsQ0FBeEI7QUFDQSxVQUFLQyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLFVBQUtDLHFCQUFMLEdBQTZCLENBQTdCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxVQUFLQyxrQkFBTCxHQUEwQixDQUExQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUIsQ0FBckIsQ0FuRG1GLENBcURuRjs7QUFDQSxVQUFLQyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLFVBQUtDLG1CQUFMLEdBQTJCLE1BQUtWLGlCQUFoQztBQUNBLFVBQUtXLGNBQUwsR0FBc0IsQ0FBdEI7QUFDQSxVQUFLQyxpQkFBTCxHQUF5QixNQUFLWCxXQUE5QjtBQUVBLFVBQUtwUyxNQUFMLEdBQWM7QUFDVixtQkFBYSxLQURIO0FBRVYsc0JBQWdCLEtBRk47QUFHVixpQkFBVyxLQUhEO0FBSVYsaUJBQVcsS0FKRDtBQUtWLGlCQUFXLEtBTEQ7QUFNVixvQkFBYyxLQU5KO0FBT1Ysc0JBQWdCLEtBUE47QUFRVixvQkFBYyxLQVJKO0FBU1Ysb0JBQWMsS0FUSjtBQVVWLG1CQUFhLEtBVkg7QUFXVixrQkFBWSxLQVhGO0FBWVYsaUJBQVcsS0FaRDtBQVlPO0FBQ2pCLGtCQUFZLEtBYkY7QUFjVixvQkFBYyxLQWRKO0FBZVYsa0JBQVksS0FmRjtBQWdCVixvQkFBYyxLQWhCSjtBQWlCVixvQkFBYyxLQWpCSjtBQWtCVixxQkFBZSxLQWxCTDtBQW1CVixpQkFBVyxLQW5CRDtBQW9CVixjQUFRLEtBcEJFO0FBcUJWLG1CQUFhLEtBckJIO0FBc0JWLGtCQUFZLElBdEJGO0FBdUJWLG9CQUFjLElBdkJKO0FBd0JWLHFCQUFlLElBeEJMO0FBeUJWLGVBQVMsS0F6QkM7QUEwQlYsZ0JBQVU7QUExQkEsS0FBZDtBQTRCQSxVQUFLQyxVQUFMLEdBQWtCO0FBQ2QsY0FBUSxJQUFJLGtEQUFKLENBQWMsTUFBS3hELEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsQ0FBeEQsRUFBMkQsQ0FBM0QsRUFBOEQsQ0FBOUQsRUFBaUUsSUFBakUsRUFBdUUsTUFBS3hGLEtBQTVFLENBRE07QUFDOEU7QUFDNUYsY0FBUSxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsS0FBbEUsRUFBeUUsTUFBS3hGLEtBQTlFLEVBQXFGLENBQXJGLENBRk07QUFHZCxjQUFRLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxJQUFsRSxFQUF3RSxNQUFLeEYsS0FBN0UsRUFBb0YsRUFBcEYsQ0FITTtBQUlkLGFBQU8sSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELEVBQXhELEVBQTRELENBQTVELEVBQStELEVBQS9ELEVBQW1FLElBQW5FLEVBQXlFLE1BQUt4RixLQUE5RSxDQUpPO0FBSStFO0FBQzdGO0FBQ0EsZ0JBQVUsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELENBQXhELEVBQTJELENBQTNELEVBQThELENBQTlELEVBQWlFLElBQWpFLEVBQXVFLE1BQUt4RixLQUE1RSxFQUFtRixDQUFuRixDQU5JO0FBTW1GO0FBQ2pHLGlCQUFXLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxJQUFsRSxFQUF3RSxNQUFLeEYsS0FBN0UsRUFBb0YsQ0FBcEYsQ0FQRztBQU9xRjtBQUNuRztBQUNBLGtCQUFZLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxLQUFsRSxFQUF5RSxNQUFLeEYsS0FBOUUsRUFBcUYsRUFBckYsQ0FURTtBQVN3RjtBQUN0RyxlQUFTLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxLQUE5QyxFQUFxRCxNQUFLcEMsS0FBMUQsQ0FWSztBQVU2RDtBQUMzRSxnQkFBVSxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBeEIsRUFBa0MsQ0FBbEMsRUFBcUMsRUFBckMsRUFBeUMsQ0FBekMsRUFBNEMsRUFBNUMsRUFBZ0QsSUFBaEQsRUFBc0QsTUFBS3BDLEtBQTNELEVBQWtFLEVBQWxFLENBWEk7QUFXbUU7QUFDakYsZUFBUyxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBeEIsRUFBa0MsQ0FBbEMsRUFBcUMsRUFBckMsRUFBeUMsQ0FBekMsRUFBNEMsRUFBNUMsRUFBZ0QsS0FBaEQsRUFBdUQsTUFBS3BDLEtBQTVELENBWks7QUFZK0Q7QUFDN0UsZ0JBQVUsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEdBQUQsRUFBTSxFQUFOLENBQXhCLEVBQW1DLENBQW5DLEVBQXNDLEVBQXRDLEVBQTBDLENBQTFDLEVBQTZDLEVBQTdDLEVBQWlELEtBQWpELEVBQXdELE1BQUtwQyxLQUE3RCxDQWJJO0FBYWlFO0FBQy9FLGNBQVEsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXhCLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLEVBQTJDLENBQTNDLEVBQThDLEtBQTlDLEVBQXFELE1BQUtwQyxLQUExRCxDQWRNO0FBZWQsb0JBQWMsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXhCLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLEVBQTJDLENBQTNDLEVBQThDLEtBQTlDLEVBQXFELE1BQUtwQyxLQUExRCxDQWZBO0FBZ0JkLGtCQUFZLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxLQUE5QyxFQUFxRCxNQUFLcEMsS0FBMUQsRUFBaUUsQ0FBakUsQ0FoQkU7QUFpQmQsa0JBQVksSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXhCLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLEVBQTJDLENBQTNDLEVBQThDLEtBQTlDLEVBQXFELE1BQUtwQyxLQUExRCxFQUFpRSxDQUFqRTtBQWpCRSxLQUFsQjtBQXZGbUY7QUEwR3RGOzs7OzZCQUVRO0FBQUM7QUFDTjtBQUNBLFVBQUksS0FBSzJGLE1BQUwsQ0FBWTRELE1BQWhCLEVBQXdCO0FBQ3BCLFlBQUksS0FBS29QLFdBQUwsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsZUFBS0EsV0FBTDtBQUNIOztBQUNELFlBQUksS0FBS0MsY0FBTCxHQUFzQixDQUExQixFQUE2QjtBQUN6QixlQUFLQSxjQUFMO0FBQ0gsU0FObUIsQ0FPcEI7QUFDQTtBQUNBOzs7QUFDQSxZQUFJLEtBQUt0VCxJQUFMLENBQVV1VCxXQUFWLENBQXNCLEtBQUt2VCxJQUFMLENBQVV3VCxRQUFWLENBQW1CQyxLQUF6QyxFQUFnRHhQLE1BQWhELElBQTBELENBQUMsS0FBSzVELE1BQUwsQ0FBWWtJO0FBQVk7QUFBdkYsVUFBa0g7QUFDOUcsZ0JBQUksQ0FBQyxLQUFLbEksTUFBTCxDQUFZaEYsV0FBakIsRUFBOEI7QUFBRSxtQkFBS2dGLE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsSUFBMUI7QUFBZ0M7O0FBQUE7QUFDaEUsaUJBQUtnRixNQUFMLENBQVlxVCxPQUFaLEdBQXNCLElBQXRCO0FBQ0gsV0FIRCxDQUlBO0FBSkEsYUFLSyxJQUFJLEtBQUsxVCxJQUFMLENBQVV1VCxXQUFWLENBQXNCLEtBQUt2VCxJQUFMLENBQVV3VCxRQUFWLENBQW1CRyxJQUF6QyxFQUErQzFQLE1BQS9DLElBQXlELENBQUMsS0FBSzVELE1BQUwsQ0FBWWtJO0FBQVk7QUFBdEYsWUFBaUg7QUFDbEgsa0JBQUksS0FBS2xJLE1BQUwsQ0FBWWhGLFdBQWhCLEVBQTZCO0FBQUUscUJBQUtnRixNQUFMLENBQVloRixXQUFaLEdBQTBCLEtBQTFCO0FBQWlDOztBQUFBO0FBQ2hFLG1CQUFLZ0YsTUFBTCxDQUFZcVQsT0FBWixHQUFzQixJQUF0QjtBQUNILGFBbEJtQixDQW1CcEI7OztBQUNBLFlBQUksS0FBSzFULElBQUwsQ0FBVXVULFdBQVYsQ0FBc0IsS0FBS3ZULElBQUwsQ0FBVXdULFFBQVYsQ0FBbUJJLFFBQXpDLEVBQW1EM1AsTUFBdkQsRUFBK0Q7QUFDM0QsZUFBSzVELE1BQUwsQ0FBWXdULFNBQVosR0FBd0IsSUFBeEI7QUFDSCxTQXRCbUIsQ0F1QnBCOzs7QUFDQSxZQUFJLEtBQUs3VCxJQUFMLENBQVV1VCxXQUFWLENBQXNCLEtBQUt2VCxJQUFMLENBQVV3VCxRQUFWLENBQW1CTSxJQUF6QyxFQUErQzdQLE1BQS9DLElBQXlELENBQUMsS0FBSzVELE1BQUwsQ0FBWTBULE9BQXRFLElBQWlGLENBQUMsS0FBSzFULE1BQUwsQ0FBWWtJO0FBQVk7QUFBOUcsVUFBMEk7QUFDdEksaUJBQUtsSSxNQUFMLENBQVkwVCxPQUFaLEdBQXNCLElBQXRCO0FBQ0EsaUJBQUsxVCxNQUFMLENBQVkyVCxRQUFaLEdBQXVCLEtBQXZCO0FBQ0gsV0EzQm1CLENBNEJwQjs7O0FBQ0EsWUFBSSxLQUFLaFUsSUFBTCxDQUFVdVQsV0FBVixDQUFzQixLQUFLdlQsSUFBTCxDQUFVd1QsUUFBVixDQUFtQlMsS0FBekMsRUFBZ0RoUSxNQUFoRCxJQUEwRCxDQUFDLEtBQUs1RCxNQUFMLENBQVlrSSxXQUF2RSxJQUFzRixDQUFDLEtBQUtsSSxNQUFMLENBQVk2VCxVQUF2RyxFQUFtSDtBQUMvRyxlQUFLN1QsTUFBTCxDQUFZZ0ksUUFBWixHQUF1QixJQUF2QjtBQUNILFNBL0JtQixDQWdDcEI7OztBQUNBLFlBQUksS0FBS3JJLElBQUwsQ0FBVXVULFdBQVYsQ0FBc0IsS0FBS3ZULElBQUwsQ0FBVXdULFFBQVYsQ0FBbUJXLE1BQXpDLEVBQWlEbFEsTUFBakQsSUFBMkQsS0FBSzVELE1BQUwsQ0FBWTJULFFBQXZFLElBQW1GLENBQUMsS0FBSzNULE1BQUwsQ0FBWWtJLFdBQXBHLEVBQWlIO0FBQzdHLGVBQUtoSSxTQUFMLENBQWVxQixLQUFmO0FBQ0EsZUFBSzVCLElBQUwsQ0FBVWtDLFNBQVYsQ0FBb0IsYUFBcEI7QUFDQSxlQUFLa1MsU0FBTCxDQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsSUFBcEMsRUFBMEMsS0FBSy9ULE1BQUwsQ0FBWWhGLFdBQXRELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLEVBQXdGLElBQXhGLEVBQThGLEtBQUtnRixNQUFMLENBQVl3VCxTQUExRyxFQUFxSCxLQUFySCxFQUE0SCxLQUE1SDtBQUNBLGVBQUt4VCxNQUFMLENBQVlnVSxRQUFaLEdBQXVCLElBQXZCO0FBQ0EsZUFBS2hVLE1BQUwsQ0FBWWtJLFdBQVosR0FBMEIsSUFBMUI7QUFDSCxTQXZDbUIsQ0F3Q3BCOzs7QUFDQSxZQUFJLEtBQUt2SSxJQUFMLENBQVV1VCxXQUFWLENBQXNCLEtBQUt2VCxJQUFMLENBQVV3VCxRQUFWLENBQW1CYyxLQUF6QyxFQUFnRHJRLE1BQWhELElBQTBELEtBQUs1RCxNQUFMLENBQVkyVCxRQUF0RSxLQUFtRixDQUFDLEtBQUszVCxNQUFMLENBQVlrSSxXQUFiLElBQTRCLEtBQUtsSSxNQUFMLENBQVlrVSxPQUEzSCxDQUFKLEVBQXlJO0FBQ3JJLGNBQUksS0FBS3ZVLElBQUwsQ0FBVXVULFdBQVYsQ0FBc0IsS0FBS3ZULElBQUwsQ0FBVXdULFFBQVYsQ0FBbUJDLEtBQXpDLEVBQWdEeFAsTUFBcEQsRUFBNEQ7QUFBRSxpQkFBSzVELE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsSUFBMUI7QUFBaUMsV0FBL0YsTUFDSyxJQUFJLEtBQUsyRSxJQUFMLENBQVV1VCxXQUFWLENBQXNCLEtBQUt2VCxJQUFMLENBQVV3VCxRQUFWLENBQW1CRyxJQUF6QyxFQUErQzFQLE1BQW5ELEVBQTJEO0FBQUUsaUJBQUs1RCxNQUFMLENBQVloRixXQUFaLEdBQTBCLEtBQTFCO0FBQWtDOztBQUNwRyxlQUFLa0YsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUs1QixJQUFMLENBQVVrQyxTQUFWLENBQW9CLGFBQXBCO0FBQ0EsZUFBS2tTLFNBQUwsQ0FBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQUsvVCxNQUFMLENBQVloRixXQUF2RCxFQUFvRSxLQUFwRSxFQUEyRSxJQUEzRSxFQUFpRixLQUFqRixFQUF3RixJQUF4RixFQUE4RixLQUFLZ0YsTUFBTCxDQUFZd1QsU0FBMUcsRUFBcUgsS0FBckgsRUFBNEgsS0FBNUg7QUFDSCxTQS9DbUIsQ0FnRHBCOzs7QUFDQSxZQUFJLEtBQUs3VCxJQUFMLENBQVV1VCxXQUFWLENBQXNCLEtBQUt2VCxJQUFMLENBQVV3VCxRQUFWLENBQW1CZ0IsSUFBekMsRUFBK0N2USxNQUEvQyxJQUF5RCxDQUFDLEtBQUs1RCxNQUFMLENBQVlrSSxXQUF0RSxJQUFxRixDQUFDLEtBQUtsSSxNQUFMLENBQVlnSSxRQUF0RyxFQUFnSDtBQUM1RyxjQUFJLEtBQUtzSixNQUFMLElBQWUsS0FBS0ssY0FBeEIsRUFBd0M7QUFDcEMsaUJBQUszUixNQUFMLENBQVlrVSxPQUFaLEdBQXNCLElBQXRCO0FBQ0EsaUJBQUtsVSxNQUFMLENBQVlvVSxZQUFaLEdBQTJCLElBQTNCO0FBQ0EsaUJBQUtwVSxNQUFMLENBQVlxVSxTQUFaLEdBQXdCLElBQXhCO0FBQ0EsaUJBQUtyVSxNQUFMLENBQVlxVCxPQUFaLEdBQXNCLEtBQXRCO0FBQ0EsaUJBQUtyVCxNQUFMLENBQVlrSSxXQUFaLEdBQTBCLElBQTFCO0FBQ0gsV0FORCxNQU9LO0FBQ0QsaUJBQUt2SSxJQUFMLENBQVVrQyxTQUFWLENBQW9CLGVBQXBCO0FBQ0g7QUFDSixTQTVEbUIsQ0E4RHBCOzs7QUFDQSxZQUFJLEVBQUUsS0FBS2xDLElBQUwsQ0FBVXVULFdBQVYsQ0FBc0IsS0FBS3ZULElBQUwsQ0FBVXdULFFBQVYsQ0FBbUJDLEtBQXpDLEVBQWdEeFAsTUFBaEQsSUFBMEQsS0FBS2pFLElBQUwsQ0FBVXVULFdBQVYsQ0FBc0IsS0FBS3ZULElBQUwsQ0FBVXdULFFBQVYsQ0FBbUJHLElBQXpDLEVBQStDMVAsTUFBM0csS0FDRyxLQUFLNUQsTUFBTCxDQUFZcVQsT0FEbkIsRUFDNEI7QUFDeEIsZUFBS3JULE1BQUwsQ0FBWXFULE9BQVosR0FBc0IsS0FBdEI7QUFDSDs7QUFDRCxZQUFJLENBQUMsS0FBSzFULElBQUwsQ0FBVXVULFdBQVYsQ0FBc0IsS0FBS3ZULElBQUwsQ0FBVXdULFFBQVYsQ0FBbUJJLFFBQXpDLEVBQW1EM1AsTUFBeEQsRUFBZ0U7QUFDNUQsZUFBSzVELE1BQUwsQ0FBWXdULFNBQVosR0FBd0IsS0FBeEI7QUFDSCxTQXJFbUIsQ0F3RXBCOzs7QUFDQSxZQUFJLEtBQUtoQixTQUFMLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLGVBQUtBLFNBQUwsSUFBa0IsQ0FBbEI7QUFDSCxTQTNFbUIsQ0E0RXBCOzs7QUFDQSxZQUFJLEtBQUt4UyxNQUFMLENBQVlxVCxPQUFoQixFQUF5QjtBQUNyQixjQUFJLEtBQUtyVCxNQUFMLENBQVloRixXQUFoQixFQUE2QjtBQUN6QixpQkFBS0YsQ0FBTCxJQUFVLEtBQUs0SSxhQUFmLENBRHlCLENBRXpCOztBQUNBLGlCQUFLdkQsTUFBTCxJQUFlLEtBQUt1RCxhQUFwQjtBQUNILFdBSkQsTUFJTztBQUNILGlCQUFLNUksQ0FBTCxJQUFVLEtBQUs0SSxhQUFmLENBREcsQ0FFSDs7QUFDQSxpQkFBS3ZELE1BQUwsSUFBZSxLQUFLdUQsYUFBcEI7QUFDSDtBQUNKLFNBdkZtQixDQXdGcEI7OztBQUNBLFlBQUksS0FBSzFELE1BQUwsQ0FBWTBULE9BQWhCLEVBQXlCO0FBQ3JCLGVBQUsxVCxNQUFMLENBQVkwVCxPQUFaLEdBQXNCLEtBQXRCOztBQUVBLGNBQUksS0FBS3pDLFNBQUwsR0FBaUIsQ0FBakIsSUFBc0IsS0FBS3VCLFNBQUwsSUFBa0IsQ0FBNUMsRUFBK0M7QUFDM0MsaUJBQUt2QixTQUFMLElBQWtCLENBQWxCO0FBQ0EsaUJBQUt1QixTQUFMLEdBQWlCLEtBQUtDLFlBQXRCO0FBQ0EsaUJBQUtqUyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsaUJBQUtBLFNBQUwsSUFBa0IsS0FBS3dRLFlBQXZCO0FBQ0g7QUFDSixTQWxHbUIsQ0FtR3BCOzs7QUFDQSxZQUFJLEtBQUtoUixNQUFMLENBQVlnVSxRQUFoQixFQUEwQjtBQUN0QixjQUFJLENBQUMsS0FBS2hVLE1BQUwsQ0FBWXdULFNBQWIsSUFBMEIsQ0FBQyxLQUFLeFQsTUFBTCxDQUFZc1UsWUFBM0MsRUFBeUQ7QUFDckQsZ0JBQUksS0FBS3BVLFNBQUwsQ0FBZS9FLFlBQWYsTUFBaUMsQ0FBakMsSUFBc0MsS0FBSytFLFNBQUwsQ0FBZS9FLFlBQWYsTUFBaUMsQ0FBM0UsRUFBOEU7QUFBQztBQUMzRSxrQkFBSSxLQUFLNkUsTUFBTCxDQUFZaEYsV0FBaEIsRUFDSSxLQUFLMkUsSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUksZ0RBQUosQ0FBWSxLQUFLTyxJQUFqQixFQUF1QixLQUFLOUUsR0FBNUIsRUFBaUMsS0FBS3NGLE1BQXRDLEVBQThDLEtBQUtDLE1BQW5ELEVBQTJELENBQUMsR0FBNUQsRUFBaUUsQ0FBakUsRUFDaEIsS0FBS1IsV0FEVyxFQUNFLEtBQUtDLFlBRFAsRUFDcUIsR0FEckIsRUFDMEIsRUFEMUIsRUFDOEIsS0FBS3hGLEtBRG5DLEVBQzBDLEdBRDFDLEVBQytDLEtBQUsyRixNQUFMLENBQVloRixXQUQzRCxDQUFwQixFQURKLEtBSUksS0FBSzJFLElBQUwsQ0FBVVAsU0FBVixDQUFvQixJQUFJLGdEQUFKLENBQVksS0FBS08sSUFBakIsRUFBdUIsS0FBSzlFLEdBQTVCLEVBQWlDLEtBQUtzRixNQUF0QyxFQUE4QyxLQUFLQyxNQUFuRCxFQUEyRCxDQUFDLEVBQUQsR0FBTSxLQUFLUixXQUFYLEdBQXlCLEdBQXBGLEVBQXlGLENBQXpGLEVBQ2hCLEtBQUtBLFdBRFcsRUFDRSxLQUFLQyxZQURQLEVBQ3FCLEdBRHJCLEVBQzBCLEVBRDFCLEVBQzhCLEtBQUt4RixLQURuQyxFQUMwQyxHQUQxQyxFQUMrQyxLQUFLMkYsTUFBTCxDQUFZaEYsV0FEM0QsQ0FBcEI7QUFFUDs7QUFDRCxnQkFBSSxLQUFLa0YsU0FBTCxDQUFlL0UsWUFBZixNQUFpQyxDQUFqQyxJQUFzQyxLQUFLK0UsU0FBTCxDQUFlL0UsWUFBZixNQUFpQyxDQUEzRSxFQUE4RTtBQUFDO0FBQzNFLGtCQUFJLEtBQUs2RSxNQUFMLENBQVloRixXQUFoQixFQUNJLEtBQUsyRSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSxnREFBSixDQUFZLEtBQUtPLElBQWpCLEVBQXVCLEtBQUs5RSxHQUE1QixFQUFpQyxLQUFLc0YsTUFBdEMsRUFBOEMsS0FBS0MsTUFBbkQsRUFBMkQsQ0FBQyxFQUE1RCxFQUFnRSxHQUFoRSxFQUNoQixLQUFLUixXQURXLEVBQ0UsS0FBS0MsWUFEUCxFQUNxQixFQURyQixFQUN5QixHQUR6QixFQUM4QixLQUFLeEYsS0FEbkMsRUFDMEMsR0FEMUMsRUFDK0MsS0FBSzJGLE1BQUwsQ0FBWWhGLFdBRDNELENBQXBCLEVBREosS0FJSSxLQUFLMkUsSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUksZ0RBQUosQ0FBWSxLQUFLTyxJQUFqQixFQUF1QixLQUFLOUUsR0FBNUIsRUFBaUMsS0FBS3NGLE1BQXRDLEVBQThDLEtBQUtDLE1BQW5ELEVBQTJELENBQUMsRUFBRCxHQUFNLEtBQUtSLFdBQVgsR0FBeUIsR0FBcEYsRUFBeUYsR0FBekYsRUFDaEIsS0FBS0EsV0FEVyxFQUNFLEtBQUtDLFlBRFAsRUFDcUIsRUFEckIsRUFDeUIsR0FEekIsRUFDOEIsS0FBS3hGLEtBRG5DLEVBQzBDLEdBRDFDLEVBQytDLEtBQUsyRixNQUFMLENBQVloRixXQUQzRCxDQUFwQjtBQUVQO0FBQ0osV0FqQkQsTUFrQks7QUFDRCxnQkFBSSxLQUFLZ0YsTUFBTCxDQUFZd1QsU0FBWixJQUF5QixDQUFDLEtBQUt4VCxNQUFMLENBQVlzVSxZQUF0QyxJQUFxRCxLQUFLcFUsU0FBTCxDQUFlL0UsWUFBZixNQUFpQyxDQUF0RixJQUEyRixLQUFLK0UsU0FBTCxDQUFlL0UsWUFBZixNQUFpQyxDQUFoSSxFQUFtSTtBQUMvSCxrQkFBSSxLQUFLbVcsTUFBTCxJQUFlLEtBQUtFLGdCQUF4QixFQUEwQztBQUN0QyxvQkFBSSxLQUFLeFIsTUFBTCxDQUFZaEYsV0FBaEIsRUFBNkI7QUFDekIsdUJBQUsyRSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSxtREFBSixDQUFlLEtBQUtPLElBQXBCLEVBQTBCLEtBQUs5RSxHQUEvQixFQUFvQyxLQUFLc0YsTUFBekMsRUFBaUQsS0FBS0MsTUFBdEQsRUFBOEQsRUFBOUQsRUFBa0UsR0FBbEUsRUFDaEIsS0FBS1IsV0FEVyxFQUNFLEtBQUtDLFlBRFAsRUFDcUIsRUFEckIsRUFDeUIsR0FEekIsRUFDOEIsS0FBS3hGLEtBRG5DLEVBQzBDLEtBQUsyRixNQUFMLENBQVloRixXQUR0RCxFQUNtRSxJQURuRSxFQUN5RSxDQUR6RSxDQUFwQjtBQUVILGlCQUhELE1BSUs7QUFDRCx1QkFBSzJFLElBQUwsQ0FBVVAsU0FBVixDQUFvQixJQUFJLG1EQUFKLENBQWUsS0FBS08sSUFBcEIsRUFBMEIsS0FBSzlFLEdBQS9CLEVBQW9DLEtBQUtzRixNQUF6QyxFQUFpRCxLQUFLQyxNQUF0RCxFQUE4RCxFQUE5RCxFQUFrRSxHQUFsRSxFQUNoQixLQUFLUixXQURXLEVBQ0UsS0FBS0MsWUFEUCxFQUNxQixFQURyQixFQUN5QixHQUR6QixFQUM4QixLQUFLeEYsS0FEbkMsRUFDMEMsS0FBSzJGLE1BQUwsQ0FBWWhGLFdBRHRELEVBQ21FLElBRG5FLEVBQ3lFLENBRHpFLENBQXBCO0FBRUg7O0FBQ0QscUJBQUt1WixTQUFMLENBQWUsS0FBSy9DLGdCQUFwQjtBQUNBLHFCQUFLeFIsTUFBTCxDQUFZc1UsWUFBWixHQUEyQixJQUEzQjtBQUNILGVBWEQsTUFZSztBQUNELHFCQUFLM1UsSUFBTCxDQUFVa0MsU0FBVixDQUFvQixlQUFwQjtBQUNIO0FBQ0o7QUFDSjs7QUFDRCxjQUFJLEtBQUszQixTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIsaUJBQUtpRixTQUFMLENBQWVxQixLQUFmO0FBQ0EsaUJBQUt2QixNQUFMLENBQVlnVSxRQUFaLEdBQXVCLEtBQXZCO0FBQ0EsaUJBQUtoVSxNQUFMLENBQVlrSSxXQUFaLEdBQTBCLEtBQTFCO0FBQ0EsaUJBQUtsSSxNQUFMLENBQVlzVSxZQUFaLEdBQTJCLEtBQTNCO0FBQ0g7QUFFSixTQWpKbUIsQ0FrSnBCOzs7QUFDQSxZQUFJLEtBQUt0VSxNQUFMLENBQVlnSSxRQUFaLElBQXdCLEVBQUUsS0FBSzBLLGtCQUFMLEdBQTBCLENBQTVCLENBQTVCLEVBQTREO0FBQ3hELGNBQUksQ0FBQyxLQUFLMVMsTUFBTCxDQUFZNlQsVUFBakIsRUFBNkI7QUFDekIsZ0JBQUksS0FBS3ZDLE1BQUwsSUFBZSxLQUFLSSxlQUFwQixJQUF1QyxLQUFLMVIsTUFBTCxDQUFZd1QsU0FBdkQsRUFBa0U7QUFDOUQsbUJBQUs3VCxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSxtREFBSixDQUFlLEtBQUtPLElBQXBCLEVBQTBCLEtBQUs3RSxDQUEvQixFQUFrQyxLQUFLQyxDQUF2QyxFQUEwQyxLQUFLMEIsR0FBL0MsRUFBb0QsS0FBSzVCLEdBQXpELEVBQThELEtBQUtSLEtBQW5FLEVBQTBFLEtBQUsyRixNQUFMLENBQVloRixXQUF0RixFQUFtRyxLQUFLZ0YsTUFBTCxDQUFZd1QsU0FBL0csQ0FBcEI7QUFDQSxtQkFBS2UsU0FBTCxDQUFlLEtBQUs3QyxlQUFwQjtBQUNBLG1CQUFLMVIsTUFBTCxDQUFZNlQsVUFBWixHQUF5QixJQUF6QjtBQUNBLG1CQUFLbFUsSUFBTCxDQUFVa0MsU0FBVixDQUFvQixZQUFwQjtBQUNILGFBTEQsTUFNSyxJQUFJLEtBQUt5UCxNQUFMLElBQWUsS0FBS0csU0FBcEIsSUFBaUMsQ0FBQyxLQUFLelIsTUFBTCxDQUFZd1QsU0FBbEQsRUFBNkQ7QUFDOUQsbUJBQUs3VCxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSxtREFBSixDQUFlLEtBQUtPLElBQXBCLEVBQTBCLEtBQUs3RSxDQUEvQixFQUFrQyxLQUFLQyxDQUF2QyxFQUEwQyxLQUFLMEIsR0FBL0MsRUFBb0QsS0FBSzVCLEdBQXpELEVBQThELEtBQUtSLEtBQW5FLEVBQTBFLEtBQUsyRixNQUFMLENBQVloRixXQUF0RixFQUFtRyxLQUFuRyxDQUFwQjtBQUNBLG1CQUFLc1csTUFBTCxJQUFlLEtBQUtHLFNBQXBCO0FBQ0EsbUJBQUt6UixNQUFMLENBQVk2VCxVQUFaLEdBQXlCLElBQXpCO0FBQ0EsbUJBQUtsVSxJQUFMLENBQVVrQyxTQUFWLENBQW9CLFlBQXBCO0FBQ0gsYUFMSSxNQU1BO0FBQ0QsbUJBQUszQixTQUFMLENBQWVxQixLQUFmO0FBQ0EsbUJBQUt2QixNQUFMLENBQVlnSSxRQUFaLEdBQXVCLEtBQXZCO0FBQ0EsbUJBQUswSyxrQkFBTCxHQUEwQixLQUFLQyxhQUEvQjtBQUNBLG1CQUFLM1MsTUFBTCxDQUFZa0ksV0FBWixHQUEwQixLQUExQjtBQUNBLG1CQUFLbEksTUFBTCxDQUFZNlQsVUFBWixHQUF5QixLQUF6QjtBQUNBLG1CQUFLbFUsSUFBTCxDQUFVa0MsU0FBVixDQUFvQixlQUFwQjtBQUNIO0FBQ0o7O0FBQ0QsY0FBSSxLQUFLM0IsU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLGlCQUFLaUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLdkIsTUFBTCxDQUFZZ0ksUUFBWixHQUF1QixLQUF2QjtBQUNBLGlCQUFLMEssa0JBQUwsR0FBMEIsS0FBS0MsYUFBL0I7QUFDQSxpQkFBSzNTLE1BQUwsQ0FBWWtJLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxpQkFBS2xJLE1BQUwsQ0FBWTZULFVBQVosR0FBeUIsS0FBekI7QUFDSDtBQUNKLFNBakxtQixDQWtMcEI7OztBQUNBLFlBQUksS0FBSzdULE1BQUwsQ0FBWXdVLFFBQWhCLEVBQTBCO0FBQ3RCLGVBQUt4VSxNQUFMLENBQVl5VSxVQUFaLEdBQXlCLElBQXpCLENBRHNCLENBQ1M7O0FBQy9CLGNBQUksS0FBS3ZVLFNBQUwsQ0FBZS9FLFlBQWYsT0FBa0MsQ0FBbEMsSUFBdUMsS0FBSzZFLE1BQUwsQ0FBWXdULFNBQW5ELElBQWdFLENBQUMsS0FBS3hULE1BQUwsQ0FBWTZULFVBQWpGLEVBQTZGO0FBQ3pGLGdCQUFJLEtBQUt2QyxNQUFMLElBQWUsS0FBS0MsZUFBeEIsRUFBeUM7QUFDckMsbUJBQUs1UixJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSx5REFBSixDQUFxQixLQUFLTyxJQUExQixFQUFnQyxLQUFLN0UsQ0FBTCxHQUFTLEVBQXpDLEVBQTZDLEtBQUtDLENBQWxELEVBQXFELEtBQUswQixHQUExRCxFQUErRCxLQUFLNUIsR0FBcEUsRUFBeUUsS0FBS1IsS0FBOUUsRUFBcUYsS0FBSzJGLE1BQUwsQ0FBWWhGLFdBQWpHLENBQXBCO0FBQ0EsbUJBQUtnRixNQUFMLENBQVk2VCxVQUFaLEdBQXlCLElBQXpCO0FBQ0EsbUJBQUtVLFNBQUwsQ0FBZSxLQUFLaEQsZUFBcEI7QUFDSCxhQUpELE1BS0s7QUFDRCxtQkFBSzVSLElBQUwsQ0FBVWtDLFNBQVYsQ0FBb0IsZUFBcEI7QUFDSDtBQUNKOztBQUNELGNBQUksS0FBSzNCLFNBQUwsQ0FBZS9FLFlBQWYsTUFBaUMsQ0FBakMsSUFBc0MsS0FBSytFLFNBQUwsQ0FBZS9FLFlBQWYsTUFBaUMsQ0FBM0UsRUFBOEU7QUFBQztBQUMzRSxnQkFBSSxLQUFLNkUsTUFBTCxDQUFZaEYsV0FBaEIsRUFBNEI7QUFDeEIsbUJBQUsyRSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSxnREFBSixDQUFZLEtBQUtPLElBQWpCLEVBQXVCLEtBQUs5RSxHQUE1QixFQUFpQyxLQUFLc0YsTUFBdEMsRUFBOEMsS0FBS0MsTUFBbkQsRUFBMkQsQ0FBQyxFQUE1RCxFQUFnRSxHQUFoRSxFQUNoQixLQUFLUixXQURXLEVBQ0UsS0FBS0MsWUFEUCxFQUNxQixFQURyQixFQUN5QixHQUR6QixFQUM4QixLQUFLeEYsS0FEbkMsRUFDMEMsRUFEMUMsRUFDOEMsS0FBSzJGLE1BQUwsQ0FBWWhGLFdBRDFELENBQXBCLEVBREosS0FHSztBQUNELG1CQUFLMkUsSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUksZ0RBQUosQ0FBWSxLQUFLTyxJQUFqQixFQUF1QixLQUFLOUUsR0FBNUIsRUFBaUMsS0FBS3NGLE1BQXRDLEVBQThDLEtBQUtDLE1BQW5ELEVBQTJELENBQUMsRUFBRCxHQUFNLEtBQUtSLFdBQVgsR0FBeUIsR0FBcEYsRUFBeUYsR0FBekYsRUFDaEIsS0FBS0EsV0FEVyxFQUNFLEtBQUtDLFlBRFAsRUFDcUIsRUFEckIsRUFDeUIsR0FEekIsRUFDOEIsS0FBS3hGLEtBRG5DLEVBQzBDLEVBRDFDLEVBQzhDLEtBQUsyRixNQUFMLENBQVloRixXQUQxRCxDQUFwQjtBQUdQOztBQUNELGNBQUksS0FBS2tGLFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixpQkFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWXdVLFFBQVosR0FBdUIsS0FBdkI7QUFDQSxpQkFBS3hVLE1BQUwsQ0FBWTBVLFVBQVosR0FBeUIsS0FBekI7QUFDQSxpQkFBSzFVLE1BQUwsQ0FBWTZULFVBQVosR0FBeUIsS0FBekI7QUFDQSxpQkFBSzdULE1BQUwsQ0FBWWtJLFdBQVosR0FBMEIsS0FBMUI7QUFDSDtBQUNKLFNBL01tQixDQWdOcEI7OztBQUNBLFlBQUksS0FBS2xJLE1BQUwsQ0FBWWtVLE9BQWhCLEVBQXlCO0FBQ3JCLGNBQUksS0FBS2xVLE1BQUwsQ0FBWWhGLFdBQWhCLEVBQTZCO0FBQUUsaUJBQUtxRyxTQUFMLENBQWUsS0FBSzBQLFNBQXBCLEVBQStCLENBQS9CO0FBQW9DLFdBQW5FLE1BQ0s7QUFBRSxpQkFBSzFQLFNBQUwsQ0FBZSxDQUFDLEtBQUswUCxTQUFyQixFQUFnQyxDQUFoQztBQUFxQyxXQUZ2QixDQUdyQjs7O0FBQ0EsY0FBSSxLQUFLL1EsTUFBTCxDQUFZb1UsWUFBaEIsRUFBOEI7QUFDMUIsZ0JBQUksS0FBS3BVLE1BQUwsQ0FBWXFVLFNBQWhCLEVBQTJCO0FBQ3ZCLG1CQUFLbk4sWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QjtBQUNBLG1CQUFLbEgsTUFBTCxDQUFZeVUsVUFBWixHQUF5QixLQUF6QjtBQUNBLG1CQUFLalUsU0FBTCxHQUFpQixDQUFqQjs7QUFDQSxrQkFBSSxLQUFLOFEsTUFBTCxJQUFlLEtBQUtLLGNBQXhCLEVBQXdDO0FBQ3BDLHFCQUFLTCxNQUFMLElBQWUsS0FBS0ssY0FBcEI7QUFDQSxxQkFBSzNSLE1BQUwsQ0FBWTJVLFVBQVosR0FBeUIsSUFBekI7QUFDSDs7QUFDRCxtQkFBS3RDLGdCQUFMLEdBQXdCLEtBQUtELFdBQTdCO0FBQ0EsbUJBQUtwUyxNQUFMLENBQVlxVSxTQUFaLEdBQXdCLEtBQXhCO0FBQ0g7O0FBQ0QsZ0JBQUksS0FBS25VLFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixtQkFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxtQkFBS3ZCLE1BQUwsQ0FBWW9VLFlBQVosR0FBMkIsS0FBM0I7QUFDQSxtQkFBS2xOLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBQyxFQUF0QztBQUNBLG1CQUFLbEgsTUFBTCxDQUFZNFUsVUFBWixHQUF5QixJQUF6QjtBQUNBLGtCQUFJLEtBQUs1VSxNQUFMLENBQVkyVSxVQUFoQixFQUNJLEtBQUszVSxNQUFMLENBQVk2VSxZQUFaLEdBQTJCLElBQTNCO0FBQ1A7QUFDSixXQXBCRCxNQXFCSyxJQUFJLEtBQUs3VSxNQUFMLENBQVk0VSxVQUFoQixFQUE0QjtBQUM3QixnQkFBSSxLQUFLMVUsU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLG1CQUFLaUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLG1CQUFLdkIsTUFBTCxDQUFZNlUsWUFBWixHQUEyQixLQUEzQjtBQUNBLG1CQUFLN1UsTUFBTCxDQUFZMlUsVUFBWixHQUF5QixLQUF6QjtBQUNBLG1CQUFLM1UsTUFBTCxDQUFZNFUsVUFBWixHQUF5QixLQUF6QjtBQUNBLG1CQUFLNVUsTUFBTCxDQUFZOFUsVUFBWixHQUF5QixJQUF6QjtBQUNBLG1CQUFLNU4sWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QjtBQUNIO0FBQ0osV0FUSSxNQVVBLElBQUksS0FBS2xILE1BQUwsQ0FBWThVLFVBQWhCLEVBQTRCO0FBQzdCLGdCQUFJLEtBQUs1VSxTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIsbUJBQUtpRixTQUFMLENBQWVxQixLQUFmO0FBQ0EsbUJBQUt2QixNQUFMLENBQVlxVSxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsbUJBQUtyVSxNQUFMLENBQVk4VSxVQUFaLEdBQXlCLEtBQXpCO0FBQ0EsbUJBQUs5VSxNQUFMLENBQVlrVSxPQUFaLEdBQXNCLEtBQXRCO0FBQ0EsbUJBQUtsVSxNQUFMLENBQVl5VSxVQUFaLEdBQXlCLElBQXpCO0FBQ0EsbUJBQUt6VSxNQUFMLENBQVlrSSxXQUFaLEdBQTBCLEtBQTFCO0FBQ0EsbUJBQUtoQixZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCO0FBQ0g7QUFDSjtBQUNKLFNBL1BtQixDQWdRcEI7OztBQUNBLFlBQUksS0FBS2xILE1BQUwsQ0FBWStVLE9BQWhCLEVBQXlCO0FBQ3JCO0FBQ0EsZUFBS2phLENBQUwsSUFBVSxLQUFLOFcsT0FBTCxHQUFlLENBQXpCO0FBQ0EsZUFBSzVSLE1BQUwsQ0FBWXlVLFVBQVosR0FBeUIsS0FBekI7QUFDQSxlQUFLalUsU0FBTCxHQUFpQixDQUFqQjs7QUFDQSxjQUFJLEtBQUtOLFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixpQkFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWStVLE9BQVosR0FBc0IsS0FBdEI7QUFDQSxpQkFBSy9VLE1BQUwsQ0FBWWtJLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxpQkFBSzZKLG1CQUFMLEdBQTJCLEtBQUtDLGNBQWhDO0FBQ0EsaUJBQUtoUyxNQUFMLENBQVl5VSxVQUFaLEdBQXlCLElBQXpCO0FBQ0EsaUJBQUs1QyxVQUFMLEdBQWtCLENBQWxCO0FBQ0g7QUFDSixTQTlRbUIsQ0ErUXBCOzs7QUFDQSxZQUFJLEtBQUs3UixNQUFMLENBQVlnVixJQUFoQixFQUFzQjtBQUNsQixjQUFJLEtBQUs5VSxTQUFMLENBQWV2RixLQUFmLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCLGlCQUFLdUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLdkIsTUFBTCxDQUFZZ1YsSUFBWixHQUFtQixLQUFuQjtBQUNBLGlCQUFLaFYsTUFBTCxDQUFZaU0sU0FBWixHQUF3QixJQUF4QjtBQUNIO0FBQ0osU0F0Um1CLENBdVJwQjs7O0FBQ0EsWUFBSSxLQUFLak0sTUFBTCxDQUFZaU0sU0FBaEIsRUFBMkIsQ0FFMUIsQ0FGRCxDQUNJO0FBR0o7OztBQUNBLFlBQUksS0FBS29HLGdCQUFMLEdBQXdCLENBQTVCLEVBQStCO0FBQzNCLGVBQUtBLGdCQUFMO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsY0FBSSxLQUFLSixtQkFBTCxHQUEyQixDQUEvQixFQUFrQztBQUM5QixpQkFBS0EsbUJBQUw7QUFDSCxXQUZELE1BR0ssSUFBSSxLQUFLWCxNQUFMLEdBQWMsS0FBS0QsU0FBdkIsRUFBa0M7QUFDbkMsaUJBQUtDLE1BQUw7O0FBQ0EsZ0JBQUksS0FBS1ksY0FBTCxHQUFzQixLQUFLQyxpQkFBL0IsRUFBa0Q7QUFBRTtBQUNoRCxtQkFBS0QsY0FBTCxJQUF1QixFQUF2QjtBQUNILGFBRkQsTUFHSyxJQUFJLEtBQUtBLGNBQUwsR0FBc0IsS0FBS0MsaUJBQTNCLEdBQStDLENBQUMsRUFBcEQsRUFBd0Q7QUFDekQ1VCxxQkFBTyxDQUFDQyxHQUFSLENBQVksS0FBSzBULGNBQWpCO0FBQ0EsbUJBQUtBLGNBQUwsSUFBdUIsR0FBdkI7QUFDSCxhQUhJLE1BSUE7QUFDRDNULHFCQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLMFQsY0FBakI7QUFDQSxtQkFBS0EsY0FBTCxHQUFzQixLQUFLQyxpQkFBM0I7QUFDSDs7QUFDRCxpQkFBS0YsbUJBQUwsR0FBMkIsS0FBS0MsY0FBaEM7QUFDSDtBQUNKOztBQUVELFlBQUksS0FBS0gsbUJBQUwsR0FBMkIsQ0FBL0IsRUFBa0M7QUFDOUIsZUFBS0EsbUJBQUw7QUFDSDs7QUFDRCxZQUFJLEtBQUtXLGtCQUFMLEdBQTBCLENBQTlCLEVBQWlDO0FBQzdCLGVBQUtBLGtCQUFMO0FBQ0gsU0F6VG1CLENBMlRwQjs7O0FBQ0EsWUFBSSxLQUFLMVMsTUFBTCxDQUFZeVUsVUFBWixJQUEwQixLQUFLalUsU0FBTCxHQUFpQixLQUFLMlEsZ0JBQXBELEVBQXNFO0FBQ2xFLGVBQUszUSxTQUFMLElBQWtCLEtBQUs0QixPQUFMLEdBQWUsS0FBS0EsT0FBdEM7QUFDSDs7QUFDRCxhQUFLckgsQ0FBTCxJQUFVLEtBQUt5RixTQUFmO0FBQ0EsYUFBSzZCLFVBQUwsR0FBa0IsS0FBS2pDLE1BQXZCO0FBQ0EsYUFBS0EsTUFBTCxJQUFlLEtBQUtJLFNBQXBCLENBalVvQixDQW1VcEI7O0FBQ0EsWUFBSSxLQUFLSyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsZUFBSzhKLFdBQUw7QUFDQSxlQUFLM0ssTUFBTCxDQUFZZ1YsSUFBWixHQUFtQixJQUFuQjtBQUNBLGVBQUtoVixNQUFMLENBQVlrSSxXQUFaLEdBQTBCLElBQTFCO0FBQ0EsZUFBS2xJLE1BQUwsQ0FBWXlVLFVBQVosR0FBeUIsS0FBekI7QUFDQSxlQUFLalUsU0FBTCxHQUFpQixDQUFqQjtBQUNILFNBMVVtQixDQTRVcEI7OztBQUNBLFlBQUksS0FBS1IsTUFBTCxDQUFZaVYsS0FBaEIsRUFBdUI7QUFDbkIsZUFBSzNELE1BQUwsR0FBYyxLQUFLRCxTQUFuQjtBQUNBLGVBQUtKLFNBQUwsR0FBaUIsQ0FBakI7QUFDSDtBQUNKO0FBQ0osSyxDQUFBOzs7O3lCQUVJcFcsRyxFQUFLO0FBQ04sVUFBSSxLQUFLMkYsU0FBTCxHQUFpQixDQUFqQixJQUFzQixDQUFDLEtBQUtSLE1BQUwsQ0FBWWdJLFFBQXZDLEVBQWlEO0FBQUM7QUFDOUMsYUFBS2QsWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxDQUFDLEVBQW5DLEVBQXVDLENBQUMsRUFBeEM7QUFDQSxhQUFLaEgsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCaVYsTUFBakM7QUFDSCxPQUhELE1BSUssSUFBSSxLQUFLMVUsU0FBTCxHQUFpQixDQUFqQixJQUFzQixDQUFDLEtBQUtSLE1BQUwsQ0FBWWdJLFFBQXZDLEVBQWlEO0FBQUM7QUFDbkQsYUFBS2QsWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QjtBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JrVixPQUFqQztBQUNILE9BSEksTUFJQSxJQUFJLEtBQUtuVixNQUFMLENBQVlxVCxPQUFaLElBQXVCLEtBQUtuVCxTQUE1QixJQUF5QyxDQUFDLEtBQUtGLE1BQUwsQ0FBWWdJLFFBQTFELEVBQW9FO0FBQUM7QUFDdEUsYUFBS2QsWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QjtBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JtVixNQUFqQztBQUNILE9BSEksTUFJQSxJQUFJLEtBQUtwVixNQUFMLENBQVlnSSxRQUFaLElBQXdCLEtBQUtoSSxNQUFMLENBQVkyVCxRQUF4QyxFQUFrRDtBQUFDO0FBQ3BELGFBQUt6TSxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCO0FBQ0EsYUFBS2hILFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQjJULEtBQWpDO0FBQ0gsT0FISSxNQUlBLElBQUksS0FBSzVULE1BQUwsQ0FBWWdJLFFBQVosSUFBd0IsQ0FBQyxLQUFLaEksTUFBTCxDQUFZMlQsUUFBekMsRUFBbUQ7QUFBQztBQUNyRCxhQUFLek0sWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QjtBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JvVixRQUFqQztBQUNILE9BSEksTUFJQSxJQUFJLEtBQUtyVixNQUFMLENBQVlnVSxRQUFoQixFQUEwQjtBQUFDO0FBQzVCLGFBQUs5TSxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCO0FBQ0EsYUFBS2hILFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQjZULE1BQWpDO0FBQ0gsT0FISSxNQUlBLElBQUksS0FBSzlULE1BQUwsQ0FBWXdVLFFBQWhCLEVBQTBCO0FBQUM7QUFDNUIsYUFBS3ROLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUI7QUFDQSxhQUFLaEgsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCZ1UsS0FBakM7QUFDSCxPQUhJLE1BSUEsSUFBSSxLQUFLalUsTUFBTCxDQUFZb1UsWUFBaEIsRUFBOEI7QUFBQztBQUNoQyxhQUFLbFUsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCcVYsVUFBakM7QUFDSCxPQUZJLE1BR0EsSUFBSSxLQUFLdFYsTUFBTCxDQUFZNFUsVUFBaEIsRUFBNEI7QUFBQztBQUM5QixhQUFLMVUsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCc1YsUUFBakM7QUFDSCxPQUZJLE1BR0EsSUFBSSxLQUFLdlYsTUFBTCxDQUFZOFUsVUFBaEIsRUFBNEI7QUFBQztBQUM5QixhQUFLNVUsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCdVYsUUFBakM7QUFDSCxPQUZJLE1BR0EsSUFBSSxLQUFLeFYsTUFBTCxDQUFZK1UsT0FBaEIsRUFBeUI7QUFDMUIsYUFBSzdOLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUI7QUFDQSxhQUFLaEgsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCd1YsSUFBakM7QUFDSCxPQUhJLE1BSUEsSUFBSSxLQUFLelYsTUFBTCxDQUFZZ1YsSUFBaEIsRUFBc0I7QUFDdkIsYUFBSzlVLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQitVLElBQWpDO0FBQ0gsT0FGSSxNQUdBO0FBQ0QsYUFBSzlOLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUI7QUFDQSxhQUFLaEgsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCOEgsSUFBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUs3SCxTQUFMLElBQWtCLEtBQUtGLE1BQUwsQ0FBWTRELE1BQWxDLEVBQTBDO0FBQ3RDLGFBQUtuQixPQUFMLENBQWE1SCxHQUFiO0FBQ0g7QUFDSjs7OzZCQUdRaUksSyxFQUFPQyxTLEVBQVc7QUFDdkI7QUFDQSxVQUFJRCxLQUFLLENBQUNaLElBQU4sS0FBZSxTQUFmLElBQTRCWSxLQUFLLENBQUNaLElBQU4sS0FBZSxRQUEvQyxFQUF5RDtBQUVyRDtBQUNBLFlBQUlhLFNBQVMsS0FBSyxRQUFsQixFQUE0QjtBQUN4QixlQUFLM0MsTUFBTCxHQUFjMEMsS0FBSyxDQUFDMUMsTUFBTixHQUFlLEtBQUtPLFdBQWxDO0FBQ0EsZUFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBTCxHQUFjLEtBQUtPLFdBQTVCOztBQUNBLGNBQUksS0FBS0gsU0FBTCxHQUFpQixDQUFyQixFQUF3QjtBQUNwQixpQkFBS0EsU0FBTCxHQUFpQixDQUFqQjtBQUNIOztBQUNELGVBQUt5USxTQUFMLEdBQWlCLEtBQUtDLFFBQXRCO0FBQ0EsZUFBS2xSLE1BQUwsQ0FBWTBULE9BQVosR0FBc0IsS0FBdEI7QUFDQSxlQUFLMVQsTUFBTCxDQUFZMlQsUUFBWixHQUF1QixJQUF2QjtBQUNILFNBVEQsQ0FXQTtBQVhBLGFBWUssSUFBSTVRLFNBQVMsS0FBSyxLQUFsQixFQUF5QjtBQUMxQixpQkFBSzNDLE1BQUwsR0FBYzBDLEtBQUssQ0FBQzFDLE1BQU4sR0FBZTBDLEtBQUssQ0FBQ25DLFdBQW5DO0FBQ0EsaUJBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQUwsR0FBYyxLQUFLTyxXQUE1QjtBQUNBLGlCQUFLMEIsVUFBTCxHQUFrQixLQUFLakMsTUFBdkI7QUFDQSxpQkFBS0ksU0FBTCxHQUFpQixDQUFqQjtBQUNILFdBTEksQ0FPTDtBQVBLLGVBUUEsSUFBSXVDLFNBQVMsS0FBSyxNQUFsQixFQUEwQjtBQUMzQixtQkFBSzVDLE1BQUwsR0FBYzJDLEtBQUssQ0FBQzNDLE1BQU4sR0FBZTJDLEtBQUssQ0FBQ3BDLFVBQW5DO0FBQ0EsbUJBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQWQ7QUFDSCxhQUhJLENBS0w7QUFMSyxpQkFNQSxJQUFJNEMsU0FBUyxLQUFLLE9BQWxCLEVBQTJCO0FBQzVCLHFCQUFLNUMsTUFBTCxHQUFjMkMsS0FBSyxDQUFDM0MsTUFBTixHQUFlLEtBQUtPLFVBQWxDO0FBQ0EscUJBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQWQ7QUFDSCxlQWhDb0QsQ0FpQ3JEOztBQUNIOztBQUNELFVBQUkyQyxLQUFLLENBQUNaLElBQU4sS0FBZSxNQUFmLElBQXlCLENBQUMsS0FBS2xDLE1BQUwsQ0FBWWdWLElBQXRDLElBQThDLENBQUMsS0FBS2hWLE1BQUwsQ0FBWWlWLEtBQS9ELEVBQXNFO0FBQ2xFLGFBQUt0SyxXQUFMO0FBQ0EsYUFBSzlKLE1BQUwsR0FBYyxDQUFkO0FBQ0EsYUFBS2IsTUFBTCxDQUFZK1UsT0FBWixHQUFzQixJQUF0QjtBQUNBLGFBQUsvVSxNQUFMLENBQVlrSSxXQUFaLEdBQTBCLElBQTFCO0FBQ0EsYUFBSzlILE1BQUwsR0FBYzBDLEtBQUssQ0FBQzFDLE1BQU4sR0FBZSxLQUFLTyxXQUFsQztBQUNBLGFBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQUwsR0FBYyxLQUFLTyxXQUFuQixHQUFpQyxDQUExQztBQUNBLGFBQUtoQixJQUFMLENBQVVrQyxTQUFWLENBQW9CLFdBQXBCO0FBQ0gsT0E3Q3NCLENBOEN2Qjs7O0FBQ0EsVUFBSSxDQUFDLEtBQUs3QixNQUFMLENBQVlpVixLQUFiLElBQXNCLEtBQUtsRCxtQkFBTCxJQUE0QixDQUFsRCxJQUF1RCxDQUFDLEtBQUsvUixNQUFMLENBQVk2VSxZQUFwRSxJQUFvRixDQUFDLEtBQUs3VSxNQUFMLENBQVlnVixJQUFqRyxJQUF5RyxDQUFDLEtBQUtoVixNQUFMLENBQVkrVSxPQUExSCxFQUFtSTtBQUMvSCxZQUFJalMsS0FBSyxDQUFDaEQsV0FBTixLQUFzQixPQUF0QixJQUFpQ2dELEtBQUssQ0FBQ1osSUFBTixLQUFlLE1BQXBELEVBQTREO0FBQ3hELGNBQUlZLEtBQUssQ0FBQ2hDLE1BQU4sR0FBZSxDQUFuQixFQUFzQjtBQUNsQjtBQUNBLGdCQUFJZ0MsS0FBSyxDQUFDd0YsVUFBTixLQUFxQixRQUF6QixFQUFtQztBQUMvQixtQkFBSzNJLElBQUwsQ0FBVWtDLFNBQVYsQ0FBb0IsV0FBcEI7QUFDQSxtQkFBS2hCLE1BQUwsSUFBZSxLQUFLaVIsVUFBTCxHQUFnQmhQLEtBQUssQ0FBQ2hDLE1BQXJDLENBRitCLENBRy9COztBQUNBLG1CQUFLbUcsSUFBTCxHQUorQixDQUsvQjs7QUFDQSxrQkFBSW5FLEtBQUssQ0FBQzlDLE1BQU4sQ0FBYWhGLFdBQWpCLEVBQThCO0FBQUUscUJBQUs0VyxPQUFMLEdBQWUsQ0FBZjtBQUFtQixlQUFuRCxNQUF5RDtBQUFFLHFCQUFLQSxPQUFMLEdBQWUsQ0FBQyxDQUFoQjtBQUFvQjs7QUFDL0Usa0JBQUksS0FBSzlXLENBQUwsR0FBU2dJLEtBQUssQ0FBQ2hJLENBQWYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIscUJBQUtxRixNQUFMLEdBQWMyQyxLQUFLLENBQUMzQyxNQUFOLEdBQWUsS0FBS08sVUFBbEM7QUFDQSxxQkFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBZDtBQUNILGVBSEQsTUFJSztBQUNELHFCQUFLQSxNQUFMLEdBQWMyQyxLQUFLLENBQUMzQyxNQUFOLEdBQWUyQyxLQUFLLENBQUNwQyxVQUFuQztBQUNBLHFCQUFLNUYsQ0FBTCxHQUFTLEtBQUtxRixNQUFkO0FBQ0g7QUFDSixhQWZELE1BZ0JLLElBQUkyQyxLQUFLLENBQUN3RixVQUFOLEtBQXFCLFFBQXJCLElBQWlDLEtBQUtnSixNQUFMLEdBQWMsQ0FBbkQsRUFBc0Q7QUFDdkQsbUJBQUtZLGNBQUwsR0FBc0IsS0FBS0MsaUJBQUwsR0FBdUIsRUFBN0M7QUFDQSxtQkFBS2IsTUFBTCxHQUFjL1YsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBSzhWLE1BQUwsR0FBWSxDQUF2QixDQUFkO0FBQ0g7QUFDSjtBQUNKOztBQUNELFlBQUl4TyxLQUFLLENBQUNaLElBQU4sS0FBZSxVQUFuQixFQUErQjtBQUMzQixlQUFLdkMsSUFBTCxDQUFVa0MsU0FBVixDQUFvQixXQUFwQjtBQUNBLGVBQUtoQixNQUFMLElBQWVpQyxLQUFLLENBQUNoQyxNQUFyQjtBQUNBLGVBQUtpUixtQkFBTCxHQUEyQixLQUFLQyxjQUFoQztBQUNBLGVBQUsvSyxJQUFMOztBQUNBLGNBQUluRSxLQUFLLENBQUM5QyxNQUFOLENBQWFoRixXQUFqQixFQUE4QjtBQUFFLGlCQUFLNFcsT0FBTCxHQUFlLENBQWY7QUFBbUIsV0FBbkQsTUFBeUQ7QUFBRSxpQkFBS0EsT0FBTCxHQUFlLENBQUMsQ0FBaEI7QUFBb0I7QUFDbEY7O0FBQUMsWUFBSTlPLEtBQUssQ0FBQ1osSUFBTixLQUFlLFlBQW5CLEVBQWlDO0FBQy9CLGVBQUtyQixNQUFMLElBQWUsS0FBS2lSLFVBQUwsR0FBZ0JoUCxLQUFLLENBQUNoQyxNQUFyQztBQUNBZ0MsZUFBSyxDQUFDWCxlQUFOLEdBQXdCLElBQXhCO0FBQ0EsZUFBS3dJLFdBQUw7QUFDQSxlQUFLM0ssTUFBTCxDQUFZK1UsT0FBWixHQUFzQixJQUF0QjtBQUNBLGVBQUsvVSxNQUFMLENBQVlrSSxXQUFaLEdBQTBCLElBQTFCOztBQUNBLGNBQUlwRixLQUFLLENBQUM5QyxNQUFOLENBQWFoRixXQUFqQixFQUE4QjtBQUFFLGlCQUFLNFcsT0FBTCxHQUFlLENBQWY7QUFBbUIsV0FBbkQsTUFBeUQ7QUFBRSxpQkFBS0EsT0FBTCxHQUFlLENBQUMsQ0FBaEI7QUFBb0I7QUFDbEY7O0FBQ0QsWUFBSTlPLEtBQUssQ0FBQ1osSUFBTixLQUFlLFNBQW5CLEVBQThCO0FBQzFCWSxlQUFLLENBQUMrTCxjQUFOLENBQXFCLFNBQXJCO0FBQ0EvTCxlQUFLLENBQUMrTCxjQUFOLENBQXFCLFFBQXJCOztBQUNBLGNBQUkvTCxLQUFLLENBQUNFLE9BQVYsRUFBbUI7QUFFZixpQkFBS3JELElBQUwsQ0FBVWtDLFNBQVYsQ0FBb0IsV0FBcEI7QUFDQSxpQkFBS2hCLE1BQUwsSUFBZSxLQUFLaVIsVUFBTCxHQUFnQmhQLEtBQUssQ0FBQ2hDLE1BQXJDO0FBQ0EsaUJBQUtpUixtQkFBTCxHQUEyQixLQUFLQyxjQUFoQyxDQUplLENBS2Y7O0FBQ0EsaUJBQUtySCxXQUFMO0FBQ0EsaUJBQUszSyxNQUFMLENBQVkrVSxPQUFaLEdBQXNCLElBQXRCO0FBQ0EsaUJBQUsvVSxNQUFMLENBQVlrSSxXQUFaLEdBQTBCLElBQTFCOztBQUNBLGdCQUFJcEYsS0FBSyxDQUFDOUMsTUFBTixDQUFhaEYsV0FBakIsRUFBOEI7QUFBRSxtQkFBSzRXLE9BQUwsR0FBZSxDQUFmO0FBQW1CLGFBQW5ELE1BQXlEO0FBQUUsbUJBQUtBLE9BQUwsR0FBZSxDQUFDLENBQWhCO0FBQW9CO0FBQ2xGO0FBQ0o7QUFDSjtBQUNKO0FBRUQ7Ozs7aUNBQ2FsUCxNLEVBQVFDLE8sRUFBU0MsTSxFQUFRQyxPLEVBQTZCO0FBQUEsVUFBcEJ1QixJQUFvQix1RUFBYixDQUFhO0FBQUEsVUFBVkMsSUFBVSx1RUFBSCxDQUFHO0FBQy9ELFdBQUs1RCxPQUFMLEdBQWUsS0FBSzNGLENBQUwsR0FBVzRILE1BQU0sR0FBRyxLQUFLckksS0FBZixHQUF3QixDQUFsQyxHQUF1Q3FJLE1BQXZDLEdBQWdELENBQS9EO0FBQ0EsV0FBS2hDLFVBQUwsR0FBa0IsS0FBS3JHLEtBQUwsR0FBYXVJLE1BQS9CO0FBQ0EsV0FBS2pDLFdBQUwsR0FBbUIsS0FBS3RHLEtBQUwsR0FBYXdJLE9BQWhDO0FBQ0EsV0FBSzFDLE1BQUwsR0FBYyxLQUFLTSxPQUFMLEdBQWUsS0FBS0MsVUFBTCxHQUFrQixDQUFqQyxHQUFxQzBELElBQW5EO0FBQ0EsV0FBS2hFLE1BQUwsR0FBYyxLQUFLckYsQ0FBTCxHQUFTLEtBQUs0RixXQUFkLEdBQTRCMEQsSUFBMUM7QUFDSDs7OzhCQUVTZ1AsTyxFQUFTSyxPLEVBQVMxTCxRLEVBQVVnTSxRLEVBQVVoWixXLEVBQWEyWSxRLEVBQVVhLFEsRUFBVVgsVSxFQUFZM0wsVyxFQUFhc0wsUyxFQUFXVSxPLEVBQVNHLFMsRUFBVztBQUNySSxXQUFLclUsTUFBTCxDQUFZcVQsT0FBWixHQUFzQkEsT0FBdEI7QUFDQSxXQUFLclQsTUFBTCxDQUFZMFQsT0FBWixHQUFzQkEsT0FBdEI7QUFDQSxXQUFLMVQsTUFBTCxDQUFZZ0ksUUFBWixHQUF1QkEsUUFBdkI7QUFDQSxXQUFLaEksTUFBTCxDQUFZZ1UsUUFBWixHQUF1QkEsUUFBdkI7QUFDQSxXQUFLaFUsTUFBTCxDQUFZaEYsV0FBWixHQUEwQkEsV0FBMUI7QUFDQSxXQUFLZ0YsTUFBTCxDQUFZMlQsUUFBWixHQUF1QkEsUUFBdkI7QUFDQSxXQUFLM1QsTUFBTCxDQUFZd1UsUUFBWixHQUF1QkEsUUFBdkI7QUFDQSxXQUFLeFUsTUFBTCxDQUFZNlQsVUFBWixHQUF5QkEsVUFBekI7QUFDQSxXQUFLN1QsTUFBTCxDQUFZa0ksV0FBWixHQUEwQkEsV0FBMUI7QUFDQSxXQUFLbEksTUFBTCxDQUFZd1QsU0FBWixHQUF3QkEsU0FBeEI7QUFDQSxXQUFLeFQsTUFBTCxDQUFZa1UsT0FBWixHQUFzQkEsT0FBdEI7O0FBQ0EsVUFBSSxDQUFDLEtBQUtsVSxNQUFMLENBQVlrVSxPQUFqQixFQUEwQjtBQUN0QixhQUFLbFUsTUFBTCxDQUFZb1UsWUFBWixHQUEyQixLQUEzQjtBQUNBLGFBQUtwVSxNQUFMLENBQVk0VSxVQUFaLEdBQXlCLEtBQXpCO0FBQ0EsYUFBSzVVLE1BQUwsQ0FBWThVLFVBQVosR0FBeUIsS0FBekI7QUFDSDs7QUFDRCxXQUFLOVUsTUFBTCxDQUFZcVUsU0FBWixHQUF3QkEsU0FBeEI7QUFDSDs7O2tDQUVhO0FBQ1YsV0FBS04sU0FBTCxDQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBSy9ULE1BQUwsQ0FBWWhGLFdBQXZELEVBQW9FLEtBQXBFLEVBQTJFLEtBQTNFLEVBQWtGLEtBQWxGLEVBQXlGLEtBQXpGLEVBQWdHLEtBQUtnRixNQUFMLENBQVl3VCxTQUE1RyxFQUF1SCxLQUF2SCxFQUE4SCxLQUE5SDtBQUNBLFdBQUt4VCxNQUFMLENBQVl5VSxVQUFaLEdBQXlCLElBQXpCO0FBQ0EsV0FBS3pVLE1BQUwsQ0FBWStVLE9BQVosR0FBc0IsS0FBdEI7QUFDQSxXQUFLL1UsTUFBTCxDQUFZZ1YsSUFBWixHQUFtQixLQUFuQjtBQUNIOzs7MkJBRU07QUFDSCxXQUFLckssV0FBTDtBQUNBLFdBQUt6SyxTQUFMLENBQWVxQixLQUFmO0FBQ0EsV0FBS3ZCLE1BQUwsQ0FBWStVLE9BQVosR0FBc0IsSUFBdEI7QUFDQSxXQUFLL1UsTUFBTCxDQUFZa0ksV0FBWixHQUEwQixJQUExQjtBQUNIOzs7OEJBRVN3TixJLEVBQU07QUFDWixXQUFLcEUsTUFBTCxJQUFlb0UsSUFBZjtBQUNBLFdBQUtyRCxnQkFBTCxHQUF3QixLQUFLc0QsbUJBQTdCO0FBQ0g7Ozs4QkFFUztBQUNOLFdBQUszVixNQUFMLENBQVlpTSxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsV0FBS3RCLFdBQUw7QUFDQSxXQUFLbkssU0FBTCxHQUFpQixDQUFqQjtBQUNBLFdBQUtLLE1BQUwsR0FBYyxLQUFLdVEsU0FBbkI7QUFDQSxXQUFLRSxNQUFMLEdBQWMsS0FBS0QsU0FBbkI7QUFDQSxXQUFLMVIsSUFBTCxDQUFVVCxTQUFWLENBQW9CaUwsU0FBcEIsR0FBZ0MsS0FBS3hLLElBQUwsQ0FBVVQsU0FBVixDQUFvQm1MLEtBQXBCLEdBQTRCLENBQTVEO0FBQ0EsV0FBSzFLLElBQUwsQ0FBVVQsU0FBVixDQUFvQm1MLEtBQXBCLEdBQTRCLEtBQUsxSyxJQUFMLENBQVVULFNBQVYsQ0FBb0JpTCxTQUFoRDtBQUNBLFdBQUswSCxVQUFMLEdBQWtCLENBQWxCO0FBQ0g7OztnQ0FFWWhYLEcsRUFBSztBQUNkQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7NEJBR1F4SSxHLEVBQUs7QUFDVixXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUEvcUJjLCtDOztBQWtyQkosK0RBQUFpVyxJQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9yQkE7QUFDQTtBQVFBOzs7OztJQUtNOEUsTzs7Ozs7QUFFRjtBQUNBLG1CQUFZalcsSUFBWixFQUNnSTtBQUFBOztBQUFBLFFBRDlHOUUsR0FDOEcsdUVBRHhHLElBQ3dHO0FBQUEsUUFEbEdDLENBQ2tHO0FBQUEsUUFEL0ZDLENBQytGO0FBQUEsUUFENUZxSixJQUM0RjtBQUFBLFFBRHRGQyxJQUNzRjtBQUFBLFFBRGhGd1IsV0FDZ0Y7QUFBQSxRQURuRUMsWUFDbUU7QUFBQSxRQURyREMsU0FDcUQ7QUFBQSxRQUQxQ0MsVUFDMEM7QUFBQSxRQUQ5QjNiLEtBQzhCLDBFQUR0QixDQUNzQjtBQUFBLFFBQWhIeUcsTUFBZ0g7QUFBQSxRQUF4RzlGLFdBQXdHLDBFQUExRixJQUEwRjtBQUFBLFFBQXBGZ0ksT0FBb0YsMEVBQTFFLEtBQTBFO0FBQUEsUUFBbkVzRixVQUFtRSwwRUFBdEQsUUFBc0Q7QUFBQSxRQUE1Q25PLE1BQTRDLDBFQUFuQyxDQUFtQztBQUFBLFFBQWhDOGIsVUFBZ0MsMEVBQW5CLEtBQW1CO0FBQUEsUUFBWnhaLEdBQVksMEVBQU4sSUFBTTs7QUFBQTs7QUFDNUgsaUZBQU1rRCxJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsVUFBS2lGLFdBQUwsR0FBbUIsT0FBbkI7QUFDQSxVQUFLbUMsTUFBTCxHQUFjLElBQWQ7QUFDQSxVQUFLeUIsYUFBTCxHQUFxQixDQUFyQjtBQUNBLFVBQUtySixLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLMkksT0FBTCxHQUFlQSxPQUFmO0FBQ0EsVUFBS3NGLFVBQUwsR0FBa0JBLFVBQWxCO0FBRUEsVUFBSzVILFVBQUwsR0FBa0JxVixTQUFsQjtBQUNBLFVBQUtwVixXQUFMLEdBQW1CcVYsVUFBbkI7QUFFQSxVQUFLNVYsTUFBTCxHQUFjckYsQ0FBQyxHQUFHLE1BQUs0RixXQUFULEdBQXVCMEQsSUFBckM7QUFDQSxVQUFLbEUsTUFBTCxHQUFjckYsQ0FBQyxHQUFHK2EsV0FBSixHQUFrQixNQUFLblYsVUFBdkIsR0FBb0MwRCxJQUFsRCxDQWI0SCxDQWM1SDs7QUFDQSxVQUFLdEQsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsVUFBSzNHLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFVBQUs4YixVQUFMLEdBQWtCQSxVQUFsQjtBQUdBLFVBQUtqVyxNQUFMLEdBQWM7QUFDVixxQkFBZWhGO0FBREwsS0FBZDtBQXBCNEg7QUF1Qi9IOzs7OzZCQUVRO0FBQ0w7QUFDQSxVQUFJLEtBQUtiLE1BQUwsR0FBYyxDQUFsQixFQUFxQixDQUNqQjtBQUNBO0FBQ0gsT0FIRCxNQUlLLElBQUcsS0FBS0EsTUFBTCxJQUFlLENBQWxCLEVBQXFCO0FBQ3RCLFlBQUksS0FBS0EsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNuQixlQUFLZ0ksZUFBTCxHQUF1QixJQUF2QjtBQUNIOztBQUNELGFBQUtoSSxNQUFMO0FBQ0g7QUFDSjs7O3lCQUVJVSxHLEVBQUs7QUFDTixXQUFLNEgsT0FBTCxDQUFhNUgsR0FBYjtBQUNIOzs7NkJBRVFpSSxLLEVBQU9DLFMsRUFBVztBQUN2QjtBQUNBLFVBQUlELEtBQUssQ0FBQ1osSUFBTixLQUFlLFNBQW5CLEVBQThCLENBQzFCO0FBQ0gsT0FGRCxNQUdLLElBQUlZLEtBQUssQ0FBQ1osSUFBTixLQUFlLE1BQW5CLEVBQTJCO0FBQzVCLGFBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOzs7Z0NBRVd0SCxHLEVBQUs7QUFDYkEsU0FBRyxDQUFDb0ksU0FBSjtBQUNBcEksU0FBRyxDQUFDcUksV0FBSixHQUFrQixLQUFsQjtBQUNBckksU0FBRyxDQUFDc0ksSUFBSixDQUFTLEtBQUtoRCxNQUFkLEVBQ0ksS0FBS0MsTUFEVCxFQUVJLEtBQUtNLFVBRlQsRUFFcUIsS0FBS0MsV0FGMUI7QUFHQTlGLFNBQUcsQ0FBQ3VJLE1BQUo7QUFDQXZJLFNBQUcsQ0FBQ3dJLFNBQUo7QUFDSDs7OzRCQUdPeEksRyxFQUFLO0FBQ1QsVUFBSSxLQUFLOEUsSUFBTCxDQUFVNEQsU0FBZCxFQUF5QjtBQUNyQixhQUFLQyxXQUFMLENBQWlCM0ksR0FBakI7QUFDSDtBQUNKOzs7O0VBeEVpQix1Qzs7QUEwRVAsK0RBQUErYSxPQUFmLEU7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQ0E7O0lBUU1NLEk7Ozs7O0FBQ0YsZ0JBQVl2VyxJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCMEIsR0FBeEIsRUFBNkI1QixHQUE3QixFQUFrQ2dFLEtBQWxDLEVBQXlDQyxNQUF6QyxFQUEwRDtBQUFBOztBQUFBLFFBQVR6RSxLQUFTLHVFQUFILENBQUc7O0FBQUE7O0FBQ3RELDhFQUFNc0YsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLFFBQW5CO0FBQ0EsVUFBS2pCLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFVBQUt6RSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLb0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsVUFBSzBGLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxVQUFLM0IsU0FBTCxHQUFpQixDQUFqQjtBQUVBLFVBQUtMLE1BQUwsR0FBYyxNQUFLckYsQ0FBbkI7QUFDQSxVQUFLc0YsTUFBTCxHQUFjLE1BQUtyRixDQUFuQjtBQUNBLFVBQUsyRixVQUFMLEdBQWtCLE1BQUs3QixLQUFMLEdBQWEsTUFBS3hFLEtBQXBDO0FBQ0EsVUFBS3NHLFdBQUwsR0FBbUIsTUFBSzdCLE1BQUwsR0FBYyxNQUFLekUsS0FBdEM7QUFic0Q7QUFjekQ7Ozs7Z0NBRVcsQ0FBRTs7O3lCQUVSUSxHLEVBQUs7QUFDUCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQUwsR0FBUyxLQUFLcWIsT0FBL0MsRUFBd0QsS0FBS3BiLENBQUwsR0FBUyxLQUFLcWIsT0FBdEUsRUFBK0UsSUFBL0U7O0FBQ0EsVUFBSSxLQUFLelcsSUFBTCxDQUFVNEQsU0FBZCxFQUF5QjtBQUNyQixhQUFLQyxXQUFMLENBQWlCM0ksR0FBakI7QUFDSDtBQUNKOzs7Z0NBRVlBLEcsRUFBSztBQUNkQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7NkJBRVNQLEssRUFBT0MsUyxFQUFXO0FBQ3hCLFVBQUlELEtBQUssQ0FBQ1osSUFBTixLQUFnQixNQUFwQixFQUE0QjtBQUN4QixhQUFLbVUsU0FBTCxDQUFldlQsS0FBZjtBQUNILE9BRkQsTUFFTyxJQUFJQSxLQUFLLENBQUNaLElBQU4sS0FBZ0IsU0FBaEIsSUFBNkJZLEtBQUssQ0FBQ1osSUFBTixLQUFnQixRQUFqRCxFQUEyRDtBQUM5RCxhQUFLOUIsTUFBTCxHQUFjMEMsS0FBSyxDQUFDMUMsTUFBTixHQUFlLEtBQUtPLFdBQWxDO0FBQ0EsYUFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBTCxHQUFjLEtBQUtPLFdBQTVCO0FBQ0EsYUFBS0gsU0FBTCxHQUFpQixDQUFqQjtBQUNIO0FBQ0o7Ozs2QkFFUTtBQUNMLFdBQUtBLFNBQUwsSUFBa0IsS0FBSzRCLE9BQUwsR0FBZSxLQUFLQSxPQUF0QztBQUNBLFdBQUtySCxDQUFMLElBQVUsS0FBS3lGLFNBQWY7QUFDQSxXQUFLSixNQUFMLElBQWUsS0FBS0ksU0FBcEI7QUFDSDs7OztFQWxEYyx3QztBQXVEbkI7Ozs7O0lBR00yRyxVOzs7OztBQUVGLHNCQUFZeEgsSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QjBCLEdBQXhCLEVBQTZCNUIsR0FBN0IsRUFBa0NnRSxLQUFsQyxFQUF5Q0MsTUFBekMsRUFBMkU7QUFBQTs7QUFBQSxRQUExQnpFLEtBQTBCLHVFQUFwQixDQUFvQjtBQUFBLFFBQWpCaWMsWUFBaUIsdUVBQUosRUFBSTs7QUFBQTs7QUFDdkUscUZBQU0zVyxJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCLEVBQTRCZ0UsS0FBNUIsRUFBbUNDLE1BQW5DLEVBQTJDekUsS0FBM0M7QUFDQSxXQUFLaWMsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxXQUFLcFcsU0FBTCxHQUFpQixJQUFJLGtEQUFKLENBQWMsT0FBS3pELEdBQW5CLEVBQXdCLENBQUMsRUFBRCxFQUFLLENBQUwsQ0FBeEIsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFBdUMsQ0FBdkMsRUFBMEMsQ0FBMUMsRUFBNkMsSUFBN0MsRUFBbUQsT0FBS3BDLEtBQXhELEVBQStELENBQS9ELENBQWpCO0FBQ0EsV0FBSzhiLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLENBQUMsRUFBaEI7QUFMdUU7QUFNMUU7Ozs7OEJBRVNwWCxJLEVBQU07QUFDWixVQUFJQSxJQUFJLENBQUM2QixNQUFMLEdBQWM3QixJQUFJLENBQUNvUyxTQUF2QixFQUNJcFMsSUFBSSxDQUFDNkIsTUFBTCxJQUFlLEtBQUt5VixZQUFwQjtBQUNKLFVBQUl0WCxJQUFJLENBQUM2QixNQUFMLEdBQWM3QixJQUFJLENBQUNvUyxTQUF2QixFQUNJcFMsSUFBSSxDQUFDNkIsTUFBTCxHQUFjN0IsSUFBSSxDQUFDb1MsU0FBbkI7QUFDSixXQUFLalAsZUFBTCxHQUF1QixJQUF2QjtBQUNIOzs7O0VBaEJvQitULEk7QUFvQnhCOzs7OztJQUdLN08sVTs7Ozs7QUFFRixzQkFBWTFILElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0IwQixHQUF4QixFQUE2QjVCLEdBQTdCLEVBQWtDZ0UsS0FBbEMsRUFBeUNDLE1BQXpDLEVBQTJFO0FBQUE7O0FBQUEsUUFBMUJ6RSxLQUEwQix1RUFBcEIsQ0FBb0I7QUFBQSxRQUFqQmtjLFlBQWlCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3ZFLHFGQUFNNVcsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QixFQUE0QmdFLEtBQTVCLEVBQW1DQyxNQUFuQyxFQUEyQ3pFLEtBQTNDO0FBQ0EsV0FBS2tjLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxXQUFLclcsU0FBTCxHQUFpQixJQUFJLGtEQUFKLENBQWMsT0FBS3pELEdBQW5CLEVBQXdCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBeEIsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBc0MsQ0FBdEMsRUFBeUMsQ0FBekMsRUFBNEMsSUFBNUMsRUFBa0QsT0FBS3BDLEtBQXZELEVBQThELENBQTlELENBQWpCO0FBQ0EsV0FBSzhiLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLENBQUMsRUFBaEI7QUFMdUU7QUFNMUU7Ozs7OEJBRVNwWCxJLEVBQU07QUFDWixVQUFHQSxJQUFJLENBQUNzUyxNQUFMLEdBQWN0UyxJQUFJLENBQUNxUyxTQUF0QixFQUNJclMsSUFBSSxDQUFDc1MsTUFBTCxJQUFlLEtBQUtpRixZQUFwQjtBQUNKLFVBQUl2WCxJQUFJLENBQUNzUyxNQUFMLEdBQWN0UyxJQUFJLENBQUNxUyxTQUF2QixFQUNJclMsSUFBSSxDQUFDc1MsTUFBTCxHQUFjdFMsSUFBSSxDQUFDcVMsU0FBbkI7QUFDSixXQUFLbFAsZUFBTCxHQUF1QixJQUF2QjtBQUNIOzs7O0VBaEJvQitULEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUZ6QjtBQUNBOztJQUtNTSxHOzs7OztBQUVGLGVBQVk3VyxJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQWdHO0FBQUE7O0FBQUEsUUFBeEUwQixHQUF3RSx1RUFBbEUsSUFBa0U7QUFBQSxRQUE1RDVCLEdBQTRELHVFQUF0RCxJQUFzRDtBQUFBLFFBQWhEUixLQUFnRCx1RUFBeEMsQ0FBd0M7QUFBQSxRQUFyQ3VGLFdBQXFDLHVFQUF2QixFQUF1QjtBQUFBLFFBQW5CQyxZQUFtQix1RUFBSixFQUFJOztBQUFBOztBQUM1Riw2RUFBTUYsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsVUFBSzZKLEtBQUwsR0FBYTdPLENBQWIsQ0FINEYsQ0FHNUU7O0FBQ2hCLFVBQUs4TyxLQUFMLEdBQWE3TyxDQUFiLENBSjRGLENBSTVFOztBQUNoQixVQUFLMkksYUFBTCxHQUFxQixFQUFyQjtBQUNBLFVBQUsrUyxTQUFMLEdBQWlCLENBQUMsRUFBbEI7QUFDQSxVQUFLcGMsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS3VGLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxVQUFLNlcsVUFBTCxHQUFrQkMsSUFBSSxDQUFDQyxHQUFMLEVBQWxCLENBVjRGLENBVzVGOztBQUNBLFVBQUtDLE9BQUwsR0FBZSxDQUFDO0FBQ1osS0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQURXLEVBQ1EsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQURSLEVBRVgsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUZXLEVBRVEsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsRUFBZixDQUZSLENBQWYsQ0FaNEYsQ0FpQjVGOztBQUNBLFVBQUs3VyxNQUFMLEdBQWM7QUFBRTtBQUNaLGlCQUFXLElBREQ7QUFDTztBQUNqQixtQkFBYSxLQUZIO0FBRVU7QUFDcEIsbUJBQWEsS0FISDtBQUdVO0FBQ3BCLGlCQUFXLEtBSkQ7QUFJUTtBQUNsQixxQkFBZSxLQUxMO0FBS1k7QUFDdEIsa0JBQVksSUFORjtBQU9WLHFCQUFlO0FBUEwsS0FBZDtBQVVBLFVBQUtDLFVBQUwsR0FBa0I7QUFDZCxlQUFTLElBQUksa0RBQUosQ0FBYyxNQUFLeEQsR0FBbkIsRUFBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxLQUE5QyxFQUFxRCxNQUFLcEMsS0FBMUQsQ0FESztBQUVkLGdCQUFVLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QixFQUFrQyxDQUFsQyxFQUFxQyxFQUFyQyxFQUF5QyxDQUF6QyxFQUE0QyxFQUE1QyxFQUFnRCxLQUFoRCxFQUF1RCxNQUFLcEMsS0FBNUQsQ0FGSTtBQUdkLG1CQUFhLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUF4QixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxLQUE5QyxFQUFxRCxNQUFLcEMsS0FBMUQsQ0FIQztBQUlkLGNBQVEsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXhCLEVBQWtDLENBQWxDLEVBQXFDLEVBQXJDLEVBQXlDLEdBQXpDLEVBQThDLENBQTlDLEVBQWlELElBQWpELEVBQXVELE1BQUtwQyxLQUE1RDtBQUpNLEtBQWxCO0FBTUEsVUFBSzZGLFNBQUwsR0FBaUIsTUFBS0QsVUFBTCxDQUFnQjZXLEtBQWpDO0FBbEM0RjtBQW1DL0Y7Ozs7NkJBRVE7QUFDTCxVQUFJLEtBQUs5VyxNQUFMLENBQVkrVyxRQUFoQixFQUEwQjtBQUN0QjtBQUNBLFlBQUksS0FBSy9XLE1BQUwsQ0FBWWdYLE9BQVosSUFBdUIsQ0FBQyxLQUFLaFgsTUFBTCxDQUFZOEcsU0FBcEMsSUFBaUQsS0FBSzVHLFNBQTFELEVBQXFFO0FBQ2pFLGVBQUtMLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxlQUFLRCxXQUFMLEdBQW1CLEVBQW5COztBQUNBLGNBQUksS0FBS00sU0FBTCxDQUFlL0UsWUFBZixLQUFnQyxDQUFwQyxFQUF1QztBQUNuQyxpQkFBS0wsQ0FBTCxJQUFVLEtBQUs0SSxhQUFmO0FBQ0g7O0FBQ0QsY0FBSSxLQUFLeEQsU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLGlCQUFLaUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLdkIsTUFBTCxDQUFZZ1gsT0FBWixHQUFzQixLQUF0QjtBQUNBLGlCQUFLaFgsTUFBTCxDQUFZOEcsU0FBWixHQUF3QixJQUF4QjtBQUNBLGlCQUFLL0wsQ0FBTCxJQUFVLEVBQVY7QUFDSDtBQUNKLFNBWkQsQ0FZRTtBQVpGLGFBYUssSUFBSSxDQUFDLEtBQUtpRixNQUFMLENBQVlnWCxPQUFiLElBQXdCLEtBQUtoWCxNQUFMLENBQVk4RyxTQUFwQyxJQUFpRCxLQUFLNUcsU0FBMUQsRUFBcUU7QUFDdEUsaUJBQUtMLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxpQkFBS0QsV0FBTCxHQUFtQixFQUFuQjs7QUFDQSxnQkFBSSxLQUFLTSxTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIsbUJBQUtpRixTQUFMLENBQWVxQixLQUFmO0FBQ0EsbUJBQUt2QixNQUFMLENBQVlnWCxPQUFaLEdBQXNCLEtBQXRCO0FBQ0EsbUJBQUtoWCxNQUFMLENBQVk4RyxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsbUJBQUs5RyxNQUFMLENBQVlpWCxXQUFaLEdBQTBCLElBQTFCO0FBQ0EsbUJBQUtQLFVBQUwsR0FBa0JDLElBQUksQ0FBQ0MsR0FBTCxFQUFsQjtBQUNBLG1CQUFLN2IsQ0FBTCxJQUFVLEVBQVY7QUFDSDtBQUNKLFdBWEksQ0FXSjtBQVhJLGVBWUEsSUFBSSxLQUFLaUYsTUFBTCxDQUFZaVgsV0FBaEIsRUFBNkI7QUFDOUIsbUJBQUsvVyxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JpWCxTQUFqQztBQUNBLG1CQUFLclgsWUFBTCxHQUFvQixFQUFwQjtBQUNBLG1CQUFLRCxXQUFMLEdBQW1CLEVBQW5COztBQUNBLGtCQUFJLEtBQUtNLFNBQUwsQ0FBZS9FLFlBQWYsS0FBZ0MsQ0FBaEMsSUFBcUMsS0FBSytFLFNBQUwsQ0FBZS9FLFlBQWYsS0FBZ0MsQ0FBekUsRUFBNEU7QUFDeEUscUJBQUtMLENBQUwsSUFBVSxLQUFLNEksYUFBZjtBQUNIOztBQUNELGtCQUFJLEtBQUt4RCxTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIscUJBQUtpRixTQUFMLENBQWVxQixLQUFmO0FBQ0EscUJBQUt6RyxDQUFMLEdBQVMsS0FBSzZPLEtBQWQ7QUFDQSxxQkFBSzVPLENBQUwsR0FBUyxLQUFLNk8sS0FBZDtBQUNBLHFCQUFLNUosTUFBTCxDQUFZaVgsV0FBWixHQUEwQixLQUExQjtBQUNBLHFCQUFLalgsTUFBTCxDQUFZZ1gsT0FBWixHQUFzQixJQUF0QjtBQUNBLHFCQUFLaFgsTUFBTCxDQUFZOEcsU0FBWixHQUF3QixLQUF4QjtBQUNIO0FBQ0o7QUFDSixPQTVDSSxDQTZDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVIOzs7eUJBR0lqTSxHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVlnWCxPQUFaLElBQXVCLENBQUMsS0FBS2hYLE1BQUwsQ0FBWThHLFNBQXhDLEVBQW1EO0FBQy9DLGFBQUs1RyxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0I2VyxLQUFqQztBQUNILE9BRkQsTUFHSyxJQUFJLEtBQUs5VyxNQUFMLENBQVk4RyxTQUFaLElBQXlCLENBQUMsS0FBSzlHLE1BQUwsQ0FBWWdYLE9BQTFDLEVBQW1EO0FBQ3BELGFBQUs5VyxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JxSCxNQUFqQztBQUNILE9BRkksTUFHQSxJQUFJLEtBQUt0SCxNQUFMLENBQVlpWCxXQUFoQixFQUE2QjtBQUM5QixhQUFLL1csU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCaVgsU0FBakM7QUFDSCxPQUZJLE1BR0E7QUFDRCxZQUFJLENBQ0E7QUFDSCxTQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1I1WSxpQkFBTyxDQUFDQyxHQUFSLENBQVksMEJBQVosRUFBd0MyWSxDQUF4QztBQUNIO0FBQ0o7O0FBQ0QsV0FBS2pYLFNBQUwsQ0FBZW9ELFNBQWYsQ0FBeUIsS0FBS3dGLFNBQTlCLEVBQXlDak8sR0FBekMsRUFBOEMsS0FBS0MsQ0FBbkQsRUFBc0QsS0FBS0MsQ0FBM0Q7QUFDSDs7OztFQXRKYSx1Qzs7QUF5SkgsK0RBQUF5YixHQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9KQTtBQUNBOztJQVFNWSxnQjs7Ozs7QUFFRiw0QkFBWXpYLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBNkc7QUFBQTs7QUFBQSxRQUFyRjBCLEdBQXFGLHVFQUEvRSxJQUErRTtBQUFBLFFBQXpFNUIsR0FBeUUsdUVBQW5FLElBQW1FO0FBQUEsUUFBN0RSLEtBQTZELHVFQUFyRCxDQUFxRDtBQUFBLFFBQWxEVyxXQUFrRDtBQUFBLFFBQXJDNEUsV0FBcUMsdUVBQXZCLEVBQXVCO0FBQUEsUUFBbkJDLFlBQW1CLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3pHLDBGQUFNRixJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsVUFBS2lGLFdBQUwsR0FBbUIsT0FBbkI7QUFDQSxVQUFLNEQsYUFBTCxHQUFxQixFQUFyQjs7QUFDQSxRQUFJMUksV0FBSixFQUFpQjtBQUFFLFlBQUtGLENBQUwsSUFBVSxFQUFWO0FBQWUsS0FBbEMsTUFBd0M7QUFBRSxZQUFLQSxDQUFMLElBQVUsRUFBVjtBQUFjOztBQUFBLEtBSmlELENBSWhEOztBQUN6RCxVQUFLVCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLdUYsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUVBLFVBQUtZLE9BQUwsR0FBZTNGLENBQUMsR0FBSzhFLFdBQVcsR0FBR3ZGLEtBQWYsR0FBd0IsQ0FBN0IsR0FBa0N1RixXQUFqRDtBQUNBLFVBQUtjLFVBQUwsR0FBa0IsQ0FBbEIsQ0FWeUcsQ0FVcEY7O0FBQ3JCLFVBQUtDLFdBQUwsR0FBbUIsQ0FBbkIsQ0FYeUcsQ0FXbkY7O0FBQ3RCLFVBQUtSLE1BQUwsR0FBYyxNQUFLTSxPQUFMLEdBQWdCLE1BQUtDLFVBQUwsR0FBa0IsQ0FBaEQ7QUFDQSxVQUFLTixNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBUyxNQUFLNEYsV0FBNUI7QUFDQSxVQUFLMEIsVUFBTCxHQUFrQixNQUFLakMsTUFBdkIsQ0FkeUcsQ0FnQnpHOztBQUNBLFVBQUtTLE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLEdBQWQ7QUFDQSxVQUFLZCxNQUFMLEdBQWM7QUFDVixrQkFBWSxJQURGO0FBRVYsbUJBQWEsS0FGSDtBQUdWLG9CQUFjLEtBSEo7QUFJVixxQkFBZWhGO0FBSkwsS0FBZDtBQU1BLFVBQUtpRixVQUFMLEdBQWtCO0FBQ2QsZUFBUyxJQUFJLGtEQUFKLENBQWMsTUFBS3hELEdBQW5CLEVBQXdCLENBQUMsTUFBS21ELFdBQU4sRUFBbUIsTUFBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsS0FBNUUsRUFBbUYsTUFBS3hGLEtBQXhGLEVBQStGLEVBQS9GLENBREs7QUFFZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUMsTUFBS21ELFdBQU4sRUFBbUIsTUFBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsTUFBS3hGLEtBQXZGLEVBQThGLEVBQTlGLENBRkk7QUFHZCxrQkFBWSxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUMsTUFBS21ELFdBQU4sRUFBbUIsTUFBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsS0FBNUUsRUFBbUYsTUFBS3hGLEtBQXhGLEVBQStGLEVBQS9GO0FBSEUsS0FBbEI7QUFLQSxVQUFLNkYsU0FBTCxHQUFpQixNQUFLRCxVQUFMLENBQWdCUixLQUFqQztBQTlCeUc7QUErQjVHOzs7OzZCQUVRO0FBQ0w7QUFFQSxVQUFJLEtBQUtPLE1BQUwsQ0FBWWhGLFdBQWhCLEVBQTZCO0FBQ3pCLGFBQUtGLENBQUwsSUFBVSxLQUFLNEksYUFBZjtBQUNBLGFBQUt2RCxNQUFMLElBQWUsS0FBS3VELGFBQXBCO0FBRUgsT0FKRCxNQUlPO0FBQ0gsYUFBSzVJLENBQUwsSUFBVSxLQUFLNEksYUFBZjtBQUNBLGFBQUt2RCxNQUFMLElBQWUsS0FBS3VELGFBQXBCO0FBQ0g7O0FBRUQsVUFBSSxLQUFLMUQsTUFBTCxDQUFZc08sUUFBaEIsRUFBMEI7QUFDdEIsWUFBSSxLQUFLcE8sU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLGVBQUtpRixTQUFMLENBQWVxQixLQUFmO0FBQ0EsZUFBS3ZCLE1BQUwsQ0FBWXNPLFFBQVosR0FBdUIsS0FBdkI7QUFDQSxlQUFLdE8sTUFBTCxDQUFZcVgsU0FBWixHQUF3QixJQUF4QjtBQUNIO0FBQ0osT0FORCxNQU9LLElBQUksS0FBS3JYLE1BQUwsQ0FBWXFYLFNBQWhCLEVBQTJCO0FBQzVCLFlBQUksS0FBS25YLFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsZUFBS3VGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVlxWCxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsZUFBS3JYLE1BQUwsQ0FBWW9HLFVBQVosR0FBeUIsSUFBekI7QUFDSDtBQUNKLE9BUEksTUFRQSxJQUFJLEtBQUtwRyxNQUFMLENBQVlvRyxVQUFoQixFQUE0QjtBQUM3QixZQUFJLEtBQUtsRyxTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIsZUFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLWSxlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSjs7QUFDRCxVQUFJLENBQUMsS0FBS25DLE1BQUwsQ0FBWW9HLFVBQWpCLEVBQTZCO0FBQUM7QUFDMUIsWUFBSSxLQUFLcEcsTUFBTCxDQUFZaEYsV0FBaEIsRUFBNkI7QUFDekIsY0FBSThHLE9BQU8sR0FBRyxJQUFJLHlDQUFKLENBQVksS0FBS25DLElBQWpCLEVBQXVCLEtBQUs5RSxHQUE1QixFQUFpQyxLQUFLc0YsTUFBdEMsRUFBOEMsS0FBS0MsTUFBbkQsRUFBMkQsQ0FBQyxHQUFELEdBQU8sRUFBUCxHQUFZLEVBQXZFLEVBQTJFLENBQTNFLEVBQ1YsS0FBS1IsV0FESyxFQUNRLEtBQUtDLFlBRGIsRUFDMkIsR0FEM0IsRUFDZ0MsRUFEaEMsRUFDb0MsS0FBS3hGLEtBRHpDLEVBQ2dELEtBQUt5RyxNQURyRCxFQUM2RCxLQUFLZCxNQUFMLENBQVloRixXQUR6RSxDQUFkO0FBRUE4RyxpQkFBTyxDQUFDRyxNQUFSLEdBQWlCLEtBQUtDLElBQXRCO0FBQ0EsZUFBS3ZDLElBQUwsQ0FBVVAsU0FBVixDQUFvQjBDLE9BQXBCO0FBQ0gsU0FMRCxNQU1LO0FBQ0QsY0FBSUEsT0FBTyxHQUFHLElBQUkseUNBQUosQ0FBWSxLQUFLbkMsSUFBakIsRUFBdUIsS0FBSzlFLEdBQTVCLEVBQWlDLEtBQUtzRixNQUF0QyxFQUE4QyxLQUFLQyxNQUFuRCxFQUEyRCxDQUFDLEdBQUQsR0FBTyxHQUFQLEdBQWEsR0FBYixHQUFtQixFQUE5RSxFQUFrRixDQUFsRixFQUNWLEtBQUtSLFdBREssRUFDUSxLQUFLQyxZQURiLEVBQzJCLEdBRDNCLEVBQ2dDLEVBRGhDLEVBQ29DLEtBQUt4RixLQUR6QyxFQUNnRCxLQUFLeUcsTUFEckQsRUFDNkQsS0FBS2QsTUFBTCxDQUFZaEYsV0FEekUsQ0FBZDtBQUVBOEcsaUJBQU8sQ0FBQ0csTUFBUixHQUFpQixLQUFLQyxJQUF0QjtBQUNBLGVBQUt2QyxJQUFMLENBQVVQLFNBQVYsQ0FBb0IwQyxPQUFwQjtBQUNIO0FBQ0o7QUFDSjs7O3lCQUVJakgsRyxFQUFLO0FBQ04sVUFBSSxLQUFLbUYsTUFBTCxDQUFZc08sUUFBaEIsRUFBMEI7QUFDdEIsYUFBS3BPLFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQlIsS0FBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUtPLE1BQUwsQ0FBWXFYLFNBQWhCLEVBQTJCO0FBQ3ZCLGFBQUtuWCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JxWCxNQUFqQztBQUNILE9BRkQsTUFHSyxJQUFJLEtBQUt0WCxNQUFMLENBQVlvRyxVQUFoQixFQUE0QjtBQUM3QixhQUFLbEcsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCc1gsUUFBakM7QUFDSDs7QUFDRCxXQUFLOVUsT0FBTCxDQUFhNUgsR0FBYjtBQUNILEssQ0FFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O2dDQUVZQSxHLEVBQUs7QUFDYkEsU0FBRyxDQUFDb0ksU0FBSjtBQUNBcEksU0FBRyxDQUFDcUksV0FBSixHQUFrQixPQUFsQjtBQUNBckksU0FBRyxDQUFDc0ksSUFBSixDQUFTLEtBQUtoRCxNQUFkLEVBQ0ksS0FBS0MsTUFEVCxFQUVJLEtBQUtNLFVBRlQsRUFFcUIsS0FBS0MsV0FGMUI7QUFHQTlGLFNBQUcsQ0FBQ3VJLE1BQUo7QUFDQXZJLFNBQUcsQ0FBQ3dJLFNBQUo7QUFDSDs7OzRCQUdPeEksRyxFQUFLO0FBQ1QsV0FBS3FGLFNBQUwsQ0FBZW9ELFNBQWYsQ0FBeUIsQ0FBekIsRUFBNEJ6SSxHQUE1QixFQUFpQyxLQUFLQyxDQUF0QyxFQUF5QyxLQUFLQyxDQUE5QyxFQUFpRCxLQUFLaUYsTUFBTCxDQUFZaEYsV0FBN0Q7O0FBQ0EsVUFBSSxLQUFLMkUsSUFBTCxDQUFVNEQsU0FBZCxFQUF5QjtBQUNyQixhQUFLQyxXQUFMLENBQWlCM0ksR0FBakI7QUFDSDtBQUNKOzs7O0VBN0gwQix1Qzs7QUFnSWhCLCtEQUFBdWMsZ0JBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeklBO0FBQ0E7O0lBT01JLFU7Ozs7O0FBRUY7QUFDQSxzQkFBWTdYLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0g7QUFBQTs7QUFBQSxRQUFoRzBCLEdBQWdHLHVFQUExRixJQUEwRjtBQUFBLFFBQXBGNUIsR0FBb0YsdUVBQTlFLElBQThFO0FBQUEsUUFBeEVSLEtBQXdFLHVFQUFoRSxDQUFnRTtBQUFBLFFBQTdEVyxXQUE2RDtBQUFBLFFBQWhEd1ksU0FBZ0Q7QUFBQSxRQUFyQzVULFdBQXFDLHVFQUF2QixFQUF1QjtBQUFBLFFBQW5CQyxZQUFtQix1RUFBSixFQUFJOztBQUFBOztBQUNwSCxvRkFBTUYsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsVUFBSzRELGFBQUwsR0FBcUIsRUFBckI7O0FBQ0EsUUFBSTFJLFdBQUosRUFBaUI7QUFBRSxZQUFLRixDQUFMLElBQVUsR0FBVjtBQUFnQixLQUFuQyxNQUF5QztBQUFFLFlBQUtBLENBQUwsSUFBVSxHQUFWO0FBQWU7O0FBQUEsS0FKMEQsQ0FJekQ7O0FBQzNELFVBQUtULEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUt1RixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBRUEsVUFBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLOEUsV0FBVyxHQUFHdkYsS0FBZixHQUF3QixDQUE3QixHQUFrQ3VGLFdBQWpEO0FBQ0EsVUFBS2MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUIsRUFBbkI7O0FBQ0EsUUFBSTNGLFdBQUosRUFBaUI7QUFDYixZQUFLbUYsTUFBTCxHQUFjLE1BQUtNLE9BQUwsR0FBZ0IsTUFBS0MsVUFBTCxHQUFrQixDQUFsQyxHQUF1QyxHQUFyRCxDQURhLENBQzZDOztBQUMxRCxZQUFLTixNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBUyxNQUFLNEYsV0FBZCxJQUE2QixNQUFLZCxZQUFMLEdBQW9CLEVBQWpELENBQWQsQ0FGYSxDQUV1RDtBQUN2RSxLQUhELE1BSUs7QUFDRCxZQUFLTSxNQUFMLEdBQWMsTUFBS00sT0FBTCxHQUFnQixNQUFLQyxVQUFMLEdBQWtCLENBQWxDLEdBQXVDLEdBQXJEO0FBQ0EsWUFBS04sTUFBTCxHQUFjLE1BQUtyRixDQUFMLEdBQVMsTUFBSzRGLFdBQWQsSUFBNkIsTUFBS2QsWUFBTCxHQUFvQixFQUFqRCxDQUFkO0FBQ0gsS0FuQm1ILENBcUJwSDs7O0FBQ0EsUUFBSTJULFNBQUosRUFBZTtBQUNYLFlBQUsxUyxNQUFMLEdBQWMsR0FBZDtBQUNBLFlBQUtELE1BQUwsR0FBYyxDQUFkO0FBQ0EsWUFBSzZDLGFBQUwsR0FBcUIsRUFBckI7QUFDSCxLQUpELE1BS0s7QUFDRCxZQUFLNUMsTUFBTCxHQUFjLEVBQWQ7QUFDQSxZQUFLRCxNQUFMLEdBQWMsQ0FBZDtBQUNIOztBQUlELFVBQUtiLE1BQUwsR0FBYztBQUNWLGVBQVMsQ0FBQ3dULFNBREE7QUFFVixjQUFRQSxTQUZFO0FBR1YsZ0JBQVUsSUFIQTtBQUlWLG1CQUFhLEtBSkg7QUFLVixxQkFBZXhZO0FBTEwsS0FBZDtBQU9BLFVBQUtpRixVQUFMLEdBQWtCO0FBQ2QsdUJBQWlCLElBQUksa0RBQUosQ0FBYyxNQUFLeEQsR0FBbkIsRUFBd0IsQ0FBQyxNQUFLbUQsV0FBTixFQUFtQixNQUFLQyxZQUF4QixDQUF4QixFQUErRCxDQUEvRCxFQUFrRSxFQUFsRSxFQUFzRSxDQUF0RSxFQUF5RSxDQUF6RSxFQUE0RSxLQUE1RSxFQUFtRixNQUFLeEYsS0FBeEYsRUFBK0YsQ0FBL0YsQ0FESDtBQUVkLHNCQUFnQixJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUMsTUFBS21ELFdBQU4sRUFBbUIsTUFBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsSUFBNUUsRUFBa0YsTUFBS3hGLEtBQXZGLEVBQThGLEVBQTlGLENBRkY7QUFHZCxzQkFBZ0IsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLE1BQUttRCxXQUFOLEVBQW1CLE1BQUtDLFlBQXhCLENBQXhCLEVBQStELENBQS9ELEVBQWtFLEVBQWxFLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLEVBQTRFLEtBQTVFLEVBQW1GLE1BQUt4RixLQUF4RixFQUErRixFQUEvRixDQUhGO0FBSWQscUJBQWUsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLE1BQUttRCxXQUFOLEVBQW1CLE1BQUtDLFlBQXhCLENBQXhCLEVBQStELENBQS9ELEVBQWtFLEVBQWxFLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLEVBQTRFLElBQTVFLEVBQWtGLE1BQUt4RixLQUF2RixFQUE4RixFQUE5RjtBQUpELEtBQWxCOztBQU1BLFFBQUksTUFBSzJGLE1BQUwsQ0FBWXlYLEtBQWhCLEVBQXVCO0FBQUUsWUFBS3ZYLFNBQUwsR0FBaUIsTUFBS0QsVUFBTCxDQUFnQnlYLGFBQWpDO0FBQWlELEtBQTFFLE1BQWdGO0FBQUUsWUFBS3hYLFNBQUwsR0FBaUIsTUFBS0QsVUFBTCxDQUFnQjBYLFlBQWpDO0FBQWdEOztBQS9DZDtBQWdEdkg7Ozs7NkJBRVE7QUFDTDtBQUNBLFVBQUksS0FBSzNYLE1BQUwsQ0FBWWhGLFdBQWhCLEVBQTZCO0FBQ3pCLGFBQUtGLENBQUwsSUFBVSxLQUFLNEksYUFBZjtBQUNBLGFBQUt2RCxNQUFMLElBQWUsS0FBS3VELGFBQXBCO0FBQ0gsT0FIRCxNQUdPO0FBQ0gsYUFBSzVJLENBQUwsSUFBVSxLQUFLNEksYUFBZjtBQUNBLGFBQUt2RCxNQUFMLElBQWUsS0FBS3VELGFBQXBCO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLMUQsTUFBTCxDQUFZNEQsTUFBaEIsRUFBd0I7QUFDcEIsWUFBSSxLQUFLMUQsU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLGVBQUtpRixTQUFMLENBQWVxQixLQUFmO0FBQ0EsZUFBS3ZCLE1BQUwsQ0FBWTRELE1BQVosR0FBcUIsS0FBckI7QUFDQSxlQUFLNUQsTUFBTCxDQUFZcVgsU0FBWixHQUF3QixJQUF4QjtBQUNIO0FBQ0osT0FORCxNQU9LLElBQUksS0FBS3JYLE1BQUwsQ0FBWXFYLFNBQWhCLEVBQTJCO0FBQzVCLFlBQUksS0FBS25YLFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsZUFBS3VGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUt2QixNQUFMLENBQVlxWCxTQUFaLEdBQXdCLEtBQXhCO0FBQ0EsZUFBS2xWLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS3RCLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNsQixhQUFLc0IsZUFBTCxHQUF1QixJQUF2QjtBQUNIO0FBQ0o7Ozt5QkFFSXRILEcsRUFBSztBQUNOLFVBQUksS0FBS21GLE1BQUwsQ0FBWXlYLEtBQWhCLEVBQXVCO0FBQ25CLFlBQUksS0FBS3pYLE1BQUwsQ0FBWTRELE1BQWhCLEVBQXdCO0FBQ3BCLGVBQUsxRCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0J5WCxhQUFqQztBQUNIOztBQUNELFlBQUksS0FBSzFYLE1BQUwsQ0FBWXFYLFNBQWhCLEVBQTJCO0FBQ3ZCLGVBQUtuWCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0IyWCxZQUFqQztBQUNIOztBQUNELGFBQUtuVixPQUFMLENBQWE1SCxHQUFiO0FBQ0gsT0FSRCxNQVNLLElBQUksS0FBS21GLE1BQUwsQ0FBWTZYLElBQWhCLEVBQXNCO0FBQ3ZCLFlBQUksS0FBSzdYLE1BQUwsQ0FBWTRELE1BQWhCLEVBQXdCO0FBQ3BCLGVBQUsxRCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0IwWCxZQUFqQztBQUNIOztBQUNELFlBQUksS0FBSzNYLE1BQUwsQ0FBWXFYLFNBQWhCLEVBQTJCO0FBQ3ZCLGVBQUtuWCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0I2WCxXQUFqQztBQUNIOztBQUNELGFBQUtyVixPQUFMLENBQWE1SCxHQUFiO0FBQ0g7QUFDSjtBQUVEOzs7OzZCQUNTaUksSyxFQUFPQyxTLEVBQVc7QUFBRTtBQUN6QixVQUFJRCxLQUFLLENBQUNaLElBQU4sS0FBZ0IsU0FBcEIsRUFBK0I7QUFDM0IsYUFBS0MsZUFBTCxHQUF1QixJQUF2QjtBQUNILE9BRkQsQ0FHQTtBQUNBO0FBQ0E7QUFMQSxXQU1LLElBQUlXLEtBQUssQ0FBQ2hELFdBQU4sS0FBdUIsT0FBM0IsRUFBb0M7QUFDckMsZUFBS3FDLGVBQUwsR0FBdUIsSUFBdkI7QUFDSCxTQVRzQixDQVV2QjtBQUNBO0FBQ0E7O0FBQ0g7OztnQ0FFV3RILEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7NEJBR094SSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUF2SW9CLHVDOztBQTBJViwrREFBQTJjLFVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEpBO0FBQ0E7QUFRQTs7Ozs7SUFJTU8sVTs7Ozs7QUFFRjtBQUNBLHNCQUFZcFksSUFBWixFQUF3SztBQUFBOztBQUFBLFFBQXRKOUUsR0FBc0osdUVBQWhKLElBQWdKO0FBQUEsUUFBMUlDLENBQTBJO0FBQUEsUUFBdklDLENBQXVJO0FBQUEsUUFBcElxSixJQUFvSTtBQUFBLFFBQTlIQyxJQUE4SDtBQUFBLFFBQXhId1IsV0FBd0g7QUFBQSxRQUEzR0MsWUFBMkc7QUFBQSxRQUE3RkMsU0FBNkY7QUFBQSxRQUFsRkMsVUFBa0Y7QUFBQSxRQUF0RTNiLEtBQXNFLDBFQUE5RCxDQUE4RDtBQUFBLFFBQTNEVyxXQUEyRCwwRUFBN0MsSUFBNkM7QUFBQSxRQUF2Q2lILE1BQXVDLDBFQUE5QixJQUE4QjtBQUFBLFFBQXhCOUgsTUFBd0IsMEVBQWYsQ0FBZTtBQUFBLFFBQVpzQyxHQUFZLDBFQUFOLElBQU07O0FBQUE7O0FBQ3BLLG9GQUFNa0QsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsVUFBS21DLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFVBQUt5QixhQUFMLEdBQXFCLENBQXJCO0FBQ0EsVUFBS3JKLEtBQUwsR0FBYUEsS0FBYjtBQUVBLFVBQUtxRyxVQUFMLEdBQWtCcVYsU0FBbEI7QUFDQSxVQUFLcFYsV0FBTCxHQUFtQnFWLFVBQW5CO0FBRUEsVUFBSzVWLE1BQUwsR0FBY3JGLENBQUMsR0FBRyxNQUFLNEYsV0FBVCxHQUF1QjBELElBQXJDOztBQUNBLFFBQUlySixXQUFKLEVBQWlCO0FBQ2IsWUFBS21GLE1BQUwsR0FBY3JGLENBQUMsR0FBRythLFdBQUosR0FBa0IsTUFBS25WLFVBQXZCLEdBQW9DMEQsSUFBbEQ7QUFDSCxLQUZELE1BR0s7QUFDRCxZQUFLakUsTUFBTCxHQUFjckYsQ0FBQyxHQUFHLE1BQUs0RixVQUFULEdBQXNCMEQsSUFBcEM7QUFDSCxLQWhCbUssQ0FpQnBLOzs7QUFFQSxVQUFLakssTUFBTCxHQUFjQSxNQUFkOztBQUNBLFFBQUlhLFdBQUosRUFBaUI7QUFDYixZQUFLK0UsTUFBTCxHQUFjLENBQWQ7QUFDSCxLQUZELE1BR0s7QUFDRCxZQUFLQSxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQ0g7O0FBRUQsVUFBS0MsTUFBTCxHQUFjO0FBQ1YscUJBQWVoRjtBQURMLEtBQWQ7QUEzQm9LO0FBOEJ2Szs7Ozs2QkFFUTtBQUNMO0FBQ0EsVUFBSSxLQUFLYixNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsWUFBSSxLQUFLQSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CLGVBQUtnSSxlQUFMLEdBQXVCLElBQXZCO0FBQ0g7O0FBQ0QsYUFBS2hJLE1BQUw7QUFDSDtBQUNKOzs7eUJBRUlVLEcsRUFBSztBQUNOLFdBQUs0SCxPQUFMLENBQWE1SCxHQUFiO0FBQ0g7Ozs2QkFFUWlJLEssRUFBT0MsUyxFQUFXO0FBQ3ZCO0FBQ0EsVUFBSUQsS0FBSyxDQUFDWixJQUFOLEtBQWUsUUFBbkIsRUFBNkI7QUFDekIzRCxlQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBRHlCLENBRXpCO0FBQ0E7QUFDQTtBQUNIOztBQUNELFVBQUlzRSxLQUFLLENBQUNaLElBQU4sS0FBZSxRQUFuQixFQUE2QjtBQUN6QjNELGVBQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0FzRSxhQUFLLENBQUNtQyxVQUFOLEdBQW1CLENBQW5CO0FBQ0FuQyxhQUFLLENBQUNYLGVBQU4sR0FBd0IsSUFBeEI7O0FBQ0EsWUFBSSxLQUFLRixNQUFMLEtBQWdCLElBQXBCLEVBQTBCO0FBQ3RCO0FBQ0EsZUFBS0EsTUFBTCxDQUFZaVEsY0FBWixJQUE4QixHQUE5QjtBQUNIO0FBQ0o7O0FBQ0QsVUFBSXBQLEtBQUssQ0FBQ1osSUFBTixLQUFlLE1BQW5CLEVBQTJCO0FBQ3ZCWSxhQUFLLENBQUN2QyxTQUFOLEdBQWtCLENBQUMsS0FBS1IsTUFBTixHQUFlLENBQWpDO0FBQ0ErQyxhQUFLLENBQUN0QyxTQUFOLEdBQWtCLENBQUMsRUFBbkI7QUFDQXNDLGFBQUssQ0FBQ2hDLE1BQU4sR0FBZSxFQUFmO0FBQ0FnQyxhQUFLLENBQUM5QyxNQUFOLENBQWFnQyxTQUFiLEdBQXlCLElBQXpCO0FBQ0g7QUFDSjs7O2dDQUVXbkgsRyxFQUFLO0FBQ2JBLFNBQUcsQ0FBQ29JLFNBQUo7QUFDQXBJLFNBQUcsQ0FBQ3FJLFdBQUosR0FBa0IsUUFBbEI7QUFDQXJJLFNBQUcsQ0FBQ3NJLElBQUosQ0FBUyxLQUFLaEQsTUFBZCxFQUNJLEtBQUtDLE1BRFQsRUFFSSxLQUFLTSxVQUZULEVBRXFCLEtBQUtDLFdBRjFCO0FBR0E5RixTQUFHLENBQUN1SSxNQUFKO0FBQ0F2SSxTQUFHLENBQUN3SSxTQUFKO0FBQ0g7Ozs0QkFHT3hJLEcsRUFBSztBQUNULFVBQUksS0FBSzhFLElBQUwsQ0FBVTRELFNBQWQsRUFBeUI7QUFDckIsYUFBS0MsV0FBTCxDQUFpQjNJLEdBQWpCO0FBQ0g7QUFDSjs7OztFQXpGb0IsdUM7O0FBMkZWLCtEQUFBa2QsVUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4R0E7QUFDQTs7SUFTTUMsTTs7Ozs7QUFFRixrQkFBWXJZLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBNkc7QUFBQTs7QUFBQSxRQUFyRjBCLEdBQXFGLHVFQUEvRSxJQUErRTtBQUFBLFFBQXpFNUIsR0FBeUUsdUVBQW5FLElBQW1FO0FBQUEsUUFBN0RSLEtBQTZELHVFQUFyRCxDQUFxRDtBQUFBLFFBQWxEVyxXQUFrRDtBQUFBLFFBQXJDNEUsV0FBcUMsdUVBQXZCLEVBQXVCO0FBQUEsUUFBbkJDLFlBQW1CLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3pHLGdGQUFNRixJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsVUFBS2lGLFdBQUwsR0FBbUIsT0FBbkI7QUFDQSxVQUFLb0YsTUFBTCxHQUFjLENBQWQ7QUFDQSxVQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFVBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxVQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFVBQUtDLE1BQUwsR0FBYyxHQUFkO0FBQ0EsVUFBS3hLLENBQUwsSUFBVSxFQUFWOztBQUNBLFFBQUksQ0FBQ0MsV0FBTCxFQUFrQjtBQUFFLFlBQUtGLENBQUwsSUFBVSxHQUFWO0FBQWdCLEtBQXBDLE1BQTBDO0FBQUUsWUFBS0EsQ0FBTCxJQUFVLEdBQVY7QUFBZTs7QUFBQSxLQVY4QyxDQVU3Qzs7QUFDNUQsVUFBS1QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS3VGLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFFQSxVQUFLWSxPQUFMLEdBQWUzRixDQUFDLEdBQUs4RSxXQUFXLEdBQUd2RixLQUFmLEdBQXdCLENBQTdCLEdBQWtDdUYsV0FBakQ7QUFDQSxVQUFLYyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixFQUFuQjs7QUFDQSxRQUFJM0YsV0FBSixFQUFpQjtBQUNiLFlBQUttRixNQUFMLEdBQWMsTUFBS00sT0FBTCxHQUFnQixNQUFLQyxVQUFMLEdBQWtCLENBQWxDLEdBQXVDLEdBQXJELENBRGEsQ0FDNkM7O0FBQzFELFlBQUtOLE1BQUwsR0FBYyxNQUFLckYsQ0FBTCxHQUFTLE1BQUs0RixXQUFkLEdBQTZCLE1BQUtkLFlBQWhEO0FBQ0gsS0FIRCxNQUlLO0FBQ0QsWUFBS00sTUFBTCxHQUFjLE1BQUtNLE9BQUwsR0FBZ0IsTUFBS0MsVUFBTCxHQUFrQixDQUFsQyxHQUF1QyxJQUFJLE1BQUtkLFdBQWhELEdBQThELEdBQTVFO0FBQ0EsWUFBS1EsTUFBTCxHQUFjLE1BQUtyRixDQUFMLEdBQVMsTUFBSzRGLFdBQWQsR0FBNkIsTUFBS2QsWUFBaEQ7QUFDSCxLQXpCd0csQ0EyQnpHOzs7QUFDQSxVQUFLeUksVUFBTCxHQUFrQixRQUFsQjtBQUNBLFVBQUsyUCxTQUFMLEdBQWlCLEdBQWpCO0FBQ0EsVUFBS25YLE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS0QsTUFBTCxHQUFjLEVBQWQ7QUFDQSxVQUFLcVgsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS3pJLEtBQUwsR0FBYSxHQUFiO0FBQ0EsVUFBSzBJLFNBQUwsR0FBaUIsQ0FBakI7QUFFQSxVQUFLclksTUFBTCxHQUFjO0FBQ1YsZ0JBQVUsSUFEQTtBQUVWLHFCQUFlaEY7QUFGTCxLQUFkO0FBSUEsVUFBS2lGLFVBQUwsR0FBa0I7QUFDZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsTUFBS3hELEdBQW5CLEVBQXdCLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBeEIsRUFBa0MsQ0FBbEMsRUFBcUMsRUFBckMsRUFBeUMsQ0FBekMsRUFBNEMsQ0FBNUMsRUFBK0MsSUFBL0MsRUFBcUQsTUFBS3BDLEtBQTFELEVBQWlFLEVBQWpFO0FBREksS0FBbEI7QUFHQSxVQUFLNkYsU0FBTCxHQUFpQixNQUFLRCxVQUFMLENBQWdCcVksTUFBakM7O0FBQ0EsUUFBSSxNQUFLdFksTUFBTCxDQUFZaEYsV0FBaEIsRUFBNkI7QUFBRSxZQUFLK0UsTUFBTCxHQUFjLENBQWQ7QUFBa0IsS0FBakQsTUFBdUQ7QUFBRSxZQUFLQSxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQWtCOztBQTlDOEI7QUErQzVHOzs7OzZCQUVRO0FBQ0w7QUFDQSxVQUFJLENBQUMsS0FBS0MsTUFBTCxDQUFZaEYsV0FBYixJQUE0QixLQUFLRixDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBeEIsR0FBNEIsQ0FBNUQsRUFBK0Q7QUFDM0QsYUFBS2tGLE1BQUwsQ0FBWWhGLFdBQVosR0FBMEIsSUFBMUI7QUFDQSxhQUFLK0UsTUFBTCxHQUFjLENBQWQ7QUFDSCxPQUhELE1BSUssSUFBSSxLQUFLQyxNQUFMLENBQVloRixXQUFaLElBQTJCLEtBQUtGLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUF4QixJQUE2QixDQUE1RCxFQUErRDtBQUNoRSxhQUFLa0YsTUFBTCxDQUFZaEYsV0FBWixHQUEwQixLQUExQjtBQUNBLGFBQUsrRSxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLQyxNQUFMLENBQVk0RCxNQUFoQixFQUF3QjtBQUFDO0FBQ3JCLFlBQUssS0FBS3NCLE1BQUwsR0FBYyxLQUFLRSxJQUFuQixJQUEyQixLQUFLckYsTUFBTCxLQUFnQixDQUE1QyxJQUFtRCxLQUFLbUYsTUFBTCxHQUFjLENBQUMsS0FBS0UsSUFBcEIsSUFBNEIsS0FBS3JGLE1BQUwsS0FBZ0IsQ0FBQyxDQUFwRyxFQUF3RztBQUNwRyxlQUFLbUYsTUFBTCxJQUFlLEtBQUtuRixNQUFMLEdBQWMsS0FBS3VGLE1BQWxDO0FBQ0g7O0FBQ0QsYUFBS3hLLENBQUwsSUFBVSxLQUFLb0ssTUFBZjtBQUNBLGFBQUsvRSxNQUFMLElBQWUsS0FBSytFLE1BQXBCOztBQUNBLFlBQUksS0FBS25LLENBQUwsR0FBUyxLQUFLNEUsSUFBTCxDQUFVWCxJQUFWLENBQWVqRSxDQUF4QixJQUE2QixDQUFqQyxFQUFvQztBQUFDO0FBQ2pDLGNBQUksS0FBS29LLE1BQUwsR0FBYyxDQUFDLEtBQUtFLElBQXhCLEVBQThCO0FBQzFCLGlCQUFLRixNQUFMLElBQWUsS0FBS0ksTUFBcEI7QUFDSDs7QUFDRCxlQUFLeEssQ0FBTCxJQUFVLEtBQUtvSyxNQUFmO0FBQ0EsZUFBSy9FLE1BQUwsSUFBZSxLQUFLK0UsTUFBcEI7QUFDSCxTQU5ELE1BT0s7QUFBQztBQUNGLGNBQUksS0FBS0EsTUFBTCxHQUFjLEtBQUtFLElBQXZCLEVBQTZCO0FBQ3pCLGlCQUFLRixNQUFMLElBQWUsS0FBS0ksTUFBcEI7QUFDSDs7QUFDRCxlQUFLeEssQ0FBTCxJQUFVLEtBQUtvSyxNQUFmLENBSkMsQ0FJcUI7O0FBQ3RCLGVBQUsvRSxNQUFMLElBQWUsS0FBSytFLE1BQXBCLENBTEMsQ0FLMEI7QUFDOUI7O0FBQ0QsWUFBSSxLQUFLakYsU0FBTCxDQUFldkYsS0FBZixHQUF1QixFQUEzQixFQUErQjtBQUMzQixlQUFLdUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGVBQUtZLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDs7QUFDRCxZQUFJLEtBQUtnVyxXQUFMLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLGVBQUtBLFdBQUw7QUFDSDtBQUNKO0FBQ0o7Ozt5QkFFSXRkLEcsRUFBSztBQUNOLFVBQUksS0FBS21GLE1BQUwsQ0FBWTRELE1BQWhCLEVBQXdCO0FBQ3BCLGFBQUsxRCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JxWSxNQUFqQztBQUNIOztBQUNELFdBQUs3VixPQUFMLENBQWE1SCxHQUFiO0FBQ0g7Ozs2QkFFUWlJLEssRUFBT0MsUyxFQUFXO0FBQ3ZCO0FBQ0EsVUFBSUQsS0FBSyxDQUFDWixJQUFOLEtBQWUsU0FBZixJQUE0QixLQUFLaEMsU0FBTCxDQUFldkYsS0FBZixHQUF1QixDQUF2RCxFQUEwRDtBQUN0RCxhQUFLd0gsZUFBTCxHQUF1QixJQUF2QjtBQUNIOztBQUNELFVBQUlXLEtBQUssQ0FBQ1osSUFBTixLQUFlLE1BQW5CLEVBQTJCO0FBQ3ZCLFlBQUlZLEtBQUssQ0FBQ1osSUFBTixLQUFlLE1BQWYsSUFBeUJZLEtBQUssQ0FBQzlDLE1BQU4sQ0FBYTZVLFlBQTFDLEVBQXdELENBQ3BEO0FBQ0gsU0FGRCxNQUdLO0FBQ0QsZUFBSzFTLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKLE9BUEQsTUFRSyxJQUFJVyxLQUFLLENBQUNaLElBQU4sS0FBZSxTQUFmLElBQTRCLENBQUNZLEtBQUssQ0FBQ0UsT0FBbkMsSUFBOEMsS0FBS3JELElBQUwsQ0FBVVgsSUFBVixDQUFlZ0IsTUFBZixDQUFzQndVLFFBQXhFLEVBQWtGO0FBQ25GLGFBQUt5RCxTQUFMLElBQWtCLEVBQWxCO0FBQ0EsYUFBSy9TLE1BQUwsR0FBYyxDQUFDLEtBQUtuRixNQUFOLEdBQWUsS0FBS3FGLElBQXBCLEdBQTJCLENBQXpDOztBQUNBLFlBQUk3SixJQUFJLENBQUNzTCxNQUFMLEtBQWdCLEdBQWhCLEdBQXNCLEVBQTFCLEVBQThCO0FBQzFCLGVBQUsxQixNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQ0gsU0FGRCxNQUdLO0FBQ0QsZUFBS0EsTUFBTCxHQUFjLENBQWQ7QUFDSCxTQVJrRixDQVNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDSCxPQWhCSSxNQWlCQSxJQUFLckMsS0FBSyxDQUFDWixJQUFOLEtBQWUsWUFBZixJQUErQlksS0FBSyxDQUFDOUMsTUFBTixDQUFhNlgsSUFBN0MsSUFBc0QvVSxLQUFLLENBQUNiLE1BQU4sS0FBaUIsa0JBQTNFLEVBQStGO0FBQ2hHLGFBQUtFLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOzs7aUNBRVlPLE0sRUFBUUMsTyxFQUFTQyxNLEVBQVFDLE8sRUFBUztBQUMzQyxXQUFLcEMsT0FBTCxHQUFlLEtBQUszRixDQUFMLEdBQVc0SCxNQUFNLEdBQUcsS0FBS3JJLEtBQWYsR0FBd0IsQ0FBbEMsR0FBdUNxSSxNQUF2QyxHQUFnRCxDQUEvRDtBQUNBLFdBQUtoQyxVQUFMLEdBQWtCLEtBQUtyRyxLQUFMLEdBQWF1SSxNQUEvQjtBQUNBLFdBQUtqQyxXQUFMLEdBQW1CLEtBQUt0RyxLQUFMLEdBQWF3SSxPQUFoQztBQUNBLFdBQUsxQyxNQUFMLEdBQWMsS0FBS00sT0FBTCxHQUFlLEtBQUtDLFVBQUwsR0FBa0IsQ0FBL0M7QUFDQSxXQUFLTixNQUFMLEdBQWMsS0FBS3JGLENBQUwsR0FBUyxLQUFLNEYsV0FBNUI7QUFDSDs7O2dDQUVXOUYsRyxFQUFLO0FBQ2JBLFNBQUcsQ0FBQ29JLFNBQUo7QUFDQXBJLFNBQUcsQ0FBQ3FJLFdBQUosR0FBa0IsT0FBbEI7QUFDQXJJLFNBQUcsQ0FBQ3NJLElBQUosQ0FBUyxLQUFLaEQsTUFBZCxFQUNJLEtBQUtDLE1BRFQsRUFFSSxLQUFLTSxVQUZULEVBRXFCLEtBQUtDLFdBRjFCO0FBR0E5RixTQUFHLENBQUN1SSxNQUFKO0FBQ0F2SSxTQUFHLENBQUN3SSxTQUFKO0FBQ0g7Ozs0QkFHT3hJLEcsRUFBSztBQUNULFdBQUtxRixTQUFMLENBQWVvRCxTQUFmLENBQXlCLENBQXpCLEVBQTRCekksR0FBNUIsRUFBaUMsS0FBS0MsQ0FBdEMsRUFBeUMsS0FBS0MsQ0FBOUMsRUFBaUQsS0FBS2lGLE1BQUwsQ0FBWWhGLFdBQTdEOztBQUNBLFVBQUksS0FBSzJFLElBQUwsQ0FBVTRELFNBQWQsRUFBeUI7QUFDckIsYUFBS0MsV0FBTCxDQUFpQjNJLEdBQWpCO0FBQ0g7QUFDSjs7OztFQTdKZ0IsdUM7O0FBZ0tOLCtEQUFBbWQsTUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxS0E7QUFDQTs7SUFFTU8sUzs7Ozs7QUFFRixxQkFBWTVZLElBQVosRUFBa0I3RSxDQUFsQixFQUFxQkMsQ0FBckIsRUFBNkc7QUFBQTs7QUFBQSxRQUFyRjBCLEdBQXFGLHVFQUEvRSxJQUErRTtBQUFBLFFBQXpFNUIsR0FBeUUsdUVBQW5FLElBQW1FO0FBQUEsUUFBN0RSLEtBQTZELHVFQUFyRCxDQUFxRDtBQUFBLFFBQWxEVyxXQUFrRDtBQUFBLFFBQXJDNEUsV0FBcUMsdUVBQXZCLEVBQXVCO0FBQUEsUUFBbkJDLFlBQW1CLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3pHLG1GQUFNRixJQUFOLEVBQVk3RSxDQUFaLEVBQWVDLENBQWYsRUFBa0IwQixHQUFsQixFQUF1QjVCLEdBQXZCO0FBQ0EsVUFBSzZJLGFBQUwsR0FBcUIsQ0FBckI7O0FBQ0EsUUFBSTFJLFdBQUosRUFBaUI7QUFBRSxZQUFLRixDQUFMLElBQVUsR0FBVjtBQUFnQixLQUFuQyxNQUF5QztBQUFFLFlBQUtBLENBQUwsSUFBVSxHQUFWO0FBQWU7O0FBQUEsS0FIK0MsQ0FHOUM7O0FBQzNELFVBQUtULEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUt1RixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBRUEsVUFBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLOEUsV0FBVyxHQUFHdkYsS0FBZixHQUF3QixDQUE1QztBQUNBLFVBQUtxRyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFVBQUtSLE1BQUwsR0FBYyxNQUFLTSxPQUFMLEdBQWdCLE1BQUtDLFVBQUwsR0FBa0IsQ0FBaEQ7QUFFQSxVQUFLTixNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBUyxNQUFLNEYsV0FBZCxHQUE0QixHQUExQyxDQWJ5RyxDQWV6Rzs7QUFFQSxVQUFLWCxNQUFMLEdBQWM7QUFDVixnQkFBVSxJQURBO0FBRVYscUJBQWVoRjtBQUZMLEtBQWQ7QUFJQSxVQUFLaUYsVUFBTCxHQUFrQjtBQUNkLG1CQUFhLElBQUksa0RBQUosQ0FBYyxNQUFLeEQsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxLQUFsRSxFQUF5RSxNQUFLeEYsS0FBOUUsRUFBcUYsRUFBckY7QUFEQyxLQUFsQjtBQUdBLFVBQUs2RixTQUFMLEdBQWlCLE1BQUtELFVBQUwsQ0FBZ0J1WSxTQUFqQztBQXhCeUc7QUF5QjVHOzs7OzZCQUVRO0FBQ0w7QUFFQSxVQUFJLEtBQUt4WSxNQUFMLENBQVk0RCxNQUFoQixFQUF3QjtBQUNwQixZQUFJLEtBQUsxRCxTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFFekIsZUFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxlQUFLdkIsTUFBTCxDQUFZNEQsTUFBWixHQUFxQixLQUFyQjtBQUNBLGVBQUt6QixlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSjtBQUNKOzs7eUJBRUl0SCxHLEVBQUs7QUFDTixVQUFJLEtBQUttRixNQUFMLENBQVk0RCxNQUFoQixFQUF3QjtBQUNwQixhQUFLMUQsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCdVksU0FBakM7QUFDSDs7QUFDRCxXQUFLL1YsT0FBTCxDQUFhNUgsR0FBYjtBQUNIOzs7Z0NBRVdBLEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7NEJBR094SSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUFqRW1CLHVDOztBQW9FVCwrREFBQTBkLFNBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkVBO0NBV0E7O0lBQ01FLGM7Ozs7O0FBRUYsMEJBQVk5WSxJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQWdHO0FBQUE7O0FBQUEsUUFBeEUwQixHQUF3RSx1RUFBbEUsSUFBa0U7QUFBQSxRQUE1RDVCLEdBQTRELHVFQUF0RCxJQUFzRDtBQUFBLFFBQWhEUixLQUFnRCx1RUFBeEMsQ0FBd0M7QUFBQSxRQUFyQ3VGLFdBQXFDLHVFQUF2QixFQUF1QjtBQUFBLFFBQW5CQyxZQUFtQix1RUFBSixFQUFJOztBQUFBOztBQUM1Rix3RkFBTUYsSUFBTixFQUFZN0UsQ0FBWixFQUFlQyxDQUFmLEVBQWtCMEIsR0FBbEIsRUFBdUI1QixHQUF2QjtBQUNBLFVBQUtpRixXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsVUFBSzRELGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxVQUFLbEQsU0FBTCxHQUFpQixDQUFqQjtBQUVBLFVBQUtuRyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLdUYsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUVBLFVBQUtZLE9BQUwsR0FBZTNGLENBQUMsR0FBSzhFLFdBQVcsR0FBR3ZGLEtBQWYsR0FBd0IsQ0FBN0IsR0FBa0N1RixXQUFqRDtBQUNBLFVBQUtjLFVBQUwsR0FBa0IsTUFBS3JHLEtBQUwsR0FBYSxFQUEvQjtBQUNBLFVBQUtzRyxXQUFMLEdBQW1CLE1BQUt0RyxLQUFMLEdBQWEsRUFBaEM7QUFDQSxVQUFLOEYsTUFBTCxHQUFjLE1BQUtNLE9BQUwsR0FBZ0IsTUFBS0MsVUFBTCxHQUFrQixDQUFoRDtBQUNBLFVBQUtOLE1BQUwsR0FBYyxNQUFLckYsQ0FBTCxHQUFTLE1BQUs0RixXQUFkLElBQTZCLE1BQUtkLFlBQUwsR0FBb0IsQ0FBcEIsR0FBd0IsRUFBckQsQ0FBZCxDQWQ0RixDQWU1RjtBQUVBOztBQUNBLFVBQUtvRixVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS3BFLE1BQUwsR0FBYyxFQUFkO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxVQUFLZixNQUFMLEdBQWMsQ0FBQyxDQUFmLENBckI0RixDQXVCNUY7O0FBQ0EsVUFBSzJZLE9BQUwsR0FBZSxDQUFmO0FBQ0EsVUFBS0MsZUFBTCxHQUF1QixHQUF2QjtBQUNBLFVBQUtDLG9CQUFMLEdBQTRCLENBQTVCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxVQUFLbFksV0FBTCxDQUFpQixDQUFqQixJQUFzQixJQUF0QjtBQUNBLFVBQUtBLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsR0FBdEI7QUFFQSxVQUFLWixNQUFMLEdBQWM7QUFDVixnQkFBVSxLQURBO0FBQ087QUFDakIsZ0JBQVUsSUFGQTtBQUdWLGlCQUFXLEtBSEQ7QUFJViwwQkFBb0IsS0FKVjtBQUtWLHlCQUFtQixLQUxUO0FBTVYsMEJBQW9CLEtBTlY7QUFPVixpQkFBVyxLQVBEO0FBUVYsd0JBQWtCLEtBUlI7QUFTVixzQkFBZ0IsS0FUTjtBQVVWLGtCQUFZLEtBVkY7QUFXVixpQkFBVyxLQVhEO0FBWVYscUJBQWUsS0FaTDtBQWFWLHFCQUFlLEtBYkw7QUFjVixxQkFBZTtBQWRMLEtBQWQ7QUFnQkEsVUFBS0MsVUFBTCxHQUFrQjtBQUNkLGNBQVEsSUFBSSxrREFBSixDQUFjLE1BQUt4RCxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELEVBQXhELEVBQTRELENBQTVELEVBQStELENBQS9ELEVBQWtFLElBQWxFLEVBQXdFLE1BQUt4RixLQUE3RSxDQURNO0FBRWQsY0FBUSxJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsS0FBbEUsRUFBeUUsTUFBS3hGLEtBQTlFLEVBQXFGLENBQXJGLENBRk07QUFHZCxlQUFTLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxLQUFsRSxFQUF5RSxNQUFLeEYsS0FBOUUsRUFBcUYsRUFBckYsQ0FISztBQUlkLGFBQU8sSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELEVBQXhELEVBQTRELENBQTVELEVBQStELEVBQS9ELEVBQW1FLElBQW5FLEVBQXlFLE1BQUt4RixLQUE5RSxDQUpPO0FBS2QsdUJBQWlCLElBQUksa0RBQUosQ0FBYyxNQUFLb0MsR0FBbkIsRUFBd0IsQ0FBQ21ELFdBQUQsRUFBY0MsWUFBZCxDQUF4QixFQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxFQUE0RCxDQUE1RCxFQUErRCxDQUEvRCxFQUFrRSxLQUFsRSxFQUF5RSxNQUFLeEYsS0FBOUUsQ0FMSDtBQU1kLHNCQUFnQixJQUFJLGtEQUFKLENBQWMsTUFBS29DLEdBQW5CLEVBQXdCLENBQUNtRCxXQUFELEVBQWNDLFlBQWQsQ0FBeEIsRUFBcUQsQ0FBckQsRUFBd0QsRUFBeEQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsRUFBa0UsS0FBbEUsRUFBeUUsTUFBS3hGLEtBQTlFLEVBQXFGLENBQXJGLENBTkY7QUFPZCx1QkFBaUIsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDbUQsV0FBRCxFQUFjQyxZQUFkLENBQXhCLEVBQXFELENBQXJELEVBQXdELEVBQXhELEVBQTRELENBQTVELEVBQStELENBQS9ELEVBQWtFLElBQWxFLEVBQXdFLE1BQUt4RixLQUE3RSxFQUFvRixDQUFwRixDQVBIO0FBUWQscUJBQWUsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEdBQUQsRUFBTSxFQUFOLENBQXhCLEVBQW1DLENBQW5DLEVBQXNDLEVBQXRDLEVBQTBDLENBQTFDLEVBQTZDLENBQTdDLEVBQWdELEtBQWhELEVBQXVELE1BQUtwQyxLQUE1RCxDQVJEO0FBU2QsbUJBQWEsSUFBSSxrREFBSixDQUFjLE1BQUtvQyxHQUFuQixFQUF3QixDQUFDLEdBQUQsRUFBTSxFQUFOLENBQXhCLEVBQW1DLENBQW5DLEVBQXNDLEVBQXRDLEVBQTBDLENBQTFDLEVBQTZDLENBQTdDLEVBQWdELEtBQWhELEVBQXVELE1BQUtwQyxLQUE1RCxFQUFtRSxDQUFuRTtBQVRDLEtBQWxCO0FBV0EsVUFBSzZGLFNBQUwsR0FBaUIsTUFBS0QsVUFBTCxDQUFnQjhILElBQWpDO0FBM0Q0RjtBQTREL0Y7Ozs7NkJBR1E7QUFDTCxVQUFJeE0sSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt4TCxDQUFMLEdBQVMsS0FBSzRFLElBQUwsQ0FBVVgsSUFBVixDQUFlakUsQ0FBakMsS0FBdUMsS0FBSzZGLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBM0MsRUFBZ0U7QUFDNUQsYUFBS1osTUFBTCxDQUFZNEQsTUFBWixHQUFxQixJQUFyQjtBQUNIO0FBQ0Q7OztBQUNBLFVBQUksS0FBSzVELE1BQUwsQ0FBWTRELE1BQWhCLEVBQXdCO0FBQ3BCO0FBQ0EsWUFBSSxLQUFLNUQsTUFBTCxDQUFZc0csTUFBWixJQUFzQixDQUFDLEtBQUt0RyxNQUFMLENBQVkrWSxXQUFuQyxJQUNHeGQsSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsSUFBc0MsS0FBSzhGLFdBQUwsQ0FBaUIsQ0FBakIsQ0FEekMsSUFFR3JGLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLeEwsQ0FBTCxHQUFTLEtBQUs0RSxJQUFMLENBQVVYLElBQVYsQ0FBZWpFLENBQWpDLElBQXNDLEtBQUs2RixXQUFMLENBQWlCLENBQWpCLENBRjdDLEVBRWtFO0FBQzlEO0FBQ0EsY0FBSSxLQUFLakIsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUFmLEdBQW1CLEtBQUtBLENBQXhCLElBQTZCLENBQUMsS0FBS2tGLE1BQUwsQ0FBWWhGLFdBQTFDLElBQXlELENBQUMsS0FBS2dGLE1BQUwsQ0FBWWdaLFFBQTFFLEVBQW9GO0FBQ2hGLGlCQUFLaFosTUFBTCxDQUFZaVosT0FBWixHQUFzQixJQUF0QjtBQUNBLGlCQUFLalosTUFBTCxDQUFZc0csTUFBWixHQUFxQixLQUFyQjtBQUNILFdBSEQsTUFJSyxJQUFJLEtBQUszRyxJQUFMLENBQVVYLElBQVYsQ0FBZWxFLENBQWYsR0FBbUIsS0FBS0EsQ0FBeEIsSUFBNkIsS0FBS2tGLE1BQUwsQ0FBWWhGLFdBQXpDLElBQXdELENBQUMsS0FBS2dGLE1BQUwsQ0FBWWdaLFFBQXpFLEVBQW1GO0FBQ3BGLGlCQUFLaFosTUFBTCxDQUFZaVosT0FBWixHQUFzQixJQUF0QjtBQUNBLGlCQUFLalosTUFBTCxDQUFZc0csTUFBWixHQUFxQixLQUFyQjtBQUNILFdBVDZELENBVTlEOzs7QUFDQSxjQUFJL0ssSUFBSSxDQUFDZ0wsR0FBTCxDQUFTLEtBQUt6TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBakMsS0FBdUMsR0FBdkMsSUFBOENTLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLeEwsQ0FBTCxHQUFTLEtBQUs0RSxJQUFMLENBQVVYLElBQVYsQ0FBZWpFLENBQWpDLElBQXNDLEVBQXBGLElBQ0dRLElBQUksQ0FBQ3NMLE1BQUwsS0FBZ0IsR0FBaEIsSUFBdUIsQ0FEMUIsSUFDK0IsS0FBSzNHLFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsQ0FEMUQsRUFDNkQ7QUFBRTtBQUMzRCxpQkFBS3FGLE1BQUwsQ0FBWWtaLGNBQVosR0FBNkIsSUFBN0I7QUFDQSxpQkFBS2xaLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsS0FBckI7QUFDQSxpQkFBS3BHLFNBQUwsQ0FBZXFCLEtBQWY7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLdkIsTUFBTCxDQUFZaEYsV0FBakIsRUFBOEI7QUFDMUIsbUJBQUtGLENBQUwsSUFBVSxFQUFWO0FBQ0g7QUFDSixXQW5CNkQsQ0FvQjlEOzs7QUFDQSxjQUFJUyxJQUFJLENBQUNnTCxHQUFMLENBQVMsS0FBS3pMLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUFqQyxLQUF1QyxHQUF2QyxJQUNHUyxJQUFJLENBQUNnTCxHQUFMLENBQVMsS0FBS3pMLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUFqQyxLQUF1QyxJQUQxQyxJQUVHLEtBQUtvRixTQUFMLENBQWV2RixLQUFmLElBQXdCLENBRi9CLEVBRWtDO0FBQUU7QUFFaEMsZ0JBQUlZLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUyxLQUFLekwsQ0FBTCxHQUFTLEtBQUs2RSxJQUFMLENBQVVYLElBQVYsQ0FBZWxFLENBQWpDLEtBQXVDLEdBQXZDLElBQ0dTLElBQUksQ0FBQ3NMLE1BQUwsS0FBZ0IsRUFBaEIsSUFBc0IsS0FBSzZSLE9BRDlCLElBRUcsS0FBS0Usb0JBQUwsSUFBNkIsQ0FGcEMsRUFFdUM7QUFDbkNyYSxxQkFBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBLG1CQUFLa2EsT0FBTCxJQUFnQixHQUFoQjtBQUNBLG1CQUFLSSxZQUFMLEdBQW9CLEtBQUtELFdBQXpCO0FBQ0EsbUJBQUtELG9CQUFMLEdBQTRCLEtBQUtELGVBQWpDO0FBQ0EsbUJBQUszWSxNQUFMLENBQVkrWSxXQUFaLEdBQTBCLElBQTFCO0FBQ0EsbUJBQUsvWSxNQUFMLENBQVltWixnQkFBWixHQUErQixJQUEvQjtBQUNBLG1CQUFLblosTUFBTCxDQUFZaVosT0FBWixHQUFzQixLQUF0QjtBQUNBLG1CQUFLalosTUFBTCxDQUFZc0csTUFBWixHQUFxQixLQUFyQjtBQUNILGFBWEQsTUFXTztBQUNILG1CQUFLcEcsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLG1CQUFLckIsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLG1CQUFLdkIsTUFBTCxDQUFZbVosZ0JBQVosR0FBK0IsSUFBL0I7QUFDQSxtQkFBS25aLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsS0FBckI7QUFDSDtBQUNKO0FBQ0o7QUFHRDs7O0FBQ0EsWUFBSSxDQUFDLEtBQUt0RyxNQUFMLENBQVlvWixlQUFiLElBQWdDLENBQUMsS0FBS3BaLE1BQUwsQ0FBWW1aLGdCQUFqRCxFQUFtRTtBQUMvRCxjQUFJLEtBQUtQLG9CQUFMLEdBQTRCLENBQWhDLEVBQW1DO0FBQy9CLGlCQUFLQSxvQkFBTCxJQUE2QixDQUE3QjtBQUNIOztBQUNELGNBQUksS0FBS0UsWUFBTCxHQUFvQixDQUF4QixFQUEyQjtBQUN2QixpQkFBS0EsWUFBTCxJQUFxQixDQUFyQjtBQUNIO0FBQ0o7QUFDRDtBQUVBOzs7QUFDQSxZQUFJLEtBQUs5WSxNQUFMLENBQVkrWSxXQUFaLElBQTJCLENBQUMsS0FBSy9ZLE1BQUwsQ0FBWW1aLGdCQUF4QyxJQUE0RCxDQUFDLEtBQUtuWixNQUFMLENBQVlvWixlQUF6RSxJQUE0RixDQUFDLEtBQUtwWixNQUFMLENBQVlxWixnQkFBN0csRUFBK0g7QUFDM0gsY0FBSSxLQUFLUCxZQUFMLElBQXFCLEtBQUtELFdBQUwsR0FBbUIsQ0FBNUMsRUFBK0M7QUFDM0MsaUJBQUs3WSxNQUFMLENBQVlpWixPQUFaLEdBQXNCLElBQXRCO0FBQ0g7O0FBQ0QsY0FBSSxLQUFLSCxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGlCQUFLOVksTUFBTCxDQUFZK1ksV0FBWixHQUEwQixLQUExQjtBQUNBLGlCQUFLL1ksTUFBTCxDQUFZcVQsT0FBWixHQUFzQixLQUF0QjtBQUNBLGlCQUFLclQsTUFBTCxDQUFZaVosT0FBWixHQUFzQixJQUF0QjtBQUNILFdBSkQsTUFLSyxJQUFJLEtBQUtILFlBQUwsR0FBb0IsQ0FBcEIsSUFBeUIsQ0FBQyxLQUFLOVksTUFBTCxDQUFZaVosT0FBMUMsRUFBbUQ7QUFDcEQsaUJBQUtqWixNQUFMLENBQVlxVCxPQUFaLEdBQXNCLElBQXRCO0FBQ0EsaUJBQUtyVCxNQUFMLENBQVlzRyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0g7QUFDSjs7QUFFRCxZQUFJLEtBQUt0RyxNQUFMLENBQVlxVCxPQUFoQixFQUF5QjtBQUFFO0FBQ3ZCLGVBQUt2WSxDQUFMLElBQVUsS0FBS2lGLE1BQUwsR0FBYyxLQUFLMkQsYUFBN0I7QUFDQSxlQUFLdkQsTUFBTCxJQUFlLEtBQUtKLE1BQUwsR0FBYyxLQUFLMkQsYUFBbEM7O0FBQ0EsY0FBSSxLQUFLeEQsU0FBTCxDQUFldkYsS0FBZixJQUF3QixDQUE1QixFQUErQjtBQUMzQixpQkFBS3VGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWXFULE9BQVosR0FBc0IsS0FBdEI7QUFDQSxpQkFBS3JULE1BQUwsQ0FBWStILElBQVosR0FBbUIsSUFBbkI7QUFDSDtBQUNKOztBQUNELFlBQUksS0FBSy9ILE1BQUwsQ0FBWW1aLGdCQUFaLElBQWdDLENBQUMsS0FBS25aLE1BQUwsQ0FBWWtJLFdBQWpELEVBQThEO0FBQUU7QUFDNUQsY0FBSSxLQUFLaEksU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLGlCQUFLaUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLdkIsTUFBTCxDQUFZbVosZ0JBQVosR0FBK0IsS0FBL0I7QUFDQSxpQkFBS25aLE1BQUwsQ0FBWW9aLGVBQVosR0FBOEIsSUFBOUI7QUFDSDtBQUNKOztBQUNELFlBQUksS0FBS3BaLE1BQUwsQ0FBWW9aLGVBQWhCLEVBQWlDO0FBQUU7QUFDL0IsY0FBSSxDQUFDLEtBQUtwWixNQUFMLENBQVlzWixPQUFqQixFQUEwQjtBQUN0QixpQkFBSzNaLElBQUwsQ0FBVWtDLFNBQVYsQ0FBb0IsYUFBcEI7QUFDQSxpQkFBS2xDLElBQUwsQ0FBVVAsU0FBVixDQUFvQixJQUFJLDJDQUFKLENBQWMsS0FBS08sSUFBbkIsRUFBeUIsS0FBSzdFLENBQTlCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUswQixHQUE5QyxFQUFtRCxLQUFLNUIsR0FBeEQsRUFBNkQsS0FBS1IsS0FBbEUsRUFBeUUsS0FBSzJGLE1BQUwsQ0FBWWhGLFdBQXJGLENBQXBCO0FBQ0EsaUJBQUsyRSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSx3Q0FBSixDQUFXLEtBQUtPLElBQWhCLEVBQXNCLEtBQUs3RSxDQUEzQixFQUE4QixLQUFLQyxDQUFuQyxFQUFzQyxLQUFLMEIsR0FBM0MsRUFBZ0QsS0FBSzVCLEdBQXJELEVBQTBELEtBQUtSLEtBQS9ELEVBQXNFLEtBQUsyRixNQUFMLENBQVloRixXQUFsRixDQUFwQjtBQUNBLGlCQUFLZ0YsTUFBTCxDQUFZc1osT0FBWixHQUFzQixJQUF0QjtBQUNIOztBQUNELGNBQUksS0FBS3BaLFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixpQkFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3JCLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWW9aLGVBQVosR0FBOEIsS0FBOUI7QUFDQSxpQkFBS3BaLE1BQUwsQ0FBWXNaLE9BQVosR0FBc0IsS0FBdEIsQ0FKeUIsQ0FLekI7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLdFosTUFBTCxDQUFZK1ksV0FBakIsRUFDSSxLQUFLL1ksTUFBTCxDQUFZc0csTUFBWixHQUFxQixJQUFyQjtBQUNQO0FBQ0o7O0FBQ0QsWUFBSSxLQUFLdEcsTUFBTCxDQUFZcVosZ0JBQWhCLEVBQWtDO0FBQzlCLGNBQUksS0FBS25aLFNBQUwsQ0FBZXZGLEtBQWYsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsaUJBQUt1RixTQUFMLENBQWVxQixLQUFmO0FBQ0EsaUJBQUt2QixNQUFMLENBQVlxWixnQkFBWixHQUErQixLQUEvQjtBQUNBLGdCQUFJLENBQUMsS0FBS3JaLE1BQUwsQ0FBWStZLFdBQWpCLEVBQ0ksS0FBSy9ZLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsSUFBckI7QUFDUDtBQUNKOztBQUNELFlBQUksS0FBS3RHLE1BQUwsQ0FBWWtaLGNBQVosSUFBOEIsQ0FBQyxLQUFLbFosTUFBTCxDQUFZa0ksV0FBL0MsRUFBNEQ7QUFBRTtBQUMxRCxjQUFJLEtBQUtoSSxTQUFMLENBQWUvRSxZQUFmLE9BQWtDLENBQXRDLEVBQXlDO0FBQ3JDLGdCQUFJLEtBQUs2RSxNQUFMLENBQVloRixXQUFoQixFQUNJLEtBQUsyRSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSx5Q0FBSixDQUFZLEtBQUtPLElBQWpCLEVBQXVCLEtBQUs5RSxHQUE1QixFQUFpQyxLQUFLc0YsTUFBdEMsRUFBOEMsS0FBS0MsTUFBbkQsRUFBMkQsQ0FBM0QsRUFBOEQsR0FBOUQsRUFDaEIsS0FBS1IsV0FEVyxFQUNFLEtBQUtDLFlBRFAsRUFDcUIsRUFEckIsRUFDeUIsR0FEekIsRUFDOEIsS0FBS3hGLEtBRG5DLEVBQzBDLElBQUUsS0FBS3lHLE1BRGpELEVBQ3lELEtBQUtkLE1BQUwsQ0FBWWhGLFdBRHJFLEVBQ2tGLElBRGxGLENBQXBCLEVBREosS0FJSSxLQUFLMkUsSUFBTCxDQUFVUCxTQUFWLENBQW9CLElBQUkseUNBQUosQ0FBWSxLQUFLTyxJQUFqQixFQUF1QixLQUFLOUUsR0FBNUIsRUFBaUMsS0FBS3NGLE1BQXRDLEVBQThDLEtBQUtDLE1BQW5ELEVBQTJELENBQUMsRUFBRCxHQUFNLEtBQUtSLFdBQVgsR0FBeUIsSUFBRSxFQUF0RixFQUEwRixHQUExRixFQUNoQixLQUFLQSxXQURXLEVBQ0UsS0FBS0MsWUFEUCxFQUNxQixFQURyQixFQUN5QixHQUR6QixFQUM4QixLQUFLeEYsS0FEbkMsRUFDMEMsSUFBRSxLQUFLeUcsTUFEakQsRUFDeUQsS0FBS2QsTUFBTCxDQUFZaEYsV0FEckUsRUFDa0YsSUFEbEYsQ0FBcEI7QUFFUDs7QUFDRCxjQUFJLEtBQUtrRixTQUFMLENBQWVqRixNQUFmLEVBQUosRUFBNkI7QUFDekIsaUJBQUtpRixTQUFMLENBQWVxQixLQUFmO0FBQ0EsaUJBQUt2QixNQUFMLENBQVlrWixjQUFaLEdBQTZCLEtBQTdCO0FBQ0EsaUJBQUtsWixNQUFMLENBQVl1WixZQUFaLEdBQTJCLElBQTNCO0FBQ0g7QUFDSjs7QUFDRCxZQUFJLEtBQUt2WixNQUFMLENBQVl1WixZQUFoQixFQUE4QjtBQUFFO0FBQzVCLGNBQUksS0FBS3JaLFNBQUwsQ0FBZS9FLFlBQWYsTUFBaUMsQ0FBakMsSUFBc0MsS0FBSytFLFNBQUwsQ0FBZS9FLFlBQWYsTUFBaUMsQ0FBM0UsRUFBOEU7QUFDMUUsZ0JBQUksS0FBSzZFLE1BQUwsQ0FBWWhGLFdBQWhCLEVBQ0ksS0FBSzJFLElBQUwsQ0FBVVAsU0FBVixDQUFvQixJQUFJLHlDQUFKLENBQVksS0FBS08sSUFBakIsRUFBdUIsS0FBSzlFLEdBQTVCLEVBQWlDLEtBQUtzRixNQUF0QyxFQUE4QyxLQUFLQyxNQUFuRCxFQUEyRCxDQUEzRCxFQUE4RCxHQUE5RCxFQUNoQixLQUFLUixXQURXLEVBQ0UsS0FBS0MsWUFEUCxFQUNxQixFQURyQixFQUN5QixHQUR6QixFQUM4QixLQUFLeEYsS0FEbkMsRUFDMEMsSUFBRSxLQUFLeUcsTUFEakQsRUFDeUQsS0FBS2QsTUFBTCxDQUFZaEYsV0FEckUsRUFDa0YsSUFEbEYsQ0FBcEIsRUFESixLQUlJLEtBQUsyRSxJQUFMLENBQVVQLFNBQVYsQ0FBb0IsSUFBSSx5Q0FBSixDQUFZLEtBQUtPLElBQWpCLEVBQXVCLEtBQUs5RSxHQUE1QixFQUFpQyxLQUFLc0YsTUFBdEMsRUFBOEMsS0FBS0MsTUFBbkQsRUFBMkQsQ0FBQyxFQUFELEdBQU0sS0FBS1IsV0FBWCxHQUF5QixJQUFFLEVBQXRGLEVBQTBGLEdBQTFGLEVBQ2hCLEtBQUtBLFdBRFcsRUFDRSxLQUFLQyxZQURQLEVBQ3FCLEVBRHJCLEVBQ3lCLEdBRHpCLEVBQzhCLEtBQUt4RixLQURuQyxFQUMwQyxJQUFFLEtBQUt5RyxNQURqRCxFQUN5RCxLQUFLZCxNQUFMLENBQVloRixXQURyRSxFQUNrRixJQURsRixDQUFwQjtBQUVQOztBQUNELGNBQUksS0FBS2tGLFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixpQkFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWXVaLFlBQVosR0FBMkIsS0FBM0I7QUFDQSxpQkFBS3ZaLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsSUFBckI7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLdEcsTUFBTCxDQUFZaEYsV0FBakIsRUFBOEI7QUFDMUIsbUJBQUtGLENBQUwsSUFBVSxFQUFWO0FBQ0g7QUFDSjtBQUNKOztBQUNELFlBQUksS0FBS2tGLE1BQUwsQ0FBWWdaLFFBQWhCLEVBQTBCO0FBQUU7QUFDeEI7QUFDQSxjQUFJLEtBQUtoWixNQUFMLENBQVloRixXQUFoQixFQUE2QjtBQUN6QixpQkFBS0YsQ0FBTCxJQUFVLENBQVY7QUFDQSxpQkFBS3FGLE1BQUwsSUFBZSxDQUFmO0FBQ0gsV0FIRCxNQUdPO0FBQ0gsaUJBQUtyRixDQUFMLElBQVUsQ0FBVjtBQUNBLGlCQUFLcUYsTUFBTCxJQUFlLENBQWY7QUFDSDs7QUFDRCxjQUFJLEtBQUtELFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixpQkFBS2lGLFNBQUwsQ0FBZXFCLEtBQWY7QUFDQSxpQkFBS3ZCLE1BQUwsQ0FBWWdaLFFBQVosR0FBdUIsS0FBdkI7QUFDQSxpQkFBS2haLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsSUFBckI7QUFDSDtBQUNKOztBQUNELFlBQUksS0FBS3RHLE1BQUwsQ0FBWWlaLE9BQWhCLEVBQXlCO0FBQUU7QUFDdkIsZUFBS2paLE1BQUwsQ0FBWWtJLFdBQVosR0FBMEIsSUFBMUI7O0FBQ0EsY0FBSSxLQUFLaEksU0FBTCxDQUFlakYsTUFBZixFQUFKLEVBQTZCO0FBQ3pCLGlCQUFLaUYsU0FBTCxDQUFlcUIsS0FBZjtBQUNBLGlCQUFLdkIsTUFBTCxDQUFZaVosT0FBWixHQUFzQixLQUF0QjtBQUNBLGlCQUFLalosTUFBTCxDQUFZaEYsV0FBWixHQUEwQixDQUFDLEtBQUtnRixNQUFMLENBQVloRixXQUF2QztBQUNBLGlCQUFLK0UsTUFBTCxJQUFlLENBQUMsQ0FBaEIsQ0FKeUIsQ0FJTjs7QUFDbkIsaUJBQUtDLE1BQUwsQ0FBWWtJLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxpQkFBS2xJLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsSUFBckI7QUFDSDtBQUNKOztBQUNELGFBQUs5RixTQUFMLElBQWtCLEtBQUs0QixPQUFMLEdBQWUsS0FBS0EsT0FBdEM7QUFDQSxhQUFLckgsQ0FBTCxJQUFVLEtBQUt5RixTQUFmO0FBQ0EsYUFBSzZCLFVBQUwsR0FBa0IsS0FBS2pDLE1BQXZCO0FBQ0EsYUFBS0EsTUFBTCxJQUFlLEtBQUtJLFNBQXBCO0FBRUEsWUFBSSxLQUFLSyxNQUFMLElBQWUsQ0FBbkIsRUFDSSxLQUFLc0IsZUFBTCxHQUF1QixJQUF2QjtBQUNQO0FBQ0o7Ozt5QkFFSXRILEcsRUFBSztBQUNOLFVBQUksS0FBS21GLE1BQUwsQ0FBWXNHLE1BQWhCLEVBQXdCO0FBQ3BCLGFBQUtZLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsRUFBbEMsRUFBc0MsQ0FBdEM7QUFDQSxhQUFLaEgsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCOEgsSUFBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUsvSCxNQUFMLENBQVlxVCxPQUFoQixFQUF5QjtBQUNyQixhQUFLbk0sWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQztBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0J1WixHQUFqQztBQUNIOztBQUNELFVBQUksS0FBS3haLE1BQUwsQ0FBWW1aLGdCQUFoQixFQUFrQztBQUM5QixhQUFLalMsWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQztBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0J3WixhQUFqQztBQUNIOztBQUNELFVBQUksS0FBS3paLE1BQUwsQ0FBWW9aLGVBQWhCLEVBQWlDO0FBQzdCLGFBQUtsUyxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDO0FBQ0EsYUFBS2hILFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQnlaLFlBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLMVosTUFBTCxDQUFZcVosZ0JBQWhCLEVBQWtDO0FBQzlCLGFBQUtuUyxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDO0FBQ0EsYUFBS2hILFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQjBaLGFBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLM1osTUFBTCxDQUFZa1osY0FBaEIsRUFBZ0M7QUFDNUIsYUFBS2hTLFlBQUwsQ0FBa0IsR0FBbEIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBM0IsRUFBK0IsRUFBL0IsRUFBbUMsQ0FBQyxFQUFwQyxFQUF3QyxDQUF4QztBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0IyWixXQUFqQztBQUNIOztBQUNELFVBQUksS0FBSzVaLE1BQUwsQ0FBWXVaLFlBQWhCLEVBQThCO0FBQzFCLGFBQUtyUyxZQUFMLENBQWtCLEdBQWxCLEVBQXVCLEVBQXZCLEVBQTJCLEVBQTNCLEVBQStCLEVBQS9CLEVBQW1DLENBQUMsRUFBcEMsRUFBd0MsQ0FBeEM7QUFDQSxhQUFLaEgsU0FBTCxHQUFpQixLQUFLRCxVQUFMLENBQWdCNFosU0FBakM7QUFDSDs7QUFDRCxVQUFJLEtBQUs3WixNQUFMLENBQVlnWixRQUFoQixFQUEwQjtBQUN0QixhQUFLOVIsWUFBTCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxDQUFDLEVBQW5DLEVBQXVDLENBQXZDO0FBQ0EsYUFBS2hILFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQjZaLEtBQWpDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLOVosTUFBTCxDQUFZaVosT0FBaEIsRUFBeUI7QUFDckIsYUFBSy9SLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsQ0FBQyxFQUFuQyxFQUF1QyxDQUF2QztBQUNBLGFBQUtoSCxTQUFMLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0I4WixJQUFqQztBQUNIOztBQUNELFdBQUt0WCxPQUFMLENBQWE1SCxHQUFiO0FBQ0gsSyxDQUVEOzs7O2lDQUNhNkgsTSxFQUFRQyxPLEVBQVNDLE0sRUFBUUMsTyxFQUFTdUIsSSxFQUFNQyxJLEVBQU07QUFDdkQsV0FBSzVELE9BQUwsR0FBZSxLQUFLM0YsQ0FBTCxHQUFXNEgsTUFBTSxHQUFHLEtBQUtySSxLQUFmLEdBQXdCLENBQWxDLEdBQXVDcUksTUFBdEQ7QUFDQSxXQUFLaEMsVUFBTCxHQUFrQixLQUFLckcsS0FBTCxHQUFhdUksTUFBL0I7QUFDQSxXQUFLakMsV0FBTCxHQUFtQixLQUFLdEcsS0FBTCxHQUFhd0ksT0FBaEM7QUFDQSxXQUFLMUMsTUFBTCxHQUFjLEtBQUtNLE9BQUwsR0FBZSxLQUFLQyxVQUFMLEdBQWtCLENBQWpDLEdBQXFDLEtBQUtYLE1BQUwsR0FBWXFFLElBQS9EO0FBQ0EsV0FBS2hFLE1BQUwsR0FBYyxLQUFLckYsQ0FBTCxHQUFTLEtBQUs0RixXQUFkLElBQTZCZ0MsT0FBTyxHQUFHLENBQVYsR0FBYyxFQUEzQyxDQUFkO0FBQ0g7Ozs2QkFFUUcsSyxFQUFPQyxTLEVBQVc7QUFDdkIsVUFBSUQsS0FBSyxDQUFDWixJQUFOLEtBQWdCLFNBQXBCLEVBQStCO0FBQzNCLFlBQUlhLFNBQVMsS0FBSyxRQUFsQixFQUE0QjtBQUN4QixlQUFLM0MsTUFBTCxHQUFjMEMsS0FBSyxDQUFDMUMsTUFBTixHQUFlLEtBQUtPLFdBQWxDO0FBQ0EsZUFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBTCxHQUFjLEtBQUtPLFdBQW5CLEdBQWdDLEVBQXpDLENBRndCLENBRXFCOztBQUM3QyxlQUFLSCxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsZUFBS3lRLFNBQUwsR0FBaUIsS0FBS0MsUUFBdEI7QUFDQSxlQUFLbFIsTUFBTCxDQUFZMFQsT0FBWixHQUFzQixLQUF0QjtBQUNILFNBTkQsTUFPSyxJQUFJM1EsU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQzFCLGVBQUszQyxNQUFMLEdBQWMwQyxLQUFLLENBQUMxQyxNQUFOLEdBQWUwQyxLQUFLLENBQUNuQyxXQUFuQztBQUNBLGVBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQUwsR0FBYyxLQUFLTyxXQUE1QjtBQUNBLGVBQUswQixVQUFMLEdBQWtCLEtBQUtqQyxNQUF2QjtBQUNILFNBSkksTUFNQSxJQUFJMkMsU0FBUyxLQUFLLE1BQWxCLEVBQTBCO0FBQzNCLGVBQUs1QyxNQUFMLEdBQWMyQyxLQUFLLENBQUMzQyxNQUFOLEdBQWUyQyxLQUFLLENBQUNwQyxVQUFuQztBQUNBLGVBQUs1RixDQUFMLEdBQVMsS0FBS3FGLE1BQWQ7QUFDSCxTQUhJLE1BS0EsSUFBSTRDLFNBQVMsS0FBSyxPQUFsQixFQUEyQjtBQUM1QixlQUFLNUMsTUFBTCxHQUFjMkMsS0FBSyxDQUFDM0MsTUFBTixHQUFlLEtBQUtPLFVBQWxDO0FBQ0EsZUFBSzVGLENBQUwsR0FBUyxLQUFLcUYsTUFBZDtBQUNIO0FBQ0o7O0FBQ0QsVUFBSTJDLEtBQUssQ0FBQ1osSUFBTixLQUFnQixZQUFwQixFQUFrQztBQUM5QjtBQUNBLFlBQUksS0FBS2xDLE1BQUwsQ0FBWXNHLE1BQVosSUFBc0IsS0FBS3RHLE1BQUwsQ0FBWWdaLFFBQXRDLEVBQWdEO0FBQzVDLGNBQUksS0FBS2xlLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUF4QixHQUE0QixDQUE1QixJQUFpQyxLQUFLa0YsTUFBTCxDQUFZaEY7QUFBVztBQUE1RCxZQUF5RztBQUNyRyxtQkFBS2dGLE1BQUwsQ0FBWWdaLFFBQVosR0FBdUIsSUFBdkI7QUFDQSxtQkFBS2haLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsS0FBckI7QUFDQSxtQkFBSzNHLElBQUwsQ0FBVWtDLFNBQVYsQ0FBb0IsY0FBcEI7QUFDSCxhQUpELE1BS0ssSUFBSSxLQUFLL0csQ0FBTCxHQUFTLEtBQUs2RSxJQUFMLENBQVVYLElBQVYsQ0FBZWxFLENBQXhCLEdBQTRCLENBQTVCLElBQWlDLENBQUMsS0FBS2tGLE1BQUwsQ0FBWWhGO0FBQVc7QUFBN0QsWUFBMkc7QUFDNUcsbUJBQUtnRixNQUFMLENBQVlnWixRQUFaLEdBQXVCLElBQXZCO0FBQ0EsbUJBQUtoWixNQUFMLENBQVlzRyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsbUJBQUszRyxJQUFMLENBQVVrQyxTQUFWLENBQW9CLGNBQXBCO0FBQ0gsYUFKSSxNQUtBO0FBQ0QsaUJBQUtoQixNQUFMLElBQWVpQyxLQUFLLENBQUNoQyxNQUFyQjtBQUNBLGlCQUFLbkIsSUFBTCxDQUFVa0MsU0FBVixDQUFvQixjQUFwQjtBQUNIO0FBQ0osU0FmRCxNQWVPO0FBQ0g7QUFDQTtBQUNBLGVBQUtoQixNQUFMLElBQWVpQyxLQUFLLENBQUNoQyxNQUFyQjtBQUNBdkMsaUJBQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVo7QUFDSDtBQUNKOztBQUNELFVBQUlzRSxLQUFLLENBQUNaLElBQU4sS0FBZ0IsU0FBcEIsRUFBK0I7QUFDM0I7QUFDQSxZQUFJLENBQUNZLEtBQUssQ0FBQ0UsT0FBWCxFQUFvQjtBQUNoQixjQUFJRixLQUFLLENBQUNiLE1BQU4sS0FBaUIsTUFBckIsRUFBNkI7QUFDekIsZ0JBQUksS0FBS2pDLE1BQUwsQ0FBWXNHLE1BQVosSUFBc0IsS0FBS3RHLE1BQUwsQ0FBWWdaLFFBQXRDLEVBQWdEO0FBQzVDLGtCQUFJLEtBQUtsZSxDQUFMLEdBQVNnSSxLQUFLLENBQUNoSSxDQUFmLEdBQW1CLENBQW5CLElBQXdCLEtBQUtrRixNQUFMLENBQVloRjtBQUFXO0FBQW5ELGdCQUFnRztBQUM1Rix1QkFBS2dGLE1BQUwsQ0FBWWdaLFFBQVosR0FBdUIsSUFBdkI7QUFDQSx1QkFBS2haLE1BQUwsQ0FBWXNHLE1BQVosR0FBcUIsS0FBckI7QUFDSCxpQkFIRCxNQUlLLElBQUksS0FBS3hMLENBQUwsR0FBU2dJLEtBQUssQ0FBQ2hJLENBQWYsR0FBbUIsQ0FBbkIsSUFBd0IsQ0FBQyxLQUFLa0YsTUFBTCxDQUFZaEY7QUFBVztBQUFwRCxnQkFBa0c7QUFDbkcsdUJBQUtnRixNQUFMLENBQVlnWixRQUFaLEdBQXVCLElBQXZCO0FBQ0EsdUJBQUtoWixNQUFMLENBQVlzRyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0gsaUJBSEksTUFJQTtBQUNELHFCQUFLekYsTUFBTCxJQUFlaUMsS0FBSyxDQUFDaEMsTUFBckI7QUFDQXZDLHVCQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaO0FBQ0g7QUFDSixhQWJELE1BY0s7QUFDRCxtQkFBS3FDLE1BQUwsSUFBZWlDLEtBQUssQ0FBQ2hDLE1BQXJCO0FBQ0F2QyxxQkFBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNIO0FBQ0osV0FuQkQsTUFvQks7QUFDRCxnQkFBSSxLQUFLd0IsTUFBTCxDQUFZc0csTUFBWixJQUFzQixLQUFLdEcsTUFBTCxDQUFZZ1osUUFBdEMsRUFBZ0Q7QUFDNUMsa0JBQUksS0FBS2xlLENBQUwsR0FBUyxLQUFLNkUsSUFBTCxDQUFVWCxJQUFWLENBQWVsRSxDQUF4QixHQUE0QixDQUE1QixJQUFpQyxLQUFLa0YsTUFBTCxDQUFZaEY7QUFBVztBQUE1RCxnQkFBeUc7QUFDckcsdUJBQUtnRixNQUFMLENBQVlnWixRQUFaLEdBQXVCLElBQXZCO0FBQ0EsdUJBQUtoWixNQUFMLENBQVlzRyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0gsaUJBSEQsTUFJSyxJQUFJLEtBQUt4TCxDQUFMLEdBQVMsS0FBSzZFLElBQUwsQ0FBVVgsSUFBVixDQUFlbEUsQ0FBeEIsR0FBNEIsQ0FBNUIsSUFBaUMsQ0FBQyxLQUFLa0YsTUFBTCxDQUFZaEY7QUFBVztBQUE3RCxnQkFBMkc7QUFDNUcsdUJBQUtnRixNQUFMLENBQVlnWixRQUFaLEdBQXVCLElBQXZCO0FBQ0EsdUJBQUtoWixNQUFMLENBQVlzRyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0gsaUJBSEksTUFJQTtBQUNELHFCQUFLekYsTUFBTCxJQUFlaUMsS0FBSyxDQUFDaEMsTUFBckI7QUFDQXZDLHVCQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaO0FBQ0g7QUFDSixhQWJELE1BY0s7QUFDRCxtQkFBS3FDLE1BQUwsSUFBZWlDLEtBQUssQ0FBQ2hDLE1BQXJCO0FBQ0F2QyxxQkFBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNIO0FBQ0o7QUFFSjtBQUNKO0FBQ0o7OztnQ0FFVzNELEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFDSSxLQUFLQyxNQURULEVBRUksS0FBS00sVUFGVCxFQUVxQixLQUFLQyxXQUYxQjtBQUdBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7NEJBRU94SSxHLEVBQUs7QUFDVCxXQUFLcUYsU0FBTCxDQUFlb0QsU0FBZixDQUF5QixDQUF6QixFQUE0QnpJLEdBQTVCLEVBQWlDLEtBQUtDLENBQXRDLEVBQXlDLEtBQUtDLENBQTlDLEVBQWlELEtBQUtpRixNQUFMLENBQVloRixXQUE3RDs7QUFDQSxVQUFJLEtBQUsyRSxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7Ozs7RUFsYXdCLHVDOztBQW9hZCwrREFBQTRkLGNBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaGJBO0FBQ0E7O0lBRU11QixhOzs7OztBQUNGLHlCQUFZcmEsSUFBWixFQUFrQjdFLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QmtmLFVBQXhCLEVBQXdGO0FBQUE7O0FBQUEsUUFBcER4ZCxHQUFvRCx1RUFBOUMsSUFBOEM7QUFBQSxRQUF4QzVCLEdBQXdDLHVFQUFsQyxJQUFrQztBQUFBLFFBQTVCUixLQUE0Qix1RUFBcEIsSUFBb0I7QUFBQSxRQUFkNmYsS0FBYyx1RUFBTixJQUFNOztBQUFBOztBQUNwRix1RkFBTXZhLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkIsRUFBNEIsU0FBNUI7QUFDQSxVQUFLbUYsTUFBTCxHQUFjLElBQWQ7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUtnYSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLN2YsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS2dELFNBQUwsR0FBaUI0YyxVQUFVLENBQUMsQ0FBRCxDQUEzQjtBQUNBLFVBQUszYyxVQUFMLEdBQWtCMmMsVUFBVSxDQUFDLENBQUQsQ0FBNUI7QUFDQSxVQUFLOVosTUFBTCxHQUFjLE1BQUtyRixDQUFuQjtBQUNBLFVBQUtzRixNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBUyxDQUF2QjtBQUNBLFVBQUsyRixVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixFQUFuQjtBQVpvRjtBQWF2Rjs7OztnQ0FFVzlGLEcsRUFBSztBQUNiQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS3JJLENBQWQsRUFBaUIsS0FBS0MsQ0FBdEIsRUFDSSxLQUFLMkYsVUFEVCxFQUNxQixLQUFLQyxXQUQxQjtBQUVBOUYsU0FBRyxDQUFDdUksTUFBSjtBQUNBdkksU0FBRyxDQUFDd0ksU0FBSjtBQUNIOzs7eUJBRUl4SSxHLEVBQUs7QUFDTixVQUFJLEtBQUtxZixLQUFMLElBQWMsSUFBbEIsRUFBd0I7QUFDcEIsYUFBSyxJQUFJMWQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUN4QixjQUFJMmQsR0FBRyxHQUFHLEtBQUtELEtBQUwsQ0FBVyxDQUFYLENBQVY7QUFDQSxjQUFJbGdCLEdBQUcsR0FBRyxLQUFLa2dCLEtBQUwsQ0FBVyxDQUFYLENBQVY7QUFDQXJmLGFBQUcsQ0FBQ2MsU0FBSixDQUFjLEtBQUtjLEdBQW5CLEVBQ0swZCxHQUFHLEdBQUcsS0FBSzljLFNBRGhCLEVBRUtyRCxHQUFHLEdBQUcsS0FBS3NELFVBRmhCLEVBR0ksS0FBS0QsU0FIVCxFQUlJLEtBQUtDLFVBSlQsRUFLSSxLQUFLeEMsQ0FMVCxFQUtZLEtBQUtDLENBTGpCLEVBTUksS0FBS3NDLFNBQUwsR0FBaUIsQ0FOckIsRUFPSSxLQUFLQyxVQUFMLEdBQWtCLENBUHRCOztBQVNBLGNBQUksS0FBS3FDLElBQUwsQ0FBVTRELFNBQWQsRUFBeUI7QUFDckIsaUJBQUtDLFdBQUwsQ0FBaUIzSSxHQUFqQjtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBRUQ7Ozs7NkJBQ1M7QUFDTDtBQUVIOzs7O0VBbER1Qix5QyxHQW1EMUI7OztBQUVhLCtEQUFBbWYsYUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4REE7O0lBRU1JLE87Ozs7O0FBQ0QsbUJBQWF6YSxJQUFiLEVBQW1CN0UsQ0FBbkIsRUFBc0JDLENBQXRCLEVBQXlCa2YsVUFBekIsRUFBd0c7QUFBQTs7QUFBQSxRQUFuRXhkLEdBQW1FLHVFQUEvRCxJQUErRDtBQUFBLFFBQXpENUIsR0FBeUQsdUVBQXJELElBQXFEO0FBQUEsUUFBL0NSLEtBQStDLHVFQUF6QyxJQUF5QztBQUFBLFFBQW5DNmYsS0FBbUMsdUVBQTdCLElBQTZCO0FBQUEsUUFBdkJHLE1BQXVCLHVFQUFkLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUFjOztBQUFBOztBQUNyRyxpRkFBTTFhLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLaUYsV0FBTCxHQUFtQixRQUFuQjtBQUNBLFVBQUsySSxJQUFMLEdBQVksU0FBWjtBQUNBLFVBQUt6SSxNQUFMLEdBQWMsSUFBZDtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBS2dhLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUs3ZixLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLZ0QsU0FBTCxHQUFpQjRjLFVBQVUsQ0FBQyxDQUFELENBQTNCO0FBQ0EsVUFBSzNjLFVBQUwsR0FBa0IyYyxVQUFVLENBQUMsQ0FBRCxDQUE1QjtBQUNBLFVBQUs5WixNQUFMLEdBQWMsTUFBS3JGLENBQUwsR0FBU3VmLE1BQU0sQ0FBQyxDQUFELENBQTdCO0FBQ0EsVUFBS2phLE1BQUwsR0FBYyxNQUFLckYsQ0FBTCxHQUFTc2YsTUFBTSxDQUFDLENBQUQsQ0FBN0I7QUFDQSxVQUFLM1osVUFBTCxHQUFrQixNQUFLckcsS0FBTCxHQUFhZ2dCLE1BQU0sQ0FBQyxDQUFELENBQXJDO0FBQ0EsVUFBSzFaLFdBQUwsR0FBbUIsTUFBS3RHLEtBQUwsR0FBYWdnQixNQUFNLENBQUMsQ0FBRCxDQUF0QztBQWRxRztBQWV4Rzs7OztnQ0FFWXhmLEcsRUFBSztBQUNkQSxTQUFHLENBQUNvSSxTQUFKO0FBQ0FwSSxTQUFHLENBQUNxSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FySSxTQUFHLENBQUNzSSxJQUFKLENBQVMsS0FBS2hELE1BQWQsRUFBc0IsS0FBS0MsTUFBM0IsRUFDSSxLQUFLTSxVQURULEVBQ3FCLEtBQUtDLFdBRDFCO0FBRUE5RixTQUFHLENBQUN1SSxNQUFKO0FBQ0F2SSxTQUFHLENBQUN3SSxTQUFKO0FBQ0g7Ozt5QkFFSXhJLEcsRUFBSztBQUNOLFVBQUksS0FBS3FmLEtBQUwsSUFBYyxJQUFsQixFQUF3QjtBQUN4QixhQUFLLElBQUkxZCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTRCO0FBQ3hCLGNBQUkyZCxHQUFHLEdBQUcsS0FBS0QsS0FBTCxDQUFXLENBQVgsQ0FBVjtBQUNBLGNBQUlsZ0IsR0FBRyxHQUFHLEtBQUtrZ0IsS0FBTCxDQUFXLENBQVgsQ0FBVjtBQUNBcmYsYUFBRyxDQUFDYyxTQUFKLENBQWMsS0FBS2MsR0FBbkIsRUFDSzBkLEdBQUcsR0FBRyxLQUFLOWMsU0FEaEIsRUFFS3JELEdBQUcsR0FBRyxLQUFLc0QsVUFGaEIsRUFHSSxLQUFLRCxTQUhULEVBSUksS0FBS0MsVUFKVCxFQUtJLEtBQUt4QyxDQUxULEVBS1ksS0FBS0MsQ0FMakIsRUFNSSxLQUFLc0MsU0FBTCxHQUFlLENBTm5CLEVBT0ksS0FBS0MsVUFBTCxHQUFnQixDQVBwQjs7QUFTQSxjQUFJLEtBQUtxQyxJQUFMLENBQVU0RCxTQUFkLEVBQXlCO0FBQ3JCLGlCQUFLQyxXQUFMLENBQWlCM0ksR0FBakI7QUFDSDtBQUNKO0FBQ0E7QUFDSjtBQUVEOzs7OzZCQUNVO0FBQ047QUFFSDs7OztFQXBEaUIsK0MsR0FxRHBCOzs7QUFFYSwrREFBQXVmLE9BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQzs7OztJQUdLRSxVOzs7QUFFRixzQkFBWXBiLFNBQVosRUFBdUJGLElBQXZCLEVBQTZCO0FBQUE7O0FBQ3pCLFNBQUt1RSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS2dYLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS3hULEtBQUwsR0FBYSxJQUFJLDhDQUFKLEVBQWI7QUFDQSxTQUFLeVQsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsU0FBS3ZiLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS2xDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS25DLEdBQUwsR0FBVyxJQUFYO0FBQ0EsU0FBSzZmLEtBQUwsR0FBYSxJQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsU0FBS2xKLFVBQUwsR0FBa0IseUJBQWxCLENBaEJ5QixDQWtCekI7O0FBQ0EsU0FBS21KLGNBQUwsR0FBcUIsRUFBckI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0EsU0FBS2xJLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0EsU0FBS2tJLG9CQUFMLEdBQTRCLENBQTVCO0FBRUEsU0FBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLQyxtQkFBTCxHQUEyQixDQUEzQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEdBQXBCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixHQUFwQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsR0FBcEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEdBQXBCLENBL0J5QixDQWlDekI7O0FBQ0EsU0FBS3hJLFdBQUwsR0FBbUI7QUFDZixlQUFTO0FBQUUsa0JBQVU7QUFBWixPQURNO0FBRWYsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FGTztBQUdmLGNBQVE7QUFBRSxrQkFBVTtBQUFaLE9BSE87QUFJZixjQUFRO0FBQUUsa0JBQVU7QUFBWixPQUpPO0FBS2YsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FMTztBQU1mLGNBQVE7QUFBRSxrQkFBVTtBQUFaLE9BTk87QUFPZixjQUFRO0FBQUUsa0JBQVU7QUFBWixPQVBPO0FBUWYsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FSTztBQVNmLGNBQVE7QUFBRSxrQkFBVTtBQUFaLE9BVE87QUFVZixjQUFRO0FBQUUsa0JBQVU7QUFBWixPQVZPO0FBV2YsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FYTztBQVlmLGNBQVE7QUFBRSxrQkFBVTtBQUFaLE9BWk87QUFhZixjQUFRO0FBQUUsa0JBQVU7QUFBWixPQWJPO0FBY2YsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FkTztBQWVmLGNBQVE7QUFBRSxrQkFBVTtBQUFaLE9BZk87QUFnQmYsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FoQk87QUFpQmYsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FqQk87QUFrQmYsY0FBUTtBQUFFLGtCQUFVO0FBQVosT0FsQk87QUFtQmYsZUFBUztBQUFFLGtCQUFVO0FBQVosT0FuQk07QUFvQmYsaUJBQVc7QUFBRSxrQkFBVTtBQUFaLE9BcEJJO0FBcUJmLGlCQUFXO0FBQUUsa0JBQVU7QUFBWixPQXJCSTtBQXNCZixpQkFBVztBQUFFLGtCQUFVO0FBQVosT0F0Qkk7QUF1QmYsaUJBQVc7QUFBRSxrQkFBVTtBQUFaLE9BdkJJO0FBd0JmLGlCQUFXO0FBQUUsa0JBQVU7QUFBWixPQXhCSTtBQXlCZixpQkFBVztBQUFFLGtCQUFVO0FBQVosT0F6Qkk7QUEwQmYsaUJBQVc7QUFBRSxrQkFBVTtBQUFaLE9BMUJJLENBNEJuQjs7QUE1Qm1CLEtBQW5CO0FBNkJBLFNBQUt5SSxjQUFMLEdBQXNCO0FBQ2xCLGNBQVEsT0FEVTtBQUVsQixlQUFTLE1BRlM7QUFHbEIsY0FBUSxNQUhVO0FBSWxCLGVBQVMsU0FKUztBQUtsQixlQUFTLFNBTFM7QUFNbEIsZ0JBQVUsU0FOUTtBQU9sQixrQkFBWSxNQVBNO0FBUWxCLGNBQVEsU0FSVTtBQVNsQixnQkFBVSxNQVRRO0FBVWxCLGdCQUFVLE1BVlE7QUFXbEIsbUJBQWEsTUFYSztBQVlsQixrQkFBWSxNQVpNO0FBYWxCLGtCQUFZLE1BYk07QUFjbEIsaUJBQVcsU0FkTztBQWVsQixpQkFBVyxNQWZPO0FBZ0JsQixpQkFBVyxNQWhCTztBQWlCbEIscUJBQWUsTUFqQkc7QUFrQmxCLGVBQVM7QUFsQlMsS0FBdEI7QUFvQkEsU0FBS0MsY0FBTCxHQUFzQjtBQUNsQixjQUFRLE9BRFU7QUFFbEIsZUFBUyxNQUZTO0FBR2xCLGNBQVEsTUFIVTtBQUlsQixlQUFTLE1BSlM7QUFLbEIsZUFBUyxNQUxTO0FBTWxCLGdCQUFVLE1BTlE7QUFPbEIsa0JBQVksTUFQTTtBQVFsQixjQUFRLE1BUlU7QUFTbEIsZ0JBQVUsTUFUUTtBQVVsQixnQkFBVSxNQVZRO0FBV2xCLG1CQUFhLE1BWEs7QUFZbEIsa0JBQVksTUFaTTtBQWFsQixrQkFBWSxNQWJNO0FBY2xCLGlCQUFXLFNBZE87QUFlbEIsaUJBQVcsTUFmTztBQWdCbEIsaUJBQVcsTUFoQk87QUFpQmxCLHFCQUFlLE1BakJHO0FBa0JsQixlQUFTO0FBbEJTLEtBQXRCO0FBb0JBLFNBQUt6SSxRQUFMLEdBQWdCLEtBQUt3SSxjQUFyQjtBQUNBLFNBQUszYyxJQUFMLEdBQVlBLElBQVo7QUFDSDtBQUVEOzs7Ozs7O3lCQUdNbkUsRyxFQUFLO0FBQ1AsV0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsV0FBS2dnQixZQUFMLEdBQW9CLEtBQUtoZ0IsR0FBTCxDQUFTNEQsTUFBVCxDQUFnQkksS0FBcEM7QUFDQSxXQUFLaWMsYUFBTCxHQUFxQixLQUFLamdCLEdBQUwsQ0FBUzRELE1BQVQsQ0FBZ0JLLE1BQXJDO0FBQ0EsV0FBSytjLFVBQUw7QUFFQXRkLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0g7QUFFRDs7Ozs7OzRCQUdTO0FBQ0xELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFDQSxVQUFJN0IsSUFBSSxHQUFHLElBQVg7QUFDQSxXQUFLb2UsS0FBTCxHQUFhLElBQUllLEtBQUosQ0FBVSxxQkFBVixDQUFiO0FBQ0EsV0FBS2YsS0FBTCxDQUFXZ0IsTUFBWCxHQUFvQixDQUFwQjtBQUNBLFdBQUtoQixLQUFMLENBQVcvVCxJQUFYOztBQUNBLE9BQUMsU0FBU2dWLFFBQVQsR0FBb0I7QUFDakJyZixZQUFJLENBQUN2QyxJQUFMO0FBQ0E2aEIsd0JBQWdCLENBQUNELFFBQUQsRUFBV3JmLElBQUksQ0FBQzlCLEdBQUwsQ0FBUzRELE1BQXBCLENBQWhCO0FBQ0gsT0FIRDtBQUlIOzs7OEJBRVN5ZCxVLEVBQXNCO0FBQUEsVUFBVkgsTUFBVSx1RUFBSCxDQUFHO0FBQzVCLFdBQUtoVixLQUFMLENBQVdDLElBQVgsQ0FBZ0JrVixVQUFoQixFQUE0QkgsTUFBNUI7QUFDSCxLLENBRUQ7Ozs7NEJBQ1E7QUFBQztBQUNMLFdBQUtJLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxXQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFdBQUtDLGlCQUFMLEdBQXlCLENBQXpCOztBQUNBLGVBQVN6aEIsSUFBVCxHQUFnQjtBQUNaLFlBQUkwaEIsV0FBVyxHQUFHM0YsSUFBSSxDQUFDQyxHQUFMLEVBQWxCO0FBQ0EsWUFBSTJGLFNBQVMsR0FBRyxDQUFDRCxXQUFXLEdBQUcsS0FBS0QsaUJBQXBCLElBQXlDLElBQXpEO0FBQ0EsYUFBS0EsaUJBQUwsR0FBeUJDLFdBQXpCO0FBRUEsWUFBSUUsU0FBUyxHQUFHamhCLElBQUksQ0FBQ3NKLEdBQUwsQ0FBUzBYLFNBQVQsRUFBb0IsS0FBS0gsT0FBekIsQ0FBaEI7QUFDQSxhQUFLRCxRQUFMLElBQWlCSyxTQUFqQjtBQUNBLGVBQU9BLFNBQVA7QUFDSDtBQUNKO0FBRUQ7Ozs7OztpQ0FHYztBQUNWamUsYUFBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFFQSxXQUFLM0QsR0FBTCxDQUFTNEQsTUFBVCxDQUFnQmdlLFFBQWhCLEdBQTJCLENBQTNCO0FBQTZCOztBQUU3QixVQUFJQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFVdkYsQ0FBVixFQUFhO0FBQ3hCLFlBQUlyYyxDQUFDLEdBQUdxYyxDQUFDLENBQUN3RixPQUFGLEdBQVloZ0IsSUFBSSxDQUFDOUIsR0FBTCxDQUFTNEQsTUFBVCxDQUFnQm1lLHFCQUFoQixHQUF3Q3RKLElBQTVEO0FBQ0EsWUFBSXZZLENBQUMsR0FBR29jLENBQUMsQ0FBQzBGLE9BQUYsR0FBWWxnQixJQUFJLENBQUM5QixHQUFMLENBQVM0RCxNQUFULENBQWdCbWUscUJBQWhCLEdBQXdDRSxHQUE1RDs7QUFFQSxZQUFJaGlCLENBQUMsR0FBRyxJQUFSLEVBQWM7QUFDVkEsV0FBQyxHQUFHUyxJQUFJLENBQUNDLEtBQUwsQ0FBV1YsQ0FBQyxHQUFHLEVBQWYsQ0FBSjtBQUNBQyxXQUFDLEdBQUdRLElBQUksQ0FBQ0MsS0FBTCxDQUFXVCxDQUFDLEdBQUcsRUFBZixDQUFKO0FBQ0g7O0FBRUQsZUFBTztBQUFFRCxXQUFDLEVBQUVBLENBQUw7QUFBUUMsV0FBQyxFQUFFQTtBQUFYLFNBQVA7QUFDSCxPQVZEOztBQVlBLFVBQUk0QixJQUFJLEdBQUcsSUFBWCxDQWpCVSxDQW1CVjs7QUFDQSxVQUFJb2dCLEdBQUcsR0FBRyxFQUFWO0FBRUEsV0FBS2xpQixHQUFMLENBQVM0RCxNQUFULENBQWdCN0IsZ0JBQWhCLENBQWlDLFVBQWpDLEVBQTZDLFVBQVV1YSxDQUFWLEVBQWE7QUFDdEQsWUFBSTZGLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQjlGLENBQUMsQ0FBQytGLEtBQXRCLE1BQWlDLEdBQXJDLEVBQTBDdmdCLElBQUksQ0FBQ3dnQixLQUFMLEdBQWEsSUFBYjtBQUMxQ2hHLFNBQUMsQ0FBQ2lHLGNBQUY7O0FBQ0EsWUFBSSxDQUFDemdCLElBQUksQ0FBQ3VXLFdBQUwsQ0FBaUJyRSxjQUFqQixDQUFnQ3NJLENBQUMsQ0FBQ2tHLElBQWxDLENBQUwsRUFBOEM7QUFBRTFnQixjQUFJLENBQUN1VyxXQUFMLENBQWlCaUUsQ0FBQyxDQUFDa0csSUFBbkIsSUFBMkI7QUFBQyxzQkFBVTtBQUFYLFdBQTNCO0FBQThDOztBQUM5RixZQUFJMWdCLElBQUksQ0FBQ3VXLFdBQUwsQ0FBaUJpRSxDQUFDLENBQUNrRyxJQUFuQixFQUF5QnpaLE1BQXpCLElBQW1DLEtBQXZDLEVBQThDO0FBQUVqSCxjQUFJLENBQUN1VyxXQUFMLENBQWlCaUUsQ0FBQyxDQUFDa0csSUFBbkIsRUFBeUJ6WixNQUF6QixHQUFrQyxJQUFsQztBQUF5QyxTQUpuQyxDQUt0RDs7QUFFSCxPQVBELEVBT0csS0FQSDtBQVNBLFdBQUsvSSxHQUFMLENBQVM0RCxNQUFULENBQWdCN0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFVBQVV1YSxDQUFWLEVBQWE7QUFDdEQsWUFBSSxDQUFDeGEsSUFBSSxDQUFDdVcsV0FBTCxDQUFpQnJFLGNBQWpCLENBQWdDc0ksQ0FBQyxDQUFDa0csSUFBbEMsQ0FBTCxFQUE4QztBQUFFMWdCLGNBQUksQ0FBQ3VXLFdBQUwsQ0FBaUJpRSxDQUFDLENBQUNrRyxJQUFuQixJQUEyQjtBQUFDLHNCQUFVO0FBQVgsV0FBM0I7QUFBK0M7O0FBQzVGLFlBQUkxZ0IsSUFBSSxDQUFDdVcsV0FBTCxDQUFpQmlFLENBQUMsQ0FBQ2tHLElBQW5CLEVBQXlCelosTUFBekIsSUFBbUMsSUFBdkMsRUFBNkM7QUFBRWpILGNBQUksQ0FBQ3VXLFdBQUwsQ0FBaUJpRSxDQUFDLENBQUNrRyxJQUFuQixFQUF5QnpaLE1BQXpCLEdBQWtDLEtBQWxDO0FBQXlDLFNBRnJDLENBR25EOztBQUVILE9BTEQsRUFLRyxLQUxIO0FBT0FyRixhQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0g7QUFFRDs7Ozs7OzhCQUdXOGUsTSxFQUFRO0FBQ2Y7QUFDQSxVQUFJLEtBQUtwZSxTQUFMLENBQWVjLE1BQWYsQ0FBc0I4SyxZQUF0QixJQUFzQyxLQUFLNUwsU0FBTCxDQUFlYyxNQUFmLENBQXNCdUwsY0FBaEUsRUFBZ0Y7QUFDNUUrUixjQUFNLENBQUMzVyxLQUFQLEdBQWUsS0FBS3pILFNBQUwsQ0FBZTZLLFFBQTlCO0FBQ0F1VCxjQUFNLENBQUMxVyxPQUFQLEdBQWlCLEtBQUsxSCxTQUFMLENBQWV5SCxLQUFmLENBQXFCcUQsVUFBdEM7QUFDSDs7QUFDRCxXQUFLd1EsUUFBTCxDQUFjcmUsSUFBZCxDQUFtQm1oQixNQUFuQjtBQUNIOzs7dUNBRW1CQyxLLEVBQU87QUFDdkIsV0FBSzlDLGdCQUFMLENBQXNCdGUsSUFBdEIsQ0FBMkJvaEIsS0FBM0I7QUFDSDtBQUdEOzs7Ozs7eUJBSU1DLFksRUFBYztBQUNoQixXQUFLM2lCLEdBQUwsQ0FBUzRpQixTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLEtBQUs1aUIsR0FBTCxDQUFTNEQsTUFBVCxDQUFnQkksS0FBekMsRUFBZ0QsS0FBS2hFLEdBQUwsQ0FBUzRELE1BQVQsQ0FBZ0JLLE1BQWhFO0FBQ0EsV0FBS2pFLEdBQUwsQ0FBU1ksSUFBVDs7QUFDQSxXQUFLLElBQUllLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS2llLGdCQUFMLENBQXNCcmUsTUFBMUMsRUFBa0RJLENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQ7QUFFQSxhQUFLaWUsZ0JBQUwsQ0FBc0JqZSxDQUF0QixFQUF5QmtoQixJQUF6QixDQUE4QixLQUFLN2lCLEdBQW5DO0FBRUg7O0FBQ0QsV0FBSyxJQUFJMkIsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBRyxLQUFLZ2UsUUFBTCxDQUFjcGUsTUFBbEMsRUFBMENJLEVBQUMsRUFBM0MsRUFBK0M7QUFDM0M7QUFDQTtBQUNBLFlBQUksS0FBS2dlLFFBQUwsQ0FBY2hlLEVBQWQsRUFBaUJpTSxJQUFqQixLQUEwQixTQUE5QixFQUF5QztBQUNyQyxjQUFJLENBQUMsS0FBSytSLFFBQUwsQ0FBY2hlLEVBQWQsRUFBaUIxQixDQUFsQixHQUFzQixLQUFLMGYsUUFBTCxDQUFjaGUsRUFBZCxFQUFpQmtFLFVBQXZDLEdBQW9ELEtBQUs4WixRQUFMLENBQWMsQ0FBZCxFQUFpQjVjLEtBQXJFLElBQ0QsQ0FBQyxLQUFLNGMsUUFBTCxDQUFjaGUsRUFBZCxFQUFpQjFCLENBQWxCLEdBQXNCLEtBQUswZixRQUFMLENBQWMsQ0FBZCxFQUFpQjVjLEtBQWpCLEdBQXlCLEtBQUsvQyxHQUFMLENBQVM0RCxNQUFULENBQWdCSSxLQUQ5RCxJQUVELENBQUMsS0FBSzJiLFFBQUwsQ0FBY2hlLEVBQWQsRUFBaUJ6QixDQUFsQixHQUFzQixLQUFLeWYsUUFBTCxDQUFjaGUsRUFBZCxFQUFpQm1FLFdBQXZDLEdBQW9ELEtBQUs2WixRQUFMLENBQWMsQ0FBZCxFQUFpQnpXLEtBRnBFLElBR0QsQ0FBQyxLQUFLeVcsUUFBTCxDQUFjaGUsRUFBZCxFQUFpQnpCLENBQWxCLEdBQXNCLEtBQUt5ZixRQUFMLENBQWMsQ0FBZCxFQUFpQnpXLEtBQWpCLEdBQXlCLEtBQUtsSixHQUFMLENBQVM0RCxNQUFULENBQWdCSyxNQUhsRSxFQUcyRTtBQUN4RSxpQkFBSzBiLFFBQUwsQ0FBY2hlLEVBQWQsRUFBaUJraEIsSUFBakIsQ0FBc0IsS0FBSzdpQixHQUEzQjtBQUNGO0FBQ0osU0FQRCxNQVFLO0FBQ0QsY0FBRyxDQUFDLEtBQUt1Z0IsTUFBTixJQUFnQixLQUFLWixRQUFMLENBQWNoZSxFQUFkLEVBQWlCMEYsSUFBakIsS0FBMEIsUUFBN0MsRUFDSSxLQUFLc1ksUUFBTCxDQUFjaGUsRUFBZCxFQUFpQmtoQixJQUFqQixDQUFzQixLQUFLN2lCLEdBQTNCOztBQUNKLGNBQUksS0FBS3VnQixNQUFULEVBQWlCO0FBQ2IsaUJBQUt2Z0IsR0FBTCxDQUFTd1IsSUFBVCxHQUFnQixjQUFoQjtBQUNBLGlCQUFLeFIsR0FBTCxDQUFTeVIsU0FBVCxHQUFxQixTQUFyQjtBQUNBLGlCQUFLelIsR0FBTCxDQUFTMFIsUUFBVCxDQUFrQixvQkFBbEIsRUFDSSxDQUFDLEtBQUt2UCxNQUFMLENBQVlZLEtBQWIsR0FBcUIsRUFEekIsRUFFSSxDQUFDLEtBQUtaLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBS3VYLFlBQTFCLEdBQXlDLEVBRjdDO0FBSUEsaUJBQUt6Z0IsR0FBTCxDQUFTMFIsUUFBVCxDQUFrQixhQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixHQUR6QixFQUVJLENBQUMsS0FBS1osTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLdVgsWUFBMUIsR0FBeUMsRUFGN0M7QUFJQSxpQkFBS3pnQixHQUFMLENBQVMwUixRQUFULENBQWtCLGNBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt1WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLemdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsYUFBbEIsRUFDSSxDQUFDLEtBQUt2UCxNQUFMLENBQVlZLEtBQWIsR0FBcUIsR0FEekIsRUFFSSxDQUFDLEtBQUtaLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBS3VYLFlBQTFCLEdBQXlDLEdBRjdDO0FBSUEsaUJBQUt6Z0IsR0FBTCxDQUFTMFIsUUFBVCxDQUFrQixhQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixHQUR6QixFQUVJLENBQUMsS0FBS1osTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLdVgsWUFBMUIsR0FBeUMsR0FGN0M7QUFJQSxpQkFBS3pnQixHQUFMLENBQVMwUixRQUFULENBQWtCLGdDQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixFQUR6QixFQUVJLENBQUMsS0FBS1osTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLdVgsWUFBMUIsR0FBeUMsR0FGN0M7QUFJQSxpQkFBS3pnQixHQUFMLENBQVMwUixRQUFULENBQWtCLG1DQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixFQUR6QixFQUVJLENBQUMsS0FBS1osTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLdVgsWUFBMUIsR0FBeUMsR0FGN0M7QUFJQSxpQkFBS3pnQixHQUFMLENBQVMwUixRQUFULENBQWtCLG1DQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixFQUR6QixFQUVJLENBQUMsS0FBS1osTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLdVgsWUFBMUIsR0FBeUMsR0FGN0M7QUFJQSxpQkFBS3pnQixHQUFMLENBQVMwUixRQUFULENBQWtCLFdBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt1WCxZQUExQixHQUF5QyxFQUY3QztBQUlBLGlCQUFLemdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsOEJBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt1WCxZQUExQixHQUF5QyxFQUY3QztBQUlBLGlCQUFLemdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsK0JBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt1WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLemdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsNEJBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt1WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLemdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IscUJBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEVBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt3WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLMWdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsaUJBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt3WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLMWdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsZ0JBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt3WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLMWdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsaUJBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt3WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLMWdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0Isa0JBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt3WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLMWdCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsY0FBbEIsRUFDSSxDQUFDLEtBQUt2UCxNQUFMLENBQVlZLEtBQWIsR0FBcUIsR0FEekIsRUFFSSxDQUFDLEtBQUtaLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBS3lYLFlBQTFCLEdBQXlDLEdBRjdDO0FBSUEsaUJBQUszZ0IsR0FBTCxDQUFTMFIsUUFBVCxDQUFrQixVQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixHQUR6QixFQUVJLENBQUMsS0FBS1osTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLeVgsWUFBMUIsR0FBeUMsR0FGN0M7QUFJQSxpQkFBSzNnQixHQUFMLENBQVMwUixRQUFULENBQWtCLFNBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEdBRHpCLEVBRUksQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUt5WCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLM2dCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IsVUFBbEIsRUFDSSxDQUFDLEtBQUt2UCxNQUFMLENBQVlZLEtBQWIsR0FBcUIsR0FEekIsRUFFSSxDQUFDLEtBQUtaLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBS3lYLFlBQTFCLEdBQXlDLEdBRjdDO0FBSUEsaUJBQUszZ0IsR0FBTCxDQUFTMFIsUUFBVCxDQUFrQixXQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixHQUR6QixFQUVJLENBQUMsS0FBS1osTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLeVgsWUFBMUIsR0FBeUMsR0FGN0M7QUFJQSxpQkFBSzNnQixHQUFMLENBQVMwUixRQUFULENBQWtCLDJCQUEyQixLQUFLdUYsVUFBbEQsRUFDSSxDQUFDLEtBQUs5VSxNQUFMLENBQVlZLEtBQWIsR0FBcUIsSUFEekIsRUFFSSxDQUFDLEtBQUtaLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBS3VYLFlBQTFCLEdBQXlDLEVBRjdDO0FBSUEsaUJBQUt6Z0IsR0FBTCxDQUFTd1IsSUFBVCxHQUFnQixjQUFoQjtBQUNBLGlCQUFLeFIsR0FBTCxDQUFTMFIsUUFBVCxDQUFrQiwyREFBbEIsRUFDSSxDQUFDLEtBQUt2UCxNQUFMLENBQVlZLEtBQWIsR0FBcUIsSUFEekIsRUFFSSxDQUFDLEtBQUtaLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBS3VYLFlBQTFCLEdBQXlDLEVBRjdDO0FBSUEsaUJBQUt6Z0IsR0FBTCxDQUFTd1IsSUFBVCxHQUFnQiw2QkFBaEI7QUFDQSxpQkFBS3hSLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0IscURBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEtBQUs2ZCxZQUQ5QixFQUVJLENBQUMsS0FBS3plLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBSzJYLFlBQTFCLEdBQXlDLEVBRjdDO0FBSUEsaUJBQUs3Z0IsR0FBTCxDQUFTMFIsUUFBVCxDQUFrQixzREFBbEIsRUFDSSxDQUFDLEtBQUt2UCxNQUFMLENBQVlZLEtBQWIsR0FBcUIsS0FBSzZkLFlBRDlCLEVBRUksQ0FBQyxLQUFLemUsTUFBTCxDQUFZK0csS0FBYixHQUFxQixLQUFLMlgsWUFBMUIsR0FBeUMsR0FGN0M7QUFJQSxpQkFBSzdnQixHQUFMLENBQVMwUixRQUFULENBQWtCLDBEQUFsQixFQUNJLENBQUMsS0FBS3ZQLE1BQUwsQ0FBWVksS0FBYixHQUFxQixLQUFLNmQsWUFEOUIsRUFFSSxDQUFDLEtBQUt6ZSxNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEtBQUsyWCxZQUExQixHQUF5QyxHQUY3QztBQUlBLGlCQUFLN2dCLEdBQUwsQ0FBUzBSLFFBQVQsQ0FBa0Isb0RBQWxCLEVBQ0ksQ0FBQyxLQUFLdlAsTUFBTCxDQUFZWSxLQUFiLEdBQXFCLEtBQUs2ZCxZQUQ5QixFQUVJLENBQUMsS0FBS3plLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsS0FBSzJYLFlBQTFCLEdBQXlDLEdBRjdDO0FBSUg7QUFDSjtBQUNKOztBQUdELFVBQUk4QixZQUFKLEVBQWtCO0FBQ2RBLG9CQUFZLENBQUMsSUFBRCxDQUFaO0FBQ0g7O0FBQ0QsV0FBSzNpQixHQUFMLENBQVNlLE9BQVQ7QUFDSDtBQUVEOzs7Ozs7NkJBR1M7QUFDTCxVQUFJLENBQUMsS0FBS3dmLE1BQVYsRUFBa0I7QUFDZCxZQUFJdUMsYUFBYSxHQUFHLEtBQUtuRCxRQUFMLENBQWNwZSxNQUFsQzs7QUFDQSxhQUFLLElBQUlJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdtaEIsYUFBcEIsRUFBbUNuaEIsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxjQUFJOGdCLE1BQU0sR0FBRyxLQUFLOUMsUUFBTCxDQUFjaGUsQ0FBZCxDQUFiOztBQUNBLGNBQUksS0FBSzBDLFNBQUwsQ0FBZWMsTUFBZixDQUFzQnVMLGNBQTFCLEVBQTBDO0FBQ3RDLGdCQUFJK1IsTUFBTSxDQUFDM1csS0FBUCxLQUFpQixLQUFLekgsU0FBTCxDQUFlNkssUUFBaEMsSUFBNEN1VCxNQUFNLENBQUMxVyxPQUFQLEtBQW1CLEtBQUsxSCxTQUFMLENBQWU4SyxVQUFsRixFQUE4RjtBQUMxRjtBQUNBO0FBQ0FzVCxvQkFBTSxDQUFDbmIsZUFBUCxHQUF5QixJQUF6QjtBQUNBbWIsb0JBQU0sQ0FBQ3JZLFVBQVAsR0FBb0IsQ0FBcEI7QUFDSDtBQUNKLFdBUEQsTUFRSyxJQUFJLEtBQUsvRixTQUFMLENBQWVjLE1BQWYsQ0FBc0JvTCxRQUExQixFQUFvQztBQUNyQyxnQkFBSWtTLE1BQU0sQ0FBQzNXLEtBQVAsS0FBaUIsS0FBS3pILFNBQUwsQ0FBZTZLLFFBQWhDLElBQTRDdVQsTUFBTSxDQUFDcGIsSUFBUCxLQUFnQixTQUE1RCxJQUF5RW9iLE1BQU0sQ0FBQ3BiLElBQVAsS0FBZ0IsTUFBekYsSUFBbUdvYixNQUFNLENBQUNwYixJQUFQLEtBQWdCLEtBQW5ILElBQTRIb2IsTUFBTSxDQUFDcGIsSUFBUCxLQUFnQixRQUFoSixFQUEwSjtBQUN0SjtBQUNBO0FBQ0FvYixvQkFBTSxDQUFDbmIsZUFBUCxHQUF5QixJQUF6QjtBQUNBbWIsb0JBQU0sQ0FBQ3JZLFVBQVAsR0FBb0IsQ0FBcEI7QUFDSDtBQUNKOztBQUNELGNBQUksQ0FBQ3FZLE1BQU0sQ0FBQ25iLGVBQVosRUFBNkI7QUFDekJtYixrQkFBTSxDQUFDTSxNQUFQO0FBQ0g7QUFDSjs7QUFDRCxZQUFJLEtBQUsxZSxTQUFMLENBQWVjLE1BQWYsQ0FBc0J1TCxjQUExQixFQUEwQztBQUN0QyxlQUFLck0sU0FBTCxDQUFlYyxNQUFmLENBQXNCdUwsY0FBdEIsR0FBdUMsS0FBdkM7QUFDSDs7QUFDRCxZQUFJLEtBQUtyTSxTQUFMLENBQWVjLE1BQWYsQ0FBc0JvTCxRQUExQixFQUFvQztBQUNoQyxlQUFLbE0sU0FBTCxDQUFlYyxNQUFmLENBQXNCb0wsUUFBdEIsR0FBaUMsS0FBakM7QUFDQSxlQUFLbE0sU0FBTCxDQUFlYyxNQUFmLENBQXNCeUssYUFBdEIsR0FBc0MsSUFBdEM7QUFDSCxTQTlCYSxDQWdDZDs7O0FBQ0EsYUFBSyxJQUFJak8sR0FBQyxHQUFHLEtBQUtnZSxRQUFMLENBQWNwZSxNQUFkLEdBQXVCLENBQXBDLEVBQXVDSSxHQUFDLElBQUksQ0FBNUMsRUFBK0MsRUFBRUEsR0FBakQsRUFBb0Q7QUFDaEQsY0FBSSxLQUFLZ2UsUUFBTCxDQUFjaGUsR0FBZCxFQUFpQjJGLGVBQXJCLEVBQXNDO0FBQ2xDLGdCQUFJLEtBQUtxWSxRQUFMLENBQWNoZSxHQUFkLEVBQWlCcVMsY0FBakIsQ0FBZ0MsWUFBaEMsS0FBaUQsQ0FBQyxLQUFLM1AsU0FBTCxDQUFlYyxNQUFmLENBQXNCdUwsY0FBNUUsRUFBNEY7QUFDeEYsa0JBQUksS0FBS2lQLFFBQUwsQ0FBY2hlLEdBQWQsRUFBaUJ5SSxVQUFqQixHQUE4QixDQUFsQyxFQUFxQztBQUNqQztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQUsrVixXQUFMLEdBQW1CLEtBQUtoYyxJQUFMLENBQVU4UyxVQUFWLEdBQXVCLEtBQUswSSxRQUFMLENBQWNoZSxHQUFkLEVBQWlCeUksVUFBeEMsR0FBcUQsS0FBS2pHLElBQUwsQ0FBVTZTLFVBQWxGO0FBQ0EscUJBQUszUyxTQUFMLENBQWVrTCxXQUFmLENBQTJCak8sSUFBM0IsQ0FBZ0MsQ0FBQyxDQUFDLEtBQUtxZSxRQUFMLENBQWNoZSxHQUFkLEVBQWlCMUIsQ0FBbEIsRUFBcUIsS0FBSzBmLFFBQUwsQ0FBY2hlLEdBQWQsRUFBaUJ6QixDQUF0QyxDQUFELEVBQTJDLEtBQUtpZ0IsV0FBaEQsRUFBNkQsRUFBN0QsQ0FBaEM7QUFDQSxxQkFBSzliLFNBQUwsQ0FBZW1MLEtBQWYsSUFBd0IsS0FBSzJRLFdBQTdCO0FBQ0EscUJBQUtoYyxJQUFMLENBQVU2UyxVQUFWLElBQXdCLEtBQUs3UyxJQUFMLENBQVU4UyxVQUFWLEdBQXVCLEVBQS9DO0FBQ0g7QUFDSjs7QUFDRCxpQkFBSzBJLFFBQUwsQ0FBY2hPLE1BQWQsQ0FBcUJoUSxHQUFyQixFQUF3QixDQUF4QjtBQUNIO0FBQ0o7O0FBRUQsYUFBSyxJQUFJQSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHLEtBQUtnZSxRQUFMLENBQWNwZSxNQUFsQyxFQUEwQ0ksR0FBQyxFQUEzQyxFQUErQztBQUMzQyxjQUFJOGdCLE9BQU0sR0FBRyxLQUFLOUMsUUFBTCxDQUFjaGUsR0FBZCxDQUFiOztBQUNBLGVBQUssSUFBSXFoQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtyRCxRQUFMLENBQWNwZSxNQUFsQyxFQUEwQ3loQixDQUFDLEVBQTNDLEVBQStDO0FBQzNDLGdCQUFJL2EsS0FBSyxHQUFHLEtBQUswWCxRQUFMLENBQWNxRCxDQUFkLENBQVosQ0FEMkMsQ0FFM0M7O0FBQ0EsZ0JBQUlQLE9BQU0sQ0FBQzdVLElBQVAsS0FBZ0IsU0FBcEIsRUFBK0IsU0FBL0IsS0FDSyxJQUFJM0YsS0FBSyxDQUFDMkYsSUFBTixLQUFlLFNBQW5CLEVBQThCO0FBQy9CLGtCQUFJcVYsSUFBSSxHQUFHdmlCLElBQUksQ0FBQ2dMLEdBQUwsQ0FBUytXLE9BQU0sQ0FBQ3hpQixDQUFQLEdBQVdnSSxLQUFLLENBQUNoSSxDQUExQixDQUFYOztBQUNBLGtCQUFJZ2pCLElBQUksR0FBRyxHQUFYLEVBQWdCO0FBQ1osb0JBQUlSLE9BQU0sSUFBSXhhLEtBQVYsSUFBbUJ3YSxPQUFNLENBQUNTLFdBQVAsQ0FBbUJqYixLQUFuQixLQUE2QixNQUFwRCxFQUE0RDtBQUFFO0FBQzFELHNCQUFJQyxTQUFTLEdBQUd1YSxPQUFNLENBQUNTLFdBQVAsQ0FBbUJqYixLQUFuQixDQUFoQjs7QUFDQXdhLHlCQUFNLENBQUNVLFFBQVAsQ0FBZ0JsYixLQUFoQixFQUF1QkMsU0FBdkI7QUFDSDtBQUNKO0FBRUosYUFUSSxNQVVBLElBQUl1YSxPQUFNLElBQUl4YSxLQUFWLElBQW1Cd2EsT0FBTSxDQUFDUyxXQUFQLENBQW1CamIsS0FBbkIsS0FBNkIsTUFBcEQsRUFBNEQ7QUFBRTtBQUMvRCxrQkFBSUMsVUFBUyxHQUFHdWEsT0FBTSxDQUFDUyxXQUFQLENBQW1CamIsS0FBbkIsQ0FBaEI7O0FBQ0F3YSxxQkFBTSxDQUFDVSxRQUFQLENBQWdCbGIsS0FBaEIsRUFBdUJDLFVBQXZCO0FBQ0g7QUFFSjtBQUVKO0FBQ0osT0E5RUksQ0FnRkw7OztBQUNBLFVBQUksS0FBS2dZLEtBQUwsQ0FBV2tELFdBQVgsSUFBMEIsS0FBOUIsRUFBcUM7QUFDakMsYUFBS2xELEtBQUwsQ0FBV2tELFdBQVgsR0FBeUIsQ0FBekI7QUFDQSxhQUFLbEQsS0FBTCxDQUFXL1QsSUFBWDtBQUNILE9BcEZJLENBc0ZMOzs7QUFDQSxVQUFJLEtBQUtrTSxXQUFMLENBQWlCLEtBQUtDLFFBQUwsQ0FBYytLLFFBQS9CLEVBQXlDdGEsTUFBN0MsRUFBcUQ7QUFDakQ7QUFDQSxhQUFLa08sVUFBTCxHQUFrQix5QkFBbEI7QUFDQSxhQUFLOVMsSUFBTCxDQUFVOFMsVUFBVixHQUF1QixDQUF2QjtBQUNBLGFBQUs1UyxTQUFMLENBQWVtTCxLQUFmLEdBQXVCLENBQXZCO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLNkksV0FBTCxDQUFpQixLQUFLQyxRQUFMLENBQWNnTCxRQUEvQixFQUF5Q3ZhLE1BQTdDLEVBQXFEO0FBQ2pELGFBQUtrTyxVQUFMLEdBQWtCLE9BQWxCO0FBQ0EsYUFBSzlTLElBQUwsQ0FBVThTLFVBQVYsR0FBdUIsQ0FBdkI7QUFDQSxhQUFLNVMsU0FBTCxDQUFlbUwsS0FBZixHQUF1QixDQUF2QjtBQUNIOztBQUNELFVBQUksS0FBSzZJLFdBQUwsQ0FBaUIsS0FBS0MsUUFBTCxDQUFjaUwsT0FBL0IsRUFBd0N4YSxNQUE1QyxFQUFvRDtBQUNoRCxhQUFLdVAsUUFBTCxHQUFnQixLQUFLd0ksY0FBckI7QUFDSDs7QUFDRCxVQUFJLEtBQUt6SSxXQUFMLENBQWlCLEtBQUtDLFFBQUwsQ0FBY2tMLE9BQS9CLEVBQXdDemEsTUFBNUMsRUFBb0Q7QUFDaEQsYUFBS3VQLFFBQUwsR0FBZ0IsS0FBS3lJLGNBQXJCO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLMUksV0FBTCxDQUFpQixLQUFLQyxRQUFMLENBQWNtTCxLQUEvQixFQUFzQzFhLE1BQXRDLElBQWdELEtBQUt5WCxtQkFBTCxLQUE2QixDQUFqRixFQUFvRjtBQUNoRixhQUFLRCxNQUFMLEdBQWMsQ0FBQyxLQUFLQSxNQUFwQjtBQUNBLGFBQUtDLG1CQUFMLEdBQTJCLEtBQUtKLGNBQWhDO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLSSxtQkFBTCxHQUEyQixDQUEvQixFQUFrQztBQUM5QixhQUFLQSxtQkFBTDtBQUNILE9BOUdJLENBK0dMOzs7QUFDQSxVQUFJLEtBQUtkLE9BQUwsSUFBZ0IsQ0FBQyxLQUFLYSxNQUExQixFQUFrQztBQUM5QixZQUFJLEtBQUtsSSxXQUFMLENBQWlCLEtBQUtDLFFBQUwsQ0FBY29MLE1BQS9CLEVBQXVDM2EsTUFBM0MsRUFBbUQ7QUFDL0NyRixpQkFBTyxDQUFDQyxHQUFSLENBQVksUUFBUSxLQUFLUSxJQUFMLENBQVVsRSxDQUFsQixHQUFzQixPQUF0QixHQUFnQyxLQUFLa0UsSUFBTCxDQUFVakUsQ0FBdEQ7QUFDSDs7QUFDRCxZQUFJLEtBQUttWSxXQUFMLENBQWlCLEtBQUtDLFFBQUwsQ0FBY25JLE1BQS9CLEVBQXVDcEgsTUFBdkMsSUFBaUQsS0FBS29QLFdBQUwsSUFBb0IsQ0FBekUsRUFBNEU7QUFDeEUsZUFBS2hVLElBQUwsQ0FBVWdNLE1BQVYsQ0FBaUIsS0FBSzlMLFNBQUwsQ0FBZXlILEtBQWYsQ0FBcUJ1RSxXQUFyQixDQUFpQyxLQUFLaVEsb0JBQXRDLENBQWpCO0FBQ0EsZUFBS25JLFdBQUwsR0FBbUIsS0FBS2lJLGNBQXhCO0FBQ0EsZUFBS0Usb0JBQUwsR0FBNEIsQ0FBQyxLQUFLQSxvQkFBTCxHQUE0QixDQUE3QixJQUFrQyxLQUFLamMsU0FBTCxDQUFleUgsS0FBZixDQUFxQnVFLFdBQXJCLENBQWlDOU8sTUFBL0Y7QUFDSDs7QUFDRCxZQUFJLEtBQUs4VyxXQUFMLENBQWlCLEtBQUtDLFFBQUwsQ0FBY3FMLFNBQS9CLEVBQTBDNWEsTUFBMUMsSUFBb0QsS0FBS3FQLGNBQUwsSUFBdUIsQ0FBL0UsRUFBa0Y7QUFDOUUsZUFBS2pVLElBQUwsQ0FBVWdCLE1BQVYsQ0FBaUJpVixLQUFqQixHQUF5QixDQUFDLEtBQUtqVyxJQUFMLENBQVVnQixNQUFWLENBQWlCaVYsS0FBM0M7QUFDQSxlQUFLaEMsY0FBTCxHQUFzQixLQUFLZ0ksY0FBM0I7QUFDSDs7QUFDRCxZQUFJLEtBQUsvSCxXQUFMLENBQWlCLEtBQUtDLFFBQUwsQ0FBY3JKLE9BQS9CLEVBQXdDbEcsTUFBNUMsRUFBb0Q7QUFDaEQsZUFBSzVFLElBQUwsQ0FBVWdNLE1BQVYsQ0FBaUIsS0FBSzlMLFNBQUwsQ0FBZTRLLE9BQWhDO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLb0osV0FBTCxDQUFpQixLQUFLQyxRQUFMLENBQWNzTCxXQUEvQixFQUE0QzdhLE1BQTVDLElBQXNELEtBQUtzWCxjQUFMLElBQXVCLENBQWpGLEVBQW9GO0FBQ2hGLGVBQUszWCxTQUFMLEdBQWlCLENBQUMsS0FBS0EsU0FBdkI7QUFDQSxlQUFLMlgsY0FBTCxHQUFzQixLQUFLRCxjQUEzQjtBQUNILFNBbkI2QixDQW9COUI7OztBQUNBLFlBQUksS0FBS0MsY0FBTCxHQUFzQixDQUExQixFQUE2QjtBQUN6QixlQUFLQSxjQUFMO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLbEksV0FBTCxHQUFtQixDQUF2QixFQUEwQjtBQUN0QixlQUFLQSxXQUFMO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLQyxjQUFMLEdBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLGVBQUtBLGNBQUw7QUFDSDtBQUNKO0FBQ0o7OzttQ0FFY3VLLFksRUFBYztBQUN6QixXQUFLM2lCLEdBQUwsQ0FBUzRpQixTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLEtBQUs1aUIsR0FBTCxDQUFTNEQsTUFBVCxDQUFnQkksS0FBekMsRUFBZ0QsS0FBS2hFLEdBQUwsQ0FBUzRELE1BQVQsQ0FBZ0JLLE1BQWhFO0FBQ0EsV0FBS2pFLEdBQUwsQ0FBU1ksSUFBVDs7QUFDQSxXQUFLLElBQUllLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS2llLGdCQUFMLENBQXNCcmUsTUFBMUMsRUFBa0RJLENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQ7QUFDQSxhQUFLaWUsZ0JBQUwsQ0FBc0JqZSxDQUF0QixFQUF5QmtoQixJQUF6QixDQUE4QixLQUFLN2lCLEdBQW5DO0FBQ0g7O0FBQ0QsVUFBSTJpQixZQUFKLEVBQWtCO0FBQ2RBLG9CQUFZLENBQUMsSUFBRCxDQUFaO0FBQ0g7O0FBQ0QsV0FBSzNpQixHQUFMLENBQVNlLE9BQVQ7QUFDSDtBQUVEOzs7Ozs7MkJBR1E7QUFDSixXQUFLZixHQUFMLENBQVNnRSxLQUFULEdBQWlCdkMsTUFBTSxDQUFDb2lCLFVBQXhCO0FBQ0EsV0FBSzdqQixHQUFMLENBQVNpRSxNQUFULEdBQWtCeEMsTUFBTSxDQUFDcWlCLFdBQXpCO0FBRUEsV0FBS2YsTUFBTDtBQUNBLFdBQUtGLElBQUw7QUFDQSxXQUFLaEQsS0FBTCxHQUFhLElBQWI7QUFDQSxXQUFLRSxLQUFMLEdBQWEsSUFBYjtBQUNIOzs7O0tBRUg7OztBQUVhLCtEQUFBTixVQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOWlCQTs7SUFHTXNFLEc7OztBQUVGLGVBQVk5Z0IsV0FBWixFQUF5QnJCLEdBQXpCLEVBQThCdUMsSUFBOUIsRUFBb0M2ZixlQUFwQyxFQUFxRDloQixjQUFyRCxFQUFxRStoQixnQkFBckUsRUFBd0c7QUFBQSxRQUFqQnprQixLQUFpQix1RUFBWCxDQUFXO0FBQUEsUUFBUjJDLE1BQVE7O0FBQUE7O0FBQ3BHLFNBQUtQLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUt1QyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLaEMsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBSytoQixTQUFMLEdBQWlCLElBQUlDLFNBQUosQ0FBY2xoQixXQUFkLEVBQTJCckIsR0FBM0IsRUFBZ0N1QyxJQUFoQyxFQUFzQzZmLGVBQXRDLEVBQXVEOWhCLGNBQXZELEVBQXVFK2hCLGdCQUF2RSxFQUF5RnprQixLQUFLLEdBQUMsQ0FBL0YsRUFBa0cyQyxNQUFsRyxDQUFqQjtBQUNBLFNBQUtpaUIsU0FBTCxHQUFpQixJQUFJQyxTQUFKLENBQWNwaEIsV0FBZCxFQUEyQnJCLEdBQTNCLEVBQWdDdUMsSUFBaEMsRUFBc0M2ZixlQUF0QyxFQUF1RDloQixjQUF2RCxFQUF1RStoQixnQkFBdkUsRUFBeUZ6a0IsS0FBSyxHQUFDLENBQS9GLEVBQWtHMkMsTUFBbEcsQ0FBakI7QUFDQSxTQUFLbWlCLFVBQUwsR0FBa0IsSUFBSUMsVUFBSixDQUFldGhCLFdBQWYsRUFBNEJnaEIsZ0JBQTVCLEVBQThDemtCLEtBQTlDLEVBQXFEMkMsTUFBckQsQ0FBbEI7QUFDQSxTQUFLcWlCLFVBQUwsR0FBa0IsQ0FBQyxLQUFLTixTQUFOLEVBQWlCLEtBQUtFLFNBQXRCLEVBQWlDLEtBQUtFLFVBQXRDLENBQWxCO0FBQ0EsU0FBS0csYUFBTCxHQUFxQixDQUFyQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBQ0g7Ozs7NkJBRVE7QUFDTCxXQUFLLElBQUloakIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLNmlCLFVBQUwsQ0FBZ0JqakIsTUFBcEMsRUFBNENJLENBQUMsRUFBN0MsRUFBaUQ7QUFDN0MsYUFBSzZpQixVQUFMLENBQWdCN2lCLENBQWhCLEVBQW1Cb2hCLE1BQW5CO0FBQ0g7QUFDSjs7O3lCQUVJL2lCLEcsRUFBSztBQUNOLFdBQUssSUFBSTJCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSzZpQixVQUFMLENBQWdCampCLE1BQXBDLEVBQTRDSSxDQUFDLEVBQTdDLEVBQWlEO0FBQzdDLGFBQUs2aUIsVUFBTCxDQUFnQjdpQixDQUFoQixFQUFtQmtoQixJQUFuQixDQUF3QjdpQixHQUF4QjtBQUNIO0FBQ0o7OztrQ0FDYSxDQUFFOzs7K0JBQ0wsQ0FBRTs7Ozs7O0lBS1h1a0IsVTs7O0FBRUYsc0JBQVl0aEIsV0FBWixFQUF5QmdoQixnQkFBekIsRUFBNEQ7QUFBQSxRQUFqQnprQixLQUFpQix1RUFBWCxDQUFXO0FBQUEsUUFBUjJDLE1BQVE7O0FBQUE7O0FBQ3hELFNBQUtxTixLQUFMLEdBQWF2TSxXQUFXLENBQUNvQixTQUFaLENBQXNCbUwsS0FBbkM7QUFDQSxTQUFLdk0sV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLZCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLM0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS29sQixXQUFMLEdBQW1CWCxnQkFBbkI7QUFDSDs7Ozs2QkFFUTtBQUNMLFdBQUt6VSxLQUFMLEdBQWE5TyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLc0MsV0FBTCxDQUFpQm9CLFNBQWpCLENBQTJCbUwsS0FBdEMsQ0FBYjtBQUNBLFdBQUtvVixXQUFMLEdBQW1CLENBQUMsQ0FBQyxLQUFLemlCLE1BQUwsQ0FBWVksS0FBYixHQUFxQixHQUF0QixFQUEyQixDQUFDLEtBQUtaLE1BQUwsQ0FBWStHLEtBQWIsR0FBcUIsR0FBaEQsQ0FBbkI7QUFDSDs7O3lCQUVJbEosRyxFQUFLO0FBQ05BLFNBQUcsQ0FBQ3dSLElBQUosR0FBVywwQkFBWDtBQUNBLFVBQUlxVCxRQUFRLEdBQUc3a0IsR0FBRyxDQUFDOGtCLG9CQUFKLENBQXlCLEtBQUtGLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsR0FBL0MsRUFBb0QsS0FBS0EsV0FBTCxDQUFpQixDQUFqQixJQUFzQixFQUExRSxFQUE4RSxLQUFLQSxXQUFMLENBQWlCLENBQWpCLENBQTlFLEVBQW1HLEtBQUtBLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsRUFBekgsQ0FBZjtBQUNBQyxjQUFRLENBQUNFLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBd0IsU0FBeEI7QUFDQUYsY0FBUSxDQUFDRSxZQUFULENBQXNCLEVBQXRCLEVBQTBCLE1BQTFCO0FBQ0FGLGNBQVEsQ0FBQ0UsWUFBVCxDQUFzQixDQUF0QixFQUF5QixPQUF6QixFQUxNLENBTU47O0FBQ0Eva0IsU0FBRyxDQUFDeVIsU0FBSixHQUFjb1QsUUFBZDtBQUNBN2tCLFNBQUcsQ0FBQzBSLFFBQUosQ0FBYSxZQUFZLEtBQUtsQyxLQUE5QixFQUNJLEtBQUtvVixXQUFMLENBQWlCLENBQWpCLElBQXNCLEdBRDFCLEVBRUksS0FBS0EsV0FBTCxDQUFpQixDQUFqQixJQUFzQixFQUYxQixFQVJNLENBWU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7Ozs7O0FBSUw7Ozs7O0lBR01JLFc7OztBQUVGLHVCQUFZL2hCLFdBQVosRUFBeUJyQixHQUF6QixFQUE4QnVDLElBQTlCLEVBQW9DNmYsZUFBcEMsRUFBcUQ5aEIsY0FBckQsRUFBcUUraEIsZ0JBQXJFLEVBQWdHO0FBQUEsUUFBVHprQixLQUFTLHVFQUFILENBQUc7O0FBQUE7O0FBQzVGLFNBQUt5RCxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtrQixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLdkMsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS3FqQixVQUFMLEdBQWtCakIsZUFBbEI7QUFDQSxTQUFLa0IsUUFBTCxHQUFnQmhqQixjQUFoQjtBQUNBLFNBQUswaUIsV0FBTCxHQUFtQlgsZ0JBQW5CLENBTjRGLENBTzVGOztBQUNBLFNBQUt6a0IsS0FBTCxHQUFhQSxLQUFiO0FBRUg7Ozs7eUJBRUlRLEcsRUFBSztBQUNOLFVBQUltbEIsS0FBSyxHQUFHLENBQVo7O0FBQ0EsV0FBSyxJQUFJeGpCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3lqQixLQUFMLENBQVc3akIsTUFBL0IsRUFBdUNJLENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsWUFBSTBqQixJQUFJLEdBQUcsS0FBS0QsS0FBTCxDQUFXempCLENBQVgsQ0FBWDtBQUNBLGFBQUsyakIsUUFBTCxDQUFjdGxCLEdBQWQsRUFBbUJxbEIsSUFBbkIsRUFBeUJGLEtBQXpCO0FBQ0FBLGFBQUssR0FBR0EsS0FBSyxHQUFHRSxJQUFJLENBQUMsWUFBRCxDQUFwQixDQUh3QyxDQUdKO0FBQ3ZDO0FBQ0o7Ozt1Q0FFa0J6akIsRyxFQUFLcWpCLFUsRUFBWUMsUSxFQUE0QztBQUFBLFVBQWxDSyxhQUFrQyx1RUFBcEIsQ0FBb0I7QUFBQSxVQUFqQkMsYUFBaUIsdUVBQUgsQ0FBRztBQUN4RSxhQUFPO0FBQ0gsZUFBTzVqQixHQURKO0FBRUgsaUJBQVNxakIsVUFBVSxDQUFDLENBQUQsQ0FGaEI7QUFHSCxpQkFBU0EsVUFBVSxDQUFDLENBQUQsQ0FIaEI7QUFJSCxxQkFBYUMsUUFBUSxDQUFDLENBQUQsQ0FKbEI7QUFLSCxzQkFBY0EsUUFBUSxDQUFDLENBQUQsQ0FMbkI7QUFNSCx5QkFBaUJLLGFBTmQ7QUFPSCx5QkFBaUJDLGFBUGQsQ0FVUjtBQUNBO0FBQ0E7QUFDQTs7QUFiUSxPQUFQO0FBY1A7Ozs7O0FBSUw7Ozs7Ozs7SUFLTXJCLFM7Ozs7O0FBRUYscUJBQVlsaEIsV0FBWixFQUF5QnJCLEdBQXpCLEVBQThCdUMsSUFBOUIsRUFBb0M2ZixlQUFwQyxFQUFxRDloQixjQUFyRCxFQUFxRStoQixnQkFBckUsRUFBd0c7QUFBQTs7QUFBQSxRQUFqQnprQixLQUFpQix1RUFBWCxDQUFXO0FBQUEsUUFBUjJDLE1BQVE7O0FBQUE7O0FBQ3BHLG1GQUFNYyxXQUFOLEVBQW1CckIsR0FBbkIsRUFBd0J1QyxJQUF4QixFQUE4QjZmLGVBQTlCLEVBQStDOWhCLGNBQS9DLEVBQStEK2hCLGdCQUEvRCxFQUFpRnprQixLQUFLLEdBQUMsQ0FBdkY7QUFDQSxVQUFLd0csTUFBTCxHQUFjN0IsSUFBSSxDQUFDNkIsTUFBbkIsQ0FGb0csQ0FFekU7O0FBQzNCLFVBQUtoQyxLQUFMLEdBQWEsRUFBYixDQUhvRyxDQUduRjs7QUFDakIsVUFBS0csSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS2hDLE1BQUwsR0FBY0EsTUFBZCxDQUxvRyxDQU9wRzs7QUFDQSxVQUFLOGYsR0FBTCxHQUFXLE1BQUt3RCxrQkFBTCxDQUF3QjdqQixHQUF4QixFQUNQLENBQUNvaUIsZUFBZSxDQUFDLENBQUQsQ0FBaEIsRUFBcUI5aEIsY0FBYyxDQUFDLENBQUQsQ0FBZCxHQUFvQixDQUF6QyxDQURPLEVBRVAsQ0FBQyxNQUFLOEIsS0FBTixFQUFhLENBQWIsQ0FGTyxDQUFYO0FBR0EsVUFBSzBoQixPQUFMLEdBQWUsTUFBS0Qsa0JBQUwsQ0FBd0I3akIsR0FBeEIsRUFDWCxDQUFDb2lCLGVBQWUsQ0FBQyxDQUFELENBQWhCLEVBQXFCQSxlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLENBQTFDLENBRFcsRUFFWCxDQUFDLE1BQUtoZ0IsS0FBTixFQUFhLEVBQWIsQ0FGVyxDQUFmO0FBR0EsVUFBSzJoQixPQUFMLEdBQWUsTUFBS0Ysa0JBQUwsQ0FBd0I3akIsR0FBeEIsRUFDWCxDQUFDb2lCLGVBQWUsQ0FBQyxDQUFELENBQWhCLEVBQXFCQSxlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLENBQTFDLENBRFcsRUFFWCxDQUFDLE1BQUtoZ0IsS0FBTixFQUFhLEVBQWIsQ0FGVyxDQUFmO0FBR0EsVUFBSzRoQixPQUFMLEdBQWUsTUFBS0gsa0JBQUwsQ0FBd0I3akIsR0FBeEIsRUFDWCxDQUFDb2lCLGVBQWUsQ0FBQyxDQUFELENBQWhCLEVBQXFCQSxlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLENBQTFDLENBRFcsRUFFWCxDQUFDLE1BQUtoZ0IsS0FBTixFQUFhLEVBQWIsQ0FGVyxDQUFmO0FBR0EsVUFBSzZoQixPQUFMLEdBQWUsTUFBS0osa0JBQUwsQ0FBd0I3akIsR0FBeEIsRUFDWCxDQUFDb2lCLGVBQWUsQ0FBQyxDQUFELENBQWhCLEVBQXFCQSxlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLENBQTFDLENBRFcsRUFFWCxDQUFDLE1BQUtoZ0IsS0FBTixFQUFhLEVBQWIsQ0FGVyxDQUFmO0FBR0EsVUFBSzhoQixPQUFMLEdBQWUsTUFBS0wsa0JBQUwsQ0FBd0I3akIsR0FBeEIsRUFDWCxDQUFDb2lCLGVBQWUsQ0FBQyxDQUFELENBQWhCLEVBQXFCQSxlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLENBQTFDLENBRFcsRUFFWCxDQUFDLE1BQUtoZ0IsS0FBTixFQUFhLEVBQWIsQ0FGVyxDQUFmO0FBR0EsVUFBSytoQixNQUFMLEdBQWMsTUFBS04sa0JBQUwsQ0FBd0I3akIsR0FBeEIsRUFDVixDQUFDb2lCLGVBQWUsQ0FBQyxDQUFELENBQWhCLEVBQXFCQSxlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLEVBQTFDLENBRFUsRUFFVixDQUFDLE1BQUtoZ0IsS0FBTixFQUFhLEVBQWIsQ0FGVSxDQUFkO0FBR0EsVUFBS2pFLElBQUwsR0FBWSxNQUFLMGxCLGtCQUFMLENBQXdCN2pCLEdBQXhCLEVBQ1IsQ0FBQ29pQixlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLENBQXRCLEVBQXlCQSxlQUFlLENBQUMsQ0FBRCxDQUFmLEdBQXFCLEVBQTlDLENBRFEsRUFFUixDQUFDLE1BQUtoZ0IsS0FBTCxHQUFXLENBQVosRUFBZSxDQUFmLENBRlEsRUFHUixDQUhRLEVBR0wsRUFISyxDQUFaO0FBSUEsVUFBS29oQixLQUFMLEdBQWEsQ0FBQyxNQUFLbkQsR0FBTixFQUNELE1BQUt5RCxPQURKLEVBQ2EsTUFBS0MsT0FEbEIsRUFDMkIsTUFBS0MsT0FEaEMsRUFDeUMsTUFBS0MsT0FEOUMsRUFDdUQsTUFBS0MsT0FENUQsRUFFRCxNQUFLQyxNQUZKLENBQWI7QUFqQ29HO0FBcUN2Rzs7Ozt5QkFFSS9sQixHLEVBQUs7QUFDTixVQUFJbWxCLEtBQUssR0FBRyxDQUFaOztBQUNBLFdBQUssSUFBSXhqQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt5akIsS0FBTCxDQUFXN2pCLE1BQS9CLEVBQXVDSSxDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDLFlBQUkwakIsSUFBSSxHQUFHLEtBQUtELEtBQUwsQ0FBV3pqQixDQUFYLENBQVg7QUFDQSxhQUFLMmpCLFFBQUwsQ0FBY3RsQixHQUFkLEVBQW1CcWxCLElBQW5CLEVBQXlCRixLQUF6QjtBQUNBQSxhQUFLLEdBQUdBLEtBQUssR0FBR0UsSUFBSSxDQUFDLFlBQUQsQ0FBcEIsQ0FId0MsQ0FHSjtBQUN2Qzs7QUFFREYsV0FBSyxJQUFJLEtBQUtZLE1BQUwsQ0FBWSxZQUFaLENBQVQ7O0FBQ0EsV0FBSyxJQUFJcGtCLENBQUMsR0FBRyxLQUFLcUUsTUFBbEIsRUFBMEJyRSxDQUFDLEdBQUcsQ0FBOUIsRUFBaUNBLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsYUFBSzJqQixRQUFMLENBQWN0bEIsR0FBZCxFQUFtQixLQUFLRCxJQUF4QixFQUE4Qm9sQixLQUE5QjtBQUNBQSxhQUFLLElBQUksQ0FBVCxDQUZrQyxDQUV2QjtBQUNkO0FBQ0o7Ozs2QkFFUW5sQixHLEVBQUtxbEIsSSxFQUFNRixLLEVBQU87QUFDdkJubEIsU0FBRyxDQUFDYyxTQUFKLENBQWMsS0FBS2MsR0FBbkIsRUFDSXlqQixJQUFJLENBQUMsT0FBRCxDQURSLEVBQ21CQSxJQUFJLENBQUMsT0FBRCxDQUR2QixFQUNrQztBQUM5QkEsVUFBSSxDQUFDLFdBQUQsQ0FGUixFQUV1QkEsSUFBSSxDQUFDLFlBQUQsQ0FGM0IsRUFFMkM7QUFDdkMsV0FBS1QsV0FBTCxDQUFpQixDQUFqQixJQUFzQlMsSUFBSSxDQUFDLGVBQUQsQ0FIOUIsRUFHaUQsS0FBS1QsV0FBTCxDQUFpQixDQUFqQixJQUF1Qk8sS0FBSyxHQUFHLEtBQUszbEIsS0FBcEMsR0FBNkM2bEIsSUFBSSxDQUFDLGVBQUQsQ0FIbEcsRUFHcUg7QUFDakhBLFVBQUksQ0FBQyxXQUFELENBQUosR0FBb0IsS0FBSzdsQixLQUo3QixFQUlvQzZsQixJQUFJLENBQUMsWUFBRCxDQUFKLEdBQXFCLEtBQUs3bEIsS0FKOUQsQ0FJcUU7QUFKckU7QUFNSDs7OzZCQUVRO0FBQ0wsV0FBS3dHLE1BQUwsR0FBYyxLQUFLN0IsSUFBTCxDQUFVNkIsTUFBeEI7QUFDQSxXQUFLNGUsV0FBTCxHQUFtQixDQUFDLENBQUMsS0FBS3ppQixNQUFMLENBQVlZLEtBQWIsR0FBcUIsR0FBdEIsRUFBMkIsQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEdBQWhELENBQW5CO0FBQ0g7OztrQ0FDYSxDQUFFOzs7K0JBQ0wsQ0FBRTs7OztFQXRFTzhiLFc7QUEyRXhCOzs7Ozs7O0lBS01YLFM7Ozs7O0FBRUYscUJBQVlwaEIsV0FBWixFQUF5QnJCLEdBQXpCLEVBQThCdUMsSUFBOUIsRUFBb0M2ZixlQUFwQyxFQUFxRDloQixjQUFyRCxFQUFxRStoQixnQkFBckUsRUFBd0c7QUFBQTs7QUFBQSxRQUFqQnprQixLQUFpQix1RUFBWCxDQUFXO0FBQUEsUUFBUjJDLE1BQVE7O0FBQUE7O0FBQ3BHLG9GQUFNYyxXQUFOLEVBQW1CckIsR0FBbkIsRUFBd0J1QyxJQUF4QixFQUE4QjZmLGVBQTlCLEVBQStDOWhCLGNBQS9DLEVBQStEK2hCLGdCQUEvRCxFQUFpRnprQixLQUFLLEdBQUMsQ0FBdkY7QUFDQSxXQUFLaVgsTUFBTCxHQUFjdFMsSUFBSSxDQUFDc1MsTUFBbkIsQ0FGb0csQ0FFekU7O0FBQzNCLFdBQUt6UyxLQUFMLEdBQWEsRUFBYixDQUhvRyxDQUduRjs7QUFDakIsV0FBS0csSUFBTCxHQUFZQSxJQUFaO0FBQ0EsV0FBS2hDLE1BQUwsR0FBY0EsTUFBZDtBQUNBNmhCLG1CQUFlLEdBQUcsQ0FBQ0EsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixFQUF0QixFQUEwQkEsZUFBZSxDQUFDLENBQUQsQ0FBekMsQ0FBbEIsQ0FOb0csQ0FRcEc7O0FBQ0EsV0FBSy9CLEdBQUwsR0FBVyxPQUFLd0Qsa0JBQUwsQ0FBd0I3akIsR0FBeEIsRUFDUCxDQUFDb2lCLGVBQWUsQ0FBQyxDQUFELENBQWhCLEVBQXFCOWhCLGNBQWMsQ0FBQyxDQUFELENBQWQsR0FBb0IsQ0FBekMsQ0FETyxFQUVQLENBQUMsT0FBSzhCLEtBQU4sRUFBYSxDQUFiLENBRk8sQ0FBWDtBQUdBLFdBQUswaEIsT0FBTCxHQUFlLE9BQUtELGtCQUFMLENBQXdCN2pCLEdBQXhCLEVBQ1gsQ0FBQ29pQixlQUFlLENBQUMsQ0FBRCxDQUFoQixFQUFxQkEsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixDQUExQyxDQURXLEVBRVgsQ0FBQyxPQUFLaGdCLEtBQU4sRUFBYSxFQUFiLENBRlcsQ0FBZjtBQUdBLFdBQUsyaEIsT0FBTCxHQUFlLE9BQUtGLGtCQUFMLENBQXdCN2pCLEdBQXhCLEVBQ1gsQ0FBQ29pQixlQUFlLENBQUMsQ0FBRCxDQUFoQixFQUFxQkEsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixDQUExQyxDQURXLEVBRVgsQ0FBQyxPQUFLaGdCLEtBQU4sRUFBYSxFQUFiLENBRlcsQ0FBZjtBQUdBLFdBQUs0aEIsT0FBTCxHQUFlLE9BQUtILGtCQUFMLENBQXdCN2pCLEdBQXhCLEVBQ1gsQ0FBQ29pQixlQUFlLENBQUMsQ0FBRCxDQUFoQixFQUFxQkEsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixDQUExQyxDQURXLEVBRVgsQ0FBQyxPQUFLaGdCLEtBQU4sRUFBYSxFQUFiLENBRlcsQ0FBZjtBQUdBLFdBQUs2aEIsT0FBTCxHQUFlLE9BQUtKLGtCQUFMLENBQXdCN2pCLEdBQXhCLEVBQ1gsQ0FBQ29pQixlQUFlLENBQUMsQ0FBRCxDQUFoQixFQUFxQkEsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixDQUExQyxDQURXLEVBRVgsQ0FBQyxPQUFLaGdCLEtBQU4sRUFBYSxFQUFiLENBRlcsQ0FBZjtBQUdBLFdBQUs4aEIsT0FBTCxHQUFlLE9BQUtMLGtCQUFMLENBQXdCN2pCLEdBQXhCLEVBQ1gsQ0FBQ29pQixlQUFlLENBQUMsQ0FBRCxDQUFoQixFQUFxQkEsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixDQUExQyxDQURXLEVBRVgsQ0FBQyxPQUFLaGdCLEtBQU4sRUFBYSxFQUFiLENBRlcsQ0FBZjtBQUlBLFdBQUsraEIsTUFBTCxHQUFjLE9BQUtOLGtCQUFMLENBQXdCN2pCLEdBQXhCLEVBQ1YsQ0FBQ29pQixlQUFlLENBQUMsQ0FBRCxDQUFoQixFQUFxQkEsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixFQUExQyxDQURVLEVBRVYsQ0FBQyxPQUFLaGdCLEtBQU4sRUFBYSxFQUFiLENBRlUsQ0FBZDtBQUdBLFdBQUtqRSxJQUFMLEdBQVksT0FBSzBsQixrQkFBTCxDQUF3QjdqQixHQUF4QixFQUNSLENBQUNvaUIsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixDQUF0QixFQUF5QkEsZUFBZSxDQUFDLENBQUQsQ0FBZixHQUFxQixFQUE5QyxDQURRLEVBRVIsQ0FBQyxPQUFLaGdCLEtBQUwsR0FBYSxDQUFkLEVBQWlCLENBQWpCLENBRlEsRUFHUixDQUhRLEVBR0wsRUFISyxDQUFaO0FBSUEsV0FBS29oQixLQUFMLEdBQWEsQ0FBQyxPQUFLbkQsR0FBTixFQUNELE9BQUt5RCxPQURKLEVBQ2EsT0FBS0MsT0FEbEIsRUFDMkIsT0FBS0MsT0FEaEMsRUFDeUMsT0FBS0MsT0FEOUMsRUFDdUQsT0FBS0MsT0FENUQsRUFFRCxPQUFLQyxNQUZKLENBQWI7QUFuQ29HO0FBdUN2Rzs7Ozt5QkFFSS9sQixHLEVBQUs7QUFDTixVQUFJbWxCLEtBQUssR0FBRyxDQUFaOztBQUNBLFdBQUssSUFBSXhqQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt5akIsS0FBTCxDQUFXN2pCLE1BQS9CLEVBQXVDSSxDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDLFlBQUkwakIsSUFBSSxHQUFHLEtBQUtELEtBQUwsQ0FBV3pqQixDQUFYLENBQVg7QUFDQSxhQUFLMmpCLFFBQUwsQ0FBY3RsQixHQUFkLEVBQW1CcWxCLElBQW5CLEVBQXlCRixLQUF6QjtBQUNBQSxhQUFLLEdBQUdBLEtBQUssR0FBR0UsSUFBSSxDQUFDLFlBQUQsQ0FBcEIsQ0FId0MsQ0FHSjtBQUN2Qzs7QUFFREYsV0FBSyxJQUFJLEtBQUtZLE1BQUwsQ0FBWSxZQUFaLENBQVQ7O0FBQ0EsV0FBSyxJQUFJcGtCLENBQUMsR0FBRyxLQUFLOFUsTUFBbEIsRUFBMEI5VSxDQUFDLEdBQUcsQ0FBOUIsRUFBaUNBLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsYUFBSzJqQixRQUFMLENBQWN0bEIsR0FBZCxFQUFtQixLQUFLRCxJQUF4QixFQUE4Qm9sQixLQUE5QjtBQUNBQSxhQUFLLElBQUksQ0FBVCxDQUZrQyxDQUV2QjtBQUNkO0FBQ0o7Ozs2QkFFUW5sQixHLEVBQUtxbEIsSSxFQUFNRixLLEVBQU87QUFDdkJubEIsU0FBRyxDQUFDYyxTQUFKLENBQWMsS0FBS2MsR0FBbkIsRUFDSXlqQixJQUFJLENBQUMsT0FBRCxDQURSLEVBQ21CQSxJQUFJLENBQUMsT0FBRCxDQUR2QixFQUNrQztBQUM5QkEsVUFBSSxDQUFDLFdBQUQsQ0FGUixFQUV1QkEsSUFBSSxDQUFDLFlBQUQsQ0FGM0IsRUFFMkM7QUFDdkMsV0FBS1QsV0FBTCxDQUFpQixDQUFqQixJQUFzQlMsSUFBSSxDQUFDLGVBQUQsQ0FIOUIsRUFHaUQsS0FBS1QsV0FBTCxDQUFpQixDQUFqQixJQUF1Qk8sS0FBSyxHQUFHLEtBQUszbEIsS0FBcEMsR0FBNkM2bEIsSUFBSSxDQUFDLGVBQUQsQ0FIbEcsRUFHcUg7QUFDakhBLFVBQUksQ0FBQyxXQUFELENBQUosR0FBb0IsS0FBSzdsQixLQUo3QixFQUlvQzZsQixJQUFJLENBQUMsWUFBRCxDQUFKLEdBQXFCLEtBQUs3bEIsS0FKOUQsQ0FJcUU7QUFKckU7QUFNSDs7OzZCQUVRO0FBQ0wsV0FBS2lYLE1BQUwsR0FBYyxLQUFLdFMsSUFBTCxDQUFVc1MsTUFBeEI7QUFDQSxXQUFLbU8sV0FBTCxHQUFtQixDQUFDLENBQUMsS0FBS3ppQixNQUFMLENBQVlZLEtBQWIsR0FBcUIsR0FBdEIsRUFBMkIsQ0FBQyxLQUFLWixNQUFMLENBQVkrRyxLQUFiLEdBQXFCLEdBQWhELENBQW5CO0FBQ0g7OztrQ0FDYSxDQUFFOzs7K0JBQ0wsQ0FBRTs7OztFQXhFTzhiLFc7O0FBMkVULCtEQUFBakIsR0FBZixFOzs7Ozs7Ozs7Ozs7QUN4UkE7QUFBQTtBQUFBOztBQUVBdGlCLE1BQU0sQ0FBQzJmLGdCQUFQLEdBQTJCLFlBQVk7QUFDbkMsU0FBTzNmLE1BQU0sQ0FBQ3VrQixxQkFBUCxJQUNDdmtCLE1BQU0sQ0FBQ3drQiwyQkFEUixJQUVDeGtCLE1BQU0sQ0FBQ3lrQix3QkFGUixJQUdDemtCLE1BQU0sQ0FBQzBrQixzQkFIUixJQUlDMWtCLE1BQU0sQ0FBQzJrQix1QkFKUixJQUtDO0FBQVU7QUFBZTVrQixVQUF6QjtBQUFtQztBQUFpQjZrQixTQUFwRCxFQUE2RDtBQUN6RDVrQixVQUFNLENBQUNDLFVBQVAsQ0FBa0JGLFFBQWxCLEVBQTRCLE9BQU8sRUFBbkM7QUFDSCxHQVBUO0FBUUgsQ0FUeUIsRUFBMUI7O0FBV0EscURBQUksRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQXNCTThrQixROzs7QUFFRjtBQUNBLG9CQUFZcGlCLFVBQVosRUFBd0JxSSxZQUF4QixFQUFzQ3ZNLEdBQXRDLEVBQTJDO0FBQUE7O0FBRXZDO0FBQ0EsU0FBS2tFLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS3FJLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS3ZNLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUt1bUIsU0FBTCxHQUFpQmhhLFlBQVksQ0FBQ2pKLFFBQWIsQ0FBc0IsZUFBdEIsQ0FBakI7QUFDQSxTQUFLNEwsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFNBQUtDLFVBQUw7QUFDQSxTQUFLa0IsV0FBTCxHQUFtQixDQUFDLENBQUMsRUFBRCxFQUFLLElBQUwsQ0FBRCxFQUFhLENBQUMsSUFBRCxFQUFPLENBQVAsQ0FBYixDQUFuQjtBQUNBLFNBQUtpQyxPQUFMLEdBQWUsQ0FBQyxDQUFDLENBQUQsRUFBSSxHQUFKLENBQUQsRUFBVyxDQUFDLENBQUQsRUFBSSxHQUFKLENBQVgsQ0FBZjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVQsQ0FBakI7QUFDQSxTQUFLaVUsb0JBQUwsR0FBNEIsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLEtBQWQsRUFBcUIsS0FBckIsQ0FBNUI7QUFDQSxTQUFLM1csU0FBTCxHQUFpQixDQUFqQjtBQUNBLFNBQUsyVyxvQkFBTCxHQUE0QixDQUFDLElBQUQsRUFBTyxLQUFQLENBQTVCO0FBQ0EsU0FBS2hXLE1BQUwsR0FBYyxJQUFJaVcsTUFBSixDQUFXLEtBQUt2aUIsVUFBaEIsRUFBNEIsSUFBNUIsRUFBa0MsQ0FBQyxFQUFuQyxFQUF1QyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUF2QyxFQUFzRixLQUFLdEQsR0FBM0YsRUFBZ0csQ0FBaEcsRUFBbUcsSUFBbkcsQ0FBZDtBQUVBLFNBQUswbUIsUUFBTCxHQUFnQixFQUFoQjtBQUVBLFNBQUtDLE9BQUwsR0FBZTtBQUNYLFdBQUssSUFETTtBQUVYO0FBQ0EsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBSE07QUFJWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FKTTtBQUtYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQUxNO0FBTVgsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBTk07QUFPWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FQTTtBQVFYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQVJNO0FBU1gsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBVE07QUFVWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FWTTtBQVdYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQVhNO0FBWVgsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBWk07QUFhWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FiTTtBQWNYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQWRNO0FBZVgsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBZk07QUFnQlgsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBaEJNO0FBaUJYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSjtBQWpCTSxLQUFmO0FBbUJBLFNBQUtDLGNBQUwsR0FBc0I7QUFDbEI7QUFDQSxXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsQ0FBYixDQUZhO0FBR2xCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLENBSGE7QUFJbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FKYTtBQUtsQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixDQUxhO0FBTWxCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLENBTmE7QUFPbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLEVBQVosQ0FQYTtBQVFsQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxDQUFULEVBQVksQ0FBWixDQVJhO0FBU2xCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLENBVGE7QUFVbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FWYTtBQVdsQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxDQUFULEVBQVksQ0FBWixDQVhhO0FBWWxCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLENBWmE7QUFhbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FiYTtBQWNsQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxDQUFULEVBQVksQ0FBWixDQWRhO0FBZWxCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxFQUFaLENBZmE7QUFnQmxCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLENBaEJhLENBa0J0Qjs7QUFsQnNCLEtBQXRCO0FBbUJBLFNBQUsxRSxHQUFMLEdBQ1IsaTFCQXFCRTJFLEtBckJGLENBcUJRLElBckJSLENBRFE7QUF3Qkg7Ozs7MkJBRU07QUFDSCxXQUFLQyxnQkFBTDtBQUNBLFdBQUs1VyxXQUFMO0FBQ0g7Ozt1Q0FHa0I7QUFDZnhNLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHlCQUFaO0FBQ0FELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUt1ZSxHQUFMLENBQVMsQ0FBVCxFQUFZM2dCLE1BQVosR0FBcUIsS0FBckIsR0FBNkIsS0FBSzJnQixHQUFMLENBQVMzZ0IsTUFBbEQ7O0FBQ0EsV0FBSyxJQUFJK2QsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsR0FBRyxLQUFLNEMsR0FBTCxDQUFTLENBQVQsRUFBWTNnQixNQUFwQyxFQUE0QytkLEdBQUcsRUFBL0MsRUFBbUQ7QUFDL0MsYUFBSyxJQUFJbmdCLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUcsS0FBSytpQixHQUFMLENBQVMzZ0IsTUFBakMsRUFBeUNwQyxHQUFHLEVBQTVDLEVBQWdEO0FBQzVDLGNBQUk0bkIsSUFBSSxHQUFHLEtBQUtKLE9BQUwsQ0FBYSxLQUFLekUsR0FBTCxDQUFTL2lCLEdBQVQsRUFBY21nQixHQUFkLENBQWIsQ0FBWDs7QUFDQSxjQUFJeUgsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZCxnQkFBSUMsYUFBYSxHQUFHLEtBQUtKLGNBQUwsQ0FBb0IsS0FBSzFFLEdBQUwsQ0FBUy9pQixHQUFULEVBQWNtZ0IsR0FBZCxDQUFwQixDQUFwQjtBQUNBLGlCQUFLcGIsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSxpREFBSixDQUFZLEtBQUtMLFVBQWpCLEVBQTZCb2IsR0FBRyxHQUFHLEtBQUtvSCxRQUF4QyxFQUFrRHZuQixHQUFHLEdBQUcsS0FBS3VuQixRQUE3RCxFQUF1RSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXZFLEVBQWlGLEtBQUtILFNBQXRGLEVBQWlHLEtBQUt2bUIsR0FBdEcsRUFBMkcsQ0FBM0csRUFBOEcrbUIsSUFBOUcsRUFBb0hDLGFBQXBILENBQTFCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7OztnQ0FFV0MsVSxFQUFZO0FBQ3BCLFVBQUlBLFVBQVUsS0FBSyxDQUFDLENBQXBCLEVBQXVCO0FBQ25CLGFBQUtDLFNBQUw7QUFDSCxPQUZELE1BR0s7QUFDRCxZQUFJRCxVQUFVLEtBQUssQ0FBbkIsRUFBc0I7QUFDbEIsZUFBS0MsU0FBTDtBQUNIO0FBQ0o7QUFDSjs7O2dDQUVXO0FBQ1IsV0FBSy9YLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLakwsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSxvREFBSixDQUFlLEtBQUtMLFVBQXBCLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDLEVBQTRDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsb0JBQTNCLENBQTVDLEVBQThGLEtBQUt0RCxHQUFuRyxFQUF3RyxFQUF4RyxFQUE0RyxDQUE1RyxFQUErRyxDQUEvRyxDQUExQjtBQUNBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJLG9EQUFKLENBQWUsS0FBS0wsVUFBcEIsRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsRUFBNEMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixvQkFBM0IsQ0FBNUMsRUFBOEYsS0FBS3RELEdBQW5HLEVBQXdHLEVBQXhHLEVBQTRHLENBQTVHLEVBQStHLENBQS9HLENBQTFCO0FBQ0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUksb0RBQUosQ0FBZSxLQUFLTCxVQUFwQixFQUFnQyxHQUFoQyxFQUFxQyxHQUFyQyxFQUEwQyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLG9CQUEzQixDQUExQyxFQUE0RixLQUFLdEQsR0FBakcsRUFBc0csRUFBdEcsRUFBMEcsQ0FBMUcsRUFBNkcsQ0FBN0csQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSxvREFBSixDQUFlLEtBQUtMLFVBQXBCLEVBQWdDLEdBQWhDLEVBQXFDLEdBQXJDLEVBQTBDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsb0JBQTNCLENBQTFDLEVBQTRGLEtBQUt0RCxHQUFqRyxFQUFzRyxFQUF0RyxFQUEwRyxDQUExRyxFQUE2RyxDQUE3RyxDQUExQjtBQUVBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJLDhDQUFKLENBQVMsS0FBS0wsVUFBZCxFQUEwQixJQUExQixFQUFnQyxJQUFoQyxFQUFzQyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUF0QyxFQUFxRixLQUFLdEQsR0FBMUYsQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSx1REFBSixDQUFrQixLQUFLTCxVQUF2QixFQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxFQUErQyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUEvQyxFQUE4RixLQUFLdEQsR0FBbkcsQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSw4Q0FBSixDQUFTLEtBQUtMLFVBQWQsRUFBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsRUFBc0MsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBdEMsRUFBcUYsS0FBS3RELEdBQTFGLENBQTFCO0FBQ0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUksOENBQUosQ0FBUyxLQUFLTCxVQUFkLEVBQTBCLElBQTFCLEVBQWdDLElBQWhDLEVBQXNDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBQXRDLEVBQXFGLEtBQUt0RCxHQUExRixDQUExQjtBQUdBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJLHVEQUFKLENBQWtCLEtBQUtMLFVBQXZCLEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLEVBQStDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBQS9DLEVBQThGLEtBQUt0RCxHQUFuRyxDQUExQjtBQUNBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJLDhDQUFKLENBQVMsS0FBS0wsVUFBZCxFQUEwQixHQUExQixFQUErQixHQUEvQixFQUFvQyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUFwQyxFQUFtRixLQUFLdEQsR0FBeEYsQ0FBMUI7QUFFQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSw4Q0FBSixDQUFTLEtBQUtMLFVBQWQsRUFBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsRUFBc0MsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBdEMsRUFBcUYsS0FBS3RELEdBQTFGLEVBQStGLENBQS9GLEVBQWtHLEVBQWxHLEVBQXNHLEVBQXRHLEVBQTBHLEdBQTFHLEVBQStHLEdBQS9HLENBQTFCO0FBQ0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUksOENBQUosQ0FBUyxLQUFLTCxVQUFkLEVBQTBCLElBQTFCLEVBQWdDLEdBQWhDLEVBQXFDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBQXJDLEVBQW9GLEtBQUt0RCxHQUF6RixDQUExQjtBQUNIOzs7Ozs7SUFHQ21uQixROzs7QUFFRjtBQUNBLG9CQUFZampCLFVBQVosRUFBd0JxSSxZQUF4QixFQUFzQ3ZNLEdBQXRDLEVBQTJDO0FBQUE7O0FBRXZDO0FBQ0EsU0FBS2tFLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS3FJLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS3ZNLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUt1bUIsU0FBTCxHQUFpQmhhLFlBQVksQ0FBQ2pKLFFBQWIsQ0FBc0IsZUFBdEIsQ0FBakI7QUFDQSxTQUFLNEwsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFNBQUtDLFVBQUw7QUFDQSxTQUFLa0IsV0FBTCxHQUFtQixDQUFDLENBQUMsQ0FBQyxHQUFGLEVBQU8sSUFBUCxDQUFELEVBQWUsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFmLEVBQTZCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBN0IsRUFBMkMsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUEzQyxDQUFuQjtBQUNBLFNBQUtpQyxPQUFMLEdBQWUsQ0FBQyxDQUFDLENBQUQsRUFBSSxHQUFKLENBQUQsRUFBVyxDQUFDLElBQUQsRUFBTyxJQUFQLENBQVgsRUFBeUIsQ0FBQyxDQUFELEVBQUksR0FBSixDQUF6QixFQUFtQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQW5DLENBQWY7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQUMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFELEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFULEVBQWlCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakIsRUFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF6QixDQUFqQjtBQUNBLFNBQUtpVSxvQkFBTCxHQUE0QixDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixLQUFyQixDQUE1QjtBQUNBLFNBQUszVyxTQUFMLEdBQWlCLENBQUMsQ0FBbEI7QUFDQSxTQUFLVyxNQUFMLEdBQWMsSUFBSWlXLE1BQUosQ0FBVyxLQUFLdmlCLFVBQWhCLEVBQTRCLENBQUMsR0FBN0IsRUFBa0MsSUFBbEMsRUFBd0MsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBeEMsRUFBdUYsS0FBS3RELEdBQTVGLEVBQWlHLENBQWpHLEVBQW9HLElBQXBHLENBQWQsQ0FkdUMsQ0FnQnZDO0FBQ0E7O0FBRUEsU0FBSzBtQixRQUFMLEdBQWdCLEVBQWhCO0FBRUEsU0FBS0MsT0FBTCxHQUFlO0FBQ1gsV0FBSyxJQURNO0FBRVg7QUFDQSxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FITTtBQUlYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQUpNO0FBS1gsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBTE07QUFNWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FOTTtBQU9YLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQVBNO0FBUVgsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBUk07QUFTWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FUTTtBQVVYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQVZNO0FBV1gsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBWE07QUFZWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FaTTtBQWFYLFdBQUssQ0FBQyxDQUFELEVBQUksQ0FBSixDQWJNO0FBY1gsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLENBZE07QUFlWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FmTTtBQWdCWCxXQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FoQk07QUFpQlgsV0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKO0FBakJNLEtBQWY7QUFtQkEsU0FBS0MsY0FBTCxHQUFzQjtBQUNsQjtBQUNBLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLENBRmE7QUFHbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLENBQWIsQ0FIYTtBQUlsQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxDQUFULEVBQVksQ0FBWixDQUphO0FBS2xCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLENBTGE7QUFNbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FOYTtBQU9sQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxDQUFULEVBQVksRUFBWixDQVBhO0FBUWxCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLENBUmE7QUFTbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FUYTtBQVVsQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxDQUFULEVBQVksQ0FBWixDQVZhO0FBV2xCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLENBWGE7QUFZbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FaYTtBQWFsQixXQUFLLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxDQUFULEVBQVksQ0FBWixDQWJhO0FBY2xCLFdBQUssQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLENBQVQsRUFBWSxDQUFaLENBZGE7QUFlbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLEVBQVosQ0FmYTtBQWdCbEIsV0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FoQmEsQ0FtQnRCOztBQW5Cc0IsS0FBdEI7QUFvQkEsU0FBSzFFLEdBQUwsR0FDSSwrMkVBb0JWMkUsS0FwQlUsQ0FvQkosSUFwQkksQ0FESjtBQXVCQSxTQUFLTyxRQUFMLEdBQ1IsYUFFRVAsS0FGRixDQUVRLElBRlIsQ0FEUTtBQUtIOzs7OzJCQUVNO0FBQ0gsV0FBS0MsZ0JBQUwsR0FERyxDQUVIOztBQUNBLFdBQUssSUFBSXhILEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUcsS0FBSzhILFFBQUwsQ0FBYyxDQUFkLEVBQWlCN2xCLE1BQXpDLEVBQWlEK2QsR0FBRyxFQUFwRCxFQUF3RDtBQUNwRCxhQUFLLElBQUluZ0IsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsR0FBRyxLQUFLaW9CLFFBQUwsQ0FBYzdsQixNQUF0QyxFQUE4Q3BDLEdBQUcsRUFBakQsRUFBcUQ7QUFDakQsY0FBSTRuQixJQUFJLEdBQUcsS0FBS0osT0FBTCxDQUFhLEtBQUtTLFFBQUwsQ0FBY2pvQixHQUFkLEVBQW1CbWdCLEdBQW5CLENBQWIsQ0FBWDs7QUFDQSxjQUFJeUgsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZCxnQkFBSUMsYUFBYSxHQUFHLEtBQUtKLGNBQUwsQ0FBb0IsS0FBS1EsUUFBTCxDQUFjam9CLEdBQWQsRUFBbUJtZ0IsR0FBbkIsQ0FBcEIsQ0FBcEI7QUFDQSxpQkFBS3BiLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUksaURBQUosQ0FBWSxLQUFLTCxVQUFqQixFQUE2QixDQUFDLEdBQUQsR0FBT29iLEdBQUcsR0FBRyxLQUFLb0gsUUFBL0MsRUFBeUQsT0FBT3ZuQixHQUFHLEdBQUcsS0FBS3VuQixRQUEzRSxFQUFxRixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXJGLEVBQStGLEtBQUtILFNBQXBHLEVBQStHLEtBQUt2bUIsR0FBcEgsRUFBeUgsQ0FBekgsRUFBNEgrbUIsSUFBNUgsRUFBa0lDLGFBQWxJLENBQTFCO0FBQ0g7QUFDSjtBQUNKOztBQUNELFdBQUs5VyxXQUFMO0FBQ0g7Ozt1Q0FFa0I7QUFDZnhNLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHlCQUFaO0FBQ0FELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUt1ZSxHQUFMLENBQVMsQ0FBVCxFQUFZM2dCLE1BQVosR0FBcUIsS0FBckIsR0FBNkIsS0FBSzJnQixHQUFMLENBQVMzZ0IsTUFBbEQ7O0FBQ0EsV0FBSyxJQUFJK2QsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsR0FBRyxLQUFLNEMsR0FBTCxDQUFTLENBQVQsRUFBWTNnQixNQUFwQyxFQUE0QytkLEdBQUcsRUFBL0MsRUFBbUQ7QUFDL0MsYUFBSyxJQUFJbmdCLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUcsS0FBSytpQixHQUFMLENBQVMzZ0IsTUFBakMsRUFBeUNwQyxHQUFHLEVBQTVDLEVBQWdEO0FBQzVDLGNBQUk0bkIsSUFBSSxHQUFHLEtBQUtKLE9BQUwsQ0FBYSxLQUFLekUsR0FBTCxDQUFTL2lCLEdBQVQsRUFBY21nQixHQUFkLENBQWIsQ0FBWDs7QUFDQSxjQUFJeUgsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZCxnQkFBSUMsYUFBYSxHQUFHLEtBQUtKLGNBQUwsQ0FBb0IsS0FBSzFFLEdBQUwsQ0FBUy9pQixHQUFULEVBQWNtZ0IsR0FBZCxDQUFwQixDQUFwQjtBQUNBLGlCQUFLcGIsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSxpREFBSixDQUFZLEtBQUtMLFVBQWpCLEVBQTZCb2IsR0FBRyxHQUFHLEtBQUtvSCxRQUF4QyxFQUFrRHZuQixHQUFHLEdBQUcsS0FBS3VuQixRQUE3RCxFQUF1RSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXZFLEVBQWlGLEtBQUtILFNBQXRGLEVBQWlHLEtBQUt2bUIsR0FBdEcsRUFBMkcsQ0FBM0csRUFBOEcrbUIsSUFBOUcsRUFBb0hDLGFBQXBILENBQTFCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7OztnQ0FFV0MsVSxFQUFZO0FBQ3BCLFVBQUlBLFVBQVUsS0FBSyxDQUFDLENBQXBCLEVBQXVCO0FBQ25CLGFBQUtDLFNBQUw7QUFDQSxhQUFLRyxTQUFMO0FBQ0EsYUFBS0MsU0FBTDtBQUNBLGFBQUtDLFNBQUw7QUFDSCxPQUxELE1BTUs7QUFDRCxZQUFJTixVQUFVLEtBQUssQ0FBbkIsRUFBc0I7QUFDbEIsZUFBS0MsU0FBTDtBQUNIOztBQUNELFlBQUlELFVBQVUsS0FBSyxDQUFuQixFQUFzQjtBQUNsQixlQUFLSSxTQUFMO0FBQ0g7O0FBQ0QsWUFBSUosVUFBVSxLQUFLLENBQW5CLEVBQXNCO0FBQ2xCLGVBQUtLLFNBQUw7QUFDSDs7QUFDRCxZQUFJTCxVQUFVLEtBQUssQ0FBbkIsRUFBc0I7QUFDbEIsZUFBS00sU0FBTDtBQUNIO0FBQ0o7QUFDSjtBQUVEOzs7O2dDQUNZO0FBQ1IsV0FBS3BZLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQTs7QUFFQTs7QUFDQSxVQUFJcVksS0FBSyxHQUFHLElBQUksOENBQUosQ0FBUyxLQUFLdGpCLFVBQWQsRUFBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsRUFBc0MsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBdEMsRUFBcUYsS0FBS3RELEdBQTFGLENBQVo7QUFDQXduQixXQUFLLENBQUNwVSxRQUFOLEdBQWlCLEVBQWpCO0FBQ0FvVSxXQUFLLENBQUN6aEIsV0FBTixDQUFrQixDQUFsQixJQUF1QixJQUF2QjtBQUNBLFdBQUs3QixVQUFMLENBQWdCSyxTQUFoQixDQUEwQmlqQixLQUExQjtBQUNBLFdBQUt0akIsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSw4Q0FBSixDQUFTLEtBQUtMLFVBQWQsRUFBMEIsR0FBMUIsRUFBK0IsSUFBL0IsRUFBcUMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBckMsRUFBb0YsS0FBS3RELEdBQXpGLEVBQThGLENBQTlGLEVBQWlHLEVBQWpHLEVBQXFHLEVBQXJHLEVBQXlHLENBQUMsR0FBRCxFQUFNLElBQU4sQ0FBekcsQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSw4Q0FBSixDQUFTLEtBQUtMLFVBQWQsRUFBMEIsSUFBMUIsRUFBZ0MsR0FBaEMsRUFBcUMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBckMsRUFBb0YsS0FBS3RELEdBQXpGLEVBQThGLENBQTlGLEVBQWlHLEVBQWpHLEVBQXFHLEVBQXJHO0FBQXlHO0FBQW1CLFNBQTVIO0FBQWlJO0FBQXFCLE9BQXRKLENBQTFCO0FBQ0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUksOENBQUosQ0FBUyxLQUFLTCxVQUFkLEVBQTBCLElBQTFCLEVBQWdDLElBQWhDLEVBQXNDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBQXRDLEVBQXFGLEtBQUt0RCxHQUExRixFQUErRixDQUEvRixFQUFrRyxFQUFsRyxFQUFzRyxFQUF0RztBQUN0QjtBQUFlLE9BQUMsR0FBRCxFQUFNLElBQU4sQ0FETztBQUNNO0FBQXFCLFVBRDNCLEVBQ2lDLENBQUMsQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLENBQUQsRUFBYyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWQsQ0FEakMsQ0FBMUI7QUFFQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSx1REFBSixDQUFrQixLQUFLTCxVQUF2QixFQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxFQUErQyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUEvQyxFQUE4RixLQUFLdEQsR0FBbkcsQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSw4Q0FBSixDQUFTLEtBQUtMLFVBQWQsRUFBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsRUFBc0MsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBdEMsRUFBcUYsS0FBS3RELEdBQTFGLENBQTFCLEVBZFEsQ0FlUjs7QUFFQTs7QUFFQTtBQUVIOzs7Z0NBRVc7QUFDUixXQUFLbVAsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtqTCxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJLDhDQUFKLENBQVMsS0FBS0wsVUFBZCxFQUEwQixJQUExQixFQUFnQyxHQUFoQyxFQUFxQyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUFyQyxFQUFvRixLQUFLdEQsR0FBekYsQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSXVSLFFBQUosQ0FBYSxLQUFLNVIsVUFBbEIsRUFBOEIsSUFBOUIsRUFBb0MsTUFBTSxJQUFJLEVBQTlDLEVBQWtELEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBQWxELEVBQWlHLEtBQUt0RCxHQUF0RyxFQUEyRyxDQUEzRyxFQUE4RyxDQUE5RyxFQUFpSCxDQUFqSCxFQUFvSCxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FBcEgsRUFBNkgsRUFBN0gsRUFBaUksR0FBakksRUFBc0ksRUFBdEksQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSXVSLFFBQUosQ0FBYSxLQUFLNVIsVUFBbEIsRUFBOEIsT0FBTyxFQUFyQyxFQUF5QyxNQUFNLElBQUksRUFBbkQsRUFBdUQsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBdkQsRUFBc0csS0FBS3RELEdBQTNHLEVBQWdILENBQWhILEVBQW1ILENBQW5ILEVBQXNILENBQXRILEVBQXlILENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUF6SCxFQUFrSSxFQUFsSSxFQUFzSSxHQUF0SSxFQUEySSxFQUEzSSxDQUExQjtBQUNBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJdVIsUUFBSixDQUFhLEtBQUs1UixVQUFsQixFQUE4QixJQUE5QixFQUFvQyxPQUFPLElBQUksRUFBL0MsRUFBbUQsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBbkQsRUFBa0csS0FBS3RELEdBQXZHLEVBQTRHLENBQTVHLEVBQStHLENBQS9HLEVBQWtILENBQWxILEVBQXFILENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUFySCxFQUE4SCxFQUE5SCxFQUFrSSxHQUFsSSxFQUF1SSxFQUF2SSxDQUExQjtBQUNIOzs7Z0NBRVc7QUFDUixXQUFLbVAsVUFBTCxHQUFrQixDQUFsQjtBQUNBOztBQUNBLFdBQUtqTCxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJLG9EQUFKLENBQWUsS0FBS0wsVUFBcEIsRUFBZ0MsSUFBaEMsRUFBc0MsR0FBdEMsRUFBMkMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixvQkFBM0IsQ0FBM0MsRUFBNkYsS0FBS3RELEdBQWxHLEVBQXVHLEVBQXZHLEVBQTJHLENBQTNHLEVBQThHLENBQTlHLEVBQWlILEVBQWpILENBQTFCO0FBQ0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUksb0RBQUosQ0FBZSxLQUFLTCxVQUFwQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxFQUE0QyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLG9CQUEzQixDQUE1QyxFQUE4RixLQUFLdEQsR0FBbkcsRUFBd0csRUFBeEcsRUFBNEcsQ0FBNUcsRUFBK0csQ0FBL0csRUFBa0gsRUFBbEgsQ0FBMUI7QUFFQTs7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSTZQLFFBQUosQ0FBYSxLQUFLbFEsVUFBbEIsRUFBOEIsSUFBOUIsRUFBb0MsT0FBTyxHQUEzQyxFQUFnRCxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUFoRCxFQUErRixLQUFLdEQsR0FBcEcsRUFBeUcsQ0FBekc7QUFDTjtBQUFhLFFBRFA7QUFDVztBQUFVLFFBRHJCLENBQTFCO0FBRUEsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUk2UCxRQUFKLENBQWEsS0FBS2xRLFVBQWxCLEVBQThCLElBQTlCLEVBQW9DLE9BQU8sR0FBM0MsRUFBZ0QsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBaEQsRUFBK0YsS0FBS3RELEdBQXBHLEVBQXlHLENBQXpHO0FBQ047QUFBYSxRQURQO0FBQ1c7QUFBVSxRQURyQjtBQUN5QjtBQUFXLFFBRHBDLENBQTFCO0FBRUEsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUlzUSxNQUFKLENBQVcsS0FBSzNRLFVBQWhCLEVBQTRCLElBQTVCLEVBQ3RCLE9BQU8sRUFEZSxFQUNYLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBRFcsRUFDb0MsS0FBS3RELEdBRHpDLEVBQzhDLENBRDlDLEVBQ2lELElBRGpELEVBQ3VELEtBQUssQ0FENUQsRUFDK0QsQ0FEL0QsRUFDa0UsQ0FEbEUsQ0FBMUI7QUFFQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSXNRLE1BQUosQ0FBVyxLQUFLM1EsVUFBaEIsRUFBNEIsSUFBNUIsRUFDdEIsT0FBTyxFQURlLEVBQ1gsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FEVyxFQUNvQyxLQUFLdEQsR0FEekMsRUFDOEMsQ0FEOUMsRUFDaUQsSUFEakQsRUFDdUQsS0FBSyxDQUQ1RCxFQUMrRCxFQUQvRCxFQUNtRSxDQURuRSxDQUExQjtBQUVBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJc1EsTUFBSixDQUFXLEtBQUszUSxVQUFoQixFQUE0QixJQUE1QixFQUV0QixPQUFPLEVBRmUsRUFFWCxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUZXLEVBRW9DLEtBQUt0RCxHQUZ6QyxFQUU4QyxDQUY5QyxFQUVpRCxJQUZqRCxFQUV1RCxLQUFLLEdBRjVELEVBRWlFLEVBRmpFLEVBRXFFLENBRnJFLENBQTFCO0FBR0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUlzUSxNQUFKLENBQVcsS0FBSzNRLFVBQWhCLEVBQTRCLElBQTVCLEVBQ3RCLE1BQU0sRUFEZ0IsRUFDWixLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQURZLEVBQ21DLEtBQUt0RCxHQUR4QyxFQUM2QyxDQUQ3QyxFQUNnRCxJQURoRCxFQUNzRCxLQUFLLEdBRDNELEVBQ2dFLENBRGhFLEVBQ21FLENBRG5FLENBQTFCO0FBRUEsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUlzUSxNQUFKLENBQVcsS0FBSzNRLFVBQWhCLEVBQTRCLElBQTVCLEVBQ3RCLE1BQU0sRUFEZ0IsRUFDWixLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQURZLEVBQ21DLEtBQUt0RCxHQUR4QyxFQUM2QyxDQUQ3QyxFQUNnRCxJQURoRCxFQUNzRCxLQUFLLENBRDNELEVBQzhELEVBRDlELEVBQ2tFLEVBRGxFLENBQTFCO0FBR0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUl1UixRQUFKLENBQWEsS0FBSzVSLFVBQWxCLEVBQThCLElBQTlCLEVBQW9DLENBQUMsR0FBckMsRUFBMEMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBMUMsRUFBeUYsS0FBS3RELEdBQTlGLEVBQW1HLENBQW5HLEVBQXNHLENBQXRHLEVBQXlHLENBQXpHLEVBQTRHLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBNUcsRUFBb0gsR0FBcEgsRUFBeUgsR0FBekgsQ0FBMUI7QUFFQTs7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSw4Q0FBSixDQUFTLEtBQUtMLFVBQWQsRUFBMEIsSUFBMUIsRUFBZ0MsQ0FBQyxHQUFqQyxFQUFzQyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUF0QyxFQUFxRixLQUFLdEQsR0FBMUYsRUFBK0YsQ0FBL0YsRUFBa0csRUFBbEcsRUFBc0csRUFBdEcsRUFDdEIsQ0FBQyxFQUFELEVBQUssSUFBTCxDQURzQixFQUNWLElBRFUsRUFDSixDQUFDLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxDQUFELEVBQWMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFkLENBREksQ0FBMUI7QUFHQTs7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSxvREFBSixDQUFlLEtBQUtMLFVBQXBCLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDLEVBQTRDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsb0JBQTNCLENBQTVDLEVBQThGLEtBQUt0RCxHQUFuRyxFQUF3RyxFQUF4RyxFQUE0RyxDQUE1RyxFQUErRyxDQUEvRyxFQUFrSCxFQUFsSCxDQUExQjtBQUNBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJLG9EQUFKLENBQWUsS0FBS0wsVUFBcEIsRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsRUFBNEMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixvQkFBM0IsQ0FBNUMsRUFBOEYsS0FBS3RELEdBQW5HLEVBQXdHLEVBQXhHLEVBQTRHLENBQTVHLEVBQStHLENBQS9HLEVBQWtILEVBQWxILENBQTFCO0FBRUE7O0FBQ0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUkwUCxJQUFKLENBQVMsS0FBSy9QLFVBQWQsRUFBMEIsSUFBMUIsRUFBZ0MsT0FBTyxHQUF2QyxFQUE0QyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUE1QyxFQUEyRixLQUFLdEQsR0FBaEcsRUFBcUcsQ0FBckcsRUFBd0csR0FBeEcsQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSTBQLElBQUosQ0FBUyxLQUFLL1AsVUFBZCxFQUEwQixJQUExQixFQUFnQyxPQUFPLEdBQXZDLEVBQTRDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBQTVDLEVBQTJGLEtBQUt0RCxHQUFoRyxFQUFxRyxDQUFyRyxFQUF3RyxHQUF4RyxDQUExQjtBQUNBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJMFAsSUFBSixDQUFTLEtBQUsvUCxVQUFkLEVBQTBCLElBQTFCLEVBQWdDLE9BQU8sR0FBdkMsRUFBNEMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBNUMsRUFBMkYsS0FBS3RELEdBQWhHLEVBQXFHLENBQXJHLEVBQXdHLEdBQXhHLENBQTFCO0FBQ0g7OztnQ0FFVztBQUNSLFdBQUttUCxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBSXNZLFlBQVksR0FBRyxDQUFDLFFBQVEsRUFBVCxFQUFhLE1BQU0sRUFBbkIsQ0FBbkI7QUFDQSxVQUFJQyxZQUFZLEdBQUcsQ0FDZixDQUFDLENBQUQsRUFBSSxDQUFKLENBRGUsRUFFZixDQUFDLElBQUksR0FBSixHQUFVLEdBQVgsRUFBZ0IsSUFBSSxDQUFDLEdBQXJCLENBRmUsRUFHZixDQUFDLElBQUksR0FBSixHQUFVLEdBQVgsRUFBZ0IsSUFBSSxDQUFDLEdBQXJCLENBSGUsRUFJZixDQUFDLElBQUksR0FBSixHQUFVLEdBQVgsRUFBZ0IsSUFBSSxDQUFDLEdBQXJCLENBSmUsRUFLZixDQUFDLElBQUksR0FBSixHQUFVLEdBQVgsRUFBZ0IsSUFBSSxDQUFDLEdBQXJCLENBTGUsRUFNZixDQUFDLElBQUksR0FBSixHQUFVLEdBQVgsRUFBZ0IsSUFBSSxDQUFDLEdBQXJCLENBTmUsRUFPZixDQUFDLElBQUksR0FBSixHQUFVLEVBQVgsRUFBZSxDQUFDLENBQUQsR0FBSyxDQUFDLEdBQXJCLENBUGUsRUFRZixDQUFDLElBQUksR0FBSixHQUFVLEdBQVgsRUFBZ0IsQ0FBQyxDQUFELEdBQUssQ0FBQyxHQUF0QixDQVJlLEVBU2YsQ0FBQyxJQUFJLEdBQUosR0FBVSxHQUFYLEVBQWdCLElBQUksQ0FBQyxFQUFyQixDQVRlLENBQW5CO0FBV0EsVUFBSS9sQixDQUFDLEdBQUcsQ0FBUjtBQUNBLFVBQUk4TixJQUFJLEdBQUcsRUFBWDtBQUNBOztBQUNBLFVBQUlrWSxPQUFPLEdBQUcsSUFBSTlTLE1BQUosQ0FBVyxLQUFLM1EsVUFBaEIsRUFBNEJ1akIsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQkMsWUFBWSxDQUFDL2xCLENBQUQsQ0FBWixDQUFnQixDQUFoQixDQUE5QyxFQUFrRThsQixZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCQyxZQUFZLENBQUMvbEIsQ0FBQyxFQUFGLENBQVosQ0FBa0IsQ0FBbEIsQ0FBcEYsRUFDVixLQUFLNEssWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQURVLEVBQ3FDLEtBQUt0RCxHQUQxQyxFQUMrQyxDQUQvQyxFQUNrRCxJQURsRCxFQUVWeVAsSUFGVSxFQUVKLEVBRkksRUFFQSxDQUZBLEVBRUcsQ0FGSCxDQUFkO0FBSUEsVUFBSW1ZLE9BQU8sR0FBRyxJQUFJL1MsTUFBSixDQUFXLEtBQUszUSxVQUFoQixFQUE0QnVqQixZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCQyxZQUFZLENBQUMvbEIsQ0FBRCxDQUFaLENBQWdCLENBQWhCLENBQTlDLEVBQWtFOGxCLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0JDLFlBQVksQ0FBQy9sQixDQUFDLEVBQUYsQ0FBWixDQUFrQixDQUFsQixDQUFwRixFQUNWLEtBQUs0SyxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBRFUsRUFDcUMsS0FBS3RELEdBRDFDLEVBQytDLENBRC9DLEVBQ2tELElBRGxELEVBRVZ5UCxJQUZVLEVBRUosRUFGSSxFQUVBLENBRkEsRUFFRyxDQUZILENBQWQ7QUFJQSxVQUFJb1ksT0FBTyxHQUFHLElBQUloVCxNQUFKLENBQVcsS0FBSzNRLFVBQWhCLEVBQTRCdWpCLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0JDLFlBQVksQ0FBQy9sQixDQUFELENBQVosQ0FBZ0IsQ0FBaEIsQ0FBOUMsRUFBa0U4bEIsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQkMsWUFBWSxDQUFDL2xCLENBQUMsRUFBRixDQUFaLENBQWtCLENBQWxCLENBQXBGLEVBQ1YsS0FBSzRLLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FEVSxFQUNxQyxLQUFLdEQsR0FEMUMsRUFDK0MsQ0FEL0MsRUFDa0QsSUFEbEQsRUFFVnlQLElBRlUsRUFFSixFQUZJLEVBRUEsQ0FGQSxFQUVHLENBRkgsQ0FBZDtBQUlBLFVBQUlxWSxPQUFPLEdBQUcsSUFBSWpULE1BQUosQ0FBVyxLQUFLM1EsVUFBaEIsRUFBNEJ1akIsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQkMsWUFBWSxDQUFDL2xCLENBQUQsQ0FBWixDQUFnQixDQUFoQixDQUE5QyxFQUFrRThsQixZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCQyxZQUFZLENBQUMvbEIsQ0FBQyxFQUFGLENBQVosQ0FBa0IsQ0FBbEIsQ0FBcEYsRUFDVixLQUFLNEssWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQURVLEVBQ3FDLEtBQUt0RCxHQUQxQyxFQUMrQyxDQUQvQyxFQUNrRCxJQURsRCxFQUVWeVAsSUFGVSxFQUVKLEVBRkksRUFFQSxDQUZBLEVBRUcsQ0FGSCxDQUFkO0FBSUEsVUFBSXNZLE9BQU8sR0FBRyxJQUFJbFQsTUFBSixDQUFXLEtBQUszUSxVQUFoQixFQUE0QnVqQixZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCQyxZQUFZLENBQUMvbEIsQ0FBRCxDQUFaLENBQWdCLENBQWhCLENBQTlDLEVBQWtFOGxCLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0JDLFlBQVksQ0FBQy9sQixDQUFDLEVBQUYsQ0FBWixDQUFrQixDQUFsQixDQUFwRixFQUNWLEtBQUs0SyxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBRFUsRUFDcUMsS0FBS3RELEdBRDFDLEVBQytDLENBRC9DLEVBQ2tELElBRGxELEVBRVZ5UCxJQUZVLEVBRUosRUFGSSxFQUVBLENBRkEsRUFFRyxDQUZILENBQWQ7QUFJQSxVQUFJdVksT0FBTyxHQUFHLElBQUluVCxNQUFKLENBQVcsS0FBSzNRLFVBQWhCLEVBQTRCdWpCLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0JDLFlBQVksQ0FBQy9sQixDQUFELENBQVosQ0FBZ0IsQ0FBaEIsQ0FBOUMsRUFBa0U4bEIsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQkMsWUFBWSxDQUFDL2xCLENBQUMsRUFBRixDQUFaLENBQWtCLENBQWxCLENBQXBGLEVBQ1YsS0FBSzRLLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FEVSxFQUNxQyxLQUFLdEQsR0FEMUMsRUFDK0MsQ0FEL0MsRUFDa0QsSUFEbEQsRUFFVnlQLElBRlUsRUFFSixFQUZJLEVBRUEsQ0FGQSxFQUVHLENBRkgsQ0FBZDtBQUlBLFVBQUl3WSxPQUFPLEdBQUcsSUFBSXBULE1BQUosQ0FBVyxLQUFLM1EsVUFBaEIsRUFBNEJ1akIsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQkMsWUFBWSxDQUFDL2xCLENBQUQsQ0FBWixDQUFnQixDQUFoQixDQUE5QyxFQUFrRThsQixZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCQyxZQUFZLENBQUMvbEIsQ0FBQyxFQUFGLENBQVosQ0FBa0IsQ0FBbEIsQ0FBcEYsRUFDVixLQUFLNEssWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQURVLEVBQ3FDLEtBQUt0RCxHQUQxQyxFQUMrQyxDQUQvQyxFQUNrRCxJQURsRCxFQUVWeVAsSUFGVSxFQUVKLEVBRkksRUFFQSxDQUZBLEVBRUcsQ0FGSCxDQUFkO0FBSUEsVUFBSXlZLE9BQU8sR0FBRyxJQUFJclQsTUFBSixDQUFXLEtBQUszUSxVQUFoQixFQUE0QnVqQixZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCQyxZQUFZLENBQUMvbEIsQ0FBRCxDQUFaLENBQWdCLENBQWhCLENBQTlDLEVBQWtFOGxCLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0JDLFlBQVksQ0FBQy9sQixDQUFDLEVBQUYsQ0FBWixDQUFrQixDQUFsQixDQUFwRixFQUNWLEtBQUs0SyxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBRFUsRUFDcUMsS0FBS3RELEdBRDFDLEVBQytDLENBRC9DLEVBQ2tELElBRGxELEVBRVZ5UCxJQUZVLEVBRUosRUFGSSxFQUVBLENBRkEsRUFFRyxDQUZILENBQWQ7QUFJQSxVQUFJMFksT0FBTyxHQUFHLElBQUl0VCxNQUFKLENBQVcsS0FBSzNRLFVBQWhCLEVBQTRCdWpCLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0JDLFlBQVksQ0FBQy9sQixDQUFELENBQVosQ0FBZ0IsQ0FBaEIsQ0FBOUMsRUFBa0U4bEIsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQkMsWUFBWSxDQUFDL2xCLENBQUMsRUFBRixDQUFaLENBQWtCLENBQWxCLENBQXBGLEVBQ1YsS0FBSzRLLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FEVSxFQUNxQyxLQUFLdEQsR0FEMUMsRUFDK0MsQ0FEL0MsRUFDa0QsSUFEbEQsRUFFVnlQLElBRlUsRUFFSixDQUZJLEVBRUQsQ0FGQyxFQUVFLENBRkYsQ0FBZCxDQWpEUSxDQW9EUjs7QUFJQTs7QUFDQSxXQUFLdkwsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSSw4Q0FBSixDQUFTLEtBQUtMLFVBQWQsRUFBMEIsS0FBMUIsRUFBaUMsR0FBakMsRUFBc0MsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBdEMsRUFBcUYsS0FBS3RELEdBQTFGLEVBQStGLENBQS9GLEVBQWtHLEVBQWxHLEVBQXNHLEVBQXRHLEVBQ3RCLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FEc0IsRUFDVixJQURVLEVBQ0osQ0FBQyxDQUFDLENBQUMsSUFBRixFQUFRLENBQVIsQ0FBRCxFQUFhLENBQUMsQ0FBQyxHQUFGLEVBQU8sQ0FBQyxHQUFSLENBQWIsQ0FESSxDQUExQjtBQUdBOztBQUVBOztBQUNBLFdBQUtrRSxVQUFMLENBQWdCSyxTQUFoQixDQUEwQixJQUFJMFAsSUFBSixDQUFTLEtBQUsvUCxVQUFkLEVBQTBCLEtBQTFCLEVBQWlDLE9BQU8sR0FBeEMsRUFBNkMsS0FBS3FJLFlBQUwsQ0FBa0JqSixRQUFsQixDQUEyQixpQkFBM0IsQ0FBN0MsRUFBNEYsS0FBS3RELEdBQWpHLEVBQXNHLENBQXRHLEVBQXlHLEdBQXpHLENBQTFCO0FBQ0EsV0FBS2tFLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCLElBQUkwUCxJQUFKLENBQVMsS0FBSy9QLFVBQWQsRUFBMEIsS0FBMUIsRUFBaUMsT0FBTyxHQUF4QyxFQUE2QyxLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQUE3QyxFQUE0RixLQUFLdEQsR0FBakcsRUFBc0csQ0FBdEcsRUFBeUcsR0FBekcsQ0FBMUI7QUFDQSxXQUFLa0UsVUFBTCxDQUFnQkssU0FBaEIsQ0FBMEIsSUFBSTBQLElBQUosQ0FBUyxLQUFLL1AsVUFBZCxFQUEwQixLQUExQixFQUFpQyxPQUFPLEdBQXhDLEVBQTZDLEtBQUtxSSxZQUFMLENBQWtCakosUUFBbEIsQ0FBMkIsaUJBQTNCLENBQTdDLEVBQTRGLEtBQUt0RCxHQUFqRyxFQUFzRyxDQUF0RyxFQUF5RyxHQUF6RyxDQUExQjtBQUNBLFVBQUlvb0IsWUFBWSxHQUFHLElBQUl2VCxNQUFKLENBQVcsS0FBSzNRLFVBQWhCLEVBQTRCLFFBQVEsRUFBcEMsRUFDZixPQUFPLEVBRFEsRUFDSixLQUFLcUksWUFBTCxDQUFrQmpKLFFBQWxCLENBQTJCLGlCQUEzQixDQURJLEVBQzJDLEtBQUt0RCxHQURoRCxFQUNxRCxDQURyRCxFQUN3RCxJQUR4RCxFQUM4RCxLQUFLLENBRG5FLEVBQ3NFLEtBQUssQ0FEM0UsRUFDOEUsQ0FEOUUsRUFDaUYsQ0FEakYsQ0FBbkI7QUFFSDs7Ozs7O0lBR0N5bUIsTTs7Ozs7QUFDRixrQkFBWTNoQixJQUFaLEVBQWtCN0UsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQTJFO0FBQUE7O0FBQUEsUUFBbkQwQixHQUFtRCx1RUFBN0MsSUFBNkM7QUFBQSxRQUF2QzVCLEdBQXVDLHVFQUFqQyxJQUFpQztBQUFBLFFBQTNCUixLQUEyQix1RUFBbkIsSUFBbUI7QUFBQSxRQUFiVyxXQUFhOztBQUFBOztBQUN2RSxnRkFBTTJFLElBQU4sRUFBWTdFLENBQVosRUFBZUMsQ0FBZixFQUFrQjBCLEdBQWxCLEVBQXVCNUIsR0FBdkI7QUFDQSxVQUFLaUYsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFVBQUsySSxJQUFMLEdBQVksUUFBWixDQUh1RSxDQUl2RTs7QUFDQSxVQUFLcE8sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS3VGLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsVUFBS1ksT0FBTCxHQUFlM0YsQ0FBQyxHQUFLLE1BQUs4RSxXQUFMLEdBQW1CLE1BQUt2RixLQUF6QixHQUFrQyxDQUF2QyxHQUE0QyxNQUFLdUYsV0FBaEU7QUFDQSxVQUFLYyxVQUFMLEdBQWtCLE1BQUtyRyxLQUFMLEdBQWEsQ0FBYixHQUFpQixDQUFuQztBQUNBLFVBQUtzRyxXQUFMLEdBQW1CLE1BQUt0RyxLQUFMLEdBQWEsQ0FBYixHQUFpQixDQUFwQztBQUNBLFVBQUs4RixNQUFMLEdBQWMsTUFBS00sT0FBTCxHQUFlLE1BQUtwRyxLQUFMLEdBQWEsQ0FBMUM7QUFDQSxVQUFLK0YsTUFBTCxHQUFjLE1BQUtyRixDQUFMLEdBQVMsTUFBSzhFLFlBQUwsR0FBb0IsTUFBS3hGLEtBQXpCLEdBQWlDLENBQTFDLEdBQThDLElBQUksTUFBS0EsS0FBckU7QUFFQSxVQUFLOFQsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFVBQUtFLGFBQUwsR0FBcUIsQ0FBckI7QUFFQSxVQUFLck8sTUFBTCxHQUFjO0FBQ1YscUJBQWVoRixXQURMO0FBRVYsZ0JBQVU7QUFGQSxLQUFkO0FBSUEsVUFBS2lGLFVBQUwsR0FBa0I7QUFDZCxnQkFBVSxJQUFJLGtEQUFKLENBQWMsTUFBS3hELEdBQW5CLEVBQXdCLENBQUMsTUFBS21ELFdBQU4sRUFBbUIsTUFBS0MsWUFBeEIsQ0FBeEIsRUFBK0QsRUFBL0QsRUFBbUUsQ0FBbkUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsS0FBNUUsRUFBbUYsTUFBS3hGLEtBQXhGO0FBREksS0FBbEI7QUFHQSxVQUFLNkYsU0FBTCxHQUFpQixNQUFLRCxVQUFMLENBQWdCMkQsTUFBakM7QUF4QnVFO0FBeUIxRTtBQUVEOzs7Ozs2QkFDUztBQUNMLFVBQUksS0FBSzVELE1BQUwsQ0FBWTRELE1BQWhCLEVBQXdCO0FBQ3BCLFlBQUksS0FBSzFELFNBQUwsQ0FBZWpGLE1BQWYsRUFBSixFQUE2QjtBQUN6QixlQUFLK0UsTUFBTCxDQUFZNEQsTUFBWixHQUFxQixLQUFyQjtBQUNBLGVBQUsxRCxTQUFMLENBQWVxQixLQUFmO0FBQ0EsZUFBSzhNLGFBQUwsR0FBcUIsS0FBS0YsUUFBMUI7QUFDSDtBQUNKLE9BTkQsTUFPSyxJQUFJLEtBQUtFLGFBQUwsR0FBcUIsQ0FBekIsRUFBNEI7QUFDN0IsYUFBS0EsYUFBTDtBQUNILE9BRkksTUFHQTtBQUNELGFBQUtyTyxNQUFMLENBQVk0RCxNQUFaLEdBQXFCLElBQXJCO0FBQ0g7QUFFSjs7OzZCQUVRZCxLLEVBQU9DLFMsRUFBVyxDQUN2QjtBQUNIOzs7Z0NBRVdsSSxHLEVBQUs7QUFDYkEsU0FBRyxDQUFDb0ksU0FBSjtBQUNBcEksU0FBRyxDQUFDcUksV0FBSixHQUFrQixPQUFsQjtBQUNBckksU0FBRyxDQUFDc0ksSUFBSixDQUFTLEtBQUtoRCxNQUFkLEVBQ0ksS0FBS0MsTUFEVCxFQUVJLEtBQUtNLFVBRlQsRUFFcUIsS0FBS0MsV0FGMUI7QUFHQTlGLFNBQUcsQ0FBQ3VJLE1BQUo7QUFDQXZJLFNBQUcsQ0FBQ3dJLFNBQUo7QUFDSDs7O3lCQUVJeEksRyxFQUFLO0FBQ04sVUFBSSxLQUFLbUYsTUFBTCxDQUFZNEQsTUFBaEIsRUFBd0I7QUFDcEIsYUFBSzFELFNBQUwsR0FBaUIsS0FBS0QsVUFBTCxDQUFnQjJELE1BQWpDO0FBQ0EsYUFBS25CLE9BQUwsQ0FBYTVILEdBQWI7QUFDSDtBQUNKOzs7NEJBRU9BLEcsRUFBSztBQUNULFdBQUtxRixTQUFMLENBQWVvRCxTQUFmLENBQXlCLENBQXpCLEVBQTRCekksR0FBNUIsRUFBaUMsS0FBS0MsQ0FBdEMsRUFBeUMsS0FBS0MsQ0FBOUMsRUFBaUQsS0FBS2lGLE1BQUwsQ0FBWWhGLFdBQTdEOztBQUNBLFVBQUksS0FBSzJFLElBQUwsQ0FBVTRELFNBQWQsRUFBeUI7QUFDckIsYUFBS0MsV0FBTCxDQUFpQjNJLEdBQWpCO0FBQ0g7QUFDSjs7OztFQXhFZ0IsZ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3JjZnFvQixLOzs7QUFFRixtQkFBYztBQUFBOztBQUNWLFNBQUtDLE1BQUwsR0FBYztBQUNWLG1CQUFhLElBQUlySCxLQUFKLENBQVUsbUJBQVYsQ0FESDtBQUVWLG9CQUFjLElBQUlBLEtBQUosQ0FBVSx3QkFBVixDQUZKO0FBR1YscUJBQWUsSUFBSUEsS0FBSixDQUFVLHFCQUFWLENBSEw7QUFJVixvQkFBYyxJQUFJQSxLQUFKLENBQVUsd0JBQVYsQ0FKSjtBQUtWLGtCQUFZLElBQUlBLEtBQUosQ0FBVSxzQkFBVixDQUxGO0FBTVYsc0JBQWdCLElBQUlBLEtBQUosQ0FBVSwwQkFBVixDQU5OO0FBT1YseUJBQW1CLElBQUlBLEtBQUosQ0FBVSw2QkFBVixDQVBUO0FBUVYscUJBQWUsSUFBSUEsS0FBSixDQUFVLHlCQUFWLENBUkw7QUFTVixtQkFBYSxJQUFJQSxLQUFKLENBQVUsdUJBQVYsQ0FUSDtBQVVWLHNCQUFnQixJQUFJQSxLQUFKLENBQVUsMEJBQVYsQ0FWTjtBQVdWLHFCQUFlLElBQUlBLEtBQUosQ0FBVSx5QkFBVixDQVhMO0FBWVYsdUJBQWlCLElBQUlBLEtBQUosQ0FBVSxpQkFBVjtBQVpQLEtBQWQ7QUFlQSxRQUFJc0gsTUFBTSxHQUFHLENBQWI7O0FBQ0EsU0FBSyxJQUFJcmMsS0FBVCxJQUFrQixLQUFLb2MsTUFBdkIsRUFBK0I7QUFDM0IsVUFBSSxLQUFLQSxNQUFMLENBQVl0VSxjQUFaLENBQTJCOUgsS0FBM0IsQ0FBSixFQUF1QztBQUNuQyxhQUFLb2MsTUFBTCxDQUFZcGMsS0FBWixJQUFxQjtBQUNqQixxQkFBVyxDQURNO0FBRWpCLGlCQUFPcWMsTUFGVTtBQUdqQixvQkFBVSxLQUFLQyxlQUFMLENBQXFCdGMsS0FBckIsRUFBNEJxYyxNQUE1QjtBQUhPLFNBQXJCO0FBS0g7QUFDSjtBQUNKO0FBR0Q7Ozs7O29DQUNnQnJjLEssRUFBZ0I7QUFBQSxVQUFUdWMsS0FBUyx1RUFBSCxDQUFHO0FBQzVCLFVBQUlDLFVBQVUsR0FBRyxLQUFLSixNQUFMLENBQVlwYyxLQUFaLENBQWpCO0FBQ0EsVUFBSXljLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxXQUFLLElBQUlobkIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSThtQixLQUFyQixFQUE0QjltQixDQUFDLEVBQTdCLEVBQWlDO0FBQzdCLFlBQUlpbkIsS0FBSyxHQUFHRixVQUFVLENBQUNHLFNBQVgsRUFBWjtBQUNBRixrQkFBVSxDQUFDcm5CLElBQVgsQ0FBZ0JzbkIsS0FBaEI7QUFDSDs7QUFDRCxhQUFPRCxVQUFQO0FBQ0g7QUFHRDs7Ozt5QkFDS3pjLEssRUFBbUI7QUFBQSxVQUFaZ1YsTUFBWSx1RUFBTCxHQUFLO0FBQ3BCLFVBQUk0SCxLQUFLLEdBQUcsS0FBS1IsTUFBTCxDQUFZcGMsS0FBWixFQUFtQixTQUFuQixDQUFaOztBQUNBLFVBQUk0YyxLQUFLLElBQUksS0FBS1IsTUFBTCxDQUFZcGMsS0FBWixFQUFtQixLQUFuQixJQUEwQixDQUF2QyxFQUEwQztBQUN0QyxhQUFLb2MsTUFBTCxDQUFZcGMsS0FBWixFQUFtQixTQUFuQixJQUFnQyxDQUFoQztBQUNIOztBQUNELFVBQUksQ0FBQyxLQUFLb2MsTUFBTCxDQUFZcGMsS0FBWixFQUFtQixRQUFuQixFQUE2QjRjLEtBQTdCLEVBQW9DQyxLQUF6QyxFQUFnRDtBQUM1QyxhQUFLVCxNQUFMLENBQVlwYyxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCNGMsS0FBSyxHQUFDLENBQW5DLEVBQXNDMUYsV0FBdEMsR0FBb0QsQ0FBcEQ7QUFDQSxhQUFLa0YsTUFBTCxDQUFZcGMsS0FBWixFQUFtQixRQUFuQixFQUE2QjRjLEtBQUssR0FBQyxDQUFuQyxFQUFzQzVILE1BQXRDLEdBQStDQSxNQUEvQztBQUNBLGFBQUtvSCxNQUFMLENBQVlwYyxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCNGMsS0FBSyxHQUFDLENBQW5DLEVBQXNDM2MsSUFBdEM7QUFDQSxhQUFLbWMsTUFBTCxDQUFZcGMsS0FBWixFQUFtQixTQUFuQixLQUFpQyxDQUFqQztBQUNILE9BTEQsTUFLTztBQUNILGFBQUtvYyxNQUFMLENBQVlwYyxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCNGMsS0FBN0IsRUFBb0MxRixXQUFwQyxHQUFrRCxDQUFsRDtBQUNBLGFBQUtrRixNQUFMLENBQVlwYyxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCNGMsS0FBN0IsRUFBb0M1SCxNQUFwQyxHQUE2Q0EsTUFBN0M7QUFDQSxhQUFLb0gsTUFBTCxDQUFZcGMsS0FBWixFQUFtQixRQUFuQixFQUE2QjRjLEtBQTdCLEVBQW9DM2MsSUFBcEM7QUFDSDtBQUdKOzs7Ozs7QUFHVSwrREFBQWtjLEtBQWYsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi9hc3NldC1tYW5hZ2VyXCJcblxuXG4vKioqKioqKioqKioqKipcbkFuaW1hdGlvbiBjbGFzc1xuXG5Qcm9wZXJ0aWVzOlxuc3ByaXRlU2hlZXQgLSBhbiBJbWFnZSBvYmplY3Qgb2YgdGhpcyBhbmltYXRpb24ncyBzcHJpdGVzaGVldC5cbmZyYW1lRGltZW5zaW9uc1t3aWR0aCwgaGVpZ2h0XSAtIGFuIGFycmF5IG9mIGxlbmd0aCAyLCBkZW5vdGluZyB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiBcbiAgICBvbmUgZnJhbWUgaW4gdGhlIHNlcmllcy5cbnJvdyAtIGFuIGludGVnZXIgZGVub3RpbmcgdGhlIHJvdyAoYmVnaW5uaW5nIHdpdGggMCkgb2YgdGhlIHNwcml0ZXNoZWV0IHRvIHBsYXkuXG5zaGVldFdpZHRoIC0gYW4gaW50ZWdlciBkZW5vdGluZyB0aGUgbnVtYmVyIG9mIGZyYW1lcyBpbiBvbmUgcm93LiBJZiBzaGVldFdpZHRoIGlzIGdyZWF0ZXJcbiAgICB0aGFuIHRoaXMgQW5pbWF0aW9uJ3MgZnJhbWVzIHByb3BlcnR5LCBpdCB3aWxsIGNvbnRpbnVlIHRvIHRoZSBmaXJzdCBjb2x1bW4gb24gdGhlIG5leHQgcm93LlxuZnJhbWVEdXJhdGlvbiAtIHRoZSBudW1iZXIgb2YgZnJhbWVzIGVhY2ggc3ByaXRlIGluIHRoZSBhbmltYXRpb24gd2lsbCBiZSBzaG93biBmb3IuXG5mcmFtZXMgLSB0aGUgbnVtYmVyIG9mIGZyYW1lcyBpbiB0aGlzIGFuaW1hdGlvbi5cbmxvb3AgLSBhIGJvb2xlYW4gZGVub3Rpbmcgd2hldGhlciB0aGlzIGFuaW1hdGlvbiBzaG91bGQgcmVwbGF5IG9yIG5vdC5cbnNjYWxlIC0gYSB2YWx1ZSB0byBtdWx0aXBseSB0aGUgb3JpZ2luYWwgc3ByaXRlJ3Mgc2l6ZSBieS5cbmNvbHVtbk9mZnNldCAtIGFkZGVkIHRvIHRoaXMuY3VycmVudEZyYW1lIHRvIGdldCBzdGFydGluZyBwb2ludCBvZiBhbnkgYW5pbWF0aW9ucyB0aGF0IHN0YXJ0IHBhcnR3YXkgaW50byBhIHNoZWV0LlxuKi9cbmNsYXNzIEFuaW1hdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihzcHJpdGVTaGVldCwgZnJhbWVEaW1lbnNpb25zLCByb3csIHNoZWV0V2lkdGgsIGZyYW1lRHVyYXRpb24sIGZyYW1lcywgbG9vcCwgc2NhbGUsIGNvbHVtbk9mZnNldD0wKSB7XG5cbiAgICAgICAgdGhpcy5zcHJpdGVTaGVldCA9IHNwcml0ZVNoZWV0O1xuICAgICAgICB0aGlzLmZyYW1lV2lkdGggPSBmcmFtZURpbWVuc2lvbnNbMF07XG4gICAgICAgIHRoaXMuZnJhbWVEdXJhdGlvbiA9IGZyYW1lRHVyYXRpb247XG4gICAgICAgIHRoaXMuZnJhbWVIZWlnaHQgPSBmcmFtZURpbWVuc2lvbnNbMV07IC8vY2FuJ3QgYWRkIDEgaGVyZS4gTWVzc2VzIHVwIGZyYW1lcyBsb3dlciBkb3duIHRoZSBzcHJpdGUgc2hlZXRcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuY29sdW1uT2Zmc2V0ID0gY29sdW1uT2Zmc2V0O1xuICAgICAgICB0aGlzLnNoZWV0V2lkdGggPSBzaGVldFdpZHRoO1xuICAgICAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSBmcmFtZUR1cmF0aW9uICogZnJhbWVzO1xuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcbiAgICAgICAgdGhpcy5sb29wcyA9IDA7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB9XG5cblxuICAgIGRyYXdGcmFtZSh0aWNrLCBjdHgsIHgsIHksIGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gdGljaztcbiAgICAgICAgaWYgKHRoaXMuaXNEb25lKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmxvb3BzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZyYW1lID0gdGhpcy5jdXJyZW50RnJhbWUoKTtcbiAgICAgICAgdmFyIHhpbmRleCA9IDA7XG4gICAgICAgIHZhciB5aW5kZXggPSAwO1xuICAgICAgICBsZXQgZHJvdyA9ICh0aGlzLnJvdyAqIHRoaXMuZnJhbWVIZWlnaHQpXG4gICAgICAgIHhpbmRleCA9IGZyYW1lICUgdGhpcy5zaGVldFdpZHRoO1xuICAgICAgICB5aW5kZXggPSBNYXRoLmZsb29yKChmcmFtZSkgLyB0aGlzLnNoZWV0V2lkdGgpO1xuXG5cbiAgICAgICAgLy8gRHJhdyBmYWNpbmcgbGVmdFxuICAgICAgICBpZiAoIWZhY2luZ1JpZ2h0KSB7XG5cbiAgICAgICAgICAgIC8vIFNhdmUgb3JpZ2luYWwgY29udGV4dFxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICAgICAgLy8gU2V0IGNvbnRleHQgdG8gaG9yaXpvbnRhbCBjZW50ZXIgb2YgaW1hZ2UgKGRvbid0IGNhcmUgYWJvdXQgY2hhbmdpbmcgeSdzIHBvc2l0aW9uKVxuICAgICAgICBcdGN0eC50cmFuc2xhdGUoeCArICh0aGlzLnNjYWxlICogdGhpcy5mcmFtZVdpZHRoKSAvIDIsIDApO1xuICAgICAgICAgICAgICAgIFxuXHRcdCAgICAvLyBTY2FsZSB4IGJ5IC0xIHRvIGZsaXAgaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsIDEpO1xuXG4gICAgICAgICAgICAvLyBEcmF3IGltYWdlIG9uIHRoZSB0cmFuc2Zvcm1lZCBjb250ZXh0XG4gICAgICAgICAgICAvLyBOb3RlOiBhZnRlciB0cmFuc2Zvcm1pbmcgWzAsMF0gaXMgdmlzdWFsbHkgWy13aWR0aC8yLCAwXVxuICAgICAgICAgICAgLy8gc28gdGhlIGltYWdlIG5lZWRzIHRvIGJlIG9mZnNldCBhY2NvcmRpbmdseSB3aGVuIGRyYXduXG4gICAgICAgIFx0Y3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZVNoZWV0LFxuICAgICAgICAgICAgICAgICAgICAgKHhpbmRleCAqIHRoaXMuZnJhbWVXaWR0aCksICh5aW5kZXggKiB0aGlzLmZyYW1lSGVpZ2h0KSArIGRyb3csICAvLyBzb3VyY2UgZnJvbSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVdpZHRoLCB0aGlzLmZyYW1lSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgLSh0aGlzLmZyYW1lV2lkdGggKiAyKSArICh0aGlzLmZyYW1lV2lkdGggLyAyKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLmZyYW1lV2lkdGgsIC8vIE9mZnNldCBkeFxuICAgICAgICAgICAgICAgICAgICAgeSAtIHRoaXMuc2NhbGUqdGhpcy5mcmFtZUhlaWdodCArIHRoaXMuc2NhbGUqMTAsXG5cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVXaWR0aCAqIHRoaXMuc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVpZ2h0ICogdGhpcy5zY2FsZSk7XG5cbiAgICAgICAgICAgIC8vIFJlc3RvcmUgb3JpZ2luYWwgY29udGV4dFxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIC8vIG9tZyBpdCdzIGZpbmFsbHkgd29ya2luZyA7LTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBEcmF3IGZhY2luZyByaWdodFxuICAgICAgICBcdGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGVTaGVldCxcbiAgICAgICAgICAgICAgICAgICAgICh4aW5kZXggKiB0aGlzLmZyYW1lV2lkdGgpLCAoeWluZGV4ICogdGhpcy5mcmFtZUhlaWdodCkgKyBkcm93LCAgLy8gc291cmNlIGZyb20gc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVXaWR0aCwgdGhpcy5mcmFtZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgIHggLSB0aGlzLmZyYW1lV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICB5IC0gdGhpcy5zY2FsZSAqIHRoaXMuZnJhbWVIZWlnaHQgKyB0aGlzLnNjYWxlICogMTAsIFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVdpZHRoICogdGhpcy5zY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVIZWlnaHQgKiB0aGlzLnNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICAvL2N0eC50cmFuc2xhdGUoNTAsIDUwKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY3VycmVudEZyYW1lICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5lbGFwc2VkVGltZSAvIHRoaXMuZnJhbWVEdXJhdGlvbikgKyB0aGlzLmNvbHVtbk9mZnNldDtcbiAgICB9XG5cbiAgICBpc0RvbmUgKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZWxhcHNlZFRpbWUgPj0gdGhpcy50b3RhbFRpbWUgLSAxKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgIHRoaXMubG9vcHMgPSAwO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0aW9uOyIsIlxuLyoqKioqKioqKioqKioqKioqXG5Bc3NldE1hbmFnZXIgY2xhc3Ncblxuc3VjY2Vzc0NvdW50IC0gdGhlIG51bWJlciBvZiBzdWNjZXNzZXMgZmV0Y2hpbmcgYXNzZXRzXG5lcnJvckNvdW50IC0gdGhlIG51bWJlciBvZiBmYWlsdXJlcyBmZXRjaGluZyBhc3NldHNcbmNhY2hlIC0gdGhlIGFzc2V0IGNhY2hlXG5kb3dubG9hZFF1ZXVlIC0gdGhlIHF1ZXVlIG9mIGFzc2V0cyB0byBkb3dubG9hZFxuKioqKioqKioqKioqKioqKiovXG5jbGFzcyBBc3NldE1hbmFnZXIge1xuXG4gICAgY29uc3RydWN0b3IgKGRvd25sb2FkUXVldWUgPSBbXSkge1xuICAgICAgICB0aGlzLnN1Y2Nlc3NDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZXJyb3JDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBbXTtcbiAgICAgICAgdGhpcy5kb3dubG9hZFF1ZXVlID0gZG93bmxvYWRRdWV1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgIEFkZHMgYW4gYXNzZXQgcGF0aCB0byB0aGUgZG93bmxvYWQgcXVldWVcbiAgICAqL1xuICAgIHF1ZXVlRG93bmxvYWQgKHBhdGgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGF0aC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kb3dubG9hZFF1ZXVlLnB1c2gocGF0aCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBDaGVja3MgaWYgYWxsIGFzc2V0cyBoYXZlIGJlZW4gcmVzcG9uZGVkIHRvIChlaXRoZXIgc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICovXG4gICAgaXNEb25lICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRvd25sb2FkUXVldWUubGVuZ3RoID09IHRoaXMuc3VjY2Vzc0NvdW50ICsgdGhpcy5lcnJvckNvdW50KTtcbiAgICB9XG5cbiAgICAvKlxuICAgIEF0dGVtcHRzIHRvIGRvd25sb2FkIGVhY2ggYXNzZXQgaW4gdGhlIHF1ZXVlXG4gICAgKi9cbiAgICBkb3dubG9hZEFsbCAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHRoaXMuZG93bmxvYWRRdWV1ZS5sZW5ndGggPT09IDApIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZG93bmxvYWRRdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLmRvd25sb2FkUXVldWVbaV07XG4gICAgICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZHVuOiBcIiArIHRoaXMuc3JjLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHRoYXQuc3VjY2Vzc0NvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuaXNEb25lKCkpIHsgY2FsbGJhY2soKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmVycm9yQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5pc0RvbmUoKSkgeyBjYWxsYmFjaygpOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBwYXRoO1xuICAgICAgICAgICAgdGhpcy5jYWNoZVtwYXRoXSA9IGltZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgR2V0cyBhbiBhc3NldFxuICAgICovXG4gICAgZ2V0QXNzZXQgKHBhdGgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwYXRoLnRvU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVtwYXRoXTtcbiAgICB9XG4gICAgXG59IC8vIGVuZCBvZiBBc3NldE1hbmFnZXJcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRNYW5hZ2VyO1xuXG4iLCJpbXBvcnQgeyBDYW1lcmEsIEVudGl0eSB9IGZyb20gXCIuL2VudGl0aWVzXCJcblxuXG5jbGFzcyBMYXllciB7XG4gICAgY29uc3RydWN0b3IoaW1nLCBzcmNfZGltZW5zaW9ucywgY2FtZXJhLCBzY3JvbGxfc3BlZWQsIGhlaWdodF9mYWN0b3IsIGRlc3RfeSwgc3RyZXRjaD1mYWxzZSwgc2NhbGU9Mykge1xuICAgICAgICB0aGlzLmltZyA9IGltZ1xuICAgICAgICB0aGlzLnNyY193aWR0aCA9IHNyY19kaW1lbnNpb25zWzBdXG4gICAgICAgIHRoaXMuc3JjX2hlaWdodCA9IHNyY19kaW1lbnNpb25zWzFdXG4gICAgICAgIHRoaXMuc2Nyb2xsX3NwZWVkID0gc2Nyb2xsX3NwZWVkXG4gICAgICAgIHRoaXMuaGVpZ2h0X2ZhY3RvciA9IGhlaWdodF9mYWN0b3JcbiAgICAgICAgdGhpcy5zdHJldGNoID0gc3RyZXRjaFxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYVxuICAgICAgICB0aGlzLmNhbWVyYV9kaW1lbnNpb25zID0gW2NhbWVyYS5jYW52YXNXaWR0aCwgY2FtZXJhLmNhbnZhc0hlaWdodF1cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlXG4gICAgICAgIHRoaXMuZGVzdF95ID0gZGVzdF95XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIC8vIHJlcGVhdCBhcyBtYW55IHRpbWVzIGFzIG5lY2Vzc2FyeSB0byBmaWxsIGNhbWVyYSBzaXplXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAgLSB0aGlzLnNyY193aWR0aDsgaSA8IHRoaXMuY2FtZXJhX2RpbWVuc2lvbnNbMF0gKyB0aGlzLnNyY193aWR0aDsgaSArPSB0aGlzLnNyY193aWR0aCkge1xuICAgICAgICAgICAgICAgIGxldCBkX2hlaWdodCA9ICh0aGlzLmNhbWVyYV9kaW1lbnNpb25zWzFdICogdGhpcy5oZWlnaHRfZmFjdG9yKVxuICAgICAgICAgICAgICAgIGxldCBkX3kgPSB0aGlzLmRlc3RfeSAqIHRoaXMuaGVpZ2h0X2ZhY3RvclxuICAgICAgICAgICAgICAgIC8vIDAgKyAoKHRoaXMuaGVpZ2h0X2ZhY3RvcikpICogdGhpcy5jYW1lcmFfZGltZW5zaW9uc1sxXVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RyZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkX2hlaWdodCA9IHRoaXMuY2FtZXJhX2RpbWVuc2lvbnNbMV1cbiAgICAgICAgICAgICAgICAgICAgLy8gZF95ID0gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoLCB0aGlzLnNyY19oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIChpICsgKCh0aGlzLmNhbWVyYS54VmlldyogdGhpcy5zY3JvbGxfc3BlZWQpICUgKHRoaXMuc3JjX3dpZHRoKSkpKiB0aGlzLnNjYWxlLCBcbiAgICAgICAgICAgICAgICAgICAgZF95LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCAqIHRoaXMuc2NhbGUsIFxuICAgICAgICAgICAgICAgICAgICBkX2hlaWdodFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5cbmNsYXNzIEJhY2tncm91bmQge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGFzc2V0X21hbmFnZXIsIGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUgPSBnYW1lX2VuZ2luZVxuICAgICAgICB0aGlzLmFzc2V0X21hbmFnZXIgPSBhc3NldF9tYW5hZ2VyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhXG4gICAgICAgIHRoaXMubGF5ZXJzID0gW1xuICAgICAgICAgICAgXCJpbWcvYmcvMV9iZy5wbmdcIixcbiAgICAgICAgICAgIFwiaW1nL2JnLzJfZmFyYnVpbGRpbmdzLnBuZ1wiLFxuICAgICAgICAgICAgXCJpbWcvYmcvM19idWlsZGluZ3MucG5nXCIsXG4gICAgICAgICAgICBcImltZy9iZy80X2ZvcmVncm91bmQucG5nXCIsXG4gICAgICAgICAgICBcImltZy9iZy9ib3RfZmlsbC5wbmdcIlxuICAgICAgICBdXG5cbiAgICAgICAgdGhpcy5tYWtlX2JhY2tncm91bmQoKVxuXG5cbiAgICB9XG5cbiAgICBtYWtlX2JhY2tncm91bmQgKCkge1xuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnLzFfYmcucG5nXCIpLCBcbiAgICAgICAgICAgIFsyNzIsIDE2MF0sIHRoaXMuY2FtZXJhLCAwLjEsIDEsIDAsIHRydWUpKVxuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnLzJfZmFyYnVpbGRpbmdzLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjEzLCAxNDJdLCB0aGlzLmNhbWVyYSwgMC4xNSwgMC4zNSwgdGhpcy5jYW1lcmEuY2FudmFzSGVpZ2h0LzIpKVxuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnLzNfYnVpbGRpbmdzLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjcyLCAxNTBdLCB0aGlzLmNhbWVyYSwgMC4yLCAwLjQsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICAgICAgLy8gdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy80X2ZvcmVncm91bmQucG5nXCIpLCBcbiAgICAgICAgICAgIC8vIFsyNzIsIDEwNF0sIHRoaXMuY2FtZXJhLCAwLjI1LCAuNSwgdGhpcy5jYW1lcmEuY2FudmFzSGVpZ2h0LzIpKVxuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnL2JvdF9maWxsLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjUwLCAyNTBdLCB0aGlzLmNhbWVyYSwgMSwgMSwgdGhpcy5jYW1lcmEuY2FudmFzSGVpZ2h0LzIpKVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWNrZ3JvdW5kOyIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5pbXBvcnQgR2FtZUVuZ2luZSBmcm9tIFwiLi9nYW1lLWVuZ2luZVwiXG5pbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2VudGl0aWVzL2dhbWUtYm9hcmRcIlxuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi9lbnRpdGllcy9jYW1lcmFcIlxuaW1wb3J0IEh1ZCBmcm9tIFwiLi9odWRcIlxuaW1wb3J0IFRlcnJhaW4gZnJvbSBcIi4vZW50aXRpZXMvdGVycmFpblwiXG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tIFwiLi9iYWNrZ3JvdW5kXCJcbmltcG9ydCBIZXJvIGZyb20gXCIuL2VudGl0aWVzL2hlcm9cIlxuaW1wb3J0IFNvdW5kIGZyb20gXCIuL3NvdW5kXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyB0aGUgXCJtYWluXCIgY29kZSBiZWdpbnMgaGVyZVxuXG4gICAgbGV0IHRvbG9hZCA9IFtcbiAgICAgICAgXCJpbWcvWlhlLnBuZ1wiLFxuICAgICAgICBcImltZy9MZW8ucG5nXCIsXG4gICAgICAgIFwiaW1nL0VuZW15U2hlZXQxLnBuZ1wiLFxuICAgICAgICBcImltZy9waXBlcy5wbmdcIixcbiAgICAgICAgXCJpbWcvRW5lbWllcy5wbmdcIixcbiAgICAgICAgXCJpbWcvaHVkLnBuZ1wiLFxuICAgICAgICBcImltZy9oZWFsdGhwYWNrLnBuZ1wiLFxuICAgICAgICBcImltZy9lbmVyZ3lwYWNrLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy8xX2JnLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy8yX2ZhcmJ1aWxkaW5ncy5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvM19idWlsZGluZ3MucG5nXCIsXG4gICAgICAgIFwiaW1nL2JnLzRfZm9yZWdyb3VuZC5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvYm90X2ZpbGwucG5nXCJcbiAgICBdO1xuXG4gICAgbGV0IEFTU0VUX01BTkFHRVIgPSBuZXcgQXNzZXRNYW5hZ2VyKHRvbG9hZCk7XG5cbiAgICBBU1NFVF9NQU5BR0VSLmRvd25sb2FkQWxsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydGluZyB1cCBkYSBzaGVpbGRcIik7XG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZVdvcmxkJyk7XG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYW52YXMgd2lkdGg6IFwiICsgY2FudmFzLndpZHRoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYW52YXMgaGVpZ2h0OiBcIiArIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGxldCBnYW1lRW5naW5lID0gbmV3IEdhbWVFbmdpbmUoKTtcbiAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBDYW1lcmEoZ2FtZUVuZ2luZSwgMCwgMCwgbnVsbCwgY3R4ID0gY3R4LCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIDIwMDAsIDIwMDApO1xuICAgICAgICBsZXQgaGVybyA9IG5ldyBIZXJvKGdhbWVFbmdpbmUsIDAsIDAsIEFTU0VUX01BTkFHRVIuZ2V0QXNzZXQoXCJpbWcvWlhlLnBuZ1wiKSwgY3R4KTtcbiAgICAgICAgbGV0IGJvYXJkID0gbmV3IEdhbWVCb2FyZChnYW1lRW5naW5lLCBBU1NFVF9NQU5BR0VSLCBjdHgpO1xuICAgICAgICBnYW1lRW5naW5lLmhlcm8gPSBoZXJvO1xuICAgICAgICBnYW1lRW5naW5lLmdhbWVib2FyZCA9IGJvYXJkO1xuICAgICAgICBsZXQgaHVkID0gbmV3IEh1ZChnYW1lRW5naW5lLCBBU1NFVF9NQU5BR0VSLmdldEFzc2V0KFwiaW1nL2h1ZC5wbmdcIiksIGhlcm8sIFswLCAwXSwgWzAsIDBdLCBbMTAwLCAxMDBdLCAzLCBjYW1lcmEpO1xuICAgICAgICBib2FyZC5odWQgPSBodWQ7XG4gICAgICAgIGJvYXJkLmhlcm8gPSBoZXJvO1xuICAgICAgICBcbiAgICAgICAgLy8gIyMjIG11c2ljICMjI1xuICAgICAgICBcbiAgICAgICAgLy9UT0RPOiBQbGFjZWhvbGRlciBtYWdpYyBudW1iZXJzIHVudGlsIHdlIGRlY2lkZSBvbiBob3cgdG8gaGFuZGxlIHdvcmxkIGJvdW5kYXJ5IGFuZCBjYW1lcmFcblxuICAgICAgICAvKipOT1RFOiBJVCBJUyBWRVJZIElNUE9SVEFOVCBDQU1FUkEgSVMgVEhFIEZJUlNUIEFEREVEIEVOVElUWSoqL1xuXG4gICAgICAgIGdhbWVFbmdpbmUuYWRkRW50aXR5KGNhbWVyYSk7XG4gICAgICAgIGdhbWVFbmdpbmUuY2FtZXJhID0gY2FtZXJhO1xuXG4gICAgICAgIGxldCBiYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoZ2FtZUVuZ2luZSwgQVNTRVRfTUFOQUdFUiwgY3R4LCBjYW1lcmEpO1xuXG4gICAgICAgIC8vTG9hZHMgbGV2ZWwgblxuICAgICAgICBib2FyZC5nZXRMZXZlbCgxKTtcblxuICAgICAgICBjYW1lcmEuZm9sbG93KGhlcm8pO1xuICAgICAgICBnYW1lRW5naW5lLmFkZEVudGl0eShib2FyZCk7XG4gICAgICAgIC8vZ2FtZUVuZ2luZS5hZGRFbnRpdHkoaGVybyk7XG4gICAgICAgIC8vZ2FtZUVuZ2luZS5hZGRFbnRpdHkoaHVkKTtcbiAgICAgICAgZ2FtZUVuZ2luZS5pbml0KGN0eCk7XG4gICAgICAgIGdhbWVFbmdpbmUuc3RhcnQoKTtcbiAgICB9KTtcbn0iLCJpbXBvcnQge0VudGl0eX0gZnJvbSBcIi4vXCJcblxuXG4vKioqKioqKioqKipcbkFjdG9yIGludGVyZmFjZVxuVGhpcyBpbnRlcmZhY2UgaXMgZGVzaWduZWQgdG8gZW5jb21wYXNzIGFueSBFbnRpdHkgdGhhdCBhY3RzIHVwb24gdGhlIGdhbWUgbGV2ZWwuIFRoaXMgY2xhc3Mgc2hvdWxkIG5vdCBiZSBpbnN0YW50aWF0ZWQuXG5BbnkgYWN0aW9uIHNoYXJlZCBiZXR3ZWVuIGFjdG9ycyBpcyBsb2NhdGVkIGhlcmUuXG5cbmdhbWUgLSBhIHJlZmVyZW5jZSB0byB0aGUgZ2FtZSBpbiB3aGljaCB0aGlzIGVudGl0eSBleGlzdHNcbngsIHkgLSBlbnRpdHkncyBjb29yZGluYXRlc1xucmVtb3ZlRnJvbVdvcmxkIC0gYSBmbGFnIHRoYXQgZGVub3RlcyB3aGVuIHRvIHJlbW92ZSB0aGlzIGVudGl0eSBmcm9tIHRoZSBnYW1lXG4qKioqKioqKioqKiovXG5jbGFzcyBBY3RvciBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IgKGdhbWUsIHgsIHksIGltZz1udWxsLCBjdHg9bnVsbCwgc2NhbGU9bnVsbCwgc3ByaXRlV2lkdGggPSAwLCBzcHJpdGVIZWlnaHQgPSAwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW50aXR5XCI7XG5cbiAgICAgICAgdGhpcy5mYWNpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcblxuICAgICAgICAvL0FkZGVkIHRoZXNlcyBwb3N0LWhvYyBmb3IgYmV0dGVyIGZ1dHVyZSBkZXZlbG9wbWVudC4gKG5vdCBjdXJyZW50bHkgdXNlZCBpbiBhbnkgJ3N1cGVyJyBjb25zdHJ1Y3Rpb24gY2FsbHMpXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcbiAgICB9XG4gICAgXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSAoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKipIRUxQRVIgRlVOQ1RJT05TKioqL1xuICAgIHVwZGF0ZVBvcyh4LCB5KSB7XG4gICAgICAgIHRoaXMueCArPSB4O1xuICAgICAgICB0aGlzLmJvdW5kWCArPSB4O1xuICAgICAgICB0aGlzLnkgKz0geTtcbiAgICAgICAgdGhpcy5ib3VuZFkgKz0geTtcbiAgICB9XG5cbiAgICBzZXRQb3MoY29vcmRpbmF0ZXMgPSBbMCwgMF0pIHtcbiAgICAgICAgdGhpcy54ID0gY29vcmRpbmF0ZXNbMF07XG4gICAgICAgIHRoaXMuYm91bmRYID0gY29vcmRpbmF0ZXNbMF07XG4gICAgICAgIHRoaXMueSA9IGNvb3JkaW5hdGVzWzFdO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IGNvb3JkaW5hdGVzWzFdO1xuICAgIH1cbn0gXG5leHBvcnQgZGVmYXVsdCBBY3RvcjsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBIdXJ0Ym94LCAgICBcbiAgICBQcm9qZWN0aWxlLFxuICAgIFRlcnJhaW5cbn0gZnJvbSBcIi4vXCJcblxuXG4vL3JvdyA5LCA0MHgzMCwgb2Zmc2V0IDExLCA0IGZyYW1lc1xuY2xhc3MgQm9tYiBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSA0MCwgc3ByaXRlSGVpZ2h0ID0gMzAsIGZhY2luZ1JpZ2h0ID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIC8qVW5pcXVlIHRvIEJvbWIqL3hWZWxvY2l0eSA9IDcsIHlWZWxvY2l0eSA9IC0yMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0geFZlbG9jaXR5O1xuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiAyMDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiAxNTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArIDE1O1xuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1swXSA9IDUwMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IDcwMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICB0aGlzLmxhdW5jaHRpbWUgPSAyNTtcbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSA0O1xuICAgICAgICB0aGlzLnN0YXJ0dXAgPSAzO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IHlWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IC4wMztcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsYXVuY2hpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiYWN0aXZhdGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGV0b25hdGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZXhwbG9kaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJleHBsb2RlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVmbGVjdGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJsYXVuY2hcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxNywgNSwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTEpLFxuICAgICAgICAgICAgXCJhY3RpdmF0ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDE3LCA3LCAyLCB0cnVlLCB0aGlzLnNjYWxlLCAxMiksXG4gICAgICAgICAgICBcImRldG9uYXRlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTcsIDYsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDE0KSxcbiAgICAgICAgICAgIFwiZXhwbG9kZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNCwgMTcsIDUsIDcsIGZhbHNlLCB0aGlzLnNjYWxlICsgMywgMTApLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5mYWNpbmcgPSAxOyB9IGVsc2UgeyB0aGlzLmZhY2luZyA9IC0xOyB9XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmxhdW5jaDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5sYXVuY2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKHRoaXMuZmFjaW5nKnRoaXMueFZlbG9jaXR5LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZhdGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3ModGhpcy5mYWNpbmcgKiB0aGlzLnhWZWxvY2l0eSwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiB0aGlzLmNvdW50ZG93bikge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRldG9uYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5kZXRvbmF0aW5nKSB7XG4gICAgICAgICAgICAvL1RoaXMgXCJGYWNpbmcgSGVyb1wiIGNoZWNrIG1ha2VzIHN1cmUgdGhhdCwgaWYgSGVybyBjcm9zc2VzIGF4aXMgYmVmb3JlIGV4cGxvc2lvbixcbiAgICAgICAgICAgIC8vSGVybyB3aWxsIGJlIHB1c2hlZCBiYWNrIGluIHRoZSBjb3JyZWN0IGRpcmVjdGlvbiBvbiBzdHVuXG4gICAgICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gdGhpcy5zdGFydHVwKSB7XG4gICAgICAgICAgICAgICAgLy9TcGF3biBleHBsb3Npb24gaHVydGJveFxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGV0b25hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmV4cGxvZGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmV4cGxvZGluZykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5leHBsb2RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gMiAqIHRoaXMuc3ByaXRlV2lkdGggLSAzMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gMzA7XG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvblggPSAxNTA7XG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvblkgPSAxNTA7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImV4cGxvc2lvbl8xXCIpXG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xLjc1ICogZXhwbG9zaW9uWCArIDEwLCB0aGlzLnNwcml0ZUhlaWdodCAtIDIwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgZXhwbG9zaW9uWCwgZXhwbG9zaW9uWSwgdGhpcy5zY2FsZSArIDIsIE1hdGgubWF4KDQsIHRoaXMuZGFtYWdlKSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsICF0aGlzLnN0YXRlcy5yZWZsZWN0ZWQsIFwiaGVhbHRoXCIsIDE1KTtcbiAgICAgICAgICAgICAgICBodXJ0Ym94LnBhcmVudCA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGh1cnRib3gpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmV4cGxvZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZXhwbG9kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIHRoaXMueVZlbG9jaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubGF1bmNoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sYXVuY2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2YXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5kZXRvbmF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZXRvbmF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZXhwbG9kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5leHBsb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIC8vVE9ETyBBZGQgY29sbGlzaW9uIHdpdGggdGVycmFpblxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScgJiYgIXRoaXMuc3RhdGVzLmV4cGxvZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQgLSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueFZlbG9jaXR5ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueFZlbG9jaXR5IC09IHRoaXMuZmFjaW5nICogdGhpcy54VmVsb2NpdHkgKiB0aGlzLmZyaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54VmVsb2NpdHkgKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhWZWxvY2l0eSAqIHRoaXMuZnJpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxhdW5jaGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sYXVuY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZhdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCAtIHRoaXMuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxhdW5jaGluZyA9IGZhbHNlLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGV0b25hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZXhwbG9kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IDA7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICAvL0lmIGhlcm8gaXMgY2xlYXZpbmcsIGRvLi4uXG4gICAgICAgICAgICAgICAgICAgIC8vSGl0IGJvbWIgYXdheVxuICAgICAgICAgICAgICAgIC8vRWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxhdW5jaGluZyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kZXRvbmF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZXhwbG9kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvbWI7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW5lbXksXG4gICAgVGVycmFpbixcbiAgICBIZXJvLFxuICAgIFByb2plY3RpbGUsXG4gICAgSHVydGJveCxcbiAgICBBY3RvclxufSBmcm9tIFwiLi9cIlxuXG5cblxuY2xhc3MgQnVsbGV0IGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNTApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSA3O1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHsgdGhpcy54ICs9IDEwMDsgfSBlbHNlIHsgdGhpcy54IC09IDEwMCB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSAzMDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDMwO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgLSAodGhpcy5zcHJpdGVIZWlnaHQpIC0gNztcbiAgICAgICAgaWYgKCFmYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMikgLSAyKnRoaXMuc3ByaXRlV2lkdGg7IC8vKzEwMCBhbGlnbnMgd2l0aCB0aGUgZ3VuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDIqdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDE1MDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImJ1bGxldFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDE4LCAyMCwgMiwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTYpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5idWxsZXQ7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL1RPRE9cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy54LCB0aGlzLnksXG4gICAgICAgICAgICAgICAgLy8gICAgMCwgMCwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDEwLCAxMCwgdGhpcy5zY2FsZSwgNTAsIHRoaXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiA3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYnVsbGV0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiIHx8IG90aGVyLm5hbWUgPT09IFwiU3Bpa2VzXCIgfHwgb3RoZXIubmFtZSA9PT0gXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiaXNFbmVteVwiKTtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiUmVmbGVjdGJveFwiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9ICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IFwiUHJvamVjdGlsZVwiO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSAxO1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAxNTA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkJ1bGxldFwiKSB7XG4gICAgICAgICAgICAgICAgb3RoZXIucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3RoZXIucGFyZW50Q2xhc3MgPT09IFwiRW5lbXlcIikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aCArIDU7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ7XG4iLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiXG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuXG5cbi8qKioqKioqKioqKlxuQ2FtZXJhIGNsYXNzXG54VmlldywgeVZpZXcgLSBwb3NpdGlvbiBvZiBjYW1lcmEgKHRvcCBsZWZ0KVxuY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCAtIGNhbWVyYSBkaW1lbnNpb25zXG53b3JsZFdpZHRoLCB3b3JsZEhlaWdodCAtIGRpbWVuc2lvbnMgdGhhdCByZXByZXNlbnQgdGhlIHdvcmxkJ3MgYm91bmRhcnlcblxuKioqKioqKioqKiovXG5jbGFzcyBDYW1lcmEgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHhWaWV3LCB5Vmlldz0wLCBpbWc9bnVsbCwgY3R4PW51bGwsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHdvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHhWaWV3LCB5VmlldywgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gY2FudmFzV2lkdGg7IC8vdGhpcyBpcyB0aGUgdmlld3BvcnQsIE5PVCB0aGUgc2FtZSBhcyBjYW52YXMgaW4gY29yZS5qc1xuICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNhbnZhc0hlaWdodDsgLy90aGlzIGlzIHRoZSB2aWV3cG9ydCwgTk9UIHRoZSBzYW1lIGFzIGNhbnZhcyBpbiBjb3JlLmpzXG4gICAgICAgIHRoaXMud29ybGRXaWR0aCA9IHdvcmxkV2lkdGg7XG4gICAgICAgIHRoaXMud29ybGRIZWlnaHQgPSB3b3JsZEhlaWdodDtcbiAgICAgICAgdGhpcy5hYnNPZmZYID0gMjtcbiAgICAgICAgdGhpcy5hYnNPZmZZID0gMS41O1xuICAgICAgICB0aGlzLm9mZlggPSB0aGlzLmNhbnZhc1dpZHRoL3RoaXMuYWJzT2ZmWDtcbiAgICAgICAgdGhpcy5vZmZZID0gdGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkgKyAxMDA7XG4gICAgICAgIHRoaXMuY2FtU3BlZWRYID0gODtcbiAgICAgICAgdGhpcy5jYW1TcGVlZFkgPSA4O1xuXG5cbiAgICAgICAgLy8gcG9zc2libGUgYXhpcyB0aGUgY2FtZXJhIGNhbiBtb3ZlIGluLiBub3QgaW1wbGVtZW50ZWQgeWV0XG4gICAgICAgIHRoaXMuYXhpcyA9IHtcbiAgICAgICAgICAgIFwibm9uZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaG9yaXpvbnRhbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwidmVydGljYWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImJvdGhcIjogdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gb2JqZWN0IHRvIGJlIGZvbGxvd2VkICh0aGUgSGVybylcbiAgICAgICAgdGhpcy5mb2xsb3dlZCA9IG51bGw7XG4gICAgfVxuXG4gICAgZm9sbG93IChvYmopIHtcbiAgICAgICAgdGhpcy5mb2xsb3dlZCA9IG9iajtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvLyAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy9yZXNldCB0cmFuc2Zvcm0gbWF0cml4XG4gICAgICAgIC8vICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KTsgLy8gY2xlYXIgdmlld3BvcnQgYWZ0ZXIgbWF0cml4IGlzIHJlc2V0XG4gICAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnhWaWV3LCB0aGlzLnlWaWV3KTtcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vIE5vdGU6IHRoaXMgbG9naWMgZmVlbHMgSE9SUklCTFkgd3JvbmcsIGJ1dCBpdCB3b3JrcyBmb3Igbm93LCBzbyB5YXk/XG4gICAgICAgIGlmICh0aGlzLmZvbGxvd2VkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQm91bmRzKCk7XG4gICAgICAgICAgICAvL1RPRE86IG5lZWQgdG8gZmlndXJlIG91dCB3b3JsZCBib3VuZHMgZm9yIG1pbiBhbmQgbWF4IGNsYW1waW5nXG4gICAgICAgICAgICB0aGlzLnhWaWV3ID0gLXRoaXMuZm9sbG93ZWQueCArIHRoaXMub2ZmWDtcbiAgICAgICAgICAgIHRoaXMueVZpZXcgPSAtdGhpcy5mb2xsb3dlZC55ICsgdGhpcy5vZmZZO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgLy9jb25zb2xlLmxvZyhcInhWaWV3OiBcIiArIHRoaXMueFZpZXcpO1xuICAgICAgICAgLy9jb25zb2xlLmxvZyhcInlWaWV3OiBcIiArIHRoaXMueVZpZXcpO1xuICAgICAgICAgLy9jb25zb2xlLmxvZyhcImhlcm8geDogXCIgKyB0aGlzLmZvbGxvd2VkLngpO1xuICAgICAgICAgLy9jb25zb2xlLmxvZyhcImhlcm8geTogXCIgKyB0aGlzLmZvbGxvd2VkLnkpO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlQm91bmRzKCkge1xuICAgICAgICBpZiAoISh0aGlzLm9mZlggPT09IHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZYICsgMTAgPCBNYXRoLmZsb29yKHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpKSB7IHRoaXMub2ZmWCArPSB0aGlzLmNhbVNwZWVkWDsgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vZmZYIC0gMTAgPiBNYXRoLmZsb29yKHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpKSB7IHRoaXMub2ZmWCAtPSB0aGlzLmNhbVNwZWVkWDsgfVxuICAgICAgICAgICAgZWxzZSAodGhpcy5vZmZYID0gdGhpcy5jYW52YXNXaWR0aCAvIHRoaXMuYWJzT2ZmWCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEodGhpcy5vZmZZID09PSB0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9mZlkgKyAxMCA8IE1hdGguZmxvb3IodGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkpKSB7IHRoaXMub2ZmWSArPSB0aGlzLmNhbVNwZWVkWTsgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vZmZZIC0gMTAgPiBNYXRoLmZsb29yKHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZKSkgeyB0aGlzLm9mZlkgLT0gdGhpcy5jYW1TcGVlZFk7IH1cbiAgICAgICAgICAgIGVsc2UgKHRoaXMub2ZmWSA9IHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJvdW5kc0NoZWNrKHZhbCwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbCwgbWluKSwgbWF4KTtcbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IENhbWVyYTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBIZXJvLFxuICAgIEh1cnRib3gsXG4gICAgSXRlbSxcbiAgICBQcm9qZWN0aWxlLFxuICAgIFRlcnJhaW5cbn0gZnJvbSBcIi4vXCJcblxuXG5jbGFzcyBDcm93IGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDUwLCBzcHJpdGVIZWlnaHQgPSA0MCxcbiAgICAgICAgICAgICAgICAgICAgLypVbmlxdWUgdG8gQ3Jvdyovc2lnaHRSYWRpdXMgPSBbNzAwLCA1MDBdLCBtdXJkZXJMZWFkZXIgPSBmYWxzZSwgbXVyZGVyRHJvb2dzID0gW1swLCAwXSwgWzAsIDBdXSkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiAyMDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiAxNTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMubXVyZGVyTGVhZGVyID0gbXVyZGVyTGVhZGVyO1xuICAgICAgICB0aGlzLnBvaW50VmFsdWUgPSAxMDtcbiAgICAgICAgdGhpcy54U3BlZWQgPSA0O1xuICAgICAgICB0aGlzLnlTcGVlZCA9IDg7XG4gICAgICAgIHRoaXMubWF4WCA9IDU7XG4gICAgICAgIHRoaXMubWF4WSA9IDk7XG4gICAgICAgIHRoaXMueEFjY2VsID0gLjM1O1xuICAgICAgICB0aGlzLnlBY2NlbCA9IC40O1xuXG4gICAgICAgIHRoaXMuYXR0YWNrQW5nbGUxID0gMjtcbiAgICAgICAgdGhpcy5hdHRhY2tBbmdsZTIgPSAxMDtcbiAgICAgICAgdGhpcy54QXR0YWNrID0gMTdcbiAgICAgICAgdGhpcy54UmVjb3ZlciA9IDc7XG4gICAgICAgIHRoaXMueVJlY292ZXIgPSA0O1xuICAgICAgICB0aGlzLnJlY292ZXJEaXN0YW5jZSA9IDQwMDtcbiAgICAgICAgdGhpcy54UmVjb3ZlckRpc3RhbmNlO1xuICAgICAgICB0aGlzLnlSZWNvdmVyRGlzdGFuY2U7XG4gICAgICAgIGlmICh0aGlzLm11cmRlckxlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5kcm9vZ09uZSA9IG11cmRlckRyb29nc1swXTtcbiAgICAgICAgICAgIHRoaXMuZHJvb2dUd28gPSBtdXJkZXJEcm9vZ3NbMV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gc2lnaHRSYWRpdXNbMF07XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMV0gPSBzaWdodFJhZGl1c1sxXTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICB0aGlzLnJhbmQgPSAwO1xuXG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmbHlpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImF0dGFja2luZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYXR0YWNraW5nX2ZpbmFsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZWNvdmVyaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJodXJ0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpZGxpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZmx5XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOCwgMTEsIDUsIDUsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJhdHRhY2tcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA4LCAxMSwgNiwgMywgZmFsc2UsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICAgICAgXCJhdHRhY2tfZmluYWxcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA4LCAxMSwgNiwgMiwgdHJ1ZSwgdGhpcy5zY2FsZSwgOCksXG4gICAgICAgICAgICBcImh1cnRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA4LCAxMSwgNSwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTApLFxuICAgICAgICAgICAgLy9UT0RPOiBBZGQgXCJzbW9rZWJvbWJcIiBlZmZlY3QgZm9yIGFjdGl2YXRpb25cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmx5O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5yZWNvdmVyaW5nICYmICF0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gdGhpcy5zaWdodFJhZGl1c1swXVxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzFdKSB7XG4gICAgICAgICAgICAgICAgLy9kaXNhYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vZW5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVyZGVyTGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9vZzEgPSBuZXcgQ3Jvdyh0aGlzLmdhbWUsIHRoaXMueCArIHRoaXMuZHJvb2dPbmVbMF0sIHRoaXMueSArIHRoaXMuZHJvb2dPbmVbMV0sIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIFsyMDAwLCAyMDAwXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9vZzIgPSBuZXcgQ3Jvdyh0aGlzLmdhbWUsIHRoaXMueCArIHRoaXMuZHJvb2dUd29bMF0sIHRoaXMueSArIHRoaXMuZHJvb2dUd29bMV0sIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIFsyMDAwLCAyMDAwXSk7XG4gICAgICAgICAgICAgICAgICAgIGRyb29nMS5sZXZlbCA9IHRoaXMubGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIGRyb29nMS5zZWN0aW9uID0gdGhpcy5zZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBkcm9vZzIubGV2ZWwgPSB0aGlzLmxldmVsO1xuICAgICAgICAgICAgICAgICAgICBkcm9vZzIuc2VjdGlvbiA9IHRoaXMuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShkcm9vZzEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGRyb29nMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mbHlpbmcpIHsgLy90aGlzLnVwZGF0ZUhpdGJveCg1MCwgNDAsIDIwLCAxNSk7XG4gICAgICAgICAgICAvL0FwcGx5IHNwZWVkIHVwZGF0ZXMgYW5kIGNoYXNlIEhlcm8vc3RheSBpbiBhdHRhY2sgcmFuZ2VcbiAgICAgICAgICAgIGlmICgodGhpcy54U3BlZWQgPCB0aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IDEpIHx8ICh0aGlzLnhTcGVlZCA+IC10aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IC0xKSkge1xuICAgICAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuZmFjaW5nICogdGhpcy54QWNjZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA+PSAtMTI1KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVNwZWVkID4gLXRoaXMubWF4WSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlTcGVlZCAtPSB0aGlzLnlBY2NlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA8PSAtMjAwKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U3BlZWQgPCB0aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgKz0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU3RheSB3aXRoaW4gQ3JvdydzIGF0dGFjayByYWRpdXNcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA+PSA1MDAgJiYgdGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMueFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMueFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gMjUwICYmIHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCAtPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGJlbG93IGhlcm87XG4gICAgICAgICAgICAvL2lmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55IDw9IDEwMCkge1xuICAgICAgICAgICAgLy8gICAgdGhpcy55ICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vLy8gYWJvdmUgaGVyb1xuICAgICAgICAgICAgLy9lbHNlIGlmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55ID49IDIwMCkge1xuICAgICAgICAgICAgLy8gICAgdGhpcy55ICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgLy9BVFRBQ0shISFcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA3MDBcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA8IC0xMDAgJiYgKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpID4gLTIwMFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDEgJiYgTWF0aC5yYW5kb20oKSAqIDEwMCA8PSAxMCkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNvdW5kLnBsYXkoXCJjcm93X2Nhd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYXR0YWNraW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yYW5kID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnkgLT0gdGhpcy5hdHRhY2tBbmdsZTE7XG4gICAgICAgICAgICAgICAgLy90aGlzLmJvdW5kWSAtPSB0aGlzLmF0dGFja0FuZ2xlMjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygtdGhpcy5mYWNpbmcgKiB0aGlzLnhBdHRhY2svMiwgLXRoaXMuYXR0YWNrQW5nbGUxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy55IC09IHRoaXMuYXR0YWNrQW5nbGUyO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5ib3VuZFkgLT0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoLXRoaXMuZmFjaW5nICogdGhpcy54QXR0YWNrLzIsIC10aGlzLmF0dGFja0FuZ2xlMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMueCAtPSB0aGlzLmZhY2luZyo3O1xuICAgICAgICAgICAgLy90aGlzLmJvdW5kWCAtPSB0aGlzLmZhY2luZyo3OyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy9yYW5kb21seSBkZXRlcm1pbmUgYW5nbGUgb2YgYXR0YWNrIChtYWtlcyBwcmVkaWN0aW9uIGhhcmRlcilcbiAgICAgICAgICAgICAgICAvL21pbiBhdHRhY2sgYW5nbGUgb2YgMlxuICAgICAgICAgICAgICAgIC8vdGhpcy5hdHRhY2tBbmdsZSA9IDIgKyBNYXRoLnJhbmRvbSgpICogODsgXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsKSB7XG4gICAgICAgICAgICBpZih0aGlzLnJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5hdHRhY2tBbmdsZTE7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy5hdHRhY2tBbmdsZTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhBdHRhY2s7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLmZhY2luZyAqIHRoaXMueEF0dGFjaztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ5OiBcIiArIHRoaXMueSk7XG5cblxuICAgICAgICAgICAgLy9TcGF3biBIdXJ0Ym94XG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlcy5mYWNpbmdSaWdodClcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMueCwgdGhpcy55LCAtNDUsIDEwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNDAsIDQwLCB0aGlzLnNjYWxlLCAxLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy54LCB0aGlzLnksIC00NSAtIHRoaXMuc3ByaXRlV2lkdGggLSAzMCwgMTAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA0MCwgNDAsIHRoaXMuc2NhbGUsIDEsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG5cbiAgICAgICAgICAgIC8vc3RhdGUgZmluaXNoZWRcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHsgLy9hZnRlciBhdHRhY2sgaXMgZmluaXNoZWRcbiAgICAgICAgICAgIC8vZmx5IGF3YXlcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLmZhY2luZyAqIHRoaXMueFJlY292ZXI7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLmZhY2luZyAqIHRoaXMueFJlY292ZXI7XG4gICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy55UmVjb3ZlcjtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZIC09IHRoaXMueVJlY292ZXI7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPj0gdGhpcy5yZWNvdmVyRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZWNvdmVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaHVydCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHsgLy8gREVBVEggUkFUVExFXG4gICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5yYW5kb20oKSAqIDU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSBNYXRoLnJhbmRvbSgpICogNVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSBNYXRoLnJhbmRvbSgpICogNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IE1hdGgucmFuZG9tKCkgKiA1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDgpIHtcbiAgICAgICAgICAgICAgICAvL3Jlc2V0IGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgc3RhdGVzXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaHVydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vZW5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQ7XG4gICAgICAgICAgICAgICAgLy91cGRhdGUgaGl0Ym94XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDQwLCAyMCwgMTUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgKiAxMDAgPD0gMjcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEl0ZW0uSGVhbHRoUGFjayh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmdhbWUuZ2FtZWJvYXJkLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9oZWFsdGhwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCAzLCA1KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBJdGVtLkVuZXJneVBhY2sodGhpcy5nYW1lLCB0aGlzLnggKyAzMCwgdGhpcy55LCB0aGlzLmdhbWUuZ2FtZWJvYXJkLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9lbmVyZ3lwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCAzLCA1KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmx5aW5nIHx8IHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5mbHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmF0dGFja2luZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYXR0YWNrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmF0dGFja19maW5hbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaHVydCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaHVydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAvL251bGxcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiUHJvamVjdGlsZVwiICYmICF0aGlzLnN0YXRlcy5odXJ0ICYmICF0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaHVydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIkh1cnRib3hcIiAmJiAhdGhpcy5zdGF0ZXMuaHVydCAmJiAhdGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaHVydCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyb3c7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW5lbXksXG4gICAgVGVycmFpbixcbiAgICBQcm9qZWN0aWxlLFxuICAgIFJvY2tldCxcbiAgICBIdXJ0Ym94LFxufSBmcm9tIFwiLi9cIlxuXG5cbmNsYXNzIERpbm8gZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoID0gOTAsIHNwcml0ZUhlaWdodCA9IDYwLCBwYXRyb2xEaXN0YW5jZSA9IDAsIHNob3RUaW1lT2Zmc2V0ID0gMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDI7XG4gICAgICAgIHRoaXMuaGVybyA9IHRoaXMuZ2FtZS5oZXJvO1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogMzU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogMzU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAodGhpcy5zcHJpdGVIZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuXG4gICAgICAgIHRoaXMuc3RhcnRYID0geDtcbiAgICAgICAgdGhpcy5tYXhYID0gdGhpcy5zdGFydFggKyBwYXRyb2xEaXN0YW5jZTsgLy9DaGFuZ2UgdGhpcyB0byBhbHRlciBkaW5vJ3MgcGF0cm9sIGRpc3RhbmNlXG4gICAgICAgIFxuICAgICAgICAvL1RpbWVyc1xuICAgICAgICB0aGlzLnNob3RDb29sZG93biA9IDI1MDtcbiAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciA9IHNob3RUaW1lT2Zmc2V0O1xuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDE1XG4gICAgICAgIHRoaXMuaGVhbHRoID0gMjAwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1swXSA9IDE1MDA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMV0gPSAxMDAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaWRsaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcInNob290aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJ3YWxraW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJncm91bmRlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicGF0cm9sbGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZnJhbWVsb2NrZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiAgICAgICAgICAgICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDYwXSwgNiwgMTMsIDUsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEyKSxcbiAgICAgICAgICAgIFwid2Fsa19zdHJhaWdodFwiOiAgICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDYwXSwgNiwgMTMsIDksIDYsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgLy9cIndhbGtfZG93blwiOiAgICAgICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA2MF0sIDYsIDEzLCA3LCA2LCB0cnVlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgICAgIC8vXCJ3YWxrX3VwXCI6ICAgICAgICAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNzBdLCA2LCAxOCwgNywgNiwgdHJ1ZSwgdGhpcy5zY2FsZSksLy85MHg3MFxuICAgICAgICAgICAgLy9cInNob290X3VwXCI6ICAgICAgICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA3MF0sIDYsIDE4LCA3LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgNiksLy85MHg3MFxuICAgICAgICAgICAgXCJzaG9vdF9kaWFnb25hbFwiOiAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNzBdLCA2LCAxOCwgNywgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDEwKSwvLzkweDcwXG4gICAgICAgICAgICAvL1wic2hvb3Rfc3RyYWlnaHRcIjogICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDcwXSwgNiwgMTgsIDcsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxNCksLy85MHg3MCAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChwYXRyb2xEaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnBhdHJvbGxpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvKioqKkJFR0lOIEJFSEFWSU9SKioqKi9cbiAgICAgICAgLy9UdXJuIHRvd2FyZHMgSGVyb1xuICAgICAgICAvLyBpZiAoIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkICYmICF0aGlzLnN0YXRlcy5wYXRyb2xsaW5nKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnN0YXRlcy5wYXRyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnBhdHJvbGxpbmcgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy53YWxraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnggPD0gdGhpcy5zdGFydFgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMueCA+PSB0aGlzLm1heFgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMud2Fsa2luZykge1xuXG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLm1vdmVtZW50U3BlZWQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNob3RDb29sZG93blRpbWVyIDw9IDAgJiYgdGhpcy55VmVsb2NpdHkgPT09IDBcbiAgICAgICAgICAgICAgICAmJiAoTWF0aC5hYnModGhpcy5tYXhYIC0gdGhpcy54KSA8PSA1IHx8IE1hdGguYWJzKHRoaXMuc3RhcnRYIC0gdGhpcy54KSA8PSA1KVxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzBdICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLndhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG90Q29vbGRvd25UaW1lciA8PSAwICYmIHRoaXMueVZlbG9jaXR5ID09PSAwICYmIE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMF0gJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPD0gdGhpcy5zaWdodFJhZGl1c1sxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFJvY2tldCh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJlbmVyZ3lfbGF1bmNoZXJcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSBmYWxzZTsgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciA9IHRoaXMuc2hvdENvb2xkb3duO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5wYXRyb2xsaW5nKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy53YWxraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vVGltZXJzXG4gICAgICAgIGlmICh0aGlzLnNob3RDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BcHBseSBHcmF2aXR5XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbG9jaXR5O1xuICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnkpO1xuICAgICAgICAvL0hlYWx0aCBjaGVja3NcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDkwLCA2MCwgMjUsIDQ1KVxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMud2Fsa2luZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goOTAsIDYwLCAyNSwgNDUpXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy53YWxrX3N0cmFpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goOTAsIDcwLCAyNSwgNDUpXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdF9kaWFnb25hbDsgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodDsgLy9maXggbWFnaWMgbnVtYmVyIChkcmF3biBzbGlnaHRseSBiZWxvdyBoaXRib3ggd2l0aG91dCB0aGUgMjAgb2Zmc2V0KVxuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFggKyA4NztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYIC0gODc7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgICAgIC8vIGJsb2NraW5nIGZyb20gbGVmdCAmIHJpZ2h0XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCwgb2ZmWCA9IDAsIG9mZlkgPSAwKSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDIgKyBvZmZYO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyBvZmZZO1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlubzsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtBY3Rvcn0gZnJvbSBcIi4vXCJcblxuXG5jbGFzcyBFbmVteSBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlVHlwZSA9IFwiaGVhbHRoXCI7XG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDA7Ly9EZWZpbmUgdGhpcyBleHBsaWNpdGx5IGZvciByZWxldmFudCBlbmVtaWVzXG4gICAgICAgIC8vVE9ETyAoZnV0dXJlIGRldmVsb3BtZW50KSBtYWtlIHNpZ2h0IHJhZGl1cyBhIHBhcnQgb2YgRW5lbXkgZGVmaW5pdGlvbiBmb3IgdXNlIGluIHN1cGVyIGNvbnN0cnVjdG9yc1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzID0gWzkwMCwgMzAwXSAvLyB4LCB5IGRpc3RhbmNlIGZyb20gY3VycmVudCBsb2NhdGlvblxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmVteTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuXG4vKioqKioqKioqKipcbkVudGl0eSBjbGFzc1xuXG5nYW1lIC0gYSByZWZlcmVuY2UgdG8gdGhlIGdhbWUgaW4gd2hpY2ggdGhpcyBlbnRpdHkgZXhpc3RzXG54LCB5IC0gZW50aXR5J3MgY29vcmRpbmF0ZXNcbnJlbW92ZUZyb21Xb3JsZCAtIGEgZmxhZyB0aGF0IGRlbm90ZXMgd2hlbiB0byByZW1vdmUgdGhpcyBlbnRpdHkgZnJvbSB0aGUgZ2FtZVxuKioqKioqKioqKioqL1xuY2xhc3MgRW50aXR5IHtcblxuICAgIGNvbnN0cnVjdG9yIChnYW1lLCB4LCB5LCBpbWc9bnVsbCwgY3R4PW51bGwpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmxldmVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IG51bGw7XG4gICAgICAgIHRoaXMudHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IC45O1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG5cbiAgICAgICAgLy8gdXNlZCBmb3Igc2ltcGxlIHJlY3QgaGl0Ym94XG4gICAgICAgIHRoaXMuYm91bmRYID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSBudWxsO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSBudWxsO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBUT0RPLCBpbXBsZW1lbnQgYSBsaXN0IG9mIGJvdW5kaW5nIHNoYXBlcywgaXRlcmF0ZSB0aHJvdWdoIGRlcGVuZGluZyBvbiB0eXBlIChjaXJjbGUgb3IgcmVjdCkgXG4gICAgcmVjdGFuZ2xlKCkge1xuXG4gICAgfVxuICAgIGNpcmNsZSgpIHtcblxuICAgIH1cblxuICAgIC8qIERyYXdzIHRoZSBvdXRsaW5lIG9mIHRoaXMgZW50aXR5ICovXG4gICAgZHJhd091dGxpbmUgKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wXG4gICAgaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/XG4gICAgKi9cbiAgICB1cGRhdGUgKCkgeyB9XG5cbiAgICAvKiBEcmF3cyB0aGlzIGVudGl0eS4gQ2FsbGVkIGV2ZXJ5IGN5Y2xlIG9mIHRoZSBnYW1lIGVuZ2luZS4gKi9cbiAgICBkcmF3IChjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5zaG93T3V0bGluZXMgJiYgdGhpcy5ib3VuZFgpIHtcbiAgICAgICAgICAgIGRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW1nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUodGhpcy5jbG9ja1RpY2ssIGN0eCwgdGhpcy54LCB0aGlzLnksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBDb2xsaXNpb24gZGV0ZWN0aW9uLCByZWN0YW5nbGVcbiAgICAqL1xuICAgIGlzQ29sbGlkaW5nKG90aGVyKSB7XG4gICAgICAgIGxldCByZWN0MSA9IHtcbiAgICAgICAgICAgIFwieFwiIDogdGhpcy5ib3VuZFgsXG4gICAgICAgICAgICBcInlcIiA6IHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgXCJsYXN0WVwiIDogdGhpcy5sYXN0Qm91bmRZLFxuICAgICAgICAgICAgXCJ3aWR0aFwiIDogdGhpcy5ib3VuZFdpZHRoLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogdGhpcy5ib3VuZEhlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlY3QyID0ge1xuICAgICAgICAgICAgXCJ4XCIgOiBvdGhlci5ib3VuZFgsXG4gICAgICAgICAgICBcInlcIiA6IG90aGVyLmJvdW5kWSxcbiAgICAgICAgICAgIFwid2lkdGhcIiA6IG90aGVyLmJvdW5kV2lkdGgsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBvdGhlci5ib3VuZEhlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlY3QxLndpZHRoID09PSAwIHx8IHJlY3QxLmhlaWdodCA9PT0gMCB8fCByZWN0Mi53aWR0aCA9PT0gMCB8fCByZWN0Mi5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnbm9uZSdcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBzYW1lIGFzIE1hcmlvdHQncyBtZXRob2QsIGp1c3QgZm9ybWF0dGVkIGRpZmZlcmVudGx5XG4gICAgICAgIGxldCBjb2xsaXNpb24gPSAnbm9uZSc7XG4gICAgICAgIHZhciBkeCA9IChyZWN0MS54ICsgcmVjdDEud2lkdGgvMikgLSAocmVjdDIueCArIHJlY3QyLndpZHRoLzIpO1xuICAgICAgICB2YXIgZHkgPSAocmVjdDEueSArIHJlY3QxLmhlaWdodC8yKSAtIChyZWN0Mi55ICsgcmVjdDIuaGVpZ2h0LzIpO1xuICAgICAgICB2YXIgbGFzdGR5ID0gKHJlY3QxLmxhc3RZICsgcmVjdDEuaGVpZ2h0LzIpIC0gKHJlY3QyLnkgKyByZWN0Mi5oZWlnaHQvMik7XG4gICAgICAgIHZhciB3aWR0aCA9IChyZWN0MS53aWR0aCArIHJlY3QyLndpZHRoKSAvIDI7XG4gICAgICAgIHZhciBoZWlnaHQgPSAocmVjdDEuaGVpZ2h0ICsgcmVjdDIuaGVpZ2h0KSAvIDI7XG4gICAgICAgIHZhciBjcm9zc1dpZHRoID0gd2lkdGggKiBkeTtcbiAgICAgICAgdmFyIGxhc3RDcm9zc1dpZHRoID0gd2lkdGggKiBsYXN0ZHk7XG4gICAgICAgIHZhciBjcm9zc0hlaWdodCA9IGhlaWdodCAqIGR4O1xuICAgICAgICBcbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgcmVjdDEgYW5kIHJlY3QyIGFyZSBjbG9zZSBlbm91Z2ggdG8gZXZlbiBjb2xsaWRlLiBUaGVuIGNoZWNrIHRoZSBpbnRlcnNlY3Rpb24gZGVwdGhzIHRvIGRldGVybWluZSB3aGljaCBzaWRlIHdhcyBtb3N0IGludm9sdmVkIGluIHRoZSBjb2xsaXNpb24uXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA8PSB3aWR0aCAmJiBNYXRoLmFicyhkeSkgPD0gaGVpZ2h0KSB7XG5cbiAgICAgICAgICAgIC8vVE9ETyBzdG9yZSBsYXN0IGJvdHRvbSBvZiByZWN0MSwgY29tcGFyZSB0byBib3VuZCBvZiByZWN0MiwgZGV0ZXJtaW5lIGlmIGkgc2hvdWxkIGZhbGwgb3Igbm90XG4gICAgICAgICAgICBpZiAoY3Jvc3NXaWR0aCA+IGNyb3NzSGVpZ2h0ICYmIGxhc3RDcm9zc1dpZHRoID4gY3Jvc3NIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAoY3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpKSAmJiBsYXN0Q3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpID8gY29sbGlzaW9uID0gJ3JpZ2h0JyA6IGNvbGxpc2lvbiA9ICd0b3AnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyb3NzV2lkdGggPiAoLWNyb3NzSGVpZ2h0KSAmJiBsYXN0Q3Jvc3NXaWR0aCA+ICgtY3Jvc3NIZWlnaHQpID8gY29sbGlzaW9uID0gJ2xlZnQnIDogY29sbGlzaW9uID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MSBjdXI6IFwiICsgcmVjdDEueSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MSBsYXN0OiBcIiArIHJlY3QxLmxhc3RZKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlY3QyOiBcIiArIHJlY3QyLnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICByZXR1cm4gY29sbGlzaW9uO1xuXG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgIH1cbn0gLy8gZW5kIG9mIEVudGl0eSBjbGFzc1xuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHkiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtBY3Rvcn0gZnJvbSBcIi4vXCJcblxuY2xhc3MgRmxhbWVzIGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDIwLCBzcHJpdGVIZWlnaHQgPSA0MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDE7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHsgXCJhY3RpdmVcIjogZmFsc2UsIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHsgXCJkZW1vXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDgsIDksIDEwLCA5LCB0cnVlLCB0aGlzLnNjYWxlKSB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZW1vO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgICAgIGlmICh0aGlzLmlzRG9uZSkge1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLm9yaWdYO1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRmxhbWVzO1xuXG4gICAiLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiXG5pbXBvcnQge0xldmVsT25lLCBMZXZlbFR3b30gZnJvbSBcIi4uL21hcHMvbGV2ZWxzXCJcblxuXG4vKioqKioqKioqKioqKipcbkdhbWVCb2FyZCBjbGFzc1xuKioqKioqKioqKioqKiovXG5jbGFzcyBHYW1lQm9hcmQgZXh0ZW5kcyBFbnRpdHkge1xuXG4gICAgLy8gc28gdGhpcyBwcm90b3R5cGUuY2FsbCgpIGlzIGNhbGxpbmcgdGhlIEVudGl0eSBjb25zdHJ1Y3RvciB3aXRoIChnYW1lPW51bGwsIHg9MCwgeT0wKVxuICAgIGNvbnN0cnVjdG9yIChnYW1lLCBhc3NldE1hbmFnZXIsIGN0eCwgaGVybywgaHVkKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIDAsIDAsIG51bGwsIGN0eCk7XG4gICAgICAgIHRoaXMudGVzdFBvcyA9IFsxMTU3MCwgMzAwXTsgLy9EQkcvRGV2IFRvb2xcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIgPSBhc3NldE1hbmFnZXI7XG4gICAgICAgIC8vdXNlZCBmb3IgcmVjYWxsaW5nIGEgc2VjdGlvbidzIG5vbi10ZXJyYWluLCBub24taGF6YXJkIGFjdG9ycyBvbiBkZWF0aFxuICAgICAgICB0aGlzLmxldmVsTnVtO1xuICAgICAgICB0aGlzLnNlY3Rpb25OdW07XG4gICAgICAgIC8vcG9pbnQgdmFsdWUgdGltZXJcbiAgICAgICAgdGhpcy5wdnQgPSAwO1xuICAgICAgICB0aGlzLnB2dHQgPSAyMDtcbiAgICAgICAgdGhpcy5sb3N0U2NvcmUgPSAwO1xuXG4gICAgICAgIHRoaXMuZGVhZEVuZW1pZXMgPSBbW1swLDBdLCAwLCAwXV07XG5cbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMudGltZTtcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5odWQgPSBodWQ7XG4gICAgICAgIHRoaXMubGV2ZWw7XG4gICAgICAgIHRoaXMuY2hlY2tOb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2twb2ludCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJuZXdCb2FyZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJsb2FkaW5nTGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWRlZExldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwb3B1bGF0ZUxldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZXNwYXduTGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWRpbmdTZWN0aW9uXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsb2FkZWRTZWN0aW9uXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZXNwYXduU2VjdGlvblwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibmV3TGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWROZXh0TGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob3dQb2ludFZhbHVlc1wiOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxvYWROZXh0TGV2ZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZW50ZXJlZCBsb2FkTmV4dExldmVsXCIpO1xuICAgICAgICAgICAgdmFyIG5leHRMZXZlbCA9IHRoaXMubGV2ZWwubmV4dExldmVsO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICB0aGlzLmdldExldmVsKG5leHRMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmxvYWRlZExldmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbC5sb2FkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ0xldmVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsLnBvcHVsYXRlTWFwKC0xKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nTGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc2V0UG9zKFt0aGlzLmNoZWNrTm9kZS54LCB0aGlzLmNoZWNrTm9kZS55XSlcbiAgICAgICAgICAgICAgICB0aGlzLm5leHROb2RlID0gdGhpcy5jaGVja3BvaW50cy5uZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxvYWRlZExldmVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5uZXdMZXZlbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkodGhpcy5oZXJvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KHRoaXMubGV2ZWwucG9ydGFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8ucmVtb3ZlRnJvbVdvcmxkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkodGhpcy5odWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVkLnJlbW92ZUZyb21Xb3JsZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxvYWRpbmdTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3blNlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwucG9wdWxhdGVNYXAodGhpcy5zZWN0aW9uTnVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVsb2FkZWQgc2VjdGlvbiBcIiArIHRoaXMuc2VjdGlvbk51bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbC5uZXh0TGV2ZWwgPiAwICYmIHRoaXMuY2hlY2tOb2RlLnN0YXRlcy5pc0JhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQm9hcmQoXCJsZXZlbFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9JZiBlbnRlcmluZyBuZXh0IGNoZWNrcG9pbnRcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja05vZGUuc3RhdGVzLmlzQmFjayAmJiB0aGlzLmhlcm8ueCA+PSB0aGlzLmNoZWNrTm9kZS5uZXh0LngpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUgPSB0aGlzLmNoZWNrTm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja05vZGUuc3RhdGVzLmFjdGl2YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2twb2ludCA9IHRoaXMuY2hlY2tOb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlggPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZYO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWSA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5jYW1TcGVlZFggPSB0aGlzLmNoZWNrTm9kZS5uZXh0Q2FtU3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5jYW1TcGVlZFkgPSB0aGlzLmNoZWNrTm9kZS5uZXh0Q2FtU3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0lmIGVudGVyaW5nIHByZXZpb3VzIGNoZWNrcG9pbnRcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuaXNGcm9udCAmJiB0aGlzLmhlcm8ueCA8IHRoaXMuY2hlY2tOb2RlLnhcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmhlcm8ueCA+PSB0aGlzLmNoZWNrTm9kZS5wcmV2LngpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUgPSB0aGlzLmNoZWNrTm9kZS5wcmV2O1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZYID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlkgPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZZO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuY2FtU3BlZWRYID0gdGhpcy5jaGVja05vZGUucHJldkNhbVNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuY2FtU3BlZWRZID0gdGhpcy5jaGVja05vZGUucHJldkNhbVNwZWVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5oZXJvLnN0YXRlcy5yZXNwYXduZWQpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2xlYXJCb2FyZChcImxldmVsXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5yZXNwYXduKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnNldFBvcyhbdGhpcy5sYXN0Q2hlY2twb2ludC54LCB0aGlzLmxhc3RDaGVja3BvaW50LnkgLSAxMF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJCb2FyZChcImFjdG9yc1wiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3Bhd25cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwYXduTWVzc2FnZSA9IDIqdGhpcy5wdnR0O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wdnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHZ0LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3Bhd25NZXNzYWdlID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkcmF3XCIpXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCJCb2xkIDI1cHggVmVyZGFuYVwiO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIi1cIiArIHRoaXMubG9zdFNjb3JlICsgXCIgcG9pbnRzXCIsXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlcm8ueCArIDEwLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5oZXJvLnkgLSAxNTBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnJlc3Bhd25NZXNzYWdlLS07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGVhZEVuZW1pZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuZGVhZEVuZW1pZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWFkRW5lbWllc1tpXVsyXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRFbmVtaWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZHJhd1wiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyMHB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjMDBmZjAwXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiK1wiICsgdGhpcy5kZWFkRW5lbWllc1tpXVsxXSArIFwiIHBvaW50c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkRW5lbWllc1tpXVswXVswXSArIDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkRW5lbWllc1tpXVswXVsxXSAtIDE1MFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRFbmVtaWVzW2ldWzJdLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJCb2FyZChzY29wZSkge1xuICAgICAgICAvL3Njb3BlIHdpbGwgcmFuZ2UgZnJvbSBhY3RvcnMgb25seSwgdG8gdGhlIGVudGlyZSBsZXZlbC5cbiAgICAgICAgaWYgKHNjb3BlID09PSBcImFjdG9yc1wiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nU2VjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25OdW0gPSB0aGlzLmxhc3RDaGVja3BvaW50Lm51bTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzY29wZSA9PT0gXCJsZXZlbFwiKSB7XG4gICAgICAgICAgICB0aGlzLmhlcm8uc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMubmV3TGV2ZWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQm9hcmQgQ2xlYXJlZFwiKTtcbiAgICB9XG5cbiAgICBjbGVhclN0YXRlcygpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ0xldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWRlZExldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLnBvcHVsYXRlTGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3bkxldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWRpbmdTZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWRlZFNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3blNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubmV3TGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubG9hZE5leHRMZXZlbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldExldmVsKGxldmVsKSB7XG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IG5ldyBMZXZlbE9uZSh0aGlzLmdhbWUsIHRoaXMuYXNzZXRNYW5hZ2VyLCB0aGlzLmN0eCk7XG4gICAgICAgICAgICB0aGlzLmxldmVsTnVtID0gbGV2ZWw7XG4gICAgICAgICAgICAvL1Nob3VsZCBtb3ZlIHRoaXMgaW50byB0aGUgTGV2ZWxUd28gY2xhc3MoPylcbiAgICAgICAgICAgIC8vQ3JlYXRlIGNoZWNrcG9pbnQgbGlua2VkIGxpc3QuXG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrUG9zID0gdGhpcy5sZXZlbC5jaGVja3BvaW50c1swXTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tYID0gY3VyckNoZWNrUG9zWzBdO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1kgPSBjdXJyQ2hlY2tQb3NbMV07XG4gICAgICAgICAgICB2YXIgbGlzdEZyb250ID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgMCwgdGhpcy5sZXZlbC5jYW1WYWxzWzBdLCB0aGlzLmxldmVsLmNhbVNwZWVkc1swXSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBsaXN0RnJvbnQuc3RhdGVzLmlzRnJvbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzUHJldiA9IGZhbHNlO1xuICAgICAgICAgICAgbGlzdEZyb250Lm51bSA9IDA7XG4gICAgICAgICAgICBsaXN0RnJvbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5hY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVjayA9IG51bGw7XG4gICAgICAgICAgICB2YXIgcHJldkNoZWNrID0gbGlzdEZyb250O1xuICAgICAgICAgICAgLy9pbnN0YW50aWF0ZSBjaGVja3BvaW50IGxpbmtlZCBsaXN0XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRoaXMubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tQb3MgPSB0aGlzLmxldmVsLmNoZWNrcG9pbnRzW2ldO1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1ggPSBjdXJyQ2hlY2tQb3NbMF07XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrWSA9IGN1cnJDaGVja1Bvc1sxXTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5sZXZlbC5jaGVja3BvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjayA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIGksIHRoaXMubGV2ZWwuY2FtVmFsc1tpXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbaV0sIG51bGwsIHByZXZDaGVjayk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmlzQmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2sgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCBpLCB0aGlzLmxldmVsLmNhbVZhbHNbaV0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzW2ldLCBudWxsLCBwcmV2Q2hlY2spO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2subnVtID0gaTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5oYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrLm51bSA9IGk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrLmFkZE5leHQoY3VyckNoZWNrKTtcbiAgICAgICAgICAgICAgICBwcmV2Q2hlY2suc2V0Qm91bmRzKCk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrID0gY3VyckNoZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VyckNoZWNrLnNldEJvdW5kcygpO1xuICAgICAgICAgICAgdGhpcy5jaGVja3BvaW50cyA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlID0gbGlzdEZyb250O1xuICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2twb2ludCA9IHRoaXMuY2hlY2tOb2RlO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZYID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWSA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBuZXcgTGV2ZWxUd28odGhpcy5nYW1lLCB0aGlzLmFzc2V0TWFuYWdlciwgdGhpcy5jdHgpO1xuICAgICAgICAgICAgdGhpcy5sZXZlbE51bSA9IGxldmVsO1xuICAgICAgICAgICAgLy9TaG91bGQgbW92ZSB0aGlzIGludG8gdGhlIExldmVsVHdvIGNsYXNzKD8pXG4gICAgICAgICAgICAvL0NyZWF0ZSBjaGVja3BvaW50IGxpbmtlZCBsaXN0LlxuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1BvcyA9IHRoaXMubGV2ZWwuY2hlY2twb2ludHNbMF07XG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrWCA9IGN1cnJDaGVja1Bvc1swXTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tZID0gY3VyckNoZWNrUG9zWzFdO1xuICAgICAgICAgICAgdmFyIGxpc3RGcm9udCA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIDAsIHRoaXMubGV2ZWwuY2FtVmFsc1swXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbMF0sIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgbGlzdEZyb250LnN0YXRlcy5pc0Zyb250ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1ByZXYgPSBmYWxzZTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5udW0gPSAwO1xuICAgICAgICAgICAgbGlzdEZyb250LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBsaXN0RnJvbnQuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2sgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHByZXZDaGVjayA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIC8vaW5zdGFudGlhdGUgY2hlY2twb2ludCBsaW5rZWQgbGlzdFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB0aGlzLmxldmVsLmNoZWNrcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrUG9zID0gdGhpcy5sZXZlbC5jaGVja3BvaW50c1tpXTtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tYID0gY3VyckNoZWNrUG9zWzBdO1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1kgPSBjdXJyQ2hlY2tQb3NbMV07XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2sgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCBpLCB0aGlzLmxldmVsLmNhbVZhbHNbaV0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzW2ldLCBudWxsLCBwcmV2Q2hlY2spO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5pc0JhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgaSwgdGhpcy5sZXZlbC5jYW1WYWxzW2ldLCB0aGlzLmxldmVsLmNhbVNwZWVkc1tpXSwgbnVsbCwgcHJldkNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLm51bSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJDaGVjay5udW0gPSBpO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjay5hZGROZXh0KGN1cnJDaGVjayk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrLnNldEJvdW5kcygpO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjayA9IGN1cnJDaGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJDaGVjay5zZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2twb2ludHMgPSBsaXN0RnJvbnQ7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTm9kZSA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIHRoaXMubGFzdENoZWNrcG9pbnQgPSB0aGlzLmNoZWNrTm9kZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWCA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlg7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlkgPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZZO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9vbiBoZXJvIGRlYXRoLCBwYXVzZSBnYW1lIHVwZGF0ZXMgYW5kIHNhdmUgc3RhdGVzIG9mIGFsbCBlbnRpdGllcyBwcmlvciB0byB0aGUgY2hlY2twb2ludFxufSAvLyBlbmQgR2FtZUJvYXJkIGNsYXNzXG5cbi8vQ2hlY2twb2ludCBcIm5vZGVcIlxuY2xhc3MgQ2hlY2twb2ludCBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgY3R4LCBudW0sIGNhbWVyYVNoaWZ0ID0gWzIsIDEuNV0sIGNhbWVyYVNwZWVkID0gWzgsIDhdLCBuZXh0ID0gbnVsbCwgcHJldiA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgbnVsbCwgY3R4KTtcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcbiAgICAgICAgdGhpcy5wcmV2ID0gcHJldjtcbiAgICAgICAgdGhpcy5jYW1PZmZYID0gY2FtZXJhU2hpZnRbMF07XG4gICAgICAgIHRoaXMuY2FtT2ZmWSA9IGNhbWVyYVNoaWZ0WzFdO1xuICAgICAgICB0aGlzLm5leHRDYW1TcGVlZCA9IGNhbWVyYVNwZWVkWzBdO1xuICAgICAgICB0aGlzLnByZXZDYW1TcGVlZCA9IGNhbWVyYVNwZWVkWzFdO1xuICAgICAgICB0aGlzLnJpZ2h0Qm91bmQgPSB0aGlzLng7XG4gICAgICAgIHRoaXMubGVmdEJvdW5kID0gdGhpcy54IC0gMTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uUmFkaXVzID0gWzYwLCA2MF1cbiAgICAgICAgdGhpcy5udW0gPSBudW07IC8vQ2hlY2twb2ludCdzIG9yZGVyIGluIGxpc3RcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImlzRnJvbnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlzQmFja1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhY3RpdmF0ZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc05leHRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1ByZXZcIjogZmFsc2UsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzTmV4dCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzUHJldiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG5cbiAgICB9XG5cbiAgICBhZGROZXh0KG5leHQpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcbiAgICAgICAgdGhpcy5zdGF0ZXMuaGFzTmV4dCA9IHRydWU7XG4gICAgfVxuXG4gICAgc2V0Qm91bmRzKCkge1xuICAgICAgICBpZiAodGhpcy5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0Qm91bmQgPSBNYXRoLmZsb29yKCh0aGlzLm5leHQueCArIHRoaXMueCkgLyAyKSAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0Qm91bmQgPSB0aGlzLng7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0Qm91bmQgPSBNYXRoLmZsb29yKCh0aGlzLnByZXYueCArIHRoaXMueCkgLyAyKSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRCb3VuZCA9IHRoaXMueDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoKSB7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZDtcbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVuZW15LFxuICAgIFRlcnJhaW4sXG4gICAgSHVydGJveCxcbiAgICBQcm9qZWN0aWxlLFxuICAgIEJvbWIsXG59IGZyb20gXCIuL1wiXG5cblxuLy9yb3cgOSwgNDB4MzAsIDExIGZyYW1lc1xuY2xhc3MgSGFuZCBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSA0MCwgc3ByaXRlSGVpZ2h0ID0gMzApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSA3O1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAxMjU7XG5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gMDsvL3VwZGF0ZWQgaW4gcmVsZXZhbnQgc3RhdGUgdXBkYXRlc1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArIDEwO1xuICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5wb2ludFZhbHVlID0gMTA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMF0gPSA0MDAwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzFdID0gNzAwO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDUwOyAvL3RocmVlIG5vcm1hbCBoaXRzLlxuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMudGhyb3d0aW1lID0gNDtcbiAgICAgICAgdGhpcy5jb29sZG93biA9IDEyMDtcbiAgICAgICAgdGhpcy5jb29sZG93bnZhcmlhbmNlID0gMjBcbiAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gMDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiaWRsaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YXJ0aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJ0aHJvd2luZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaGFzVGhyb3duXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZWNvdmVyaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJpZGxlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTEsIDUsIDEsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJzdGFydHVwXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTEsIDUsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxKSxcbiAgICAgICAgICAgIFwidGhyb3dcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxMSwgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgNSksXG4gICAgICAgICAgICBcInJlY292ZXJcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxMSwgNiwgMywgZmFsc2UsIHRoaXMuc2NhbGUsIDYpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDQwLCAzMCwgMjAsIDUsIDAsIDEwKTtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgICAgIC8vaW5zZXJ0IGF0dGFjayBiZWhhdmlvci4gTG9vcHMgZm9yIG5vdy5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzBdXG4gICAgICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPD0gdGhpcy5zaWdodFJhZGl1c1sxXVxuICAgICAgICAgICAgICAgICYmIHRoaXMuY29vbGRvd25UaW1lciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhcnRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDQwLCAzMCwgMjAsIDIwLCAwLCAxMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFydGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnRocm93aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy50aHJvd2luZykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5oYXNUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBCb21iKHRoaXMuZ2FtZSwgdGhpcy54ICsgdGhpcy5mYWNpbmcgKiAxMCwgdGhpcy55IC0gMjAsIHRoaXMuaW1nLCB0aGlzLmN0eCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZSwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSAvIHRoaXMuZGlzdGFuY2UpKTsgLy92YWx1ZSBvZiA3NSBleHBsb2RlcyBvbiBzdGF0aW9uYXJ5IEhlcm9cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gdGhpcy50aHJvd3RpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzVGhyb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudGhyb3dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZWNvdmVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZWNvdmVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb2xkb3duVGltZXIgPSB0aGlzLmNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29vbGRvd25UaW1lci0tO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy55VmVsb2NpdHkgKz0gdGhpcy5ncmF2aXR5ICogdGhpcy5ncmF2aXR5O1xuICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgdGhpcy55VmVsb2NpdHkpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zdGFydHVwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy50aHJvd2luZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMudGhyb3c7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJlY292ZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0LCB4T2ZmLCB5T2ZmKSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDIgKyB4T2ZmO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyB5T2ZmO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgLy9UT0RPIEFkZCBjb2xsaXNpb24gd2l0aCB0ZXJyYWluXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQgLSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgKyBvdGhlci5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQgLSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2Vsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnggPSB0aGlzLmJvdW5kWCArIDg3O1xuICAgICAgICAgICAgLy8gICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9lbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgLy8gICAgdGhpcy54ID0gdGhpcy5ib3VuZFggLSA4NztcbiAgICAgICAgICAgIC8vICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiUHJvamVjdGlsZVwiICYmICF0aGlzLnN0YXRlcy5odXJ0KSB7XG4gICAgICAgICAgICAvL25vdGhpbmcgZm9yIG5vd1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJIdXJ0Ym94XCIgJiYgIXRoaXMuc3RhdGVzLmh1cnQpIHtcbiAgICAgICAgICAgIG90aGVyLmhhc093blByb3BlcnR5KFwiaXNFbmVteVwiKTtcbiAgICAgICAgICAgIG90aGVyLmhhc093blByb3BlcnR5KFwiZGFtYWdlXCIpO1xuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEhhbmQ7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW50aXR5LFxuICAgIEhlcm8sXG4gICAgSHVydGJveCxcbiAgICBUZXJyYWluLFxuICAgIEFjdG9yLFxuICAgIEVuZW15LFxuICAgIFByb2plY3RpbGUsXG59IGZyb20gXCIuL1wiXG5cblxuLyoqKioqKioqKioqXG5nYW1lIC0gYSByZWZlcmVuY2UgdG8gdGhlIGdhbWUgaW4gd2hpY2ggdGhpcyBlbnRpdHkgZXhpc3RzXG54LCB5IC0gZW50aXR5J3MgY29vcmRpbmF0ZXNcbnJlbW92ZUZyb21Xb3JsZCAtIGEgZmxhZyB0aGF0IGRlbm90ZXMgd2hlbiB0byByZW1vdmUgdGhpcyBlbnRpdHkgZnJvbSB0aGUgZ2FtZVxuKioqKioqKioqKioqL1xuY2xhc3MgTGF2YSBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLCBzcHJpdGVXaWR0aCA9IDY0KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgdGhpcy55ICs9ICg5NiAqIDMgLSA2ICogMyk7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDEyODtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiAodGhpcy5zcHJpdGVIZWlnaHQgLSAzMik7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54IC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCAqIHRoaXMuc2NhbGUgKyAzNyAqIHRoaXMuc2NhbGU7XG5cbiAgICAgICAgdGhpcy5maXJlQ29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZmlyZUNvb2xkb3duID0gMTAwMDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxLy90aGlzLmdhbWUuaGVyby54Lm1heEhlYWx0aFxuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIDEyOF0sIDcsIDEsIDcsIDgsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy8vL0hhdmUgTGF2YSBzcGF3biBmaXJlYmFsbHMgKipJIGRvbid0IGxpa2UgdGhpcywgYnV0IEknbSBsZWF2aW5nIHRoZSBjb2RlIGZvciBwb3N0ZXJpdHkncyBzYWtlLioqXG4gICAgICAgIC8vaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IDUwMCAmJiB0aGlzLmZpcmVDb29sZG93blRpbWVyIDw9IDApIHtcbiAgICAgICAgLy8gICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgRmlyZWJhbGwodGhpcy5nYW1lLCB0aGlzLnggLSAzMiwgdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQqMiwgdGhpcy5pbWcsIHRoaXMuY3R4LCA0LCAxNSkpO1xuICAgICAgICAvLyAgICB0aGlzLmZpcmVDb29sZG93blRpbWVyID0gdGhpcy5maXJlQ29vbGRvd247XG4gICAgICAgIC8vfVxuICAgICAgICAvL2lmICh0aGlzLmZpcmVDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAvLyAgICB0aGlzLmZpcmVDb29sZG93blRpbWVyLS07XG4gICAgICAgIC8vfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpXG4gICAgICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBGaXJlYmFsbCBleHRlbmRzIEVuZW15IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIGNvb2xkb3duID0gMTUwLCB5U3BlZWQgPSAxMiwgc3Bhd25PZmZzZXQpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA2ICogdGhpcy5zY2FsZTtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDIwICogdGhpcy5zY2FsZTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGgvMjtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCp0aGlzLnNjYWxlLzI7XG5cbiAgICAgICAgdGhpcy5vcmlnWCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5vcmlnWSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5vcmlnQm91bmRYID0gdGhpcy5ib3VuZFg7XG4gICAgICAgIHRoaXMub3JpZ0JvdW5kWSA9IHRoaXMuYm91bmRZO1xuXG4gICAgICAgIHRoaXMueVNwZWVkID0geVNwZWVkO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDI7XG4gICAgICAgIHRoaXMuY29vbGRvd25UaW1lciA9IHNwYXduT2Zmc2V0O1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gY29vbGRvd247XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGFydFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJtaWRkbGVfdXBcIjogZmFsc2UsXG4gICAgICAgICAgICBcInBlYWtfdXBcIjogZmFsc2UsXG4gICAgICAgICAgICBcInBlYWtfZG93blwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibWlkZGxlX2Rvd25cIjogZmFsc2UsXG4gICAgICAgICAgICBcImZpbmlzaFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDYsIHRydWUsIHRoaXMuc2NhbGUsIDYpLFxuICAgICAgICAgICAgXCJzdGFydFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgNiksXG4gICAgICAgICAgICBcIm1pZGRsZV91cFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgNyksXG4gICAgICAgICAgICBcInBlYWtfdXBcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDgpLFxuICAgICAgICAgICAgXCJwZWFrX2Rvd25cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDkpLFxuICAgICAgICAgICAgXCJtaWRkbGVfZG93blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCAxMywgMywgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTApLFxuICAgICAgICAgICAgXCJmaW5pc2hcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDExKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhcnQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3Jhdml0eSk7XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDwgMTAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPCAxMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwibGF2YV9iYWxsXCIsIDAuNSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC0xICogdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubWlkZGxlX3VwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMubWlkZGxlX3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLS41ICogdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubWlkZGxlX3VwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnBlYWtfdXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5wZWFrX3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLS4xICogdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucGVha191cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5wZWFrX2Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5wZWFrX2Rvd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCAuMSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnBlYWtfZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5taWRkbGVfZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLm1pZGRsZV9kb3duKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLjUgKiB0aGlzLnlTcGVlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5taWRkbGVfZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5maW5pc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5maW5pc2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCB0aGlzLnlTcGVlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5maW5pc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvb2xkb3duVGltZXIgPSB0aGlzLmNvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLm9yaWdYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLm9yaWdZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMub3JpZ0JvdW5kWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLm9yaWdCb3VuZFk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvb2xkb3duVGltZXItLTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLm1pZGRsZV91cCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMubWlkZGxlX3VwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5wZWFrX3VwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5wZWFrX3VwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5wZWFrX2Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnBlYWtfZG93bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubWlkZGxlX2Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLm1pZGRsZV9kb3duO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5maW5pc2gpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpbmlzaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBTcGlrZXMgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgYWN0aXZlID0gdHJ1ZSwgdGltZXIsIHRpbWVPZmZzZXQgPSAwLCBsZW5ndGggPSAwLCBpbnRlcnZhbCA9IDIwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW50aXR5XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDYwO1xuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKCh0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUqKHRoaXMuc3ByaXRlV2lkdGggLSAyOCk7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogKHRoaXMuc3ByaXRlSGVpZ2h0LzIgKyAzKTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLnggLSB0aGlzLnNwcml0ZVdpZHRoICsgdGhpcy5zY2FsZSoxNDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCAqIHRoaXMuc2NhbGUgKyAzNyAqIHRoaXMuc2NhbGU7XG5cbiAgICAgICAgdGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPSB0aW1lT2Zmc2V0O1xuICAgICAgICB0aGlzLnNwaWtlQ29vbGRvd24gPSB0aW1lcjtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxOyAvL3RoaXMuZ2FtZS5oZXJvLm1heEhlYWx0aFxuICAgICAgICB0aGlzLmludGVydmFsID0gaW50ZXJ2YWw7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW5hY3RpdmVfdXBcIjogIWFjdGl2ZSxcbiAgICAgICAgICAgIC8vXCJpbmFjdGl2ZV91cF9zcGF3bmVkXCI6IGZhbHNlLCAvL0RvZXNuJ3Qgd29yaywgdW51c2VkIGZvciBub3dcbiAgICAgICAgICAgIFwiaW5hY3RpdmVfZG93blwiOiBhY3RpdmUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDYsIDUsIDUsIGZhbHNlLCB0aGlzLnNjYWxlLCAxKSxcbiAgICAgICAgICAgIFwiaW5hY3RpdmVfdXBcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgNiwgMTAsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDMpLFxuICAgICAgICAgICAgXCJpbmFjdGl2ZV9kb3duXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDYsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmluYWN0aXZlX2Rvd247XG4gICAgICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbmV4dE9mZnNldCA9IHRpbWVPZmZzZXQgKyB0aGlzLmludGVydmFsO1xuICAgICAgICAgICAgbGVuZ3RoLS07XG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBTcGlrZXModGhpcy5nYW1lLCB0aGlzLnggKyB0aGlzLnNwcml0ZVdpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMueSwgdGhpcy5pbWcsIGN0eCwgMiwgdGhpcy5hY3RpdmUsIHRoaXMuc3Bpa2VDb29sZG93biwgbmV4dE9mZnNldCwgbGVuZ3RoLCB0aGlzLmludGVydmFsKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlICYmIHRoaXMuc3Bpa2VDb29sZG93blRpbWVyID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgIT09IDEgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgIT09IDUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYICsgMTksIHRoaXMuYm91bmRZLCAtdGhpcy5zcHJpdGVXaWR0aCAtIC41ICogdGhpcy5ib3VuZFdpZHRoLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoIC8gMiwgdGhpcy5zcHJpdGVIZWlnaHQgLyAyLCB0aGlzLmJvdW5kV2lkdGggLSAxMywgdGhpcy5ib3VuZEhlaWdodCAtIDQyLCB0aGlzLnNjYWxlLCB0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhbHRoXCIsIDIsIHRydWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFggKyAxOSwgdGhpcy5ib3VuZFksIC10aGlzLnNwcml0ZVdpZHRoIC0gLjUgKiB0aGlzLmJvdW5kV2lkdGgsIDAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggLyAyLCB0aGlzLnNwcml0ZUhlaWdodCAvIDIsIHRoaXMuYm91bmRXaWR0aCAtIDEzLCB0aGlzLmJvdW5kSGVpZ2h0IC0gNTYsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCxcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFsdGhcIiwgMiwgdHJ1ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmluYWN0aXZlX2Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3Bpa2VDb29sZG93blRpbWVyID0gdGhpcy5zcGlrZUNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNwaWtlQ29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3Bpa2VDb29sZG93blRpbWVyLS07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmluYWN0aXZlX2Rvd24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwaWtlQ29vbGRvd25UaW1lciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pbmFjdGl2ZV9kb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy90aGlzLnNwaWtlQ29vbGRvd25UaW1lciA9IHRoaXMuc3Bpa2VDb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5pbmFjdGl2ZV91cCkge1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDwgMzAwICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCArIDMsIHRoaXMuYm91bmRZLCAtdGhpcy5zcHJpdGVXaWR0aCAtIC41KnRoaXMuYm91bmRXaWR0aCwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCAvIDIsIHRoaXMuc3ByaXRlSGVpZ2h0IC8gMiwgdGhpcy5ib3VuZFdpZHRoIC0gMTMsIHRoaXMuYm91bmRIZWlnaHQgLSA0MiwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBcImhlYWx0aFwiLCB0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaW5hY3RpdmVfZG93bikge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaW5hY3RpdmVfZG93bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaW5hY3RpdmVfdXApIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmluYWN0aXZlX3VwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3RpbGVIYXphcmQgZXh0ZW5kcyBFbmVteSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLCB4U3BlZWQsIHlTcGVlZCwgZGlyZWN0aW9ucywgbGlmZXNwYW4pIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICAvL3RoaXMueSArPSA0NDsgR2l2ZSBhICs0NCBvZmZzZXQgd2hlbiBpbnN0YW50aWF0aW5nIFxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMub3JpZ1ggPSB0aGlzLng7XG4gICAgICAgIHRoaXMub3JpZ1kgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogOCArIDM7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogOCArIDM7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5zY2FsZSAqIDU7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlLzIgKyA1ICogdGhpcy5zY2FsZTtcblxuICAgICAgICB0aGlzLnhTcGVlZCA9IHhTcGVlZDtcbiAgICAgICAgdGhpcy55U3BlZWQgPSB5U3BlZWQ7XG4gICAgICAgIHRoaXMueERpciA9IGRpcmVjdGlvbnNbMF07XG4gICAgICAgIHRoaXMueURpciA9IGRpcmVjdGlvbnNbMV07XG4gICAgICAgIHRoaXMubGlmZXNwYW4gPSBsaWZlc3BhbjtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLnRpY2sgPSAxO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEyKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zKHRoaXMueFNwZWVkICogdGhpcy54RGlyLCB0aGlzLnlTcGVlZCAqIHRoaXMueURpcik7XG4gICAgICAgIGlmICh0aGlzLmxpZmVzcGFuID4gMCkge1xuICAgICAgICAgICAgdGhpcy5saWZlc3Bhbi0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL1RPRE8gcmVmYWN0b3IgdGhpcyAoYXJ0aWZhY3QgZnJvbSBpbnN0YW5jZW9mIGRheXMpXG4gICAgICAgIGVsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiQWN0b3JcIiAmJiAhKG90aGVyLm5hbWUgPT09IFwiRW5lbXlcIikpIHsvL0hlcm8gY29sbGlzaW9uXG4gICAgICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aWNrID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50aWNrLS07XG4gICAgICAgICAgICAgICAgb3RoZXIuaGVhbHRoIC09IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkh1cnRib3hcIikge1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgICAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiZGFtYWdlXCIpO1xuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3RpbGVDaXJjbGUgZXh0ZW5kcyBFbmVteSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLCB4U3BlZWQsIHlTcGVlZCwgcmFkaXVzID0gMTAsIHRpbWVyID0gMTAwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgLy90aGlzLnkgKz0gNDQ7IEdpdmUgYSArNDQgb2Zmc2V0IHdoZW4gaW5zdGFudGlhdGluZyBcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLm9yaWdYID0gdGhpcy54O1xuICAgICAgICB0aGlzLm9yaWdZID0gdGhpcy55O1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy50aW1lciA9IHRpbWVyO1xuICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCAtdGhpcy5yYWRpdXMpO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuc2NhbGUgKiA1O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0ICogdGhpcy5zY2FsZSAvIDIgKyA1ICogdGhpcy5zY2FsZTtcblxuICAgICAgICB0aGlzLnhTcGVlZCA9IHhTcGVlZDtcbiAgICAgICAgdGhpcy55U3BlZWQgPSB5U3BlZWQ7XG4gICAgICAgIHRoaXMucXVhZHJhbnRzID0gW1sxLCAxXSwgWy0xLCAxXSwgWy0xLCAtMV0sIFsxLCAtMV1dO1xuICAgICAgICB0aGlzLnF1YWRyYW50ID0gMDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLnRpY2sgPSAxO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEyKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnggLSB0aGlzLm9yaWdYID49IDAgJiYgdGhpcy55IC0gdGhpcy5vcmlnWSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnF1YWRyYW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnggLSB0aGlzLm9yaWdYID49IDAgJiYgdGhpcy55IC0gdGhpcy5vcmlnWSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucXVhZHJhbnQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIHRoaXMub3JpZ1ggPCAwICYmIHRoaXMueSAtIHRoaXMub3JpZ1kgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnF1YWRyYW50ID0gMjtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAodGhpcy54IC0gdGhpcy5vcmlnWCA8IDAgJiYgdGhpcy55IC0gdGhpcy5vcmlnWSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnF1YWRyYW50ID0gMztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVBvcyh0aGlzLnhTcGVlZCAqIHRoaXMucXVhZHJhbnRzW3RoaXMucXVhZHJhbnRdWzBdLCB0aGlzLnlTcGVlZCAqIHRoaXMucXVhZHJhbnRzW3RoaXMucXVhZHJhbnRdWzFdKTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgLy9pZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgLy8gICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAvL31cbiAgICAgICAgLy8vL1RPRE8gcmVmYWN0b3IgdGhpcyAoYXJ0aWZhY3QgZnJvbSBpbnN0YW5jZW9mIGRheXMpXG4gICAgICAgIC8vZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJBY3RvclwiICYmICEob3RoZXIubmFtZSA9PT0gXCJFbmVteVwiKSkgey8vSGVybyBjb2xsaXNpb25cbiAgICAgICAgLy8gICAgaWYgKG90aGVyLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgIC8vICAgICAgICBpZiAodGhpcy50aWNrID09PSAwKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgdGhpcy50aWNrLS07XG4gICAgICAgIC8vICAgICAgICBvdGhlci5oZWFsdGggLT0gMTtcbiAgICAgICAgLy8gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkh1cnRib3hcIikge1xuICAgICAgICAvLyAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiaXNFbmVteVwiKTtcbiAgICAgICAgLy8gICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgLy8gICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy99XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuY2xhc3MgTGF1bmNoZXIgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgeFNwZWVkLCB5U3BlZWQsIGRpcmVjdGlvbnMsIGNvb2xkb3duLCBwcm9qZWN0aWxlTGlmZXNwYW4sIGxhdW5jaFRpbWVPZmZzZXQgPSAwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW50aXR5XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIC8vdGhpcy55ICs9IDQ0OyBHaXZlIGEgKzQ0IG9mZnNldCB3aGVuIGluc3RhbnRpYXRpbmcgXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDYwO1xuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKCh0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiA4O1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDg7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54IC0gdGhpcy5zcHJpdGVXaWR0aCArIHRoaXMuc2NhbGUgKiA4O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0ICogdGhpcy5zY2FsZSArIDggKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMueFNwZWVkID0geFNwZWVkO1xuICAgICAgICB0aGlzLnlTcGVlZCA9IHlTcGVlZDtcbiAgICAgICAgdGhpcy54RGlyID0gZGlyZWN0aW9uc1swXTtcbiAgICAgICAgdGhpcy55RGlyID0gZGlyZWN0aW9uc1sxXTtcbiAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciA9IGxhdW5jaFRpbWVPZmZzZXQ7XG4gICAgICAgIHRoaXMuc2hvdENvb2xkb3duID0gY29vbGRvd247XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUxpZmVzcGFuID0gcHJvamVjdGlsZUxpZmVzcGFuO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDIwKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICgvKk1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IDUwMDAgJiYqLyB0aGlzLnNob3RDb29sZG93blRpbWVyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBQcm9qZWN0aWxlSGF6YXJkKHRoaXMuZ2FtZSwgdGhpcy54IC0gdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSxcbiAgICAgICAgICAgICAgICB0aGlzLnhTcGVlZCwgdGhpcy55U3BlZWQsIFt0aGlzLnhEaXIsIHRoaXMueURpcl0sIHRoaXMucHJvamVjdGlsZUxpZmVzcGFuKSk7XG4gICAgICAgICAgICB0aGlzLnNob3RDb29sZG93blRpbWVyID0gdGhpcy5zaG90Q29vbGRvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2hvdENvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3RDb29sZG93blRpbWVyLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICAvL3RoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgTGF2YSxcbiAgICBGaXJlYmFsbCxcbiAgICBTcGlrZXMsXG4gICAgUHJvamVjdGlsZUhhemFyZCxcbiAgICBQcm9qZWN0aWxlQ2lyY2xlLFxuICAgIExhdW5jaGVyXG59XG4iLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IFRlcnJhaW4gZnJvbSBcIi4vdGVycmFpblwiXG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tIFwiLi9wcm9qZWN0aWxlXCJcbmltcG9ydCBQcm9qZWN0aWxlX1N3b3JkIGZyb20gXCIuL3Byb2plY3RpbGUtc3dvcmRcIlxuaW1wb3J0IFNvbGRpZXJfU2hpZWxkIGZyb20gXCIuL3NvbGRpZXItc2hpZWxkXCJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9lbmVteVwiXG5pbXBvcnQgSHVydGJveCBmcm9tIFwiLi9odXJ0Ym94XCJcbmltcG9ydCBSZWZsZWN0Ym94IGZyb20gXCIuL3JlZmxlY3Rib3hcIlxuaW1wb3J0IEhhemFyZHMgZnJvbSBcIi4vaGF6YXJkc1wiXG5pbXBvcnQgUm9ja2V0IGZyb20gXCIuL3JvY2tldFwiXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4vYWN0b3JcIlxuXG5cbmNsYXNzIEhlcm8gZXh0ZW5kcyBBY3RvciB7XG5cbiAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgeCwgeSwgaW1nPW51bGwsIGN0eD1udWxsLCBzY2FsZT0zLCBzcHJpdGVXaWR0aD02MCwgc3ByaXRlSGVpZ2h0PTYwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiQWN0b3JcIjtcbiAgICAgICAgdGhpcy5vcmlnWSA9IHRoaXMueTsgLy9Gb3IganVtcGluZ1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMTEwO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTsgLy8gVGhpcyB3aWxsIGhlbHAgc3RvcCBIZXJvIGZyb20gc2xpcHBpbmcgYXQgZWRnZXMsIHBhcnRpY3VsYXJseSBmb3IgaG9yaXpvbnRhbGx5IGxvbmdlciBibG9ja3Mgb2YgdGVycmFpblxuXG4gICAgICAgIC8qKipTVEFUUyoqKi9cbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gKDgpO1xuICAgICAgICB0aGlzLmRhc2hTcGVlZCA9IDE3XG4gICAgICAgIHRoaXMuanVtcFN0cmVuZ3RoID0gKDIwKTtcbiAgICAgICAgdGhpcy5qdW1wc0xlZnQgPSAyO1xuICAgICAgICB0aGlzLm1heEp1bXBzID0gMjtcbiAgICAgICAgdGhpcy50ZXJtaW5hbFZlbG9jaXR5ID0gMTU7XG5cbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSAzMDtcbiAgICAgICAgdGhpcy5tYXhFbmVyZ3kgPSAzMDtcbiAgICAgICAgdGhpcy5lbmVyZ3kgPSAzMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSAzMDtcbiAgICAgICAgdGhpcy5zbGFzaEVuZXJneUNvc3QgPSAyNTtcbiAgICAgICAgdGhpcy5jbGVhdmVFbmVyZ3lDb3N0ID0gMTU7XG4gICAgICAgIHRoaXMuc2hvb3RDb3N0ID0gMjtcbiAgICAgICAgdGhpcy5zaG9vdEVuZXJneUNvc3QgPSAxMDtcbiAgICAgICAgdGhpcy5kYXNoRW5lcmd5Q29zdCA9IDc7XG5cbiAgICAgICAgdGhpcy5zdHVuRGlyID0gMDtcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gMTtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gMTtcbiAgICAgICAgXG4gICAgICAgIC8vVGltZXJzXG4gICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd24gPSAxNjtcbiAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93biA9IDE1IC8gKHRoaXMubXVsdGlwbGllciAqIDIpO1xuICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duTWluID0gMTUgLyAodGhpcy5tdWx0aXBsaWVyICogMik7XG4gICAgICAgIHRoaXMuZW5lcmd5RGVsYXkgPSAyMDtcbiAgICAgICAgdGhpcy5lbmVyZ3lEZWxheVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy52ZWxvY2l0eUNvb2xkb3duID0gMjtcbiAgICAgICAgdGhpcy52ZWxvY2l0eUNvb2xkb3duVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmp1bXBUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuanVtcENvb2xkb3duID0gMjA7XG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMDtcblxuICAgICAgICAvL0RFViBUT09MU1xuICAgICAgICB0aGlzLmdvZE1vZGVFbmVyZ3lNaW4gPSAwO1xuICAgICAgICB0aGlzLm5vdEdvZE1vZGVFbmVyZ3lNaW4gPSB0aGlzLmVuZXJneUNvb2xkb3duTWluO1xuICAgICAgICB0aGlzLmdvZEVuZXJneURlbGF5ID0gMDtcbiAgICAgICAgdGhpcy5ub3RHb2RFbmVyZ3lEZWxheSA9IHRoaXMuZW5lcmd5RGVsYXk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImVuZXJnaXplZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW52dWxuZXJhYmxlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJydW5uaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJqdW1waW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJlbmVyZ3lEYXNoXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nU3RhcnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImRhc2hpbmdNaWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImRhc2hpbmdFbmRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc0Rhc2hlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvb3RpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1Nob3RcIjogZmFsc2UsLy9UT0RPIEltcGxlbWVudCB0byByZXBsYWNlIHNob3Rsb2NrZWRcbiAgICAgICAgICAgIFwic2xhc2hpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1NsYXNoZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImNsZWF2aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNDbGVhdmVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzaG90bG9ja2VkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmcmFtZWxvY2tlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic3R1bm5lZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGVhZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVzcGF3bmVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJncm91bmRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJoYXNHcmF2aXR5XCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgICAgICBcImlzR29kXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJpZGxlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgOSwgMywgOSwgdHJ1ZSwgdGhpcy5zY2FsZSksIC8vNTB4NTBcbiAgICAgICAgICAgIFwic3R1blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDEzLCA0LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgOSksXG4gICAgICAgICAgICBcImRlYWRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAwLCAxOCwgNSwgNSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTMpLFxuICAgICAgICAgICAgXCJydW5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAxLCAyMiwgMywgMTEsIHRydWUsIHRoaXMuc2NhbGUpLCAvLzUweDUwXG4gICAgICAgICAgICAvL1Rha2VvZmY/XG4gICAgICAgICAgICBcImFzY2VuZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDgsIDMsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDIpLCAvLzUweDUwXG4gICAgICAgICAgICBcImRlc2NlbmRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxNCwgMywgNCwgdHJ1ZSwgdGhpcy5zY2FsZSwgOCksIC8vNTB4NTBcbiAgICAgICAgICAgIC8vTGFuZD9cbiAgICAgICAgICAgIFwiYWlyc2hvb3RcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAyMCwgMywgNiwgZmFsc2UsIHRoaXMuc2NhbGUsIDE0KSwgLy81MHg1MFxuICAgICAgICAgICAgXCJzaG9vdFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbODAsIDYwXSwgMywgMywgNiwgMywgZmFsc2UsIHRoaXMuc2NhbGUpLCAvLzgweDYwXG4gICAgICAgICAgICBcImd1bnJ1blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgMSwgMjIsIDMsIDExLCB0cnVlLCB0aGlzLnNjYWxlLCAxMSksIC8vNTB4NTBcbiAgICAgICAgICAgIFwic2xhc2hcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA2MF0sIDQsIDExLCAyLCAxMSwgZmFsc2UsIHRoaXMuc2NhbGUpLCAvLzgweDUwXG4gICAgICAgICAgICBcImNsZWF2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbMTAwLCA3MF0sIDksIDEzLCAyLCAxMywgZmFsc2UsIHRoaXMuc2NhbGUpLCAvLzgweDYwXG4gICAgICAgICAgICBcImRhc2hcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDcsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiZGFzaF9zdGFydFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNSwgNywgMywgMSwgZmFsc2UsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJkYXNoX21pZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNSwgNywgMywgNSwgZmFsc2UsIHRoaXMuc2NhbGUsIDEpLFxuICAgICAgICAgICAgXCJkYXNoX2VuZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNSwgNywgMywgMSwgZmFsc2UsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHsvL1RPRE8gKG1heWJlKSBmaW5kIGEgYmV0dGVyIHNvbHV0aW9uIHRvIHRoZSBmcmFtZWxvY2tlZCBsb2dpYy4gKFRvbyBtYW55IGV4Y2VwdGlvbnMgZm9yIHRoaW5ncyBsaWtlIHNsYXNoKVxuICAgICAgICAvL0RldiBUb29sIFVwZGF0ZXNcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0UG9zVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ29kVG9nZ2xlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8vLy8vLy8vLy8gYWxsIGJ1dHRvbiBjaGVja3MgZ28gaGVyZSAvLy8vLy8vLy8vL1xuICAgICAgICAgICAgLy8gS0VZIERPV05cbiAgICAgICAgICAgIC8vcnVuIHJpZ2h0XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5yaWdodF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAvKiYmIHRoaXMuc3RhdGVzLmNhblJ1biovKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWUgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vcnVuIGxlZnRcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMubGVmdF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAvKiYmIHRoaXMuc3RhdGVzLmNhblJ1biovKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2UgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZW5lcmdpemVcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmVuZXJnaXplXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9qdW1wXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5qdW1wXS5hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLmp1bXBpbmcgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkIC8qJiYgdGhpcy5zdGF0ZXMuY2FuSnVtcCovKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuanVtcGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc2hvb3RcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLnNob290XS5hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkICYmICF0aGlzLnN0YXRlcy5zaG90bG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jbGVhdmVcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmNsZWF2ZV0uYWN0aXZlICYmIHRoaXMuc3RhdGVzLmdyb3VuZGVkICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcInN3b3JkX3N3aW5nXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuY2xlYXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc2xhc2hcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLnNsYXNoXS5hY3RpdmUgJiYgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQgJiYgKCF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCB8fCB0aGlzLnN0YXRlcy5kYXNoaW5nKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLnJpZ2h0XS5hY3RpdmUpIHsgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5sZWZ0XS5hY3RpdmUpIHsgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcInN3b3JkX3N3aW5nXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UsIHRydWUsIGZhbHNlLCB0cnVlLCB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2Rhc2hcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmRhc2hdLmFjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5lcmd5ID49IHRoaXMuZGFzaEVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0tFWSBVUFxuICAgICAgICAgICAgaWYgKCEodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5yaWdodF0uYWN0aXZlIHx8IHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMubGVmdF0uYWN0aXZlKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGVzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMuZW5lcmdpemVdLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmVuZXJnaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8gVEhFTiBkbyBhY3Rpb25zIC8vLy8vLy8vLy8vLy8vXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wVGltZXIgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJ1bm5pbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jZW50ZXJYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jZW50ZXJYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vSnVtcGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmp1bXBpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5qdW1waW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qdW1wc0xlZnQgPiAwICYmIHRoaXMuanVtcFRpbWVyID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wc0xlZnQgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wVGltZXIgPSB0aGlzLmp1bXBDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSAtPSB0aGlzLmp1bXBTdHJlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0NsZWF2aW5nXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuY2xlYXZpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmVuZXJnaXplZCAmJiAhdGhpcy5zdGF0ZXMuaGFzUmVmbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAzICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHsvL1VwcGVyIGh1cnRiYm94XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0yMzAsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCAxNTAsIDUwLCB0aGlzLnNjYWxlLCAxNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC03MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAxNTAsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCAxNTAsIDUwLCB0aGlzLnNjYWxlLCAxNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID49IDMgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPD0gNikgey8vTG93ZXIgaHVydGJveFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDE1MCwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwIC0gdGhpcy5zcHJpdGVXaWR0aCAtIDEyMCwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgODAsIDEwMCwgdGhpcy5zY2FsZSwgMTUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZW5lcmdpemVkICYmICF0aGlzLnN0YXRlcy5oYXNSZWZsZWN0ZWQgJiZ0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAzICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLmNsZWF2ZUVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUmVmbGVjdGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIDMwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNDAsIDEyMCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRoaXMsIDQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUmVmbGVjdGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIDYwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNDAsIDEyMCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRoaXMsIDQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZUVuZXJneSh0aGlzLmNsZWF2ZUVuZXJneUNvc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1JlZmxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwib3V0X29mX2VuZXJneVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuY2xlYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzUmVmbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1Nob290aW5nXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmcgJiYgISh0aGlzLnNob290Q29vbGRvd25UaW1lciA+IDApKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5zaG90bG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLnNob290RW5lcmd5Q29zdCAmJiB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFByb2plY3RpbGUodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZUVuZXJneSh0aGlzLnNob290RW5lcmd5Q29zdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJoZXJvX3Nob290XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZW5lcmd5ID49IHRoaXMuc2hvb3RDb3N0ICYmICF0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFByb2plY3RpbGUodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5IC09IHRoaXMuc2hvb3RDb3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19zaG9vdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duVGltZXIgPSB0aGlzLnNob290Q29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyID0gdGhpcy5zaG9vdENvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TbGFzaGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNsYXNoaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IHRydWU7IC8vRml4ZXMgc3VwZXItZHVwZXIganVtcCBidWcuIChXaGVuIGludGVycnVwdGluZyBkYXNoLCBkYXNoIGRvZXNuJ3QgZW50ZXIgaXNEb25lKCkgc28gZ3JhdiBpc24ndCByZXNldClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPT09IDIgJiYgdGhpcy5zdGF0ZXMuZW5lcmdpemVkICYmICF0aGlzLnN0YXRlcy5zaG90bG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLnNsYXNoRW5lcmd5Q29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUHJvamVjdGlsZV9Td29yZCh0aGlzLmdhbWUsIHRoaXMueCArIDIwLCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VFbmVyZ3kodGhpcy5zbGFzaEVuZXJneUNvc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID49IDIgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPD0gNikgey8vSHVydGJveFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpLy9mYWNpbmcgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgODAsIDEwMCwgdGhpcy5zY2FsZSwgNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgLy9mYWNpbmcgbGVmdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC02MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAxMjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgODAsIDEwMCwgdGhpcy5zY2FsZSwgNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1NsYXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vRGFzaGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy51cGRhdGVQb3ModGhpcy5kYXNoU3BlZWQsIDApOyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IHRoaXMudXBkYXRlUG9zKC10aGlzLmRhc2hTcGVlZCwgMCk7IH1cbiAgICAgICAgICAgICAgICAvL1RocmVlIHBhcnQgZGFzaCAoYmV0dGVyIGludnVsbmVyYWJpbGl0eSBpbXBsZW1lbnRhdGlvbikgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaGFzRGFzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg2MCwgNjAsIDI1LCAyNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5kYXNoRW5lcmd5Q29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5IC09IHRoaXMuZGFzaEVuZXJneUNvc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmd5RGFzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneURlbGF5VGltZXIgPSB0aGlzLmVuZXJneURlbGF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzRGFzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg2MCwgNjAsIDM3LCAxNSwgMCwgLTEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdNaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmVuZXJneURhc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaW52dWxuZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nTWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmludnVsbmVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmd5RGFzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ01pZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg2MCwgNjAsIDI1LCAyNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNEYXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU3R1bm5lZFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0dW5uZWQpIHtcbiAgICAgICAgICAgICAgICAvL21vdmUgYXdheSBmcm9tIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGF0dGFja1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnN0dW5EaXIgKiAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VDb29sZG93blRpbWVyID0gdGhpcy5kYW1hZ2VDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9ERUFEXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZGVhZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZXNwYXduZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vUmVzcGF3blxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJlc3Bhd25lZCkge1xuICAgICAgICAgICAgICAgIC8vcmVzcGF3biAoY2FuIGRlZmluZSB0aGluZ3MgbGlrZSBhY3Rpdml0eSBjb29sZG93biwgcmVzcGF3biBhbmltYXRpb24sIGV0Yy4uLilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaW1lciBDaGVja3NcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneURlbGF5VGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lEZWxheVRpbWVyLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneUNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd25UaW1lci0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVuZXJneSA8IHRoaXMubWF4RW5lcmd5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneUNvb2xkb3duID4gdGhpcy5lbmVyZ3lDb29sZG93bk1pbikgeyAvL2VuZXJneSBjb29sZG93biB0aW1lIGRlY3JlYXNlcyBub24tbGluZWFybHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gKj0gLjU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lbmVyZ3lDb29sZG93biAtIHRoaXMuZW5lcmd5Q29vbGRvd25NaW4gPCAtLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW5lcmd5Q29vbGRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93biAqPSAxLjE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVuZXJneUNvb2xkb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gPSB0aGlzLmVuZXJneUNvb2xkb3duTWluO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd25UaW1lciA9IHRoaXMuZW5lcmd5Q29vbGRvd247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kYW1hZ2VDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyLS07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB2ZWxvY2l0aWVzIGJhc2VkIG9uIGdyYXZpdHkgYW5kIGZyaWN0aW9uXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSAmJiB0aGlzLnlWZWxvY2l0eSA8IHRoaXMudGVybWluYWxWZWxvY2l0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgICAgIC8vSGVhbHRoIGNoZWNrcyBhbmQgcG9zaXRpb24gY2hlY2tzXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9HT0QgTU9ERVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlzR29kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3kgPSB0aGlzLm1heEVuZXJneTtcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBzTGVmdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9Ly9FTkQgVXBkYXRlXG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy55VmVsb2NpdHkgPCAwICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZykgey8vYXNjZW5kaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDE1LCAzMCwgLTEwLCAtMjApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYXNjZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueVZlbG9jaXR5ID4gMCAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHsvL2Rlc2NlbmRpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMTUsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRlc2NlbmQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMucnVubmluZyAmJiB0aGlzLmFuaW1hdGlvbiAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHsvL2d1bnJ1bm5pbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmd1bnJ1bjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZyAmJiB0aGlzLnN0YXRlcy5ncm91bmRlZCkgey8vc2hvb3RpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDcwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob290O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nICYmICF0aGlzLnN0YXRlcy5ncm91bmRlZCkgey8vYWlyIHNob290aW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5haXJzaG9vdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5jbGVhdmluZykgey8vY2xlYXZpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDgwLCA2MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmNsZWF2ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZykgey8vc2xhc2hpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDgwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNsYXNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCkgey8vZGFzaGluZyBzdGFydFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGFzaF9zdGFydDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nTWlkKSB7Ly9kYXNoaW5nIG1pZFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGFzaF9taWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCkgey8vZGFzaGluZyBlbmRcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRhc2hfZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnN0dW5uZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0dW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGVhZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGVhZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uICYmIHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy9URVJSQUlOIENPTExJU0lPTlxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIgfHwgb3RoZXIubmFtZSA9PT0gXCJTcGlrZXNcIikge1xuXG4gICAgICAgICAgICAvLyBIZXJvIGFib3ZlIHRlcnJhaW5cbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55VmVsb2NpdHkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wc0xlZnQgPSB0aGlzLm1heEp1bXBzO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmp1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ncm91bmRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhlcm8ganVtcHMgaW50byB0ZXJyYWluXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgKyBvdGhlci5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIZXJvIGNvbGxpZGVzIHdpdGggdGVycmFpbiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhlcm8gY29sbGlkZXMgd2l0aCB0ZXJyYWluIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggLSB0aGlzLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGAke3RoaXMubmFtZX0gY29sbGlkaW5nIHdpdGggJHtvdGhlci5uYW1lfSBmcm9tICR7ZGlyZWN0aW9ufWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkxhdmFcIiAmJiAhdGhpcy5zdGF0ZXMuZGVhZCAmJiAhdGhpcy5zdGF0ZXMuaXNHb2QpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gNTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJoZXJvX2h1cnRcIilcbiAgICAgICAgfVxuICAgICAgICAvL0lmIEhlcm8gY2FuIHRha2UgZGFtYWdlLCBjaGVjayBpZi4uLlxuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmlzR29kICYmIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA8PSAwICYmICF0aGlzLnN0YXRlcy5pbnZ1bG5lcmFibGUgJiYgIXRoaXMuc3RhdGVzLmRlYWQgJiYgIXRoaXMuc3RhdGVzLnN0dW5uZWQpIHsgXG4gICAgICAgICAgICBpZiAob3RoZXIucGFyZW50Q2xhc3MgPT09IFwiRW5lbXlcIiAmJiBvdGhlci5uYW1lICE9PSBcIkJvbWJcIikgeyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIuZGFtYWdlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvL0RldGVybWluZSBpbnRlcmFjdGlvbiBiYXNlZCBvbiBvdGhlcidzIGRhbWFnZSB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlci5kYW1hZ2VUeXBlID09PSBcImhlYWx0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLmRpZmZpY3VsdHkqb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBzdGF0ZXMgYW5kIHB1dCBpbnRvIHN0dW4gYW5pbSBhbmQgc3R1bmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHVydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXRlcm1pbmUgd2hpY2ggd2F5IGhlcm8gc2hvdWxkIG1vdmUgZHVyaW5nIHN0dW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlci5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdHVuRGlyID0gMTsgfSBlbHNlIHsgdGhpcy5zdHVuRGlyID0gLTE7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnggLSBvdGhlci54IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYIC0gdGhpcy5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyLmRhbWFnZVR5cGUgPT09IFwiZW5lcmd5XCIgJiYgdGhpcy5lbmVyZ3kgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duID0gdGhpcy5lbmVyZ3lDb29sZG93bk1pbioyNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5mbG9vcih0aGlzLmVuZXJneS8yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkZpcmViYWxsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA9IHRoaXMuZGFtYWdlQ29vbGRvd247XG4gICAgICAgICAgICAgICAgdGhpcy5odXJ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0dW5EaXIgPSAxOyB9IGVsc2UgeyB0aGlzLnN0dW5EaXIgPSAtMTsgfVxuICAgICAgICAgICAgfSBpZiAob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLmRpZmZpY3VsdHkqb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgIG90aGVyLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3R1bkRpciA9IDE7IH0gZWxzZSB7IHRoaXMuc3R1bkRpciA9IC0xOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgICAgICBvdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgICAgICAgICAgb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLmlzRW5lbXkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IHRoaXMuZGlmZmljdWx0eSpvdGhlci5kYW1hZ2U7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPSB0aGlzLmRhbWFnZUNvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICAvL3Jlc2V0IHN0YXRlcyBhbmQgcHV0IGludG8gc3R1biBhbmltIGFuZCBzdHVubG9ja1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlci5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdHVuRGlyID0gMTsgfSBlbHNlIHsgdGhpcy5zdHVuRGlyID0gLTE7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqSEVMUEVSIENMQVNTRVMqKiovXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0LCBvZmZYID0gMCwgb2ZmWSA9IDApIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoICsgNTtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDIgKyBvZmZYO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyBvZmZZO1xuICAgIH1cblxuICAgIHNldFN0YXRlcyhydW5uaW5nLCBqdW1waW5nLCBzaG9vdGluZywgY2xlYXZpbmcsIGZhY2luZ1JpZ2h0LCBncm91bmRlZCwgc2xhc2hpbmcsIHNob3Rsb2NrZWQsIGZyYW1lbG9ja2VkLCBlbmVyZ2l6ZWQsIGRhc2hpbmcsIGhhc0Rhc2hlZCkge1xuICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gcnVubmluZztcbiAgICAgICAgdGhpcy5zdGF0ZXMuanVtcGluZyA9IGp1bXBpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gc2hvb3Rpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLmNsZWF2aW5nID0gY2xlYXZpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFjaW5nUmlnaHQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLmdyb3VuZGVkID0gZ3JvdW5kZWQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nID0gc2xhc2hpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSBzaG90bG9ja2VkO1xuICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZyYW1lbG9ja2VkO1xuICAgICAgICB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgPSBlbmVyZ2l6ZWQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmcgPSBkYXNoaW5nO1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmRhc2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ01pZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCA9IGhhc0Rhc2hlZDtcbiAgICB9XG5cbiAgICBjbGVhclN0YXRlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZXMoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuc3R1bm5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5kZWFkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaHVydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHVzZUVuZXJneShjb3N0KSB7XG4gICAgICAgIHRoaXMuZW5lcmd5IC09IGNvc3Q7XG4gICAgICAgIHRoaXMuZW5lcmd5RGVsYXlUaW1lciA9IHRoaXMuZW5lcmd5RGVsYXlDb29sZG93bjtcbiAgICB9XG5cbiAgICByZXNwYXduKCkge1xuICAgICAgICB0aGlzLnN0YXRlcy5yZXNwYXduZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy5tYXhIZWFsdGg7XG4gICAgICAgIHRoaXMuZW5lcmd5ID0gdGhpcy5tYXhFbmVyZ3k7XG4gICAgICAgIHRoaXMuZ2FtZS5nYW1lYm9hcmQubG9zdFNjb3JlID0gdGhpcy5nYW1lLmdhbWVib2FyZC5zY29yZSAvIDI7XG4gICAgICAgIHRoaXMuZ2FtZS5nYW1lYm9hcmQuc2NvcmUgPSB0aGlzLmdhbWUuZ2FtZWJvYXJkLmxvc3RTY29yZTtcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gMTtcbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZSAoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcgKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZXJvOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIFRlcnJhaW4sXG4gICAgRW5lbXksXG4gICAgSGVybyxcbn0gZnJvbSBcIi4vXCJcblxuXG4vKiBGb3IgY29weSBwYXN0ZSBqb2JzOlxudGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLngsIHRoaXMueSwgb2ZmWCwgb2ZmWSxcbiAgICB0aGlzLnNwcml0ZVdpZHRoLzIsIHRoaXMuc3ByaXRlSGVpZ2h0LzIsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7ICAgXG4qL1xuXG5jbGFzcyBIdXJ0Ym94IGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgLy9Ob3RlIHRoYXQgaW1nIGlzIHJlcXVpcmVkIGZvciBzdXBlcigpLCBldmVuIHRob3VnaCBIdXJ0Ym94IGlzIG5ldmVyIGFuaW1hdGVkLlxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCA9IG51bGwsIHgsIHksIG9mZlgsIG9mZlksIHBhcmVudFdpZHRoLCBwYXJlbnRIZWlnaHQsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgc2NhbGUgPSAzLFxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2UsIGZhY2luZ1JpZ2h0ID0gdHJ1ZSwgaXNFbmVteSA9IGZhbHNlLCBkYW1hZ2VUeXBlID0gXCJoZWFsdGhcIiwgZnJhbWVzID0gMiwgcGVyc2lzdGVudCA9IGZhbHNlLCBpbWcgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiQWN0b3JcIjtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuaXNFbmVteSA9IGlzRW5lbXk7XG4gICAgICAgIHRoaXMuZGFtYWdlVHlwZSA9IGRhbWFnZVR5cGU7XG5cbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gaHVydFdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gaHVydEhlaWdodDtcblxuICAgICAgICB0aGlzLmJvdW5kWSA9IHkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgb2ZmWTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB4ICsgcGFyZW50V2lkdGggKyB0aGlzLmJvdW5kV2lkdGggKyBvZmZYO1xuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xuICAgICAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICAgICAgdGhpcy5wZXJzaXN0ZW50ID0gcGVyc2lzdGVudDtcblxuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vaGl0Ym94IHBlcnNpc3RzIGZvciB0d28gdGlja3MuICh0d28gcHJldmVudHMgcmFuZG9tIGhpdGJveCBcImdhcHNcIilcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVzIDwgMCkge1xuICAgICAgICAgICAgLy9wZXJzaXN0XG4gICAgICAgICAgICAvL1RPRE86IEZpZ3VyZSBvdXQgd2h5IGhpdGJveCBkb2Vzbid0IHBlcnNpc3RcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuZnJhbWVzID49IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZnJhbWVzLS07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjbGlua1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkhlcm9cIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEh1cnRib3g7IiwiXG5leHBvcnQge2RlZmF1bHQgYXMgVGVycmFpbn0gZnJvbSBcIi4vdGVycmFpblwiXG5leHBvcnQge2RlZmF1bHQgYXMgRW50aXR5fSBmcm9tIFwiLi9lbnRpdHlcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEFjdG9yfSBmcm9tIFwiLi9hY3RvclwiXG5leHBvcnQge2RlZmF1bHQgYXMgRW5lbXl9IGZyb20gXCIuL2VuZW15XCJcblxuZXhwb3J0IHtkZWZhdWx0IGFzIEJvbWJ9IGZyb20gXCIuL2JvbWJcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEJ1bGxldH0gZnJvbSBcIi4vYnVsbGV0XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBDYW1lcmF9IGZyb20gXCIuL2NhbWVyYVwiXG5leHBvcnQge2RlZmF1bHQgYXMgQ3Jvd30gZnJvbSBcIi4vY3Jvd1wiXG5leHBvcnQge2RlZmF1bHQgYXMgRGlub30gZnJvbSBcIi4vZGlub1wiXG5leHBvcnQge2RlZmF1bHQgYXMgRmxhbWVzfSBmcm9tIFwiLi9mbGFtZXNcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEdhbWVCb2FyZH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiXG5leHBvcnQge2RlZmF1bHQgYXMgSGFuZH0gZnJvbSBcIi4vaGFuZFwiXG5leHBvcnQgeyAgICBcbiAgICBMYXZhLFxuICAgIEZpcmViYWxsLFxuICAgIFNwaWtlcyxcbiAgICBQcm9qZWN0aWxlSGF6YXJkLFxuICAgIFByb2plY3RpbGVDaXJjbGUsXG4gICAgTGF1bmNoZXIgfSBmcm9tIFwiLi9oYXphcmRzXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBIZXJvfSBmcm9tIFwiLi9oZXJvXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBIdXJ0Ym94fSBmcm9tIFwiLi9odXJ0Ym94XCJcbmV4cG9ydCB7XG4gICAgSXRlbSwgXG4gICAgRW5lcmd5UGFjaywgXG4gICAgSGVhbHRoUGFjayB9IGZyb20gXCIuL2l0ZW1cIlxuZXhwb3J0IHtkZWZhdWx0IGFzIExlb30gZnJvbSBcIi4vbGVvXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBQcm9qZWN0aWxlU3dvcmR9IGZyb20gXCIuL3Byb2plY3RpbGUtc3dvcmRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFByb2plY3RpbGV9IGZyb20gXCIuL3Byb2plY3RpbGVcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFJlZmxlY3Rib3h9IGZyb20gXCIuL3JlZmxlY3Rib3hcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFJvY2tldH0gZnJvbSBcIi4vcm9ja2V0XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTaG90Ymxhc3R9IGZyb20gXCIuL3Nob3RibGFzdFwiXG5leHBvcnQge2RlZmF1bHQgYXMgU29sZGllclNoaWVsZH0gZnJvbSBcIi4vc29sZGllci1zaGllbGRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFRlcnJhaW5Nb2JpbGV9IGZyb20gXCIuL3RlcnJhaW4tbW9iaWxlXCJcblxuIiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW50aXR5LCBcbiAgICBIYXphcmRzLFxuICAgIEhlcm8sIFxuICAgIFRlcnJhaW5cbn0gZnJvbSBcIi4vXCIgICAgXG5cblxuY2xhc3MgSXRlbSBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlPTMpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbnRpdHlcIjtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuXG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMuc2NhbGU7XG4gICAgfVxuXG4gICAgb25fcGlja3VwKCkge31cblxuICAgIGRyYXcgKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLnggKyB0aGlzLnhPZmZzZXQsIHRoaXMueSArIHRoaXMueU9mZnNldCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZSAoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZCAob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSGVyb1wiKSB7XG4gICAgICAgICAgICB0aGlzLm9uX3BpY2t1cChvdGhlcik7XG4gICAgICAgIH0gZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiIHx8IG90aGVyLm5hbWUgPT09ICBcIlNwaWtlc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbG9jaXR5O1xuICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICB9XG5cbn1cblxuXG4vKlxuICAgIEEgaGVhbHRoIHBhY2sgdGhhdCByZXN0b3JlcyB0aGUgSGVybydzIGhlYWx0aFxuKi9cbmNsYXNzIEhlYWx0aFBhY2sgZXh0ZW5kcyBJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZywgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzY2FsZT0zLCBoZWFsdGhfdmFsdWU9MTUpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlKTtcbiAgICAgICAgdGhpcy5oZWFsdGhfdmFsdWUgPSBoZWFsdGhfdmFsdWU7ICAgICAgICAgIFxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFsxMCwgOF0sIDAsIDQsIDQsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDApO1xuICAgICAgICB0aGlzLnhPZmZzZXQgPSAxMFxuICAgICAgICB0aGlzLnlPZmZzZXQgPSAtMzBcbiAgICB9XG5cbiAgICBvbl9waWNrdXAoaGVybykge1xuICAgICAgICBpZiAoaGVyby5oZWFsdGggPCBoZXJvLm1heEhlYWx0aClcbiAgICAgICAgICAgIGhlcm8uaGVhbHRoICs9IHRoaXMuaGVhbHRoX3ZhbHVlO1xuICAgICAgICBpZiAoaGVyby5oZWFsdGggPiBoZXJvLm1heEhlYWx0aClcbiAgICAgICAgICAgIGhlcm8uaGVhbHRoID0gaGVyby5tYXhIZWFsdGg7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICB9XG59XG5cblxuIC8qXG4gICAgQW4gZW5lcmd5IHBhY2sgdGhhdCByZXN0b3JlcyB0aGUgSGVybydzIGVuZXJneVxuKi9cbmNsYXNzIEVuZXJneVBhY2sgZXh0ZW5kcyBJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZywgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzY2FsZT0zLCBlbmVyZ3lfdmFsdWU9MTUpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlKTtcbiAgICAgICAgdGhpcy5lbmVyZ3lfdmFsdWUgPSAxNTsgICAgICAgICAgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgsIDhdLCAwLCA0LCA0LCA0LCB0cnVlLCB0aGlzLnNjYWxlLCAwKTtcbiAgICAgICAgdGhpcy54T2Zmc2V0ID0gMTA7XG4gICAgICAgIHRoaXMueU9mZnNldCA9IC0zMDtcbiAgICB9XG5cbiAgICBvbl9waWNrdXAoaGVybykge1xuICAgICAgICBpZihoZXJvLmVuZXJneSA8IGhlcm8ubWF4RW5lcmd5KVxuICAgICAgICAgICAgaGVyby5lbmVyZ3kgKz0gdGhpcy5lbmVyZ3lfdmFsdWU7XG4gICAgICAgIGlmIChoZXJvLmVuZXJneSA+IGhlcm8ubWF4RW5lcmd5KVxuICAgICAgICAgICAgaGVyby5lbmVyZ3kgPSBoZXJvLm1heEVuZXJneTtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgSXRlbSwgSGVhbHRoUGFjaywgRW5lcmd5UGFjayB9IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgQWN0b3IsXG4gICAgRW5lbXlcbn0gZnJvbSBcIi4vXCJcblxuY2xhc3MgTGVvIGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDgwLCBzcHJpdGVIZWlnaHQgPSA2MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMub3JpZ1ggPSB4OyAvLyBUT0RPOiBkZW1vXG4gICAgICAgIHRoaXMub3JpZ1kgPSB5OyAvLyBUT0RPOiBkZW1vXG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDEyO1xuICAgICAgICB0aGlzLmp1bXBTcGVlZCA9IC0xMDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuICAgICAgICB0aGlzLnRpbWVyU3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICAvL0NvbnRhaW5zIGRldGFpbGVkIHNwcml0ZXNoZWV0IGluZm86IFtGV2lkdGgsIEZIZWlnaHQsIFJvdywgQ29sdW1uLCBGcmFtZXMgKHNoZWV0IHdpZHRoKV1cbiAgICAgICAgdGhpcy5zcHJpbmZvID0gWy8vZWFjaCBmaXZlLXR1cGxlIGlzIGZyb20gYSByb3cgb2YgdGhlIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgWzgwLCA2MCwgMCwgMCwgN10sIFs1MCwgNzAsIDEsIDAsIDVdLFxuICAgICAgICAgICAgWzcwLCA3MCwgMiwgMCwgOF0sIFs3MCwgODAsIDMsIDAsIDExXVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vQWN0b3IgU3RhdGVzXG4gICAgICAgIHRoaXMuc3RhdGVzID0geyAvL0RTMzogVGhlc2Ugc3RhdGUgYW5kIGFuaW1hdGlvbiBuYW1lcyBhcmUgdGVudGF0aXZlLlxuICAgICAgICAgICAgXCJsdW5naW5nXCI6IHRydWUsIC8vcm93IDA7IDEtMywgNC03XG4gICAgICAgICAgICBcImF0dGFja2luZ1wiOiBmYWxzZSwgLy9yb3cgMzsgNy0xMFxuICAgICAgICAgICAgXCJncmFwcGxpbmdcIjogZmFsc2UsIC8vcm93IDM7IDEtNFxuICAgICAgICAgICAgXCJldmFkaW5nXCI6IGZhbHNlLCAvL3JvdyAxOyAxXG4gICAgICAgICAgICBcImZpcmVsdW5naW5nXCI6IGZhbHNlLCAvL3JvdyAyOyAxLTIsIDMtNiwgNy04XG4gICAgICAgICAgICBcImRlbW9sb29wXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhbHNlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwibHVuZ2VcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDAsIDcsIDcsIDcsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiYXR0YWNrXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs3MCwgODBdLCAzLCAxMSwgNywgMTEsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiZmlyZWx1bmdlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs3MCwgNzBdLCAyLCA4LCA3LCA4LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcImlkbGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDMsIDExLCAxMDAsIDEsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sdW5nZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5kZW1vbG9vcCkge1xuICAgICAgICAgICAgLy9sdW5nZSAoc2hvdWxkZXIgc2xhbSlcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5sdW5naW5nICYmICF0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDgwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSA0MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vZ3JhcHBsZS9zbGFtIChzaG91bGRlciBzbGFtKVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuc3RhdGVzLmx1bmdpbmcgJiYgdGhpcy5zdGF0ZXMuYXR0YWNraW5nICYmIHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gODA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lclN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IDMwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vZmlyZSBsdW5nZVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZmlyZWx1bmdpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maXJlbHVuZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNzA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID4gMiAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMub3JpZ1k7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL1NhbWUgYXMgYWJvdmUsIGJ1dCBub3QgaW4gXCJkZW1vXCIgZm9ybS5cbiAgICAgICAgLy9lbHNlIGlmICh0aGlzLnN0YXRlcy5sdW5naW5nICYmICF0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA4MDtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lID4gMykge1xuICAgICAgICAvLyAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgdGhpcy55IC09IDQwO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuICAgICAgICAvL2Vsc2UgaWYgKCF0aGlzLnN0YXRlcy5sdW5naW5nICYmIHRoaXMuc3RhdGVzLmF0dGFja2luZyAmJiB0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDcwO1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZVdpZHRoID0gODA7XG4gICAgICAgIC8vICAgIC8vVGhpcyB3aWxsIHBvdGVudGlhbGx5IGJlIHVzZWQgdG8gZmxhZyBkaWZmZXJlbnQgbGV2ZWxzIG9mIFwidnVsbmVyYWJpbGl0eVwiIChleDogY291bnRlcmFibGUpXG4gICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiYXR0YWNraW5nXCIpO1xuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIGlmICh0aGlzLnN0YXRlcy5maXJlbHVuZ2luZykge1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDcwO1xuICAgICAgICAvLyAgICB0aGlzLnNwcml0ZVdpZHRoID0gNzA7XG4gICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+IDIgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPCA1KSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5lbGFwc2VkVGltZSA+PSB0aGlzLmFuaW1hdGlvbi50b3RhbFRpbWUgLSAxKSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAvLyAgICAgICAgdGhpcy54ID0gdGhpcy5vcmlnWDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgLy8gICAgICAgIGlmICgvKnRoaXMuYW5pbWF0aW9uLmlzRG9uZSovMSkge1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy99XG5cbiAgICB9O1xuXG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubHVuZ2luZyAmJiAhdGhpcy5zdGF0ZXMuYXR0YWNraW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sdW5nZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgIXRoaXMuc3RhdGVzLmx1bmdpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmF0dGFjaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5maXJlbHVuZ2luZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmlyZWx1bmdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbmltYXRpb24gZG9lcyBub3QgZXhpc3RcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKHRoaXMuY2xvY2tUaWNrLCBjdHgsIHRoaXMueCwgdGhpcy55KTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBMZW87XG5cblxuXG5cbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIEJ1bGxldCxcbiAgICBUZXJyYWluLFxuICAgIEh1cnRib3gsXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgUHJvamVjdGlsZV9Td29yZCBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIHNwcml0ZVdpZHRoID0gOTAsIHNwcml0ZUhlaWdodCA9IDYwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiQWN0b3JcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMTA7XG4gICAgICAgIGlmIChmYWNpbmdSaWdodCkgeyB0aGlzLnggKz0gOTU7IH0gZWxzZSB7IHRoaXMueCAtPSA5NSB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSAwOyAvLzE4MFxuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMDsgLy8xMjBcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDU7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTUwO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwic3RhcnRpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhYmxpemVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZWNvdmVyaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcInN0YXJ0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDQsIDE4LCA3LCAyLCBmYWxzZSwgdGhpcy5zY2FsZSwgMTEpLFxuICAgICAgICAgICAgXCJzdGFibGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgNCwgMTgsIDcsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEzKSxcbiAgICAgICAgICAgIFwicmVjb3ZlcnlcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgNCwgMTgsIDcsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxNCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhYmxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zdGFibGl6ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhYmxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7Ly9IdXJ0Ym94ICBhY3RpdmUgdW5sZXNzIGluIHJlY292ZXJ5IGZyYW1lc1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xMDAgLSA4MCAtIDQwLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTcwLCA5MCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgICAgICAgICBodXJ0Ym94LnBhcmVudCA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGh1cnRib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xMDAgLSAxNTAgLSAyMDAgLSAxNSwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDE3MCwgOTAsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgICAgICAgICAgaHVydGJveC5wYXJlbnQgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShodXJ0Ym94KTsgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YWJsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJlY292ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIC8vY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgIC8vICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAvLyAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgIC8vICAgIH1cbiAgICAvLyAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSAgXCJCdWxsZXRcIikge1xuICAgIC8vICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgLy8gICAgfVxuICAgIC8vICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgLy8gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAvLyAgICB9XG4gICAgLy99XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGVfU3dvcmQ7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG5BY3RvciwgXG5CdWxsZXQsIFxuRW5lbXksIFxuVGVycmFpblxufSBmcm9tIFwiLi9cIlxuXG5jbGFzcyBQcm9qZWN0aWxlIGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgLy9BZGRlZCBlbmVyZ2l6ZWQgKEJFRk9SRSBESU1FTlNJT05TKSB0byBjaG9vc2UgY29ycmVjdCBwcm9qZWN0aWxlXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgZW5lcmdpemVkLCBzcHJpdGVXaWR0aCA9IDYwLCBzcHJpdGVIZWlnaHQgPSA2MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDEzO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHsgdGhpcy54ICs9IDEwMDsgfSBlbHNlIHsgdGhpcy54IC09IDEwMCB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDUwO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpICsgMTAwOyAvLysxMDAgYWxpZ25zIHdpdGggdGhlIGd1blxuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gKHRoaXMuc3ByaXRlSGVpZ2h0IC0gMTApOyAvLyB0aGUgLTEwIG9mZnNldCBhY2NvdW50cyBmb3IgdGhlIFwicGFkZGluZ1wiIEkgYWRkZWQgdG8gZWFjaCBmcmFtZSBpbiB0aGUgc3ByaXRlIHNoZWV0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSAtIDEwMDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCAtIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgaWYgKGVuZXJnaXplZCkge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAyMDA7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDI7XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAxN1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSA1MDtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMTtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG5cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZ3JlZW5cIjogIWVuZXJnaXplZCxcbiAgICAgICAgICAgIFwiYmx1ZVwiOiBlbmVyZ2l6ZWQsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGFibGl6ZWRcIjogZmFsc2UsICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZ3JlZW5fZXhpdGluZ1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAzLCAxNSwgNiwgOCwgZmFsc2UsIHRoaXMuc2NhbGUsIDQpLFxuICAgICAgICAgICAgXCJncmVlbl9zdGFibGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgMywgMTUsIDYsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDExKSxcbiAgICAgICAgICAgIFwiYmx1ZV9leGl0aW5nXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDMsIDIzLCA2LCA4LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTUpLFxuICAgICAgICAgICAgXCJibHVlX3N0YWJsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAzLCAyMywgNiwgMywgdHJ1ZSwgdGhpcy5zY2FsZSwgMjApLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZ3JlZW4pIHsgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZ3JlZW5fZXhpdGluZzsgfSBlbHNlIHsgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYmx1ZV9leGl0aW5nOyB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL1RPRE9cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5ncmVlbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmdyZWVuX2V4aXRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZ3JlZW5fc3RhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuYmx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmJsdWVfZXhpdGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFibGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ibHVlX3N0YWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypDT0xMSVNJT04qL1xuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHsgLy9jb21tZW50ZWQgaXMgZm9yIGV2ZW50dWFsIGltcGxlbWVudGF0aW9uIG9mIHByb2plY3RpbGUgXCJhcm1vclwiL3RvdWdobmVzcy5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gIFwiQnVsbGV0XCIpIHtcbiAgICAgICAgLy8gICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAvL31cbiAgICAgICAgZWxzZSBpZiAob3RoZXIucGFyZW50Q2xhc3MgPT09ICBcIkVuZW15XCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2lmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy99IFxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBBY3RvcixcbiAgICBUZXJyYWluLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG59IGZyb20gXCIuL1wiXG5cblxuLyogRm9yIGNvcHkgcGFzdGUgam9iczpcbiAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMueCwgdGhpcy55LCBvZmZYLCBvZmZZLFxuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLzIsIHRoaXMuc3ByaXRlSGVpZ2h0LzIsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7ICAgXG4gKi9cbmNsYXNzIFJlZmxlY3Rib3ggZXh0ZW5kcyBBY3RvciB7XG5cbiAgICAvL05vdGUgdGhhdCBpbWcgaXMgcmVxdWlyZWQgZm9yIHN1cGVyKCksIGV2ZW4gdGhvdWdoIFJlZmxlY3Rib3ggaXMgbmV2ZXIgYW5pbWF0ZWQuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4ID0gbnVsbCwgeCwgeSwgb2ZmWCwgb2ZmWSwgcGFyZW50V2lkdGgsIHBhcmVudEhlaWdodCwgaHVydFdpZHRoLCBodXJ0SGVpZ2h0LCBzY2FsZSA9IDMsIGZhY2luZ1JpZ2h0ID0gdHJ1ZSwgcGFyZW50ID0gbnVsbCwgZnJhbWVzID0gMiwgaW1nID0gbnVsbCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcblxuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSBodXJ0V2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSBodXJ0SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuYm91bmRZID0geSAtIHRoaXMuYm91bmRIZWlnaHQgKyBvZmZZO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0geCArIHBhcmVudFdpZHRoICsgdGhpcy5ib3VuZFdpZHRoICsgb2ZmWDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0geCAtIHRoaXMuYm91bmRXaWR0aCAtIG9mZlg7XG4gICAgICAgIH1cbiAgICAgICAgLy9TdGF0c1xuXG4gICAgICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL2hpdGJveCBwZXJzaXN0cyBmb3IgdHdvIHRpY2tzLiAodHdvIHByZXZlbnRzIHJhbmRvbSBoaXRib3ggXCJnYXBzXCIpXG4gICAgICAgIGlmICh0aGlzLmZyYW1lcyA+PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYW1lcy0tO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiQnVsbGV0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1VDQ0VTUyFcIilcbiAgICAgICAgICAgIC8vb3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gIW90aGVyLnN0YXRlcy5mYWNpbmdSaWdodDtcbiAgICAgICAgICAgIC8vb3RoZXIubmFtZSA9IFwiUHJvamVjdGlsZVwiO1xuICAgICAgICAgICAgLy9vdGhlci5kYW1hZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlJvY2tldFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5PIFNPVVAgRk9SIFlPVSFcIik7XG4gICAgICAgICAgICBvdGhlci5wb2ludFZhbHVlID0gNTtcbiAgICAgICAgICAgIG90aGVyLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGFyZW50LmVuZXJneSArPSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbmVyZ3lDb29sZG93biAvPSA0LjI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiQm9tYlwiKSB7XG4gICAgICAgICAgICBvdGhlci54VmVsb2NpdHkgPSAtdGhpcy5mYWNpbmcgKiA1O1xuICAgICAgICAgICAgb3RoZXIueVZlbG9jaXR5ID0gLTIwO1xuICAgICAgICAgICAgb3RoZXIuZGFtYWdlID0gNTA7XG4gICAgICAgICAgICBvdGhlci5zdGF0ZXMucmVmbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBSZWZsZWN0Ym94OyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG4gICAgUHJvamVjdGlsZSxcbiAgICBUZXJyYWluXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgUm9ja2V0IGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNTApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMueVNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5tYXhYID0gODtcbiAgICAgICAgdGhpcy5tYXhZID0gNDtcbiAgICAgICAgdGhpcy54QWNjZWwgPSAuNDtcbiAgICAgICAgdGhpcy55QWNjZWwgPSAuMTc7XG4gICAgICAgIHRoaXMueSAtPSA3MFxuICAgICAgICBpZiAoIWZhY2luZ1JpZ2h0KSB7IHRoaXMueCAtPSAxMDA7IH0gZWxzZSB7IHRoaXMueCArPSAxMDAgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gMzA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAzMDtcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDEyMDsgLy8rMTAwIGFsaWducyB3aXRoIHRoZSBndW5cbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDIgKiB0aGlzLnNwcml0ZVdpZHRoIC0gMTgwO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gKHRoaXMuc3ByaXRlSGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5kYW1hZ2VUeXBlID0gXCJlbmVyZ3lcIjtcbiAgICAgICAgdGhpcy5kcmFpblRpbWUgPSAxMjA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMjtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDtcbiAgICAgICAgdGhpcy5ib3VuY2VDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYm91bmNlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmJvdW5jZVRpbWUgPSAzNTtcbiAgICAgICAgdGhpcy50aW1lciA9IDUwMDtcbiAgICAgICAgdGhpcy5zYWZlVGltZXIgPSAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwicm9ja2V0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA2LCAyMCwgNSwgNywgdHJ1ZSwgdGhpcy5zY2FsZSwgMTMpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5yb2NrZXQ7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLmZhY2luZyA9IDE7IH0gZWxzZSB7IHRoaXMuZmFjaW5nID0gLTE7fVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgJiYgdGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCAmJiB0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHsvL1RPRE8gVHJhY2tpbmcgYmVoYXZpb3JcbiAgICAgICAgICAgIGlmICgodGhpcy54U3BlZWQgPCB0aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IDEpIHx8ICh0aGlzLnhTcGVlZCA+IC10aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IC0xKSkge1xuICAgICAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuZmFjaW5nICogdGhpcy54QWNjZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55ID49IDApIHsvLyBiZWxvdyBoZXJvO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTcGVlZCA+IC10aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgLT0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugey8vIGFib3ZlIGhlcm9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U3BlZWQgPCB0aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgKz0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDsvLyArIE1hdGguZmxvb3IoTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgLyAzMDApICogMS41O1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkOy8vICsgTWF0aC5mbG9vcihNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSAvIDMwMCkgKiAxLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYm91bmNlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuY2VUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJvY2tldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlRlcnJhaW5cIiAmJiB0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkhlcm9cIiAmJiBvdGhlci5zdGF0ZXMuaW52dWxuZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgLy9rZWVwIG9uIHRoZSBtYXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkh1cnRib3hcIiAmJiAhb3RoZXIuaXNFbmVteSAmJiB0aGlzLmdhbWUuaGVyby5zdGF0ZXMuc2xhc2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhaW5UaW1lICs9IDEwO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAtdGhpcy5mYWNpbmcgKiB0aGlzLm1heFggKiAyO1xuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgKiAxMDAgPCA1MCkge1xuICAgICAgICAgICAgICAgIHRoaXMueVNwZWVkID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlTcGVlZCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2lmICh0aGlzLmJvdW5jZUNvdW50ID4gMykge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuY2VUaW1lciA9IHRoaXMuYm91bmNlVGltZTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmNlQ291bnQrKztcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIiAmJiBvdGhlci5zdGF0ZXMuYmx1ZSkgfHwgb3RoZXIucGFyZW50ID09PSBcIlByb2plY3RpbGVfU3dvcmRcIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aCArIDU7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2NrZXQ7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7QWN0b3J9IGZyb20gXCIuL1wiXG5cbmNsYXNzIFNob3RibGFzdCBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIHNwcml0ZVdpZHRoID0gNTAsIHNwcml0ZUhlaWdodCA9IDUwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gNztcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7IHRoaXMueCArPSAxMDA7IH0gZWxzZSB7IHRoaXMueCAtPSAxMDAgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcblxuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgLSA1MDA7XG5cbiAgICAgICAgLy9TdGF0c1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwic2hvdGJsYXN0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTgsIDQsIDYsIGZhbHNlLCB0aGlzLnNjYWxlLCAxMCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob3RibGFzdDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vVE9ET1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG90Ymxhc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaG90Ymxhc3Q7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgQnVsbGV0LFxuICAgIEVuZW15LFxuICAgIFRlcnJhaW4sXG4gICAgUHJvamVjdGlsZSxcbiAgICBIdXJ0Ym94LFxuICAgIFNob3RibGFzdFxufSBmcm9tIFwiLi9cIlxuXG5cbi8vVE9ETyAobG9uZyB0ZXJtKTogQUxMIEFDVE9SUyAtIFwiQ2hlY2sgaWYgaW4gcmFuZ2VcIiBoZWxwZXIgZnVuY3Rpb25cbmNsYXNzIFNvbGRpZXJfU2hpZWxkIGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDUwLCBzcHJpdGVIZWlnaHQgPSA1MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDc7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcblxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogNDU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogNDU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAodGhpcy5zcHJpdGVIZWlnaHQgLyAyIC0gMTApO1xuICAgICAgICAvL3RoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzgsIDQwKTtcblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDMwO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDUwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG5cbiAgICAgICAgLy8gQmVoYXZpb3IgcGFyYW1ldGVyc1xuICAgICAgICB0aGlzLnJ1blByb2IgPSA1O1xuICAgICAgICB0aGlzLnJ1bkF3YXlDb29sZG93biA9IDI1MDtcbiAgICAgICAgdGhpcy5ydW5Bd2F5Q29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMucnVuQXdheVRpbWUgPSA3NTtcbiAgICAgICAgdGhpcy5ydW5Bd2F5VGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gMTAwMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IDM1MDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IGZhbHNlLCAvL2N1cnJlbnRseSB1bnVzZWRcbiAgICAgICAgICAgIFwiaWRsaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcInJ1bm5pbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob290aW5nX3N0YXJ0dXBcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob290aW5nX2FjdGl2ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvb3RpbmdfcmVjb3ZlclwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaGFzU2hvdFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2xhc2hpbmdfc3RhcnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNsYXNoaW5nX2VuZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYmxvY2tpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcInR1cm5pbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZyYW1lbG9ja2VkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicnVubmluZ0F3YXlcIjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDE1LCA1LCA2LCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwidHVyblwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDE1LCAzLCA1LCBmYWxzZSwgdGhpcy5zY2FsZSwgNiksXG4gICAgICAgICAgICBcImJsb2NrXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgMTUsIDksIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxMSksXG4gICAgICAgICAgICBcInJ1blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDEsIDEyLCAzLCAxMiwgdHJ1ZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcInNob290X3N0YXJ0dXBcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxOCwgMiwgNSwgZmFsc2UsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJzaG9vdF9hY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxOCwgNCwgNSwgZmFsc2UsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICAgICAgXCJzaG9vdF9yZWNvdmVyXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTgsIDQsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDkpLFxuICAgICAgICAgICAgXCJzbGFzaF9zdGFydFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbMTAwLCA2MF0sIDMsIDE2LCAyLCA5LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcInNsYXNoX2VuZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbMTAwLCA2MF0sIDMsIDE2LCAzLCA3LCBmYWxzZSwgdGhpcy5zY2FsZSwgOSksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgfVxuXG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzFdKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKioqIEJFR0lOIEJFSEFWSU9SIENPREUgKioqKi9cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgLy9pZGxpbmcgLSBUaGlzIGlzIHdoZXJlIG1vc3QgYmVoYXZpb3Igd2lsbCBzdGFydCwgYW5kIG1vc3Qgd2lsbCByZXR1cm4uXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nICYmICF0aGlzLnN0YXRlcy5ydW5uaW5nQXdheVxuICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDwgdGhpcy5zaWdodFJhZGl1c1swXVxuICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDwgdGhpcy5zaWdodFJhZGl1c1sxXSkge1xuICAgICAgICAgICAgICAgIC8vRmFjZSBFbmVteVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuaGVyby54ID4gdGhpcy54ICYmICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCAmJiAhdGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudHVybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdhbWUuaGVyby54IDwgdGhpcy54ICYmIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ICYmICF0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2xhc2ggd2hlbiBpbiByYW5nZVxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSAyNTAgJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPCA1MFxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLnJhbmRvbSgpICogMTAwIDw9IDUgJiYgdGhpcy5hbmltYXRpb24ubG9vcHMgPiAxKSB7IC8vYWRkZWQgcmFuZG9tIGFjdGl2YXRpb24gYXMgYSB0ZXN0LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZ19zdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gMjA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TaG9vdCB3aGVuIGluIHJhbmdlXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpID49IDIwMFxuICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSAxMDAwXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYW5pbWF0aW9uLmxvb3BzID49IDMpIHsgLy9zaG90IGNvb2xkb3duIGJhc2VkIG9uIGlkbGUgdGltZSAobWVhc3VyZWQgYnkgYW5pbWF0aW9uIGxvb3BzKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA2MDBcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIE1hdGgucmFuZG9tKCkgKiAxMCA8PSB0aGlzLnJ1blByb2JcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMucnVuQXdheUNvb2xkb3duVGltZXIgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJydW5uaW5nIGF3YXlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1blByb2IgLT0gMi41O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Bd2F5VGltZXIgPSB0aGlzLnJ1bkF3YXlUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Bd2F5Q29vbGRvd25UaW1lciA9IHRoaXMucnVuQXdheUNvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZ0F3YXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvKioqKiBVUERBVEUgQkVIQVZJT1IgUEFSQU1TICoqKiovXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLnNob290aW5nX2FjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkF3YXlDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bkF3YXlDb29sZG93blRpbWVyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkF3YXlUaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Bd2F5VGltZXIgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKioqKiBFTkQgQkVIQVZJT1IgQ09ERSAqKioqL1xuXG4gICAgICAgICAgICAvL1J1biBBd2F5IFJvdXRpbmVcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSAmJiAhdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucnVuQXdheVRpbWVyID09IHRoaXMucnVuQXdheVRpbWUgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ydW5Bd2F5VGltZXIgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnJ1bkF3YXlUaW1lciA+IDAgJiYgIXRoaXMuc3RhdGVzLnR1cm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJ1bm5pbmcpIHsgLy9ydW5uaW5nXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZmFjaW5nICogdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMuZmFjaW5nICogdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXAgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkKSB7IC8vc2hvb3Rpbmcgc3RhcnQ6IHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzgsIDQwKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUpIHsgLy9zaG9vdGluZyBhY3RpdmVcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmhhc1Nob3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImVuZW15X3Nob290XCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFNob3RibGFzdCh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEJ1bGxldCh0aGlzLmdhbWUsIHRoaXMueCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1Nob3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1Nob3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX3JlY292ZXIpIHsgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMucnVubmluZ0F3YXkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZ19zdGFydCAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQpIHsgLy9zbGFzaGluZyBzdGFydFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA9PT0gOCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgNSwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA3MCwgMTAwLCB0aGlzLnNjYWxlLCAyKnRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwIC0gdGhpcy5zcHJpdGVXaWR0aCAtIDIqNjUsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNzAsIDEwMCwgdGhpcy5zY2FsZSwgMip0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nX3N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nX2VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNsYXNoaW5nX2VuZCkgeyAvL3NsYXNoaW5nIGVuZFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAwICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIDUsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNzAsIDEwMCwgdGhpcy5zY2FsZSwgMip0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC02MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAyKjY1LCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDcwLCAxMDAsIHRoaXMuc2NhbGUsIDIqdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZ19lbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IDIwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmJsb2NraW5nKSB7IC8vYmxvY2tpbmdcbiAgICAgICAgICAgICAgICAvLyBhIGxpdHRsZSBrbm9ja2JhY2tcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IGZhbHNlOyAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMudHVybmluZykgeyAvL3R1cm5pbmdcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nICo9IC0xOyAvL3NlZSBhYm92ZSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMClcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgMTAsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucnVubmluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIDUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMucnVuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdF9zdGFydHVwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCA1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob290X2FjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmdfcmVjb3Zlcikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIDUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2hvb3RfcmVjb3ZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2xhc2hpbmdfc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDEwMCwgNjAsIDI1LCAzNSwgLTE1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNsYXNoX3N0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZ19lbmQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDEwMCwgNjAsIDI1LCAzNSwgLTE1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNsYXNoX2VuZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCAtMTAsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnR1cm5pbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCAtMTAsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMudHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICAvL3VzZWQgdG8gZWFzaWx5IHVwZGF0ZSBoaXRib3ggYmFzZWQgb24gc3RhdGUvYW5pbWF0aW9uXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0LCBvZmZYLCBvZmZZKSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDIgKyB0aGlzLmZhY2luZypvZmZYO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAoZkhlaWdodCAvIDIgLSAxMCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQgLTEwOyAvL2ZpeCBtYWdpYyBudW1iZXIgKGRyYXduIHNsaWdodGx5IGJlbG93IGhpdGJveCB3aXRob3V0IHRoZSAyMCBvZmZzZXQpXG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuanVtcHNMZWZ0ID0gdGhpcy5tYXhKdW1wcztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5qdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgKyBvdGhlci5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCAtIHRoaXMuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICAvLyBibG9ja2luZyBmcm9tIGxlZnQgJiByaWdodFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCAmJiB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdsZWZ0JyAmJiBvdGhlci54IDwgdGhpcy54Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcInNoaWVsZF9ibG9ja1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54ID4gMCAmJiAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQvKmRpcmVjdGlvbiA9PSAncmlnaHQnICYmIG90aGVyLnggPiB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwic2hpZWxkX2Jsb2NrXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJlbmVteV9odXJ0XzFcIilcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBibG9vZCBvciBzb21ldGhpbmcgZ29lcyBoZXJlXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lLmFkZEVudGl0eSguLi4pXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAvLyBibG9ja2luZyBmcm9tIGxlZnQgJiByaWdodFxuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLnBhcmVudCA9PT0gXCJCb21iXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueCAtIG90aGVyLnggPCAwICYmIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ2xlZnQnICYmIG90aGVyLnggPCB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIG90aGVyLnggPiAwICYmICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdyaWdodCcgJiYgb3RoZXIueCA+IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZyB8fCB0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwICYmIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ2xlZnQnICYmIG90aGVyLnggPCB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPiAwICYmICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdyaWdodCcgJiYgb3RoZXIueCA+IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VDSCFcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNvbGRpZXJfU2hpZWxkOyIsIi8vd2lsbCByZXR1cm4gbXVsdGlwbGUgZGlmZmVyZW50IHN1YnR5cGVzIG9mIG1vdmluZyBwbGF0Zm9ybXNcbmltcG9ydCB7VGVycmFpbn0gZnJvbSBcIi4vXCJcblxuY2xhc3MgVGVycmFpbk1vYmlsZSBleHRlbmRzIFRlcnJhaW4ge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGRpbWVuc2lvbnMsIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgdGlsZXMgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4LCBcIlRlcnJhaW5cIik7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnRpbGVzID0gdGlsZXM7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcmNfd2lkdGggPSBkaW1lbnNpb25zWzBdO1xuICAgICAgICB0aGlzLnNyY19oZWlnaHQgPSBkaW1lbnNpb25zWzFdO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgKyA2O1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA5NjtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDk2O1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy54LCB0aGlzLnksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy50aWxlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjb2wgPSB0aGlzLnRpbGVzWzBdXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMudGlsZXNbMV1cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxuICAgICAgICAgICAgICAgICAgICAoY29sICogdGhpcy5zcmNfd2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICAocm93ICogdGhpcy5zcmNfaGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX2hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54LCB0aGlzLnksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoICogMyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfaGVpZ2h0ICogM1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgfVxufSAvLyBlbmQgVGVycmFpblxuXG5leHBvcnQgZGVmYXVsdCBUZXJyYWluTW9iaWxlO1xuXG4iLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiXG5cbmNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBFbnRpdHkge1xuICAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgeCwgeSwgZGltZW5zaW9ucywgaW1nPW51bGwsIGN0eD1udWxsLCBzY2FsZT1udWxsLCB0aWxlcz1udWxsLCBib3VuZHMgPSBbMCwgMCwgMCwgMF0pIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbnRpdHlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJUZXJyYWluXCI7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnRpbGVzID0gdGlsZXM7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcmNfd2lkdGggPSBkaW1lbnNpb25zWzBdO1xuICAgICAgICB0aGlzLnNyY19oZWlnaHQgPSBkaW1lbnNpb25zWzFdO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueCArIGJvdW5kc1syXTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgKyBib3VuZHNbM107XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBib3VuZHNbMF07XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYm91bmRzWzFdO1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lIChjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy50aWxlcyAhPSBudWxsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29sID0gdGhpcy50aWxlc1swXVxuICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMudGlsZXNbMV1cbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIFxuICAgICAgICAgICAgICAgIChjb2wgKiB0aGlzLnNyY193aWR0aCksXG4gICAgICAgICAgICAgICAgKHJvdyAqIHRoaXMuc3JjX2hlaWdodCksXG4gICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5zcmNfaGVpZ2h0LCBcbiAgICAgICAgICAgICAgICB0aGlzLngsIHRoaXMueSxcbiAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCozLCBcbiAgICAgICAgICAgICAgICB0aGlzLnNyY19oZWlnaHQqMyBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUgKCkge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIH1cbn0gLy8gZW5kIFRlcnJhaW5cblxuZXhwb3J0IGRlZmF1bHQgVGVycmFpbjtcbiIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9lbnRpdGllcy9oZXJvXCJcbmltcG9ydCBIdWQgZnJvbSBcIi4vaHVkXCJcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gXCIuL2JhY2tncm91bmRcIlxuaW1wb3J0IFNvdW5kIGZyb20gXCIuL3NvdW5kXCJcblxuXG4gLyoqKioqKioqKioqKioqKlxuR2FtZUVuZ2luZSBjbGFzc1xuKioqKioqKioqKioqKioqKi9cbmNsYXNzIEdhbWVFbmdpbmUge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZWJvYXJkLCBoZXJvKSB7XG4gICAgICAgIHRoaXMuZHJhd0JveGVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGV2TW9kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc291bmQgPSBuZXcgU291bmQoKTtcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IFtdO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnMgPSBbXTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdHggPSBudWxsO1xuICAgICAgICB0aGlzLmNsaWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3VzZSA9IG51bGw7XG4gICAgICAgIHRoaXMud2hlZWwgPSBudWxsO1xuICAgICAgICB0aGlzLnN1cmZhY2VXaWR0aCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3VyZmFjZUhlaWdodCA9IG51bGw7XG4gICAgICAgIHRoaXMubXVzaWMgPSBudWxsO1xuICAgICAgICB0aGlzLmFkZGVkcG9pbnRzID0gMDtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gXCJOb3JtYWwgKEJ1dCBLaW5kYSBFYXN5KVwiO1xuXG4gICAgICAgIC8vREVWIFRPT0wgRklFTERTXG4gICAgICAgIHRoaXMudG9nZ2xlQ29vbGRvd249IDIwO1xuICAgICAgICB0aGlzLmJveFRvZ2dsZVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zZXRQb3NUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmNoZWNrcG9pbnRDeWNsZUNvdW50ID0gMTtcblxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhdXNlVG9nZ2xlQ29vbGRvd24gPSAwO1xuICAgICAgICB0aGlzLnBhdXNlR2VuZXJhbCA9IDQwO1xuICAgICAgICB0aGlzLnBhdXNlTGF5b3V0QSA9IDM1MDtcbiAgICAgICAgdGhpcy5wYXVzZUxheW91dEIgPSAzNTA7XG4gICAgICAgIHRoaXMucGF1c2VGbGF2b3JYID0gODAwO1xuICAgICAgICB0aGlzLnBhdXNlRmxhdm9yWSA9IDI1MDtcblxuICAgICAgICAvLyBLQiBpbnB1dCBrZXljb2Rlc1xuICAgICAgICB0aGlzLmNvbnRyb2xLZXlzID0ge1xuICAgICAgICAgICAgXCJTcGFjZVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVdcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlTXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5RFwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUFcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlSXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5RlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUdcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlFXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5SlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUtcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlMXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5TVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVBcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlUXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5WVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVZcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlDXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiRW50ZXJcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQxXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkMlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDNcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQ0XCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkNVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDZcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQ5XCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgfVxuICAgICAgICAvLyBjb250cm9sIG1hcHBpbmdcbiAgICAgICAgdGhpcy5jb250cm9sTGF5b3V0QSA9IHtcbiAgICAgICAgICAgIFwianVtcFwiOiBcIlNwYWNlXCIsXG4gICAgICAgICAgICBcInJpZ2h0XCI6IFwiS2V5RFwiLFxuICAgICAgICAgICAgXCJsZWZ0XCI6IFwiS2V5QVwiLFxuICAgICAgICAgICAgXCJzaG9vdFwiOiBcIk51bXBhZDRcIixcbiAgICAgICAgICAgIFwic2xhc2hcIjogXCJOdW1wYWQ1XCIsXG4gICAgICAgICAgICBcImNsZWF2ZVwiOiBcIk51bXBhZDZcIixcbiAgICAgICAgICAgIFwiZW5lcmdpemVcIjogXCJLZXlXXCIsXG4gICAgICAgICAgICBcImRhc2hcIjogXCJOdW1wYWQxXCIsXG4gICAgICAgICAgICBcImdldFBvc1wiOiBcIktleUVcIixcbiAgICAgICAgICAgIFwic2V0UG9zXCI6IFwiS2V5UlwiLFxuICAgICAgICAgICAgXCJnb2RUb2dnbGVcIjogXCJLZXlHXCIsXG4gICAgICAgICAgICBcImhhcmRtb2RlXCI6IFwiS2V5VFwiLFxuICAgICAgICAgICAgXCJlYXN5bW9kZVwiOiBcIktleVlcIixcbiAgICAgICAgICAgIFwibGF5b3V0QVwiOiBcIk51bXBhZDlcIixcbiAgICAgICAgICAgIFwibGF5b3V0QlwiOiBcIktleVBcIixcbiAgICAgICAgICAgIFwidGVzdFBvc1wiOiBcIktleVZcIixcbiAgICAgICAgICAgIFwidG9nZ2xlQm94ZXNcIjogXCJLZXlDXCIsXG4gICAgICAgICAgICBcInBhdXNlXCI6IFwiRW50ZXJcIixcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRyb2xMYXlvdXRCID0ge1xuICAgICAgICAgICAgXCJqdW1wXCI6IFwiU3BhY2VcIixcbiAgICAgICAgICAgIFwicmlnaHRcIjogXCJLZXlEXCIsXG4gICAgICAgICAgICBcImxlZnRcIjogXCJLZXlBXCIsXG4gICAgICAgICAgICBcInNob290XCI6IFwiS2V5SlwiLFxuICAgICAgICAgICAgXCJzbGFzaFwiOiBcIktleUtcIixcbiAgICAgICAgICAgIFwiY2xlYXZlXCI6IFwiS2V5TFwiLFxuICAgICAgICAgICAgXCJlbmVyZ2l6ZVwiOiBcIktleVdcIixcbiAgICAgICAgICAgIFwiZGFzaFwiOiBcIktleU1cIixcbiAgICAgICAgICAgIFwiZ2V0UG9zXCI6IFwiS2V5RVwiLFxuICAgICAgICAgICAgXCJzZXRQb3NcIjogXCJLZXlSXCIsXG4gICAgICAgICAgICBcImdvZFRvZ2dsZVwiOiBcIktleUdcIixcbiAgICAgICAgICAgIFwiaGFyZG1vZGVcIjogXCJLZXlUXCIsXG4gICAgICAgICAgICBcImVhc3ltb2RlXCI6IFwiS2V5WVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRBXCI6IFwiTnVtcGFkOVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRCXCI6IFwiS2V5UFwiLFxuICAgICAgICAgICAgXCJ0ZXN0UG9zXCI6IFwiS2V5VlwiLFxuICAgICAgICAgICAgXCJ0b2dnbGVCb3hlc1wiOiBcIktleUNcIixcbiAgICAgICAgICAgIFwicGF1c2VcIjogXCJFbnRlclwiLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xMYXlvdXRBO1xuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgIH1cblxuICAgIC8qXG4gICAgSW5pdGlhbGl6ZXMgdGhlIGdhbWUgZW5naW5lXG4gICAgKi9cbiAgICBpbml0IChjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuc3VyZmFjZVdpZHRoID0gdGhpcy5jdHguY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLnN1cmZhY2VIZWlnaHQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnN0YXJ0SW5wdXQoKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBpbml0aWFsaXplZCcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgU3RhcnRzIHRoZSBnYW1lIGVuZ2luZVxuICAgICovXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIGdhbWVcIik7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5tdXNpYyA9IG5ldyBBdWRpbyhcIi4vYXVkaW8vdHJhY2tfMS53YXZcIik7XG4gICAgICAgIHRoaXMubXVzaWMudm9sdW1lID0gMTtcbiAgICAgICAgdGhpcy5tdXNpYy5wbGF5KCk7XG4gICAgICAgIChmdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICAgICAgICAgIHRoYXQubG9vcCgpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lTG9vcCwgdGhhdC5jdHguY2FudmFzKTtcbiAgICAgICAgfSkoKTtcbiAgICB9XG5cbiAgICBwbGF5U291bmQoc291bmRfbmFtZSwgdm9sdW1lPTEpIHtcbiAgICAgICAgdGhpcy5zb3VuZC5wbGF5KHNvdW5kX25hbWUsIHZvbHVtZSlcbiAgICB9XG5cbiAgICAvL1RpbWVyIGNsYXNzXG4gICAgVGltZXIoKSB7Ly9BZGRlZCB0aGlzIGZvciB3aGVuIHdlIGltcGxlbWVudCBhIHBhdXNlIGZ1bmN0aW9uLlxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gMDtcbiAgICAgICAgdGhpcy5tYXhTdGVwID0gMC4wNTtcbiAgICAgICAgdGhpcy53YWxsTGFzdFRpbWVzdGFtcCA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICAgICAgICB2YXIgd2FsbEN1cnJlbnQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdmFyIHdhbGxEZWx0YSA9ICh3YWxsQ3VycmVudCAtIHRoaXMud2FsbExhc3RUaW1lc3RhbXApIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMud2FsbExhc3RUaW1lc3RhbXAgPSB3YWxsQ3VycmVudDtcblxuICAgICAgICAgICAgdmFyIGdhbWVEZWx0YSA9IE1hdGgubWluKHdhbGxEZWx0YSwgdGhpcy5tYXhTdGVwKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVRpbWUgKz0gZ2FtZURlbHRhO1xuICAgICAgICAgICAgcmV0dXJuIGdhbWVEZWx0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgSW5wdXQgaGFuZGxpbmcsIGluaXRpYWxpemVzIGxpc3RlbmVyc1xuICAgICovXG4gICAgc3RhcnRJbnB1dCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBpbnB1dCcpO1xuXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy50YWJJbmRleCA9IDA7O1xuXG4gICAgICAgIGxldCBnZXRYYW5kWSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCAtIHRoYXQuY3R4LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICAgICAgbGV0IHkgPSBlLmNsaWVudFkgLSB0aGF0LmN0eC5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICBpZiAoeCA8IDEwMjQpIHtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcih4IC8gMzIpO1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKHkgLyAzMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgICAgICAvLyBjb250cm9sIGV2ZW50IGxpc3RlbmVycyBnbyBoZXJlXG4gICAgICAgIGxldCBtYXAgPSB7fTtcblxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKSA9PT0gJyAnKSB0aGF0LnNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghdGhhdC5jb250cm9sS2V5cy5oYXNPd25Qcm9wZXJ0eShlLmNvZGUpKSB7IHRoYXQuY29udHJvbEtleXNbZS5jb2RlXSA9IHtcImFjdGl2ZVwiOiB0cnVlfTsgfVxuICAgICAgICAgICAgaWYgKHRoYXQuY29udHJvbEtleXNbZS5jb2RlXS5hY3RpdmUgPT0gZmFsc2UpIHsgdGhhdC5jb250cm9sS2V5c1tlLmNvZGVdLmFjdGl2ZSA9IHRydWU7IH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2UuY29kZX0gaXMgJHt0aGF0LmNvbnRyb2xzW2UuY29kZV0uYWN0aXZlfWApO1xuXG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmN0eC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIFx0aWYgKCF0aGF0LmNvbnRyb2xLZXlzLmhhc093blByb3BlcnR5KGUuY29kZSkpIHsgdGhhdC5jb250cm9sS2V5c1tlLmNvZGVdID0ge1wiYWN0aXZlXCI6IGZhbHNlfTsgfVxuICAgICAgICAgICAgaWYgKHRoYXQuY29udHJvbEtleXNbZS5jb2RlXS5hY3RpdmUgPT0gdHJ1ZSkgeyB0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0uYWN0aXZlID0gZmFsc2UgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7ZS5jb2RlfSBpcyAke3RoYXQuY29udHJvbHNbZS5jb2RlXS5hY3RpdmV9YCk7XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnB1dCBzdGFydGVkJyk7XG4gICAgfVxuXG4gICAgLypcbiAgICBBZGRzIGFuIGVudGl0eSB0byB0aGUgZ2FtZVxuICAgICovXG4gICAgYWRkRW50aXR5IChlbnRpdHkpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYWRkZWQgZW50aXR5Jyk7XG4gICAgICAgIGlmICh0aGlzLmdhbWVib2FyZC5zdGF0ZXMubG9hZGluZ0xldmVsIHx8IHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbikge1xuICAgICAgICAgICAgZW50aXR5LmxldmVsID0gdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW07XG4gICAgICAgICAgICBlbnRpdHkuc2VjdGlvbiA9IHRoaXMuZ2FtZWJvYXJkLmxldmVsLnNlY3Rpb25OdW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgfVxuXG4gICAgYWRkQmFja2dyb3VuZExheWVyIChsYXllcikge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnMucHVzaChsYXllcik7XG4gICAgfVxuXG5cbiAgICAvKlxuICAgIERyYXdzIGFsbCBlbnRpdGllcyBpbiB0aGUgbGlzdFxuICAgICovXG5cbiAgICBkcmF3IChkcmF3Q2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5jdHguY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhY2tncm91bmRMYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vRHJhdyB0aGUgY2FtZXJhIGFuZCBodWQgZmlyc3RcblxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzW2ldLmRyYXcodGhpcy5jdHgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLy8vRHJhdyBvbmx5IHRlcnJhaW4gdGhhdCBpcyB3aXRoaW4gdGhlIGNhbnZhcyB2aWV3IChudW1iZXJzIGFyZSBuZWdhdGl2ZSBiZWNhdXNlIHRoZSBjYW1lcmEgaXMgd2VpcmQgbGlrZSB0aGF0LlxuICAgICAgICAgICAgLy8vL3Bvc3RpdmUgbnVtYmVycyB3b3VsZCBzY3JldyB0aGUgdHJhbnNsYXRlIHByb2Nlc3MpXG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS50eXBlID09PSBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgICAgIGlmKCgtdGhpcy5lbnRpdGllc1tpXS54IC0gdGhpcy5lbnRpdGllc1tpXS5ib3VuZFdpZHRoIDwgdGhpcy5lbnRpdGllc1swXS54VmlldyBcbiAgICAgICAgICAgICAgICAmJiAtdGhpcy5lbnRpdGllc1tpXS54ID4gdGhpcy5lbnRpdGllc1swXS54VmlldyAtIHRoaXMuY3R4LmNhbnZhcy53aWR0aCBcbiAgICAgICAgICAgICAgICAmJiAtdGhpcy5lbnRpdGllc1tpXS55IC0gdGhpcy5lbnRpdGllc1tpXS5ib3VuZEhlaWdodDwgdGhpcy5lbnRpdGllc1swXS55VmlldyBcbiAgICAgICAgICAgICAgICAmJiAtdGhpcy5lbnRpdGllc1tpXS55ID4gdGhpcy5lbnRpdGllc1swXS55VmlldyAtIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5wYXVzZWQgfHwgdGhpcy5lbnRpdGllc1tpXS5uYW1lID09PSBcIkNhbWVyYVwiKSBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMjVweCBWZXJkYW5hXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI2U1ZTVlNVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlVuaXZlcnNhbCBDb250cm9sc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDQwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUnVuIGxlZnQ6IFNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJ1biByaWdodDogRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAxMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkVuZXJnaXplOiBXXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDE2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiSnVtcDogU3BhY2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMjAwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJOb3JtYWwgRGlmZmljdWx0eSAoZGVmYXVsdCk6IFlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAyNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlRvdWdoIERpZmZpY3VsdHkgKG5vdCBkZWZhdWx0KTogVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDI4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR29kIE1vZGUgVG9nZ2xlIChmb3IgY2hlYXRlcnMpOiBHXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMzIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJBYmlsaXRpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlBvd2VyIFNob3Q6IEVuZXJnaXplICsgU2hvb3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlN3b3JkIEJsYXN0OiBFbmVyZ2l6ZSArIFNsYXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDEyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUmVmbGVjdDogRW5lcmdpemUgKyBDbGVhdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMTYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJMYXlvdXQgQSAoTnVtcGFkIDkpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMjAwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU2hvb3Q6IE51bXBhZCA0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QSArIDI0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiRGFzaDogTnVtcGFkIDFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMjgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJTbGFzaDogTnVtcGFkIDVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMzIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDbGVhdmU6IE51bXBhZCA2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QSArIDM2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiTGF5b3V0IEIgKFApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDIwMFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlNob290OiBKXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDI0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiRGFzaDogTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEIgKyAyODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlNsYXNoOiBLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDMyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ2xlYXZlOiBMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDM2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ3VycmVudCBEaWZmaWN1bHR5IGlzIFwiICsgdGhpcy5kaWZmaWN1bHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyMHB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCIodGhpcyBjYW4gYmUgY2hhbmdlZCBhdCBhbnkgdGltZSwgaW5jbHVkaW5nIHdoaWxlIHBhdXNlZClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDExMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiSXRhbGljIDQwcHggVGltZXMgTmV3IFJvbWFuXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiVGhlIGZvcmNlcyBvZiBldmlsIGFyZSBzdGlsbCBmaW5pc2hpbmcgYXJyYW5nZW1lbnRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VGbGF2b3JZICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIm9uIHRoZSBleHBhbnNpb24gb2YgdGhlaXIgZHVuZ2VvbnMgYW5kIHRocm9uZSByb29tcy5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIHRoaXMucGF1c2VGbGF2b3JYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclkgKyAxMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlByZXBhcmUgZm9yIHRoZSBpbmV2aXRhYmxlIHNob3dkb3duIHdpdGggdGhpcyB2aWxsaWFub3VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VGbGF2b3JZICsgMTYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJzY3VtIGJ5IHRyeWluZyB0byBnZXQgYXMgaGlnaCBhIHNjb3JlIGFzIHBvc3NpYmxlLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWSArIDIwMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIGlmIChkcmF3Q2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRyYXdDYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBVcGRhdGVzIGFsbCBlbnRpdGllcywgY2FsbHMgdGhlaXIgdXBkYXRlIG1ldGhvZHNcbiAgICAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgbGV0IGVudGl0aWVzQ291bnQgPSB0aGlzLmVudGl0aWVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50aXRpZXNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5LmxldmVsID09PSB0aGlzLmdhbWVib2FyZC5sZXZlbE51bSAmJiBlbnRpdHkuc2VjdGlvbiA9PT0gdGhpcy5nYW1lYm9hcmQuc2VjdGlvbk51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInZhbHVlcyAtIGxldmVsOiBcIiArIHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtICsgXCIsIHNlY3Rpb246IFwiICsgdGhpcy5nYW1lYm9hcmQuc2VjdGlvbk51bSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW50aXR5IC0gbGV2ZWw6IFwiICsgZW50aXR5LmxldmVsICsgXCIsIHNlY3Rpb246IFwiICsgZW50aXR5LnNlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucG9pbnRWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLm5ld0xldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkubGV2ZWwgPT09IHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtIHx8IGVudGl0eS5uYW1lID09PSBcIlRlcnJhaW5cIiB8fCBlbnRpdHkubmFtZSA9PT0gXCJIZXJvXCIgfHwgZW50aXR5Lm5hbWUgPT09IFwiSFVEXCIgfHwgZW50aXR5Lm5hbWUgPT09IFwiUG9ydGFsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ2YWx1ZXMgLSBsZXZlbDogXCIgKyB0aGlzLmdhbWVib2FyZC5sZXZlbE51bSArIFwiLCBzZWN0aW9uOiBcIiArIHRoaXMuZ2FtZWJvYXJkLnNlY3Rpb25OdW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImVudGl0eSAtIGxldmVsOiBcIiArIGVudGl0eS5sZXZlbCArIFwiLCBzZWN0aW9uOiBcIiArIGVudGl0eS5zZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnBvaW50VmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZW50aXR5LnJlbW92ZUZyb21Xb3JsZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHkudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5uZXdMZXZlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5uZXdMZXZlbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5sb2FkTmV4dExldmVsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UT0RPIE1vdmUgaW50byBmaXJzdCB1cGRhdGUoKSBmb3IgbG9vcD9cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmVudGl0aWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0ucmVtb3ZlRnJvbVdvcmxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLmhhc093blByb3BlcnR5KFwicG9pbnRWYWx1ZVwiKSAmJiAhdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS5wb2ludFZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyBSZWZhY3RvciBoZXJvIG11bHRpcGxpZXIgYW5kIGRpZmZpY3VsdHkgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuZ2FtZWJvYXJkLnB2dCA9IHRoaXMuZ2FtZWJvYXJkLnB2dHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRlZHBvaW50cyA9IHRoaXMuaGVyby5kaWZmaWN1bHR5ICogdGhpcy5lbnRpdGllc1tpXS5wb2ludFZhbHVlICogdGhpcy5oZXJvLm11bHRpcGxpZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuZGVhZEVuZW1pZXMucHVzaChbW3RoaXMuZW50aXRpZXNbaV0ueCwgdGhpcy5lbnRpdGllc1tpXS55XSwgdGhpcy5hZGRlZHBvaW50cywgMzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zY29yZSArPSB0aGlzLmFkZGVkcG9pbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyby5tdWx0aXBsaWVyICs9IHRoaXMuaGVyby5kaWZmaWN1bHR5ICogLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG90aGVyID0gdGhpcy5lbnRpdGllc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBwcmV2ZW50cyBlYWNoIHBpZWNlIG9mIHRlcnJhaW4gZnJvbSBjaGVja2luZyBjb2xsaXNpb24sIGNhdXNpbmcgc2xvd2Rvd25cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eS50eXBlID09PSBcIlRlcnJhaW5cIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyLnR5cGUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IE1hdGguYWJzKGVudGl0eS54IC0gb3RoZXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkgIT0gb3RoZXIgJiYgZW50aXR5LmlzQ29sbGlkaW5nKG90aGVyKSAhPSAnbm9uZScpIHsgLy8vIEQucHJvdG90eXBlID0gbmV3IEMoKSwgbGlua3MgQyB0byBwcm90b3R5cGUgbGlua2FnZSBvZiBEIE9SIHB1dCBwcm9wZXJ0eSBcInNvbWV0aGluZ190eXBlXCIgb3Igd2hhdGV2ZXIgYW5kIGNoZWNrIGZvciB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBlbnRpdHkuaXNDb2xsaWRpbmcob3RoZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkuY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZW50aXR5ICE9IG90aGVyICYmIGVudGl0eS5pc0NvbGxpZGluZyhvdGhlcikgIT0gJ25vbmUnKSB7IC8vLyBELnByb3RvdHlwZSA9IG5ldyBDKCksIGxpbmtzIEMgdG8gcHJvdG90eXBlIGxpbmthZ2Ugb2YgRCBPUiBwdXQgcHJvcGVydHkgXCJzb21ldGhpbmdfdHlwZVwiIG9yIHdoYXRldmVyIGFuZCBjaGVjayBmb3IgdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGVudGl0eS5pc0NvbGxpZGluZyhvdGhlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkuY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbXVzaWNcbiAgICAgICAgaWYgKHRoaXMubXVzaWMuY3VycmVudFRpbWUgPj0gNjMuOTUpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWMuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tdXNpYy5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1BMQVlFUiBTRVRUSU5HU1xuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmVhc3ltb2RlXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIC8vVE9ETyBNb3ZlIGRpZmZpY3VsdHkgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSBcIk5vcm1hbCAoQnV0IEtpbmRhIEVhc3kpXCI7XG4gICAgICAgICAgICB0aGlzLmhlcm8uZGlmZmljdWx0eSA9IDE7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zY29yZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5oYXJkbW9kZV0uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSBcIlRvdWdoXCI7XG4gICAgICAgICAgICB0aGlzLmhlcm8uZGlmZmljdWx0eSA9IDM7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zY29yZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5sYXlvdXRBXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xMYXlvdXRBO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMubGF5b3V0Ql0uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5jb250cm9sTGF5b3V0QjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnBhdXNlXS5hY3RpdmUgJiYgdGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9ICF0aGlzLnBhdXNlZDtcbiAgICAgICAgICAgIHRoaXMucGF1c2VUb2dnbGVDb29sZG93biA9IHRoaXMudG9nZ2xlQ29vbGRvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF1c2VUb2dnbGVDb29sZG93biA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VUb2dnbGVDb29sZG93bi0tO1xuICAgICAgICB9XG4gICAgICAgIC8vREVWIFRPT0xTXG4gICAgICAgIGlmICh0aGlzLmRldk1vZGUgJiYgIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmdldFBvc10uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ4OiBcIiArIHRoaXMuaGVyby54ICsgXCIsIHk6IFwiICsgdGhpcy5oZXJvLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5zZXRQb3NdLmFjdGl2ZSAmJiB0aGlzLnNldFBvc1RpbWVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc2V0UG9zKHRoaXMuZ2FtZWJvYXJkLmxldmVsLmNoZWNrcG9pbnRzW3RoaXMuY2hlY2twb2ludEN5Y2xlQ291bnRdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvc1RpbWVyID0gdGhpcy50b2dnbGVDb29sZG93bjtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrcG9pbnRDeWNsZUNvdW50ID0gKHRoaXMuY2hlY2twb2ludEN5Y2xlQ291bnQgKyAxKSAlIHRoaXMuZ2FtZWJvYXJkLmxldmVsLmNoZWNrcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuZ29kVG9nZ2xlXS5hY3RpdmUgJiYgdGhpcy5nb2RUb2dnbGVUaW1lciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnN0YXRlcy5pc0dvZCA9ICF0aGlzLmhlcm8uc3RhdGVzLmlzR29kO1xuICAgICAgICAgICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXIgPSB0aGlzLnRvZ2dsZUNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy50ZXN0UG9zXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc2V0UG9zKHRoaXMuZ2FtZWJvYXJkLnRlc3RQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy50b2dnbGVCb3hlc10uYWN0aXZlICYmIHRoaXMuYm94VG9nZ2xlVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0JveGVzID0gIXRoaXMuZHJhd0JveGVzO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94VG9nZ2xlVGltZXIgPSB0aGlzLnRvZ2dsZUNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9Ub2dnbGUgdGltZXJzIChzaG91bGQgZmluYWxseSBsZWFybiBob3cgdG8gdXNlIGFuIFwib24ga2V5dXBcIiBmb3Iga2V5cylcbiAgICAgICAgICAgIGlmICh0aGlzLmJveFRvZ2dsZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm94VG9nZ2xlVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNldFBvc1RpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdvZFRvZ2dsZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdCYWNrZ3JvdW5kKGRyYXdDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmFja2dyb3VuZExheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy9EcmF3IHRoZSBjYW1lcmEgYW5kIGh1ZCBmaXJzdFxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzW2ldLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkcmF3Q2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRyYXdDYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBEZWZpbmVzIHRoZSBnYW1lIGxvb3BcbiAgICAqL1xuICAgIGxvb3AgKCkge1xuICAgICAgICB0aGlzLmN0eC53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLmN0eC5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIHRoaXMuY2xpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLndoZWVsID0gbnVsbDtcbiAgICB9XG5cbn0gLy8gZW5kIG9mIEdhbWVFbmdpbmVcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUVuZ2luZTtcbiIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5cblxuY2xhc3MgSHVkIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHRoaXMuaGVhbHRoYmFyID0gbmV3IEhlYWx0aEJhcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpO1xuICAgICAgICB0aGlzLmVuZXJneWJhciA9IG5ldyBFbmVyZ3lCYXIoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKTtcbiAgICAgICAgdGhpcy5zY29yZWJvYXJkID0gbmV3IFNjb3JlQm9hcmQoZ2FtZV9lbmdpbmUsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlLCBjYW1lcmEpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbdGhpcy5oZWFsdGhiYXIsIHRoaXMuZW5lcmd5YmFyLCB0aGlzLnNjb3JlYm9hcmRdO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcDEgPSAwO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcDIgPSAxO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcDMgPSAyO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHNbaV0uZHJhdyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzQ29sbGlkaW5nKCkge31cbiAgICBjb2xsaWRlZCgpIHt9XG5cbn1cblxuXG5jbGFzcyBTY29yZUJvYXJkIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5zY29yZSA9IGdhbWVfZW5naW5lLmdhbWVib2FyZC5zY29yZTtcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZSA9IGdhbWVfZW5naW5lO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gZGVzdF9jb29yZGluYXRlcztcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBNYXRoLmZsb29yKHRoaXMuZ2FtZV9lbmdpbmUuZ2FtZWJvYXJkLnNjb3JlKTtcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IFstdGhpcy5jYW1lcmEueFZpZXcgKyAyMDAsIC10aGlzLmNhbWVyYS55VmlldyArIDEwMF1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguZm9udCA9IFwiaXRhbGljIGJvbGQgMjVweCBWZXJkYW5hXCIgO1xuICAgICAgICB2YXIgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQodGhpcy5kZXN0X2Nvb3Jkc1swXSAtIDEwMCwgdGhpcy5kZXN0X2Nvb3Jkc1sxXSAtIDEwLCB0aGlzLmRlc3RfY29vcmRzWzBdLCB0aGlzLmRlc3RfY29vcmRzWzFdIC0gMTApO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCxcIm1hZ2VudGFcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCguNSAsXCJibHVlXCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSAsXCJncmVlblwiKTtcbiAgICAgICAgLy8gRmlsbCB3aXRoIGdyYWRpZW50XG4gICAgICAgIGN0eC5maWxsU3R5bGU9Z3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUsXG4gICAgICAgICAgICB0aGlzLmRlc3RfY29vcmRzWzBdIC0gMTAwLCBcbiAgICAgICAgICAgIHRoaXMuZGVzdF9jb29yZHNbMV0gLSAxMFxuICAgICAgICApO1xuICAgICAgICAvL2lmICh0aGlzLmdhbWVfZW5naW5lLmdhbWVib2FyZC5zdGF0ZXMuc2hvd1BvaW50VmFsdWVzKSB7XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiZHJhd1wiKVxuICAgICAgICAvLyAgICBjdHguZm9udCA9IFwiMjBweCBWZXJkYW5hXCI7XG4gICAgICAgIC8vICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgLy8gICAgY3R4LmZpbGxUZXh0KFwiK1wiICsgdGhpcy5nYW1lX2VuZ2luZS5hZGRlZHBvaW50cyArIFwiIHBvaW50c1wiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5oZXJvLnggKyAxMCxcbiAgICAgICAgLy8gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUuaGVyby55IC0gMTUwXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vfVxuICAgIH1cbn1cblxuXG4vKlxuICAgIFJlc291cmNlQmFyIHN1cGVyY2xhc3NcbiovXG5jbGFzcyBSZXNvdXJjZUJhciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUgPSBnYW1lX2VuZ2luZTtcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5pbWcgPSBpbWc7XG4gICAgICAgIHRoaXMuc3JjX2Nvb3JkcyA9IHNyY19jb29yZGluYXRlcztcbiAgICAgICAgdGhpcy5zcmNfZGltcyA9IHNyY19kaW1lbnNpb25zO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gZGVzdF9jb29yZGluYXRlcztcbiAgICAgICAgLy8gdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgbGV0IGxhc3R5ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGFydCA9IHRoaXMucGFydHNbaV1cbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSA9IGxhc3R5ICsgcGFydFtcInNyY19oZWlnaHRcIl07IC8vIHRoaXMgY2F1c2VzIGVhY2ggc2VnbWVudCB0byBiZSBkcmF3biB2ZXJ0aWNhbGx5IG9uIHRvcCBvZiB0aGUgbGFzdFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzb3VyY2VCYXJTZWdtZW50KGltZywgc3JjX2Nvb3Jkcywgc3JjX2RpbXMsIGRlc3RfeF9vZmZzZXQ9MCwgZGVzdF95X29mZnNldD0wKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFwiaW1nXCI6IGltZyxcbiAgICAgICAgICAgICAgICBcInNyY194XCI6IHNyY19jb29yZHNbMF0sXG4gICAgICAgICAgICAgICAgXCJzcmNfeVwiOiBzcmNfY29vcmRzWzFdLFxuICAgICAgICAgICAgICAgIFwic3JjX3dpZHRoXCI6IHNyY19kaW1zWzBdLFxuICAgICAgICAgICAgICAgIFwic3JjX2hlaWdodFwiOiBzcmNfZGltc1sxXSxcbiAgICAgICAgICAgICAgICBcImRlc3RfeF9vZmZzZXRcIjogZGVzdF94X29mZnNldCxcbiAgICAgICAgICAgICAgICBcImRlc3RfeV9vZmZzZXRcIjogZGVzdF95X29mZnNldCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgIC8vIHRoaXMuZGVzdF94ID0gZGVzdF9jb29yZHNbMF1cbiAgICAgICAgICAgLy8gdGhpcy5kZXN0X3kgPSBkZXN0X2Nvb3Jkc1sxXVxuICAgICAgICAgICAvLyB0aGlzLmRlc3Rfd2lkdGggPSBkZXN0X2RpbWVuc2lvbnNbMF1cbiAgICAgICAgICAgLy8gdGhpcy5kZXN0X2hlaWdodCA9IGRlc3RfZGltZW5zaW9uc1sxXVxuICAgIH1cbn1cblxuXG4vKlxuICAgIFByb3ZpZGVzIGEgaGVhbHRoIGJhciBmb3IgdGhlIEhlcm8uXG4gICAgQ29uc3RydWN0ZWQgb2YgcmVzb3VyY2VCYXJTZWdtZW50cywgZGVmaW5lZCBpbiBSZXNvdXJjZUJhci5cbiAgICBIZWFsdGggZ3Jvd3MgdXB3YXJkLlxuKi9cbmNsYXNzIEhlYWx0aEJhciBleHRlbmRzIFJlc291cmNlQmFyIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICBzdXBlcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zKTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZXJvLmhlYWx0aDsgLy8gaGFzIHJvb20gZm9yIDYgdGlja3NcbiAgICAgICAgdGhpcy53aWR0aCA9IDE0OyAvLyB0aGUgcGl4ZWwgYXJ0IHdpZHRoXG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuXG4gICAgICAgIC8vIGJhciBzZWdtZW50c1xuICAgICAgICB0aGlzLnRvcCA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZywgXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfZGltZW5zaW9uc1sxXSArIDBdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDNdKTtcbiAgICAgICAgdGhpcy5taWRkbGUxID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlMiA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlMyA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlNCA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlNSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMuYm90dG9tID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDE5XSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxOF0pO1xuICAgICAgICB0aGlzLnRpY2sgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsIFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSArIDMsIHNyY19jb29yZGluYXRlc1sxXSArIDE2XSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLTcsIDNdLFxuICAgICAgICAgICAgOSwgMTEpO1xuICAgICAgICB0aGlzLnBhcnRzID0gW3RoaXMudG9wLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZGRsZTEsIHRoaXMubWlkZGxlMiwgdGhpcy5taWRkbGUzLCB0aGlzLm1pZGRsZTQsIHRoaXMubWlkZGxlNSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3R0b21dXG5cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgbGFzdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXJ0ID0gdGhpcy5wYXJ0c1tpXVxuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5ID0gbGFzdHkgKyBwYXJ0W1wic3JjX2hlaWdodFwiXTsgLy8gdGhpcyBjYXVzZXMgZWFjaCBzZWdtZW50IHRvIGJlIGRyYXduIHZlcnRpY2FsbHkgb24gdG9wIG9mIHRoZSBsYXN0XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0eSAtPSB0aGlzLmJvdHRvbVtcInNyY19oZWlnaHRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmhlYWx0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHRoaXMudGljaywgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgLT0gMiAvLyB0aGlzIGNhdXNlcyBoZWFsdGggdG8gZ3JvdyB1cHdhcmQgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsXG4gICAgICAgICAgICBwYXJ0W1wic3JjX3hcIl0sIHBhcnRbXCJzcmNfeVwiXSwgLy8gc3JjIHgsIHlcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfd2lkdGhcIl0sIHBhcnRbXCJzcmNfaGVpZ2h0XCJdLCAvLyBzcmMgd2lkdGgsIGhlaWdodFxuICAgICAgICAgICAgdGhpcy5kZXN0X2Nvb3Jkc1swXSArIHBhcnRbXCJkZXN0X3hfb2Zmc2V0XCJdLCB0aGlzLmRlc3RfY29vcmRzWzFdICsgKGxhc3R5ICogdGhpcy5zY2FsZSkgLSBwYXJ0W1wiZGVzdF95X29mZnNldFwiXSwgLy8gZGVzdCB4LCB5XG4gICAgICAgICAgICBwYXJ0W1wic3JjX3dpZHRoXCJdICogdGhpcy5zY2FsZSwgcGFydFtcInNyY19oZWlnaHRcIl0gKiB0aGlzLnNjYWxlLCAvLyBkZXN0IHdpZHRoLCBoZWlnaHRcbiAgICAgICAgKSBcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy5oZXJvLmhlYWx0aDtcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IFstdGhpcy5jYW1lcmEueFZpZXcgKyAxMDAsIC10aGlzLmNhbWVyYS55VmlldyArIDEwMF1cbiAgICB9XG4gICAgaXNDb2xsaWRpbmcoKSB7fVxuICAgIGNvbGxpZGVkKCkge31cblxufVxuXG5cbi8qXG4gICAgUHJvdmlkZXMgYW4gZW5lcmd5IGJhciBmb3IgdGhlIEhlcm8uXG4gICAgQ29uc3RydWN0ZWQgb2YgcmVzb3VyY2VCYXJTZWdtZW50cywgZGVmaW5lZCBpbiBSZXNvdXJjZUJhci5cbiAgICBFbmVyZ3kgZ3Jvd3MgdXB3YXJkLlxuKi9cbmNsYXNzIEVuZXJneUJhciBleHRlbmRzIFJlc291cmNlQmFyIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICBzdXBlcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zKTtcbiAgICAgICAgdGhpcy5lbmVyZ3kgPSBoZXJvLmVuZXJneTsgLy8gaGFzIHJvb20gZm9yIDYgdGlja3NcbiAgICAgICAgdGhpcy53aWR0aCA9IDE0OyAvLyB0aGUgcGl4ZWwgYXJ0IHdpZHRoXG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICBzcmNfY29vcmRpbmF0ZXMgPSBbc3JjX2Nvb3JkaW5hdGVzWzBdICsgMTUsIHNyY19jb29yZGluYXRlc1sxXV1cblxuICAgICAgICAvLyBiYXIgc2VnbWVudHNcbiAgICAgICAgdGhpcy50b3AgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfZGltZW5zaW9uc1sxXSArIDBdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDNdKTtcbiAgICAgICAgdGhpcy5taWRkbGUxID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUyID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUzID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU0ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU1ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcblxuICAgICAgICB0aGlzLmJvdHRvbSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDE5XSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxOF0pO1xuICAgICAgICB0aGlzLnRpY2sgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdICsgMywgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTZdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGggLSA3LCAzXSxcbiAgICAgICAgICAgIDksIDExKTtcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFt0aGlzLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taWRkbGUxLCB0aGlzLm1pZGRsZTIsIHRoaXMubWlkZGxlMywgdGhpcy5taWRkbGU0LCB0aGlzLm1pZGRsZTUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tXVxuXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgbGV0IGxhc3R5ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGFydCA9IHRoaXMucGFydHNbaV1cbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSA9IGxhc3R5ICsgcGFydFtcInNyY19oZWlnaHRcIl07IC8vIHRoaXMgY2F1c2VzIGVhY2ggc2VnbWVudCB0byBiZSBkcmF3biB2ZXJ0aWNhbGx5IG9uIHRvcCBvZiB0aGUgbGFzdFxuICAgICAgICB9XG5cbiAgICAgICAgbGFzdHkgLT0gdGhpcy5ib3R0b21bXCJzcmNfaGVpZ2h0XCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5lbmVyZ3k7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCB0aGlzLnRpY2ssIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5IC09IDIgLy8gdGhpcyBjYXVzZXMgZW5lcmd5IHRvIGdyb3cgdXB3YXJkIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxuICAgICAgICAgICAgcGFydFtcInNyY194XCJdLCBwYXJ0W1wic3JjX3lcIl0sIC8vIHNyYyB4LCB5XG4gICAgICAgICAgICBwYXJ0W1wic3JjX3dpZHRoXCJdLCBwYXJ0W1wic3JjX2hlaWdodFwiXSwgLy8gc3JjIHdpZHRoLCBoZWlnaHRcbiAgICAgICAgICAgIHRoaXMuZGVzdF9jb29yZHNbMF0gKyBwYXJ0W1wiZGVzdF94X29mZnNldFwiXSwgdGhpcy5kZXN0X2Nvb3Jkc1sxXSArIChsYXN0eSAqIHRoaXMuc2NhbGUpIC0gcGFydFtcImRlc3RfeV9vZmZzZXRcIl0sIC8vIGRlc3QgeCwgeVxuICAgICAgICAgICAgcGFydFtcInNyY193aWR0aFwiXSAqIHRoaXMuc2NhbGUsIHBhcnRbXCJzcmNfaGVpZ2h0XCJdICogdGhpcy5zY2FsZSwgLy8gZGVzdCB3aWR0aCwgaGVpZ2h0XG4gICAgICAgICkgXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmVuZXJneSA9IHRoaXMuaGVyby5lbmVyZ3k7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBbLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTUwLCAtdGhpcy5jYW1lcmEueVZpZXcgKyAxMDBdXG4gICAgfVxuICAgIGlzQ29sbGlkaW5nKCkge31cbiAgICBjb2xsaWRlZCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh1ZDsiLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlXCJcblxud2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoLyogZnVuY3Rpb24gKi8gY2FsbGJhY2ssIC8qIERPTUVsZW1lbnQgKi8gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfTtcbn0pKCk7XG5cbkNvcmUoKVxuIiwiaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi4vYXNzZXQtbWFuYWdlclwiXG5pbXBvcnQgR2FtZUVuZ2luZSBmcm9tIFwiLi4vZ2FtZS1lbmdpbmVcIlxuaW1wb3J0IEh1ZCBmcm9tIFwiLi4vaHVkXCJcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gXCIuLi9iYWNrZ3JvdW5kXCJcbmltcG9ydCBTb3VuZCBmcm9tIFwiLi4vc291bmRcIlxuaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgR2FtZUJvYXJkLFxuICAgIENhbWVyYSxcbiAgICBFbnRpdHksXG4gICAgVGVycmFpbixcbiAgICBIZXJvLFxuICAgIExlbyxcbiAgICBGbGFtZXMsXG4gICAgU29sZGllclNoaWVsZCxcbiAgICBEaW5vLFxuICAgIENyb3csXG4gICAgQnVsbGV0LFxuICAgIFNob3RibGFzdCxcbiAgICBFbmVteSxcbiAgICBIdXJ0Ym94LFxuICAgIEhhbmQsXG4gICAgSGF6YXJkcyxcbiAgICBIZWFsdGhQYWNrLFxuICAgIEVuZXJneVBhY2tcbn0gZnJvbSBcIi4uL2VudGl0aWVzXCJcblxuXG5jbGFzcyBMZXZlbE9uZSB7XG5cbiAgICAvKiBEZWZpbmUgdGVycmFpbiAqL1xuICAgIGNvbnN0cnVjdG9yKGdhbWVFbmdpbmUsIGFzc2V0TWFuYWdlciwgY3R4KSB7XG5cbiAgICAgICAgLy9pbnN0YW5jZSB2YXJpYWJsZXNcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lID0gZ2FtZUVuZ2luZTtcbiAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIgPSBhc3NldE1hbmFnZXI7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnRpbGVzaGVldCA9IGFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9waXBlcy5wbmdcIik7XG4gICAgICAgIHRoaXMubGV2ZWxOdW0gPSAxO1xuICAgICAgICB0aGlzLnNlY3Rpb25OdW07XG4gICAgICAgIHRoaXMuY2hlY2twb2ludHMgPSBbWzE1LCAxODI0XSwgWzM4NzAsIDBdXTtcbiAgICAgICAgdGhpcy5jYW1WYWxzID0gW1syLCAxLjVdLCBbMiwgMS41XV07XG4gICAgICAgIHRoaXMuY2FtU3BlZWRzID0gW1s3LCA3XSwgWzcsIDddXTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRDaGVja3BvaW50cyA9IFt0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcbiAgICAgICAgdGhpcy5uZXh0TGV2ZWwgPSAyO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZENoZWNrcG9pbnRzID0gW3RydWUsIGZhbHNlXTtcbiAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgUG9ydGFsKHRoaXMuZ2FtZUVuZ2luZSwgMzg3MCwgLTIwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIHRydWUpO1xuXG4gICAgICAgIHRoaXMudGlsZVNpemUgPSA5NjtcblxuICAgICAgICB0aGlzLnRpbGVNYXAgPSB7XG4gICAgICAgICAgICAnICc6IG51bGwsXG4gICAgICAgICAgICAvLyAnXFxuJzogbnVsbCxcbiAgICAgICAgICAgICdpJzogWzAsIDZdLFxuICAgICAgICAgICAgJyEnOiBbMSwgMF0sXG4gICAgICAgICAgICAnWyc6IFsxLCA0XSxcbiAgICAgICAgICAgICc8JzogWzEsIDZdLFxuICAgICAgICAgICAgJ3snOiBbMiwgMF0sXG4gICAgICAgICAgICAnPic6IFsyLCA2XSxcbiAgICAgICAgICAgICdfJzogWzMsIDBdLFxuICAgICAgICAgICAgJyMnOiBbMywgMV0sXG4gICAgICAgICAgICAnLSc6IFszLCA0XSxcbiAgICAgICAgICAgICd9JzogWzQsIDBdLFxuICAgICAgICAgICAgJ2onOiBbNCwgM10sXG4gICAgICAgICAgICAnfCc6IFs0LCA2XSxcbiAgICAgICAgICAgICdsJzogWzIsIDNdLFxuICAgICAgICAgICAgJ34nOiBbNiwgMF0sXG4gICAgICAgICAgICAnXSc6IFs2LCAzXSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbGVEaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgLy9ib3VuZFdpZHRoLCBib3VuZEhlaWdodCwgb2ZmWCwgb2ZmWVxuICAgICAgICAgICAgJ2knOiBbMTYsIDMyLCA0NCwgMF0sXG4gICAgICAgICAgICAnISc6IFsxNiwgMzIsIDQ0LCAwXSxcbiAgICAgICAgICAgICdbJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnPCc6IFsxNiwgMTYsIDQ0LCAyNF0sXG4gICAgICAgICAgICAneyc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJz4nOiBbMTYsIDE2LCAwLCAyNF0sXG4gICAgICAgICAgICAnXyc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJyMnOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICctJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnfSc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJ2onOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICd8JzogWzE2LCAzMiwgNCwgMF0sXG4gICAgICAgICAgICAnbCc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJ34nOiBbMzIsIDE2LCAwLCAyNF0sXG4gICAgICAgICAgICAnXSc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICB9XG4gICAgICAgIC8vIDIwIGxpbmVzIGZyb20gdG9wIHRvIGJvdHRvbVxuICAgICAgICB0aGlzLm1hcCA9XG5ge19fX19fX19fX19fX19fX19fX19fX19fX19fX199ICAgIHt9ICAge199ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0taiAgICBbXSAgIGwtaiBcbiEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9ICBbXVxuISAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGogIFtdXG4hICAge19fX19fX19ffSAgICAgICAgICAgICAgICAgICAgW11cbiEgICBsLS0tLS0tLS1qICAgICAgICAgICAgICAgICAgICBbXVxuISAgICAgICAgICAgICB7fSAgICB7fSAgICAgIHtfX19ffVtdXG4hICAgICAgICAgICAgIGxqICAgIGxqICAgICAgbC0tLS1qW11cbjx+fn5+fn5+fn4+ICAgICAgICAgICAgICAgICAgICAgIHxbXVxuICAgICAge30gICAgICAgICAgICAgICAgICAgICB8W10gICAgICAgICAgICAgICBcbiAgICAgIFtdICAgICAgICAgICAgICAgICAgICAgfFtdXG4gICAgICBbXXtfX19ffSAgICB7X19fX30gICAgIHxbXVxuICAgICAgW11sLS0tLWogICAgbC0tLS1qICAgICB8W11cbiAgICAgIFtdICAgICAgICAgICAgICAgICAgICAgfFtdXG4gICAgICBsaiAgICAgICAgICAgICAgICAgICAgIHxbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7X199W11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgbC0taltdXG57fXtfX19fX199e317X19ffXt9e19fX19fX19fX317fVtdXG5salstLS0tLS1dbGpbIyMjXWxqWyMjIyMjIyMjI11saltdXG57fXt9W10hfn58W117fWwtLS1qe31sLS0tLS0tLS0tant9W11cbmxqW11bXSEgIHxbXWxqfn5+fn5saiAgICAgICAgICAgbGpbXVxuYC5zcGxpdCgnXFxuJyk7XG5cbiAgICB9XG5cbiAgICBsb2FkKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdFRlcnJhaW4oKTtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU1hcCgpO1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0VGVycmFpbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25zdHJ1Y3RpbmcgdGVycmFpbi4uLlwiKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1hcFswXS5sZW5ndGggKyBcIiB4IFwiICsgdGhpcy5tYXAubGVuZ3RoKVxuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCB0aGlzLm1hcFswXS5sZW5ndGg7IGNvbCsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCB0aGlzLm1hcC5sZW5ndGg7IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVNYXBbdGhpcy5tYXBbcm93XVtjb2xdXVxuICAgICAgICAgICAgICAgIGlmICh0aWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGVEaW1lbnNpb24gPSB0aGlzLnRpbGVEaW1lbnNpb25zW3RoaXMubWFwW3Jvd11bY29sXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFRlcnJhaW4odGhpcy5nYW1lRW5naW5lLCBjb2wgKiB0aGlzLnRpbGVTaXplLCByb3cgKiB0aGlzLnRpbGVTaXplLCBbMzIsIDMyXSwgdGhpcy50aWxlc2hlZXQsIHRoaXMuY3R4LCAzLCB0aWxlLCB0aWxlRGltZW5zaW9uKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9wdWxhdGVNYXAoY2hlY2twb2ludCkge1xuICAgICAgICBpZiAoY2hlY2twb2ludCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbl8xKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hlY2twb2ludCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbl8xKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWN0aW9uXzEoKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbk51bSA9IDA7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEhlYWx0aFBhY2sodGhpcy5nYW1lRW5naW5lLCAyOTM1LCAxMjAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9oZWFsdGhwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCA0KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEVuZXJneVBhY2sodGhpcy5nYW1lRW5naW5lLCAyOTY1LCAxMjAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9lbmVyZ3lwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCA0KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEhlYWx0aFBhY2sodGhpcy5nYW1lRW5naW5lLCAzMDAsIDQwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvaGVhbHRocGFjay5wbmdcIiksIHRoaXMuY3R4LCAxMCwgOCwgNCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBFbmVyZ3lQYWNrKHRoaXMuZ2FtZUVuZ2luZSwgMzMwLCA0MDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2VuZXJneXBhY2sucG5nXCIpLCB0aGlzLmN0eCwgMTAsIDgsIDQpKTtcblxuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBIYW5kKHRoaXMuZ2FtZUVuZ2luZSwgMjMwMCwgMTQ1MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFNvbGRpZXJTaGllbGQodGhpcy5nYW1lRW5naW5lLCAxODAwLCAxNDUwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgQ3Jvdyh0aGlzLmdhbWVFbmdpbmUsIDEzNTAsIDEzMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBDcm93KHRoaXMuZ2FtZUVuZ2luZSwgMjk1MCwgMTcwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG5cblxuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBTb2xkaWVyU2hpZWxkKHRoaXMuZ2FtZUVuZ2luZSwgMTMwMCwgMTEwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IENyb3codGhpcy5nYW1lRW5naW5lLCA0MDAsIDMwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG5cbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgRGlubyh0aGlzLmdhbWVFbmdpbmUsIDIxMzAsIDEwNjEsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgOTAsIDYwLCA0MDAsIDI1MCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBEaW5vKHRoaXMuZ2FtZUVuZ2luZSwgMTk4MCwgNTgyLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpKTtcbiAgICB9XG59XG5cbmNsYXNzIExldmVsVHdvIHtcblxuICAgIC8qIERlZmluZSB0ZXJyYWluICovXG4gICAgY29uc3RydWN0b3IoZ2FtZUVuZ2luZSwgYXNzZXRNYW5hZ2VyLCBjdHgpIHtcblxuICAgICAgICAvLyBpbnN0YW5jZSB2YXJpYWJsZXNcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lID0gZ2FtZUVuZ2luZTtcbiAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIgPSBhc3NldE1hbmFnZXI7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnRpbGVzaGVldCA9IGFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9waXBlcy5wbmdcIik7XG4gICAgICAgIHRoaXMubGV2ZWxOdW0gPSAyO1xuICAgICAgICB0aGlzLnNlY3Rpb25OdW07XG4gICAgICAgIHRoaXMuY2hlY2twb2ludHMgPSBbWy01NzAsIDE0NDBdLCBbMzIwMCwgMTQ0MF0sIFs3MDAwLCAxMjAwXSwgWzk5NTUsIDM4NF1dO1xuICAgICAgICB0aGlzLmNhbVZhbHMgPSBbWzIsIDEuNV0sIFsyLjc1LCAxLjc1XSwgWzIsIDEuNV0sIFsyLCAyXV07XG4gICAgICAgIHRoaXMuY2FtU3BlZWRzID0gW1s3LCA3XSwgWzcsIDRdLCBbNCwgNF0sIFs0LCA0XV07XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkQ2hlY2twb2ludHMgPSBbdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV07XG4gICAgICAgIHRoaXMubmV4dExldmVsID0gLTE7XG4gICAgICAgIHRoaXMucG9ydGFsID0gbmV3IFBvcnRhbCh0aGlzLmdhbWVFbmdpbmUsIC01NzAsIDE0MjAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgdHJ1ZSk7XG5cbiAgICAgICAgLy9JJ2QgbGlrZSB0byB1c2UgYW4gYXJyYXkgb2YgZnVuY3Rpb25zICh3aWxsIGxldCB1cyBoYXZlIGFuIGFjdHVhbCBMZXZlbCBzdXBlcmNsYXNzKVxuICAgICAgICAvL3RoaXMuc2VjdGlvbkZ1bmN0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy50aWxlU2l6ZSA9IDk2O1xuXG4gICAgICAgIHRoaXMudGlsZU1hcCA9IHtcbiAgICAgICAgICAgICcgJzogbnVsbCxcbiAgICAgICAgICAgIC8vICdcXG4nOiBudWxsLFxuICAgICAgICAgICAgJ2knOiBbMCwgNl0sXG4gICAgICAgICAgICAnISc6IFsxLCAwXSxcbiAgICAgICAgICAgICdbJzogWzEsIDRdLFxuICAgICAgICAgICAgJzwnOiBbMSwgNl0sXG4gICAgICAgICAgICAneyc6IFsyLCAwXSxcbiAgICAgICAgICAgICc+JzogWzIsIDZdLFxuICAgICAgICAgICAgJ18nOiBbMywgMF0sXG4gICAgICAgICAgICAnIyc6IFszLCAxXSxcbiAgICAgICAgICAgICctJzogWzMsIDRdLFxuICAgICAgICAgICAgJ30nOiBbNCwgMF0sXG4gICAgICAgICAgICAnaic6IFs0LCAzXSxcbiAgICAgICAgICAgICd8JzogWzQsIDZdLFxuICAgICAgICAgICAgJ2wnOiBbMiwgM10sXG4gICAgICAgICAgICAnfic6IFs2LCAwXSxcbiAgICAgICAgICAgICddJzogWzYsIDNdLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGlsZURpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICAvL2JvdW5kV2lkdGgsIGJvdW5kSGVpZ2h0LCBvZmZYLCBvZmZZXG4gICAgICAgICAgICAnaSc6IFsxNiwgMzIsIDQ0LCAwXSxcbiAgICAgICAgICAgICchJzogWzE2LCAzMiwgNDQsIDBdLFxuICAgICAgICAgICAgJ1snOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICc8JzogWzE2LCAxNiwgNDQsIDI0XSxcbiAgICAgICAgICAgICd7JzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnPic6IFsxNiwgMTYsIDAsIDI0XSxcbiAgICAgICAgICAgICdfJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnIyc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJy0nOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICd9JzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnaic6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJ3wnOiBbMTYsIDMyLCA0LCAwXSxcbiAgICAgICAgICAgICdsJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnfic6IFszMiwgMTYsIDAsIDI0XSxcbiAgICAgICAgICAgICddJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgIH1cblxuICAgICAgICAvLyAyMCBsaW5lcyBmcm9tIHRvcCB0byBib3R0b21cbiAgICAgICAgdGhpcy5tYXAgPVxuICAgICAgICAgICAgYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fiAgICAgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgIFtdICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICA8fn5+fn4+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8fn4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fXt9e19fX19fX317fXtfX199e317X19fX19fX19ffXt9e30gICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICB7fSAgICAgICAgICAgICAgW11samwtLS0tLS1qbGpsLS0tamxqbC0tLS0tLS0tLWpsaltdICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdICAgICAgICAgICAgICAgICAgICAgICAgICBdXG57X19ffXt9e317X19fX19ffXt9e19fX317fXtfX19fX19fX199e31bXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGogICAgICAgICAgICAgICAgICAgICAgICAgIF1cblsjIyNdbGpsalsjIyMjIyNdbGpsLS0taltdbC0tLS0tLS0tLWpsaltdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsai0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0talxuWyMjI10gICAgWyMjIyMjI10gICAgICAgW10gICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuWyMjI10gICAgWyMjIyMjI10gICAgICAgW10gICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuWyMjI10gICAgWyMjIyMjI10gICAgICAgW10gICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmAuc3BsaXQoJ1xcbicpO1xuXG4gICAgICAgIHRoaXMubWFwU3RhcnQgPSBcbmB7X31cbmwtalxuYC5zcGxpdCgnXFxuJyk7XG5cbiAgICB9XG5cbiAgICBsb2FkKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdFRlcnJhaW4oKTtcbiAgICAgICAgLy9tYXBTdGFydCAodGhpcyBzYXZlcyB3b3JrIGZvciBub3cuIE5vdCBnb29kIHByYWN0aWNlLiBVbmxlc3Mgd2UgZm9ybWFsaXplIGl0PylcbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgdGhpcy5tYXBTdGFydFswXS5sZW5ndGg7IGNvbCsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCB0aGlzLm1hcFN0YXJ0Lmxlbmd0aDsgcm93KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMudGlsZU1hcFt0aGlzLm1hcFN0YXJ0W3Jvd11bY29sXV07XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZURpbWVuc2lvbiA9IHRoaXMudGlsZURpbWVuc2lvbnNbdGhpcy5tYXBTdGFydFtyb3ddW2NvbF1dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBUZXJyYWluKHRoaXMuZ2FtZUVuZ2luZSwgLTY1MCArIGNvbCAqIHRoaXMudGlsZVNpemUsIDE0NDAgKyByb3cgKiB0aGlzLnRpbGVTaXplLCBbMzIsIDMyXSwgdGhpcy50aWxlc2hlZXQsIHRoaXMuY3R4LCAzLCB0aWxlLCB0aWxlRGltZW5zaW9uKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9wdWxhdGVNYXAoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RUZXJyYWluKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbnN0cnVjdGluZyB0ZXJyYWluLi4uXCIpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFwWzBdLmxlbmd0aCArIFwiIHggXCIgKyB0aGlzLm1hcC5sZW5ndGgpXG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHRoaXMubWFwWzBdLmxlbmd0aDsgY29sKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHRoaXMubWFwLmxlbmd0aDsgcm93KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMudGlsZU1hcFt0aGlzLm1hcFtyb3ddW2NvbF1dO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGVEaW1lbnNpb24gPSB0aGlzLnRpbGVEaW1lbnNpb25zW3RoaXMubWFwW3Jvd11bY29sXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFRlcnJhaW4odGhpcy5nYW1lRW5naW5lLCBjb2wgKiB0aGlzLnRpbGVTaXplLCByb3cgKiB0aGlzLnRpbGVTaXplLCBbMzIsIDMyXSwgdGhpcy50aWxlc2hlZXQsIHRoaXMuY3R4LCAzLCB0aWxlLCB0aWxlRGltZW5zaW9uKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9wdWxhdGVNYXAoY2hlY2twb2ludCkge1xuICAgICAgICBpZiAoY2hlY2twb2ludCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbl8xKCk7XG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25fMigpO1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzMoKTtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbl80KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hlY2twb2ludCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbl8xKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2twb2ludCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbl8yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2twb2ludCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbl8zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2twb2ludCA9PT0gMykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbl80KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKkRlZmluZSBTZWN0aW9ucyovXG4gICAgc2VjdGlvbl8xKCkge1xuICAgICAgICB0aGlzLnNlY3Rpb25OdW0gPSAwO1xuICAgICAgICAvKioqSEFaQVJEUyoqKi9cblxuICAgICAgICAvKioqRU5FTUlFUyoqKi9cbiAgICAgICAgdmFyIGhhbmQxID0gbmV3IEhhbmQodGhpcy5nYW1lRW5naW5lLCAyMjgzLCAxMzQ0LCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpO1xuICAgICAgICBoYW5kMS5kaXN0YW5jZSA9IDc1O1xuICAgICAgICBoYW5kMS5zaWdodFJhZGl1c1swXSA9IDIzMDA7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkoaGFuZDEpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBDcm93KHRoaXMuZ2FtZUVuZ2luZSwgNTAwLCAxMDAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDUwLCA0MCwgWzMwMCwgMTAwMF0pKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgRGlubyh0aGlzLmdhbWVFbmdpbmUsIDE0NjAsIDk4NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA5MCwgNjAsIC8qcGF0cm9sIGRpc3RhbmNlKi8zMDAsIC8qc2hvdCB0aW1lIG9mZnNldCovIDApKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgQ3Jvdyh0aGlzLmdhbWVFbmdpbmUsIDIzMDAsIDEwMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgNTAsIDQwLFxuICAgICAgICAgICAgLypzaWdodFJhZGl1cyovWzMwMCwgMTAwMF0sIC8qTXVyZGVyIFBhcmFtZXRlcnMqL3RydWUsIFtbLTYwMCwgMjAwXSwgWzQwMCwgNDAwXV0pKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgU29sZGllclNoaWVsZCh0aGlzLmdhbWVFbmdpbmUsIDEwMDAsIDE0NDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBIYW5kKHRoaXMuZ2FtZUVuZ2luZSwgMzIwMCwgMTQ0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG4gICAgICAgIC8vdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgRGlubyh0aGlzLmdhbWVFbmdpbmUsIDMwMDAsIDE0NDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgOTAsIDYwLCAvKnBhdHJvbCBkaXN0YW5jZSovMCwgLypzaG90IHRpbWUgb2Zmc2V0Ki8gMTI1KSk7XG5cbiAgICAgICAgLyoqKklURU1TKioqL1xuXG4gICAgICAgIC8qKipUT1AgTEFZRVIgRU5USVRJRVMqKiovXG5cbiAgICB9XG5cbiAgICBzZWN0aW9uXzIoKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbk51bSA9IDE7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEhhbmQodGhpcy5nYW1lRW5naW5lLCA2ODI1LCA5ODQsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBMYXVuY2hlcih0aGlzLmdhbWVFbmdpbmUsIDY4NzUsIDc5MiArIDIgKiA3MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA4LCA4LCBbLTEsIDBdLCA5MCwgMzUwLCAyMCkpXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdW5jaGVyKHRoaXMuZ2FtZUVuZ2luZSwgNjg3NSAtIDk1LCA5ODQgKyAyICogNzAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgOCwgOCwgWy0xLCAwXSwgOTAsIDM1MCwgNTApKVxuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBMYXVuY2hlcih0aGlzLmdhbWVFbmdpbmUsIDY4NzUsIDExNzYgKyAyICogNzAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgOCwgOCwgWy0xLCAwXSwgNDUsIDM1MCwgNjApKVxuICAgIH1cblxuICAgIHNlY3Rpb25fMygpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uTnVtID0gMjtcbiAgICAgICAgLyoqKkJPVFRPTSBMQVlFUiBFTlRJVElFUyoqKi9cbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgSGVhbHRoUGFjayh0aGlzLmdhbWVFbmdpbmUsIDg2NjUsIDk1MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvaGVhbHRocGFjay5wbmdcIiksIHRoaXMuY3R4LCAxMCwgOCwgNCwgMTUpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgRW5lcmd5UGFjayh0aGlzLmdhbWVFbmdpbmUsIDg2MzUsIDEwMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2VuZXJneXBhY2sucG5nXCIpLCB0aGlzLmN0eCwgMTAsIDgsIDQsIDE1KSk7XG5cbiAgICAgICAgLyoqKkhBWkFSRFMqKiovXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEZpcmViYWxsKHRoaXMuZ2FtZUVuZ2luZSwgNzMwMCwgMTQ1MCAtIDE0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qY29vbGRvd24qLyA1MCwgLypzcGVlZCovIDIwKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEZpcmViYWxsKHRoaXMuZ2FtZUVuZ2luZSwgNzgyMCwgMTQ1MCAtIDE0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qY29vbGRvd24qLyA1MCwgLypzcGVlZCovIDIwLCAvKm9mZnNldCovIDI1KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIDc1MTIsXG4gICAgICAgICAgICAxMTUyICsgNDQsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSwgMjAgKiA0LCAwLCAzKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIDc5ODAsXG4gICAgICAgICAgICAxMDU2ICsgNDQsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSwgMjAgKiA0LCAyMCwgMykpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCA4NjY1LFxuXG4gICAgICAgICAgICAxMTUwICsgNDQsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSwgMjAgKiAzLjUsIDQwLCAwKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIDc2OTIsXG4gICAgICAgICAgICA3MDAgKyA0NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLCAyMCAqIDQuNSwgMCwgMykpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCA4MDY0LFxuICAgICAgICAgICAgMjUwICsgNDQsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSwgMjAgKiA3LCA0MCwgMjApKTtcblxuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBMYXVuY2hlcih0aGlzLmdhbWVFbmdpbmUsIDc5NjUsIC0zMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgNywgNywgWzAsIDFdLCAxMjAsIDE2MCkpXG5cbiAgICAgICAgLyoqKkVORU1JRVMqKiovXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IENyb3codGhpcy5nYW1lRW5naW5lLCA4NjUwLCAtMzAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDUwLCA0MCxcbiAgICAgICAgICAgIFsyNSwgMTAwMF0sIHRydWUsIFtbLTYwMCwgMjUwXSwgWzYwMCwgMjUwXV0pKTtcblxuICAgICAgICAvKioqSVRFTVMqKiovXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEhlYWx0aFBhY2sodGhpcy5nYW1lRW5naW5lLCA3MDUwLCAxMjQ4LCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9oZWFsdGhwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCA0LCAxNSkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBFbmVyZ3lQYWNrKHRoaXMuZ2FtZUVuZ2luZSwgNzA4MCwgMTI0OCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvZW5lcmd5cGFjay5wbmdcIiksIHRoaXMuY3R4LCAxMCwgOCwgNCwgMTUpKTtcblxuICAgICAgICAvKioqVE9QIExBWUVSIEVOVElUSUVTKioqL1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBMYXZhKHRoaXMuZ2FtZUVuZ2luZSwgNzUwMCwgMTQwMCAtIDE0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCAzMDApKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgTGF2YSh0aGlzLmdhbWVFbmdpbmUsIDg0MDAsIDE0MDAgLSAxNDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgMzAwKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdmEodGhpcy5nYW1lRW5naW5lLCA5MzAwLCAxNDAwIC0gMTQwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDMwMCkpO1xuICAgIH1cblxuICAgIHNlY3Rpb25fNCgpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uTnVtID0gMztcbiAgICAgICAgdmFyIHNwaWtlc09yaWdpbiA9IFsxMDU3MCAtIDI4LCA3OTAgKyA0Nl1cbiAgICAgICAgdmFyIHNwaWtlT2Zmc2V0cyA9IFtcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFsxICogNDUwIC0gMjAwLCAxICogLTI1MF0sXG4gICAgICAgICAgICBbMiAqIDQ1MCAtIDEyNSwgMiAqIC0yNTBdLFxuICAgICAgICAgICAgWzMgKiA0NTAgLSAxMjUsIDIgKiAtMjUwXSxcbiAgICAgICAgICAgIFs0ICogNDUwIC0gMjAwLCAxICogLTI1MF0sXG4gICAgICAgICAgICBbNSAqIDQ1MCAtIDM3NSwgMCAqIC0yNTBdLFxuICAgICAgICAgICAgWzMgKiA0NTAgLSA3NSwgLTEgKiAtMjUwXSxcbiAgICAgICAgICAgIFsyICogNDUwIC0gMjI1LCAtMSAqIC0yNTBdLFxuICAgICAgICAgICAgWzMgKiA0NTAgLSAzNTAsIDEgKiAtNTBdLFxuICAgICAgICBdXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIHRpbWUgPSA4MDtcbiAgICAgICAgLyoqKkhBWkFSRFMqKiovXG4gICAgICAgIHZhciBzcGlrZXMxID0gbmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIHNwaWtlc09yaWdpblswXSArIHNwaWtlT2Zmc2V0c1tpXVswXSwgc3Bpa2VzT3JpZ2luWzFdICsgc3Bpa2VPZmZzZXRzW2krK11bMV0sXG4gICAgICAgICAgICB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDIsIHRydWUsXG4gICAgICAgICAgICB0aW1lLCA0MCwgMiwgMCk7XG5cbiAgICAgICAgdmFyIHNwaWtlczIgPSBuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgc3Bpa2VzT3JpZ2luWzBdICsgc3Bpa2VPZmZzZXRzW2ldWzBdLCBzcGlrZXNPcmlnaW5bMV0gKyBzcGlrZU9mZnNldHNbaSsrXVsxXSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSxcbiAgICAgICAgICAgIHRpbWUsIDYwLCAyLCAwKTtcblxuICAgICAgICB2YXIgc3Bpa2VzMyA9IG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCBzcGlrZXNPcmlnaW5bMF0gKyBzcGlrZU9mZnNldHNbaV1bMF0sIHNwaWtlc09yaWdpblsxXSArIHNwaWtlT2Zmc2V0c1tpKytdWzFdLFxuICAgICAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLFxuICAgICAgICAgICAgdGltZSwgODAsIDIsIDApO1xuXG4gICAgICAgIHZhciBzcGlrZXM0ID0gbmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIHNwaWtlc09yaWdpblswXSArIHNwaWtlT2Zmc2V0c1tpXVswXSwgc3Bpa2VzT3JpZ2luWzFdICsgc3Bpa2VPZmZzZXRzW2krK11bMV0sXG4gICAgICAgICAgICB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDIsIHRydWUsXG4gICAgICAgICAgICB0aW1lLCA4MCwgMiwgMCk7XG5cbiAgICAgICAgdmFyIHNwaWtlczUgPSBuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgc3Bpa2VzT3JpZ2luWzBdICsgc3Bpa2VPZmZzZXRzW2ldWzBdLCBzcGlrZXNPcmlnaW5bMV0gKyBzcGlrZU9mZnNldHNbaSsrXVsxXSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSxcbiAgICAgICAgICAgIHRpbWUsIDYwLCAyLCAwKTtcblxuICAgICAgICB2YXIgc3Bpa2VzNiA9IG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCBzcGlrZXNPcmlnaW5bMF0gKyBzcGlrZU9mZnNldHNbaV1bMF0sIHNwaWtlc09yaWdpblsxXSArIHNwaWtlT2Zmc2V0c1tpKytdWzFdLFxuICAgICAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLFxuICAgICAgICAgICAgdGltZSwgNDAsIDIsIDApO1xuXG4gICAgICAgIHZhciBzcGlrZXM3ID0gbmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIHNwaWtlc09yaWdpblswXSArIHNwaWtlT2Zmc2V0c1tpXVswXSwgc3Bpa2VzT3JpZ2luWzFdICsgc3Bpa2VPZmZzZXRzW2krK11bMV0sXG4gICAgICAgICAgICB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDIsIHRydWUsXG4gICAgICAgICAgICB0aW1lLCAyMCwgMiwgMCk7XG5cbiAgICAgICAgdmFyIHNwaWtlczggPSBuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgc3Bpa2VzT3JpZ2luWzBdICsgc3Bpa2VPZmZzZXRzW2ldWzBdLCBzcGlrZXNPcmlnaW5bMV0gKyBzcGlrZU9mZnNldHNbaSsrXVsxXSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSxcbiAgICAgICAgICAgIHRpbWUsIDIwLCAyLCAwKTtcblxuICAgICAgICB2YXIgc3Bpa2VzOSA9IG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCBzcGlrZXNPcmlnaW5bMF0gKyBzcGlrZU9mZnNldHNbaV1bMF0sIHNwaWtlc09yaWdpblsxXSArIHNwaWtlT2Zmc2V0c1tpKytdWzFdLFxuICAgICAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLFxuICAgICAgICAgICAgdGltZSwgMCwgMiwgMCk7XG4gICAgICAgIC8vdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgSGF6YXJkc1tcInByb2plY3RpbGUtY2lyY2xlXCJdKHRoaXMuZ2FtZUVuZ2luZSwgMTE2MDAsIDgwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCAxMCwgMTAsIDEwMCkpXG5cblxuICAgICAgXG4gICAgICAgIC8qKipFTkVNSUVTKioqL1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBDcm93KHRoaXMuZ2FtZUVuZ2luZSwgMTIxNTAsIDkwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA1MCwgNDAsXG4gICAgICAgICAgICBbNjUwLCA1MDBdLCB0cnVlLCBbWy0xMjAwLCAwXSwgWy02MDAsIC03MDBdXSkpO1xuXG4gICAgICAgIC8qKipJVEVNUyoqKi9cblxuICAgICAgICAvKioqVE9QIExBWUVSIEVOVElUSUVTKioqL1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBMYXZhKHRoaXMuZ2FtZUVuZ2luZSwgMTAyMDAsIDE0MDAgLSAxNDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgMzAwKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdmEodGhpcy5nYW1lRW5naW5lLCAxMTEwMCwgMTQwMCAtIDE0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCAzMDApKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgTGF2YSh0aGlzLmdhbWVFbmdpbmUsIDEyMDAwLCAxNDAwIC0gMTQwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDMwMCkpO1xuICAgICAgICB2YXIgc3Bpa2VzQm9yZGVyID0gbmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIDEyNTQzIC0gMjAsXG4gICAgICAgICAgICAxMjQ4ICsgNDQsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSwgMjAgKiA1LCAyMCAqIDMsIDIsIDApO1xuICAgIH1cbn1cblxuY2xhc3MgUG9ydGFsIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgLy90aGlzLnkgKz0gNDQ7IEdpdmUgYSArNDQgb2Zmc2V0IHdoZW4gaW5zdGFudGlhdGluZyBcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuc2NhbGUgKiA1O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0ICogdGhpcy5zY2FsZSAvIDIgKyA1ICogdGhpcy5zY2FsZTtcblxuICAgICAgICB0aGlzLmNvb2xkb3duID0gMjA7XG4gICAgICAgIHRoaXMuY29vbGRvd25UaW1lciA9IDA7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgMTEsIDgsIDUsIDgsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gdGhpcy5jb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvb2xkb3duVGltZXItLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy9NYWtlIG5vaXNlIHdoZW4gaGVybyBjb2xsaWRlcz9cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB7TGV2ZWxPbmUsIExldmVsVHdvfSIsImNsYXNzIFNvdW5kIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNvdW5kcyA9IHtcbiAgICAgICAgICAgIFwiaGVyb19odXJ0XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZHNvb2Yud2F2XCIpLFxuICAgICAgICAgICAgXCJoZXJvX3Nob290XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vaGVyby1zaG9vdC53YXZcIiksXG4gICAgICAgICAgICBcImVuZW15X3Nob290XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vc2hvb3QtMS53YXZcIiksXG4gICAgICAgICAgICBcImFycm93X2ZpcmVcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9BcnJvdy1GaXJlLndhdlwiKSxcbiAgICAgICAgICAgIFwiY3Jvd19jYXdcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9jcm93LWNhdy53YXZcIiksXG4gICAgICAgICAgICBcImVuZW15X2h1cnRfMVwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2VuZW15LWh1cnQtMS53YXZcIiksXG4gICAgICAgICAgICBcImVuZXJneV9sYXVuY2hlclwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2VuZXJneS1sYXVuY2hlci53YXZcIiksXG4gICAgICAgICAgICBcImV4cGxvc2lvbl8xXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZXhwbG9zaW9uLTEud2F2XCIpLFxuICAgICAgICAgICAgXCJsYXZhX2JhbGxcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9sYXZhLWJhbGwud2F2XCIpLFxuICAgICAgICAgICAgXCJzaGllbGRfYmxvY2tcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9zaGllbGQtYmxvY2sud2F2XCIpLFxuICAgICAgICAgICAgXCJzd29yZF9zd2luZ1wiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL3N3b3JkLXN3aW5nLndhdlwiKSxcbiAgICAgICAgICAgIFwib3V0X29mX2VuZXJneVwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL29vZS53YXZcIiksXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbl9kdXBzID0gNVxuICAgICAgICBmb3IgKHZhciBzb3VuZCBpbiB0aGlzLnNvdW5kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc291bmRzLmhhc093blByb3BlcnR5KHNvdW5kKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50XCI6IDAsXG4gICAgICAgICAgICAgICAgICAgIFwibWF4XCI6IG5fZHVwcyxcbiAgICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjogdGhpcy5tYWtlX2R1cGxpY2F0ZXMoc291bmQsIG5fZHVwcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIFJldHVybnMgYSBsaXN0IG9mIG5fZHVwIGR1cGxpY2F0ZWQgQXVkaW8gb2JqZWN0cyAqL1xuICAgIG1ha2VfZHVwbGljYXRlcyhzb3VuZCwgbl9kdXA9NSkge1xuICAgICAgICBsZXQgY3Vycl9zb3VuZCA9IHRoaXMuc291bmRzW3NvdW5kXVxuICAgICAgICBsZXQgc291bmRfbGlzdCA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG5fZHVwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjbG9uZSA9IGN1cnJfc291bmQuY2xvbmVOb2RlKClcbiAgICAgICAgICAgIHNvdW5kX2xpc3QucHVzaChjbG9uZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc291bmRfbGlzdFxuICAgIH1cblxuXG4gICAgLyogcGxheXMgYSBzb3VuZCAqL1xuICAgIHBsYXkoc291bmQsIHZvbHVtZT0wLjUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zb3VuZHNbc291bmRdW1wiY3VycmVudFwiXVxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5zb3VuZHNbc291bmRdW1wibWF4XCJdLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcImN1cnJlbnRcIl0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXhdLmVuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXgrMV0uY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXgrMV0udm9sdW1lID0gdm9sdW1lXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXgrMV0ucGxheSgpXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJjdXJyZW50XCJdICs9IDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleF0uY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXhdLnZvbHVtZSA9IHZvbHVtZVxuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4XS5wbGF5KClcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291bmQ7Il0sInNvdXJjZVJvb3QiOiIifQ==