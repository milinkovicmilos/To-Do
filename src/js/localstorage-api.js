import { Project } from "./project.js";
import { Task } from "./task.js";
import { SubTask } from "./subtask.js";

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

        const subtasks = localStorage.getItem("subtasks");
        if (subtasks == null) {
            localStorage.setItem("subtasks", "[]");
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
                completed: task.completed,
                title: task.title,
                desc: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                subtasks: this.#loadTasksSubtasks(task.id)
            }));
    }

    /**
     * @param {string} taskid - Id of task we want to get the subtasks of. Must be UUID.
     */
    #loadTasksSubtasks(taskId) {
        if (typeof taskId != "string" || taskId.length != 36) {
            throw new Error("Invalid task id passed. Must be UUID or doesn't exist in storage.");
        }

        const subtasks = JSON.parse(localStorage.getItem("subtasks"));
        return subtasks
            .filter(subtask => subtask.taskId == taskId)
            .map(subtask => new SubTask({
                id: subtask.id,
                completed: subtask.completed,
                title: subtask.title,
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
            completed: task.Completed,
            title: task.Title,
            description: task.Description,
            dueDate: task.DueDate,
            priority: task.Priority,
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        this.storeSubtasks(task.Id, task.Subtasks);
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

    changeTaskCompletion(projectId, taskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const newTaskData = tasks.map(task => {
            if (task.projectId == projectId && task.id == taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(newTaskData));
    }

    /**
     * @param {string} taskId - Id of task this subtask is for. Must be UUID.
     * @param {object} subtask - Subtask we want to save. Must be instance of SubTask.
     */
    storeSubtask(taskId, subtask) {
        if (typeof taskId != "string" || taskId.length != 36) {
            throw new Error("Invalid task id. Must be UUID.");
        }

        if (!subtask instanceof SubTask) {
            throw new Error("Invalid subtask object passed. Must be instance of SubTask.");
        }

        const subtasks = JSON.parse(localStorage.getItem("subtasks"));
        subtasks.push({
            taskId,
            id: subtask.Id,
            completed: subtask.Completed,
            title: subtask.Title,
        });
        localStorage.setItem("subtasks", JSON.stringify(subtasks));
    }

    /**
     * @param {string} taskId - Id of task this subtask is for. Must be UUID.
     * @param {Array} subtasks - Array of subtasks we want to save. Element of array must be instance of SubTask.
     */
    storeSubtasks(taskId, subtasks) {
        if (typeof taskId != "string" || taskId.length != 36) {
            throw new Error("Invalid task id. Must be UUID.");
        }

        const subtasksData = JSON.parse(localStorage.getItem("subtasks"));
        subtasks.forEach(subtask => {
            if (!subtask instanceof SubTask) {
                throw new Error("Invalid subtask object passed. Must be instance of SubTask.");
            }

            subtasksData.push({
                taskId,
                id: subtask.Id,
                completed: subtask.Completed,
                title: subtask.Title,
            });
        });
        localStorage.setItem("subtasks", JSON.stringify(subtasksData));
    }

    /**
     * @param {string} taskId - Id of task this subtask is for. Must be UUID.
     * @param {string} subtaskId - Id of subtask we want to remove. Must be instance of SubTask.
     */
    removeSubtask(taskId, subtaskId) {
        if (typeof taskId != "string" || taskId.length != 36) {
            throw new Error("Invalid task id. Must be UUID.");
        }

        if (typeof subtaskId != "string" || subtaskId.length != 36) {
            throw new Error("Invalid subtask id. Must be UUID.");
        }

        const subtasks = JSON.parse(localStorage.getItem("subtasks"));
        const newSubtasksData = subtasks.filter(subtask => subtask.taskId != taskId || subtask.id != subtaskId);
        localStorage.setItem("subtasks", JSON.stringify(newSubtasksData));
    }

    changeSubtaskCompletion(taskId, subtaskId) {
        if (typeof taskId != "string" || taskId.length != 36) {
            throw new Error("Invalid task id. Must be UUID.");
        }

        if (typeof subtaskId != "string" || subtaskId.length != 36) {
            throw new Error("Invalid subtask id. Must be UUID.");
        }

        const subtasks = JSON.parse(localStorage.getItem("subtasks"));
        const newSubtaskData = subtasks.map(subtask => {
            if (subtask.taskId == taskId && subtask.id == subtaskId) {
                return { ...subtask, completed: !subtask.completed };
            }
            return subtask;
        });
        localStorage.setItem("subtasks", JSON.stringify(newSubtaskData));
    }
}
