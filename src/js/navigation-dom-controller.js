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
    }

    /**
     * Renders the navigation into headers nav element
     * @param {object} [project=undefined] - Currently selected project. Optional parameter.
     */
    render(appController, project) {
        const nav = document.querySelector("header nav");
        nav.innerHTML = "";
        switch (this.#domController.State) {
            case 0:
                nav.append(
                    this.#createTitle()
                );
                break;

            case 1:
                nav.append(
                    ...this.#createNavigationButtons(appController, project)
                );
                break;
        }
    }

    #createTitle() {
        const title = document.createElement('h2');
        title.textContent = "To-Do list";

        return title;
    }

    #createNavigationButtons(appController, project) {
        const prevButton = document.createElement('button');
        prevButton.id = "prev-project";
        prevButton.textContent = "Previous Project";
        prevButton.addEventListener('click', function() {
            appController.showPreviousProject(project);
        });

        const nextButton = document.createElement('button');
        nextButton.id = "next-project";
        nextButton.textContent = "Next Project";
        nextButton.addEventListener('click', function() {
            appController.showNextProject(project);
        });

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
        const title = document.querySelector("#selected-project-title");
        title.textContent = `Selected Project: ${value}`;
    }

    disablePreviousProjectButton() {
        const button = document.querySelector("#prev-button");
        button.setAttribute("disabled", "disabled");
    }
}
