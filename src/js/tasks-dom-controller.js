import { AppController } from "./app-controller.js";
import { Project } from "./project.js";
import { Task } from "./task.js";

export class TasksDomController {
    /**
     * Renders the projects tasks into given element
     * @param {HTMLElement} parentElement - Element to render the HTMLElements into.
     * @param {object} project - Currently selected project which tasks to render. Must be instance of Project.
     */
    render(appController, parentElement, project) {
        if (!appController instanceof AppController) {
            throw new Error("Invalid App controller passed. Must be instance of AppController.");
        }

        if (!project instanceof Project) {
            throw new Error("Invalid project passed. Object must be instance of Project.");
        }

        project.Tasks.forEach((task) => {
            parentElement.append(this.#createTaskElements(task));
        });
    }

    renderSingleTask(parentElement, task) {
        parentElement.append(this.#createTaskElements(task));
    }

    /**
     * @param {object} task - Task to render. Must be instance of Task.
     */
    #createTaskElements(task) {
        if (!task instanceof Task) {
            throw new Error("Invalid task object passed. Object must be instane of Task.");
        }

        const wrapper = document.createElement("div");

        const title = document.createElement("p");
        title.textContent = task.Title;

        const desc = document.createElement("p");
        desc.textContent = task.Description;

        const dueDate = document.createElement("p");
        dueDate.textContent = task.DueDate;

        const priorty = document.createElement("p");
        priorty.textContent = task.Priority;

        wrapper.append(title, desc, dueDate, priorty);
        return wrapper;
    }
}
