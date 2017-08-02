import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorksComponent } from './works.component';
import { SharedModule } from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'works',
    component: WorksComponent
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule
  ],
  declarations: [
    WorksComponent
  ],
  providers: []
})
export class WorksModule {}