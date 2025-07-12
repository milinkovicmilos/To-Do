import { DomController } from "./dom-controller";

export class NavigationDomController {
    /**
     * The main dom controller that is responsible for this one
     * @type {object} domController
     */
    #domController;

    /**
     * @type {HTMLElement} nextButton
     */
    #nextButton;

    /**
     * @type {HTMLElement} prevButton
     */
    #prevButton;

    /**
     * @type {HTMLElement} selectedProjectTitle
     */
    #selectedProjectTitle;

    /**
     * @type {HTMLElement} mainTitle
     */
    #mainTitle;

    constructor(domController) {
        if (!domController instanceof DomController) {
            throw new Error("Invalid Dom Controller passed. Must be instance of DomController.");
        }
        this.#domController = domController;

        [this.#prevButton, this.#selectedProjectTitle, this.#nextButton] = this.#createNavigationButtons();
        this.#mainTitle = this.#createTitle();
    }

    /**
     * Renders the navigation into given element
     * @param {HTMLElement} parentElement - Element to render the HTMLElements into
     */
    render(parentElement) {
        switch (this.#domController.State) {
            case 0:
                parentElement.innerHTML = "";
                parentElement.append(
                    this.#mainTitle,
                );
                break;

            case 1:
                parentElement.innerHTML = "";
                parentElement.append([
                    this.#prevButton,
                    this.#selectedProjectTitle,
                    this.#nextButton,
                ]);
                break;
        }
    }

    #createTitle() {
        const title = document.createElement('h2');
        title.textContent = "To-Do list";

        return title;
    }

    #createNavigationButtons() {
        const prevButton = document.createElement('button');
        prevButton.id = "prev-project";

        const nextButton = document.createElement('button');
        nextButton.id = "next-project";

        const selectedProjectTitle = document.createElement('p');
        selectedProjectTitle.id = "selected-project-title";

        return [prevButton, selectedProjectTitle, nextButton];
    }

    updateSelectedProjectTitle(value) {
        if (typeof value != "string" || value == "") {
            throw new Error("Invalid value passed for selected project title.");
        }
        this.#selectedProjectTitle.textContent = `Selected Project: ${value}`;
    }
}
