import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactUsform!: FormGroup;
  submitted = false;

  // ✅ Make.com webhook URL
  private readonly MAKE_WEBHOOK = 'https://hook.eu1.make.com/rf2qrx84w373k4l2nd8nvrvkxlyveuse';

  contacts = [
    { iconClass: 'fa-solid fa-phone',       label: 'Phone',                     value: '+91 878 016 0945',          href: 'tel:+918780160945' },
    { iconClass: 'fa-solid fa-envelope',     label: 'Email',                     value: 'manavnanda2404@gmail.com',  href: 'mailto:manavnanda2404@gmail.com' },
    { iconClass: 'fa-solid fa-location-dot', label: 'Location — Open to Remote', value: 'Ahmedabad, Gujarat, India', href: '' },
    { iconClass: 'fa-brands fa-linkedin-in', label: 'Connect professionally',     value: 'LinkedIn Profile',          href: 'https://linkedin.com/in/manav-nanda' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.contactUsform = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.contactUsform.invalid) {
      this.contactUsform.markAllAsTouched();
      this.toastr.error('Please fill out all fields correctly.', 'Form Error');
      return;
    }

    this.submitted = true;

    const { name, email, subject, message } = this.contactUsform.value;

    try {
      const response = await fetch(this.MAKE_WEBHOOK, {
        method: 'POST',
        // ✅ Make.com supports application/json — use it directly
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      // Make returns "Accepted" (200) when it receives the webhook
      if (response.ok) {
        this.toastr.success('Message sent! Manav will get back to you soon.', 'Sent ✓');
        this.contactUsform.reset();
      } else {
        throw new Error(`Make webhook responded with ${response.status}`);
      }

    } catch (error) {
      console.error('Make webhook error:', error);
      this.toastr.error('Something went wrong. Please email directly.', 'Error');

    } finally {
      this.submitted = false;
    }
  }
}