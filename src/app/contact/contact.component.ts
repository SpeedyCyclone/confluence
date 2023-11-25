import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contact: any;
  constructor(private Router: Router, private firestore: Firestore) {
    this.contact = new FormGroup({
      cyber: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const collectionInstance = collection(
      this.firestore,
      'confluence/contact/form'
    );
    addDoc(collectionInstance, this.contact.value)
      .then(() => {
        console.log('gg');
        this.Router.navigate(['/']);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
