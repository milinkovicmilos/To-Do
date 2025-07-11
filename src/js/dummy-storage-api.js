import { Project } from "./project.js";

export class DummyStorageAPI {
    loadProjects() {
        return [
            new Project('Test Project one', 'Description of it'),
            new Project('Test Project two', 'Seconds description of it'),
            new Project('Test Project three', 'And the third'),
        ];
    };
}
