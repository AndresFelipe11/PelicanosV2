import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../models/user.model';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';


const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  userInfo = new BehaviorSubject<UserModel>(new UserModel());
  token = '';
  secretKey = 'una-contraseña';
  
  constructor(private http: HttpClient) { 
    this.verifyUserInSession();
    this.token = this.getToken();
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




  isActiveSession(){
   return this.userInfo.getValue().isLogged;
  }
  isAdminSession(){
    if(this.userInfo.getValue().rol== 2 ){
      return false;
    }
    return true;
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

  //find by email
  findByEmail(email:string):Observable<UserModel>{
    let filter = JSON.stringify({"where":{'email': email }});
    return this.http.get<UserModel>(`${base_url}Users/findOne/?filter=${filter}&access_token=${this.token}`,{
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

   updateUser(user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${base_url}Users/${user.id}?access_token=${this.token}`, user);
  }

//  saveUserInformation(user: UserModel): void {
//    user.isLogged=true;
//    this.userInfo.next(user);
//     localStorage.setItem("userInfo", JSON.stringify(user));
//   }

  saveUserInformation(user: UserModel): void {
    user.isLogged=true;
    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
    localStorage.setItem("userInfo", encryptedData);
    this.userInfo.next(user);
  }

    // getUserInformation() {
  //   let userInfo = localStorage.getItem("userInfo");
  //   if (isNullOrUndefined(userInfo)) {
  //     return null;
  //   }
  //   return (JSON.parse(userInfo));
  // }



  getUserInformation() {
    let userInfo = localStorage.getItem("userInfo");
    if(!isNullOrUndefined(userInfo)){
      try {
        let valor = CryptoJS.AES.decrypt(userInfo.toString(), this.secretKey);
        var textoDesencriptado = valor.toString(CryptoJS.enc.Utf8);
        return (JSON.parse(textoDesencriptado));
      } catch (error) {
        this.logoutUser();
      }
    }
    return userInfo;
  }















}

