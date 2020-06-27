import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import { AppComponent } from './app.component';
import { VisitorpassComponentComponent } from './visitorpass-component/visitorpass-component.component';
import { IndexComponentComponent } from './index-component/index-component.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { DashboardGatekeeperComponent } from './dashboard-gatekeeper/dashboard-gatekeeper.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: IndexComponentComponent },
 { path: 'visitorPass', component: VisitorpassComponentComponent },
 { path: 'dashBoardAdmin', component: DashboardAdminComponent, canActivate: [AuthGuard]},
 { path: 'dashBoardFaculty', component: DashboardFacultyComponent, canActivate: [AuthGuard] },
 { path: 'dashBoardGateKeeper', component: DashboardGatekeeperComponent, canActivate: [AuthGuard] },
 {path:'**',component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
