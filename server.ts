import express        from 'express';
import { join }       from 'path';
import { existsSync } from 'fs';
import blogRoutes     from './src/server/blog.routes';

if (process.env['NODE_ENV'] !== 'production') {
  const dotenvPath = join(process.cwd(), '.env');
  if (existsSync(dotenvPath)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('dotenv').config({ path: dotenvPath });
  }
}

const app        = express();
const distFolder = join(process.cwd(), 'dist/public/browser');

app.use(express.json());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.sendStatus(200); return; }
  next();
});

app.use('/api/blog', blogRoutes);
app.use(express.static(distFolder, { maxAge: '1y', index: false }));

// Express 5: no wildcard path — use bare app.use as catch-all for SPA fallback
app.use((_req, res) => {
  res.sendFile(join(distFolder, 'index.html'));
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
