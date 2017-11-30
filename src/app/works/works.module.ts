import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap';
import { WorksComponent } from './works.component';
import { WorksDetailComponent } from './works-detail.component';
import { DisqusModule } from "ng2-awesome-disqus";
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { 
  SharedModule, 
  PaceService, 
  PortfolioService 
} from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'works',
    component: WorksComponent,
    data: {
      page: 'works',
      title: 'Ryan Dingle - Works/Portfolio'
    }
  },
  {
    path: 'works/:id',
    component: WorksDetailComponent,
    data: {
      page: 'works',
      title: 'Ryan Dingle - Work Details'
    }
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    PaginationModule.forRoot(),
    DisqusModule,
    ShareButtonsModule.forRoot()
  ],
  declarations: [
    WorksComponent,
    WorksDetailComponent
  ],
  providers: [
    PaceService, 
    PortfolioService
  ]
})
export class WorksModule {}