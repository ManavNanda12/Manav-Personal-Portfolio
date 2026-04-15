import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser }                    from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  typedText = '';
  yearsExp  = '';

  private roles = ['Full-Stack Developer', '.NET Core Expert', 'Angular Developer', 'Cloud & AWS Builder', 'API Architect'];
  private ri = 0;
  private ci = 0;
  private deleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    this.yearsExp = this.calcExperience();
    // Guard: recursive setTimeout loop prevents Angular from ever stabilising on the server
    if (this.isBrowser) {
      this.timeoutId = setTimeout(() => this.type(), 800);
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  private calcExperience(): string {
    // Started Jan 2023 at Shaligram Infotech
    const start = new Date(2023, 0, 1);
    const now = new Date();
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (months === 0) return `${years}`;
    return `${years}.${months < 3 ? '1' : months < 6 ? '3' : months < 9 ? '5' : '8'}`;
  }

  private type() {
    const word = this.roles[this.ri];
    if (!this.deleting) {
      this.ci++;
      this.typedText = word.slice(0, this.ci);
      if (this.ci === word.length) {
        this.deleting = true;
        this.timeoutId = setTimeout(() => this.type(), 1800);
        return;
      }
    } else {
      this.ci--;
      this.typedText = word.slice(0, this.ci);
      if (this.ci === 0) {
        this.deleting = false;
        this.ri = (this.ri + 1) % this.roles.length;
        this.timeoutId = setTimeout(() => this.type(), 400);
        return;
      }
    }
    this.timeoutId = setTimeout(() => this.type(), this.deleting ? 55 : 90);
  }
}
