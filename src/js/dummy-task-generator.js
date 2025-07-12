export class DummyTaskGenerator {
    #availableTasks = [
        {
            title: "Do the dishes",
            desc: "After you eat make sure to clean them!",
            dueDate: new Date(),
            priority: 5,
        },
        {
            title: "Take the dog out for a walk",
            desc: "It's going to make you feel better too.",
            dueDate: new Date(),
            priority: 8,
        },
        {
            title: "Take the garbage out",
            desc: "You don't want the stink.",
            dueDate: new Date(),
            priority: 10,
        }
    ];

    getTask() {
        const randomIndex = Math.floor(Math.random() * this.#availableTasks.length);
        return this.#availableTasks[randomIndex];
    }
}
