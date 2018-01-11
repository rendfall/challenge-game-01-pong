import { loadImage } from './loaders';
import { Sprite } from './sprite';

export class SpriteSheet {
    image = null;

    loadImage(src) {
        return loadImage(src)
            .then((image) => {
                this.image = image;
            });
    }

    createSprite(name, x, y, width, height) {
        return new Sprite(this.image, name, x, y, width, height);
    }
}
