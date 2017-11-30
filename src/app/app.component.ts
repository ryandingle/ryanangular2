import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { 
    SiteModel, 
    UserModel,
    SiteService, 
    SocialModel, 
    AuthService
} from './shared';
import 'rxjs/add/operator/filter'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
    constructor(
        private router: Router, 
        private site: SiteService,
        private auth: AuthService
    )
    {
        router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                window.scroll(0, 0);
        });
    }

    sitedata: SiteModel[];
    socialdata: SocialModel[];

    ngOnInit() {
        this.router.events.subscribe((res) => { 
          if (res instanceof RoutesRecognized) {
            let route = res.state.root.firstChild;
            let page = route.data.page;
            if(page == 'register' || page == 'login' || page == 'home' || page == 'about' || page == 'works' || page == 'contact' || page == 'blog' || page == 'blogdetail') {
                this.site.getSocial().then(response => this.socialdata = response);
            }
          }
        });
        this.site.getSite().then(response => this.sitedata = response);
    }

}
