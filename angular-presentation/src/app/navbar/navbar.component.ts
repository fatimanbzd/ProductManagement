import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {IUserResponseModel} from "../interfaces/user-model";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user!: IUserResponseModel;
  authService = inject(AuthService);

  constructor() {
  }

  ngOnInit() {
    this.authService.getCurrentAuthUser()
      .subscribe(user =>
        this.user = user
  )
  }

  logout() {
    this.authService.logout();
  }
}
