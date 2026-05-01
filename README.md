# Kipu — web (Astro redesign)

Lean v1 of the redesigned site. Lives alongside the legacy Hugo source on the `website-redesign` branch until cutover.

## Running locally (hi Lucho 👋)

You'll need [Node.js](https://nodejs.org/) 18 or newer. Check with `node -v`.

```bash
# 1. Clone the repo and switch to this branch
git clone https://github.com/kipuai/kipuai.github.io.git
cd kipuai.github.io
git checkout website-redesign

# 2. Install dependencies and start the dev server
cd web
npm install
npm run dev
```

Open http://localhost:4321/ for English or http://localhost:4321/es/ for Spanish. The dev server hot-reloads on save.

Other useful commands:

```bash
npm run build     # production build into web/dist/
npm run preview   # serve the production build locally
```

If `npm install` complains, delete `web/node_modules` and `web/package-lock.json` and try again.

## Project layout

```
web/
├── astro.config.mjs        # i18n, site, build config
├── public/                 # static assets (favicon, images)
├── src/
│   ├── components/         # Nav, Footer, LanguageToggle, ...
│   ├── content/            # markdown content (services, future insights)
│   ├── i18n/               # shared microcopy strings
│   ├── layouts/            # BaseLayout.astro
│   ├── pages/              # /  /approach  /about  /contact
│   │   └── es/             #   /es/  /es/enfoque  /es/nosotros  /es/contacto
│   └── styles/             # tokens.css, global.css
└── tsconfig.json
```

## v1 status

**In place**
- Four pages × two languages, content from `../content-drafts/copy-v1.md` (locked).
- Design tokens: off-white background, near-black ink, deep botanical green accent.
- Bio photos + Kipu logo (in nav and as favicon).
- Motion islands: hero arrival fade, scroll-triggered reveals, magnetic CTA, marquee, `prefers-reduced-motion` honored.
- View Transitions API for smooth route changes.
- PostHog analytics (production only).
- Contact form wired to Formspree (see below for setup).

**Temporary — review-only**
- **Font picker** in the top nav: live-switch between Instrument Serif + Inter (default), Fraunces + Inter, Playfair + Inter, DM Serif + DM Sans, and Manrope. Choice persists in `localStorage`. Remove `<li class="nav__fontpicker">` from `Nav.astro` (and the FONTS map in `BaseLayout.astro`) once we lock the type.

**Deferred**
- Real client/affiliation logos in the credibility marquee — placeholder text for now.
- Designer pass on the signature visual / kipu motif.

## Formspree setup

The contact forms post to `https://formspree.io/f/${PUBLIC_FORMSPREE_ID}`. Until you create a form on [formspree.io](https://formspree.io), the action falls back to `YOUR_FORM_ID` and submits will be no-ops (the AJAX handler short-circuits, the browser will follow the dummy URL — fine for dev). To wire it up:

1. Sign up at formspree.io (free tier: 50 submissions/month).
2. Create a form with the email you want intakes sent to.
3. Copy the form ID (the slug after `/f/` in the endpoint, e.g. `xkgjabcd`).
4. Create `web/.env`:
   ```
   PUBLIC_FORMSPREE_ID=xkgjabcd
   ```
5. Restart `npm run dev`.

## Do not deploy from this branch

GitHub Pages serves from `main`. This work lives on `website-redesign`. Don't merge to `main` until Jorge has reviewed locally and approved cutover.
