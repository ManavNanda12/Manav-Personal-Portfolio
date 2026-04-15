import { Component, OnInit, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, Location, isPlatformBrowser }              from '@angular/common';
import { Router }                                                  from '@angular/router';
import { SeoService }                                              from '../../services/seo.service';

interface NavLink {
  href:  string;  // real URL path for crawlers (e.g. "/about")
  label: string;
  id:    string;  // section element ID (e.g. "about", "companies")
  route: string;  // Angular route path (e.g. "about", "experience")
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
    { href: '/contact',      route: 'contact',      label: 'Contact',      id: 'contact'      }
  ];

  constructor(
    private router:     Router,
    private location:   Location,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // DOM queries only make sense in the browser
    if (this.isBrowser) {
      setTimeout(() => this.updateActiveSection(), 100);
      setTimeout(() => this.updateActiveSection(), 600);
    }
  }

  // ── Scroll listener — rAF throttled, no-op on server ─────────────────────
  @HostListener('window:scroll')
  onScroll() {
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

  // ── Nav click — scroll + push real history entry ──────────────────────────
  handleNavClick(event: MouseEvent, link: NavLink) {
    event.preventDefault();
    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
    this.router.navigate(['/' + link.route]);
    this.closeMenu();
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }
}
