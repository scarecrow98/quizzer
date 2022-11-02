import express  from "express";
import { RouteInfo } from "./decorators";
import { resolve, join } from 'path';
import Container from "./container";
import { authMiddleware } from "./middlewares";
import { AuthService } from "../services";
const cors = require('cors');

export class Application {
    public readonly container: Container = new Container();

    public readonly port: number;

    public readonly server: express.Express;

    private controllers: any[] = [];

    private protectedRoutes: string[] = [];

    constructor(port: number) {
        this.port = port;
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

    setupMiddlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(authMiddleware(this.container.get(AuthService), this.protectedRoutes));
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

                if (route.auth) {
                    this.protectedRoutes.push(fullRoute);
                }
            });
        });
    }
}
