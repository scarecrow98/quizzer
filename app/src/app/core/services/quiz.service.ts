import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) {
    //empty
  }

  createQuiz(data: any): Observable<any> {
    return this.http.post('/quiz/create', data);
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>('/quiz/list');
  }
}
