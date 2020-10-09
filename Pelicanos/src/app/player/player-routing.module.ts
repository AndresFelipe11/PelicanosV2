import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerModule } from './player.module';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerEditorComponent } from './player-editor/player-editor.component';
import { PlayerCreatorComponent } from './player-creator/player-creator.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { UrlInjectionGuard } from '../guards/url-injection.guard';
import { UserGuard } from '../guards/user.guard';
import { UserService } from '../users/users.service';

const routes: Routes = [
  {
    path: 'player/list',
    component: PlayerListComponent,
    canActivate:[
      UrlInjectionGuard,
      UserGuard
      
    ]
  }, 
  {
    path: 'player/view',
    component: PlayerViewComponent
  }, 
  {
    path: 'player',
    pathMatch: 'full',
    redirectTo: 'player/view'
  },
  {
    path: 'player/creator',
    component: PlayerCreatorComponent,
    canActivate:[
      UrlInjectionGuard,
      UserGuard
    ]
  },
  {
    path: 'player/editor/:id',
    component: PlayerEditorComponent,
    canActivate:[
      UrlInjectionGuard,
      UserGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), PlayerModule],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
