import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/visit.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VisitService } from '../services/visit.service';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent{
  isLoggedIn : boolean;
  adminVisits : Visit[] ;
  selectedVisit = new Visit();
  filterToVisitApplied : boolean = false;
  isFalse : boolean = false;
  showLoader : boolean = false;
  srchFilterTxt : string = "";
  visitFilterObj : Visit = new Visit();

  constructor(private userService : UserService, private router : Router, private authService : AuthService, private visitService : VisitService) { }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.visitFilterObj.filter_string = "";
    this.visitFilterObj.to_visit = "";
    this.visitFilterObj.visit_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.showLoader = true;

    this.visitService.listVistsAdmin().subscribe(
      response => {
        this.adminVisits = response["Visits"];
        this.selectedVisit = this.adminVisits[0];
        this.showLoader = false;
      },
      error => {
        console.log("Server error!");
        console.log(error.error.message);
        this.showLoader = false;
      }
    );
  }

  showVisitorModal(index) : void{
    this.selectedVisit = this.adminVisits[index];
  }

  public toggleNavBar = false;
  toggle() {
    this.toggleNavBar = !this.toggleNavBar;
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

  filterToVisit($event){
    this.filterToVisitApplied = true;
    this.visitFilterObj.to_visit = (<string>$event);
  }

  clearFilterPlacePersonToVisit($event){
    this.filterToVisitApplied = false;
    this.visitFilterObj.to_visit = "";
    event.stopPropagation();
  }

  clearSearchDate(){
    this.visitFilterObj.visit_date = "";
  }

  clearFilterString(){
    this.visitFilterObj.filter_string = "";
  }

  log(){
    console.log(this.visitFilterObj);
  }


}
