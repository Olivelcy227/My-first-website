import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

export default function CtaBand() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-ink-900 py-20 text-cream sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,111,74,0.16),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-400/40 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-label text-clay-400">
          <span aria-hidden="true" className="h-px w-8 bg-clay-400/60" />
          A standing invitation
          <span aria-hidden="true" className="h-px w-8 bg-clay-400/60" />
        </Reveal>

        <Reveal delay={90}>
          <h2
            id="cta-heading"
            className="mt-6 text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
          >
            Bring us the request.
            <br />
            <span className="font-serif font-normal italic text-clay-300">
              We&rsquo;ll bring the clarity.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={170}>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
            Tell us what you are buying and who is buying it. We will show you what a
            consolidated, fit-for-purpose decision looks like.
          </p>
        </Reveal>

        <Reveal delay={250} className="mt-9 flex flex-col items-center gap-4">
          <Button href="#contact" variant="light" size="lg">
            [Call to Action]
          </Button>
          <p className="text-[10px] uppercase tracking-label text-cream/55">
            First reply within 48 hours
          </p>
        </Reveal>
      </div>
    </section>
  );
}
