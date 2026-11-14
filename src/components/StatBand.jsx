import { stats } from "../data/site";
import Counter from "./ui/Counter";
import Reveal from "./ui/Reveal";

export default function StatBand() {
  return (
    <section aria-label="Be Best in numbers" className="border-b border-ink/10 bg-cream">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-16 sm:gap-y-12 lg:grid-cols-4 lg:px-10 lg:py-20">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 90}
            className="flex flex-col-reverse gap-3 border-ink/10 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <dt className="max-w-[12rem] text-[10px] font-medium uppercase leading-relaxed tracking-wide2 text-ink/55">
              {stat.label}
            </dt>
            <dd className="font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
