import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authError: any;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.eventAuthErrors$.subscribe( data => {
      this.authError = data;
    })
  }
  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }
}