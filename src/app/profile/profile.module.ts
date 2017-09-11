import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { SharedModule, AuthGuard } from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: []
})
export class ProfileModule {}