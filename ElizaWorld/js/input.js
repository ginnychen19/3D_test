// export class InputHandler {
//     constructor(game) {
//         this.game = game;
//     }
// }
export default class Input {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(e) {
        e.preventDefault();
        if (
            e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'
        ) {
            if (!this.keys.includes(e.key)) {
                this.keys.push(e.key);
                console.log(this.keys);
            }
        } else if (e.key === "d") {
            // Do something
        } else if (e.key === " ") {
            // Do something
        }
    }

    handleKeyUp(e) {
        e.preventDefault();
        if (
            e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'
        ) {
            const index = this.keys.indexOf(e.key);
            if (index !== -1) {
                this.keys.splice(index, 1);
            }
        }
    }

    render() {
        this.processInput();
        requestAnimationFrame(this.render.bind(this));
    }

    processInput() {
        if (this.keys.includes('ArrowRight')) {
            console.log("往右");
        } else if (this.keys.includes('ArrowLeft')) {
            console.log("往左");
        }

        if (this.keys.includes('ArrowUp')) {
            console.log("往上");
        }

        if (this.keys.includes('ArrowDown')) {
            console.log("往下");
        }
    }
}
