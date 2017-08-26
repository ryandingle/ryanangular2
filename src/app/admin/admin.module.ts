import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { AdminComponent } from './admin.component';
import { SharedModule, SiteService } from '../shared'; 
import { PortfolioModalComponent } from '../shared/modals/portfolio.component';


import { 
  PortfolioService,
  BlogService  
} from '../shared/services';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent,
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  declarations: [
    AdminComponent,
    PortfolioModalComponent
  ],
  exports: [
    
  ],
  providers: [
    SiteService,
    PortfolioService,
    BlogService
  ],
  entryComponents: [PortfolioModalComponent]
})
export class AdminModule {}