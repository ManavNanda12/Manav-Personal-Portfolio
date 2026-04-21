import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router }          from '@angular/router';
import { Title, Meta }                     from '@angular/platform-browser';
import { BlogPost, ContentBlock }          from '../blog.model';
import { BlogService }                     from '../blog.service';
import { ThemeService }                    from '../../services/theme.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  post: BlogPost | undefined;
  notFound = false;
  isLiked  = false;
  showShareCopied = false;

  constructor(
    private route:        ActivatedRoute,
    private router:       Router,
    private blogService:  BlogService,
    public  themeService: ThemeService,
    private title:        Title,
    private meta:         Meta
  ) {}

  /** Cover gradient adapts: light theme gets a bright aurora bg */
  get heroBackground(): string {
    if (!this.post) return '';
    return this.themeService.isLight
      ? 'linear-gradient(135deg, #ede8ff 0%, #f3eeff 55%, #e8eeff 100%)'
      : this.post.coverGradient;
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.post  = this.blogService.getBySlug(slug);

    if (!this.post) {
      this.notFound = true;
      return;
    }

    this.title.setTitle(`${this.post.title} | Manav Nanda`);
    this.meta.updateTag({ name: 'description', content: this.post.excerpt });

    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      this.isLiked = localStorage.getItem(`liked_${slug}`) === 'true';
      setTimeout(() => this.initReveal(), 60);
    }
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
    if (!this.isBrowser || !this.post) return;
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      localStorage.setItem(`liked_${this.post.slug}`, 'true');
    } else {
      localStorage.removeItem(`liked_${this.post.slug}`);
    }
  }

  // ── Share ─────────────────────────────────────────────
  sharePost() {
    if (!this.isBrowser || !this.post) return;
    if (navigator.share) {
      navigator.share({
        title: this.post.title,
        text:  this.post.excerpt,
        url:   window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showShareCopied = true;
        setTimeout(() => { this.showShareCopied = false; }, 2200);
      });
    }
  }

  // ── Navigation ───────────────────────────────────────
  backToList() {
    this.router.navigate(['/blog']);
  }

  // ── Helpers ──────────────────────────────────────────
  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  trackBlock(_index: number, block: ContentBlock): string {
    return block.type + (_index);
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
