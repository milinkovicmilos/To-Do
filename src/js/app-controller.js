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

    initializePage() {
        // Load projects from localStorage/fetch from database etc.
        const projects = this.#storageWrapper.loadProjects();

        // Display those projects
        this.#domController.renderProjects(projects);

        // Get those projects into the projects handler
        projects.forEach((project) => this.#projectsHandler.addProject(project));

        // Notifications?
    }

    createProject() {
        // DOM
        const dummyProjectGenerator = new DummyProjectGenerator();
        const projectData = dummyProjectGenerator.getProject();

        // Projects Handler
        const project = new Project(projectData.title, projectData.desc);
        this.#projectsHandler.addProject(project);

        // Store it

    }

    removeProject(index) {
        // Make sure it doesn't break if project doesn't exist
        try {
            // Get the project
            const project = this.#projectsHandler.getProject(index);

            // Remove it
            this.#projectsHandler.removeProject(index);
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
}
