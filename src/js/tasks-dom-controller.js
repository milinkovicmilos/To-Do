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

        const topWrapper = document.createElement("div");
        topWrapper.classList.add("top-wrapper");

        const topleftWrapper = document.createElement("div");
        topleftWrapper.classList.add("topleft-wrapper");

        const bottomWrapper = document.createElement("div");
        bottomWrapper.classList.add("bottom-wrapper");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = task.Completed;
        checkbox.addEventListener('change', function() {
            task.Completed = this.checked;
            appController.changeTaskCompletion(projectId, task.Id);
        });

        const title = document.createElement("p");
        title.classList.add("task-title");
        title.textContent = task.Title;
        title.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
            const changeEvent = new Event("change");
            checkbox.dispatchEvent(changeEvent);
        });

        const desc = document.createElement("p");
        desc.classList.add("task-desc");
        desc.textContent = task.Description;
        bottomWrapper.append(desc);

        task.Subtasks.forEach(subtask => {
            const subtaskWrapper = document.createElement("div");
            subtaskWrapper.classList.add("subtask-wrapper");

            const completedCheckbox = document.createElement("input");
            completedCheckbox.id = `subtask-${subtask.Id}`;
            completedCheckbox.setAttribute("type", "checkbox");
            completedCheckbox.checked = subtask.Completed;
            completedCheckbox.addEventListener('change', function() {
                subtask.Completed = this.checked;
                appController.changeSubtaskCompletion(task.Id, subtask.Id);
            });

            const label = document.createElement("label");
            label.setAttribute("for", `subtask-${subtask.Id}`);
            label.textContent = subtask.Title;

            subtaskWrapper.append(completedCheckbox, label);
            bottomWrapper.append(subtaskWrapper);
        });

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
        bottomWrapper.append(deleteButton);

        if (task.DueDate) {
            topleftWrapper.append(dueDate);
        }

        if (task.Priority != 0) {
            topleftWrapper.append(priority);
        }

        topWrapper.append(checkbox, title, topleftWrapper);
        wrapper.prepend(topWrapper, bottomWrapper);
        return wrapper;
    }
}
