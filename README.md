# Paz.os — Clara Pazos · Espacio de Arte

A static rebuild of the writer/painter blog **paz-os.xyz** (Clara Pazos — poetry,
songs, haikus, texts, paintings, drawings, designs). Bilingual (Spanish at `/`,
English under `/en/`).

The site was a WordPress + Elementor site. This repo is a fully static mirror:
every page is plain HTML and every asset (CSS, JS, fonts, images) is served from
local files. All original `https://paz-os.xyz/...` URLs were rewritten to
root-relative paths so the site works served from any web root.

## Structure

```
index.html                     Home (Spanish)
en/index.html                  Home (English)
2022/11/.../index.html         Posts, reconstructed at their original permalinks
category/  tag/                 Category and tag archive pages
poesias/ canciones/ haikus/    Section landing pages
  textos/ visuales/ pinturas/
  dibujos/ disenos/ novedades/
wp-content/                    Theme, plugin and uploaded-image assets
wp-includes/                   WordPress core scripts (jQuery, etc.)
```

Each original URL like `https://paz-os.xyz/2022/11/09/vuelo/` maps to
`2022/11/09/vuelo/index.html`, so directory-index serving reproduces the live URLs.

## Running locally

It must be served from the repo root (links are root-relative — opening files
directly with `file://` will not resolve assets):

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

A `.claude/launch.json` is included so the Claude Code preview can serve it too.

## Deploying

Any static host works (GitHub Pages, Netlify, Cloudflare Pages, S3). Because links
are root-relative, deploy at a **domain root** (a user/organization Pages site or a
custom domain), not a project subpath like `user.github.io/paz-os/`.

## Known gaps (limitations of the source capture, not the rebuild)

These were never present in the original mirror, and the live site was unreachable
when rebuilding, so they could not be recovered:

- **15 JavaScript effect bundles** — per-page Premium Addons / Essential Addons
  init scripts, the TranslatePress dynamic-translation script, and WP
  `comment-reply.min.js`. All CSS and all core JS (jQuery, Elementor frontend,
  Slick, Isotope, Lottie, anime, fancybox) are present, so layout and content are
  intact; only a few widget animations may not initialize.
- **~86 archive pagination pages** (e.g. `category/dibujos/page/3/`) — the original
  capture only included the first few pages of each archive, so deeper "older
  posts" pagination links 404.
- **1 attachment page** — `2022/11/22/julio-david/pintura-__-tinta-china/`.

Links to WordPress RSS feeds (`/feed/`), the REST API (`/wp-json/`) and `xmlrpc.php`
are inert metadata references, not site navigation, and are expected to be absent in
a static mirror.

All 370 captured pages are present and cross-navigation between them works.
