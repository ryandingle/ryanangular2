import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  AuthService,
  PaceService
} from '../shared/services';
import {
  Errors
} from '../shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  constructor(
    private pace: PaceService,
    private auth: AuthService,
    private router: Router
    ) {
    if(this.auth.isLoggedIn()) this.router.navigate(['/admin']);
  }

  public form: any;
  public errors: Errors;

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.form = new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        password_confirmation: new FormControl(),
    });
  }

  public register() {
    this.auth.register(this.form.value).then(response=>null, error=>this.errors = JSON.parse(error._body));
  }

}
