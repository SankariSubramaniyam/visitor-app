import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http : HttpClient) { }

  postHeader = { headers: new HttpHeaders({ 'Content-Type':'application/json' }) };

  loginUser(loginData){
    return this.http.post('https://visitor-app-backend.herokuapp.com/user/login',loginData,this.postHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteLocalStorage(){
    localStorage.removeItem('token');
  }


}
