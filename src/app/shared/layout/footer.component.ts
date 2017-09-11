import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SiteModel, SocialModel, UserModel } from '../../shared/models';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit{

  constructor(
    private router: Router,
    private auth: AuthService
  ){ }

  location: any;
  socials: any[];
  login: any = false;

  @Input() sitedata: SiteModel[];
  @Input() socialdata: SocialModel[];

  today: number = Date.now();

  ngOnInit() {
    this.router.events.subscribe((res) => { 
      this.location = this.router.url;
      this.login = (this.location == '/auth/register' || this.location == '/auth/login' || this.location == '/' || this.location == '/about' || this.location == '/works' || this.location == '/contact' || this.location == '/blog') 
    ? false 
    : true;
    });
  }

  
}