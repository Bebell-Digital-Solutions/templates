# Minimal Line Art SVG Studio - Fitness 30 Pack

Works 100% offline - no CDN, no internet needed.

## Folder structure
```
fitness-svg-studio/
├── index.html              <- open this in your browser
├── css/
│   ├── tailwind.css        <- Tailwind compiled locally (replaces the CDN)
│   └── style.css           <- custom styles + local Inter @font-face
├── js/
│   ├── data.js             <- 30 fitness SVG icons + preset themes
│   ├── app.js              <- app logic (render, export, ZIP, PNG, modal)
│   └── vendor/
│       ├── lucide.min.js   <- Lucide icons (local copy)
│       └── jszip.min.js    <- JSZip for bulk download (local copy)
└── assets/
    ├── fonts/              <- Inter font files (woff2)
    └── images/             <- your own images
```

## How to use
1. Unzip the folder.
2. Double-click `index.html` (no server needed).
   Optional: VS Code "Live Server", or `python -m http.server 8000`.

## Notes
- Script order matters: vendor libs -> data.js -> app.js.
- Add or edit icons in `js/data.js` (FITNESS_ICONS array).
- If you add NEW Tailwind classes in index.html/js, rebuild css/tailwind.css:
  `npx tailwindcss -i in.css -o css/tailwind.css --minify`
  (in.css contains: @tailwind base; @tailwind components; @tailwind utilities;)
