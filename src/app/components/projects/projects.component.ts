import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  highlights: string[];
  color: string;
  category: string;
  badge: string;
  badgeClass: string;
  featured?: boolean;
  isPrivate?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  emoji: string;
  bgGradient: string;
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
  filters = ['All', 'Personal', 'Company', 'Internship'];

 all: Project[] = [
    {
      title: 'Gecko Customer Portal',
      desc: 'A full-featured B2C e-Commerce platform with subscription tiers, Stripe payment, Google OAuth, Firebase push notifications, and an Azure-powered personalized chatbot that resolves customer queries with live database API data and Grok AI fallbacks.',
      tags: ['Angular', '.NET Core', 'Web API', 'Stripe', 'Firebase', 'Hangfire', 'Cloudflare', 'Google Auth', 'Azure', 'Grok', 'AI'],
      highlights: [
        'Azure-powered personalized chatbot using custom functions and Grok model integration',
        'Chatbot calls database APIs for real customer data and falls back to AI-generated responses when needed',
        'Stripe Checkout + Subscription billing (Pro plan with 20% product discount logic)',
        'Google Login / Signup via Firebase Authentication',
        'Firebase Push Notifications for order updates and promotions',
        'Hangfire background jobs — welcome emails, contact us notifications, admin alerts, coupon processing',
        'Hosted on Cloudflare with custom domain, CDN, and DDoS protection'
      ],
      color: '#7c3aed',
      category: 'Personal',
      badge: 'Personal',
      badgeClass: 'badge-personal',
      featured: true,
      liveUrl: 'https://geckocustomerportal.onrender.com/home',
      githubUrl: 'https://github.com/ManavNanda12/GeckoCustomerPortal',
      emoji: '🦎',
      bgGradient: 'linear-gradient(135deg,#0d1f1a 0%, #091420 50%, #160d1f 100%)'
    },
    {
      title: 'Gecko Admin Portal',
      desc: 'Companion admin dashboard for the Gecko platform — full product, order, and customer management with revenue analytics graphs, coupon engine, and automated contact-us request handling.',
      tags: ['Angular', '.NET Core', 'Hangfire', 'SQL Server'],
      highlights: [
        'Revenue and order analytics with interactive charts',
        'Coupon creation, management, and usage tracking',
        'Automated admin notifications via Hangfire jobs',
        'Contact-us request inbox with reply workflows'
      ],
      color: '#f472b6',
      category: 'Personal',
      badge: 'Personal',
      badgeClass: 'badge-personal',
      liveUrl: 'https://geckoadminportal.pages.dev/login',
      githubUrl: 'https://github.com/ManavNanda12/GeckoAdminPortal/tree/master',
      emoji: '📊',
      bgGradient: 'linear-gradient(135deg,#1a0d0d,#0d1220)'
    },
    {
      title: 'Gecko API',
      desc: 'Shared .NET Web API backend for both Gecko customer and admin portals, with JWT middleware, exception email handling, Azure Functions AI workflow integration, Stripe operations, and automated Hangfire reporting.',
      tags: ['.NET Core', 'Web API', 'Azure Functions', 'Hangfire', 'Stripe', 'JWT', 'SQL Server', 'AI'],
      highlights: [
        'Central API layer for customer and admin portal traffic with JWT auth middleware',
        'Hangfire jobs for welcome emails and monthly admin sales reports comparing performance month-over-month',
        'Stripe integration and Azure Functions for AI workflow orchestration',
        'Exception email handling for critical backend failures',
        'Built to support real-time portal data, admin analytics, and secure customer operations'
      ],
      color: '#0ea5e9',
      category: 'Personal',
      badge: 'Personal',
      badgeClass: 'badge-personal',
      githubUrl: 'https://github.com/ManavNanda12/GeckoAPI',
      emoji: '🧩',
      bgGradient: 'linear-gradient(135deg,#081f3d,#0b1730)'
    },
    {
      title: 'MN.DEV — Developer Portfolio',
      desc: 'This portfolio itself — a fully custom Angular SPA built from scratch with a dark futuristic design, AI-powered chatbot (MN.AI), EmailJS contact integration with custom dark-themed email templates, and a Cloudflare Worker backend connecting to Grok AI.',
      tags: ['Angular', 'TypeScript', 'Cloudflare Workers', 'Grok AI', 'EmailJS', 'SCSS'],
      highlights: [
        'MN.AI chatbot powered by a Cloudflare Worker proxying Grok (LLaMA 3.3 70B) with a full system prompt covering all skills, projects, and experience',
        'Conversation history maintained across turns so the AI remembers context within a session',
        'EmailJS contact form with two custom dark-themed HTML email templates — notification to Manav and auto-reply to the sender',
        'Dark futuristic design with custom cursor, scroll progress, marquee, and scroll-triggered reveal animations',
        'Standalone Angular 17+ components with NgRx-free reactive patterns and IntersectionObserver-based animations',
        'Fully responsive across mobile, tablet, and desktop'
      ],
      color: '#7c3aed',
      category: 'Personal',
      badge: 'Personal',
      badgeClass: 'badge-personal',
      emoji: '🚀',
      bgGradient: 'linear-gradient(135deg,#120820,#0a0a1f 50%,#081520 100%)'
    },
    {
      title: 'B2B e-Commerce Platform',
      desc: 'A large-scale regulated B2B e-Commerce platform serving licensed business buyers. Built on DotNetNuke CMS with 20+ independently deployable Angular + .NET modules, integrated with a Microsoft Dynamics ERP backend.',
      tags: ['DotNetNuke', 'Angular', 'NgRx', '.NET Web API', 'C#', 'Global Payments'],
      highlights: [
        '20+ DNN DesktopModules (Angular SPAs + .NET Web API backends)',
        'Complex checkout: on-account AR purchasing, curbside pickup timeslots, gift card + credit card payments',
        'Product allocations engine enforcing per-licensee quantity limits',
        'Cloudflare Turnstile CAPTCHA, Power BI embedded reporting'
      ],
      color: '#06b6d4',
      category: 'Company',
      badge: 'Company',
      badgeClass: 'badge-company',
      isPrivate: true,
      emoji: '🏪',
      bgGradient: 'linear-gradient(135deg,#0a1520,#141028)'
    },
    {
      title: 'Enterprise Web Applications (×9)',
      desc: 'Built 9+ enterprise web applications at Shaligram Infotech using Angular, .NET Core Web API, AI/chatbot workflows, Stripe integration, and Angular Ionic portals. Projects included fitness management, pregnancy task tracking, kiosk/admin portals, and API handler systems.',
      tags: ['Angular', '.NET Core', 'Web API', 'AI', 'Chatbot', 'Stripe', 'Ionic', 'SQL Server', 'Redis', 'AWS'],
      highlights: [
        'Delivered customer/admin/API portals for fitness management, pregnancy task tracking, kiosk machine administration, and analytics dashboards',
        'Integrated chatbot flows, Stripe payment systems, and AI-enabled workflows',
        'Hosted applications across Netlify, Render, and Cloudflare for global availability'
      ],
      color: '#06b6d4',
      category: 'Company',
      badge: 'Company',
      badgeClass: 'badge-company',
      isPrivate: true,
      emoji: '⚡',
      bgGradient: 'linear-gradient(135deg,#101a10,#0d1a20)'
    },
    {
      title: 'Banking System — Sparks Foundation',
      desc: 'A fully functional banking web app built during a 1-month internship. Implemented 7+ core banking features including secure user auth, fund transfers, and transaction history.',
      tags: ['HTML/CSS/JS', 'MySQL', 'XAMPP', 'Bootstrap'],
      highlights: [
        '7+ core banking features — transfers, deposits, withdrawals, history',
        '30% faster MySQL queries via indexing and stored procedures',
        '14+ Postman test cases; Bootstrap UI for 100+ users'
      ],
      color: '#f472b6',
      category: 'Internship',
      badge: 'Internship',
      badgeClass: 'badge-internship',
      emoji: '🏦',
      bgGradient: 'linear-gradient(135deg,#1a1200,#0d1820)'
    }
  ];

  // KEY FIX: direct string match, no case conversion needed
  get filtered(): Project[] {
    if (this.active === 'All') return this.all;
    return this.all.filter(p => p.category === this.active);
  }

  setFilter(f: string) {
    this.active = f;
  }

  trackByTitle(_index: number, p: Project): string {
    return p.title;
  }
}