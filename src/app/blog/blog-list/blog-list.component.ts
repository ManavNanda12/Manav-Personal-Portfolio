import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router }         from '@angular/router';
import { Title, Meta }    from '@angular/platform-browser';
import { BlogPost }       from '../blog.model';
import { BlogService }    from '../blog.service';
import { SKELETON_POSTS } from '../blogs.data';
import { ThemeService }   from '../../services/theme.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  posts: BlogPost[]    = [];
  skeletons = SKELETON_POSTS;

  constructor(
    private blogService:  BlogService,
    private router:       Router,
    public  themeService: ThemeService,
    private title:        Title,
    private meta:         Meta
  ) {}

  featuredCoverBg(post: BlogPost): string {
    return this.themeService.isLight
      ? 'linear-gradient(135deg, #ece8ff 0%, #f2eeff 55%, #eaeeff 100%)'
      : post.coverGradient;
  }

  ngOnInit() {
    this.posts = this.blogService.getAll();
    this.title.setTitle('Blog | Manav Nanda');
    this.meta.updateTag({
      name: 'description',
      content: 'Deep dives into the systems I build — Angular, .NET Core, Cloudflare Workers, AI integrations, and more.'
    });

    if (this.isBrowser) {
      // Scroll to top on page load
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      // Trigger reveal observer after render
      setTimeout(() => this.initReveal(), 60);
    }
  }

  navigate(post: BlogPost) {
    this.router.navigate(['/blog', post.slug]);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
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
    document.querySelectorAll('.blog-list-page .reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  }
}
