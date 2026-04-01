import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Job {
  period: string;
  role: string;
  company: string;
  type: string;
  isCurrent: boolean;
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
      period: 'Jun 2025 — Present',
      role: 'Full-Stack Developer — Angular / .NET / DotNetNuke',
      company: 'Evince Development',
      type: 'Full-time',
      isCurrent: true,
      bullets: [
        'Developing and maintaining 20+ independently deployable Angular + .NET DNN modules following the ServiceRouteMapper API pattern',
        'Working with NgRx (Redux pattern) for state management across Angular SPAs — actions, reducers, effects, and selectors',
        'Integrating with a proprietary ERP backend via REST proxy layer (RequestHandler pattern), managing complex B2B checkout flows with AR credit enforcement',
        'Implemented Cloudflare Turnstile CAPTCHA across checkout and registration modules',
        'Contributing to Global Payments credit card integration (pre-auth, capture, void) and curbside pickup timeslot scheduling system'
      ],
      tech: ['DotNetNuke', 'Angular', '.NET Web API', 'NgRx', 'C#', 'RxJS', 'SCSS', 'Cloudflare']
    },
    {
      period: 'Jan 2023 — May 2025',
      role: 'Software Developer — Angular / .NET Core / AWS',
      company: 'Shaligram Infotech',
      type: 'Full-time',
      isCurrent: false,
      bullets: [
        'Developed 9+ scalable web applications using Angular, .NET Core Web API, AI/chatbot workflows, and Stripe integrations',
        'Optimised SQL database performance by 40% through strategic indexing and query optimization',
        'Deployed and managed projects on AWS (EC2, S3, RDS), ensuring scalable cloud infrastructure',
        'Integrated RESTful APIs with frontend applications for seamless cross-team user experiences'
      ],
      tech: ['Angular', '.NET Core', 'SQL Server', 'Redis', 'AWS EC2', 'AWS S3', 'AWS RDS', 'Web API']
    },
    {
      period: 'Jun 2022 — Jul 2022',
      role: 'Software Developer Intern',
      company: 'The Sparks Foundation',
      type: 'Internship',
      isCurrent: false,
      bullets: [
        'Built a banking system (XAMPP, MySQL, HTML/CSS/JavaScript) implementing 7+ core features including secure transactions',
        'Optimised MySQL queries, reducing data retrieval time by 30% with efficient indexing and stored procedures',
        'Conducted 14+ Postman test cases, identifying and resolving bugs to ensure system stability',
        'Designed an intuitive Bootstrap UI enhancing usability for 100+ users'
      ],
      tech: ['HTML/CSS/JS', 'MySQL', 'XAMPP', 'Bootstrap', 'Postman']
    }
  ];
}
