import { AppController } from "./app-controller.js";
import { NavigationDomController } from "./navigation-dom-controller.js";
import { ProjectsDomController } from "./projects-dom-controller.js";
import { TasksDomController } from "./tasks-dom-controller.js";

import { Project } from "./project.js";
import { Task } from "./task.js";
import { FormsDomController } from "./forms-dom-controller.js";
import { ProjectValidationError } from "./project-validation-error.js";

export class DomController {
    /**
     * The App Controller object that created this controller
     * @type {object} appController
     */
    #appController;

    /**
     * The Navigation Dom Controller that is responsible for rendering nav bar
     * @type {object} navigationController - Must be instance of NavigationDomController
     */
    #navigationController;

    /**
     * The Projects Dom Controller that is responsible for rendering projects into DOM
     * @type {object} projectsController - Must be instance of ProjectsDomController
     */
    #projectsController;

    /**
     * The Tasks Dom Controller that is responsible for rendering projects tasks into DOM
     * @type {object} tasksController - Must be instance of TasksDomController
     */
    #tasksController;

    /**
     * The Forms Dom Controller that is responsible for rendering forms for making projects and tasks
     * @type {object} formsController - Must be instance of FormsDomController
     */
    #formsController;

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
        this.#navigationController = new NavigationDomController(this);
        this.#projectsController = new ProjectsDomController();
        this.#tasksController = new TasksDomController();
        this.#formsController = new FormsDomController(this);
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
        this.#formsController.removeFormIfExists();
    }

    renderFixed() {
        this.State = "projects";
        this.#navigationController.render(this.#appController);
    }

    /**
     * Render the projects onto a page
     * @param {Array} projects - array of projects (Objects of type Project).
     */
    renderProjects(projects) {
        try {
            const gridWrapper = document.querySelector("#grid-wrapper");
            gridWrapper.innerHTML = "";

            this.#projectsController.render(this.#appController, gridWrapper, projects);
        }
        catch {
            console.log("There was an error in showing the projects. Try again later.");
        }
    }

    /**
     * @param {object} project - Project object to render. Must be instance of Project.
     */
    renderProject(project) {
        if (!project instanceof Project) {
            throw new Error("Invalid object passed. Object must be instance of Project.");
        }

        const gridWrapper = document.querySelector("#grid-wrapper");
        gridWrapper.innerHTML = "";

        this.#tasksController.render(this.#appController, gridWrapper, project);

        this.State = "tasks";

        this.#navigationController.render(this.#appController, project);
        this.#navigationController.updateSelectedProjectTitle(project.Title);
    }

    /**
     * @param {string} projectId - Id of project which new task we are rendering.
     * @param {object} task - Task object to render. Must be instance of Task.
     */
    renderTask(projectId, task) {
        if (!task instanceof Task) {
            throw new Error("Invalid task object passed. Must be instance of Task.");
        }

        const gridWrapper = document.querySelector("#grid-wrapper");
        this.#tasksController.renderSingleTask(this.#appController, projectId, gridWrapper, task);
    }

    renderNewProjectForm() {
        this.#formsController.renderNewProjectForm(this.#appController);
    }

    renderNewTaskForm(project) {
        this.#formsController.renderNewTaskForm(this.#appController, project);
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
