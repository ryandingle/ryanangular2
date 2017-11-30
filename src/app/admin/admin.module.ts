import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { AdminComponent } from './admin.component';
import {  SharedModule } from '../shared';
import { CKEditorModule } from 'ng2-ckeditor';
import {
  SiteService,
  PortfolioService,
  BlogService,
  TagService,
  CategoryService,
  AuthGuard,
  AlertService,
  CounterService
} from '../shared/services';
import {NgSelectizeModule} from 'ng-selectize';
import { NotifyModule, NotifyService } from 'notify-angular';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'admin',
      title: 'Ryan Dingle - Admin Dashboard'
    }
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    NgSelectizeModule,
    NotifyModule,
    CKEditorModule
  ],
  declarations: [
    AdminComponent,
  ],
  exports: [
    
  ],
  providers: [
    SiteService,
    PortfolioService,
    BlogService,
    TagService,
    CategoryService,
    AuthGuard,
    NotifyService,
    AlertService,
    CounterService 
  ],
  entryComponents: [
  ]
})
export class AdminModule {}