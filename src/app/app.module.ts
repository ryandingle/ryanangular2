import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    BlogModule,
    AboutModule,
    ContactModule,
    WorksModule,
    rootRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
