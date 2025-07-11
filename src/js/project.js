import { Task } from "./task.js";

export class Project {
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
     * @param {string} title - Projects title
     * @param {string} desc - Projects description
     */
    constructor(title, desc) {
        this.Title = title;
        this.Description = desc;
    }

    get Title() {
        return this.#title;
    }

    /**
     * @param {string} value
     */
    set Title(value) {
        if (typeof value != "string" || value == "") {
            throw new Error("Invalid Project title.");
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
            throw new Error("Invalid Project description.");
        }
        this.#description = value;
    }

    get Tasks() {
        return this.#tasks;
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
     * @param {number} index
     */
    removeTask(index) {
        if (typeof index != "number" || index < 0 || index > Tasks.length) {
            throw new Error("Invalid taks index passed.");
        }
        this.#tasks.splice(index, 1);
    }
}
