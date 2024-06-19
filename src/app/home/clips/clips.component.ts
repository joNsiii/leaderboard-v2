import { Component, OnInit, inject, input, signal } from '@angular/core';
import {
  Firestore,
  Unsubscribe,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DialogAddClipComponent } from '../dialog-add-clip/dialog-add-clip.component';

@Component({
  selector: 'app-clips',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.scss',
})
export class ClipsComponent implements OnInit {
  firestore = inject(Firestore);
  dialog = inject(MatDialog);
  clipsCollectionRef = collection(this.firestore, 'clips');
  clipCollection: any[] = [];
  filteredClipsCollection: any[] = [];
  searchValue: string = '';
  unsub: Unsubscribe = this.loadClipsFromFirestore();

  ngOnInit(): void {
    this.loadClipsFromFirestore();
  }

  ngOnDestroy(): void {
    if (this.unsub) {
      this.unsub();
    }
  }

  filterClips() {
    this.filteredClipsCollection = this.clipCollection.filter((clip) =>
      clip.title.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  loadClipsFromFirestore() {
    const unsub = onSnapshot(this.clipsCollectionRef, (snapshot) => {
      this.clipCollection = [];
      snapshot.forEach((doc) => {
        this.clipCollection.push(doc.data());
      });
      this.filteredClipsCollection = this.clipCollection;
    });
    return unsub;
  }

  openDialogAddClip() {
    this.dialog.open(DialogAddClipComponent);
  }
}
