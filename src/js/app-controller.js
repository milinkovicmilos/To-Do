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

        // ...

    }
}
