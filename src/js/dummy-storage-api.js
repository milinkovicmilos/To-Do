import { Project } from "./project.js";
import { DummyTaskGenerator } from "./dummy-task-generator.js";

export class DummyStorageAPI {
    #projects = [
        new Project('Test Project one', 'Description of it'),
        new Project('Test Project two', 'Seconds description of it'),
        new Project('Test Project three', 'And the third'),
    ];

    constructor() {
        const generator = new DummyTaskGenerator();
        this.#projects[0].addTask(generator.getTask());
        this.#projects[0].addTask(generator.getTask());
        this.#projects[0].addTask(generator.getTask());

        this.#projects[1].addTask(generator.getTask());
        this.#projects[1].addTask(generator.getTask());
    }

    loadProjects() {
        return this.#projects;
    }

    storeProject(project) {
        if (project instanceof Project) {
            this.#projects.push(project);
        } else {
            throw new Error("Invalid object for storage.");
        }
    }
}
