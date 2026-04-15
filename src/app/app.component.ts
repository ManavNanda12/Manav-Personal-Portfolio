import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  PLATFORM_ID,
  inject,
  Inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet }                    from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { NavComponent }            from './components/nav/nav.component';
import { HeroComponent }           from './components/hero/hero.component';
import { MarqueeComponent }        from './components/marquee/marquee.component';
import { AboutComponent }          from './components/about/about.component';
import { ExperienceComponent }     from './components/experience/experience.component';
import { ProjectsComponent }       from './components/projects/projects.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ServicesComponent }       from './components/services/services.component';
import { ContactComponent }        from './components/contact/contact.component';
import { FooterComponent }         from './components/footer/footer.component';
import { ChatbotComponent }        from './components/chat-bot/chat-bot.component';
import { TestimonialsComponent }   from './components/testimonials/testimonials.component';
import { HttpClient }              from '@angular/common/http';
import { SeoService }              from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavComponent,
    HeroComponent,
    MarqueeComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    CertificationsComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    ChatbotComponent,
    TestimonialsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('chatPanel', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px) scale(0.95)' }),
        animate('260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('180ms ease-in',
          style({ opacity: 0, transform: 'translateY(12px) scale(0.95)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser  = isPlatformBrowser(this.platformId);

  constructor(
    private http:       HttpClient,
    private seoService: SeoService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  // ── Scroll & back-to-top ──
  scrollProgress = 0;
  showBackToTop  = false;

  // ── Cursor ──
  cursorX       = -100;
  cursorY       = -100;
  ringX         = -100;
  ringY         = -100;
  isCursorHover = false;
  private mx    = -100;
  private my    = -100;
  private rafId = 0;

  // ── Toast / chatbot ──
  showToast  = false;
  isChatOpen = false;

  // Route path → section element ID
  private readonly routeToSection: Record<string, string> = {
    '':             'hero',
    'about':        'about',
    'experience':   'companies',
    'projects':     'projects',
    'services':     'services',
    'testimonials': 'testimonials',
    'contact':      'contact'
  };

  // ─────────────────────────────────────────────────────────────────────────
  ngOnInit() {
    // Runs on BOTH server and browser — gives prerendered pages correct meta.
    // Use doc.location.pathname (not router.url) because router.url is '/' for
    // all routes at ngOnInit time during SSR prerendering.
    this.seoService.syncMetaByPath(this.doc.location.pathname);

    // Browser-only initialisation
    if (this.isBrowser) {
      this.animateCursor();
      this.initReveal();
      this.trackVisitor();
      this.scrollToInitialSection();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) cancelAnimationFrame(this.rafId);
  }

  // ── Scroll progress + back-to-top (HostListeners are no-ops on server) ──
  @HostListener('window:scroll')
  onScroll() {
    const scrolled        = window.scrollY;
    const total           = document.body.scrollHeight - window.innerHeight;
    this.scrollProgress   = total > 0 ? (scrolled / total) * 100 : 0;
    this.showBackToTop    = scrolled > 400;
  }

  // ── Mouse position ──
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mx      = e.clientX;
    this.my      = e.clientY;
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;

    const target = e.target as HTMLElement;
    this.isCursorHover = !!target.closest(
      'a, button, .skill-card, .project-card, .service-card, ' +
      '.company-content, .cert-card, .quick-chip, .chatbot-fab'
    );
  }

  // ── Browser back / forward ──
  @HostListener('window:popstate')
  onPopState() {
    const path      = window.location.pathname.replace(/^\//, '').split('/')[0];
    const sectionId = this.routeToSection[path] ?? 'hero';
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  // ── Smooth cursor ring (rAF loop — browser only) ──
  private animateCursor() {
    const loop = () => {
      this.ringX += (this.mx - this.ringX) * 0.18;
      this.ringY += (this.my - this.ringY) * 0.18;
      this.rafId  = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  // ── IntersectionObserver for .reveal elements ──
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

    const attach = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          observer.observe(el);
        }
      });
    };

    setTimeout(attach, 50);
    setTimeout(attach, 400);
  }

  // ── Scroll to section matching current URL on first load ──
  private scrollToInitialSection() {
    const path      = window.location.pathname.replace(/^\//, '').split('/')[0];
    if (!path) return;
    const sectionId = this.routeToSection[path];
    if (!sectionId) return;
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  // ── Visitor tracking (browser only — needs window/navigator/document) ──
  private trackVisitor(): void {
    const payload = {
      page:     window.location.pathname,
      device:   navigator.userAgent,
      time:     new Date().toLocaleString(),
      referrer: document.referrer || 'Direct'
    };
    this.http.post(
      'https://manav022.app.n8n.cloud/webhook/7d7042b5-e23b-4074-a223-869c1fb33583',
      payload
    ).subscribe();
  }

  // ── Chatbot / toast ──
  toggleChat() { this.isChatOpen = !this.isChatOpen; }

  showSuccessToast() {
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 4000);
  }
}
