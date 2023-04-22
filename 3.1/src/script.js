import { StateService } from "./services/state.service"
import { MainPage } from "./components/main.page";
import { EpisodePage } from "./components/episode.page";
import { Loader } from "./components/loader.component";
import "./style.css";

export class App extends HTMLElement {
    static selector = 'app-root'

    constructor() {
        super();
        StateService.init();
        this.render();

        window.addEventListener('locationchange', () => {
            StateService.init();
            this.render();
        });
    }

    render() {
        this.innerHTML = `
        ${StateService.currentPath === '/' ? '<app-main></app-main>' : `<app-episode></app-episode>`}
        `;
    }
}

customElements.define(App.selector, App);
customElements.define(MainPage.selector, MainPage);
customElements.define(EpisodePage.selector, EpisodePage);
customElements.define(Loader.selector, Loader);
