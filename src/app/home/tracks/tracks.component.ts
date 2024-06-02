import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AllTracks } from '../../../models/all-tracks.interface';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent implements OnInit {
  public firestore = inject(Firestore);
  public firestoreService = inject(FirebaseService);
  public http = inject(HttpClient);
  trackList: AllTracks[] = [];
  trackName: string = '';
  filteredTracksList: AllTracks[] = [];

  ngOnInit(): void {
    this.loadTracks();
  }

  async loadTracks() {
    this.trackList = await this.firestoreService.getAllTracksFromFirestore();
    this.filteredTracksList = this.trackList;
  }

  filterTracks() {
    this.filteredTracksList = this.trackList.filter((track) =>
      track.name.toLowerCase().includes(this.trackName.toLowerCase())
    );
  }
}
