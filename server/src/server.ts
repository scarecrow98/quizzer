//core imports
import * as dotenv from 'dotenv';
dotenv.config();

//socket things
import { Server as SocketServer } from 'socket.io';
import { createServer as http_createServer } from 'http';

import { Application, DB } from './core';

//controller
import { AuthController, QuizController } from './controllers';
import { GoogleAuthService, TestService, AuthService, QuizService, SocketService } from './services';
import {
    initUserModel,
    User,
    initQuizModel,
    Quiz,
    initQuizQuestionModel,
    QuizQuestion,
    initAnswerModel,
    Answer
} from './models';

let port = 3000;
if (process.env.PORT) {
    port = parseInt(process.env.PORT);
}

const app = new Application(port);
const socketHttpServer = http_createServer(app.server);
const io = new SocketServer(socketHttpServer, {
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
    }
});

//register services
app.container.register(TestService, new TestService());
app.container.register(GoogleAuthService, new GoogleAuthService());
app.container.register(AuthService, new AuthService());
app.container.register(QuizService, new QuizService());
app.container.register(
    SocketService,
    new SocketService(
        io,
        app.container.get(AuthService),
        app.container.get(QuizService)
    )
);

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
initAnswerModel(DB);
User.Quizes = User.hasMany(Quiz, { foreignKey: 'created_by', sourceKey: 'id', as: 'quizes' });
Quiz.User = Quiz.belongsTo(User, { foreignKey: 'created_by', targetKey: 'id', as: 'user' });
Quiz.Questions = Quiz.hasMany(QuizQuestion, { foreignKey: 'quiz_id', sourceKey: 'id', as: 'questions' });
QuizQuestion.Quiz = QuizQuestion.belongsTo(Quiz, { foreignKey: 'quiz_id', targetKey: 'id', as: 'quiz' });
QuizQuestion.Answers = QuizQuestion.hasMany(Answer, { foreignKey: 'question_id', sourceKey: 'id', as: 'answers' });
Answer.User = Answer.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
Answer.QuizQuestion = Answer.belongsTo(QuizQuestion, { foreignKey: 'question_id', targetKey: 'id', as: 'question' });


app.start(() => {
    console.log('Application started on port ' + app.port);
})

socketHttpServer.listen(4100, () => {
    console.log('Socket server listening');
});