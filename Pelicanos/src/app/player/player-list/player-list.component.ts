import { Component, OnInit, ɵSWITCH_ELEMENT_REF_FACTORY__POST_R3__, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { PlayerModel } from 'src/app/models/player.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  constructor(private plrSevice: PlayerService, private route: Router) { }
  
  p: number = 1;  
  showConfirmationButtons: boolean=false

  idToShowButtons:string='';
  PlayerList: PlayerModel[]=[]; 
  ngOnInit(): void {
    this.getAllPlayer();
  }

  getAllPlayer():void{
    this.plrSevice.getAllPlayer().subscribe(items =>{
      this.PlayerList = items;
    }); 
  }

  ChangeConfirmationButtons(id){
    this.idToShowButtons=id;
    this.showConfirmationButtons= !this.showConfirmationButtons;
    }

    deletePlayer(playerId:string):void{
    this.plrSevice.deletePlayer(playerId).subscribe(item => {
      Swal.fire('El jugador a sido Eliminado Correctamente');
      this.route.navigate(["/player/view"])
     } )}

  

}
