import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dialog-add-clip',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dialog-add-clip.component.html',
  styleUrl: './dialog-add-clip.component.scss',
})
export class DialogAddClipComponent {
  firestore = inject(Firestore);
  firebaseApp = inject(FirebaseApp);
  storage = getStorage(
    this.firebaseApp,
    'gs://leaderboard-v2-9709d.appspot.com'
  );
  clipsCollectionRef = collection(this.firestore, 'clips');
  loading: boolean = false;
  dialogRef = inject(DialogRef<DialogAddClipComponent>);
  userService = inject(UserService);
  selectedFile: File | null = null;
  noFileSelected: boolean = false;
  clipTitle = signal<string>('');

  async onSubmit(ngForm: NgForm) {
    try {
      if (!this.userService.guest) {
        if (ngForm.valid && ngForm.submitted && this.selectedFile) {
          this.loading = true;
          await this.uploadImage(this.selectedFile);
          this.loading = false;
        } else {
          this.noFileSelected = true;
        }
      } else {
        this.userService.openSnackBar();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addClipToFirestore(url: string) {
    await addDoc(this.clipsCollectionRef, {
      name: url,
      title: this.clipTitle(),
    });
  }

  async uploadImage(file: File) {
    const imageUrlPath = 'clips/';
    const storageRef = ref(this.storage, imageUrlPath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    this.addClipToFirestore(url);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  triggerFileInput(): void {
    this.noFileSelected = false;
    const fileInput = document.getElementById('clips') as HTMLInputElement;
    fileInput.click();
  }

  deleteFile() {
    this.selectedFile = null;
  }
}
