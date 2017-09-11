import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { ArticleComponent } from './article/article.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SharedModule, AuthGuard } from '../shared'; 
import { PaginationModule } from 'ngx-bootstrap';
import {NgSelectizeModule} from 'ng-selectize';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article',
    component: ArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [AuthGuard]
  },
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectizeModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    NotificationComponent,
    PortfolioComponent,
    ArticleComponent
  ],
  providers: [AuthGuard]
})
export class AppsModule {}