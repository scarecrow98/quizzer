import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<User | null>(null);
  public user$ = this._user.asObservable();

  constructor(private http: HttpClient) { }

  setUser(user: User|null) {
    this._user.next(user);
  }

  get userValue(): User | null {
    return this._user.value;
  }

  check(): Observable<boolean> {
    return this.http.get<ApiResponse<{ user: User }>>('/auth/check').pipe(
      map(response => {
        if (response.status) {
          this._user.next(response.data!.user);
        }

        return response.status;
      }),
      catchError(err => of(false))
    );
  }
}
