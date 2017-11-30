import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SelectMultiConfig,
  DefaultConfig,
} from '../../shared';
import { 
  BlogModel, 
  PortfolioModel, 
  Errors, 
  TagModel, 
  CategoryModel,
  SelectizeModel,
} from '../../shared/models';
import {
  BlogService, 
  PortfolioService, 
  PaceService,
  AuthService,
  TagService,
  CategoryService,
  AlertService
}from '../../shared/services';
import {NotifyService} from 'notify-angular';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
})

export class PortfolioComponent implements OnInit {

  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;
  public modalRef3: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private blog: BlogService,
    private portfolio: PortfolioService,
    private tag: TagService,
    private category: CategoryService,
    private auth: AuthService,
    private router: Router,
    private notify: AlertService
  ) { }

  public title: string;
  public name: any;
  public id: any;
  public form: any;
  public fValue: any;
  public formData: any;
  public errors: Errors;
  public data : any;
  public tags: TagModel[];
  public categories: CategoryModel[];
  public config: any = SelectMultiConfig;
  public placeholder1 = 'Add Category';
  public placeholder2 = 'Add Tag';
  public value1: string[];
  public value2: string[];
  public title2: any;
  public form2: any;
  public form3: any;
  public active: string = 'portfolio';
  public showForm:any = 0;
  public action: any;

  public maxSize:number = 5;
  public bigTotalItems:number = 0;
  public bigCurrentPage = 1;
  public numPages:number = 5;
  public itemsPerPage: number = 10;
  public bigCurrenItems:number = 1;
  public project: PortfolioModel[] = [];
  public post: BlogModel[] = [];
  public offset:number = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
  public datas = {
    'value': '',
    'per_page' : this.itemsPerPage,
    'offset': this.offset
  };

  ngOnInit() {
    this.createForm2();
    this.createForm();

    this.portfolio.list(this.datas).then(response => { 
      this.project = response[0].data; 
      this.bigTotalItems = response[0].total;
    });

  }

  public create(action, title, id) {
    this.fValue = undefined;
    this.name = title;
    this.id = id;
    this.action = action;

    if(action == 'edit') {
      this.portfolio.edit(id).then(response =>  { 
        let data: PortfolioModel = response;
        this.value1 = response.categories;
        this.form.patchValue({
          title: data.data.title,
          slug: data.data.slug,
          description: data.data.description,
          category: response.categories,
          link: data.data.link,
          status: data.data.status,
        });
      });
    } else {
      this.data = {};
      this.value1 = [];
      this.value2 = [];
    }

    this.showForm = 1;
  }

  public hide() {
    this.showForm = 0;
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

  public setActive(tab) {
    this.errors = new Errors;
    this.active = tab;
    this.showForm = false;
    this.datas.value = '';
    this.ngOnInit();
  }

  public deleteModal(name, id, template: TemplateRef<any>) {
    this.name = name;
    this.id = id;

    this.modalRef = this.modalService.show(template);
  }

  public delete(name, id) {
    this.portfolio.delete(id).then(
      response => { 
        this.ngOnInit();
        this.modalRef.hide(); 
        this.notify.alert(response.success, 'info');
      }, 
      error => { 
        this.errors = JSON.parse(error._body);
    });
  }

  public openModal2(name, template: TemplateRef<any>) {
    this.title2 = name;
    this.modalRef2 = this.modalService.show(template);
    this.createForm2();
  }

  createForm2() {
    this.form2 = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      status: new FormControl('published',[Validators.required]),
    });
  }

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

  public getFile(event) {
    let file = event.target.files[0];
    this.fValue = file;
  }

  public save2(name) {

    const data = this.form2.value;
    
    if(name == 'Category') {
      this.category.store(data).then(response => {
        this.category.list().then(response => this.categories = response);
        this.modalRef2.hide();
        this.notify.alert(response.success,'success');
      }, error => this.errors = JSON.parse(error._body));
    } else {
      this.tag.store(data).then(response => {
        this.modalRef2.hide();
        this.notify.alert(response.success,'success');
        this.tag.list().then(response => this.tags = response);
      }, error => this.errors = JSON.parse(error._body));
    }

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
          //this.errors = response;
          this.value1 = [];
          this.notify.alert(response.success, 'success');
        }, 
        error => { 
          this.errors = JSON.parse(error._body);
      });
    } else{ //update process
      this.portfolio.update(data, this.id).then(
        response => { 
          this.ngOnInit();
          //this.errors = response;
          this.showForm = 0;
          this.notify.alert(response.success, 'success');
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
