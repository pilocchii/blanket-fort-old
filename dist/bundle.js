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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module 'asset-manager'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (AssetManager) {
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

  return Animation;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

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
!(function webpackMissingModule() { var e = new Error("Cannot find module './camera'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _entities_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/entity */ "./src/entities/entity.js");
/* harmony import */ var _entities_entity__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_entities_entity__WEBPACK_IMPORTED_MODULE_1__);
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "launch": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 9, 17, 5, 1, true, _this.scale, 11),
      "activate": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 9, 17, 7, 2, true, _this.scale, 12),
      "detonate": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 9, 17, 6, 1, true, _this.scale, 14),
      "explode": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [60, 60], 4, 17, 5, 7, false, _this.scale + 3, 10)
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "bullet": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 2, 18, 20, 2, true, _this.scale, 16)
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
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_entity__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation */ "./src/animation.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_1__);
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
}(_entity__WEBPACK_IMPORTED_MODULE_0___default.a);

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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "fly": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 8, 11, 5, 5, true, _this.scale),
      "attack": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 8, 11, 6, 3, false, _this.scale, 5),
      "attack_final": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 8, 11, 6, 2, true, _this.scale, 8),
      "hurt": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 8, 11, 5, 1, true, _this.scale, 10) //TODO: Add "smokebomb" effect for activation

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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [90, 60], 6, 13, 5, 1, true, _this.scale, 12),
      "walk_straight": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [90, 60], 6, 13, 9, 6, true, _this.scale),
      //"walk_down":        new Animation(this.img, [90, 60], 6, 13, 7, 6, true, this.scale, 6),
      //"walk_up":          new Animation(this.img, [90, 70], 6, 18, 7, 6, true, this.scale),//90x70
      //"shoot_up":         new Animation(this.img, [90, 70], 6, 18, 7, 4, false, this.scale, 6),//90x70
      "shoot_diagonal": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [90, 70], 6, 18, 7, 4, false, _this.scale, 10) //90x70
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module 'actor'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module 'animation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Actor, Animation) {
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
  }(Actor);

  return Enemy;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./src/entities/entity.js":
/*!********************************!*\
  !*** ./src/entities/entity.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module 'animation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Animation) {
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


  return Entity;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./src/entities/flames.js":
/*!********************************!*\
  !*** ./src/entities/flames.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module 'actor'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module 'animation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Actor, Animation) {
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
        "demo": new Animation(_this.img, [_this.spriteWidth, _this.spriteHeight], 8, 9, 10, 9, true, _this.scale)
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
  }(Actor);

  return Flames;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

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
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_entity__WEBPACK_IMPORTED_MODULE_0__);
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
}(_entity__WEBPACK_IMPORTED_MODULE_0___default.a); // end GameBoard class
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
}(_entity__WEBPACK_IMPORTED_MODULE_0___default.a);

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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 9, 11, 5, 1, true, _this.scale),
      "startup": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 9, 11, 5, 4, false, _this.scale, 1),
      "throw": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 9, 11, 3, 1, true, _this.scale, 5),
      "recover": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 9, 11, 6, 3, false, _this.scale, 6)
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, 128], 7, 1, 7, 8, true, _this.scale)
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
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 6, true, _this2.scale, 6),
      "start": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 6),
      "middle_up": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 7),
      "peak_up": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 8),
      "peak_down": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 9),
      "middle_down": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 10),
      "finish": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [_this2.spriteWidth, _this2.spriteHeight], 9, 13, 3, 1, true, _this2.scale, 11)
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
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this3.img, [_this3.spriteWidth, _this3.spriteHeight], 9, 6, 5, 5, false, _this3.scale, 1),
      "inactive_up": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this3.img, [_this3.spriteWidth, _this3.spriteHeight], 9, 6, 10, 1, true, _this3.scale, 3),
      "inactive_down": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this3.img, [_this3.spriteWidth, _this3.spriteHeight], 9, 6, 3, 1, true, _this3.scale)
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
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this4.img, [_this4.spriteWidth, _this4.spriteHeight], 9, 13, 3, 1, true, _this4.scale, 12)
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
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this5.img, [_this5.spriteWidth, _this5.spriteHeight], 9, 13, 3, 1, true, _this5.scale, 12)
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
      "active": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this6.img, [_this6.spriteWidth, _this6.spriteHeight], 9, 13, 3, 1, true, _this6.scale, 20)
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _terrain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terrain */ "./src/entities/terrain.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectile */ "./src/entities/projectile.js");
/* harmony import */ var _projectile_sword__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectile-sword */ "./src/entities/projectile-sword.js");
/* harmony import */ var _soldier_shield__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./soldier-shield */ "./src/entities/soldier-shield.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enemy */ "./src/entities/enemy.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_enemy__WEBPACK_IMPORTED_MODULE_5__);
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
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 0, 9, 3, 9, true, _this.scale),
      //50x50
      "stun": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 0, 13, 4, 4, false, _this.scale, 9),
      "dead": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 0, 18, 5, 5, true, _this.scale, 13),
      "run": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 1, 22, 3, 11, true, _this.scale),
      //50x50
      //Takeoff?
      "ascend": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 2, 8, 3, 4, true, _this.scale, 2),
      //50x50
      "descend": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 2, 14, 3, 4, true, _this.scale, 8),
      //50x50
      //Land?
      "airshoot": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 2, 20, 3, 6, false, _this.scale, 14),
      //50x50
      "shoot": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [80, 60], 3, 3, 6, 3, false, _this.scale),
      //80x60
      "gunrun": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [60, 60], 1, 22, 3, 11, true, _this.scale, 11),
      //50x50
      "slash": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [90, 60], 4, 11, 2, 11, false, _this.scale),
      //80x50
      "cleave": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [100, 70], 9, 13, 2, 13, false, _this.scale),
      //80x60
      "dash": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [60, 60], 5, 7, 3, 7, false, _this.scale),
      "dash_start": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [60, 60], 5, 7, 3, 1, false, _this.scale),
      "dash_mid": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [60, 60], 5, 7, 3, 5, false, _this.scale, 1),
      "dash_end": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [60, 60], 5, 7, 3, 1, false, _this.scale, 5)
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_enemy__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Enemy", function() { return _enemy__WEBPACK_IMPORTED_MODULE_6___default.a; });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_entity__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity__WEBPACK_IMPORTED_MODULE_7___default.a; });
/* harmony import */ var _flames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./flames */ "./src/entities/flames.js");
/* harmony import */ var _flames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_flames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Flames", function() { return _flames__WEBPACK_IMPORTED_MODULE_8___default.a; });
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
/* harmony import */ var _leo__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_leo__WEBPACK_IMPORTED_MODULE_15__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Leo", function() { return _leo__WEBPACK_IMPORTED_MODULE_15___default.a; });
/* harmony import */ var _projectile_sword__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./projectile-sword */ "./src/entities/projectile-sword.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileSword", function() { return _projectile_sword__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./projectile */ "./src/entities/projectile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Projectile", function() { return _projectile__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _reflectbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./reflectbox */ "./src/entities/reflectbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reflectbox", function() { return _reflectbox__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _rocket__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./rocket */ "./src/entities/rocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rocket", function() { return _rocket__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _shotblast__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./shotblast */ "./src/entities/shotblast.js");
/* harmony import */ var _shotblast__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_shotblast__WEBPACK_IMPORTED_MODULE_20__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Shotblast", function() { return _shotblast__WEBPACK_IMPORTED_MODULE_20___default.a; });
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
    _this2.animation = new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this2.img, [10, 8], 0, 4, 4, 4, true, _this2.scale, 0);
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
    _this3.animation = new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this3.img, [8, 8], 0, 4, 4, 4, true, _this3.scale, 0);
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module 'actor'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module 'animation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module 'enemy'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Actor, Animation, Enemy) {
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
        "lunge": new Animation(_this.img, [80, 60], 0, 7, 7, 7, false, _this.scale),
        "attack": new Animation(_this.img, [70, 80], 3, 11, 7, 11, false, _this.scale),
        "firelunge": new Animation(_this.img, [70, 70], 2, 8, 7, 8, false, _this.scale),
        "idle": new Animation(_this.img, [80, 60], 3, 11, 100, 1, true, _this.scale)
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
  }(Enemy);

  return Leo;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "start": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, _this.spriteHeight], 4, 18, 7, 2, false, _this.scale, 11),
      "stable": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, _this.spriteHeight], 4, 18, 7, 1, true, _this.scale, 13),
      "recovery": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, _this.spriteHeight], 4, 18, 7, 4, false, _this.scale, 14)
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "green_exiting": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 15, 6, 8, false, _this.scale, 4),
      "green_stable": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 15, 6, 4, true, _this.scale, 11),
      "blue_exiting": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 23, 6, 8, false, _this.scale, 15),
      "blue_stable": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [_this.spriteWidth, _this.spriteHeight], 3, 23, 6, 3, true, _this.scale, 20)
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "rocket": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [90, 60], 6, 20, 5, 7, true, _this.scale, 13)
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module 'actor'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module 'animation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Actor, Animation) {
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
        "shotblast": new Animation(_this.img, [spriteWidth, spriteHeight], 2, 18, 4, 6, false, _this.scale, 10)
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
  }(Actor);

  return Shotblast;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

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
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_animation__WEBPACK_IMPORTED_MODULE_0__);
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
      "idle": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 0, 15, 5, 6, true, _this.scale),
      "turn": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 0, 15, 3, 5, false, _this.scale, 6),
      "block": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 0, 15, 9, 4, false, _this.scale, 11),
      "run": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 1, 12, 3, 12, true, _this.scale),
      "shoot_startup": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 2, 18, 2, 5, false, _this.scale),
      "shoot_active": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 2, 18, 4, 5, false, _this.scale, 5),
      "shoot_recover": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [spriteWidth, spriteHeight], 2, 18, 4, 1, true, _this.scale, 9),
      "slash_start": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [100, 60], 3, 16, 2, 9, false, _this.scale),
      "slash_end": new _animation__WEBPACK_IMPORTED_MODULE_0___default.a(_this.img, [100, 60], 3, 16, 3, 7, false, _this.scale, 9)
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
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_entity__WEBPACK_IMPORTED_MODULE_0__);
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
}(_entity__WEBPACK_IMPORTED_MODULE_0___default.a); // end Terrain


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvYWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2JvbWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2J1bGxldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9jcm93LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9kaW5vLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9lbmVteS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9mbGFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hhemFyZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2h1cnRib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9sZW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUtc3dvcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JlZmxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3JvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvc2hvdGJsYXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9zb2xkaWVyLXNoaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvdGVycmFpbi1tb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL3RlcnJhaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9odWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvdW5kLmpzIl0sIm5hbWVzIjpbIkFzc2V0TWFuYWdlciIsIkFuaW1hdGlvbiIsInNwcml0ZVNoZWV0IiwiZnJhbWVEaW1lbnNpb25zIiwicm93Iiwic2hlZXRXaWR0aCIsImZyYW1lRHVyYXRpb24iLCJmcmFtZXMiLCJsb29wIiwic2NhbGUiLCJjb2x1bW5PZmZzZXQiLCJmcmFtZVdpZHRoIiwiZnJhbWVIZWlnaHQiLCJ0b3RhbFRpbWUiLCJlbGFwc2VkVGltZSIsImxvb3BzIiwidGljayIsImN0eCIsIngiLCJ5IiwiZmFjaW5nUmlnaHQiLCJpc0RvbmUiLCJmcmFtZSIsImN1cnJlbnRGcmFtZSIsInhpbmRleCIsInlpbmRleCIsImRyb3ciLCJNYXRoIiwiZmxvb3IiLCJzYXZlIiwidHJhbnNsYXRlIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsImRvd25sb2FkUXVldWUiLCJzdWNjZXNzQ291bnQiLCJlcnJvckNvdW50IiwiY2FjaGUiLCJwYXRoIiwicHVzaCIsImxlbmd0aCIsImNhbGxiYWNrIiwid2luZG93Iiwic2V0VGltZW91dCIsImkiLCJpbWciLCJJbWFnZSIsInRoYXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3JjIiwiTGF5ZXIiLCJzcmNfZGltZW5zaW9ucyIsImNhbWVyYSIsInNjcm9sbF9zcGVlZCIsImhlaWdodF9mYWN0b3IiLCJkZXN0X3kiLCJzdHJldGNoIiwic3JjX3dpZHRoIiwic3JjX2hlaWdodCIsImNhbWVyYV9kaW1lbnNpb25zIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJkX2hlaWdodCIsImRfeSIsInhWaWV3IiwiQmFja2dyb3VuZCIsImdhbWVfZW5naW5lIiwiYXNzZXRfbWFuYWdlciIsImxheWVycyIsIm1ha2VfYmFja2dyb3VuZCIsImFkZEJhY2tncm91bmRMYXllciIsImdldEFzc2V0IiwidG9sb2FkIiwiQVNTRVRfTUFOQUdFUiIsImRvd25sb2FkQWxsIiwiY29uc29sZSIsImxvZyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiLCJnYW1lRW5naW5lIiwiaGVybyIsImJvYXJkIiwiZ2FtZWJvYXJkIiwiaHVkIiwiYWRkRW50aXR5IiwiYmFja2dyb3VuZCIsImdldExldmVsIiwiZm9sbG93IiwiaW5pdCIsInN0YXJ0IiwiQWN0b3IiLCJnYW1lIiwic3ByaXRlV2lkdGgiLCJzcHJpdGVIZWlnaHQiLCJwYXJlbnRDbGFzcyIsImZhY2luZyIsInN0YXRlcyIsImFuaW1hdGlvbnMiLCJhbmltYXRpb24iLCJib3VuZFgiLCJib3VuZFkiLCJjb29yZGluYXRlcyIsIkJvbWIiLCJ4VmVsb2NpdHkiLCJ5VmVsb2NpdHkiLCJjZW50ZXJYIiwiYm91bmRXaWR0aCIsImJvdW5kSGVpZ2h0Iiwic2lnaHRSYWRpdXMiLCJoZWFsdGgiLCJkYW1hZ2UiLCJsYXVuY2h0aW1lIiwiY291bnRkb3duIiwic3RhcnR1cCIsImZyaWN0aW9uIiwibGF1bmNoIiwibGF1bmNoaW5nIiwidXBkYXRlUG9zIiwiYWN0aXZhdGluZyIsInJlc2V0IiwiZGV0b25hdGluZyIsImV4cGxvZGluZyIsImV4cGxvZGVkIiwiZXhwbG9zaW9uWCIsImV4cGxvc2lvblkiLCJwbGF5U291bmQiLCJodXJ0Ym94IiwibWF4IiwicmVmbGVjdGVkIiwicGFyZW50IiwibmFtZSIsInJlbW92ZUZyb21Xb3JsZCIsImdyYXZpdHkiLCJsYXN0Qm91bmRZIiwiYWN0aXZhdGUiLCJkZXRvbmF0ZSIsImV4cGxvZGUiLCJkcmF3SW1nIiwiZldpZHRoIiwiZkhlaWdodCIsImJXaWR0aCIsImJIZWlnaHQiLCJvdGhlciIsImRpcmVjdGlvbiIsImlzRW5lbXkiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsInJlY3QiLCJzdHJva2UiLCJjbG9zZVBhdGgiLCJkcmF3RnJhbWUiLCJkcmF3Qm94ZXMiLCJkcmF3T3V0bGluZSIsIkJ1bGxldCIsIm1vdmVtZW50U3BlZWQiLCJidWxsZXQiLCJhY3RpdmUiLCJzdGVhZHkiLCJDYW1lcmEiLCJ5VmlldyIsIndvcmxkV2lkdGgiLCJ3b3JsZEhlaWdodCIsImFic09mZlgiLCJhYnNPZmZZIiwib2ZmWCIsIm9mZlkiLCJjYW1TcGVlZFgiLCJjYW1TcGVlZFkiLCJheGlzIiwiZm9sbG93ZWQiLCJvYmoiLCJ1cGRhdGVCb3VuZHMiLCJ2YWwiLCJtaW4iLCJDcm93IiwibXVyZGVyTGVhZGVyIiwibXVyZGVyRHJvb2dzIiwicG9pbnRWYWx1ZSIsInhTcGVlZCIsInlTcGVlZCIsIm1heFgiLCJtYXhZIiwieEFjY2VsIiwieUFjY2VsIiwiYXR0YWNrQW5nbGUxIiwiYXR0YWNrQW5nbGUyIiwieEF0dGFjayIsInhSZWNvdmVyIiwieVJlY292ZXIiLCJyZWNvdmVyRGlzdGFuY2UiLCJ4UmVjb3ZlckRpc3RhbmNlIiwieVJlY292ZXJEaXN0YW5jZSIsImRyb29nT25lIiwiZHJvb2dUd28iLCJyYW5kIiwiZmx5IiwicmVjb3ZlcmluZyIsImF0dGFja2luZ19maW5hbCIsImlkbGluZyIsImFicyIsImZseWluZyIsImRyb29nMSIsImRyb29nMiIsImxldmVsIiwic2VjdGlvbiIsInJhbmRvbSIsImF0dGFja2luZyIsInNvdW5kIiwicGxheSIsImh1cnQiLCJ1cGRhdGVIaXRib3giLCJIZWFsdGhQYWNrIiwiYXNzZXRNYW5hZ2VyIiwiRW5lcmd5UGFjayIsImF0dGFjayIsImF0dGFja19maW5hbCIsIkRpbm8iLCJwYXRyb2xEaXN0YW5jZSIsInNob3RUaW1lT2Zmc2V0Iiwic3RhcnRYIiwic2hvdENvb2xkb3duIiwic2hvdENvb2xkb3duVGltZXIiLCJwYXRyb2xsaW5nIiwiaWRsZSIsInNob290aW5nIiwid2Fsa2luZyIsImZyYW1lbG9ja2VkIiwid2Fsa19zdHJhaWdodCIsInNob290X2RpYWdvbmFsIiwiRW5lbXkiLCJkYW1hZ2VUeXBlIiwiRW50aXR5IiwiY29uc3RydWN0b3IiLCJ0eXBlIiwiYXJjIiwicmFkaXVzIiwiUEkiLCJzaG93T3V0bGluZXMiLCJjbG9ja1RpY2siLCJyZWN0MSIsInJlY3QyIiwiY29sbGlzaW9uIiwiZHgiLCJkeSIsImxhc3RkeSIsImxhc3RZIiwiY3Jvc3NXaWR0aCIsImxhc3RDcm9zc1dpZHRoIiwiY3Jvc3NIZWlnaHQiLCJGbGFtZXMiLCJkZW1vIiwib3JpZ1giLCJvcmlnWSIsIkdhbWVCb2FyZCIsInRlc3RQb3MiLCJsZXZlbE51bSIsInNlY3Rpb25OdW0iLCJwdnQiLCJwdnR0IiwibG9zdFNjb3JlIiwiZGVhZEVuZW1pZXMiLCJzY29yZSIsInRpbWUiLCJjaGVja05vZGUiLCJsYXN0Q2hlY2twb2ludCIsImxvYWROZXh0TGV2ZWwiLCJuZXh0TGV2ZWwiLCJjbGVhclN0YXRlcyIsImxvYWRlZExldmVsIiwibG9hZCIsImxvYWRpbmdMZXZlbCIsInBvcHVsYXRlTWFwIiwic2V0UG9zIiwibmV4dE5vZGUiLCJjaGVja3BvaW50cyIsIm5leHQiLCJuZXdMZXZlbCIsInBvcnRhbCIsImxvYWRpbmdTZWN0aW9uIiwicmVzcGF3blNlY3Rpb24iLCJpc0JhY2siLCJjbGVhckJvYXJkIiwiYWN0aXZhdGVkIiwiY2FtT2ZmWCIsImNhbU9mZlkiLCJuZXh0Q2FtU3BlZWQiLCJpc0Zyb250IiwicHJldiIsInByZXZDYW1TcGVlZCIsInJlc3Bhd25lZCIsInJlc3Bhd24iLCJyZXNwYXduTWVzc2FnZSIsInNob3dQb2ludFZhbHVlcyIsImZvbnQiLCJmaWxsU3R5bGUiLCJmaWxsVGV4dCIsInNwbGljZSIsInNjb3BlIiwibnVtIiwicG9wdWxhdGVMZXZlbCIsInJlc3Bhd25MZXZlbCIsImxvYWRlZFNlY3Rpb24iLCJMZXZlbHMiLCJjdXJyQ2hlY2tQb3MiLCJjdXJyQ2hlY2tYIiwiY3VyckNoZWNrWSIsImxpc3RGcm9udCIsIkNoZWNrcG9pbnQiLCJjYW1WYWxzIiwiY2FtU3BlZWRzIiwiaGFzUHJldiIsImN1cnJDaGVjayIsInByZXZDaGVjayIsImhhc05leHQiLCJhZGROZXh0Iiwic2V0Qm91bmRzIiwiY2FtZXJhU2hpZnQiLCJjYW1lcmFTcGVlZCIsInJpZ2h0Qm91bmQiLCJsZWZ0Qm91bmQiLCJhY3RpdmF0aW9uUmFkaXVzIiwiSGFuZCIsImRpc3RhbmNlIiwidGhyb3d0aW1lIiwiY29vbGRvd24iLCJjb29sZG93bnZhcmlhbmNlIiwiY29vbGRvd25UaW1lciIsInN0YXJ0aW5nIiwidGhyb3dpbmciLCJoYXNUaHJvd24iLCJ0aHJvdyIsInJlY292ZXIiLCJ4T2ZmIiwieU9mZiIsImhhc093blByb3BlcnR5IiwiTGF2YSIsImZpcmVDb29sZG93blRpbWVyIiwiZmlyZUNvb2xkb3duIiwiRmlyZWJhbGwiLCJzcGF3bk9mZnNldCIsIm9yaWdCb3VuZFgiLCJvcmlnQm91bmRZIiwibWlkZGxlX3VwIiwicGVha191cCIsInBlYWtfZG93biIsIm1pZGRsZV9kb3duIiwiZmluaXNoIiwiU3Bpa2VzIiwidGltZXIiLCJ0aW1lT2Zmc2V0IiwiaW50ZXJ2YWwiLCJzcGlrZUNvb2xkb3duVGltZXIiLCJzcGlrZUNvb2xkb3duIiwiaW5hY3RpdmVfZG93biIsIm5leHRPZmZzZXQiLCJpbmFjdGl2ZV91cCIsIlByb2plY3RpbGVIYXphcmQiLCJkaXJlY3Rpb25zIiwibGlmZXNwYW4iLCJ4RGlyIiwieURpciIsIlByb2plY3RpbGVDaXJjbGUiLCJxdWFkcmFudHMiLCJxdWFkcmFudCIsIkxhdW5jaGVyIiwicHJvamVjdGlsZUxpZmVzcGFuIiwibGF1bmNoVGltZU9mZnNldCIsIkhlcm8iLCJkYXNoU3BlZWQiLCJqdW1wU3RyZW5ndGgiLCJqdW1wc0xlZnQiLCJtYXhKdW1wcyIsInRlcm1pbmFsVmVsb2NpdHkiLCJtYXhIZWFsdGgiLCJtYXhFbmVyZ3kiLCJlbmVyZ3kiLCJzbGFzaEVuZXJneUNvc3QiLCJjbGVhdmVFbmVyZ3lDb3N0Iiwic2hvb3RDb3N0Iiwic2hvb3RFbmVyZ3lDb3N0IiwiZGFzaEVuZXJneUNvc3QiLCJzdHVuRGlyIiwibXVsdGlwbGllciIsImRpZmZpY3VsdHkiLCJkYW1hZ2VDb29sZG93blRpbWVyIiwiZGFtYWdlQ29vbGRvd24iLCJlbmVyZ3lDb29sZG93blRpbWVyIiwiZW5lcmd5Q29vbGRvd24iLCJlbmVyZ3lDb29sZG93bk1pbiIsImVuZXJneURlbGF5IiwiZW5lcmd5RGVsYXlUaW1lciIsInZlbG9jaXR5Q29vbGRvd24iLCJ2ZWxvY2l0eUNvb2xkb3duVGltZXIiLCJqdW1wVGltZXIiLCJqdW1wQ29vbGRvd24iLCJzaG9vdENvb2xkb3duVGltZXIiLCJzaG9vdENvb2xkb3duIiwiZ29kTW9kZUVuZXJneU1pbiIsIm5vdEdvZE1vZGVFbmVyZ3lNaW4iLCJnb2RFbmVyZ3lEZWxheSIsIm5vdEdvZEVuZXJneURlbGF5Iiwic2V0UG9zVGltZXIiLCJnb2RUb2dnbGVUaW1lciIsImNvbnRyb2xLZXlzIiwiY29udHJvbHMiLCJyaWdodCIsInJ1bm5pbmciLCJsZWZ0IiwiZW5lcmdpemUiLCJlbmVyZ2l6ZWQiLCJqdW1wIiwianVtcGluZyIsImdyb3VuZGVkIiwic2hvb3QiLCJzaG90bG9ja2VkIiwiY2xlYXZlIiwic2V0U3RhdGVzIiwiY2xlYXZpbmciLCJzbGFzaCIsImRhc2hpbmciLCJkYXNoIiwiZGFzaGluZ1N0YXJ0IiwiaGFzRGFzaGVkIiwiaGFzUmVmbGVjdGVkIiwidXNlRW5lcmd5Iiwic2xhc2hpbmciLCJoYXNHcmF2aXR5IiwiaGFzU2xhc2hlZCIsImVuZXJneURhc2giLCJkYXNoaW5nTWlkIiwiaW52dWxuZXJhYmxlIiwiZGFzaGluZ0VuZCIsInN0dW5uZWQiLCJkZWFkIiwiaXNHb2QiLCJhc2NlbmQiLCJkZXNjZW5kIiwiZ3VucnVuIiwiYWlyc2hvb3QiLCJkYXNoX3N0YXJ0IiwiZGFzaF9taWQiLCJkYXNoX2VuZCIsInN0dW4iLCJjb3N0IiwiZW5lcmd5RGVsYXlDb29sZG93biIsIkh1cnRib3giLCJwYXJlbnRXaWR0aCIsInBhcmVudEhlaWdodCIsImh1cnRXaWR0aCIsImh1cnRIZWlnaHQiLCJwZXJzaXN0ZW50IiwiSXRlbSIsInhPZmZzZXQiLCJ5T2Zmc2V0Iiwib25fcGlja3VwIiwiaGVhbHRoX3ZhbHVlIiwiZW5lcmd5X3ZhbHVlIiwiTGVvIiwianVtcFNwZWVkIiwidGltZXJTdGFydCIsIkRhdGUiLCJub3ciLCJzcHJpbmZvIiwibHVuZ2UiLCJkZW1vbG9vcCIsImx1bmdpbmciLCJmaXJlbHVuZ2luZyIsImZpcmVsdW5nZSIsImUiLCJQcm9qZWN0aWxlX1N3b3JkIiwic3RhYmxpemVkIiwic3RhYmxlIiwicmVjb3ZlcnkiLCJQcm9qZWN0aWxlIiwiZ3JlZW4iLCJncmVlbl9leGl0aW5nIiwiYmx1ZV9leGl0aW5nIiwiZ3JlZW5fc3RhYmxlIiwiYmx1ZSIsImJsdWVfc3RhYmxlIiwiUmVmbGVjdGJveCIsIlJvY2tldCIsImRyYWluVGltZSIsImJvdW5jZUNvdW50IiwiYm91bmNlVGltZXIiLCJib3VuY2VUaW1lIiwic2FmZVRpbWVyIiwicm9ja2V0IiwiU2hvdGJsYXN0Iiwic2hvdGJsYXN0IiwiU29sZGllcl9TaGllbGQiLCJydW5Qcm9iIiwicnVuQXdheUNvb2xkb3duIiwicnVuQXdheUNvb2xkb3duVGltZXIiLCJydW5Bd2F5VGltZSIsInJ1bkF3YXlUaW1lciIsInJ1bm5pbmdBd2F5IiwiYmxvY2tpbmciLCJ0dXJuaW5nIiwic2xhc2hpbmdfc3RhcnQiLCJzaG9vdGluZ19zdGFydHVwIiwic2hvb3RpbmdfYWN0aXZlIiwic2hvb3RpbmdfcmVjb3ZlciIsImhhc1Nob3QiLCJzbGFzaGluZ19lbmQiLCJydW4iLCJzaG9vdF9zdGFydHVwIiwic2hvb3RfYWN0aXZlIiwic2hvb3RfcmVjb3ZlciIsInNsYXNoX3N0YXJ0Iiwic2xhc2hfZW5kIiwiYmxvY2siLCJ0dXJuIiwiVGVycmFpbk1vYmlsZSIsImRpbWVuc2lvbnMiLCJ0aWxlcyIsImNvbCIsIlRlcnJhaW4iLCJib3VuZHMiLCJHYW1lRW5naW5lIiwiZGV2TW9kZSIsImVudGl0aWVzIiwiYmFja2dyb3VuZExheWVycyIsImNsaWNrIiwibW91c2UiLCJ3aGVlbCIsInN1cmZhY2VXaWR0aCIsInN1cmZhY2VIZWlnaHQiLCJtdXNpYyIsImFkZGVkcG9pbnRzIiwidG9nZ2xlQ29vbGRvd24iLCJib3hUb2dnbGVUaW1lciIsImNoZWNrcG9pbnRDeWNsZUNvdW50IiwicGF1c2VkIiwicGF1c2VUb2dnbGVDb29sZG93biIsInBhdXNlR2VuZXJhbCIsInBhdXNlTGF5b3V0QSIsInBhdXNlTGF5b3V0QiIsInBhdXNlRmxhdm9yWCIsInBhdXNlRmxhdm9yWSIsImNvbnRyb2xMYXlvdXRBIiwiY29udHJvbExheW91dEIiLCJzdGFydElucHV0IiwiQXVkaW8iLCJ2b2x1bWUiLCJnYW1lTG9vcCIsInJlcXVlc3RBbmltRnJhbWUiLCJzb3VuZF9uYW1lIiwiZ2FtZVRpbWUiLCJtYXhTdGVwIiwid2FsbExhc3RUaW1lc3RhbXAiLCJ3YWxsQ3VycmVudCIsIndhbGxEZWx0YSIsImdhbWVEZWx0YSIsInRhYkluZGV4IiwiZ2V0WGFuZFkiLCJjbGllbnRYIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WSIsInRvcCIsIm1hcCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIndoaWNoIiwic3BhY2UiLCJwcmV2ZW50RGVmYXVsdCIsImNvZGUiLCJlbnRpdHkiLCJsYXllciIsImRyYXdDYWxsYmFjayIsImNsZWFyUmVjdCIsImRyYXciLCJlbnRpdGllc0NvdW50IiwidXBkYXRlIiwiaiIsImRpc3QiLCJpc0NvbGxpZGluZyIsImNvbGxpZGVkIiwiY3VycmVudFRpbWUiLCJlYXN5bW9kZSIsImhhcmRtb2RlIiwibGF5b3V0QSIsImxheW91dEIiLCJwYXVzZSIsImdldFBvcyIsImdvZFRvZ2dsZSIsInRvZ2dsZUJveGVzIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiSHVkIiwic3JjX2Nvb3JkaW5hdGVzIiwiZGVzdF9jb29yZGluYXRlcyIsImhlYWx0aGJhciIsIkhlYWx0aEJhciIsImVuZXJneWJhciIsIkVuZXJneUJhciIsInNjb3JlYm9hcmQiLCJTY29yZUJvYXJkIiwiY29tcG9uZW50cyIsImdyYWRpZW50U3RvcDEiLCJncmFkaWVudFN0b3AyIiwiZ3JhZGllbnRTdG9wMyIsImRlc3RfY29vcmRzIiwiZ3JhZGllbnQiLCJjcmVhdGVMaW5lYXJHcmFkaWVudCIsImFkZENvbG9yU3RvcCIsIlJlc291cmNlQmFyIiwic3JjX2Nvb3JkcyIsInNyY19kaW1zIiwibGFzdHkiLCJwYXJ0cyIsInBhcnQiLCJkcmF3UGFydCIsImRlc3RfeF9vZmZzZXQiLCJkZXN0X3lfb2Zmc2V0IiwicmVzb3VyY2VCYXJTZWdtZW50IiwibWlkZGxlMSIsIm1pZGRsZTIiLCJtaWRkbGUzIiwibWlkZGxlNCIsIm1pZGRsZTUiLCJib3R0b20iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJlbGVtZW50IiwiU291bmQiLCJzb3VuZHMiLCJuX2R1cHMiLCJtYWtlX2R1cGxpY2F0ZXMiLCJuX2R1cCIsImN1cnJfc291bmQiLCJzb3VuZF9saXN0IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJpbmRleCIsImVuZGVkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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MEM7QUFDdEMsYUFBS3NhLE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsU0FBbkIsSUFBZ0MsQ0FBaEM7QUFDSDs7QUFDRCxVQUFJLENBQUMsS0FBS3NhLE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsUUFBbkIsRUFBNkI4YSxLQUE3QixFQUFvQ0MsS0FBekMsRUFBZ0Q7QUFDNUMsYUFBS1QsTUFBTCxDQUFZdGEsS0FBWixFQUFtQixRQUFuQixFQUE2QjhhLEtBQUssR0FBQyxDQUFuQyxFQUFzQzNELFdBQXRDLEdBQW9ELENBQXBEO0FBQ0EsYUFBS21ELE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsUUFBbkIsRUFBNkI4YSxLQUFLLEdBQUMsQ0FBbkMsRUFBc0M3RixNQUF0QyxHQUErQ0EsTUFBL0M7QUFDQSxhQUFLcUYsTUFBTCxDQUFZdGEsS0FBWixFQUFtQixRQUFuQixFQUE2QjhhLEtBQUssR0FBQyxDQUFuQyxFQUFzQzdhLElBQXRDO0FBQ0EsYUFBS3FhLE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsU0FBbkIsS0FBaUMsQ0FBakM7QUFDSCxPQUxELE1BS087QUFDSCxhQUFLc2EsTUFBTCxDQUFZdGEsS0FBWixFQUFtQixRQUFuQixFQUE2QjhhLEtBQTdCLEVBQW9DM0QsV0FBcEMsR0FBa0QsQ0FBbEQ7QUFDQSxhQUFLbUQsTUFBTCxDQUFZdGEsS0FBWixFQUFtQixRQUFuQixFQUE2QjhhLEtBQTdCLEVBQW9DN0YsTUFBcEMsR0FBNkNBLE1BQTdDO0FBQ0EsYUFBS3FGLE1BQUwsQ0FBWXRhLEtBQVosRUFBbUIsUUFBbkIsRUFBNkI4YSxLQUE3QixFQUFvQzdhLElBQXBDO0FBQ0g7QUFHSjs7Ozs7O0FBR1UsK0RBQUFvYSxLQUFmLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImRlZmluZShbXG4gICAgJ2Fzc2V0LW1hbmFnZXInXG5dLCBmdW5jdGlvbiAoXG4gICAgQXNzZXRNYW5hZ2VyXG4pIHtcblxuICAgICAgICAvKioqKioqKioqKioqKipcbiAgICAgICAgQW5pbWF0aW9uIGNsYXNzXG5cbiAgICAgICAgUHJvcGVydGllczpcbiAgICAgICAgc3ByaXRlU2hlZXQgLSBhbiBJbWFnZSBvYmplY3Qgb2YgdGhpcyBhbmltYXRpb24ncyBzcHJpdGVzaGVldC5cbiAgICAgICAgZnJhbWVEaW1lbnNpb25zW3dpZHRoLCBoZWlnaHRdIC0gYW4gYXJyYXkgb2YgbGVuZ3RoIDIsIGRlbm90aW5nIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIFxuICAgICAgICAgICAgb25lIGZyYW1lIGluIHRoZSBzZXJpZXMuXG4gICAgICAgIHJvdyAtIGFuIGludGVnZXIgZGVub3RpbmcgdGhlIHJvdyAoYmVnaW5uaW5nIHdpdGggMCkgb2YgdGhlIHNwcml0ZXNoZWV0IHRvIHBsYXkuXG4gICAgICAgIHNoZWV0V2lkdGggLSBhbiBpbnRlZ2VyIGRlbm90aW5nIHRoZSBudW1iZXIgb2YgZnJhbWVzIGluIG9uZSByb3cuIElmIHNoZWV0V2lkdGggaXMgZ3JlYXRlclxuICAgICAgICAgICAgdGhhbiB0aGlzIEFuaW1hdGlvbidzIGZyYW1lcyBwcm9wZXJ0eSwgaXQgd2lsbCBjb250aW51ZSB0byB0aGUgZmlyc3QgY29sdW1uIG9uIHRoZSBuZXh0IHJvdy5cbiAgICAgICAgZnJhbWVEdXJhdGlvbiAtIHRoZSBudW1iZXIgb2YgZnJhbWVzIGVhY2ggc3ByaXRlIGluIHRoZSBhbmltYXRpb24gd2lsbCBiZSBzaG93biBmb3IuXG4gICAgICAgIGZyYW1lcyAtIHRoZSBudW1iZXIgb2YgZnJhbWVzIGluIHRoaXMgYW5pbWF0aW9uLlxuICAgICAgICBsb29wIC0gYSBib29sZWFuIGRlbm90aW5nIHdoZXRoZXIgdGhpcyBhbmltYXRpb24gc2hvdWxkIHJlcGxheSBvciBub3QuXG4gICAgICAgIHNjYWxlIC0gYSB2YWx1ZSB0byBtdWx0aXBseSB0aGUgb3JpZ2luYWwgc3ByaXRlJ3Mgc2l6ZSBieS5cbiAgICAgICAgY29sdW1uT2Zmc2V0IC0gYWRkZWQgdG8gdGhpcy5jdXJyZW50RnJhbWUgdG8gZ2V0IHN0YXJ0aW5nIHBvaW50IG9mIGFueSBhbmltYXRpb25zIHRoYXQgc3RhcnQgcGFydHdheSBpbnRvIGEgc2hlZXQuXG4gICAgICAgICovXG4gICAgICAgIGNsYXNzIEFuaW1hdGlvbiB7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQsIGZyYW1lRGltZW5zaW9ucywgcm93LCBzaGVldFdpZHRoLCBmcmFtZUR1cmF0aW9uLCBmcmFtZXMsIGxvb3AsIHNjYWxlLCBjb2x1bW5PZmZzZXQ9MCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVTaGVldCA9IHNwcml0ZVNoZWV0O1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVXaWR0aCA9IGZyYW1lRGltZW5zaW9uc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lRHVyYXRpb24gPSBmcmFtZUR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVIZWlnaHQgPSBmcmFtZURpbWVuc2lvbnNbMV07IC8vY2FuJ3QgYWRkIDEgaGVyZS4gTWVzc2VzIHVwIGZyYW1lcyBsb3dlciBkb3duIHRoZSBzcHJpdGUgc2hlZXRcbiAgICAgICAgICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbk9mZnNldCA9IGNvbHVtbk9mZnNldDtcbiAgICAgICAgICAgICAgICB0aGlzLnNoZWV0V2lkdGggPSBzaGVldFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxUaW1lID0gZnJhbWVEdXJhdGlvbiAqIGZyYW1lcztcbiAgICAgICAgICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmxvb3AgPSBsb29wO1xuICAgICAgICAgICAgICAgIHRoaXMubG9vcHMgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBkcmF3RnJhbWUodGljaywgY3R4LCB4LCB5LCBmYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gdGljaztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9vcHMrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSB0aGlzLmN1cnJlbnRGcmFtZSgpO1xuICAgICAgICAgICAgICAgIHZhciB4aW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHZhciB5aW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBkcm93ID0gKHRoaXMucm93ICogdGhpcy5mcmFtZUhlaWdodClcbiAgICAgICAgICAgICAgICB4aW5kZXggPSBmcmFtZSAlIHRoaXMuc2hlZXRXaWR0aDtcbiAgICAgICAgICAgICAgICB5aW5kZXggPSBNYXRoLmZsb29yKChmcmFtZSkgLyB0aGlzLnNoZWV0V2lkdGgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLyBEcmF3IGZhY2luZyBsZWZ0XG4gICAgICAgICAgICAgICAgaWYgKCFmYWNpbmdSaWdodCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNhdmUgb3JpZ2luYWwgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBjb250ZXh0IHRvIGhvcml6b250YWwgY2VudGVyIG9mIGltYWdlIChkb24ndCBjYXJlIGFib3V0IGNoYW5naW5nIHkncyBwb3NpdGlvbilcbiAgICAgICAgICAgICAgICBcdGN0eC50cmFuc2xhdGUoeCArICh0aGlzLnNjYWxlICogdGhpcy5mcmFtZVdpZHRoKSAvIDIsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHRcdCAgICAvLyBTY2FsZSB4IGJ5IC0xIHRvIGZsaXAgaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRHJhdyBpbWFnZSBvbiB0aGUgdHJhbnNmb3JtZWQgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAvLyBOb3RlOiBhZnRlciB0cmFuc2Zvcm1pbmcgWzAsMF0gaXMgdmlzdWFsbHkgWy13aWR0aC8yLCAwXVxuICAgICAgICAgICAgICAgICAgICAvLyBzbyB0aGUgaW1hZ2UgbmVlZHMgdG8gYmUgb2Zmc2V0IGFjY29yZGluZ2x5IHdoZW4gZHJhd25cbiAgICAgICAgICAgICAgICBcdGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGVTaGVldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHhpbmRleCAqIHRoaXMuZnJhbWVXaWR0aCksICh5aW5kZXggKiB0aGlzLmZyYW1lSGVpZ2h0KSArIGRyb3csICAvLyBzb3VyY2UgZnJvbSBzaGVldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGgsIHRoaXMuZnJhbWVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0odGhpcy5mcmFtZVdpZHRoICogMikgKyAodGhpcy5mcmFtZVdpZHRoIC8gMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLmZyYW1lV2lkdGgsIC8vIE9mZnNldCBkeFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5IC0gdGhpcy5zY2FsZSp0aGlzLmZyYW1lSGVpZ2h0ICsgdGhpcy5zY2FsZSoxMCxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGggKiB0aGlzLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVpZ2h0ICogdGhpcy5zY2FsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBvcmlnaW5hbCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9tZyBpdCdzIGZpbmFsbHkgd29ya2luZyA7LTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIERyYXcgZmFjaW5nIHJpZ2h0XG4gICAgICAgICAgICAgICAgXHRjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlU2hlZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICh4aW5kZXggKiB0aGlzLmZyYW1lV2lkdGgpLCAoeWluZGV4ICogdGhpcy5mcmFtZUhlaWdodCkgKyBkcm93LCAgLy8gc291cmNlIGZyb20gc2hlZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVdpZHRoLCB0aGlzLmZyYW1lSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4IC0gdGhpcy5mcmFtZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5IC0gdGhpcy5zY2FsZSAqIHRoaXMuZnJhbWVIZWlnaHQgKyB0aGlzLnNjYWxlICogMTAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lV2lkdGggKiB0aGlzLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVpZ2h0ICogdGhpcy5zY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY3R4LnRyYW5zbGF0ZSg1MCwgNTApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50RnJhbWUgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZWxhcHNlZFRpbWUgLyB0aGlzLmZyYW1lRHVyYXRpb24pICsgdGhpcy5jb2x1bW5PZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlzRG9uZSAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmVsYXBzZWRUaW1lID49IHRoaXMudG90YWxUaW1lIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubG9vcHMgPSAwO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBBbmltYXRpb247XG5cbn0pO1xuIiwiXG4vKioqKioqKioqKioqKioqKipcbkFzc2V0TWFuYWdlciBjbGFzc1xuXG5zdWNjZXNzQ291bnQgLSB0aGUgbnVtYmVyIG9mIHN1Y2Nlc3NlcyBmZXRjaGluZyBhc3NldHNcbmVycm9yQ291bnQgLSB0aGUgbnVtYmVyIG9mIGZhaWx1cmVzIGZldGNoaW5nIGFzc2V0c1xuY2FjaGUgLSB0aGUgYXNzZXQgY2FjaGVcbmRvd25sb2FkUXVldWUgLSB0aGUgcXVldWUgb2YgYXNzZXRzIHRvIGRvd25sb2FkXG4qKioqKioqKioqKioqKioqKi9cbmNsYXNzIEFzc2V0TWFuYWdlciB7XG5cbiAgICBjb25zdHJ1Y3RvciAoZG93bmxvYWRRdWV1ZSA9IFtdKSB7XG4gICAgICAgIHRoaXMuc3VjY2Vzc0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5lcnJvckNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5jYWNoZSA9IFtdO1xuICAgICAgICB0aGlzLmRvd25sb2FkUXVldWUgPSBkb3dubG9hZFF1ZXVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgQWRkcyBhbiBhc3NldCBwYXRoIHRvIHRoZSBkb3dubG9hZCBxdWV1ZVxuICAgICovXG4gICAgcXVldWVEb3dubG9hZCAocGF0aCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRoLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmRvd25sb2FkUXVldWUucHVzaChwYXRoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIENoZWNrcyBpZiBhbGwgYXNzZXRzIGhhdmUgYmVlbiByZXNwb25kZWQgdG8gKGVpdGhlciBzdWNjZXNzIG9yIGZhaWx1cmUpXG4gICAgKi9cbiAgICBpc0RvbmUgKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZG93bmxvYWRRdWV1ZS5sZW5ndGggPT0gdGhpcy5zdWNjZXNzQ291bnQgKyB0aGlzLmVycm9yQ291bnQpO1xuICAgIH1cblxuICAgIC8qXG4gICAgQXR0ZW1wdHMgdG8gZG93bmxvYWQgZWFjaCBhc3NldCBpbiB0aGUgcXVldWVcbiAgICAqL1xuICAgIGRvd25sb2FkQWxsIChjYWxsYmFjaykge1xuICAgICAgICBpZiAodGhpcy5kb3dubG9hZFF1ZXVlLmxlbmd0aCA9PT0gMCkgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kb3dubG9hZFF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMuZG93bmxvYWRRdWV1ZVtpXTtcbiAgICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkdW46IFwiICsgdGhpcy5zcmMudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdGhhdC5zdWNjZXNzQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5pc0RvbmUoKSkgeyBjYWxsYmFjaygpOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoYXQuZXJyb3JDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGF0LmlzRG9uZSgpKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW1nLnNyYyA9IHBhdGg7XG4gICAgICAgICAgICB0aGlzLmNhY2hlW3BhdGhdID0gaW1nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBHZXRzIGFuIGFzc2V0XG4gICAgKi9cbiAgICBnZXRBc3NldCAocGF0aCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHBhdGgudG9TdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlW3BhdGhdO1xuICAgIH1cbiAgICBcbn0gLy8gZW5kIG9mIEFzc2V0TWFuYWdlclxuXG5leHBvcnQgZGVmYXVsdCBBc3NldE1hbmFnZXI7XG5cbiIsImltcG9ydCBDYW1lcmEgZnJvbSBcIi4vY2FtZXJhXCJcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXRpZXMvZW50aXR5XCJcblxuXG5jbGFzcyBMYXllciB7XG4gICAgY29uc3RydWN0b3IoaW1nLCBzcmNfZGltZW5zaW9ucywgY2FtZXJhLCBzY3JvbGxfc3BlZWQsIGhlaWdodF9mYWN0b3IsIGRlc3RfeSwgc3RyZXRjaD1mYWxzZSwgc2NhbGU9Mykge1xuICAgICAgICB0aGlzLmltZyA9IGltZ1xuICAgICAgICB0aGlzLnNyY193aWR0aCA9IHNyY19kaW1lbnNpb25zWzBdXG4gICAgICAgIHRoaXMuc3JjX2hlaWdodCA9IHNyY19kaW1lbnNpb25zWzFdXG4gICAgICAgIHRoaXMuc2Nyb2xsX3NwZWVkID0gc2Nyb2xsX3NwZWVkXG4gICAgICAgIHRoaXMuaGVpZ2h0X2ZhY3RvciA9IGhlaWdodF9mYWN0b3JcbiAgICAgICAgdGhpcy5zdHJldGNoID0gc3RyZXRjaFxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYVxuICAgICAgICB0aGlzLmNhbWVyYV9kaW1lbnNpb25zID0gW2NhbWVyYS5jYW52YXNXaWR0aCwgY2FtZXJhLmNhbnZhc0hlaWdodF1cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlXG4gICAgICAgIHRoaXMuZGVzdF95ID0gZGVzdF95XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIC8vIHJlcGVhdCBhcyBtYW55IHRpbWVzIGFzIG5lY2Vzc2FyeSB0byBmaWxsIGNhbWVyYSBzaXplXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAgLSB0aGlzLnNyY193aWR0aDsgaSA8IHRoaXMuY2FtZXJhX2RpbWVuc2lvbnNbMF0gKyB0aGlzLnNyY193aWR0aDsgaSArPSB0aGlzLnNyY193aWR0aCkge1xuICAgICAgICAgICAgICAgIGxldCBkX2hlaWdodCA9ICh0aGlzLmNhbWVyYV9kaW1lbnNpb25zWzFdICogdGhpcy5oZWlnaHRfZmFjdG9yKVxuICAgICAgICAgICAgICAgIGxldCBkX3kgPSB0aGlzLmRlc3RfeSAqIHRoaXMuaGVpZ2h0X2ZhY3RvclxuICAgICAgICAgICAgICAgIC8vIDAgKyAoKHRoaXMuaGVpZ2h0X2ZhY3RvcikpICogdGhpcy5jYW1lcmFfZGltZW5zaW9uc1sxXVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RyZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkX2hlaWdodCA9IHRoaXMuY2FtZXJhX2RpbWVuc2lvbnNbMV1cbiAgICAgICAgICAgICAgICAgICAgLy8gZF95ID0gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoLCB0aGlzLnNyY19oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIChpICsgKCh0aGlzLmNhbWVyYS54VmlldyogdGhpcy5zY3JvbGxfc3BlZWQpICUgKHRoaXMuc3JjX3dpZHRoKSkpKiB0aGlzLnNjYWxlLCBcbiAgICAgICAgICAgICAgICAgICAgZF95LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCAqIHRoaXMuc2NhbGUsIFxuICAgICAgICAgICAgICAgICAgICBkX2hlaWdodFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5cbmNsYXNzIEJhY2tncm91bmQge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGFzc2V0X21hbmFnZXIsIGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9lbmdpbmUgPSBnYW1lX2VuZ2luZVxuICAgICAgICB0aGlzLmFzc2V0X21hbmFnZXIgPSBhc3NldF9tYW5hZ2VyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhXG4gICAgICAgIHRoaXMubGF5ZXJzID0gW1xuICAgICAgICAgICAgXCJpbWcvYmcvMV9iZy5wbmdcIixcbiAgICAgICAgICAgIFwiaW1nL2JnLzJfZmFyYnVpbGRpbmdzLnBuZ1wiLFxuICAgICAgICAgICAgXCJpbWcvYmcvM19idWlsZGluZ3MucG5nXCIsXG4gICAgICAgICAgICBcImltZy9iZy80X2ZvcmVncm91bmQucG5nXCIsXG4gICAgICAgICAgICBcImltZy9iZy9ib3RfZmlsbC5wbmdcIlxuICAgICAgICBdXG5cbiAgICAgICAgdGhpcy5tYWtlX2JhY2tncm91bmQoKVxuXG5cbiAgICB9XG5cbiAgICBtYWtlX2JhY2tncm91bmQgKCkge1xuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnLzFfYmcucG5nXCIpLCBcbiAgICAgICAgICAgIFsyNzIsIDE2MF0sIHRoaXMuY2FtZXJhLCAwLjEsIDEsIDAsIHRydWUpKVxuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnLzJfZmFyYnVpbGRpbmdzLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjEzLCAxNDJdLCB0aGlzLmNhbWVyYSwgMC4xNSwgMC4zNSwgdGhpcy5jYW1lcmEuY2FudmFzSGVpZ2h0LzIpKVxuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnLzNfYnVpbGRpbmdzLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjcyLCAxNTBdLCB0aGlzLmNhbWVyYSwgMC4yLCAwLjQsIHRoaXMuY2FtZXJhLmNhbnZhc0hlaWdodC8yKSlcbiAgICAgICAgLy8gdGhpcy5nYW1lX2VuZ2luZS5hZGRCYWNrZ3JvdW5kTGF5ZXIobmV3IExheWVyKHRoaXMuYXNzZXRfbWFuYWdlci5nZXRBc3NldChcImltZy9iZy80X2ZvcmVncm91bmQucG5nXCIpLCBcbiAgICAgICAgICAgIC8vIFsyNzIsIDEwNF0sIHRoaXMuY2FtZXJhLCAwLjI1LCAuNSwgdGhpcy5jYW1lcmEuY2FudmFzSGVpZ2h0LzIpKVxuICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmFkZEJhY2tncm91bmRMYXllcihuZXcgTGF5ZXIodGhpcy5hc3NldF9tYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2JnL2JvdF9maWxsLnBuZ1wiKSwgXG4gICAgICAgICAgICBbMjUwLCAyNTBdLCB0aGlzLmNhbWVyYSwgMSwgMSwgdGhpcy5jYW1lcmEuY2FudmFzSGVpZ2h0LzIpKVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWNrZ3JvdW5kOyIsImltcG9ydCBBc3NldE1hbmFnZXIgZnJvbSBcIi4vYXNzZXQtbWFuYWdlclwiXG5pbXBvcnQgR2FtZUVuZ2luZSBmcm9tIFwiLi9nYW1lLWVuZ2luZVwiXG5pbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2VudGl0aWVzL2dhbWUtYm9hcmRcIlxuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi9lbnRpdGllcy9jYW1lcmFcIlxuaW1wb3J0IEh1ZCBmcm9tIFwiLi9odWRcIlxuaW1wb3J0IFRlcnJhaW4gZnJvbSBcIi4vZW50aXRpZXMvdGVycmFpblwiXG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tIFwiLi9iYWNrZ3JvdW5kXCJcbmltcG9ydCBIZXJvIGZyb20gXCIuL2VudGl0aWVzL2hlcm9cIlxuaW1wb3J0IFNvdW5kIGZyb20gXCIuL3NvdW5kXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyB0aGUgXCJtYWluXCIgY29kZSBiZWdpbnMgaGVyZVxuXG4gICAgdG9sb2FkID0gW1xuICAgICAgICBcImltZy9aWGUucG5nXCIsXG4gICAgICAgIFwiaW1nL0xlby5wbmdcIixcbiAgICAgICAgXCJpbWcvRW5lbXlTaGVldDEucG5nXCIsXG4gICAgICAgIFwiaW1nL3BpcGVzLnBuZ1wiLFxuICAgICAgICBcImltZy9FbmVtaWVzLnBuZ1wiLFxuICAgICAgICBcImltZy9odWQucG5nXCIsXG4gICAgICAgIFwiaW1nL2hlYWx0aHBhY2sucG5nXCIsXG4gICAgICAgIFwiaW1nL2VuZXJneXBhY2sucG5nXCIsXG4gICAgICAgIFwiaW1nL2JnLzFfYmcucG5nXCIsXG4gICAgICAgIFwiaW1nL2JnLzJfZmFyYnVpbGRpbmdzLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy8zX2J1aWxkaW5ncy5wbmdcIixcbiAgICAgICAgXCJpbWcvYmcvNF9mb3JlZ3JvdW5kLnBuZ1wiLFxuICAgICAgICBcImltZy9iZy9ib3RfZmlsbC5wbmdcIlxuICAgIF07XG5cbiAgICBsZXQgQVNTRVRfTUFOQUdFUiA9IG5ldyBBc3NldE1hbmFnZXIodG9sb2FkKTtcblxuICAgIEFTU0VUX01BTkFHRVIuZG93bmxvYWRBbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIHVwIGRhIHNoZWlsZFwiKTtcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lV29ybGQnKTtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhbnZhcyB3aWR0aDogXCIgKyBjYW52YXMud2lkdGgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhbnZhcyBoZWlnaHQ6IFwiICsgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgbGV0IGdhbWVFbmdpbmUgPSBuZXcgR2FtZUVuZ2luZSgpO1xuICAgICAgICBsZXQgY2FtZXJhID0gbmV3IENhbWVyYShnYW1lRW5naW5lLCAwLCAwLCBudWxsLCBjdHggPSBjdHgsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgMjAwMCwgMjAwMCk7XG4gICAgICAgIGxldCBoZXJvID0gbmV3IEhlcm8oZ2FtZUVuZ2luZSwgMCwgMCwgQVNTRVRfTUFOQUdFUi5nZXRBc3NldChcImltZy9aWGUucG5nXCIpLCBjdHgpO1xuICAgICAgICBsZXQgYm9hcmQgPSBuZXcgR2FtZUJvYXJkKGdhbWVFbmdpbmUsIEFTU0VUX01BTkFHRVIsIGN0eCk7XG4gICAgICAgIGdhbWVFbmdpbmUuaGVybyA9IGhlcm87XG4gICAgICAgIGdhbWVFbmdpbmUuZ2FtZWJvYXJkID0gYm9hcmQ7XG4gICAgICAgIGxldCBodWQgPSBuZXcgSHVkKGdhbWVFbmdpbmUsIEFTU0VUX01BTkFHRVIuZ2V0QXNzZXQoXCJpbWcvaHVkLnBuZ1wiKSwgaGVybywgWzAsIDBdLCBbMCwgMF0sIFsxMDAsIDEwMF0sIDMsIGNhbWVyYSk7XG4gICAgICAgIGJvYXJkLmh1ZCA9IGh1ZDtcbiAgICAgICAgYm9hcmQuaGVybyA9IGhlcm87XG4gICAgICAgIFxuICAgICAgICAvLyAjIyMgbXVzaWMgIyMjXG4gICAgICAgIFxuICAgICAgICAvL1RPRE86IFBsYWNlaG9sZGVyIG1hZ2ljIG51bWJlcnMgdW50aWwgd2UgZGVjaWRlIG9uIGhvdyB0byBoYW5kbGUgd29ybGQgYm91bmRhcnkgYW5kIGNhbWVyYVxuXG4gICAgICAgIC8qKk5PVEU6IElUIElTIFZFUlkgSU1QT1JUQU5UIENBTUVSQSBJUyBUSEUgRklSU1QgQURERUQgRU5USVRZKiovXG5cbiAgICAgICAgZ2FtZUVuZ2luZS5hZGRFbnRpdHkoY2FtZXJhKTtcbiAgICAgICAgZ2FtZUVuZ2luZS5jYW1lcmEgPSBjYW1lcmE7XG5cbiAgICAgICAgbGV0IGJhY2tncm91bmQgPSBuZXcgQmFja2dyb3VuZChnYW1lRW5naW5lLCBBU1NFVF9NQU5BR0VSLCBjdHgsIGNhbWVyYSk7XG5cbiAgICAgICAgLy9Mb2FkcyBsZXZlbCBuXG4gICAgICAgIGJvYXJkLmdldExldmVsKDEpO1xuXG4gICAgICAgIGNhbWVyYS5mb2xsb3coaGVybyk7XG4gICAgICAgIGdhbWVFbmdpbmUuYWRkRW50aXR5KGJvYXJkKTtcbiAgICAgICAgLy9nYW1lRW5naW5lLmFkZEVudGl0eShoZXJvKTtcbiAgICAgICAgLy9nYW1lRW5naW5lLmFkZEVudGl0eShodWQpO1xuICAgICAgICBnYW1lRW5naW5lLmluaXQoY3R4KTtcbiAgICAgICAgZ2FtZUVuZ2luZS5zdGFydCgpO1xuICAgIH0pO1xufSIsImltcG9ydCB7RW50aXR5fSBmcm9tIFwiLi9cIlxuXG5cbi8qKioqKioqKioqKlxuQWN0b3IgaW50ZXJmYWNlXG5UaGlzIGludGVyZmFjZSBpcyBkZXNpZ25lZCB0byBlbmNvbXBhc3MgYW55IEVudGl0eSB0aGF0IGFjdHMgdXBvbiB0aGUgZ2FtZSBsZXZlbC4gVGhpcyBjbGFzcyBzaG91bGQgbm90IGJlIGluc3RhbnRpYXRlZC5cbkFueSBhY3Rpb24gc2hhcmVkIGJldHdlZW4gYWN0b3JzIGlzIGxvY2F0ZWQgaGVyZS5cblxuZ2FtZSAtIGEgcmVmZXJlbmNlIHRvIHRoZSBnYW1lIGluIHdoaWNoIHRoaXMgZW50aXR5IGV4aXN0c1xueCwgeSAtIGVudGl0eSdzIGNvb3JkaW5hdGVzXG5yZW1vdmVGcm9tV29ybGQgLSBhIGZsYWcgdGhhdCBkZW5vdGVzIHdoZW4gdG8gcmVtb3ZlIHRoaXMgZW50aXR5IGZyb20gdGhlIGdhbWVcbioqKioqKioqKioqKi9cbmNsYXNzIEFjdG9yIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgeCwgeSwgaW1nPW51bGwsIGN0eD1udWxsLCBzY2FsZT1udWxsLCBzcHJpdGVXaWR0aCA9IDAsIHNwcml0ZUhlaWdodCA9IDApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbnRpdHlcIjtcblxuICAgICAgICB0aGlzLmZhY2luZyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBudWxsO1xuXG4gICAgICAgIC8vQWRkZWQgdGhlc2VzIHBvc3QtaG9jIGZvciBiZXR0ZXIgZnV0dXJlIGRldmVsb3BtZW50LiAobm90IGN1cnJlbnRseSB1c2VkIGluIGFueSAnc3VwZXInIGNvbnN0cnVjdGlvbiBjYWxscylcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuICAgIH1cbiAgICBcbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlICgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqKkhFTFBFUiBGVU5DVElPTlMqKiovXG4gICAgdXBkYXRlUG9zKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ICs9IHg7XG4gICAgICAgIHRoaXMuYm91bmRYICs9IHg7XG4gICAgICAgIHRoaXMueSArPSB5O1xuICAgICAgICB0aGlzLmJvdW5kWSArPSB5O1xuICAgIH1cblxuICAgIHNldFBvcyhjb29yZGluYXRlcyA9IFswLCAwXSkge1xuICAgICAgICB0aGlzLnggPSBjb29yZGluYXRlc1swXTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSBjb29yZGluYXRlc1swXTtcbiAgICAgICAgdGhpcy55ID0gY29vcmRpbmF0ZXNbMV07XG4gICAgICAgIHRoaXMuYm91bmRZID0gY29vcmRpbmF0ZXNbMV07XG4gICAgfVxufSBcbmV4cG9ydCBkZWZhdWx0IEFjdG9yOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVuZW15LFxuICAgIEh1cnRib3gsICAgIFxuICAgIFByb2plY3RpbGUsXG4gICAgVGVycmFpblxufSBmcm9tIFwiLi9cIlxuXG5cbi8vcm93IDksIDQweDMwLCBvZmZzZXQgMTEsIDQgZnJhbWVzXG5jbGFzcyBCb21iIGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDQwLCBzcHJpdGVIZWlnaHQgPSAzMCwgZmFjaW5nUmlnaHQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgLypVbmlxdWUgdG8gQm9tYioveFZlbG9jaXR5ID0gNywgeVZlbG9jaXR5ID0gLTIwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSB4VmVsb2NpdHk7XG5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDIwO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDE1O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgMTU7XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gNTAwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzFdID0gNzAwO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDUwO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XG4gICAgICAgIHRoaXMubGF1bmNodGltZSA9IDI1O1xuICAgICAgICB0aGlzLmNvdW50ZG93biA9IDQ7XG4gICAgICAgIHRoaXMuc3RhcnR1cCA9IDM7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0geVZlbG9jaXR5O1xuICAgICAgICB0aGlzLmZyaWN0aW9uID0gLjAzO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxhdW5jaGluZ1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJhY3RpdmF0aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkZXRvbmF0aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJleHBsb2RpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImV4cGxvZGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZWZsZWN0ZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhY2luZ1JpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImxhdW5jaFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDE3LCA1LCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMSksXG4gICAgICAgICAgICBcImFjdGl2YXRlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTcsIDcsIDIsIHRydWUsIHRoaXMuc2NhbGUsIDEyKSxcbiAgICAgICAgICAgIFwiZGV0b25hdGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA5LCAxNywgNiwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTQpLFxuICAgICAgICAgICAgXCJleHBsb2RlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs2MCwgNjBdLCA0LCAxNywgNSwgNywgZmFsc2UsIHRoaXMuc2NhbGUgKyAzLCAxMCksXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLmZhY2luZyA9IDE7IH0gZWxzZSB7IHRoaXMuZmFjaW5nID0gLTE7IH1cbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMubGF1bmNoO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmxhdW5jaGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3ModGhpcy5mYWNpbmcqdGhpcy54VmVsb2NpdHksIDApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcyh0aGlzLmZhY2luZyAqIHRoaXMueFZlbG9jaXR5LCAwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IHRoaXMuY291bnRkb3duKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGV0b25hdGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRldG9uYXRpbmcpIHtcbiAgICAgICAgICAgIC8vVGhpcyBcIkZhY2luZyBIZXJvXCIgY2hlY2sgbWFrZXMgc3VyZSB0aGF0LCBpZiBIZXJvIGNyb3NzZXMgYXhpcyBiZWZvcmUgZXhwbG9zaW9uLFxuICAgICAgICAgICAgLy9IZXJvIHdpbGwgYmUgcHVzaGVkIGJhY2sgaW4gdGhlIGNvcnJlY3QgZGlyZWN0aW9uIG9uIHN0dW5cbiAgICAgICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiB0aGlzLnN0YXJ0dXApIHtcbiAgICAgICAgICAgICAgICAvL1NwYXduIGV4cGxvc2lvbiBodXJ0Ym94XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kZXRvbmF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZXhwbG9kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZXhwbG9kaW5nKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmV4cGxvZGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMueCAtPSAyICogdGhpcy5zcHJpdGVXaWR0aCAtIDMwO1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAzMDtcbiAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uWCA9IDE1MDtcbiAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uWSA9IDE1MDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiZXhwbG9zaW9uXzFcIilcbiAgICAgICAgICAgICAgICB2YXIgaHVydGJveCA9IG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTEuNzUgKiBleHBsb3Npb25YICsgMTAsIHRoaXMuc3ByaXRlSGVpZ2h0IC0gMjAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCBleHBsb3Npb25YLCBleHBsb3Npb25ZLCB0aGlzLnNjYWxlICsgMiwgTWF0aC5tYXgoNCwgdGhpcy5kYW1hZ2UpLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgIXRoaXMuc3RhdGVzLnJlZmxlY3RlZCwgXCJoZWFsdGhcIiwgMTUpO1xuICAgICAgICAgICAgICAgIGh1cnRib3gucGFyZW50ID0gdGhpcy5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkoaHVydGJveCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZXhwbG9kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5leHBsb2RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgdGhpcy55VmVsb2NpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5sYXVuY2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmxhdW5jaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZhdGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRldG9uYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRldG9uYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5leHBsb2RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmV4cGxvZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDI7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgLy9UT0RPIEFkZCBjb2xsaXNpb24gd2l0aCB0ZXJyYWluXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJyAmJiAhdGhpcy5zdGF0ZXMuZXhwbG9kaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodCAtIDEwO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54VmVsb2NpdHkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54VmVsb2NpdHkgLT0gdGhpcy5mYWNpbmcgKiB0aGlzLnhWZWxvY2l0eSAqIHRoaXMuZnJpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnhWZWxvY2l0eSArPSB0aGlzLmZhY2luZyAqIHRoaXMueFZlbG9jaXR5ICogdGhpcy5mcmljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMubGF1bmNoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxhdW5jaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgKyBvdGhlci5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQgLSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYIC0gdGhpcy5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMubGF1bmNoaW5nID0gZmFsc2UsXG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5kZXRvbmF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5leHBsb2RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gMDtcbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIC8vSWYgaGVybyBpcyBjbGVhdmluZywgZG8uLi5cbiAgICAgICAgICAgICAgICAgICAgLy9IaXQgYm9tYiBhd2F5XG4gICAgICAgICAgICAgICAgLy9FbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubGF1bmNoaW5nID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRldG9uYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5leHBsb2RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQm9tYjsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBUZXJyYWluLFxuICAgIEhlcm8sXG4gICAgUHJvamVjdGlsZSxcbiAgICBIdXJ0Ym94LFxuICAgIEFjdG9yXG59IGZyb20gXCIuL1wiXG5cblxuXG5jbGFzcyBCdWxsZXQgZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIGZhY2luZ1JpZ2h0LCBzcHJpdGVXaWR0aCA9IDUwLCBzcHJpdGVIZWlnaHQgPSA1MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDc7XG4gICAgICAgIGlmIChmYWNpbmdSaWdodCkgeyB0aGlzLnggKz0gMTAwOyB9IGVsc2UgeyB0aGlzLnggLT0gMTAwIH07Ly9vZmZzZXQgdG8gbWF0Y2ggZ3VuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDMwO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMzA7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCkgLSA3O1xuICAgICAgICBpZiAoIWZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSAtIDIqdGhpcy5zcHJpdGVXaWR0aDsgLy8rMTAwIGFsaWducyB3aXRoIHRoZSBndW5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpICsgMip0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gMTUwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYnVsbGV0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMiwgMTgsIDIwLCAyLCB0cnVlLCB0aGlzLnNjYWxlLCAxNiksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmJ1bGxldDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vVE9ET1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLngsIHRoaXMueSxcbiAgICAgICAgICAgICAgICAvLyAgICAwLCAwLCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTAsIDEwLCB0aGlzLnNjYWxlLCA1MCwgdGhpcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0ZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5idWxsZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIgfHwgb3RoZXIubmFtZSA9PT0gXCJTcGlrZXNcIiB8fCBvdGhlci5uYW1lID09PSBcIkhlcm9cIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJSZWZsZWN0Ym94XCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0O1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJQcm9qZWN0aWxlXCI7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDE7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IDE1MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5uYW1lID09PSBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiQnVsbGV0XCIpIHtcbiAgICAgICAgICAgICAgICBvdGhlci5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvdGhlci5wYXJlbnRDbGFzcyA9PT0gXCJFbmVteVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVIaXRib3goZldpZHRoLCBmSGVpZ2h0LCBiV2lkdGgsIGJIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoICsgNTtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDI7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDtcbiIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCJcbmltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5cblxuLyoqKioqKioqKioqXG5DYW1lcmEgY2xhc3NcbnhWaWV3LCB5VmlldyAtIHBvc2l0aW9uIG9mIGNhbWVyYSAodG9wIGxlZnQpXG5jYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0IC0gY2FtZXJhIGRpbWVuc2lvbnNcbndvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0IC0gZGltZW5zaW9ucyB0aGF0IHJlcHJlc2VudCB0aGUgd29ybGQncyBib3VuZGFyeVxuXG4qKioqKioqKioqKi9cbmNsYXNzIENhbWVyYSBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeFZpZXcsIHlWaWV3PTAsIGltZz1udWxsLCBjdHg9bnVsbCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeFZpZXcsIHlWaWV3LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMuY2FudmFzV2lkdGggPSBjYW52YXNXaWR0aDsgLy90aGlzIGlzIHRoZSB2aWV3cG9ydCwgTk9UIHRoZSBzYW1lIGFzIGNhbnZhcyBpbiBjb3JlLmpzXG4gICAgICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gY2FudmFzSGVpZ2h0OyAvL3RoaXMgaXMgdGhlIHZpZXdwb3J0LCBOT1QgdGhlIHNhbWUgYXMgY2FudmFzIGluIGNvcmUuanNcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcbiAgICAgICAgdGhpcy53b3JsZEhlaWdodCA9IHdvcmxkSGVpZ2h0O1xuICAgICAgICB0aGlzLmFic09mZlggPSAyO1xuICAgICAgICB0aGlzLmFic09mZlkgPSAxLjU7XG4gICAgICAgIHRoaXMub2ZmWCA9IHRoaXMuY2FudmFzV2lkdGgvdGhpcy5hYnNPZmZYO1xuICAgICAgICB0aGlzLm9mZlkgPSB0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSArIDEwMDtcbiAgICAgICAgdGhpcy5jYW1TcGVlZFggPSA4O1xuICAgICAgICB0aGlzLmNhbVNwZWVkWSA9IDg7XG5cblxuICAgICAgICAvLyBwb3NzaWJsZSBheGlzIHRoZSBjYW1lcmEgY2FuIG1vdmUgaW4uIG5vdCBpbXBsZW1lbnRlZCB5ZXRcbiAgICAgICAgdGhpcy5heGlzID0ge1xuICAgICAgICAgICAgXCJub25lXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJob3Jpem9udGFsXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYm90aFwiOiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBvYmplY3QgdG8gYmUgZm9sbG93ZWQgKHRoZSBIZXJvKVxuICAgICAgICB0aGlzLmZvbGxvd2VkID0gbnVsbDtcbiAgICB9XG5cbiAgICBmb2xsb3cgKG9iaikge1xuICAgICAgICB0aGlzLmZvbGxvd2VkID0gb2JqO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIC8vICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApOyAvL3Jlc2V0IHRyYW5zZm9ybSBtYXRyaXhcbiAgICAgICAgLy8gIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXaWR0aCwgdGhpcy5jYW52YXNIZWlnaHQpOyAvLyBjbGVhciB2aWV3cG9ydCBhZnRlciBtYXRyaXggaXMgcmVzZXRcbiAgICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMueFZpZXcsIHRoaXMueVZpZXcpO1xuICAgICAgICBcbiAgICB9XG5cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy8gTm90ZTogdGhpcyBsb2dpYyBmZWVscyBIT1JSSUJMWSB3cm9uZywgYnV0IGl0IHdvcmtzIGZvciBub3csIHNvIHlheT9cbiAgICAgICAgaWYgKHRoaXMuZm9sbG93ZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCb3VuZHMoKTtcbiAgICAgICAgICAgIC8vVE9ETzogbmVlZCB0byBmaWd1cmUgb3V0IHdvcmxkIGJvdW5kcyBmb3IgbWluIGFuZCBtYXggY2xhbXBpbmdcbiAgICAgICAgICAgIHRoaXMueFZpZXcgPSAtdGhpcy5mb2xsb3dlZC54ICsgdGhpcy5vZmZYO1xuICAgICAgICAgICAgdGhpcy55VmlldyA9IC10aGlzLmZvbGxvd2VkLnkgKyB0aGlzLm9mZlk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAvL2NvbnNvbGUubG9nKFwieFZpZXc6IFwiICsgdGhpcy54Vmlldyk7XG4gICAgICAgICAvL2NvbnNvbGUubG9nKFwieVZpZXc6IFwiICsgdGhpcy55Vmlldyk7XG4gICAgICAgICAvL2NvbnNvbGUubG9nKFwiaGVybyB4OiBcIiArIHRoaXMuZm9sbG93ZWQueCk7XG4gICAgICAgICAvL2NvbnNvbGUubG9nKFwiaGVybyB5OiBcIiArIHRoaXMuZm9sbG93ZWQueSk7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVCb3VuZHMoKSB7XG4gICAgICAgIGlmICghKHRoaXMub2ZmWCA9PT0gdGhpcy5jYW52YXNXaWR0aCAvIHRoaXMuYWJzT2ZmWCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9mZlggKyAxMCA8IE1hdGguZmxvb3IodGhpcy5jYW52YXNXaWR0aCAvIHRoaXMuYWJzT2ZmWCkpIHsgdGhpcy5vZmZYICs9IHRoaXMuY2FtU3BlZWRYOyB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9mZlggLSAxMCA+IE1hdGguZmxvb3IodGhpcy5jYW52YXNXaWR0aCAvIHRoaXMuYWJzT2ZmWCkpIHsgdGhpcy5vZmZYIC09IHRoaXMuY2FtU3BlZWRYOyB9XG4gICAgICAgICAgICBlbHNlICh0aGlzLm9mZlggPSB0aGlzLmNhbnZhc1dpZHRoIC8gdGhpcy5hYnNPZmZYKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISh0aGlzLm9mZlkgPT09IHRoaXMuY2FudmFzSGVpZ2h0IC8gdGhpcy5hYnNPZmZZKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub2ZmWSArIDEwIDwgTWF0aC5mbG9vcih0aGlzLmNhbnZhc0hlaWdodCAvIHRoaXMuYWJzT2ZmWSkpIHsgdGhpcy5vZmZZICs9IHRoaXMuY2FtU3BlZWRZOyB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9mZlkgLSAxMCA+IE1hdGguZmxvb3IodGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkpKSB7IHRoaXMub2ZmWSAtPSB0aGlzLmNhbVNwZWVkWTsgfVxuICAgICAgICAgICAgZWxzZSAodGhpcy5vZmZZID0gdGhpcy5jYW52YXNIZWlnaHQgLyB0aGlzLmFic09mZlkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm91bmRzQ2hlY2sodmFsLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsLCBtaW4pLCBtYXgpO1xuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVuZW15LFxuICAgIEhlcm8sXG4gICAgSHVydGJveCxcbiAgICBJdGVtLFxuICAgIFByb2plY3RpbGUsXG4gICAgVGVycmFpblxufSBmcm9tIFwiLi9cIlxuXG5cbmNsYXNzIENyb3cgZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoID0gNTAsIHNwcml0ZUhlaWdodCA9IDQwLFxuICAgICAgICAgICAgICAgICAgICAvKlVuaXF1ZSB0byBDcm93Ki9zaWdodFJhZGl1cyA9IFs3MDAsIDUwMF0sIG11cmRlckxlYWRlciA9IGZhbHNlLCBtdXJkZXJEcm9vZ3MgPSBbWzAsIDBdLCBbMCwgMF1dKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDIwO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDE1O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5tdXJkZXJMZWFkZXIgPSBtdXJkZXJMZWFkZXI7XG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDEwO1xuICAgICAgICB0aGlzLnhTcGVlZCA9IDQ7XG4gICAgICAgIHRoaXMueVNwZWVkID0gODtcbiAgICAgICAgdGhpcy5tYXhYID0gNTtcbiAgICAgICAgdGhpcy5tYXhZID0gOTtcbiAgICAgICAgdGhpcy54QWNjZWwgPSAuMzU7XG4gICAgICAgIHRoaXMueUFjY2VsID0gLjQ7XG5cbiAgICAgICAgdGhpcy5hdHRhY2tBbmdsZTEgPSAyO1xuICAgICAgICB0aGlzLmF0dGFja0FuZ2xlMiA9IDEwO1xuICAgICAgICB0aGlzLnhBdHRhY2sgPSAxN1xuICAgICAgICB0aGlzLnhSZWNvdmVyID0gNztcbiAgICAgICAgdGhpcy55UmVjb3ZlciA9IDQ7XG4gICAgICAgIHRoaXMucmVjb3ZlckRpc3RhbmNlID0gNDAwO1xuICAgICAgICB0aGlzLnhSZWNvdmVyRGlzdGFuY2U7XG4gICAgICAgIHRoaXMueVJlY292ZXJEaXN0YW5jZTtcbiAgICAgICAgaWYgKHRoaXMubXVyZGVyTGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmRyb29nT25lID0gbXVyZGVyRHJvb2dzWzBdO1xuICAgICAgICAgICAgdGhpcy5kcm9vZ1R3byA9IG11cmRlckRyb29nc1sxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMF0gPSBzaWdodFJhZGl1c1swXTtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IHNpZ2h0UmFkaXVzWzFdO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgIHRoaXMucmFuZCA9IDA7XG5cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZseWluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYXR0YWNraW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhdHRhY2tpbmdfZmluYWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcInJlY292ZXJpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImh1cnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlkbGluZ1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJmbHlcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCA4LCAxMSwgNSwgNSwgdHJ1ZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcImF0dGFja1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDgsIDExLCA2LCAzLCBmYWxzZSwgdGhpcy5zY2FsZSwgNSksXG4gICAgICAgICAgICBcImF0dGFja19maW5hbFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDgsIDExLCA2LCAyLCB0cnVlLCB0aGlzLnNjYWxlLCA4KSxcbiAgICAgICAgICAgIFwiaHVydFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDgsIDExLCA1LCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMCksXG4gICAgICAgICAgICAvL1RPRE86IEFkZCBcInNtb2tlYm9tYlwiIGVmZmVjdCBmb3IgYWN0aXZhdGlvblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5mbHk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLnJlY292ZXJpbmcgJiYgIXRoaXMuc3RhdGVzLmF0dGFja2luZ19maW5hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzBdXG4gICAgICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMV0pIHtcbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgc3RhdGVzXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy9lbmFibGUgc3RhdGVzXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdXJkZXJMZWFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyb29nMSA9IG5ldyBDcm93KHRoaXMuZ2FtZSwgdGhpcy54ICsgdGhpcy5kcm9vZ09uZVswXSwgdGhpcy55ICsgdGhpcy5kcm9vZ09uZVsxXSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgWzIwMDAsIDIwMDBdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyb29nMiA9IG5ldyBDcm93KHRoaXMuZ2FtZSwgdGhpcy54ICsgdGhpcy5kcm9vZ1R3b1swXSwgdGhpcy55ICsgdGhpcy5kcm9vZ1R3b1sxXSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgWzIwMDAsIDIwMDBdKTtcbiAgICAgICAgICAgICAgICAgICAgZHJvb2cxLmxldmVsID0gdGhpcy5sZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgZHJvb2cxLnNlY3Rpb24gPSB0aGlzLnNlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIGRyb29nMi5sZXZlbCA9IHRoaXMubGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIGRyb29nMi5zZWN0aW9uID0gdGhpcy5zZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGRyb29nMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkoZHJvb2cyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZseWluZykgeyAvL3RoaXMudXBkYXRlSGl0Ym94KDUwLCA0MCwgMjAsIDE1KTtcbiAgICAgICAgICAgIC8vQXBwbHkgc3BlZWQgdXBkYXRlcyBhbmQgY2hhc2UgSGVyby9zdGF5IGluIGF0dGFjayByYW5nZVxuICAgICAgICAgICAgaWYgKCh0aGlzLnhTcGVlZCA8IHRoaXMubWF4WCAmJiB0aGlzLmZhY2luZyA9PT0gMSkgfHwgKHRoaXMueFNwZWVkID4gLXRoaXMubWF4WCAmJiB0aGlzLmZhY2luZyA9PT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54U3BlZWQgKz0gdGhpcy5mYWNpbmcgKiB0aGlzLnhBY2NlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55ID49IC0xMjUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U3BlZWQgPiAtdGhpcy5tYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNwZWVkIC09IHRoaXMueUFjY2VsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55IDw9IC0yMDApe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTcGVlZCA8IHRoaXMubWF4WSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlTcGVlZCArPSB0aGlzLnlBY2NlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TdGF5IHdpdGhpbiBDcm93J3MgYXR0YWNrIHJhZGl1c1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpID49IDUwMCAmJiB0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSAyNTAgJiYgdGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMueFNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMueFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYmVsb3cgaGVybztcbiAgICAgICAgICAgIC8vaWYgKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkgPD0gMTAwKSB7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy8vLyBhYm92ZSBoZXJvXG4gICAgICAgICAgICAvL2Vsc2UgaWYgKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkgPj0gMjAwKSB7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnkgKz0gdGhpcy55U3BlZWQ7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAvL0FUVEFDSyEhIVxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IDcwMFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55IDwgLTEwMCAmJiAodGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPiAtMjAwXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMSAmJiBNYXRoLnJhbmRvbSgpICogMTAwIDw9IDEwKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYXR0YWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mbHlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc291bmQucGxheShcImNyb3dfY2F3XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMueSAtPSB0aGlzLmF0dGFja0FuZ2xlMTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuYm91bmRZIC09IHRoaXMuYXR0YWNrQW5nbGUyO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKC10aGlzLmZhY2luZyAqIHRoaXMueEF0dGFjay8yLCAtdGhpcy5hdHRhY2tBbmdsZTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnkgLT0gdGhpcy5hdHRhY2tBbmdsZTI7XG4gICAgICAgICAgICAgICAgLy90aGlzLmJvdW5kWSAtPSB0aGlzLmF0dGFja0FuZ2xlMjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygtdGhpcy5mYWNpbmcgKiB0aGlzLnhBdHRhY2svMiwgLXRoaXMuYXR0YWNrQW5nbGUyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdGhpcy54IC09IHRoaXMuZmFjaW5nKjc7XG4gICAgICAgICAgICAvL3RoaXMuYm91bmRYIC09IHRoaXMuZmFjaW5nKjc7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvL3JhbmRvbWx5IGRldGVybWluZSBhbmdsZSBvZiBhdHRhY2sgKG1ha2VzIHByZWRpY3Rpb24gaGFyZGVyKVxuICAgICAgICAgICAgICAgIC8vbWluIGF0dGFjayBhbmdsZSBvZiAyXG4gICAgICAgICAgICAgICAgLy90aGlzLmF0dGFja0FuZ2xlID0gMiArIE1hdGgucmFuZG9tKCkgKiA4OyBcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwpIHtcbiAgICAgICAgICAgIGlmKHRoaXMucmFuZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLmF0dGFja0FuZ2xlMTtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLmF0dGFja0FuZ2xlMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLmF0dGFja0FuZ2xlMjtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLmF0dGFja0FuZ2xlMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLmZhY2luZyAqIHRoaXMueEF0dGFjaztcbiAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMuZmFjaW5nICogdGhpcy54QXR0YWNrO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInk6IFwiICsgdGhpcy55KTtcblxuXG4gICAgICAgICAgICAvL1NwYXduIEh1cnRib3hcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy54LCB0aGlzLnksIC00NSwgMTAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA0MCwgNDAsIHRoaXMuc2NhbGUsIDEsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLngsIHRoaXMueSwgLTQ1IC0gdGhpcy5zcHJpdGVXaWR0aCAtIDMwLCAxMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDQwLCA0MCwgdGhpcy5zY2FsZSwgMSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcblxuICAgICAgICAgICAgLy9zdGF0ZSBmaW5pc2hlZFxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZ19maW5hbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZWNvdmVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucmVjb3ZlcmluZykgeyAvL2FmdGVyIGF0dGFjayBpcyBmaW5pc2hlZFxuICAgICAgICAgICAgLy9mbHkgYXdheVxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZmFjaW5nICogdGhpcy54UmVjb3ZlcjtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYICs9IHRoaXMuZmFjaW5nICogdGhpcy54UmVjb3ZlcjtcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnlSZWNvdmVyO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgLT0gdGhpcy55UmVjb3ZlcjtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA+PSB0aGlzLnJlY292ZXJEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlY292ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mbHlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5odXJ0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkgeyAvLyBERUFUSCBSQVRUTEVcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IC41KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSBNYXRoLnJhbmRvbSgpICogNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IE1hdGgucmFuZG9tKCkgKiA1XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55IC09IE1hdGgucmFuZG9tKCkgKiA1O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gTWF0aC5yYW5kb20oKSAqIDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gOCkge1xuICAgICAgICAgICAgICAgIC8vcmVzZXQgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIC8vZGlzYWJsZSBzdGF0ZXNcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5odXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy9lbmFibGUgc3RhdGVzXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9ICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodDtcbiAgICAgICAgICAgICAgICAvL3VwZGF0ZSBoaXRib3hcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNDAsIDIwLCAxNSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSAqIDEwMCA8PSAyNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSXRlbS5IZWFsdGhQYWNrKHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuZ2FtZS5nYW1lYm9hcmQuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2hlYWx0aHBhY2sucG5nXCIpLCB0aGlzLmN0eCwgMTAsIDgsIDMsIDUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEl0ZW0uRW5lcmd5UGFjayh0aGlzLmdhbWUsIHRoaXMueCArIDMwLCB0aGlzLnksIHRoaXMuZ2FtZS5nYW1lYm9hcmQuYXNzZXRNYW5hZ2VyLmdldEFzc2V0KFwiaW1nL2VuZXJneXBhY2sucG5nXCIpLCB0aGlzLmN0eCwgMTAsIDgsIDMsIDUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mbHlpbmcgfHwgdGhpcy5zdGF0ZXMuaWRsaW5nIHx8IHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmZseTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYXR0YWNraW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hdHRhY2s7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmF0dGFja2luZ19maW5hbCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYXR0YWNrX2ZpbmFsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5odXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5odXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDI7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIC8vbnVsbFxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJQcm9qZWN0aWxlXCIgJiYgIXRoaXMuc3RhdGVzLmh1cnQgJiYgIXRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmx5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZ19maW5hbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5odXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSHVydGJveFwiICYmICF0aGlzLnN0YXRlcy5odXJ0ICYmICF0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mbHlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmdfZmluYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5odXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3JvdzsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBUZXJyYWluLFxuICAgIFByb2plY3RpbGUsXG4gICAgUm9ja2V0LFxuICAgIEh1cnRib3gsXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgRGlubyBleHRlbmRzIEVuZW15IHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGggPSA5MCwgc3ByaXRlSGVpZ2h0ID0gNjAsIHBhdHJvbERpc3RhbmNlID0gMCwgc2hvdFRpbWVPZmZzZXQgPSAwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMjtcbiAgICAgICAgdGhpcy5oZXJvID0gdGhpcy5nYW1lLmhlcm87XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiAzNTtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiAzNTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArICh0aGlzLnNwcml0ZUhlaWdodCAvIDIpO1xuICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG5cbiAgICAgICAgdGhpcy5zdGFydFggPSB4O1xuICAgICAgICB0aGlzLm1heFggPSB0aGlzLnN0YXJ0WCArIHBhdHJvbERpc3RhbmNlOyAvL0NoYW5nZSB0aGlzIHRvIGFsdGVyIGRpbm8ncyBwYXRyb2wgZGlzdGFuY2VcbiAgICAgICAgXG4gICAgICAgIC8vVGltZXJzXG4gICAgICAgIHRoaXMuc2hvdENvb2xkb3duID0gMjUwO1xuICAgICAgICB0aGlzLnNob3RDb29sZG93blRpbWVyID0gc2hvdFRpbWVPZmZzZXQ7XG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5wb2ludFZhbHVlID0gMTVcbiAgICAgICAgdGhpcy5oZWFsdGggPSAyMDA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gMTUwMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IDEwMDA7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJpZGxpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic2hvb3RpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcIndhbGtpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImdyb3VuZGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwYXRyb2xsaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmcmFtZWxvY2tlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJpZGxlXCI6ICAgICAgICAgICAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA2LCAxMywgNSwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTIpLFxuICAgICAgICAgICAgXCJ3YWxrX3N0cmFpZ2h0XCI6ICAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA2LCAxMywgOSwgNiwgdHJ1ZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICAvL1wid2Fsa19kb3duXCI6ICAgICAgICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDYwXSwgNiwgMTMsIDcsIDYsIHRydWUsIHRoaXMuc2NhbGUsIDYpLFxuICAgICAgICAgICAgLy9cIndhbGtfdXBcIjogICAgICAgICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA3MF0sIDYsIDE4LCA3LCA2LCB0cnVlLCB0aGlzLnNjYWxlKSwvLzkweDcwXG4gICAgICAgICAgICAvL1wic2hvb3RfdXBcIjogICAgICAgICBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOTAsIDcwXSwgNiwgMTgsIDcsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCA2KSwvLzkweDcwXG4gICAgICAgICAgICBcInNob290X2RpYWdvbmFsXCI6ICAgbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA3MF0sIDYsIDE4LCA3LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTApLC8vOTB4NzBcbiAgICAgICAgICAgIC8vXCJzaG9vdF9zdHJhaWdodFwiOiAgIG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNzBdLCA2LCAxOCwgNywgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDE0KSwvLzkweDcwICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHBhdHJvbERpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMucGF0cm9sbGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8qKioqQkVHSU4gQkVIQVZJT1IqKioqL1xuICAgICAgICAvL1R1cm4gdG93YXJkcyBIZXJvXG4gICAgICAgIC8vIGlmICghdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgJiYgIXRoaXMuc3RhdGVzLnBhdHJvbGxpbmcpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhdGVzLnBhdHJvbGxpbmcgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGF0cm9sbGluZyAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLndhbGtpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMueCA8PSB0aGlzLnN0YXJ0WCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy54ID49IHRoaXMubWF4WCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy53YWxraW5nKSB7XG5cbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLmZhY2luZyAqIHRoaXMubW92ZW1lbnRTcGVlZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdENvb2xkb3duVGltZXIgPD0gMCAmJiB0aGlzLnlWZWxvY2l0eSA9PT0gMFxuICAgICAgICAgICAgICAgICYmIChNYXRoLmFicyh0aGlzLm1heFggLSB0aGlzLngpIDw9IDUgfHwgTWF0aC5hYnModGhpcy5zdGFydFggLSB0aGlzLngpIDw9IDUpXG4gICAgICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMF0gJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPD0gdGhpcy5zaWdodFJhZGl1c1sxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMud2Fsa2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3RDb29sZG93blRpbWVyIDw9IDAgJiYgdGhpcy55VmVsb2NpdHkgPT09IDAgJiYgTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gdGhpcy5zaWdodFJhZGl1c1swXSAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8PSB0aGlzLnNpZ2h0UmFkaXVzWzFdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZykge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUm9ja2V0KHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImVuZXJneV9sYXVuY2hlclwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IGZhbHNlOyAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnNob3RDb29sZG93blRpbWVyID0gdGhpcy5zaG90Q29vbGRvd247XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnBhdHJvbGxpbmcpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLndhbGtpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9UaW1lcnNcbiAgICAgICAgaWYgKHRoaXMuc2hvdENvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3RDb29sZG93blRpbWVyIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FwcGx5IEdyYXZpdHlcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgKz0gdGhpcy5ncmF2aXR5ICogdGhpcy5ncmF2aXR5O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlWZWxvY2l0eTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMueSk7XG4gICAgICAgIC8vSGVhbHRoIGNoZWNrc1xuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlkbGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goOTAsIDYwLCAyNSwgNDUpXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy53YWxraW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg5MCwgNjAsIDI1LCA0NSlcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLndhbGtfc3RyYWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg5MCwgNzAsIDI1LCA0NSlcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob290X2RpYWdvbmFsOyAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0OyAvL2ZpeCBtYWdpYyBudW1iZXIgKGRyYXduIHNsaWdodGx5IGJlbG93IGhpdGJveCB3aXRob3V0IHRoZSAyMCBvZmZzZXQpXG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgKyBvdGhlci5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmJvdW5kWCArIDg3O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFggLSA4NztcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIkh1cnRib3hcIikge1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgICAgICAvL290aGVyLmhhc093blByb3BlcnR5KFwiZGFtYWdlXCIpO1xuICAgICAgICAgICAgLy8gYmxvY2tpbmcgZnJvbSBsZWZ0ICYgcmlnaHRcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0LCBvZmZYID0gMCwgb2ZmWSA9IDApIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJIZWlnaHQ7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoIC8gMiArIG9mZlg7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArIG9mZlk7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEaW5vOyIsImRlZmluZShbXG4gICAgXCJhY3RvclwiLFxuICAgIFwiYW5pbWF0aW9uXCIsXG5dLCBmdW5jdGlvbiAoXG4gICAgQWN0b3IsXG4gICAgQW5pbWF0aW9uLFxuICAgICkge1xuXG5cbiAgICAgICAgY2xhc3MgRW5lbXkgZXh0ZW5kcyBBY3RvciB7XG5cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodCkge1xuICAgICAgICAgICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJBY3RvclwiO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VUeXBlID0gXCJoZWFsdGhcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50VmFsdWUgPSAwOy8vRGVmaW5lIHRoaXMgZXhwbGljaXRseSBmb3IgcmVsZXZhbnQgZW5lbWllc1xuICAgICAgICAgICAgICAgIC8vVE9ETyAoZnV0dXJlIGRldmVsb3BtZW50KSBtYWtlIHNpZ2h0IHJhZGl1cyBhIHBhcnQgb2YgRW5lbXkgZGVmaW5pdGlvbiBmb3IgdXNlIGluIHN1cGVyIGNvbnN0cnVjdG9yc1xuICAgICAgICAgICAgICAgIHRoaXMuc2lnaHRSYWRpdXMgPSBbOTAwLCAzMDBdIC8vIHgsIHkgZGlzdGFuY2UgZnJvbSBjdXJyZW50IGxvY2F0aW9uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgICAgICBzdXBlci51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRW5lbXk7XG4gICAgfSk7IiwiZGVmaW5lKFtcbiAgICBcImFuaW1hdGlvblwiLFxuXSxmdW5jdGlvbihcbiAgICBBbmltYXRpb24sXG4pe1xuXG4gICAgLyoqKioqKioqKioqXG4gICAgRW50aXR5IGNsYXNzXG5cbiAgICBnYW1lIC0gYSByZWZlcmVuY2UgdG8gdGhlIGdhbWUgaW4gd2hpY2ggdGhpcyBlbnRpdHkgZXhpc3RzXG4gICAgeCwgeSAtIGVudGl0eSdzIGNvb3JkaW5hdGVzXG4gICAgcmVtb3ZlRnJvbVdvcmxkIC0gYSBmbGFnIHRoYXQgZGVub3RlcyB3aGVuIHRvIHJlbW92ZSB0aGlzIGVudGl0eSBmcm9tIHRoZSBnYW1lXG4gICAgKioqKioqKioqKioqL1xuICAgIGNsYXNzIEVudGl0eSB7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKGdhbWUsIHgsIHksIGltZz1udWxsLCBjdHg9bnVsbCkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gLjk7XG4gICAgICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmN0eCA9IGN0eDtcblxuICAgICAgICAgICAgLy8gdXNlZCBmb3Igc2ltcGxlIHJlY3QgaGl0Ym94XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETywgaW1wbGVtZW50IGEgbGlzdCBvZiBib3VuZGluZyBzaGFwZXMsIGl0ZXJhdGUgdGhyb3VnaCBkZXBlbmRpbmcgb24gdHlwZSAoY2lyY2xlIG9yIHJlY3QpIFxuICAgICAgICByZWN0YW5nbGUoKSB7XG5cbiAgICAgICAgfVxuICAgICAgICBjaXJjbGUoKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIERyYXdzIHRoZSBvdXRsaW5lIG9mIHRoaXMgZW50aXR5ICovXG4gICAgICAgIGRyYXdPdXRsaW5lIChjdHgpIHtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wXG4gICAgICAgIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvP1xuICAgICAgICAqL1xuICAgICAgICB1cGRhdGUgKCkgeyB9XG5cbiAgICAgICAgLyogRHJhd3MgdGhpcyBlbnRpdHkuIENhbGxlZCBldmVyeSBjeWNsZSBvZiB0aGUgZ2FtZSBlbmdpbmUuICovXG4gICAgICAgIGRyYXcgKGN0eCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5zaG93T3V0bGluZXMgJiYgdGhpcy5ib3VuZFgpIHtcbiAgICAgICAgICAgICAgICBkcmF3T3V0bGluZShjdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaW1nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKHRoaXMuY2xvY2tUaWNrLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgIENvbGxpc2lvbiBkZXRlY3Rpb24sIHJlY3RhbmdsZVxuICAgICAgICAqL1xuICAgICAgICBpc0NvbGxpZGluZyhvdGhlcikge1xuICAgICAgICAgICAgbGV0IHJlY3QxID0ge1xuICAgICAgICAgICAgICAgIFwieFwiIDogdGhpcy5ib3VuZFgsXG4gICAgICAgICAgICAgICAgXCJ5XCIgOiB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgICAgICBcImxhc3RZXCIgOiB0aGlzLmxhc3RCb3VuZFksXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiIDogdGhpcy5ib3VuZFdpZHRoLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMuYm91bmRIZWlnaHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHJlY3QyID0ge1xuICAgICAgICAgICAgICAgIFwieFwiIDogb3RoZXIuYm91bmRYLFxuICAgICAgICAgICAgICAgIFwieVwiIDogb3RoZXIuYm91bmRZLFxuICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6IG90aGVyLmJvdW5kV2lkdGgsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogb3RoZXIuYm91bmRIZWlnaHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlY3QxLndpZHRoID09PSAwIHx8IHJlY3QxLmhlaWdodCA9PT0gMCB8fCByZWN0Mi53aWR0aCA9PT0gMCB8fCByZWN0Mi5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25vbmUnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBzYW1lIGFzIE1hcmlvdHQncyBtZXRob2QsIGp1c3QgZm9ybWF0dGVkIGRpZmZlcmVudGx5XG4gICAgICAgICAgICBsZXQgY29sbGlzaW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgdmFyIGR4ID0gKHJlY3QxLnggKyByZWN0MS53aWR0aC8yKSAtIChyZWN0Mi54ICsgcmVjdDIud2lkdGgvMik7XG4gICAgICAgICAgICB2YXIgZHkgPSAocmVjdDEueSArIHJlY3QxLmhlaWdodC8yKSAtIChyZWN0Mi55ICsgcmVjdDIuaGVpZ2h0LzIpO1xuICAgICAgICAgICAgdmFyIGxhc3RkeSA9IChyZWN0MS5sYXN0WSArIHJlY3QxLmhlaWdodC8yKSAtIChyZWN0Mi55ICsgcmVjdDIuaGVpZ2h0LzIpO1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gKHJlY3QxLndpZHRoICsgcmVjdDIud2lkdGgpIC8gMjtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAocmVjdDEuaGVpZ2h0ICsgcmVjdDIuaGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB2YXIgY3Jvc3NXaWR0aCA9IHdpZHRoICogZHk7XG4gICAgICAgICAgICB2YXIgbGFzdENyb3NzV2lkdGggPSB3aWR0aCAqIGxhc3RkeTtcbiAgICAgICAgICAgIHZhciBjcm9zc0hlaWdodCA9IGhlaWdodCAqIGR4O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBGaXJzdCBjaGVjayBpZiByZWN0MSBhbmQgcmVjdDIgYXJlIGNsb3NlIGVub3VnaCB0byBldmVuIGNvbGxpZGUuIFRoZW4gY2hlY2sgdGhlIGludGVyc2VjdGlvbiBkZXB0aHMgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpZGUgd2FzIG1vc3QgaW52b2x2ZWQgaW4gdGhlIGNvbGxpc2lvbi5cbiAgICAgICAgICAgIGlmKE1hdGguYWJzKGR4KSA8PSB3aWR0aCAmJiBNYXRoLmFicyhkeSkgPD0gaGVpZ2h0KSB7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gc3RvcmUgbGFzdCBib3R0b20gb2YgcmVjdDEsIGNvbXBhcmUgdG8gYm91bmQgb2YgcmVjdDIsIGRldGVybWluZSBpZiBpIHNob3VsZCBmYWxsIG9yIG5vdFxuICAgICAgICAgICAgICAgIGlmIChjcm9zc1dpZHRoID4gY3Jvc3NIZWlnaHQgJiYgbGFzdENyb3NzV2lkdGggPiBjcm9zc0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAoY3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpKSAmJiBsYXN0Q3Jvc3NXaWR0aCA8IC0oY3Jvc3NIZWlnaHQpID8gY29sbGlzaW9uID0gJ3JpZ2h0JyA6IGNvbGxpc2lvbiA9ICd0b3AnO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3Jvc3NXaWR0aCA+ICgtY3Jvc3NIZWlnaHQpICYmIGxhc3RDcm9zc1dpZHRoID4gKC1jcm9zc0hlaWdodCkgPyBjb2xsaXNpb24gPSAnbGVmdCcgOiBjb2xsaXNpb24gPSAnYm90dG9tJztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWN0MSBjdXI6IFwiICsgcmVjdDEueSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVjdDEgbGFzdDogXCIgKyByZWN0MS5sYXN0WSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVjdDI6IFwiICsgcmVjdDIueSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgfVxuICAgIH0gLy8gZW5kIG9mIEVudGl0eSBjbGFzc1xuXG4gICAgcmV0dXJuIEVudGl0eTtcbn0pO1xuIiwiZGVmaW5lKFtcbiAgICAnYWN0b3InLFxuICAgICdhbmltYXRpb24nLFxuXSxmdW5jdGlvbihcbiAgICBBY3RvcixcbiAgICBBbmltYXRpb24sXG4pe1xuXG5cbiAgICBjbGFzcyBGbGFtZXMgZXh0ZW5kcyBBY3RvciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDIwLCBzcHJpdGVIZWlnaHQgPSA0MCkge1xuICAgICAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMTtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlcyA9IHsgXCJhY3RpdmVcIjogZmFsc2UsIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsIH07XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7IFwiZGVtb1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA4LCA5LCAxMCwgOSwgdHJ1ZSwgdGhpcy5zY2FsZSkgfTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRlbW87XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICAvL1RPRE9cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIHJldHVybiBGbGFtZXM7XG59KTtcblxuXG5cbiAgICIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCJcbmltcG9ydCB7TGV2ZWxPbmUsIExldmVsVHdvfSBmcm9tIFwiLi9cIlxuXG5cbi8qKioqKioqKioqKioqKlxuR2FtZUJvYXJkIGNsYXNzXG4qKioqKioqKioqKioqKi9cbmNsYXNzIEdhbWVCb2FyZCBleHRlbmRzIEVudGl0eSB7XG5cbiAgICAvLyBzbyB0aGlzIHByb3RvdHlwZS5jYWxsKCkgaXMgY2FsbGluZyB0aGUgRW50aXR5IGNvbnN0cnVjdG9yIHdpdGggKGdhbWU9bnVsbCwgeD0wLCB5PTApXG4gICAgY29uc3RydWN0b3IgKGdhbWUsIGFzc2V0TWFuYWdlciwgY3R4LCBoZXJvLCBodWQpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgMCwgMCwgbnVsbCwgY3R4KTtcbiAgICAgICAgdGhpcy50ZXN0UG9zID0gWzExNTcwLCAzMDBdOyAvL0RCRy9EZXYgVG9vbFxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmFzc2V0TWFuYWdlciA9IGFzc2V0TWFuYWdlcjtcbiAgICAgICAgLy91c2VkIGZvciByZWNhbGxpbmcgYSBzZWN0aW9uJ3Mgbm9uLXRlcnJhaW4sIG5vbi1oYXphcmQgYWN0b3JzIG9uIGRlYXRoXG4gICAgICAgIHRoaXMubGV2ZWxOdW07XG4gICAgICAgIHRoaXMuc2VjdGlvbk51bTtcbiAgICAgICAgLy9wb2ludCB2YWx1ZSB0aW1lclxuICAgICAgICB0aGlzLnB2dCA9IDA7XG4gICAgICAgIHRoaXMucHZ0dCA9IDIwO1xuICAgICAgICB0aGlzLmxvc3RTY29yZSA9IDA7XG5cbiAgICAgICAgdGhpcy5kZWFkRW5lbWllcyA9IFtbWzAsMF0sIDAsIDBdXTtcblxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy50aW1lO1xuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgICAgICB0aGlzLmh1ZCA9IGh1ZDtcbiAgICAgICAgdGhpcy5sZXZlbDtcbiAgICAgICAgdGhpcy5jaGVja05vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RDaGVja3BvaW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcIm5ld0JvYXJkXCI6IHRydWUsXG4gICAgICAgICAgICBcImxvYWRpbmdMZXZlbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibG9hZGVkTGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcInBvcHVsYXRlTGV2ZWxcIjogZmFsc2UsXG4gICAgICAgICAgICBcInJlc3Bhd25MZXZlbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibG9hZGluZ1NlY3Rpb25cIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWRlZFNlY3Rpb25cIjogZmFsc2UsXG4gICAgICAgICAgICBcInJlc3Bhd25TZWN0aW9uXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJuZXdMZXZlbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwibG9hZE5leHRMZXZlbFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvd1BvaW50VmFsdWVzXCI6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMubG9hZE5leHRMZXZlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbnRlcmVkIGxvYWROZXh0TGV2ZWxcIik7XG4gICAgICAgICAgICB2YXIgbmV4dExldmVsID0gdGhpcy5sZXZlbC5uZXh0TGV2ZWw7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0TGV2ZWwobmV4dExldmVsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMubG9hZGVkTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nTGV2ZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwucG9wdWxhdGVNYXAoLTEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxvYWRpbmdMZXZlbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zZXRQb3MoW3RoaXMuY2hlY2tOb2RlLngsIHRoaXMuY2hlY2tOb2RlLnldKVxuICAgICAgICAgICAgICAgIHRoaXMubmV4dE5vZGUgPSB0aGlzLmNoZWNrcG9pbnRzLm5leHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGVkTGV2ZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLm5ld0xldmVsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eSh0aGlzLmhlcm8pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkodGhpcy5sZXZlbC5wb3J0YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5yZW1vdmVGcm9tV29ybGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eSh0aGlzLmh1ZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5odWQucmVtb3ZlRnJvbVdvcmxkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMubG9hZGluZ1NlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZXNwYXduU2VjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbC5wb3B1bGF0ZU1hcCh0aGlzLnNlY3Rpb25OdW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxvYWRpbmdTZWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWxvYWRlZCBzZWN0aW9uIFwiICsgdGhpcy5zZWN0aW9uTnVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsLm5leHRMZXZlbCA+IDAgJiYgdGhpcy5jaGVja05vZGUuc3RhdGVzLmlzQmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJCb2FyZChcImxldmVsXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0lmIGVudGVyaW5nIG5leHQgY2hlY2twb2ludFxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuaXNCYWNrICYmIHRoaXMuaGVyby54ID49IHRoaXMuY2hlY2tOb2RlLm5leHQueCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZSA9IHRoaXMuY2hlY2tOb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrTm9kZS5zdGF0ZXMuYWN0aXZhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlLnN0YXRlcy5hY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RDaGVja3BvaW50ID0gdGhpcy5jaGVja05vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlLnN0YXRlcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWCA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlg7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZZID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmNhbVNwZWVkWCA9IHRoaXMuY2hlY2tOb2RlLm5leHRDYW1TcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmNhbVNwZWVkWSA9IHRoaXMuY2hlY2tOb2RlLm5leHRDYW1TcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vSWYgZW50ZXJpbmcgcHJldmlvdXMgY2hlY2twb2ludFxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuY2hlY2tOb2RlLnN0YXRlcy5pc0Zyb250ICYmIHRoaXMuaGVyby54IDwgdGhpcy5jaGVja05vZGUueFxuICAgICAgICAgICAgICAgICYmIHRoaXMuaGVyby54ID49IHRoaXMuY2hlY2tOb2RlLnByZXYueCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTm9kZSA9IHRoaXMuY2hlY2tOb2RlLnByZXY7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlggPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZYO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWSA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5jYW1TcGVlZFggPSB0aGlzLmNoZWNrTm9kZS5wcmV2Q2FtU3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5jYW1TcGVlZFkgPSB0aGlzLmNoZWNrTm9kZS5wcmV2Q2FtU3BlZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhlcm8uc3RhdGVzLnJlc3Bhd25lZCkge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5jbGVhckJvYXJkKFwibGV2ZWxcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvLnJlc3Bhd24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc2V0UG9zKFt0aGlzLmxhc3RDaGVja3BvaW50LngsIHRoaXMubGFzdENoZWNrcG9pbnQueSAtIDEwXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJvYXJkKFwiYWN0b3JzXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcGF3blwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3Bhd25NZXNzYWdlID0gMip0aGlzLnB2dHQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob3dQb2ludFZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnB2dCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdnQtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3dQb2ludFZhbHVlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzcGF3bk1lc3NhZ2UgPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRyYXdcIilcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIkJvbGQgMjVweCBWZXJkYW5hXCI7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNGRjAwMDBcIjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiLVwiICsgdGhpcy5sb3N0U2NvcmUgKyBcIiBwb2ludHNcIixcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaGVyby54ICsgMTAsXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlcm8ueSAtIDE1MFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMucmVzcGF3bk1lc3NhZ2UtLTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kZWFkRW5lbWllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5kZWFkRW5lbWllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYWRFbmVtaWVzW2ldWzJdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhZEVuZW1pZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkcmF3XCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjIwcHggVmVyZGFuYVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCIrXCIgKyB0aGlzLmRlYWRFbmVtaWVzW2ldWzFdICsgXCIgcG9pbnRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRFbmVtaWVzW2ldWzBdWzBdICsgMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRFbmVtaWVzW2ldWzBdWzFdIC0gMTUwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhZEVuZW1pZXNbaV1bMl0tLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckJvYXJkKHNjb3BlKSB7XG4gICAgICAgIC8vc2NvcGUgd2lsbCByYW5nZSBmcm9tIGFjdG9ycyBvbmx5LCB0byB0aGUgZW50aXJlIGxldmVsLlxuICAgICAgICBpZiAoc2NvcGUgPT09IFwiYWN0b3JzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmxvYWRpbmdTZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbk51bSA9IHRoaXMubGFzdENoZWNrcG9pbnQubnVtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNjb3BlID09PSBcImxldmVsXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVyby5zdGF0ZXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5uZXdMZXZlbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJCb2FyZCBDbGVhcmVkXCIpO1xuICAgIH1cblxuICAgIGNsZWFyU3RhdGVzKCkge1xuICAgICAgICB0aGlzLnN0YXRlcy5sb2FkaW5nTGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGVkTGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucG9wdWxhdGVMZXZlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5yZXNwYXduTGV2ZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGluZ1NlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubG9hZGVkU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5yZXNwYXduU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5uZXdMZXZlbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5sb2FkTmV4dExldmVsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0TGV2ZWwobGV2ZWwpIHtcbiAgICAgICAgaWYgKGxldmVsID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbmV3IExldmVsc1tcImxldmVsLW9uZVwiXSh0aGlzLmdhbWUsIHRoaXMuYXNzZXRNYW5hZ2VyLCB0aGlzLmN0eCk7XG4gICAgICAgICAgICB0aGlzLmxldmVsTnVtID0gbGV2ZWw7XG4gICAgICAgICAgICAvL1Nob3VsZCBtb3ZlIHRoaXMgaW50byB0aGUgTGV2ZWxUd28gY2xhc3MoPylcbiAgICAgICAgICAgIC8vQ3JlYXRlIGNoZWNrcG9pbnQgbGlua2VkIGxpc3QuXG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrUG9zID0gdGhpcy5sZXZlbC5jaGVja3BvaW50c1swXTtcbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tYID0gY3VyckNoZWNrUG9zWzBdO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1kgPSBjdXJyQ2hlY2tQb3NbMV07XG4gICAgICAgICAgICB2YXIgbGlzdEZyb250ID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgMCwgdGhpcy5sZXZlbC5jYW1WYWxzWzBdLCB0aGlzLmxldmVsLmNhbVNwZWVkc1swXSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBsaXN0RnJvbnQuc3RhdGVzLmlzRnJvbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzUHJldiA9IGZhbHNlO1xuICAgICAgICAgICAgbGlzdEZyb250Lm51bSA9IDA7XG4gICAgICAgICAgICBsaXN0RnJvbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5hY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVjayA9IG51bGw7XG4gICAgICAgICAgICB2YXIgcHJldkNoZWNrID0gbGlzdEZyb250O1xuICAgICAgICAgICAgLy9pbnN0YW50aWF0ZSBjaGVja3BvaW50IGxpbmtlZCBsaXN0XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRoaXMubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tQb3MgPSB0aGlzLmxldmVsLmNoZWNrcG9pbnRzW2ldO1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1ggPSBjdXJyQ2hlY2tQb3NbMF07XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrWSA9IGN1cnJDaGVja1Bvc1sxXTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5sZXZlbC5jaGVja3BvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjayA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIGksIHRoaXMubGV2ZWwuY2FtVmFsc1tpXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbaV0sIG51bGwsIHByZXZDaGVjayk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaGFzTmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmlzQmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2sgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCBpLCB0aGlzLmxldmVsLmNhbVZhbHNbaV0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzW2ldLCBudWxsLCBwcmV2Q2hlY2spO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2subnVtID0gaTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5oYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrLm51bSA9IGk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrLmFkZE5leHQoY3VyckNoZWNrKTtcbiAgICAgICAgICAgICAgICBwcmV2Q2hlY2suc2V0Qm91bmRzKCk7XG4gICAgICAgICAgICAgICAgcHJldkNoZWNrID0gY3VyckNoZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VyckNoZWNrLnNldEJvdW5kcygpO1xuICAgICAgICAgICAgdGhpcy5jaGVja3BvaW50cyA9IGxpc3RGcm9udDtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tOb2RlID0gbGlzdEZyb250O1xuICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2twb2ludCA9IHRoaXMuY2hlY2tOb2RlO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZYID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuYWJzT2ZmWSA9IHRoaXMuY2hlY2tOb2RlLmNhbU9mZlk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBuZXcgTGV2ZWxzW1wibGV2ZWwtdHdvXCJdKHRoaXMuZ2FtZSwgdGhpcy5hc3NldE1hbmFnZXIsIHRoaXMuY3R4KTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxOdW0gPSBsZXZlbDtcbiAgICAgICAgICAgIC8vU2hvdWxkIG1vdmUgdGhpcyBpbnRvIHRoZSBMZXZlbFR3byBjbGFzcyg/KVxuICAgICAgICAgICAgLy9DcmVhdGUgY2hlY2twb2ludCBsaW5rZWQgbGlzdC5cbiAgICAgICAgICAgIHZhciBjdXJyQ2hlY2tQb3MgPSB0aGlzLmxldmVsLmNoZWNrcG9pbnRzWzBdO1xuICAgICAgICAgICAgdmFyIGN1cnJDaGVja1ggPSBjdXJyQ2hlY2tQb3NbMF07XG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrWSA9IGN1cnJDaGVja1Bvc1sxXTtcbiAgICAgICAgICAgIHZhciBsaXN0RnJvbnQgPSBuZXcgQ2hlY2twb2ludCh0aGlzLmdhbWUsIGN1cnJDaGVja1gsIGN1cnJDaGVja1ksIHRoaXMuY3R4LCAwLCB0aGlzLmxldmVsLmNhbVZhbHNbMF0sIHRoaXMubGV2ZWwuY2FtU3BlZWRzWzBdLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIGxpc3RGcm9udC5zdGF0ZXMuaXNGcm9udCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNQcmV2ID0gZmFsc2U7XG4gICAgICAgICAgICBsaXN0RnJvbnQubnVtID0gMDtcbiAgICAgICAgICAgIGxpc3RGcm9udC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgbGlzdEZyb250LmFjdGl2YXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY3VyckNoZWNrID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBwcmV2Q2hlY2sgPSBsaXN0RnJvbnQ7XG4gICAgICAgICAgICAvL2luc3RhbnRpYXRlIGNoZWNrcG9pbnQgbGlua2VkIGxpc3RcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGhpcy5sZXZlbC5jaGVja3BvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGN1cnJDaGVja1BvcyA9IHRoaXMubGV2ZWwuY2hlY2twb2ludHNbaV07XG4gICAgICAgICAgICAgICAgY3VyckNoZWNrWCA9IGN1cnJDaGVja1Bvc1swXTtcbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2tZID0gY3VyckNoZWNrUG9zWzFdO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLmxldmVsLmNoZWNrcG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrID0gbmV3IENoZWNrcG9pbnQodGhpcy5nYW1lLCBjdXJyQ2hlY2tYLCBjdXJyQ2hlY2tZLCB0aGlzLmN0eCwgaSwgdGhpcy5sZXZlbC5jYW1WYWxzW2ldLCB0aGlzLmxldmVsLmNhbVNwZWVkc1tpXSwgbnVsbCwgcHJldkNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyckNoZWNrLnN0YXRlcy5oYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5zdGF0ZXMuaXNCYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjayA9IG5ldyBDaGVja3BvaW50KHRoaXMuZ2FtZSwgY3VyckNoZWNrWCwgY3VyckNoZWNrWSwgdGhpcy5jdHgsIGksIHRoaXMubGV2ZWwuY2FtVmFsc1tpXSwgdGhpcy5sZXZlbC5jYW1TcGVlZHNbaV0sIG51bGwsIHByZXZDaGVjayk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJDaGVjay5udW0gPSBpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyQ2hlY2suc3RhdGVzLmhhc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyQ2hlY2subnVtID0gaTtcbiAgICAgICAgICAgICAgICBwcmV2Q2hlY2suYWRkTmV4dChjdXJyQ2hlY2spO1xuICAgICAgICAgICAgICAgIHByZXZDaGVjay5zZXRCb3VuZHMoKTtcbiAgICAgICAgICAgICAgICBwcmV2Q2hlY2sgPSBjdXJyQ2hlY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyQ2hlY2suc2V0Qm91bmRzKCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrcG9pbnRzID0gbGlzdEZyb250O1xuICAgICAgICAgICAgdGhpcy5jaGVja05vZGUgPSBsaXN0RnJvbnQ7XG4gICAgICAgICAgICB0aGlzLmxhc3RDaGVja3BvaW50ID0gdGhpcy5jaGVja05vZGU7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmFic09mZlggPSB0aGlzLmNoZWNrTm9kZS5jYW1PZmZYO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5hYnNPZmZZID0gdGhpcy5jaGVja05vZGUuY2FtT2ZmWTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vb24gaGVybyBkZWF0aCwgcGF1c2UgZ2FtZSB1cGRhdGVzIGFuZCBzYXZlIHN0YXRlcyBvZiBhbGwgZW50aXRpZXMgcHJpb3IgdG8gdGhlIGNoZWNrcG9pbnRcbn0gLy8gZW5kIEdhbWVCb2FyZCBjbGFzc1xuXG4vL0NoZWNrcG9pbnQgXCJub2RlXCJcbmNsYXNzIENoZWNrcG9pbnQgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGN0eCwgbnVtLCBjYW1lcmFTaGlmdCA9IFsyLCAxLjVdLCBjYW1lcmFTcGVlZCA9IFs4LCA4XSwgbmV4dCA9IG51bGwsIHByZXYgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIG51bGwsIGN0eCk7XG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMucHJldiA9IHByZXY7XG4gICAgICAgIHRoaXMuY2FtT2ZmWCA9IGNhbWVyYVNoaWZ0WzBdO1xuICAgICAgICB0aGlzLmNhbU9mZlkgPSBjYW1lcmFTaGlmdFsxXTtcbiAgICAgICAgdGhpcy5uZXh0Q2FtU3BlZWQgPSBjYW1lcmFTcGVlZFswXTtcbiAgICAgICAgdGhpcy5wcmV2Q2FtU3BlZWQgPSBjYW1lcmFTcGVlZFsxXTtcbiAgICAgICAgdGhpcy5yaWdodEJvdW5kID0gdGhpcy54O1xuICAgICAgICB0aGlzLmxlZnRCb3VuZCA9IHRoaXMueCAtIDE7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblJhZGl1cyA9IFs2MCwgNjBdXG4gICAgICAgIHRoaXMubnVtID0gbnVtOyAvL0NoZWNrcG9pbnQncyBvcmRlciBpbiBsaXN0XG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJpc0Zyb250XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpc0JhY2tcIjogZmFsc2UsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYWN0aXZhdGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNOZXh0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNQcmV2XCI6IGZhbHNlLFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc05leHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1ByZXYgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuXG4gICAgfVxuXG4gICAgYWRkTmV4dChuZXh0KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLmhhc05leHQgPSB0cnVlO1xuICAgIH1cblxuICAgIHNldEJvdW5kcygpIHtcbiAgICAgICAgaWYgKHRoaXMubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yaWdodEJvdW5kID0gTWF0aC5mbG9vcigodGhpcy5uZXh0LnggKyB0aGlzLngpIC8gMikgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yaWdodEJvdW5kID0gdGhpcy54O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdEJvdW5kID0gTWF0aC5mbG9vcigodGhpcy5wcmV2LnggKyB0aGlzLngpIC8gMikgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sZWZ0Qm91bmQgPSB0aGlzLng7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KCkge1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7XG4iLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbmVteSxcbiAgICBUZXJyYWluLFxuICAgIEh1cnRib3gsXG4gICAgUHJvamVjdGlsZSxcbiAgICBCb21iLFxufSBmcm9tIFwiLi9cIlxuXG5cbi8vcm93IDksIDQweDMwLCAxMSBmcmFtZXNcbmNsYXNzIEhhbmQgZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoID0gNDAsIHNwcml0ZUhlaWdodCA9IDMwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gNztcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMTI1O1xuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDA7Ly91cGRhdGVkIGluIHJlbGV2YW50IHN0YXRlIHVwZGF0ZXNcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyAxMDtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcblxuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMucG9pbnRWYWx1ZSA9IDEwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzBdID0gNDAwMDtcbiAgICAgICAgdGhpcy5zaWdodFJhZGl1c1sxXSA9IDcwMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDsgLy90aHJlZSBub3JtYWwgaGl0cy5cbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxO1xuICAgICAgICB0aGlzLnRocm93dGltZSA9IDQ7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAxMjA7XG4gICAgICAgIHRoaXMuY29vbGRvd252YXJpYW5jZSA9IDIwXG4gICAgICAgIHRoaXMuY29vbGRvd25UaW1lciA9IDA7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImlkbGluZ1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGFydGluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwidGhyb3dpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1Rocm93blwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVjb3ZlcmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDExLCA1LCAxLCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwic3RhcnR1cFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDksIDExLCA1LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgMSksXG4gICAgICAgICAgICBcInRocm93XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTEsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICAgICAgXCJyZWNvdmVyXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgOSwgMTEsIDYsIDMsIGZhbHNlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg0MCwgMzAsIDIwLCA1LCAwLCAxMCk7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XG4gICAgICAgICAgICAvL2luc2VydCBhdHRhY2sgYmVoYXZpb3IuIExvb3BzIGZvciBub3cuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPD0gdGhpcy5zaWdodFJhZGl1c1swXVxuICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMV1cbiAgICAgICAgICAgICAgICAmJiB0aGlzLmNvb2xkb3duVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zdGFydGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZSA9IDE7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg0MCwgMzAsIDIwLCAyMCwgMCwgMTApO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhcnRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50aHJvd2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMudGhyb3dpbmcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuaGFzVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgQm9tYih0aGlzLmdhbWUsIHRoaXMueCArIHRoaXMuZmFjaW5nICogMTAsIHRoaXMueSAtIDIwLCB0aGlzLmltZywgdGhpcy5jdHgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgLyB0aGlzLmRpc3RhbmNlKSk7IC8vdmFsdWUgb2YgNzUgZXhwbG9kZXMgb24gc3RhdGlvbmFyeSBIZXJvXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IHRoaXMudGhyb3d0aW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1Rocm93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnRocm93aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gdGhpcy5jb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvb2xkb3duVGltZXItLTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIHRoaXMueVZlbG9jaXR5KTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhcnR1cDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMudGhyb3dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnRocm93O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5yZWNvdmVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpdGJveChmV2lkdGgsIGZIZWlnaHQsIGJXaWR0aCwgYkhlaWdodCwgeE9mZiwgeU9mZikge1xuICAgICAgICB0aGlzLmNlbnRlclggPSB0aGlzLnggKyAoKGZXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSBmV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyICsgeE9mZjtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgeU9mZjtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIC8vVE9ETyBBZGQgY29sbGlzaW9uIHdpdGggdGVycmFpblxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZICsgb3RoZXIuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9lbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgLy8gICAgdGhpcy54ID0gdGhpcy5ib3VuZFggKyA4NztcbiAgICAgICAgICAgIC8vICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYICsgb3RoZXIuYm91bmRXaWR0aDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMueCA9IHRoaXMuYm91bmRYIC0gODc7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5mYWNpbmcgPSAxO1xuICAgICAgICAgICAgLy99XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlByb2plY3RpbGVcIiAmJiAhdGhpcy5zdGF0ZXMuaHVydCkge1xuICAgICAgICAgICAgLy9ub3RoaW5nIGZvciBub3dcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gIFwiSHVydGJveFwiICYmICF0aGlzLnN0YXRlcy5odXJ0KSB7XG4gICAgICAgICAgICBvdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgICAgICBvdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBIYW5kOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEVudGl0eSxcbiAgICBIZXJvLFxuICAgIEh1cnRib3gsXG4gICAgVGVycmFpbixcbiAgICBBY3RvcixcbiAgICBFbmVteSxcbiAgICBQcm9qZWN0aWxlLFxufSBmcm9tIFwiLi9cIlxuXG5cbi8qKioqKioqKioqKlxuZ2FtZSAtIGEgcmVmZXJlbmNlIHRvIHRoZSBnYW1lIGluIHdoaWNoIHRoaXMgZW50aXR5IGV4aXN0c1xueCwgeSAtIGVudGl0eSdzIGNvb3JkaW5hdGVzXG5yZW1vdmVGcm9tV29ybGQgLSBhIGZsYWcgdGhhdCBkZW5vdGVzIHdoZW4gdG8gcmVtb3ZlIHRoaXMgZW50aXR5IGZyb20gdGhlIGdhbWVcbioqKioqKioqKioqKi9cbmNsYXNzIExhdmEgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgc3ByaXRlV2lkdGggPSA2NCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIHRoaXMueSArPSAoOTYgKiAzIC0gNiAqIDMpO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSAxMjg7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogKHRoaXMuc3ByaXRlSGVpZ2h0IC0gMzIpO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueCAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlICsgMzcgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMuZmlyZUNvb2xkb3duVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmZpcmVDb29sZG93biA9IDEwMDA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMS8vdGhpcy5nYW1lLmhlcm8ueC5tYXhIZWFsdGhcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCAxMjhdLCA3LCAxLCA3LCA4LCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vLy9IYXZlIExhdmEgc3Bhd24gZmlyZWJhbGxzICoqSSBkb24ndCBsaWtlIHRoaXMsIGJ1dCBJJ20gbGVhdmluZyB0aGUgY29kZSBmb3IgcG9zdGVyaXR5J3Mgc2FrZS4qKlxuICAgICAgICAvL2lmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA1MDAgJiYgdGhpcy5maXJlQ29vbGRvd25UaW1lciA8PSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEZpcmViYWxsKHRoaXMuZ2FtZSwgdGhpcy54IC0gMzIsIHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0KjIsIHRoaXMuaW1nLCB0aGlzLmN0eCwgNCwgMTUpKTtcbiAgICAgICAgLy8gICAgdGhpcy5maXJlQ29vbGRvd25UaW1lciA9IHRoaXMuZmlyZUNvb2xkb3duO1xuICAgICAgICAvL31cbiAgICAgICAgLy9pZiAodGhpcy5maXJlQ29vbGRvd25UaW1lciA+IDApIHtcbiAgICAgICAgLy8gICAgdGhpcy5maXJlQ29vbGRvd25UaW1lci0tO1xuICAgICAgICAvL31cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKVxuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgRmlyZWJhbGwgZXh0ZW5kcyBFbmVteSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLCBjb29sZG93biA9IDE1MCwgeVNwZWVkID0gMTIsIHNwYXduT2Zmc2V0KSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gNiAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAyMCAqIHRoaXMuc2NhbGU7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoLzI7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQqdGhpcy5zY2FsZS8yO1xuXG4gICAgICAgIHRoaXMub3JpZ1ggPSB0aGlzLng7XG4gICAgICAgIHRoaXMub3JpZ1kgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMub3JpZ0JvdW5kWCA9IHRoaXMuYm91bmRYO1xuICAgICAgICB0aGlzLm9yaWdCb3VuZFkgPSB0aGlzLmJvdW5kWTtcblxuICAgICAgICB0aGlzLnlTcGVlZCA9IHlTcGVlZDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAyO1xuICAgICAgICB0aGlzLmNvb2xkb3duVGltZXIgPSBzcGF3bk9mZnNldDtcbiAgICAgICAgdGhpcy5jb29sZG93biA9IGNvb2xkb3duO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhcnRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibWlkZGxlX3VwXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwZWFrX3VwXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwZWFrX2Rvd25cIjogZmFsc2UsXG4gICAgICAgICAgICBcIm1pZGRsZV9kb3duXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmaW5pc2hcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCA2LCB0cnVlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgICAgIFwic3RhcnRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDYpLFxuICAgICAgICAgICAgXCJtaWRkbGVfdXBcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDcpLFxuICAgICAgICAgICAgXCJwZWFrX3VwXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA4KSxcbiAgICAgICAgICAgIFwicGVha19kb3duXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCA5KSxcbiAgICAgICAgICAgIFwibWlkZGxlX2Rvd25cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgOSwgMTMsIDMsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEwKSxcbiAgICAgICAgICAgIFwiZmluaXNoXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMSksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyYXZpdHkpO1xuICAgIH1cblxuICAgIC8qVXBkYXRlcyB0aGUgZW50aXR5IGVhY2ggZ2FtZSBsb29wLiBpLmUuIHdoYXQgZG9lcyB0aGlzIGVudGl0eSBkbz8gKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDwgMTAwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImxhdmFfYmFsbFwiLCAwLjUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcygwLCAtMSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLm1pZGRsZV91cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLm1pZGRsZV91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC0uNSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLm1pZGRsZV91cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5wZWFrX3VwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha191cCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC0uMSAqIHRoaXMueVNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnBlYWtfdXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucGVha19kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha19kb3duKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLjEgKiB0aGlzLnlTcGVlZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5wZWFrX2Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubWlkZGxlX2Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5taWRkbGVfZG93bikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zKDAsIC41ICogdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubWlkZGxlX2Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmluaXNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgdGhpcy55U3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZmluaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyID0gdGhpcy5jb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5vcmlnWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLm9yaWdCb3VuZFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy5vcmlnQm91bmRZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jb29sZG93blRpbWVyLS07XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5taWRkbGVfdXApIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLm1pZGRsZV91cDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha191cCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMucGVha191cDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMucGVha19kb3duKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5wZWFrX2Rvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLm1pZGRsZV9kb3duKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5taWRkbGVfZG93bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmluaXNoKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maW5pc2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgU3Bpa2VzIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsIGFjdGl2ZSA9IHRydWUsIHRpbWVyLCB0aW1lT2Zmc2V0ID0gMCwgbGVuZ3RoID0gMCwgaW50ZXJ2YWwgPSAyMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVudGl0eVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlKih0aGlzLnNwcml0ZVdpZHRoIC0gMjgpO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqICh0aGlzLnNwcml0ZUhlaWdodC8yICsgMyk7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54IC0gdGhpcy5zcHJpdGVXaWR0aCArIHRoaXMuc2NhbGUqMTQ7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5zcHJpdGVIZWlnaHQgKiB0aGlzLnNjYWxlICsgMzcgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgIHRoaXMuc3Bpa2VDb29sZG93blRpbWVyID0gdGltZU9mZnNldDtcbiAgICAgICAgdGhpcy5zcGlrZUNvb2xkb3duID0gdGltZXI7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTsgLy90aGlzLmdhbWUuaGVyby5tYXhIZWFsdGhcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogZmFsc2UsXG4gICAgICAgICAgICBcImluYWN0aXZlX3VwXCI6ICFhY3RpdmUsXG4gICAgICAgICAgICAvL1wiaW5hY3RpdmVfdXBfc3Bhd25lZFwiOiBmYWxzZSwgLy9Eb2Vzbid0IHdvcmssIHVudXNlZCBmb3Igbm93XG4gICAgICAgICAgICBcImluYWN0aXZlX2Rvd25cIjogYWN0aXZlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcImFjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCA2LCA1LCA1LCBmYWxzZSwgdGhpcy5zY2FsZSwgMSksXG4gICAgICAgICAgICBcImluYWN0aXZlX3VwXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDYsIDEwLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAzKSxcbiAgICAgICAgICAgIFwiaW5hY3RpdmVfZG93blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCA5LCA2LCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pbmFjdGl2ZV9kb3duO1xuICAgICAgICBpZiAobGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG5leHRPZmZzZXQgPSB0aW1lT2Zmc2V0ICsgdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgICAgIGxlbmd0aC0tO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgU3Bpa2VzKHRoaXMuZ2FtZSwgdGhpcy54ICsgdGhpcy5zcHJpdGVXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLnksIHRoaXMuaW1nLCBjdHgsIDIsIHRoaXMuYWN0aXZlLCB0aGlzLnNwaWtlQ29vbGRvd24sIG5leHRPZmZzZXQsIGxlbmd0aCwgdGhpcy5pbnRlcnZhbCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSAmJiB0aGlzLnNwaWtlQ29vbGRvd25UaW1lciA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpICE9PSAxICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpICE9PSA1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCArIDE5LCB0aGlzLmJvdW5kWSwgLXRoaXMuc3ByaXRlV2lkdGggLSAuNSAqIHRoaXMuYm91bmRXaWR0aCwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCAvIDIsIHRoaXMuc3ByaXRlSGVpZ2h0IC8gMiwgdGhpcy5ib3VuZFdpZHRoIC0gMTMsIHRoaXMuYm91bmRIZWlnaHQgLSA0MiwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBcImhlYWx0aFwiLCAyLCB0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYICsgMTksIHRoaXMuYm91bmRZLCAtdGhpcy5zcHJpdGVXaWR0aCAtIC41ICogdGhpcy5ib3VuZFdpZHRoLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoIC8gMiwgdGhpcy5zcHJpdGVIZWlnaHQgLyAyLCB0aGlzLmJvdW5kV2lkdGggLSAxMywgdGhpcy5ib3VuZEhlaWdodCAtIDU2LCB0aGlzLnNjYWxlLCB0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhbHRoXCIsIDIsIHRydWUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pbmFjdGl2ZV9kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwaWtlQ29vbGRvd25UaW1lciA9IHRoaXMuc3Bpa2VDb29sZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNwaWtlQ29vbGRvd25UaW1lci0tO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pbmFjdGl2ZV9kb3duKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaW5hY3RpdmVfZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5zcGlrZUNvb2xkb3duVGltZXIgPSB0aGlzLnNwaWtlQ29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuaW5hY3RpdmVfdXApIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8IDMwMCAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8IDMwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFggKyAzLCB0aGlzLmJvdW5kWSwgLXRoaXMuc3ByaXRlV2lkdGggLSAuNSp0aGlzLmJvdW5kV2lkdGgsIDAsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggLyAyLCB0aGlzLnNwcml0ZUhlaWdodCAvIDIsIHRoaXMuYm91bmRXaWR0aCAtIDEzLCB0aGlzLmJvdW5kSGVpZ2h0IC0gNDIsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCxcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFsdGhcIiwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmluYWN0aXZlX2Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmluYWN0aXZlX2Rvd247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmluYWN0aXZlX3VwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pbmFjdGl2ZV91cDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0aWxlSGF6YXJkIGV4dGVuZHMgRW5lbXkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgeFNwZWVkLCB5U3BlZWQsIGRpcmVjdGlvbnMsIGxpZmVzcGFuKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJIYXphcmRcIjtcbiAgICAgICAgLy90aGlzLnkgKz0gNDQ7IEdpdmUgYSArNDQgb2Zmc2V0IHdoZW4gaW5zdGFudGlhdGluZyBcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLm9yaWdYID0gdGhpcy54O1xuICAgICAgICB0aGlzLm9yaWdZID0gdGhpcy55O1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gNjA7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNjA7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHRoaXMuc3ByaXRlV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gdGhpcy5zcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIDggKyAzO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuc2NhbGUgKiA1O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0ICogdGhpcy5zY2FsZS8yICsgNSAqIHRoaXMuc2NhbGU7XG5cbiAgICAgICAgdGhpcy54U3BlZWQgPSB4U3BlZWQ7XG4gICAgICAgIHRoaXMueVNwZWVkID0geVNwZWVkO1xuICAgICAgICB0aGlzLnhEaXIgPSBkaXJlY3Rpb25zWzBdO1xuICAgICAgICB0aGlzLnlEaXIgPSBkaXJlY3Rpb25zWzFdO1xuICAgICAgICB0aGlzLmxpZmVzcGFuID0gbGlmZXNwYW47XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy50aWNrID0gMTtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMiksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBvcyh0aGlzLnhTcGVlZCAqIHRoaXMueERpciwgdGhpcy55U3BlZWQgKiB0aGlzLnlEaXIpO1xuICAgICAgICBpZiAodGhpcy5saWZlc3BhbiA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlmZXNwYW4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy9UT0RPIHJlZmFjdG9yIHRoaXMgKGFydGlmYWN0IGZyb20gaW5zdGFuY2VvZiBkYXlzKVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkFjdG9yXCIgJiYgIShvdGhlci5uYW1lID09PSBcIkVuZW15XCIpKSB7Ly9IZXJvIGNvbGxpc2lvblxuICAgICAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiUHJvamVjdGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGljayA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudGljay0tO1xuICAgICAgICAgICAgICAgIG90aGVyLmhlYWx0aCAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJpc0VuZW15XCIpO1xuICAgICAgICAgICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZVwiKTtcbiAgICAgICAgICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0aWxlQ2lyY2xlIGV4dGVuZHMgRW5lbXkge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gbnVsbCwgeFNwZWVkLCB5U3BlZWQsIHJhZGl1cyA9IDEwLCB0aW1lciA9IDEwMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVuZW15XCI7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiSGF6YXJkXCI7XG4gICAgICAgIC8vdGhpcy55ICs9IDQ0OyBHaXZlIGEgKzQ0IG9mZnNldCB3aGVuIGluc3RhbnRpYXRpbmcgXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5vcmlnWCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy5vcmlnWSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMudGltZXIgPSB0aW1lcjtcbiAgICAgICAgdGhpcy51cGRhdGVQb3MoMCwgLXRoaXMucmFkaXVzKTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDYwO1xuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKCh0aGlzLnNwcml0ZVdpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIHRoaXMuc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiA4ICsgMztcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiA4ICsgMztcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLnNjYWxlICogNTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCAqIHRoaXMuc2NhbGUgLyAyICsgNSAqIHRoaXMuc2NhbGU7XG5cbiAgICAgICAgdGhpcy54U3BlZWQgPSB4U3BlZWQ7XG4gICAgICAgIHRoaXMueVNwZWVkID0geVNwZWVkO1xuICAgICAgICB0aGlzLnF1YWRyYW50cyA9IFtbMSwgMV0sIFstMSwgMV0sIFstMSwgLTFdLCBbMSwgLTFdXTtcbiAgICAgICAgdGhpcy5xdWFkcmFudCA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy50aWNrID0gMTtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAxMiksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5vcmlnWCA+PSAwICYmIHRoaXMueSAtIHRoaXMub3JpZ1kgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5xdWFkcmFudCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54IC0gdGhpcy5vcmlnWCA+PSAwICYmIHRoaXMueSAtIHRoaXMub3JpZ1kgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnF1YWRyYW50ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnggLSB0aGlzLm9yaWdYIDwgMCAmJiB0aGlzLnkgLSB0aGlzLm9yaWdZID4gMCkge1xuICAgICAgICAgICAgdGhpcy5xdWFkcmFudCA9IDI7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIHRoaXMub3JpZ1ggPCAwICYmIHRoaXMueSAtIHRoaXMub3JpZ1kgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5xdWFkcmFudCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVQb3ModGhpcy54U3BlZWQgKiB0aGlzLnF1YWRyYW50c1t0aGlzLnF1YWRyYW50XVswXSwgdGhpcy55U3BlZWQgKiB0aGlzLnF1YWRyYW50c1t0aGlzLnF1YWRyYW50XVsxXSk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLy8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIC8vaWYgKG90aGVyLm5hbWUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgIC8vICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy99XG4gICAgICAgIC8vLy9UT0RPIHJlZmFjdG9yIHRoaXMgKGFydGlmYWN0IGZyb20gaW5zdGFuY2VvZiBkYXlzKVxuICAgICAgICAvL2Vsc2UgaWYgKG90aGVyLm5hbWUgPT09IFwiQWN0b3JcIiAmJiAhKG90aGVyLm5hbWUgPT09IFwiRW5lbXlcIikpIHsvL0hlcm8gY29sbGlzaW9uXG4gICAgICAgIC8vICAgIGlmIChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIikge1xuICAgICAgICAvLyAgICAgICAgaWYgKHRoaXMudGljayA9PT0gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIHRoaXMudGljay0tO1xuICAgICAgICAvLyAgICAgICAgb3RoZXIuaGVhbHRoIC09IDE7XG4gICAgICAgIC8vICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy99XG4gICAgICAgIC8vZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgLy8gICAgLy9vdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgIC8vICAgIC8vb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgIC8vICAgIGlmICghb3RoZXIuaXNFbmVteSkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmNsYXNzIExhdW5jaGVyIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHhTcGVlZCwgeVNwZWVkLCBkaXJlY3Rpb25zLCBjb29sZG93biwgcHJvamVjdGlsZUxpZmVzcGFuLCBsYXVuY2hUaW1lT2Zmc2V0ID0gMCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVudGl0eVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkhhemFyZFwiO1xuICAgICAgICAvL3RoaXMueSArPSA0NDsgR2l2ZSBhICs0NCBvZmZzZXQgd2hlbiBpbnN0YW50aWF0aW5nIFxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgodGhpcy5zcHJpdGVXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMikgLSB0aGlzLnNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogODtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiA4O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMueCAtIHRoaXMuc3ByaXRlV2lkdGggKyB0aGlzLnNjYWxlICogODtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLnNwcml0ZUhlaWdodCAqIHRoaXMuc2NhbGUgKyA4ICogdGhpcy5zY2FsZTtcblxuICAgICAgICB0aGlzLnhTcGVlZCA9IHhTcGVlZDtcbiAgICAgICAgdGhpcy55U3BlZWQgPSB5U3BlZWQ7XG4gICAgICAgIHRoaXMueERpciA9IGRpcmVjdGlvbnNbMF07XG4gICAgICAgIHRoaXMueURpciA9IGRpcmVjdGlvbnNbMV07XG4gICAgICAgIHRoaXMuc2hvdENvb2xkb3duVGltZXIgPSBsYXVuY2hUaW1lT2Zmc2V0O1xuICAgICAgICB0aGlzLnNob3RDb29sZG93biA9IGNvb2xkb3duO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVMaWZlc3BhbiA9IHByb2plY3RpbGVMaWZlc3BhbjtcblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDksIDEzLCAzLCAxLCB0cnVlLCB0aGlzLnNjYWxlLCAyMCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKlVwZGF0ZXMgdGhlIGVudGl0eSBlYWNoIGdhbWUgbG9vcC4gaS5lLiB3aGF0IGRvZXMgdGhpcyBlbnRpdHkgZG8/ICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoLypNYXRoLmFicyh0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54KSA8PSA1MDAwICYmKi8gdGhpcy5zaG90Q29vbGRvd25UaW1lciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUHJvamVjdGlsZUhhemFyZCh0aGlzLmdhbWUsIHRoaXMueCAtIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMueSAtIHRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLmltZywgdGhpcy5jdHgsIHRoaXMuc2NhbGUsXG4gICAgICAgICAgICAgICAgdGhpcy54U3BlZWQsIHRoaXMueVNwZWVkLCBbdGhpcy54RGlyLCB0aGlzLnlEaXJdLCB0aGlzLnByb2plY3RpbGVMaWZlc3BhbikpO1xuICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lciA9IHRoaXMuc2hvdENvb2xkb3duO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNob3RDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaG90Q29vbGRvd25UaW1lci0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgLy90aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIExhdmEsXG4gICAgRmlyZWJhbGwsXG4gICAgU3Bpa2VzLFxuICAgIFByb2plY3RpbGVIYXphcmQsXG4gICAgUHJvamVjdGlsZUNpcmNsZSxcbiAgICBMYXVuY2hlclxufVxuIiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCBUZXJyYWluIGZyb20gXCIuL3RlcnJhaW5cIlxuaW1wb3J0IFByb2plY3RpbGUgZnJvbSBcIi4vcHJvamVjdGlsZVwiXG5pbXBvcnQgUHJvamVjdGlsZV9Td29yZCBmcm9tIFwiLi9wcm9qZWN0aWxlLXN3b3JkXCJcbmltcG9ydCBTb2xkaWVyX1NoaWVsZCBmcm9tIFwiLi9zb2xkaWVyLXNoaWVsZFwiXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vZW5lbXlcIlxuaW1wb3J0IEh1cnRib3ggZnJvbSBcIi4vaHVydGJveFwiXG5pbXBvcnQgUmVmbGVjdGJveCBmcm9tIFwiLi9yZWZsZWN0Ym94XCJcbmltcG9ydCBIYXphcmRzIGZyb20gXCIuL2hhemFyZHNcIlxuaW1wb3J0IFJvY2tldCBmcm9tIFwiLi9yb2NrZXRcIlxuXG5cbmNsYXNzIEhlcm8gZXh0ZW5kcyBBY3RvciB7XG5cbiAgICBjb25zdHJ1Y3RvciAoZ2FtZSwgeCwgeSwgaW1nPW51bGwsIGN0eD1udWxsLCBzY2FsZT0zLCBzcHJpdGVXaWR0aD02MCwgc3ByaXRlSGVpZ2h0PTYwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiQWN0b3JcIjtcbiAgICAgICAgdGhpcy5vcmlnWSA9IHRoaXMueTsgLy9Gb3IganVtcGluZ1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDYwO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMTEwO1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTsgLy8gVGhpcyB3aWxsIGhlbHAgc3RvcCBIZXJvIGZyb20gc2xpcHBpbmcgYXQgZWRnZXMsIHBhcnRpY3VsYXJseSBmb3IgaG9yaXpvbnRhbGx5IGxvbmdlciBibG9ja3Mgb2YgdGVycmFpblxuXG4gICAgICAgIC8qKipTVEFUUyoqKi9cbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gKDgpO1xuICAgICAgICB0aGlzLmRhc2hTcGVlZCA9IDE3XG4gICAgICAgIHRoaXMuanVtcFN0cmVuZ3RoID0gKDIwKTtcbiAgICAgICAgdGhpcy5qdW1wc0xlZnQgPSAyO1xuICAgICAgICB0aGlzLm1heEp1bXBzID0gMjtcbiAgICAgICAgdGhpcy50ZXJtaW5hbFZlbG9jaXR5ID0gMTU7XG5cbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSAzMDtcbiAgICAgICAgdGhpcy5tYXhFbmVyZ3kgPSAzMDtcbiAgICAgICAgdGhpcy5lbmVyZ3kgPSAzMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSAzMDtcbiAgICAgICAgdGhpcy5zbGFzaEVuZXJneUNvc3QgPSAyNTtcbiAgICAgICAgdGhpcy5jbGVhdmVFbmVyZ3lDb3N0ID0gMTU7XG4gICAgICAgIHRoaXMuc2hvb3RDb3N0ID0gMjtcbiAgICAgICAgdGhpcy5zaG9vdEVuZXJneUNvc3QgPSAxMDtcbiAgICAgICAgdGhpcy5kYXNoRW5lcmd5Q29zdCA9IDc7XG5cbiAgICAgICAgdGhpcy5zdHVuRGlyID0gMDtcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gMTtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gMTtcbiAgICAgICAgXG4gICAgICAgIC8vVGltZXJzXG4gICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd24gPSAxNjtcbiAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93biA9IDE1IC8gKHRoaXMubXVsdGlwbGllciAqIDIpO1xuICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duTWluID0gMTUgLyAodGhpcy5tdWx0aXBsaWVyICogMik7XG4gICAgICAgIHRoaXMuZW5lcmd5RGVsYXkgPSAyMDtcbiAgICAgICAgdGhpcy5lbmVyZ3lEZWxheVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy52ZWxvY2l0eUNvb2xkb3duID0gMjtcbiAgICAgICAgdGhpcy52ZWxvY2l0eUNvb2xkb3duVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmp1bXBUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuanVtcENvb2xkb3duID0gMjA7XG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMDtcblxuICAgICAgICAvL0RFViBUT09MU1xuICAgICAgICB0aGlzLmdvZE1vZGVFbmVyZ3lNaW4gPSAwO1xuICAgICAgICB0aGlzLm5vdEdvZE1vZGVFbmVyZ3lNaW4gPSB0aGlzLmVuZXJneUNvb2xkb3duTWluO1xuICAgICAgICB0aGlzLmdvZEVuZXJneURlbGF5ID0gMDtcbiAgICAgICAgdGhpcy5ub3RHb2RFbmVyZ3lEZWxheSA9IHRoaXMuZW5lcmd5RGVsYXk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBcImVuZXJnaXplZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW52dWxuZXJhYmxlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJydW5uaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJqdW1waW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJlbmVyZ3lEYXNoXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJkYXNoaW5nU3RhcnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImRhc2hpbmdNaWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImRhc2hpbmdFbmRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc0Rhc2hlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvb3RpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1Nob3RcIjogZmFsc2UsLy9UT0RPIEltcGxlbWVudCB0byByZXBsYWNlIHNob3Rsb2NrZWRcbiAgICAgICAgICAgIFwic2xhc2hpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcImhhc1NsYXNoZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImNsZWF2aW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNDbGVhdmVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzaG90bG9ja2VkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmcmFtZWxvY2tlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic3R1bm5lZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZGVhZFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicmVzcGF3bmVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJncm91bmRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJoYXNHcmF2aXR5XCI6IHRydWUsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IHRydWUsXG4gICAgICAgICAgICBcImlzR29kXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJpZGxlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgOSwgMywgOSwgdHJ1ZSwgdGhpcy5zY2FsZSksIC8vNTB4NTBcbiAgICAgICAgICAgIFwic3R1blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDAsIDEzLCA0LCA0LCBmYWxzZSwgdGhpcy5zY2FsZSwgOSksXG4gICAgICAgICAgICBcImRlYWRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAwLCAxOCwgNSwgNSwgdHJ1ZSwgdGhpcy5zY2FsZSwgMTMpLFxuICAgICAgICAgICAgXCJydW5cIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAxLCAyMiwgMywgMTEsIHRydWUsIHRoaXMuc2NhbGUpLCAvLzUweDUwXG4gICAgICAgICAgICAvL1Rha2VvZmY/XG4gICAgICAgICAgICBcImFzY2VuZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDgsIDMsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDIpLCAvLzUweDUwXG4gICAgICAgICAgICBcImRlc2NlbmRcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxNCwgMywgNCwgdHJ1ZSwgdGhpcy5zY2FsZSwgOCksIC8vNTB4NTBcbiAgICAgICAgICAgIC8vTGFuZD9cbiAgICAgICAgICAgIFwiYWlyc2hvb3RcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAyMCwgMywgNiwgZmFsc2UsIHRoaXMuc2NhbGUsIDE0KSwgLy81MHg1MFxuICAgICAgICAgICAgXCJzaG9vdFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbODAsIDYwXSwgMywgMywgNiwgMywgZmFsc2UsIHRoaXMuc2NhbGUpLCAvLzgweDYwXG4gICAgICAgICAgICBcImd1bnJ1blwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgMSwgMjIsIDMsIDExLCB0cnVlLCB0aGlzLnNjYWxlLCAxMSksIC8vNTB4NTBcbiAgICAgICAgICAgIFwic2xhc2hcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzkwLCA2MF0sIDQsIDExLCAyLCAxMSwgZmFsc2UsIHRoaXMuc2NhbGUpLCAvLzgweDUwXG4gICAgICAgICAgICBcImNsZWF2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbMTAwLCA3MF0sIDksIDEzLCAyLCAxMywgZmFsc2UsIHRoaXMuc2NhbGUpLCAvLzgweDYwXG4gICAgICAgICAgICBcImRhc2hcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzYwLCA2MF0sIDUsIDcsIDMsIDcsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwiZGFzaF9zdGFydFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNSwgNywgMywgMSwgZmFsc2UsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJkYXNoX21pZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNSwgNywgMywgNSwgZmFsc2UsIHRoaXMuc2NhbGUsIDEpLFxuICAgICAgICAgICAgXCJkYXNoX2VuZFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNjAsIDYwXSwgNSwgNywgMywgMSwgZmFsc2UsIHRoaXMuc2NhbGUsIDUpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHsvL1RPRE8gKG1heWJlKSBmaW5kIGEgYmV0dGVyIHNvbHV0aW9uIHRvIHRoZSBmcmFtZWxvY2tlZCBsb2dpYy4gKFRvbyBtYW55IGV4Y2VwdGlvbnMgZm9yIHRoaW5ncyBsaWtlIHNsYXNoKVxuICAgICAgICAvL0RldiBUb29sIFVwZGF0ZXNcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0UG9zVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ29kVG9nZ2xlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8vLy8vLy8vLy8gYWxsIGJ1dHRvbiBjaGVja3MgZ28gaGVyZSAvLy8vLy8vLy8vL1xuICAgICAgICAgICAgLy8gS0VZIERPV05cbiAgICAgICAgICAgIC8vcnVuIHJpZ2h0XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5yaWdodF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAvKiYmIHRoaXMuc3RhdGVzLmNhblJ1biovKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9IHRydWUgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vcnVuIGxlZnRcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMubGVmdF0uYWN0aXZlICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCAvKiYmIHRoaXMuc3RhdGVzLmNhblJ1biovKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2UgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZW5lcmdpemVcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmVuZXJnaXplXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9qdW1wXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5qdW1wXS5hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLmp1bXBpbmcgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkIC8qJiYgdGhpcy5zdGF0ZXMuY2FuSnVtcCovKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuanVtcGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc2hvb3RcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLnNob290XS5hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkICYmICF0aGlzLnN0YXRlcy5zaG90bG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvb3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jbGVhdmVcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmNsZWF2ZV0uYWN0aXZlICYmIHRoaXMuc3RhdGVzLmdyb3VuZGVkICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcInN3b3JkX3N3aW5nXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuY2xlYXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc2xhc2hcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLnNsYXNoXS5hY3RpdmUgJiYgdGhpcy5zdGF0ZXMuZ3JvdW5kZWQgJiYgKCF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCB8fCB0aGlzLnN0YXRlcy5kYXNoaW5nKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLnJpZ2h0XS5hY3RpdmUpIHsgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSB0cnVlOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5sZWZ0XS5hY3RpdmUpIHsgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgPSBmYWxzZTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcInN3b3JkX3N3aW5nXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UsIHRydWUsIGZhbHNlLCB0cnVlLCB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2Rhc2hcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuY29udHJvbEtleXNbdGhpcy5nYW1lLmNvbnRyb2xzLmRhc2hdLmFjdGl2ZSAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5lcmd5ID49IHRoaXMuZGFzaEVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0tFWSBVUFxuICAgICAgICAgICAgaWYgKCEodGhpcy5nYW1lLmNvbnRyb2xLZXlzW3RoaXMuZ2FtZS5jb250cm9scy5yaWdodF0uYWN0aXZlIHx8IHRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMubGVmdF0uYWN0aXZlKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGVzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZS5jb250cm9sS2V5c1t0aGlzLmdhbWUuY29udHJvbHMuZW5lcmdpemVdLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmVuZXJnaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8gVEhFTiBkbyBhY3Rpb25zIC8vLy8vLy8vLy8vLy8vXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wVGltZXIgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJ1bm5pbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jZW50ZXJYICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jZW50ZXJYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vSnVtcGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmp1bXBpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5qdW1waW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qdW1wc0xlZnQgPiAwICYmIHRoaXMuanVtcFRpbWVyID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wc0xlZnQgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wVGltZXIgPSB0aGlzLmp1bXBDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSAtPSB0aGlzLmp1bXBTdHJlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0NsZWF2aW5nXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuY2xlYXZpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmVuZXJnaXplZCAmJiAhdGhpcy5zdGF0ZXMuaGFzUmVmbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAzICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHsvL1VwcGVyIGh1cnRiYm94XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0yMzAsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCAxNTAsIDUwLCB0aGlzLnNjYWxlLCAxNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC03MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAxNTAsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCAxNTAsIDUwLCB0aGlzLnNjYWxlLCAxNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID49IDMgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPD0gNikgey8vTG93ZXIgaHVydGJveFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDgwLCAxMDAsIHRoaXMuc2NhbGUsIDE1MCwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwIC0gdGhpcy5zcHJpdGVXaWR0aCAtIDEyMCwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgODAsIDEwMCwgdGhpcy5zY2FsZSwgMTUwLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZW5lcmdpemVkICYmICF0aGlzLnN0YXRlcy5oYXNSZWZsZWN0ZWQgJiZ0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA+PSAzICYmIHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpIDw9IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLmNsZWF2ZUVuZXJneUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUmVmbGVjdGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIDMwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNDAsIDEyMCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRoaXMsIDQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUmVmbGVjdGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIDYwLCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNDAsIDEyMCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRoaXMsIDQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZUVuZXJneSh0aGlzLmNsZWF2ZUVuZXJneUNvc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1JlZmxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwib3V0X29mX2VuZXJneVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuY2xlYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzUmVmbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1Nob290aW5nXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmcgJiYgISh0aGlzLnNob290Q29vbGRvd25UaW1lciA+IDApKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5zaG90bG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLnNob290RW5lcmd5Q29zdCAmJiB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFByb2plY3RpbGUodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZUVuZXJneSh0aGlzLnNob290RW5lcmd5Q29zdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJoZXJvX3Nob290XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZW5lcmd5ID49IHRoaXMuc2hvb3RDb3N0ICYmICF0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IFByb2plY3RpbGUodGhpcy5nYW1lLCB0aGlzLngsIHRoaXMueSwgdGhpcy5pbWcsIHRoaXMuY3R4LCB0aGlzLnNjYWxlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5IC09IHRoaXMuc2hvb3RDb3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19zaG9vdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duVGltZXIgPSB0aGlzLnNob290Q29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyID0gdGhpcy5zaG9vdENvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG90bG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TbGFzaGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNsYXNoaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IHRydWU7IC8vRml4ZXMgc3VwZXItZHVwZXIganVtcCBidWcuIChXaGVuIGludGVycnVwdGluZyBkYXNoLCBkYXNoIGRvZXNuJ3QgZW50ZXIgaXNEb25lKCkgc28gZ3JhdiBpc24ndCByZXNldClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPT09IDIgJiYgdGhpcy5zdGF0ZXMuZW5lcmdpemVkICYmICF0aGlzLnN0YXRlcy5zaG90bG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneSA+PSB0aGlzLnNsYXNoRW5lcmd5Q29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgUHJvamVjdGlsZV9Td29yZCh0aGlzLmdhbWUsIHRoaXMueCArIDIwLCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VFbmVyZ3kodGhpcy5zbGFzaEVuZXJneUNvc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcIm91dF9vZl9lbmVyZ3lcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID49IDIgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPD0gNikgey8vSHVydGJveFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpLy9mYWNpbmcgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgODAsIDEwMCwgdGhpcy5zY2FsZSwgNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgLy9mYWNpbmcgbGVmdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC02MCAtIHRoaXMuc3ByaXRlV2lkdGggLSAxMjAsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgODAsIDEwMCwgdGhpcy5zY2FsZSwgNTAsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc1NsYXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2hvdGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vRGFzaGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy51cGRhdGVQb3ModGhpcy5kYXNoU3BlZWQsIDApOyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IHRoaXMudXBkYXRlUG9zKC10aGlzLmRhc2hTcGVlZCwgMCk7IH1cbiAgICAgICAgICAgICAgICAvL1RocmVlIHBhcnQgZGFzaCAoYmV0dGVyIGludnVsbmVyYWJpbGl0eSBpbXBsZW1lbnRhdGlvbikgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaGFzRGFzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg2MCwgNjAsIDI1LCAyNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmVyZ3kgPj0gdGhpcy5kYXNoRW5lcmd5Q29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5IC09IHRoaXMuZGFzaEVuZXJneUNvc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmd5RGFzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneURlbGF5VGltZXIgPSB0aGlzLmVuZXJneURlbGF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzRGFzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg2MCwgNjAsIDM3LCAxNSwgMCwgLTEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdNaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmVuZXJneURhc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaW52dWxuZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nTWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmludnVsbmVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZW5lcmd5RGFzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ01pZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg2MCwgNjAsIDI1LCAyNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5oYXNEYXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU3R1bm5lZFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0dW5uZWQpIHtcbiAgICAgICAgICAgICAgICAvL21vdmUgYXdheSBmcm9tIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGF0dGFja1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnN0dW5EaXIgKiAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmhhc0dyYXZpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VDb29sZG93blRpbWVyID0gdGhpcy5kYW1hZ2VDb29sZG93bjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9ERUFEXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZGVhZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZXNwYXduZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vUmVzcGF3blxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJlc3Bhd25lZCkge1xuICAgICAgICAgICAgICAgIC8vcmVzcGF3biAoY2FuIGRlZmluZSB0aGluZ3MgbGlrZSBhY3Rpdml0eSBjb29sZG93biwgcmVzcGF3biBhbmltYXRpb24sIGV0Yy4uLilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaW1lciBDaGVja3NcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneURlbGF5VGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lEZWxheVRpbWVyLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneUNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd25UaW1lci0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVuZXJneSA8IHRoaXMubWF4RW5lcmd5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZXJneUNvb2xkb3duID4gdGhpcy5lbmVyZ3lDb29sZG93bk1pbikgeyAvL2VuZXJneSBjb29sZG93biB0aW1lIGRlY3JlYXNlcyBub24tbGluZWFybHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gKj0gLjU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lbmVyZ3lDb29sZG93biAtIHRoaXMuZW5lcmd5Q29vbGRvd25NaW4gPCAtLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW5lcmd5Q29vbGRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3lDb29sZG93biAqPSAxLjE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVuZXJneUNvb2xkb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd24gPSB0aGlzLmVuZXJneUNvb2xkb3duTWluO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5Q29vbGRvd25UaW1lciA9IHRoaXMuZW5lcmd5Q29vbGRvd247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kYW1hZ2VDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RDb29sZG93blRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RDb29sZG93blRpbWVyLS07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB2ZWxvY2l0aWVzIGJhc2VkIG9uIGdyYXZpdHkgYW5kIGZyaWN0aW9uXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSAmJiB0aGlzLnlWZWxvY2l0eSA8IHRoaXMudGVybWluYWxWZWxvY2l0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgICAgIC8vSGVhbHRoIGNoZWNrcyBhbmQgcG9zaXRpb24gY2hlY2tzXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5kZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzR3Jhdml0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9HT0QgTU9ERVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmlzR29kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVyZ3kgPSB0aGlzLm1heEVuZXJneTtcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBzTGVmdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9Ly9FTkQgVXBkYXRlXG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBpZiAodGhpcy55VmVsb2NpdHkgPCAwICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZykgey8vYXNjZW5kaW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDE1LCAzMCwgLTEwLCAtMjApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYXNjZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueVZlbG9jaXR5ID4gMCAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHsvL2Rlc2NlbmRpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMTUsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRlc2NlbmQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMucnVubmluZyAmJiB0aGlzLmFuaW1hdGlvbiAmJiAhdGhpcy5zdGF0ZXMuc2hvb3RpbmcpIHsvL2d1bnJ1bm5pbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmd1bnJ1bjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZyAmJiB0aGlzLnN0YXRlcy5ncm91bmRlZCkgey8vc2hvb3RpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDcwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob290O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nICYmICF0aGlzLnN0YXRlcy5ncm91bmRlZCkgey8vYWlyIHNob290aW5nXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDIwLCAzNSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5haXJzaG9vdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5jbGVhdmluZykgey8vY2xlYXZpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDgwLCA2MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmNsZWF2ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZykgey8vc2xhc2hpbmdcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDgwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNsYXNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCkgey8vZGFzaGluZyBzdGFydFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGFzaF9zdGFydDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5kYXNoaW5nTWlkKSB7Ly9kYXNoaW5nIG1pZFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGFzaF9taWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCkgey8vZGFzaGluZyBlbmRcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRhc2hfZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnN0dW5uZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0dW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuZGVhZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGVhZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMjAsIDM1KTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmlkbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uICYmIHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy9URVJSQUlOIENPTExJU0lPTlxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIgfHwgb3RoZXIubmFtZSA9PT0gXCJTcGlrZXNcIikge1xuXG4gICAgICAgICAgICAvLyBIZXJvIGFib3ZlIHRlcnJhaW5cbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55VmVsb2NpdHkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wc0xlZnQgPSB0aGlzLm1heEp1bXBzO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmp1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ncm91bmRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhlcm8ganVtcHMgaW50byB0ZXJyYWluXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgKyBvdGhlci5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJvdW5kWSArIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG4gICAgICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIZXJvIGNvbGxpZGVzIHdpdGggdGVycmFpbiB0byB0aGUgbGVmdFxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhlcm8gY29sbGlkZXMgd2l0aCB0ZXJyYWluIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggLSB0aGlzLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGAke3RoaXMubmFtZX0gY29sbGlkaW5nIHdpdGggJHtvdGhlci5uYW1lfSBmcm9tICR7ZGlyZWN0aW9ufWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkxhdmFcIiAmJiAhdGhpcy5zdGF0ZXMuZGVhZCAmJiAhdGhpcy5zdGF0ZXMuaXNHb2QpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ib3VuZFkgKyB0aGlzLmJvdW5kSGVpZ2h0IC0gNTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJoZXJvX2h1cnRcIilcbiAgICAgICAgfVxuICAgICAgICAvL0lmIEhlcm8gY2FuIHRha2UgZGFtYWdlLCBjaGVjayBpZi4uLlxuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmlzR29kICYmIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA8PSAwICYmICF0aGlzLnN0YXRlcy5pbnZ1bG5lcmFibGUgJiYgIXRoaXMuc3RhdGVzLmRlYWQgJiYgIXRoaXMuc3RhdGVzLnN0dW5uZWQpIHsgXG4gICAgICAgICAgICBpZiAob3RoZXIucGFyZW50Q2xhc3MgPT09IFwiRW5lbXlcIiAmJiBvdGhlci5uYW1lICE9PSBcIkJvbWJcIikgeyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIuZGFtYWdlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvL0RldGVybWluZSBpbnRlcmFjdGlvbiBiYXNlZCBvbiBvdGhlcidzIGRhbWFnZSB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlci5kYW1hZ2VUeXBlID09PSBcImhlYWx0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLmRpZmZpY3VsdHkqb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBzdGF0ZXMgYW5kIHB1dCBpbnRvIHN0dW4gYW5pbSBhbmQgc3R1bmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHVydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXRlcm1pbmUgd2hpY2ggd2F5IGhlcm8gc2hvdWxkIG1vdmUgZHVyaW5nIHN0dW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlci5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdHVuRGlyID0gMTsgfSBlbHNlIHsgdGhpcy5zdHVuRGlyID0gLTE7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnggLSBvdGhlci54IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYIC0gdGhpcy5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSBvdGhlci5ib3VuZFggKyBvdGhlci5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyLmRhbWFnZVR5cGUgPT09IFwiZW5lcmd5XCIgJiYgdGhpcy5lbmVyZ3kgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZXJneUNvb2xkb3duID0gdGhpcy5lbmVyZ3lDb29sZG93bk1pbioyNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5mbG9vcih0aGlzLmVuZXJneS8yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkZpcmViYWxsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlQ29vbGRvd25UaW1lciA9IHRoaXMuZGFtYWdlQ29vbGRvd247XG4gICAgICAgICAgICAgICAgdGhpcy5odXJ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLnN0dW5EaXIgPSAxOyB9IGVsc2UgeyB0aGlzLnN0dW5EaXIgPSAtMTsgfVxuICAgICAgICAgICAgfSBpZiAob3RoZXIubmFtZSA9PT0gXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSB0aGlzLmRpZmZpY3VsdHkqb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgIG90aGVyLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7IHRoaXMuc3R1bkRpciA9IDE7IH0gZWxzZSB7IHRoaXMuc3R1bkRpciA9IC0xOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgICAgICBvdGhlci5oYXNPd25Qcm9wZXJ0eShcImlzRW5lbXlcIik7XG4gICAgICAgICAgICAgICAgb3RoZXIuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLmlzRW5lbXkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiaGVyb19odXJ0XCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IHRoaXMuZGlmZmljdWx0eSpvdGhlci5kYW1hZ2U7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUNvb2xkb3duVGltZXIgPSB0aGlzLmRhbWFnZUNvb2xkb3duO1xuICAgICAgICAgICAgICAgICAgICAvL3Jlc2V0IHN0YXRlcyBhbmQgcHV0IGludG8gc3R1biBhbmltIGFuZCBzdHVubG9ja1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU3RhdGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0dW5uZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlci5zdGF0ZXMuZmFjaW5nUmlnaHQpIHsgdGhpcy5zdHVuRGlyID0gMTsgfSBlbHNlIHsgdGhpcy5zdHVuRGlyID0gLTE7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqSEVMUEVSIENMQVNTRVMqKiovXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0LCBvZmZYID0gMCwgb2ZmWSA9IDApIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoICsgNTtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBiSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtIHRoaXMuYm91bmRXaWR0aCAvIDIgKyBvZmZYO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgKyBvZmZZO1xuICAgIH1cblxuICAgIHNldFN0YXRlcyhydW5uaW5nLCBqdW1waW5nLCBzaG9vdGluZywgY2xlYXZpbmcsIGZhY2luZ1JpZ2h0LCBncm91bmRlZCwgc2xhc2hpbmcsIHNob3Rsb2NrZWQsIGZyYW1lbG9ja2VkLCBlbmVyZ2l6ZWQsIGRhc2hpbmcsIGhhc0Rhc2hlZCkge1xuICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gcnVubmluZztcbiAgICAgICAgdGhpcy5zdGF0ZXMuanVtcGluZyA9IGp1bXBpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nID0gc2hvb3Rpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLmNsZWF2aW5nID0gY2xlYXZpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFjaW5nUmlnaHQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLmdyb3VuZGVkID0gZ3JvdW5kZWQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nID0gc2xhc2hpbmc7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNob3Rsb2NrZWQgPSBzaG90bG9ja2VkO1xuICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZyYW1lbG9ja2VkO1xuICAgICAgICB0aGlzLnN0YXRlcy5lbmVyZ2l6ZWQgPSBlbmVyZ2l6ZWQ7XG4gICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmcgPSBkYXNoaW5nO1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmRhc2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmRhc2hpbmdTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ01pZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMuZGFzaGluZ0VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGVzLmhhc0Rhc2hlZCA9IGhhc0Rhc2hlZDtcbiAgICB9XG5cbiAgICBjbGVhclN0YXRlcygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZXMoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdGhpcy5zdGF0ZXMuZW5lcmdpemVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnN0YXRlcy5oYXNHcmF2aXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuc3R1bm5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlcy5kZWFkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaHVydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICB0aGlzLnN0YXRlcy5zdHVubmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHVzZUVuZXJneShjb3N0KSB7XG4gICAgICAgIHRoaXMuZW5lcmd5IC09IGNvc3Q7XG4gICAgICAgIHRoaXMuZW5lcmd5RGVsYXlUaW1lciA9IHRoaXMuZW5lcmd5RGVsYXlDb29sZG93bjtcbiAgICB9XG5cbiAgICByZXNwYXduKCkge1xuICAgICAgICB0aGlzLnN0YXRlcy5yZXNwYXduZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gdGhpcy5tYXhIZWFsdGg7XG4gICAgICAgIHRoaXMuZW5lcmd5ID0gdGhpcy5tYXhFbmVyZ3k7XG4gICAgICAgIHRoaXMuZ2FtZS5nYW1lYm9hcmQubG9zdFNjb3JlID0gdGhpcy5nYW1lLmdhbWVib2FyZC5zY29yZSAvIDI7XG4gICAgICAgIHRoaXMuZ2FtZS5nYW1lYm9hcmQuc2NvcmUgPSB0aGlzLmdhbWUuZ2FtZWJvYXJkLmxvc3RTY29yZTtcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gMTtcbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZSAoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSwgXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcgKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZXJvOyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIFRlcnJhaW4sXG4gICAgRW5lbXksXG4gICAgSGVybyxcbn0gZnJvbSBcIi4vXCJcblxuXG4vKiBGb3IgY29weSBwYXN0ZSBqb2JzOlxudGhpcy5nYW1lLmFkZEVudGl0eShuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLngsIHRoaXMueSwgb2ZmWCwgb2ZmWSxcbiAgICB0aGlzLnNwcml0ZVdpZHRoLzIsIHRoaXMuc3ByaXRlSGVpZ2h0LzIsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7ICAgXG4qL1xuXG5jbGFzcyBIdXJ0Ym94IGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgLy9Ob3RlIHRoYXQgaW1nIGlzIHJlcXVpcmVkIGZvciBzdXBlcigpLCBldmVuIHRob3VnaCBIdXJ0Ym94IGlzIG5ldmVyIGFuaW1hdGVkLlxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCA9IG51bGwsIHgsIHksIG9mZlgsIG9mZlksIHBhcmVudFdpZHRoLCBwYXJlbnRIZWlnaHQsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgc2NhbGUgPSAzLFxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2UsIGZhY2luZ1JpZ2h0ID0gdHJ1ZSwgaXNFbmVteSA9IGZhbHNlLCBkYW1hZ2VUeXBlID0gXCJoZWFsdGhcIiwgZnJhbWVzID0gMiwgcGVyc2lzdGVudCA9IGZhbHNlLCBpbWcgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiQWN0b3JcIjtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuaXNFbmVteSA9IGlzRW5lbXk7XG4gICAgICAgIHRoaXMuZGFtYWdlVHlwZSA9IGRhbWFnZVR5cGU7XG5cbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gaHVydFdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gaHVydEhlaWdodDtcblxuICAgICAgICB0aGlzLmJvdW5kWSA9IHkgLSB0aGlzLmJvdW5kSGVpZ2h0ICsgb2ZmWTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB4ICsgcGFyZW50V2lkdGggKyB0aGlzLmJvdW5kV2lkdGggKyBvZmZYO1xuICAgICAgICAvL1N0YXRzXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xuICAgICAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICAgICAgdGhpcy5wZXJzaXN0ZW50ID0gcGVyc2lzdGVudDtcblxuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vaGl0Ym94IHBlcnNpc3RzIGZvciB0d28gdGlja3MuICh0d28gcHJldmVudHMgcmFuZG9tIGhpdGJveCBcImdhcHNcIilcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVzIDwgMCkge1xuICAgICAgICAgICAgLy9wZXJzaXN0XG4gICAgICAgICAgICAvL1RPRE86IEZpZ3VyZSBvdXQgd2h5IGhpdGJveCBkb2Vzbid0IHBlcnNpc3RcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuZnJhbWVzID49IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZnJhbWVzLS07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgfVxuXG4gICAgY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGVycmFpblxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjbGlua1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkhlcm9cIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEh1cnRib3g7IiwiZXhwb3J0IHtkZWZhdWx0IGFzIEFjdG9yfSBmcm9tIFwiLi9hY3RvclwiXG5leHBvcnQge2RlZmF1bHQgYXMgQm9tYn0gZnJvbSBcIi4vYm9tYlwiXG5leHBvcnQge2RlZmF1bHQgYXMgQnVsbGV0fSBmcm9tIFwiLi9idWxsZXRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIENhbWVyYX0gZnJvbSBcIi4vY2FtZXJhXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBDcm93fSBmcm9tIFwiLi9jcm93XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBEaW5vfSBmcm9tIFwiLi9kaW5vXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBFbmVteX0gZnJvbSBcIi4vZW5lbXlcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEVudGl0eX0gZnJvbSBcIi4vZW50aXR5XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBGbGFtZXN9IGZyb20gXCIuL2ZsYW1lc1wiXG5leHBvcnQge2RlZmF1bHQgYXMgR2FtZUJvYXJkfSBmcm9tIFwiLi9nYW1lLWJvYXJkXCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBIYW5kfSBmcm9tIFwiLi9oYW5kXCJcbmV4cG9ydCB7ICAgIFxuICAgIExhdmEsXG4gICAgRmlyZWJhbGwsXG4gICAgU3Bpa2VzLFxuICAgIFByb2plY3RpbGVIYXphcmQsXG4gICAgUHJvamVjdGlsZUNpcmNsZSxcbiAgICBMYXVuY2hlciB9IGZyb20gXCIuL2hhemFyZHNcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEhlcm99IGZyb20gXCIuL2hlcm9cIlxuZXhwb3J0IHtkZWZhdWx0IGFzIEh1cnRib3h9IGZyb20gXCIuL2h1cnRib3hcIlxuZXhwb3J0IHtcbiAgICBJdGVtLCBcbiAgICBFbmVyZ3lQYWNrLCBcbiAgICBIZWFsdGhQYWNrIH0gZnJvbSBcIi4vaXRlbVwiXG5leHBvcnQge2RlZmF1bHQgYXMgTGVvfSBmcm9tIFwiLi9sZW9cIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFByb2plY3RpbGVTd29yZH0gZnJvbSBcIi4vcHJvamVjdGlsZS1zd29yZFwiXG5leHBvcnQge2RlZmF1bHQgYXMgUHJvamVjdGlsZX0gZnJvbSBcIi4vcHJvamVjdGlsZVwiXG5leHBvcnQge2RlZmF1bHQgYXMgUmVmbGVjdGJveH0gZnJvbSBcIi4vcmVmbGVjdGJveFwiXG5leHBvcnQge2RlZmF1bHQgYXMgUm9ja2V0fSBmcm9tIFwiLi9yb2NrZXRcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFNob3RibGFzdH0gZnJvbSBcIi4vc2hvdGJsYXN0XCJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTb2xkaWVyU2hpZWxkfSBmcm9tIFwiLi9zb2xkaWVyLXNoaWVsZFwiXG5leHBvcnQge2RlZmF1bHQgYXMgVGVycmFpbk1vYmlsZX0gZnJvbSBcIi4vdGVycmFpbi1tb2JpbGVcIlxuZXhwb3J0IHtkZWZhdWx0IGFzIFRlcnJhaW59IGZyb20gXCIuL3RlcnJhaW5cIlxuXG4iLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBFbnRpdHksIFxuICAgIEhhemFyZHMsXG4gICAgSGVybywgXG4gICAgVGVycmFpblxufSBmcm9tIFwiLi9cIiAgICBcblxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcsIGN0eCwgd2lkdGgsIGhlaWdodCwgc2NhbGU9Mykge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVudGl0eVwiO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuaW1nID0gaW1nO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG5cbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLng7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55O1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLndpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy5zY2FsZTtcbiAgICB9XG5cbiAgICBvbl9waWNrdXAoKSB7fVxuXG4gICAgZHJhdyAoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCArIHRoaXMueE9mZnNldCwgdGhpcy55ICsgdGhpcy55T2Zmc2V0LCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lIChjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLCBcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLCBcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkIChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIHRoaXMub25fcGlja3VwKG90aGVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIgfHwgb3RoZXIubmFtZSA9PT0gIFwiU3Bpa2VzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gb3RoZXIuYm91bmRZIC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgKz0gdGhpcy5ncmF2aXR5ICogdGhpcy5ncmF2aXR5O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVZlbG9jaXR5O1xuICAgIH1cblxufVxuXG5cbi8qXG4gICAgQSBoZWFsdGggcGFjayB0aGF0IHJlc3RvcmVzIHRoZSBIZXJvJ3MgaGVhbHRoXG4qL1xuY2xhc3MgSGVhbHRoUGFjayBleHRlbmRzIEl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlPTMsIGhlYWx0aF92YWx1ZT0xNSkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCwgd2lkdGgsIGhlaWdodCwgc2NhbGUpO1xuICAgICAgICB0aGlzLmhlYWx0aF92YWx1ZSA9IGhlYWx0aF92YWx1ZTsgICAgICAgICAgXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzEwLCA4XSwgMCwgNCwgNCwgNCwgdHJ1ZSwgdGhpcy5zY2FsZSwgMCk7XG4gICAgICAgIHRoaXMueE9mZnNldCA9IDEwXG4gICAgICAgIHRoaXMueU9mZnNldCA9IC0zMFxuICAgIH1cblxuICAgIG9uX3BpY2t1cChoZXJvKSB7XG4gICAgICAgIGlmIChoZXJvLmhlYWx0aCA8IGhlcm8ubWF4SGVhbHRoKVxuICAgICAgICAgICAgaGVyby5oZWFsdGggKz0gdGhpcy5oZWFsdGhfdmFsdWU7XG4gICAgICAgIGlmIChoZXJvLmhlYWx0aCA+IGhlcm8ubWF4SGVhbHRoKVxuICAgICAgICAgICAgaGVyby5oZWFsdGggPSBoZXJvLm1heEhlYWx0aDtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgIH1cbn1cblxuXG4gLypcbiAgICBBbiBlbmVyZ3kgcGFjayB0aGF0IHJlc3RvcmVzIHRoZSBIZXJvJ3MgZW5lcmd5XG4qL1xuY2xhc3MgRW5lcmd5UGFjayBleHRlbmRzIEl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIHdpZHRoLCBoZWlnaHQsIHNjYWxlPTMsIGVuZXJneV92YWx1ZT0xNSkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCwgd2lkdGgsIGhlaWdodCwgc2NhbGUpO1xuICAgICAgICB0aGlzLmVuZXJneV92YWx1ZSA9IDE1OyAgICAgICAgICBcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbOCwgOF0sIDAsIDQsIDQsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDApO1xuICAgICAgICB0aGlzLnhPZmZzZXQgPSAxMDtcbiAgICAgICAgdGhpcy55T2Zmc2V0ID0gLTMwO1xuICAgIH1cblxuICAgIG9uX3BpY2t1cChoZXJvKSB7XG4gICAgICAgIGlmKGhlcm8uZW5lcmd5IDwgaGVyby5tYXhFbmVyZ3kpXG4gICAgICAgICAgICBoZXJvLmVuZXJneSArPSB0aGlzLmVuZXJneV92YWx1ZTtcbiAgICAgICAgaWYgKGhlcm8uZW5lcmd5ID4gaGVyby5tYXhFbmVyZ3kpXG4gICAgICAgICAgICBoZXJvLmVuZXJneSA9IGhlcm8ubWF4RW5lcmd5O1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgfVxufVxuXG5leHBvcnQgeyBJdGVtLCBIZWFsdGhQYWNrLCBFbmVyZ3lQYWNrIH0iLCJkZWZpbmUoW1xuICAgICdhY3RvcicsXG4gICAgJ2FuaW1hdGlvbicsXG4gICAgXCJlbmVteVwiLFxuXSxmdW5jdGlvbihcbiAgICBBY3RvcixcbiAgICBBbmltYXRpb24sXG4gICAgRW5lbXksXG4pe1xuXG5cbiAgICBjbGFzcyBMZW8gZXh0ZW5kcyBFbmVteSB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBzcHJpdGVXaWR0aCA9IDgwLCBzcHJpdGVIZWlnaHQgPSA2MCkge1xuICAgICAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgICAgIHRoaXMub3JpZ1ggPSB4OyAvLyBUT0RPOiBkZW1vXG4gICAgICAgICAgICB0aGlzLm9yaWdZID0geTsgLy8gVE9ETzogZGVtb1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMTI7XG4gICAgICAgICAgICB0aGlzLmp1bXBTcGVlZCA9IC0xMDtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy50aW1lclN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIC8vQ29udGFpbnMgZGV0YWlsZWQgc3ByaXRlc2hlZXQgaW5mbzogW0ZXaWR0aCwgRkhlaWdodCwgUm93LCBDb2x1bW4sIEZyYW1lcyAoc2hlZXQgd2lkdGgpXVxuICAgICAgICAgICAgdGhpcy5zcHJpbmZvID0gWy8vZWFjaCBmaXZlLXR1cGxlIGlzIGZyb20gYSByb3cgb2YgdGhlIHNwcml0ZSBzaGVldFxuICAgICAgICAgICAgICAgIFs4MCwgNjAsIDAsIDAsIDddLCBbNTAsIDcwLCAxLCAwLCA1XSxcbiAgICAgICAgICAgICAgICBbNzAsIDcwLCAyLCAwLCA4XSwgWzcwLCA4MCwgMywgMCwgMTFdXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAvL0FjdG9yIFN0YXRlc1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMgPSB7IC8vRFMzOiBUaGVzZSBzdGF0ZSBhbmQgYW5pbWF0aW9uIG5hbWVzIGFyZSB0ZW50YXRpdmUuXG4gICAgICAgICAgICAgICAgXCJsdW5naW5nXCI6IHRydWUsIC8vcm93IDA7IDEtMywgNC03XG4gICAgICAgICAgICAgICAgXCJhdHRhY2tpbmdcIjogZmFsc2UsIC8vcm93IDM7IDctMTBcbiAgICAgICAgICAgICAgICBcImdyYXBwbGluZ1wiOiBmYWxzZSwgLy9yb3cgMzsgMS00XG4gICAgICAgICAgICAgICAgXCJldmFkaW5nXCI6IGZhbHNlLCAvL3JvdyAxOyAxXG4gICAgICAgICAgICAgICAgXCJmaXJlbHVuZ2luZ1wiOiBmYWxzZSwgLy9yb3cgMjsgMS0yLCAzLTYsIDctOFxuICAgICAgICAgICAgICAgIFwiZGVtb2xvb3BcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhbHNlLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgICAgIFwibHVuZ2VcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDAsIDcsIDcsIDcsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgICAgICBcImF0dGFja1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbNzAsIDgwXSwgMywgMTEsIDcsIDExLCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICAgICAgXCJmaXJlbHVuZ2VcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzcwLCA3MF0sIDIsIDgsIDcsIDgsIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgICAgICBcImlkbGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgWzgwLCA2MF0sIDMsIDExLCAxMDAsIDEsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmx1bmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmRlbW9sb29wKSB7XG4gICAgICAgICAgICAgICAgLy9sdW5nZSAoc2hvdWxkZXIgc2xhbSlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMubHVuZ2luZyAmJiAhdGhpcy5zdGF0ZXMuYXR0YWNraW5nICYmIHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gODA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID4gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55IC09IDQwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAvL2dyYXBwbGUvc2xhbSAoc2hvdWxkZXIgc2xhbSlcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5zdGF0ZXMubHVuZ2luZyAmJiB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgJiYgdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IDgwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5sdW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXJTdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKz0gMzBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0vL2ZpcmUgbHVuZ2VcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5maXJlbHVuZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5maXJlbHVuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gNzA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSA3MDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID4gMiAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5vcmlnWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMub3JpZ1k7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5maXJlbHVuZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMubHVuZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9TYW1lIGFzIGFib3ZlLCBidXQgbm90IGluIFwiZGVtb1wiIGZvcm0uXG4gICAgICAgICAgICAvL2Vsc2UgaWYgKHRoaXMuc3RhdGVzLmx1bmdpbmcgJiYgIXRoaXMuc3RhdGVzLmF0dGFja2luZyAmJiB0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA4MDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuc3ByaXRlV2lkdGggPSA2MDtcbiAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUgPiAzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZXMubHVuZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVzLmF0dGFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy55IC09IDQwO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2Vsc2UgaWYgKCF0aGlzLnN0YXRlcy5sdW5naW5nICYmIHRoaXMuc3RhdGVzLmF0dGFja2luZyAmJiB0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVIZWlnaHQgPSA3MDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuc3ByaXRlV2lkdGggPSA4MDtcbiAgICAgICAgICAgIC8vICAgIC8vVGhpcyB3aWxsIHBvdGVudGlhbGx5IGJlIHVzZWQgdG8gZmxhZyBkaWZmZXJlbnQgbGV2ZWxzIG9mIFwidnVsbmVyYWJpbGl0eVwiIChleDogY291bnRlcmFibGUpXG4gICAgICAgICAgICAvLyAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiYXR0YWNraW5nXCIpO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2Vsc2UgaWYgKHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nKSB7XG4gICAgICAgICAgICAvLyAgICB0aGlzLnNwcml0ZUhlaWdodCA9IDcwO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5zcHJpdGVXaWR0aCA9IDcwO1xuICAgICAgICAgICAgLy8gICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID4gMiAmJiB0aGlzLmFuaW1hdGlvbi5jdXJyZW50RnJhbWUoKSA8IDUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy8gICAgaWYgKHRoaXMuYW5pbWF0aW9uLmVsYXBzZWRUaW1lID49IHRoaXMuYW5pbWF0aW9uLnRvdGFsVGltZSAtIDEpIHtcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMueCA9IHRoaXMub3JpZ1g7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKC8qdGhpcy5hbmltYXRpb24uaXNEb25lKi8xKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuc3RhdGVzLmx1bmdpbmcgPSB0cnVlO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLnN0YXRlcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5vcmlnWDtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5vcmlnWTtcbiAgICAgICAgICAgIC8vICAgICAgICB9XG4gICAgICAgICAgICAvL31cblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgZHJhdyhjdHgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5sdW5naW5nICYmICF0aGlzLnN0YXRlcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5sdW5nZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmF0dGFja2luZyAmJiAhdGhpcy5zdGF0ZXMubHVuZ2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmF0dGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLmZpcmVsdW5naW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZmlyZWx1bmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbmltYXRpb24gZG9lcyBub3QgZXhpc3RcIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKHRoaXMuY2xvY2tUaWNrLCBjdHgsIHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gTGVvO1xufSk7XG5cblxuXG5cbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIEJ1bGxldCxcbiAgICBUZXJyYWluLFxuICAgIEh1cnRib3gsXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgUHJvamVjdGlsZV9Td29yZCBleHRlbmRzIEFjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGltZyA9IG51bGwsIGN0eCA9IG51bGwsIHNjYWxlID0gMywgZmFjaW5nUmlnaHQsIHNwcml0ZVdpZHRoID0gOTAsIHNwcml0ZUhlaWdodCA9IDYwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiQWN0b3JcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gMTA7XG4gICAgICAgIGlmIChmYWNpbmdSaWdodCkgeyB0aGlzLnggKz0gOTU7IH0gZWxzZSB7IHRoaXMueCAtPSA5NSB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSAwOyAvLzE4MFxuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gMDsgLy8xMjBcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgdGhpcy5sYXN0Qm91bmRZID0gdGhpcy5ib3VuZFk7XG5cbiAgICAgICAgLy9TdGF0c1xuICAgICAgICB0aGlzLmhlYWx0aCA9IDU7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTUwO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwic3RhcnRpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhYmxpemVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJyZWNvdmVyaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICBcInN0YXJ0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDQsIDE4LCA3LCAyLCBmYWxzZSwgdGhpcy5zY2FsZSwgMTEpLFxuICAgICAgICAgICAgXCJzdGFibGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgNCwgMTgsIDcsIDEsIHRydWUsIHRoaXMuc2NhbGUsIDEzKSxcbiAgICAgICAgICAgIFwicmVjb3ZlcnlcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgNCwgMTgsIDcsIDQsIGZhbHNlLCB0aGlzLnNjYWxlLCAxNCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnN0YXJ0O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YXJ0aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YXJ0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhYmxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5zdGFibGl6ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc3RhYmxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVjb3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMucmVjb3ZlcmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5yZWNvdmVyaW5nKSB7Ly9IdXJ0Ym94ICBhY3RpdmUgdW5sZXNzIGluIHJlY292ZXJ5IGZyYW1lc1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xMDAgLSA4MCAtIDQwLCAwLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgMTcwLCA5MCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgICAgICAgICBodXJ0Ym94LnBhcmVudCA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KGh1cnRib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGh1cnRib3ggPSBuZXcgSHVydGJveCh0aGlzLmdhbWUsIHRoaXMuY3R4LCB0aGlzLmJvdW5kWCwgdGhpcy5ib3VuZFksIC0xMDAgLSAxNTAgLSAyMDAgLSAxNSwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDE3MCwgOTAsIHRoaXMuc2NhbGUsIHRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgICAgICAgICAgaHVydGJveC5wYXJlbnQgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShodXJ0Ym94KTsgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFydGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnN0YWJsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc3RhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGVzLnJlY292ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJlY292ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIC8vY29sbGlkZWQob3RoZXIsIGRpcmVjdGlvbikge1xuICAgIC8vICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAvLyAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgIC8vICAgIH1cbiAgICAvLyAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSAgXCJCdWxsZXRcIikge1xuICAgIC8vICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgLy8gICAgfVxuICAgIC8vICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgLy8gICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAvLyAgICB9XG4gICAgLy99XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmRyYXdGcmFtZSgxLCBjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGVfU3dvcmQ7IiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi4vYW5pbWF0aW9uXCJcbmltcG9ydCB7XG5BY3RvciwgXG5CdWxsZXQsIFxuRW5lbXksIFxuVGVycmFpblxufSBmcm9tIFwiLi9cIlxuXG5jbGFzcyBQcm9qZWN0aWxlIGV4dGVuZHMgQWN0b3Ige1xuXG4gICAgLy9BZGRlZCBlbmVyZ2l6ZWQgKEJFRk9SRSBESU1FTlNJT05TKSB0byBjaG9vc2UgY29ycmVjdCBwcm9qZWN0aWxlXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgZW5lcmdpemVkLCBzcHJpdGVXaWR0aCA9IDYwLCBzcHJpdGVIZWlnaHQgPSA2MCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDEzO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHsgdGhpcy54ICs9IDEwMDsgfSBlbHNlIHsgdGhpcy54IC09IDEwMCB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jZW50ZXJYID0geCArICgoc3ByaXRlV2lkdGggKiBzY2FsZSkgLyAyKSAtIHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDUwO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gKHRoaXMuYm91bmRXaWR0aCAvIDIpICsgMTAwOyAvLysxMDAgYWxpZ25zIHdpdGggdGhlIGd1blxuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gKHRoaXMuc3ByaXRlSGVpZ2h0IC0gMTApOyAvLyB0aGUgLTEwIG9mZnNldCBhY2NvdW50cyBmb3IgdGhlIFwicGFkZGluZ1wiIEkgYWRkZWQgdG8gZWFjaCBmcmFtZSBpbiB0aGUgc3ByaXRlIHNoZWV0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSAtIDEwMDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCAtIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgaWYgKGVuZXJnaXplZCkge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSAyMDA7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDI7XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50U3BlZWQgPSAxN1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2UgPSA1MDtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gMTtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG5cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZ3JlZW5cIjogIWVuZXJnaXplZCxcbiAgICAgICAgICAgIFwiYmx1ZVwiOiBlbmVyZ2l6ZWQsXG4gICAgICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGFibGl6ZWRcIjogZmFsc2UsICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZ3JlZW5fZXhpdGluZ1wiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAzLCAxNSwgNiwgOCwgZmFsc2UsIHRoaXMuc2NhbGUsIDQpLFxuICAgICAgICAgICAgXCJncmVlbl9zdGFibGVcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3RoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0XSwgMywgMTUsIDYsIDQsIHRydWUsIHRoaXMuc2NhbGUsIDExKSxcbiAgICAgICAgICAgIFwiYmx1ZV9leGl0aW5nXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFt0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodF0sIDMsIDIzLCA2LCA4LCBmYWxzZSwgdGhpcy5zY2FsZSwgMTUpLFxuICAgICAgICAgICAgXCJibHVlX3N0YWJsZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHRdLCAzLCAyMywgNiwgMywgdHJ1ZSwgdGhpcy5zY2FsZSwgMjApLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZ3JlZW4pIHsgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZ3JlZW5fZXhpdGluZzsgfSBlbHNlIHsgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYmx1ZV9leGl0aW5nOyB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL1RPRE9cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYIC09IHRoaXMubW92ZW1lbnRTcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnN0YWJsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5ncmVlbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmdyZWVuX2V4aXRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc3RhYmxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZ3JlZW5fc3RhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmF3SW1nKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZXMuYmx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmJsdWVfZXhpdGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5zdGFibGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ibHVlX3N0YWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypDT0xMSVNJT04qL1xuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHsgLy9jb21tZW50ZWQgaXMgZm9yIGV2ZW50dWFsIGltcGxlbWVudGF0aW9uIG9mIHByb2plY3RpbGUgXCJhcm1vclwiL3RvdWdobmVzcy5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09ICBcIlRlcnJhaW5cIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vZWxzZSBpZiAob3RoZXIubmFtZSA9PT0gIFwiQnVsbGV0XCIpIHtcbiAgICAgICAgLy8gICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAvL31cbiAgICAgICAgZWxzZSBpZiAob3RoZXIucGFyZW50Q2xhc3MgPT09ICBcIkVuZW15XCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2lmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgLy99IFxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsXG4gICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuXG4gICAgZHJhd0ltZyhjdHgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kcmF3Qm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd091dGxpbmUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBBY3RvcixcbiAgICBUZXJyYWluLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG59IGZyb20gXCIuL1wiXG5cblxuLyogRm9yIGNvcHkgcGFzdGUgam9iczpcbiAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMueCwgdGhpcy55LCBvZmZYLCBvZmZZLFxuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLzIsIHRoaXMuc3ByaXRlSGVpZ2h0LzIsIGh1cnRXaWR0aCwgaHVydEhlaWdodCwgdGhpcy5zY2FsZSwgdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSk7ICAgXG4gKi9cbmNsYXNzIFJlZmxlY3Rib3ggZXh0ZW5kcyBBY3RvciB7XG5cbiAgICAvL05vdGUgdGhhdCBpbWcgaXMgcmVxdWlyZWQgZm9yIHN1cGVyKCksIGV2ZW4gdGhvdWdoIFJlZmxlY3Rib3ggaXMgbmV2ZXIgYW5pbWF0ZWQuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4ID0gbnVsbCwgeCwgeSwgb2ZmWCwgb2ZmWSwgcGFyZW50V2lkdGgsIHBhcmVudEhlaWdodCwgaHVydFdpZHRoLCBodXJ0SGVpZ2h0LCBzY2FsZSA9IDMsIGZhY2luZ1JpZ2h0ID0gdHJ1ZSwgcGFyZW50ID0gbnVsbCwgZnJhbWVzID0gMiwgaW1nID0gbnVsbCkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkFjdG9yXCI7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50XG4gICAgICAgIHRoaXMubW92ZW1lbnRTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcblxuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSBodXJ0V2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSBodXJ0SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuYm91bmRZID0geSAtIHRoaXMuYm91bmRIZWlnaHQgKyBvZmZZO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0geCArIHBhcmVudFdpZHRoICsgdGhpcy5ib3VuZFdpZHRoICsgb2ZmWDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRYID0geCAtIHRoaXMuYm91bmRXaWR0aCAtIG9mZlg7XG4gICAgICAgIH1cbiAgICAgICAgLy9TdGF0c1xuXG4gICAgICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL2hpdGJveCBwZXJzaXN0cyBmb3IgdHdvIHRpY2tzLiAodHdvIHByZXZlbnRzIHJhbmRvbSBoaXRib3ggXCJnYXBzXCIpXG4gICAgICAgIGlmICh0aGlzLmZyYW1lcyA+PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYW1lcy0tO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIGNvbGxpZGVkKG90aGVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy8gY29sbGlkZSB3aXRoIHRlcnJhaW5cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiQnVsbGV0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1VDQ0VTUyFcIilcbiAgICAgICAgICAgIC8vb3RoZXIuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gIW90aGVyLnN0YXRlcy5mYWNpbmdSaWdodDtcbiAgICAgICAgICAgIC8vb3RoZXIubmFtZSA9IFwiUHJvamVjdGlsZVwiO1xuICAgICAgICAgICAgLy9vdGhlci5kYW1hZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlJvY2tldFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5PIFNPVVAgRk9SIFlPVSFcIik7XG4gICAgICAgICAgICBvdGhlci5wb2ludFZhbHVlID0gNTtcbiAgICAgICAgICAgIG90aGVyLnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGFyZW50LmVuZXJneSArPSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbmVyZ3lDb29sZG93biAvPSA0LjI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLm5hbWUgPT09IFwiQm9tYlwiKSB7XG4gICAgICAgICAgICBvdGhlci54VmVsb2NpdHkgPSAtdGhpcy5mYWNpbmcgKiA1O1xuICAgICAgICAgICAgb3RoZXIueVZlbG9jaXR5ID0gLTIwO1xuICAgICAgICAgICAgb3RoZXIuZGFtYWdlID0gNTA7XG4gICAgICAgICAgICBvdGhlci5zdGF0ZXMucmVmbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdPdXRsaW5lKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cblxuICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBSZWZsZWN0Ym94OyIsImltcG9ydCBBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvblwiXG5pbXBvcnQge1xuICAgIEFjdG9yLFxuICAgIEVuZW15LFxuICAgIEhlcm8sXG4gICAgUHJvamVjdGlsZSxcbiAgICBUZXJyYWluXG59IGZyb20gXCIuL1wiXG5cblxuY2xhc3MgUm9ja2V0IGV4dGVuZHMgRW5lbXkge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNTApIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgpO1xuICAgICAgICB0aGlzLnBhcmVudENsYXNzID0gXCJFbmVteVwiO1xuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMueVNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5tYXhYID0gODtcbiAgICAgICAgdGhpcy5tYXhZID0gNDtcbiAgICAgICAgdGhpcy54QWNjZWwgPSAuNDtcbiAgICAgICAgdGhpcy55QWNjZWwgPSAuMTc7XG4gICAgICAgIHRoaXMueSAtPSA3MFxuICAgICAgICBpZiAoIWZhY2luZ1JpZ2h0KSB7IHRoaXMueCAtPSAxMDA7IH0gZWxzZSB7IHRoaXMueCArPSAxMDAgfTsvL29mZnNldCB0byBtYXRjaCBndW5cbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHggKyAoKHNwcml0ZVdpZHRoICogc2NhbGUpIC8gMikgLSBzcHJpdGVXaWR0aDtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gMzA7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSAzMDtcbiAgICAgICAgaWYgKGZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDEyMDsgLy8rMTAwIGFsaWducyB3aXRoIHRoZSBndW5cbiAgICAgICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCAtICh0aGlzLnNwcml0ZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCA9IHRoaXMuY2VudGVyWCAtICh0aGlzLmJvdW5kV2lkdGggLyAyKSArIDIgKiB0aGlzLnNwcml0ZVdpZHRoIC0gMTgwO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSB0aGlzLnkgLSB0aGlzLmJvdW5kSGVpZ2h0IC0gKHRoaXMuc3ByaXRlSGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5kYW1hZ2VUeXBlID0gXCJlbmVyZ3lcIjtcbiAgICAgICAgdGhpcy5kcmFpblRpbWUgPSAxMjA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMjtcbiAgICAgICAgdGhpcy5oZWFsdGggPSA1MDtcbiAgICAgICAgdGhpcy5ib3VuY2VDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYm91bmNlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmJvdW5jZVRpbWUgPSAzNTtcbiAgICAgICAgdGhpcy50aW1lciA9IDUwMDtcbiAgICAgICAgdGhpcy5zYWZlVGltZXIgPSAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmFjaW5nUmlnaHRcIjogZmFjaW5nUmlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgIFwicm9ja2V0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFs5MCwgNjBdLCA2LCAyMCwgNSwgNywgdHJ1ZSwgdGhpcy5zY2FsZSwgMTMpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5yb2NrZXQ7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkgeyB0aGlzLmZhY2luZyA9IDE7IH0gZWxzZSB7IHRoaXMuZmFjaW5nID0gLTE7fVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgJiYgdGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCAmJiB0aGlzLnggLSB0aGlzLmdhbWUuaGVyby54ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHsvL1RPRE8gVHJhY2tpbmcgYmVoYXZpb3JcbiAgICAgICAgICAgIGlmICgodGhpcy54U3BlZWQgPCB0aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IDEpIHx8ICh0aGlzLnhTcGVlZCA+IC10aGlzLm1heFggJiYgdGhpcy5mYWNpbmcgPT09IC0xKSkge1xuICAgICAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuZmFjaW5nICogdGhpcy54QWNjZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy54U3BlZWQ7XG4gICAgICAgICAgICB0aGlzLmJvdW5kWCArPSB0aGlzLnhTcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55ID49IDApIHsvLyBiZWxvdyBoZXJvO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTcGVlZCA+IC10aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgLT0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSArPSB0aGlzLnlTcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugey8vIGFib3ZlIGhlcm9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U3BlZWQgPCB0aGlzLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U3BlZWQgKz0gdGhpcy55QWNjZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZDsvLyArIE1hdGguZmxvb3IoTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgLyAzMDApICogMS41O1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRZICs9IHRoaXMueVNwZWVkOy8vICsgTWF0aC5mbG9vcihNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSAvIDMwMCkgKiAxLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYm91bmNlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuY2VUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnJvY2tldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdJbWcoY3R4KTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbGxpZGUgd2l0aCB0ZXJyYWluXG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIlRlcnJhaW5cIiAmJiB0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXIubmFtZSA9PT0gXCJIZXJvXCIpIHtcbiAgICAgICAgICAgIGlmIChvdGhlci5uYW1lID09PSBcIkhlcm9cIiAmJiBvdGhlci5zdGF0ZXMuaW52dWxuZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgLy9rZWVwIG9uIHRoZSBtYXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvdGhlci5uYW1lID09PSBcIkh1cnRib3hcIiAmJiAhb3RoZXIuaXNFbmVteSAmJiB0aGlzLmdhbWUuaGVyby5zdGF0ZXMuc2xhc2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhaW5UaW1lICs9IDEwO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAtdGhpcy5mYWNpbmcgKiB0aGlzLm1heFggKiAyO1xuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgKiAxMDAgPCA1MCkge1xuICAgICAgICAgICAgICAgIHRoaXMueVNwZWVkID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlTcGVlZCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2lmICh0aGlzLmJvdW5jZUNvdW50ID4gMykge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5ib3VuY2VUaW1lciA9IHRoaXMuYm91bmNlVGltZTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYm91bmNlQ291bnQrKztcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChvdGhlci5uYW1lID09PSBcIlByb2plY3RpbGVcIiAmJiBvdGhlci5zdGF0ZXMuYmx1ZSkgfHwgb3RoZXIucGFyZW50ID09PSBcIlByb2plY3RpbGVfU3dvcmRcIikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSGl0Ym94KGZXaWR0aCwgZkhlaWdodCwgYldpZHRoLCBiSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2VudGVyWCA9IHRoaXMueCArICgoZldpZHRoICogdGhpcy5zY2FsZSkgLyAyKSAtIGZXaWR0aCArIDU7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiBiV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRIZWlnaHQgPSB0aGlzLnNjYWxlICogYkhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSB0aGlzLmJvdW5kV2lkdGggLyAyO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLmJvdW5kWCxcbiAgICAgICAgICAgIHRoaXMuYm91bmRZLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2NrZXQ7IiwiZGVmaW5lKFtcbiAgICAnYWN0b3InLFxuICAgICdhbmltYXRpb24nLFxuXSwgZnVuY3Rpb24gKFxuICAgIEFjdG9yLFxuICAgIEFuaW1hdGlvbixcbiAgICApIHtcblxuXG4gICAgICAgIGNsYXNzIFNob3RibGFzdCBleHRlbmRzIEFjdG9yIHtcblxuICAgICAgICAgICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSAzLCBmYWNpbmdSaWdodCwgc3ByaXRlV2lkdGggPSA1MCwgc3ByaXRlSGVpZ2h0ID0gNTApIHtcbiAgICAgICAgICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gNztcbiAgICAgICAgICAgICAgICBpZiAoZmFjaW5nUmlnaHQpIHsgdGhpcy54ICs9IDEwMDsgfSBlbHNlIHsgdGhpcy54IC09IDEwMCB9Oy8vb2Zmc2V0IHRvIG1hdGNoIGd1blxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSAtIHRoaXMuYm91bmRIZWlnaHQgLSA1MDA7XG5cbiAgICAgICAgICAgICAgICAvL1N0YXRzXG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgXCJmYWNpbmdSaWdodFwiOiBmYWNpbmdSaWdodCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzaG90Ymxhc3RcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxOCwgNCwgNiwgZmFsc2UsIHRoaXMuc2NhbGUsIDEwKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob3RibGFzdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXBkYXRlKCkge1xuICAgICAgICAgICAgICAgIC8vVE9ET1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRyYXcoY3R4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG90Ymxhc3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFdpZHRoLCB0aGlzLmJvdW5kSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGRyYXdJbWcoY3R4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZHJhd0ZyYW1lKDEsIGN0eCwgdGhpcy54LCB0aGlzLnksIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFNob3RibGFzdDtcbiAgICB9KTsiLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb25cIlxuaW1wb3J0IHtcbiAgICBCdWxsZXQsXG4gICAgRW5lbXksXG4gICAgVGVycmFpbixcbiAgICBQcm9qZWN0aWxlLFxuICAgIEh1cnRib3gsXG4gICAgU2hvdGJsYXN0XG59IGZyb20gXCIuL1wiXG5cblxuLy9UT0RPIChsb25nIHRlcm0pOiBBTEwgQUNUT1JTIC0gXCJDaGVjayBpZiBpbiByYW5nZVwiIGhlbHBlciBmdW5jdGlvblxuY2xhc3MgU29sZGllcl9TaGllbGQgZXh0ZW5kcyBFbmVteSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpbWcgPSBudWxsLCBjdHggPSBudWxsLCBzY2FsZSA9IDMsIHNwcml0ZVdpZHRoID0gNTAsIHNwcml0ZUhlaWdodCA9IDUwKSB7XG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIGltZywgY3R4KTtcbiAgICAgICAgdGhpcy5wYXJlbnRDbGFzcyA9IFwiRW5lbXlcIjtcbiAgICAgICAgdGhpcy5tb3ZlbWVudFNwZWVkID0gNztcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoO1xuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbnRlclggPSB4ICsgKChzcHJpdGVXaWR0aCAqIHNjYWxlKSAvIDIpIC0gc3ByaXRlV2lkdGg7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IHRoaXMuc2NhbGUgKiA0NTtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiA0NTtcbiAgICAgICAgdGhpcy5ib3VuZFggPSB0aGlzLmNlbnRlclggLSAodGhpcy5ib3VuZFdpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArICh0aGlzLnNwcml0ZUhlaWdodCAvIDIgLSAxMCk7XG4gICAgICAgIC8vdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzOCwgNDApO1xuXG4gICAgICAgIC8vU3RhdHNcbiAgICAgICAgdGhpcy5wb2ludFZhbHVlID0gMzA7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gNTA7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSAtMTtcblxuICAgICAgICAvLyBCZWhhdmlvciBwYXJhbWV0ZXJzXG4gICAgICAgIHRoaXMucnVuUHJvYiA9IDU7XG4gICAgICAgIHRoaXMucnVuQXdheUNvb2xkb3duID0gMjUwO1xuICAgICAgICB0aGlzLnJ1bkF3YXlDb29sZG93blRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5ydW5Bd2F5VGltZSA9IDc1O1xuICAgICAgICB0aGlzLnJ1bkF3YXlUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuc2lnaHRSYWRpdXNbMF0gPSAxMDAwO1xuICAgICAgICB0aGlzLnNpZ2h0UmFkaXVzWzFdID0gMzUwO1xuXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgXCJhY3RpdmVcIjogZmFsc2UsIC8vY3VycmVudGx5IHVudXNlZFxuICAgICAgICAgICAgXCJpZGxpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwicnVubmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvb3Rpbmdfc3RhcnR1cFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2hvb3RpbmdfYWN0aXZlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzaG9vdGluZ19yZWNvdmVyXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJoYXNTaG90XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJzbGFzaGluZ19zdGFydFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic2xhc2hpbmdfZW5kXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJibG9ja2luZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwidHVybmluZ1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiZnJhbWVsb2NrZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImZhY2luZ1JpZ2h0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJydW5uaW5nQXdheVwiOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge1xuICAgICAgICAgICAgXCJpZGxlXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgMTUsIDUsIDYsIHRydWUsIHRoaXMuc2NhbGUpLFxuICAgICAgICAgICAgXCJ0dXJuXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMCwgMTUsIDMsIDUsIGZhbHNlLCB0aGlzLnNjYWxlLCA2KSxcbiAgICAgICAgICAgIFwiYmxvY2tcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAwLCAxNSwgOSwgNCwgZmFsc2UsIHRoaXMuc2NhbGUsIDExKSxcbiAgICAgICAgICAgIFwicnVuXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFtzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0XSwgMSwgMTIsIDMsIDEyLCB0cnVlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwic2hvb3Rfc3RhcnR1cFwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDE4LCAyLCA1LCBmYWxzZSwgdGhpcy5zY2FsZSksXG4gICAgICAgICAgICBcInNob290X2FjdGl2ZVwiOiBuZXcgQW5pbWF0aW9uKHRoaXMuaW1nLCBbc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodF0sIDIsIDE4LCA0LCA1LCBmYWxzZSwgdGhpcy5zY2FsZSwgNSksXG4gICAgICAgICAgICBcInNob290X3JlY292ZXJcIjogbmV3IEFuaW1hdGlvbih0aGlzLmltZywgW3Nwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHRdLCAyLCAxOCwgNCwgMSwgdHJ1ZSwgdGhpcy5zY2FsZSwgOSksXG4gICAgICAgICAgICBcInNsYXNoX3N0YXJ0XCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFsxMDAsIDYwXSwgMywgMTYsIDIsIDksIGZhbHNlLCB0aGlzLnNjYWxlKSxcbiAgICAgICAgICAgIFwic2xhc2hfZW5kXCI6IG5ldyBBbmltYXRpb24odGhpcy5pbWcsIFsxMDAsIDYwXSwgMywgMTYsIDMsIDcsIGZhbHNlLCB0aGlzLnNjYWxlLCA5KSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuaWRsZTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueSAtIHRoaXMuZ2FtZS5oZXJvLnkpIDw9IHRoaXMuc2lnaHRSYWRpdXNbMV0pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqKiogQkVHSU4gQkVIQVZJT1IgQ09ERSAqKioqL1xuICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAvL2lkbGluZyAtIFRoaXMgaXMgd2hlcmUgbW9zdCBiZWhhdmlvciB3aWxsIHN0YXJ0LCBhbmQgbW9zdCB3aWxsIHJldHVybi5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcgJiYgIXRoaXMuc3RhdGVzLnJ1bm5pbmdBd2F5XG4gICAgICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPCB0aGlzLnNpZ2h0UmFkaXVzWzBdXG4gICAgICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gdGhpcy5nYW1lLmhlcm8ueSkgPCB0aGlzLnNpZ2h0UmFkaXVzWzFdKSB7XG4gICAgICAgICAgICAgICAgLy9GYWNlIEVuZW15XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5oZXJvLnggPiB0aGlzLnggJiYgIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0ICYmICF0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy50dXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZS5oZXJvLnggPCB0aGlzLnggJiYgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQgJiYgIXRoaXMuc3RhdGVzLmJsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TbGFzaCB3aGVuIGluIHJhbmdlXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IDI1MCAmJiBNYXRoLmFicyh0aGlzLnkgLSB0aGlzLmdhbWUuaGVyby55KSA8IDUwXG4gICAgICAgICAgICAgICAgICAgICYmIE1hdGgucmFuZG9tKCkgKiAxMDAgPD0gNSAmJiB0aGlzLmFuaW1hdGlvbi5sb29wcyA+IDEpIHsgLy9hZGRlZCByYW5kb20gYWN0aXZhdGlvbiBhcyBhIHRlc3QuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nX3N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1Nob290IHdoZW4gaW4gcmFuZ2VcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCkgPj0gMjAwXG4gICAgICAgICAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5hbmltYXRpb24ubG9vcHMgPj0gMykgeyAvL3Nob3QgY29vbGRvd24gYmFzZWQgb24gaWRsZSB0aW1lIChtZWFzdXJlZCBieSBhbmltYXRpb24gbG9vcHMpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLngpIDw9IDYwMFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgTWF0aC5yYW5kb20oKSAqIDEwIDw9IHRoaXMucnVuUHJvYlxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5ydW5Bd2F5Q29vbGRvd25UaW1lciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcgYXdheVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuUHJvYiAtPSAyLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bkF3YXlUaW1lciA9IHRoaXMucnVuQXdheVRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bkF3YXlDb29sZG93blRpbWVyID0gdGhpcy5ydW5Bd2F5Q29vbGRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnR1cm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qKioqIFVQREFURSBCRUhBVklPUiBQQVJBTVMgKioqKi9cbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuc2hvb3RpbmdfYWN0aXZlICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucnVuQXdheUNvb2xkb3duVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVuQXdheUNvb2xkb3duVGltZXIgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucnVuQXdheVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bkF3YXlUaW1lciAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKioqIEVORCBCRUhBVklPUiBDT0RFICoqKiovXG5cbiAgICAgICAgICAgIC8vUnVuIEF3YXkgUm91dGluZVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnJ1bm5pbmdBd2F5ICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwICYmICF0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUgJiYgIXRoaXMuc3RhdGVzLnNob290aW5nX3JlY292ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ydW5Bd2F5VGltZXIgPT0gdGhpcy5ydW5Bd2F5VGltZSAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudHVybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkF3YXlUaW1lciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmdBd2F5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudHVybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucnVuQXdheVRpbWVyID4gMCAmJiAhdGhpcy5zdGF0ZXMudHVybmluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMucnVubmluZykgeyAvL3J1bm5pbmdcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gdGhpcy5mYWNpbmcgKiB0aGlzLm1vdmVtZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmxvb3BzID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3Rpbmdfc3RhcnR1cCAmJiAhdGhpcy5zdGF0ZXMuZnJhbWVsb2NrZWQpIHsgLy9zaG9vdGluZyBzdGFydDogdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzOCwgNDApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19zdGFydHVwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX2FjdGl2ZSkgeyAvL3Nob290aW5nIGFjdGl2ZVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZXMuaGFzU2hvdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwiZW5lbXlfc2hvb3RcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgU2hvdGJsYXN0KHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmFkZEVudGl0eShuZXcgQnVsbGV0KHRoaXMuZ2FtZSwgdGhpcy54LCB0aGlzLnksIHRoaXMuaW1nLCB0aGlzLmN0eCwgdGhpcy5zY2FsZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzU2hvdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5zaG9vdGluZ19hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaGFzU2hvdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc3RhdGVzLnNob290aW5nX3JlY292ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLnJ1bm5pbmdBd2F5KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2hvb3RpbmdfcmVjb3ZlcikgeyBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubG9vcHMgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNob290aW5nX3JlY292ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5ydW5uaW5nQXdheSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNsYXNoaW5nX3N0YXJ0ICYmICF0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCkgeyAvL3NsYXNoaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID09PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCA1LCAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIDcwLCAxMDAsIHRoaXMuc2NhbGUsIDIqdGhpcy5kYW1hZ2UsIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRFbnRpdHkobmV3IEh1cnRib3godGhpcy5nYW1lLCB0aGlzLmN0eCwgdGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCAtNjAgLSB0aGlzLnNwcml0ZVdpZHRoIC0gMio2NSwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA3MCwgMTAwLCB0aGlzLnNjYWxlLCAyKnRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2xhc2hpbmdfc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuc2xhc2hpbmdfZW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuc2xhc2hpbmdfZW5kKSB7IC8vc2xhc2hpbmcgZW5kXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmN1cnJlbnRGcmFtZSgpID49IDAgJiYgdGhpcy5hbmltYXRpb24uY3VycmVudEZyYW1lKCkgPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgNSwgMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCA3MCwgMTAwLCB0aGlzLnNjYWxlLCAyKnRoaXMuZGFtYWdlLCB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYWRkRW50aXR5KG5ldyBIdXJ0Ym94KHRoaXMuZ2FtZSwgdGhpcy5jdHgsIHRoaXMuYm91bmRYLCB0aGlzLmJvdW5kWSwgLTYwIC0gdGhpcy5zcHJpdGVXaWR0aCAtIDIqNjUsIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgNzAsIDEwMCwgdGhpcy5zY2FsZSwgMip0aGlzLmRhbWFnZSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQsIHRydWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNsYXNoaW5nX2VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gMjA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuYmxvY2tpbmcpIHsgLy9ibG9ja2luZ1xuICAgICAgICAgICAgICAgIC8vIGEgbGl0dGxlIGtub2NrYmFja1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFggKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gZmFsc2U7ICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlcy50dXJuaW5nKSB7IC8vdHVybmluZ1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmZyYW1lbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMudHVybmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mYWNpbmdSaWdodCA9ICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNpbmcgKj0gLTE7IC8vc2VlIGFib3ZlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5mcmFtZWxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5pZGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICAgICAgICAgIHRoaXMubGFzdEJvdW5kWSA9IHRoaXMuYm91bmRZO1xuICAgICAgICAgICAgdGhpcy5ib3VuZFkgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5pZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCAxMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5pZGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ydW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX3N0YXJ0dXApIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGl0Ym94KDUwLCA1MCwgMzAsIDM1LCA1LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLnNob290X3N0YXJ0dXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNob290aW5nX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIDUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2hvb3RfYWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zaG9vdGluZ19yZWNvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhpdGJveCg1MCwgNTAsIDMwLCAzNSwgNSwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5zaG9vdF9yZWNvdmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5zbGFzaGluZ19zdGFydCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goMTAwLCA2MCwgMjUsIDM1LCAtMTUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2xhc2hfc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzLnNsYXNoaW5nX2VuZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goMTAwLCA2MCwgMjUsIDM1LCAtMTUsIDApO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuc2xhc2hfZW5kO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlcy5ibG9ja2luZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIC0xMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5ibG9jaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZXMudHVybmluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIaXRib3goNTAsIDUwLCAzMCwgMzUsIC0xMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy50dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0ltZyhjdHgpO1xuICAgIH1cblxuICAgIC8vdXNlZCB0byBlYXNpbHkgdXBkYXRlIGhpdGJveCBiYXNlZCBvbiBzdGF0ZS9hbmltYXRpb25cbiAgICB1cGRhdGVIaXRib3goZldpZHRoLCBmSGVpZ2h0LCBiV2lkdGgsIGJIZWlnaHQsIG9mZlgsIG9mZlkpIHtcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gdGhpcy54ICsgKChmV2lkdGggKiB0aGlzLnNjYWxlKSAvIDIpIC0gZldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kV2lkdGggPSB0aGlzLnNjYWxlICogYldpZHRoO1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gdGhpcy5zY2FsZSAqIGJIZWlnaHQ7XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy5jZW50ZXJYIC0gdGhpcy5ib3VuZFdpZHRoIC8gMiArIHRoaXMuZmFjaW5nKm9mZlg7XG4gICAgICAgIHRoaXMuYm91bmRZID0gdGhpcy55IC0gdGhpcy5ib3VuZEhlaWdodCArIChmSGVpZ2h0IC8gMiAtIDEwKTtcbiAgICB9XG5cbiAgICBjb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFkgPSBvdGhlci5ib3VuZFkgLSB0aGlzLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodCAtMTA7IC8vZml4IG1hZ2ljIG51bWJlciAoZHJhd24gc2xpZ2h0bHkgYmVsb3cgaGl0Ym94IHdpdGhvdXQgdGhlIDIwIG9mZnNldClcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wc0xlZnQgPSB0aGlzLm1heEp1bXBzO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmp1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWSA9IG90aGVyLmJvdW5kWSArIG90aGVyLmJvdW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuYm91bmRZICsgdGhpcy5ib3VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RCb3VuZFkgPSB0aGlzLmJvdW5kWTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kWCA9IG90aGVyLmJvdW5kWCArIG90aGVyLmJvdW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5ib3VuZFg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRYID0gb3RoZXIuYm91bmRYIC0gdGhpcy5ib3VuZFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuYm91bmRYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJQcm9qZWN0aWxlXCIpIHtcbiAgICAgICAgICAgIC8vIGJsb2NraW5nIGZyb20gbGVmdCAmIHJpZ2h0XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nIHx8IHRoaXMuc3RhdGVzLmJsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPCAwICYmIHRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ2xlZnQnICYmIG90aGVyLnggPCB0aGlzLngqLykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheVNvdW5kKFwic2hpZWxkX2Jsb2NrXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueCAtIHRoaXMuZ2FtZS5oZXJvLnggPiAwICYmICF0aGlzLnN0YXRlcy5mYWNpbmdSaWdodC8qZGlyZWN0aW9uID09ICdyaWdodCcgJiYgb3RoZXIueCA+IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmJsb2NraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5U291bmQoXCJzaGllbGRfYmxvY2tcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IG90aGVyLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXlTb3VuZChcImVuZW15X2h1cnRfMVwiKVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGJsb29kIG9yIHNvbWV0aGluZyBnb2VzIGhlcmVcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWUuYWRkRW50aXR5KC4uLilcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPVUNIIVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5uYW1lID09PSAgXCJIdXJ0Ym94XCIpIHtcbiAgICAgICAgICAgIC8vIGJsb2NraW5nIGZyb20gbGVmdCAmIHJpZ2h0XG4gICAgICAgICAgICBpZiAoIW90aGVyLmlzRW5lbXkpIHtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIucGFyZW50ID09PSBcIkJvbWJcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nIHx8IHRoaXMuc3RhdGVzLmJsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54IC0gb3RoZXIueCA8IDAgJiYgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQvKmRpcmVjdGlvbiA9PSAnbGVmdCcgJiYgb3RoZXIueCA8IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy54IC0gb3RoZXIueCA+IDAgJiYgIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ3JpZ2h0JyAmJiBvdGhlci54ID4gdGhpcy54Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPVUNIIVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPVUNIIVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZXMuaWRsaW5nIHx8IHRoaXMuc3RhdGVzLmJsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA8IDAgJiYgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQvKmRpcmVjdGlvbiA9PSAnbGVmdCcgJiYgb3RoZXIueCA8IHRoaXMueCovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuYmxvY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLmlkbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy54IC0gdGhpcy5nYW1lLmhlcm8ueCA+IDAgJiYgIXRoaXMuc3RhdGVzLmZhY2luZ1JpZ2h0LypkaXJlY3Rpb24gPT0gJ3JpZ2h0JyAmJiBvdGhlci54ID4gdGhpcy54Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5ibG9ja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZXMuaWRsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSBvdGhlci5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPVUNIIVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFsdGggLT0gb3RoZXIuZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPVUNIIVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3T3V0bGluZShjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMuYm91bmRYLFxuICAgICAgICAgICAgdGhpcy5ib3VuZFksXG4gICAgICAgICAgICB0aGlzLmJvdW5kV2lkdGgsIHRoaXMuYm91bmRIZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3SW1nKGN0eCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3RnJhbWUoMSwgY3R4LCB0aGlzLngsIHRoaXMueSwgdGhpcy5zdGF0ZXMuZmFjaW5nUmlnaHQpO1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU29sZGllcl9TaGllbGQ7IiwiLy93aWxsIHJldHVybiBtdWx0aXBsZSBkaWZmZXJlbnQgc3VidHlwZXMgb2YgbW92aW5nIHBsYXRmb3Jtc1xuaW1wb3J0IHtUZXJyYWlufSBmcm9tIFwiLi9cIlxuXG5jbGFzcyBUZXJyYWluTW9iaWxlIGV4dGVuZHMgVGVycmFpbiB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgZGltZW5zaW9ucywgaW1nID0gbnVsbCwgY3R4ID0gbnVsbCwgc2NhbGUgPSBudWxsLCB0aWxlcyA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgaW1nLCBjdHgsIFwiVGVycmFpblwiKTtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMudGlsZXMgPSB0aWxlcztcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNyY193aWR0aCA9IGRpbWVuc2lvbnNbMF07XG4gICAgICAgIHRoaXMuc3JjX2hlaWdodCA9IGRpbWVuc2lvbnNbMV07XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54O1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSArIDY7XG4gICAgICAgIHRoaXMuYm91bmRXaWR0aCA9IDk2O1xuICAgICAgICB0aGlzLmJvdW5kSGVpZ2h0ID0gOTY7XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHgucmVjdCh0aGlzLngsIHRoaXMueSxcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbGVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbCA9IHRoaXMudGlsZXNbMF1cbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy50aWxlc1sxXVxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsXG4gICAgICAgICAgICAgICAgICAgIChjb2wgKiB0aGlzLnNyY193aWR0aCksXG4gICAgICAgICAgICAgICAgICAgIChyb3cgKiB0aGlzLnNyY19oZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLngsIHRoaXMueSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmNfd2lkdGggKiAzLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNyY19oZWlnaHQgKiAzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLmRyYXdCb3hlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdPdXRsaW5lKGN0eCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG5cbiAgICB9XG59IC8vIGVuZCBUZXJyYWluXG5cbmV4cG9ydCBkZWZhdWx0IFRlcnJhaW5Nb2JpbGU7XG5cbiIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCJcblxuY2xhc3MgVGVycmFpbiBleHRlbmRzIEVudGl0eSB7XG4gICAgIGNvbnN0cnVjdG9yIChnYW1lLCB4LCB5LCBkaW1lbnNpb25zLCBpbWc9bnVsbCwgY3R4PW51bGwsIHNjYWxlPW51bGwsIHRpbGVzPW51bGwsIGJvdW5kcyA9IFswLCAwLCAwLCAwXSkge1xuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBpbWcsIGN0eCk7XG4gICAgICAgIHRoaXMucGFyZW50Q2xhc3MgPSBcIkVudGl0eVwiO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIlRlcnJhaW5cIjtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMudGlsZXMgPSB0aWxlcztcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnNyY193aWR0aCA9IGRpbWVuc2lvbnNbMF07XG4gICAgICAgIHRoaXMuc3JjX2hlaWdodCA9IGRpbWVuc2lvbnNbMV07XG4gICAgICAgIHRoaXMuYm91bmRYID0gdGhpcy54ICsgYm91bmRzWzJdO1xuICAgICAgICB0aGlzLmJvdW5kWSA9IHRoaXMueSArIGJvdW5kc1szXTtcbiAgICAgICAgdGhpcy5ib3VuZFdpZHRoID0gdGhpcy5zY2FsZSAqIGJvdW5kc1swXTtcbiAgICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHRoaXMuc2NhbGUgKiBib3VuZHNbMV07XG4gICAgfVxuXG4gICAgZHJhd091dGxpbmUgKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5ib3VuZFgsIHRoaXMuYm91bmRZLCBcbiAgICAgICAgICAgIHRoaXMuYm91bmRXaWR0aCwgdGhpcy5ib3VuZEhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbGVzICE9IG51bGwpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb2wgPSB0aGlzLnRpbGVzWzBdXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy50aWxlc1sxXVxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgXG4gICAgICAgICAgICAgICAgKGNvbCAqIHRoaXMuc3JjX3dpZHRoKSxcbiAgICAgICAgICAgICAgICAocm93ICogdGhpcy5zcmNfaGVpZ2h0KSxcbiAgICAgICAgICAgICAgICB0aGlzLnNyY193aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLnNyY19oZWlnaHQsIFxuICAgICAgICAgICAgICAgIHRoaXMueCwgdGhpcy55LFxuICAgICAgICAgICAgICAgIHRoaXMuc3JjX3dpZHRoKjMsIFxuICAgICAgICAgICAgICAgIHRoaXMuc3JjX2hlaWdodCozIFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZHJhd0JveGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3T3V0bGluZShjdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLypVcGRhdGVzIHRoZSBlbnRpdHkgZWFjaCBnYW1lIGxvb3AuIGkuZS4gd2hhdCBkb2VzIHRoaXMgZW50aXR5IGRvPyAqL1xuICAgIHVwZGF0ZSAoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgfVxufSAvLyBlbmQgVGVycmFpblxuXG5leHBvcnQgZGVmYXVsdCBUZXJyYWluO1xuIiwiaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi9hc3NldC1tYW5hZ2VyXCJcbmltcG9ydCBIZXJvIGZyb20gXCIuL2VudGl0aWVzL2hlcm9cIlxuaW1wb3J0IEh1ZCBmcm9tIFwiLi9odWRcIlxuaW1wb3J0IEJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZFwiXG5pbXBvcnQgU291bmQgZnJvbSBcIi4vc291bmRcIlxuXG5cbiAvKioqKioqKioqKioqKioqXG5HYW1lRW5naW5lIGNsYXNzXG4qKioqKioqKioqKioqKioqL1xuY2xhc3MgR2FtZUVuZ2luZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lYm9hcmQsIGhlcm8pIHtcbiAgICAgICAgdGhpcy5kcmF3Qm94ZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZXZNb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBTb3VuZCgpO1xuICAgICAgICB0aGlzLmVudGl0aWVzID0gW107XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZExheWVycyA9IFtdO1xuICAgICAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBudWxsO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2xpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdXNlID0gbnVsbDtcbiAgICAgICAgdGhpcy53aGVlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3VyZmFjZVdpZHRoID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdXJmYWNlSGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5tdXNpYyA9IG51bGw7XG4gICAgICAgIHRoaXMuYWRkZWRwb2ludHMgPSAwO1xuICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSBcIk5vcm1hbCAoQnV0IEtpbmRhIEVhc3kpXCI7XG5cbiAgICAgICAgLy9ERVYgVE9PTCBGSUVMRFNcbiAgICAgICAgdGhpcy50b2dnbGVDb29sZG93bj0gMjA7XG4gICAgICAgIHRoaXMuYm94VG9nZ2xlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLnNldFBvc1RpbWVyID0gMDtcbiAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuY2hlY2twb2ludEN5Y2xlQ291bnQgPSAxO1xuXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGF1c2VUb2dnbGVDb29sZG93biA9IDA7XG4gICAgICAgIHRoaXMucGF1c2VHZW5lcmFsID0gNDA7XG4gICAgICAgIHRoaXMucGF1c2VMYXlvdXRBID0gMzUwO1xuICAgICAgICB0aGlzLnBhdXNlTGF5b3V0QiA9IDM1MDtcbiAgICAgICAgdGhpcy5wYXVzZUZsYXZvclggPSA4MDA7XG4gICAgICAgIHRoaXMucGF1c2VGbGF2b3JZID0gMjUwO1xuXG4gICAgICAgIC8vIEtCIGlucHV0IGtleWNvZGVzXG4gICAgICAgIHRoaXMuY29udHJvbEtleXMgPSB7XG4gICAgICAgICAgICBcIlNwYWNlXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5V1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVNcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlEXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5QVwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVJcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlGXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5R1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUVcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlKXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5S1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUxcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlNXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5UFwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleVRcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJLZXlZXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiS2V5VlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIktleUNcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJFbnRlclwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDFcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQyXCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkM1wiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDRcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICAgICAgXCJOdW1wYWQ1XCI6IHsgXCJhY3RpdmVcIjogZmFsc2UgfSxcbiAgICAgICAgICAgIFwiTnVtcGFkNlwiOiB7IFwiYWN0aXZlXCI6IGZhbHNlIH0sXG4gICAgICAgICAgICBcIk51bXBhZDlcIjogeyBcImFjdGl2ZVwiOiBmYWxzZSB9LFxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnRyb2wgbWFwcGluZ1xuICAgICAgICB0aGlzLmNvbnRyb2xMYXlvdXRBID0ge1xuICAgICAgICAgICAgXCJqdW1wXCI6IFwiU3BhY2VcIixcbiAgICAgICAgICAgIFwicmlnaHRcIjogXCJLZXlEXCIsXG4gICAgICAgICAgICBcImxlZnRcIjogXCJLZXlBXCIsXG4gICAgICAgICAgICBcInNob290XCI6IFwiTnVtcGFkNFwiLFxuICAgICAgICAgICAgXCJzbGFzaFwiOiBcIk51bXBhZDVcIixcbiAgICAgICAgICAgIFwiY2xlYXZlXCI6IFwiTnVtcGFkNlwiLFxuICAgICAgICAgICAgXCJlbmVyZ2l6ZVwiOiBcIktleVdcIixcbiAgICAgICAgICAgIFwiZGFzaFwiOiBcIk51bXBhZDFcIixcbiAgICAgICAgICAgIFwiZ2V0UG9zXCI6IFwiS2V5RVwiLFxuICAgICAgICAgICAgXCJzZXRQb3NcIjogXCJLZXlSXCIsXG4gICAgICAgICAgICBcImdvZFRvZ2dsZVwiOiBcIktleUdcIixcbiAgICAgICAgICAgIFwiaGFyZG1vZGVcIjogXCJLZXlUXCIsXG4gICAgICAgICAgICBcImVhc3ltb2RlXCI6IFwiS2V5WVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRBXCI6IFwiTnVtcGFkOVwiLFxuICAgICAgICAgICAgXCJsYXlvdXRCXCI6IFwiS2V5UFwiLFxuICAgICAgICAgICAgXCJ0ZXN0UG9zXCI6IFwiS2V5VlwiLFxuICAgICAgICAgICAgXCJ0b2dnbGVCb3hlc1wiOiBcIktleUNcIixcbiAgICAgICAgICAgIFwicGF1c2VcIjogXCJFbnRlclwiLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbExheW91dEIgPSB7XG4gICAgICAgICAgICBcImp1bXBcIjogXCJTcGFjZVwiLFxuICAgICAgICAgICAgXCJyaWdodFwiOiBcIktleURcIixcbiAgICAgICAgICAgIFwibGVmdFwiOiBcIktleUFcIixcbiAgICAgICAgICAgIFwic2hvb3RcIjogXCJLZXlKXCIsXG4gICAgICAgICAgICBcInNsYXNoXCI6IFwiS2V5S1wiLFxuICAgICAgICAgICAgXCJjbGVhdmVcIjogXCJLZXlMXCIsXG4gICAgICAgICAgICBcImVuZXJnaXplXCI6IFwiS2V5V1wiLFxuICAgICAgICAgICAgXCJkYXNoXCI6IFwiS2V5TVwiLFxuICAgICAgICAgICAgXCJnZXRQb3NcIjogXCJLZXlFXCIsXG4gICAgICAgICAgICBcInNldFBvc1wiOiBcIktleVJcIixcbiAgICAgICAgICAgIFwiZ29kVG9nZ2xlXCI6IFwiS2V5R1wiLFxuICAgICAgICAgICAgXCJoYXJkbW9kZVwiOiBcIktleVRcIixcbiAgICAgICAgICAgIFwiZWFzeW1vZGVcIjogXCJLZXlZXCIsXG4gICAgICAgICAgICBcImxheW91dEFcIjogXCJOdW1wYWQ5XCIsXG4gICAgICAgICAgICBcImxheW91dEJcIjogXCJLZXlQXCIsXG4gICAgICAgICAgICBcInRlc3RQb3NcIjogXCJLZXlWXCIsXG4gICAgICAgICAgICBcInRvZ2dsZUJveGVzXCI6IFwiS2V5Q1wiLFxuICAgICAgICAgICAgXCJwYXVzZVwiOiBcIkVudGVyXCIsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250cm9scyA9IHRoaXMuY29udHJvbExheW91dEE7XG4gICAgICAgIHRoaXMuaGVybyA9IGhlcm87XG4gICAgfVxuXG4gICAgLypcbiAgICBJbml0aWFsaXplcyB0aGUgZ2FtZSBlbmdpbmVcbiAgICAqL1xuICAgIGluaXQgKGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5zdXJmYWNlV2lkdGggPSB0aGlzLmN0eC5jYW52YXMud2lkdGg7XG4gICAgICAgIHRoaXMuc3VyZmFjZUhlaWdodCA9IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dCgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdnYW1lIGluaXRpYWxpemVkJyk7XG4gICAgfVxuXG4gICAgLypcbiAgICBTdGFydHMgdGhlIGdhbWUgZW5naW5lXG4gICAgKi9cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgZ2FtZVwiKTtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLm11c2ljID0gbmV3IEF1ZGlvKFwiLi9hdWRpby90cmFja18xLndhdlwiKTtcbiAgICAgICAgdGhpcy5tdXNpYy52b2x1bWUgPSAxO1xuICAgICAgICB0aGlzLm11c2ljLnBsYXkoKTtcbiAgICAgICAgKGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAgICAgICAgICAgdGhhdC5sb29wKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVMb29wLCB0aGF0LmN0eC5jYW52YXMpO1xuICAgICAgICB9KSgpO1xuICAgIH1cblxuICAgIHBsYXlTb3VuZChzb3VuZF9uYW1lLCB2b2x1bWU9MSkge1xuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoc291bmRfbmFtZSwgdm9sdW1lKVxuICAgIH1cblxuICAgIC8vVGltZXIgY2xhc3NcbiAgICBUaW1lcigpIHsvL0FkZGVkIHRoaXMgZm9yIHdoZW4gd2UgaW1wbGVtZW50IGEgcGF1c2UgZnVuY3Rpb24uXG4gICAgICAgIHRoaXMuZ2FtZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLm1heFN0ZXAgPSAwLjA1O1xuICAgICAgICB0aGlzLndhbGxMYXN0VGltZXN0YW1wID0gMDtcbiAgICAgICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgICAgICAgIHZhciB3YWxsQ3VycmVudCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB2YXIgd2FsbERlbHRhID0gKHdhbGxDdXJyZW50IC0gdGhpcy53YWxsTGFzdFRpbWVzdGFtcCkgLyAxMDAwO1xuICAgICAgICAgICAgdGhpcy53YWxsTGFzdFRpbWVzdGFtcCA9IHdhbGxDdXJyZW50O1xuXG4gICAgICAgICAgICB2YXIgZ2FtZURlbHRhID0gTWF0aC5taW4od2FsbERlbHRhLCB0aGlzLm1heFN0ZXApO1xuICAgICAgICAgICAgdGhpcy5nYW1lVGltZSArPSBnYW1lRGVsdGE7XG4gICAgICAgICAgICByZXR1cm4gZ2FtZURlbHRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBJbnB1dCBoYW5kbGluZywgaW5pdGlhbGl6ZXMgbGlzdGVuZXJzXG4gICAgKi9cbiAgICBzdGFydElucHV0ICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGlucHV0Jyk7XG5cbiAgICAgICAgdGhpcy5jdHguY2FudmFzLnRhYkluZGV4ID0gMDs7XG5cbiAgICAgICAgbGV0IGdldFhhbmRZID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGxldCB4ID0gZS5jbGllbnRYIC0gdGhhdC5jdHguY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgICAgICBsZXQgeSA9IGUuY2xpZW50WSAtIHRoYXQuY3R4LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgICAgICAgIGlmICh4IDwgMTAyNCkge1xuICAgICAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHggLyAzMik7XG4gICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoeSAvIDMyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgICAgIC8vIGNvbnRyb2wgZXZlbnQgbGlzdGVuZXJzIGdvIGhlcmVcbiAgICAgICAgbGV0IG1hcCA9IHt9O1xuXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpID09PSAnICcpIHRoYXQuc3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCF0aGF0LmNvbnRyb2xLZXlzLmhhc093blByb3BlcnR5KGUuY29kZSkpIHsgdGhhdC5jb250cm9sS2V5c1tlLmNvZGVdID0ge1wiYWN0aXZlXCI6IHRydWV9OyB9XG4gICAgICAgICAgICBpZiAodGhhdC5jb250cm9sS2V5c1tlLmNvZGVdLmFjdGl2ZSA9PSBmYWxzZSkgeyB0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0uYWN0aXZlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7ZS5jb2RlfSBpcyAke3RoYXQuY29udHJvbHNbZS5jb2RlXS5hY3RpdmV9YCk7XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgXHRpZiAoIXRoYXQuY29udHJvbEtleXMuaGFzT3duUHJvcGVydHkoZS5jb2RlKSkgeyB0aGF0LmNvbnRyb2xLZXlzW2UuY29kZV0gPSB7XCJhY3RpdmVcIjogZmFsc2V9OyB9XG4gICAgICAgICAgICBpZiAodGhhdC5jb250cm9sS2V5c1tlLmNvZGVdLmFjdGl2ZSA9PSB0cnVlKSB7IHRoYXQuY29udHJvbEtleXNbZS5jb2RlXS5hY3RpdmUgPSBmYWxzZSB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtlLmNvZGV9IGlzICR7dGhhdC5jb250cm9sc1tlLmNvZGVdLmFjdGl2ZX1gKTtcblxuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ0lucHV0IHN0YXJ0ZWQnKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBnYW1lXG4gICAgKi9cbiAgICBhZGRFbnRpdHkgKGVudGl0eSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdhZGRlZCBlbnRpdHknKTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkLnN0YXRlcy5sb2FkaW5nTGV2ZWwgfHwgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICBlbnRpdHkubGV2ZWwgPSB0aGlzLmdhbWVib2FyZC5sZXZlbE51bTtcbiAgICAgICAgICAgIGVudGl0eS5zZWN0aW9uID0gdGhpcy5nYW1lYm9hcmQubGV2ZWwuc2VjdGlvbk51bTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICB9XG5cbiAgICBhZGRCYWNrZ3JvdW5kTGF5ZXIgKGxheWVyKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZExheWVycy5wdXNoKGxheWVyKTtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgRHJhd3MgYWxsIGVudGl0aWVzIGluIHRoZSBsaXN0XG4gICAgKi9cblxuICAgIGRyYXcgKGRyYXdDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmFja2dyb3VuZExheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy9EcmF3IHRoZSBjYW1lcmEgYW5kIGh1ZCBmaXJzdFxuXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnNbaV0uZHJhdyh0aGlzLmN0eCk7XG5cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vLy9EcmF3IG9ubHkgdGVycmFpbiB0aGF0IGlzIHdpdGhpbiB0aGUgY2FudmFzIHZpZXcgKG51bWJlcnMgYXJlIG5lZ2F0aXZlIGJlY2F1c2UgdGhlIGNhbWVyYSBpcyB3ZWlyZCBsaWtlIHRoYXQuXG4gICAgICAgICAgICAvLy8vcG9zdGl2ZSBudW1iZXJzIHdvdWxkIHNjcmV3IHRoZSB0cmFuc2xhdGUgcHJvY2VzcylcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLnR5cGUgPT09IFwiVGVycmFpblwiKSB7XG4gICAgICAgICAgICAgICAgaWYoKC10aGlzLmVudGl0aWVzW2ldLnggLSB0aGlzLmVudGl0aWVzW2ldLmJvdW5kV2lkdGggPCB0aGlzLmVudGl0aWVzWzBdLnhWaWV3IFxuICAgICAgICAgICAgICAgICYmIC10aGlzLmVudGl0aWVzW2ldLnggPiB0aGlzLmVudGl0aWVzWzBdLnhWaWV3IC0gdGhpcy5jdHguY2FudmFzLndpZHRoIFxuICAgICAgICAgICAgICAgICYmIC10aGlzLmVudGl0aWVzW2ldLnkgLSB0aGlzLmVudGl0aWVzW2ldLmJvdW5kSGVpZ2h0PCB0aGlzLmVudGl0aWVzWzBdLnlWaWV3IFxuICAgICAgICAgICAgICAgICYmIC10aGlzLmVudGl0aWVzW2ldLnkgPiB0aGlzLmVudGl0aWVzWzBdLnlWaWV3IC0gdGhpcy5jdHguY2FudmFzLmhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzW2ldLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhdXNlZCB8fCB0aGlzLmVudGl0aWVzW2ldLm5hbWUgPT09IFwiQ2FtZXJhXCIpIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzW2ldLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNXB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjZTVlNWU1XCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiVW5pdmVyc2FsIENvbnRyb2xzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgNDBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJSdW4gbGVmdDogU1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUnVuIHJpZ2h0OiBEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDEyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiRW5lcmdpemU6IFdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMTYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJKdW1wOiBTcGFjZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAyMDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIk5vcm1hbCBEaWZmaWN1bHR5IChkZWZhdWx0KTogWVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlR2VuZXJhbCArIDI0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiVG91Z2ggRGlmZmljdWx0eSAobm90IGRlZmF1bHQpOiBUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMjgwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJHb2QgTW9kZSBUb2dnbGUgKGZvciBjaGVhdGVycyk6IEdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAzMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkFiaWxpdGllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUG93ZXIgU2hvdDogRW5lcmdpemUgKyBTaG9vdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU3dvcmQgQmxhc3Q6IEVuZXJnaXplICsgU2xhc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgMTIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJSZWZsZWN0OiBFbmVyZ2l6ZSArIENsZWF2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyAxNjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkxheW91dCBBIChOdW1wYWQgOSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAyMDBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJTaG9vdDogTnVtcGFkIDRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMjQwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJEYXNoOiBOdW1wYWQgMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAyODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlNsYXNoOiBOdW1wYWQgNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUxheW91dEEgKyAzMjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNsZWF2ZTogTnVtcGFkIDZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDEyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRBICsgMzYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJMYXlvdXQgQiAoUClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMjAwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU2hvb3Q6IEpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDU3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMjQwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJEYXNoOiBNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyA1NzUsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlTGF5b3V0QiArIDI4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiU2xhc2g6IEtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDU3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMzIwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDbGVhdmU6IExcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIDU3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VMYXlvdXRCICsgMzYwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDdXJyZW50IERpZmZpY3VsdHkgaXMgXCIgKyB0aGlzLmRpZmZpY3VsdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyAxMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUdlbmVyYWwgKyA0MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjIwcHggVmVyZGFuYVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIih0aGlzIGNhbiBiZSBjaGFuZ2VkIGF0IGFueSB0aW1lLCBpbmNsdWRpbmcgd2hpbGUgcGF1c2VkKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgMTEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VHZW5lcmFsICsgODBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCJJdGFsaWMgNDBweCBUaW1lcyBOZXcgUm9tYW5cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJUaGUgZm9yY2VzIG9mIGV2aWwgYXJlIHN0aWxsIGZpbmlzaGluZyBhcnJhbmdlbWVudHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIHRoaXMucGF1c2VGbGF2b3JYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclkgKyA4MFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwib24gdGhlIGV4cGFuc2lvbiBvZiB0aGVpciBkdW5nZW9ucyBhbmQgdGhyb25lIHJvb21zLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnhWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueVZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWSArIDEyMFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUHJlcGFyZSBmb3IgdGhlIGluZXZpdGFibGUgc2hvd2Rvd24gd2l0aCB0aGlzIHZpbGxpYW5vdXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS54VmlldyArIHRoaXMucGF1c2VGbGF2b3JYLFxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuY2FtZXJhLnlWaWV3ICsgdGhpcy5wYXVzZUZsYXZvclkgKyAxNjBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInNjdW0gYnkgdHJ5aW5nIHRvIGdldCBhcyBoaWdoIGEgc2NvcmUgYXMgcG9zc2libGUuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5jYW1lcmEueFZpZXcgKyB0aGlzLnBhdXNlRmxhdm9yWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLmNhbWVyYS55VmlldyArIHRoaXMucGF1c2VGbGF2b3JZICsgMjAwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgaWYgKGRyYXdDYWxsYmFjaykge1xuICAgICAgICAgICAgZHJhd0NhbGxiYWNrKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIFVwZGF0ZXMgYWxsIGVudGl0aWVzLCBjYWxscyB0aGVpciB1cGRhdGUgbWV0aG9kc1xuICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICBsZXQgZW50aXRpZXNDb3VudCA9IHRoaXMuZW50aXRpZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRpdGllc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkubGV2ZWwgPT09IHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtICYmIGVudGl0eS5zZWN0aW9uID09PSB0aGlzLmdhbWVib2FyZC5zZWN0aW9uTnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmFsdWVzIC0gbGV2ZWw6IFwiICsgdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW0gKyBcIiwgc2VjdGlvbjogXCIgKyB0aGlzLmdhbWVib2FyZC5zZWN0aW9uTnVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbnRpdHkgLSBsZXZlbDogXCIgKyBlbnRpdHkubGV2ZWwgKyBcIiwgc2VjdGlvbjogXCIgKyBlbnRpdHkuc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucmVtb3ZlRnJvbVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5wb2ludFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdhbWVib2FyZC5zdGF0ZXMubmV3TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eS5sZXZlbCA9PT0gdGhpcy5nYW1lYm9hcmQubGV2ZWxOdW0gfHwgZW50aXR5Lm5hbWUgPT09IFwiVGVycmFpblwiIHx8IGVudGl0eS5uYW1lID09PSBcIkhlcm9cIiB8fCBlbnRpdHkubmFtZSA9PT0gXCJIVURcIiB8fCBlbnRpdHkubmFtZSA9PT0gXCJQb3J0YWxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInZhbHVlcyAtIGxldmVsOiBcIiArIHRoaXMuZ2FtZWJvYXJkLmxldmVsTnVtICsgXCIsIHNlY3Rpb246IFwiICsgdGhpcy5nYW1lYm9hcmQuc2VjdGlvbk51bSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW50aXR5IC0gbGV2ZWw6IFwiICsgZW50aXR5LmxldmVsICsgXCIsIHNlY3Rpb246IFwiICsgZW50aXR5LnNlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnJlbW92ZUZyb21Xb3JsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucG9pbnRWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlbnRpdHkucmVtb3ZlRnJvbVdvcmxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnJlc3Bhd25TZWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lYm9hcmQuc3RhdGVzLm5ld0xldmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLm5ld0xldmVsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLmxvYWROZXh0TGV2ZWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1RPRE8gTW92ZSBpbnRvIGZpcnN0IHVwZGF0ZSgpIGZvciBsb29wP1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuZW50aXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS5yZW1vdmVGcm9tV29ybGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0uaGFzT3duUHJvcGVydHkoXCJwb2ludFZhbHVlXCIpICYmICF0aGlzLmdhbWVib2FyZC5zdGF0ZXMucmVzcGF3blNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLnBvaW50VmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPIFJlZmFjdG9yIGhlcm8gbXVsdGlwbGllciBhbmQgZGlmZmljdWx0eSB0byBnYW1lYm9hcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnNob3dQb2ludFZhbHVlcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5nYW1lYm9hcmQuc3RhdGVzLnNob3dQb2ludFZhbHVlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5nYW1lYm9hcmQucHZ0ID0gdGhpcy5nYW1lYm9hcmQucHZ0dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZGVkcG9pbnRzID0gdGhpcy5oZXJvLmRpZmZpY3VsdHkgKiB0aGlzLmVudGl0aWVzW2ldLnBvaW50VmFsdWUgKiB0aGlzLmhlcm8ubXVsdGlwbGllcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVib2FyZC5kZWFkRW5lbWllcy5wdXNoKFtbdGhpcy5lbnRpdGllc1tpXS54LCB0aGlzLmVudGl0aWVzW2ldLnldLCB0aGlzLmFkZGVkcG9pbnRzLCAzMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnNjb3JlICs9IHRoaXMuYWRkZWRwb2ludHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvLm11bHRpcGxpZXIgKz0gdGhpcy5oZXJvLmRpZmZpY3VsdHkgKiAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLmVudGl0aWVzW2ldO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3RoZXIgPSB0aGlzLmVudGl0aWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHByZXZlbnRzIGVhY2ggcGllY2Ugb2YgdGVycmFpbiBmcm9tIGNoZWNraW5nIGNvbGxpc2lvbiwgY2F1c2luZyBzbG93ZG93blxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5LnR5cGUgPT09IFwiVGVycmFpblwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3RoZXIudHlwZSA9PT0gXCJUZXJyYWluXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gTWF0aC5hYnMoZW50aXR5LnggLSBvdGhlci54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eSAhPSBvdGhlciAmJiBlbnRpdHkuaXNDb2xsaWRpbmcob3RoZXIpICE9ICdub25lJykgeyAvLy8gRC5wcm90b3R5cGUgPSBuZXcgQygpLCBsaW5rcyBDIHRvIHByb3RvdHlwZSBsaW5rYWdlIG9mIEQgT1IgcHV0IHByb3BlcnR5IFwic29tZXRoaW5nX3R5cGVcIiBvciB3aGF0ZXZlciBhbmQgY2hlY2sgZm9yIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGVudGl0eS5pc0NvbGxpZGluZyhvdGhlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5jb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbnRpdHkgIT0gb3RoZXIgJiYgZW50aXR5LmlzQ29sbGlkaW5nKG90aGVyKSAhPSAnbm9uZScpIHsgLy8vIEQucHJvdG90eXBlID0gbmV3IEMoKSwgbGlua3MgQyB0byBwcm90b3R5cGUgbGlua2FnZSBvZiBEIE9SIHB1dCBwcm9wZXJ0eSBcInNvbWV0aGluZ190eXBlXCIgb3Igd2hhdGV2ZXIgYW5kIGNoZWNrIGZvciB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gZW50aXR5LmlzQ29sbGlkaW5nKG90aGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5jb2xsaWRlZChvdGhlciwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtdXNpY1xuICAgICAgICBpZiAodGhpcy5tdXNpYy5jdXJyZW50VGltZSA+PSA2My45NSkge1xuICAgICAgICAgICAgdGhpcy5tdXNpYy5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLm11c2ljLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vUExBWUVSIFNFVFRJTkdTXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuZWFzeW1vZGVdLmFjdGl2ZSkge1xuICAgICAgICAgICAgLy9UT0RPIE1vdmUgZGlmZmljdWx0eSB0byBnYW1lYm9hcmRcbiAgICAgICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IFwiTm9ybWFsIChCdXQgS2luZGEgRWFzeSlcIjtcbiAgICAgICAgICAgIHRoaXMuaGVyby5kaWZmaWN1bHR5ID0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnNjb3JlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmhhcmRtb2RlXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IFwiVG91Z2hcIjtcbiAgICAgICAgICAgIHRoaXMuaGVyby5kaWZmaWN1bHR5ID0gMztcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnNjb3JlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLmxheW91dEFdLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IHRoaXMuY29udHJvbExheW91dEE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5sYXlvdXRCXS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xMYXlvdXRCO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMucGF1c2VdLmFjdGl2ZSAmJiB0aGlzLnBhdXNlVG9nZ2xlQ29vbGRvd24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gIXRoaXMucGF1c2VkO1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duID0gdGhpcy50b2dnbGVDb29sZG93bjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRvZ2dsZUNvb2xkb3duLS07XG4gICAgICAgIH1cbiAgICAgICAgLy9ERVYgVE9PTFNcbiAgICAgICAgaWYgKHRoaXMuZGV2TW9kZSAmJiAhdGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xLZXlzW3RoaXMuY29udHJvbHMuZ2V0UG9zXS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIng6IFwiICsgdGhpcy5oZXJvLnggKyBcIiwgeTogXCIgKyB0aGlzLmhlcm8ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnNldFBvc10uYWN0aXZlICYmIHRoaXMuc2V0UG9zVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zZXRQb3ModGhpcy5nYW1lYm9hcmQubGV2ZWwuY2hlY2twb2ludHNbdGhpcy5jaGVja3BvaW50Q3ljbGVDb3VudF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zVGltZXIgPSB0aGlzLnRvZ2dsZUNvb2xkb3duO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2twb2ludEN5Y2xlQ291bnQgPSAodGhpcy5jaGVja3BvaW50Q3ljbGVDb3VudCArIDEpICUgdGhpcy5nYW1lYm9hcmQubGV2ZWwuY2hlY2twb2ludHMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbEtleXNbdGhpcy5jb250cm9scy5nb2RUb2dnbGVdLmFjdGl2ZSAmJiB0aGlzLmdvZFRvZ2dsZVRpbWVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8uc3RhdGVzLmlzR29kID0gIXRoaXMuaGVyby5zdGF0ZXMuaXNHb2Q7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lciA9IHRoaXMudG9nZ2xlQ29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnRlc3RQb3NdLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zZXRQb3ModGhpcy5nYW1lYm9hcmQudGVzdFBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sS2V5c1t0aGlzLmNvbnRyb2xzLnRvZ2dsZUJveGVzXS5hY3RpdmUgJiYgdGhpcy5ib3hUb2dnbGVUaW1lciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Qm94ZXMgPSAhdGhpcy5kcmF3Qm94ZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3hUb2dnbGVUaW1lciA9IHRoaXMudG9nZ2xlQ29vbGRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1RvZ2dsZSB0aW1lcnMgKHNob3VsZCBmaW5hbGx5IGxlYXJuIGhvdyB0byB1c2UgYW4gXCJvbiBrZXl1cFwiIGZvciBrZXlzKVxuICAgICAgICAgICAgaWYgKHRoaXMuYm94VG9nZ2xlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3hUb2dnbGVUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0UG9zVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ29kVG9nZ2xlVGltZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2RUb2dnbGVUaW1lci0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhY2tncm91bmQoZHJhd0NhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmN0eC5jYW52YXMud2lkdGgsIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iYWNrZ3JvdW5kTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL0RyYXcgdGhlIGNhbWVyYSBhbmQgaHVkIGZpcnN0XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRMYXllcnNbaV0uZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRyYXdDYWxsYmFjaykge1xuICAgICAgICAgICAgZHJhd0NhbGxiYWNrKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIERlZmluZXMgdGhlIGdhbWUgbG9vcFxuICAgICovXG4gICAgbG9vcCAoKSB7XG4gICAgICAgIHRoaXMuY3R4LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMuY3R4LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgdGhpcy5jbGljayA9IG51bGw7XG4gICAgICAgIHRoaXMud2hlZWwgPSBudWxsO1xuICAgIH1cblxufSAvLyBlbmQgb2YgR2FtZUVuZ2luZVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lRW5naW5lO1xuIiwiaW1wb3J0IEFzc2V0TWFuYWdlciBmcm9tIFwiLi9hc3NldC1tYW5hZ2VyXCJcblxuXG5jbGFzcyBIdWQge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKSB7XG4gICAgICAgIHRoaXMuaW1nID0gaW1nO1xuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5oZWFsdGhiYXIgPSBuZXcgSGVhbHRoQmFyKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSk7XG4gICAgICAgIHRoaXMuZW5lcmd5YmFyID0gbmV3IEVuZXJneUJhcihnYW1lX2VuZ2luZSwgaW1nLCBoZXJvLCBzcmNfY29vcmRpbmF0ZXMsIHNyY19kaW1lbnNpb25zLCBkZXN0X2Nvb3JkaW5hdGVzLCBzY2FsZT0zLCBjYW1lcmEpO1xuICAgICAgICB0aGlzLnNjb3JlYm9hcmQgPSBuZXcgU2NvcmVCb2FyZChnYW1lX2VuZ2luZSwgZGVzdF9jb29yZGluYXRlcywgc2NhbGUsIGNhbWVyYSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFt0aGlzLmhlYWx0aGJhciwgdGhpcy5lbmVyZ3liYXIsIHRoaXMuc2NvcmVib2FyZF07XG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wMSA9IDA7XG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wMiA9IDE7XG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wMyA9IDI7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tpXS5kcmF3KGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNDb2xsaWRpbmcoKSB7fVxuICAgIGNvbGxpZGVkKCkge31cblxufVxuXG5cbmNsYXNzIFNjb3JlQm9hcmQge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMsIGNhbWVyYSkge1xuICAgICAgICB0aGlzLnNjb3JlID0gZ2FtZV9lbmdpbmUuZ2FtZWJvYXJkLnNjb3JlO1xuICAgICAgICB0aGlzLmdhbWVfZW5naW5lID0gZ2FtZV9lbmdpbmU7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBkZXN0X2Nvb3JkaW5hdGVzO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5nYW1lX2VuZ2luZS5nYW1lYm9hcmQuc2NvcmUpO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gWy10aGlzLmNhbWVyYS54VmlldyArIDIwMCwgLXRoaXMuY2FtZXJhLnlWaWV3ICsgMTAwXVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5mb250ID0gXCJpdGFsaWMgYm9sZCAyNXB4IFZlcmRhbmFcIiA7XG4gICAgICAgIHZhciBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCh0aGlzLmRlc3RfY29vcmRzWzBdIC0gMTAwLCB0aGlzLmRlc3RfY29vcmRzWzFdIC0gMTAsIHRoaXMuZGVzdF9jb29yZHNbMF0sIHRoaXMuZGVzdF9jb29yZHNbMV0gLSAxMCk7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLFwibWFnZW50YVwiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKC41ICxcImJsdWVcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxICxcImdyZWVuXCIpO1xuICAgICAgICAvLyBGaWxsIHdpdGggZ3JhZGllbnRcbiAgICAgICAgY3R4LmZpbGxTdHlsZT1ncmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiU2NvcmU6IFwiICsgdGhpcy5zY29yZSxcbiAgICAgICAgICAgIHRoaXMuZGVzdF9jb29yZHNbMF0gLSAxMDAsIFxuICAgICAgICAgICAgdGhpcy5kZXN0X2Nvb3Jkc1sxXSAtIDEwXG4gICAgICAgICk7XG4gICAgICAgIC8vaWYgKHRoaXMuZ2FtZV9lbmdpbmUuZ2FtZWJvYXJkLnN0YXRlcy5zaG93UG9pbnRWYWx1ZXMpIHtcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJkcmF3XCIpXG4gICAgICAgIC8vICAgIGN0eC5mb250ID0gXCIyMHB4IFZlcmRhbmFcIjtcbiAgICAgICAgLy8gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwZmYwMFwiO1xuICAgICAgICAvLyAgICBjdHguZmlsbFRleHQoXCIrXCIgKyB0aGlzLmdhbWVfZW5naW5lLmFkZGVkcG9pbnRzICsgXCIgcG9pbnRzXCIsXG4gICAgICAgIC8vICAgICAgICB0aGlzLmdhbWVfZW5naW5lLmhlcm8ueCArIDEwLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5nYW1lX2VuZ2luZS5oZXJvLnkgLSAxNTBcbiAgICAgICAgLy8gICAgKTtcbiAgICAgICAgLy99XG4gICAgfVxufVxuXG5cbi8qXG4gICAgUmVzb3VyY2VCYXIgc3VwZXJjbGFzc1xuKi9cbmNsYXNzIFJlc291cmNlQmFyIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMpIHtcbiAgICAgICAgdGhpcy5nYW1lX2VuZ2luZSA9IGdhbWVfZW5naW5lO1xuICAgICAgICB0aGlzLmhlcm8gPSBoZXJvO1xuICAgICAgICB0aGlzLmltZyA9IGltZztcbiAgICAgICAgdGhpcy5zcmNfY29vcmRzID0gc3JjX2Nvb3JkaW5hdGVzO1xuICAgICAgICB0aGlzLnNyY19kaW1zID0gc3JjX2RpbWVuc2lvbnM7XG4gICAgICAgIHRoaXMuZGVzdF9jb29yZHMgPSBkZXN0X2Nvb3JkaW5hdGVzO1xuICAgICAgICAvLyB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgbGFzdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXJ0ID0gdGhpcy5wYXJ0c1tpXVxuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5ID0gbGFzdHkgKyBwYXJ0W1wic3JjX2hlaWdodFwiXTsgLy8gdGhpcyBjYXVzZXMgZWFjaCBzZWdtZW50IHRvIGJlIGRyYXduIHZlcnRpY2FsbHkgb24gdG9wIG9mIHRoZSBsYXN0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBzcmNfY29vcmRzLCBzcmNfZGltcywgZGVzdF94X29mZnNldD0wLCBkZXN0X3lfb2Zmc2V0PTApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgXCJpbWdcIjogaW1nLFxuICAgICAgICAgICAgICAgIFwic3JjX3hcIjogc3JjX2Nvb3Jkc1swXSxcbiAgICAgICAgICAgICAgICBcInNyY195XCI6IHNyY19jb29yZHNbMV0sXG4gICAgICAgICAgICAgICAgXCJzcmNfd2lkdGhcIjogc3JjX2RpbXNbMF0sXG4gICAgICAgICAgICAgICAgXCJzcmNfaGVpZ2h0XCI6IHNyY19kaW1zWzFdLFxuICAgICAgICAgICAgICAgIFwiZGVzdF94X29mZnNldFwiOiBkZXN0X3hfb2Zmc2V0LFxuICAgICAgICAgICAgICAgIFwiZGVzdF95X29mZnNldFwiOiBkZXN0X3lfb2Zmc2V0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgLy8gdGhpcy5kZXN0X3ggPSBkZXN0X2Nvb3Jkc1swXVxuICAgICAgICAgICAvLyB0aGlzLmRlc3RfeSA9IGRlc3RfY29vcmRzWzFdXG4gICAgICAgICAgIC8vIHRoaXMuZGVzdF93aWR0aCA9IGRlc3RfZGltZW5zaW9uc1swXVxuICAgICAgICAgICAvLyB0aGlzLmRlc3RfaGVpZ2h0ID0gZGVzdF9kaW1lbnNpb25zWzFdXG4gICAgfVxufVxuXG5cbi8qXG4gICAgUHJvdmlkZXMgYSBoZWFsdGggYmFyIGZvciB0aGUgSGVyby5cbiAgICBDb25zdHJ1Y3RlZCBvZiByZXNvdXJjZUJhclNlZ21lbnRzLCBkZWZpbmVkIGluIFJlc291cmNlQmFyLlxuICAgIEhlYWx0aCBncm93cyB1cHdhcmQuXG4qL1xuY2xhc3MgSGVhbHRoQmFyIGV4dGVuZHMgUmVzb3VyY2VCYXIge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKSB7XG4gICAgICAgIHN1cGVyKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMpO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlcm8uaGVhbHRoOyAvLyBoYXMgcm9vbSBmb3IgNiB0aWNrc1xuICAgICAgICB0aGlzLndpZHRoID0gMTQ7IC8vIHRoZSBwaXhlbCBhcnQgd2lkdGhcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cbiAgICAgICAgLy8gYmFyIHNlZ21lbnRzXG4gICAgICAgIHRoaXMudG9wID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLCBcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19kaW1lbnNpb25zWzFdICsgMF0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgM10pO1xuICAgICAgICB0aGlzLm1pZGRsZTEgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsIFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUyID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGUzID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU0ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5taWRkbGU1ID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgM10sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgMTRdKTtcbiAgICAgICAgdGhpcy5ib3R0b20gPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsIFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTldLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE4XSk7XG4gICAgICAgIHRoaXMudGljayA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZywgXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdICsgMywgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTZdLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgtNywgM10sXG4gICAgICAgICAgICA5LCAxMSk7XG4gICAgICAgIHRoaXMucGFydHMgPSBbdGhpcy50b3AsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlkZGxlMSwgdGhpcy5taWRkbGUyLCB0aGlzLm1pZGRsZTMsIHRoaXMubWlkZGxlNCwgdGhpcy5taWRkbGU1LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbV1cblxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGxldCBsYXN0eSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhcnQgPSB0aGlzLnBhcnRzW2ldXG4gICAgICAgICAgICB0aGlzLmRyYXdQYXJ0KGN0eCwgcGFydCwgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgPSBsYXN0eSArIHBhcnRbXCJzcmNfaGVpZ2h0XCJdOyAvLyB0aGlzIGNhdXNlcyBlYWNoIHNlZ21lbnQgdG8gYmUgZHJhd24gdmVydGljYWxseSBvbiB0b3Agb2YgdGhlIGxhc3RcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3R5IC09IHRoaXMuYm90dG9tW1wic3JjX2hlaWdodFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuaGVhbHRoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdQYXJ0KGN0eCwgdGhpcy50aWNrLCBsYXN0eSk7XG4gICAgICAgICAgICBsYXN0eSAtPSAyIC8vIHRoaXMgY2F1c2VzIGhlYWx0aCB0byBncm93IHVwd2FyZCBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdQYXJ0KGN0eCwgcGFydCwgbGFzdHkpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZyxcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfeFwiXSwgcGFydFtcInNyY195XCJdLCAvLyBzcmMgeCwgeVxuICAgICAgICAgICAgcGFydFtcInNyY193aWR0aFwiXSwgcGFydFtcInNyY19oZWlnaHRcIl0sIC8vIHNyYyB3aWR0aCwgaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmRlc3RfY29vcmRzWzBdICsgcGFydFtcImRlc3RfeF9vZmZzZXRcIl0sIHRoaXMuZGVzdF9jb29yZHNbMV0gKyAobGFzdHkgKiB0aGlzLnNjYWxlKSAtIHBhcnRbXCJkZXN0X3lfb2Zmc2V0XCJdLCAvLyBkZXN0IHgsIHlcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfd2lkdGhcIl0gKiB0aGlzLnNjYWxlLCBwYXJ0W1wic3JjX2hlaWdodFwiXSAqIHRoaXMuc2NhbGUsIC8vIGRlc3Qgd2lkdGgsIGhlaWdodFxuICAgICAgICApIFxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLmhlcm8uaGVhbHRoO1xuICAgICAgICB0aGlzLmRlc3RfY29vcmRzID0gWy10aGlzLmNhbWVyYS54VmlldyArIDEwMCwgLXRoaXMuY2FtZXJhLnlWaWV3ICsgMTAwXVxuICAgIH1cbiAgICBpc0NvbGxpZGluZygpIHt9XG4gICAgY29sbGlkZWQoKSB7fVxuXG59XG5cblxuLypcbiAgICBQcm92aWRlcyBhbiBlbmVyZ3kgYmFyIGZvciB0aGUgSGVyby5cbiAgICBDb25zdHJ1Y3RlZCBvZiByZXNvdXJjZUJhclNlZ21lbnRzLCBkZWZpbmVkIGluIFJlc291cmNlQmFyLlxuICAgIEVuZXJneSBncm93cyB1cHdhcmQuXG4qL1xuY2xhc3MgRW5lcmd5QmFyIGV4dGVuZHMgUmVzb3VyY2VCYXIge1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZV9lbmdpbmUsIGltZywgaGVybywgc3JjX2Nvb3JkaW5hdGVzLCBzcmNfZGltZW5zaW9ucywgZGVzdF9jb29yZGluYXRlcywgc2NhbGU9MywgY2FtZXJhKSB7XG4gICAgICAgIHN1cGVyKGdhbWVfZW5naW5lLCBpbWcsIGhlcm8sIHNyY19jb29yZGluYXRlcywgc3JjX2RpbWVuc2lvbnMsIGRlc3RfY29vcmRpbmF0ZXMsIHNjYWxlPTMpO1xuICAgICAgICB0aGlzLmVuZXJneSA9IGhlcm8uZW5lcmd5OyAvLyBoYXMgcm9vbSBmb3IgNiB0aWNrc1xuICAgICAgICB0aGlzLndpZHRoID0gMTQ7IC8vIHRoZSBwaXhlbCBhcnQgd2lkdGhcbiAgICAgICAgdGhpcy5oZXJvID0gaGVybztcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIHNyY19jb29yZGluYXRlcyA9IFtzcmNfY29vcmRpbmF0ZXNbMF0gKyAxNSwgc3JjX2Nvb3JkaW5hdGVzWzFdXVxuXG4gICAgICAgIC8vIGJhciBzZWdtZW50c1xuICAgICAgICB0aGlzLnRvcCA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0sIHNyY19kaW1lbnNpb25zWzFdICsgMF0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCwgM10pO1xuICAgICAgICB0aGlzLm1pZGRsZTEgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTIgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTMgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTQgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuICAgICAgICB0aGlzLm1pZGRsZTUgPSB0aGlzLnJlc291cmNlQmFyU2VnbWVudChpbWcsXG4gICAgICAgICAgICBbc3JjX2Nvb3JkaW5hdGVzWzBdLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAzXSxcbiAgICAgICAgICAgIFt0aGlzLndpZHRoLCAxNF0pO1xuXG4gICAgICAgIHRoaXMuYm90dG9tID0gdGhpcy5yZXNvdXJjZUJhclNlZ21lbnQoaW1nLFxuICAgICAgICAgICAgW3NyY19jb29yZGluYXRlc1swXSwgc3JjX2Nvb3JkaW5hdGVzWzFdICsgMTldLFxuICAgICAgICAgICAgW3RoaXMud2lkdGgsIDE4XSk7XG4gICAgICAgIHRoaXMudGljayA9IHRoaXMucmVzb3VyY2VCYXJTZWdtZW50KGltZyxcbiAgICAgICAgICAgIFtzcmNfY29vcmRpbmF0ZXNbMF0gKyAzLCBzcmNfY29vcmRpbmF0ZXNbMV0gKyAxNl0sXG4gICAgICAgICAgICBbdGhpcy53aWR0aCAtIDcsIDNdLFxuICAgICAgICAgICAgOSwgMTEpO1xuICAgICAgICB0aGlzLnBhcnRzID0gW3RoaXMudG9wLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZGRsZTEsIHRoaXMubWlkZGxlMiwgdGhpcy5taWRkbGUzLCB0aGlzLm1pZGRsZTQsIHRoaXMubWlkZGxlNSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3R0b21dXG5cbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgbGFzdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXJ0ID0gdGhpcy5wYXJ0c1tpXVxuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KTtcbiAgICAgICAgICAgIGxhc3R5ID0gbGFzdHkgKyBwYXJ0W1wic3JjX2hlaWdodFwiXTsgLy8gdGhpcyBjYXVzZXMgZWFjaCBzZWdtZW50IHRvIGJlIGRyYXduIHZlcnRpY2FsbHkgb24gdG9wIG9mIHRoZSBsYXN0XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0eSAtPSB0aGlzLmJvdHRvbVtcInNyY19oZWlnaHRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmVuZXJneTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UGFydChjdHgsIHRoaXMudGljaywgbGFzdHkpO1xuICAgICAgICAgICAgbGFzdHkgLT0gMiAvLyB0aGlzIGNhdXNlcyBlbmVyZ3kgdG8gZ3JvdyB1cHdhcmQgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3UGFydChjdHgsIHBhcnQsIGxhc3R5KSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsXG4gICAgICAgICAgICBwYXJ0W1wic3JjX3hcIl0sIHBhcnRbXCJzcmNfeVwiXSwgLy8gc3JjIHgsIHlcbiAgICAgICAgICAgIHBhcnRbXCJzcmNfd2lkdGhcIl0sIHBhcnRbXCJzcmNfaGVpZ2h0XCJdLCAvLyBzcmMgd2lkdGgsIGhlaWdodFxuICAgICAgICAgICAgdGhpcy5kZXN0X2Nvb3Jkc1swXSArIHBhcnRbXCJkZXN0X3hfb2Zmc2V0XCJdLCB0aGlzLmRlc3RfY29vcmRzWzFdICsgKGxhc3R5ICogdGhpcy5zY2FsZSkgLSBwYXJ0W1wiZGVzdF95X29mZnNldFwiXSwgLy8gZGVzdCB4LCB5XG4gICAgICAgICAgICBwYXJ0W1wic3JjX3dpZHRoXCJdICogdGhpcy5zY2FsZSwgcGFydFtcInNyY19oZWlnaHRcIl0gKiB0aGlzLnNjYWxlLCAvLyBkZXN0IHdpZHRoLCBoZWlnaHRcbiAgICAgICAgKSBcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuZW5lcmd5ID0gdGhpcy5oZXJvLmVuZXJneTtcbiAgICAgICAgdGhpcy5kZXN0X2Nvb3JkcyA9IFstdGhpcy5jYW1lcmEueFZpZXcgKyAxNTAsIC10aGlzLmNhbWVyYS55VmlldyArIDEwMF1cbiAgICB9XG4gICAgaXNDb2xsaWRpbmcoKSB7fVxuICAgIGNvbGxpZGVkKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHVkOyIsImltcG9ydCBDb3JlIGZyb20gXCIuL2NvcmVcIlxuXG53aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgvKiBmdW5jdGlvbiAqLyBjYWxsYmFjaywgLyogRE9NRWxlbWVudCAqLyBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9O1xufSkoKTtcblxuQ29yZS5pbml0KClcbiIsImNsYXNzIFNvdW5kIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNvdW5kcyA9IHtcbiAgICAgICAgICAgIFwiaGVyb19odXJ0XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZHNvb2Yud2F2XCIpLFxuICAgICAgICAgICAgXCJoZXJvX3Nob290XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vaGVyby1zaG9vdC53YXZcIiksXG4gICAgICAgICAgICBcImVuZW15X3Nob290XCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vc2hvb3QtMS53YXZcIiksXG4gICAgICAgICAgICBcImFycm93X2ZpcmVcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9BcnJvdy1GaXJlLndhdlwiKSxcbiAgICAgICAgICAgIFwiY3Jvd19jYXdcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9jcm93LWNhdy53YXZcIiksXG4gICAgICAgICAgICBcImVuZW15X2h1cnRfMVwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2VuZW15LWh1cnQtMS53YXZcIiksXG4gICAgICAgICAgICBcImVuZXJneV9sYXVuY2hlclwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL2VuZXJneS1sYXVuY2hlci53YXZcIiksXG4gICAgICAgICAgICBcImV4cGxvc2lvbl8xXCI6IG5ldyBBdWRpbyhcIi4vYXVkaW8vZXhwbG9zaW9uLTEud2F2XCIpLFxuICAgICAgICAgICAgXCJsYXZhX2JhbGxcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9sYXZhLWJhbGwud2F2XCIpLFxuICAgICAgICAgICAgXCJzaGllbGRfYmxvY2tcIjogbmV3IEF1ZGlvKFwiLi9hdWRpby9zaGllbGQtYmxvY2sud2F2XCIpLFxuICAgICAgICAgICAgXCJzd29yZF9zd2luZ1wiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL3N3b3JkLXN3aW5nLndhdlwiKSxcbiAgICAgICAgICAgIFwib3V0X29mX2VuZXJneVwiOiBuZXcgQXVkaW8oXCIuL2F1ZGlvL29vZS53YXZcIiksXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbl9kdXBzID0gNVxuICAgICAgICBmb3IgKHZhciBzb3VuZCBpbiB0aGlzLnNvdW5kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc291bmRzLmhhc093blByb3BlcnR5KHNvdW5kKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50XCI6IDAsXG4gICAgICAgICAgICAgICAgICAgIFwibWF4XCI6IG5fZHVwcyxcbiAgICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjogdGhpcy5tYWtlX2R1cGxpY2F0ZXMoc291bmQsIG5fZHVwcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIFJldHVybnMgYSBsaXN0IG9mIG5fZHVwIGR1cGxpY2F0ZWQgQXVkaW8gb2JqZWN0cyAqL1xuICAgIG1ha2VfZHVwbGljYXRlcyhzb3VuZCwgbl9kdXA9NSkge1xuICAgICAgICBsZXQgY3Vycl9zb3VuZCA9IHRoaXMuc291bmRzW3NvdW5kXVxuICAgICAgICBsZXQgc291bmRfbGlzdCA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG5fZHVwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjbG9uZSA9IGN1cnJfc291bmQuY2xvbmVOb2RlKClcbiAgICAgICAgICAgIHNvdW5kX2xpc3QucHVzaChjbG9uZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc291bmRfbGlzdFxuICAgIH1cblxuXG4gICAgLyogcGxheXMgYSBzb3VuZCAqL1xuICAgIHBsYXkoc291bmQsIHZvbHVtZT0wLjUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zb3VuZHNbc291bmRdW1wiY3VycmVudFwiXVxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5zb3VuZHNbc291bmRdW1wibWF4XCJdLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcImN1cnJlbnRcIl0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXhdLmVuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXgrMV0uY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXgrMV0udm9sdW1lID0gdm9sdW1lXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXgrMV0ucGxheSgpXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJjdXJyZW50XCJdICs9IDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzW3NvdW5kXVtcInNvdW5kc1wiXVtpbmRleF0uY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tzb3VuZF1bXCJzb3VuZHNcIl1baW5kZXhdLnZvbHVtZSA9IHZvbHVtZVxuICAgICAgICAgICAgdGhpcy5zb3VuZHNbc291bmRdW1wic291bmRzXCJdW2luZGV4XS5wbGF5KClcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291bmQ7Il0sInNvdXJjZVJvb3QiOiIifQ==