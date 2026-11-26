# open-scroll.com

The website for Open Scroll: a short book (`index.html`) and its appendices, the
privacy policy (`privacy.html`) and the terms of use (`terms.html`). Plain HTML, CSS
and one small script; no build step.
GitHub Pages publishes `main` to open-scroll.com, so **merging to `main` deploys**.

- `privacy.html` must stay at this path: the app and App Store Connect link to `/privacy`.
- `terms.html` must stay at this path: the app and App Store Connect link to `/terms`.
- `fonts/` holds Libre Caslon Text and Display, subset from Google Fonts' upstream
  files to keep oldstyle figures and arrows. Both are under the OFL (license files beside them).
- `design-reference/` holds the design-canvas mockups the site was built from and
  review screenshots. `_config.yml` keeps it out of the published site.

To preview: `python3 -m http.server 4173` here, then open http://localhost:4173.
