import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../core/models/api-response.model';
import { User } from '../core/models/user.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  verifyToken(token: string) {
    return this.http.post<ApiResponse<{ token: string, user: User }>>('/auth/verify-token', { token });
  }
}
