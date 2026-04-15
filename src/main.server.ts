import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent }         from './app/app.component';
import { config }               from './app/app.config.server';

/**
 * Angular 19 changed bootstrapApplication to accept a third `context` argument
 * containing { platformRef } supplied by renderApplication (from @angular/ssr).
 * Without it, ngServerMode=true causes NG0401 (PLATFORM_NOT_FOUND).
 */
const bootstrap = (context?: object) =>
  bootstrapApplication(AppComponent, config, context as never);

export default bootstrap;
