import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
    BlogService,
    PaceService 
} from '../shared/services';
import { 
    BlogModel 
} from '../shared/models';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html'
})

export class BlogDetailComponent implements OnInit {

  constructor(
    private blog: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private pace: PaceService) { }

  public post: BlogModel;
  public slug = this.route.snapshot.params['slug'];
  public recentPost: BlogModel[];
  public pageId = '/blog/'+this.slug;

  ngOnInit() {
    this.blog.getBySlug(this.slug).then(response => { 
        this.post = response[0]; 
        this.pace.setTitle('Ryan Dingle - '+this.post.title);
    });
    this.blog.getRecentPost().then(response=> this.recentPost = response);
  }

  navigate(slug) {    this.route.params.subscribe(res => { 
      this.router.navigate(['blog', slug]).then(res=>{
        this.pageId = '/works/'+slug;
        this.blog.getBySlug(slug).then(response => { 
            this.post = response[0]; 
            this.pace.setTitle('Ryan Dingle - '+this.post.title);
        });
        this.blog.getRecentPost().then(response=> this.recentPost = response);
      });
    });
  }

}
