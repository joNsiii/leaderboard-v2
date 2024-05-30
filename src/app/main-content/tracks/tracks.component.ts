import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [MatCardModule, RouterLink, CommonModule],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent implements OnInit {
  public firestore = inject(Firestore);
  public firestoreService = inject(FirebaseService);
  public http = inject(HttpClient);
  allTracks: any;
  allData: any;

  ngOnInit(): void {
    this.loadTracks();
  }

  async loadTracks() {
    this.allTracks = await this.firestoreService.getAllTracksFromFirestore();
    // console.log(this.allTracks);
  }
}
