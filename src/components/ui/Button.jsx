import { cn } from "../../lib/cn";
import { Icon } from "./Icons";

const variants = {
  primary:
    "bg-ink text-cream shadow-lift hover:-translate-y-0.5 hover:bg-ink-900 hover:shadow-[0_28px_50px_-24px_rgba(46,42,38,0.6)]",
  light:
    "bg-cream text-ink shadow-lift hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_28px_50px_-26px_rgba(0,0,0,0.5)]",
  outline:
    "border border-ink/20 text-ink hover:border-clay hover:bg-clay/5 hover:text-clay-700",
  outlineLight:
    "border border-cream/25 text-cream hover:border-clay-400 hover:bg-cream/5 hover:text-clay-300",
  link: "px-0 py-0 text-ink hover:text-clay-700",
};

const sizes = {
  sm: "px-5 py-2.5 text-[10px]",
  md: "px-7 py-3.5 text-[11px]",
  lg: "px-8 py-4 text-xs",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  withArrow = true,
  className,
  ...rest
}) {
  const Tag = href ? "a" : "button";
  const isLink = variant === "link";

  return (
    <Tag
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full font-semibold uppercase tracking-label transition-all duration-500 ease-luxe",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-0",
        "disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        !isLink && sizes[size],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {withArrow && (
        <Icon
          name="arrowRight"
          className="h-4 w-4 shrink-0 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
        />
      )}
    </Tag>
  );
}
