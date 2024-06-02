import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

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
  public auth = inject(AuthService);
  router = inject(Router);
  hide: boolean = true;
  isFlipped: boolean = false;
  error: boolean = false;
  errorMessage: string | null = null;

  user = {
    email: '',
    password: '',
  };

  onSubmitLogin(loginFrom: NgForm) {
    if (loginFrom.valid && loginFrom.submitted) {
      this.auth.login(this.user.email, this.user.password).subscribe({
        next: () => {
          this.router.navigateByUrl('/home/dashboard');
        },
        error: (err) => {
            this.errorMessage = 'No user found';
        },
      });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
