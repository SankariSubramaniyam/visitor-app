import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/visit.model';

@Component({
  selector: 'app-dashboard-gatekeeper',
  templateUrl: './dashboard-gatekeeper.component.html',
  styleUrls: ['./dashboard-gatekeeper.component.css']
})
export class DashboardGatekeeperComponent{
  gateVisits : Visit[] = [
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
  selectedVisit = this.gateVisits[0];

  printVisitorModal(index) : void{
    this.selectedVisit = this.gateVisits[index];
  }

  public toggleNavBar = false;
  toggle() {
    this.toggleNavBar = !this.toggleNavBar;
  }

}
