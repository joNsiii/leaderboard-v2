import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Driver } from '../../../models/add-driver.model';
import { FirebaseService } from '../../services/firebase.service';
import { User } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dialog-add-driver',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-add-driver.component.html',
  styleUrl: './dialog-add-driver.component.scss',
})
export class DialogAddDriverComponent {
  public dialogRef = inject(MatDialogRef<DialogAddDriverComponent>);
  private data = inject(MAT_DIALOG_DATA);
  public firestoreService = inject(FirebaseService);
  authService = inject(AuthService);
  currentUser: User | null | undefined;
  driver = new Driver();
  filteredCars: string[] = [];
  cars: any = {
    gt3: ['Ferrari', 'Porsche'],
    hypercars: ['McLaren P1', 'Ferrari LaFerrari'],
  };

  ngAfterContentChecked(): void {
    this.currentUser = this.authService.currentUserSignal();
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      this.driver.driver = this.currentUser?.displayName;
      this.driver.msec = this.getTimeInMilliseconds(this.driver.time);
      await this.firestoreService.addNewTime(this.data, this.driver);
      this.dialogRef.close();
    } else {
      console.log('form invalid');
    }
  }

  selectCars(event: any) {
    const selectedClass = event;
    this.filteredCars = this.cars[selectedClass];
  }

  getTimeInMilliseconds(time: string) {
    let splittedTime = time.split('.');
    let minutes = parseInt(splittedTime[0], 10);
    let seconds = parseInt(splittedTime[1], 10);
    let milliSeconds = parseInt(splittedTime[2], 10);
    return minutes * 60 * 1000 + seconds * 1000 + milliSeconds;
  }
}
