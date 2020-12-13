import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  autherror: any;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.eventAuthErrors$.subscribe( data => {
      this.autherror = data;
    })
  }
  createUser(form){
    this.auth.createUser(form.value);
  }
}
