import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);
  user$: Observable<User | null> = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined);

  register(
    email: string,
    password: string,
    username: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username }).then(() =>
        response.user.reload().then(() => {
          console.log(response.user);
        })
      )
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  checkLoginStatus() {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        this.currentUserSignal.set(user);
      } else {
        this.currentUserSignal.set(user);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
