import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CreateQuizService {

  constructor(private http: HttpClient) {
    //empty
  }

  createQuiz(data: any): Observable<any> {
    return this.http.post('/quiz/create', data);
  }
}
