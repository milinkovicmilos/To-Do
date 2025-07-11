import { DomController } from "./dom-controller.js";
import { DummyStorageAPI } from "./dummy-storage-api.js";

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

    constructor() {
        this.#domController = new DomController();
        this.#storageWrapper = new DummyStorageAPI();
    }

    initializePage() {
        // Load projects from localStorage/fetch from database etc.
        const projects = this.#storageWrapper.loadProjects();

        // Display those projects

        this.#domController.renderProjects(projects);

        // Notifications?
    }

    createProject() {
        // DOM
        // Projects Handler
        // ...
    }
}
