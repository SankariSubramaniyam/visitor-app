import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { VisitService } from '../services/visit.service'
import { Visit } from '../models/visit.model';
import { NgForm } from '@angular/forms';
import {formatDate} from '@angular/common';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-visitorpass-component',
  templateUrl: './visitorpass-component.component.html',
  styleUrls: ['./visitorpass-component.component.css']
})
export class VisitorpassComponentComponent implements OnInit {

  visitModel = new Visit();
  showLoader : boolean = false;
  startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  startTime = formatDate(new Date(), 'hh:mm', 'en');
  isLoggedIn : boolean;

  constructor(private visitService : VisitService, private userService : UserService, private router : Router, private authService : AuthService) { }
  ngOnInit(): void {
    this.setDateAndTime();
    this.updateIsLoggedIn();
  }

  public toggleNavBar = false;
  toggle() {
    this.toggleNavBar = !this.toggleNavBar;
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
        //this.adminService.setToken(res['token']);
        //this.router.navigateByUrl('/addPost');
        this.showLoader = false;
        this.bookVisit();
        visitForm.resetForm();
        this.setDateAndTime();

        console.log(response);
      },
      error => {
        let errorMsg : String;
        errorMsg = error.error.error+". ";
        this.showLoader = false;
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

}
