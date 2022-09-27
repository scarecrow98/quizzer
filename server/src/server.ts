//core imports
import * as dotenv from 'dotenv';
dotenv.config();

import { Application, DB } from './core';

//controller
import { AuthController } from './controllers';
import { GoogleAuthService, TestService, AuthService } from './services';
import { initUserModel, User } from './models';
import { initQuizModel, Quiz } from './models/quiz.model';
import { initQuizQuestionModel, QuizQuestion } from './models/quiz-question.model';


let port = 3000;
if (process.env.PORT) {
    port = parseInt(process.env.PORT);
}

const app = new Application(port);

//register services
app.container.register(TestService, new TestService());
app.container.register(GoogleAuthService, new GoogleAuthService());
app.container.register(AuthService, new AuthService());

//enable middlewares
app.setupMiddlewares();

//register MVC controllers
app.registerControllers([
    AuthController
]);

//init database models
initUserModel(DB);
initQuizModel(DB);
initQuizQuestionModel(DB);
User.hasMany(Quiz, { foreignKey: 'user_id', sourceKey: 'id' });
Quiz.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
Quiz.hasMany(QuizQuestion, { foreignKey: 'quiz_id', sourceKey: 'id' });
QuizQuestion.belongsTo(Quiz, { foreignKey: 'quiz_id', targetKey: 'id' });



app.start(() => {
    console.log('Application started on port ' + app.port);
})