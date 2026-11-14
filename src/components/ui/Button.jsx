import { cn } from "../../lib/cn";
import { Icon } from "./Icons";

const variants = {
  primary:
    "border border-ink bg-ink text-cream hover:border-clay-700 hover:bg-clay-700",
  light:
    "border border-cream/60 bg-cream text-ink hover:border-cream hover:bg-white",
  outline:
    "border border-ink/25 text-ink hover:border-clay-700 hover:text-clay-700",
  outlineLight:
    "border border-cream/30 text-cream hover:border-clay-400 hover:text-clay-300",
  link: "border-0 px-0 py-0 text-ink hover:text-clay-700",
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
        "group inline-flex items-center justify-center gap-3 font-semibold uppercase tracking-label transition-colors duration-500 ease-luxe",
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
