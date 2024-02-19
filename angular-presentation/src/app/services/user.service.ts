import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRegisterModel} from "../interfaces/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){ }

  register(model: IRegisterModel){
    return this.http.post(`/user/register`,model);
  }
}
