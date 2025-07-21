import { TaskValidationError } from "./task-validation-error";
import { isValid } from "date-fns";

export class Task {
    /**
     * @type {string}
     */
    #id;

    /**
     * @type {Boolean}
     */
    #completed;

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
     * @param {object} taskData
     * @param {string} [taskData.id = crypto.randomUUID()] - Task id. Must be UUID.
     * @param {Boolean} [taskdata.completed = false] - Whether the task has been completed or not.
     * @param {string} taskData.title - Title of the task.
     * @param {string} taskData.desc - Description of the task.
     * @param {string} [taskData.dueDate = ""] - Date by which the task should be completed.
     * @param {string} [taskData.priority = "0"] - The priority of the task. Number between 1 and 10, 10 being the high priority.
     */
    constructor(taskData) {
        const { id = crypto.randomUUID(), completed = false, title, desc, dueDate = "", priority = "0" } = taskData;
        this.Id = id;
        this.Completed = completed;
        this.Title = title;
        this.Description = desc;
        this.DueDate = dueDate;
        this.Priority = priority;
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

    get Completed() {
        return this.#completed;
    }

    set Completed(value) {
        if (typeof value != "boolean") {
            throw new Error("Invalid data type passed. Completed must be a boolean value.");
        }
        this.#completed = value;
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
     * @param {string} value
     */
    set Priority(value) {
        if (typeof value == "string" && value.length == 0) {
            return;
        }

        value = Number(value);
        if (value < 0 || value > 10) {
            throw new TaskValidationError(
                "Invalid priority value passed. Value must be between 0 and 10.",
                "Priority value must be between 0 and 10");
        }
        this.#priority = value;
    }
}
