import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogListResolver } from './blog/blog-list-resolver.service';

export const appRoutes : Routes = [
  { path: 'blog', component: BlogComponent, resolve: {blog: BlogListResolver}},
  { path: '', redirectTo: '/blog', pathMatch: 'full' }
]
