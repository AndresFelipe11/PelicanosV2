import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { PlayerModel } from 'src/app/models/player.model';



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
      console.log(item);
      this.route.navigate(["/player/view"])
     } )}

  

}
