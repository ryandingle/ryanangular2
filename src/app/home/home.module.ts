import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule, PaceService } from '../shared'; 

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    data: {
      page: 'home',
      title: 'Ryan Dingle - Full stack Web Developer'
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [PaceService]
})
export class HomeModule {}