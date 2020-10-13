import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { FormLoginGuard } from '../guards/form-login.guard';
import { UrlInjectionGuard } from '../guards/url-injection.guard';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: 'user/register',
    component: RegisterComponent,
    canActivate:[
      FormLoginGuard
    ]
  },
  {
    path: 'user/logout',
    component: LogoutComponent,
    canActivate:[
      UrlInjectionGuard
    ]
  },
  {
    path: 'user/reset',
    component: ResetComponent,
  },
  {
    path: 'user/login',
    component: LoginComponent,
    canActivate:[
      FormLoginGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
