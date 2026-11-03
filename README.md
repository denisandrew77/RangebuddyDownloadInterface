# RangeBuddy APK download page

A responsive, bright single-page APK download website. Plain HTML, CSS, and JavaScript; no dependencies to install.

## Add your APK

Place your Android APK at exactly:

```text
/Users/denisdamse/Documents/Projects/DownloadApp/public/downloads/app.apk
```

Rename your APK to `app.apk`. The large download button points to `/downloads/app.apk` and saves the file as `RangeBuddy.apk`. To change the downloaded filename, edit the `download` attribute in `index.html` and the `Content-Disposition` filename in `scripts/serve.mjs`.

Until you supply the APK, the page displays an availability message when the button is clicked. No dummy APK is included.

## Run locally

```sh
npm run dev
```

Open http://localhost:5173.

## Build and host

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to any static website host. Add your APK **before** building; if you replace it later, rebuild and redeploy. The build copies `public/downloads/app.apk` into `dist/downloads/app.apk` automatically. Configure your host to serve `.apk` files as `application/vnd.android.package-archive` if needed.

## Customize

Replace the RangeBuddy name and page copy in `index.html`. Colors and responsive layouts are in `style.css`. Download availability handling is in `app.js`.
