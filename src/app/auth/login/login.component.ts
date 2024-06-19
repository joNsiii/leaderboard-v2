import { Component, OnInit, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterLink,
    MatCheckboxModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  hide: boolean = true;
  error: boolean = false;
  errorMessage: string | null = null;
  rememberMe: boolean = false;

  user = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    this.getRemember();
  }

  onSubmitLogin(loginFrom: NgForm) {
    if (loginFrom.valid && loginFrom.submitted) {
      this.checkRememberMe();
      this.authService.login(this.user.email, this.user.password).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/all-tracks');
        },
        error: (err) => {
          (this.errorMessage = 'No user found'), err;
        },
      });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  checkRememberMe() {
    if (this.rememberMe) {
      this.setRememberMe();
    } else {
      localStorage.clear();
    }
  }

  getRemember() {
    try {
      const userJSON = localStorage.getItem('rememberUserLogin');
      if (userJSON) {
        const userData = JSON.parse(userJSON);
        this.user.email = userData.email;
        this.user.password = userData.password;
        this.rememberMe = true;
      }
    } catch {}
  }

  setRememberMe() {
    const userData = JSON.stringify(this.user);
    localStorage.setItem('rememberUserLogin', userData);
  }

  update(rememberMe: boolean) {
    if (rememberMe) {
      this.rememberMe = true;
    } else {
      this.rememberMe = false;
    }
  }

  loginAsGuest() {
    const guestEmail = 'guest@login.de';
    const guestPw = 'qwertz';
    this.authService.login(guestEmail, guestPw).subscribe({
      next: () => {
        this.router.navigateByUrl('/home/all-tracks');
      },
      error: (err) => {
        (this.errorMessage = 'No user found'), err;
      },
    });
  }
}
