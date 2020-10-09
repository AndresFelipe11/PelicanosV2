import { Component, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-player-creator',
  templateUrl: './player-creator.component.html',
  styleUrls: ['./player-creator.component.scss']
})
export class PlayerCreatorComponent implements OnInit {

  playerFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private plyService: PlayerService, private router: Router) {
    this.playerFormGroup=this.formGroupCreator();
   }

  

  formGroupCreator():FormGroup{
   return new FormGroup({
   code:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]),
    name:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(25)]),
    lastname:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(25)]),
    phone:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(14)]),
    age:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3)]),
    email:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(35)]),
    image:new FormControl(''),
    weigth:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3)]),
    height:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3)]),
    titles:new FormControl(''),
    strengths:new FormControl(''),
    link:new FormControl(''),
    rol:new FormControl(''),
    rh:new FormControl(''),

  });
  }
  

//   player: PlayerModel={
//     id: null,
//     code:null,
//     name:null,
//     lastname:null,
//     phone:null,
//     age:null,
//     email:null,
//     image:null,
//     weigth:null,
//     height:null,
//     titles:null,
//     strengths:null,
//     link:null,
//     rol:null,
//  }


get code(){
  return this.playerFormGroup.get('code');
}
get name(){
  return this.playerFormGroup.get('name');
}
get lastname(){
  return this.playerFormGroup.get('lastname');
}
get phone(){
  return this.playerFormGroup.get('phone');
}
get age(){
  return this.playerFormGroup.get('age');
}
get email(){
  return this.playerFormGroup.get('email');
}
get image(){
  return this.playerFormGroup.get('image');
}
get weigth(){
  return this.playerFormGroup.get('weigth');
}
get height(){
  return this.playerFormGroup.get('height');
}
get titles(){
  return this.playerFormGroup.get('titles');
}
get strengths(){
  return this.playerFormGroup.get('strengths');
}
get link(){
  return this.playerFormGroup.get('link');
}
get rol(){
  return this.playerFormGroup.get('rol');
}
get rh(){
  return this,this.playerFormGroup.get('rh');
}

  ngOnInit() {
  }

  saveNewPlayer():void{

    if(this.playerFormGroup.valid){
      let player= this.buildPlayerData();
        this.plyService.saveNewPlayer(player).subscribe(item => {
       Swal.fire("El jugador a sido guardado exitosamente!!!");
      this.router.navigate(["/player/view"]);

     });

    console.log("saved");
    }
    else{
      Swal.fire(
        'Error!',
        'Por favor verifica que todos los campos sean correctos',
        'error');
    }

   
  }

  buildPlayerData():PlayerModel{
    let player: PlayerModel={
      id:null,
      code: this.code.value,
      name: this.name.value,
      lastname: this.lastname.value,
      phone: this.phone.value,
      age: this.age.value,
      email: this.email.value,
      image: this.image.value,
      weigth: this.weigth.value,
      height: this.height.value,
      titles: this.titles.value,
      strengths: this.strengths.value,
      link: this.link.value,
      rol: this.rol.value,
      rh: this.rh.value,
    }
    return player;
  }

  

}
