import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  verifyToken(token: string) {
    return this.http.post<{
      status: boolean,
      data?: {
        user: any,
        token: string
      }
    }>('http://localhost:4000/auth/verify-token', { token });
  }
}
