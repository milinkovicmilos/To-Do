import { Project } from "./project.js";

export const projectsHandler = (function() {
    let projects = [];

    /**
     * Fetches all the projects that handler is handling
     */
    const getProjects = () => {
        return projects;
    };

    /**
     * Fetch a single project
     */
    const getProject = (index) => {
        if (typeof index != 'number' || index < 0 || index > projects.length - 1) {
            throw new Error("Invalid project index passed.");
        }
        return projects[index];
    };

    /**
     * @param {object} project - Project object (instance of Project) to add
     */
    const addProject = (project) => {
        if (!project instanceof Project) {
            throw new Error("Invalid object passed. Object must be instance of Project class.");
        }
        projects.push(project);
    };

    /**
     * @param {number} index - Index of project to remove
     */
    const removeProject = (index) => {
        if (typeof index != 'number' || index < 0 || index > projects.length - 1) {
            throw new Error("Invalid project index passed.");
        }
        projects.splice(index, 1);
    };

    return { getProjects, getProject, addProject, removeProject };
})();
