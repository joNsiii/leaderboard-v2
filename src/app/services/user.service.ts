import { Injectable, effect, inject } from '@angular/core';
import {
  Firestore,
  Unsubscribe,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';
import { UserProfile } from '../../models/User-profile.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);
  authService = inject(AuthService);
  userCollRef = collection(this.firestore, 'users');
  _snackBar = inject(MatSnackBar);
  currentUser: User | null | undefined;
  currentUserProfile: UserProfile | undefined;
  allUserProfiles: any = [];
  guest: boolean = false;

  constructor() {
    effect(() => {
      this.currentUser = this.authService.currentUserSignal();
      this.guest =
        this.authService.currentUserSignal()?.displayName === 'Guest';
      if (this.currentUser !== null && this.currentUser !== undefined) {
        this.getCurrentUser(this.currentUser.uid);
      }
    });
  }

  private getUserDocRef(userId: string) {
    return doc(this.userCollRef, userId);
  }

  getAllUserProfiles() {
    const q = query(this.userCollRef);
    const unsub = onSnapshot(q, (userProfiles) => {
      const profiles: any = [];
      userProfiles.forEach((doc) => {
        profiles.push(doc.data());
        this.allUserProfiles = profiles;
      });
    });
    return unsub;
  }

  async createUserProfile() {
    try {
      if (this.currentUser) {
        const userId = this.currentUser?.uid;
        const docRef = this.getUserDocRef(userId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const newUserProfile: UserProfile = {
            userName: this.currentUser.displayName,
            fullName: '',
            email: this.currentUser.email,
            aboutMe: '',
            age: 18,
            favoriteTrack: '',
            favoriteCar: '',
            profileImageUrl: '',
          };
          await setDoc(doc(this.userCollRef, userId), newUserProfile);
        } else {
          return;
        }
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  getCurrentUser(userId: string) {
    const docRef = this.getUserDocRef(userId);

    const unsub = onSnapshot(docRef, (user) => {
      this.currentUserProfile = user.data() as UserProfile;
    });
    return unsub;
  }

  async updateCurrentUser(userData: any) {
    if (this.currentUser) {
      const userId = this.currentUser?.uid;
      const docRef = doc(this.userCollRef, userId);
      try {
        await updateDoc(docRef, userData);
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }
  }

  openSnackBar() {
    this._snackBar.open('Please log in to use this function', 'OK', {
      panelClass: ['snackBarStyle', 'snackBarPosition'],
    });
  }
}
