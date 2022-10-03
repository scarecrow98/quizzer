import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE_KEYS } from '../constants';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      url: environment.baseUrl + request.url,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)}`
      })
    });

    return next.handle(clonedRequest);
  }
}
