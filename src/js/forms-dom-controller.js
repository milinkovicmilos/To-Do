import { DomController } from "./dom-controller.js";
import { Project } from "./project.js";
import { Task } from "./task.js";
import { SubTask } from "./subtask.js";
import { ProjectValidationError } from "./project-validation-error.js";
import { TaskValidationError } from "./task-validation-error.js";

export class FormsDomController {
    /**
     * The main dom controller that is responsible for this one
     * @type {object} domController
     */
    #domController;

    constructor(domController) {
        if (!domController instanceof DomController) {
            throw new Error("Invalid Dom Controller passed. Must be instance of DomController.");
        }
        this.#domController = domController;
    }

    removeFormIfExists() {
        const form = document.querySelector("#form");

        // Reset
        if (form) {
            form.remove();
        }
    }

    /**
     * @param {object} appController - App controller object. Must be instance of AppController
     */
    renderNewProjectForm(appController) {
        this.removeFormIfExists();

        const form = document.createElement("div");
        form.id = "form";

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        titleLabel.setAttribute("for", "project-title");

        const titleInput = document.createElement("input");
        titleInput.id = "project-title";
        titleInput.setAttribute("type", "text");

        const descLabel = document.createElement("label");
        descLabel.textContent = "Description";
        descLabel.setAttribute("for", "project-desc");

        const descInput = document.createElement("input");
        descInput.id = "project-desc";
        descInput.setAttribute("type", "text");

        const submitButton = document.createElement("button");
        submitButton.textContent = "Create";
        submitButton.addEventListener('click', () => {
            try {
                const project = new Project({
                    title: titleInput.value,
                    desc: descInput.value,
                });
                appController.createProject(project);
                form.remove();
            }
            catch (error) {
                if (error instanceof ProjectValidationError) {
                    const text = `Invalid project ${error.element}. Must contain at least one character`;
                    this.#renderError(text);
                }
            }
        });

        form.append(titleLabel, titleInput, descLabel, descInput, submitButton);
        document.querySelector("main").prepend(form);
    }

    /**
     * @param {object} appController - App controller object. Must be instance of AppController
     */
    renderNewTaskForm(appController, project) {
        this.removeFormIfExists();

        const form = document.createElement("div");
        form.id = "form";

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        titleLabel.setAttribute("for", "task-title");

        const titleInput = document.createElement("input");
        titleInput.id = "task-title";
        titleInput.setAttribute("type", "text");

        const descLabel = document.createElement("label");
        descLabel.textContent = "Description";
        descLabel.setAttribute("for", "task-desc");

        const descInput = document.createElement("textarea");
        descInput.id = "task-desc";

        const dueDateLabel = document.createElement("label");
        dueDateLabel.textContent = "Due Date";
        dueDateLabel.setAttribute("for", "task-due-date");

        const date = new Date();
        const dueDate = document.createElement("input");
        dueDate.id = "task-due-date";
        dueDate.setAttribute("type", "date");
        dueDate.setAttribute("min", `${date.toISOString().split("T")[0]}`)

        const priorityLabel = document.createElement("label");
        priorityLabel.textContent = "Priority";
        priorityLabel.setAttribute("for", "task-prio");

        const priority = document.createElement("input");
        priority.id = "task-prio";
        priority.setAttribute("type", "number");
        priority.value = 0;
        priority.setAttribute("min", "0");
        priority.setAttribute("max", "10");

        const addSubtaskButton = document.createElement("button");
        addSubtaskButton.textContent = "+ Add Subtask";
        addSubtaskButton.addEventListener('click', () => {
            const subtaskTitleLabel = document.createElement("label");
            subtaskTitleLabel.textContent = "Subtask Title";
            subtaskTitleLabel.setAttribute("for", "subtask-title");

            const subtaskTitleInput = document.createElement("input");
            subtaskTitleInput.id = "subtask-title";
            subtaskTitleInput.setAttribute("type", "text");

            const saveSubtaskButton = document.createElement("button");
            saveSubtaskButton.id = "subtask-save";
            saveSubtaskButton.textContent = "Save Subtask";
            saveSubtaskButton.addEventListener('click', () => {
                const id = crypto.randomUUID();
                const title = subtaskTitleInput.value;

                if (title.length == 0) {
                    this.#renderError("Subtask title must contain at least one character.");
                    return;
                }

                const subtaskElementWrapper = document.createElement("div");
                subtaskElementWrapper.classList.add("subtask-element-wrapper");

                const subtaskTitle = document.createElement("p");
                subtaskTitle.textContent = title;

                const subtaskRemoveButton = document.createElement("button");
                subtaskRemoveButton.textContent = "X";
                subtaskRemoveButton.addEventListener('click', () => {
                    subtaskElementWrapper.remove();
                });
                subtaskRemoveButton.dataset.id = id;

                subtaskElementWrapper.append(subtaskTitle, subtaskRemoveButton);
                addSubtaskButton.before(subtaskElementWrapper);

                subtaskTitleLabel.remove();
                subtaskTitleInput.remove();
                saveSubtaskButton.remove();
                addSubtaskButton.hidden = false;
            });

            const taskCreateButton = document.querySelector("#task-create");
            taskCreateButton.before(subtaskTitleLabel, subtaskTitleInput, saveSubtaskButton);
            addSubtaskButton.hidden = true;
        });

        const submitButton = document.createElement("button");
        submitButton.id = "task-create";
        submitButton.textContent = "Create Task";
        submitButton.addEventListener('click', () => {
            try {
                const subtasks = [];
                const subtaskElements = document.querySelectorAll(".subtask-element-wrapper");
                subtaskElements.forEach(subtask => {
                    const title = subtask.querySelector("p").textContent;
                    subtasks.push(new SubTask({ title }));
                });
                const task = new Task({
                    title: titleInput.value,
                    desc: descInput.value,
                    dueDate: dueDate.value,
                    priority: priority.value,
                    subtasks: subtasks,
                });
                appController.addTaskToProject(project.Id, task);
                form.remove();
            }
            catch (error) {
                console.log(error);
                if (error instanceof TaskValidationError) {
                    const text = error.userMessage;
                    this.#renderError(text);
                }
            }
        });

        form.append(
            titleLabel,
            titleInput,
            descLabel,
            descInput,
            dueDateLabel,
            dueDate,
            priorityLabel,
            priority,
            addSubtaskButton,
            submitButton
        );
        document.querySelector("main").prepend(form);
    }

    #renderError(text) {
        const form = document.querySelector("#form");

        let errorText = form.querySelector("#error-text");

        if (errorText) {
            errorText.remove();
        }

        errorText = document.createElement("p");
        errorText.id = "error-text";
        errorText.textContent = text;

        form.append(errorText);
    }
}
