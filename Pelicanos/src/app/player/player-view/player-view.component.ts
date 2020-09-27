import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { PlayerModel } from 'src/app/models/player.model';


@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  constructor(private plrSevice: PlayerService, private route: Router) { }

  

  PlayerList: PlayerModel[]=[]; 
  ngOnInit(): void {
    this.getAllPlayer();
  }

  getAllPlayer():void{
    this.plrSevice.getAllPlayer().subscribe(items =>{
      this.PlayerList = items;
    }); 
  }

  
  
}
