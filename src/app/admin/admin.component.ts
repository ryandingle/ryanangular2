import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SelectMultiConfig,
  DefaultConfig,
} from '../shared';
import { 
  BlogModel, 
  PortfolioModel, 
  Errors, 
  TagModel, 
  CategoryModel,
  SelectizeModel,
  CounterModel
} from '../shared/models';
import {
  BlogService, 
  PortfolioService, 
  PaceService,
  AuthService,
  TagService,
  CategoryService,
  AlertService,
  CounterService
}from '../shared/services';
import {NotifyService} from 'notify-angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit {

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
    private notify: AlertService,
    private counter: CounterService
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
  public count: CounterModel;
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
    this.createForm();
    this.createForm2();
    this.createForm3();

    this.counter.get().then(response => this.count = response);

    if(this.active == 'portfolio') {
      this.portfolio.list(this.datas).then(response => { 
        this.project = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
    } else {
      this.blog.list(this.datas).then(response => { 
        this.post = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
    }

  }

  public create(action, title, id) {
    this.fValue = undefined;
    this.name = title;
    this.id = id;
    this.action = action;

    if(action == 'edit' && title == 'Portfolio') {
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
    } else if(action == 'edit' && title == 'Blog') {
      this.blog.edit(id).then(response => {
        let data: BlogModel = response;
        this.value1 = response.categories;
        this.value2 = response.tags;
        this.form3.patchValue({
          title: data.data.title,
          slug: data.data.slug,
          body: data.data.body,
          category: response.categories,
          tag: response.tags,
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
    this.form3.patchValue({
      title: '',
      slug: '',
      body: '',
    });
    this.form.patchValue({
      title: '',
      slug: '',
      description: '',
      link: '',
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
    if(name == 'Portfolio') {
      this.portfolio.delete(id).then(
        response => { 
          this.ngOnInit();
          this.modalRef.hide(); 
          this.notify.alert(response.success, 'info');
        }, 
        error => { 
          this.errors = JSON.parse(error._body);
      });
    } else {
      this.blog.delete(id).then(
        response => { 
          this.ngOnInit();
          this.modalRef.hide(); 
          this.notify.alert(response.success, 'info');
        }, 
        error => { 
          this.errors = JSON.parse(error._body);
      });
    }
  }

  public openModal2(name, template: TemplateRef<any>) {
    this.title2 = name;
    this.modalRef2 = this.modalService.show(template);
    this.createForm2();
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

  createForm2() {
    this.form2 = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      status: new FormControl('published',[Validators.required]),
    });
  }

  public createForm3() {
    this.category.list().then(response => this.categories = response);
    this.tag.list().then(response => this.tags = response);
    this.form3 = new FormGroup({
      title: new FormControl('',[Validators.required]),
      slug: new FormControl('', [Validators.required]),
      body: new FormControl('',[Validators.required]),
      image: new FormControl(),
      tag: new FormControl('',[Validators.required]),
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

    if(this.name == 'Portfolio') {
      data.append('title', this.form.value.title == null ? '' : this.form.value.title);
      data.append('slug', this.form.value.slug == null ? '' : this.form.value.slug);
      data.append('description', this.form.value.description == null ? '' : this.form.value.description);
      data.append('link', this.form.value.link == null ? '' : this.form.value.link);
      data.append('category', this.form.value.category == null ? '' : this.form.value.category);
      data.append('status', this.form.value.status == null ? '' : this.form.value.status);
    }
    if(this.name == 'Blog') {
      data.append('title', this.form3.value.title == null ? '' : this.form3.value.title);
      data.append('slug', this.form3.value.slug == null ? '' : this.form3.value.slug);
      data.append('body', this.form3.value.body == null ? '' : this.form3.value.body);
      data.append('category', this.form3.value.category == null ? '' : this.form3.value.category);
      data.append('tag', this.form3.value.tag == null ? '' : this.form3.value.tag);
      data.append('status', this.form3.value.status == null ? '' : this.form3.value.status);
    }

    data.append('photo',  this.fValue !== undefined ? this.fValue : '');

    if(this.name == 'Portfolio') {
      if(type == 'post') { //post process
        this.portfolio.store(data).then(
          response => { 
            this.ngOnInit();
            this.errors = response;
            this.value1 = [];
            this.value2 = [];
            this.notify.alert(response.success, 'success');
          }, 
          error => { 
            this.errors = JSON.parse(error._body);
        });
      } else{ //update process
        this.portfolio.update(data, this.id).then(
          response => { 
            this.ngOnInit();
            this.errors = response;
            this.showForm = 0;
            this.notify.alert(response.success, 'success');
          }, 
          error => { 
            this.errors = JSON.parse(error._body);
        });
      }
    } else {
       if(type == 'post') { //post process
        this.blog.store(data).then(
          response => { 
            this.ngOnInit();
            this.errors = response;
            this.value1 = [];
            this.value2 = [];
            this.notify.alert(response.success, 'success');
          }, 
          error => { 
            this.errors = JSON.parse(error._body);
        });
      } else { //update process
        this.blog.update(data, this.id).then(
          response => { 
            this.ngOnInit();
            this.errors = response;
            this.showForm = 0;
            this.notify.alert(response.success, 'success');
          }, 
          error => { 
            this.errors = JSON.parse(error._body);
        });
      }
    }
  }

  public slug(slug) {
    let word = slug.split(" ").join("-").toLowerCase();
        word = word.split("/").join("-").toLowerCase();

    this.form.patchValue({slug: word});
    this.form3.patchValue({slug: word});
  }

}
