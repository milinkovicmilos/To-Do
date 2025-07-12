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
     * Renders the navigation into headers nav element
     */
    render() {
        const nav = document.querySelector("header nav");
        switch (this.#domController.State) {
            case 0:
                nav.innerHTML = "";
                nav.append(
                    this.#mainTitle,
                );
                break;

            case 1:
                nav.innerHTML = "";
                nav.append(
                    this.#prevButton,
                    this.#selectedProjectTitle,
                    this.#nextButton,
                );
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
        prevButton.textContent = "Previous Project";

        const nextButton = document.createElement('button');
        nextButton.id = "next-project";
        nextButton.textContent = "Next Project";

        const selectedProjectTitle = document.createElement('p');
        selectedProjectTitle.id = "selected-project-title";

        return [prevButton, selectedProjectTitle, nextButton];
    }

    /**
     * @param {string} value 
     */
    updateSelectedProjectTitle(value) {
        if (typeof value != "string" || value == "") {
            throw new Error("Invalid value passed for selected project title.");
        }
        this.#selectedProjectTitle.textContent = `Selected Project: ${value}`;
    }
}
