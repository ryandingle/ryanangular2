import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import {
  SharedModule,
  FooterComponent,
  HeaderComponent,
} from './shared';

import { HomeModule } from './home/home.module';
import { BlogModule } from './blog/blog.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { WorksModule } from './works/works.module';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { NotificationModule } from './notification/notification.module';
import { SettingModule } from './setting/setting.module';
import { PaceService } from './shared/services';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HomeModule,
    BlogModule,
    AboutModule,
    ContactModule,
    WorksModule,
    AdminModule,
    LoginModule,
    ProfileModule,
    NotificationModule,
    SettingModule,
    rootRouting,
    ModalModule.forRoot(),
  ],
  providers: [Title, PaceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
