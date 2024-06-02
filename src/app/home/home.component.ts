import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  dialog = inject(MatDialog);
  loggedIn = false;

  // this.isDrawerOpen();

  // isDrawerOpen(): boolean {
  //   const drawerState = localStorage.getItem('drawerState');
  //   return drawerState ? JSON.parse(drawerState) : true;
  // }

  openDialog(): void {
    this.dialog.open(DialogMyProfileComponent);
  }
}
