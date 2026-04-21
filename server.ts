import 'zone.js/node';
import express                                             from 'express';
import { join }                                            from 'path';
import { existsSync }                                      from 'fs';
import { AngularNodeAppEngine, writeResponseToNodeResponse,
         createNodeRequestHandler }                        from '@angular/ssr/node';
import blogRoutes                                          from './src/server/blog.routes';

// Load .env in development (production uses real env vars)
if (process.env['NODE_ENV'] !== 'production') {
  const dotenvPath = join(process.cwd(), '.env');
  if (existsSync(dotenvPath)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('dotenv').config({ path: dotenvPath });
  }
}

const app          = express();
const distFolder   = join(process.cwd(), 'dist/public/browser');
const engine       = new AngularNodeAppEngine();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── MongoDB-backed API routes ─────────────────────────────────────────────────
app.use('/api/blog', blogRoutes);

// ── Static assets (Angular build output) ─────────────────────────────────────
app.use(express.static(distFolder, { maxAge: '1y', index: false }));

// ── Angular SSR for all remaining routes ─────────────────────────────────────
app.use('/**', createNodeRequestHandler(async (req, res, next) => {
  const response = await engine.handle(req);
  if (response) {
    await writeResponseToNodeResponse(response, res);
  } else {
    next();
  }
}));

// ── Start ─────────────────────────────────────────────────────────────────────
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
