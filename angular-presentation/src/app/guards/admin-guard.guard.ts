import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from "rxjs";
import {inject} from "@angular/core";
import {RoleService} from "../services/role.service";

export const AdminGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  return inject(RoleService).isAdmin()
    .pipe(
      map(isAdmin => {
        if (isAdmin)
          return true;
        return inject(Router).createUrlTree(['/login']);
      }));
};
