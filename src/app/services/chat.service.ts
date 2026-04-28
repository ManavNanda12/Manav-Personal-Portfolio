import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private openSignal$ = new Subject<void>();
  readonly open$ = this.openSignal$.asObservable();

  open() { this.openSignal$.next(); }
}
