export class LocalStorageService {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    getTasks() {
        return [...this.tasks];
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(index, 1);
        this._save();
    }

    changeDoneState(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.done = !task.done;
        }
        this._save();
    }

    createTask(text) {
        let maxId = 0;
        if (this.tasks.length > 0) {
            this.tasks.reduce((a, b) => a.id > b.id ? a: b)?.id;
        }

        this.tasks.push({
            id: maxId + 1,
            text: text,
            done: false,
        })

        this._save();
    }

    _save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}