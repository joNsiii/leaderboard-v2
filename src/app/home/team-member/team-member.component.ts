import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddDriverComponent } from '../dialog-add-driver/dialog-add-driver.component';
import { DialogDriverProfileComponent } from '../dialog-driver-profile/dialog-driver-profile.component';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss'
})
export class TeamMemberComponent {
  dialog = inject(MatDialog);
  

  openDialog() {
    this.dialog.open(DialogDriverProfileComponent);
  }
}
