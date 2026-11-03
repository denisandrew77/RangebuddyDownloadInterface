const downloadButton = document.querySelector('#download-button');
const downloadStatus = document.querySelector('#download-status');
let checking = false;

downloadButton.addEventListener('click', async (event) => {
  event.preventDefault();
  if (checking) return;
  checking = true;
  downloadButton.setAttribute('aria-busy', 'true');
  downloadStatus.textContent = 'Se pregateste descarcarea…';

  try {
    const response = await fetch(downloadButton.href, { method: 'HEAD', cache: 'no-store' });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || contentType.includes('text/html')) {
      throw new Error('APK unavailable');
    }
    const link = document.createElement('a');
    link.href = downloadButton.href;
    link.download = downloadButton.download;
    document.body.append(link);
    link.click();
    link.remove();
    downloadStatus.textContent = 'Deschide fisierul APK descarcat pentru a instala RangeBuddy.';
  } catch {
    downloadStatus.textContent = 'Aplicatia nu este disponibila momentan. Te rugam sa revii mai tarziu.';
  } finally {
    checking = false;
    downloadButton.removeAttribute('aria-busy');
  }
});
