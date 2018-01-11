import { AudioChannel , GameLoop} from './engine';
import { Keyboard } from './engine/keyboard';
import { Sprite } from './engine/sprite';

export class Entity {
    body = null;
    width = 25;
    height = 100;

    constructor(name) {
    }

    createBody() {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;

            const context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            context.fillRect(0, 0, this.width, this.height);
            context.fill();

            const image = new Image();

            image.addEventListener('load', () => resolve(image));

            image.src = canvas.toDataURL();
            this.body = image;
        })
    }
}

export class Game {
    loop = new GameLoop();
    keyboard = new Keyboard();
    audioChannel = new AudioChannel();
    spriteSheet = null;
    sprites = new Map();

    playerOne = null;

    constructor() {
        console.log('The game is ready.');

        this.setupKeyboard();
        this.setupAudio();
        this.setupSprites();
        this.setupLoop();
    }

    setupKeyboard() {
        this.keyboard.enable();
    }

    setupAudio() {}

    setupSprites() {
        this.playerOne = new Entity('player-one');

        this.playerOne.createBody()
            .then((image) => {
                this.draw(image, 0, 50)
            });
    }

    draw(image, x, y) {
        const context = window.app.canvas.getContext('2d');
        context.drawImage(image, x, y);
    }

    setupLoop() {
        this.loop.onUpdate(this.update.bind(this));
        this.loop.onRedraw(this.redraw.bind(this));
        this.loop.start();
    }

    update(deltaTime) {}

    redraw(deltaTime) {}
}
