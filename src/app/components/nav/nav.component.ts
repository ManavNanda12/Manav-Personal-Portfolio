import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { CommonModule, Location, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface NavLink {
  href: string;   // real URL path for SEO (e.g. "/about")
  label: string;
  id: string;     // section element ID (e.g. "about", "companies")
  route: string;  // Angular route path (e.g. "about", "experience")
}

interface SectionMeta {
  path:        string;
  canonical:   string;
  title:       string;
  description: string;
  ogTitle:     string;
  ogDesc:      string;
  twTitle:     string;
  twDesc:      string;
}

const BASE_URL = 'https://manav-personal-portfolio.pages.dev';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  activeSection = 'hero';
  menuOpen = false;

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

  private readonly sectionMeta: Record<string, SectionMeta> = {
    hero: {
      path:        '/',
      canonical:   `${BASE_URL}/`,
      title:       'Manav Nanda | Full-Stack Developer Portfolio (Angular, .NET, SQL)',
      description: 'Manav Nanda — Full-Stack Developer with 3+ years of experience in Angular, .NET Core, Web API, SQL, React.js, and AWS. Based in Ahmedabad, open to remote.',
      ogTitle:     'Manav Nanda — Full-Stack Developer',
      ogDesc:      'Full-Stack Developer with 3+ years of experience in Angular, .NET Core, Web API, SQL, React.js, and AWS. Based in Ahmedabad, open to remote.',
      twTitle:     'Manav Nanda — Full-Stack Developer',
      twDesc:      'Full-Stack Developer with 3+ years of experience in Angular, .NET Core, Web API, SQL, React.js, and AWS.'
    },
    about: {
      path:        '/about',
      canonical:   `${BASE_URL}/about`,
      title:       'About | Manav Nanda',
      description: 'Learn more about Manav Nanda — a Full-Stack Developer from Ahmedabad with 3+ years of experience in Angular, .NET Core, and cloud technologies.',
      ogTitle:     'About Manav Nanda | Full-Stack Developer',
      ogDesc:      'Full-Stack Developer from Ahmedabad with expertise in Angular, .NET Core, SQL Server, and AWS cloud technologies.',
      twTitle:     'About Manav Nanda | Full-Stack Developer',
      twDesc:      'Full-Stack Developer from Ahmedabad with expertise in Angular, .NET Core, SQL Server, and AWS.'
    },
    companies: {
      path:        '/experience',
      canonical:   `${BASE_URL}/experience`,
      title:       'Experience | Manav Nanda',
      description: '3+ years of professional Full-Stack development experience at Evince Development, building enterprise applications with Angular, .NET Core, and SQL Server.',
      ogTitle:     'Work Experience | Manav Nanda',
      ogDesc:      '3+ years at Evince Development building enterprise web apps with Angular, .NET Core, Web API, and SQL Server.',
      twTitle:     'Work Experience | Manav Nanda',
      twDesc:      '3+ years at Evince Development building enterprise web apps with Angular, .NET Core, and SQL Server.'
    },
    projects: {
      path:        '/projects',
      canonical:   `${BASE_URL}/projects`,
      title:       'Projects | Manav Nanda',
      description: 'Explore Manav Nanda\'s portfolio of full-stack web projects built with Angular, .NET Core, React.js, SQL Server, and AWS.',
      ogTitle:     'Projects | Manav Nanda',
      ogDesc:      'A showcase of full-stack projects built with Angular, .NET Core, React.js, SQL Server, and AWS by Manav Nanda.',
      twTitle:     'Projects | Manav Nanda',
      twDesc:      'Full-stack projects built with Angular, .NET Core, React.js, SQL Server, and AWS.'
    },
    certifications: {
      path:        '/projects',   // certifications has no nav link — map to projects URL
      canonical:   `${BASE_URL}/projects`,
      title:       'Projects | Manav Nanda',
      description: 'Explore Manav Nanda\'s portfolio of full-stack web projects built with Angular, .NET Core, React.js, SQL Server, and AWS.',
      ogTitle:     'Projects | Manav Nanda',
      ogDesc:      'A showcase of full-stack projects built with Angular, .NET Core, React.js, SQL Server, and AWS by Manav Nanda.',
      twTitle:     'Projects | Manav Nanda',
      twDesc:      'Full-stack projects built with Angular, .NET Core, React.js, SQL Server, and AWS.'
    },
    services: {
      path:        '/services',
      canonical:   `${BASE_URL}/services`,
      title:       'Services | Manav Nanda',
      description: 'Full-Stack development services by Manav Nanda — Angular, .NET Core, Web API, React.js, SQL, and cloud solutions. Open to freelance and remote work.',
      ogTitle:     'Services | Manav Nanda',
      ogDesc:      'Full-Stack development services including Angular, .NET Core, React.js, and cloud solutions. Open to freelance and remote opportunities.',
      twTitle:     'Services | Manav Nanda',
      twDesc:      'Full-Stack development services — Angular, .NET Core, React.js, cloud. Open to freelance and remote.'
    },
    testimonials: {
      path:        '/testimonials',
      canonical:   `${BASE_URL}/testimonials`,
      title:       'Testimonials | Manav Nanda',
      description: 'Read testimonials from clients and colleagues about working with Manav Nanda, Full-Stack Developer based in Ahmedabad.',
      ogTitle:     'Testimonials | Manav Nanda',
      ogDesc:      'What clients and colleagues say about working with Manav Nanda — Full-Stack Developer.',
      twTitle:     'Testimonials | Manav Nanda',
      twDesc:      'Client and colleague testimonials for Manav Nanda — Full-Stack Developer.'
    },
    contact: {
      path:        '/contact',
      canonical:   `${BASE_URL}/contact`,
      title:       'Contact Manav Nanda | Full-Stack Developer',
      description: 'Get in touch with Manav Nanda for full-stack development opportunities. Based in Ahmedabad, available for freelance and remote work globally.',
      ogTitle:     'Contact Manav Nanda | Full-Stack Developer',
      ogDesc:      'Reach out to Manav Nanda for full-stack development projects. Available for freelance and remote opportunities.',
      twTitle:     'Contact Manav Nanda | Full-Stack Developer',
      twDesc:      'Reach out to Manav Nanda for full-stack development projects. Available for remote work.'
    }
  };

  constructor(
    private router: Router,
    private location: Location,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    // Two passes: catch initial viewport state before and after heavy renders
    setTimeout(() => this.updateActiveSection(), 100);
    setTimeout(() => this.updateActiveSection(), 600);
  }

  // ── Scroll listener — throttled with rAF ──────────────────────────────────
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
   * Finds the last section whose top edge is at or above the trigger line
   * (100px from viewport top — clears the fixed nav).
   * This approach is deterministic: exactly one section is active at a time.
   */
  private updateActiveSection() {
    const sections = Array.from(this.doc.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const triggerY = 120; // px from top — must be scrolled past this line to be "active"
    let activeId = sections[0].id;

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= triggerY) {
        activeId = section.id;
      }
    }

    if (activeId === this.activeSection) return;
    this.activeSection = activeId;
    this.syncMeta(activeId);
  }

  // ── Nav click ─────────────────────────────────────────────────────────────
  handleNavClick(event: MouseEvent, link: NavLink) {
    event.preventDefault();
    const el = this.doc.getElementById(link.id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // Push a real history entry so browser back/forward works
    this.router.navigate(['/' + link.route]);
    this.closeMenu();
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }

  // ── SEO sync ──────────────────────────────────────────────────────────────
  private syncMeta(sectionId: string) {
    const m = this.sectionMeta[sectionId];
    if (!m) return;

    // URL — replaceState so scroll-driven updates don't clutter history
    this.location.replaceState(m.path);

    // <title>
    this.titleService.setTitle(m.title);

    // <meta name="description">
    this.metaService.updateTag({ name: 'description', content: m.description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title',       content: m.ogTitle });
    this.metaService.updateTag({ property: 'og:description', content: m.ogDesc  });
    this.metaService.updateTag({ property: 'og:url',         content: BASE_URL + m.path });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:title',       content: m.twTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: m.twDesc  });

    // <link rel="canonical">
    const canonical = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = m.canonical;
  }
}
