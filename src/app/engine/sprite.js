export class Sprite {
    tiles = new Map();
    animations = new Map();

    constructor(image, name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;

        const context = buffer.getContext('2d');

        context.drawImage(
            image,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height
        );

        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    addAnimation(name, frames) {
        this.animations.set(name, frames);
    }
}
