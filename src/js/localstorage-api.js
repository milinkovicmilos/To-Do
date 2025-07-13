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
        const projectsData = JSON.parse(localStorage.getItem("projects"));
        return projectsData.map(project => new Project({
            id: project.id,
            title: project.title,
            desc: project.desc,
            tasks: project.tasks
        }));
    }

    storeProject(project) {
        if (!project instanceof Project) {
            throw new Error("Invalid object for storage.");
        }

        const projects = this.loadProjects();
        projects.push(project);
        const arr = projects.map(project => ({
            id: project.Id,
            title: project.Title,
            desc: project.Description,
            tasks: project.Tasks,
        }));
        localStorage.setItem("projects", JSON.stringify(arr));
    }
}
