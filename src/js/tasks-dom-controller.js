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
            parentElement.append(this.#createTaskElements(appController, project.Id, task));
        });
    }

    renderSingleTask(appController, projectId, parentElement, task) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID.");
        }
        parentElement.append(this.#createTaskElements(appController, projectId, task));
    }

    /**
     * @param {object} appController - App controller responsible. Must be instance of AppController.
     * @param {string} projectId - Id of project we are rendering tasks for.
     * @param {object} task - Task to render. Must be instance of Task.
     */
    #createTaskElements(appController, projectId, task) {
        if (!task instanceof Task) {
            throw new Error("Invalid task object passed. Object must be instane of Task.");
        }

        const wrapper = document.createElement("div");
        wrapper.classList.add("task-wrapper");

        const leftWrapper = document.createElement("div");
        leftWrapper.classList.add("left-wrapper");

        const centerWrapper = document.createElement("div");
        centerWrapper.classList.add("center-wrapper");

        const rightWrapper = document.createElement("div");
        rightWrapper.classList.add("right-wrapper");

        const rightWrapperTop = document.createElement("div");
        const rightWrapperBottom = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");

        const title = document.createElement("p");
        title.classList.add("task-title");
        title.textContent = task.Title;
        title.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
        });

        const desc = document.createElement("p");
        desc.classList.add("task-desc");
        desc.textContent = task.Description;

        const dueDate = document.createElement("p");
        dueDate.classList.add("task-due-date");
        dueDate.textContent = task.DueDate;

        const priority = document.createElement("div");
        priority.classList.add("task-priority", `priority-${task.Priority}`);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function() {
            appController.removeTaskFromProject(projectId, task.Id);
            wrapper.remove();
        });

        leftWrapper.append(checkbox);
        centerWrapper.append(title, desc);

        if (task.DueDate) {
            rightWrapperTop.append(dueDate);
        }

        if (task.Priority != 0) {
            rightWrapperTop.append(priority);
        }

        rightWrapperBottom.append(deleteButton);
        rightWrapper.append(rightWrapperTop, rightWrapperBottom);
        wrapper.append(leftWrapper, centerWrapper, rightWrapper);
        return wrapper;
    }
}
