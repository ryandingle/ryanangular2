import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
    BlogService 
} from '../shared/services';
import { 
    BlogModel,
    CategoryModel 
} from '../shared/models';
@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {

    constructor(
        private blog: BlogService,
        private router: Router
    ) { }

    public maxSize:number = 5;
    public bigTotalItems:number = 0;
    public bigCurrentPage = 1;
    public numPages:number = 5;
    public itemsPerPage: number = 10;
    public bigCurrenItems:number = 1;
    public post: BlogModel[] = [];
    public offset:number = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
    public datas = {
        'value': '',
        'per_page' : this.itemsPerPage,
        'offset': this.offset
    };
    public categories: CategoryModel[];

    ngOnInit() {
        this.blog.list(this.datas).then(response => { 
            this.post = response[0].data; 
            this.bigTotalItems = response[0].total;
        });

        this.blog.getCategoryList().then(response=>this.categories = response);
    }

    public perPage(value) {
        this.itemsPerPage = value;
        this.ngOnInit();
    }
     
    public pageChanged(event:any):void {
        this.bigCurrentPage = event.page;
        this.datas.offset = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
        this.ngOnInit();
    }

}
