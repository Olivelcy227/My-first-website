import { testimonials } from "../data/site";
import { Icon } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink-900 py-20 text-cream sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,111,74,0.14),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="testimonials-heading"
            tone="dark"
            eyebrow="Client words"
            title={
              <>
                The decision holds.
                <br />
                <span className="font-serif font-normal italic text-clay-300">
                  The reasoning lasts.
                </span>
              </>
            }
          />
          <Reveal delay={160} className="lg:pb-2">
            <p className="max-w-sm text-sm leading-relaxed text-cream/55">
              Small teams, shared purchasing, no formal process — the same story in
              different commodities.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              as="figure"
              delay={index * 90}
              className="group flex h-full flex-col justify-between rounded-3xl border border-cream/10 bg-cream/[0.03] p-7 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-clay-400/30 hover:bg-cream/[0.06] sm:p-8"
            >
              <div>
                <Icon
                  name="quote"
                  className="h-7 w-7 text-clay-400/70 transition-colors duration-500 group-hover:text-clay-400"
                />
                <blockquote className="mt-6 text-[0.95rem] leading-relaxed text-cream/75">
                  {testimonial.quote}
                </blockquote>
              </div>

              <figcaption className="mt-8 border-t border-cream/10 pt-5">
                <p className="font-display text-sm font-semibold text-cream">
                  {testimonial.name}
                </p>
                <p className="mt-1.5 text-[9px] uppercase tracking-wide2 text-cream/55">
                  {testimonial.role}
                </p>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-[10px] uppercase tracking-label text-cream/55">
            References available on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}
