import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerModule } from './player.module';
import { PlayerModel } from '../models/player.model';

//return this.http.get('https://gitir.co/clients.json');
const base_url: string= 'http://localhost:3000/api/'
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) {
    
  }

  getAllPlayer():Observable<PlayerModel[]>{
    return this.http.get<PlayerModel[]>(`${base_url}Players`);
  }

  saveNewPlayer(player: PlayerModel):Observable<PlayerModel[]>{
    return this.http.post<PlayerModel[]>(`${base_url}Players`, player,
    {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }
  updatePlayer(player: PlayerModel):Observable<PlayerModel[]>{
    return this.http.put<PlayerModel[]>(`${base_url}Players`,player,
    {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }
  deletePlayer(playerId: string):Observable<PlayerModel[]>{
    return this.http.delete<PlayerModel[]>(`${base_url}Players/${playerId}`);
  }


  getPlayerById(PlayerId: string): Observable<PlayerModel> {
    return this.http.get<PlayerModel>(`${base_url}Players/${PlayerId}`);
  }


  searchPlayer(playerId) {
    return this.data.find(p => p.id == playerId);
  }

  getPlayerListData() {

    return this.data;
  }

  SendEmail(player :PlayerModel):Observable<PlayerModel>{
    return this.http.get<PlayerModel>(`${base_url}Players/sendEmail`);
  }

  

  data = [{
    "id": 0,
    "age": 40,
    "balance": "$3,749.28"
  },
  {
    "id": 1,
    "age": 43,
    "balance": "$4,749.28"
  }];
}
