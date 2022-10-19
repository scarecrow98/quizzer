import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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

  getQuizByTag(tag: string): Observable<{ quiz: Quiz | null }> {
    return this.http.get(`/quiz/tag/${tag}`).pipe(
      map(resp => ({ quiz: resp as Quiz })),
      catchError(err => of({ quiz: null }))
    );
  }
}
