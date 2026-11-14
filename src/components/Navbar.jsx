import { useEffect, useRef, useState } from "react";
import { brand, navigation } from "../data/site";
import { cn } from "../lib/cn";
import { Icon } from "./ui/Icons";
import LogoMark from "./ui/LogoMark";
import Button from "./ui/Button";

function Logo({ onClick }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
    >
      <LogoMark className="h-10 w-10 transition-opacity duration-500 group-hover:opacity-90" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-semibold tracking-tight text-cream">
          Be Best
        </span>
        <span className="mt-1 text-[8px] font-medium uppercase tracking-label text-cream/55">
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
            ? "bg-ink-950/95 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "hidden overflow-hidden border-b border-cream/10 transition-all duration-500 ease-luxe md:block",
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5 text-[9px] font-medium uppercase tracking-label text-cream/55 lg:px-10">
            <p>{brand.tagline} · Independent procurement consultancy for growing businesses</p>
            <a
              href={`mailto:${brand.email}`}
              className="transition-colors duration-300 hover:text-clay-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400"
            >
              {brand.email}
            </a>
          </div>
        </div>

        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ease-luxe lg:px-10",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo onClick={close} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative py-2 text-[10px] font-semibold uppercase tracking-label text-cream/70 transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-clay-400 after:transition-all after:duration-500 hover:text-cream hover:after:w-full focus-visible:text-cream focus-visible:outline-none focus-visible:after:w-full"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:border-clay-400/70 hover:text-clay-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,111,74,0.2),transparent_70%)] blur-2xl"
        />
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
                  <span className="font-serif text-sm italic text-cream/30">
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
