import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  hide: boolean = true;
  error: boolean = false;
  errorMessage: string | null = null;

  user = {
    email: '',
    password: '',
  };

  onSubmitLogin(loginFrom: NgForm) {
    if (loginFrom.valid && loginFrom.submitted) {
      this.authService.login(this.user.email, this.user.password).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/dashboard');
          console.log(this.authService.currentUserSignal());
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

  // onSubmitLogin(loginFrom: NgForm) {
  //   if (loginFrom.valid && loginFrom.submitted) {
  //     this.authService
  //       .login(this.user.email, this.user.password)
  //       .then(() => this.router.navigateByUrl('/home/dashboard'))
  //       .then(() => window.location.reload())
  //       .catch(() => this.router.navigateByUrl('/auth/login'));
  //   }
  // }
}
