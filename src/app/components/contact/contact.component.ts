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
    { icon: '✉️', label: 'Email', value: 'nandamanav7@gmail.com', href: 'mailto:nandamanav7@gmail.com' },
    { icon: '📞', label: 'Phone', value: '+91 878 016 0945', href: 'tel:+918780160945' },
    { icon: '📍', label: 'Location', value: 'Ahmedabad, India', href: '' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/manav-nanda', href: 'https://linkedin.com/in/manav-nanda' }
  ];
}
