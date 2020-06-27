import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/visit.model';

@Component({
  selector: 'app-dashboard-faculty',
  templateUrl: './dashboard-faculty.component.html',
  styleUrls: ['./dashboard-faculty.component.css']
})
export class DashboardFacultyComponent {

  adminVisits : Visit[] = [
    {
      visit_id : 1,
      visitor_name : "Mr.lll",
      visitor_desg : "HR",
      visitor_org : "Infosys",
      purpose : "Placement Offers",
      visit_date : "2020-06-02",
      visit_time : "02:00",
      visitor_email : "hrll@infosys.com",
      visitor_mobileno : "9999999999",
      to_visit : "Dean, CEG"
    },
    {
      visit_id : 2,
      visitor_name : "Mr.kkk",
      visitor_desg : "HR",
      visitor_org : "Accenture",
      purpose : "Internship opportunities",
      visit_date : "2020-06-02",
      visit_time : "02:00",
      visitor_email : "hrll@infosys.com",
      visitor_mobileno : "9999999999",
      to_visit : "Dean, CEG"
    }
  ];
  selectedVisit = this.adminVisits[0];

  showVisitorModal(index) : void{
    console.log("Selected Row: "+index);
    this.selectedVisit = this.adminVisits[index];
  }

  public toggleNavBar = false;
  toggle() {
    this.toggleNavBar = !this.toggleNavBar;
  }
}
