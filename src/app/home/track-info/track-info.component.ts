import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Unsubscribe } from 'firebase/firestore';
import { DialogAddDriverComponent } from '../dialog-add-driver/dialog-add-driver.component';
import { CarClass } from '../../../models/car-class.interface';
import { Observable, from } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-track-info',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
    DialogAddDriverComponent,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './track-info.component.html',
  styleUrl: './track-info.component.scss',
})
export class TrackInfoComponent implements OnInit {
  firestore = inject(Firestore);
  tracksCollRef = collection(this.firestore, 'tracks');
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  unsub: Unsubscribe | undefined;
  newDataCount = 0;
  trackId: string = '';
  currentTrackData: any = [];
  carClass: string = 'gt3';

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.trackId = paramMap.get('id')!;
    });
    if (this.trackId) {
      this.getSingleTrackData(this.trackId);
    }
  }

  ngOnDestroy(): void {
    if (this.unsub) {
      this.unsub();
    }
  }

  onChange() {}

  getSingleTrackData(trackId: string) {
    const unsub = onSnapshot(doc(this.tracksCollRef, trackId), (doc) => {
      if (doc.exists()) {
        this.currentTrackData = { id: doc.id, ...doc.data() };
      } else {
        this.currentTrackData = null;
      }
    });
    return unsub;
  }

  openDialog(): void {
    this.dialog.open(DialogAddDriverComponent, {
      data: this.trackId,
    });
  }

  sortTime(arr: CarClass[]) {
    arr.sort((a, b) => a.msec - b.msec);
  }

  getTrophyByRank(index: number) {
    if (index == 1) {
      return 'img/icons8-first-place-ribbon-64.png';
    }
    if (index == 2) {
      return 'img/icons8-second-place-ribbon-48.png';
    }
    if (index == 3) {
      return 'img/icons8-third-place-ribbon-48.png';
    } else {
      return null;
    }
  }
}
