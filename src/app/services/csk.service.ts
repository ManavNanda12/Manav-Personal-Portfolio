import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser }                from '@angular/common';

const STATS = [
  '🏆 5× IPL Champions',
  '🦁 Yellove',
  '📅 Est. 2008',
  '⚡ Thala · MS Dhoni',
  '📣 Whistle Podu',
  '🎯 10 Finals',
  '👨‍👴 Daddies Army',
  '🏟️ Chepauk Roar',
  '💛 Anbuden',
  '😎 Captain Cool',
  '#WhistlePodu',
  '💛 Yellow Army',
  '🏆 2010 · 2011 · 2018 · 2021 · 2023',
  '🦁 Lions of Chennai',
  '👑 Superkings',
  '🔢 Dhoni #7',
  '🏏 Stephen Fleming',
  '🌟 Ruturaj Gaikwad',
];

@Injectable({ providedIn: 'root' })
export class CskService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private _isActive = false;
  private bubbleTimer: ReturnType<typeof setInterval> | null = null;
  private bubbleLayer: HTMLElement | null = null;

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
    // this.startBubbles();
  }

  deactivate(originX: number, originY: number): void {
    if (!this.isBrowser || !this._isActive) return;
    this._isActive = false;
    this.launchSparkles(originX, originY);
    this.animateReveal(originX, originY, this.baseColor());
    // this.stopBubbles();
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

  // ── Bubble layer ────────────────────────────────────────────────────────────

  private ensureBubbleLayer(): void {
    if (this.bubbleLayer && document.body.contains(this.bubbleLayer)) return;
    this.bubbleLayer = document.createElement('div');
    Object.assign(this.bubbleLayer.style, {
      position: 'fixed', inset: '0',
      pointerEvents: 'none',
      zIndex: '50',        // above content, below nav (100) and panel (500)
      overflow: 'hidden',
    });
    document.body.appendChild(this.bubbleLayer);
  }

  private startBubbles(): void {
    this.stopBubbles();
    // Re-create the layer AFTER stopBubbles() clears it
    this.ensureBubbleLayer();
    // Initial burst — 8 bubbles staggered
    for (let i = 0; i < 8; i++) setTimeout(() => this.spawnBubble(), i * 100);
    // Ongoing — one every 600ms
    this.bubbleTimer = setInterval(() => this.spawnBubble(), 600);
  }

  private stopBubbles(): void {
    if (this.bubbleTimer !== null) { clearInterval(this.bubbleTimer); this.bubbleTimer = null; }
    if (this.bubbleLayer) {
      const layer = this.bubbleLayer;
      this.bubbleLayer = null;
      // Let existing bubbles finish their flight before removing layer
      setTimeout(() => layer.remove(), 2000);
    }
  }

  private spawnBubble(): void {
    if (!this.bubbleLayer || !this._isActive) return;
    const stat    = STATS[Math.floor(Math.random() * STATS.length)];
    const el      = document.createElement('div');
    const isGlass = Math.random() > 0.5;
    el.className  = 'csk-bubble' + (isGlass ? ' csk-bubble--outline' : '');
    el.textContent = stat;

    const x   = 2  + Math.random() * 88;         // % across viewport
    const dur = 9  + Math.random() * 9;            // 9–18 s
    const r0  = (Math.random() * 18 - 9).toFixed(1);
    const r1  = (parseFloat(r0) + (Math.random() * 32 - 16)).toFixed(1);
    const fs  = 10 + Math.random() * 8;           // font-size 10–18px

    el.style.left              = `${x}vw`;
    el.style.bottom            = '-90px';
    el.style.animationDuration = `${dur}s`;
    el.style.fontSize          = `${fs}px`;
    el.style.setProperty('--r0', `${r0}deg`);
    el.style.setProperty('--r1', `${r1}deg`);

    this.bubbleLayer.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 400);
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
