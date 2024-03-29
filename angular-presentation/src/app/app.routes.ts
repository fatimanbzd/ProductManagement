import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./guards/auth-guard";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {AdminGuardGuard} from "./guards/admin-guard.guard";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'product-add', component: ProductAddComponent, canActivate: [AdminGuardGuard]},

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];
