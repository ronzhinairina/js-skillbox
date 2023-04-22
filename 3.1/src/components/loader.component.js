export class Loader extends HTMLElement {
    static selector = 'app-loader'

    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `<div class="loader-container ${this.fullscreen? 'fullscreen-loader': ''}">
            <span class="loader"></span>
        </div>`;
    }

    get fullscreen() {
        return this.attributes.fullscreen ? true : false;
    }
}