import { AppController } from "./app-controller";
import { Project } from "./project.js";

export class ProjectsDomController {
    /**
     * Renders the projects into given element
     * @param {HTMLElement} parentElement - Element to render the HTMLElements into
     * @param {Array} projects - Array of projects that we wish to render. Elements of array must be instance of Project
     */
    render(appController, parentElement, projects) {
        if (!appController instanceof AppController) {
            throw new Error("Invalid App controller passed. Must be instance of AppController.");
        }

        projects.forEach((project) => {
            if (!project instanceof Project) {
                throw new Error("Only Elements of type Project can be rendered.");
            }
            parentElement.append(
                this.#createProjectCard(appController, project)
            );
        })
    }

    #createProjectCard(appController, project) {
        const card = document.createElement('div');
        card.addEventListener('click', function() {
            appController.showProject(project);
        });

        const projectTitle = document.createElement('p');
        projectTitle.textContent = project.Title;

        const projectDesc = document.createElement('p');
        projectDesc.textContent = project.Description;

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.textContent = 'Delete';
        deleteProjectButton.addEventListener('click', (event) => {
            event.stopPropagation();
            appController.removeProject(project);
            card.remove();
        });

        card.append(projectTitle, projectDesc, deleteProjectButton);
        return card;
    }
}
