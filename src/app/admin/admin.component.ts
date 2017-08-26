import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { PortfolioModalComponent } from '../shared/modals/portfolio.component';
import { 
  BlogService, 
  PortfolioService, 
  BlogModel, 
  PortfolioModel 
} from '../shared';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private blog: BlogService,
    private portfolio: PortfolioService
  ) {}

  public active: string = 'portfolio';
  public maxSize:number = 5;
  public bigTotalItems:number = 0;
  public bigCurrentPage = 1;
  public numPages:number = 5;
  public itemsPerPage: number = 10;
  public bigCurrenItems:number = 1;
  public project: PortfolioModel[] = [];
  public post: BlogModel[] = [];
  public offset:number = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;

  public modalProject: PortfolioModel;
  public modalPost: BlogModel;

  public datas = {
    'value': '',
    'per_page' : this.itemsPerPage,
    'offset': this.offset
  };

  ngOnInit() {
    if(this.active == 'portfolio') {
      this.portfolio.get(this.datas).then(response => { 
        this.project = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
    } else {
      this.blog.get(this.datas).then(response => { 
        this.post = response[0].data; 
        this.bigTotalItems = response[0].total;
      });
    }
  }

  public search(value) {
    this.datas.value = value;
    this.ngOnInit();
  }

  public refresh() {
    this.ngOnInit();
  }

  perPage(value) {
    this.itemsPerPage = value;
    this.ngOnInit();
  }
 
  public pageChanged(event:any):void {
    this.bigCurrentPage = event.page;
    this.datas.offset = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
    this.ngOnInit();
    //alert('Number items per page: ' + event.itemsPerPage);
    //console.log('Page changed to: ' + event.page);
  }

  public setActive(tab) {
    this.active = tab;
    this.datas.value = '';
    this.ngOnInit();
  }

  public config = {
    animated: true,
    keyboard: true,
    backdrop: false,
    ignoreBackdropClick: true
  };

  public openModal(actionType,name,id) {

    this.bsModalRef = this.modalService.show(PortfolioModalComponent, this.config);

    if(name == 'Portfolio' && actionType == 'edit') {
      this.portfolio.getItem(id).then(response =>  { 
        this.modalProject = response[0]; 
        this.bsModalRef.content.list = this.modalProject;
      });
    }
    else if(name == 'Blog' && actionType == 'edit') {
      this.blog.getItem(id).then(response => {
        this.modalPost = response[0];
        this.bsModalRef.content.list = this.modalPost;
      });
    } else {
      this.bsModalRef.content.list = [];
    }

    this.bsModalRef.content.datas = this.datas;
    this.bsModalRef.content.title = actionType;
    this.bsModalRef.content.name = name;
    this.bsModalRef.content.id = id;
  }

}
