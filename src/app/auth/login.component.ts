import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { 
  AuthService,
  Errors, UserModel 
} from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { 
  }

  public form: any;
  public errors: Errors[];
  public users: UserModel;

  ngOnInit() {
    this.errors = [];
    this.createForm();
  }

  public createForm() {
    this.form = new FormGroup({
        email: new FormControl(),
        password: new FormControl()
    });
  }

  public login() {
    this.auth.login(this.form.value)
    .then(response => { 
        this.users = response.data;
        this.auth.setLogin(response.data, response.token);
        this.router.navigateByUrl('/admin');
      },
      err => {
        this.errors = JSON.parse(err._body);
      }
    );
  }

}
