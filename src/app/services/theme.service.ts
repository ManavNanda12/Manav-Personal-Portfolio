import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser }                from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly platformId = inject(PLATFORM_ID);
  private _isDark = true;

  get isDark():  boolean { return this._isDark; }
  get isLight(): boolean { return !this._isDark; }

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem('mn-theme');
    if (saved === 'light') {
      this._isDark = false;
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // Default is dark — already set in styles.css :root
  }

  // ─────────────────────────────────────────────────────────────────────────
  /** Call with the button's screen-space coordinates (from click event). */
  toggle(originX: number, originY: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this._isDark = !this._isDark;
    localStorage.setItem('mn-theme', this._isDark ? 'dark' : 'light');

    // Store click origin as % so CSS ::view-transition animation can use it
    const xPct = ((originX / window.innerWidth)  * 100).toFixed(1) + '%';
    const yPct = ((originY / window.innerHeight) * 100).toFixed(1) + '%';
    document.documentElement.style.setProperty('--theme-origin-x', xPct);
    document.documentElement.style.setProperty('--theme-origin-y', yPct);

    this.launchSparkles(originX, originY);

    // ── View Transition API (Chrome 111+, Firefox 124+) ───────────────────
    if (typeof (document as any).startViewTransition === 'function') {
      (document as any).startViewTransition(() => this.applyTheme());
      return;
    }

    // ── Fallback: clip-path overlay ───────────────────────────────────────
    this.animateWithOverlay(originX, originY);
  }

  // ─────────────────────────────────────────────────────────────────────────

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this._isDark ? 'dark' : 'light');
  }

  private launchSparkles(x: number, y: number): void {
    // Colours lean toward the incoming theme
    const palette = this._isDark
      ? ['#a78bfa', '#818cf8', '#c4b5fd', '#7dd3fc', '#f0abfc']  // going dark
      : ['#fcd34d', '#fbbf24', '#f97316', '#fb923c', '#facc15']; // going light

    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div');
      const size = 3 + Math.random() * 5;
      el.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:${size}px;height:${size}px;border-radius:50%;
        background:${palette[i % palette.length]};
        pointer-events:none;z-index:99999;
      `;
      document.body.appendChild(el);

      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.7;
      const dist  = 28 + Math.random() * 60;
      const dx    = Math.cos(angle) * dist;
      const dy    = Math.sin(angle) * dist;

      el.animate([
        { transform: 'translate(-50%,-50%) scale(1)',                                         opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(0)`,        opacity: 0 }
      ], {
        duration: 550 + Math.random() * 250,
        easing:   'cubic-bezier(0,0,0.2,1)',
        fill:     'forwards'
      }).addEventListener('finish', () => el.remove());
    }
  }

  private animateWithOverlay(x: number, y: number): void {
    const newBg  = this._isDark ? '#080812' : '#f5f3ff';
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9998;
      background:${newBg};
      clip-path:circle(0% at ${x}px ${y}px);
      pointer-events:none;
    `;
    document.body.appendChild(overlay);

    // Apply CSS vars immediately; the overlay hides the flash
    this.applyTheme();

    requestAnimationFrame(() => {
      overlay.style.transition = 'clip-path 0.65s cubic-bezier(0.4,0,0.2,1)';
      overlay.style.clipPath   = `circle(150% at ${x}px ${y}px)`;
      setTimeout(() => overlay.remove(), 700);
    });
  }
}
