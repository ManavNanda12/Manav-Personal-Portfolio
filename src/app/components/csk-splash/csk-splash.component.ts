import {
  Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CskService } from '../../services/csk.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-csk-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './csk-splash.component.html',
  styleUrls: ['./csk-splash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CskSplashComponent implements OnInit, OnDestroy {
  private csk        = inject(CskService);
  private cdr        = inject(ChangeDetectorRef);
  private isBrowser  = isPlatformBrowser(inject(PLATFORM_ID));
  private sub: Subscription | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;

  visible   = false;
  dismissing = false;

  readonly years = ['2010', '2011', '2018', '2021', '2023'];

  ngOnInit() {
    if (!this.isBrowser) return;
    this.sub = this.csk.splashActivate$.subscribe(() => {
      this.dismissing = false;
      this.visible    = true;
      this.cdr.markForCheck();
      this.timer = setTimeout(() => this.dismiss(), 3500);
    });
  }

  dismiss() {
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
    this.dismissing = true;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.visible    = false;
      this.dismissing = false;
      this.cdr.markForCheck();
    }, 300);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    if (this.timer) clearTimeout(this.timer);
  }
}
