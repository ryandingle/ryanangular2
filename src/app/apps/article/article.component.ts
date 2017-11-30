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
  selector: 'app-article',
  templateUrl: './article.component.html',
})

export class ArticleComponent implements OnInit {

  public modalRef: BsModalRef

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
  public active: string = 'blog';
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
    this.createForm3();

    if(this.active == 'blog') {
      this.blog.list(this.datas).then(response => { 
        this.post = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
    } else if(this.active == 'category') {
      this.category.list2(this.datas).then(response => { 
        this.categories = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
    } else {
      this.tag.list2(this.datas).then(response => { 
        this.tags = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
    }

  }

  public create(action, title, id) {
    this.fValue = undefined;

    this.name = title;
    this.id = id;
    this.action = action;

    if(action == 'edit' && title == 'Blog') {
      this.blog.edit(id).then(response =>  { 
        let data: BlogModel = response;
        this.value1 = response.categories;
        this.value2 = response.tags;
        this.form3.patchValue({
          title: data.data.title,
          slug: data.data.slug,
          body: data.data.body,
          category: response.categories,
          tags: response.tags,
          status: data.data.status,
        });
      });
    } else if(action == 'edit' && title == 'Category') {
      this.category.edit(id).then(response => {
        let data: CategoryModel = response[0];
        this.form2.patchValue({
          title: data.title,
          description:data.description,
          status: data.status,
        });
      });
    } else if(action == 'edit' && title == 'Tag') {
      this.tag.edit(id).then(response => {
        let data: TagModel = response[0];
        this.form2.patchValue({
          title: data.title,
          description:data.description,
          status: data.status,
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

    this.form2.patchValue({
      title: '',
      description: '',
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
    if(name == 'Blog') {
      this.blog.delete(id).then(
        response => { 
          this.ngOnInit();
          this.modalRef.hide(); 
          this.notify.alert(response.success, 'info');
        }, 
        error => { 
          this.errors = JSON.parse(error._body);
      });
    } else if(name == 'Category') {
      this.category.delete(id).then(
        response => { 
          this.ngOnInit();
          this.modalRef.hide(); 
          this.notify.alert(response.success, 'info');
        }, 
        error => { 
          this.errors = JSON.parse(error._body);
      });
    } else {
      this.tag.delete(id).then(
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

  public save(type) {

    this.form3.value.realImage = this.fValue;
    let data: FormData = new FormData();
    
    data.append('title', this.form3.value.title == null ? '' : this.form3.value.title);
    data.append('slug', this.form3.value.slug == null ? '' : this.form3.value.slug);
    data.append('body', this.form3.value.body == null ? '' : this.form3.value.body);
    data.append('category', this.form3.value.category == null ? '' : this.form3.value.category);
    data.append('tag', this.form3.value.tag == null ? '' : this.form3.value.tag);
    data.append('status', this.form3.value.status == null ? '' : this.form3.value.status);
    data.append('photo',  this.fValue !== undefined ? this.fValue : '');

    if(this.name == 'Blog') {
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
      } else{ //update process
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
    } else if(this.name == 'Category') {
      if(type == 'post') {
        this.category.store(this.form2.value).then(response => {
          this.ngOnInit();
          this.notify.alert(response.success,'success');
        }, error => this.errors = JSON.parse(error._body));
      } else {
        this.category.update(this.form2.value, this.id).then(response => {
          this.ngOnInit();
          this.showForm = 0;
          this.notify.alert(response.success,'success');
        }, error => this.errors = JSON.parse(error._body));
      }
    } else {
      if(type == 'post') {
        this.tag.store(this.form2.value).then(response => {
          this.ngOnInit();
          this.notify.alert(response.success,'success');
        }, error => this.errors = JSON.parse(error._body));
      } else {
        this.tag.update(this.form2.value, this.id).then(response => {
          this.ngOnInit();
          this.showForm = 0;
          this.notify.alert(response.success,'success');
        }, error => this.errors = JSON.parse(error._body));
      }
    }
    
  }

  public slug(slug) {
   let word = slug.split(" ").join("-").toLowerCase();
      word = word.split("/").join("-").toLowerCase();

    this.form3.patchValue({slug: word});
  }

}
