import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';

import { AccountComponent } from './account.component';
import { 
  SharedModule,
  AuthGuard, 
  UserService,
  AuthService 
} from '../shared'; 
import { NotifyService, NotifyModule } from 'notify-angular';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'account',
      title: 'Ryan Dingle - My Account'
    }
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NotifyModule
  ],
  declarations: [
    AccountComponent
  ],
  providers: [
    AuthGuard, 
    AuthService,
    NotifyService, 
    UserService
  ]
})
export class AccountModule {}