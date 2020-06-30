import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http : HttpClient) { }

  postHeader = { headers: new HttpHeaders({ 'Content-Type':'application/json' }) };
  authHeader = { headers: new HttpHeaders({ 'Content-Type':'application/json' , 'Authorization':localStorage.getItem("token")}) };
  

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.set('Content-Type', 'application/json').set('Authorization', localStorage.getItem('token')); 
  }

  postVisit(visitData){
    return this.http.post('https://visitor-app-backend.herokuapp.com/visit/addVisit',visitData,this.postHeader);
  }

  listVistsAdmin(){
    return this.http.post('https://visitor-app-backend.herokuapp.com/visit/admin/listVisit',{},this.authHeader);
  }

  listVistsGateKeeper(visitDate){
    return this.http.post('https://visitor-app-backend.herokuapp.com/visit/gatekeeper/listVisit',visitDate,this.authHeader);
  }

  listVistsStaff(){
    return this.http.post('https://visitor-app-backend.herokuapp.com/visit/staff/listVisit',{},this.authHeader);
  }

  updateVisitApprovalStaff(visitId){
    return this.http.post('https://visitor-app-backend.herokuapp.com/visit/staff/approveVisit',visitId,this.authHeader);
  }

  updateVistedGateKeeper(visitId){
    return this.http.post('https://visitor-app-backend.herokuapp.com/visit/gatekeeper/updateVisited',visitId,this.authHeader);
  }

  addUntrackedVisit(){
    return this.http.post('https://visitor-app-backend.herokuapp.com/visit/gatekeeper/addUntrackedVisit',{},this.authHeader);
  }
 
}
 