import { team } from "../data/site";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-24 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <SectionHeading
            id="team-heading"
            eyebrow="The team"
            title={
              <>
                The people you&rsquo;ll{" "}
                <span className="font-serif font-normal italic text-clay-600">
                  actually work with.
                </span>
              </>
            }
          />
          <Reveal delay={140} className="lg:pb-1">
            <p className="max-w-md text-sm leading-relaxed text-ink/60 sm:text-[0.95rem]">
              No account managers, no hand-offs. A small senior team that stays on
              your brief from the first conversation to the final recommendation.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <Reveal
              key={member.name}
              as="article"
              delay={index * 90}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[10rem_10rem_1.75rem_1.75rem] border border-ink/10 bg-cream-200">
                <img
                  src={member.image.src}
                  alt={member.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 ease-luxe group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 bg-ink-950/60 font-serif text-xs italic text-cream backdrop-blur-sm"
                >
                  0{index + 1}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-label text-clay-700">
                  {member.role}
                </p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
                  {member.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
