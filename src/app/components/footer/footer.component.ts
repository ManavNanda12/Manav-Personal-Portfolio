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
    { label: 'LinkedIn', iconClass: 'fa-brands fa-linkedin-in', href: 'https://linkedin.com/in/manav-nanda', title: 'LinkedIn' },
    { label: 'GitHub', iconClass: 'fa-brands fa-github', href: 'https://github.com/ManavNanda12', title: 'GitHub' },
    { label: 'Email', iconClass: 'fa-solid fa-envelope', href: 'mailto:manavnanda2404@gmail.com', title: 'Email' },
    { label: 'Instagram', iconClass: 'fa-brands fa-instagram', href: 'https://instagram.com/manav.nanda', title: 'Instagram' }
  ];
}
