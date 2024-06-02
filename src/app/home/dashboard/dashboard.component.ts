import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  URL = 'https://official-joke-api.appspot.com/random_joke';
  private http = inject(HttpClient);
  joke: any = {};
  revealPunchline = false;

  fetchData() {
    this.http.get(this.URL).subscribe((res) => {
      this.joke = res;
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  newJoke() {
    if(this.revealPunchline) {
      this.punchline();
    }
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.fetchData();
  }

  punchline() {
    this.revealPunchline = !this.revealPunchline;
  }
}
