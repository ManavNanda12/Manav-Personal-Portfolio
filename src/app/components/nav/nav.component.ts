import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink { href: string; label: string; id: string; }

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  activeSection = 'hero';
  menuOpen = false;
  private observer!: IntersectionObserver;

  links: NavLink[] = [
    { href: '#hero',      label: 'Home',       id: 'hero'      },
    { href: '#about',     label: 'About',      id: 'about'     },
    { href: '#companies', label: 'Experience', id: 'companies' },
    { href: '#projects',  label: 'Projects',   id: 'projects'  },
    { href: '#services',      label: 'Services',      id: 'services'      },
    { href: '#testimonials',  label: 'Testimonials',  id: 'testimonials'  },
    { href: '#contact',       label: 'Contact',       id: 'contact'       }
  ];

  ngOnInit() {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) this.activeSection = e.target.id;
      }),
      { threshold: 0.35 }
    );
    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach(s => this.observer.observe(s));
    }, 300);
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  closeMenu() { this.menuOpen = false; }

  ngOnDestroy() { this.observer?.disconnect(); }
}