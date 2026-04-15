import { Routes } from '@angular/router';
import { Component } from '@angular/core';

// Invisible placeholder — all real content lives in AppComponent.
// These routes exist purely so Angular Router doesn't 404 on direct URL visits.
@Component({ standalone: true, template: '' })
class SectionPlaceholderComponent {}

export const routes: Routes = [
  {
    path: '',
    component: SectionPlaceholderComponent,
    title: 'Manav Nanda | Full-Stack Developer Portfolio (Angular, .NET, SQL)'
  },
  { path: 'about',        component: SectionPlaceholderComponent, title: 'About | Manav Nanda' },
  { path: 'experience',   component: SectionPlaceholderComponent, title: 'Experience | Manav Nanda' },
  { path: 'projects',     component: SectionPlaceholderComponent, title: 'Projects | Manav Nanda' },
  { path: 'services',     component: SectionPlaceholderComponent, title: 'Services | Manav Nanda' },
  { path: 'testimonials', component: SectionPlaceholderComponent, title: 'Testimonials | Manav Nanda' },
  { path: 'contact',      component: SectionPlaceholderComponent, title: 'Contact | Manav Nanda' },
  { path: '**', redirectTo: '' }
];
