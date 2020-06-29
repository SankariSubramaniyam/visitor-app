import { Injectable } from '@angular/core';
import { Router, CanActivate , ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, public userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const redirectDashBoard = route.data.redirectDashBoard;
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if (!this.auth.isAuthenticated()) {
      console.log("Token not auth");
      this.router.navigate(['']); 
      return false;
    }
    else if (tokenPayload.role == undefined || tokenPayload.role == null) {
      console.log("Payload not defined",tokenPayload.role);
      this.router.navigate(['']); 
      return false;
    }
    else if (redirectDashBoard == true) {
      console.log("Redirect true",'dashBoard'+tokenPayload.role);
      let url = "../dashBoard"+tokenPayload.role;
      //this.router.navigate([url]);       
       this.router.navigateByUrl(url, { skipLocationChange: true }).then(() => {
         this.router.navigate([url]);
       }); 
       return true;
    }
    else if (tokenPayload.role == expectedRole && redirectDashBoard == false) {
      console.log("Expected Role",tokenPayload.role,expectedRole);
      return true;
    }
    console.log("Condition not checked");
    console.log("Expected Role",tokenPayload.role,expectedRole);
    this.router.navigate(['']);
    return false;
  }

}
