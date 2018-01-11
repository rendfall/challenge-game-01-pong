export class AudioChannel {
    sounds = new Map();

    load(name, src, options = {}) {
        const audio = new Audio(src);

        Object.keys(options).forEach((key) => {
            audio[key] = options[key];
        });

        this.sounds.set(name, audio);
    }

    getSound(name) {
        return this.sounds.get(name);
    }

    play(name) {
        const audio = this.getSound(name);
        audio.play();
    }

    pause(name) {
        const audio = this.getSound(name);
        audio.pause();
    }

    stop(name) {
        const audio = this.getSound(name);
        audio.pause();
        audio.currentTime = 0;
    }

    setLoop(name, state) {
        const audio = this.getSound(name);
        audio.loop = Boolean(state);
    }

    setVolume(name, volume) {
        const audio = this.getSound(name);
        audio.volume = volume;
    }
}
