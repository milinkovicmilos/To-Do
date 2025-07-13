import { DomController } from "./dom-controller.js";
import { DummyStorageAPI } from "./dummy-storage-api.js";
import { ProjectsHandler } from "./projects-handler.js";
import { DummyProjectGenerator } from "./dummy-project-generator.js";
import { Project } from "./project.js";

export class AppController {
    /**
     * @type {object} domController - Object of type DomController.
     */
    #domController;

    /**
     * Facade for the storage. Storage interface.
     * @type {object} storageWrapper
     */
    #storageWrapper;

    /**
     * @type {object} projectsHandler
     */
    #projectsHandler;

    constructor() {
        this.#domController = new DomController(this);
        this.#storageWrapper = new DummyStorageAPI();
        this.#projectsHandler = new ProjectsHandler();
    }

    /**
     * @param {boolean} [back=false] - Weather the user went back to home page or not
     */
    initializeHomePage(back = false) {
        // Fixed page elements initialization
        this.#domController.renderFixed();

        // Load projects from localStorage/fetch from database etc.
        const projects = this.#storageWrapper.loadProjects();

        // Display those projects
        this.#domController.renderProjects(projects);

        if (!back) {
            // Get those projects into the projects handler if it's the users first time on home page
            projects.forEach((project) => this.#projectsHandler.addProject(project));
        }

        // Notifications?
    }

    showProject(project) {
        this.#domController.renderProject(project);
    }

    showPreviousProject(currentProject) {
        try {
            const previousProject = this.#projectsHandler.getPreviousProject(currentProject);

            if (previousProject == null) {
                return;
            }
            this.showProject(previousProject);
        }
        catch {
            console.log("There was an error in showing previous project.");
        }
    }

    showNextProject(currentProject) {
        try {
            const nextProject = this.#projectsHandler.getNextProject(currentProject);

            if (nextProject == null) {
                return;
            }
            this.showProject(nextProject);
        }
        catch {
            console.log("There was an error in showing next project.");
        }
    }

    createProject(project) {
        console.log(project);
        // Projects Handler
        this.#projectsHandler.addProject(project);

        const projects = this.#projectsHandler.getProjects();

        // Update DOM
        this.#domController.renderProjects(projects);

        // Store it

    }

    removeProject(project) {
        try {
            // Remove it
            this.#projectsHandler.removeProject(project);
        }
        catch {
            // Print message to DOM
            console.log("Invalid information for project removal.");
        }
    }

    /**
     * Adds the task to the project.
     * @param {number} projectIndex - Index of the project we want to add the task to.
     * @param {object} task - Task object that we wish to add. Must be instance of Task.
     */
    addTaskToProject(projectIndex, task) {
        // Make sure it doesn't break if project doesn't exist
        try {
            // Get the project
            const project = this.#projectsHandler.getProject(projectIndex);

            // Add the task to it
            project.addTask(task);
        }
        catch {
            // Print message to DOM
            console.log("Failed to add the task to project.");
        }
    }

    /**
     * Removes the task from project.
     * @param {number} projectIndex - Index of the project we wish to remove task from.
     * @param {number} taskIndex - Index of task on the project we wish to remove.
     */
    removeTaskFromProject(projectIndex, taskIndex) {
        // Make sure it doesn't break if project or task doesn't exist
        try {
            // Get the project
            const project = this.#projectsHandler.getProject(projectIndex);

            // Remove the task if it exists
            project.removeTask(taskIndex);
        }
        catch {
            // Print message to DOM
            console.log("Failed to remove the task from the project.");
        }
    }
}
