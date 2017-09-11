import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared'; 
import { 
  AuthService, 
  NoAuthGuard, 
  AuthGuard 
} from '../shared/services';

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
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
    LoginComponent,
    RegisterComponent
  ],
  providers: [AuthService, NoAuthGuard]
})
export class AuthModule {}