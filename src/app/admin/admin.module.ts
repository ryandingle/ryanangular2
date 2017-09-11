import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { AdminComponent } from './admin.component';
import {  SharedModule } from '../shared';
import {
  SiteService,
  PortfolioService,
  BlogService,
  TagService,
  CategoryService,
  AuthGuard
} from '../shared/services';
import {NgSelectizeModule} from 'ng-selectize';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    NgSelectizeModule
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
    AuthGuard 
  ],
  entryComponents: [
  ]
})
export class AdminModule {}