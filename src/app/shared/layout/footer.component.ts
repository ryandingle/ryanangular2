import { Component } from '@angular/core';
import { siteDetail } from '../../shared';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today: number = Date.now();

  siteDetail: siteDetail = {
    owner : 'Ryan Dingle',
    email: 'ryandingle09@gmail.com',
    tagline: 'Coder, Designer, Blogger',
    location: 'Metro Manila, Philippines (PH)',
    contactno: '+639065601556'
  };
}