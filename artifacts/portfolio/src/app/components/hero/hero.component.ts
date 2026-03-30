import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  typedText = '';
  private roles = ['Full-Stack Developer', '.NET Core Expert', 'Angular Developer', 'Cloud & AWS Builder', 'API Architect'];
  private ri = 0;
  private ci = 0;
  private deleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.type(), 800);
  }

  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
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
