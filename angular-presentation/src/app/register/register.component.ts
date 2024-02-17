import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {NgIf} from "@angular/common";
import {IRegisterModel} from "../interfaces/user-model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  private _destroy = new Subject<void>();

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null,],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    })
  }


  submit(form: any) {
    const model: IRegisterModel = {
      userName: form.value.email,
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      Password: form.value.password
    }

    this.userService.register(model).subscribe(res =>
      console.log('registered!'))
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
