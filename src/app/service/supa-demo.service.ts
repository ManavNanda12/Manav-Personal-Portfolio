import { Injectable, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser }                           from '@angular/common';
import { Subject }                                     from 'rxjs';

// ── Supademo event shapes (from Embed Events API docs) ──
export interface SupademoLoadPayload    { demoId: string; title: string; totalSlides: number; }
export interface SupademoProgressPayload{ demoId: string; percentage: number; currentSlide: number; totalSlides: number; }
export interface SupademoSlidePayload   { demoId: string; currentSlide: number; totalSlides: number; isFirstSlide: boolean; isLastSlide: boolean; }
export interface SupademoCompletePayload{ demoId: string; title: string; completedAt: string; }

export type SupademoEventType =
  | 'Supademo:load'
  | 'Supademo:started'
  | 'Supademo:slideChange'
  | 'Supademo:progress'
  | 'Supademo:completed'
  | 'Supademo:close';

export interface SupademoEvent {
  type: SupademoEventType;
  payload?: SupademoLoadPayload | SupademoProgressPayload | SupademoSlidePayload | SupademoCompletePayload;
}

// Augment Window so TypeScript knows about Supademo global
declare global {
  interface Window {
    Supademo?: (apiKey: string, options?: Record<string, unknown>) => {
      loadDemo: (demoId: string) => void;
      loadShowcase: (showcaseId: string) => void;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class SupademoService implements OnDestroy {

  // Your Supademo API key — get from app.supademo.com → Settings → API
  private readonly API_KEY = '29ab61f312491027281561f386f6c16e11e297b4d9bd7fea808f4ec1e4acff02';

  // Observable stream of all Supademo postMessage events
  readonly events$ = new Subject<SupademoEvent>();

  // Internal open/close state stream (used by DemoModalComponent)
  readonly modalOpen$ = new Subject<{ demoId: string; title: string } | null>();

  private messageHandler = (event: MessageEvent) => {
    if (event.data?.source !== 'Supademo') return;
    this.events$.next({ type: event.data.type, payload: event.data.payload });

    // Auto-close modal on ESC or demo completion
    if (
      event.data.type === 'Supademo:close' ||
      event.data.type === 'Supademo:completed'
    ) {
      setTimeout(() => this.closeModal(), event.data.type === 'Supademo:completed' ? 1200 : 0);
    }
  };

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    // window does not exist on the server — guard for SSR prerendering
    if (this.isBrowser) {
      window.addEventListener('message', this.messageHandler);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('message', this.messageHandler);
    }
    this.events$.complete();
    this.modalOpen$.complete();
  }

  /** Call once after view is ready — initialises the Supademo SDK */
  init(): void {
    if (typeof window.Supademo === 'function') {
      window.Supademo(this.API_KEY, { variables: { name: '', email: '' } });
    }
  }

  /** Open a demo in the portfolio modal */
  openDemo(demoId: string, title: string): void {
    this.modalOpen$.next({ demoId, title });
  }

  /** Close the modal */
  closeModal(): void {
    this.modalOpen$.next(null);
  }

  /**
   * Trigger demo programmatically via the SDK
   * (alternative to the data-attribute approach)
   */
  loadDemo(demoId: string): void {
    if (typeof window.Supademo === 'function') {
      window.Supademo(this.API_KEY).loadDemo(demoId);
    }
  }
}