import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  highlights: string[];
  color: string;
  category: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  active = 'All';
  filters = ['All', 'Angular', '.NET', 'Full-Stack', 'Cloud'];

  all: Project[] = [
    {
      title: 'SaaS Billing Platform',
      desc: 'Multi-tenant subscription management system with Stripe integration, usage metering, invoicing, and a Power BI analytics dashboard.',
      tags: ['Angular', '.NET Core', 'Stripe', 'SQL Server', 'Power BI'],
      highlights: ['Stripe webhooks & dunning', 'Multi-currency invoicing', 'Power BI embedded reports'],
      color: '#7c3aed',
      category: 'Full-Stack'
    },
    {
      title: 'Enterprise CRM Portal',
      desc: 'DotNetNuke-based CRM customised with Angular micro-frontends, Hangfire batch jobs, Redis caching, and role-based access control.',
      tags: ['Angular', 'DNN', 'Hangfire', 'Redis', '.NET Core'],
      highlights: ['40% faster SQL queries', 'Redis session cache', 'RBAC with JWT'],
      color: '#06b6d4',
      category: '.NET'
    },
    {
      title: 'Real-Estate Listings App',
      desc: 'Property search and management platform with geospatial search, photo galleries, Cloudflare CDN, AWS S3 media storage, and MLS feed integration.',
      tags: ['Angular', 'AWS S3', 'AWS EC2', 'Cloudflare', '.NET Core'],
      highlights: ['Geospatial SQL queries', 'Cloudflare edge caching', 'MLS API sync'],
      color: '#f472b6',
      category: 'Cloud'
    },
    {
      title: 'Inventory & POS System',
      desc: 'Point-of-sale system with real-time inventory tracking, barcode scanning, PDF receipt generation, and offline-first PWA mode.',
      tags: ['Angular', '.NET Core', 'SQL Server', 'PWA'],
      highlights: ['Offline PWA mode', 'PDF receipts via PDF.js', 'Barcode scanning'],
      color: '#7c3aed',
      category: 'Full-Stack'
    },
    {
      title: 'E-Learning Platform',
      desc: 'Video-based learning management system with progress tracking, quiz engine, certificate generation, and Firebase push notifications.',
      tags: ['Angular', 'Firebase', '.NET Core', 'SQL Server'],
      highlights: ['Video progress tracking', 'Firebase push alerts', 'Certificate PDF gen'],
      color: '#06b6d4',
      category: 'Angular'
    },
    {
      title: 'HR & Payroll Suite',
      desc: 'End-to-end HR system handling employee onboarding, leave management, payroll calculation, and compliance reporting via automated Hangfire jobs.',
      tags: ['.NET Core', 'Angular', 'Hangfire', 'SQL Server'],
      highlights: ['Automated payroll runs', 'Leave approval workflow', 'Compliance PDF export'],
      color: '#f472b6',
      category: '.NET'
    }
  ];

  get filtered(): Project[] {
    return this.active === 'All' ? this.all : this.all.filter(p => p.category === this.active || p.tags.includes(this.active));
  }

  setFilter(f: string) { this.active = f; }
}
