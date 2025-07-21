export class SubTask {
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
     * @param {object} subtaskData 
     * @param {string} [subtaskData.id = crypto.randomUUID()] - Id of subtask. Must be UUID.
     * @param {Boolean} [subtaskData.completed = false] - Whether this task was completed or not.
     * @param {string} subtaskData.title - Title of this subtask.
     */
    constructor(subtaskData) {
        const { id = crypto.randomUUID(), completed = false, title } = subtaskData;
        this.Id = id;
        this.Completed = completed;
        this.Title = title;
    }

    get Id() {
        return this.#id;
    }

    set Id(value) {
        if (typeof value != "string" || value.length != 36) {
            throw new Error("Invalid subtask id passed. Must be UUID.");
        }
        this.#id = value;
    }

    get Completed() {
        return this.#completed;
    }

    set Completed(value) {
        if (typeof value != "boolean") {
            throw new Error("Invalid completed value passed. Must be boolean.");
        }
        this.#completed = value;
    }

    get Title() {
        return this.#title;
    }

    set Title(value) {
        if (typeof value != "string" || value.length == 0) {
            throw new Error("Invalid subtask title passed. Must be a string with at least one character.");
        }
        this.#title = value;
    }
}
