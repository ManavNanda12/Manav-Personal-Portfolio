import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form: FormData = { name: '', email: '', subject: '', message: '' };
  submitted = false;
  showToast = false;

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.showToast = true;
    this.submitted = true;
    this.form = { name: '', email: '', subject: '', message: '' };
    setTimeout(() => {
      this.showToast = false;
      this.submitted = false;
    }, 4000);
  }

 contacts = [
  { iconClass: 'fa-solid fa-phone',        label: 'Phone',                      value: '+91 878 016 0945',        href: 'tel:+918780160945' },
  { iconClass: 'fa-solid fa-envelope',     label: 'Email',                      value: 'manavnanda2404@gmail.com',   href: 'mailto:manavnanda2404@gmail.com' },
  { iconClass: 'fa-solid fa-location-dot', label: 'Location — Open to Remote',  value: 'Ahmedabad, Gujarat, India', href: '' },
  { iconClass: 'fa-brands fa-linkedin-in', label: 'Connect professionally',     value: 'LinkedIn Profile',        href: 'https://linkedin.com/in/manav-nanda' }
];
}
