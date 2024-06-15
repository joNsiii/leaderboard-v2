import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { TracksComponent } from './home/tracks/tracks.component';
import { TrackInfoComponent } from './home/track-info/track-info.component';
import { LoginComponent } from './auth/login/login.component';
import { TeamMemberComponent } from './home/team-member/team-member.component';
import { ClipsComponent } from './home/clips/clips.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'clips', component: ClipsComponent },
      { path: 'team', component: TeamMemberComponent },
      { path: 'all-tracks', component: TracksComponent },
      { path: 'trackinfo/:id', component: TrackInfoComponent },
    ],
  },
];
