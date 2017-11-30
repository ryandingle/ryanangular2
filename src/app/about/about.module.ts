import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { SharedModule, PaceService } from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'about',
    component: AboutComponent,
    data: {
      page: 'about',
      title: 'Ryan Dingle - About'
    }
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
  providers: [PaceService]
})
export class AboutModule {}