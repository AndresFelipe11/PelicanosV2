import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { PlayerService } from 'src/app/player/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  userFormGroup: FormGroup;
  

  constructor(private fb: FormBuilder, private UsrService: UserService, private router: Router, private PlayerService: PlayerService) {
    this.userFormGroup=this.formGroupCreator();
   }

  

  formGroupCreator():FormGroup{
   return new FormGroup({

    id:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]),
    realm:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(25)]),
    username:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(25)]),
    password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(14)]),
    email:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(35)])
  });
  }
  



get id(){
  return this.userFormGroup.get('id');
}
get realm(){
  return this.userFormGroup.get('realm');
}
get username(){
  return this.userFormGroup.get('username');
}
get email(){
  return this.userFormGroup.get('email');
}
get password(){
  return this.userFormGroup.get('password');
}
get rol(){
  return this.userFormGroup.get('rol');
}
get user(){
  return this.userFormGroup.get('user');
}
get isLogged(){
  return this.userFormGroup.get('isLogged');
}
get isAdmin(){
  return this.userFormGroup.get('isAdmin');
}


  ngOnInit() {
  }

  saveNewUser():void{

    if(this.userFormGroup.valid){
      let user= this.buildUserData();
        this.UsrService.saveNewUser(user).subscribe(item => {
        this.SendEmail();
       Swal.fire("El usuario a sido guardado exitosamente!!!");
      this.router.navigate(["/user/login"]);
     });
    }
    else{
      Swal.fire(
        'Error!',
        'Por favor verifica que todos los campos sean correctos',
        'error');
    }

   
  }

  SendEmail(){
    let player = this.PlayerService.SendEmail('Hola '+this.realm.value+ 
    ' bienvenido al club pelicanos con el correo y contraseña que te registraste puedes ingresar a la pagina web',
    'Pelicanos Voley Club',this.email.value).subscribe(item =>{
      console.log("email enviado");
    });
  }

  buildUserData():UserModel{
    let user: UserModel={
      id: null,
      realm: this.realm.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      rol: 1,
      user: null,
      isLogged: true,
      isAdmin:true,
    }
    return user;
  }
}
