/**
 * Screenshot tour of the Be Best site with Playwright.
 * Run (dev server on :5173):   node scripts/screenshots.mjs
 * Output:                      screenshots/*.png
 *
 * Techniques demonstrated:
 *  1. viewport screenshot            page.screenshot({ path })
 *  2. full-page screenshot           page.screenshot({ fullPage: true })
 *  3. element screenshot             locator.screenshot()
 *  4. clipped screenshot             page.screenshot({ clip })
 *  5. device emulation               viewport, deviceScaleFactor, isMobile, hasTouch
 *  6. stable captures                reducedMotion, fonts.ready, scroll for lazy images
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = "http://127.0.0.1:5173/";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });

/**
 * Load the page in a fully "settled" state:
 * - wait for network + web fonts
 * - scroll through the page so loading="lazy" images fetch and scroll
 *   reveals fire (IntersectionObserver needs real scrolling)
 * - return to top so sticky-header screenshots look right
 */
async function settle(page, { reduced = false } = {}) {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  // give reveal transitions (900ms) and counters (1.6s) room to finish
  await page.waitForTimeout(reduced ? 300 : 1800);
}

// ── 1+2. Desktop full page — reducedMotion makes all reveals instant ──
{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await settle(page, { reduced: true });
  await page.screenshot({ path: `${OUT}/desktop-1280-full.png`, fullPage: true });
  console.log("✓ desktop-1280-full.png");
  await ctx.close();
}

// ── Tablet full page ──
{
  const ctx = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await settle(page, { reduced: true });
  await page.screenshot({ path: `${OUT}/tablet-768-full.png`, fullPage: true });
  console.log("✓ tablet-768-full.png");
  await ctx.close();
}

// ── 5. Mobile emulation: viewport, full page, and open menu ──
{
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2, // crisp retina-style output (2x pixels)
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await settle(page);

  // viewport-only shot (what a visitor actually sees on load)
  await page.screenshot({ path: `${OUT}/mobile-375-hero.png` });
  console.log("✓ mobile-375-hero.png");

  await page.screenshot({ path: `${OUT}/mobile-375-full.png`, fullPage: true });
  console.log("✓ mobile-375-full.png");

  // interaction state: open the overlay menu, then capture
  await page.click('button[aria-controls="mobile-menu"]');
  await page.waitForFunction(() =>
    parseFloat(getComputedStyle(document.getElementById("mobile-menu")).opacity) > 0.95,
  );
  await page.screenshot({ path: `${OUT}/mobile-375-menu.png` });
  console.log("✓ mobile-375-menu.png");
  await ctx.close();
}

// ── 3+4. Element shots and a clipped region ──
{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await settle(page, { reduced: true });

  // just the sticky header
  await page.locator("header").screenshot({ path: `${OUT}/element-header.png` });
  // just the featured service card
  await page.locator("#services article").first().screenshot({
    path: `${OUT}/element-service-card.png`,
  });
  // arbitrary region of the viewport
  await page.screenshot({
    path: `${OUT}/hero-clip.png`,
    clip: { x: 0, y: 0, width: 1280, height: 620 },
  });
  console.log("✓ element-header.png, element-service-card.png, hero-clip.png");
  await ctx.close();
}

await browser.close();
console.log(`\nAll screenshots saved to ./${OUT}/`);
