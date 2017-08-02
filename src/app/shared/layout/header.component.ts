import { Component } from '@angular/core';
import { siteDetail } from '../../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor() {}

  siteDetail: siteDetail = {
    owner : 'Ryan Dingle',
    email: 'ryandingle09@gmail.com',
    tagline: 'Coder, Designer, Blogger',
    location: 'Metro Manila, Philippines (PH)',
    contactno: '+639065601556'
  };

  page: string = 'home';

  pageName(page: string) {
    this.page = page;
    if(this.page == 'blog') {
      this.siteDetail.owner = "Ryan Dingle' Blog";
      this.siteDetail.tagline = "Read some interesting articles in my blog";
      this.siteDetail.email = '';
    } else {
      this.siteDetail.owner = 'Ryan Dingle';
      this.siteDetail.tagline = 'Coder, Designer, Blogger';
      this.siteDetail.email = 'ryandingle09@gmail.com';
    } 
  }
}