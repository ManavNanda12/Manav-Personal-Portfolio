import { ApplicationConfig }      from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideNoopAnimations }  from '@angular/platform-browser/animations';
import { provideRouter }          from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr }          from 'ngx-toastr';
import { routes }                 from './app.routes';
import { withInMemoryScrolling }  from '@angular/router';

/**
 * Server-only config — intentionally does NOT include provideAnimationsAsync()
 * (browser animations module) to avoid the PLATFORM_NOT_FOUND (NG0401) crash.
 * provideNoopAnimations() is used instead so animation metadata compiles fine.
 */
export const config: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideNoopAnimations(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'disabled' })),
    provideHttpClient(withFetch()),
    provideToastr()
  ]
};
