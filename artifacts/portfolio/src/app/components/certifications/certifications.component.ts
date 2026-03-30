import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  certs = [
    {
      icon: '☁️',
      name: 'AWS Certified Developer – Associate',
      org: 'Amazon Web Services',
      year: '2024',
      desc: 'EC2, S3, RDS, Lambda, CloudFront, IAM, and deployment best practices.',
      color: '#f59e0b'
    },
    {
      icon: '🔷',
      name: 'Angular Advanced Concepts',
      org: 'Udemy / Maximilian Schwarzmüller',
      year: '2023',
      desc: 'NgRx state management, lazy loading, performance optimisation, custom directives.',
      color: '#dd0031'
    },
    {
      icon: '⚙️',
      name: '.NET Core Web API Masterclass',
      org: 'Udemy',
      year: '2023',
      desc: 'REST API design, middleware pipeline, EF Core, JWT authentication, testing.',
      color: '#512bd4'
    },
    {
      icon: '📊',
      name: 'SQL Server Performance Tuning',
      org: 'Pluralsight',
      year: '2023',
      desc: 'Query optimisation, indexing strategies, execution plans, and stored procedure design.',
      color: '#06b6d4'
    }
  ];

  edu = [
    {
      degree: 'B.Tech — Information Technology',
      college: 'Marwadi University',
      location: 'Rajkot, Gujarat',
      year: '2019 – 2023',
      cgpa: '9.05',
      icon: '🎓'
    }
  ];
}
