import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  certs = [
    { icon: '☁️', name: 'AWS Certified', org: 'Amazon Web Services', color: '#f59e0b' },
    { icon: '🛒', name: 'Flipkart GRID 4.0', org: 'Flipkart', color: '#06b6d4' },
    { icon: '🗄️', name: 'Oracle Database Programming', org: 'Oracle', color: '#f97316' },
    { icon: '🐍', name: 'Python for Data Science', org: 'Coursera / IBM', color: '#3b82f6' },
    { icon: '🌐', name: 'CCNA — Data Communication Networks', org: 'Coursera', color: '#06b6d4' },
  ];

  edu = [
    {
      degree: 'B.Tech — Information Technology',
      college: 'Marwadi University',
      location: 'Rajkot, Gujarat',
      year: '2020 – 2023',
      cgpa: '9.05',
      icon: '🎓'
    },
    {
      degree: 'Diploma — Information Technology',
      college: 'Government Polytechnic Ahmedabad',
      location: 'Ahmedabad, Gujarat',
      year: '2017 – 2020',
      cgpa: '7.5',
      icon: '📜'
    },
    {
      degree: 'Secondary Schooling (SSC)',
      college: 'Kendriya Vidyalaya Jamnagar',
      location: 'Jamnagar, Gujarat',
      year: '2017',
      cgpa: '7.4',
      icon: '🏫'
    }
  ];
}