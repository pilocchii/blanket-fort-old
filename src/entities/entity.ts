import {Animation} from "../engine"
import * as C from "../util/const.json"

/***********
Entity class

game - a reference to the game in which this entity exists
x, y - entity's coordinates
removeFromWorld - a flag that denotes when to remove this entity from the game
************/
class Entity {

    x?: number;
    y?: number;
    img?: any;
    ctx?: any;
    level?: any;
    section?: any;
    parentClass?: string;
    type?: string;
    gravity?: number;
    removeFromWorld?: boolean;

    boundX?: number; 
    boundY?: number;
    lastBoundY?: number;
    boundWidth?: number;
    boundHeight?: number;

    name: any;
    game: any;

    constructor (game: any, { 

        x = 0,
        y = 0,
        img = null,
        ctx = null,
        level = null,
        section = null,
        parentClass = null,
        type = null,
        gravity = C.gameSettings.gravity,
        removeFromWorld = false,

        boundX = null,  
        boundY = null,
        lastBoundY = null,
        boundWidth = null,
        boundHeight = null

    } : {
        x?: number,
        y?: number,
        img?: any,
        ctx?: any,
        level?: any,
        section?: any,
        parentClass?: string,
        type?: string,
        gravity?: number,
        removeFromWorld?: boolean,

        boundX?: number,
        boundY?: number,
        lastBoundY?: number,
        boundWidth?: number,
        boundHeight?: number,

        name?: any,
        game?: any
    } = {}) {
        
        // this.name = this.constructor.name;
        this.game = game;
    }

    // TODO, implement a list of bounding shapes, iterate through depending on type (circle or rect) 
    rectangle(): void {

    }
    
    circle(): void {

    }

    /* Draws the outline of this entity */
    drawOutline (ctx: any): void {

    }

    /*
    Updates the entity each game loop
    i.e. what does this entity do?
    */
    update (): void { }

    /* Draws this entity. Called every cycle of the game engine. */
    draw (ctx: any): void {
        
    }

    /*
    Collision detection, rectangle
    */
    isColliding(other: Entity): string {
        let rect1 = {
            "x" : this.boundX,
            "y" : this.boundY,
            "lastY" : this.lastBoundY,
            "width" : this.boundWidth,
            "height": this.boundHeight
        }

        let rect2 = {
            "x" : other.boundX,
            "y" : other.boundY,
            "width" : other.boundWidth,
            "height": other.boundHeight
        }

        if (rect1.width === 0 || rect1.height === 0 || rect2.width === 0 || rect2.height === 0) {
            return 'none'
        }
        // This is the same as Mariott's method, just formatted differently
        let collision = 'none';
        var dx = (rect1.x + rect1.width/2) - (rect2.x + rect2.width/2);
        var dy = (rect1.y + rect1.height/2) - (rect2.y + rect2.height/2);
        var lastdy = (rect1.lastY + rect1.height/2) - (rect2.y + rect2.height/2);
        var width = (rect1.width + rect2.width) / 2;
        var height = (rect1.height + rect2.height) / 2;
        var crossWidth = width * dy;
        var lastCrossWidth = width * lastdy;
        var crossHeight = height * dx;
        
        // First check if rect1 and rect2 are close enough to even collide. Then check the intersection depths to determine which side was most involved in the collision.
        if(Math.abs(dx) <= width && Math.abs(dy) <= height) {

            //TODO store last bottom of rect1, compare to bound of rect2, determine if i should fall or not
            if (crossWidth > crossHeight && lastCrossWidth > crossHeight) {
                (crossWidth < -(crossHeight)) && lastCrossWidth < -(crossHeight) ? collision = 'right' : collision = 'top';

            } else {
                crossWidth > (-crossHeight) && lastCrossWidth > (-crossHeight) ? collision = 'left' : collision = 'bottom';
                // console.log("rect1 cur: " + rect1.y);
                // console.log("rect1 last: " + rect1.lastY);
                // console.log("rect2: " + rect2.y);
            }

        }
    return collision;

    }

    collided(other: Entity, direction: string): void {
    }
} // end of Entity class

export default Entity