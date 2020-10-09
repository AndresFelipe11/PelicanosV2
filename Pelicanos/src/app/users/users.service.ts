import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../models/user.model';


const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  userInfo = new BehaviorSubject<UserModel>(new UserModel());

  constructor(private http: HttpClient) { 
    this.verifyUserInSession();
  }  

  verifyUserInSession() {
    let session = localStorage.getItem("activeUser");
    if(session != undefined){
      this.userInfo.next(JSON.parse(session));
    }
  }

  getUserInfo() {
    return this.userInfo.asObservable();
  }

  loginUser(email: string, password: string): Observable<UserModel> {
    
    return this.http.post<UserModel>(`${base_url}Users/login?include=user`,
      {
        email,
        password
      },
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  saveNewUser(user: UserModel):Observable<UserModel[]>{
    return this.http.post<UserModel[]>(`${base_url}Users`, user,
    {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }


 saveUserInformation(user: UserModel): void {
   user.isLogged=true;
   this.userInfo.next(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
  }

  isActiveSession(){
   return this.userInfo.getValue().isLogged;
  }

   tokenId: string = '';


  logoutUser(){
    
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userTk");
    this.userInfo.next(new UserModel());
  }

  saveToken(token) {
    localStorage.setItem("userTk", token);
  }

  getToken() {
    return localStorage.getItem("userTk");
  }

  getUserInformation() {
    let userInfo = localStorage.getItem("userInfo");
    if (isNullOrUndefined(userInfo)) {
      return null;
    }
    return (JSON.parse(userInfo));
  }













}

