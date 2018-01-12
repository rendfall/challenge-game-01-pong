export class Keyboard {
    static STATES = {
        pressed: 1,
        released: 0
    };

    context = null;
    keyMap = new Map();
    keyStates = new Map();
    listeners = new Map();

    constructor(context = window) {
        this.context = context;
    }

    onKey(keyCode, fn) {
        this.keyMap.set(keyCode, fn);
    }

    onEvent(event) {
        const keyCode = event.key;

        if (!this.keyMap.has(keyCode)) {
            return;
        }

        event.preventDefault();

        const keyState = (event.type === 'keydown')
            ? Keyboard.STATES.pressed
            : Keyboard.STATES.released;

        this.keyStates.set(keyCode, keyState);
        this.keyMap.get(keyCode)(keyState);
    }

    enable() {
        const keyEvents = ['keydown', 'keyup'];
        const handlerFn = this.onEvent.bind(this);

        keyEvents.forEach((name) => {
            const handlerRef = this.context.addEventListener(name, handlerFn);
            this.listeners.set(name, handlerRef);
        });
    }

    disable() {
        this.listeners.forEach((event, name) => {
            this.context.removeEventListener(name, event);
        });
    }
}
