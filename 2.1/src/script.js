import { HttpService } from "./utils/http.service";
import { LocalStorageService } from "./utils/local-storage.service";
import { createNewTaskElement } from "./utils/create-task-element";

class View {
    constructor(dataService) {
        this._dataService = dataService;

        document.querySelector('#new-task').addEventListener('click', () => {
            this.add(document.querySelector('#new-task-text').value);
        });
    }

    set dataService(dataService) {
        this._dataService = dataService;
        this.render();
    }

    render() {
        const incompletedTasksHolder = document.getElementById("incomplete-tasks");
        const completedTasksHolder = document.getElementById("completed-tasks");
        incompletedTasksHolder.innerHTML = '';
        completedTasksHolder.innerHTML = '';
        const tasks = this._dataService.getTasks();
        tasks.forEach(task => {
            task.element = createNewTaskElement(task.text);
            if (task.done) {
                completedTasksHolder.appendChild(task.element);
            }
            if (!task.done) {
                incompletedTasksHolder.appendChild(task.element);
            }
            this.addListeners(task);
        });
    }

    delete(id) {
        this._dataService.deleteTask(id);
        this.render();
    }

    add(text) {
        this._dataService.createTask(text);
        this.render();
    }

    changeState(todo) {
        this._dataService.changeDoneState(todo.id);
        this.render();
    }

    addListeners(todo) {
        const deleteBtn = todo.element.querySelector('.delete');
        deleteBtn.addEventListener('click', () => {
            this.delete(todo.id);
        });

        const checkbox = todo.element.querySelector("input[type=checkbox]");
        checkbox.addEventListener('change', () => {
            this.changeState(todo);
        });
    }
}
const httpService = new HttpService();
const localStorageService = new LocalStorageService();
const view = new View(httpService);
view.render();


document.querySelector('#http-source').addEventListener('click', (e) => {
    view.dataService = httpService;
});

document.querySelector('#localstorage-source').addEventListener('click', (e) => {
    view.dataService = localStorageService;
});