import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  signOut,
  user,
  createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword
} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {UserInterface} from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  firebaseAuth = inject(Auth);
  currentUserSig = signal<UserInterface | undefined | null>(undefined);
  user$ = user(this.firebaseAuth);

  register(
    email: string,
    password: string,
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((response) =>
      updateProfile(response.user, { displayName: 'username' }),
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {})
    return from(promise);
  }

  logout() : Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
