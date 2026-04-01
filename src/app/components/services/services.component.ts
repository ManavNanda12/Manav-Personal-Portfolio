import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    {
      num: '01',
      icon: '🔷',
      title: 'Full-Stack Web Apps',
      desc: 'End-to-end development with Angular frontend and .NET Core / Web API backend. Clean architecture, RESTful APIs, and responsive UIs that scale.'
    },
    {
      num: '02',
      icon: '🛒',
      title: 'E-Commerce Platforms',
      desc: 'B2B and B2C commerce systems with Stripe payment integration, subscription billing, product catalogues, admin dashboards, and automated email workflows.'
    },
    {
      num: '03',
      icon: '⚡',
      title: 'Performance Optimisation',
      desc: 'SQL indexing and query tuning (proven 40% gains), Redis caching for API performance, and AWS infrastructure right-sizing.'
    },
    {
      num: '04',
      icon: '☁️',
      title: 'AWS Cloud Deployment',
      desc: 'Deploying and managing applications on AWS — EC2 compute, S3 storage, RDS managed databases, Cloudflare CDN integration, and production monitoring.'
    },
    {
      num: '05',
      icon: '🔌',
      title: 'AI & Platform Integrations',
      desc: 'Stripe, Firebase (Auth & Push), Google OAuth, Cloudflare, Azure Workflows, Claude and chatbot integrations, Power BI embedding, payment gateway integration, and ERP API connectivity.'
    },
    {
      num: '06',
      icon: '🗄️',
      title: 'Database Design & Tuning',
      desc: 'Relational schema design, stored procedures, query optimisation, indexing strategies, and data migration — across SQL Server and MySQL.'
    }
  ];
}
