import {
  Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { CskService } from '../../services/csk.service';

@Component({
  selector: 'app-csk-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './csk-panel.component.html',
  styleUrls: ['./csk-panel.component.css'],
  animations: [
    trigger('panelSlide', [
      transition(':enter', [
        style({ transform: 'translateY(110%)', opacity: 0 }),
        animate('520ms cubic-bezier(0.34,1.56,0.64,1)',
          style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in',
          style({ transform: 'translateY(110%)', opacity: 0 })),
      ]),
    ]),
    trigger('yearPop', [
      transition(':enter', [
        style({ transform: 'scale(0) rotate(-20deg)', opacity: 0 }),
        animate('480ms cubic-bezier(0.34,1.56,0.64,1)',
          style({ transform: 'scale(1) rotate(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class CskPanelComponent implements OnInit, OnDestroy {
  readonly csk       = inject(CskService);
  private  cdr       = inject(ChangeDetectorRef);
  private  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  minimized = false;
  factIndex = 0;
  private factTimer: ReturnType<typeof setInterval> | null = null;

  readonly years = [
    { y: '2010' }, { y: '2011' }, { y: '2018' }, { y: '2021' }, { y: '2023' },
  ];

  readonly stats = [
    { num: '10',   lbl: 'Finals',    icon: '🎯' },
    { num: '5×',   lbl: 'Champions', icon: '🏆' },
    { num: '2008', lbl: 'Founded',   icon: '📅' },
    { num: '#7',   lbl: 'Thala',     icon: '👑' },
  ];

  readonly facts = [
    'Most Finals appearances in IPL history — 10 out of 14 seasons',
    'Won the 2023 title with the oldest squad ever to win IPL',
    'MS Dhoni — the only captain to win all three ICC trophies',
    'Ruturaj Gaikwad took the Orange Cap in IPL 2021',
    'Chepauk stadium — the loudest crowd in all of IPL',
    'CSK reached back-to-back Finals in 2019 · 2021 · 2023',
  ];

  // Image gallery — duplicated for seamless CSS marquee loop
  private readonly imgBase = [
    { src: 'assets/images/csk/csk-captain.png',                          label: 'Captain · MS Dhoni' },
    { src: 'assets/images/csk/wp12062516-csk-squad-2023-wallpapers.jpg', label: 'Squad · 2023' },
    { src: 'assets/images/csk/wp13717066-csk-trophy-wallpapers.jpg',     label: '5× Champions' },
    { src: 'assets/images/csk/wp12062510-csk-2023-wallpapers.jpg',       label: 'Yellow Army' },
    { src: 'assets/images/csk/wp13717071-csk-trophy-wallpapers.jpg',     label: 'Trophy Lift' },
    { src: 'assets/images/csk/wp12370516-csk-2023-wallpapers.jpg',       label: 'CSK 2023' },
  ];
  // Duplicated so the CSS marquee animation loops seamlessly
  readonly galleryImages = [...this.imgBase, ...this.imgBase];

  readonly marqueeItems = [
    '🦁 WHISTLE PODU', '◆', '💛 YELLOVE', '◆', '⚡ THALA',
    '◆', '🏆 SUPERKINGS', '◆', '📣 CHEPAUK ROAR', '◆',
    '😎 CAPTAIN COOL', '◆', '🏏 DADDIES ARMY', '◆',
    '🦁 WHISTLE PODU', '◆', '💛 YELLOVE', '◆', '⚡ THALA',
    '◆', '🏆 SUPERKINGS', '◆', '📣 CHEPAUK ROAR', '◆',
    '😎 CAPTAIN COOL', '◆', '🏏 DADDIES ARMY', '◆',
  ];

  ngOnInit() {
    if (!this.isBrowser) return;
    this.factTimer = setInterval(() => {
      this.factIndex = (this.factIndex + 1) % this.facts.length;
      this.cdr.markForCheck();
    }, 3800);
  }

  ngOnDestroy() {
    if (this.factTimer) clearInterval(this.factTimer);
  }
}
