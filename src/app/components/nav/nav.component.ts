import { Component, OnInit, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, Location, isPlatformBrowser }              from '@angular/common';
import { Router, NavigationEnd }                                   from '@angular/router';
import { filter }                                                  from 'rxjs/operators';
import { SeoService }                                              from '../../services/seo.service';
import { ThemeService }                                            from '../../services/theme.service';

interface NavLink {
  href:       string;  // real URL path for crawlers (e.g. "/about")
  label:      string;
  id:         string;  // section element ID (e.g. "about", "companies")
  route:      string;  // Angular route path (e.g. "about", "experience")
  isFullRoute?: boolean; // true = real page navigation, not scroll
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  activeSection = 'hero';
  menuOpen      = false;

  // rAF throttle flag
  private ticking = false;

  links: NavLink[] = [
    { href: '/',             route: '',             label: 'Home',         id: 'hero'         },
    { href: '/about',        route: 'about',        label: 'About',        id: 'about'        },
    { href: '/experience',   route: 'experience',   label: 'Experience',   id: 'companies'    },
    { href: '/projects',     route: 'projects',     label: 'Projects',     id: 'projects'     },
    { href: '/services',     route: 'services',     label: 'Services',     id: 'services'     },
    { href: '/testimonials', route: 'testimonials', label: 'Testimonials', id: 'testimonials' },
    { href: '/contact',      route: 'contact',      label: 'Contact',      id: 'contact'      },
    { href: '/blog',         route: 'blog',         label: 'Blog',         id: 'blog', isFullRoute: true }
  ];

  constructor(
    private router:       Router,
    private location:     Location,
    private seoService:   SeoService,
    public  themeService: ThemeService   // public so template can read isDark/isLight
  ) {}

  ngOnInit() {
    if (!this.isBrowser) return;

    // On a blog route, mark Blog as active; otherwise run section detection
    if (window.location.pathname.startsWith('/blog')) {
      this.activeSection = 'blog';
    } else {
      setTimeout(() => this.updateActiveSection(), 100);
      setTimeout(() => this.updateActiveSection(), 600);
    }

    // Keep active state in sync on every client-side navigation
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      if (e.urlAfterRedirects.startsWith('/blog')) {
        this.activeSection = 'blog';
      }
    });
  }

  // ── Scroll listener — rAF throttled, no-op on server or blog pages ────────
  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser) return;
    if (window.location.pathname.startsWith('/blog')) return;
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.updateActiveSection();
      this.ticking = false;
    });
  }

  /**
   * Finds the last section whose top edge is at or above 120px from viewport top.
   * Deterministic: exactly one section is active at a time.
   */
  private updateActiveSection() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const triggerY = 120;
    let activeId   = sections[0].id;

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= triggerY) {
        activeId = section.id;
      }
    }

    if (activeId === this.activeSection) return;
    this.activeSection = activeId;

    // Update URL (replaceState keeps history clean during scroll)
    this.location.replaceState(this.seoService.pathForSection(activeId));

    // Update all meta tags via SeoService
    this.seoService.syncMetaBySection(activeId);
  }

  // ── Nav click ─────────────────────────────────────────────────────────────
  handleNavClick(event: MouseEvent, link: NavLink) {
    event.preventDefault();
    this.closeMenu();

    // Blog link: real page navigation, no scroll
    if (link.isFullRoute) {
      this.router.navigate(['/' + link.route]);
      return;
    }

    // Coming from a blog page back to a section: navigate home first,
    // then scroll after Angular re-renders the portfolio sections (≈300 ms).
    if (this.isBrowser && window.location.pathname.startsWith('/blog')) {
      this.router.navigate(['/' + link.route]);
      setTimeout(() => {
        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    // Normal scroll navigation (already on portfolio page)
    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
    this.router.navigate(['/' + link.route]);
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }

  onThemeToggle(event: MouseEvent) {
    this.themeService.toggle(event.clientX, event.clientY);
  }
}
