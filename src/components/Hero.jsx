import { brand } from "../data/site";
import Button from "./ui/Button";
import { Icon } from "./ui/Icons";
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
      className="relative isolate overflow-hidden bg-ink-900 text-cream"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,111,74,0.22),transparent_65%)] blur-2xl" />
        <div className="absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(246,241,234,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(246,241,234,0.08)_1px,transparent_1px)] [background-size:26px_26px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-44">
        <div>
          <Reveal className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-label text-clay-400">
            <span aria-hidden="true" className="h-px w-10 bg-clay-400/60" />
            {brand.tagline}
          </Reveal>

          <Reveal delay={100}>
            <h1
              id="hero-heading"
              className="mt-7 text-balance font-display text-[2.7rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.15rem]"
            >
              Procurement,
              <br />
              <span className="font-serif text-[1.04em] font-normal italic text-clay-300">
                decided well.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={190}>
            <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-lg">
              Be Best is the procurement partner for growing businesses without a
              dedicated purchasing team. We consolidate every sourcing request into
              one brief — then identify the fit-for-purpose solution for your
              commodity.
            </p>
          </Reveal>

          <Reveal delay={280} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact" variant="light" size="lg">
              [Call to Action]
            </Button>
            <Button href="#services" variant="outlineLight" size="lg" withArrow={false}>
              See the service
            </Button>
          </Reveal>

          <Reveal delay={360}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[11px] text-cream/55"
                >
                  <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-clay-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={220} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[15rem_15rem_2.75rem_2.75rem] border border-cream/10 sm:-inset-4"
          />
          <div className="relative overflow-hidden rounded-[15rem_15rem_2.25rem_2.25rem] border border-cream/15 bg-ink-800 shadow-glow">
            <img
              src="/images/procurement.jpg"
              alt="Procurement symbols for logistics, quality, inventory and contracts arranged around a map pin held above a smartphone"
              width="2020"
              height="1233"
              fetchPriority="high"
              className="h-[25rem] w-full object-cover grayscale contrast-110 sm:h-[29rem] lg:h-[33rem]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-ink-900/45 mix-blend-multiply"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-clay/15 mix-blend-soft-light"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-cream/15 bg-ink-950/80 p-5 backdrop-blur-md sm:left-auto sm:w-64">
              <p className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-label text-clay-400">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-clay-400" />
                Sourcing Request
              </p>
              <p className="mt-2 font-display text-[15px] font-medium leading-snug text-cream">
                Consolidated. Evaluated.
                <br />
                Recommended.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -right-2 top-10 hidden h-24 w-24 rotate-6 flex-col items-center justify-center rounded-full border border-dashed border-clay-400/40 bg-ink-950/70 backdrop-blur-sm sm:flex"
          >
            <span className="font-serif text-3xl italic leading-none text-clay-300">O</span>
            <span className="mt-1.5 text-[7px] font-medium uppercase tracking-label text-cream/55">
              Procurement
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
