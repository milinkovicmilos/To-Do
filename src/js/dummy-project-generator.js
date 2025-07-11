export class DummyProjectGenerator {
    #availableProjects = [
        {
            title: "Housekeeping",
            desc: "Gotta make sure everything is in check",
        },
        {
            title: "Passion Project",
            desc: "Slowly but surely",
        },
        {
            title: "Guitar",
            desc: "Practice makes perfect",
        }
    ];

    getProject() {
        const randomIndex = Math.floor(Math.random() * this.#availableProjects.length);
        return this.#availableProjects[randomIndex];
    }
}
