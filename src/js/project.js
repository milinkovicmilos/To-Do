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
     * @param {object} task
     */
    removeTask(task) {
        if (!task instanceof Task) {
            throw new Error("Invalid taks object passed. Object must be instance of Task.");
        }
        this.#tasks.splice(this.#tasks.findIndex(t => t == task), 1);
    }
}
