import { Project } from "./project.js";

export class ProjectsHandler {
    #projects = [];

    /**
     * Fetches all the projects that handler is handling
     */
    getProjects() {
        return this.#projects;
    };

    /**
     * Fetch a single project
     */
    getProject(index) {
        if (typeof index != 'number' || index < 0 || index > this.#projects.length - 1) {
            throw new Error("Invalid project index passed.");
        }
        return this.#projects[index];
    };

    /**
     * @param {object} project - Project object (instance of Project) to add
     */
    addProject(project) {
        if (!project instanceof Project) {
            throw new Error("Invalid object passed. Object must be instance of Project class.");
        }
        this.#projects.push(project);
    };

    /**
     * @param {number} index - Index of project to remove
     */
    removeProject(index) {
        if (typeof index != 'number' || index < 0 || index > this.#projects.length - 1) {
            throw new Error("Invalid project index passed.");
        }
        this.#projects.splice(index, 1);
    };
}
