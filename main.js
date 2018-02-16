
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
        "hud": "hud",

        "entity": "entities/entity",

    	"terrain" : "entities/terrain",
    	"level-one": "maps/level-one",

        "hero": "entities/hero",
        "projectile": "entities/projectile",
        "projectile-sword": "entities/projectile-sword",
        "leo": "entities/leo",
        "flames": "entities/flames",
        "solider": "entities/soldier",
        "soldier-shield": "entities/soldier-shield",
        "crow": "entities/crow",
        "dino": "entities/dino",
        "bullet": "entities/bullet",
        "shotblast": "entities/shotblast",
    },


});


require(['core'], function(Core) {
    Core.init();
});