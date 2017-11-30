import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogCategoryComponent } from './blog-category.component';
import {DisqusModule} from "ng2-awesome-disqus";
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { 
  SharedModule, 
  PaceService 
} from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      page: 'blog',
      title: 'Ryan Dingle - My Blog'
    }
  },
  {
    path: 'blog/:slug',
    component: BlogDetailComponent,
    data: {
      page: 'blogdetail',
      title: 'Blog Details'
    }
  },
  {
    path: 'blog/cat/:id',
    component: BlogCategoryComponent,
    data: {
      page: 'blog',
      title: 'Blog Category'
    }
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    DisqusModule,
    ShareButtonsModule.forRoot()
  ],
  declarations: [
    BlogComponent,
    BlogDetailComponent,
    BlogCategoryComponent
  ],
  providers: [PaceService]
})
export class BlogModule {}