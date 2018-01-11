export class Sprite {
    body = null;
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

        this.body = buffer;
    }

    draw(context, x, y) {
        context.drawImage(this.body, x, y);
    }

    addAnimation(name, frames) {
        this.animations.set(name, frames);
    }
}
