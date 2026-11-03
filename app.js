const downloadButton = document.querySelector('#download-button');
const downloadStatus = document.querySelector('#download-status');

// Let the browser download directly within the user’s click, including on mobile.
downloadButton.addEventListener('click', () => {
  downloadStatus.textContent = 'Deschide fisierul APK descarcat pentru a instala RangeBuddy.';
});
