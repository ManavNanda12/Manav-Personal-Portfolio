import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import emailjs from 'emailjs-com';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactUsform!: FormGroup;
  submitted = false;
  showToast = false;
  contacts = [
    { iconClass: 'fa-solid fa-phone', label: 'Phone', value: '+91 878 016 0945', href: 'tel:+918780160945' },
    { iconClass: 'fa-solid fa-envelope', label: 'Email', value: 'manavnanda2404@gmail.com', href: 'mailto:manavnanda2404@gmail.com' },
    { iconClass: 'fa-solid fa-location-dot', label: 'Location — Open to Remote', value: 'Ahmedabad, Gujarat, India', href: '' },
    { iconClass: 'fa-brands fa-linkedin-in', label: 'Connect professionally', value: 'LinkedIn Profile', href: 'https://linkedin.com/in/manav-nanda' }
  ];

  constructor(private readonly formBuilder: FormBuilder, private readonly toastr: ToastrService) {
    emailjs.init(environment.emailjs.publicKey);
    this.contactUsform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
  if (!this.contactUsform.valid){
    this.toastr.error('Please fill out all fields correctly before submitting.', 'Form Error');
    return;
  };

  this.showToast = true;
  this.submitted = true;

  const formValue = this.contactUsform.value;

  const templateParams = {
    from_name: formValue.name,
    from_email: formValue.email,
    subject: formValue.subject,
    message: formValue.message
  };

  // 1️⃣ Send email to YOU
  emailjs.send(
    environment.emailjs.serviceId,
    environment.emailjs.contactUstemplateId,
    templateParams,
    environment.emailjs.publicKey
  )
  .then(() => {

    // 2️⃣ Send auto-reply to USER
    return emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.replyBackTemplateId,
      templateParams,
      environment.emailjs.publicKey
    );

  })
  .then(() => {
    this.showToast = false;
    this.submitted = false;
    this.contactUsform.reset();
  })
  .catch((error) => {
    console.error(error);
    this.showToast = false;
    this.submitted = false;
  });
}
}
