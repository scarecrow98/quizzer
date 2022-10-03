import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
    //empty
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.check().pipe(
      tap(canLoad => {
        if (!canLoad) {
          this.router.navigate([ '/auth/login' ]);
        }
      })
    );
  }
  
}
