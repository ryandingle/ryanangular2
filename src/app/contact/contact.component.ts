import { Component, OnInit } from '@angular/core';
import { siteDetail } from '../shared';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  siteDetail: siteDetail = {
    owner : 'Ryan Dingle',
    email: 'ryandingle09@gmail.com',
    tagline: 'Coder, Designer, Blogger',
    location: 'Metro Manila, Philippines (PH)',
    contactno: '+639065601556'
  };

  ngOnInit() {
  }

}
