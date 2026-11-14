import { approach } from "../data/site";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="scroll-mt-24 bg-cream py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="approach-heading"
              index="03"
              eyebrow="The approach"
              title={
                <>
                  A quiet, structured path to a{" "}
                  <span className="font-serif font-normal italic text-clay-600">
                    confident decision.
                  </span>
                </>
              }
              description="Four deliberate steps, one senior consultant. You always know which request is where — and why the recommendation is the right one for your business."
            />
          </div>

          <ol className="relative border-t border-ink/10">
            {approach.map((step, index) => (
              <li key={step.title} className="border-b border-ink/10">
                <Reveal
                  delay={index * 80}
                  className="group grid grid-cols-[auto_1fr] gap-6 py-9 sm:gap-10"
                >
                  <span className="font-serif text-2xl italic text-clay-600/80 sm:text-3xl">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-clay-700">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/60">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Later in the sourcing cycle — award, delivery and the live register */}
        <Reveal delay={120} className="mt-14 lg:mt-16">
          <div className="relative overflow-hidden border border-ink/10">
            <img
              src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=80"
              alt="Shelves of stock stacked in a supplier warehouse after a purchase award, ready for dispatch"
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
            Stage 02 — After award: suppliers, renewals and performance in one register
          </p>
        </Reveal>
      </div>
    </section>
  );
}
