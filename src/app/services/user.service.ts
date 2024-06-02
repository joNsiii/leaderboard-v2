import { Injectable, effect, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);
  authService = inject(AuthService);
  userCollRef = collection(this.firestore, 'users');
  currentUser: User | null | undefined = undefined;
  currentUserProfile: any;

  constructor() {
    effect(() => {
      this.currentUser = this.authService.currentUserSignal();
      if (this.currentUser !== undefined && this.currentUser !== null) {
        this.createUserProfile();
        this.getCurrentUser();
      }
    });
  }

  async createUserProfile() {
    if (this.currentUser !== undefined && this.currentUser !== null) {
      const userId = this.currentUser?.uid;
      const docRef = doc(this.userCollRef, userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return console.log('User already exists');
      } else {
        await setDoc(doc(this.userCollRef, userId), {
          name: this.currentUser.displayName,
          img: '',
          fullName: '',
          email: this.currentUser.email,
          aboutMe: '',
          age: 0,
          city: '',
          job: '',
        });
      }
    }
  }

  async getCurrentUser() {
    if (this.currentUser !== undefined && this.currentUser !== null) {
      const userId = this.currentUser?.uid;
      const docRef = doc(this.userCollRef, userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.currentUserProfile = docSnap.data();
        console.log(this.currentUserProfile);
      }
    }
  }

  async updateCurrentUser(userData:any) {
    if (this.currentUser !== undefined && this.currentUser !== null) {
      const userId = this.currentUser?.uid;
      const docRef = doc(this.userCollRef, userId);
      await updateDoc(docRef, userData)
    }
  }
}
