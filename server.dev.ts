/**
 * Dev-only API server — no Angular SSR, no dist folder needed.
 * Run alongside `ng serve --proxy-config proxy.conf.json`.
 */
import express    from 'express';
import { join }   from 'path';
import { existsSync } from 'fs';
import blogRoutes from './src/server/blog.routes';

// Load .env
const dotenvPath = join(process.cwd(), '.env');
if (existsSync(dotenvPath)) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config({ path: dotenvPath });
}

const app = express();
app.use(express.json());
app.use('/api/blog', blogRoutes);

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`✓ API server ready → http://localhost:${port}/api/blog/posts`);
});
