import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { PortfolioService, BlogService } from '../services';
import { PortfolioModel, BlogModel, Errors } from '../models';


@Component({
  selector: 'modal-content',
  templateUrl: './portfolio.component.html'
})
export class PortfolioModalComponent implements OnInit{

  constructor(
    public bsModalRef: BsModalRef,
    private portfolio: PortfolioService,
    private blog: BlogService
  ) {
  }

  public title: string;
  public name: string;
  public id: string;
  public list: any[] = [];
  public datas: any;

  public form: any;
  public fValue: any;
  public formData: any;
  public errors: Errors[];

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      link: new FormControl('',[Validators.required, Validators.pattern("http?://.+|https?://.+")]),
      image: new FormControl(),
      status: new FormControl('',[Validators.required])
    });
  }

  getFile(fileInput: any) {
    let file = fileInput.target.files[0];
    this.fValue = file;
  }

  save(type) {
    this.form.value.realImage = this.fValue;
    //alert(this.name+':title '+type+' Process with id: '+this.id);
    let data = new FormData();
    data.append('title', (this.form.value.title != null) ? this.form.value.title : '');
    data.append('description', (this.form.value.description != null) ? this.form.value.description : '');
    data.append('link', (this.form.value.link != null) ? this.form.value.link : '');
    data.append('status', (this.form.value.status != null) ? this.form.value.status : '');
    data.append('photo', (this.fValue != undefined) ? this.fValue : '');

    alert(this.id);

    this.portfolio.insert(data).then(
      response => { 
        this.portfolio.get(this.datas);
        this.bsModalRef.hide(); 
      }, 
      error => { 
        this.errors = JSON.parse(error._body);
    });
  }
}
