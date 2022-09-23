//core imports
import * as dotenv from 'dotenv';
dotenv.config();

import { Application, Container } from './core';

//controller
import { AuthController } from './controllers';
import { TestService } from './services';


let port = 3000;
if (process.env.PORT) {
    port = parseInt(process.env.PORT);
}

//register services
const container = new Container();
container.register(TestService, new TestService());

const app = new Application(port, container);

app.registerControllers([
    AuthController
]);

app.start(() => {
    console.log('Application started on port ' + app.port);
})