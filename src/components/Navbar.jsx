import { useEffect, useRef, useState } from "react";
import { brand, navigation } from "../data/site";
import { cn } from "../lib/cn";
import { Icon } from "./ui/Icons";
import LogoMark from "./ui/LogoMark";
import Button from "./ui/Button";

function Logo({ onClick, onDark }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
    >
      <LogoMark
        tone={onDark ? "dark" : "light"}
        className="h-10 w-10 transition-opacity duration-500 group-hover:opacity-90"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-semibold tracking-tight transition-colors duration-500",
            onDark ? "text-cream" : "text-ink",
          )}
        >
          Be Best
        </span>
        <span
          className={cn(
            "mt-1 text-[8px] font-medium uppercase tracking-label transition-colors duration-500",
            onDark ? "text-cream/55" : "text-ink/55",
          )}
        >
          Procurement
        </span>
      </span>
      <span className="sr-only">Back to top</span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const onDark = scrolled || open; // header sits on a dark surface

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-luxe",
          scrolled || open
            ? "border-b border-cream/10 bg-ink-950/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ease-luxe lg:px-10",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo onClick={close} onDark={onDark} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative py-2 text-[10px] font-semibold uppercase tracking-label transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-clay-400 after:transition-all after:duration-500 hover:after:w-full focus-visible:outline-none focus-visible:after:w-full",
                      onDark
                        ? "text-cream/70 hover:text-cream focus-visible:text-cream"
                        : "text-ink/70 hover:text-ink focus-visible:text-ink",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 lg:hidden",
              onDark
                ? "border-cream/20 text-cream hover:border-clay-400/70 hover:text-clay-300"
                : "border-ink/25 text-ink hover:border-clay-700 hover:text-clay-700",
            )}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-30 bg-ink-950 transition-opacity duration-500 ease-luxe lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className={cn(
            "relative flex h-full flex-col justify-center px-7 pb-12 pt-28 transition-transform duration-700 ease-luxe",
            open ? "translate-y-0" : "-translate-y-6",
          )}
        >
          <ul className="space-y-1">
            {navigation.map((item, index) => (
              <li key={item.href} className="border-b border-cream/10">
                <a
                  href={item.href}
                  onClick={close}
                  className="group flex items-baseline justify-between gap-4 py-4 focus-visible:outline-none focus-visible:text-clay-300"
                >
                  <span className="font-display text-2xl font-medium tracking-tight text-cream transition-colors duration-300 group-hover:text-clay-300">
                    {item.label}
                  </span>
                  <span className="font-serif text-sm italic text-cream/35">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="#contact" variant="light" size="md" className="w-full" onClick={close}>
              [Call to Action]
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-label text-cream/55">
            <a
              href={`mailto:${brand.email}`}
              className="transition-colors hover:text-clay-300 focus-visible:outline-none focus-visible:text-clay-300"
            >
              {brand.email}
            </a>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-clay-300 focus-visible:outline-none focus-visible:text-clay-300"
            >
              Instagram
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
