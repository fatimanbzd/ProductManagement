import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./guards/auth-guard.service";

export const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuardService]}
];
