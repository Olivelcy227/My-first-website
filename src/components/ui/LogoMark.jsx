/**
 * Luxury monogram badge — a serif italic "O" set inside fine concentric
 * rings with a diamond accent at the crown (Cartier-style seal).
 * Decorative only: the parent link carries the accessible name.
 */
export default function LogoMark({ className = "h-10 w-10", letterSize = "text-lg" }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full">
        <circle cx="22" cy="22" r="19.5" fill="none" stroke="rgba(201,111,74,0.5)" strokeWidth="1" />
        <circle cx="22" cy="22" r="15.75" fill="none" stroke="rgba(230,188,168,0.9)" strokeWidth="1.2" />
        <rect
          x="20.7"
          y="1.2"
          width="2.6"
          height="2.6"
          transform="rotate(45 22 2.5)"
          fill="#C96F4A"
        />
      </svg>
      <span
        className={`relative font-serif italic leading-none text-cream ${letterSize}`}
      >
        O
      </span>
    </span>
  );
}
