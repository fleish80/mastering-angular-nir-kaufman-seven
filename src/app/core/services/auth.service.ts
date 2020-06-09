import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import {switchMap} from 'rxjs/operators';
import { User as FirebaseUser } from 'firebase';

export interface User {
  uid: string;
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
  ) {
    this.currentUser$ = angularFireAuth.authState.pipe(
      switchMap((user: FirebaseUser) => {
        if (user) {
          return angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credetionals =  await this.angularFireAuth.signInWithPopup(provider);
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${credetionals.user.uid}`);
    const userData: User = {
      uid: credetionals.user.uid,
      display_name: credetionals.user.displayName,
      email: credetionals.user.email,
      image_url: credetionals.user.photoURL,
      roles: {memeber: true}
    };
    await this.router.navigate(['/members']);
    return userRef.set(userData, {merge: true});
  }

  async signOut() {
    await this.angularFireAuth.signOut();
    await this.router.navigate(['/home']);
  }
}
