import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private loginService: LoginService
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
    this.loginService.verifyToken(googleUser.credential).subscribe(resp => {
      console.log(resp);
    });
  }

}
