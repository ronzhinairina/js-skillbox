export class StateService {
    static get currentPath() {
        return window.location.pathname;
    }

    static _state;

    static get state() {
        return StateService._state;
    }

    static init() {
        let id = window.location.pathname.match(/\d+/);
        if (id) { id = id[0]; }
        StateService._state = { ...history.state, id }
    }

    static navigate(path) {
        history.pushState(StateService._state, '', path);
    }
}