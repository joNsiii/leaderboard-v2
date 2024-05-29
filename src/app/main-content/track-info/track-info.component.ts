import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddDriverComponent } from '../../dialog-add-driver/dialog-add-driver.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

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
  public firestoreService = inject(FirebaseService);
  private route = inject(ActivatedRoute);
  public dialog = inject(MatDialog);
  trackId: string | null = '';
  currentTrackData: any = {};
  carClass = 'gt3';

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.trackId = paramMap.get('id');
    });
    if (this.trackId) {
      this.getCurrentTrackData();
    }
  }

  onChange() {}

  async getCurrentTrackData() {
    this.currentTrackData = await this.firestoreService.getSingleTrackData(
      this.trackId
    );
    console.log(this.currentTrackData);
  }

  openDialog(): void {
    this.dialog.open(DialogAddDriverComponent);
  }
}
