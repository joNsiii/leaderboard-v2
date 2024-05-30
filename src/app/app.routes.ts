import { Routes } from '@angular/router';
import { TracksComponent } from './main-content/tracks/tracks.component';
import { UserProfileComponent } from './main-content/user-profile/user-profile.component';
import { TrackInfoComponent } from './main-content/track-info/track-info.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'user', component: UserProfileComponent },
      { path: 'trackinfo/:id', component: TrackInfoComponent },
      { path: 'all-tracks', component: TracksComponent },
    ],
  },
];
