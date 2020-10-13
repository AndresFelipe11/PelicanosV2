import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player/player.service';
import { UserService } from '../users.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private userService: UserService, private playerService: PlayerService, private router: Router) { }

  token = '';
  email: string = '';

  ngOnInit() {
  }

    sendPassword() {
    if(this.token != ''){
      Swal.fire('Error!', 'Debe verificar que no eres un robot', 'error');
      return;
    }
    this.userService.findByEmail(this.email).subscribe((item) => {
      let pass = CryptoJS.SHA256('' + (Math.random() * (4000000 - 0) + 0), '12hjb2j1hb21hj3hj213').toString().substr(0, 8);
      item.password = pass;
      this.userService.updateUser(item).subscribe((item) => {
        this.playerService.SendEmail(`Usted pidio un cambio de contraseña<br>Constraseña:${pass}`, 'Recuperar Contraseña', item.email).subscribe(() => {
          Swal.fire('Logrado!', 'La nueva contraseña fue enviada a su correo', 'success').then(() => {
            this.router.navigate(['user/login']);
          });
        });
      });
    }, (erro) => {
      Swal.fire('Error!', 'El correo ingresado no existe', 'error');
    });
  }

}
