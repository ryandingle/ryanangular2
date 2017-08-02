import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { SharedModule } from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'about',
    component: AboutComponent
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule
  ],
  declarations: [
    AboutComponent
  ],
  providers: []
})
export class AboutModule {}