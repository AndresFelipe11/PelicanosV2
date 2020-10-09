import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { UserService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements  CanActivate {
  constructor(private userService: UserService, private router: Router){

  }

  canActivate(){
    let user = this.userService.getUserInformation();
    if(user.user.rol == 2){
      console.log(user);
      return true;
    }else{
      this.router.navigate(["/"]);
      console.log(user.user.rol);
      return false;
    }
  }
}
