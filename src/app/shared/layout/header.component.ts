import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { 
  SiteModel, 
  UserModel,
  SocialModel
} from '../../shared/models';
import { 
  AuthService,
  PaceService
} from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private title: PaceService
  ){ }

  page: string = 'home';
  headtitle: string;
  location: any;
  login: any = false;
  status = this.auth.isLoggedIn();
  users = UserModel;

  @Input() socialdata: SocialModel[];
  @Input() sitedata: SiteModel[];

  ngOnInit() {
    this.router.events.subscribe((res) => { 
      this.status = this.auth.isLoggedIn();
      this.users = this.auth.getUserToken();
      if (res instanceof RoutesRecognized) {
        let route = res.state.root.firstChild;
        this.page = route.data.page;
        this.headtitle = route.data.title;
      }

      if(this.page !== 'blogdetail') this.title.setTitle(this.headtitle);

      this.login = (this.page == 'register' || this.page == 'login' || this.page == 'home' || this.page == 'about' || this.page == 'works' || this.page == 'contact' || this.page == 'blog' || this.page == 'blogdetail') ? false : true;
    });
  }

  logout() {
    this.auth.setLogout();
    this.router.navigateByUrl('/auth/login');
  }

  pageName(page: string) { this.page = page;}
  
}