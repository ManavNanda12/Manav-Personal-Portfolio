import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  skills = [
    { icon: '🔷', name: 'Frontend', tags: ['Angular', 'React.js', 'NgRx', 'TypeScript', 'RxJS', 'SCSS'] },
    { icon: '⚙️', name: 'Backend', tags: ['.NET Core', 'Web API', 'C#', 'NodeJs', 'MongoDB', 'Hangfire'] },
    { icon: '🗄️', name: 'Data & Cloud', tags: ['SQL Server', 'SQL', 'Redis', 'AWS EC2', 'AWS S3', 'Azure Functions', 'PostgreSQL'] },
    { icon: '🔌', name: 'Integrations', tags: ['Stripe', 'Firebase', 'Cloudflare', 'Google Auth', 'Azure Workflows', 'Claude', 'AI Chatbots'] }
  ];

socials = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/manav-nanda',
      external: true,
      iconClass: 'fa-brands fa-linkedin-in',
      colorClass: 'social-linkedin'
    },
    {
      label: 'GitHub',
      href: 'https://github.com',
      external: true,
      iconClass: 'fa-brands fa-github',
      colorClass: 'social-github'
    },
    {
      label: 'Email',
      href: 'mailto:manavnanda2404@gmail.com',
      external: false,
      iconClass: 'fa-solid fa-envelope',
      colorClass: 'social-email'
    },
    {
      label: '+91 878 016 0945',
      href: 'tel:+918780160945',
      external: false,
      iconClass: 'fa-solid fa-phone',
      colorClass: 'social-phone'
    }
  ];

  yearsOfExperience:any = '';

  ngOnInit(): void {
   this.yearsOfExperience = this.calcExperience();
  }

  private calcExperience(): string {
    // Started Jan 2023 at Shaligram Infotech
    const start = new Date(2023, 0, 1);
    const now = new Date();
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (months === 0) return `${years}`;
    return `${years}.${months < 3 ? '1' : months < 6 ? '3' : months < 9 ? '5' : '8'}`;
  }
}
