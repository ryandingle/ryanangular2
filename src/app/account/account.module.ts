import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';

import { AccountComponent } from './account.component';
import { SharedModule,AuthGuard } from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'account',
    component: AccountComponent,
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
    AccountComponent
  ],
  providers: [AuthGuard]
})
export class AccountModule {}