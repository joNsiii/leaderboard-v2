import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/app';
import { UserProfile } from '../../../models/User-profile.interface';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dialog-my-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './dialog-my-profile.component.html',
  styleUrl: './dialog-my-profile.component.scss',
})
export class DialogMyProfileComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  firebaseApp = inject(FirebaseApp);
  storage = getStorage(
    this.firebaseApp,
    'gs://leaderboard-v2-9709d.appspot.com'
  );
  user = this.authService.currentUserSignal();
  dialog = inject(MatDialogRef<DialogMyProfileComponent>);
  driverData: UserProfile | null = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    if (this.userService.currentUserProfile) {
      const profile = this.userService.currentUserProfile;
      this.driverData = { ...profile };
    }
  }

  async saveUserData() {
    try {
      if (!this.userService.guest) {
        if (this.selectedFile) {
          await this.uploadImage(this.selectedFile);
        }
        await this.userService.updateCurrentUser(this.driverData);
        this.closeDialog();
      } else {
        this.userService.openSnackBar();
      }
    } catch (error) {
      console.error(error);
    }
  }

  closeDialog() {
    this.dialog.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadImage(file: File) {
    const currentUser = this.authService.currentUserSignal();
    if (currentUser) {
      const imageUrlPath = 'users/' + currentUser.uid + '/profile.jpg';
      const storageRef = ref(this.storage, imageUrlPath);
      await uploadBytes(storageRef, file);
      const Url = await getDownloadURL(storageRef);
      this.driverData!.profileImageUrl = Url;
    } else {
      console.error('User is not authenticated.');
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.click();
  }

  deleteFile() {
    this.selectedFile = null;
  }
}
