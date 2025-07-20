import { Project } from "./project.js";
import { Task } from "./task.js";

export class LocalStorageAPI {
    constructor() {
        const projects = localStorage.getItem("projects");
        if (projects == null) {
            localStorage.setItem("projects", "[]");
        }

        const tasks = localStorage.getItem("tasks");
        if (tasks == null) {
            localStorage.setItem("tasks", "[]");
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
            desc: project.description,
            tasks: this.#loadProjectsTasks(project.id),
        }));
    }

    storeProject(project) {
        if (!project instanceof Project) {
            throw new Error("Invalid object for storage.");
        }

        const projects = JSON.parse(localStorage.getItem("projects"));
        projects.push({
            id: project.Id,
            title: project.Title,
            description: project.Description,
        });
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    removeProject(projectId) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID or doesn't exist in storage.");
        }

        const projectsData = JSON.parse(localStorage.getItem("projects"));
        const newProjectsData = projectsData.filter(project => project.id != projectId);

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const newTasksData = tasks.filter(task => task.projectId != projectId);

        localStorage.setItem("projects", JSON.stringify(newProjectsData));
        localStorage.setItem("tasks", JSON.stringify(newTasksData));
    }

    /**
     * Load the tasks that are assigned to given project.
     * Returns array of objects of type Task.
     * @param {string} projectId - Id of project which tasks we want to get.
     */
    #loadProjectsTasks(projectId) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID or doesn't exist in storage.");
        }

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        return tasks
            .filter(task => task.projectId == projectId)
            .map(task => new Task({
                id: task.id,
                title: task.title,
                desc: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
            }));
    }

    /**
     * @param {string} projectId - Id of projects whose task this is. Must be UUID.
     * @param {object} task - Task that we are adding to project. Must be instance of Task.
     */
    storeTask(projectId, task) {
        if (typeof projectId != "string" || projectId.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID or doesn't exist in storage.");
        }

        if (!task instanceof Task) {
            throw new Error("Invalid task object passed. Must be instance of Task.");
        }

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push({
            projectId,
            id: task.Id,
            title: task.Title,
            description: task.Description,
            dueDate: task.DueDate,
            priority: task.Priority,
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
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

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const newTasksData = tasks.filter(task => task.projectId != projectId || task.id != taskId);
        localStorage.setItem("tasks", JSON.stringify(newTasksData));
    }
}
