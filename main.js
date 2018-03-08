
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

require.config({
    paths: {
        "actor": "entities/actor",
        "animation": "animation",
        "game-board": "entities/game-board",
        "camera": "entities/camera",
        "hud": "hud",
        "entity": "entities/entity",
    	"terrain" : "entities/terrain",
        "levels": "maps/levels",
        "hero": "entities/hero",
        "projectile": "entities/projectile",
        "projectile-sword": "entities/projectile-sword",
        "leo": "entities/leo",
        "flames": "entities/flames",
        "soldier-shield": "entities/soldier-shield",
        "crow": "entities/crow",
        "dino": "entities/dino",
        "bullet": "entities/bullet",
        "rocket": "entities/rocket",
        "shotblast": "entities/shotblast",
        "enemy": "entities/enemy",
        "hurtbox": "entities/hurtbox",
        "item": "entities/items/item",
        "bomb": "entities/bomb",
        "hand": "entities/hand",
        "background": "background",
        "hazards": "entities/hazards",
        "fireball": "entities/fireball",
        "sound": "sound"
    },
});


require(['core'], function(Core) {
    Core.init();
});