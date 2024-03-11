import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  setRole(role: string) {

  }

  getRoel() {

  }

  isAdmin(): Observable<boolean>  {
    return this.authService.getCurrentAuthUser().pipe(
      map(data => data.role == 'Admin')
    )
  }

}
