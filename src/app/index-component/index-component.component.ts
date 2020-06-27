import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-component',
  templateUrl: './index-component.component.html',
  styleUrls: ['./index-component.component.css']
})
export class IndexComponentComponent implements OnInit {

  userModel = new User();
  serverErrorMsg : string="";
  showLoader : boolean = false;
  isLoggedIn : boolean;
  isTRUE : boolean = true;

  constructor(private userService : UserService, private router : Router, private authService : AuthService) { }
  ngOnInit(): void {
    this.updateIsLoggedIn();
  }

  public toggleNavBar = false;
  toggle() {
    this.toggleNavBar = !this.toggleNavBar;
  }

  onSubmit(loginForm : NgForm){
    console.log(JSON.stringify(this.userModel));
    this.showLoader = true;
    this.userService.loginUser(JSON.stringify(this.userModel)).subscribe(
      response => {
        loginForm.resetForm();
        this.serverErrorMsg="";
        this.showLoader = false;

        this.userService.setToken(response['token']);
        this.userService.setUserType(response['utype']);

        this.updateIsLoggedIn();

        let url = '../dashBoard'+this.userService.getUserType();
        this.router.navigateByUrl(url, { skipLocationChange: true }).then(() => {
          this.router.navigate([url]);
        }); 

      },
      error => {
        if(error.status==400 || error.status==401){
          this.serverErrorMsg = (<string>error.error.message);
        }
        this.showLoader = false;
        
        this.updateIsLoggedIn();
      }
    );
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
