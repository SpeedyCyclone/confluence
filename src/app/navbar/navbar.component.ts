import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  text = 'register';
  link = '/register';
  constructor(public router: Router, public auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.text = 'Profile';
        this.link = '/profile';
      } else {
        this.text = 'Register';
        this.link = '/register';
      }
    });
  }
}
