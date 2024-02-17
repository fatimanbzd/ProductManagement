import {Injectable} from '@angular/core';
import {IUserResponseModel} from "../interfaces/user-model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = Config.JWT_TOKEN;
  loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<IUserResponseModel | undefined>(undefined);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient,
              private router: Router) {
  }

  logIn(form: any) {
    return this.http.post<IUserResponseModel>('/token/login', {
      email: 'fatemenabizade@hotmail.com',
      password: '123456'
    })
      .pipe(tap((response) => this.doLoginUser(response, response.token)))
  }

  private doLoginUser(user: IUserResponseModel, token: string) {
    this.loggedUser = user.userName;
    this.storeJWTToken(token)
    this.setAuthenticate(user);
  }

  private storeJWTToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.setAuthenticate(undefined);
    this.router.navigate(['/token/logout']);
  }

  getCurrentAuthUser():Observable<IUserResponseModel> {
    return this.http.get<IUserResponseModel>('/token/currentUser');
  }

  setAuthenticate(user: IUserResponseModel | undefined) {
    this.isAuthenticatedSubject.next(user);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

}
