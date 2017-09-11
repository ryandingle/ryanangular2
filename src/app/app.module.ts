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
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { AccountModule } from './account/account.module';
import { PaceService } from './shared/services';
import { SiteModule } from './site/site.module';
import { AppsModule } from './apps/apps.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

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
    AuthModule,
    ProfileModule,
    SiteModule,
    AccountModule,
    AppsModule,
    rootRouting,
    ModalModule.forRoot(),
  ],
  providers: [Title, PaceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
