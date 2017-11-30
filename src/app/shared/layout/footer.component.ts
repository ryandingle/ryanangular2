import { Component, OnInit, Input } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
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

  page: string = 'home';
  headtitle: string;
  status = this.auth.isLoggedIn();
  users = UserModel;

  @Input() sitedata: SiteModel[];
  @Input() socialdata: SocialModel[];

  today: number = Date.now();

  ngOnInit() {
    this.router.events.subscribe((res) => { 
      this.status = this.auth.isLoggedIn();
      this.users = this.auth.getUserToken();
      if (res instanceof RoutesRecognized) {
        let route = res.state.root.firstChild;
        this.page = route.data.page;
      }
      this.login = (this.page == 'register' || this.page == 'login' || this.page == 'home' || this.page == 'about' || this.page == 'works' || this.page == 'contact' || this.page == 'blog' || this.page == 'blogdetail') ? false : true;
    });
  }

  
}