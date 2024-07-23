import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['/login']);
  }
}
