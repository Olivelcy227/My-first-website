# Be Best — single-page website

> **Your best choice of life.** Procurement consultancy for SMEs: one consolidated
> sourcing request, one fit-for-purpose recommendation.

Production-ready single-page site built with **React 19 + Vite + Tailwind CSS 3**
(functional components and hooks only, utility classes only — no custom CSS beyond
the three Tailwind directives).

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build locally
```

## Structure

```
index.html                  meta tags, Open Graph, JSON-LD, Google Fonts
public/                     favicon, hero image, robots.txt, sitemap.xml
src/
  main.jsx                  entry
  App.jsx                   page composition + skip link
  index.css                 @tailwind directives only
  data/site.js              all copy & content in one place
  hooks/                    useInView, usePrefersReducedMotion
  lib/cn.js                 className helper
  components/
    Navbar.jsx              sticky nav, condenses on scroll, mobile overlay menu
    Hero.jsx                dark hero, headline, CTAs, arch image + badge
    StatBand.jsx            animated counters
    Services.jsx            featured Sourcing Request card + capability grid
    CtaBand.jsx             mid-page call to action
    Approach.jsx            4-step process with sticky image panel
    Testimonials.jsx        client quotes (dark section)
    Team.jsx                portraits + bios
    Contact.jsx             contact details + form card
    SourcingForm.jsx        validated form with error & success states
    Footer.jsx              CTA banner, link columns, contact
    ui/                     Button, Reveal, SectionHeading, Counter, Icons
responsive-check.html       dev-only harness to preview fixed widths (?w=375|768|1280)
```

## Design system

- **Palette** — cream `#F6F1EA`, ink `#2E2A26` (+950 `#171512`), clay accent
  `#C96F4A`. All text pairs verified at ≥ 4.5:1 (Lighthouse accessibility 100).
- **Type** — Inter (headings), Manrope (body), Cormorant Garamond (serif accents),
  via Google Fonts.
- **Motion** — slow scroll reveals (`Reveal`), counters, hover micro-interactions;
  everything respects `prefers-reduced-motion`.

## Things to replace before going live

- **Contact details** (`src/data/site.js`) — email, phone, Instagram URL/handle
  are placeholders.
- **Copy claims** — the stat counters (120+, 28, 48h, 100%) and testimonials/team
  are illustrative; swap in real figures, quotes and portraits.
- **Form backend** — `SourcingForm.jsx` simulates a submission. Wire
  `handleSubmit` to your CRM / email endpoint.
- **Domain** — update `canonical`, Open Graph URLs, JSON-LD, `robots.txt` and
  `sitemap.xml` from `bebest.co` to the real domain.
- **Hero image** — the supplied Google Lens link in the brief is a session URL and
  cannot be embedded; the local `public/images/procurement.jpg` (from the
  project's `Image` folder) is used instead. Team/service photos are loaded from
  Unsplash — self-host them for production if you prefer.
