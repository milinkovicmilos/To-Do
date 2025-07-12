import { AppController } from "./app-controller.js";
import { Project } from "./project.js";

export class DomController {
    /**
     * The App Controller object that created this controller
     * @type {object} appController
     */
    #appController;

    /**
     * State control.
     * 0 <=> for Projects view
     * 1 <=> Tasks view - Listing tasks for currently selected project
     *
     * @type {object} states
     */
    #states = {
        "projects": 0,
        "tasks": 1,
    }

    /**
     * By default set the state to projects view
     * 0 <=> for Projects view
     * 1 <=> Tasks view - Listing tasks for currently selected project
     *
     * @type {number} state
     */
    #state = this.#states["projects"];

    constructor(appController) {
        if (!appController instanceof AppController) {
            throw new Error("Invalid app controller passed. Must be instance of AppContoller.");
        }
        this.#appController = appController;
    }

    /**
     * Return the current state
     * Returns:
     * 0 for for Projects view
     * 1 for Tasks view - Listing tasks for currently selected project
     */
    get State() {
        return this.#state;
    }

    set State(value) {
        if (!value in this.#states) {
            throw new Error("Invalid state passed.");
        }
        this.#state = this.#states[value];
    }

    /**
     * Render the projects onto a page
     * @param {Array} projects - array of projects (Objects of type Project).
     */
    renderProjects(projects) {
        try {
            this.#checkIfProjectArray(projects);
        }
        catch {
            console.log("There was an error in showing the projects. Try again later.");
        }

        projects.forEach((project) => {
            console.log(project);
        });
    }

    #checkIfProjectArray(array) {
        if (!Array.isArray(array)) {
            throw new Error("Must pass an array.");
        }

        if (array.length == 0) {
            throw new Error("Array must contain at least one element.");
        }

        array.forEach((x) => {
            if (!x instanceof Project) {
                throw new Error("Array element must be a object that is instance of Project.");
            }
        });
    }
}
