import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/visit.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { VisitService } from '../services/visit.service';
import { UserService } from '../services/user.service';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-gatekeeper',
  templateUrl: './dashboard-gatekeeper.component.html',
  styleUrls: ['./dashboard-gatekeeper.component.css']
})
export class DashboardGatekeeperComponent implements OnInit{

  gateVisits : Visit[];
  isLoggedIn : boolean;
  showLoader : boolean = false;
  visitFilterDate : string;
  isFalse : boolean = false;
  selectedVisit = new Visit();

  constructor(private userService : UserService, private router : Router, private authService : AuthService, private visitService : VisitService) { }

  ngOnInit(): void {
    this.updateIsLoggedIn();
    this.visitFilterDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.listGateVisitsFromService();
  }

  logout(){
    this.userService.deleteLocalStorage();
    this.updateIsLoggedIn();
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }

  updateIsLoggedIn(){
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  printVisitorModal(visit : Visit) : void{
    this.selectedVisit = this.gateVisits.find(visitItem => visitItem.visit_id == visit.visit_id);
    if(this.selectedVisit==null || this.selectedVisit==undefined)
      this.selectedVisit = this.gateVisits[0];
  }

  updateVisitStatus(visit : Visit){
    this.selectedVisit = this.gateVisits.find(visitItem => visitItem.visit_id == visit.visit_id);
    if(this.selectedVisit==null || this.selectedVisit==undefined)
      return;
    //update visit status
    this.showLoader = true;
    let visitId = {"visit_id" : this.selectedVisit.visit_id};
    this.visitService.updateVistedGateKeeper(visitId).subscribe(
      response => {
        let message = response["message"];
        this.showLoader = false;
        if(message=="Success")
          Swal.fire('Success!', "Visit Status has been updated!", 'success');
        
      },
      error => {
        console.log("Server error!");
        this.showLoader = false;
        Swal.fire('Error!', "No Internet or Server Error!", 'error');
      }
    );
  }

  public toggleNavBar = false;
  toggle() {
    this.toggleNavBar = !this.toggleNavBar;
  }

  inputDateEvent(){
    console.log(this.visitFilterDate);
    this.listGateVisitsFromService();
  }

  listGateVisitsFromService(){
    this.showLoader = true;
    let visitDate = {"visit_date" : this.visitFilterDate};
    this.visitService.listVistsGateKeeper(visitDate).subscribe(
      response => {
        this.gateVisits = response["Visits"];
        this.selectedVisit = this.gateVisits[0];
        this.showLoader = false;
      },
      error => {
        console.log("Server error!");
        this.showLoader = false;
      }
    );
  }

  addUntrackedVisitor(){
    this.showLoader = true;
    this.visitService.addUntrackedVisit().subscribe(
      response => {
        let message = response["message"];
        this.showLoader = false;
        if(message=="Success")
          Swal.fire('Success!', "Untracked Visit Added!", 'success');
      },
      error => {
        console.log("Server error!");
        this.showLoader = false;
        Swal.fire('Error!', "No Internet or Server Error!", 'error');
      }
    );
  }

}
