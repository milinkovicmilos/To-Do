import { DomController } from "./dom-controller.js";
import { Project } from "./project.js";
import { ProjectValidationError } from "./project-validation-error.js";

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

    #removeFormIfExists() {
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
        this.#removeFormIfExists();

        const form = document.createElement("div");
        form.id = "form";

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("placeholder", "Project title...");

        const descInput = document.createElement("input");
        descInput.setAttribute("type", "text");
        descInput.setAttribute("placeholder", "Project description...");

        const submitButton = document.createElement("button");
        submitButton.textContent = "Create";
        submitButton.addEventListener('click', () => {
            try {
                const project = new Project(titleInput.value, descInput.value);
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

        form.append(titleInput, descInput, submitButton);
        document.body.append(form);
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
