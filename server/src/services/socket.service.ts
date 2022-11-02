import { Server as SocketServer, Socket } from 'socket.io';
import { DisconnectReason } from 'socket.io/dist/socket';
import { Quiz, QuizQuestion } from '../models';
import { AuthService } from './auth.service';
import { QuizService } from './quiz.service';

export class SocketService {

    constructor(
        private io: SocketServer,
        private authService: AuthService,
        private quizService: QuizService) {

        this._setupAuthMiddleware();
        this._setupListeners();
    }

    async updateQuizMonitor(quiz: Quiz) {
        const data = await this.quizService.getQuizAnswerStatsById(quiz.id);

        this.io.to(quiz!.tag).emit('update', data);
    }

    private _setupListeners() {
        this.io.on('connection', (socket) => {
            console.log('Socket connected', socket.id);

            const quizTag = socket.handshake.headers.quiztag! as string;
            this.quizService.getQuizByTag(quizTag).then(quiz => {
                if (!quiz) {
                    socket.disconnect();
                    return;
                }

                socket.join(quizTag);
                this.updateQuizMonitor(quiz);
            });

            socket.on('disconnect', (reason) => this._onDisconnect(socket, reason));
            // socket.on('message', (message) => this._onMessage(socket, message));
        })
    }

    private _setupAuthMiddleware() {
        this.io.use(async (socket, next) => {
            const jwt = socket.handshake.headers.authorization || '';
            
            let user;
            try {
                user = await this.authService.checkToken(jwt);
            } catch (err) {
                user = null;
            }
            
            if (!user || !socket.handshake.headers.quiztag) {
                console.log('socket authentication failed');
                socket.disconnect();
                return next(new Error('authentication failed'));
            }
            
            Object.defineProperty(socket, 'user', user);

            next();
        });
    }

    private _onDisconnect(socket: Socket, reason: DisconnectReason) {
        console.log('Socket disconnect', socket.id, reason);
    }

    private _onMessage(socket: Socket, message: any) {
        console.log('socket message', socket.id, message);
    }
}