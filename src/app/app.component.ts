import {
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  deviceToSmall = false;

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSignal.set(user);
        this.router.navigateByUrl('/home');
      } else {
        this.authService.currentUserSignal.set(null);
        this.router.navigateByUrl('/auth/login');
      }
    });    
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(): void {
  //   const width = window.innerWidth;
  //   if (width <= 750) {
  //     this.deviceToSmall = true;
  //   } else {
  //     this.deviceToSmall = false;
  //   }
  // }
}
