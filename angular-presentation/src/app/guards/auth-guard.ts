//
//
// constructor(private  currentUserService: CurrentUserService,
//             private router: Router) { }
//
// CanActivateFn(): Observable<boolean>{
//   return this.currentUserService.currentUser$.pipe(
//     filter(currentUser=> currentUser !== undefined)
//     ,map((currentUser)=>{
//       debugger
//     if(!currentUser){
//       this.router.createUrlTree(['/login']);
//       return false;
//     }
//     return true;
//   }))
// }

import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  return inject(AuthService).isLoggedIn()
    ? true :
    inject(Router).createUrlTree(['/login']);
};
