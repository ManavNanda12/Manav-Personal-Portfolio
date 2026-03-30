import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  skills = [
    { icon: '🔷', name: 'Frontend', tags: ['Angular', 'React.js', 'NgRx', 'TypeScript', 'RxJS', 'SCSS'] },
    { icon: '⚙️', name: 'Backend', tags: ['.NET Core', 'Web API', 'C#', 'Python', 'OWIN', 'Hangfire'] },
    { icon: '🗄️', name: 'Data & Cloud', tags: ['SQL Server', 'MySQL', 'Redis', 'AWS EC2', 'AWS S3', 'AWS RDS'] },
    { icon: '🔌', name: 'Integrations', tags: ['Stripe', 'Firebase', 'Cloudflare', 'Google Auth', 'Power BI', 'Postman'] }
  ];

  socials = [
    { label: '💼 LinkedIn', href: 'https://linkedin.com/in/manav-nanda', external: true },
    { label: '⚡ GitHub', href: 'https://github.com', external: true },
    { label: '✉️ Email', href: 'mailto:nandamanav7@gmail.com', external: false },
    { label: '📞 +91 878 016 0945', href: 'tel:+918780160945', external: false }
  ];
}
