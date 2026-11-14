import { team } from "../data/site";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-24 bg-cream py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <SectionHeading
            id="team-heading"
            index="05"
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
              No account managers, no hand-offs. A small senior team that stays
              on your brief from the first conversation to the final
              recommendation.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <Reveal key={member.name} as="article" delay={index * 90} className="group">
              <div className="overflow-hidden rounded-[10rem_10rem_1.5rem_1.5rem] border border-ink/10">
                <img
                  src={member.image.src}
                  alt={member.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 ease-luxe group-hover:scale-[1.02] group-hover:grayscale-0"
                />
              </div>

              <div className="mt-6 border-t border-ink/10 pt-5">
                <h3 className="font-display text-lg font-medium tracking-tight text-ink">
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
