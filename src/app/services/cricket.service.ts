import { Injectable, inject } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable, of, forkJoin, switchMap, catchError, map, timeout } from 'rxjs';
import { environment }        from '../../environments/environment';

export interface CskMatchInfo {
  teams:    string;
  status:   string;
  venue:    string;
  date:     string;
  isLive:   boolean;
  score?:   string;
  opponent: string;
  isPaid?:  boolean;
}

const BASE = 'https://api.cricapi.com/v1';

@Injectable({ providedIn: 'root' })
export class CricketService {
  private readonly http = inject(HttpClient);

  getCSKMatch(): Observable<CskMatchInfo | null> {
    const key = environment.cricApiKey;
    if (!key) return of(null);

    // Strategy 1: parallel scan of current + upcoming matches (3 pages)
    return forkJoin([
      this.fetch(`${BASE}/currentMatches?apikey=${key}&offset=0`),
      this.fetch(`${BASE}/matches?apikey=${key}&offset=0`),
      this.fetch(`${BASE}/matches?apikey=${key}&offset=25`),
    ]).pipe(
      timeout(9000),
      map(pages => {
        const pool: any[] = pages.flatMap(p => p?.data ?? []);
        return this.pickCSK(pool);
      }),
      switchMap(direct => {
        if (direct) return of(direct);
        // Strategy 2: find active IPL series → pull its match list
        return this.searchViaSeries(key);
      }),
      catchError(() => of(null))
    );
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private fetch(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(catchError(() => of({ data: [] })));
  }

  private isCSK(m: any): boolean {
    const names = [
      ...((m.teams as string[] | undefined) ?? []),
      m.name ?? '',
      ...(m.teamInfo?.map((t: any) => t.name ?? '') ?? []),
    ].map((s: string) => s.toLowerCase());
    return names.some(n =>
      n.includes('csk') || n.includes('chennai super kings') || n.includes('chennai')
    );
  }

  private pickCSK(pool: any[]): CskMatchInfo | null {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const match =
      // 1. Live right now
      pool.find(m => m.matchStarted && !m.matchEnded && this.isCSK(m)) ??
      // 2. Scheduled for today
      pool.find(m => this.isCSK(m) && (m.date ?? '').startsWith(today)) ??
      // 3. Next upcoming (not yet started)
      pool.filter(m => this.isCSK(m) && !m.matchEnded)
          .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))[0] ??
      // 4. Any CSK match as fallback
      pool.find(m => this.isCSK(m));

    return match ? this.toInfo(match) : null;
  }

  private searchViaSeries(key: string): Observable<CskMatchInfo | null> {
    // Search directly by keyword so we don't have to page through all series
    return this.fetch(`${BASE}/series?apikey=${key}&search=Indian+Premier+League`).pipe(
      switchMap(res => {
        const all: any[] = res?.data ?? [];
        // Pick the most recent IPL series (highest year in name, or first result)
        const ipl = all
          .filter((s: any) => {
            const n = (s.name ?? '').toLowerCase();
            return n.includes('ipl') || n.includes('indian premier league');
          })
          .sort((a: any, b: any) => {
            // prefer the one with the latest year number in its name
            const yearA = parseInt((a.name ?? '').match(/\d{4}/)?.[0] ?? '0');
            const yearB = parseInt((b.name ?? '').match(/\d{4}/)?.[0] ?? '0');
            return yearB - yearA;
          })[0];

        if (!ipl?.id) return of(null);

        return this.fetch(`${BASE}/series_info?apikey=${key}&id=${ipl.id}`).pipe(
          map(info => {
            const list: any[] = info?.data?.matchList ?? [];
            return this.pickCSK(list);
          })
        );
      }),
      catchError(() => of(null))
    );
  }

  private toInfo(m: any): CskMatchInfo {
    const teams: string[] = (m.teams as string[] | undefined) ?? [];

    const opponent = teams.find((t: string) =>
      !t.toLowerCase().includes('csk') && !t.toLowerCase().includes('chennai')
    ) ?? '';

    const score = (m.score as any[] | undefined)?.[0]
      ? `${m.score[0].r}/${m.score[0].w} (${m.score[0].o} ov)`
      : undefined;

    // Derive a human-readable date string for schedule entries
    const rawDate = m.dateTimeGMT ?? m.date ?? '';
    let dateLabel = m.date ?? '';
    if (rawDate) {
      try {
        dateLabel = new Date(rawDate).toLocaleDateString('en-IN', {
          weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata',
        });
      } catch { /* keep raw string */ }
    }

    return {
      teams:    teams.join(' vs ') || m.name || '',
      status:   m.status  ?? (m.matchStarted ? '' : `📅 ${dateLabel}`),
      venue:    m.venue   ?? '',
      date:     dateLabel,
      isLive:   !!(m.matchStarted && !m.matchEnded),
      score,
      opponent,
    };
  }
}
