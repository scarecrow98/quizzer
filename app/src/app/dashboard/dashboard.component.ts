import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, ChildActivationStart, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, filter, map, ReplaySubject, shareReplay, take, tap } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  headerTitle$ = new ReplaySubject<string | null>(1);
  
  constructor(
    public authService: AuthService,
    private router: Router
    ) {
      this.router.events.pipe(
        filter(event => (event instanceof ActivationEnd && event.snapshot.data['title'])),
        map(event => (event as ActivationEnd).snapshot.data['title']),
        distinctUntilChanged()
      ).subscribe(title => this.headerTitle$.next(title));
    }

  ngOnInit(): void {
  }

}
