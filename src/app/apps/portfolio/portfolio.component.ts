import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  	PortfolioService,
  	CategoryService,
  	AuthService
} from '../../shared/services';
import {
	PortfolioModel,
	CategoryModel,
	SelectizeModel,
	Errors
} from '../../shared/models';
import {
	DefaultConfig,
	SelectMultiConfig
} from '../../shared';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent implements OnInit {

	public modalRef: BsModalRef;
  public modalRef2: BsModalRef;

  constructor(
  	private portfolio: PortfolioService,
  	private category: CategoryService,
    private modalService: BsModalService,
    private auth: AuthService,
    private router: Router) { }

  public maxSize:number = 5;
  public bigTotalItems:number = 0;
  public bigCurrentPage = 1;
  public numPages:number = 5;
  public itemsPerPage: number = 10;
  public bigCurrenItems:number = 1;
  public project: PortfolioModel[] = [];
  public offset:number = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
  public datas = {
    'value': '',
    'per_page' : this.itemsPerPage,
    'offset': this.offset
  };

  ngOnInit() {
  	this.portfolio.list(this.datas).then(response => { 
        this.project = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
  }

  public search(value) {
    this.datas.value = value;
    this.ngOnInit();
  }

  public refresh() {
    this.ngOnInit();
  }

  public perPage(value) {
    this.itemsPerPage = value;
    this.ngOnInit();
  }
 
  public pageChanged(event:any):void {
    this.bigCurrentPage = event.page;
    this.datas.offset = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
    this.ngOnInit();
  }

  public title: any;
  public name: any = 'Portfolio';
  public id: any;
  public form: any;
  public fValue: any;
  public formData: any;
  public errors: Errors[];
  public data : any;
  public categories: CategoryModel[];

  public config: any = SelectMultiConfig;
  public placeholder1 = 'Add Category';
  public value1: string[];

  createForm() {
    this.category.list().then(response => this.categories = response);
      this.form = new FormGroup({
        title: new FormControl('',[Validators.required]),
        slug: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        link: new FormControl('',[Validators.required, Validators.pattern("http?://.+|https?://.+")]),
        image: new FormControl(),
        category: new FormControl('',[Validators.required]),
        status: new FormControl('published',[Validators.required])
      });
  }

  getFile(event) {
    let file = event.target.files[0];
    this.fValue = file;
  }

  public openModal(actionType, name, id, template: TemplateRef<any>) {
    this.errors = [];
    this.title = actionType;
    this.name = name;
    this.id = id;

    if(actionType == 'edit') {
      this.portfolio.edit(id).then(response =>  { 
        let data: PortfolioModel = response;
        //this.data = data;
        this.value1 = response.categories;
        this.modalRef = this.modalService.show(template);
        this.createForm();
        this.form.patchValue({
          title: data.data.title,
          slug: data.data.slug,
          description: data.data.description,
          category: response.categories,
          link: data.data.link,
          status: data.data.status
        });
      });
    } else {
      this.data = {};
      this.errors = [];
      this.value1 = [];
      this.modalRef = this.modalService.show(template);
      this.createForm();
    }
  }

  public title2: any;
  public form2: any;

  createForm2() {
    this.form2 = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      status: new FormControl('published',[Validators.required]),
    });
  }

  public openModal2(name, template: TemplateRef<any>) {
    this.errors = [];
    this.title2 = name;
    this.modalRef2 = this.modalService.show(template);
    this.createForm2();
  }

  public save2(name) {

    const data = this.form2.value;
    
	  this.category.store(data).then(response => {
	    this.category.list().then(response => this.categories = response);
	    this.modalRef2.hide();
	  }, error => this.errors = JSON.parse(error._body));
    

  }

  public save(type) {

    this.form.value.realImage = this.fValue;
    let data: FormData = new FormData();

    data.append('title', this.form.value.title == null ? '' : this.form.value.title);
    data.append('slug', this.form.value.slug == null ? '' : this.form.value.slug);

	  data.append('description', this.form.value.description == null ? '' : this.form.value.description);
	  data.append('link', this.form.value.link == null ? '' : this.form.value.link);

    data.append('category', this.form.value.category == null ? '' : this.form.value.category);
    data.append('status', this.form.value.status == null ? '' : this.form.value.status);
    data.append('photo',  this.fValue !== undefined ? this.fValue : '');

	  if(type == 'post') { //post process
	    this.portfolio.store(data).then(
	      response => { 
	        this.ngOnInit();
	        this.modalRef.hide(); 
	      }, 
	      error => { 
	        this.errors = JSON.parse(error._body);
	    });
	  } else if(type == 'edit') { //update process
	    this.portfolio.update(data, this.id).then(
	      response => { 
	        this.ngOnInit();
	        this.modalRef.hide(); 
	      }, 
	      error => { 
	        this.errors = JSON.parse(error._body);
	    });
	  } else { //delete process
	    this.portfolio.delete(this.id).then(
	      response => { 
	        this.ngOnInit();
	        this.modalRef.hide(); 
	      }, 
	      error => { 
	        this.errors = JSON.parse(error._body);
	    });
	  }
  }

  public slug(slug) {
    this.form.patchValue({slug: slug.split(" ").join("-").toLowerCase()});
  }

}
