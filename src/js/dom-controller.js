import { Project } from "./project.js";

export class DomController {
    /**
     * Render the projects onto a page
     * @param {Array} projects - array of projects (Objects of type Project).
     */
    renderProjects(projects) {
        try {
            this.#checkIfProjectArray(projects);
        }
        catch {
            console.log("There was an error in showing the projects. Try again later.");
        }

        projects.forEach((project) => {
            console.log(project);
        });
    }

    #checkIfProjectArray(array) {
        if (!Array.isArray(array)) {
            throw new Error("Must pass object that is instance of Project.");
        }

        if (array.length == 0) {
            throw new Error("Array must contain at least one element.");
        }

        array.forEach((x) => {
            if (!x instanceof Project) {
                throw new Error("Array element must be a object that is instance of Project.");
            }
        });
    }
}
