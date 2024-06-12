import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogDriverProfileComponent } from '../dialog-driver-profile/dialog-driver-profile.component';
import { UserService } from '../../services/user.service';
import { Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss',
})
export class TeamMemberComponent {
  dialog = inject(MatDialog);
  userService = inject(UserService);
  unsub: Unsubscribe = this.userService.getAllUserProfiles();

  openDialog() {
    this.dialog.open(DialogDriverProfileComponent);
  }

  ngOnDestroy(): void {
    this.unsub();
  }
}
