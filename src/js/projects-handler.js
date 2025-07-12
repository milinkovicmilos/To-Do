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
     * @param {number} index 
     */
    getProject(index) {
        if (typeof index != 'number' || index < 0 || index > this.#projects.length - 1) {
            throw new Error("Invalid project index passed.");
        }
        return this.#projects[index];
    };

    /**
     * Gets the previous project in array. If it's first element in array it gets the last element.
     * If the array length is less than 2 returns null, else returns the object.
     * @param {object} project - The current object
     */
    getPreviousProject(project) {
        if (this.#projects.length < 2) {
            return null;
        }

        let index = this.#projects.findIndex((proj) => proj == project);
        if (--index < 0) {
            index = this.#projects.length - 1;
        }

        return this.#projects[index];
    }

    /**
     * Gets the next project in array. If it's last element in array it gets the first element.
     * If the array length is less than 2 returns null, else returns the object.
     * @param {object} project - The current object
     */
    getNextProject(project) {
        if (this.#projects.length < 2) {
            return null;
        }

        let index = this.#projects.findIndex((proj) => proj == project);
        if (++index > this.#projects.length - 1) {
            index = 0;
        }

        return this.#projects[index];
    }

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
     * @param {object} project - Refenrece to the object to remove. Must be instance of Project
     */
    removeProject(project) {
        if (!project instanceof Project) {
            throw new Error("Invalid object passed. Object must be instance of Project.");
        }
        this.#projects.splice(this.#projects.findIndex(proj => proj == project), 1);
    };
}
