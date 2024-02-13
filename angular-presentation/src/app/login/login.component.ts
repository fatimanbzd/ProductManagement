import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {IUserResponseModel} from "../interfaces/user-model";
import {Router} from "@angular/router";

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
              private authService: AuthService,
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

  submit(event: Event) {
    event.preventDefault();
    this.authService.logIn(this.form.getRawValue())
      .subscribe((res: IUserResponseModel) => {
          this.router.navigate(['dashboard']);
        }
      )
  }
}
