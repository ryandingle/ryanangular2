import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  form: any;

  ngOnInit() {
      this.createForm();

      //window.location.href = '/admin';
  }


  createForm() {
      this.form = new FormGroup({
          email: new FormControl('',[Validators.required, Validators.email]),
          password: new FormControl('',[Validators.required]),
      });
  }

}
