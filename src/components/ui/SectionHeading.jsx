import { cn } from "../../lib/cn";
import Reveal from "./Reveal";

export default function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal
          className={cn(
            "flex items-center gap-3 text-[10px] font-semibold uppercase tracking-label",
            dark ? "text-clay-400" : "text-clay-700",
            centered && "justify-center",
          )}
        >
          {index && <span aria-hidden="true">{index}</span>}
          <span
            aria-hidden="true"
            className={cn("h-px w-8", dark ? "bg-clay-400/50" : "bg-clay-700/40")}
          />
          {eyebrow}
        </Reveal>
      )}

      <Reveal delay={90}>
        <h2
          id={id}
          className={cn(
            "mt-6 text-balance font-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.7rem]",
            dark ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={170}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-[0.95rem] leading-relaxed sm:text-base",
              dark ? "text-cream/60" : "text-ink/60",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
