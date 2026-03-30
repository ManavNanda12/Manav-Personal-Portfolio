import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date().getFullYear();
  links = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#companies', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' }
  ];
  socials = [
    { label: 'LI', href: 'https://linkedin.com/in/manav-nanda', title: 'LinkedIn' },
    { label: 'GH', href: 'https://github.com', title: 'GitHub' },
    { label: 'EM', href: 'mailto:nandamanav7@gmail.com', title: 'Email' }
  ];
}
