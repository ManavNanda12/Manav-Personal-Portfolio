import { Injectable, Inject } from '@angular/core';
import { DOCUMENT }           from '@angular/common';
import { Title, Meta }        from '@angular/platform-browser';

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

// URL path → section element ID
const PATH_TO_SECTION: Record<string, string> = {
  '':             'hero',
  'about':        'about',
  'experience':   'companies',
  'projects':     'projects',
  'services':     'services',
  'testimonials': 'testimonials',
  'contact':      'contact'
};

const SECTION_META: Record<string, SectionMeta> = {
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
    path:        '/projects',
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

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService:  Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  /** Set meta tags by section element ID (used by NavComponent on scroll) */
  syncMetaBySection(sectionId: string): void {
    const m = SECTION_META[sectionId];
    if (m) this.applyMeta(m);
  }

  /** Set meta tags by URL path (used by AppComponent on init — runs on server for prerender) */
  syncMetaByPath(urlPath: string): void {
    const clean     = urlPath.replace(/^\//, '').split('?')[0].split('#')[0];
    const sectionId = PATH_TO_SECTION[clean] ?? 'hero';
    this.syncMetaBySection(sectionId);
  }

  /** Returns the URL path for a given section ID (used by NavComponent for replaceState) */
  pathForSection(sectionId: string): string {
    return SECTION_META[sectionId]?.path ?? '/';
  }

  private applyMeta(m: SectionMeta): void {
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
