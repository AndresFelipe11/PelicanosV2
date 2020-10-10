import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { PlayerModel } from 'src/app/models/player.model';
import Swal from 'sweetalert2';

declare const showUpdatedMessageModal: any;

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.css']
})



export class PlayerEditorComponent implements OnInit {


  constructor(private route: ActivatedRoute, private PlyService: PlayerService, private router: Router) { }
 

  player: PlayerModel;

  ngOnInit() {
    this.searchPlayer();
  }


  searchPlayer():void{
    let id=this.route.snapshot.params["id"];
    this.PlyService.getPlayerById(id).subscribe(item =>{
      this.player=item;

    })
  }

  updatePlayer(){
    this.PlyService.updatePlayer(this.player).subscribe(item =>{
      Swal.fire("El jugador ha sido actualizado correctamente");
    });

    this.router.navigate(["/player/list"]);
  }

}


