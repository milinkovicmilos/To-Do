import { Task } from "./task.js";
import { ProjectValidationError } from "./project-validation-error.js";

export class Project {
    /**
     * UUID represeting the id of this project, used for identifying the object storage
     * @type {string}
     */
    #id;

    /**
     * @type {string}
     */
    #title;

    /**
     * @type {string}
     */
    #description;

    /**
     * Array of tasks of type Task
     * @type {array}
     */
    #tasks = [];

    /**
     * Returns the index of task with given id from tasks array.
     * Returns -1 if not found.
     * @param {string} taskId - Task Id. Must be UUID
     */
    #getTaskIndexById(taskId) {
        for (let i = 0; i < this.#tasks.length; i++) {
            if (this.#tasks[i].Id == taskId) {
                return i;
            }
        }
        return -1;
    }

    /**
     * @param {object} projectData
     * @param {string} [projectData.id=crypto.randomUUID()] - Project UUID, if ommited generates a new one
     * @param {string} projectData.title - Projects title
     * @param {string} projectData.desc - Projects description
     * @param {Array} [projectData.tasks=[]] - Tasks for given project
     */
    constructor(projectData) {
        const { id = crypto.randomUUID(), title, desc, tasks = [] } = projectData;
        this.Id = id;
        this.Title = title;
        this.Description = desc;
        tasks.forEach(task => this.addTask(task));
    }

    get Id() {
        return this.#id;
    }

    /**
     * @param {string} value
     */
    set Id(value) {
        if (typeof value != "string" || value.length != 36) {
            throw new Error("Invalid project id passed. Must be UUID.");
        }
        this.#id = value;
    }

    get Title() {
        return this.#title;
    }

    /**
     * @param {string} value
     */
    set Title(value) {
        if (typeof value != "string" || value == "") {
            throw new ProjectValidationError("Invalid Project title.", "title");
        }
        this.#title = value;
    }

    get Description() {
        return this.#description;
    }

    /**
     * @param {string} value
     */
    set Description(value) {
        if (typeof value != "string" || value == "") {
            throw new ProjectValidationError("Invalid Project description.", "description");
        }
        this.#description = value;
    }

    get Tasks() {
        return this.#tasks;
    }

    set Tasks(value) {
        if (!Array.isArray(value)) {
            throw new Error("Must pass array of Tasks.");
        }

        value.forEach(task => {
            if (!task instanceof Task) {
                throw new Error("Invalid object in array. All objects must be instance of Task.");
            }
            this.#tasks.push(task);
        });
    }

    /**
     * Gets a single task object.
     * @param {number} index - Index of the task we wish to get.
     */
    getTask(index) {
        if (typeof index != 'number' || index < 0 || index > this.Tasks.length - 1) {
            throw new Error("Invalid task index passed.");
        }
        return this.#tasks[index];
    }

    /**
     * @param {object} task - Task object (instance of Task) to add
     */
    addTask(task) {
        if (!task instanceof Task) {
            throw new Error("Invalid object passed. Object must be instance of Task.");
        }
        this.#tasks.push(task);
    }

    /**
     * @param {string} taskId - Id of task we want to remove
     */
    removeTask(taskId) {
        if (typeof taskId != "string" || taskId.length != 36) {
            throw new Error("Invalid task id passed. Must be UUID.");
        }

        const index = this.#getTaskIndexById(taskId);
        if (index == -1) {
            throw new Error("Invalid task id passed. Task doesn't exist.");
        }
        this.#tasks.splice(index, 1);
    }
}
