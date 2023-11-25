import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private auth: Auth, private Router: Router) {
    console.log(this.data1);
  }
  getUser() {
    return this.auth.currentUser;
  }
  data1 = this.getUser();

  logout() {
    this.auth.signOut().then(() => {
      this.Router.navigate(['']);
    });
  }
}
