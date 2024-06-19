import { Component, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dialog-driver-profile',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule],
  templateUrl: './dialog-driver-profile.component.html',
  styleUrl: './dialog-driver-profile.component.scss',
})
export class DialogDriverProfileComponent {
  userService = inject(UserService);
  public dialogRef = inject(MatDialogRef<DialogDriverProfileComponent>);
  profile = inject(MAT_DIALOG_DATA);
}
