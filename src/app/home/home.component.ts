import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogMyProfileComponent } from './dialog-my-profile/dialog-my-profile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    RouterLinkActive,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  dialog = inject(MatDialog);
  loggedIn = false;

  openDialog(): void {
    this.dialog.open(DialogMyProfileComponent);
  }

  logoutAndDeleteCurrentUser() {
    this.userService.currentUserProfile = undefined;
    this.authService.logout();
  }
}
