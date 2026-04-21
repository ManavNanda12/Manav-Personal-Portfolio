import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule }                     from '@angular/forms';
import { ActivatedRoute, Router }          from '@angular/router';
import { Title, Meta }                     from '@angular/platform-browser';
import { BlogComment, BlogPost, ContentBlock } from '../blog.model';
import { BlogService }                        from '../blog.service';
import { ThemeService }                       from '../../services/theme.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  post:           BlogPost | undefined;
  notFound        = false;
  loading         = true;

  // ── Like state ────────────────────────────────────────
  isLiked         = false;
  likeCount       = 0;
  likeInFlight    = false;

  // ── Share state ───────────────────────────────────────
  showShareCopied = false;

  // ── Comments ──────────────────────────────────────────
  comments:       BlogComment[] = [];
  commentsLoading = false;
  commentName     = '';
  commentBody     = '';
  commentSending  = false;
  commentError    = '';
  commentSuccess  = false;

  constructor(
    private route:        ActivatedRoute,
    private router:       Router,
    private blogService:  BlogService,
    public  themeService: ThemeService,
    private title:        Title,
    private meta:         Meta
  ) {}

  /** Cover gradient adapts to theme */
  get heroBackground(): string {
    if (!this.post) return '';
    return this.themeService.isLight
      ? 'linear-gradient(135deg, #ede8ff 0%, #f3eeff 55%, #e8eeff 100%)'
      : this.post.coverGradient;
  }

  // ── Visitor token (UUID, persisted in localStorage) ──
  private get visitorToken(): string {
    if (!this.isBrowser) return '';
    let token = localStorage.getItem('mn_visitor_token');
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem('mn_visitor_token', token);
    }
    return token;
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }

    this.blogService.getBySlug(slug).subscribe({
      next: post => {
        this.post      = post;
        this.likeCount = post.likeCount;
        this.loading   = false;

        this.title.setTitle(`${post.title} | Manav Nanda`);
        this.meta.updateTag({ name: 'description',         content: post.excerpt });
        this.meta.updateTag({ property: 'og:title',        content: post.title });
        this.meta.updateTag({ property: 'og:description',  content: post.excerpt });
        this.meta.updateTag({ name: 'twitter:title',       content: post.title });
        this.meta.updateTag({ name: 'twitter:description', content: post.excerpt });

        if (this.isBrowser) {
          // Restore liked state from localStorage
          this.isLiked = localStorage.getItem(`liked_${slug}`) === 'true';
          // Increment view count (fire-and-forget)
          this.blogService.trackView(slug);
          // Load comments
          this.loadComments(slug);
          setTimeout(() => this.initReveal(), 60);
        }
      },
      error: err => {
        this.loading  = false;
        this.notFound = err.status === 404;
      }
    });
  }

  // ── Comments ─────────────────────────────────────────

  private loadComments(slug: string) {
    this.commentsLoading = true;
    this.blogService.getComments(slug).subscribe({
      next:  c    => { this.comments = c; this.commentsLoading = false; },
      error: ()   => { this.commentsLoading = false; }
    });
  }

  submitComment() {
    if (!this.post || this.commentSending) return;
    const body = this.commentBody.trim();
    if (!body) { this.commentError = 'Comment cannot be empty.'; return; }

    this.commentError   = '';
    this.commentSending = true;

    this.blogService.postComment(this.post.slug, body, this.commentName.trim() || undefined)
      .subscribe({
        next: comment => {
          this.comments      = [comment, ...this.comments];
          this.commentBody   = '';
          this.commentName   = '';
          this.commentSending = false;
          this.commentSuccess = true;
          setTimeout(() => { this.commentSuccess = false; }, 3000);
        },
        error: err => {
          this.commentSending = false;
          this.commentError   = err.error?.error ?? 'Failed to post comment. Try again.';
        }
      });
  }

  formatCommentDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  // ── Copy code block ──────────────────────────────────

  copyCode(block: ContentBlock, event: Event) {
    if (!this.isBrowser || !block.code) return;
    const btn = (event.target as HTMLElement).closest('.copy-btn') as HTMLButtonElement;
    navigator.clipboard.writeText(block.code).then(() => {
      if (btn) {
        btn.classList.add('copied');
        btn.querySelector('.copy-label')!.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.querySelector('.copy-label')!.textContent = 'Copy';
        }, 2000);
      }
    });
  }

  // ── Like ─────────────────────────────────────────────

  toggleLike() {
    if (!this.isBrowser || !this.post || this.likeInFlight) return;
    this.likeInFlight = true;

    this.blogService.toggleLike(this.post.slug, this.visitorToken).subscribe({
      next: ({ liked, count }) => {
        this.isLiked  = liked;
        this.likeCount = count;
        this.likeInFlight = false;
        if (liked) {
          localStorage.setItem(`liked_${this.post!.slug}`, 'true');
        } else {
          localStorage.removeItem(`liked_${this.post!.slug}`);
        }
      },
      error: () => { this.likeInFlight = false; }
    });
  }

  // ── Share ─────────────────────────────────────────────

  sharePost() {
    if (!this.isBrowser || !this.post) return;
    if (navigator.share) {
      navigator.share({ title: this.post.title, text: this.post.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showShareCopied = true;
        setTimeout(() => { this.showShareCopied = false; }, 2200);
      });
    }
  }

  // ── Navigation ───────────────────────────────────────

  backToList() { this.router.navigate(['/blog']); }

  // ── Helpers ──────────────────────────────────────────

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  trackBlock(_index: number, block: ContentBlock): string {
    return block.type + _index;
  }

  private initReveal() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.05 }
    );
    document.querySelectorAll('.blog-detail-page .reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  }
}
