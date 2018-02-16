
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
        "entity": "entities/entity",
        "hero": "entities/hero",
    	"leo": "entities/leo",
    	"flames": "entities/flames",
    	"solider": "entities/soldier",
    	"terrain" : "entities/terrain",
    	"level-one": "maps/level-one",
        "text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
        "testmap": "text!https://www.dropbox.com/s/1qwcfo8qt8by4w7/testmap.txt?dl=1"
    },


});


require(['core'], function(Core) {
    Core.init();
});