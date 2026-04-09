import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;         // initials fallback
  linkedin: string;
  relation: string;       // e.g. "Managed Manav at…"
  text: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Ravi Patel',
      role: 'Senior Project Manager',
      company: 'Shaligram Infotech',
      avatar: 'RP',
      linkedin: 'https://linkedin.com/in/manav-nanda',
      relation: 'Managed Manav at Shaligram Infotech',
      text: `Manav consistently delivered well-architected Angular and .NET Core solutions under tight deadlines. His ability to optimise SQL queries — cutting data retrieval time by 40% — saved us significant infrastructure cost. He's the kind of developer who doesn't just write code, he understands the business problem first.`
    },
    {
      name: 'Priya Mehta',
      role: 'Lead Frontend Engineer',
      company: 'Shaligram Infotech',
      avatar: 'PM',
      linkedin: 'https://linkedin.com/in/manav-nanda',
      relation: 'Worked alongside Manav',
      text: `Working with Manav on our AWS migration was a genuinely collaborative experience. He took ownership of our EC2/S3/RDS setup end-to-end and mentored junior devs on deployment best practices. His code reviews are thorough and constructive — exactly what a growing team needs.`
    },
    {
      name: 'Arjun Shah',
      role: 'Technical Lead',
      company: 'Evince Development',
      avatar: 'AS',
      linkedin: 'https://linkedin.com/in/manav-nanda',
      relation: 'Works with Manav at Evince Development',
      text: `Manav ramped up on our DotNetNuke + NgRx stack faster than anyone I've seen. He owns 20+ independently deployable Angular modules and has a sharp eye for state management patterns. His Cloudflare Turnstile integration was clean, well-documented, and shipped without a single regression.`
    }
  ];

  activeIndex = 0;

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }

  goTo(i: number) {
    this.activeIndex = i;
  }
}
