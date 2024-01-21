import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) {
  }


  ngOnInit() {
    this.http.get('http://localhost:3000')
      .subscribe(res => console.log(res))
  }
}
