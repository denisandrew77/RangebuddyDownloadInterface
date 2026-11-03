import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve, sep, extname } from 'node:path';

const root = resolve(process.argv[2] || '.');
const production = process.argv[2] === 'dist';
const port = Number(process.env.PORT || 5173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.apk': 'application/vnd.android.package-archive' };
const server = createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const publicFile = pathname.startsWith('/downloads/') || pathname === '/icon.svg';
    const base = resolve(root, !production && publicFile ? 'public' : '.');
    const file = resolve(base, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(base + sep)) { res.writeHead(403); res.end(); return; }
    if (!(await stat(file)).isFile()) throw new Error('Not found');
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (extname(file) === '.apk') res.setHeader('Content-Disposition', 'attachment; filename="RangeBuddy.apk"');
    res.setHeader('Content-Length', (await stat(file)).size);
    res.writeHead(200);
    if (req.method === 'HEAD') res.end();
    else createReadStream(file).on('error', () => res.destroy()).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});
server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is in use. Try PORT=5175 npm run dev.`
    : `Unable to start the server: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`RangeBuddy is ready at http://localhost:${server.address().port}`));
