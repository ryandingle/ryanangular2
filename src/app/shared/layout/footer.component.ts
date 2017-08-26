import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SiteModel, SocialModel, UserModel } from '../../shared';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit{

  constructor(
    private router: Router,
  ){ }

  location: any;
  socials: any[];

  @Input() sitedata: SiteModel[];
  @Input() socialdata: SocialModel[];

  today: number = Date.now();

  user: UserModel = {
    id: '',
    name: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    address: '',
    usertype: '',
    email: '',
    isLoggedIn: 1,
    token: '',
    created_at: '',
    updated_at: '',
  };

  ngOnInit() {
    this.router.events.subscribe((res) => { this.location = this.router.url;});
  }

  
}