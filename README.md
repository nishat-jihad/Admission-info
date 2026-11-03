# Admission Info "

A free, Bangla-language web app that helps Bangladeshi HSC students check **which universities, engineering institutes and medical colleges they can apply to** based on their SSC and HSC GPA, and keeps track of **2026–27 admission test dates and notices** in one place.

**Live site:** https://admissioninfo.vercel.app

> ⚠️ **Disclaimer:** All eligibility rules and dates on this site are collected from official admission circulars and are meant as a general guide only. Always confirm against the university's official circular before applying.

---

## Table of contents

- [Features](#features)
- [Universities covered](#universities-covered)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Getting started](#getting-started)
- [How the data works](#how-the-data-works)
- [Common maintenance tasks](#common-maintenance-tasks)
- [SEO, analytics and ads](#seo-analytics-and-ads)
- [Deployment](#deployment)
- [Known limitations](#known-limitations)
- [Community and contact](#community-and-contact)

---

## Features

| Page | Route | What it does |
|---|---|---|
| **Home** | `/` | Hero section, search, category filter (all universities / engineering / medical) and a grid of university cards. |
| **University details** | `/university/[slug]` | One dynamic page for every university: seats, exam type and duration, subject-wise marks distribution, result formula, eligibility text, official website, the 2026–27 exam date (pulled automatically from the updates feed) and a built-in **eligibility calculator**. |
| **Eligibility calculator** | inside each university page | Enter your SSC / HSC (and subject-wise) GPA and instantly see whether you meet that university's minimum requirements. |
| **General check** | `/general-check` | Enter only your SSC + HSC GPA and see every university you are eligible for at a glance. Universities that need subject-wise GPA (BUET, medical, etc.) are flagged separately. |
| **HSC GPA calculator** | `/hsc-gpa-calculator` | Calculates HSC GPA from subject grades. |
| **Exam dates** | `/exam-dates` | All 2026–27 admission test dates in one table, grouped by category (university / engineering / medical) and unit, with application start and end dates. Switch between categories with tabs. |
| **Updates** | `/updates` | A news-style feed of the latest admission notices, with category filter buttons and a search box. Each card shows the schedule table, application window and — where available — a **"View exam date source"** box with the original notice photo (tap the photo to open it full screen). |
| **About** | `/about` | Static information page about the project. |
| **Contact** | `/contact` | Site email, developer email, and links to the Facebook page and Telegram channel. There is no contact form — all contact is via email or social links. |

Other details:

- Mobile-first layout, Bangla UI, `lang="bn"`.
- Loading state (`Loader`) shown while pages load.
- Social promo banner and footer links to the Telegram channel and Facebook page.
- Auto-generated `sitemap.xml` and `robots.txt`.

---

## Universities covered

24 entries are defined in `src/data/universities.js` (the object key is the URL slug):

| Group | Slugs |
|---|---|
| **Engineering / technology** | `buet`, `butex`, `iut`, `cuet`, `kuet`, `ruet`, `mist`, `sust`, `hstu_a`, `hstu_b` |
| **Medical** | `medical`, `afmc` |
| **General universities** | `du`, `ju_a`, `ju_d`, `ru`, `cu`, `jnu`, `cou`, `ku_a`, `ku_b`, `bup` |
| **Admission clusters** | `gst` (GST গুচ্ছ), `krishi` (কৃষি গুচ্ছ) |

---

## Tech stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router) with React 18
- **Language:** JavaScript (no TypeScript), path alias `@/` → `src/`
- **Styling:** Plain CSS in a single `globals.css` (no CSS framework)
- **Fonts:** `Noto Sans Bengali` and `Bangers` via `next/font/google`
- **Data:** Hard-coded JS modules — **no database, no backend, no API**
- **Analytics:** Vercel Analytics and Microsoft Clarity
- **Hosting:** Vercel (auto-deploy from GitHub)

---

## Repository layout

```
.
├── .gitattributes
├── README.md
├── scripts/
│   └── download-images.mjs          # one-time helper: downloads hotlinked images into /public/images
└── chance-hobe-ki/                  # the Next.js app (this is the Vercel root directory)
    ├── package.json
    ├── next.config.mjs              # allowed remote image hosts
    ├── jsconfig.json                # "@/..." path alias
    ├── public/
    │   ├── images/                  # university photos, hero images, logo, notice photos
    │   ├── ads.txt
    │   ├── site.webmanifest
    │   ├── favicon*.png / favicon.ico / apple-touch-icon.png / android-chrome-*.png
    │   └── googlee76ee95315f509d5.html   # Google Search Console verification
    └── src/
        ├── app/
        │   ├── layout.js            # root layout, fonts, global SEO metadata, analytics scripts
        │   ├── globals.css          # all styles
        │   ├── page.js              # home page
        │   ├── loading.js           # global loading UI
        │   ├── robots.js            # /robots.txt
        │   ├── sitemap.js           # /sitemap.xml (static routes + every university)
        │   ├── about/page.js
        │   ├── contact/page.js
        │   ├── exam-dates/page.js
        │   ├── updates/page.js
        │   ├── general-check/       # layout.js (metadata) + page.js
        │   ├── hsc-gpa-calculator/  # layout.js (metadata) + page.js
        │   └── university/[slug]/page.js   # ONE dynamic route for all 24 universities
        ├── components/
        │   ├── Navbar.js
        │   ├── Footer.js
        │   ├── SplashScreen.js              # present in the repo but not currently used by any page
        │   ├── Loader.js
        │   ├── SocialPromoBanner.js
        │   ├── UniversityCard.js
        │   ├── UniversitySidebar.js
        │   ├── EligibilityCalculator.js    # per-university GPA checker
        │   ├── ExamDatesFilterList.js      # exam-dates table with filters
        │   └── UpdatesFilterList.js        # updates feed with filters + notice-photo viewer
        ├── data/
        │   ├── universities.js      # single source of truth for every university
        │   ├── generalCriteria.js   # thresholds for the SSC+HSC-only checker
        │   ├── examDates.js         # data for /exam-dates
        │   └── updates.js           # data for /updates (and exam date on university pages)
        └── lib/
            └── eligibility.js       # checkEligibility() — per-university rules
```

---

## Getting started

**Requirements:** [Node.js](https://nodejs.org/) 18.18 or newer.

```bash
# 1. clone
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>/chance-hobe-ki

# 2. install dependencies
npm install

# 3. start the dev server
npm run dev
```

Open http://localhost:3000.

| Script | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also catches syntax/lint errors) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

> Tip: run `npm run build` before pushing a large change to catch errors early — Vercel runs the same build.

---

## How the data works

There is **no database**. Everything shown on the site comes from four files in `chance-hobe-ki/src/data/` plus one rules file in `src/lib/`. Editing these files and pushing to GitHub is all it takes to update the site.

### 1. `universities.js` — the main source of truth

One object per university, keyed by slug. Key fields:

| Field | Meaning |
|---|---|
| `name`, `fullName` | Short and full display names |
| `photo`, `color` | Card/header image (`/images/...`) and accent colour |
| `seats`, `examTime`, `examType` | Seat count, exam duration, marks / question type |
| `calcAllowed` | Whether calculators are allowed in the exam |
| `subjectsHeading`, `subjects[]`, `subjectsNote` | Subject-wise marks distribution shown on the page |
| `resultFormula` | How the merit list is calculated |
| `eligibilityText` | Human-readable eligibility rules shown on the page |
| `website` | Official admission website |
| `fields[]` | Which GPA inputs the calculator shows (`ssc`, `hsc`, `phy`, `chem`, `hm`, ...) |
| `calc` | Numeric thresholds used by the calculator (`minSsc`, `minHsc`, `minCombined`, `minSubject`, `minNet`, ...) |

Because `/university/[slug]` is a single dynamic route that reads this file, **adding a new university means adding one new entry here** — no new page needed.

### 2. `lib/eligibility.js` — rule logic

`checkEligibility(uniId, vals)` reads `universities[uniId].calc` and returns `true`/`false`. Universities with special rules (e.g. BUET, BUTEX, MIST) have their own branch; everyone else falls through to a default `ssc ≥ minSsc && hsc ≥ minHsc && ssc + hsc ≥ minCombined` check.

### 3. `generalCriteria.js` — the "SSC + HSC only" checker

Simplified thresholds (`minSsc`, `minHsc`, `minCombined`) used by `/general-check`. Universities that need subject-wise GPA are marked `requiresScience: true` and shown separately. `engineeringUniIds` and `medicalUniIds` control how results are grouped.

> **Keep in sync:** if you change a university's GPA requirement in `universities.js`, check whether `generalCriteria.js` needs the same change — they are separate files.

### 4. `examDates.js` — the `/exam-dates` page

```js
{
  id: "sust",
  universityId: "sust",                 // must match a key in universities.js
  universityName: "শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (শাবিপ্রবি)",
  shortName: "SUST",
  category: "engineering",              // "university" | "engineering" | "medical"
  applicationStart: "…",
  applicationEnd: "…",
  schedule: [{ unit: "A", date: "17-18 জানুয়ারি" }],
}
```

- Date format: day in **English digits** + month in **Bangla** (e.g. `11 ডিসেম্বর`).
- Unit names are written in English letters.
- **Order matters:** entries appear in the order they are listed inside each category, so put an entry at the top of its category to show it first.

### 5. `updates.js` — the `/updates` feed

```js
{
  id: "sust-2026-27-schedule",
  title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
  universityId: "sust",                 // must match a key in universities.js
  universityName: "…",
  category: "engineering",              // "versity" | "medical" | "engineering"
  applicationStart: "…",
  applicationEnd: "…",
  schedule: [{ unit: "ভর্তি পরীক্ষা", date: "১৭ ও ১৮ জানুয়ারি" }],
  sourceImage: "/images/sust-exam-date-notice.jpg",   // optional
}
```

- Date format here: Bangla digits and Bangla month.
- Optional `tentative: true` on a schedule row renders that date in blue as "probable, not confirmed".
- Optional `sourceImage` adds a **"View exam date source"** box under the card; tapping the photo opens it full screen with a Back button.
- Each university's detail page automatically shows the exam date from the **first** matching entry in this file.
- **Order matters:** new items go at the top; within a category the file order is the display order.

---

## Common maintenance tasks

### Update an exam date

1. Edit the `schedule` in `src/data/updates.js` (Bangla digits).
2. Edit the same university in `src/data/examDates.js` (English digits).
3. Commit and push — Vercel redeploys automatically.

### Add a notice photo as the source

1. Save the photo as `chance-hobe-ki/public/images/<name>.jpg`.
2. Add `sourceImage: "/images/<name>.jpg"` to that update in `updates.js`.

### Change a university's eligibility rule

1. Update `eligibilityText` and the `calc` numbers in `src/data/universities.js`.
2. If the rule is non-standard, adjust `src/lib/eligibility.js`.
3. Check `src/data/generalCriteria.js` for the same university.

### Add a new university

1. Add a new entry (new slug) to `src/data/universities.js` and put its photo in `public/images/`.
2. Add it to `generalCriteria.js` (and `engineeringUniIds` / `medicalUniIds` if relevant).
3. Add rows to `examDates.js` and `updates.js` when dates are published.
4. The detail page, sitemap entry and static params are generated automatically.

---

## SEO, analytics and ads

- **Metadata:** global defaults in `src/app/layout.js` (title template, description, keywords, Open Graph, Twitter card, canonical URL); each university page generates its own title/description via `generateMetadata`.
- **Sitemap & robots:** generated by `src/app/sitemap.js` and `src/app/robots.js`.
- **Search Console:** verified via the HTML file in `public/`.
- **Analytics:** `@vercel/analytics` and Microsoft Clarity (loaded with `next/script`).
- **Ads:** `public/ads.txt` is used for ad-network verification.
- **PWA basics:** `site.webmanifest` plus favicon and app icons.

---

## Deployment

The site is deployed on **Vercel** straight from this GitHub repository.

1. Push the repo to GitHub.
2. In Vercel, import the repository ([vercel.com/new](https://vercel.com/new)) and set **Root Directory** to `chance-hobe-ki`.
3. Vercel auto-detects Next.js — click **Deploy**.
4. Every push to `main` redeploys automatically, and every pull request gets its own preview URL.

---

## Known limitations

- **Data is manual.** Nothing is fetched from university websites; a person has to read each circular and update the data files.
- **Some university photos are hotlinked** from third-party sites (allowed in `next.config.mjs`). For long-term reliability, download them into `public/images/` — `scripts/download-images.mjs` can do this (run it from the app folder: `node ../scripts/download-images.mjs`).
- **Eligibility is a guide, not a guarantee.** Rules differ per unit and change every year.

---

## Community and contact

- Site email: admissioninfo26@gmail.com
- Developer email: alamnishat456@gmail.com
- Telegram: https://t.me/admissioninfo26
- Facebook: https://www.facebook.com/admissioninfo26

Found a wrong date or requirement? Please report it by email or through the channels above so the data can be corrected.
