import { StateService } from "../services/state.service";
import { RequestService } from "../services/request.service";
import { getIdByEpisodeId } from "../utils/getIdByEpisodeId";

export class EpisodePage extends HTMLElement {
    static selector = 'app-episode'

    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = '<app-loader fullscreen=true></app-loader>';
        RequestService.getFilmById(StateService.state.id).then(film => {
            this.innerHTML = `
            <button id="back-to-main" type="button" class="btn btn-primary">Back to episodes</button>
            <h1>${film.title} ${getIdByEpisodeId(StateService.state.id)}</h1>
            <p>${film.opening_crawl}</p>
            <h2>Planets</h2>
            <ul id="planets">
                <app-loader></app-loader>
            </ul>
            <h2>Species</h2>
            <ul id="species">
                <app-loader></app-loader>
            </ul>`;
    
            document.querySelector('#back-to-main').addEventListener('click', () => {
                StateService.navigate('../');
            });

            return film;
        })
        .then((film) => {
            const planets = Promise.all(film.planets.map(planet => RequestService.getDataByUrl(planet)));
            planets.then(values => {
                document.querySelector('#planets').innerHTML = values.map(planet => `<li>${planet.name}</li>`).join('');
            });

            return film;
        })
        .then((film) => {
            const species = Promise.all(film.species.map(specy => RequestService.getDataByUrl(specy)));
            species.then(values => {
                document.querySelector('#species').innerHTML = values.map(specy => `<li>${specy.name}</li>`).join('');
            })

            return film;
        });
    }
}

