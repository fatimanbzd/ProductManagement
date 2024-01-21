import { Injectable } from '@angular/core';
import {CurrentUserService} from "../services/current-user.service";
import {CanActivate, CanActivateFn, Router} from "@angular/router";
import {filter, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private  currentUserService: CurrentUserService,
              private router: Router) { }

  canActivate(): Observable<boolean>{
    return this.currentUserService.currentUser$.pipe(
      filter(currentUser=> currentUser !== undefined)
      ,map((currentUser)=>{

      if(!currentUser){
        this.router.createUrlTree(['/login']);
        return false;
      }
      return true;
    }))
  }
}
