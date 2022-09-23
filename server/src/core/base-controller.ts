import Container from "./container";

export abstract class BaseController {
    protected container: Container;

    constructor(container: Container) {
        this.container = container;
    }
}