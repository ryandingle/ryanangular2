import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { ArticleComponent } from './article/article.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SharedModule, AuthGuard, AlertService } from '../shared'; 
import { PaginationModule } from 'ngx-bootstrap';
import {NgSelectizeModule} from 'ng-selectize';
import { NotifyModule, NotifyService } from 'notify-angular';
import { CKEditorModule } from 'ng2-ckeditor';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'notification',
      title: 'Ryan Dingle - My Notifications'
    }
  },
  {
    path: 'article',
    component: ArticleComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'article',
      title: 'Ryan Dingle - My Articles'
    }
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'portfolio',
      title: 'Ryan Dingle - My Portfolios'
    }
  },
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectizeModule,
    PaginationModule.forRoot(),
    NotifyModule,
    CKEditorModule    
  ],
  declarations: [
    NotificationComponent,
    PortfolioComponent,
    ArticleComponent
  ],
  providers: [AuthGuard, NotifyService, AlertService]
})
export class AppsModule {}