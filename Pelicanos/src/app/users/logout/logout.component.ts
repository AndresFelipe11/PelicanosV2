import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.logoutUser();
  }


logoutUser():void{
  this.userService.logoutUser();
  Swal.fire('Cerraste sesión correctamente')
  this.router.navigate(["/home"]);
}


}
