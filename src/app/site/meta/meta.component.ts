import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
	SiteService,
	AlertService
} from '../../shared/services';
import {
  SiteModel,
  Errors
} from '../../shared/models';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
})
export class MetaComponent implements OnInit {

  constructor(
  	private site: SiteService,
  	private notify: AlertService) { }

  public form: any;
  public showForm = 0;
  public photo: any;
  public logo: any;
  public sitedata: SiteModel;
  public errors: Errors;
  public id: any = '';

  ngOnInit() {
  	this.createForm();
  	this.site.getSite().then(response => { 
  		this.sitedata = response[0];
		this.id = response[0].id
  	});
  }

  public getFile(event) {
    let file = event.target.files[0];
    this.photo = file;
  }

  public getFile2(event) {
    let file = event.target.files[0];
    this.logo = file;
  }

  public hide() {
  	this.showForm = 0;
  }

  public show() {
  	this.showForm = 1;
  	this.form.patchValue({
  		title: this.sitedata.title,
  		email: this.sitedata.email,
  		tagline: this.sitedata.tagline,
  		description: this.sitedata.description,
  		contact: this.sitedata.contact,
  		location: this.sitedata.location,
  		owner: this.sitedata.owner
  	});
  }

  public createForm() {
  	this.form = new FormGroup({
  		title: new FormControl('', [Validators.required]),
  		email: new FormControl('', [Validators.required, Validators.email]),
  		tagline: new FormControl('', [Validators.required]),
  		description: new FormControl('', [Validators.required]),
  		contact: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
  		location: new FormControl('' ,[Validators.required]),
  		owner: new FormControl('', [Validators.required]),
  		image: new FormControl(),
      logo: new FormControl(),
  	});
  }

  public save() 
  {
  	let data = new FormData();
  	data.append('title', this.form.value.title == null ? '' : this.form.value.title);
  	data.append('email', this.form.value.email == null ? '' : this.form.value.email);
  	data.append('tagline', this.form.value.tagline == null ? '' : this.form.value.tagline);
  	data.append('description', this.form.value.description == null ? '' : this.form.value.description);
  	data.append('contact', this.form.value.contact == null ? '' : this.form.value.contact);
  	data.append('location', this.form.value.location == null ? '' : this.form.value.location);
  	data.append('owner', this.form.value.owner == null ? '' : this.form.value.owner);
  	data.append('photo', this.photo == undefined ? '' : this.photo);
    data.append('photo2', this.logo == undefined ? '' : this.logo);

  	if(this.id == '') {
  		this.site.store(data).then(response => {
  			this.sitedata = response[0];
	  		this.notify.alert('Successfully Saved.', 'success');
	  	},error => {
	  		this.errors = error._body;
	  	});
  	} else {
  		this.site.update(data, this.id).then(response => {
  			this.sitedata = response[0];
	  		this.notify.alert('Successfully Updated.','success');
	  	},error => {
	  		this.errors = error._body;
	  	});
  	}
  }
}
