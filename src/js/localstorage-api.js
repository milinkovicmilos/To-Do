import { Project } from "./project.js";
import { Task } from "./task.js";

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
            tasks: project.tasks.map(task => new Task({
                title: task.title,
                desc: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                id: task.id,
            })),
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
            tasks: project.Tasks.map(task => ({
                id: task.Id,
                title: task.Title,
                description: task.Description,
                dueDate: task.DueDate,
                priority: task.Priority,
            })),
        }));
        localStorage.setItem("projects", JSON.stringify(arr));
    }

    removeProject(projectId) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID or doesn't exist in storage.");
        }

        const projectsData = JSON.parse(localStorage.getItem("projects"));
        const newProjectsData = projectsData.filter(project => project.id != projectId);
        localStorage.setItem("projects", JSON.stringify(newProjectsData));
    }

    storeTask(projectId, task) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID or doesn't exist in storage.");
        }

        if (!task instanceof Task) {
            throw new Error("Invalid task object passed. Must be instance of Task.");
        }

        const projects = JSON.parse(localStorage.getItem("projects"));
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id == projectId) {
                projects[i].tasks.push({
                    id: task.Id,
                    title: task.Title,
                    description: task.Description,
                    dueDate: task.DueDate,
                    priority: task.Priority,
                });
            }
        }
        /*
        const newProjectsData = projectsData.map(project => {
            if (project.id == projectId) {
                project.tasks.push({
                    title: task.Title,
                    description: task.Description,
                    dueDate: task.DueDate,
                    priority: task.Priority,
                });
            }
            return project;
        });
        */
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    /**
     * Removes the task from localStorage.
     * @param {string} projectId - Id of project we want to remove task from. Must be UUID.
     * @param {string} taskId - Id of task we want to remove. Must be UUID.
     */
    removeTask(projectId, taskId) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID.");
        }

        if (typeof taskId != "string" || taskId.length != 36) {
            throw new Error("Invalid task id passed. Must be UUID.");
        }

        const projectsData = JSON.parse(localStorage.getItem("projects"));
        for (let i = 0; i < projectsData.length; i++) {
            if (projectsData[i].id == projectId) {
                for (let j = 0; j < projectsData[i].tasks.length; j++) {
                    if (projectsData[i].tasks[j].id == taskId) {
                        projectsData[i].tasks.splice(j, 1);
                    }
                }
            }
        }
        localStorage.setItem("projects", JSON.stringify(projectsData));
    }
}
