import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

export default function CtaBand() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="border-b border-ink/10 bg-cream-50 py-20 text-center sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-label text-clay-700">
          <span aria-hidden="true" className="h-px w-8 bg-clay-700/40" />
          A standing invitation
          <span aria-hidden="true" className="h-px w-8 bg-clay-700/40" />
        </Reveal>

        <Reveal delay={90}>
          <h2
            id="cta-heading"
            className="mt-7 text-balance font-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-5xl"
          >
            Bring us the request.{" "}
            <span className="font-serif font-normal italic text-clay-600">
              We&rsquo;ll bring the clarity.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={170}>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
            Tell us what you are buying and who is buying it. We will show you
            what a consolidated, fit-for-purpose decision looks like.
          </p>
        </Reveal>

        <Reveal delay={250} className="mt-10 flex flex-col items-center gap-4">
          <Button href="#contact" variant="primary" size="lg">
            [Call to Action]
          </Button>
          <p className="text-[10px] uppercase tracking-label text-ink/45">
            First reply within 48 hours
          </p>
        </Reveal>
      </div>
    </section>
  );
}
