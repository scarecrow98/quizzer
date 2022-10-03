import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '../core/constants';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private loginService: LoginService,
    private router: Router,
    private zone: NgZone
  ) {
    (window as any).onGoogleAuth = this.onGoogleAuth;

    const script = this.document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.defer = true;
    script.async = true;

    this.document.head.appendChild(script);
  }

  ngOnInit(): void {
  }

  onGoogleAuth = (googleUser: any) => {
    this.zone.run(() => {
      this.loginService.verifyToken(googleUser.credential).subscribe(resp => {
        if (resp.status) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.JWT_TOKEN, resp.data!.token);
          this.router.navigate([ '/dashboard' ]);
        }
      });
    });
  }

}
