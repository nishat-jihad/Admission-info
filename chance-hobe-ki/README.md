# Chance hobe ki?

A Next.js (App Router) rewrite of the original static HTML site. Same features,
now organized into reusable components with a single shared data source for
all 24 universities.

## Project structure

```
src/
  app/
    layout.js              # root layout, fonts, imports globals.css
    globals.css            # every style from the old 3 HTML files, deduped
    page.js                 # Home (hero, search, university cards grid)
    contact/page.js         # Contact page
    general-check/page.js   # "শুধু SSC+HSC দিয়ে" quick checker
    hsc-gpa-calculator/page.js
    university/[slug]/page.js  # ONE dynamic route serves all 24 universities
  components/
    Navbar.js
    Footer.js
    CookieConsent.js
    UniversityCard.js
    UniversitySidebar.js
    EligibilityCalculator.js
  data/
    universities.js         # single source of truth: all 24 universities' data
    generalCriteria.js       # criteria for the SSC+HSC-only checker
  lib/
    eligibility.js           # checkEligibility() — per-university admission rules
```

Because `university/[slug]/page.js` is one dynamic route reading from
`universities.js`, adding a 25th university later means adding one entry to
that data file — no new page, no copy-pasted HTML.

## Run locally

You'll need [Node.js](https://nodejs.org) 18.18+ installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy: GitHub + Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Import into Vercel**
   - Go to https://vercel.com/new
   - Import the GitHub repo you just pushed
   - Vercel auto-detects Next.js — no config needed, just click **Deploy**
   - You'll get a live URL (e.g. `your-project.vercel.app`) in about a minute

3. **Every future `git push` to `main`** automatically redeploys. Vercel also
   gives every pull request its own preview URL.

## Notes / things you may want to change before going fully live

- **Photos**: several university photos are hotlinked from Wikimedia/other
  sites (same as the original). For a production site, consider downloading
  them and serving from `/public` so they don't break if the source moves.
- **Contact form / newsletter**: both are front-end only right now (no email
  actually gets sent), same as the original. To make them work for real,
  wire the `<form onSubmit>` handlers in `contact/page.js` and `Footer.js` to
  a backend or a service like Formspree/Resend.
- **GPA data accuracy**: `src/data/universities.js` was extracted directly
  from your original circular data. Double-check figures against the official
  circular each admission year and update that one file — everything else
  (cards, detail pages, calculators) updates automatically.
