import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { SharedModule, PaceService } from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'contact',
    component: ContactComponent
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule
  ],
  declarations: [
    ContactComponent
  ],
  providers: [PaceService]
})
export class ContactModule {}