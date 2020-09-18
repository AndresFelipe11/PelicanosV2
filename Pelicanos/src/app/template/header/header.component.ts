import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/users.service';
import { isNullOrUndefined } from 'util';
import { UserModel } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo: UserModel;
  userLogged:boolean = false;
  userName: String;
  CompleteName: string='';
  subscription:Subscription;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.verifyUserSession();
    this.showMenu();
  }

  verifyUserSession() {
    this.subscription = this.userService.getUserInfo().subscribe(user => {
      this.userInfo = user;
      this.updateInfo();
    });
  }

  updateInfo(){
    let msg = "In session: ";
    this.userLogged = this.userInfo.isLogged;
    this.userName = `${msg} ${this.userInfo.realm}`;
  }

  showMenu():void{
    let userInfo = this.userService.getUserInformation();
    if(isNullOrUndefined(userInfo)){
      this.userLogged=false

    }
    else{
      this.userLogged= true;
     this.CompleteName=userInfo.realm;
    }
  }

}
