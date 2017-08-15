import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
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
    LoginComponent
  ],
  providers: []
})
export class LoginModule {}