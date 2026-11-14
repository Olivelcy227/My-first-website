import { featuredService, services } from "../data/site";
import { Icon } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Services() {
  return (
    <>
      <section
        id="services"
        aria-labelledby="services-heading"
        className="scroll-mt-24 bg-cream py-24 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <SectionHeading
              id="services-heading"
              index="01"
              eyebrow="The offering"
              title={
                <>
                  One service, run{" "}
                  <span className="font-serif font-normal italic text-clay-600">
                    properly.
                  </span>
                </>
              }
            />

            <Reveal delay={140} className="lg:pb-1">
              <p className="max-w-md text-sm leading-relaxed text-ink/60 sm:text-[0.95rem]">
                Decentralised buying creates duplicate requests, inconsistent
                vendors and prices nobody can compare. We take the whole picture
                and return a decision your team can defend.
              </p>
              <a
                href="#contact"
                className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-label text-clay-700 transition-colors duration-300 hover:text-clay-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400"
              >
                Start a sourcing request
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>

          <ul className="mt-16 border-t border-ink/10 sm:mt-20">
            {services.map((service, index) => (
              <Reveal
                key={service.title}
                as="li"
                delay={index * 60}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-ink/10 py-7 sm:grid-cols-[72px_minmax(0,20rem)_1fr] sm:gap-x-10 sm:py-9"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-xl italic text-clay-600/80"
                >
                  0{index + 1}
                </span>
                <h3 className="font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
                  {service.title}
                </h3>
                <p className="col-span-2 text-sm leading-relaxed text-ink/60 sm:col-span-1">
                  {service.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Core service — one quiet, full-bleed dark band */}
      <section
        aria-labelledby="featured-service-heading"
        className="relative isolate overflow-hidden bg-ink-900 text-cream"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative order-2 min-h-[18rem] lg:order-1 lg:min-h-[38rem]">
            <img
              src={featuredService.image.src}
              alt={featuredService.image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-luxe hover:scale-[1.02] hover:grayscale-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-ink-900/35 mix-blend-multiply"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink-900 lg:via-ink-900/25 lg:to-transparent"
            />
            <p className="absolute bottom-8 right-8 hidden max-w-[14rem] text-right font-serif text-xl italic leading-snug text-cream/85 sm:block">
              {featuredService.summary}
            </p>
          </div>

          <div className="relative order-1 flex flex-col justify-center p-7 sm:p-12 lg:order-2 lg:p-20">
            <Reveal className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-label text-clay-400">
              <span aria-hidden="true">02</span>
              <span aria-hidden="true" className="h-px w-8 bg-clay-400/50" />
              Core service
            </Reveal>

            <Reveal delay={90}>
              <h2
                id="featured-service-heading"
                className="mt-6 font-display text-3xl font-medium tracking-tight sm:text-4xl"
              >
                {featuredService.name}
              </h2>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/65 sm:text-[0.95rem]">
                {featuredService.body}
              </p>
            </Reveal>

            <Reveal delay={250}>
              <ul className="mt-9 border-t border-cream/10">
                {featuredService.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-4 border-b border-cream/10 py-3.5 text-sm text-cream/75"
                  >
                    <span aria-hidden="true" className="text-clay-400">
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={330}>
              <a
                href="#approach"
                className="group mt-10 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-label text-cream transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400"
              >
                How it works
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
