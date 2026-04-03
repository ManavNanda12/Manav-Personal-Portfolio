import {
  Component,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { CommonModule }    from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  trigger, style, animate, transition
} from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';
import { SupademoService } from '../../service/supa-demo.service';

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-modal.component.html',
  styleUrls:  ['./demo-modal.component.css'],
  animations: [
    trigger('backdropFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('180ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(32px) scale(0.97)' }),
        animate('280ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('180ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px) scale(0.97)' }))
      ])
    ])
  ]
})
export class DemoModalComponent implements OnInit, OnDestroy {

  isOpen       = false;
  isLoading    = true;
  currentTitle = '';
  safeUrl!: SafeResourceUrl;

  // Progress tracking from Embed Events API
  progressPct  = 0;
  currentSlide = 0;
  totalSlides  = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private supademo: SupademoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Listen for open/close commands from the service
    this.supademo.modalOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(payload => {
        if (payload) {
          this.openModal(payload.demoId, payload.title);
        } else {
          this.isOpen = false;
        }
      });

    // Listen for postMessage events from the iframe
    this.supademo.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        switch (event.type) {

          case 'Supademo:load': {
            const p = event.payload as { totalSlides: number };
            this.totalSlides  = p.totalSlides;
            this.currentSlide = 1;
            this.progressPct  = 0;
            break;
          }

          case 'Supademo:slideChange': {
            const p = event.payload as { currentSlide: number; totalSlides: number };
            this.currentSlide = p.currentSlide;
            this.totalSlides  = p.totalSlides;
            break;
          }

          case 'Supademo:progress': {
            const p = event.payload as { percentage: number };
            this.progressPct = p.percentage;
            break;
          }

          // Service already handles auto-close on :close and :completed
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Close on ESC key
  @HostListener('document:keydown.escape')
  onEsc() { if (this.isOpen) this.close(); }

  close() {
    this.supademo.closeModal();
  }

  onIframeLoad() {
    this.isLoading = false;
  }

  private openModal(demoId: string, title: string) {
    // Build the Supademo embed URL
    const url = `https://app.supademo.com/embed/${demoId}`;
    this.safeUrl     = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.currentTitle = title;
    this.isLoading   = true;
    this.progressPct = 0;
    this.currentSlide = 0;
    this.totalSlides  = 0;
    this.isOpen      = true;
  }
}