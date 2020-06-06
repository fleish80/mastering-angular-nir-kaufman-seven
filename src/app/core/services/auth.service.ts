import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

interface User {
  email: string;
  display_name: string;
  image_url: string;
  roles: any;
}

@Injectable({
  providedIn: 'platform',
})
export class AuthService {
  readonly currentUser$: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}

  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credetionals =  await this.angularFireAuth.signInWithPopup(provider);
    console.log(credetionals);
  }

  async signOut() {
    await this.angularFireAuth.signOut();
  }
}
