import {Injectable, signal} from '@angular/core';
import {IUserModel} from "../interfaces/user-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSig = signal<IUserModel | undefined | null>(undefined);

}
