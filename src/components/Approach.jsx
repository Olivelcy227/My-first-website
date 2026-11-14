import { approach } from "../data/site";
import { Icon } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="scroll-mt-24 bg-cream-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          id="approach-heading"
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

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="relative lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-4xl border border-ink/10 shadow-lift">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
                alt="Pallets of stock lining a warehouse aisle, ready for dispatch"
                loading="lazy"
                decoding="async"
                className="h-[22rem] w-full object-cover grayscale transition duration-700 ease-luxe hover:grayscale-0 sm:h-[26rem] lg:h-[30rem]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-cream/15 bg-ink-950/75 p-5 backdrop-blur-md">
                <p className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-label text-clay-400">
                  <Icon name="clock" className="h-3 w-3" />
                  Typical engagement
                </p>
                <p className="mt-2 font-display text-lg font-medium text-cream">
                  One brief to one award, in three to six weeks.
                </p>
              </div>
            </div>
          </Reveal>

          <ol className="relative">
            {approach.map((step, index) => (
              <li key={step.title} className="border-t border-ink/10 last:border-b">
                <Reveal
                  delay={index * 80}
                  className="group grid grid-cols-[auto_1fr] gap-5 py-7 sm:gap-8 sm:py-8"
                >
                  <span className="font-serif text-xl italic text-clay-600/80 sm:text-2xl">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-clay-700 sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink/60">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
