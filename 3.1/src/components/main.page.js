import { RequestService } from "../services/request.service";
import { StateService } from "../services/state.service";
import { getIdByEpisodeId } from "../utils/getIdByEpisodeId"

export class MainPage extends HTMLElement {
    static selector = 'app-main'

    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = '<app-loader fullscreen=true></app-loader>';
        RequestService.getFilms().then(films => {
            this.innerHTML = `
            <div class="list-group">
                ${this.generateFilmsToHtml(films)}
            </div>
            `;

            document.querySelectorAll('.episode').forEach(element => {
                element.addEventListener('click', () => {
                    StateService.navigate(element.attributes.route.nodeValue)
                })
            });
        });
    }

    generateFilmsToHtml(films) {
        return films
            .sort((a, b) => a.episode_id - b.episode_id)
            .map(film => `<a href="javascript:void(0)" 
                             route="/episode/${getIdByEpisodeId(film.episode_id)}" 
                             class="episode list-group-item list-group-item-action">${film.episode_id} ${film.title}</a>`)
            .join('');
    }
}

