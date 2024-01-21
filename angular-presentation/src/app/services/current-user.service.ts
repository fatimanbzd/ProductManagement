import {Injectable} from '@angular/core';
import {IUserModel} from "../interfaces/user-model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private _currentUserSubject = new BehaviorSubject<{ id: number, name: string } | undefined | null>(undefined);
  currentUser$ = this._currentUserSubject.asObservable();

  constructor() {
  }

  setCurrentUser() {
    if (localStorage.getItem('token'))
      this._currentUserSubject.next({id: 1, name: 'Foo'});
    else
      this._currentUserSubject.next(null);
  }
}
