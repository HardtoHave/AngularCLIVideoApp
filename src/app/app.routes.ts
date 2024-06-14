import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { PlayerComponent } from './pages/player/player.component';
import { AuthGuard } from './services/AuthGuard';
import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  { path: 'player', component: PlayerComponent, canActivate: [AuthGuard]}
];
