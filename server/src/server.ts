//core imports
import * as dotenv from 'dotenv';
dotenv.config();

import { Application, DB } from './core';

//controller
import { AuthController, QuizController } from './controllers';
import { GoogleAuthService, TestService, AuthService, QuizService } from './services';
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
app.container.register(QuizService, new QuizService());

//enable middlewares
app.setupMiddlewares();

//register MVC controllers
app.registerControllers([
    AuthController,
    QuizController
]);

//init database models
initUserModel(DB);
initQuizModel(DB);
initQuizQuestionModel(DB);
User.Quizes = User.hasMany(Quiz, { foreignKey: 'created_by', sourceKey: 'id', as: 'quizes' });
Quiz.User = Quiz.belongsTo(User, { foreignKey: 'created_by', targetKey: 'id', as: 'user' });
Quiz.Questions = Quiz.hasMany(QuizQuestion, { foreignKey: 'quiz_id', sourceKey: 'id', as: 'questions' });
QuizQuestion.Quiz = QuizQuestion.belongsTo(Quiz, { foreignKey: 'quiz_id', targetKey: 'id', as: 'quiz' });



app.start(() => {
    console.log('Application started on port ' + app.port);
})