export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (err) => {
            console.error(err);
            reject();
        });
        image.src = src;
    });
}

export function loadJSON(src) {
    return window.fetch(src).then(r => r.json());
}
