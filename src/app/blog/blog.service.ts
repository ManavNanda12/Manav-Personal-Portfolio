import { Injectable } from '@angular/core';
import { BlogPost }   from './blog.model';
import { BLOGS }      from './blogs.data';

/**
 * Currently returns static data.
 * Swap getAll() / getBySlug() bodies for HttpClient calls when the MongoDB API is ready.
 */
@Injectable({ providedIn: 'root' })
export class BlogService {

  getAll(): BlogPost[] {
    return BLOGS;
  }

  getBySlug(slug: string): BlogPost | undefined {
    return BLOGS.find(p => p.slug === slug);
  }
}
