import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser }                from '@angular/common';
import { Subject }                          from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CskService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private _isActive = false;
  readonly splashActivate$ = new Subject<void>();
  readonly stateChange$    = new Subject<boolean>();

  get isActive(): boolean { return this._isActive; }

  toggle(originX: number, originY: number): void {
    if (this._isActive) {
      this.deactivate(originX, originY);
    } else {
      this.activate(originX, originY);
    }
  }

  activate(originX: number, originY: number): void {
    if (!this.isBrowser || this._isActive) return;
    this._isActive = true;
    this.launchSparkles(originX, originY);
    this.animateReveal(originX, originY, '#04101f');
    this.burstConfetti(originX, originY);
    this.splashActivate$.next();
    this.stateChange$.next(true);
  }

  deactivate(originX: number, originY: number): void {
    if (!this.isBrowser || !this._isActive) return;
    this._isActive = false;
    this.launchSparkles(originX, originY);
    this.animateReveal(originX, originY, this.baseColor());
    this.stateChange$.next(false);
  }

  private baseColor(): string {
    return localStorage.getItem('mn-theme') === 'light' ? '#faf8ff' : '#080812';
  }

  private applyAttribute(): void {
    if (this._isActive) {
      document.documentElement.setAttribute('data-csk', 'true');
    } else {
      document.documentElement.removeAttribute('data-csk');
    }
  }

  // ── Visual effects ──────────────────────────────────────────────────────────

  private launchSparkles(x: number, y: number): void {
    const palette = this._isActive
      ? ['#ffcb05', '#fdb913', '#ffde6e', '#04101f', '#1e3a6e']
      : ['#a78bfa', '#818cf8', '#c4b5fd', '#7dd3fc', '#e2e8f0'];

    for (let i = 0; i < 20; i++) {
      const el   = document.createElement('div');
      const size = 3 + Math.random() * 7;
      el.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:${size}px;height:${size}px;border-radius:50%;
        background:${palette[i % palette.length]};
        pointer-events:none;z-index:99999;
      `;
      document.body.appendChild(el);
      const angle = (i / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const dist  = 35 + Math.random() * 80;
      el.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle)*dist}px),calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`, opacity: 0 },
      ], { duration: 650 + Math.random() * 350, easing: 'cubic-bezier(0,0,0.2,1)', fill: 'forwards' })
        .addEventListener('finish', () => el.remove());
    }
  }

  private animateReveal(x: number, y: number, color: string): void {
    if (typeof (document as any).startViewTransition === 'function') {
      (document as any).startViewTransition(() => this.applyAttribute());
      return;
    }
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9998;
      background:${color};
      clip-path:circle(0% at ${x}px ${y}px);
      pointer-events:none;
    `;
    document.body.appendChild(overlay);
    this.applyAttribute();
    requestAnimationFrame(() => {
      overlay.style.transition = 'clip-path 0.65s cubic-bezier(0.4,0,0.2,1)';
      overlay.style.clipPath   = `circle(150% at ${x}px ${y}px)`;
      setTimeout(() => overlay.remove(), 720);
    });
  }

  private burstConfetti(x: number, y: number): void {
    const colors = ['#ffcb05', '#0b1a3a', '#fdb913', '#fff176', '#ffde6e'];
    for (let i = 0; i < 80; i++) {
      const c   = document.createElement('div');
      const ang = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 340;
      const dx  = Math.cos(ang) * dist;
      const dy  = Math.sin(ang) * dist - 100;
      const w   = 5 + Math.random() * 10;
      c.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:${w}px;height:${w + 3 + Math.random() * 5}px;border-radius:2px;
        background:${colors[i % colors.length]};
        pointer-events:none;z-index:99999;
      `;
      document.body.appendChild(c);
      c.animate([
        { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${(Math.random()*1080-540).toFixed(0)}deg)`, opacity: 0 },
      ], { duration: 950 + Math.random() * 650, easing: 'cubic-bezier(0.1,0.8,0.3,1)', fill: 'forwards' })
        .addEventListener('finish', () => c.remove());
    }
  }
}
