import { Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import { VisitService } from '../services/visit.service'
import { Visit } from '../models/visit.model';
import { NgForm } from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-visitorpass-component',
  templateUrl: './visitorpass-component.component.html',
  styleUrls: ['./visitorpass-component.component.css']
})
export class VisitorpassComponentComponent implements OnInit {

  @ViewChild('childVisiteeComp') childVisiteeComp;

  visitModel = new Visit();
  showLoader : boolean = false;
  startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  startTime = formatDate(new Date(), 'hh:mm', 'en');

  constructor(private visitService : VisitService) { }
  ngOnInit(): void {
    this.setDateAndTime();
  }
  ngAfterViewInit() {
    console.log(this.childVisiteeComp);
  }

  bookVisit() {
    Swal.fire('Visit Booked!', 'Please check your email for further instructions', 'success')
  }

  setToVisit($event){
    this.visitModel.to_visit = (<string>$event);
  }

  onSubmit(visitForm : NgForm){
    this.showLoader = true;
    this.visitService.postVisit(JSON.stringify(this.visitModel)).subscribe(
      response => {
        this.showLoader = false;
        this.bookVisit();
        visitForm.resetForm();
        this.childVisiteeComp.clearSelectedNodeString();
        this.setDateAndTime();
        console.log(response);
      },
      error => {
        this.showLoader = false;
        let errorMsg : String;
        errorMsg = error.error.error+". ";
        
        Swal.fire('Error! Visit could not be booked', errorMsg+"Please resubmit or try again later!", 'error');
        console.log(error);
      }
    );
  }

  testLog(text){
    console.log("To VISIT: ",this.visitModel.to_visit);
    console.log("Log: ",text);
  }

  setDateAndTime(){
    this.visitModel.visit_date = this.startDate;
    this.visitModel.visit_time = this.startTime;
  }

}
