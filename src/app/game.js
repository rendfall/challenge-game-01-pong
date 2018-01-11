import { AudioChannel , GameLoop} from './engine';
import { Keyboard } from './engine/keyboard';
import { SpriteSheet } from './engine/sprite-sheet';

export class Game {
    loop = new GameLoop();
    keyboard = new Keyboard();
    audioChannel = new AudioChannel();
    spriteSheet = null;
    sprites = new Map();

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
        const context = window.app.canvas.getContext('2d');
        this.spriteSheet = new SpriteSheet();
    }

    setupLoop() {
        this.loop.onUpdate(this.update.bind(this));
        this.loop.onRedraw(this.redraw.bind(this));
        this.loop.start();
    }

    update(deltaTime) {}

    redraw(deltaTime) {}
}
