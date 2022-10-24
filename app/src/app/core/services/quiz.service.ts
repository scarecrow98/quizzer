import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
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

  saveQuizAnswer(questionId: number, answer: string): Observable<{ success: boolean, message?: string }> {
    return this.http.post<ApiResponse>('/quiz/answer/save', { questionId, answer }).pipe(
      map(resp =>  ({ success: resp.status })),
      catchError(err => {
        console.log(err)
        return of({ success: false, message: err.error.message || 'Error' })
      })
    )
  }

  getQuizUserAnswers(quizId: number): Observable<any> {
    return this.http.get('/quiz/answer/user-answers', {
      params: {
        quizId: quizId + ''
      }
    });
  }
}
