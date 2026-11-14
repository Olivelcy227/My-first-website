import { featuredService, services } from "../data/site";
import { Icon } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <SectionHeading
            id="services-heading"
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
              vendors and prices nobody can compare. We take the whole picture and
              return a decision your team can defend.
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

        <Reveal delay={120} className="mt-14">
          <article className="group relative overflow-hidden rounded-4xl bg-ink-900 text-cream shadow-lift">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative z-10 p-7 sm:p-10 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-label text-clay-300">
                  <Icon name="target" className="h-3 w-3" />
                  Core service
                </span>

                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {featuredService.name}
                </h3>
                <p className="mt-2 font-serif text-xl italic text-clay-300 sm:text-2xl">
                  {featuredService.summary}
                </p>

                <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/65">
                  {featuredService.body}
                </p>

                <ul className="mt-7 space-y-3 border-t border-cream/10 pt-6">
                  {featuredService.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-cream/75">
                      <Icon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-clay-400"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#approach"
                  className="group/link mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-label text-cream transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400"
                >
                  How it works
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover/link:translate-x-1"
                  />
                </a>
              </div>

              <div className="relative min-h-[18rem] overflow-hidden lg:min-h-full">
                <img
                  src={featuredService.image.src}
                  alt={featuredService.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-luxe group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink-900/35 mix-blend-multiply"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink-900 lg:via-ink-900/20 lg:to-transparent"
                />
                <p className="absolute bottom-6 right-6 max-w-[13rem] text-right font-serif text-lg italic leading-snug text-cream/85">
                  One brief replaces a dozen threads.
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              as="article"
              delay={index * 70}
              className="group relative rounded-3xl border border-ink/10 bg-white/40 p-6 backdrop-blur-sm transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-clay/30 hover:bg-white hover:shadow-lift sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-cream-50 text-clay-600 transition-colors duration-500 group-hover:border-clay/30 group-hover:bg-clay/5">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <span aria-hidden="true" className="font-serif text-lg italic text-ink/15">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-6 font-display text-base font-semibold tracking-tight text-ink">
                {service.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{service.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
