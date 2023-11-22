import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  register: any;
  constructor(private Router: Router) {
    this.register = new FormGroup(
      {
        id: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
  }

  passwordMatchValidator(fg: AbstractControl) {
    return fg.get('password')?.value === fg.get('confirm')?.value
      ? null
      : { notmatched: true };
  }
  onSubmit() {}
}
