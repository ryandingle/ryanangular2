import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { MetaComponent } from './meta/meta.component';
import { ApiComponent } from './api/api.component';
import { FrontendComponent } from './frontend/frontend.component';
import { SharedModule, AuthGuard } from '../shared'; 
import { PaginationModule } from 'ngx-bootstrap';
import {NgSelectizeModule} from 'ng-selectize';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'meta',
    component: MetaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'frontend',
    component: FrontendComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'api',
    component: ApiComponent,
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
    PaginationModule.forRoot(),
  ],
  declarations: [
  	ApiComponent,
  	FrontendComponent,
  	MetaComponent
  ],
  providers: [AuthGuard]
})
export class SiteModule {}