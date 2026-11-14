/**
 * Bug hunt for the Be Best site.
 * Run: node scripts/bug-hunt.mjs   (dev server must be on :5173)
 * Writes bug-report.json and prints a summary.
 */
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const BASE = "http://127.0.0.1:5173/";
const VIEWPORTS = [
  { name: "375", width: 375, height: 667 },
  { name: "768", width: 768, height: 900 },
  { name: "1280", width: 1280, height: 800 },
];

const issues = [];
const passed = [];
const bug = (scope, check, detail, severity = "medium") =>
  issues.push({ severity, scope, check, detail });
const ok = (check, scope = "all") => passed.push(`${scope} :: ${check}`);

const browser = await chromium.launch({ channel: "msedge", headless: true });

/** Collect console/page/network problems for one page. */
function wireDiagnostics(page, scope) {
  const problems = [];
  page.on("console", (msg) => {
    if (msg.type() === "error")
      problems.push({ kind: "console.error", text: msg.text().slice(0, 300) });
  });
  page.on("pageerror", (err) =>
    problems.push({ kind: "pageerror", text: String(err).slice(0, 300) }),
  );
  page.on("requestfailed", (req) => {
    const failure = req.failure()?.errorText || "";
    if (!failure.includes("ERR_ABORTED"))
      problems.push({ kind: "requestfailed", text: `${req.method()} ${req.url()} -> ${failure}` });
  });
  page.on("response", (res) => {
    if (res.status() >= 400)
      problems.push({ kind: "http", text: `${res.status()} ${res.url()}` });
  });
  return () => {
    for (const p of problems)
      bug(scope, p.kind, p.text, p.kind === "http" || p.kind === "requestfailed" ? "high" : "high");
    return problems.length;
  };
}

async function auditStatic(page, scope) {
  const meta = await page.evaluate(() => {
    const dedupe = (arr) => {
      const seen = {};
      return arr.filter((id) => (seen[id] = (seen[id] || 0) + 1) === 2);
    };
    const ids = Array.from(document.querySelectorAll("[id]")).map((el) => el.id);
    const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
      (h) => Number(h.tagName[1]),
    );
    const badAnchors = Array.from(document.querySelectorAll('a[href^="#"]'))
      .map((a) => a.getAttribute("href"))
      .filter((href) => href !== "#" && !document.querySelector(href));
    const unnamed = Array.from(document.querySelectorAll("a,button"))
      .filter((el) => {
        const text = (el.innerText || "").trim();
        return (
          !text &&
          !el.getAttribute("aria-label") &&
          !el.getAttribute("aria-labelledby") &&
          !el.getAttribute("title")
        );
      })
      .map((el) => `${el.tagName.toLowerCase()}${el.className ? "." + el.className.split(" ").slice(0, 2).join(".") : ""}`);
    const unlabeled = Array.from(
      document.querySelectorAll("input:not([type=hidden]),textarea,select"),
    )
      .filter((el) => {
        if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return false;
        if (el.closest("label")) return false;
        const id = el.id;
        return !(id && document.querySelector(`label[for="${CSS.escape(id)}"]`));
      })
      .map((el) => el.id || el.name || el.type);
    const danglingAria = Array.from(
      document.querySelectorAll("[aria-labelledby],[aria-describedby]"),
    )
      .map((el) => [el.getAttribute("aria-labelledby"), el.getAttribute("aria-describedby")])
      .flat()
      .filter(Boolean)
      .filter((ref) => !document.getElementById(ref));
    const overflowOffenders = Array.from(document.querySelectorAll("body *"))
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return (
          r.width > 0 &&
          r.right > window.innerWidth + 1 &&
          getComputedStyle(el).position !== "fixed" &&
          !el.closest("[aria-hidden=true]")
        );
      })
      .slice(0, 5)
      .map((el) => el.tagName.toLowerCase() + "." + String(el.className).split(" ").slice(0, 2).join("."));
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || "",
      lang: document.documentElement.lang,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      hOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      overflowOffenders,
      duplicateIds: dedupe(ids),
      headings,
      badAnchors: [...new Set(badAnchors)],
      unnamed: [...new Set(unnamed)],
      unlabeled,
      danglingAria,
      fontsInter: Array.from(document.fonts).some(
        (f) => f.family.replace(/["']/g, "").split(" ")[0] === "Inter" && f.status === "loaded",
      ),
      fontsManrope: Array.from(document.fonts).some(
        (f) => f.family.replace(/["']/g, "").split(" ")[0] === "Manrope" && f.status === "loaded",
      ),
      viteOverlay: Boolean(document.querySelector("vite-error-overlay")),
    };
  });

  if (!meta.title.trim()) bug(scope, "seo/title", "Missing <title>");
  else ok("title present", scope);
  if (!meta.description.trim()) bug(scope, "seo/description", "Missing meta description");
  else ok("meta description", scope);
  if (!meta.lang) bug(scope, "a11y/lang", "Missing html lang");
  else ok(`lang=${meta.lang}`, scope);
  if (meta.viteOverlay) bug(scope, "build", "Vite error overlay visible", "high");
  if (!meta.fontsInter || !meta.fontsManrope)
    bug(scope, "fonts", `Inter=${meta.fontsInter} Manrope=${meta.fontsManrope} not loaded`);
  else ok("Inter + Manrope loaded", scope);
  if (meta.scrollBehavior !== "smooth")
    bug(scope, "ux/smooth-scroll", `scroll-behavior is "${meta.scrollBehavior}"`);
  else ok("smooth scrolling", scope);
  if (meta.duplicateIds.length)
    bug(scope, "html/duplicate-ids", `Duplicate id(s): ${meta.duplicateIds.join(", ")}`, "high");
  else ok("unique ids", scope);
  if (meta.headings[0] !== 1) bug(scope, "a11y/headings", `First heading is h${meta.headings[0]}`);
  let skips = [];
  for (let i = 1; i < meta.headings.length; i++)
    if (meta.headings[i] - meta.headings[i - 1] > 1) skips.push(`h${meta.headings[i - 1]}->h${meta.headings[i]}`);
  if (skips.length) bug(scope, "a11y/headings", `Skipped levels: ${skips.join(", ")}`);
  else ok("heading order", scope);
  if (meta.badAnchors.length)
    bug(scope, "links/broken-anchors", `No target for: ${meta.badAnchors.join(", ")}`, "high");
  else ok("all #anchors resolve", scope);
  if (meta.unnamed.length)
    bug(scope, "a11y/unnamed-controls", meta.unnamed.join(", "));
  else ok("all controls named", scope);
  if (meta.unlabeled.length)
    bug(scope, "a11y/unlabeled-inputs", meta.unlabeled.join(", "), "high");
  else ok("all inputs labeled", scope);
  if (meta.danglingAria.length)
    bug(scope, "a11y/dangling-aria-refs", meta.danglingAria.join(", "));
  else ok("aria refs resolve", scope);
  if (meta.hOverflow)
    bug(scope, "layout/horizontal-overflow", `scrollWidth > viewport; offenders: ${meta.overflowOffenders.join(" | ") || "root"}`, "high");
  else ok(`no horizontal overflow @${scope}px`, scope);
  return meta;
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(1400);
}

async function checkImages(page, scope) {
  await scrollThrough(page);
  const broken = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.getAttribute("src")),
  );
  const noAlt = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => (img.getAttribute("alt") || "").trim() === "" && img.getAttribute("role") !== "presentation")
      .map((img) => img.getAttribute("src")),
  );
  if (broken.length) bug(scope, "images/broken", broken.join(" | "), "high");
  else ok("all images load", scope);
  if (noAlt.length) bug(scope, "a11y/missing-alt", noAlt.join(" | "));
  else ok("all images have alt", scope);
}

async function checkCounters(page, scope) {
  await page.evaluate(() => document.querySelector("dl")?.scrollIntoView({ behavior: "instant", block: "center" }));
  const EXPECTED = ["120+", "28", "48h", "100%"];
  const read = () =>
    page.evaluate(() =>
      Array.from(document.querySelectorAll("dd [data-counter-display]")).map((s) => s.textContent),
    );
  const settled = await page
    .waitForFunction(
      (expected) => {
        const values = Array.from(document.querySelectorAll("dd [data-counter-display]")).map(
          (s) => s.textContent,
        );
        return JSON.stringify(values) === JSON.stringify(expected);
      },
      EXPECTED,
      { timeout: 6000 },
    )
    .then(() => true)
    .catch(() => false);
  if (!settled) bug(scope, "counters", `Counters stuck at ${(await read()).join(" ")} instead of ${EXPECTED.join(" ")}`);
  else ok(`counters settle at ${(await read()).join(" ")}`, scope);
}

async function checkStickyNav(page, scope) {
  const atTop = await page.evaluate(() => document.querySelector("header").className);
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
  await page.waitForTimeout(700);
  const scrolled = await page.evaluate(() => document.querySelector("header").className);
  if (atTop === scrolled || !scrolled.includes("bg-ink-950/95"))
    bug(scope, "nav/condense", `Header class unchanged on scroll:\n  top: ${atTop}\n  scrolled: ${scrolled}`);
  else ok("header condenses on scroll", scope);
}

async function checkReveals(page, scope) {
  await scrollThrough(page);
  const hidden = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll(".transition-all")).filter(
        (el) => parseFloat(getComputedStyle(el).opacity) < 0.8,
      ).length,
  );
  if (hidden > 0) bug(scope, "reveal/stuck-hidden", `${hidden} reveal elements still invisible after full scroll`);
  else ok("all reveals became visible", scope);
}

async function checkNavClicks(page, scope) {
  const links = await page.$$eval('header nav[aria-label="Primary"] a', (as) =>
    as.map((a) => ({ href: a.getAttribute("href"), label: a.textContent.trim() })),
  );
  for (const link of links) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.click(`header nav[aria-label="Primary"] a[href="${link.href}"]`);
    await page.waitForTimeout(1300);
    const landed = await page.evaluate((href) => {
      const el = document.querySelector(href);
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top), scrollY: Math.round(window.scrollY) };
    }, link.href);
    if (landed.scrollY === 0 || landed.top < -10 || landed.top > 220)
      bug(scope, "nav/anchor-landing", `"${link.label}" lands with section top=${landed.top}px, scrollY=${landed.scrollY}`);
    else ok(`nav "${link.label}" lands correctly (top=${landed.top}px)`, scope);
  }
}

async function testMobileMenu(page, scope) {
  const toggle = page.locator('button[aria-controls="mobile-menu"]');
  await toggle.click();
  const opened = await page
    .waitForFunction(() => {
      const m = document.getElementById("mobile-menu");
      return parseFloat(getComputedStyle(m).opacity) > 0.9 && !m.inert;
    })
    .then(() => true)
    .catch(() => false);
  if (!opened) bug(scope, "menu/open", "Mobile menu did not open", "high");
  else ok("mobile menu opens", scope);

  const locked = await page.evaluate(() => document.body.style.overflow);
  if (locked !== "hidden") bug(scope, "menu/scroll-lock", `body overflow="${locked}" while menu open`);
  else ok("background scroll locked", scope);

  // Escape closes and restores focus + scroll
  await page.keyboard.press("Escape");
  const closed = await page
    .waitForFunction(
      () =>
        document.getElementById("mobile-menu").classList.contains("opacity-0") &&
        document.body.style.overflow !== "hidden",
    )
    .then(() => true)
    .catch(() => false);
  if (!closed) bug(scope, "menu/escape", "Escape did not close menu / restore scroll", "high");
  else ok("Escape closes menu + scroll restored", scope);

  const focusBack = await page.evaluate(
    () => document.activeElement === document.querySelector('button[aria-controls="mobile-menu"]'),
  );
  if (!focusBack) bug(scope, "menu/focus-return", "Focus not returned to toggle after Escape");
  else ok("focus returns to toggle", scope);

  // Link click navigates + closes
  await toggle.click();
  await page.waitForFunction(() => !document.getElementById("mobile-menu").inert);
  await page.click('#mobile-menu a[href="#approach"]');
  await page.waitForTimeout(1300);
  const after = await page.evaluate(() => ({
    menuClosed: document.getElementById("mobile-menu").classList.contains("opacity-0"),
    approachTop: Math.round(document.getElementById("approach").getBoundingClientRect().top),
    scrollY: Math.round(window.scrollY),
  }));
  if (!after.menuClosed || after.scrollY === 0)
    bug(scope, "menu/link", `Menu link failed: closed=${after.menuClosed} scrollY=${after.scrollY}`);
  else ok("menu link closes menu and navigates", scope);
}

async function testForm(page, scope) {
  const submit = 'form button[type="submit"]';
  await page.evaluate(() => document.getElementById("contact").scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(1300);

  // 1. empty submit -> errors + focus management
  await page.click(submit);
  const err1 = await page
    .waitForFunction(() => document.querySelectorAll('[id$="-error"]').length >= 4)
    .then(() => true)
    .catch(() => false);
  if (!err1) bug(scope, "form/empty-submit", "Expected 4 inline errors on empty submit", "high");
  else ok("empty submit shows 4 errors", scope);
  const focused = await page.evaluate(() => document.activeElement?.id);
  if (focused !== "name") bug(scope, "form/focus", `Focus after invalid submit is "${focused}", expected "name"`);
  else ok("focus moves to first invalid field", scope);

  // 2. bad email kept as error, others clear on input
  const fill = (id, v) =>
    page.evaluate(
      ([id, v]) => {
        const el = document.getElementById(id);
        const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, "value").set.call(el, v);
        el.dispatchEvent(new Event("input", { bubbles: true }));
      },
      [id, v],
    );
  await fill("name", "Alex Morgan");
  await fill("email", "not-an-email");
  await fill("message", "We buy packaging across three sites with no shared contract.");
  await page.locator("#consent").check();
  await page.click(submit);
  await page.waitForTimeout(300);
  const emailErr = await page.evaluate(() => Boolean(document.getElementById("email-error")));
  const otherErrs = await page.evaluate(
    () =>
      Boolean(document.getElementById("name-error")) ||
      Boolean(document.getElementById("message-error")) ||
      Boolean(document.getElementById("consent-error")),
  );
  if (!emailErr) bug(scope, "form/email-validation", "Invalid email did not produce an error");
  else ok("invalid email rejected", scope);
  if (otherErrs) bug(scope, "form/error-clearing", "Errors not cleared for corrected fields");
  else ok("corrected fields clear their errors", scope);

  // 3. valid submit -> success panel
  await fill("email", "alex@northlinefoods.co.uk");
  await page.click(submit);
  const success = await page
    .waitForFunction(() => document.body.textContent.includes("Your request is with us."), null, { timeout: 6000 })
    .then(() => true)
    .catch(() => false);
  if (!success) bug(scope, "form/success", "Success state did not appear after valid submit", "high");
  else ok("valid submit shows success panel", scope);

  // 4. reset
  await page.getByRole("button", { name: "Send another request" }).click();
  const reset = await page.evaluate(() => ({
    form: Boolean(document.querySelector("form")),
    name: document.getElementById("name")?.value ?? "(gone)",
  }));
  if (!reset.form || reset.name !== "")
    bug(scope, "form/reset", `Reset failed: form=${reset.form}, name="${reset.name}"`);
  else ok("reset restores empty form", scope);
}

async function testSkipLink(page, scope) {
  // Fresh load = the real-world moment a user first presses Tab
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const onSkip = await page.evaluate(() => document.activeElement?.textContent?.includes("Skip to content"));
  if (!onSkip) bug(scope, "a11y/skip-link", "First Tab does not focus the skip link");
  else {
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    const inMain = await page.evaluate(() => {
      const el = document.activeElement;
      return el && (el.id === "main" || !!el.closest("#main"));
    });
    if (!inMain) {
      const landedTag = await page.evaluate(() => document.activeElement?.tagName);
      bug(scope, "a11y/skip-link", `Skip link lands on <${landedTag}>, expected inside #main`);
    } else ok("skip link works", scope);
  }
}

async function externalLinks(page, scope) {
  const urls = await page.$$eval("a[href^='http']", (as) => [
    ...new Set(as.map((a) => a.getAttribute("href"))),
  ]);
  const externalTargets = await page.$$eval("a[target=_blank]", (as) =>
    as.every((a) => (a.getAttribute("rel") || "").includes("noopener")),
  );
  if (!externalTargets) bug(scope, "security/target-blank", "target=_blank without rel=noopener");
  else ok("target=_blank has rel=noopener", scope);
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (res.status >= 400) bug(scope, "links/external", `${res.status} on ${url}`, "high");
      else ok(`external OK ${res.status} ${url.slice(0, 60)}`, scope);
    } catch (e) {
      bug(scope, "links/external", `fetch failed ${url}: ${e.cause?.code || e.message}`, "high");
    }
  }
}

// ---------- run ----------
for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    hasTouch: vp.width < 500,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const flush = wireDiagnostics(page, vp.name);
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  await auditStatic(page, vp.name);
  await checkImages(page, vp.name);
  await checkReveals(page, vp.name);
  await checkStickyNav(page, vp.name);
  if (vp.width >= 1024) {
    await checkNavClicks(page, vp.name);
    await externalLinks(page, vp.name);
  }
  if (vp.width < 768) {
    await checkCounters(page, vp.name);
    await testMobileMenu(page, vp.name);
    await testForm(page, vp.name);
    await testSkipLink(page, vp.name);
  }
  flush();
  await context.close();
}

// ---------- reduced motion ----------
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const flush = wireDiagnostics(page, "reduced-motion");
  await page.goto(BASE, { waitUntil: "networkidle" });
  const state = await page.evaluate(() => {
    const hero = document.getElementById("hero-heading").closest(".transition-all");
    const counters = Array.from(document.querySelectorAll("dd [aria-hidden=true]")).map((s) => s.textContent);
    return { heroOpacity: getComputedStyle(hero).opacity, countersBeforeScroll: counters };
  });
  if (parseFloat(state.heroOpacity) < 0.95)
    bug("reduced-motion", "reveal/instant", `Hero hidden without scroll (opacity=${state.heroOpacity})`);
  else ok("hero visible immediately under reduced motion", "reduced-motion");
  await page.evaluate(() => document.querySelector("dl")?.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.waitForTimeout(400);
  const countersAfter = await page.evaluate(() =>
    Array.from(document.querySelectorAll("dd [data-counter-display]")).map((s) => s.textContent),
  );
  const expected = ["120+", "28", "48h", "100%"];
  if (JSON.stringify(countersAfter) !== JSON.stringify(expected))
    bug("reduced-motion", "counter/instant", `Counters show ${countersAfter.join(" ")} instead of ${expected.join(" ")}`);
  else ok("counters jump to final values instantly", "reduced-motion");
  flush();
  await context.close();
}

await browser.close();

// ---------- report ----------
const order = { high: 0, medium: 1, low: 2 };
issues.sort((a, b) => order[a.severity] - order[b.severity]);
writeFileSync("bug-report.json", JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE, issues, checksPassed: passed.length }, null, 2));

console.log("\n========== BUG HUNT REPORT ==========");
console.log(`Checks passed: ${passed.length}`);
console.log(`Issues found:  ${issues.length}\n`);
for (const i of issues)
  console.log(`[${i.severity.toUpperCase()}] (${i.scope}) ${i.check}\n   ${i.detail.replace(/\n/g, "\n   ")}\n`);
if (!issues.length) console.log("No issues found. 🎉");
console.log("Full report: bug-report.json");
process.exit(0);
