import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { 
  SiteModel, 
  UserModel,
  SocialModel
} from '../../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ){ }

  page: string = 'home';
  location: any;

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

  @Input() socialdata: SocialModel[];
  @Input() sitedata: SiteModel[];

  ngOnInit() {
    this.router.events.subscribe((res) => { this.location = this.router.url;});
  }

  pageName(page: string) { this.page = page;}
  
}