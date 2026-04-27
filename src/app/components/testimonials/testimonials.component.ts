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
      name: 'Karandeep Sinh Jadeja',
      role: 'Risk Consulting Analyst',
      company: 'EY',
      avatar: 'RP',
      linkedin: 'https://linkedin.com/in/manav-nanda',
      relation: 'College teammate for final year project',
      text: `Worked with Manav and can confidently say his development skills are top-notch. From frontend to backend, plus his AI-driven thinking - he brings real innovation to the table.`
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
