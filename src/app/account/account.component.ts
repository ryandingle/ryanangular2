import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
	UserService,
	AlertService,
	AuthService
} from '../shared/services';
import {
  UserModel,
  Errors
} from '../shared/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  constructor(
  	private auth: AuthService,
  	private userInfo: UserService,
  	private notify: AlertService
  ) { }

  public form: any;
  public showForm = 0;
  public UserData: UserModel;
  public errors: Errors;
  public id: any = '';
  public userCookie = this.auth.getUserToken();

  ngOnInit() {
  	this.createForm();
  }

  public hide() {
  	this.showForm = 0;
  }

  public show() {
  	this.showForm = 1;
  	this.form.patchValue({
  		firstname: this.userCookie['firstname'],
  		email: this.userCookie['email'],
  		lastname: this.userCookie['lastname'],
  	});
  }

  public createForm() {
  	this.form = new FormGroup({
  		firstname: new FormControl('', [Validators.required]),
  		email: new FormControl('', [Validators.required, Validators.email]),
  		lastname: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
			password2: new FormControl('', [Validators.required]),
  	}, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
	  return g.get('password').value === g.get('password2').value ? null : {'mismatch': true};
	}

  public save() {
  	let data = new FormData();
  	data.append('email', this.form.value.email == null ? '' : this.form.value.email);
  	data.append('firstname', this.form.value.firstname == null ? '' : this.form.value.firstname);
  	data.append('lastname', this.form.value.lastname == null ? '' : this.form.value.lastname);
  	data.append('password', this.form.value.password == null ? '' : this.form.value.password);
  	data.append('password_confirmation', this.form.value.password2 == null ? '' : this.form.value.password2);

  	let id = this.userCookie['id'];

  	this.userInfo.update(id, data).then(response => {
			this.UserData = response.user;
			this.auth.updateUserToken(response.user);
			this.userCookie = this.auth.getUserToken();
  		this.notify.alert('Account Successfully Updated.','success');
  	},error => {
  		this.errors = JSON.parse(error._body);
  		this.notify.alert('Server validation Error.','danger');
  	});
  }

}