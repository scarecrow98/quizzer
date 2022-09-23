import express  from "express";
import { RouteInfo } from "./decorators";
import { resolve, join } from 'path';
import Container from "./container";

export class Application {
    server: express.Express;

    port: number;

    controllers: any[] = [];

    container: Container;

    constructor(port: number, container: Container) {
        this.port = port;
        this.container = container;
        this.server = express();
    }

    registerControllers(controllers: any[] = []) {
        this.controllers = controllers;
        this.initializeRouteHandlers();
        this.setupFallbackRoutes();
    }

    start(callback?: (() => void | undefined)) {
        this.server.listen(this.port, callback);
    }

    private setupFallbackRoutes() {
        this.server.get('*', (req, res) => {
            res.sendFile(resolve(
                join(__dirname, '..', '..', 'public', 'index.html')
            ));
        });
    }

    /**
     * @see https://nehalist.io/routing-with-typescript-decorators/
     */
    private initializeRouteHandlers() {
        this.controllers.forEach(controller => {
            //todo: more strict checks on what 'controller' actually is
            const pathPropDesc = Object.getOwnPropertyDescriptor(controller, 'path');

            if (pathPropDesc === undefined) {
                return;
            }

            const basePath = pathPropDesc.value || '/';

            const routes = (Object.getOwnPropertyDescriptor(controller, 'routes')?.value || []) as Array<RouteInfo>;

            const controllerObject = new controller(this.container); //todo: inject controllet ctor deps
            routes.forEach(route => {
                const fullRoute = basePath + route.path;
                (this.server as any)[route.httpMethod](fullRoute, controllerObject[route.method].bind(controllerObject));
            });
        });
    }
}
