import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BlogService } from '../shared/blog.service';

@Injectable()
export class BlogListResolver implements Resolve<any> {
  constructor(private blogService: BlogService) {}
  resolve() {
    return this.blogService.getBlogs().map(blogs => blogs);
  }
}
