import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/cn";

/**
 * Fades and lifts its children into place once they enter the viewport.
 * Motion is skipped automatically for visitors who prefer reduced motion.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[900ms] ease-luxe motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
