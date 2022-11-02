import { Socket } from 'socket.io';
import { User } from '../models';

export * from './test.service';
export * from './google-auth.service';
export * from './auth.service';
export * from './quiz.service';
export * from './socket.service';

export type UserSocket = Socket & { user: User };