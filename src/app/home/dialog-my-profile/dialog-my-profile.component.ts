import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-my-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog-my-profile.component.html',
  styleUrl: './dialog-my-profile.component.scss',
})
export class DialogMyProfileComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  dialog = inject(MatDialogRef<DialogMyProfileComponent>)
  driverData = {
    name: '',
    email: '',
    age: 0,
    city: '',
    job: '',
    aboutMe: '',
    fullName: '',
  };

  ngOnInit(): void {
    if (this.userService.currentUserProfile) {
      this.driverData.name = this.userService.currentUserProfile.name;
      this.driverData.email = this.userService.currentUserProfile.email;
      this.driverData.age = this.userService.currentUserProfile.age;
      this.driverData.city = this.userService.currentUserProfile.city;
      this.driverData.job = this.userService.currentUserProfile.job;
      this.driverData.aboutMe = this.userService.currentUserProfile.aboutMe;
      this.driverData.fullName = this.userService.currentUserProfile.fullName;
    }
  }

  async saveUserData() {
    await this.userService.updateCurrentUser(this.driverData);
    this.closeDialog();
  }

  closeDialog() {
    this.dialog.close();
  }
}
