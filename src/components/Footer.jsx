import { brand, navigation } from "../data/site";
import Button from "./ui/Button";
import { Icon } from "./ui/Icons";
import Reveal from "./ui/Reveal";

const serviceLinks = [
  "Sourcing Request",
  "Request consolidation",
  "Vendor shortlisting",
  "Vendor register",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-ink-950 text-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 border-b border-cream/10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-20">
          <Reveal>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-label text-clay-400">
              <span aria-hidden="true" className="h-px w-8 bg-clay-400/50" />
              {brand.name}
            </p>
            <h2 className="mt-6 text-balance font-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              {brand.tagline},
              <br />
              <span className="font-serif font-normal italic text-clay-300">
                in one brief.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:justify-self-end lg:text-right">
            <p className="max-w-sm text-sm leading-relaxed text-cream/60 lg:ml-auto">
              Consolidate the request. Compare what actually fits. Decide with
              the reasoning in front of you.
            </p>
            <Button href="#contact" variant="light" size="lg" className="mt-8">
              [Call to Action]
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-cream/5 transition-colors duration-500 group-hover:border-clay-400/70">
                <span className="font-serif text-lg italic text-cream">O</span>
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                Be Best
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              Independent procurement consultancy for small and mid-sized teams.
              One consolidated request, one fit-for-purpose decision.
            </p>

            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Be Best on Instagram"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center border border-cream/15 text-cream/70 transition-colors duration-300 hover:border-clay-400/60 hover:text-clay-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400"
            >
              <Icon name="instagram" className="h-4 w-4" />
            </a>
          </div>

          <nav aria-label="Footer — explore">
            <h3 className="text-[9px] font-semibold uppercase tracking-label text-cream/55">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-cream/65 transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:text-clay-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[9px] font-semibold uppercase tracking-label text-cream/55">
              The service
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    className="text-sm text-cream/65 transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:text-clay-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[9px] font-semibold uppercase tracking-label text-cream/55">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/65">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:text-clay-300"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={brand.phoneHref}
                  className="transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:text-clay-300"
                >
                  {brand.phone}
                </a>
              </li>
              <li className="text-cream/55">{brand.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant wordmark — the quiet signature */}
      <div aria-hidden="true" className="overflow-hidden border-t border-cream/10 px-2 pt-8">
        <p className="select-none text-center font-display text-[13.5vw] font-semibold leading-[0.9] tracking-tight text-cream/10">
          BE&nbsp;BEST
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-4 border-t border-cream/10 py-6 text-[9px] uppercase tracking-wide2 text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Be Best. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Independent procurement consultancy</span>
            <a
              href="#top"
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:text-clay-300"
            >
              Back to top
              <Icon name="arrowUpRight" className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
