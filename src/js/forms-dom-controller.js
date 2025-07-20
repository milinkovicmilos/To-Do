import { DomController } from "./dom-controller.js";
import { Project } from "./project.js";
import { Task } from "./task.js";
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
        titleInput.setAttribute("placeholder", "Project title...");

        const descLabel = document.createElement("label");
        descLabel.textContent = "Description";
        descLabel.setAttribute("for", "project-desc");

        const descInput = document.createElement("input");
        descInput.id = "project-desc";
        descInput.setAttribute("type", "text");
        descInput.setAttribute("placeholder", "Project description...");

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

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("placeholder", "Task title...");

        const descInput = document.createElement("textarea");
        descInput.setAttribute("placeholder", "Task description...");

        const date = new Date();
        const dueDate = document.createElement("input");
        dueDate.setAttribute("type", "date");
        dueDate.setAttribute("min", `${date.toISOString().split("T")[0]}`)

        const priority = document.createElement("input");
        priority.setAttribute("type", "number");
        priority.value = 0;
        priority.setAttribute("placeholder", "Task priority...");
        priority.setAttribute("min", "0");
        priority.setAttribute("max", "10");

        const submitButton = document.createElement("button");
        submitButton.textContent = "Create Task";
        submitButton.addEventListener('click', () => {
            try {
                const task = new Task(
                    titleInput.value,
                    descInput.value,
                    dueDate.value,
                    Number(priority.value)
                );
                appController.addTaskToProject(project.Id, task);
                form.remove();
            }
            catch (error) {
                if (error instanceof TaskValidationError) {
                    const text = `${error.element} must contain some value.`;
                    this.#renderError(text);
                }
            }
        });

        form.append(titleInput, descInput, dueDate, priority, submitButton);
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
