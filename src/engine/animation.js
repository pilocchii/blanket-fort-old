import AssetManager from "./asset-manager"


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
class Animation {

    constructor(spriteSheet, frameDimensions, row, sheetWidth, frameDuration, frames, loop, scale, columnOffset=0) {

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


    drawFrame(tick, ctx, x, y, facingRight) {
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
        let drow = (this.row * this.frameHeight)
        xindex = frame % this.sheetWidth;
        yindex = Math.floor((frame) / this.sheetWidth);


        // Draw facing left
        if (!facingRight) {

            // Save original context
            ctx.save();

            // Set context to horizontal center of image (don't care about changing y's position)
        	ctx.translate(x + (this.scale * this.frameWidth) / 2, 0);
                
		    // Scale x by -1 to flip horizontally
            ctx.scale(-1, 1);

            // Draw image on the transformed context
            // Note: after transforming [0,0] is visually [-width/2, 0]
            // so the image needs to be offset accordingly when drawn
        	ctx.drawImage(this.spriteSheet,
                     (xindex * this.frameWidth), (yindex * this.frameHeight) + drow,  // source from sheet
                     this.frameWidth, this.frameHeight,
                     -(this.frameWidth * 2) + (this.frameWidth / 2)
                        + this.frameWidth, // Offset dx
                     y - this.scale*this.frameHeight + this.scale*10,

                     this.frameWidth * this.scale,
                     this.frameHeight * this.scale);

            // Restore original context
            ctx.restore();
            // omg it's finally working ;-;

        } else { // Draw facing right
        	ctx.drawImage(this.spriteSheet,
                     (xindex * this.frameWidth), (yindex * this.frameHeight) + drow,  // source from sheet
                     this.frameWidth, this.frameHeight,
                     x - this.frameWidth,
                     y - this.scale * this.frameHeight + this.scale * 10, 
                     this.frameWidth * this.scale,
                     this.frameHeight * this.scale);
        }
        //ctx.translate(50, 50);
        
    }

    currentFrame () {
        return Math.floor(this.elapsedTime / this.frameDuration) + this.columnOffset;
    }

    isDone () {
        return (this.elapsedTime >= this.totalTime - 1);
    }

    reset() {
        this.elapsedTime = 0;
        this.loops = 0;
    }
}

export default Animation;