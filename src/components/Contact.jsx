import { brand } from "../data/site";
import { Icon } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SourcingForm from "./SourcingForm";

const contactRows = [
  {
    icon: "mail",
    label: "Email",
    value: brand.email,
    href: `mailto:${brand.email}`,
  },
  {
    icon: "phone",
    label: "Phone",
    value: brand.phone,
    href: brand.phoneHref,
  },
  {
    icon: "instagram",
    label: "Instagram",
    value: brand.instagramLabel,
    href: brand.instagram,
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink-900 py-20 text-cream sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,111,74,0.18),transparent_68%)] blur-2xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            id="contact-heading"
            tone="dark"
            eyebrow="Contact"
            title={
              <>
                Start with{" "}
                <span className="font-serif font-normal italic text-clay-300">
                  one request.
                </span>
              </>
            }
            description="Tell us what you are buying and who is involved. We will reply with a short, honest view of what a consolidated sourcing request could change."
          />

          <ul className="mt-10 border-t border-cream/10">
            {contactRows.map((row) => (
              <li key={row.label}>
                <a
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="group flex items-center justify-between gap-4 border-b border-cream/10 py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:text-clay-300"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/15 text-clay-400 transition-colors duration-300 group-hover:border-clay-400/50">
                      <Icon name={row.icon} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[9px] uppercase tracking-label text-cream/55">
                        {row.label}
                      </span>
                      <span className="mt-1 block text-sm text-cream/85 transition-colors duration-300 group-hover:text-clay-300">
                        {row.value}
                      </span>
                    </span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    className="h-4 w-4 text-cream/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay-300"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-label text-cream/55">
            <Icon name="clock" className="h-4 w-4 text-clay-400" />
            {brand.hours}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="rounded-4xl bg-cream p-6 text-ink shadow-lift sm:p-8 lg:p-10">
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-label text-clay-700">
                  Sourcing request
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink/50">
                  Fields marked <span className="text-clay-700">*</span> are required.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-clay-600"
              >
                <Icon name="sparkle" className="h-4 w-4" />
              </span>
            </div>

            <SourcingForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
