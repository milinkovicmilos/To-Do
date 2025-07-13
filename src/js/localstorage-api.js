import { Project } from "./project.js";

export class LocalStorageAPI {
    constructor() {
        const projects = localStorage.getItem("projects");
        if (projects == null) {
            localStorage.setItem("projects", "[]");
        }
    }

    /**
     * Returns the array of projects stored in localStorage
     */
    loadProjects() {
        return JSON.parse(localStorage.getItem("projects"));
    }

    storeProject(project) {
        if (project instanceof Project) {
            const projects = this.loadProjects();
            const obj = {
                title: project.Title,
                description: project.Description,
                tasks: project.Tasks,
            }
            projects.push(obj);
            localStorage.setItem("projects", JSON.stringify(projects));
        } else {
            throw new Error("Invalid object for storage.");
        }
    }
}
