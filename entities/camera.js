define([
    'entity',
],function(
    Entity,
){


	/***********
    Camera Class
    This class controls where in the gameboard the camera is located, and where to draw.
    ************/
    class Camera extends Entity {
        draw(ctx) {}
    }


    return {
        "Camera": Camera,
    };
});