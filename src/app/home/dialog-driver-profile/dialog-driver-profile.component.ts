import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dialog-driver-profile',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-driver-profile.component.html',
  styleUrl: './dialog-driver-profile.component.scss',
})
export class DialogDriverProfileComponent {
  userService = inject(UserService);
  public dialogRef = inject(MatDialogRef<DialogDriverProfileComponent>);
}
