import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css']
})
export class MarqueeComponent {
  items = [
    'Angular', '.NET Core', 'Web API', 'SQL Server', 'React.js', 'DotNetNuke',
    'AWS (EC2/S3/RDS)', 'Python', 'Redis', 'Stripe API', 'Firebase', 'NgRx',
    'Hangfire', 'Cloudflare'
  ];
  get doubled() { return [...this.items, ...this.items]; }
}
