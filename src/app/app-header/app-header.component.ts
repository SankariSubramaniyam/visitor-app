import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  @Output() loginStatusEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  isLoggedIn : boolean;
  toggleNavBar = false;
  
  constructor(private authService : AuthService, private router : Router, private userService : UserService,) { }

  ngOnInit(): void {
    this.updateIsLoggedIn();
  }

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
    this.emitLoginStatus();
  }

  emitLoginStatus() {
    console.log(this.isLoggedIn);
    this.loginStatusEmitter.emit(this.isLoggedIn);
  }

}
