import { DomController } from "./dom-controller.js";
import { LocalStorageAPI } from "./localstorage-api.js";
import { ProjectsHandler } from "./projects-handler.js";
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
        this.#storageWrapper = new LocalStorageAPI();
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
            const previousProject = this.#projectsHandler.getPreviousProject(currentProject.Id);

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
            const nextProject = this.#projectsHandler.getNextProject(currentProject.Id);

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
        // Projects Handler
        this.#projectsHandler.addProject(project);

        const projects = this.#projectsHandler.getProjects();

        // Update DOM
        this.#domController.renderProjects(projects);

        // Store it
        this.#storageWrapper.storeProject(project);
    }

    removeProject(project) {
        try {
            // Remove it
            this.#projectsHandler.removeProject(project.Id);
            this.#storageWrapper.removeProject(project.Id);
        }
        catch {
            // Print message to DOM
            console.log("Invalid information for project removal.");
        }
    }

    /**
     * Adds the task to the project.
     * @param {string} projectId - Id of project to add task to. Must be instance UUID.
     * @param {object} task - Task object that we wish to add. Must be instance of Task.
     */
    addTaskToProject(projectId, task) {
        // Make sure it doesn't break if project doesn't exist
        try {
            // Add the task to it
            this.#projectsHandler.addTaskToProject(projectId, task);

            // Store it
            this.#storageWrapper.storeTask(projectId, task);

            // Show it
            this.#domController.renderTask(projectId, task);
        }
        catch (err) {
            console.log(err);
            // Print message to DOM
            console.log("Failed to add the task to project.");
        }
    }

    /**
     * Removes the task from project.
     * @param {string} projectId - Project id from which we want to remove task from. Must be UUID.
     * @param {string} taskId - Task id that we want to remove. Must be UUID.
     */
    removeTaskFromProject(projectId, taskId) {
        try {
            // Get the project
            this.#projectsHandler.removeTaskFromProject(projectId, taskId);

            // Store changes
            this.#storageWrapper.removeTask(projectId, taskId);

            // Remove it from DOM

        }
        catch {
            // Print message to DOM
            console.log("Failed to remove the task from the project.");
        }
    }
}
