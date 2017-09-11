import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { 
  SiteModel, 
  UserModel,
  SocialModel
} from '../../shared/models';
import { 
  AuthService,
} from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ){ }

  page: string = 'home';
  location: any;
  login: any = false;
  status = this.auth.isLoggedIn();
  users = UserModel;

  @Input() socialdata: SocialModel[];
  @Input() sitedata: SiteModel[];

  ngOnInit() {
    this.router.events.subscribe((res) => { 
      this.location = this.router.url;
      this.page = (this.location.replace('/','') != '') ? this.location.replace('/','') : 'home'; 
      this.login = (this.location == '/auth/register' || this.location == '/auth/login' || this.page == 'home' || this.page == 'about' || this.page == 'works' || this.page == 'contact' || this.page == 'blog') ? false : true;
      this.status = this.auth.isLoggedIn();
      this.users = this.auth.getUserToken();
    });
  }

  logout() {
    this.auth.setLogout();
    this.router.navigateByUrl('/auth/login');
  }

  pageName(page: string) { this.page = page;}
  
}