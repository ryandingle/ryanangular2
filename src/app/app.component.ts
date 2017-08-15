import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { 
    SiteModel, 
    SiteService, 
    SocialModel, 
    PaceService 
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
        private pace: PaceService,
        private title: Title 
    )
    {
        router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                window.scroll(0, 0);
        });

        this.title.setTitle("Ryan Dingle - FUll Stack Developer");

    }

    sitedata: SiteModel[];
    socialdata: SocialModel[];

    ngOnInit() {
        this.site.getSite().then(response => this.sitedata = response);
        this.site.getSocial().then(response => this.socialdata = response);
        this.pace.removePace();
    }

}
