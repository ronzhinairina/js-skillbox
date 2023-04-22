export class RequestService {
    static url = 'https://swapi.dev/api';

    static getFilms() {
        return fetch(`${RequestService.url}/films`)
            .then(response => response.json())
            .then(json => json.results);
    }

    static getFilmById(id) {
        return fetch(`${RequestService.url}/films/${id}`)
            .then(response => response.json())
    }

    static getDataByUrl(url) {
        return fetch(url)
            .then(response => response.json())
    }
}