import { Project } from "./project.js";
import { Task } from "./task.js";

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
     * Returns the index of project with given id from projects array.
     * Returns -1 if not found.
     * @param {string} projectId - Projects Id. must be UUID
     */
    #getProjectIndexById(projectId) {
        for (let i = 0; i < this.#projects.length; i++) {
            if (this.#projects[i].Id == projectId) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Gets the previous project in array. If it's first element in array it gets the last element.
     * If the array length is less than 2 returns null, else returns the object.
     * @param {string} projectId - The id of current object. Must be UUID.
     */
    getPreviousProject(projectId) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID.");
        }

        if (this.#projects.length < 2) {
            return null;
        }

        let index = this.#getProjectIndexById(projectId) - 1;
        if (index < 0) {
            index = this.#projects.length - 1;
        }

        return this.#projects[index];
    }

    /**
     * Gets the next project in array. If it's last element in array it gets the first element.
     * If the array length is less than 2 returns null, else returns the object.
     * @param {string} projectId - The id of current project. Must be UUID.
     */
    getNextProject(projectId) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID.");
        }

        if (this.#projects.length < 2) {
            return null;
        }

        let index = this.#getProjectIndexById(projectId) + 1;
        if (index > this.#projects.length - 1) {
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
    removeProject(projectId) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid object passed. Object must be instance of Project.");
        }
        const index = this.#getProjectIndexById(projectId);
        if (index == -1) {
            throw new Error("Invalid project id passed. Project with that id doesn't exist.");
        }
        this.#projects.splice(index, 1);
    };


    /**
     * @param {string} projectId - If of project to add task to. Must be UUID.
     * @param {object} task - Task to add. Must be instance of Task.
     */
    addTaskToProject(projectId, task) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid object passed. Object must be instance of Project.");
        }

        if (!task instanceof Task) {
            throw new Error("Invalid task passed. Must be instance of Task.");
        }

        const index = this.#getProjectIndexById(projectId);
        if (index == -1) {
            throw new Error("Invalid project id passed. Project with that id doesn't exist.");
        }

        this.#projects[index].addTask(task);
    }
}
