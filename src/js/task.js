import { TaskValidationError } from "./task-validation-error";
import { isValid } from "date-fns";

export class Task {
    /**
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
     * @type {string}
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
     * @param {string} [id = crypto.randomUUID()] - Task id. Must be UUID.
     */
    constructor(title, desc, dueDate, priority, id = crypto.randomUUID()) {
        this.Title = title;
        this.Description = desc;
        this.DueDate = dueDate;
        this.Priority = priority;
        this.Id = id;
    }

    get Id() {
        return this.#id;
    }

    set Id(value) {
        if (typeof value != "string" || value.length != 36) {
            throw new Error("Invalid task id passed. Must be UUID.");
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
            throw new TaskValidationError("Invalid Task title.", "Title");
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
            throw new TaskValidationError("Invalid Task description.", "Description");
        }
        this.#description = value;
    }

    get DueDate() {
        return this.#dueDate;
    }

    /**
     * @param {string} value
     */
    set DueDate(value) {
        if ((typeof value == "string" && value.length == 0) || typeof (value) != "string") {
            return;
        }

        if (isValid(value)) {
            throw new TaskValidationError(
                "Invalid Date string passed. Must be in YYYY-MM-DD format.",
                "Invalid date selected"
            );
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
            throw new TaskValidationError("Invalid priority value passed. Value must be between 0 and 10.", "Priority");
        }
        this.#priority = value;
    }
}
