import { inject, Injectable } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs';
import { BlogComment, BlogPost, SkeletonPost } from './blog.model';
import { SKELETON_POSTS }                      from './blogs.data';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  // ── Posts ────────────────────────────────────────────────────────────────

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>('/api/blog/posts');
  }

  getBySlug(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`/api/blog/posts/${slug}`);
  }

  // ── View tracking (fire-and-forget — swallow errors) ─────────────────────

  trackView(slug: string): void {
    this.http.post(`/api/blog/posts/${slug}/view`, {}).subscribe({ error: () => {} });
  }

  // ── Likes ────────────────────────────────────────────────────────────────

  toggleLike(slug: string, token: string): Observable<{ liked: boolean; count: number }> {
    return this.http.post<{ liked: boolean; count: number }>(
      `/api/blog/posts/${slug}/like`,
      { token }
    );
  }

  // ── Comments ─────────────────────────────────────────────────────────────

  getComments(slug: string): Observable<BlogComment[]> {
    return this.http.get<BlogComment[]>(`/api/blog/posts/${slug}/comments`);
  }

  postComment(slug: string, body: string, displayName?: string): Observable<BlogComment> {
    return this.http.post<BlogComment>(
      `/api/blog/posts/${slug}/comments`,
      { body, displayName: displayName || undefined }
    );
  }

  // ── Skeleton posts (static — coming-soon placeholders) ───────────────────

  getSkeletonPosts(): SkeletonPost[] {
    return SKELETON_POSTS;
  }
}
