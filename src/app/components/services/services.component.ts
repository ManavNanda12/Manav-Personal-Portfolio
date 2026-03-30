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
      icon: '🔷',
      title: 'Angular Development',
      desc: 'Scalable SPAs and enterprise portals built with Angular, NgRx state management, RxJS, and lazy-loaded modules for optimal performance.',
      tags: ['Angular', 'NgRx', 'RxJS', 'TypeScript']
    },
    {
      icon: '⚙️',
      title: '.NET Core API Development',
      desc: 'Robust RESTful and GraphQL APIs built with .NET Core — secured with JWT, documented with Swagger, and optimised with Redis caching.',
      tags: ['.NET Core', 'Web API', 'JWT', 'Redis', 'EF Core']
    },
    {
      icon: '🗄️',
      title: 'Database Design & Optimisation',
      desc: 'Schema design, stored procedures, index optimisation, and performance tuning for SQL Server and MySQL databases serving high-traffic workloads.',
      tags: ['SQL Server', 'MySQL', 'Query Tuning', 'Stored Procs']
    },
    {
      icon: '☁️',
      title: 'Cloud Deployment (AWS)',
      desc: 'End-to-end deployment on AWS — EC2 provisioning, S3 media storage, RDS databases, CloudFront CDN, and IAM security configuration.',
      tags: ['AWS EC2', 'S3', 'RDS', 'CloudFront', 'IAM']
    },
    {
      icon: '💳',
      title: 'Payment Integration',
      desc: 'Stripe-powered billing systems with subscription management, webhook handling, dunning flows, and multi-currency invoicing.',
      tags: ['Stripe', 'Webhooks', 'Subscriptions', 'Invoicing']
    },
    {
      icon: '🔌',
      title: 'Third-Party Integrations',
      desc: 'Connect your app to Firebase, Google Auth, Cloudflare, Power BI, and other services — securely and efficiently.',
      tags: ['Firebase', 'Google Auth', 'Cloudflare', 'Power BI']
    }
  ];
}
