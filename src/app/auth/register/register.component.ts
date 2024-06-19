import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NewUser } from '../../../models/new-user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  hide: boolean = true;
  error: boolean = false;
  errorMessage: string | null = null;

  newUser: NewUser = {
    regEmail: '',
    regUsername: '',
    regPassword: '',
  };

  onSubmitRegister(register: NgForm) {
    if (register.valid && register.submitted) {
      this.authService
        .register(
          this.newUser.regEmail,
          this.newUser.regPassword,
          this.newUser.regUsername
        )
        .subscribe({
          error: (err) => {
            this.errorMessage = err.code;
          },
          next: () => {
            this.userService.createUserProfile();
            this.router.navigateByUrl('/login');
          },
        });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
