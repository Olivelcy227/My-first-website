import { brand } from "../data/site";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

const assurances = [
  "Independent advice, no supplier commissions",
  "Senior consultant from brief to award",
  "One consolidated request, one clear call",
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden border-b border-ink/10 bg-cream"
    >
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-28 pt-36 text-center lg:pt-44">
        <Reveal className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-label text-clay-700">
          <span aria-hidden="true" className="h-px w-10 bg-clay-700/40" />
          {brand.tagline}
          <span aria-hidden="true" className="h-px w-10 bg-clay-700/40" />
        </Reveal>

        <Reveal delay={100}>
          <h1
            id="hero-heading"
            className="mt-9 text-balance font-display text-[2.9rem] font-medium leading-[1.04] tracking-tight text-ink sm:text-7xl lg:text-[5.4rem]"
          >
            Procurement,{" "}
            <span className="font-serif font-normal italic text-clay-600">
              decided well.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={190}>
          <p className="mx-auto mt-8 max-w-2xl text-[0.98rem] leading-relaxed text-ink/60 sm:text-lg">
            Be Best consolidates every sourcing request into one brief — then
            identifies the fit-for-purpose solution for your commodity.
          </p>
        </Reveal>

        <Reveal delay={280} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#contact" variant="primary" size="lg">
            [Call to Action]
          </Button>
          <Button href="#services" variant="outline" size="lg" withArrow={false}>
            See the service
          </Button>
        </Reveal>

        <Reveal delay={380}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-ink/60">
            {assurances.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-clay-500/70" />
                )}
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Stage one of the sourcing cycle — the consolidated brief */}
        <Reveal delay={460} className="mt-16 w-full">
          <div className="relative overflow-hidden border border-ink/10">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80"
              alt="A consultant's desk with planning documents, supplier quotes and comparison charts being marked up"
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover grayscale contrast-110 transition-transform duration-700 ease-luxe hover:scale-[1.02] sm:h-72 lg:h-80"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-clay/10 mix-blend-soft-light"
            />
          </div>
          <p className="mt-3 text-[9px] uppercase tracking-label text-ink/45">
            Stage 01 — Requirements, quotes and criteria, consolidated into one brief
          </p>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-ink/40"
      />
    </section>
  );
}
