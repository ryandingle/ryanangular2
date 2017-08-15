import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';

import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail.component';
import { 
  SharedModule, 
  PaceService 
} from '../shared'; 

const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:slug',
    component: BlogDetailComponent,
  }
]);

@NgModule({
  imports: [
    Routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BlogComponent,
    BlogDetailComponent
  ],
  providers: [PaceService]
})
export class BlogModule {}