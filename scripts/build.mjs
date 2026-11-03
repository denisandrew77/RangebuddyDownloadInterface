import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js']) {
  await cp(`${root}${file}`, `${root}dist/${file}`);
}
await cp(`${root}public`, `${root}dist`, { recursive: true });
console.log('Built site in dist/. APK files in public/downloads/ are included automatically.');
