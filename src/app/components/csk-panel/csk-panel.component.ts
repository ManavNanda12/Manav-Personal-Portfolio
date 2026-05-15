import {
  Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CskService } from '../../services/csk.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-csk-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './csk-panel.component.html',
  styleUrls: ['./csk-panel.component.css'],
})
export class CskPanelComponent implements OnInit, OnDestroy {
  readonly csk      = inject(CskService);
  private cdr       = inject(ChangeDetectorRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  drawerOpen = false;
  factIndex  = 0;

  private factTimer: ReturnType<typeof setInterval> | null = null;
  private stateSub: Subscription | null = null;

  readonly years = ['2010', '2011', '2018', '2021', '2023'];

  readonly stats = [
    { num: '10',   lbl: 'Finals',    icon: '🎯' },
    { num: '5×',   lbl: 'Champions', icon: '🏆' },
    { num: '2008', lbl: 'Founded',   icon: '📅' },
    { num: '#7',   lbl: 'Thala',     icon: '👑' },
  ];

  readonly highlights = [
    { icon: '🏆', text: '5× IPL Champions — most titles in history' },
    { icon: '🎯', text: '10 Finals in 16 seasons — unmatched consistency' },
    { icon: '👑', text: 'Dhoni — highest win % captain in IPL' },
    { icon: '🦁', text: 'Loudest crowd in cricket — MA Chidambaram' },
    { icon: '💛', text: 'Yellove Army — 100M+ fans worldwide' },
    { icon: '😎', text: 'Never relegated in 15+ years of IPL' },
  ];

  readonly facts = [
    'Most Finals appearances in IPL history — 10 out of 16 seasons',
    'Won the 2023 title with the oldest squad ever to win IPL',
    'MS Dhoni — the only captain to win all three ICC trophies',
    'Ruturaj Gaikwad took the Orange Cap in IPL 2021',
    'Chepauk stadium — the loudest crowd in all of IPL',
    'CSK reached 5 consecutive Finals: 2019 · 2021 · 2023',
  ];

  private readonly imgBase = [
    { src: 'assets/images/csk/csk-captain.png',                          label: 'Captain · MS Dhoni' },
    { src: 'assets/images/csk/wp12062516-csk-squad-2023-wallpapers.jpg', label: 'Squad · 2023'       },
    { src: 'assets/images/csk/wp13717066-csk-trophy-wallpapers.jpg',     label: '5× Champions'       },
    { src: 'assets/images/csk/wp12062510-csk-2023-wallpapers.jpg',       label: 'Yellow Army'        },
    { src: 'assets/images/csk/wp13717071-csk-trophy-wallpapers.jpg',     label: 'Trophy Lift'        },
    { src: 'assets/images/csk/wp12370516-csk-2023-wallpapers.jpg',       label: 'CSK 2023'           },
  ];
  readonly galleryImages = [...this.imgBase, ...this.imgBase];

  ngOnInit() {
    if (!this.isBrowser) return;
    // Re-render whenever CSK mode is toggled on/off
    this.stateSub = this.csk.stateChange$.subscribe(() => this.cdr.markForCheck());
    this.factTimer = setInterval(() => {
      this.factIndex = (this.factIndex + 1) % this.facts.length;
      this.cdr.markForCheck();
    }, 3800);
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.stateSub?.unsubscribe();
    if (this.factTimer) clearInterval(this.factTimer);
  }
}
