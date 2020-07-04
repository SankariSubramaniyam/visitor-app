import { Component, OnInit, ViewChildren } from '@angular/core';
import {Visit} from '../models/visit.model';
import { VisitService } from '../services/visit.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-faculty',
  templateUrl: './dashboard-faculty.component.html',
  styleUrls: ['./dashboard-faculty.component.css']
})
export class DashboardFacultyComponent implements OnInit {

  staffVisits : Visit[] ;
  selectedVisit = new Visit();
  visitFilterObj : Visit = new Visit();
  showLoader : boolean = false;

  constructor(private visitService : VisitService) { }
  
  ngOnInit(): void {
    this.visitFilterObj.filter_string = "";
    this.visitFilterObj.to_visit = "";
    this.visitFilterObj.visitor_status=1;
    this.visitFilterObj.visit_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.listStaffVisitsFromService();
  }

  listStaffVisitsFromService(){
    this.showLoader = true;
    this.visitService.listVistsStaff().subscribe(
      response => {
        this.staffVisits = response["Visits"];
        // this.selectedVisit = this.staffVisits[0];   
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
    this.selectedVisit = this.staffVisits.find(visitItem => visitItem.visit_id == visit.visit_id);
    if(this.selectedVisit==null || this.selectedVisit==undefined)
      this.selectedVisit = this.staffVisits[0];
  }

  updateVisitApproval(visit : Visit){
    this.selectedVisit = this.staffVisits.find(visitItem => visitItem.visit_id == visit.visit_id);
    if(this.selectedVisit==null || this.selectedVisit==undefined)
      return;
    //update visit status
    this.showLoader = true;
    let visitId = {"visit_id" : this.selectedVisit.visit_id};
    this.visitService.updateVisitApprovalStaff(visitId).subscribe(
      response => {
        let message = response["message"];
        this.showLoader = false;
        this.listStaffVisitsFromService();
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

  clearSearchDate(){
    this.visitFilterObj.visit_date = "";
  }

  clearFilterString(){
    this.visitFilterObj.filter_string = "";
  }

  stopEventPropagation(){
    event.stopPropagation();
  }

}
