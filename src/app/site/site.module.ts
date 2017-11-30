import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { MetaComponent } from './meta/meta.component';
import { FrontendComponent } from './frontend/frontend.component';
import { SharedModule, AuthGuard } from '../shared'; 
import { PaginationModule } from 'ngx-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';
import { NotifyService, NotifyModule } from 'notify-angular';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'meta',
    component: MetaComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'meta',
      title: 'Ryan Dingle - Site Meta Identity'
    }
  },
  {
    path: 'frontend',
    component: FrontendComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'frontend',
      title: 'Ryan Dingle - My Frontend Settings'
    }
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectizeModule,
    PaginationModule.forRoot(),
    NotifyModule
  ],
  declarations: [
  	FrontendComponent,
  	MetaComponent
  ],
  providers: [AuthGuard, NotifyService]
})
export class SiteModule {}