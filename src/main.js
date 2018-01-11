import Queue from 'queue';

import { APP_CONFIG } from './app/config';
import { Game } from './app/game';

class Bootloader {
    storage = new Map();
    taskQueue = Queue({ concurrency: 1 });

    constructor(name, elementId) {
        this.taskQueue.push(this.setupCanvas.bind(this, name, elementId));

        this.taskQueue.on('error', this.errorHandler.bind(this));
        this.taskQueue.on('success', this.successHandler.bind(this));
    }

    start() {
        this.taskQueue.start();
    }

    getApp() {
        const results = Object.create(null);

        for (let [key, value] of this.storage) {
            results[key] = value;
        }

        return results;
    }

    setupCanvas(id) {
        const $canvas = document.createElement('canvas');
        const $root = document.getElementById(id);

        $canvas.id = APP_CONFIG.name;
        $canvas.width = APP_CONFIG.width;
        $canvas.height = APP_CONFIG.height;
        $canvas.style.backgroundColor = APP_CONFIG.background;

        $root.appendChild($canvas);

        this.storage.set('canvas', $canvas);
        this.storage.set('root', $root);

        return Promise.resolve();
    }

    successHandler() {
        const game = new Game();
        this.storage.set('game', game);
    }

    errorHandler(err) {
        throw new Error(err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const bootloader = new Bootloader('app');
    bootloader.start();

    // For debug purpose
    window.app = bootloader.getApp();
}, false);
