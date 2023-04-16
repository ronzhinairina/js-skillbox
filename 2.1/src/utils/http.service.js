import { TASKS } from "./todos";

export class HttpService {
    tasks = [...TASKS];

    getTasks() {
        return [...this.tasks];
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(index, 1);
    }

    changeDoneState(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.done = !task.done;
        }
    }

    createTask(text) {
        let maxId = 0;
        if (this.tasks.length > 0) {
            this.tasks.reduce((a, b) => a.id > b.id ? a : b)?.id;
        }

        this.tasks.push({
            id: maxId + 1,
            text: text,
            done: false,
        })
    }
}