import { AudioChannel , GameLoop} from './engine';
import { Keyboard } from './engine/keyboard';
import { Sprite } from './engine/sprite';
import { APP_CONFIG } from './config';

export class Entity {
    game = null;
    name = null;
    body = null;
    width = 25;
    height = 100;
    x = 0;
    y = 0;
    moveBy = 15;

    constructor(game, name) {
        this.game = game;
        this.name = name;
    }

    createBody(x, y) {
        this.x = x;
        this.y = y;

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
        });
    }

    moveUp(isPressed) {
        if (this.y <= 0) return;

        this.y -= this.moveBy;
    }

    moveDown(isPressed) { console.log(this.y);
        if (this.y >= (APP_CONFIG.height - this.height)) return;

        this.y += this.moveBy;
    }

    setupInput(keyMapping) {
        const input = this.game.keyboard;
        const { up, down } = keyMapping;

        input.onKey(up, (isPressed) => {
            this.moveUp(isPressed);
        });
        input.onKey(down, (isPressed) => {
            this.moveDown(isPressed);
        });
    }

    draw(context, deltaTime) {
        context.drawImage(this.body, this.x, this.y);
    }
}

export class Game {
    context = null;
    loop = new GameLoop();
    keyboard = new Keyboard();
    audioChannel = new AudioChannel();
    spriteSheet = null;
    sprites = new Map();

    playerOne = null;
    playerTwo = null;

    constructor() {
        console.log('The game is ready.');

        this.context = window.app.canvas.getContext('2d');

        Promise.all([
            this.setupKeyboard(),
            this.setupAudio(),
            this.setupPlayerOne(),
            this.setupPlayerTwo()
        ]).then(() => {
            this.setupLoop();
        })
    }

    setupKeyboard() {
        return new Promise((resolve) => {
            this.keyboard.enable();
            resolve();
        });
    }

    setupAudio() {
        return new Promise((resolve) => {
            resolve();
        })
    }

    setupPlayerOne() {
        return new Promise((resolve) => {
            this.playerOne = new Entity(this, 'player-one');
            this.playerOne.setupInput({ up: 'w', down: 's' });
            this.playerOne.createBody(0, 0)
                .then((image) => resolve(image));
        });
    }

    setupPlayerTwo() {
        return new Promise((resolve) => {
            this.playerTwo = new Entity(this, 'player-two');
            this.playerTwo.setupInput({ up: 'ArrowUp', down: 'ArrowDown'});
            this.playerTwo.createBody(APP_CONFIG.width - this.playerTwo.width, 0)
                .then((image) => resolve(image));
        });
    }

    setupLoop() {
        this.loop.onUpdate(this.update.bind(this));
        this.loop.onRedraw(this.redraw.bind(this));
        this.loop.start();
    }

    refreshContext() {
        this.context.clearRect(0, 0, APP_CONFIG.width, APP_CONFIG.height);
    }

    update(deltaTime) {}

    redraw(deltaTime) {
        this.refreshContext();

        this.playerOne.draw(this.context, deltaTime);
        this.playerTwo.draw(this.context, deltaTime);
    }
}
