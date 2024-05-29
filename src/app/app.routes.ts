import { Routes } from '@angular/router';
import { TracksComponent } from './main-content/tracks/tracks.component';
import { UserProfileComponent } from './main-content/user-profile/user-profile.component';
import { TrackInfoComponent } from './main-content/track-info/track-info.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'trackinfo/:id', component: TrackInfoComponent },
  { path: 'all-tracks', component: TracksComponent },
];
