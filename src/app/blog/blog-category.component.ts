import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
    BlogService,
    PaceService 
} from '../shared/services';
import { 
    BlogModel,
    CategoryModel 
} from '../shared/models';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html'
})

export class BlogCategoryComponent implements OnInit {

  constructor(
    private blog: BlogService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public maxSize:number = 5;
  public bigTotalItems:number = 0;
  public bigCurrentPage = 1;
  public numPages:number = 5;
  public itemsPerPage: number = 10;
  public bigCurrenItems:number = 1;
  public post: BlogModel[] = [];
  public offset:number = (this.bigCurrentPage == 1) ? 0 : this.bigCurrentPage*this.itemsPerPage;
  public categories: CategoryModel[];
  public id = this.route.snapshot.params['id'];
  public datas = {
      'value': '',
      'per_page' : this.itemsPerPage,
      'offset': this.offset,
      'id': this.id
  };

  ngOnInit() {
      this.blog.listByCategory(this.datas, this.id).then(response => { 
          this.post = response[0].data; 
          this.bigTotalItems = response[0].total;
      });

      this.blog.getCategoryList().then(response=>this.categories = response);
  }

  navigate(id) {
    this.datas = {
      'value': '',
      'per_page' : this.itemsPerPage,
      'offset': this.offset,
      'id': id
    };
    this.route.params.subscribe(res => { 
      this.router.navigate(['blog/cat/', id]).then(res=>{
        this.blog.listByCategory(this.datas, id).then(response => { 
            this.post = response[0].data; 
            this.bigTotalItems = response[0].total;
        });
      });
    });
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
