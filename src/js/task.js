export class Task {
    /**
     * @type {string}
     */
    #title;

    /**
     * @type {string}
     */
    #description;

    /**
     * @type {Date}
     */
    #dueDate;

    /**
     * @type {number}
     */
    #priority;

    /**
     * @param {string} title - Title of the task.
     * @param {string} desc - Description of the task.
     * @param {Date} dueDate - Date by which the task should be completed.
     * @param {number} priority - The priority of the task. Number between 1 and 10, 10 being the high priority.
     */
    constructor(title, desc, dueDate, priority) {
        this.Title = title;
        this.Description = desc;
        this.DueDate = dueDate;
        this.Priority = priority;
    }

    get Title() {
        return this.#title;
    }

    /**
     * @param {string} value
     */
    set Title(value) {
        if (typeof value != "string" || value == "") {
            throw new Error("Invalid Task title.");
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
            throw new Error("Invalid Task description.");
        }
        this.#description = value;
    }

    get DueDate() {
        return this.#dueDate;
    }

    /**
     * @param {Date} value
     */
    set DueDate(value) {
        if (!value instanceof Date) {
            throw new Error("Invalid Date object passed. Object must be instance of Date");
        }
        this.#dueDate = value;
    }

    get Priority() {
        return this.#priority;
    }

    /**
     * @param {number} value
     */
    set Priority(value) {
        if (typeof value != "number" || value < 0 || value > 10) {
            throw new Error("Invalid priority value passed. Value must be between 0 and 10.");
        }
        this.#priority = value;
    }
}
