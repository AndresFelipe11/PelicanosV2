import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ResetComponent
  ]
})
export class UsersModule { }
