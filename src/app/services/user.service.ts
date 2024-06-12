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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);
  authService = inject(AuthService);
  userCollRef = collection(this.firestore, 'users');
  currentUser: User | null | undefined;
  currentUserProfile: UserProfile | undefined;
  allUserProfiles: any = [];

  constructor() {
    effect(() => {
      this.currentUser = this.authService.currentUserSignal();
      if (this.currentUser !== null && this.currentUser !== undefined) {
        // this.createUserProfile();
        this.getCurrentUser(this.currentUser.uid);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.currentUser) {
      const unsub: Unsubscribe = this.getCurrentUser(this.currentUser.uid);
      unsub();
    }
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
            age: 12,
            city: '',
            job: '',
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

  // async getCurrentUser() {
  //   if (this.currentUser) {
  // const userId = this.currentUser?.uid;
  // const docRef = this.getUserDocRef(userId);
  //     try {
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         this.currentUserProfile = docSnap.data() as UserProfile;
  //         return
  //       }
  //     } catch (error) {
  //       console.error('Error getting current user profile:', error);
  //     }
  //   }
  // }

  getCurrentUser(userId: string) {
    const docRef = this.getUserDocRef(userId);

    const unsub = onSnapshot(docRef, (user) => {
      this.currentUserProfile = user.data() as UserProfile;
      console.log(user.data());
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
}
