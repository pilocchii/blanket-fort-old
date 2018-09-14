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

/***/ "./src/const.json":
/*!************************!*\
  !*** ./src/const.json ***!
  \************************/
/*! exports provided: settings, default */
/***/ (function(module) {

module.exports = {"settings":{"debug":true}};

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
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./background */ "./src/background.js");
/* harmony import */ var _entities_hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entities/hero */ "./src/entities/hero.js");
/* harmony import */ var _logging__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./logging */ "./src/logging.js");








/* Assembles and starts the game. */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var toload = ["img/ZXe.png", "img/Leo.png", "img/EnemySheet1.png", "img/pipes.png", "img/Enemies.png", "img/hud.png", "img/healthpack.png", "img/energypack.png", "img/bg/1_bg.png", "img/bg/2_farbuildings.png", "img/bg/3_buildings.png", "img/bg/4_foreground.png", "img/bg/bot_fill.png"];
  var ASSET_MANAGER = new _asset_manager__WEBPACK_IMPORTED_MODULE_0__["default"](toload);
  ASSET_MANAGER.downloadAll(function () {
    _logging__WEBPACK_IMPORTED_MODULE_7__["default"].debug("starting asset manager download");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    _logging__WEBPACK_IMPORTED_MODULE_7__["default"].debug("canvas width: " + canvas.width);
    _logging__WEBPACK_IMPORTED_MODULE_7__["default"].debug("canvas height: " + canvas.height);
    var gameEngine = new _game_engine__WEBPACK_IMPORTED_MODULE_1__["default"](); // TODO: 

    var camera = new _entities_camera__WEBPACK_IMPORTED_MODULE_3__["default"](gameEngine, 0, 0, null, ctx = ctx, canvas.width, canvas.height, 2000, 2000);
    var hero = new _entities_hero__WEBPACK_IMPORTED_MODULE_6__["default"](gameEngine, 0, 0, ASSET_MANAGER.getAsset("img/ZXe.png"), ctx);
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
    var background = new _background__WEBPACK_IMPORTED_MODULE_5__["default"](gameEngine, ASSET_MANAGER, ctx, camera); //Loads level n

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

/***/ "./src/logging.js":
/*!************************!*\
  !*** ./src/logging.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.json */ "./src/const.json");
var _const_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./const.json */ "./src/const.json", 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvYWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2JvbWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2J1bGxldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9jcm93LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9kaW5vLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9lbmVteS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9mbGFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhemFyZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2h1cnRib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9sZW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUtc3dvcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JlZmxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvc2hvdGJsYXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9zb2xkaWVyLXNoaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvdGVycmFpbi1tb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3RlcnJhaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9odWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2dpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcHMvbGV2ZWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC5qcyJdLCJuYW1lcyI6WyJBbmltYXRpb24iLCJzcHJpdGVTaGVldCIsImZyYW1lRGltZW5zaW9ucyIsInJvdyIsInNoZWV0V2lkdGgiLCJmcmFtZUR1cmF0aW9uIiwiZnJhbWVzIiwibG9vcCIsInNjYWxlIiwiY29sdW1uT2Zmc2V0IiwiZnJhbWVXaWR0aCIsImZyYW1lSGVpZ2h0IiwidG90YWxUaW1lIiwiZWxhcHNlZFRpbWUiLCJsb29wcyIsInRpY2siLCJjdHgiLCJ4IiwieSIsImZhY2luZ1JpZ2h0IiwiaXNEb25lIiwiZnJhbWUiLCJjdXJyZW50RnJhbWUiLCJ4aW5kZXgiLCJ5aW5kZXgiLCJkcm93IiwiTWF0aCIsImZsb29yIiwic2F2ZSIsInRyYW5zbGF0ZSIsImRyYXdJbWFnZSIsInJlc3RvcmUiLCJBc3NldE1hbmFnZXIiLCJkb3dubG9hZFF1ZXVlIiwic3VjY2Vzc0NvdW50IiwiZXJyb3JDb3VudCIsImNhY2hlIiwicGF0aCIsInB1c2giLCJsZW5ndGgiLCJjYWxsYmFjayIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJpIiwiaW1nIiwiSW1hZ2UiLCJ0aGF0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNyYyIsIkxheWVyIiwic3JjX2RpbWVuc2lvbnMiLCJjYW1lcmEiLCJzY3JvbGxfc3BlZWQiLCJoZWlnaHRfZmFjdG9yIiwiZGVzdF95Iiwic3RyZXRjaCIsInNyY193aWR0aCIsInNyY19oZWlnaHQiLCJjYW1lcmFfZGltZW5zaW9ucyIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwiZF9oZWlnaHQiLCJkX3kiLCJ4VmlldyIsIkJhY2tncm91bmQiLCJnYW1lX2VuZ2luZSIsImFzc2V0X21hbmFnZXIiLCJsYXllcnMiLCJtYWtlX2JhY2tncm91bmQiLCJhZGRCYWNrZ3JvdW5kTGF5ZXIiLCJnZXRBc3NldCIsInRvbG9hZCIsIkFTU0VUX01BTkFHRVIiLCJkb3dubG9hZEFsbCIsIkwiLCJkZWJ1ZyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiLCJnYW1lRW5naW5lIiwiaGVybyIsImJvYXJkIiwiZ2FtZWJvYXJkIiwiaHVkIiwiYWRkRW50aXR5IiwiYmFja2dyb3VuZCIsImdldExldmVsIiwiZm9sbG93IiwiaW5pdCIsInN0YXJ0IiwiQWN0b3IiLCJnYW1lIiwic3ByaXRlV2lkdGgiLCJzcHJpdGVIZWlnaHQiLCJwYXJlbnRDbGFzcyIsImZhY2luZyIsInN0YXRlcyIsImFuaW1hdGlvbnMiLCJhbmltYXRpb24iLCJib3VuZFgiLCJib3VuZFkiLCJjb29yZGluYXRlcyIsIkJvbWIiLCJ4VmVsb2NpdHkiLCJ5VmVsb2NpdHkiLCJjZW50ZXJYIiwiYm91bmRXaWR0aCIsImJvdW5kSGVpZ2h0Iiwic2lnaHRSYWRpdXMiLCJoZWFsdGgiLCJkYW1hZ2UiLCJsYXVuY2h0aW1lIiwiY291bnRkb3duIiwic3RhcnR1cCIsImZyaWN0aW9uIiwibGF1bmNoIiwibGF1bmNoaW5nIiwidXBkYXRlUG9zIiwiYWN0aXZhdGluZyIsInJlc2V0IiwiZGV0b25hdGluZyIsImV4cGxvZGluZyIsImV4cGxvZGVkIiwiZXhwbG9zaW9uWCIsImV4cGxvc2lvblkiLCJwbGF5U291bmQiLCJodXJ0Ym94IiwibWF4IiwicmVmbGVjdGVkIiwicGFyZW50IiwibmFtZSIsInJlbW92ZUZyb21Xb3JsZCIsImdyYXZpdHkiLCJsYXN0Qm91bmRZIiwiYWN0aXZhdGUiLCJkZXRvbmF0ZSIsImV4cGxvZGUiLCJkcmF3SW1nIiwiZldpZHRoIiwiZkhlaWdodCIsImJXaWR0aCIsImJIZWlnaHQiLCJvdGhlciIsImRpcmVjdGlvbiIsImlzRW5lbXkiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsInJlY3QiLCJzdHJva2UiLCJjbG9zZVBhdGgiLCJkcmF3RnJhbWUiLCJkcmF3Qm94ZXMiLCJkcmF3T3V0bGluZSIsIkJ1bGxldCIsIm1vdmVtZW50U3BlZWQiLCJidWxsZXQiLCJhY3RpdmUiLCJzdGVhZHkiLCJDYW1lcmEiLCJ5VmlldyIsIndvcmxkV2lkdGgiLCJ3b3JsZEhlaWdodCIsImFic09mZlgiLCJhYnNPZmZZIiwib2ZmWCIsIm9mZlkiLCJjYW1TcGVlZFgiLCJjYW1TcGVlZFkiLCJheGlzIiwiZm9sbG93ZWQiLCJvYmoiLCJ1cGRhdGVCb3VuZHMiLCJ2YWwiLCJtaW4iLCJDcm93IiwibXVyZGVyTGVhZGVyIiwibXVyZGVyRHJvb2dzIiwicG9pbnRWYWx1ZSIsInhTcGVlZCIsInlTcGVlZCIsIm1heFgiLCJtYXhZIiwieEFjY2VsIiwieUFjY2VsIiwiYXR0YWNrQW5nbGUxIiwiYXR0YWNrQW5nbGUyIiwieEF0dGFjayIsInhSZWNvdmVyIiwieVJlY292ZXIiLCJyZWNvdmVyRGlzdGFuY2UiLCJ4UmVjb3ZlckRpc3RhbmNlIiwieVJlY292ZXJEaXN0YW5jZSIsImRyb29nT25lIiwiZHJvb2dUd28iLCJyYW5kIiwiZmx5IiwicmVjb3ZlcmluZyIsImF0dGFja2luZ19maW5hbCIsImlkbGluZyIsImFicyIsImZseWluZyIsImRyb29nMSIsImRyb29nMiIsImxldmVsIiwic2VjdGlvbiIsInJhbmRvbSIsImF0dGFja2luZyIsInNvdW5kIiwicGxheSIsImh1cnQiLCJ1cGRhdGVIaXRib3giLCJIZWFsdGhQYWNrIiwiYXNzZXRNYW5hZ2VyIiwiRW5lcmd5UGFjayIsImF0dGFjayIsImF0dGFja19maW5hbCIsIkRpbm8iLCJwYXRyb2xEaXN0YW5jZSIsInNob3RUaW1lT2Zmc2V0Iiwic3RhcnRYIiwic2hvdENvb2xkb3duIiwic2hvdENvb2xkb3duVGltZXIiLCJwYXRyb2xsaW5nIiwiaWRsZSIsInNob290aW5nIiwid2Fsa2luZyIsImZyYW1lbG9ja2VkIiwid2Fsa19zdHJhaWdodCIsInNob290X2RpYWdvbmFsIiwiRW5lbXkiLCJkYW1hZ2VUeXBlIiwiRW50aXR5IiwiY29uc3RydWN0b3IiLCJ0eXBlIiwiYXJjIiwicmFkaXVzIiwiUEkiLCJzaG93T3V0bGluZXMiLCJjbG9ja1RpY2siLCJyZWN0MSIsInJlY3QyIiwiY29sbGlzaW9uIiwiZHgiLCJkeSIsImxhc3RkeSIsImxhc3RZIiwiY3Jvc3NXaWR0aCIsImxhc3RDcm9zc1dpZHRoIiwiY3Jvc3NIZWlnaHQiLCJGbGFtZXMiLCJkZW1vIiwib3JpZ1giLCJvcmlnWSIsIkdhbWVCb2FyZCIsInRlc3RQb3MiLCJsZXZlbE51bSIsInNlY3Rpb25OdW0iLCJwdnQiLCJwdnR0IiwibG9zdFNjb3JlIiwiZGVhZEVuZW1pZXMiLCJzY29yZSIsInRpbWUiLCJjaGVja05vZGUiLCJsYXN0Q2hlY2twb2ludCIsImxvYWROZXh0TGV2ZWwiLCJjb25zb2xlIiwibG9nIiwibmV4dExldmVsIiwiY2xlYXJTdGF0ZXMiLCJsb2FkZWRMZXZlbCIsImxvYWQiLCJsb2FkaW5nTGV2ZWwiLCJwb3B1bGF0ZU1hcCIsInNldFBvcyIsIm5leHROb2RlIiwiY2hlY2twb2ludHMiLCJuZXh0IiwibmV3TGV2ZWwiLCJwb3J0YWwiLCJsb2FkaW5nU2VjdGlvbiIsInJlc3Bhd25TZWN0aW9uIiwiaXNCYWNrIiwiY2xlYXJCb2FyZCIsImFjdGl2YXRlZCIsImNhbU9mZlgiLCJjYW1PZmZZIiwibmV4dENhbVNwZWVkIiwiaXNGcm9udCIsInByZXYiLCJwcmV2Q2FtU3BlZWQiLCJyZXNwYXduZWQiLCJyZXNwYXduIiwicmVzcGF3bk1lc3NhZ2UiLCJzaG93UG9pbnRWYWx1ZXMiLCJmb250IiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiLCJzcGxpY2UiLCJzY29wZSIsIm51bSIsInBvcHVsYXRlTGV2ZWwiLCJyZXNwYXduTGV2ZWwiLCJsb2FkZWRTZWN0aW9uIiwiY3VyckNoZWNrUG9zIiwiY3VyckNoZWNrWCIsImN1cnJDaGVja1kiLCJsaXN0RnJvbnQiLCJDaGVja3BvaW50IiwiY2FtVmFscyIsImNhbVNwZWVkcyIsImhhc1ByZXYiLCJjdXJyQ2hlY2siLCJwcmV2Q2hlY2siLCJoYXNOZXh0IiwiYWRkTmV4dCIsInNldEJvdW5kcyIsImNhbWVyYVNoaWZ0IiwiY2FtZXJhU3BlZWQiLCJyaWdodEJvdW5kIiwibGVmdEJvdW5kIiwiYWN0aXZhdGlvblJhZGl1cyIsIkhhbmQiLCJkaXN0YW5jZSIsInRocm93dGltZSIsImNvb2xkb3duIiwiY29vbGRvd252YXJpYW5jZSIsImNvb2xkb3duVGltZXIiLCJzdGFydGluZyIsInRocm93aW5nIiwiaGFzVGhyb3duIiwidGhyb3ciLCJyZWNvdmVyIiwieE9mZiIsInlPZmYiLCJoYXNPd25Qcm9wZXJ0eSIsIkxhdmEiLCJmaXJlQ29vbGRvd25UaW1lciIsImZpcmVDb29sZG93biIsIkZpcmViYWxsIiwic3Bhd25PZmZzZXQiLCJvcmlnQm91bmRYIiwib3JpZ0JvdW5kWSIsIm1pZGRsZV91cCIsInBlYWtfdXAiLCJwZWFrX2Rvd24iLCJtaWRkbGVfZG93biIsImZpbmlzaCIsIlNwaWtlcyIsInRpbWVyIiwidGltZU9mZnNldCIsImludGVydmFsIiwic3Bpa2VDb29sZG93blRpbWVyIiwic3Bpa2VDb29sZG93biIsImluYWN0aXZlX2Rvd24iLCJuZXh0T2Zmc2V0IiwiaW5hY3RpdmVfdXAiLCJQcm9qZWN0aWxlSGF6YXJkIiwiZGlyZWN0aW9ucyIsImxpZmVzcGFuIiwieERpciIsInlEaXIiLCJQcm9qZWN0aWxlQ2lyY2xlIiwicXVhZHJhbnRzIiwicXVhZHJhbnQiLCJMYXVuY2hlciIsInByb2plY3RpbGVMaWZlc3BhbiIsImxhdW5jaFRpbWVPZmZzZXQiLCJIZXJvIiwiZGFzaFNwZWVkIiwianVtcFN0cmVuZ3RoIiwianVtcHNMZWZ0IiwibWF4SnVtcHMiLCJ0ZXJtaW5hbFZlbG9jaXR5IiwibWF4SGVhbHRoIiwibWF4RW5lcmd5IiwiZW5lcmd5Iiwic2xhc2hFbmVyZ3lDb3N0IiwiY2xlYXZlRW5lcmd5Q29zdCIsInNob290Q29zdCIsInNob290RW5lcmd5Q29zdCIsImRhc2hFbmVyZ3lDb3N0Iiwic3R1bkRpciIsIm11bHRpcGxpZXIiLCJkaWZmaWN1bHR5IiwiZGFtYWdlQ29vbGRvd25UaW1lciIsImRhbWFnZUNvb2xkb3duIiwiZW5lcmd5Q29vbGRvd25UaW1lciIsImVuZXJneUNvb2xkb3duIiwiZW5lcmd5Q29vbGRvd25NaW4iLCJlbmVyZ3lEZWxheSIsImVuZXJneURlbGF5VGltZXIiLCJ2ZWxvY2l0eUNvb2xkb3duIiwidmVsb2NpdHlDb29sZG93blRpbWVyIiwianVtcFRpbWVyIiwianVtcENvb2xkb3duIiwic2hvb3RDb29sZG93blRpbWVyIiwic2hvb3RDb29sZG93biIsImdvZE1vZGVFbmVyZ3lNaW4iLCJub3RHb2RNb2RlRW5lcmd5TWluIiwiZ29kRW5lcmd5RGVsYXkiLCJub3RHb2RFbmVyZ3lEZWxheSIsInNldFBvc1RpbWVyIiwiZ29kVG9nZ2xlVGltZXIiLCJjb250cm9sS2V5cyIsImNvbnRyb2xzIiwicmlnaHQiLCJydW5uaW5nIiwibGVmdCIsImVuZXJnaXplIiwiZW5lcmdpemVkIiwianVtcCIsImp1bXBpbmciLCJncm91bmRlZCIsInNob290Iiwic2hvdGxvY2tlZCIsImNsZWF2ZSIsInNldFN0YXRlcyIsImNsZWF2aW5nIiwic2xhc2giLCJkYXNoaW5nIiwiZGFzaCIsImRhc2hpbmdTdGFydCIsImhhc0Rhc2hlZCIsImhhc1JlZmxlY3RlZCIsInVzZUVuZXJneSIsInNsYXNoaW5nIiwiaGFzR3Jhdml0eSIsImhhc1NsYXNoZWQiLCJlbmVyZ3lEYXNoIiwiZGFzaGluZ01pZCIsImludnVsbmVyYWJsZSIsImRhc2hpbmdFbmQiLCJzdHVubmVkIiwiZGVhZCIsImlzR29kIiwiYXNjZW5kIiwiZGVzY2VuZCIsImd1bnJ1biIsImFpcnNob290IiwiZGFzaF9zdGFydCIsImRhc2hfbWlkIiwiZGFzaF9lbmQiLCJzdHVuIiwiY29zdCIsImVuZXJneURlbGF5Q29vbGRvd24iLCJIdXJ0Ym94IiwicGFyZW50V2lkdGgiLCJwYXJlbnRIZWlnaHQiLCJodXJ0V2lkdGgiLCJodXJ0SGVpZ2h0IiwicGVyc2lzdGVudCIsIkl0ZW0iLCJ4T2Zmc2V0IiwieU9mZnNldCIsIm9uX3BpY2t1cCIsImhlYWx0aF92YWx1ZSIsImVuZXJneV92YWx1ZSIsIkxlbyIsImp1bXBTcGVlZCIsInRpbWVyU3RhcnQiLCJEYXRlIiwibm93Iiwic3ByaW5mbyIsImx1bmdlIiwiZGVtb2xvb3AiLCJsdW5naW5nIiwiZmlyZWx1bmdpbmciLCJmaXJlbHVuZ2UiLCJlIiwiUHJvamVjdGlsZV9Td29yZCIsInN0YWJsaXplZCIsInN0YWJsZSIsInJlY292ZXJ5IiwiUHJvamVjdGlsZSIsImdyZWVuIiwiZ3JlZW5fZXhpdGluZyIsImJsdWVfZXhpdGluZyIsImdyZWVuX3N0YWJsZSIsImJsdWUiLCJibHVlX3N0YWJsZSIsIlJlZmxlY3Rib3giLCJSb2NrZXQiLCJkcmFpblRpbWUiLCJib3VuY2VDb3VudCIsImJvdW5jZVRpbWVyIiwiYm91bmNlVGltZSIsInNhZmVUaW1lciIsInJvY2tldCIsIlNob3RibGFzdCIsInNob3RibGFzdCIsIlNvbGRpZXJfU2hpZWxkIiwicnVuUHJvYiIsInJ1bkF3YXlDb29sZG93biIsInJ1bkF3YXlDb29sZG93blRpbWVyIiwicnVuQXdheVRpbWUiLCJydW5Bd2F5VGltZXIiLCJydW5uaW5nQXdheSIsImJsb2NraW5nIiwidHVybmluZyIsInNsYXNoaW5nX3N0YXJ0Iiwic2hvb3Rpbmdfc3RhcnR1cCIsInNob290aW5nX2FjdGl2ZSIsInNob290aW5nX3JlY292ZXIiLCJoYXNTaG90Iiwic2xhc2hpbmdfZW5kIiwicnVuIiwic2hvb3Rfc3RhcnR1cCIsInNob290X2FjdGl2ZSIsInNob290X3JlY292ZXIiLCJzbGFzaF9zdGFydCIsInNsYXNoX2VuZCIsImJsb2NrIiwidHVybiIsIlRlcnJhaW5Nb2JpbGUiLCJkaW1lbnNpb25zIiwidGlsZXMiLCJjb2wiLCJUZXJyYWluIiwiYm91bmRzIiwiR2FtZUVuZ2luZSIsImRldk1vZGUiLCJlbnRpdGllcyIsImJhY2tncm91bmRMYXllcnMiLCJjbGljayIsIm1vdXNlIiwid2hlZWwiLCJzdXJmYWNlV2lkdGgiLCJzdXJmYWNlSGVpZ2h0IiwibXVzaWMiLCJhZGRlZHBvaW50cyIsInRvZ2dsZUNvb2xkb3duIiwiYm94VG9nZ2xlVGltZXIiLCJjaGVja3BvaW50Q3ljbGVDb3VudCIsInBhdXNlZCIsInBhdXNlVG9nZ2xlQ29vbGRvd24iLCJwYXVzZUdlbmVyYWwiLCJwYXVzZUxheW91dEEiLCJwYXVzZUxheW91dEIiLCJwYXVzZUZsYXZvclgiLCJwYXVzZUZsYXZvclkiLCJjb250cm9sTGF5b3V0QSIsImNvbnRyb2xMYXlvdXRCIiwic3RhcnRJbnB1dCIsIkF1ZGlvIiwidm9sdW1lIiwiZ2FtZUxvb3AiLCJyZXF1ZXN0QW5pbUZyYW1lIiwic291bmRfbmFtZSIsImdhbWVUaW1lIiwibWF4U3RlcCIsIndhbGxMYXN0VGltZXN0YW1wIiwid2FsbEN1cnJlbnQiLCJ3YWxsRGVsdGEiLCJnYW1lRGVsdGEiLCJ0YWJJbmRleCIsImdldFhhbmRZIiwiY2xpZW50WCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFkiLCJ0b3AiLCJtYXAiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ3aGljaCIsInNwYWNlIiwicHJldmVudERlZmF1bHQiLCJjb2RlIiwiZW50aXR5IiwibGF5ZXIiLCJkcmF3Q2FsbGJhY2siLCJjbGVhclJlY3QiLCJkcmF3IiwiZW50aXRpZXNDb3VudCIsInVwZGF0ZSIsImoiLCJkaXN0IiwiaXNDb2xsaWRpbmciLCJjb2xsaWRlZCIsImN1cnJlbnRUaW1lIiwiZWFzeW1vZGUiLCJoYXJkbW9kZSIsImxheW91dEEiLCJsYXlvdXRCIiwicGF1c2UiLCJnZXRQb3MiLCJnb2RUb2dnbGUiLCJ0b2dnbGVCb3hlcyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIkh1ZCIsInNyY19jb29yZGluYXRlcyIsImRlc3RfY29vcmRpbmF0ZXMiLCJoZWFsdGhiYXIiLCJIZWFsdGhCYXIiLCJlbmVyZ3liYXIiLCJFbmVyZ3lCYXIiLCJzY29yZWJvYXJkIiwiU2NvcmVCb2FyZCIsImNvbXBvbmVudHMiLCJncmFkaWVudFN0b3AxIiwiZ3JhZGllbnRTdG9wMiIsImdyYWRpZW50U3RvcDMiLCJkZXN0X2Nvb3JkcyIsImdyYWRpZW50IiwiY3JlYXRlTGluZWFyR3JhZGllbnQiLCJhZGRDb2xvclN0b3AiLCJSZXNvdXJjZUJhciIsInNyY19jb29yZHMiLCJzcmNfZGltcyIsImxhc3R5IiwicGFydHMiLCJwYXJ0IiwiZHJhd1BhcnQiLCJkZXN0X3hfb2Zmc2V0IiwiZGVzdF95X29mZnNldCIsInJlc291cmNlQmFyU2VnbWVudCIsIm1pZGRsZTEiLCJtaWRkbGUyIiwibWlkZGxlMyIsIm1pZGRsZTQiLCJtaWRkbGU1IiwiYm90dG9tIiwiTG9nZ2luZyIsIm1zZyIsInNldHRpbmdzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZWxlbWVudCIsIkxldmVsT25lIiwidGlsZXNoZWV0IiwiYWN0aXZhdGVkQ2hlY2twb2ludHMiLCJQb3J0YWwiLCJ0aWxlU2l6ZSIsInRpbGVNYXAiLCJ0aWxlRGltZW5zaW9ucyIsInNwbGl0IiwiY29uc3RydWN0VGVycmFpbiIsInRpbGUiLCJ0aWxlRGltZW5zaW9uIiwiY2hlY2twb2ludCIsInNlY3Rpb25fMSIsIkxldmVsVHdvIiwibWFwU3RhcnQiLCJzZWN0aW9uXzIiLCJzZWN0aW9uXzMiLCJzZWN0aW9uXzQiLCJoYW5kMSIsInNwaWtlc09yaWdpbiIsInNwaWtlT2Zmc2V0cyIsInNwaWtlczEiLCJzcGlrZXMyIiwic3Bpa2VzMyIsInNwaWtlczQiLCJzcGlrZXM1Iiwic3Bpa2VzNiIsInNwaWtlczciLCJzcGlrZXM4Iiwic3Bpa2VzOSIsInNwaWtlc0JvcmRlciIsIlNvdW5kIiwic291bmRzIiwibl9kdXBzIiwibWFrZV9kdXBsaWNhdGVzIiwibl9kdXAiLCJjdXJyX3NvdW5kIiwic291bmRfbGlzdCIsImNsb25lIiwiY2xvbmVOb2RlIiwiaW5kZXgiLCJlbmRlZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7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LE1BQUwsQ0FBWXpjLEtBQVosRUFBbUIsUUFBbkIsRUFBNkJpZCxLQUE3QixFQUFvQ0MsS0FBekMsRUFBZ0Q7QUFDNUMsYUFBS1QsTUFBTCxDQUFZemMsS0FBWixFQUFtQixRQUFuQixFQUE2QmlkLEtBQUssR0FBQyxDQUFuQyxFQUFzQzdGLFdBQXRDLEdBQW9ELENBQXBEO0FBQ0EsYUFBS3FGLE1BQUwsQ0FBWXpjLEtBQVosRUFBbUIsUUFBbkIsRUFBNkJpZCxLQUFLLEdBQUMsQ0FBbkMsRUFBc0MvSCxNQUF0QyxHQUErQ0EsTUFBL0M7QUFDQSxhQUFLdUgsTUFBTCxDQUFZemMsS0FBWixFQUFtQixRQUFuQixFQUE2QmlkLEtBQUssR0FBQyxDQUFuQyxFQUFzQ2hkLElBQXRDO0FBQ0EsYUFBS3djLE1BQUwsQ0FBWXpjLEtBQVosRUFBbUIsU0FBbkIsS0FBaUMsQ0FBakM7QUFDSCxPQUxELE1BS087QUFDSCxhQUFLeWMsTUFBTCxDQUFZemMsS0FBWixFQUFtQixRQUFuQixFQUE2QmlkLEtBQTdCLEVBQW9DN0YsV0FBcEMsR0FBa0QsQ0FBbEQ7QUFDQSxhQUFLcUYsTUFBTCxDQUFZemMsS0FBWixFQUFtQixRQUFuQixFQUE2QmlkLEtBQTdCLEVBQW9DL0gsTUFBcEMsR0FBNkNBLE1BQTdDO0FBQ0EsYUFBS3VILE1BQUwsQ0FBWXpjLEtBQVosRUFBbUIsUUFBbkIsRUFBNkJpZCxLQUE3QixFQUFvQ2hkLElBQXBDO0FBQ0g7QUFHSjs7Ozs7O0FBR1UsK0RBQUF1YyxLQUFmLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5cblxuLyoqKioqKioqKioqKioqXG5BbmltYXRpb24gY2xhc3NcblxuUHJvcGVydGllczpcbnNwcml0ZVNoZWV0IC0gYW4gSW1hZ2Ugb2JqZWN0IG9mIHRoaXMgYW5pbWF0aW9uJ3Mgc3ByaXRlc2hlZXQuXG5mcmFtZURpbWVuc2lvbnNbd2lkdGgsIGhlaWdodF0gLSBhbiBhcnJheSBvZiBsZW5ndGggMiwgZGVub3RpbmcgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgXG4gICAgb25lIGZyYW1lIGluIHRoZSBzZXJpZXMuXG5yb3cgLSBhbiBpbnRlZ2VyIGRlbm90aW5nIHRoZSByb3cgKGJlZ2lubmluZyB3aXRoIDApIG9mIHRoZSBzcHJpdGVzaGVldCB0byBwbGF5Llxuc2hlZXRXaWR0aCAtIGFuIGludGVnZXIgZGVub3RpbmcgdGhlIG51bWJlciBvZiBmcmFtZXMgaW4gb25lIHJvdy4gSWYgc2hlZXRXaWR0aCBpcyBncmVhdGVyXG4gICAgdGhhbiB0aGlzIEFuaW1hdGlvbidzIGZyYW1lcyBwcm9wZXJ0eSwgaXQgd2lsbCBjb250aW51ZSB0byB0aGUgZmlyc3QgY29sdW1uIG9uIHRoZSBuZXh0IHJvdy5cbmZyYW1lRHVyYXRpb24gLSB0aGUgbnVtYmVyIG9mIGZyYW1lcyBlYWNoIHNwcml0ZSBpbiB0aGUgYW5pbWF0aW9uIHdpbGwgYmUgc2hvd24gZm9yLlxuZnJhbWVzIC0gdGhlIG51bWJlciBvZiBmcmFtZXMgaW4gdGhpcyBhbmltYXRpb24uXG5sb29wIC0gYSBib29sZWFuIGRlbm90aW5nIHdoZXRoZXIgdGhpcyBhbmltYXRpb24gc2hvdWxkIHJlcGxheSBvciBub3QuXG5zY2FsZSAtIGEgdmFsdWUgdG8gbXVsdGlwbHkgdGhlIG9yaWdpbmFsIHNwcml0ZSdzIHNpemUgYnkuXG5jb2x1bW5PZmZzZXQgLSBhZGRlZCB0byB0aGlzLmN1cnJlbnRGcmFtZSB0byBnZXQgc3RhcnRpbmcgcG9pbnQgb2YgYW55IGFuaW1hdGlvbnMgdGhhdCBzdGFydCBwYXJ0d2F5IGludG8gYSBzaGVldC5cbiovXG5jbGFzcyBBbmltYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQsIGZyYW1lRGltZW5zaW9ucywgcm93LCBzaGVldFdpZHRoLCBmcmFtZUR1cmF0aW9uLCBmcmFtZXMsIGxvb3AsIHNjYWxlLCBjb2x1bW5PZmZzZXQ9MCkge1xuXG4gICAgICAgIHRoaXMuc3ByaXRlU2hlZXQgPSBzcHJpdGVTaGVldDtcbiAgICAgICAgdGhpcy5mcmFtZVdpZHRoID0gZnJhbWVEaW1lbnNpb25zWzBdO1xuICAgICAgICB0aGlzLmZyYW1lRHVyYXRpb24gPSBmcmFtZUR1cmF0aW9uO1xuICAgICAgICB0aGlzLmZyYW1lSGVpZ2h0ID0gZnJhbWVEaW1lbnNpb25zWzFdOyAvL2Nhbid0IGFkZCAxIGhlcmUuIE1lc3NlcyB1cCBmcmFtZXMgbG93ZXIgZG93biB0aGUgc3ByaXRlIHNoZWV0XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbHVtbk9mZnNldCA9IGNvbHVtbk9mZnNldDtcbiAgICAgICAgdGhpcy5zaGVldFdpZHRoID0gc2hlZXRXaWR0aDtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gZnJhbWVEdXJhdGlvbiAqIGZyYW1lcztcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XG4gICAgICAgIHRoaXMubG9vcHMgPSAwO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgfVxuXG5cbiAgICBkcmF3RnJhbWUodGljaywgY3R4LCB4LCB5LCBmYWNpbmdSaWdodCkge1xuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRpY2s7XG4gICAgICAgIGlmICh0aGlzLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29wcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmcmFtZSA9IHRoaXMuY3VycmVudEZyYW1lKCk7XG4gICAgICAgIHZhciB4aW5kZXggPSAwO1xuICAgICAgICB2YXIgeWluZGV4ID0gMDtcbiAgICAgICAgbGV0IGRyb3cgPSAodGhpcy5yb3cgKiB0aGlzLmZyYW1lSGVpZ2h0KVxuICAgICAgICB4aW5kZXggPSBmcmFtZSAlIHRoaXMuc2hlZXRXaWR0aDtcbiAgICAgICAgeWluZGV4ID0gTWF0aC5mbG9vcigoZnJhbWUpIC8gdGhpcy5zaGVldFdpZHRoKTtcblxuXG4gICAgICAgIC8vIERyYXcgZmFjaW5nIGxlZnRcbiAgICAgICAgaWYgKCFmYWNpbmdSaWdodCkge1xuXG4gICAgICAgICAgICAvLyBTYXZlIG9yaWdpbmFsIGNvbnRleHRcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgICAgIC8vIFNldCBjb250ZXh0IHRvIGhvcml6b250YWwgY2VudGVyIG9mIGltYWdlIChkb24ndCBjYXJlIGFib3V0IGNoYW5naW5nIHkncyBwb3NpdGlvbilcbiAgICAgICAgXHRjdHgudHJhbnNsYXRlKHggKyAodGhpcy5zY2FsZSAqIHRoaXMuZnJhbWVXaWR0aCkgLyAyLCAwKTtcbiAgICAgICAgICAgICAgICBcblx0XHQgICAgLy8gU2NhbGUgeCBieSAtMSB0byBmbGlwIGhvcml6b250YWxseVxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcblxuICAgICAgICAgICAgLy8gRHJhdyBpbWFnZSBvbiB0aGUgdHJhbnNmb3JtZWQgY29udGV4dFxuICAgICAgICAgICAgLy8gTm90ZTogYWZ0ZXIgdHJhbnNmb3JtaW5nIFswLDBdIGlzIHZpc3VhbGx5IFstd2lkdGgvMiwgMF1cbiAgICAgICAgICAgIC8vIHNvIHRoZSBpbWFnZSBuZWVkcyB0byBiZSBvZmZzZXQgYWNjb3JkaW5nbHkgd2hlbiBkcmF3blxuICAgICAgICBcdGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGVTaGVldCxcbiAgICAgICAgICAgICAgICAgICAgICh4aW5kZXggKiB0aGlzLmZyYW1lV2lkdGgpLCAoeWluZGV4ICogdGhpcy5mcmFtZUhlaWdodCkgKyBkcm93LCAgLy8gc291cmNlIGZyb20gc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVXaWR0aCwgdGhpcy5mcmFtZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgIC0odGhpcy5mcmFtZVdpZHRoICogMikgKyAodGhpcy5mcmFtZVdpZHRoIC8gMilcbiAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5mcmFtZVdpZHRoLCAvLyBPZmZzZXQgZHhcbiAgICAgICAgICAgICAgICAgICAgIHkgLSB0aGlzLnNjYWxlKnRoaXMuZnJhbWVIZWlnaHQgKyB0aGlzLnNjYWxlKjEwLFxuXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGggKiB0aGlzLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZUhlaWdodCAqIHRoaXMuc2NhbGUpO1xuXG4gICAgICAgICAgICAvLyBSZXN0b3JlIG9yaWdpbmFsIGNvbnRleHRcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAvLyBvbWcgaXQncyBmaW5hbGx5IHdvcmtpbmcgOy07XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gRHJhdyBmYWNpbmcgcmlnaHRcbiAgICAgICAgXHRjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlU2hlZXQsXG4gICAgICAgICAgICAgICAgICAgICAoeGluZGV4ICogdGhpcy5mcmFtZVdpZHRoKSwgKHlpbmRleCAqIHRoaXMuZnJhbWVIZWlnaHQpICsgZHJvdywgIC8vIHNvdXJjZSBmcm9tIHNoZWV0XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGgsIHRoaXMuZnJhbWVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICB4IC0gdGhpcy5mcmFtZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgeSAtIHRoaXMuc2NhbGUgKiB0aGlzLmZyYW1lSGVpZ2h0ICsgdGhpcy5zY2FsZSAqIDEwLCBcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVXaWR0aCAqIHRoaXMuc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVpZ2h0ICogdGhpcy5zY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKDUwLCA1MCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGN1cnJlbnRGcmFtZSAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZWxhcHNlZFRpbWUgLyB0aGlzLmZyYW1lRHVyYXRpb24pICsgdGhpcy5jb2x1bW5PZmZzZXQ7XG4gICAgfVxuXG4gICAgaXNEb25lICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmVsYXBzZWRUaW1lID49IHRoaXMudG90YWxUaW1lIC0gMSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmxvb3BzID0gMDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbjsiLCJcbi8qKioqKioqKioqKioqKioqKlxuQXNzZXRNYW5hZ2VyIGNsYXNzXG5cbnN1Y2Nlc3NDb3VudCAtIHRoZSBudW1iZXIgb2Ygc3VjY2Vzc2VzIGZldGNoaW5nIGFzc2V0c1xuZXJyb3JDb3VudCAtIHRoZSBudW1iZXIgb2YgZmFpbHVyZXMgZmV0Y2hpbmcgYXNzZXRzXG5jYWNoZSAtIHRoZSBhc3NldCBjYWNoZVxuZG93bmxvYWRRdWV1ZSAtIHRoZSBxdWV1ZSBvZiBhc3NldHMgdG8gZG93bmxvYWRcbioqKioqKioqKioqKioqKioqL1xuY2xhc3MgQXNzZXRNYW5hZ2VyIHtcblxuICAgIGNvbnN0cnVjdG9yIChkb3dubG9hZFF1ZXVlID0gW10pIHtcbiAgICAgICAgdGhpcy5zdWNjZXNzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmVycm9yQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmNhY2hlID0gW107XG4gICAgICAgIHRoaXMuZG93bmxvYWRRdWV1ZSA9IGRvd25sb2FkUXVldWU7XG4gICAgfVxuXG4gICAgLypcbiAgICBBZGRzIGFuIGFzc2V0IHBhdGggdG8gdGhlIGRvd25sb2FkIHF1ZXVlXG4gICAgKi9cbiAgICBxdWV1ZURvd25sb2FkIChwYXRoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZG93bmxvYWRRdWV1ZS5wdXNoKHBhdGgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgQ2hlY2tzIGlmIGFsbCBhc3NldHMgaGF2ZSBiZWVuIHJlc3BvbmRlZCB0byAoZWl0aGVyIHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAqL1xuICAgIGlzRG9uZSAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kb3dubG9hZFF1ZXVlLmxlbmd0aCA9PSB0aGlzLnN1Y2Nlc3NDb3VudCArIHRoaXMuZXJyb3JDb3VudCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBBdHRlbXB0cyB0byBkb3dubG9hZCBlYWNoIGFzc2V0IGluIHRoZSBxdWV1ZVxuICAgICovXG4gICAgZG93bmxvYWRBbGwgKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLmRvd25sb2FkUXVldWUubGVuZ3RoID09PSAwKSB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRvd25sb2FkUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5kb3dubG9hZFF1ZXVlW2ldO1xuICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImR1bjogXCIgKyB0aGlzLnNyYy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0aGF0LnN1Y2Nlc3NDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGF0LmlzRG9uZSgpKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5lcnJvckNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuaXNEb25lKCkpIHsgY2FsbGJhY2soKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbWcuc3JjID0gcGF0aDtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVbcGF0aF0gPSBpbWc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIEdldHMgYW4gYXNzZXRcbiAgICAqL1xuICAgIGdldEFzc2V0IChwYXRoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cocGF0aC50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbcGF0aF07XG4gICAgfVxuICAgIFxufSAvLyBlbmQgb2YgQXNzZXRNYW5hZ2VyXG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0TWFuYWdlcjtcblxuIiwiaW1wb3J0IHsgQ2FtZXJhLCBFbnRpdHkgfSBmcm9tIFwiLi9lbnRpdGllc1wiXG5cblxuY2xhc3MgTGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGltZywgc3JjX2RpbWVuc2lvbnMsIGNhbWVyYSwgc2Nyb2xsX3NwZWVkLCBoZWlnaHRfZmFjdG9yLCBkZXN0X3ksIHN0cmV0Y2g9ZmFsc2UsIHNjYWxlPTMpIHtcbiAgICAgICAgdGhpcy5pbWcgPSBpbWdcbiAgICAgICAgdGhpcy5zcmNfd2lkdGggPSBzcmNfZGltZW5zaW9uc1swXVxuICAgICAgICB0aGlzLnNyY19oZWlnaHQgPSBzcmNfZGltZW5zaW9uc1sxXVxuICAgICAgICB0aGlzLnNjcm9sbF9zcGVlZCA9IHNjcm9sbF9zcGVlZFxuICAgICAgICB0aGlzLmhlaWdodF9mYWN0b3IgPSBoZWlnaHRfZmFjdG9yXG4gICAgICAgIHRoaXMuc3RyZXRjaCA9IHN0cmV0Y2hcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFcbiAgICAgICAgdGhpcy5jYW1lcmFfZGltZW5zaW9ucyA9IFtjYW1lcmEuY2FudmFzV2lkdGgsIGNhbWVyYS5jYW52YXNIZWlnaHRdXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZVxuICAgICAgICB0aGlzLmRlc3RfeSA9IGRlc3RfeVxuICAgICAgICBcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvLyByZXBlYXQgYXMgbWFueSB0aW1lcyBhcyBuZWNlc3NhcnkgdG8gZmlsbCBjYW1lcmEgc2l6ZVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwIC0gdGhpcy5zcmNfd2lkdGg7IGkgPCB0aGlzLmNhbWVyYV9kaW1lbnNpb25zWzBdICsgdGhpcy5zcmNfd2lkdGg7IGkgKz0gdGhpcy5zcmNfd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZF9oZWlnaHQgPSAodGhpcy5jYW1lcmFfZGltZW5zaW9uc1sxXSAqIHRoaXMuaGVpZ2h0X2ZhY3RvcilcbiAgICAgICAgICAgICAgICBsZXQgZF95ID0gdGhpcy5kZXN0X3kgKiB0aGlzLmhlaWdodF9mYWN0b3JcbiAgICAgICAgICAgICAgICAvLyAwICsgKCh0aGlzLmhlaWdodF9mYWN0b3IpKSAqIHRoaXMuY2FtZXJhX2RpbWVuc2lvbnNbMV1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0cmV0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZF9oZWlnaHQgPSB0aGlzLmNhbWVyYV9kaW1lbnNpb25zWzFdXG4gICAgICAgICAgICAgICAgICAgIC8vIGRfeSA9IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCwgdGhpcy5zcmNfaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAoaSArICgodGhpcy5jYW1lcmEueFZpZXcqIHRoaXMuc2Nyb2xsX3NwZWVkKSAlICh0aGlzLnNyY193aWR0aCkpKSogdGhpcy5zY2FsZSwgXG4gICAgICAgICAgICAgICAgICAgIGRfeSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGggKiB0aGlzLnNjYWxlLCBcbiAgICAgICAgICAgICAgICAgICAgZF9oZWlnaHRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5jbGFzcyBCYWNrZ3JvdW5kIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBhc3NldF9tYW5hZ2VyLCBjdHgsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLmdhbWVfZW5naW5lID0gZ2FtZV9lbmdpbmVcbiAgICAgICAgdGhpcy5hc3NldF9tYW5hZ2VyID0gYXNzZXRfbWFuYWdlclxuICAgICAgICB0aGlzLmN0eCA9IGN0eFxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYVxuICAgICAgICB0aGlzLmxheWVycyA9IFtcbiAgICAgICAgICAgIFwiaW1nL2JnLzFfYmcucG5nXCIsXG4gICAgICAgICAgICBcImltZy9iZy8yX2ZhcmJ1aWxkaW5ncy5wbmdcIixcbiAgICAgICAgICAgIFwiaW1nL2JnLzNfYnVpbGRpbmdzLnBuZ1wiLFxuICAgICAgICAgICAgXCJpbWcvYmcvNF9mb3JlZ3JvdW5kLnBuZ1wiLFxuICAgICAgICAgICAgXCJpbWcvYmcvYm90X2ZpbGwucG5nXCJcbiAgICAgICAgXVxuXG4gICAgICAgIHRoaXMubWFrZV9iYWNrZ3JvdW5kKClcblxuXG4gICAgfVxuXG4gICAgbWFrZV9iYWNrZ3JvdW5kICgpIHtcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy8xX2JnLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjcyLCAxNjBdLCB0aGlzLmNhbWVyYSwgMC4xLCAxLCAwLCB0cnVlKSlcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy8yX2ZhcmJ1aWxkaW5ncy5wbmdcIiksIFxuICAgICAgICAgICAgWzIxMywgMTQyXSwgdGhpcy5jYW1lcmEsIDAuMTUsIDAuMzUsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy8zX2J1aWxkaW5ncy5wbmdcIiksIFxuICAgICAgICAgICAgWzI3MiwgMTUwXSwgdGhpcy5jYW1lcmEsIDAuMiwgMC40LCB0aGlzLmNhbWVyYS5jYW52YXNIZWlnaHQvMikpXG4gICAgICAgIC8vIHRoaXMuZ2FtZV9lbmdpbmUuYWRkQmFja2dyb3VuZExheWVyKG5ldyBMYXllcih0aGlzLmFzc2V0X21hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvYmcvNF9mb3JlZ3JvdW5kLnBuZ1wiKSwgXG4gICAgICAgICAgICAvLyBbMjcyLCAxMDRdLCB0aGlzLmNhbWVyYSwgMC4yNSwgLjUsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy9ib3RfZmlsbC5wbmdcIiksIFxuICAgICAgICAgICAgWzI1MCwgMjUwXSwgdGhpcy5jYW1lcmEsIDEsIDEsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFja2dyb3VuZDsiLCJpbXBvcnQgQXNzZXRNYW5hZ2VyIGZyb20gXCIuL2Fzc2V0LW1hbmFnZXJcIlxuaW1wb3J0IEdhbWVFbmdpbmUgZnJvbSBcIi4vZ2FtZS1lbmdpbmVcIlxuaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9lbnRpdGllcy9nYW1lLWJvYXJkXCJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4vZW50aXRpZXMvY2FtZXJhXCJcbmltcG9ydCBIdWQgZnJvbSBcIi4vaHVkXCJcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gXCIuL2JhY2tncm91bmRcIlxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vZW50aXRpZXMvaGVyb1wiXG5pbXBvcnQgTCBmcm9tIFwiLi9sb2dnaW5nXCJcblxuXG4vKiBBc3NlbWJsZXMgYW5kIHN0YXJ0cyB0aGUgZ2FtZS4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHRvbG9hZCA9IFtcbiAgICAgICAgXCJpbWcvWlhlLnBuZ1wiLFxuICAgICAgICBcImltZy9MZW8ucG5nXCIsXG4gICAgICAgIFwiaW1nL0VuZW15U2hlZXQxLnBuZ1wiLFxuICAgICAgICBcImltZy9waXBlcy5wbmdcIixcbiAgICAgICAgXCJpbWcvRW5lbWllcy5wbmdcIixcbiAgICAgICAgXCJpbWcvaHVkLnBuZ1wiLFxuICAgICAgICBcImltZy9oZWFsdGhwYWNrLnBuZ1wiLFxuICAgICAgICBcImltZy9lbmVyZ3lwYWNrLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy8xX2JnLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy8yX2ZhcmJ1aWxkaW5ncy5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvM19idWlsZGluZ3MucG5nXCIsXG4gICAgICAgIFwiaW1nL2JnLzRfZm9yZWdyb3VuZC5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvYm90X2ZpbGwucG5nXCJcbiAgICBdO1xuXG4gICAgbGV0IEFTU0VUX01BTkFHRVIgPSBuZXcgQXNzZXRNYW5hZ2VyKHRvbG9hZCk7XG5cbiAgICBBU1NFVF9NQU5BR0VSLmRvd25sb2FkQWxsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTC5kZWJ1ZyhcInN0YXJ0aW5nIGFzc2V0IG1hbmFnZXIgZG93bmxvYWRcIilcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lV29ybGQnKTtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBMLmRlYnVnKFwiY2FudmFzIHdpZHRoOiBcIiArIGNhbnZhcy53aWR0aCk7XG4gICAgICAgIEwuZGVidWcoXCJjYW52YXMgaGVpZ2h0OiBcIiArIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGxldCBnYW1lRW5naW5lID0gbmV3IEdhbWVFbmdpbmUoKTtcbiAgICAgICAgLy8gVE9ETzogXG4gICAgICAgIGxldCBjYW1lcmEgPSBuZXcgQ2FtZXJhKGdhbWVFbmdpbmUsIDAsIDAsIG51bGwsIGN0eCA9IGN0eCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAyMDAwLCAyMDAwKTtcbiAgICAgICAgbGV0IGhlcm8gPSBuZXcgSGVybyhnYW1lRW5naW5lLCAwLCAwLCBBU1NFVF9NQU5BR0VSLmdldEFzc2V0KFwiaW1nL1pYZS5wbmdcIiksIGN0eCk7XG4gICAgICAgIGxldCBib2FyZCA9IG5ldyBHYW1lQm9hcmQoZ2FtZUVuZ2luZSwgQVNTRVRfTUFOQUdFUiwgY3R4KTtcbiAgICAgICAgZ2FtZUVuZ2luZS5oZXJvID0gaGVybztcbiAgICAgICAgZ2FtZUVuZ2luZS5nYW1lYm9hcmQgPSBib2FyZDtcbiAgICAgICAgbGV0IGh1ZCA9IG5ldyBIdWQoZ2FtZUVuZ2luZSwgQVNTRVRfTUFOQUdFUi5nZXRBc3NldChcImltZy9odWQucG5nXCIpLCBoZXJvLCBbMCwgMF0sIFswLCAwXSwgWzEwMCwgMTAwXSwgMywgY2FtZXJhKTtcbiAgICAgICAgYm9hcmQuaHVkID0gaHVkO1xuICAgICAgICBib2FyZC5oZXJvID0gaGVybztcbiAgICAgICAgXG4gICAgICAgIC8vICMjIyBtdXNpYyAjIyNcbiAgICAgICAgXG4gICAgICAgIC8vVE9ETzogUGxhY2Vob2xkZXIgbWFnaWMgbnVtYmVycyB1bnRpbCB3ZSBkZWNpZGUgb24gaG93IHRvIGhhbmRsZSB3b3JsZCBib3VuZGFyeSBhbmQgY2FtZXJhXG5cbiAgICAgICAgLyoqTk9URTogSVQgSVMgVkVSWSBJTVBPUlRBTlQgQ0FNRVJBIElTIFRIRSBGSVJTVCBBRERFRCBFTlRJVFkqKi9cblxuICAgICAgICBnYW1lRW5naW5lLmFkZEVudGl0eShjYW1lcmEpO1xuICAgICAgICBnYW1lRW5naW5lLmNhbWVyYSA9IGNhbWVyYTtcblxuICAgICAgICBsZXQgYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKGdhbWVFbmdpbmUsIEFTU0VUX01BTkFHRVIsIGN0eCwgY2FtZXJhKTtcblxuICAgICAgICAvL0xvYWRzIGxldmVsIG5cbiAgICAgICAgYm9hcmQuZ2V0TGV2ZWwoMSk7XG5cbiAgICAgICAgY2FtZXJhLmZvbGxvdyhoZXJvKTtcbiAgICAgICAgZ2FtZUVuZ2luZS5hZGRFbnRpdHkoYm9hcmQpO1xuICAgICAgICAvL2dhbWVFbmdpbmUuYWRkRW50aXR5KGhlcm8pO1xuICAgICAgICAvL2dhbWVFbmdpbmUuYWRkRW50aXR5KGh1ZCk7XG4gICAgICAgIGdhbWVFbmdpbmUuaW5pdChjdHgpO1xuICAgICAgICBnYW1lRW5naW5lLnN0YXJ0KCk7XG4gICAgfSk7XG59IiwiaW1wb3J0IHtFbnRpdHl9IGZyb20gXCIuL1wiXG5cblxuLyoqKioqKioqKioqXG5BY3RvciBpbnRlcmZhY2VcblRoaXMgaW50ZXJmYWNlIGlzIGRlc2lnbmVkIHRvIGVuY29tcGFzcyBhbnkgRW50aXR5IHRoYXQgYWN0cyB1cG9uIHRoZSBnYW1lIGxldmVsLiBUaGlzIGNsYXNzIHNob3VsZCBub3QgYmUgaW5zdGFudGlhdGVkLlxuQW55IGFjdGlvbiBzaGFyZWQgYmV0d2VlbiBhY3RvcnMgaXMgbG9jYXRlZCBoZXJlLlxuXG5nYW1lIC0gYSByZWZlcmVuY2UgdG8gdGhlIGdhbWUgaW4gd2hpY2ggdGhpcyBlbnRpdHkgZXhpc3RzXG54LCB5IC0gZW50aXR5J3MgY29vcmRpbmF0ZXNcbnJlbW92ZUZyb21Xb3JsZCAtIGEgZmxhZyB0aGF0IGRlbm90ZXMgd2hlbiB0byByZW1vdmUgdGhpcyBlbnRpdHkgZnJvbSB0aGUgZ2FtZVxuKioqKioqKioqKioqL1xuY2xhc3MgQWN0b3IgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yIChnYW1lLCB4LCB5LCBpbWc9bnVsbCwgY3R4PW51bGwsIHNjYWxlPW51bGwsIHNwcml0ZVdpZHRoID0gMCwgc3ByaXRlSGVpZ2h0ID0gMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVudGl0eVwiO1xuXG4gICAgICAgIHRoaXMuZmFjaW5nID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICAgICAgLy9BZGRlZCB0aGVzZXMgcG9zdC1ob2MgZm9yIGJldHRlciBmdXR1cmUgZGV2ZWxvcG1lbnQuIChub3QgY3VycmVudGx5IHVzZWQgaW4gYW55ICdzdXBlcicgY29uc3RydWN0aW9uIGNhbGxzKVxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG4gICAgfVxuICAgIFxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUgKCkge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKioqSEVMUEVSIEZVTkNUSU9OUyoqKi9cbiAgICB1cGRhdGVQb3MoeCwgeSkge1xuICAgICAgICB0aGlzLnggKz0geDtcbiAgICAgICAgdGhpcy5ib3VuZFggKz0geDtcbiAgICAgICAgdGhpcy55ICs9IHk7XG4gICAgICAgIHRoaXMuYm91bmRZICs9IHk7XG4gICAgfVxuXG4gICAgc2V0UG9zKGNvb3JkaW5hdGVzID0gWzAsIDBdKSB7XG4gICAgICAgIHRoaXMueCA9IGNvb3JkaW5hdGVzWzBdO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IGNvb3JkaW5hdGVzWzBdO1xuICAgICAgICB0aGlzLnkgPSBjb29yZGluYXRlc1sxXTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSBjb29yZGluYXRlc1sxXTtcbiAgICB9XG59IFxuZXhwb3J0IGRlZmF1bHQgQWN0b3I7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW5lbXksXG4gICAgSHVydGJveCwgICAgXG4gICAgUHJvamVjdGlsZSxcbiAgICBUZXJyYWluXG59IGZyb20gXCIuL1wiXG5cblxuLy9yb3cgOSwgNDB4MzAsIG9mZnNldCAxMSwgNCBmcmFtZXNcbmNsYXNzIEJvbWIgZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoID0gNDAsIHNwcml0ZUhlaWdodCA9IDMwLCBmYWNpbmdSaWdodCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAvKlVuaXF1ZSB0byBCb21iKi94VmVsb2NpdHkgPSA3LCB5VmVsb2NpdHkgPSAtMjApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnhWZWxvY2l0eSA9IHhWZWxvY2l0eTtcblxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogMjA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogMTU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAxNTtcblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMF0gPSA1MDA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMV0gPSA3MDA7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gNTA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgdGhpcy5sYXVuY2h0aW1lID0gMjU7XG4gICAgICAgIHRoaXMuY291bnRkb3duID0gNDtcbiAgICAgICAgdGhpcy5zdGFydHVwID0gMztcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSB5VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSAuMDM7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibGF1bmNoaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcImFjdGl2YXRpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImRldG9uYXRpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImV4cGxvZGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZXhwbG9kZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInJlZmxlY3RlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwibGF1bmNoXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTcsIDUsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDExKSxcbiAgICAgICAgICAgIFwiYWN0aXZhdGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxNywgNywgMiwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTIpLFxuICAgICAgICAgICAgXCJkZXRvbmF0ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDE3LCA2LCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxNCksXG4gICAgICAgICAgICBcImV4cGxvZGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDQsIDE3LCA1LCA3LCBmYWxzZSwgdGhpcy5zY2FsZSArIDMsIDEwKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuZmFjaW5nID0gMTsgfSBlbHNlIHsgdGhpcy5mYWNpbmcgPSAtMTsgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sYXVuY2g7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubGF1bmNoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcyh0aGlzLmZhY2luZyp0aGlzLnhWZWxvY2l0eSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKHRoaXMuZmFjaW5nICogdGhpcy54VmVsb2NpdHksIDApO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gdGhpcy5jb3VudGRvd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kZXRvbmF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZGV0b25hdGluZykge1xuICAgICAgICAgICAgLy9UaGlzIFwiRmFjaW5nIEhlcm9cIiBjaGVjayBtYWtlcyBzdXJlIHRoYXQsIGlmIEhlcm8gY3Jvc3NlcyBheGlzIGJlZm9yZSBleHBsb3Npb24sXG4gICAgICAgICAgICAvL0hlcm8gd2lsbCBiZSBwdXNoZWQgYmFjayBpbiB0aGUgY29ycmVjdCBkaXJlY3Rpb24gb24gc3R1blxuICAgICAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IHRoaXMuc3RhcnR1cCkge1xuICAgICAgICAgICAgICAgIC8vU3Bhd24gZXhwbG9zaW9uIGh1cnRib3hcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRldG9uYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5leHBsb2RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5leHBsb2RpbmcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZXhwbG9kZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDYwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy54IC09IDIgKiB0aGlzLnNwcml0ZVdpZHRoIC0gMzA7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IDMwO1xuICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25YID0gMTUwO1xuICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25ZID0gMTUwO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJleHBsb3Npb25fMVwiKVxuICAgICAgICAgICAgICAgIHZhciBodXJ0Ym94ID0gbmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtMS43NSAqIGV4cGxvc2lvblggKyAxMCwgdGhpcy5zcHJpdGVIZWlnaHQgLSAyMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIGV4cGxvc2lvblgsIGV4cGxvc2lvblksIHRoaXMuc2NhbGUgKyAyLCBNYXRoLm1heCg0LCB0aGlzLmRhbWFnZSksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCAhdGhpcy5zdGF0ZXMucmVmbGVjdGVkLCBcImhlYWx0aFwiLCAxNSk7XG4gICAgICAgICAgICAgICAgaHVydGJveC5wYXJlbnQgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShodXJ0Ym94KTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5leHBsb2RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmV4cGxvZGluZykge1xuICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgKz0gdGhpcy5ncmF2aXR5ICogdGhpcy5ncmF2aXR5O1xuICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCB0aGlzLnlWZWxvY2l0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxhdW5jaGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMubGF1bmNoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZGV0b25hdGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGV0b25hdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmV4cGxvZGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZXhwbG9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICB1cGRhdGVIaXRib3goZldpZHRoLCBmSGVpZ2h0LCBiV2lkdGgsIGJIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJIZWlnaHQ7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAvL1RPRE8gQWRkIGNvbGxpc2lvbiB3aXRoIHRlcnJhaW5cbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nICYmICF0aGlzLnN0YXRlcy5leHBsb2RpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnhWZWxvY2l0eSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnhWZWxvY2l0eSAtPSB0aGlzLmZhY2luZyAqIHRoaXMueFZlbG9jaXR5ICogdGhpcy5mcmljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueFZlbG9jaXR5ICs9IHRoaXMuZmFjaW5nICogdGhpcy54VmVsb2NpdHkgKiB0aGlzLmZyaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5sYXVuY2hpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubGF1bmNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSArIG90aGVyLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodCAtIDEwO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggLSB0aGlzLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5sYXVuY2hpbmcgPSBmYWxzZSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRldG9uYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmV4cGxvZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSAwO1xuICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkh1cnRib3hcIikge1xuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgLy9JZiBoZXJvIGlzIGNsZWF2aW5nLCBkby4uLlxuICAgICAgICAgICAgICAgICAgICAvL0hpdCBib21iIGF3YXlcbiAgICAgICAgICAgICAgICAvL0Vsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sYXVuY2hpbmcgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGV0b25hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmV4cGxvZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb21iOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVuZW15LFxuICAgIFRlcnJhaW4sXG4gICAgSGVybyxcbiAgICBQcm9qZWN0aWxlLFxuICAgIEh1cnRib3gsXG4gICAgQWN0b3Jcbn0gZnJvbSBcIi4vXCJcblxuXG5cbmNsYXNzIEJ1bGxldCBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIHNwcml0ZVdpZHRoID0gNTAsIHNwcml0ZUhlaWdodCA9IDUwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gNztcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7IHRoaXMueCArPSAxMDA7IH0gZWxzZSB7IHRoaXMueCAtPSAxMDAgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gMzA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAzMDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gKHRoaXMuc3ByaXRlSGVpZ2h0KSAtIDc7XG4gICAgICAgIGlmICghZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpIC0gMip0aGlzLnNwcml0ZVdpZHRoOyAvLysxMDAgYWxpZ25zIHdpdGggdGhlIGd1blxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMikgKyAyKnRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSAxNTA7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJidWxsZXRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxOCwgMjAsIDIsIHRydWUsIHRoaXMuc2NhbGUsIDE2KSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYnVsbGV0O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgLy90aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMueCwgdGhpcy55LFxuICAgICAgICAgICAgICAgIC8vICAgIDAsIDAsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCAxMCwgMTAsIHRoaXMuc2NhbGUsIDUwLCB0aGlzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gNykge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmJ1bGxldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlRlcnJhaW5cIiB8fCBvdGhlci5uYW1lID09PSBcIlNwaWtlc1wiIHx8IG90aGVyLm5hbWUgPT09IFwiSGVyb1wiKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkh1cnRib3hcIikge1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgICAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiZGFtYWdlXCIpO1xuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlJlZmxlY3Rib3hcIikge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQ7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBcIlByb2plY3RpbGVcIjtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMTtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gMTUwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJCdWxsZXRcIikge1xuICAgICAgICAgICAgICAgIG90aGVyLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG90aGVyLnBhcmVudENsYXNzID09PSBcIkVuZW15XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGggKyA1O1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJIZWlnaHQ7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0O1xuIiwiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIlxuaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcblxuXG4vKioqKioqKioqKipcbkNhbWVyYSBjbGFzc1xueFZpZXcsIHlWaWV3IC0gcG9zaXRpb24gb2YgY2FtZXJhICh0b3AgbGVmdClcbmNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQgLSBjYW1lcmEgZGltZW5zaW9uc1xud29ybGRXaWR0aCwgd29ybGRIZWlnaHQgLSBkaW1lbnNpb25zIHRoYXQgcmVwcmVzZW50IHRoZSB3b3JsZCdzIGJvdW5kYXJ5XG5cbioqKioqKioqKioqL1xuY2xhc3MgQ2FtZXJhIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4VmlldywgeVZpZXc9MCwgaW1nPW51bGwsIGN0eD1udWxsLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCB3b3JsZFdpZHRoLCB3b3JsZEhlaWdodCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4VmlldywgeVZpZXcsIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IGNhbnZhc1dpZHRoOyAvL3RoaXMgaXMgdGhlIHZpZXdwb3J0LCBOT1QgdGhlIHNhbWUgYXMgY2FudmFzIGluIGNvcmUuanNcbiAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBjYW52YXNIZWlnaHQ7IC8vdGhpcyBpcyB0aGUgdmlld3BvcnQsIE5PVCB0aGUgc2FtZSBhcyBjYW52YXMgaW4gY29yZS5qc1xuICAgICAgICB0aGlzLndvcmxkV2lkdGggPSB3b3JsZFdpZHRoO1xuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XG4gICAgICAgIHRoaXMuYWJzT2ZmWCA9IDI7XG4gICAgICAgIHRoaXMuYWJzT2ZmWSA9IDEuNTtcbiAgICAgICAgdGhpcy5vZmZYID0gdGhpcy5jYW52YXNXaWR0aC90aGlzLmFic09mZlg7XG4gICAgICAgIHRoaXMub2ZmWSA9IHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZICsgMTAwO1xuICAgICAgICB0aGlzLmNhbVNwZWVkWCA9IDg7XG4gICAgICAgIHRoaXMuY2FtU3BlZWRZID0gODtcblxuXG4gICAgICAgIC8vIHBvc3NpYmxlIGF4aXMgdGhlIGNhbWVyYSBjYW4gbW92ZSBpbi4gbm90IGltcGxlbWVudGVkIHlldFxuICAgICAgICB0aGlzLmF4aXMgPSB7XG4gICAgICAgICAgICBcIm5vbmVcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhvcml6b250YWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcInZlcnRpY2FsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJib3RoXCI6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9iamVjdCB0byBiZSBmb2xsb3dlZCAodGhlIEhlcm8pXG4gICAgICAgIHRoaXMuZm9sbG93ZWQgPSBudWxsO1xuICAgIH1cblxuICAgIGZvbGxvdyAob2JqKSB7XG4gICAgICAgIHRoaXMuZm9sbG93ZWQgPSBvYmo7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgLy8gIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7IC8vcmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuICAgICAgICAvLyAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7IC8vIGNsZWFyIHZpZXdwb3J0IGFmdGVyIG1hdHJpeCBpcyByZXNldFxuICAgICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy54VmlldywgdGhpcy55Vmlldyk7XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIGxvZ2ljIGZlZWxzIEhPUlJJQkxZIHdyb25nLCBidXQgaXQgd29ya3MgZm9yIG5vdywgc28geWF5P1xuICAgICAgICBpZiAodGhpcy5mb2xsb3dlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJvdW5kcygpO1xuICAgICAgICAgICAgLy9UT0RPOiBuZWVkIHRvIGZpZ3VyZSBvdXQgd29ybGQgYm91bmRzIGZvciBtaW4gYW5kIG1heCBjbGFtcGluZ1xuICAgICAgICAgICAgdGhpcy54VmlldyA9IC10aGlzLmZvbGxvd2VkLnggKyB0aGlzLm9mZlg7XG4gICAgICAgICAgICB0aGlzLnlWaWV3ID0gLXRoaXMuZm9sbG93ZWQueSArIHRoaXMub2ZmWTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJ4VmlldzogXCIgKyB0aGlzLnhWaWV3KTtcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJ5VmlldzogXCIgKyB0aGlzLnlWaWV3KTtcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJoZXJvIHg6IFwiICsgdGhpcy5mb2xsb3dlZC54KTtcbiAgICAgICAgIC8vY29uc29sZS5sb2coXCJoZXJvIHk6IFwiICsgdGhpcy5mb2xsb3dlZC55KTtcblxuICAgIH1cblxuICAgIHVwZGF0ZUJvdW5kcygpIHtcbiAgICAgICAgaWYgKCEodGhpcy5vZmZYID09PSB0aGlzLmNhbnZhc1dpZHRoIC8gdGhpcy5hYnNPZmZYKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub2ZmWCArIDEwIDwgTWF0aC5mbG9vcih0aGlzLmNhbnZhc1dpZHRoIC8gdGhpcy5hYnNPZmZYKSkgeyB0aGlzLm9mZlggKz0gdGhpcy5jYW1TcGVlZFg7IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub2ZmWCAtIDEwID4gTWF0aC5mbG9vcih0aGlzLmNhbnZhc1dpZHRoIC8gdGhpcy5hYnNPZmZYKSkgeyB0aGlzLm9mZlggLT0gdGhpcy5jYW1TcGVlZFg7IH1cbiAgICAgICAgICAgIGVsc2UgKHRoaXMub2ZmWCA9IHRoaXMuY2FudmFzV2lkdGggLyB0aGlzLmFic09mZlgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKHRoaXMub2ZmWSA9PT0gdGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZZICsgMTAgPCBNYXRoLmZsb29yKHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZKSkgeyB0aGlzLm9mZlkgKz0gdGhpcy5jYW1TcGVlZFk7IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub2ZmWSAtIDEwID4gTWF0aC5mbG9vcih0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSkpIHsgdGhpcy5vZmZZIC09IHRoaXMuY2FtU3BlZWRZOyB9XG4gICAgICAgICAgICBlbHNlICh0aGlzLm9mZlkgPSB0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib3VuZHNDaGVjayh2YWwsIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWwsIG1pbiksIG1heCk7XG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgRW5lbXksXG4gICAgSGVybyxcbiAgICBIdXJ0Ym94LFxuICAgIEl0ZW0sXG4gICAgUHJvamVjdGlsZSxcbiAgICBUZXJyYWluXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgQ3JvdyBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNDAsXG4gICAgICAgICAgICAgICAgICAgIC8qVW5pcXVlIHRvIENyb3cqL3NpZ2h0UmFkaXVzID0gWzcwMCwgNTAwXSwgbXVyZGVyTGVhZGVyID0gZmFsc2UsIG11cmRlckRyb29ncyA9IFtbMCwgMF0sIFswLCAwXV0pIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogMjA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogMTU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLm11cmRlckxlYWRlciA9IG11cmRlckxlYWRlcjtcbiAgICAgICAgdGhpcy5wb2ludFZhbHVlID0gMTA7XG4gICAgICAgIHRoaXMueFNwZWVkID0gNDtcbiAgICAgICAgdGhpcy55U3BlZWQgPSA4O1xuICAgICAgICB0aGlzLm1heFggPSA1O1xuICAgICAgICB0aGlzLm1heFkgPSA5O1xuICAgICAgICB0aGlzLnhBY2NlbCA9IC4zNTtcbiAgICAgICAgdGhpcy55QWNjZWwgPSAuNDtcblxuICAgICAgICB0aGlzLmF0dGFja0FuZ2xlMSA9IDI7XG4gICAgICAgIHRoaXMuYXR0YWNrQW5nbGUyID0gMTA7XG4gICAgICAgIHRoaXMueEF0dGFjayA9IDE3XG4gICAgICAgIHRoaXMueFJlY292ZXIgPSA3O1xuICAgICAgICB0aGlzLnlSZWNvdmVyID0gNDtcbiAgICAgICAgdGhpcy5yZWNvdmVyRGlzdGFuY2UgPSA0MDA7XG4gICAgICAgIHRoaXMueFJlY292ZXJEaXN0YW5jZTtcbiAgICAgICAgdGhpcy55UmVjb3ZlckRpc3RhbmNlO1xuICAgICAgICBpZiAodGhpcy5tdXJkZXJMZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvb2dPbmUgPSBtdXJkZXJEcm9vZ3NbMF07XG4gICAgICAgICAgICB0aGlzLmRyb29nVHdvID0gbXVyZGVyRHJvb2dzWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1swXSA9IHNpZ2h0UmFkaXVzWzBdO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzFdID0gc2lnaHRSYWRpdXNbMV07XG4gICAgICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XG4gICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgdGhpcy5yYW5kID0gMDtcblxuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmx5aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhdHRhY2tpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImF0dGFja2luZ19maW5hbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVjb3ZlcmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaHVydFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaWRsaW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZseVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDgsIDExLCA1LCA1LCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiYXR0YWNrXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOCwgMTEsIDYsIDMsIGZhbHNlLCB0aGlzLnNjYWxlLCA1KSxcbiAgICAgICAgICAgIFwiYXR0YWNrX2ZpbmFsXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOCwgMTEsIDYsIDIsIHRydWUsIHRoaXMuc2NhbGUsIDgpLFxuICAgICAgICAgICAgXCJodXJ0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOCwgMTEsIDUsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEwKSxcbiAgICAgICAgICAgIC8vVE9ETzogQWRkIFwic21va2Vib21iXCIgZWZmZWN0IGZvciBhY3RpdmF0aW9uXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZseTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyAmJiAhdGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMF1cbiAgICAgICAgICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPD0gdGhpcy5zaWdodFJhZGl1c1sxXSkge1xuICAgICAgICAgICAgICAgIC8vZGlzYWJsZSBzdGF0ZXNcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvL2VuYWJsZSBzdGF0ZXNcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mbHlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11cmRlckxlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHJvb2cxID0gbmV3IENyb3codGhpcy5nYW1lLCB0aGlzLnggKyB0aGlzLmRyb29nT25lWzBdLCB0aGlzLnkgKyB0aGlzLmRyb29nT25lWzFdLCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCBbMjAwMCwgMjAwMF0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHJvb2cyID0gbmV3IENyb3codGhpcy5nYW1lLCB0aGlzLnggKyB0aGlzLmRyb29nVHdvWzBdLCB0aGlzLnkgKyB0aGlzLmRyb29nVHdvWzFdLCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCBbMjAwMCwgMjAwMF0pO1xuICAgICAgICAgICAgICAgICAgICBkcm9vZzEubGV2ZWwgPSB0aGlzLmxldmVsO1xuICAgICAgICAgICAgICAgICAgICBkcm9vZzEuc2VjdGlvbiA9IHRoaXMuc2VjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZHJvb2cyLmxldmVsID0gdGhpcy5sZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgZHJvb2cyLnNlY3Rpb24gPSB0aGlzLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkoZHJvb2cxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShkcm9vZzIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmx5aW5nKSB7IC8vdGhpcy51cGRhdGVIaXRib3goNTAsIDQwLCAyMCwgMTUpO1xuICAgICAgICAgICAgLy9BcHBseSBzcGVlZCB1cGRhdGVzIGFuZCBjaGFzZSBIZXJvL3N0YXkgaW4gYXR0YWNrIHJhbmdlXG4gICAgICAgICAgICBpZiAoKHRoaXMueFNwZWVkIDwgdGhpcy5tYXhYICYmIHRoaXMuZmFjaW5nID09PSAxKSB8fCAodGhpcy54U3BlZWQgPiAtdGhpcy5tYXhYICYmIHRoaXMuZmFjaW5nID09PSAtMSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmZhY2luZyAqIHRoaXMueEFjY2VsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkgPj0gLTEyNSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTcGVlZCA+IC10aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgLT0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkgPD0gLTIwMCl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVNwZWVkIDwgdGhpcy5tYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNwZWVkICs9IHRoaXMueUFjY2VsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1N0YXkgd2l0aGluIENyb3cncyBhdHRhY2sgcmFkaXVzXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPj0gNTAwICYmIHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IDI1MCAmJiB0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBiZWxvdyBoZXJvO1xuICAgICAgICAgICAgLy9pZiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA8PSAxMDApIHtcbiAgICAgICAgICAgIC8vICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvLy8vIGFib3ZlIGhlcm9cbiAgICAgICAgICAgIC8vZWxzZSBpZiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA+PSAyMDApIHtcbiAgICAgICAgICAgIC8vICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIC8vQVRUQUNLISEhXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gNzAwXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkgPCAtMTAwICYmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA+IC0yMDBcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hbmltYXRpb24ubG9vcHMgPiAxICYmIE1hdGgucmFuZG9tKCkgKiAxMDAgPD0gMTApIHsgXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zb3VuZC5wbGF5KFwiY3Jvd19jYXdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmF0dGFja2luZykge1xuICAgICAgICAgICAgaWYgKHRoaXMucmFuZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vdGhpcy55IC09IHRoaXMuYXR0YWNrQW5nbGUxO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5ib3VuZFkgLT0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoLXRoaXMuZmFjaW5nICogdGhpcy54QXR0YWNrLzIsIC10aGlzLmF0dGFja0FuZ2xlMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMueSAtPSB0aGlzLmF0dGFja0FuZ2xlMjtcbiAgICAgICAgICAgICAgICAvL3RoaXMuYm91bmRZIC09IHRoaXMuYXR0YWNrQW5nbGUyO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKC10aGlzLmZhY2luZyAqIHRoaXMueEF0dGFjay8yLCAtdGhpcy5hdHRhY2tBbmdsZTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90aGlzLnggLT0gdGhpcy5mYWNpbmcqNztcbiAgICAgICAgICAgIC8vdGhpcy5ib3VuZFggLT0gdGhpcy5mYWNpbmcqNzsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vcmFuZG9tbHkgZGV0ZXJtaW5lIGFuZ2xlIG9mIGF0dGFjayAobWFrZXMgcHJlZGljdGlvbiBoYXJkZXIpXG4gICAgICAgICAgICAgICAgLy9taW4gYXR0YWNrIGFuZ2xlIG9mIDJcbiAgICAgICAgICAgICAgICAvL3RoaXMuYXR0YWNrQW5nbGUgPSAyICsgTWF0aC5yYW5kb20oKSAqIDg7IFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZ19maW5hbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmF0dGFja2luZ19maW5hbCkge1xuICAgICAgICAgICAgaWYodGhpcy5yYW5kID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMuYXR0YWNrQW5nbGUxO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMuYXR0YWNrQW5nbGUxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMuYXR0YWNrQW5nbGUyO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMuYXR0YWNrQW5nbGUyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZmFjaW5nICogdGhpcy54QXR0YWNrO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhBdHRhY2s7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwieTogXCIgKyB0aGlzLnkpO1xuXG5cbiAgICAgICAgICAgIC8vU3Bhd24gSHVydGJveFxuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLngsIHRoaXMueSwgLTQ1LCAxMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDQwLCA0MCwgdGhpcy5zY2FsZSwgMSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMueCwgdGhpcy55LCAtNDUgLSB0aGlzLnNwcml0ZVdpZHRoIC0gMzAsIDEwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNDAsIDQwLCB0aGlzLnNjYWxlLCAxLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuXG4gICAgICAgICAgICAvL3N0YXRlIGZpbmlzaGVkXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlY292ZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7IC8vYWZ0ZXIgYXR0YWNrIGlzIGZpbmlzaGVkXG4gICAgICAgICAgICAvL2ZseSBhd2F5XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhSZWNvdmVyO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhSZWNvdmVyO1xuICAgICAgICAgICAgdGhpcy55IC09IHRoaXMueVJlY292ZXI7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWSAtPSB0aGlzLnlSZWNvdmVyO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpID49IHRoaXMucmVjb3ZlckRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmh1cnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7IC8vIERFQVRIIFJBVFRMRVxuICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IE1hdGgucmFuZG9tKCkgKiA1O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gTWF0aC5yYW5kb20oKSAqIDVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gTWF0aC5yYW5kb20oKSAqIDU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnJhbmRvbSgpICogNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiA4KSB7XG4gICAgICAgICAgICAgICAgLy9yZXNldCBhbmltYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgLy9kaXNhYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmh1cnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvL2VuYWJsZSBzdGF0ZXNcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mbHlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0O1xuICAgICAgICAgICAgICAgIC8vdXBkYXRlIGhpdGJveFxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA0MCwgMjAsIDE1KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpICogMTAwIDw9IDI3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBJdGVtLkhlYWx0aFBhY2sodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5nYW1lLmdhbWVib2FyZC5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvaGVhbHRocGFjay5wbmdcIiksIHRoaXMuY3R4LCAxMCwgOCwgMywgNSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSXRlbS5FbmVyZ3lQYWNrKHRoaXMuZ2FtZSwgdGhpcy54ICsgMzAsIHRoaXMueSwgdGhpcy5nYW1lLmdhbWVib2FyZC5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvZW5lcmd5cGFjay5wbmdcIiksIHRoaXMuY3R4LCAxMCwgOCwgMywgNSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZseWluZyB8fCB0aGlzLnN0YXRlcy5pZGxpbmcgfHwgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmx5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmF0dGFjaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hdHRhY2tfZmluYWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmh1cnQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmh1cnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB1cGRhdGVIaXRib3goZldpZHRoLCBmSGVpZ2h0LCBiV2lkdGgsIGJIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJIZWlnaHQ7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgLy9udWxsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlByb2plY3RpbGVcIiAmJiAhdGhpcy5zdGF0ZXMuaHVydCAmJiAhdGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5mbHlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nX2ZpbmFsID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmh1cnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJIdXJ0Ym94XCIgJiYgIXRoaXMuc3RhdGVzLmh1cnQgJiYgIXRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZseWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZ19maW5hbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmh1cnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcm93OyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVuZW15LFxuICAgIFRlcnJhaW4sXG4gICAgUHJvamVjdGlsZSxcbiAgICBSb2NrZXQsXG4gICAgSHVydGJveCxcbn0gZnJvbSBcIi4vXCJcblxuXG5jbGFzcyBEaW5vIGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDkwLCBzcHJpdGVIZWlnaHQgPSA2MCwgcGF0cm9sRGlzdGFuY2UgPSAwLCBzaG90VGltZU9mZnNldCA9IDApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAyO1xuICAgICAgICB0aGlzLmhlcm8gPSB0aGlzLmdhbWUuaGVybztcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDM1O1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDM1O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgKHRoaXMuc3ByaXRlSGVpZ2h0IC8gMik7XG4gICAgICAgIHRoaXMuZmFjaW5nID0gMTtcblxuICAgICAgICB0aGlzLnN0YXJ0WCA9IHg7XG4gICAgICAgIHRoaXMubWF4WCA9IHRoaXMuc3RhcnRYICsgcGF0cm9sRGlzdGFuY2U7IC8vQ2hhbmdlIHRoaXMgdG8gYWx0ZXIgZGlubydzIHBhdHJvbCBkaXN0YW5jZVxuICAgICAgICBcbiAgICAgICAgLy9UaW1lcnNcbiAgICAgICAgdGhpcy5zaG90Q29vbGRvd24gPSAyNTA7XG4gICAgICAgIHRoaXMuc2hvdENvb2xkb3duVGltZXIgPSBzaG90VGltZU9mZnNldDtcbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLnBvaW50VmFsdWUgPSAxNVxuICAgICAgICB0aGlzLmhlYWx0aCA9IDIwMDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMF0gPSAxNTAwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzFdID0gMTAwMDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImlkbGluZ1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJzaG9vdGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwid2Fsa2luZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZ3JvdW5kZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInBhdHJvbGxpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZyYW1lbG9ja2VkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImlkbGVcIjogICAgICAgICAgICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA2MF0sIDYsIDEzLCA1LCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMiksXG4gICAgICAgICAgICBcIndhbGtfc3RyYWlnaHRcIjogICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA2MF0sIDYsIDEzLCA5LCA2LCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIC8vXCJ3YWxrX2Rvd25cIjogICAgICAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA2LCAxMywgNywgNiwgdHJ1ZSwgdGhpcy5zY2FsZSwgNiksXG4gICAgICAgICAgICAvL1wid2Fsa191cFwiOiAgICAgICAgICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDcwXSwgNiwgMTgsIDcsIDYsIHRydWUsIHRoaXMuc2NhbGUpLC8vOTB4NzBcbiAgICAgICAgICAgIC8vXCJzaG9vdF91cFwiOiAgICAgICAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNzBdLCA2LCAxOCwgNywgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDYpLC8vOTB4NzBcbiAgICAgICAgICAgIFwic2hvb3RfZGlhZ29uYWxcIjogICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDcwXSwgNiwgMTgsIDcsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxMCksLy85MHg3MFxuICAgICAgICAgICAgLy9cInNob290X3N0cmFpZ2h0XCI6ICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA3MF0sIDYsIDE4LCA3LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTQpLC8vOTB4NzAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBpZiAocGF0cm9sRGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5wYXRyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLyoqKipCRUdJTiBCRUhBVklPUioqKiovXG4gICAgICAgIC8vVHVybiB0b3dhcmRzIEhlcm9cbiAgICAgICAgLy8gaWYgKCF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAmJiAhdGhpcy5zdGF0ZXMucGF0cm9sbGluZykge1xuICAgICAgICAvLyAgICAgdGhpcy5zdGF0ZXMucGF0cm9sbGluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5wYXRyb2xsaW5nICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZykge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMud2Fsa2luZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy54IDw9IHRoaXMuc3RhcnRYKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnggPj0gdGhpcy5tYXhYKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLndhbGtpbmcpIHtcblxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZmFjaW5nICogdGhpcy5tb3ZlbWVudFNwZWVkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zaG90Q29vbGRvd25UaW1lciA8PSAwICYmIHRoaXMueVZlbG9jaXR5ID09PSAwXG4gICAgICAgICAgICAgICAgJiYgKE1hdGguYWJzKHRoaXMubWF4WCAtIHRoaXMueCkgPD0gNSB8fCBNYXRoLmFicyh0aGlzLnN0YXJ0WCAtIHRoaXMueCkgPD0gNSlcbiAgICAgICAgICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gdGhpcy5zaWdodFJhZGl1c1swXSAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzFdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy53YWxraW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdENvb2xkb3duVGltZXIgPD0gMCAmJiB0aGlzLnlWZWxvY2l0eSA9PT0gMCAmJiBNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzBdICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nKSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBSb2NrZXQodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiZW5lcmd5X2xhdW5jaGVyXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gZmFsc2U7ICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdENvb2xkb3duVGltZXIgPSB0aGlzLnNob3RDb29sZG93bjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGF0cm9sbGluZylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMud2Fsa2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL1RpbWVyc1xuICAgICAgICBpZiAodGhpcy5zaG90Q29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdENvb2xkb3duVGltZXIgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQXBwbHkgR3Jhdml0eVxuICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy55KTtcbiAgICAgICAgLy9IZWFsdGggY2hlY2tzXG4gICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg5MCwgNjAsIDI1LCA0NSlcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLndhbGtpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDkwLCA2MCwgMjUsIDQ1KVxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMud2Fsa19zdHJhaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDkwLCA3MCwgMjUsIDQ1KVxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2hvb3RfZGlhZ29uYWw7ICAgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7IC8vZml4IG1hZ2ljIG51bWJlciAoZHJhd24gc2xpZ2h0bHkgYmVsb3cgaGl0Ym94IHdpdGhvdXQgdGhlIDIwIG9mZnNldClcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSArIG90aGVyLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYICsgODc7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWCAtIDg3O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiaXNFbmVteVwiKTtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgICAgICAvLyBibG9ja2luZyBmcm9tIGxlZnQgJiByaWdodFxuICAgICAgICAgICAgaWYgKCFvdGhlci5pc0VuZW15KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICB1cGRhdGVIaXRib3goZldpZHRoLCBmSGVpZ2h0LCBiV2lkdGgsIGJIZWlnaHQsIG9mZlggPSAwLCBvZmZZID0gMCkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyICsgb2ZmWDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgb2ZmWTtcbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERpbm87IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7QWN0b3J9IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgRW5lbXkgZXh0ZW5kcyBBY3RvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJBY3RvclwiO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZVR5cGUgPSBcImhlYWx0aFwiO1xuICAgICAgICB0aGlzLnBvaW50VmFsdWUgPSAwOy8vRGVmaW5lIHRoaXMgZXhwbGljaXRseSBmb3IgcmVsZXZhbnQgZW5lbWllc1xuICAgICAgICAvL1RPRE8gKGZ1dHVyZSBkZXZlbG9wbWVudCkgbWFrZSBzaWdodCByYWRpdXMgYSBwYXJ0IG9mIEVuZW15IGRlZmluaXRpb24gZm9yIHVzZSBpbiBzdXBlciBjb25zdHJ1Y3RvcnNcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1cyA9IFs5MDAsIDMwMF0gLy8geCwgeSBkaXN0YW5jZSBmcm9tIGN1cnJlbnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW5lbXk7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcblxuLyoqKioqKioqKioqXG5FbnRpdHkgY2xhc3NcblxuZ2FtZSAtIGEgcmVmZXJlbmNlIHRvIHRoZSBnYW1lIGluIHdoaWNoIHRoaXMgZW50aXR5IGV4aXN0c1xueCwgeSAtIGVudGl0eSdzIGNvb3JkaW5hdGVzXG5yZW1vdmVGcm9tV29ybGQgLSBhIGZsYWcgdGhhdCBkZW5vdGVzIHdoZW4gdG8gcmVtb3ZlIHRoaXMgZW50aXR5IGZyb20gdGhlIGdhbWVcbioqKioqKioqKioqKi9cbmNsYXNzIEVudGl0eSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgeCwgeSwgaW1nPW51bGwsIGN0eD1udWxsKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBudWxsO1xuICAgICAgICB0aGlzLnR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmdyYXZpdHkgPSAuOTtcbiAgICAgICAgdGhpcy5pbWcgPSBpbWc7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuXG4gICAgICAgIC8vIHVzZWQgZm9yIHNpbXBsZSByZWN0IGhpdGJveFxuICAgICAgICB0aGlzLmJvdW5kWCA9IG51bGw7XG4gICAgICAgIHRoaXMuYm91bmRZID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gVE9ETywgaW1wbGVtZW50IGEgbGlzdCBvZiBib3VuZGluZyBzaGFwZXMsIGl0ZXJhdGUgdGhyb3VnaCBkZXBlbmRpbmcgb24gdHlwZSAoY2lyY2xlIG9yIHJlY3QpIFxuICAgIHJlY3RhbmdsZSgpIHtcblxuICAgIH1cbiAgICBjaXJjbGUoKSB7XG5cbiAgICB9XG5cbiAgICAvKiBEcmF3cyB0aGUgb3V0bGluZSBvZiB0aGlzIGVudGl0eSAqL1xuICAgIGRyYXdPdXRsaW5lIChjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIFVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcFxuICAgIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvP1xuICAgICovXG4gICAgdXBkYXRlICgpIHsgfVxuXG4gICAgLyogRHJhd3MgdGhpcyBlbnRpdHkuIENhbGxlZCBldmVyeSBjeWNsZSBvZiB0aGUgZ2FtZSBlbmdpbmUuICovXG4gICAgZHJhdyAoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuc2hvd091dGxpbmVzICYmIHRoaXMuYm91bmRYKSB7XG4gICAgICAgICAgICBkcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmltZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKHRoaXMuY2xvY2tUaWNrLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgQ29sbGlzaW9uIGRldGVjdGlvbiwgcmVjdGFuZ2xlXG4gICAgKi9cbiAgICBpc0NvbGxpZGluZyhvdGhlcikge1xuICAgICAgICBsZXQgcmVjdDEgPSB7XG4gICAgICAgICAgICBcInhcIiA6IHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgXCJ5XCIgOiB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIFwibGFzdFlcIiA6IHRoaXMubGFzdEJvdW5kWSxcbiAgICAgICAgICAgIFwid2lkdGhcIiA6IHRoaXMuYm91bmRXaWR0aCxcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMuYm91bmRIZWlnaHRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWN0MiA9IHtcbiAgICAgICAgICAgIFwieFwiIDogb3RoZXIuYm91bmRYLFxuICAgICAgICAgICAgXCJ5XCIgOiBvdGhlci5ib3VuZFksXG4gICAgICAgICAgICBcIndpZHRoXCIgOiBvdGhlci5ib3VuZFdpZHRoLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogb3RoZXIuYm91bmRIZWlnaHRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWN0MS53aWR0aCA9PT0gMCB8fCByZWN0MS5oZWlnaHQgPT09IDAgfHwgcmVjdDIud2lkdGggPT09IDAgfHwgcmVjdDIuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ25vbmUnXG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgc2FtZSBhcyBNYXJpb3R0J3MgbWV0aG9kLCBqdXN0IGZvcm1hdHRlZCBkaWZmZXJlbnRseVxuICAgICAgICBsZXQgY29sbGlzaW9uID0gJ25vbmUnO1xuICAgICAgICB2YXIgZHggPSAocmVjdDEueCArIHJlY3QxLndpZHRoLzIpIC0gKHJlY3QyLnggKyByZWN0Mi53aWR0aC8yKTtcbiAgICAgICAgdmFyIGR5ID0gKHJlY3QxLnkgKyByZWN0MS5oZWlnaHQvMikgLSAocmVjdDIueSArIHJlY3QyLmhlaWdodC8yKTtcbiAgICAgICAgdmFyIGxhc3RkeSA9IChyZWN0MS5sYXN0WSArIHJlY3QxLmhlaWdodC8yKSAtIChyZWN0Mi55ICsgcmVjdDIuaGVpZ2h0LzIpO1xuICAgICAgICB2YXIgd2lkdGggPSAocmVjdDEud2lkdGggKyByZWN0Mi53aWR0aCkgLyAyO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gKHJlY3QxLmhlaWdodCArIHJlY3QyLmhlaWdodCkgLyAyO1xuICAgICAgICB2YXIgY3Jvc3NXaWR0aCA9IHdpZHRoICogZHk7XG4gICAgICAgIHZhciBsYXN0Q3Jvc3NXaWR0aCA9IHdpZHRoICogbGFzdGR5O1xuICAgICAgICB2YXIgY3Jvc3NIZWlnaHQgPSBoZWlnaHQgKiBkeDtcbiAgICAgICAgXG4gICAgICAgIC8vIEZpcnN0IGNoZWNrIGlmIHJlY3QxIGFuZCByZWN0MiBhcmUgY2xvc2UgZW5vdWdoIHRvIGV2ZW4gY29sbGlkZS4gVGhlbiBjaGVjayB0aGUgaW50ZXJzZWN0aW9uIGRlcHRocyB0byBkZXRlcm1pbmUgd2hpY2ggc2lkZSB3YXMgbW9zdCBpbnZvbHZlZCBpbiB0aGUgY29sbGlzaW9uLlxuICAgICAgICBpZihNYXRoLmFicyhkeCkgPD0gd2lkdGggJiYgTWF0aC5hYnMoZHkpIDw9IGhlaWdodCkge1xuXG4gICAgICAgICAgICAvL1RPRE8gc3RvcmUgbGFzdCBib3R0b20gb2YgcmVjdDEsIGNvbXBhcmUgdG8gYm91bmQgb2YgcmVjdDIsIGRldGVybWluZSBpZiBpIHNob3VsZCBmYWxsIG9yIG5vdFxuICAgICAgICAgICAgaWYgKGNyb3NzV2lkdGggPiBjcm9zc0hlaWdodCAmJiBsYXN0Q3Jvc3NXaWR0aCA+IGNyb3NzSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgKGNyb3NzV2lkdGggPCAtKGNyb3NzSGVpZ2h0KSkgJiYgbGFzdENyb3NzV2lkdGggPCAtKGNyb3NzSGVpZ2h0KSA/IGNvbGxpc2lvbiA9ICdyaWdodCcgOiBjb2xsaXNpb24gPSAndG9wJztcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjcm9zc1dpZHRoID4gKC1jcm9zc0hlaWdodCkgJiYgbGFzdENyb3NzV2lkdGggPiAoLWNyb3NzSGVpZ2h0KSA/IGNvbGxpc2lvbiA9ICdsZWZ0JyA6IGNvbGxpc2lvbiA9ICdib3R0b20nO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVjdDEgY3VyOiBcIiArIHJlY3QxLnkpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVjdDEgbGFzdDogXCIgKyByZWN0MS5sYXN0WSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MjogXCIgKyByZWN0Mi55KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgcmV0dXJuIGNvbGxpc2lvbjtcblxuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICB9XG59IC8vIGVuZCBvZiBFbnRpdHkgY2xhc3NcblxuZXhwb3J0IGRlZmF1bHQgRW50aXR5IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7QWN0b3J9IGZyb20gXCIuL1wiXG5cbmNsYXNzIEZsYW1lcyBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSAyMCwgc3ByaXRlSGVpZ2h0ID0gNDApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAxO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7IFwiYWN0aXZlXCI6IGZhbHNlLCBcImZhY2luZ1JpZ2h0XCI6IGZhbHNlLCB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7IFwiZGVtb1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA4LCA5LCAxMCwgOSwgdHJ1ZSwgdGhpcy5zY2FsZSkgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGVtbztcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vVE9ET1xuICAgICAgICBpZiAodGhpcy5pc0RvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5vcmlnWDtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMub3JpZ1k7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEZsYW1lcztcblxuICAgIiwiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIlxuaW1wb3J0IHtMZXZlbE9uZSwgTGV2ZWxUd299IGZyb20gXCIuLi9tYXBzL2xldmVsc1wiXG5cblxuLyoqKioqKioqKioqKioqXG5HYW1lQm9hcmQgY2xhc3NcbioqKioqKioqKioqKioqL1xuY2xhc3MgR2FtZUJvYXJkIGV4dGVuZHMgRW50aXR5IHtcblxuICAgIC8vIHNvIHRoaXMgcHJvdG90eXBlLmNhbGwoKSBpcyBjYWxsaW5nIHRoZSBFbnRpdHkgY29uc3RydWN0b3Igd2l0aCAoZ2FtZT1udWxsLCB4PTAsIHk9MClcbiAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgYXNzZXRNYW5hZ2VyLCBjdHgsIGhlcm8sIGh1ZCkge1xuICAgICAgICBzdXBlcihnYW1lLCAwLCAwLCBudWxsLCBjdHgpO1xuICAgICAgICB0aGlzLnRlc3RQb3MgPSBbMTE1NzAsIDMwMF07IC8vREJHL0RldiBUb29sXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyID0gYXNzZXRNYW5hZ2VyO1xuICAgICAgICAvL3VzZWQgZm9yIHJlY2FsbGluZyBhIHNlY3Rpb24ncyBub24tdGVycmFpbiwgbm9uLWhhemFyZCBhY3RvcnMgb24gZGVhdGhcbiAgICAgICAgdGhpcy5sZXZlbE51bTtcbiAgICAgICAgdGhpcy5zZWN0aW9uTnVtO1xuICAgICAgICAvL3BvaW50IHZhbHVlIHRpbWVyXG4gICAgICAgIHRoaXMucHZ0ID0gMDtcbiAgICAgICAgdGhpcy5wdnR0ID0gMjA7XG4gICAgICAgIHRoaXMubG9zdFNjb3JlID0gMDtcblxuICAgICAgICB0aGlzLmRlYWRFbmVtaWVzID0gW1tbMCwwXSwgMCwgMF1dO1xuXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnRpbWU7XG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgICAgIHRoaXMuaHVkID0gaHVkO1xuICAgICAgICB0aGlzLmxldmVsO1xuICAgICAgICB0aGlzLmNoZWNrTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdENoZWNrcG9pbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwibmV3Qm9hcmRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibG9hZGluZ0xldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsb2FkZWRMZXZlbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicG9wdWxhdGVMZXZlbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVzcGF3bkxldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsb2FkaW5nU2VjdGlvblwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibG9hZGVkU2VjdGlvblwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVzcGF3blNlY3Rpb25cIjogZmFsc2UsXG4gICAgICAgICAgICBcIm5ld0xldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsb2FkTmV4dExldmVsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzaG93UG9pbnRWYWx1ZXNcIjogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5sb2FkTmV4dExldmVsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVudGVyZWQgbG9hZE5leHRMZXZlbFwiKTtcbiAgICAgICAgICAgIHZhciBuZXh0TGV2ZWwgPSB0aGlzLmxldmVsLm5leHRMZXZlbDtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICAgICAgdGhpcy5nZXRMZXZlbChuZXh0TGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5sb2FkZWRMZXZlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwubG9hZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxvYWRpbmdMZXZlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbC5wb3B1bGF0ZU1hcCgtMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ0xldmVsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnNldFBvcyhbdGhpcy5jaGVja05vZGUueCwgdGhpcy5jaGVja05vZGUueV0pXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Tm9kZSA9IHRoaXMuY2hlY2twb2ludHMubmV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkZWRMZXZlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubmV3TGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KHRoaXMuaGVybyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eSh0aGlzLmxldmVsLnBvcnRhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnJlbW92ZUZyb21Xb3JsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KHRoaXMuaHVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmh1ZC5yZW1vdmVGcm9tV29ybGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5sb2FkaW5nU2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlc3Bhd25TZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsLnBvcHVsYXRlTWFwKHRoaXMuc2VjdGlvbk51bSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ1NlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlbG9hZGVkIHNlY3Rpb24gXCIgKyB0aGlzLnNlY3Rpb25OdW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwubmV4dExldmVsID4gMCAmJiB0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuaXNCYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJvYXJkKFwibGV2ZWxcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vSWYgZW50ZXJpbmcgbmV4dCBjaGVja3BvaW50XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tOb2RlLnN0YXRlcy5pc0JhY2sgJiYgdGhpcy5oZXJvLnggPj0gdGhpcy5jaGVja05vZGUubmV4dC54KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlID0gdGhpcy5jaGVja05vZGUubmV4dDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tOb2RlLnN0YXRlcy5hY3RpdmF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUuc3RhdGVzLmFjdGl2YXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdENoZWNrcG9pbnQgPSB0aGlzLmNoZWNrTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZYID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlkgPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZZO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuY2FtU3BlZWRYID0gdGhpcy5jaGVja05vZGUubmV4dENhbVNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuY2FtU3BlZWRZID0gdGhpcy5jaGVja05vZGUubmV4dENhbVNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9JZiBlbnRlcmluZyBwcmV2aW91cyBjaGVja3BvaW50XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5jaGVja05vZGUuc3RhdGVzLmlzRnJvbnQgJiYgdGhpcy5oZXJvLnggPCB0aGlzLmNoZWNrTm9kZS54XG4gICAgICAgICAgICAgICAgJiYgdGhpcy5oZXJvLnggPj0gdGhpcy5jaGVja05vZGUucHJldi54KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlID0gdGhpcy5jaGVja05vZGUucHJldjtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWCA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlg7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZZID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmNhbVNwZWVkWCA9IHRoaXMuY2hlY2tOb2RlLnByZXZDYW1TcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmNhbVNwZWVkWSA9IHRoaXMuY2hlY2tOb2RlLnByZXZDYW1TcGVlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaGVyby5zdGF0ZXMucmVzcGF3bmVkKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmNsZWFyQm9hcmQoXCJsZXZlbFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8ucmVzcGF3bigpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zZXRQb3MoW3RoaXMubGFzdENoZWNrcG9pbnQueCwgdGhpcy5sYXN0Q2hlY2twb2ludC55IC0gMTBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQm9hcmQoXCJhY3RvcnNcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNwYXduXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcGF3bk1lc3NhZ2UgPSAyKnRoaXMucHZ0dDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvd1BvaW50VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHZ0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB2dC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvd1BvaW50VmFsdWVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5yZXNwYXduTWVzc2FnZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZHJhd1wiKVxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiQm9sZCAyNXB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI0ZGMDAwMFwiO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCItXCIgKyB0aGlzLmxvc3RTY29yZSArIFwiIHBvaW50c1wiLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5oZXJvLnggKyAxMCxcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaGVyby55IC0gMTUwXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5yZXNwYXduTWVzc2FnZS0tO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRlYWRFbmVtaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmRlYWRFbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVhZEVuZW1pZXNbaV1bMl0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkRW5lbWllcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRyYXdcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMjBweCBWZXJkYW5hXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiIzAwZmYwMFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIitcIiArIHRoaXMuZGVhZEVuZW1pZXNbaV1bMV0gKyBcIiBwb2ludHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhZEVuZW1pZXNbaV1bMF1bMF0gKyAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhZEVuZW1pZXNbaV1bMF1bMV0gLSAxNTBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFkRW5lbWllc1tpXVsyXS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyQm9hcmQoc2NvcGUpIHtcbiAgICAgICAgLy9zY29wZSB3aWxsIHJhbmdlIGZyb20gYWN0b3JzIG9ubHksIHRvIHRoZSBlbnRpcmUgbGV2ZWwuXG4gICAgICAgIGlmIChzY29wZSA9PT0gXCJhY3RvcnNcIikge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ1NlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uTnVtID0gdGhpcy5sYXN0Q2hlY2twb2ludC5udW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2NvcGUgPT09IFwibGV2ZWxcIikge1xuICAgICAgICAgICAgdGhpcy5oZXJvLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLm5ld0xldmVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkJvYXJkIENsZWFyZWRcIik7XG4gICAgfVxuXG4gICAgY2xlYXJTdGF0ZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWRpbmdMZXZlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5sb2FkZWRMZXZlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5wb3B1bGF0ZUxldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLnJlc3Bhd25MZXZlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5sb2FkZWRTZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLnJlc3Bhd25TZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLm5ld0xldmVsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLmxvYWROZXh0TGV2ZWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRMZXZlbChsZXZlbCkge1xuICAgICAgICBpZiAobGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBuZXcgTGV2ZWxPbmUodGhpcy5nYW1lLCB0aGlzLmFzc2V0TWFuYWdlciwgdGhpcy5jdHgpO1xuICAgICAgICAgICAgdGhpcy5sZXZlbE51bSA9IGxldmVsO1xuICAgICAgICAgICAgLy9TaG91bGQgbW92ZSB0aGlzIGludG8gdGhlIExldmVsVHdvIGNsYXNzKD8pXG4gICAgICAgICAgICAvL0NyZWF0ZSBjaGVja3BvaW50IGxpbmtlZCBsaXN0LlxuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1BvcyA9IHRoaXMubGV2ZWwuY2hlY2twb2ludHNbMF07XG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrWCA9IGN1cnJDaGVja1Bvc1swXTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tZID0gY3VyckNoZWNrUG9zWzFdO1xuICAgICAgICAgICAgdmFyIGxpc3RGcm9udCA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIDAsIHRoaXMubGV2ZWwuY2FtVmFsc1swXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbMF0sIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgbGlzdEZyb250LnN0YXRlcy5pc0Zyb250ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1ByZXYgPSBmYWxzZTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5udW0gPSAwO1xuICAgICAgICAgICAgbGlzdEZyb250LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBsaXN0RnJvbnQuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2sgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHByZXZDaGVjayA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIC8vaW5zdGFudGlhdGUgY2hlY2twb2ludCBsaW5rZWQgbGlzdFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB0aGlzLmxldmVsLmNoZWNrcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrUG9zID0gdGhpcy5sZXZlbC5jaGVja3BvaW50c1tpXTtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tYID0gY3VyckNoZWNrUG9zWzBdO1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1kgPSBjdXJyQ2hlY2tQb3NbMV07XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2sgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCBpLCB0aGlzLmxldmVsLmNhbVZhbHNbaV0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzW2ldLCBudWxsLCBwcmV2Q2hlY2spO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5pc0JhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgaSwgdGhpcy5sZXZlbC5jYW1WYWxzW2ldLCB0aGlzLmxldmVsLmNhbVNwZWVkc1tpXSwgbnVsbCwgcHJldkNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLm51bSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaGFzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJDaGVjay5udW0gPSBpO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjay5hZGROZXh0KGN1cnJDaGVjayk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrLnNldEJvdW5kcygpO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjayA9IGN1cnJDaGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJDaGVjay5zZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2twb2ludHMgPSBsaXN0RnJvbnQ7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTm9kZSA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIHRoaXMubGFzdENoZWNrcG9pbnQgPSB0aGlzLmNoZWNrTm9kZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWCA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlg7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlkgPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxldmVsID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbmV3IExldmVsVHdvKHRoaXMuZ2FtZSwgdGhpcy5hc3NldE1hbmFnZXIsIHRoaXMuY3R4KTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxOdW0gPSBsZXZlbDtcbiAgICAgICAgICAgIC8vU2hvdWxkIG1vdmUgdGhpcyBpbnRvIHRoZSBMZXZlbFR3byBjbGFzcyg/KVxuICAgICAgICAgICAgLy9DcmVhdGUgY2hlY2twb2ludCBsaW5rZWQgbGlzdC5cbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tQb3MgPSB0aGlzLmxldmVsLmNoZWNrcG9pbnRzWzBdO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1ggPSBjdXJyQ2hlY2tQb3NbMF07XG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrWSA9IGN1cnJDaGVja1Bvc1sxXTtcbiAgICAgICAgICAgIHZhciBsaXN0RnJvbnQgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCAwLCB0aGlzLmxldmVsLmNhbVZhbHNbMF0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzWzBdLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5zdGF0ZXMuaXNGcm9udCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNQcmV2ID0gZmFsc2U7XG4gICAgICAgICAgICBsaXN0RnJvbnQubnVtID0gMDtcbiAgICAgICAgICAgIGxpc3RGcm9udC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgbGlzdEZyb250LmFjdGl2YXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBwcmV2Q2hlY2sgPSBsaXN0RnJvbnQ7XG4gICAgICAgICAgICAvL2luc3RhbnRpYXRlIGNoZWNrcG9pbnQgbGlua2VkIGxpc3RcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGhpcy5sZXZlbC5jaGVja3BvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1BvcyA9IHRoaXMubGV2ZWwuY2hlY2twb2ludHNbaV07XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrWCA9IGN1cnJDaGVja1Bvc1swXTtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tZID0gY3VyckNoZWNrUG9zWzFdO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLmxldmVsLmNoZWNrcG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgaSwgdGhpcy5sZXZlbC5jYW1WYWxzW2ldLCB0aGlzLmxldmVsLmNhbVNwZWVkc1tpXSwgbnVsbCwgcHJldkNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5oYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaXNCYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjayA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIGksIHRoaXMubGV2ZWwuY2FtVmFsc1tpXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbaV0sIG51bGwsIHByZXZDaGVjayk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5udW0gPSBpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmhhc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2subnVtID0gaTtcbiAgICAgICAgICAgICAgICBwcmV2Q2hlY2suYWRkTmV4dChjdXJyQ2hlY2spO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjay5zZXRCb3VuZHMoKTtcbiAgICAgICAgICAgICAgICBwcmV2Q2hlY2sgPSBjdXJyQ2hlY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyQ2hlY2suc2V0Qm91bmRzKCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrcG9pbnRzID0gbGlzdEZyb250O1xuICAgICAgICAgICAgdGhpcy5jaGVja05vZGUgPSBsaXN0RnJvbnQ7XG4gICAgICAgICAgICB0aGlzLmxhc3RDaGVja3BvaW50ID0gdGhpcy5jaGVja05vZGU7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlggPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZYO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZZID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vb24gaGVybyBkZWF0aCwgcGF1c2UgZ2FtZSB1cGRhdGVzIGFuZCBzYXZlIHN0YXRlcyBvZiBhbGwgZW50aXRpZXMgcHJpb3IgdG8gdGhlIGNoZWNrcG9pbnRcbn0gLy8gZW5kIEdhbWVCb2FyZCBjbGFzc1xuXG4vL0NoZWNrcG9pbnQgXCJub2RlXCJcbmNsYXNzIENoZWNrcG9pbnQgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGN0eCwgbnVtLCBjYW1lcmFTaGlmdCA9IFsyLCAxLjVdLCBjYW1lcmFTcGVlZCA9IFs4LCA4XSwgbmV4dCA9IG51bGwsIHByZXYgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIG51bGwsIGN0eCk7XG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMucHJldiA9IHByZXY7XG4gICAgICAgIHRoaXMuY2FtT2ZmWCA9IGNhbWVyYVNoaWZ0WzBdO1xuICAgICAgICB0aGlzLmNhbU9mZlkgPSBjYW1lcmFTaGlmdFsxXTtcbiAgICAgICAgdGhpcy5uZXh0Q2FtU3BlZWQgPSBjYW1lcmFTcGVlZFswXTtcbiAgICAgICAgdGhpcy5wcmV2Q2FtU3BlZWQgPSBjYW1lcmFTcGVlZFsxXTtcbiAgICAgICAgdGhpcy5yaWdodEJvdW5kID0gdGhpcy54O1xuICAgICAgICB0aGlzLmxlZnRCb3VuZCA9IHRoaXMueCAtIDE7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblJhZGl1cyA9IFs2MCwgNjBdXG4gICAgICAgIHRoaXMubnVtID0gbnVtOyAvL0NoZWNrcG9pbnQncyBvcmRlciBpbiBsaXN0XG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJpc0Zyb250XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpc0JhY2tcIjogZmFsc2UsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYWN0aXZhdGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNOZXh0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNQcmV2XCI6IGZhbHNlLFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc05leHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1ByZXYgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuXG4gICAgfVxuXG4gICAgYWRkTmV4dChuZXh0KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLmhhc05leHQgPSB0cnVlO1xuICAgIH1cblxuICAgIHNldEJvdW5kcygpIHtcbiAgICAgICAgaWYgKHRoaXMubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yaWdodEJvdW5kID0gTWF0aC5mbG9vcigodGhpcy5uZXh0LnggKyB0aGlzLngpIC8gMikgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yaWdodEJvdW5kID0gdGhpcy54O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdEJvdW5kID0gTWF0aC5mbG9vcigodGhpcy5wcmV2LnggKyB0aGlzLngpIC8gMikgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sZWZ0Qm91bmQgPSB0aGlzLng7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KCkge1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7XG4iLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBUZXJyYWluLFxuICAgIEh1cnRib3gsXG4gICAgUHJvamVjdGlsZSxcbiAgICBCb21iLFxufSBmcm9tIFwiLi9cIlxuXG5cbi8vcm93IDksIDQweDMwLCAxMSBmcmFtZXNcbmNsYXNzIEhhbmQgZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoID0gNDAsIHNwcml0ZUhlaWdodCA9IDMwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gNztcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMTI1O1xuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDA7Ly91cGRhdGVkIGluIHJlbGV2YW50IHN0YXRlIHVwZGF0ZXNcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAxMDtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDEwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gNDAwMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IDcwMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDsgLy90aHJlZSBub3JtYWwgaGl0cy5cbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLnRocm93dGltZSA9IDQ7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAxMjA7XG4gICAgICAgIHRoaXMuY29vbGRvd252YXJpYW5jZSA9IDIwXG4gICAgICAgIHRoaXMuY29vbGRvd25UaW1lciA9IDA7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImlkbGluZ1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGFydGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwidGhyb3dpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1Rocm93blwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVjb3ZlcmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDExLCA1LCAxLCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwic3RhcnR1cFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDExLCA1LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgMSksXG4gICAgICAgICAgICBcInRocm93XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTEsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICAgICAgXCJyZWNvdmVyXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTEsIDYsIDMsIGZhbHNlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg0MCwgMzAsIDIwLCA1LCAwLCAxMCk7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XG4gICAgICAgICAgICAvL2luc2VydCBhdHRhY2sgYmVoYXZpb3IuIExvb3BzIGZvciBub3cuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gdGhpcy5zaWdodFJhZGl1c1swXVxuICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMV1cbiAgICAgICAgICAgICAgICAmJiB0aGlzLmNvb2xkb3duVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFydGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg0MCwgMzAsIDIwLCAyMCwgMCwgMTApO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhcnRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50aHJvd2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMudGhyb3dpbmcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuaGFzVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgQm9tYih0aGlzLmdhbWUsIHRoaXMueCArIHRoaXMuZmFjaW5nICogMTAsIHRoaXMueSAtIDIwLCB0aGlzLmltZywgdGhpcy5jdHgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgLyB0aGlzLmRpc3RhbmNlKSk7IC8vdmFsdWUgb2YgNzUgZXhwbG9kZXMgb24gc3RhdGlvbmFyeSBIZXJvXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IHRoaXMudGhyb3d0aW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1Rocm93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnRocm93aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gdGhpcy5jb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvb2xkb3duVGltZXItLTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIHRoaXMueVZlbG9jaXR5KTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhcnR1cDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMudGhyb3dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnRocm93O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5yZWNvdmVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCwgeE9mZiwgeU9mZikge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyICsgeE9mZjtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgeU9mZjtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIC8vVE9ETyBBZGQgY29sbGlzaW9uIHdpdGggdGVycmFpblxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9lbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgLy8gICAgdGhpcy54ID0gdGhpcy5ib3VuZFggKyA4NztcbiAgICAgICAgICAgIC8vICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMueCA9IHRoaXMuYm91bmRYIC0gODc7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgLy99XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlByb2plY3RpbGVcIiAmJiAhdGhpcy5zdGF0ZXMuaHVydCkge1xuICAgICAgICAgICAgLy9ub3RoaW5nIGZvciBub3dcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSHVydGJveFwiICYmICF0aGlzLnN0YXRlcy5odXJ0KSB7XG4gICAgICAgICAgICBvdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgICAgICBvdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBIYW5kOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVudGl0eSxcbiAgICBIZXJvLFxuICAgIEh1cnRib3gsXG4gICAgVGVycmFpbixcbiAgICBBY3RvcixcbiAgICBFbmVteSxcbiAgICBQcm9qZWN0aWxlLFxufSBmcm9tIFwiLi9cIlxuXG5cbi8qKioqKioqKioqKlxuZ2FtZSAtIGEgcmVmZXJlbmNlIHRvIHRoZSBnYW1lIGluIHdoaWNoIHRoaXMgZW50aXR5IGV4aXN0c1xueCwgeSAtIGVudGl0eSdzIGNvb3JkaW5hdGVzXG5yZW1vdmVGcm9tV29ybGQgLSBhIGZsYWcgdGhhdCBkZW5vdGVzIHdoZW4gdG8gcmVtb3ZlIHRoaXMgZW50aXR5IGZyb20gdGhlIGdhbWVcbioqKioqKioqKioqKi9cbmNsYXNzIExhdmEgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgc3ByaXRlV2lkdGggPSA2NCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIHRoaXMueSArPSAoOTYgKiAzIC0gNiAqIDMpO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSAxMjg7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogKHRoaXMuc3ByaXRlSGVpZ2h0IC0gMzIpO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueCAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlICsgMzcgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMuZmlyZUNvb2xkb3duVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmZpcmVDb29sZG93biA9IDEwMDA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMS8vdGhpcy5nYW1lLmhlcm8ueC5tYXhIZWFsdGhcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCAxMjhdLCA3LCAxLCA3LCA4LCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vLy9IYXZlIExhdmEgc3Bhd24gZmlyZWJhbGxzICoqSSBkb24ndCBsaWtlIHRoaXMsIGJ1dCBJJ20gbGVhdmluZyB0aGUgY29kZSBmb3IgcG9zdGVyaXR5J3Mgc2FrZS4qKlxuICAgICAgICAvL2lmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA1MDAgJiYgdGhpcy5maXJlQ29vbGRvd25UaW1lciA8PSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEZpcmViYWxsKHRoaXMuZ2FtZSwgdGhpcy54IC0gMzIsIHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0KjIsIHRoaXMuaW1nLCB0aGlzLmN0eCwgNCwgMTUpKTtcbiAgICAgICAgLy8gICAgdGhpcy5maXJlQ29vbGRvd25UaW1lciA9IHRoaXMuZmlyZUNvb2xkb3duO1xuICAgICAgICAvL31cbiAgICAgICAgLy9pZiAodGhpcy5maXJlQ29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgLy8gICAgdGhpcy5maXJlQ29vbGRvd25UaW1lci0tO1xuICAgICAgICAvL31cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKVxuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgRmlyZWJhbGwgZXh0ZW5kcyBFbmVteSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLCBjb29sZG93biA9IDE1MCwgeVNwZWVkID0gMTIsIHNwYXduT2Zmc2V0KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gNiAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAyMCAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoLzI7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQqdGhpcy5zY2FsZS8yO1xuXG4gICAgICAgIHRoaXMub3JpZ1ggPSB0aGlzLng7XG4gICAgICAgIHRoaXMub3JpZ1kgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMub3JpZ0JvdW5kWCA9IHRoaXMuYm91bmRYO1xuICAgICAgICB0aGlzLm9yaWdCb3VuZFkgPSB0aGlzLmJvdW5kWTtcblxuICAgICAgICB0aGlzLnlTcGVlZCA9IHlTcGVlZDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAyO1xuICAgICAgICB0aGlzLmNvb2xkb3duVGltZXIgPSBzcGF3bk9mZnNldDtcbiAgICAgICAgdGhpcy5jb29sZG93biA9IGNvb2xkb3duO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhcnRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibWlkZGxlX3VwXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwZWFrX3VwXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwZWFrX2Rvd25cIjogZmFsc2UsXG4gICAgICAgICAgICBcIm1pZGRsZV9kb3duXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmaW5pc2hcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCA2LCB0cnVlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgICAgIFwic3RhcnRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDYpLFxuICAgICAgICAgICAgXCJtaWRkbGVfdXBcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDcpLFxuICAgICAgICAgICAgXCJwZWFrX3VwXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA4KSxcbiAgICAgICAgICAgIFwicGVha19kb3duXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA5KSxcbiAgICAgICAgICAgIFwibWlkZGxlX2Rvd25cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEwKSxcbiAgICAgICAgICAgIFwiZmluaXNoXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMSksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyYXZpdHkpO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDwgMTAwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImxhdmFfYmFsbFwiLCAwLjUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCAtMSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLm1pZGRsZV91cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLm1pZGRsZV91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC0uNSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLm1pZGRsZV91cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5wZWFrX3VwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha191cCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC0uMSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnBlYWtfdXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucGVha19kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha19kb3duKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLjEgKiB0aGlzLnlTcGVlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5wZWFrX2Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubWlkZGxlX2Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5taWRkbGVfZG93bikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC41ICogdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubWlkZGxlX2Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmluaXNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmluaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gdGhpcy5jb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5vcmlnWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLm9yaWdCb3VuZFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy5vcmlnQm91bmRZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyLS07XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5taWRkbGVfdXApIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLm1pZGRsZV91cDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha191cCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMucGVha191cDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha19kb3duKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5wZWFrX2Rvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLm1pZGRsZV9kb3duKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5taWRkbGVfZG93bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmluaXNoKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5pc2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgU3Bpa2VzIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIGFjdGl2ZSA9IHRydWUsIHRpbWVyLCB0aW1lT2Zmc2V0ID0gMCwgbGVuZ3RoID0gMCwgaW50ZXJ2YWwgPSAyMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVudGl0eVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlKih0aGlzLnNwcml0ZVdpZHRoIC0gMjgpO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqICh0aGlzLnNwcml0ZUhlaWdodC8yICsgMyk7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54IC0gdGhpcy5zcHJpdGVXaWR0aCArIHRoaXMuc2NhbGUqMTQ7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlICsgMzcgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMuc3Bpa2VDb29sZG93blRpbWVyID0gdGltZU9mZnNldDtcbiAgICAgICAgdGhpcy5zcGlrZUNvb2xkb3duID0gdGltZXI7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTsgLy90aGlzLmdhbWUuaGVyby5tYXhIZWFsdGhcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogZmFsc2UsXG4gICAgICAgICAgICBcImluYWN0aXZlX3VwXCI6ICFhY3RpdmUsXG4gICAgICAgICAgICAvL1wiaW5hY3RpdmVfdXBfc3Bhd25lZFwiOiBmYWxzZSwgLy9Eb2Vzbid0IHdvcmssIHVudXNlZCBmb3Igbm93XG4gICAgICAgICAgICBcImluYWN0aXZlX2Rvd25cIjogYWN0aXZlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCA2LCA1LCA1LCBmYWxzZSwgdGhpcy5zY2FsZSwgMSksXG4gICAgICAgICAgICBcImluYWN0aXZlX3VwXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDYsIDEwLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAzKSxcbiAgICAgICAgICAgIFwiaW5hY3RpdmVfZG93blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCA2LCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pbmFjdGl2ZV9kb3duO1xuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG5leHRPZmZzZXQgPSB0aW1lT2Zmc2V0ICsgdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgICAgIGxlbmd0aC0tO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgU3Bpa2VzKHRoaXMuZ2FtZSwgdGhpcy54ICsgdGhpcy5zcHJpdGVXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLnksIHRoaXMuaW1nLCBjdHgsIDIsIHRoaXMuYWN0aXZlLCB0aGlzLnNwaWtlQ29vbGRvd24sIG5leHRPZmZzZXQsIGxlbmd0aCwgdGhpcy5pbnRlcnZhbCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSAmJiB0aGlzLnNwaWtlQ29vbGRvd25UaW1lciA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpICE9PSAxICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpICE9PSA1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCArIDE5LCB0aGlzLmJvdW5kWSwgLXRoaXMuc3ByaXRlV2lkdGggLSAuNSAqIHRoaXMuYm91bmRXaWR0aCwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCAvIDIsIHRoaXMuc3ByaXRlSGVpZ2h0IC8gMiwgdGhpcy5ib3VuZFdpZHRoIC0gMTMsIHRoaXMuYm91bmRIZWlnaHQgLSA0MiwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBcImhlYWx0aFwiLCAyLCB0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYICsgMTksIHRoaXMuYm91bmRZLCAtdGhpcy5zcHJpdGVXaWR0aCAtIC41ICogdGhpcy5ib3VuZFdpZHRoLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoIC8gMiwgdGhpcy5zcHJpdGVIZWlnaHQgLyAyLCB0aGlzLmJvdW5kV2lkdGggLSAxMywgdGhpcy5ib3VuZEhlaWdodCAtIDU2LCB0aGlzLnNjYWxlLCB0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhbHRoXCIsIDIsIHRydWUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pbmFjdGl2ZV9kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwaWtlQ29vbGRvd25UaW1lciA9IHRoaXMuc3Bpa2VDb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNwaWtlQ29vbGRvd25UaW1lci0tO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pbmFjdGl2ZV9kb3duKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaW5hY3RpdmVfZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPSB0aGlzLnNwaWtlQ29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuaW5hY3RpdmVfdXApIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8IDMwMCAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8IDMwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFggKyAzLCB0aGlzLmJvdW5kWSwgLXRoaXMuc3ByaXRlV2lkdGggLSAuNSp0aGlzLmJvdW5kV2lkdGgsIDAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggLyAyLCB0aGlzLnNwcml0ZUhlaWdodCAvIDIsIHRoaXMuYm91bmRXaWR0aCAtIDEzLCB0aGlzLmJvdW5kSGVpZ2h0IC0gNDIsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCxcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFsdGhcIiwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmluYWN0aXZlX2Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmluYWN0aXZlX2Rvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmluYWN0aXZlX3VwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pbmFjdGl2ZV91cDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0aWxlSGF6YXJkIGV4dGVuZHMgRW5lbXkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgeFNwZWVkLCB5U3BlZWQsIGRpcmVjdGlvbnMsIGxpZmVzcGFuKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgLy90aGlzLnkgKz0gNDQ7IEdpdmUgYSArNDQgb2Zmc2V0IHdoZW4gaW5zdGFudGlhdGluZyBcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLm9yaWdYID0gdGhpcy54O1xuICAgICAgICB0aGlzLm9yaWdZID0gdGhpcy55O1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuc2NhbGUgKiA1O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0ICogdGhpcy5zY2FsZS8yICsgNSAqIHRoaXMuc2NhbGU7XG5cbiAgICAgICAgdGhpcy54U3BlZWQgPSB4U3BlZWQ7XG4gICAgICAgIHRoaXMueVNwZWVkID0geVNwZWVkO1xuICAgICAgICB0aGlzLnhEaXIgPSBkaXJlY3Rpb25zWzBdO1xuICAgICAgICB0aGlzLnlEaXIgPSBkaXJlY3Rpb25zWzFdO1xuICAgICAgICB0aGlzLmxpZmVzcGFuID0gbGlmZXNwYW47XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy50aWNrID0gMTtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMiksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBvcyh0aGlzLnhTcGVlZCAqIHRoaXMueERpciwgdGhpcy55U3BlZWQgKiB0aGlzLnlEaXIpO1xuICAgICAgICBpZiAodGhpcy5saWZlc3BhbiA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlmZXNwYW4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy9UT0RPIHJlZmFjdG9yIHRoaXMgKGFydGlmYWN0IGZyb20gaW5zdGFuY2VvZiBkYXlzKVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkFjdG9yXCIgJiYgIShvdGhlci5uYW1lID09PSBcIkVuZW15XCIpKSB7Ly9IZXJvIGNvbGxpc2lvblxuICAgICAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGljayA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudGljay0tO1xuICAgICAgICAgICAgICAgIG90aGVyLmhlYWx0aCAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0aWxlQ2lyY2xlIGV4dGVuZHMgRW5lbXkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgeFNwZWVkLCB5U3BlZWQsIHJhZGl1cyA9IDEwLCB0aW1lciA9IDEwMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIC8vdGhpcy55ICs9IDQ0OyBHaXZlIGEgKzQ0IG9mZnNldCB3aGVuIGluc3RhbnRpYXRpbmcgXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5vcmlnWCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5vcmlnWSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMudGltZXIgPSB0aW1lcjtcbiAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLXRoaXMucmFkaXVzKTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDYwO1xuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKCh0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiA4ICsgMztcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiA4ICsgMztcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLnNjYWxlICogNTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCAqIHRoaXMuc2NhbGUgLyAyICsgNSAqIHRoaXMuc2NhbGU7XG5cbiAgICAgICAgdGhpcy54U3BlZWQgPSB4U3BlZWQ7XG4gICAgICAgIHRoaXMueVNwZWVkID0geVNwZWVkO1xuICAgICAgICB0aGlzLnF1YWRyYW50cyA9IFtbMSwgMV0sIFstMSwgMV0sIFstMSwgLTFdLCBbMSwgLTFdXTtcbiAgICAgICAgdGhpcy5xdWFkcmFudCA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy50aWNrID0gMTtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMiksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5vcmlnWCA+PSAwICYmIHRoaXMueSAtIHRoaXMub3JpZ1kgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5xdWFkcmFudCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54IC0gdGhpcy5vcmlnWCA+PSAwICYmIHRoaXMueSAtIHRoaXMub3JpZ1kgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnF1YWRyYW50ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnggLSB0aGlzLm9yaWdYIDwgMCAmJiB0aGlzLnkgLSB0aGlzLm9yaWdZID4gMCkge1xuICAgICAgICAgICAgdGhpcy5xdWFkcmFudCA9IDI7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIHRoaXMub3JpZ1ggPCAwICYmIHRoaXMueSAtIHRoaXMub3JpZ1kgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5xdWFkcmFudCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVQb3ModGhpcy54U3BlZWQgKiB0aGlzLnF1YWRyYW50c1t0aGlzLnF1YWRyYW50XVswXSwgdGhpcy55U3BlZWQgKiB0aGlzLnF1YWRyYW50c1t0aGlzLnF1YWRyYW50XVsxXSk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLy8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIC8vaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgIC8vICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy99XG4gICAgICAgIC8vLy9UT0RPIHJlZmFjdG9yIHRoaXMgKGFydGlmYWN0IGZyb20gaW5zdGFuY2VvZiBkYXlzKVxuICAgICAgICAvL2Vsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiQWN0b3JcIiAmJiAhKG90aGVyLm5hbWUgPT09IFwiRW5lbXlcIikpIHsvL0hlcm8gY29sbGlzaW9uXG4gICAgICAgIC8vICAgIGlmIChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAvLyAgICAgICAgaWYgKHRoaXMudGljayA9PT0gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIHRoaXMudGljay0tO1xuICAgICAgICAvLyAgICAgICAgb3RoZXIuaGVhbHRoIC09IDE7XG4gICAgICAgIC8vICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy99XG4gICAgICAgIC8vZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgLy8gICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgIC8vICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgIC8vICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmNsYXNzIExhdW5jaGVyIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHhTcGVlZCwgeVNwZWVkLCBkaXJlY3Rpb25zLCBjb29sZG93biwgcHJvamVjdGlsZUxpZmVzcGFuLCBsYXVuY2hUaW1lT2Zmc2V0ID0gMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVudGl0eVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICAvL3RoaXMueSArPSA0NDsgR2l2ZSBhICs0NCBvZmZzZXQgd2hlbiBpbnN0YW50aWF0aW5nIFxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogODtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiA4O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueCAtIHRoaXMuc3ByaXRlV2lkdGggKyB0aGlzLnNjYWxlICogODtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCAqIHRoaXMuc2NhbGUgKyA4ICogdGhpcy5zY2FsZTtcblxuICAgICAgICB0aGlzLnhTcGVlZCA9IHhTcGVlZDtcbiAgICAgICAgdGhpcy55U3BlZWQgPSB5U3BlZWQ7XG4gICAgICAgIHRoaXMueERpciA9IGRpcmVjdGlvbnNbMF07XG4gICAgICAgIHRoaXMueURpciA9IGRpcmVjdGlvbnNbMV07XG4gICAgICAgIHRoaXMuc2hvdENvb2xkb3duVGltZXIgPSBsYXVuY2hUaW1lT2Zmc2V0O1xuICAgICAgICB0aGlzLnNob3RDb29sZG93biA9IGNvb2xkb3duO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVMaWZlc3BhbiA9IHByb2plY3RpbGVMaWZlc3BhbjtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAyMCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoLypNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA1MDAwICYmKi8gdGhpcy5zaG90Q29vbGRvd25UaW1lciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUHJvamVjdGlsZUhhemFyZCh0aGlzLmdhbWUsIHRoaXMueCAtIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsXG4gICAgICAgICAgICAgICAgdGhpcy54U3BlZWQsIHRoaXMueVNwZWVkLCBbdGhpcy54RGlyLCB0aGlzLnlEaXJdLCB0aGlzLnByb2plY3RpbGVMaWZlc3BhbikpO1xuICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciA9IHRoaXMuc2hvdENvb2xkb3duO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNob3RDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lci0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgLy90aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIExhdmEsXG4gICAgRmlyZWJhbGwsXG4gICAgU3Bpa2VzLFxuICAgIFByb2plY3RpbGVIYXphcmQsXG4gICAgUHJvamVjdGlsZUNpcmNsZSxcbiAgICBMYXVuY2hlclxufVxuIiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCBUZXJyYWluIGZyb20gXCIuL3RlcnJhaW5cIlxuaW1wb3J0IFByb2plY3RpbGUgZnJvbSBcIi4vcHJvamVjdGlsZVwiXG5pbXBvcnQgUHJvamVjdGlsZV9Td29yZCBmcm9tIFwiLi9wcm9qZWN0aWxlLXN3b3JkXCJcbmltcG9ydCBTb2xkaWVyX1NoaWVsZCBmcm9tIFwiLi9zb2xkaWVyLXNoaWVsZFwiXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vZW5lbXlcIlxuaW1wb3J0IEh1cnRib3ggZnJvbSBcIi4vaHVydGJveFwiXG5pbXBvcnQgUmVmbGVjdGJveCBmcm9tIFwiLi9yZWZsZWN0Ym94XCJcbmltcG9ydCBIYXphcmRzIGZyb20gXCIuL2hhemFyZHNcIlxuaW1wb3J0IFJvY2tldCBmcm9tIFwiLi9yb2NrZXRcIlxuaW1wb3J0IEFjdG9yIGZyb20gXCIuL2FjdG9yXCJcblxuXG5jbGFzcyBIZXJvIGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgY29uc3RydWN0b3IgKGdhbWUsIHgsIHksIGltZz1udWxsLCBjdHg9bnVsbCwgc2NhbGU9Mywgc3ByaXRlV2lkdGg9NjAsIHNwcml0ZUhlaWdodD02MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMub3JpZ1kgPSB0aGlzLnk7IC8vRm9yIGp1bXBpbmdcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDExMDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7IC8vIFRoaXMgd2lsbCBoZWxwIHN0b3AgSGVybyBmcm9tIHNsaXBwaW5nIGF0IGVkZ2VzLCBwYXJ0aWN1bGFybHkgZm9yIGhvcml6b250YWxseSBsb25nZXIgYmxvY2tzIG9mIHRlcnJhaW5cblxuICAgICAgICAvKioqU1RBVFMqKiovXG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9ICg4KTtcbiAgICAgICAgdGhpcy5kYXNoU3BlZWQgPSAxN1xuICAgICAgICB0aGlzLmp1bXBTdHJlbmd0aCA9ICgyMCk7XG4gICAgICAgIHRoaXMuanVtcHNMZWZ0ID0gMjtcbiAgICAgICAgdGhpcy5tYXhKdW1wcyA9IDI7XG4gICAgICAgIHRoaXMudGVybWluYWxWZWxvY2l0eSA9IDE1O1xuXG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gMzA7XG4gICAgICAgIHRoaXMubWF4RW5lcmd5ID0gMzA7XG4gICAgICAgIHRoaXMuZW5lcmd5ID0gMzA7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gMzA7XG4gICAgICAgIHRoaXMuc2xhc2hFbmVyZ3lDb3N0ID0gMjU7XG4gICAgICAgIHRoaXMuY2xlYXZlRW5lcmd5Q29zdCA9IDE1O1xuICAgICAgICB0aGlzLnNob290Q29zdCA9IDI7XG4gICAgICAgIHRoaXMuc2hvb3RFbmVyZ3lDb3N0ID0gMTA7XG4gICAgICAgIHRoaXMuZGFzaEVuZXJneUNvc3QgPSA3O1xuXG4gICAgICAgIHRoaXMuc3R1bkRpciA9IDA7XG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IDE7XG4gICAgICAgIFxuICAgICAgICAvL1RpbWVyc1xuICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duID0gMTY7XG4gICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gPSAxNSAvICh0aGlzLm11bHRpcGxpZXIgKiAyKTtcbiAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93bk1pbiA9IDE1IC8gKHRoaXMubXVsdGlwbGllciAqIDIpO1xuICAgICAgICB0aGlzLmVuZXJneURlbGF5ID0gMjA7XG4gICAgICAgIHRoaXMuZW5lcmd5RGVsYXlUaW1lciA9IDA7XG4gICAgICAgIHRoaXMudmVsb2NpdHlDb29sZG93biA9IDI7XG4gICAgICAgIHRoaXMudmVsb2NpdHlDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5qdW1wVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmp1bXBDb29sZG93biA9IDIwO1xuICAgICAgICB0aGlzLnNob290Q29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDA7XG5cbiAgICAgICAgLy9ERVYgVE9PTFNcbiAgICAgICAgdGhpcy5nb2RNb2RlRW5lcmd5TWluID0gMDtcbiAgICAgICAgdGhpcy5ub3RHb2RNb2RlRW5lcmd5TWluID0gdGhpcy5lbmVyZ3lDb29sZG93bk1pbjtcbiAgICAgICAgdGhpcy5nb2RFbmVyZ3lEZWxheSA9IDA7XG4gICAgICAgIHRoaXMubm90R29kRW5lcmd5RGVsYXkgPSB0aGlzLmVuZXJneURlbGF5O1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJlbmVyZ2l6ZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImludnVsbmVyYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicnVubmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwianVtcGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGFzaGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZW5lcmd5RGFzaFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGFzaGluZ1N0YXJ0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nTWlkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nRW5kXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNEYXNoZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob290aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNTaG90XCI6IGZhbHNlLC8vVE9ETyBJbXBsZW1lbnQgdG8gcmVwbGFjZSBzaG90bG9ja2VkXG4gICAgICAgICAgICBcInNsYXNoaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNTbGFzaGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJjbGVhdmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaGFzQ2xlYXZlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvdGxvY2tlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZnJhbWVsb2NrZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInN0dW5uZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImRlYWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInJlc3Bhd25lZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZ3JvdW5kZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaGFzR3Jhdml0eVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJpc0dvZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDksIDMsIDksIHRydWUsIHRoaXMuc2NhbGUpLCAvLzUweDUwXG4gICAgICAgICAgICBcInN0dW5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAwLCAxMywgNCwgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDkpLFxuICAgICAgICAgICAgXCJkZWFkXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgMTgsIDUsIDUsIHRydWUsIHRoaXMuc2NhbGUsIDEzKSxcbiAgICAgICAgICAgIFwicnVuXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMSwgMjIsIDMsIDExLCB0cnVlLCB0aGlzLnNjYWxlKSwgLy81MHg1MFxuICAgICAgICAgICAgLy9UYWtlb2ZmP1xuICAgICAgICAgICAgXCJhc2NlbmRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCA4LCAzLCA0LCB0cnVlLCB0aGlzLnNjYWxlLCAyKSwgLy81MHg1MFxuICAgICAgICAgICAgXCJkZXNjZW5kXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTQsIDMsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDgpLCAvLzUweDUwXG4gICAgICAgICAgICAvL0xhbmQ/XG4gICAgICAgICAgICBcImFpcnNob290XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMjAsIDMsIDYsIGZhbHNlLCB0aGlzLnNjYWxlLCAxNCksIC8vNTB4NTBcbiAgICAgICAgICAgIFwic2hvb3RcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDMsIDMsIDYsIDMsIGZhbHNlLCB0aGlzLnNjYWxlKSwgLy84MHg2MFxuICAgICAgICAgICAgXCJndW5ydW5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDEsIDIyLCAzLCAxMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTEpLCAvLzUweDUwXG4gICAgICAgICAgICBcInNsYXNoXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA0LCAxMSwgMiwgMTEsIGZhbHNlLCB0aGlzLnNjYWxlKSwgLy84MHg1MFxuICAgICAgICAgICAgXCJjbGVhdmVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzEwMCwgNzBdLCA5LCAxMywgMiwgMTMsIGZhbHNlLCB0aGlzLnNjYWxlKSwgLy84MHg2MFxuICAgICAgICAgICAgXCJkYXNoXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs2MCwgNjBdLCA1LCA3LCAzLCA3LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcImRhc2hfc3RhcnRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDEsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiZGFzaF9taWRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDUsIGZhbHNlLCB0aGlzLnNjYWxlLCAxKSxcbiAgICAgICAgICAgIFwiZGFzaF9lbmRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDEsIGZhbHNlLCB0aGlzLnNjYWxlLCA1KSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7Ly9UT0RPIChtYXliZSkgZmluZCBhIGJldHRlciBzb2x1dGlvbiB0byB0aGUgZnJhbWVsb2NrZWQgbG9naWMuIChUb28gbWFueSBleGNlcHRpb25zIGZvciB0aGluZ3MgbGlrZSBzbGFzaClcbiAgICAgICAgLy9EZXYgVG9vbCBVcGRhdGVzXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldFBvc1RpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdvZFRvZ2dsZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29kVG9nZ2xlVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLy8vLy8vLy8vIGFsbCBidXR0b24gY2hlY2tzIGdvIGhlcmUgLy8vLy8vLy8vLy9cbiAgICAgICAgICAgIC8vIEtFWSBET1dOXG4gICAgICAgICAgICAvL3J1biByaWdodFxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMucmlnaHRdLmFjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgLyomJiB0aGlzLnN0YXRlcy5jYW5SdW4qLykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3J1biBsZWZ0XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmxlZnRdLmFjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgLyomJiB0aGlzLnN0YXRlcy5jYW5SdW4qLykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2VuZXJnaXplXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5lbmVyZ2l6ZV0uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmdpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vanVtcFxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMuanVtcF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5qdW1waW5nICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAvKiYmIHRoaXMuc3RhdGVzLmNhbkp1bXAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmp1bXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmdyb3VuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3Nob290XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5zaG9vdF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAmJiAhdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY2xlYXZlXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5jbGVhdmVdLmFjdGl2ZSAmJiB0aGlzLnN0YXRlcy5ncm91bmRlZCAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJzd29yZF9zd2luZ1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmNsZWF2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3NsYXNoXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5zbGFzaF0uYWN0aXZlICYmIHRoaXMuc3RhdGVzLmdyb3VuZGVkICYmICghdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgfHwgdGhpcy5zdGF0ZXMuZGFzaGluZykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5yaWdodF0uYWN0aXZlKSB7IHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMubGVmdF0uYWN0aXZlKSB7IHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7IH1cbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJzd29yZF9zd2luZ1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIGZhbHNlLCB0cnVlLCBmYWxzZSwgdHJ1ZSwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9kYXNoXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5kYXNoXS5hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLmRhc2hFbmVyZ3lDb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNEYXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJvdXRfb2ZfZW5lcmd5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9LRVkgVVBcbiAgICAgICAgICAgIGlmICghKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMucmlnaHRdLmFjdGl2ZSB8fCB0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmxlZnRdLmFjdGl2ZSlcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmVuZXJnaXplXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vIFRIRU4gZG8gYWN0aW9ucyAvLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgaWYgKHRoaXMuanVtcFRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuanVtcFRpbWVyIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSdW5uaW5nXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY2VudGVyWCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY2VudGVyWCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0p1bXBpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5qdW1waW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuanVtcGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanVtcHNMZWZ0ID4gMCAmJiB0aGlzLmp1bXBUaW1lciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHNMZWZ0IC09IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcFRpbWVyID0gdGhpcy5qdW1wQ29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgLT0gdGhpcy5qdW1wU3RyZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9DbGVhdmluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmNsZWF2aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgJiYgIXRoaXMuc3RhdGVzLmhhc1JlZmxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPj0gMyAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8PSA2KSB7Ly9VcHBlciBodXJ0YmJveFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtMjMwLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTUwLCA1MCwgdGhpcy5zY2FsZSwgMTUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNzAgLSB0aGlzLnNwcml0ZVdpZHRoIC0gMTUwLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTUwLCA1MCwgdGhpcy5zY2FsZSwgMTUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAzICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHsvL0xvd2VyIGh1cnRib3hcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA4MCwgMTAwLCB0aGlzLnNjYWxlLCAxNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC02MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAxMjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDE1MCwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmVuZXJnaXplZCAmJiAhdGhpcy5zdGF0ZXMuaGFzUmVmbGVjdGVkICYmdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPj0gMyAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5jbGVhdmVFbmVyZ3lDb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFJlZmxlY3Rib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAzMCwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDQwLCAxMjAsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0aGlzLCA0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFJlZmxlY3Rib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCA2MCwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDQwLCAxMjAsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0aGlzLCA0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VFbmVyZ3kodGhpcy5jbGVhdmVFbmVyZ3lDb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNSZWZsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmNsZWF2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1JlZmxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TaG9vdGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nICYmICEodGhpcy5zaG9vdENvb2xkb3duVGltZXIgPiAwKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5zaG9vdEVuZXJneUNvc3QgJiYgdGhpcy5zdGF0ZXMuZW5lcmdpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBQcm9qZWN0aWxlKHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRoaXMuc3RhdGVzLmVuZXJnaXplZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VFbmVyZ3kodGhpcy5zaG9vdEVuZXJneUNvc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19zaG9vdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLnNob290Q29zdCAmJiAhdGhpcy5zdGF0ZXMuZW5lcmdpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBQcm9qZWN0aWxlKHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSAtPSB0aGlzLnNob290Q29zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9fc2hvb3RcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyID0gdGhpcy5zaG9vdENvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJvdXRfb2ZfZW5lcmd5XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290Q29vbGRvd25UaW1lciA9IHRoaXMuc2hvb3RDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU2xhc2hpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSB0cnVlOyAvL0ZpeGVzIHN1cGVyLWR1cGVyIGp1bXAgYnVnLiAoV2hlbiBpbnRlcnJ1cHRpbmcgZGFzaCwgZGFzaCBkb2Vzbid0IGVudGVyIGlzRG9uZSgpIHNvIGdyYXYgaXNuJ3QgcmVzZXQpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID09PSAyICYmIHRoaXMuc3RhdGVzLmVuZXJnaXplZCAmJiAhdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5zbGFzaEVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFByb2plY3RpbGVfU3dvcmQodGhpcy5nYW1lLCB0aGlzLnggKyAyMCwgdGhpcy55LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlRW5lcmd5KHRoaXMuc2xhc2hFbmVyZ3lDb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJvdXRfb2ZfZW5lcmd5XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAyICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHsvL0h1cnRib3hcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KS8vZmFjaW5nIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIC8vZmFjaW5nIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAgLSB0aGlzLnNwcml0ZVdpZHRoIC0gMTIwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNTbGFzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rhc2hpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMudXBkYXRlUG9zKHRoaXMuZGFzaFNwZWVkLCAwKTsgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyB0aGlzLnVwZGF0ZVBvcygtdGhpcy5kYXNoU3BlZWQsIDApOyB9XG4gICAgICAgICAgICAgICAgLy9UaHJlZSBwYXJ0IGRhc2ggKGJldHRlciBpbnZ1bG5lcmFiaWxpdHkgaW1wbGVtZW50YXRpb24pIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNjAsIDYwLCAyNSwgMjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5lcmd5ID49IHRoaXMuZGFzaEVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSAtPSB0aGlzLmRhc2hFbmVyZ3lDb3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmVuZXJneURhc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lEZWxheVRpbWVyID0gdGhpcy5lbmVyZ3lEZWxheTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNjAsIDYwLCAzNywgMTUsIDAsIC0xMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nTWlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5lbmVyZ3lEYXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmludnVsbmVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ01pZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pbnZ1bG5lcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmVuZXJneURhc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdNaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNjAsIDYwLCAyNSwgMjUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzRGFzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1N0dW5uZWRcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdHVubmVkKSB7XG4gICAgICAgICAgICAgICAgLy9tb3ZlIGF3YXkgZnJvbSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBhdHRhY2tcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5zdHVuRGlyICogMTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA9IHRoaXMuZGFtYWdlQ29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxpZXIgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vREVBRFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRlYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3bmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1Jlc3Bhd25cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5yZXNwYXduZWQpIHtcbiAgICAgICAgICAgICAgICAvL3Jlc3Bhd24gKGNhbiBkZWZpbmUgdGhpbmdzIGxpa2UgYWN0aXZpdHkgY29vbGRvd24sIHJlc3Bhd24gYW5pbWF0aW9uLCBldGMuLi4pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vVGltZXIgQ2hlY2tzXG4gICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3lEZWxheVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5RGVsYXlUaW1lci0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3lDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duVGltZXItLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lbmVyZ3kgPCB0aGlzLm1heEVuZXJneSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3lDb29sZG93biA+IHRoaXMuZW5lcmd5Q29vbGRvd25NaW4pIHsgLy9lbmVyZ3kgY29vbGRvd24gdGltZSBkZWNyZWFzZXMgbm9uLWxpbmVhcmx5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duICo9IC41O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZW5lcmd5Q29vbGRvd24gLSB0aGlzLmVuZXJneUNvb2xkb3duTWluIDwgLS41KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVuZXJneUNvb2xkb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gKj0gMS4xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbmVyZ3lDb29sZG93bik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duID0gdGhpcy5lbmVyZ3lDb29sZG93bk1pbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duVGltZXIgPSB0aGlzLmVuZXJneUNvb2xkb3duO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNob290Q29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob290Q29vbGRvd25UaW1lci0tO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdmVsb2NpdGllcyBiYXNlZCBvbiBncmF2aXR5IGFuZCBmcmljdGlvblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgJiYgdGhpcy55VmVsb2NpdHkgPCB0aGlzLnRlcm1pbmFsVmVsb2NpdHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgICAgICAvL0hlYWx0aCBjaGVja3MgYW5kIHBvc2l0aW9uIGNoZWNrc1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vR09EIE1PREVcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5pc0dvZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5ID0gdGhpcy5tYXhFbmVyZ3k7XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wc0xlZnQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfS8vRU5EIFVwZGF0ZVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMueVZlbG9jaXR5IDwgMCAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHsvL2FzY2VuZGluZ1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAxNSwgMzAsIC0xMCwgLTIwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFzY2VuZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnlWZWxvY2l0eSA+IDAgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7Ly9kZXNjZW5kaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDE1LCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZXNjZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnJ1bm5pbmcgJiYgdGhpcy5hbmltYXRpb24gJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7Ly9ndW5ydW5uaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ndW5ydW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmcgJiYgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQpIHsvL3Nob290aW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg3MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZyAmJiAhdGhpcy5zdGF0ZXMuZ3JvdW5kZWQpIHsvL2FpciBzaG9vdGluZ1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAyMCwgMzUpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWlyc2hvb3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuY2xlYXZpbmcpIHsvL2NsZWF2aW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg4MCwgNjAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5jbGVhdmU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc2xhc2hpbmcpIHsvL3NsYXNoaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg4MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zbGFzaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQpIHsvL2Rhc2hpbmcgc3RhcnRcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRhc2hfc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ01pZCkgey8vZGFzaGluZyBtaWRcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRhc2hfbWlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQpIHsvL2Rhc2hpbmcgZW5kXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kYXNoX2VuZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zdHVubmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zdHVuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRlYWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbiAmJiB0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vVEVSUkFJTiBDT0xMSVNJT05cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiIHx8IG90aGVyLm5hbWUgPT09IFwiU3Bpa2VzXCIpIHtcblxuICAgICAgICAgICAgLy8gSGVybyBhYm92ZSB0ZXJyYWluXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVZlbG9jaXR5ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuanVtcHNMZWZ0ID0gdGhpcy5tYXhKdW1wcztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5qdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIZXJvIGp1bXBzIGludG8gdGVycmFpblxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSGVybyBjb2xsaWRlcyB3aXRoIHRlcnJhaW4gdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIZXJvIGNvbGxpZGVzIHdpdGggdGVycmFpbiB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYIC0gdGhpcy5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGNvbGxpZGluZyB3aXRoICR7b3RoZXIubmFtZX0gZnJvbSAke2RpcmVjdGlvbn1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJMYXZhXCIgJiYgIXRoaXMuc3RhdGVzLmRlYWQgJiYgIXRoaXMuc3RhdGVzLmlzR29kKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodCAtIDU7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgIH1cbiAgICAgICAgLy9JZiBIZXJvIGNhbiB0YWtlIGRhbWFnZSwgY2hlY2sgaWYuLi5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5pc0dvZCAmJiB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPD0gMCAmJiAhdGhpcy5zdGF0ZXMuaW52dWxuZXJhYmxlICYmICF0aGlzLnN0YXRlcy5kZWFkICYmICF0aGlzLnN0YXRlcy5zdHVubmVkKSB7IFxuICAgICAgICAgICAgaWYgKG90aGVyLnBhcmVudENsYXNzID09PSBcIkVuZW15XCIgJiYgb3RoZXIubmFtZSAhPT0gXCJCb21iXCIpIHsgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLmRhbWFnZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9EZXRlcm1pbmUgaW50ZXJhY3Rpb24gYmFzZWQgb24gb3RoZXIncyBkYW1hZ2UgdHlwZVxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXIuZGFtYWdlVHlwZSA9PT0gXCJoZWFsdGhcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9faHVydFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gdGhpcy5kaWZmaWN1bHR5Km90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXQgc3RhdGVzIGFuZCBwdXQgaW50byBzdHVuIGFuaW0gYW5kIHN0dW5sb2NrXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh1cnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGV0ZXJtaW5lIHdoaWNoIHdheSBoZXJvIHNob3VsZCBtb3ZlIGR1cmluZyBzdHVuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3R1bkRpciA9IDE7IH0gZWxzZSB7IHRoaXMuc3R1bkRpciA9IC0xOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54IC0gb3RoZXIueCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCAtIHRoaXMuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvdGhlci5kYW1hZ2VUeXBlID09PSBcImVuZXJneVwiICYmIHRoaXMuZW5lcmd5ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93biA9IHRoaXMuZW5lcmd5Q29vbGRvd25NaW4qMjY7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneSA9IE1hdGguZmxvb3IodGhpcy5lbmVyZ3kvMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJGaXJlYmFsbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9faHVydFwiKVxuICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPSB0aGlzLmRhbWFnZUNvb2xkb3duO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVydCgpO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlci5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdHVuRGlyID0gMTsgfSBlbHNlIHsgdGhpcy5zdHVuRGlyID0gLTE7IH1cbiAgICAgICAgICAgIH0gaWYgKG90aGVyLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gdGhpcy5kaWZmaWN1bHR5Km90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICBvdGhlci5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0dW5EaXIgPSAxOyB9IGVsc2UgeyB0aGlzLnN0dW5EaXIgPSAtMTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiSHVydGJveFwiKSB7XG4gICAgICAgICAgICAgICAgb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgICAgIG90aGVyLmhhc093blByb3BlcnR5KFwiZGFtYWdlXCIpO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlci5pc0VuZW15KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImhlcm9faHVydFwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLmRpZmZpY3VsdHkqb3RoZXIuZGFtYWdlOyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VDb29sZG93blRpbWVyID0gdGhpcy5kYW1hZ2VDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBzdGF0ZXMgYW5kIHB1dCBpbnRvIHN0dW4gYW5pbSBhbmQgc3R1bmxvY2tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3R1bkRpciA9IDE7IH0gZWxzZSB7IHRoaXMuc3R1bkRpciA9IC0xOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKkhFTFBFUiBDTEFTU0VTKioqL1xuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCwgb2ZmWCA9IDAsIG9mZlkgPSAwKSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aCArIDU7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyICsgb2ZmWDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgb2ZmWTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZXMocnVubmluZywganVtcGluZywgc2hvb3RpbmcsIGNsZWF2aW5nLCBmYWNpbmdSaWdodCwgZ3JvdW5kZWQsIHNsYXNoaW5nLCBzaG90bG9ja2VkLCBmcmFtZWxvY2tlZCwgZW5lcmdpemVkLCBkYXNoaW5nLCBoYXNEYXNoZWQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IHJ1bm5pbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLmp1bXBpbmcgPSBqdW1waW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IHNob290aW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5jbGVhdmluZyA9IGNsZWF2aW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhY2luZ1JpZ2h0O1xuICAgICAgICB0aGlzLnN0YXRlcy5ncm91bmRlZCA9IGdyb3VuZGVkO1xuICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZyA9IHNsYXNoaW5nO1xuICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gc2hvdGxvY2tlZDtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmcmFtZWxvY2tlZDtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmdpemVkID0gZW5lcmdpemVkO1xuICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nID0gZGFzaGluZztcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5kYXNoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5kYXNoaW5nU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdNaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlcy5oYXNEYXNoZWQgPSBoYXNEYXNoZWQ7XG4gICAgfVxuXG4gICAgY2xlYXJTdGF0ZXMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRoaXMuc3RhdGVzLmVuZXJnaXplZCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZGVhZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGh1cnQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuc3R1bm5lZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1c2VFbmVyZ3koY29zdCkge1xuICAgICAgICB0aGlzLmVuZXJneSAtPSBjb3N0O1xuICAgICAgICB0aGlzLmVuZXJneURlbGF5VGltZXIgPSB0aGlzLmVuZXJneURlbGF5Q29vbGRvd247XG4gICAgfVxuXG4gICAgcmVzcGF3bigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMucmVzcGF3bmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMubWF4SGVhbHRoO1xuICAgICAgICB0aGlzLmVuZXJneSA9IHRoaXMubWF4RW5lcmd5O1xuICAgICAgICB0aGlzLmdhbWUuZ2FtZWJvYXJkLmxvc3RTY29yZSA9IHRoaXMuZ2FtZS5nYW1lYm9hcmQuc2NvcmUgLyAyO1xuICAgICAgICB0aGlzLmdhbWUuZ2FtZWJvYXJkLnNjb3JlID0gdGhpcy5nYW1lLmdhbWVib2FyZC5sb3N0U2NvcmU7XG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUgKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsIFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksIFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nIChjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVybzsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBBY3RvcixcbiAgICBUZXJyYWluLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG59IGZyb20gXCIuL1wiXG5cblxuLyogRm9yIGNvcHkgcGFzdGUgam9iczpcbnRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy54LCB0aGlzLnksIG9mZlgsIG9mZlksXG4gICAgdGhpcy5zcHJpdGVXaWR0aC8yLCB0aGlzLnNwcml0ZUhlaWdodC8yLCBodXJ0V2lkdGgsIGh1cnRIZWlnaHQsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpOyAgIFxuKi9cblxuY2xhc3MgSHVydGJveCBleHRlbmRzIEFjdG9yIHtcblxuICAgIC8vTm90ZSB0aGF0IGltZyBpcyByZXF1aXJlZCBmb3Igc3VwZXIoKSwgZXZlbiB0aG91Z2ggSHVydGJveCBpcyBuZXZlciBhbmltYXRlZC5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBjdHggPSBudWxsLCB4LCB5LCBvZmZYLCBvZmZZLCBwYXJlbnRXaWR0aCwgcGFyZW50SGVpZ2h0LCBodXJ0V2lkdGgsIGh1cnRIZWlnaHQsIHNjYWxlID0gMyxcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlLCBmYWNpbmdSaWdodCA9IHRydWUsIGlzRW5lbXkgPSBmYWxzZSwgZGFtYWdlVHlwZSA9IFwiaGVhbHRoXCIsIGZyYW1lcyA9IDIsIHBlcnNpc3RlbnQgPSBmYWxzZSwgaW1nID0gbnVsbCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmlzRW5lbXkgPSBpc0VuZW15O1xuICAgICAgICB0aGlzLmRhbWFnZVR5cGUgPSBkYW1hZ2VUeXBlO1xuXG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IGh1cnRXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IGh1cnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5ib3VuZFkgPSB5IC0gdGhpcy5ib3VuZEhlaWdodCArIG9mZlk7XG4gICAgICAgIHRoaXMuYm91bmRYID0geCArIHBhcmVudFdpZHRoICsgdGhpcy5ib3VuZFdpZHRoICsgb2ZmWDtcbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG4gICAgICAgIHRoaXMucGVyc2lzdGVudCA9IHBlcnNpc3RlbnQ7XG5cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL2hpdGJveCBwZXJzaXN0cyBmb3IgdHdvIHRpY2tzLiAodHdvIHByZXZlbnRzIHJhbmRvbSBoaXRib3ggXCJnYXBzXCIpXG4gICAgICAgIGlmICh0aGlzLmZyYW1lcyA8IDApIHtcbiAgICAgICAgICAgIC8vcGVyc2lzdFxuICAgICAgICAgICAgLy9UT0RPOiBGaWd1cmUgb3V0IHdoeSBoaXRib3ggZG9lc24ndCBwZXJzaXN0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmZyYW1lcyA+PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYW1lcy0tO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2xpbmtcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBIdXJ0Ym94OyIsIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFRlcnJhaW59IGZyb20gXCIuL3RlcnJhaW5cIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEVudGl0eX0gZnJvbSBcIi4vZW50aXR5XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBBY3Rvcn0gZnJvbSBcIi4vYWN0b3JcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEVuZW15fSBmcm9tIFwiLi9lbmVteVwiXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBCb21ifSBmcm9tIFwiLi9ib21iXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBCdWxsZXR9IGZyb20gXCIuL2J1bGxldFwiXG5leHBvcnQge2RlZmF1bHQgYXMgQ2FtZXJhfSBmcm9tIFwiLi9jYW1lcmFcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIENyb3d9IGZyb20gXCIuL2Nyb3dcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIERpbm99IGZyb20gXCIuL2Rpbm9cIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEZsYW1lc30gZnJvbSBcIi4vZmxhbWVzXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBHYW1lQm9hcmR9IGZyb20gXCIuL2dhbWUtYm9hcmRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEhhbmR9IGZyb20gXCIuL2hhbmRcIlxuZXhwb3J0IHsgICAgXG4gICAgTGF2YSxcbiAgICBGaXJlYmFsbCxcbiAgICBTcGlrZXMsXG4gICAgUHJvamVjdGlsZUhhemFyZCxcbiAgICBQcm9qZWN0aWxlQ2lyY2xlLFxuICAgIExhdW5jaGVyIH0gZnJvbSBcIi4vaGF6YXJkc1wiXG5leHBvcnQge2RlZmF1bHQgYXMgSGVyb30gZnJvbSBcIi4vaGVyb1wiXG5leHBvcnQge2RlZmF1bHQgYXMgSHVydGJveH0gZnJvbSBcIi4vaHVydGJveFwiXG5leHBvcnQge1xuICAgIEl0ZW0sIFxuICAgIEVuZXJneVBhY2ssIFxuICAgIEhlYWx0aFBhY2sgfSBmcm9tIFwiLi9pdGVtXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBMZW99IGZyb20gXCIuL2xlb1wiXG5leHBvcnQge2RlZmF1bHQgYXMgUHJvamVjdGlsZVN3b3JkfSBmcm9tIFwiLi9wcm9qZWN0aWxlLXN3b3JkXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBQcm9qZWN0aWxlfSBmcm9tIFwiLi9wcm9qZWN0aWxlXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBSZWZsZWN0Ym94fSBmcm9tIFwiLi9yZWZsZWN0Ym94XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBSb2NrZXR9IGZyb20gXCIuL3JvY2tldFwiXG5leHBvcnQge2RlZmF1bHQgYXMgU2hvdGJsYXN0fSBmcm9tIFwiLi9zaG90Ymxhc3RcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFNvbGRpZXJTaGllbGR9IGZyb20gXCIuL3NvbGRpZXItc2hpZWxkXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBUZXJyYWluTW9iaWxlfSBmcm9tIFwiLi90ZXJyYWluLW1vYmlsZVwiXG5cbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVudGl0eSwgXG4gICAgSGF6YXJkcyxcbiAgICBIZXJvLCBcbiAgICBUZXJyYWluXG59IGZyb20gXCIuL1wiICAgIFxuXG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZywgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzY2FsZT0zKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW50aXR5XCI7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5pbWcgPSBpbWc7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gZmFsc2U7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcblxuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnNjYWxlO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnNjYWxlO1xuICAgIH1cblxuICAgIG9uX3BpY2t1cCgpIHt9XG5cbiAgICBkcmF3IChjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54ICsgdGhpcy54T2Zmc2V0LCB0aGlzLnkgKyB0aGlzLnlPZmZzZXQsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUgKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsIFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksIFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQgKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIkhlcm9cIikge1xuICAgICAgICAgICAgdGhpcy5vbl9waWNrdXAob3RoZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIiB8fCBvdGhlci5uYW1lID09PSAgXCJTcGlrZXNcIikge1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLmdyYXZpdHk7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgfVxuXG59XG5cblxuLypcbiAgICBBIGhlYWx0aCBwYWNrIHRoYXQgcmVzdG9yZXMgdGhlIEhlcm8ncyBoZWFsdGhcbiovXG5jbGFzcyBIZWFsdGhQYWNrIGV4dGVuZHMgSXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcsIGN0eCwgd2lkdGgsIGhlaWdodCwgc2NhbGU9MywgaGVhbHRoX3ZhbHVlPTE1KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzY2FsZSk7XG4gICAgICAgIHRoaXMuaGVhbHRoX3ZhbHVlID0gaGVhbHRoX3ZhbHVlOyAgICAgICAgICBcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbMTAsIDhdLCAwLCA0LCA0LCA0LCB0cnVlLCB0aGlzLnNjYWxlLCAwKTtcbiAgICAgICAgdGhpcy54T2Zmc2V0ID0gMTBcbiAgICAgICAgdGhpcy55T2Zmc2V0ID0gLTMwXG4gICAgfVxuXG4gICAgb25fcGlja3VwKGhlcm8pIHtcbiAgICAgICAgaWYgKGhlcm8uaGVhbHRoIDwgaGVyby5tYXhIZWFsdGgpXG4gICAgICAgICAgICBoZXJvLmhlYWx0aCArPSB0aGlzLmhlYWx0aF92YWx1ZTtcbiAgICAgICAgaWYgKGhlcm8uaGVhbHRoID4gaGVyby5tYXhIZWFsdGgpXG4gICAgICAgICAgICBoZXJvLmhlYWx0aCA9IGhlcm8ubWF4SGVhbHRoO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgfVxufVxuXG5cbiAvKlxuICAgIEFuIGVuZXJneSBwYWNrIHRoYXQgcmVzdG9yZXMgdGhlIEhlcm8ncyBlbmVyZ3lcbiovXG5jbGFzcyBFbmVyZ3lQYWNrIGV4dGVuZHMgSXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcsIGN0eCwgd2lkdGgsIGhlaWdodCwgc2NhbGU9MywgZW5lcmd5X3ZhbHVlPTE1KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4LCB3aWR0aCwgaGVpZ2h0LCBzY2FsZSk7XG4gICAgICAgIHRoaXMuZW5lcmd5X3ZhbHVlID0gMTU7ICAgICAgICAgIFxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs4LCA4XSwgMCwgNCwgNCwgNCwgdHJ1ZSwgdGhpcy5zY2FsZSwgMCk7XG4gICAgICAgIHRoaXMueE9mZnNldCA9IDEwO1xuICAgICAgICB0aGlzLnlPZmZzZXQgPSAtMzA7XG4gICAgfVxuXG4gICAgb25fcGlja3VwKGhlcm8pIHtcbiAgICAgICAgaWYoaGVyby5lbmVyZ3kgPCBoZXJvLm1heEVuZXJneSlcbiAgICAgICAgICAgIGhlcm8uZW5lcmd5ICs9IHRoaXMuZW5lcmd5X3ZhbHVlO1xuICAgICAgICBpZiAoaGVyby5lbmVyZ3kgPiBoZXJvLm1heEVuZXJneSlcbiAgICAgICAgICAgIGhlcm8uZW5lcmd5ID0gaGVyby5tYXhFbmVyZ3k7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IEl0ZW0sIEhlYWx0aFBhY2ssIEVuZXJneVBhY2sgfSIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIEVuZW15XG59IGZyb20gXCIuL1wiXG5cbmNsYXNzIExlbyBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSA4MCwgc3ByaXRlSGVpZ2h0ID0gNjApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLm9yaWdYID0geDsgLy8gVE9ETzogZGVtb1xuICAgICAgICB0aGlzLm9yaWdZID0geTsgLy8gVE9ETzogZGVtb1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAxMjtcbiAgICAgICAgdGhpcy5qdW1wU3BlZWQgPSAtMTA7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcbiAgICAgICAgdGhpcy50aW1lclN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgLy9Db250YWlucyBkZXRhaWxlZCBzcHJpdGVzaGVldCBpbmZvOiBbRldpZHRoLCBGSGVpZ2h0LCBSb3csIENvbHVtbiwgRnJhbWVzIChzaGVldCB3aWR0aCldXG4gICAgICAgIHRoaXMuc3ByaW5mbyA9IFsvL2VhY2ggZml2ZS10dXBsZSBpcyBmcm9tIGEgcm93IG9mIHRoZSBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgIFs4MCwgNjAsIDAsIDAsIDddLCBbNTAsIDcwLCAxLCAwLCA1XSxcbiAgICAgICAgICAgIFs3MCwgNzAsIDIsIDAsIDhdLCBbNzAsIDgwLCAzLCAwLCAxMV1cbiAgICAgICAgXTtcblxuICAgICAgICAvL0FjdG9yIFN0YXRlc1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHsgLy9EUzM6IFRoZXNlIHN0YXRlIGFuZCBhbmltYXRpb24gbmFtZXMgYXJlIHRlbnRhdGl2ZS5cbiAgICAgICAgICAgIFwibHVuZ2luZ1wiOiB0cnVlLCAvL3JvdyAwOyAxLTMsIDQtN1xuICAgICAgICAgICAgXCJhdHRhY2tpbmdcIjogZmFsc2UsIC8vcm93IDM7IDctMTBcbiAgICAgICAgICAgIFwiZ3JhcHBsaW5nXCI6IGZhbHNlLCAvL3JvdyAzOyAxLTRcbiAgICAgICAgICAgIFwiZXZhZGluZ1wiOiBmYWxzZSwgLy9yb3cgMTsgMVxuICAgICAgICAgICAgXCJmaXJlbHVuZ2luZ1wiOiBmYWxzZSwgLy9yb3cgMjsgMS0yLCAzLTYsIDctOFxuICAgICAgICAgICAgXCJkZW1vbG9vcFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImx1bmdlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs4MCwgNjBdLCAwLCA3LCA3LCA3LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcImF0dGFja1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNzAsIDgwXSwgMywgMTEsIDcsIDExLCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcImZpcmVsdW5nZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNzAsIDcwXSwgMiwgOCwgNywgOCwgZmFsc2UsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJpZGxlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs4MCwgNjBdLCAzLCAxMSwgMTAwLCAxLCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMubHVuZ2U7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZGVtb2xvb3ApIHtcbiAgICAgICAgICAgIC8vbHVuZ2UgKHNob3VsZGVyIHNsYW0pXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMubHVuZ2luZyAmJiAhdGhpcy5zdGF0ZXMuYXR0YWNraW5nICYmIHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA4MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID4gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubHVuZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gNDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvL2dyYXBwbGUvc2xhbSAoc2hvdWxkZXIgc2xhbSlcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnN0YXRlcy5sdW5naW5nICYmIHRoaXMuc3RhdGVzLmF0dGFja2luZyAmJiB0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNzA7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDgwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5maXJlbHVuZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXJTdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSAzMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vL2ZpcmUgbHVuZ2VcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmlyZWx1bmdlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNzA7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDcwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+IDIgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPCA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLm9yaWdYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLm9yaWdZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5maXJlbHVuZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9TYW1lIGFzIGFib3ZlLCBidXQgbm90IGluIFwiZGVtb1wiIGZvcm0uXG4gICAgICAgIC8vZWxzZSBpZiAodGhpcy5zdGF0ZXMubHVuZ2luZyAmJiAhdGhpcy5zdGF0ZXMuYXR0YWNraW5nICYmIHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgIC8vICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gODA7XG4gICAgICAgIC8vICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgLy8gICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSA+IDMpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZXMubHVuZ2luZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMueSAtPSA0MDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIGlmICghdGhpcy5zdGF0ZXMubHVuZ2luZyAmJiB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVXaWR0aCA9IDgwO1xuICAgICAgICAvLyAgICAvL1RoaXMgd2lsbCBwb3RlbnRpYWxseSBiZSB1c2VkIHRvIGZsYWcgZGlmZmVyZW50IGxldmVscyBvZiBcInZ1bG5lcmFiaWxpdHlcIiAoZXg6IGNvdW50ZXJhYmxlKVxuICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImF0dGFja2luZ1wiKTtcbiAgICAgICAgLy99XG4gICAgICAgIC8vZWxzZSBpZiAodGhpcy5zdGF0ZXMuZmlyZWx1bmdpbmcpIHtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVXaWR0aCA9IDcwO1xuICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPiAyICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDwgNSkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uZWxhcHNlZFRpbWUgPj0gdGhpcy5hbmltYXRpb24udG90YWxUaW1lIC0gMSkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgLy8gICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy99XG4gICAgICAgIC8vZWxzZSB7XG4gICAgICAgIC8vICAgICAgICBpZiAoLyp0aGlzLmFuaW1hdGlvbi5pc0RvbmUqLzEpIHtcbiAgICAgICAgLy8gICAgICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICAgICB0aGlzLnggPSB0aGlzLm9yaWdYO1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMueSA9IHRoaXMub3JpZ1k7XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vfVxuXG4gICAgfTtcblxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmx1bmdpbmcgJiYgIXRoaXMuc3RhdGVzLmF0dGFja2luZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMubHVuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuYXR0YWNraW5nICYmICF0aGlzLnN0YXRlcy5sdW5naW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hdHRhY2s7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZmlyZWx1bmdpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZpcmVsdW5nZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYW5pbWF0aW9uIGRvZXMgbm90IGV4aXN0XCIsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSh0aGlzLmNsb2NrVGljaywgY3R4LCB0aGlzLngsIHRoaXMueSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGVvO1xuXG5cblxuXG4iLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBBY3RvcixcbiAgICBCdWxsZXQsXG4gICAgVGVycmFpbixcbiAgICBIdXJ0Ym94LFxufSBmcm9tIFwiLi9cIlxuXG5cbmNsYXNzIFByb2plY3RpbGVfU3dvcmQgZXh0ZW5kcyBBY3RvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIGZhY2luZ1JpZ2h0LCBzcHJpdGVXaWR0aCA9IDkwLCBzcHJpdGVIZWlnaHQgPSA2MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDEwO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHsgdGhpcy54ICs9IDk1OyB9IGVsc2UgeyB0aGlzLnggLT0gOTUgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gMDsgLy8xODBcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDA7IC8vMTIwXG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1O1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE1MDtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcInN0YXJ0aW5nXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YWJsaXplZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVjb3ZlcmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJzdGFydFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA0LCAxOCwgNywgMiwgZmFsc2UsIHRoaXMuc2NhbGUsIDExKSxcbiAgICAgICAgICAgIFwic3RhYmxlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDQsIDE4LCA3LCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMyksXG4gICAgICAgICAgICBcInJlY292ZXJ5XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDQsIDE4LCA3LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTQpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zdGFydDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vVE9ET1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFydGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlY292ZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMucmVjb3ZlcmluZykgey8vSHVydGJveCAgYWN0aXZlIHVubGVzcyBpbiByZWNvdmVyeSBmcmFtZXNcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgIHZhciBodXJ0Ym94ID0gbmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtMTAwIC0gODAgLSA0MCwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDE3MCwgOTAsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgICAgICAgICAgaHVydGJveC5wYXJlbnQgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShodXJ0Ym94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBodXJ0Ym94ID0gbmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtMTAwIC0gMTUwIC0gMjAwIC0gMTUsIDAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCAxNzAsIDkwLCB0aGlzLnNjYWxlLCB0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICAgICAgICAgIGh1cnRib3gucGFyZW50ID0gdGhpcy5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkoaHVydGJveCk7ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhcnRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFibGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YWJsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5yZWNvdmVyeTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICAvL2NvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAvLyAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiVGVycmFpblwiKSB7XG4gICAgLy8gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAvLyAgICB9XG4gICAgLy8gICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gIFwiQnVsbGV0XCIpIHtcbiAgICAvLyAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgIC8vICAgIH1cbiAgICAvLyAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgIC8vICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgLy8gICAgfVxuICAgIC8vfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlX1N3b3JkOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuQWN0b3IsIFxuQnVsbGV0LCBcbkVuZW15LCBcblRlcnJhaW5cbn0gZnJvbSBcIi4vXCJcblxuY2xhc3MgUHJvamVjdGlsZSBleHRlbmRzIEFjdG9yIHtcblxuICAgIC8vQWRkZWQgZW5lcmdpemVkIChCRUZPUkUgRElNRU5TSU9OUykgdG8gY2hvb3NlIGNvcnJlY3QgcHJvamVjdGlsZVxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIGVuZXJnaXplZCwgc3ByaXRlV2lkdGggPSA2MCwgc3ByaXRlSGVpZ2h0ID0gNjApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJBY3RvclwiO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAxMztcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7IHRoaXMueCArPSAxMDA7IH0gZWxzZSB7IHRoaXMueCAtPSAxMDAgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gNTA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSA1MDtcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDEwMDsgLy8rMTAwIGFsaWducyB3aXRoIHRoZSBndW5cbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCAtIDEwKTsgLy8gdGhlIC0xMCBvZmZzZXQgYWNjb3VudHMgZm9yIHRoZSBcInBhZGRpbmdcIiBJIGFkZGVkIHRvIGVhY2ggZnJhbWUgaW4gdGhlIHNwcml0ZSBzaGVldFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMikgLSAxMDA7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgLSAodGhpcy5zcHJpdGVIZWlnaHQgLSAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIGlmIChlbmVyZ2l6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gMjAwO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSAyO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMTdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gNTA7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImdyZWVuXCI6ICFlbmVyZ2l6ZWQsXG4gICAgICAgICAgICBcImJsdWVcIjogZW5lcmdpemVkLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhYmxpemVkXCI6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImdyZWVuX2V4aXRpbmdcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgMywgMTUsIDYsIDgsIGZhbHNlLCB0aGlzLnNjYWxlLCA0KSxcbiAgICAgICAgICAgIFwiZ3JlZW5fc3RhYmxlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDMsIDE1LCA2LCA0LCB0cnVlLCB0aGlzLnNjYWxlLCAxMSksXG4gICAgICAgICAgICBcImJsdWVfZXhpdGluZ1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAzLCAyMywgNiwgOCwgZmFsc2UsIHRoaXMuc2NhbGUsIDE1KSxcbiAgICAgICAgICAgIFwiYmx1ZV9zdGFibGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgMywgMjMsIDYsIDMsIHRydWUsIHRoaXMuc2NhbGUsIDIwKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmdyZWVuKSB7IHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmdyZWVuX2V4aXRpbmc7IH0gZWxzZSB7IHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmJsdWVfZXhpdGluZzsgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFibGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnN0YWJsaXplZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFibGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZ3JlZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ncmVlbl9leGl0aW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YWJsaXplZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmdyZWVuX3N0YWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmJsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ibHVlX2V4aXRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYmx1ZV9zdGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qQ09MTElTSU9OKi9cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7IC8vY29tbWVudGVkIGlzIGZvciBldmVudHVhbCBpbXBsZW1lbnRhdGlvbiBvZiBwcm9qZWN0aWxlIFwiYXJtb3JcIi90b3VnaG5lc3MuXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2Vsc2UgaWYgKG90aGVyLm5hbWUgPT09ICBcIkJ1bGxldFwiKSB7XG4gICAgICAgIC8vICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgLy99XG4gICAgICAgIGVsc2UgaWYgKG90aGVyLnBhcmVudENsYXNzID09PSAgXCJFbmVteVwiKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy9pZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAvLyAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIC8vfSBcbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGU7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG4gICAgQWN0b3IsXG4gICAgVGVycmFpbixcbiAgICBFbmVteSxcbiAgICBIZXJvLFxufSBmcm9tIFwiLi9cIlxuXG5cbi8qIEZvciBjb3B5IHBhc3RlIGpvYnM6XG4gICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLngsIHRoaXMueSwgb2ZmWCwgb2ZmWSxcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aC8yLCB0aGlzLnNwcml0ZUhlaWdodC8yLCBodXJ0V2lkdGgsIGh1cnRIZWlnaHQsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpOyAgIFxuICovXG5jbGFzcyBSZWZsZWN0Ym94IGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgLy9Ob3RlIHRoYXQgaW1nIGlzIHJlcXVpcmVkIGZvciBzdXBlcigpLCBldmVuIHRob3VnaCBSZWZsZWN0Ym94IGlzIG5ldmVyIGFuaW1hdGVkLlxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCA9IG51bGwsIHgsIHksIG9mZlgsIG9mZlksIHBhcmVudFdpZHRoLCBwYXJlbnRIZWlnaHQsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCA9IHRydWUsIHBhcmVudCA9IG51bGwsIGZyYW1lcyA9IDIsIGltZyA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJBY3RvclwiO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG5cbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gaHVydFdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gaHVydEhlaWdodDtcblxuICAgICAgICB0aGlzLmJvdW5kWSA9IHkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgb2ZmWTtcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHggKyBwYXJlbnRXaWR0aCArIHRoaXMuYm91bmRXaWR0aCArIG9mZlg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHggLSB0aGlzLmJvdW5kV2lkdGggLSBvZmZYO1xuICAgICAgICB9XG4gICAgICAgIC8vU3RhdHNcblxuICAgICAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9oaXRib3ggcGVyc2lzdHMgZm9yIHR3byB0aWNrcy4gKHR3byBwcmV2ZW50cyByYW5kb20gaGl0Ym94IFwiZ2Fwc1wiKVxuICAgICAgICBpZiAodGhpcy5mcmFtZXMgPj0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mcmFtZXMtLTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkJ1bGxldFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNVQ0NFU1MhXCIpXG4gICAgICAgICAgICAvL290aGVyLnN0YXRlcy5mYWNpbmdSaWdodCA9ICFvdGhlci5zdGF0ZXMuZmFjaW5nUmlnaHQ7XG4gICAgICAgICAgICAvL290aGVyLm5hbWUgPSBcIlByb2plY3RpbGVcIjtcbiAgICAgICAgICAgIC8vb3RoZXIuZGFtYWdlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJSb2NrZXRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOTyBTT1VQIEZPUiBZT1UhXCIpO1xuICAgICAgICAgICAgb3RoZXIucG9pbnRWYWx1ZSA9IDU7XG4gICAgICAgICAgICBvdGhlci5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnBhcmVudC5lbmVyZ3kgKz0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW5lcmd5Q29vbGRvd24gLz0gNC4yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkJvbWJcIikge1xuICAgICAgICAgICAgb3RoZXIueFZlbG9jaXR5ID0gLXRoaXMuZmFjaW5nICogNTtcbiAgICAgICAgICAgIG90aGVyLnlWZWxvY2l0eSA9IC0yMDtcbiAgICAgICAgICAgIG90aGVyLmRhbWFnZSA9IDUwO1xuICAgICAgICAgICAgb3RoZXIuc3RhdGVzLnJlZmxlY3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInllbGxvd1wiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUmVmbGVjdGJveDsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBBY3RvcixcbiAgICBFbmVteSxcbiAgICBIZXJvLFxuICAgIFByb2plY3RpbGUsXG4gICAgVGVycmFpblxufSBmcm9tIFwiLi9cIlxuXG5cbmNsYXNzIFJvY2tldCBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIHNwcml0ZVdpZHRoID0gNTAsIHNwcml0ZUhlaWdodCA9IDUwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnlTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMubWF4WCA9IDg7XG4gICAgICAgIHRoaXMubWF4WSA9IDQ7XG4gICAgICAgIHRoaXMueEFjY2VsID0gLjQ7XG4gICAgICAgIHRoaXMueUFjY2VsID0gLjE3O1xuICAgICAgICB0aGlzLnkgLT0gNzBcbiAgICAgICAgaWYgKCFmYWNpbmdSaWdodCkgeyB0aGlzLnggLT0gMTAwOyB9IGVsc2UgeyB0aGlzLnggKz0gMTAwIH07Ly9vZmZzZXQgdG8gbWF0Y2ggZ3VuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDMwO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMzA7XG4gICAgICAgIGlmIChmYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMikgKyAxMjA7IC8vKzEwMCBhbGlnbnMgd2l0aCB0aGUgZ3VuXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgLSAodGhpcy5zcHJpdGVIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMikgKyAyICogdGhpcy5zcHJpdGVXaWR0aCAtIDE4MDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMuZGFtYWdlVHlwZSA9IFwiZW5lcmd5XCI7XG4gICAgICAgIHRoaXMuZHJhaW5UaW1lID0gMTIwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDI7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gNTA7XG4gICAgICAgIHRoaXMuYm91bmNlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmJvdW5jZVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5ib3VuY2VUaW1lID0gMzU7XG4gICAgICAgIHRoaXMudGltZXIgPSA1MDA7XG4gICAgICAgIHRoaXMuc2FmZVRpbWVyID0gMDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcInJvY2tldFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDYwXSwgNiwgMjAsIDUsIDcsIHRydWUsIHRoaXMuc2NhbGUsIDEzKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMucm9ja2V0O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5mYWNpbmcgPSAxOyB9IGVsc2UgeyB0aGlzLmZhY2luZyA9IC0xO31cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vVE9ET1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ICYmIHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgJiYgdGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7Ly9UT0RPIFRyYWNraW5nIGJlaGF2aW9yXG4gICAgICAgICAgICBpZiAoKHRoaXMueFNwZWVkIDwgdGhpcy5tYXhYICYmIHRoaXMuZmFjaW5nID09PSAxKSB8fCAodGhpcy54U3BlZWQgPiAtdGhpcy5tYXhYICYmIHRoaXMuZmFjaW5nID09PSAtMSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmZhY2luZyAqIHRoaXMueEFjY2VsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMueFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSA+PSAwKSB7Ly8gYmVsb3cgaGVybztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U3BlZWQgPiAtdGhpcy5tYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNwZWVkIC09IHRoaXMueUFjY2VsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsvLyBhYm92ZSBoZXJvXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVNwZWVkIDwgdGhpcy5tYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNwZWVkICs9IHRoaXMueUFjY2VsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55U3BlZWQ7Ly8gKyBNYXRoLmZsb29yKE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIC8gMzAwKSAqIDEuNTtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDsvLyArIE1hdGguZmxvb3IoTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgLyAzMDApICogMS41O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMTUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmJvdW5jZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmNlVGltZXItLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5yb2NrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIgJiYgdGhpcy5hbmltYXRpb24ubG9vcHMgPiAzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiSGVyb1wiKSB7XG4gICAgICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJIZXJvXCIgJiYgb3RoZXIuc3RhdGVzLmludnVsbmVyYWJsZSkge1xuICAgICAgICAgICAgICAgIC8va2VlcCBvbiB0aGUgbWFwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIgJiYgIW90aGVyLmlzRW5lbXkgJiYgdGhpcy5nYW1lLmhlcm8uc3RhdGVzLnNsYXNoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWluVGltZSArPSAxMDtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gLXRoaXMuZmFjaW5nICogdGhpcy5tYXhYICogMjtcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpICogMTAwIDwgNTApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlTcGVlZCA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9pZiAodGhpcy5ib3VuY2VDb3VudCA+IDMpIHtcbiAgICAgICAgICAgIC8vICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmNlVGltZXIgPSB0aGlzLmJvdW5jZVRpbWU7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmJvdW5jZUNvdW50Kys7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIgJiYgb3RoZXIuc3RhdGVzLmJsdWUpIHx8IG90aGVyLnBhcmVudCA9PT0gXCJQcm9qZWN0aWxlX1N3b3JkXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGggKyA1O1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJIZWlnaHQ7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9ja2V0OyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge0FjdG9yfSBmcm9tIFwiLi9cIlxuXG5jbGFzcyBTaG90Ymxhc3QgZXh0ZW5kcyBBY3RvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIGZhY2luZ1JpZ2h0LCBzcHJpdGVXaWR0aCA9IDUwLCBzcHJpdGVIZWlnaHQgPSA1MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDc7XG4gICAgICAgIGlmIChmYWNpbmdSaWdodCkgeyB0aGlzLnggKz0gMTAwOyB9IGVsc2UgeyB0aGlzLnggLT0gMTAwIH07Ly9vZmZzZXQgdG8gbWF0Y2ggZ3VuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSAwO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG5cbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gNTAwO1xuXG4gICAgICAgIC8vU3RhdHNcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcInNob3RibGFzdFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDE4LCA0LCA2LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTApLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG90Ymxhc3Q7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL1RPRE9cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2hvdGJsYXN0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hvdGJsYXN0OyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEJ1bGxldCxcbiAgICBFbmVteSxcbiAgICBUZXJyYWluLFxuICAgIFByb2plY3RpbGUsXG4gICAgSHVydGJveCxcbiAgICBTaG90Ymxhc3Rcbn0gZnJvbSBcIi4vXCJcblxuXG4vL1RPRE8gKGxvbmcgdGVybSk6IEFMTCBBQ1RPUlMgLSBcIkNoZWNrIGlmIGluIHJhbmdlXCIgaGVscGVyIGZ1bmN0aW9uXG5jbGFzcyBTb2xkaWVyX1NoaWVsZCBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNTApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSA3O1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDQ1O1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDQ1O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgKHRoaXMuc3ByaXRlSGVpZ2h0IC8gMiAtIDEwKTtcbiAgICAgICAgLy90aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDM4LCA0MCk7XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLnBvaW50VmFsdWUgPSAzMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuXG4gICAgICAgIC8vIEJlaGF2aW9yIHBhcmFtZXRlcnNcbiAgICAgICAgdGhpcy5ydW5Qcm9iID0gNTtcbiAgICAgICAgdGhpcy5ydW5Bd2F5Q29vbGRvd24gPSAyNTA7XG4gICAgICAgIHRoaXMucnVuQXdheUNvb2xkb3duVGltZXIgPSAwO1xuICAgICAgICB0aGlzLnJ1bkF3YXlUaW1lID0gNzU7XG4gICAgICAgIHRoaXMucnVuQXdheVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1swXSA9IDEwMDA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMV0gPSAzNTA7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBmYWxzZSwgLy9jdXJyZW50bHkgdW51c2VkXG4gICAgICAgICAgICBcImlkbGluZ1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJydW5uaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzaG9vdGluZ19zdGFydHVwXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzaG9vdGluZ19hY3RpdmVcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNob290aW5nX3JlY292ZXJcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1Nob3RcIjogZmFsc2UsXG4gICAgICAgICAgICBcInNsYXNoaW5nX3N0YXJ0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzbGFzaGluZ19lbmRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImJsb2NraW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJ0dXJuaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmcmFtZWxvY2tlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsXG4gICAgICAgICAgICBcInJ1bm5pbmdBd2F5XCI6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImlkbGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAwLCAxNSwgNSwgNiwgdHJ1ZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcInR1cm5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAwLCAxNSwgMywgNSwgZmFsc2UsIHRoaXMuc2NhbGUsIDYpLFxuICAgICAgICAgICAgXCJibG9ja1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDE1LCA5LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTEpLFxuICAgICAgICAgICAgXCJydW5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAxLCAxMiwgMywgMTIsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJzaG9vdF9zdGFydHVwXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTgsIDIsIDUsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwic2hvb3RfYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTgsIDQsIDUsIGZhbHNlLCB0aGlzLnNjYWxlLCA1KSxcbiAgICAgICAgICAgIFwic2hvb3RfcmVjb3ZlclwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDE4LCA0LCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA5KSxcbiAgICAgICAgICAgIFwic2xhc2hfc3RhcnRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzEwMCwgNjBdLCAzLCAxNiwgMiwgOSwgZmFsc2UsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJzbGFzaF9lbmRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzEwMCwgNjBdLCAzLCAxNiwgMywgNywgZmFsc2UsIHRoaXMuc2NhbGUsIDkpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgIH1cblxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPD0gdGhpcy5zaWdodFJhZGl1c1sxXSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvKioqKiBCRUdJTiBCRUhBVklPUiBDT0RFICoqKiovXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIC8vaWRsaW5nIC0gVGhpcyBpcyB3aGVyZSBtb3N0IGJlaGF2aW9yIHdpbGwgc3RhcnQsIGFuZCBtb3N0IHdpbGwgcmV0dXJuLlxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZyAmJiAhdGhpcy5zdGF0ZXMucnVubmluZ0F3YXlcbiAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8IHRoaXMuc2lnaHRSYWRpdXNbMF1cbiAgICAgICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8IHRoaXMuc2lnaHRSYWRpdXNbMV0pIHtcbiAgICAgICAgICAgICAgICAvL0ZhY2UgRW5lbXlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmhlcm8ueCA+IHRoaXMueCAmJiAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgJiYgIXRoaXMuc3RhdGVzLmJsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lLmhlcm8ueCA8IHRoaXMueCAmJiB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCAmJiAhdGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudHVybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1NsYXNoIHdoZW4gaW4gcmFuZ2VcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gMjUwICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDwgNTBcbiAgICAgICAgICAgICAgICAgICAgJiYgTWF0aC5yYW5kb20oKSAqIDEwMCA8PSA1ICYmIHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMSkgeyAvL2FkZGVkIHJhbmRvbSBhY3RpdmF0aW9uIGFzIGEgdGVzdC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2xhc2hpbmdfc3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IDIwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2hvb3Qgd2hlbiBpbiByYW5nZVxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA+PSAyMDBcbiAgICAgICAgICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gMTAwMFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFuaW1hdGlvbi5sb29wcyA+PSAzKSB7IC8vc2hvdCBjb29sZG93biBiYXNlZCBvbiBpZGxlIHRpbWUgKG1lYXN1cmVkIGJ5IGFuaW1hdGlvbiBsb29wcylcblxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gNjAwXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLnJhbmRvbSgpICogMTAgPD0gdGhpcy5ydW5Qcm9iXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnJ1bkF3YXlDb29sZG93blRpbWVyID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicnVubmluZyBhd2F5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Qcm9iIC09IDIuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuQXdheVRpbWVyID0gdGhpcy5ydW5Bd2F5VGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuQXdheUNvb2xkb3duVGltZXIgPSB0aGlzLnJ1bkF3YXlDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmdBd2F5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudHVybmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLyoqKiogVVBEQVRFIEJFSEFWSU9SIFBBUkFNUyAqKioqL1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ydW5Bd2F5Q29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5Bd2F5Q29vbGRvd25UaW1lciAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ydW5Bd2F5VGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVuQXdheVRpbWVyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqKiogRU5EIEJFSEFWSU9SIENPREUgKioqKi9cblxuICAgICAgICAgICAgLy9SdW4gQXdheSBSb3V0aW5lXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucnVubmluZ0F3YXkgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXAgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nX2FjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmdfcmVjb3Zlcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkF3YXlUaW1lciA9PSB0aGlzLnJ1bkF3YXlUaW1lIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucnVuQXdheVRpbWVyID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZ0F3YXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ydW5Bd2F5VGltZXIgPiAwICYmICF0aGlzLnN0YXRlcy50dXJuaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5ydW5uaW5nKSB7IC8vcnVubmluZ1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLmZhY2luZyAqIHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLmZhY2luZyAqIHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCkgeyAvL3Nob290aW5nIHN0YXJ0OiB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDM4LCA0MCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlKSB7IC8vc2hvb3RpbmcgYWN0aXZlXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5oYXNTaG90KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJlbmVteV9zaG9vdFwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBTaG90Ymxhc3QodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBCdWxsZXQodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNTaG90ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNTaG90ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zdGF0ZXMuc2hvb3RpbmdfcmVjb3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMucnVubmluZ0F3YXkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyKSB7IFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmdfcmVjb3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLnJ1bm5pbmdBd2F5KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2xhc2hpbmdfc3RhcnQgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkKSB7IC8vc2xhc2hpbmcgc3RhcnRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPT09IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIDUsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNzAsIDEwMCwgdGhpcy5zY2FsZSwgMip0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC02MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAyKjY1LCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDcwLCAxMDAsIHRoaXMuc2NhbGUsIDIqdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZ19zdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zbGFzaGluZ19lbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZ19lbmQpIHsgLy9zbGFzaGluZyBlbmRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPj0gMCAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCA1LCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDcwLCAxMDAsIHRoaXMuc2NhbGUsIDIqdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAgLSB0aGlzLnNwcml0ZVdpZHRoIC0gMio2NSwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA3MCwgMTAwLCB0aGlzLnNjYWxlLCAyKnRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2xhc2hpbmdfZW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5ibG9ja2luZykgeyAvL2Jsb2NraW5nXG4gICAgICAgICAgICAgICAgLy8gYSBsaXR0bGUga25vY2tiYWNrXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSBmYWxzZTsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnR1cm5pbmcpIHsgLy90dXJuaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyAqPSAtMTsgLy9zZWUgYWJvdmUgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgKz0gdGhpcy5ncmF2aXR5ICogdGhpcy5ncmF2aXR5O1xuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbG9jaXR5O1xuICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlWZWxvY2l0eTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIDEwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCA1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJ1bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIDUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2hvb3Rfc3RhcnR1cDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdF9hY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX3JlY292ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCA1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob290X3JlY292ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNsYXNoaW5nX3N0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCgxMDAsIDYwLCAyNSwgMzUsIC0xNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zbGFzaF9zdGFydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2xhc2hpbmdfZW5kKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCgxMDAsIDYwLCAyNSwgMzUsIC0xNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zbGFzaF9lbmQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmJsb2NraW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgLTEwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmJsb2NrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy50dXJuaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgLTEwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgLy91c2VkIHRvIGVhc2lseSB1cGRhdGUgaGl0Ym94IGJhc2VkIG9uIHN0YXRlL2FuaW1hdGlvblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCwgb2ZmWCwgb2ZmWSkge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyICsgdGhpcy5mYWNpbmcqb2ZmWDtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgKGZIZWlnaHQgLyAyIC0gMTApO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0xMDsgLy9maXggbWFnaWMgbnVtYmVyIChkcmF3biBzbGlnaHRseSBiZWxvdyBoaXRib3ggd2l0aG91dCB0aGUgMjAgb2Zmc2V0KVxuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBzTGVmdCA9IHRoaXMubWF4SnVtcHM7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuanVtcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggLSB0aGlzLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgLy8gYmxvY2tpbmcgZnJvbSBsZWZ0ICYgcmlnaHRcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcgfHwgdGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDAgJiYgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQvKmRpcmVjdGlvbiA9PSAnbGVmdCcgJiYgb3RoZXIueCA8IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJzaGllbGRfYmxvY2tcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA+IDAgJiYgIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ3JpZ2h0JyAmJiBvdGhlci54ID4gdGhpcy54Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcInNoaWVsZF9ibG9ja1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiZW5lbXlfaHVydF8xXCIpXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYmxvb2Qgb3Igc29tZXRoaW5nIGdvZXMgaGVyZVxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZS5hZGRFbnRpdHkoLi4uKVxuICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VQ0ghXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIkh1cnRib3hcIikge1xuICAgICAgICAgICAgLy8gYmxvY2tpbmcgZnJvbSBsZWZ0ICYgcmlnaHRcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIGlmIChvdGhlci5wYXJlbnQgPT09IFwiQm9tYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcgfHwgdGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnggLSBvdGhlci54IDwgMCAmJiB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdsZWZ0JyAmJiBvdGhlci54IDwgdGhpcy54Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnggLSBvdGhlci54ID4gMCAmJiAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQvKmRpcmVjdGlvbiA9PSAncmlnaHQnICYmIG90aGVyLnggPiB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VQ0ghXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VQ0ghXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcgfHwgdGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCAmJiB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdsZWZ0JyAmJiBvdGhlci54IDwgdGhpcy54Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54ID4gMCAmJiAhdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQvKmRpcmVjdGlvbiA9PSAncmlnaHQnICYmIG90aGVyLnggPiB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VQ0ghXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VQ0ghXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTb2xkaWVyX1NoaWVsZDsiLCIvL3dpbGwgcmV0dXJuIG11bHRpcGxlIGRpZmZlcmVudCBzdWJ0eXBlcyBvZiBtb3ZpbmcgcGxhdGZvcm1zXG5pbXBvcnQge1RlcnJhaW59IGZyb20gXCIuL1wiXG5cbmNsYXNzIFRlcnJhaW5Nb2JpbGUgZXh0ZW5kcyBUZXJyYWluIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBkaW1lbnNpb25zLCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIHRpbGVzID0gbnVsbCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCwgXCJUZXJyYWluXCIpO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy50aWxlcyA9IHRpbGVzO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3JjX3dpZHRoID0gZGltZW5zaW9uc1swXTtcbiAgICAgICAgdGhpcy5zcmNfaGVpZ2h0ID0gZGltZW5zaW9uc1sxXTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLng7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55ICsgNjtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gOTY7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSA5NjtcbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMueCwgdGhpcy55LFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMudGlsZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sID0gdGhpcy50aWxlc1swXVxuICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLnRpbGVzWzFdXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZyxcbiAgICAgICAgICAgICAgICAgICAgKGNvbCAqIHRoaXMuc3JjX3dpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgKHJvdyAqIHRoaXMuc3JjX2hlaWdodCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY19oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCwgdGhpcy55LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCAqIDMsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX2hlaWdodCAqIDNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIH1cbn0gLy8gZW5kIFRlcnJhaW5cblxuZXhwb3J0IGRlZmF1bHQgVGVycmFpbk1vYmlsZTtcblxuIiwiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIlxuXG5jbGFzcyBUZXJyYWluIGV4dGVuZHMgRW50aXR5IHtcbiAgICAgY29uc3RydWN0b3IgKGdhbWUsIHgsIHksIGRpbWVuc2lvbnMsIGltZz1udWxsLCBjdHg9bnVsbCwgc2NhbGU9bnVsbCwgdGlsZXM9bnVsbCwgYm91bmRzID0gWzAsIDAsIDAsIDBdKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW50aXR5XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiVGVycmFpblwiO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy50aWxlcyA9IHRpbGVzO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3JjX3dpZHRoID0gZGltZW5zaW9uc1swXTtcbiAgICAgICAgdGhpcy5zcmNfaGVpZ2h0ID0gZGltZW5zaW9uc1sxXTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLnggKyBib3VuZHNbMl07XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55ICsgYm91bmRzWzNdO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYm91bmRzWzBdO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJvdW5kc1sxXTtcbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZSAoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMudGlsZXMgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbCA9IHRoaXMudGlsZXNbMF1cbiAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLnRpbGVzWzFdXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLCBcbiAgICAgICAgICAgICAgICAoY29sICogdGhpcy5zcmNfd2lkdGgpLFxuICAgICAgICAgICAgICAgIChyb3cgKiB0aGlzLnNyY19oZWlnaHQpLFxuICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuc3JjX2hlaWdodCwgXG4gICAgICAgICAgICAgICAgdGhpcy54LCB0aGlzLnksXG4gICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGgqMywgXG4gICAgICAgICAgICAgICAgdGhpcy5zcmNfaGVpZ2h0KjMgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlICgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG5cbiAgICB9XG59IC8vIGVuZCBUZXJyYWluXG5cbmV4cG9ydCBkZWZhdWx0IFRlcnJhaW47XG4iLCJpbXBvcnQgQXNzZXRNYW5hZ2VyIGZyb20gXCIuL2Fzc2V0LW1hbmFnZXJcIlxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vZW50aXRpZXMvaGVyb1wiXG5pbXBvcnQgSHVkIGZyb20gXCIuL2h1ZFwiXG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tIFwiLi9iYWNrZ3JvdW5kXCJcbmltcG9ydCBTb3VuZCBmcm9tIFwiLi9zb3VuZFwiXG5cblxuIC8qKioqKioqKioqKioqKipcbkdhbWVFbmdpbmUgY2xhc3NcbioqKioqKioqKioqKioqKiovXG5jbGFzcyBHYW1lRW5naW5lIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVib2FyZCwgaGVybykge1xuICAgICAgICB0aGlzLmRyYXdCb3hlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRldk1vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNvdW5kID0gbmV3IFNvdW5kKCk7XG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzID0gW107XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IG51bGw7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jbGljayA9IG51bGw7XG4gICAgICAgIHRoaXMubW91c2UgPSBudWxsO1xuICAgICAgICB0aGlzLndoZWVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdXJmYWNlV2lkdGggPSBudWxsO1xuICAgICAgICB0aGlzLnN1cmZhY2VIZWlnaHQgPSBudWxsO1xuICAgICAgICB0aGlzLm11c2ljID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZGRlZHBvaW50cyA9IDA7XG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IFwiTm9ybWFsIChCdXQgS2luZGEgRWFzeSlcIjtcblxuICAgICAgICAvL0RFViBUT09MIEZJRUxEU1xuICAgICAgICB0aGlzLnRvZ2dsZUNvb2xkb3duPSAyMDtcbiAgICAgICAgdGhpcy5ib3hUb2dnbGVUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuc2V0UG9zVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmdvZFRvZ2dsZVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5jaGVja3BvaW50Q3ljbGVDb3VudCA9IDE7XG5cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duID0gMDtcbiAgICAgICAgdGhpcy5wYXVzZUdlbmVyYWwgPSA0MDtcbiAgICAgICAgdGhpcy5wYXVzZUxheW91dEEgPSAzNTA7XG4gICAgICAgIHRoaXMucGF1c2VMYXlvdXRCID0gMzUwO1xuICAgICAgICB0aGlzLnBhdXNlRmxhdm9yWCA9IDgwMDtcbiAgICAgICAgdGhpcy5wYXVzZUZsYXZvclkgPSAyNTA7XG5cbiAgICAgICAgLy8gS0IgaW5wdXQga2V5Y29kZXNcbiAgICAgICAgdGhpcy5jb250cm9sS2V5cyA9IHtcbiAgICAgICAgICAgIFwiU3BhY2VcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlXXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5U1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleURcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlBXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5UlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUZcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlHXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5RVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUpcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlLXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5TFwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleU1cIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlQXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5VFwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVlcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlWXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5Q1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIkVudGVyXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkMVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDJcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQzXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkNFwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDVcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQ2XCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkOVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgIH1cbiAgICAgICAgLy8gY29udHJvbCBtYXBwaW5nXG4gICAgICAgIHRoaXMuY29udHJvbExheW91dEEgPSB7XG4gICAgICAgICAgICBcImp1bXBcIjogXCJTcGFjZVwiLFxuICAgICAgICAgICAgXCJyaWdodFwiOiBcIktleURcIixcbiAgICAgICAgICAgIFwibGVmdFwiOiBcIktleUFcIixcbiAgICAgICAgICAgIFwic2hvb3RcIjogXCJOdW1wYWQ0XCIsXG4gICAgICAgICAgICBcInNsYXNoXCI6IFwiTnVtcGFkNVwiLFxuICAgICAgICAgICAgXCJjbGVhdmVcIjogXCJOdW1wYWQ2XCIsXG4gICAgICAgICAgICBcImVuZXJnaXplXCI6IFwiS2V5V1wiLFxuICAgICAgICAgICAgXCJkYXNoXCI6IFwiTnVtcGFkMVwiLFxuICAgICAgICAgICAgXCJnZXRQb3NcIjogXCJLZXlFXCIsXG4gICAgICAgICAgICBcInNldFBvc1wiOiBcIktleVJcIixcbiAgICAgICAgICAgIFwiZ29kVG9nZ2xlXCI6IFwiS2V5R1wiLFxuICAgICAgICAgICAgXCJoYXJkbW9kZVwiOiBcIktleVRcIixcbiAgICAgICAgICAgIFwiZWFzeW1vZGVcIjogXCJLZXlZXCIsXG4gICAgICAgICAgICBcImxheW91dEFcIjogXCJOdW1wYWQ5XCIsXG4gICAgICAgICAgICBcImxheW91dEJcIjogXCJLZXlQXCIsXG4gICAgICAgICAgICBcInRlc3RQb3NcIjogXCJLZXlWXCIsXG4gICAgICAgICAgICBcInRvZ2dsZUJveGVzXCI6IFwiS2V5Q1wiLFxuICAgICAgICAgICAgXCJwYXVzZVwiOiBcIkVudGVyXCIsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250cm9sTGF5b3V0QiA9IHtcbiAgICAgICAgICAgIFwianVtcFwiOiBcIlNwYWNlXCIsXG4gICAgICAgICAgICBcInJpZ2h0XCI6IFwiS2V5RFwiLFxuICAgICAgICAgICAgXCJsZWZ0XCI6IFwiS2V5QVwiLFxuICAgICAgICAgICAgXCJzaG9vdFwiOiBcIktleUpcIixcbiAgICAgICAgICAgIFwic2xhc2hcIjogXCJLZXlLXCIsXG4gICAgICAgICAgICBcImNsZWF2ZVwiOiBcIktleUxcIixcbiAgICAgICAgICAgIFwiZW5lcmdpemVcIjogXCJLZXlXXCIsXG4gICAgICAgICAgICBcImRhc2hcIjogXCJLZXlNXCIsXG4gICAgICAgICAgICBcImdldFBvc1wiOiBcIktleUVcIixcbiAgICAgICAgICAgIFwic2V0UG9zXCI6IFwiS2V5UlwiLFxuICAgICAgICAgICAgXCJnb2RUb2dnbGVcIjogXCJLZXlHXCIsXG4gICAgICAgICAgICBcImhhcmRtb2RlXCI6IFwiS2V5VFwiLFxuICAgICAgICAgICAgXCJlYXN5bW9kZVwiOiBcIktleVlcIixcbiAgICAgICAgICAgIFwibGF5b3V0QVwiOiBcIk51bXBhZDlcIixcbiAgICAgICAgICAgIFwibGF5b3V0QlwiOiBcIktleVBcIixcbiAgICAgICAgICAgIFwidGVzdFBvc1wiOiBcIktleVZcIixcbiAgICAgICAgICAgIFwidG9nZ2xlQm94ZXNcIjogXCJLZXlDXCIsXG4gICAgICAgICAgICBcInBhdXNlXCI6IFwiRW50ZXJcIixcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5jb250cm9sTGF5b3V0QTtcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICB9XG5cbiAgICAvKlxuICAgIEluaXRpYWxpemVzIHRoZSBnYW1lIGVuZ2luZVxuICAgICovXG4gICAgaW5pdCAoY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnN1cmZhY2VXaWR0aCA9IHRoaXMuY3R4LmNhbnZhcy53aWR0aDtcbiAgICAgICAgdGhpcy5zdXJmYWNlSGVpZ2h0ID0gdGhpcy5jdHguY2FudmFzLmhlaWdodDtcbiAgICAgICAgdGhpcy5zdGFydElucHV0KCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2dhbWUgaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIFN0YXJ0cyB0aGUgZ2FtZSBlbmdpbmVcbiAgICAqL1xuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydGluZyBnYW1lXCIpO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMubXVzaWMgPSBuZXcgQXVkaW8oXCIuL2F1ZGlvL3RyYWNrXzEud2F2XCIpO1xuICAgICAgICB0aGlzLm11c2ljLnZvbHVtZSA9IDE7XG4gICAgICAgIHRoaXMubXVzaWMucGxheSgpO1xuICAgICAgICAoZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gICAgICAgICAgICB0aGF0Lmxvb3AoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltRnJhbWUoZ2FtZUxvb3AsIHRoYXQuY3R4LmNhbnZhcyk7XG4gICAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgcGxheVNvdW5kKHNvdW5kX25hbWUsIHZvbHVtZT0xKSB7XG4gICAgICAgIHRoaXMuc291bmQucGxheShzb3VuZF9uYW1lLCB2b2x1bWUpXG4gICAgfVxuXG4gICAgLy9UaW1lciBjbGFzc1xuICAgIFRpbWVyKCkgey8vQWRkZWQgdGhpcyBmb3Igd2hlbiB3ZSBpbXBsZW1lbnQgYSBwYXVzZSBmdW5jdGlvbi5cbiAgICAgICAgdGhpcy5nYW1lVGltZSA9IDA7XG4gICAgICAgIHRoaXMubWF4U3RlcCA9IDAuMDU7XG4gICAgICAgIHRoaXMud2FsbExhc3RUaW1lc3RhbXAgPSAwO1xuICAgICAgICBmdW5jdGlvbiB0aWNrKCkge1xuICAgICAgICAgICAgdmFyIHdhbGxDdXJyZW50ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHZhciB3YWxsRGVsdGEgPSAod2FsbEN1cnJlbnQgLSB0aGlzLndhbGxMYXN0VGltZXN0YW1wKSAvIDEwMDA7XG4gICAgICAgICAgICB0aGlzLndhbGxMYXN0VGltZXN0YW1wID0gd2FsbEN1cnJlbnQ7XG5cbiAgICAgICAgICAgIHZhciBnYW1lRGVsdGEgPSBNYXRoLm1pbih3YWxsRGVsdGEsIHRoaXMubWF4U3RlcCk7XG4gICAgICAgICAgICB0aGlzLmdhbWVUaW1lICs9IGdhbWVEZWx0YTtcbiAgICAgICAgICAgIHJldHVybiBnYW1lRGVsdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIElucHV0IGhhbmRsaW5nLCBpbml0aWFsaXplcyBsaXN0ZW5lcnNcbiAgICAqL1xuICAgIHN0YXJ0SW5wdXQgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnU3RhcnRpbmcgaW5wdXQnKTtcblxuICAgICAgICB0aGlzLmN0eC5jYW52YXMudGFiSW5kZXggPSAwOztcblxuICAgICAgICBsZXQgZ2V0WGFuZFkgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgbGV0IHggPSBlLmNsaWVudFggLSB0aGF0LmN0eC5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIGxldCB5ID0gZS5jbGllbnRZIC0gdGhhdC5jdHguY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgICAgICAgaWYgKHggPCAxMDI0KSB7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoeCAvIDMyKTtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcih5IC8gMzIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgLy8gY29udHJvbCBldmVudCBsaXN0ZW5lcnMgZ28gaGVyZVxuICAgICAgICBsZXQgbWFwID0ge307XG5cbiAgICAgICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkgPT09ICcgJykgdGhhdC5zcGFjZSA9IHRydWU7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIXRoYXQuY29udHJvbEtleXMuaGFzT3duUHJvcGVydHkoZS5jb2RlKSkgeyB0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0gPSB7XCJhY3RpdmVcIjogdHJ1ZX07IH1cbiAgICAgICAgICAgIGlmICh0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0uYWN0aXZlID09IGZhbHNlKSB7IHRoYXQuY29udHJvbEtleXNbZS5jb2RlXS5hY3RpdmUgPSB0cnVlOyB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtlLmNvZGV9IGlzICR7dGhhdC5jb250cm9sc1tlLmNvZGVdLmFjdGl2ZX1gKTtcblxuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBcdGlmICghdGhhdC5jb250cm9sS2V5cy5oYXNPd25Qcm9wZXJ0eShlLmNvZGUpKSB7IHRoYXQuY29udHJvbEtleXNbZS5jb2RlXSA9IHtcImFjdGl2ZVwiOiBmYWxzZX07IH1cbiAgICAgICAgICAgIGlmICh0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0uYWN0aXZlID09IHRydWUpIHsgdGhhdC5jb250cm9sS2V5c1tlLmNvZGVdLmFjdGl2ZSA9IGZhbHNlIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2UuY29kZX0gaXMgJHt0aGF0LmNvbnRyb2xzW2UuY29kZV0uYWN0aXZlfWApO1xuXG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnSW5wdXQgc3RhcnRlZCcpO1xuICAgIH1cblxuICAgIC8qXG4gICAgQWRkcyBhbiBlbnRpdHkgdG8gdGhlIGdhbWVcbiAgICAqL1xuICAgIGFkZEVudGl0eSAoZW50aXR5KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2FkZGVkIGVudGl0eScpO1xuICAgICAgICBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLmxvYWRpbmdMZXZlbCB8fCB0aGlzLmdhbWVib2FyZC5zdGF0ZXMucmVzcGF3blNlY3Rpb24pIHtcbiAgICAgICAgICAgIGVudGl0eS5sZXZlbCA9IHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtO1xuICAgICAgICAgICAgZW50aXR5LnNlY3Rpb24gPSB0aGlzLmdhbWVib2FyZC5sZXZlbC5zZWN0aW9uTnVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW50aXRpZXMucHVzaChlbnRpdHkpO1xuICAgIH1cblxuICAgIGFkZEJhY2tncm91bmRMYXllciAobGF5ZXIpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgIH1cblxuXG4gICAgLypcbiAgICBEcmF3cyBhbGwgZW50aXRpZXMgaW4gdGhlIGxpc3RcbiAgICAqL1xuXG4gICAgZHJhdyAoZHJhd0NhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmN0eC5jYW52YXMud2lkdGgsIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL0RyYXcgdGhlIGNhbWVyYSBhbmQgaHVkIGZpcnN0XG5cbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZExheWVyc1tpXS5kcmF3KHRoaXMuY3R4KTtcblxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8vL0RyYXcgb25seSB0ZXJyYWluIHRoYXQgaXMgd2l0aGluIHRoZSBjYW52YXMgdmlldyAobnVtYmVycyBhcmUgbmVnYXRpdmUgYmVjYXVzZSB0aGUgY2FtZXJhIGlzIHdlaXJkIGxpa2UgdGhhdC5cbiAgICAgICAgICAgIC8vLy9wb3N0aXZlIG51bWJlcnMgd291bGQgc2NyZXcgdGhlIHRyYW5zbGF0ZSBwcm9jZXNzKVxuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0udHlwZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgICAgICBpZigoLXRoaXMuZW50aXRpZXNbaV0ueCAtIHRoaXMuZW50aXRpZXNbaV0uYm91bmRXaWR0aCA8IHRoaXMuZW50aXRpZXNbMF0ueFZpZXcgXG4gICAgICAgICAgICAgICAgJiYgLXRoaXMuZW50aXRpZXNbaV0ueCA+IHRoaXMuZW50aXRpZXNbMF0ueFZpZXcgLSB0aGlzLmN0eC5jYW52YXMud2lkdGggXG4gICAgICAgICAgICAgICAgJiYgLXRoaXMuZW50aXRpZXNbaV0ueSAtIHRoaXMuZW50aXRpZXNbaV0uYm91bmRIZWlnaHQ8IHRoaXMuZW50aXRpZXNbMF0ueVZpZXcgXG4gICAgICAgICAgICAgICAgJiYgLXRoaXMuZW50aXRpZXNbaV0ueSA+IHRoaXMuZW50aXRpZXNbMF0ueVZpZXcgLSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV0uZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMucGF1c2VkIHx8IHRoaXMuZW50aXRpZXNbaV0ubmFtZSA9PT0gXCJDYW1lcmFcIikgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV0uZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjI1cHggVmVyZGFuYVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNlNWU1ZTVcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJVbml2ZXJzYWwgQ29udHJvbHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA0MFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJ1biBsZWZ0OiBTXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJSdW4gcmlnaHQ6IERcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMTIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJFbmVyZ2l6ZTogV1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAxNjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkp1bXA6IFNwYWNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDIwMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiTm9ybWFsIERpZmZpY3VsdHkgKGRlZmF1bHQpOiBZXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMjQwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJUb3VnaCBEaWZmaWN1bHR5IChub3QgZGVmYXVsdCk6IFRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAyODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkdvZCBNb2RlIFRvZ2dsZSAoZm9yIGNoZWF0ZXJzKTogR1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDMyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQWJpbGl0aWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDQwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJQb3dlciBTaG90OiBFbmVyZ2l6ZSArIFNob290XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJTd29yZCBCbGFzdDogRW5lcmdpemUgKyBTbGFzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAxMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJlZmxlY3Q6IEVuZXJnaXplICsgQ2xlYXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDE2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiTGF5b3V0IEEgKE51bXBhZCA5KVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QSArIDIwMFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlNob290OiBOdW1wYWQgNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAyNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkRhc2g6IE51bXBhZCAxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QSArIDI4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU2xhc2g6IE51bXBhZCA1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QSArIDMyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ2xlYXZlOiBOdW1wYWQgNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAzNjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkxheW91dCBCIChQKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEIgKyAyMDBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJTaG9vdDogSlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEIgKyAyNDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkRhc2g6IE1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDU3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMjgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJTbGFzaDogS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEIgKyAzMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNsZWF2ZTogTFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEIgKyAzNjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkN1cnJlbnQgRGlmZmljdWx0eSBpcyBcIiArIHRoaXMuZGlmZmljdWx0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDExMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDQwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMjBweCBWZXJkYW5hXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiKHRoaXMgY2FuIGJlIGNoYW5nZWQgYXQgYW55IHRpbWUsIGluY2x1ZGluZyB3aGlsZSBwYXVzZWQpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIkl0YWxpYyA0MHB4IFRpbWVzIE5ldyBSb21hblwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlRoZSBmb3JjZXMgb2YgZXZpbCBhcmUgc3RpbGwgZmluaXNoaW5nIGFycmFuZ2VtZW50c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWSArIDgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJvbiB0aGUgZXhwYW5zaW9uIG9mIHRoZWlyIGR1bmdlb25zIGFuZCB0aHJvbmUgcm9vbXMuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VGbGF2b3JZICsgMTIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJQcmVwYXJlIGZvciB0aGUgaW5ldml0YWJsZSBzaG93ZG93biB3aXRoIHRoaXMgdmlsbGlhbm91c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWSArIDE2MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwic2N1bSBieSB0cnlpbmcgdG8gZ2V0IGFzIGhpZ2ggYSBzY29yZSBhcyBwb3NzaWJsZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIHRoaXMucGF1c2VGbGF2b3JYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclkgKyAyMDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICBpZiAoZHJhd0NhbGxiYWNrKSB7XG4gICAgICAgICAgICBkcmF3Q2FsbGJhY2sodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgVXBkYXRlcyBhbGwgZW50aXRpZXMsIGNhbGxzIHRoZWlyIHVwZGF0ZSBtZXRob2RzXG4gICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIGxldCBlbnRpdGllc0NvdW50ID0gdGhpcy5lbnRpdGllcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudGl0aWVzQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLmVudGl0aWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWVib2FyZC5zdGF0ZXMucmVzcGF3blNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eS5sZXZlbCA9PT0gdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW0gJiYgZW50aXR5LnNlY3Rpb24gPT09IHRoaXMuZ2FtZWJvYXJkLnNlY3Rpb25OdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ2YWx1ZXMgLSBsZXZlbDogXCIgKyB0aGlzLmdhbWVib2FyZC5sZXZlbE51bSArIFwiLCBzZWN0aW9uOiBcIiArIHRoaXMuZ2FtZWJvYXJkLnNlY3Rpb25OdW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImVudGl0eSAtIGxldmVsOiBcIiArIGVudGl0eS5sZXZlbCArIFwiLCBzZWN0aW9uOiBcIiArIGVudGl0eS5zZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnBvaW50VmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5uZXdMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5LmxldmVsID09PSB0aGlzLmdhbWVib2FyZC5sZXZlbE51bSB8fCBlbnRpdHkubmFtZSA9PT0gXCJUZXJyYWluXCIgfHwgZW50aXR5Lm5hbWUgPT09IFwiSGVyb1wiIHx8IGVudGl0eS5uYW1lID09PSBcIkhVRFwiIHx8IGVudGl0eS5uYW1lID09PSBcIlBvcnRhbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmFsdWVzIC0gbGV2ZWw6IFwiICsgdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW0gKyBcIiwgc2VjdGlvbjogXCIgKyB0aGlzLmdhbWVib2FyZC5zZWN0aW9uTnVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbnRpdHkgLSBsZXZlbDogXCIgKyBlbnRpdHkubGV2ZWwgKyBcIiwgc2VjdGlvbjogXCIgKyBlbnRpdHkuc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5wb2ludFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWVudGl0eS5yZW1vdmVGcm9tV29ybGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVib2FyZC5zdGF0ZXMucmVzcGF3blNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zdGF0ZXMucmVzcGF3blNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVib2FyZC5zdGF0ZXMubmV3TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zdGF0ZXMubmV3TGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5zdGF0ZXMubG9hZE5leHRMZXZlbCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vVE9ETyBNb3ZlIGludG8gZmlyc3QgdXBkYXRlKCkgZm9yIGxvb3A/XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5lbnRpdGllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLnJlbW92ZUZyb21Xb3JsZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS5oYXNPd25Qcm9wZXJ0eShcInBvaW50VmFsdWVcIikgJiYgIXRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5yZXNwYXduU2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0ucG9pbnRWYWx1ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE8gUmVmYWN0b3IgaGVybyBtdWx0aXBsaWVyIGFuZCBkaWZmaWN1bHR5IHRvIGdhbWVib2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGlzLmdhbWVib2FyZC5zdGF0ZXMuc2hvd1BvaW50VmFsdWVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmdhbWVib2FyZC5zdGF0ZXMuc2hvd1BvaW50VmFsdWVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmdhbWVib2FyZC5wdnQgPSB0aGlzLmdhbWVib2FyZC5wdnR0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkZWRwb2ludHMgPSB0aGlzLmhlcm8uZGlmZmljdWx0eSAqIHRoaXMuZW50aXRpZXNbaV0ucG9pbnRWYWx1ZSAqIHRoaXMuaGVyby5tdWx0aXBsaWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLmRlYWRFbmVtaWVzLnB1c2goW1t0aGlzLmVudGl0aWVzW2ldLngsIHRoaXMuZW50aXRpZXNbaV0ueV0sIHRoaXMuYWRkZWRwb2ludHMsIDMwXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc2NvcmUgKz0gdGhpcy5hZGRlZHBvaW50cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm8ubXVsdGlwbGllciArPSB0aGlzLmhlcm8uZGlmZmljdWx0eSAqIC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmVudGl0aWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvdGhlciA9IHRoaXMuZW50aXRpZXNbal07XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgcHJldmVudHMgZWFjaCBwaWVjZSBvZiB0ZXJyYWluIGZyb20gY2hlY2tpbmcgY29sbGlzaW9uLCBjYXVzaW5nIHNsb3dkb3duXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkudHlwZSA9PT0gXCJUZXJyYWluXCIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvdGhlci50eXBlID09PSBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3QgPSBNYXRoLmFicyhlbnRpdHkueCAtIG90aGVyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5ICE9IG90aGVyICYmIGVudGl0eS5pc0NvbGxpZGluZyhvdGhlcikgIT0gJ25vbmUnKSB7IC8vLyBELnByb3RvdHlwZSA9IG5ldyBDKCksIGxpbmtzIEMgdG8gcHJvdG90eXBlIGxpbmthZ2Ugb2YgRCBPUiBwdXQgcHJvcGVydHkgXCJzb21ldGhpbmdfdHlwZVwiIG9yIHdoYXRldmVyIGFuZCBjaGVjayBmb3IgdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gZW50aXR5LmlzQ29sbGlkaW5nKG90aGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LmNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVudGl0eSAhPSBvdGhlciAmJiBlbnRpdHkuaXNDb2xsaWRpbmcob3RoZXIpICE9ICdub25lJykgeyAvLy8gRC5wcm90b3R5cGUgPSBuZXcgQygpLCBsaW5rcyBDIHRvIHByb3RvdHlwZSBsaW5rYWdlIG9mIEQgT1IgcHV0IHByb3BlcnR5IFwic29tZXRoaW5nX3R5cGVcIiBvciB3aGF0ZXZlciBhbmQgY2hlY2sgZm9yIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBlbnRpdHkuaXNDb2xsaWRpbmcob3RoZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LmNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG11c2ljXG4gICAgICAgIGlmICh0aGlzLm11c2ljLmN1cnJlbnRUaW1lID49IDYzLjk1KSB7XG4gICAgICAgICAgICB0aGlzLm11c2ljLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMubXVzaWMucGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9QTEFZRVIgU0VUVElOR1NcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5lYXN5bW9kZV0uYWN0aXZlKSB7XG4gICAgICAgICAgICAvL1RPRE8gTW92ZSBkaWZmaWN1bHR5IHRvIGdhbWVib2FyZFxuICAgICAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gXCJOb3JtYWwgKEJ1dCBLaW5kYSBFYXN5KVwiO1xuICAgICAgICAgICAgdGhpcy5oZXJvLmRpZmZpY3VsdHkgPSAxO1xuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc2NvcmUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuaGFyZG1vZGVdLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gXCJUb3VnaFwiO1xuICAgICAgICAgICAgdGhpcy5oZXJvLmRpZmZpY3VsdHkgPSAzO1xuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc2NvcmUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMubGF5b3V0QV0uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5jb250cm9sTGF5b3V0QTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmxheW91dEJdLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IHRoaXMuY29udHJvbExheW91dEI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5wYXVzZV0uYWN0aXZlICYmIHRoaXMucGF1c2VUb2dnbGVDb29sZG93biA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSAhdGhpcy5wYXVzZWQ7XG4gICAgICAgICAgICB0aGlzLnBhdXNlVG9nZ2xlQ29vbGRvd24gPSB0aGlzLnRvZ2dsZUNvb2xkb3duO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhdXNlVG9nZ2xlQ29vbGRvd24gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlVG9nZ2xlQ29vbGRvd24tLTtcbiAgICAgICAgfVxuICAgICAgICAvL0RFViBUT09MU1xuICAgICAgICBpZiAodGhpcy5kZXZNb2RlICYmICF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5nZXRQb3NdLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieDogXCIgKyB0aGlzLmhlcm8ueCArIFwiLCB5OiBcIiArIHRoaXMuaGVyby55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuc2V0UG9zXS5hY3RpdmUgJiYgdGhpcy5zZXRQb3NUaW1lciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnNldFBvcyh0aGlzLmdhbWVib2FyZC5sZXZlbC5jaGVja3BvaW50c1t0aGlzLmNoZWNrcG9pbnRDeWNsZUNvdW50XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NUaW1lciA9IHRoaXMudG9nZ2xlQ29vbGRvd247XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja3BvaW50Q3ljbGVDb3VudCA9ICh0aGlzLmNoZWNrcG9pbnRDeWNsZUNvdW50ICsgMSkgJSB0aGlzLmdhbWVib2FyZC5sZXZlbC5jaGVja3BvaW50cy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmdvZFRvZ2dsZV0uYWN0aXZlICYmIHRoaXMuZ29kVG9nZ2xlVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zdGF0ZXMuaXNHb2QgPSAhdGhpcy5oZXJvLnN0YXRlcy5pc0dvZDtcbiAgICAgICAgICAgICAgICB0aGlzLmdvZFRvZ2dsZVRpbWVyID0gdGhpcy50b2dnbGVDb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMudGVzdFBvc10uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnNldFBvcyh0aGlzLmdhbWVib2FyZC50ZXN0UG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMudG9nZ2xlQm94ZXNdLmFjdGl2ZSAmJiB0aGlzLmJveFRvZ2dsZVRpbWVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdCb3hlcyA9ICF0aGlzLmRyYXdCb3hlcztcbiAgICAgICAgICAgICAgICB0aGlzLmJveFRvZ2dsZVRpbWVyID0gdGhpcy50b2dnbGVDb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vVG9nZ2xlIHRpbWVycyAoc2hvdWxkIGZpbmFsbHkgbGVhcm4gaG93IHRvIHVzZSBhbiBcIm9uIGtleXVwXCIgZm9yIGtleXMpXG4gICAgICAgICAgICBpZiAodGhpcy5ib3hUb2dnbGVUaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJveFRvZ2dsZVRpbWVyLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zZXRQb3NUaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvc1RpbWVyLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nb2RUb2dnbGVUaW1lciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvZFRvZ2dsZVRpbWVyLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3QmFja2dyb3VuZChkcmF3Q2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5jdHguY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhY2tncm91bmRMYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vRHJhdyB0aGUgY2FtZXJhIGFuZCBodWQgZmlyc3RcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZExheWVyc1tpXS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHJhd0NhbGxiYWNrKSB7XG4gICAgICAgICAgICBkcmF3Q2FsbGJhY2sodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgRGVmaW5lcyB0aGUgZ2FtZSBsb29wXG4gICAgKi9cbiAgICBsb29wICgpIHtcbiAgICAgICAgdGhpcy5jdHgud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5jdHguaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB0aGlzLmNsaWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy53aGVlbCA9IG51bGw7XG4gICAgfVxuXG59IC8vIGVuZCBvZiBHYW1lRW5naW5lXG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVFbmdpbmU7XG4iLCJpbXBvcnQgQXNzZXRNYW5hZ2VyIGZyb20gXCIuL2Fzc2V0LW1hbmFnZXJcIlxuXG5cbmNsYXNzIEh1ZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpIHtcbiAgICAgICAgdGhpcy5pbWcgPSBpbWc7XG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLmhlYWx0aGJhciA9IG5ldyBIZWFsdGhCYXIoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKTtcbiAgICAgICAgdGhpcy5lbmVyZ3liYXIgPSBuZXcgRW5lcmd5QmFyKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSk7XG4gICAgICAgIHRoaXMuc2NvcmVib2FyZCA9IG5ldyBTY29yZUJvYXJkKGdhbWVfZW5naW5lLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZSwgY2FtZXJhKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW3RoaXMuaGVhbHRoYmFyLCB0aGlzLmVuZXJneWJhciwgdGhpcy5zY29yZWJvYXJkXTtcbiAgICAgICAgdGhpcy5ncmFkaWVudFN0b3AxID0gMDtcbiAgICAgICAgdGhpcy5ncmFkaWVudFN0b3AyID0gMTtcbiAgICAgICAgdGhpcy5ncmFkaWVudFN0b3AzID0gMjtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHNbaV0udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzW2ldLmRyYXcoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0NvbGxpZGluZygpIHt9XG4gICAgY29sbGlkZWQoKSB7fVxuXG59XG5cblxuY2xhc3MgU2NvcmVCb2FyZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lX2VuZ2luZSwgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBnYW1lX2VuZ2luZS5nYW1lYm9hcmQuc2NvcmU7XG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUgPSBnYW1lX2VuZ2luZTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IGRlc3RfY29vcmRpbmF0ZXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmdhbWVfZW5naW5lLmdhbWVib2FyZC5zY29yZSk7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBbLXRoaXMuY2FtZXJhLnhWaWV3ICsgMjAwLCAtdGhpcy5jYW1lcmEueVZpZXcgKyAxMDBdXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmZvbnQgPSBcIml0YWxpYyBib2xkIDI1cHggVmVyZGFuYVwiIDtcbiAgICAgICAgdmFyIGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHRoaXMuZGVzdF9jb29yZHNbMF0gLSAxMDAsIHRoaXMuZGVzdF9jb29yZHNbMV0gLSAxMCwgdGhpcy5kZXN0X2Nvb3Jkc1swXSwgdGhpcy5kZXN0X2Nvb3Jkc1sxXSAtIDEwKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsXCJtYWdlbnRhXCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoLjUgLFwiYmx1ZVwiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEgLFwiZ3JlZW5cIik7XG4gICAgICAgIC8vIEZpbGwgd2l0aCBncmFkaWVudFxuICAgICAgICBjdHguZmlsbFN0eWxlPWdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFRleHQoXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLFxuICAgICAgICAgICAgdGhpcy5kZXN0X2Nvb3Jkc1swXSAtIDEwMCwgXG4gICAgICAgICAgICB0aGlzLmRlc3RfY29vcmRzWzFdIC0gMTBcbiAgICAgICAgKTtcbiAgICAgICAgLy9pZiAodGhpcy5nYW1lX2VuZ2luZS5nYW1lYm9hcmQuc3RhdGVzLnNob3dQb2ludFZhbHVlcykge1xuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImRyYXdcIilcbiAgICAgICAgLy8gICAgY3R4LmZvbnQgPSBcIjIwcHggVmVyZGFuYVwiO1xuICAgICAgICAvLyAgICBjdHguZmlsbFN0eWxlID0gXCIjMDBmZjAwXCI7XG4gICAgICAgIC8vICAgIGN0eC5maWxsVGV4dChcIitcIiArIHRoaXMuZ2FtZV9lbmdpbmUuYWRkZWRwb2ludHMgKyBcIiBwb2ludHNcIixcbiAgICAgICAgLy8gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUuaGVyby54ICsgMTAsXG4gICAgICAgIC8vICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmhlcm8ueSAtIDE1MFxuICAgICAgICAvLyAgICApO1xuICAgICAgICAvL31cbiAgICB9XG59XG5cblxuLypcbiAgICBSZXNvdXJjZUJhciBzdXBlcmNsYXNzXG4qL1xuY2xhc3MgUmVzb3VyY2VCYXIge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9Mykge1xuICAgICAgICB0aGlzLmdhbWVfZW5naW5lID0gZ2FtZV9lbmdpbmU7XG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgICAgIHRoaXMuaW1nID0gaW1nO1xuICAgICAgICB0aGlzLnNyY19jb29yZHMgPSBzcmNfY29vcmRpbmF0ZXM7XG4gICAgICAgIHRoaXMuc3JjX2RpbXMgPSBzcmNfZGltZW5zaW9ucztcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IGRlc3RfY29vcmRpbmF0ZXM7XG4gICAgICAgIC8vIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGxldCBsYXN0eSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhcnQgPSB0aGlzLnBhcnRzW2ldXG4gICAgICAgICAgICB0aGlzLmRyYXdQYXJ0KGN0eCwgcGFydCwgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgPSBsYXN0eSArIHBhcnRbXCJzcmNfaGVpZ2h0XCJdOyAvLyB0aGlzIGNhdXNlcyBlYWNoIHNlZ21lbnQgdG8gYmUgZHJhd24gdmVydGljYWxseSBvbiB0b3Agb2YgdGhlIGxhc3RcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc291cmNlQmFyU2VnbWVudChpbWcsIHNyY19jb29yZHMsIHNyY19kaW1zLCBkZXN0X3hfb2Zmc2V0PTAsIGRlc3RfeV9vZmZzZXQ9MCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBcImltZ1wiOiBpbWcsXG4gICAgICAgICAgICAgICAgXCJzcmNfeFwiOiBzcmNfY29vcmRzWzBdLFxuICAgICAgICAgICAgICAgIFwic3JjX3lcIjogc3JjX2Nvb3Jkc1sxXSxcbiAgICAgICAgICAgICAgICBcInNyY193aWR0aFwiOiBzcmNfZGltc1swXSxcbiAgICAgICAgICAgICAgICBcInNyY19oZWlnaHRcIjogc3JjX2RpbXNbMV0sXG4gICAgICAgICAgICAgICAgXCJkZXN0X3hfb2Zmc2V0XCI6IGRlc3RfeF9vZmZzZXQsXG4gICAgICAgICAgICAgICAgXCJkZXN0X3lfb2Zmc2V0XCI6IGRlc3RfeV9vZmZzZXQsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAvLyB0aGlzLmRlc3RfeCA9IGRlc3RfY29vcmRzWzBdXG4gICAgICAgICAgIC8vIHRoaXMuZGVzdF95ID0gZGVzdF9jb29yZHNbMV1cbiAgICAgICAgICAgLy8gdGhpcy5kZXN0X3dpZHRoID0gZGVzdF9kaW1lbnNpb25zWzBdXG4gICAgICAgICAgIC8vIHRoaXMuZGVzdF9oZWlnaHQgPSBkZXN0X2RpbWVuc2lvbnNbMV1cbiAgICB9XG59XG5cblxuLypcbiAgICBQcm92aWRlcyBhIGhlYWx0aCBiYXIgZm9yIHRoZSBIZXJvLlxuICAgIENvbnN0cnVjdGVkIG9mIHJlc291cmNlQmFyU2VnbWVudHMsIGRlZmluZWQgaW4gUmVzb3VyY2VCYXIuXG4gICAgSGVhbHRoIGdyb3dzIHVwd2FyZC5cbiovXG5jbGFzcyBIZWFsdGhCYXIgZXh0ZW5kcyBSZXNvdXJjZUJhciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpIHtcbiAgICAgICAgc3VwZXIoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9Myk7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVyby5oZWFsdGg7IC8vIGhhcyByb29tIGZvciA2IHRpY2tzXG4gICAgICAgIHRoaXMud2lkdGggPSAxNDsgLy8gdGhlIHBpeGVsIGFydCB3aWR0aFxuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcblxuICAgICAgICAvLyBiYXIgc2VnbWVudHNcbiAgICAgICAgdGhpcy50b3AgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsIFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2RpbWVuc2lvbnNbMV0gKyAwXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAzXSk7XG4gICAgICAgIHRoaXMubWlkZGxlMSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZywgXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTIgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTMgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTQgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTUgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLmJvdHRvbSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZywgXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAxOV0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMThdKTtcbiAgICAgICAgdGhpcy50aWNrID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0gKyAzLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAxNl0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aC03LCAzXSxcbiAgICAgICAgICAgIDksIDExKTtcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFt0aGlzLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taWRkbGUxLCB0aGlzLm1pZGRsZTIsIHRoaXMubWlkZGxlMywgdGhpcy5taWRkbGU0LCB0aGlzLm1pZGRsZTUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tXVxuXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgbGV0IGxhc3R5ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGFydCA9IHRoaXMucGFydHNbaV1cbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSA9IGxhc3R5ICsgcGFydFtcInNyY19oZWlnaHRcIl07IC8vIHRoaXMgY2F1c2VzIGVhY2ggc2VnbWVudCB0byBiZSBkcmF3biB2ZXJ0aWNhbGx5IG9uIHRvcCBvZiB0aGUgbGFzdFxuICAgICAgICB9XG5cbiAgICAgICAgbGFzdHkgLT0gdGhpcy5ib3R0b21bXCJzcmNfaGVpZ2h0XCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5oZWFsdGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1BhcnQoY3R4LCB0aGlzLnRpY2ssIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5IC09IDIgLy8gdGhpcyBjYXVzZXMgaGVhbHRoIHRvIGdyb3cgdXB3YXJkIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd1BhcnQoY3R4LCBwYXJ0LCBsYXN0eSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxuICAgICAgICAgICAgcGFydFtcInNyY194XCJdLCBwYXJ0W1wic3JjX3lcIl0sIC8vIHNyYyB4LCB5XG4gICAgICAgICAgICBwYXJ0W1wic3JjX3dpZHRoXCJdLCBwYXJ0W1wic3JjX2hlaWdodFwiXSwgLy8gc3JjIHdpZHRoLCBoZWlnaHRcbiAgICAgICAgICAgIHRoaXMuZGVzdF9jb29yZHNbMF0gKyBwYXJ0W1wiZGVzdF94X29mZnNldFwiXSwgdGhpcy5kZXN0X2Nvb3Jkc1sxXSArIChsYXN0eSAqIHRoaXMuc2NhbGUpIC0gcGFydFtcImRlc3RfeV9vZmZzZXRcIl0sIC8vIGRlc3QgeCwgeVxuICAgICAgICAgICAgcGFydFtcInNyY193aWR0aFwiXSAqIHRoaXMuc2NhbGUsIHBhcnRbXCJzcmNfaGVpZ2h0XCJdICogdGhpcy5zY2FsZSwgLy8gZGVzdCB3aWR0aCwgaGVpZ2h0XG4gICAgICAgICkgXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMuaGVyby5oZWFsdGg7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBbLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTAwLCAtdGhpcy5jYW1lcmEueVZpZXcgKyAxMDBdXG4gICAgfVxuICAgIGlzQ29sbGlkaW5nKCkge31cbiAgICBjb2xsaWRlZCgpIHt9XG5cbn1cblxuXG4vKlxuICAgIFByb3ZpZGVzIGFuIGVuZXJneSBiYXIgZm9yIHRoZSBIZXJvLlxuICAgIENvbnN0cnVjdGVkIG9mIHJlc291cmNlQmFyU2VnbWVudHMsIGRlZmluZWQgaW4gUmVzb3VyY2VCYXIuXG4gICAgRW5lcmd5IGdyb3dzIHVwd2FyZC5cbiovXG5jbGFzcyBFbmVyZ3lCYXIgZXh0ZW5kcyBSZXNvdXJjZUJhciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpIHtcbiAgICAgICAgc3VwZXIoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9Myk7XG4gICAgICAgIHRoaXMuZW5lcmd5ID0gaGVyby5lbmVyZ3k7IC8vIGhhcyByb29tIGZvciA2IHRpY2tzXG4gICAgICAgIHRoaXMud2lkdGggPSAxNDsgLy8gdGhlIHBpeGVsIGFydCB3aWR0aFxuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgc3JjX2Nvb3JkaW5hdGVzID0gW3NyY19jb29yZGluYXRlc1swXSArIDE1LCBzcmNfY29vcmRpbmF0ZXNbMV1dXG5cbiAgICAgICAgLy8gYmFyIHNlZ21lbnRzXG4gICAgICAgIHRoaXMudG9wID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2RpbWVuc2lvbnNbMV0gKyAwXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAzXSk7XG4gICAgICAgIHRoaXMubWlkZGxlMSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlMiA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlMyA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlNCA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG4gICAgICAgIHRoaXMubWlkZGxlNSA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19jb29yZGluYXRlc1sxXSArIDNdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE0XSk7XG5cbiAgICAgICAgdGhpcy5ib3R0b20gPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAxOV0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMThdKTtcbiAgICAgICAgdGhpcy50aWNrID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSArIDMsIHNyY19jb29yZGluYXRlc1sxXSArIDE2XSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoIC0gNywgM10sXG4gICAgICAgICAgICA5LCAxMSk7XG4gICAgICAgIHRoaXMucGFydHMgPSBbdGhpcy50b3AsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlkZGxlMSwgdGhpcy5taWRkbGUyLCB0aGlzLm1pZGRsZTMsIHRoaXMubWlkZGxlNCwgdGhpcy5taWRkbGU1LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbV1cblxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGxldCBsYXN0eSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhcnQgPSB0aGlzLnBhcnRzW2ldXG4gICAgICAgICAgICB0aGlzLmRyYXdQYXJ0KGN0eCwgcGFydCwgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgPSBsYXN0eSArIHBhcnRbXCJzcmNfaGVpZ2h0XCJdOyAvLyB0aGlzIGNhdXNlcyBlYWNoIHNlZ21lbnQgdG8gYmUgZHJhd24gdmVydGljYWxseSBvbiB0b3Agb2YgdGhlIGxhc3RcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3R5IC09IHRoaXMuYm90dG9tW1wic3JjX2hlaWdodFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuZW5lcmd5OyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdQYXJ0KGN0eCwgdGhpcy50aWNrLCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSAtPSAyIC8vIHRoaXMgY2F1c2VzIGVuZXJneSB0byBncm93IHVwd2FyZCBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdQYXJ0KGN0eCwgcGFydCwgbGFzdHkpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZyxcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfeFwiXSwgcGFydFtcInNyY195XCJdLCAvLyBzcmMgeCwgeVxuICAgICAgICAgICAgcGFydFtcInNyY193aWR0aFwiXSwgcGFydFtcInNyY19oZWlnaHRcIl0sIC8vIHNyYyB3aWR0aCwgaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmRlc3RfY29vcmRzWzBdICsgcGFydFtcImRlc3RfeF9vZmZzZXRcIl0sIHRoaXMuZGVzdF9jb29yZHNbMV0gKyAobGFzdHkgKiB0aGlzLnNjYWxlKSAtIHBhcnRbXCJkZXN0X3lfb2Zmc2V0XCJdLCAvLyBkZXN0IHgsIHlcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfd2lkdGhcIl0gKiB0aGlzLnNjYWxlLCBwYXJ0W1wic3JjX2hlaWdodFwiXSAqIHRoaXMuc2NhbGUsIC8vIGRlc3Qgd2lkdGgsIGhlaWdodFxuICAgICAgICApIFxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5lbmVyZ3kgPSB0aGlzLmhlcm8uZW5lcmd5O1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gWy10aGlzLmNhbWVyYS54VmlldyArIDE1MCwgLXRoaXMuY2FtZXJhLnlWaWV3ICsgMTAwXVxuICAgIH1cbiAgICBpc0NvbGxpZGluZygpIHt9XG4gICAgY29sbGlkZWQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBIdWQ7IiwiaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi9jb25zdC5qc29uXCJcblxuXG5jbGFzcyBMb2dnaW5nIHtcblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgaWYgKENvbnN0YW50cy5zZXR0aW5ncy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2luZyIsImltcG9ydCBDb3JlIGZyb20gXCIuL2NvcmVcIlxuXG53aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgfVxufSkoKTtcblxuQ29yZSgpO1xuIiwiaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi4vYXNzZXQtbWFuYWdlclwiXG5pbXBvcnQgR2FtZUVuZ2luZSBmcm9tIFwiLi4vZ2FtZS1lbmdpbmVcIlxuaW1wb3J0IEh1ZCBmcm9tIFwiLi4vaHVkXCJcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gXCIuLi9iYWNrZ3JvdW5kXCJcbmltcG9ydCBTb3VuZCBmcm9tIFwiLi4vc291bmRcIlxuaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcblxuaW1wb3J0IHtcbiAgICBHYW1lQm9hcmQsXG4gICAgQ2FtZXJhLFxuICAgIEVudGl0eSxcbiAgICBUZXJyYWluLFxuICAgIEhlcm8sXG4gICAgTGVvLFxuICAgIEZsYW1lcyxcbiAgICBTb2xkaWVyU2hpZWxkLFxuICAgIERpbm8sXG4gICAgQ3JvdyxcbiAgICBCdWxsZXQsXG4gICAgU2hvdGJsYXN0LFxuICAgIEVuZW15LFxuICAgIEh1cnRib3gsXG4gICAgSGFuZCxcbiAgICBIYXphcmRzLFxuICAgIEhlYWx0aFBhY2ssXG4gICAgRW5lcmd5UGFja1xufSBmcm9tIFwiLi4vZW50aXRpZXNcIlxuXG5cbmNsYXNzIExldmVsT25lIHtcblxuICAgIC8qIERlZmluZSB0ZXJyYWluICovXG4gICAgY29uc3RydWN0b3IoZ2FtZUVuZ2luZSwgYXNzZXRNYW5hZ2VyLCBjdHgpIHtcblxuICAgICAgICAvL2luc3RhbmNlIHZhcmlhYmxlc1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUgPSBnYW1lRW5naW5lO1xuICAgICAgICB0aGlzLmFzc2V0TWFuYWdlciA9IGFzc2V0TWFuYWdlcjtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMudGlsZXNoZWV0ID0gYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL3BpcGVzLnBuZ1wiKTtcbiAgICAgICAgdGhpcy5sZXZlbE51bSA9IDE7XG4gICAgICAgIHRoaXMuc2VjdGlvbk51bTtcbiAgICAgICAgdGhpcy5jaGVja3BvaW50cyA9IFtbMTUsIDE4MjRdLCBbMzg3MCwgMF1dO1xuICAgICAgICB0aGlzLmNhbVZhbHMgPSBbWzIsIDEuNV0sIFsyLCAxLjVdXTtcbiAgICAgICAgdGhpcy5jYW1TcGVlZHMgPSBbWzcsIDddLCBbNywgN11dO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZENoZWNrcG9pbnRzID0gW3RydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuICAgICAgICB0aGlzLm5leHRMZXZlbCA9IDI7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkQ2hlY2twb2ludHMgPSBbdHJ1ZSwgZmFsc2VdO1xuICAgICAgICB0aGlzLnBvcnRhbCA9IG5ldyBQb3J0YWwodGhpcy5nYW1lRW5naW5lLCAzODcwLCAtMjAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy50aWxlU2l6ZSA9IDk2O1xuXG4gICAgICAgIHRoaXMudGlsZU1hcCA9IHtcbiAgICAgICAgICAgICcgJzogbnVsbCxcbiAgICAgICAgICAgIC8vICdcXG4nOiBudWxsLFxuICAgICAgICAgICAgJ2knOiBbMCwgNl0sXG4gICAgICAgICAgICAnISc6IFsxLCAwXSxcbiAgICAgICAgICAgICdbJzogWzEsIDRdLFxuICAgICAgICAgICAgJzwnOiBbMSwgNl0sXG4gICAgICAgICAgICAneyc6IFsyLCAwXSxcbiAgICAgICAgICAgICc+JzogWzIsIDZdLFxuICAgICAgICAgICAgJ18nOiBbMywgMF0sXG4gICAgICAgICAgICAnIyc6IFszLCAxXSxcbiAgICAgICAgICAgICctJzogWzMsIDRdLFxuICAgICAgICAgICAgJ30nOiBbNCwgMF0sXG4gICAgICAgICAgICAnaic6IFs0LCAzXSxcbiAgICAgICAgICAgICd8JzogWzQsIDZdLFxuICAgICAgICAgICAgJ2wnOiBbMiwgM10sXG4gICAgICAgICAgICAnfic6IFs2LCAwXSxcbiAgICAgICAgICAgICddJzogWzYsIDNdLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGlsZURpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICAvL2JvdW5kV2lkdGgsIGJvdW5kSGVpZ2h0LCBvZmZYLCBvZmZZXG4gICAgICAgICAgICAnaSc6IFsxNiwgMzIsIDQ0LCAwXSxcbiAgICAgICAgICAgICchJzogWzE2LCAzMiwgNDQsIDBdLFxuICAgICAgICAgICAgJ1snOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICc8JzogWzE2LCAxNiwgNDQsIDI0XSxcbiAgICAgICAgICAgICd7JzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnPic6IFsxNiwgMTYsIDAsIDI0XSxcbiAgICAgICAgICAgICdfJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnIyc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJy0nOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICd9JzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnaic6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJ3wnOiBbMTYsIDMyLCA0LCAwXSxcbiAgICAgICAgICAgICdsJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnfic6IFszMiwgMTYsIDAsIDI0XSxcbiAgICAgICAgICAgICddJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgIH1cbiAgICAgICAgLy8gMjAgbGluZXMgZnJvbSB0b3AgdG8gYm90dG9tXG4gICAgICAgIHRoaXMubWFwID1cbmB7X19fX19fX19fX19fX19fX19fX19fX19fX19fX30gICAge30gICB7X30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxubC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1qICAgIFtdICAgbC1qIFxuISAgICAgICAgICAgICAgICAgICAgICAgICAgICAge30gIFtdXG4hICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaiAgW11cbiEgICB7X19fX19fX199ICAgICAgICAgICAgICAgICAgICBbXVxuISAgIGwtLS0tLS0tLWogICAgICAgICAgICAgICAgICAgIFtdXG4hICAgICAgICAgICAgIHt9ICAgIHt9ICAgICAge19fX199W11cbiEgICAgICAgICAgICAgbGogICAgbGogICAgICBsLS0tLWpbXVxuPH5+fn5+fn5+fj4gICAgICAgICAgICAgICAgICAgICAgfFtdXG4gICAgICB7fSAgICAgICAgICAgICAgICAgICAgIHxbXSAgICAgICAgICAgICAgIFxuICAgICAgW10gICAgICAgICAgICAgICAgICAgICB8W11cbiAgICAgIFtde19fX199ICAgIHtfX19ffSAgICAgfFtdXG4gICAgICBbXWwtLS0taiAgICBsLS0tLWogICAgIHxbXVxuICAgICAgW10gICAgICAgICAgICAgICAgICAgICB8W11cbiAgICAgIGxqICAgICAgICAgICAgICAgICAgICAgfFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtfX31bXVxuICAgICAgICAgICAgICAgICAgICAgICAgICBsLS1qW11cbnt9e19fX19fX317fXtfX199e317X19fX19fX19ffXt9W11cbmxqWy0tLS0tLV1salsjIyNdbGpbIyMjIyMjIyMjXWxqW11cbnt9e31bXSF+fnxbXXt9bC0tLWp7fWwtLS0tLS0tLS1qe31bXVxubGpbXVtdISAgfFtdbGp+fn5+fmxqICAgICAgICAgICBsaltdXG5gLnNwbGl0KCdcXG4nKTtcblxuICAgIH1cblxuICAgIGxvYWQoKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0VGVycmFpbigpO1xuICAgICAgICB0aGlzLnBvcHVsYXRlTWFwKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3RUZXJyYWluKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbnN0cnVjdGluZyB0ZXJyYWluLi4uXCIpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFwWzBdLmxlbmd0aCArIFwiIHggXCIgKyB0aGlzLm1hcC5sZW5ndGgpXG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHRoaXMubWFwWzBdLmxlbmd0aDsgY29sKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHRoaXMubWFwLmxlbmd0aDsgcm93KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMudGlsZU1hcFt0aGlzLm1hcFtyb3ddW2NvbF1dXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZURpbWVuc2lvbiA9IHRoaXMudGlsZURpbWVuc2lvbnNbdGhpcy5tYXBbcm93XVtjb2xdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgVGVycmFpbih0aGlzLmdhbWVFbmdpbmUsIGNvbCAqIHRoaXMudGlsZVNpemUsIHJvdyAqIHRoaXMudGlsZVNpemUsIFszMiwgMzJdLCB0aGlzLnRpbGVzaGVldCwgdGhpcy5jdHgsIDMsIHRpbGUsIHRpbGVEaW1lbnNpb24pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb3B1bGF0ZU1hcChjaGVja3BvaW50KSB7XG4gICAgICAgIGlmIChjaGVja3BvaW50ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzEoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaGVja3BvaW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlY3Rpb25fMSgpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uTnVtID0gMDtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgSGVhbHRoUGFjayh0aGlzLmdhbWVFbmdpbmUsIDI5MzUsIDEyMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2hlYWx0aHBhY2sucG5nXCIpLCB0aGlzLmN0eCwgMTAsIDgsIDQpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgRW5lcmd5UGFjayh0aGlzLmdhbWVFbmdpbmUsIDI5NjUsIDEyMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2VuZXJneXBhY2sucG5nXCIpLCB0aGlzLmN0eCwgMTAsIDgsIDQpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgSGVhbHRoUGFjayh0aGlzLmdhbWVFbmdpbmUsIDMwMCwgNDAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9oZWFsdGhwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCA0KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEVuZXJneVBhY2sodGhpcy5nYW1lRW5naW5lLCAzMzAsIDQwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvZW5lcmd5cGFjay5wbmdcIiksIHRoaXMuY3R4LCAxMCwgOCwgNCkpO1xuXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEhhbmQodGhpcy5nYW1lRW5naW5lLCAyMzAwLCAxNDUwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgU29sZGllclNoaWVsZCh0aGlzLmdhbWVFbmdpbmUsIDE4MDAsIDE0NTAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBDcm93KHRoaXMuZ2FtZUVuZ2luZSwgMTM1MCwgMTMwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IENyb3codGhpcy5nYW1lRW5naW5lLCAyOTUwLCAxNzAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpKTtcblxuXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFNvbGRpZXJTaGllbGQodGhpcy5nYW1lRW5naW5lLCAxMzAwLCAxMTAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgQ3Jvdyh0aGlzLmdhbWVFbmdpbmUsIDQwMCwgMzAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpKTtcblxuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBEaW5vKHRoaXMuZ2FtZUVuZ2luZSwgMjEzMCwgMTA2MSwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA5MCwgNjAsIDQwMCwgMjUwKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IERpbm8odGhpcy5nYW1lRW5naW5lLCAxOTgwLCA1ODIsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCkpO1xuICAgIH1cbn1cblxuY2xhc3MgTGV2ZWxUd28ge1xuXG4gICAgLyogRGVmaW5lIHRlcnJhaW4gKi9cbiAgICBjb25zdHJ1Y3RvcihnYW1lRW5naW5lLCBhc3NldE1hbmFnZXIsIGN0eCkge1xuXG4gICAgICAgIC8vIGluc3RhbmNlIHZhcmlhYmxlc1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUgPSBnYW1lRW5naW5lO1xuICAgICAgICB0aGlzLmFzc2V0TWFuYWdlciA9IGFzc2V0TWFuYWdlcjtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMudGlsZXNoZWV0ID0gYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL3BpcGVzLnBuZ1wiKTtcbiAgICAgICAgdGhpcy5sZXZlbE51bSA9IDI7XG4gICAgICAgIHRoaXMuc2VjdGlvbk51bTtcbiAgICAgICAgdGhpcy5jaGVja3BvaW50cyA9IFtbLTU3MCwgMTQ0MF0sIFszMjAwLCAxNDQwXSwgWzcwMDAsIDEyMDBdLCBbOTk1NSwgMzg0XV07XG4gICAgICAgIHRoaXMuY2FtVmFscyA9IFtbMiwgMS41XSwgWzIuNzUsIDEuNzVdLCBbMiwgMS41XSwgWzIsIDJdXTtcbiAgICAgICAgdGhpcy5jYW1TcGVlZHMgPSBbWzcsIDddLCBbNywgNF0sIFs0LCA0XSwgWzQsIDRdXTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRDaGVja3BvaW50cyA9IFt0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcbiAgICAgICAgdGhpcy5uZXh0TGV2ZWwgPSAtMTtcbiAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgUG9ydGFsKHRoaXMuZ2FtZUVuZ2luZSwgLTU3MCwgMTQyMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCB0cnVlKTtcblxuICAgICAgICAvL0knZCBsaWtlIHRvIHVzZSBhbiBhcnJheSBvZiBmdW5jdGlvbnMgKHdpbGwgbGV0IHVzIGhhdmUgYW4gYWN0dWFsIExldmVsIHN1cGVyY2xhc3MpXG4gICAgICAgIC8vdGhpcy5zZWN0aW9uRnVuY3Rpb25zID0gbnVsbDtcblxuICAgICAgICB0aGlzLnRpbGVTaXplID0gOTY7XG5cbiAgICAgICAgdGhpcy50aWxlTWFwID0ge1xuICAgICAgICAgICAgJyAnOiBudWxsLFxuICAgICAgICAgICAgLy8gJ1xcbic6IG51bGwsXG4gICAgICAgICAgICAnaSc6IFswLCA2XSxcbiAgICAgICAgICAgICchJzogWzEsIDBdLFxuICAgICAgICAgICAgJ1snOiBbMSwgNF0sXG4gICAgICAgICAgICAnPCc6IFsxLCA2XSxcbiAgICAgICAgICAgICd7JzogWzIsIDBdLFxuICAgICAgICAgICAgJz4nOiBbMiwgNl0sXG4gICAgICAgICAgICAnXyc6IFszLCAwXSxcbiAgICAgICAgICAgICcjJzogWzMsIDFdLFxuICAgICAgICAgICAgJy0nOiBbMywgNF0sXG4gICAgICAgICAgICAnfSc6IFs0LCAwXSxcbiAgICAgICAgICAgICdqJzogWzQsIDNdLFxuICAgICAgICAgICAgJ3wnOiBbNCwgNl0sXG4gICAgICAgICAgICAnbCc6IFsyLCAzXSxcbiAgICAgICAgICAgICd+JzogWzYsIDBdLFxuICAgICAgICAgICAgJ10nOiBbNiwgM10sXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aWxlRGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIC8vYm91bmRXaWR0aCwgYm91bmRIZWlnaHQsIG9mZlgsIG9mZllcbiAgICAgICAgICAgICdpJzogWzE2LCAzMiwgNDQsIDBdLFxuICAgICAgICAgICAgJyEnOiBbMTYsIDMyLCA0NCwgMF0sXG4gICAgICAgICAgICAnWyc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJzwnOiBbMTYsIDE2LCA0NCwgMjRdLFxuICAgICAgICAgICAgJ3snOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICc+JzogWzE2LCAxNiwgMCwgMjRdLFxuICAgICAgICAgICAgJ18nOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICcjJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnLSc6IFszMiwgMzIsIDAsIDBdLFxuICAgICAgICAgICAgJ30nOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICdqJzogWzMyLCAzMiwgMCwgMF0sXG4gICAgICAgICAgICAnfCc6IFsxNiwgMzIsIDQsIDBdLFxuICAgICAgICAgICAgJ2wnOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgICAgICd+JzogWzMyLCAxNiwgMCwgMjRdLFxuICAgICAgICAgICAgJ10nOiBbMzIsIDMyLCAwLCAwXSxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIwIGxpbmVzIGZyb20gdG9wIHRvIGJvdHRvbVxuICAgICAgICB0aGlzLm1hcCA9XG4gICAgICAgICAgICBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+ICAgICB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgIFtdICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW11cbiAgICAgICAgIDx+fn5+fj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx+fiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9e317X19fX19ffXt9e19fX317fXtfX19fX19fX199e317fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgIHt9ICAgICAgICAgICAgICBbXWxqbC0tLS0tLWpsamwtLS1qbGpsLS0tLS0tLS0tamxqW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbntfX199e317fXtfX19fX199e317X19ffXt9e19fX19fX19fX317fVtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuWyMjI11samxqWyMjIyMjI11samwtLS1qW11sLS0tLS0tLS0tamxqW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1qXG5bIyMjXSAgICBbIyMjIyMjXSAgICAgICBbXSAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5bIyMjXSAgICBbIyMjIyMjXSAgICAgICBbXSAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5bIyMjXSAgICBbIyMjIyMjXSAgICAgICBbXSAgICAgICAgICAgICBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuYC5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgdGhpcy5tYXBTdGFydCA9IFxuYHtffVxubC1qXG5gLnNwbGl0KCdcXG4nKTtcblxuICAgIH1cblxuICAgIGxvYWQoKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0VGVycmFpbigpO1xuICAgICAgICAvL21hcFN0YXJ0ICh0aGlzIHNhdmVzIHdvcmsgZm9yIG5vdy4gTm90IGdvb2QgcHJhY3RpY2UuIFVubGVzcyB3ZSBmb3JtYWxpemUgaXQ/KVxuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCB0aGlzLm1hcFN0YXJ0WzBdLmxlbmd0aDsgY29sKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHRoaXMubWFwU3RhcnQubGVuZ3RoOyByb3crKykge1xuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy50aWxlTWFwW3RoaXMubWFwU3RhcnRbcm93XVtjb2xdXTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWxlRGltZW5zaW9uID0gdGhpcy50aWxlRGltZW5zaW9uc1t0aGlzLm1hcFN0YXJ0W3Jvd11bY29sXV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFRlcnJhaW4odGhpcy5nYW1lRW5naW5lLCAtNjUwICsgY29sICogdGhpcy50aWxlU2l6ZSwgMTQ0MCArIHJvdyAqIHRoaXMudGlsZVNpemUsIFszMiwgMzJdLCB0aGlzLnRpbGVzaGVldCwgdGhpcy5jdHgsIDMsIHRpbGUsIHRpbGVEaW1lbnNpb24pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3B1bGF0ZU1hcCgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdFRlcnJhaW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uc3RydWN0aW5nIHRlcnJhaW4uLi5cIilcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tYXBbMF0ubGVuZ3RoICsgXCIgeCBcIiArIHRoaXMubWFwLmxlbmd0aClcbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgdGhpcy5tYXBbMF0ubGVuZ3RoOyBjb2wrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgdGhpcy5tYXAubGVuZ3RoOyByb3crKykge1xuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gdGhpcy50aWxlTWFwW3RoaXMubWFwW3Jvd11bY29sXV07XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGlsZURpbWVuc2lvbiA9IHRoaXMudGlsZURpbWVuc2lvbnNbdGhpcy5tYXBbcm93XVtjb2xdXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgVGVycmFpbih0aGlzLmdhbWVFbmdpbmUsIGNvbCAqIHRoaXMudGlsZVNpemUsIHJvdyAqIHRoaXMudGlsZVNpemUsIFszMiwgMzJdLCB0aGlzLnRpbGVzaGVldCwgdGhpcy5jdHgsIDMsIHRpbGUsIHRpbGVEaW1lbnNpb24pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb3B1bGF0ZU1hcChjaGVja3BvaW50KSB7XG4gICAgICAgIGlmIChjaGVja3BvaW50ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzEoKTtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbl8yKCk7XG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25fMygpO1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaGVja3BvaW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja3BvaW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja3BvaW50ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja3BvaW50ID09PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uXzQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qRGVmaW5lIFNlY3Rpb25zKi9cbiAgICBzZWN0aW9uXzEoKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbk51bSA9IDA7XG4gICAgICAgIC8qKipIQVpBUkRTKioqL1xuXG4gICAgICAgIC8qKipFTkVNSUVTKioqL1xuICAgICAgICB2YXIgaGFuZDEgPSBuZXcgSGFuZCh0aGlzLmdhbWVFbmdpbmUsIDIyODMsIDEzNDQsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCk7XG4gICAgICAgIGhhbmQxLmRpc3RhbmNlID0gNzU7XG4gICAgICAgIGhhbmQxLnNpZ2h0UmFkaXVzWzBdID0gMjMwMDtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShoYW5kMSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IENyb3codGhpcy5nYW1lRW5naW5lLCA1MDAsIDEwMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgNTAsIDQwLCBbMzAwLCAxMDAwXSkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBEaW5vKHRoaXMuZ2FtZUVuZ2luZSwgMTQ2MCwgOTg0LCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDkwLCA2MCwgLypwYXRyb2wgZGlzdGFuY2UqLzMwMCwgLypzaG90IHRpbWUgb2Zmc2V0Ki8gMCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBDcm93KHRoaXMuZ2FtZUVuZ2luZSwgMjMwMCwgMTAwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA1MCwgNDAsXG4gICAgICAgICAgICAvKnNpZ2h0UmFkaXVzKi9bMzAwLCAxMDAwXSwgLypNdXJkZXIgUGFyYW1ldGVycyovdHJ1ZSwgW1stNjAwLCAyMDBdLCBbNDAwLCA0MDBdXSkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBTb2xkaWVyU2hpZWxkKHRoaXMuZ2FtZUVuZ2luZSwgMTAwMCwgMTQ0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEhhbmQodGhpcy5nYW1lRW5naW5lLCAzMjAwLCAxNDQwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgpKTtcbiAgICAgICAgLy90aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBEaW5vKHRoaXMuZ2FtZUVuZ2luZSwgMzAwMCwgMTQ0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA5MCwgNjAsIC8qcGF0cm9sIGRpc3RhbmNlKi8wLCAvKnNob3QgdGltZSBvZmZzZXQqLyAxMjUpKTtcblxuICAgICAgICAvKioqSVRFTVMqKiovXG5cbiAgICAgICAgLyoqKlRPUCBMQVlFUiBFTlRJVElFUyoqKi9cblxuICAgIH1cblxuICAgIHNlY3Rpb25fMigpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uTnVtID0gMTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgSGFuZCh0aGlzLmdhbWVFbmdpbmUsIDY4MjUsIDk4NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdW5jaGVyKHRoaXMuZ2FtZUVuZ2luZSwgNjg3NSwgNzkyICsgMiAqIDcwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDgsIDgsIFstMSwgMF0sIDkwLCAzNTAsIDIwKSlcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgTGF1bmNoZXIodGhpcy5nYW1lRW5naW5lLCA2ODc1IC0gOTUsIDk4NCArIDIgKiA3MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA4LCA4LCBbLTEsIDBdLCA5MCwgMzUwLCA1MCkpXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdW5jaGVyKHRoaXMuZ2FtZUVuZ2luZSwgNjg3NSwgMTE3NiArIDIgKiA3MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA4LCA4LCBbLTEsIDBdLCA0NSwgMzUwLCA2MCkpXG4gICAgfVxuXG4gICAgc2VjdGlvbl8zKCkge1xuICAgICAgICB0aGlzLnNlY3Rpb25OdW0gPSAyO1xuICAgICAgICAvKioqQk9UVE9NIExBWUVSIEVOVElUSUVTKioqL1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBIZWFsdGhQYWNrKHRoaXMuZ2FtZUVuZ2luZSwgODY2NSwgOTUwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9oZWFsdGhwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCA0LCAxNSkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBFbmVyZ3lQYWNrKHRoaXMuZ2FtZUVuZ2luZSwgODYzNSwgMTAwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvZW5lcmd5cGFjay5wbmdcIiksIHRoaXMuY3R4LCAxMCwgOCwgNCwgMTUpKTtcblxuICAgICAgICAvKioqSEFaQVJEUyoqKi9cbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgRmlyZWJhbGwodGhpcy5nYW1lRW5naW5lLCA3MzAwLCAxNDUwIC0gMTQwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLypjb29sZG93biovIDUwLCAvKnNwZWVkKi8gMjApKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgRmlyZWJhbGwodGhpcy5nYW1lRW5naW5lLCA3ODIwLCAxNDUwIC0gMTQwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLypjb29sZG93biovIDUwLCAvKnNwZWVkKi8gMjAsIC8qb2Zmc2V0Ki8gMjUpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgNzUxMixcbiAgICAgICAgICAgIDExNTIgKyA0NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLCAyMCAqIDQsIDAsIDMpKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgNzk4MCxcbiAgICAgICAgICAgIDEwNTYgKyA0NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLCAyMCAqIDQsIDIwLCAzKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIDg2NjUsXG5cbiAgICAgICAgICAgIDExNTAgKyA0NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLCAyMCAqIDMuNSwgNDAsIDApKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgNzY5MixcbiAgICAgICAgICAgIDcwMCArIDQ0LCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDIsIHRydWUsIDIwICogNC41LCAwLCAzKSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIDgwNjQsXG4gICAgICAgICAgICAyNTAgKyA0NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLCAyMCAqIDcsIDQwLCAyMCkpO1xuXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdW5jaGVyKHRoaXMuZ2FtZUVuZ2luZSwgNzk2NSwgLTMwMCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCA3LCA3LCBbMCwgMV0sIDEyMCwgMTYwKSlcblxuICAgICAgICAvKioqRU5FTUlFUyoqKi9cbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgQ3Jvdyh0aGlzLmdhbWVFbmdpbmUsIDg2NTAsIC0zMDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgNTAsIDQwLFxuICAgICAgICAgICAgWzI1LCAxMDAwXSwgdHJ1ZSwgW1stNjAwLCAyNTBdLCBbNjAwLCAyNTBdXSkpO1xuXG4gICAgICAgIC8qKipJVEVNUyoqKi9cbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgSGVhbHRoUGFjayh0aGlzLmdhbWVFbmdpbmUsIDcwNTAsIDEyNDgsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2hlYWx0aHBhY2sucG5nXCIpLCB0aGlzLmN0eCwgMTAsIDgsIDQsIDE1KSk7XG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IEVuZXJneVBhY2sodGhpcy5nYW1lRW5naW5lLCA3MDgwLCAxMjQ4LCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9lbmVyZ3lwYWNrLnBuZ1wiKSwgdGhpcy5jdHgsIDEwLCA4LCA0LCAxNSkpO1xuXG4gICAgICAgIC8qKipUT1AgTEFZRVIgRU5USVRJRVMqKiovXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdmEodGhpcy5nYW1lRW5naW5lLCA3NTAwLCAxNDAwIC0gMTQwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDMwMCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBMYXZhKHRoaXMuZ2FtZUVuZ2luZSwgODQwMCwgMTQwMCAtIDE0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCAzMDApKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgTGF2YSh0aGlzLmdhbWVFbmdpbmUsIDkzMDAsIDE0MDAgLSAxNDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgMzAwKSk7XG4gICAgfVxuXG4gICAgc2VjdGlvbl80KCkge1xuICAgICAgICB0aGlzLnNlY3Rpb25OdW0gPSAzO1xuICAgICAgICB2YXIgc3Bpa2VzT3JpZ2luID0gWzEwNTcwIC0gMjgsIDc5MCArIDQ2XVxuICAgICAgICB2YXIgc3Bpa2VPZmZzZXRzID0gW1xuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzEgKiA0NTAgLSAyMDAsIDEgKiAtMjUwXSxcbiAgICAgICAgICAgIFsyICogNDUwIC0gMTI1LCAyICogLTI1MF0sXG4gICAgICAgICAgICBbMyAqIDQ1MCAtIDEyNSwgMiAqIC0yNTBdLFxuICAgICAgICAgICAgWzQgKiA0NTAgLSAyMDAsIDEgKiAtMjUwXSxcbiAgICAgICAgICAgIFs1ICogNDUwIC0gMzc1LCAwICogLTI1MF0sXG4gICAgICAgICAgICBbMyAqIDQ1MCAtIDc1LCAtMSAqIC0yNTBdLFxuICAgICAgICAgICAgWzIgKiA0NTAgLSAyMjUsIC0xICogLTI1MF0sXG4gICAgICAgICAgICBbMyAqIDQ1MCAtIDM1MCwgMSAqIC01MF0sXG4gICAgICAgIF1cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgdGltZSA9IDgwO1xuICAgICAgICAvKioqSEFaQVJEUyoqKi9cbiAgICAgICAgdmFyIHNwaWtlczEgPSBuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgc3Bpa2VzT3JpZ2luWzBdICsgc3Bpa2VPZmZzZXRzW2ldWzBdLCBzcGlrZXNPcmlnaW5bMV0gKyBzcGlrZU9mZnNldHNbaSsrXVsxXSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSxcbiAgICAgICAgICAgIHRpbWUsIDQwLCAyLCAwKTtcblxuICAgICAgICB2YXIgc3Bpa2VzMiA9IG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCBzcGlrZXNPcmlnaW5bMF0gKyBzcGlrZU9mZnNldHNbaV1bMF0sIHNwaWtlc09yaWdpblsxXSArIHNwaWtlT2Zmc2V0c1tpKytdWzFdLFxuICAgICAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLFxuICAgICAgICAgICAgdGltZSwgNjAsIDIsIDApO1xuXG4gICAgICAgIHZhciBzcGlrZXMzID0gbmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIHNwaWtlc09yaWdpblswXSArIHNwaWtlT2Zmc2V0c1tpXVswXSwgc3Bpa2VzT3JpZ2luWzFdICsgc3Bpa2VPZmZzZXRzW2krK11bMV0sXG4gICAgICAgICAgICB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDIsIHRydWUsXG4gICAgICAgICAgICB0aW1lLCA4MCwgMiwgMCk7XG5cbiAgICAgICAgdmFyIHNwaWtlczQgPSBuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgc3Bpa2VzT3JpZ2luWzBdICsgc3Bpa2VPZmZzZXRzW2ldWzBdLCBzcGlrZXNPcmlnaW5bMV0gKyBzcGlrZU9mZnNldHNbaSsrXVsxXSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSxcbiAgICAgICAgICAgIHRpbWUsIDgwLCAyLCAwKTtcblxuICAgICAgICB2YXIgc3Bpa2VzNSA9IG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCBzcGlrZXNPcmlnaW5bMF0gKyBzcGlrZU9mZnNldHNbaV1bMF0sIHNwaWtlc09yaWdpblsxXSArIHNwaWtlT2Zmc2V0c1tpKytdWzFdLFxuICAgICAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLFxuICAgICAgICAgICAgdGltZSwgNjAsIDIsIDApO1xuXG4gICAgICAgIHZhciBzcGlrZXM2ID0gbmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIHNwaWtlc09yaWdpblswXSArIHNwaWtlT2Zmc2V0c1tpXVswXSwgc3Bpa2VzT3JpZ2luWzFdICsgc3Bpa2VPZmZzZXRzW2krK11bMV0sXG4gICAgICAgICAgICB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDIsIHRydWUsXG4gICAgICAgICAgICB0aW1lLCA0MCwgMiwgMCk7XG5cbiAgICAgICAgdmFyIHNwaWtlczcgPSBuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgc3Bpa2VzT3JpZ2luWzBdICsgc3Bpa2VPZmZzZXRzW2ldWzBdLCBzcGlrZXNPcmlnaW5bMV0gKyBzcGlrZU9mZnNldHNbaSsrXVsxXSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMiwgdHJ1ZSxcbiAgICAgICAgICAgIHRpbWUsIDIwLCAyLCAwKTtcblxuICAgICAgICB2YXIgc3Bpa2VzOCA9IG5ldyBTcGlrZXModGhpcy5nYW1lRW5naW5lLCBzcGlrZXNPcmlnaW5bMF0gKyBzcGlrZU9mZnNldHNbaV1bMF0sIHNwaWtlc09yaWdpblsxXSArIHNwaWtlT2Zmc2V0c1tpKytdWzFdLFxuICAgICAgICAgICAgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLFxuICAgICAgICAgICAgdGltZSwgMjAsIDIsIDApO1xuXG4gICAgICAgIHZhciBzcGlrZXM5ID0gbmV3IFNwaWtlcyh0aGlzLmdhbWVFbmdpbmUsIHNwaWtlc09yaWdpblswXSArIHNwaWtlT2Zmc2V0c1tpXVswXSwgc3Bpa2VzT3JpZ2luWzFdICsgc3Bpa2VPZmZzZXRzW2krK11bMV0sXG4gICAgICAgICAgICB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDIsIHRydWUsXG4gICAgICAgICAgICB0aW1lLCAwLCAyLCAwKTtcbiAgICAgICAgLy90aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBIYXphcmRzW1wicHJvamVjdGlsZS1jaXJjbGVcIl0odGhpcy5nYW1lRW5naW5lLCAxMTYwMCwgODAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDEwLCAxMCwgMTAwKSlcblxuXG4gICAgICBcbiAgICAgICAgLyoqKkVORU1JRVMqKiovXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IENyb3codGhpcy5nYW1lRW5naW5lLCAxMjE1MCwgOTAwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDUwLCA0MCxcbiAgICAgICAgICAgIFs2NTAsIDUwMF0sIHRydWUsIFtbLTEyMDAsIDBdLCBbLTYwMCwgLTcwMF1dKSk7XG5cbiAgICAgICAgLyoqKklURU1TKioqL1xuXG4gICAgICAgIC8qKipUT1AgTEFZRVIgRU5USVRJRVMqKiovXG4gICAgICAgIHRoaXMuZ2FtZUVuZ2luZS5hZGRFbnRpdHkobmV3IExhdmEodGhpcy5nYW1lRW5naW5lLCAxMDIwMCwgMTQwMCAtIDE0MCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAzLCAzMDApKTtcbiAgICAgICAgdGhpcy5nYW1lRW5naW5lLmFkZEVudGl0eShuZXcgTGF2YSh0aGlzLmdhbWVFbmdpbmUsIDExMTAwLCAxNDAwIC0gMTQwLCB0aGlzLmFzc2V0TWFuYWdlci5nZXRBc3NldChcImltZy9FbmVtaWVzLnBuZ1wiKSwgdGhpcy5jdHgsIDMsIDMwMCkpO1xuICAgICAgICB0aGlzLmdhbWVFbmdpbmUuYWRkRW50aXR5KG5ldyBMYXZhKHRoaXMuZ2FtZUVuZ2luZSwgMTIwMDAsIDE0MDAgLSAxNDAsIHRoaXMuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL0VuZW1pZXMucG5nXCIpLCB0aGlzLmN0eCwgMywgMzAwKSk7XG4gICAgICAgIHZhciBzcGlrZXNCb3JkZXIgPSBuZXcgU3Bpa2VzKHRoaXMuZ2FtZUVuZ2luZSwgMTI1NDMgLSAyMCxcbiAgICAgICAgICAgIDEyNDggKyA0NCwgdGhpcy5hc3NldE1hbmFnZXIuZ2V0QXNzZXQoXCJpbWcvRW5lbWllcy5wbmdcIiksIHRoaXMuY3R4LCAyLCB0cnVlLCAyMCAqIDUsIDIwICogMywgMiwgMCk7XG4gICAgfVxufVxuXG5jbGFzcyBQb3J0YWwgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICAvL3RoaXMueSArPSA0NDsgR2l2ZSBhICs0NCBvZmZzZXQgd2hlbiBpbnN0YW50aWF0aW5nIFxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogOCArIDM7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogOCArIDM7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5zY2FsZSAqIDU7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlIC8gMiArIDUgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAyMDtcbiAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gMDtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAxMSwgOCwgNSwgOCwgZmFsc2UsIHRoaXMuc2NhbGUpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvb2xkb3duVGltZXIgPSB0aGlzLmNvb2xkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29vbGRvd25UaW1lci0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvL01ha2Ugbm9pc2Ugd2hlbiBoZXJvIGNvbGxpZGVzP1xuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHtMZXZlbE9uZSwgTGV2ZWxUd299IiwiY2xhc3MgU291bmQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc291bmRzID0ge1xuICAgICAgICAgICAgXCJoZXJvX2h1cnRcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9kc29vZi53YXZcIiksXG4gICAgICAgICAgICBcImhlcm9fc2hvb3RcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9oZXJvLXNob290LndhdlwiKSxcbiAgICAgICAgICAgIFwiZW5lbXlfc2hvb3RcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9zaG9vdC0xLndhdlwiKSxcbiAgICAgICAgICAgIFwiYXJyb3dfZmlyZVwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL0Fycm93LUZpcmUud2F2XCIpLFxuICAgICAgICAgICAgXCJjcm93X2Nhd1wiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2Nyb3ctY2F3LndhdlwiKSxcbiAgICAgICAgICAgIFwiZW5lbXlfaHVydF8xXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZW5lbXktaHVydC0xLndhdlwiKSxcbiAgICAgICAgICAgIFwiZW5lcmd5X2xhdW5jaGVyXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZW5lcmd5LWxhdW5jaGVyLndhdlwiKSxcbiAgICAgICAgICAgIFwiZXhwbG9zaW9uXzFcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9leHBsb3Npb24tMS53YXZcIiksXG4gICAgICAgICAgICBcImxhdmFfYmFsbFwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2xhdmEtYmFsbC53YXZcIiksXG4gICAgICAgICAgICBcInNoaWVsZF9ibG9ja1wiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL3NoaWVsZC1ibG9jay53YXZcIiksXG4gICAgICAgICAgICBcInN3b3JkX3N3aW5nXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vc3dvcmQtc3dpbmcud2F2XCIpLFxuICAgICAgICAgICAgXCJvdXRfb2ZfZW5lcmd5XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vb29lLndhdlwiKSxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuX2R1cHMgPSA1XG4gICAgICAgIGZvciAodmFyIHNvdW5kIGluIHRoaXMuc291bmRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3VuZHMuaGFzT3duUHJvcGVydHkoc291bmQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdID0ge1xuICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRcIjogMCxcbiAgICAgICAgICAgICAgICAgICAgXCJtYXhcIjogbl9kdXBzLFxuICAgICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOiB0aGlzLm1ha2VfZHVwbGljYXRlcyhzb3VuZCwgbl9kdXBzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyogUmV0dXJucyBhIGxpc3Qgb2Ygbl9kdXAgZHVwbGljYXRlZCBBdWRpbyBvYmplY3RzICovXG4gICAgbWFrZV9kdXBsaWNhdGVzKHNvdW5kLCBuX2R1cD01KSB7XG4gICAgICAgIGxldCBjdXJyX3NvdW5kID0gdGhpcy5zb3VuZHNbc291bmRdXG4gICAgICAgIGxldCBzb3VuZF9saXN0ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbl9kdXA7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNsb25lID0gY3Vycl9zb3VuZC5jbG9uZU5vZGUoKVxuICAgICAgICAgICAgc291bmRfbGlzdC5wdXNoKGNsb25lKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3VuZF9saXN0XG4gICAgfVxuXG5cbiAgICAvKiBwbGF5cyBhIHNvdW5kICovXG4gICAgcGxheShzb3VuZCwgdm9sdW1lPTAuNSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNvdW5kc1tzb3VuZF1bXCJjdXJyZW50XCJdXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLnNvdW5kc1tzb3VuZF1bXCJtYXhcIl0tMSkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wiY3VycmVudFwiXSA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleF0uZW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleCsxXS5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleCsxXS52b2x1bWUgPSB2b2x1bWVcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleCsxXS5wbGF5KClcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcImN1cnJlbnRcIl0gKz0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4XS5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleF0udm9sdW1lID0gdm9sdW1lXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXhdLnBsYXkoKVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb3VuZDsiXSwic291cmNlUm9vdCI6IiJ9