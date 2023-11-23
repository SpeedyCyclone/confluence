import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  register: any;
  constructor(
    private Router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.register = new FormGroup(
      {
        id: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      this.passwordMatchValidator
    );
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.Router.navigate(['profile']);
      } else {
        this.Router.navigate(['register']);
      }
    });
  }

  passwordMatchValidator(fg: AbstractControl) {
    return fg.get('password')?.value === fg.get('confirm')?.value
      ? null
      : { notmatched: true };
  }

  async emailLogin(email: string, password: string): Promise<any> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  onSubmit() {
    const collectionInstance = collection(
      this.firestore,
      'confluence/user/cyberid'
    );
    addDoc(collectionInstance, this.register.value)
      .then(() => {
        console.log('gg');
      })
      .catch((e) => {
        console.log(e);
      });
    const { email, password } = this.register.value;
    this.emailLogin(email, password)
      .then((user) => {
        //console.log(user);
        this.Router.navigate(['/profile']);
      })
      .catch(function (error) {
        var errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          alert('Invalid Email');
        }
        if (errorCode === 'auth/email-already-in-use') {
          alert('Email already in use');
        }
        console.log(error);
      });
  }
}
