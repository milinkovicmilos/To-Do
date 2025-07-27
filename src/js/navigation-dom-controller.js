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
     * @param {object} appController
     * @param {object} [project=undefined] - Currently selected project. Optional parameter.
     */
    render(appController) {
        // Reset
        const header = document.querySelector("header");
        header.innerHTML = "";
        const nav = document.createElement("nav");
        nav.classList.add("flex-wrapper");

        switch (this.#domController.State) {
            case 0:
                const importExportWrapper = document.createElement("div");
                importExportWrapper.id = "import-export-wrapper";

                importExportWrapper.append(
                    this.#createImportButton(),
                    this.#createExportButton(appController),
                );

                const titleButtonWrapper = document.createElement("div");
                titleButtonWrapper.id = "title-button-wrapper";

                titleButtonWrapper.append(
                    this.#createTitle(),
                    this.#createNewProjectButton()
                );

                header.append(
                    titleButtonWrapper,
                    importExportWrapper
                );
                break;

            case 1:
                const wrapper = document.createElement("div");
                wrapper.classList.add("flex-wrapper");
                wrapper.append(
                    this.#createHomeButton(appController),
                    this.#createNewTaskButton(project),
                );
                header.append(
                    wrapper
                );
                nav.append(
                    ...this.#createNavigationButtons(appController, project)
                );
                header.append(nav);
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

    /**
     * @param {object} appController
     */
    #createHomeButton(appController) {
        const button = document.createElement("button");

        button.id = "home";
        button.textContent = "Home";
        button.addEventListener('click', function() {
            button.remove();
            appController.initializeHomePage(true);
        });

        return button;
    }

    #createNewProjectButton() {
        const button = document.createElement("button");
        button.id = "new-project";
        button.textContent = "New Project";

        button.addEventListener('click', () => {
            this.#domController.renderNewProjectForm();
        });

        return button;
    }

    #createNewTaskButton(project) {
        const button = document.createElement("button");
        button.id = "new-task";
        button.textContent = "New Task";

        button.addEventListener('click', () => {
            this.#domController.renderNewTaskForm(project);
        });

        return button;
    }

    #createImportButton() {
        const button = document.createElement("button");
        button.textContent = "Import";

        return button;
    }

    #createExportButton(appController) {
        const button = document.createElement("button");
        button.textContent = "Export";
        button.addEventListener('click', function() { appController.exportData(); });

        return button;
    }
}
