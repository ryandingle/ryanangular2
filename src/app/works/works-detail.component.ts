import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
    PortfolioService,
    PaceService 
} from '../shared/services';
import { 
    PortfolioModel 
} from '../shared/models';

@Component({
  selector: 'app-works-detail',
  templateUrl: './works-detail.component.html'
})

export class WorksDetailComponent implements OnInit {

  constructor(
    private project: PortfolioService,
    private route: ActivatedRoute,
    private router: Router,
    private pace: PaceService) { }

  public projects: PortfolioModel;
  public id = this.route.snapshot.params['id'];
  public recentWorks: PortfolioModel[];
  public pageId = '/works/'+this.id;

  ngOnInit() {
    this.project.get(this.id).then(response => { 
        this.projects = response[0]; 
        this.pace.setTitle('Ryan Dingle - '+this.projects.title);
    });
    this.project.getRecentPost().then(response=> this.recentWorks = response);
  }

  navigate(id) {
    this.route.params.subscribe(res => { 
      this.router.navigate(['works/', id]).then(res=>{
        this.pageId = '/works/'+id;
        this.project.get(this.id).then(response => { 
          this.projects = response[0]; 
          this.pace.setTitle('Ryan Dingle - '+this.projects.title);
        });
      });
    });
  }

}
