import { Project } from "./project.js";

export class DummyStorageAPI {
    #projects = [
        new Project('Test Project one', 'Description of it'),
        new Project('Test Project two', 'Seconds description of it'),
        new Project('Test Project three', 'And the third'),
    ];

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
