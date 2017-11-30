import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { 
    PaceService,
    PortfolioService 
} from '../shared/services';
import { 
    PortfolioModel
} from '../shared/models';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
})
export class WorksComponent implements OnInit {

  constructor(
      private pace: PaceService,
      private router: Router,
      private route: ActivatedRoute,
      private portfolio: PortfolioService
  ) { }

  public maxSize:number = 5;
  public bigTotalItems:number = 0;
  public bigCurrentPage = 1;
  public numPages:number = 5;
  public itemsPerPage: number = 12;
  public bigCurrenItems:number = 1;
  public projects: PortfolioModel[] = [];
  public offset:number = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
  public datas = {
    'value': '',
    'per_page' : this.itemsPerPage,
    'offset': this.offset
  };

  ngOnInit() {
  	this.portfolio.list(this.datas).then(response => { 
      this.projects = response[0].data; 
      this.bigTotalItems = response[0].total;
    });

  	this.router.events.subscribe((res) => { 
      if (res instanceof RoutesRecognized) {
        let route = res.state.root.firstChild;
        let headtitle = route.data.title;
      	this.pace.setTitle('Ryan Dingle - '+ headtitle);
      }
    });
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

}
