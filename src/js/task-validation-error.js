export class TaskValidationError extends Error {
    /**
     * @param {string} message - Error message
     * @param {string} element - Form element that failed validation
     */
    constructor(message, element) {
        super(message)
        this.name = "ValidationError";
        this.element = element;
    }
}
