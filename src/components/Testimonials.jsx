import { testimonials } from "../data/site";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 bg-ink-900 py-24 text-cream sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          id="testimonials-heading"
          index="04"
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

        <Reveal delay={140}>
          <figure className="mx-auto mt-16 max-w-4xl text-center sm:mt-20">
            <blockquote className="text-balance font-serif text-2xl font-normal leading-[1.35] text-cream/90 sm:text-3xl lg:text-[2.4rem]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-9">
              <p className="font-display text-sm font-semibold tracking-tight text-cream">
                {featured.name}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-wide2 text-cream/55">
                {featured.role}
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 border-t border-cream/10 pt-12 sm:grid-cols-2 sm:gap-12 lg:mt-20">
          {rest.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              as="figure"
              delay={index * 100}
            >
              <blockquote className="text-sm leading-relaxed text-cream/70">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5">
                <p className="font-display text-sm font-semibold text-cream/90">
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
          <p className="mt-14 text-[10px] uppercase tracking-label text-cream/55">
            References available on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}
