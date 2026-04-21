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
const distFolder = join(process.cwd(), 'dist/browser');

app.use(express.static(distFolder, { maxAge: '1y' }));

app.get('/', (_req, res) => {
  res.sendFile(join(distFolder, 'index.html'));
});

app.get('/**', (_req, res) => {
  res.sendFile(join(distFolder, 'index.html'));
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
