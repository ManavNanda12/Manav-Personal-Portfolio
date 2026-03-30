import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Job {
  period: string;
  role: string;
  company: string;
  type: string;
  bullets: string[];
  tech: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  jobs: Job[] = [
    {
      period: 'Jan 2024 – Present',
      role: 'Full-Stack Developer',
      company: 'Webiots Technology Pvt. Ltd.',
      type: 'Full-time',
      bullets: [
        'Built and maintained 6 production applications, cutting post-launch defects by 40%.',
        'Optimised complex SQL queries — slashed average response time by 40%.',
        'Implemented Redis caching layer reducing API response time by 32%.',
        'Developed RESTful .NET Core APIs consumed by Angular SPAs and mobile clients.',
        'Deployed full-stack apps on AWS EC2 with S3 storage and RDS databases.',
        'Integrated Stripe payment processing into SaaS billing workflows.'
      ],
      tech: ['Angular', '.NET Core', 'SQL Server', 'Redis', 'AWS', 'Stripe', 'Hangfire']
    },
    {
      period: 'Jul 2023 – Dec 2023',
      role: 'Software Developer Intern',
      company: 'Webiots Technology Pvt. Ltd.',
      type: 'Internship',
      bullets: [
        'Developed reusable Angular component library used across 3 products.',
        'Built CRUD Web APIs with .NET Core and Entity Framework Core.',
        'Worked closely with senior devs on DotNetNuke (DNN) CMS customisations.',
        'Automated batch jobs using Hangfire background scheduler.'
      ],
      tech: ['Angular', '.NET Core', 'DNN', 'Entity Framework', 'Hangfire', 'SQL Server']
    }
  ];
}
