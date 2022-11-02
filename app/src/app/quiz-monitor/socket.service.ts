import { Socket, SocketIoConfig } from 'ngx-socket-io';

export class SocketService {
  public readonly socket: Socket;

  constructor(url: string, authToken: string, quizTag: string) {
    const socketConfig: SocketIoConfig = {
      url: url,
      options: {
        autoConnect: true,
        extraHeaders: {
          'Authorization': authToken,
          'QuizTag': quizTag
        }
      }
    };

    this.socket = new Socket(socketConfig);
  }
}
