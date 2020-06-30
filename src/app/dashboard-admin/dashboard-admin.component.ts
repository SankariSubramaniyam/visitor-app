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
  adminVisits : Visit[] ;
  selectedVisit = new Visit();
  filterToVisitApplied : boolean = false;
  isFalse : boolean = false;
  showLoader : boolean = false;
  visitFilterObj : Visit = new Visit();
  filterCount = 0;

  constructor(private visitService : VisitService) { }
  ngOnInit(): void {

    this.visitFilterObj.filter_string = "";
    this.visitFilterObj.to_visit = "";
    this.visitFilterObj.visitor_status=1;
    this.visitFilterObj.visit_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.showLoader = true;

    this.visitService.listVistsAdmin().subscribe(
      response => {
        this.adminVisits = response["Visits"];
        this.selectedVisit = this.adminVisits[0];
        this.showLoader = false;
      },
      error => {
        this.showLoader = false;
        console.log("Server error!");
        console.log(error.error.message);
        
      }
    );
  }

  showVisitorModal(visit : Visit) : void{
    this.selectedVisit = this.adminVisits.find(visitItem => visitItem.visit_id == visit.visit_id);
    if(this.selectedVisit==null || this.selectedVisit==undefined)
      this.selectedVisit = this.adminVisits[0];
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
