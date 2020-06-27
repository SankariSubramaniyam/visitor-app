import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorpassComponentComponent } from './visitorpass-component/visitorpass-component.component';
import { IndexComponentComponent } from './index-component/index-component.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { DashboardGatekeeperComponent } from './dashboard-gatekeeper/dashboard-gatekeeper.component';
import { VisiteeHierarchyComponent } from './visitee-hierarchy/visitee-hierarchy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './searchFilter.pipe';

import { VisitService } from './services/visit.service';
import { UserService } from './services/user.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    VisitorpassComponentComponent,
    IndexComponentComponent,
    DashboardAdminComponent,
    DashboardFacultyComponent,
    DashboardGatekeeperComponent,
    VisiteeHierarchyComponent,
    PageNotFoundComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule, 
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    TreeModule.forRoot()
  ],
  providers: [VisitService, UserService, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, AuthService],
  bootstrap: [AppComponent],
  exports: [SearchFilterPipe]
})
export class AppModule { }
