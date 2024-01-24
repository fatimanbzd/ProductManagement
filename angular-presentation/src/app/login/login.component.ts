import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {IUserModel} from "../interfaces/user-model";
import {Router} from "@angular/router";
import {CurrentUserService} from "../services/current-user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private authService: AuthService,
              private currentUserService: CurrentUserService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  submit() {
    console.log(this.form.getRawValue())
    this.http.post<{user: IUserModel}>('https://api.realworld.io/api/users/login', {user: this.form.getRawValue()})
      .subscribe({
        next:(res: any)=>{
          localStorage.setItem('token',res.user.token);
          this.currentUserService.setCurrentUser();
          this.authService.currentUserSig.set(res.user)
          this.router.navigateByUrl('/dashboard');
        }
      })
  }
}
