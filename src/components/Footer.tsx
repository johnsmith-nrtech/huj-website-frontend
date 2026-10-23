"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MapPin, Mail, ArrowRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const services: string[][] = [
  ["Healthcare", "Consulting"],
  ["Quality &", "Compliance"],
  ["Risk Mitigation"],
  ["IT Solutions"],
  ["Technology Advisory"],
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const headingClass = "whitespace-nowrap font-serif text-2xl font-bold leading-snug text-white";
const barClass = "mt-4 block h-[3px] w-14 rounded-full bg-[#1fb6e8]";

// TODO: replace "#" with your real profile URLs (and add the same URLs to `sameAs` in layout.tsx)
const SOCIAL_LINKS = {
  linkedin: "#",
  instagram: "#",
  x: "#",
};

function SocialButton({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      aria-label={`HUJ Consulting on ${label}`}
      title={`HUJ Consulting on ${label}`}
      className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition hover:border-[#1fb6e8] hover:text-[#1fb6e8]"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer aria-label="Site footer" className="relative overflow-hidden bg-[#031330] bg-[radial-gradient(circle_at_20%_100%,rgba(14,60,110,0.35),transparent_55%)] text-white">
      {/* Dotted world map (only behind the right side) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-1/2 hidden h-[110%] w-[75%] -translate-y-1/2 bg-contain bg-center bg-no-repeat opacity-[0.16] lg:block"
        style={{ backgroundImage: "url('/images/world-dots.svg')" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:px-16 lg:grid-cols-[1.4fr_0.85fr_1fr_1.15fr_1.1fr] lg:gap-10">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="HUJ Technologies LLC – home page" title="HUJ Technologies LLC – Home">
            <Image
              src="/images/hujj-logo.png"
              alt="HUJ Technologies LLC – AI, IT and Health Risk Management"
              width={260}
              height={90}
              className="h-auto w-[230px]"
            />
          </Link>
          <p className="mt-10 max-w-sm text-base leading-8 text-white/85">
            Partnering for a safer, healthier and more compliant tomorrow through
            technology, quality and risk-focused solutions.
          </p>

          <div className="mt-8 flex gap-4" role="group" aria-label="Social media">
            <SocialButton label="LinkedIn" href={SOCIAL_LINKS.linkedin}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zM9.75 9.75h3.8v1.6h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.65 4.75 6.1V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.35-2 2.7V21h-4V9.75z" />
              </svg>
            </SocialButton>
            <SocialButton label="Instagram" href={SOCIAL_LINKS.instagram}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialButton>
            <SocialButton label="X" href={SOCIAL_LINKS.x}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </SocialButton>
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-labelledby="footer-quick-links">
          <h2 id="footer-quick-links" className={headingClass}>Quick Links</h2>
          <span aria-hidden="true" className={barClass} />
          <ul className="mt-8 space-y-5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} title={`${l.label} – HUJ Consulting`} className="flex items-center gap-3 text-base text-white/90 transition hover:text-[#1fb6e8]">
                  <ChevronRight size={20} aria-hidden="true" className="shrink-0 text-[#1fb6e8]" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Our Services */}
        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className={headingClass}>Our Services</h2>
          <span aria-hidden="true" className={barClass} />
          <ul className="mt-8 space-y-5">
            {services.map((lines) => (
              <li key={lines.join(" ")}>
                <Link href="/services" title={`${lines.join(" ")} – HUJ Consulting services`} className="flex items-start gap-3 text-base leading-7 text-white/90 transition hover:text-[#1fb6e8]">
                  <ChevronRight size={20} aria-hidden="true" className="mt-1 shrink-0 text-[#1fb6e8]" />
                  <span>
                    {lines.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 id="footer-contact" className={headingClass}>Contact<br />Information</h2>
          <span aria-hidden="true" className={barClass} />
          <address className="mt-8 space-y-6 text-base not-italic leading-7 text-white/90">
            <p className="flex items-start gap-4">
              <MapPin size={24} aria-hidden="true" className="mt-1 shrink-0 text-[#1fb6e8]" />
              <span>Philadelphia, PA<br />United States</span>
            </p>
            <p className="flex items-start gap-4">
              <Mail size={24} aria-hidden="true" className="mt-1 shrink-0 text-[#1fb6e8]" />
              <a
                href="mailto:info@hujconsulting.com"
                title="Email HUJ Consulting"
                className="break-all hover:text-[#1fb6e8]"
              >
                info@hujconsulting.com
              </a>
            </p>
          </address>
        </div>

        {/* Newsletter */}
        <div>
          <h2 id="footer-newsletter" className={headingClass}>Stay Updated</h2>
          <span aria-hidden="true" className={barClass} />
          <p className="mt-8 text-base leading-7 text-white/90">
            Get the latest insights, updates and industry news from HUJ Consulting.
          </p>
          <form
            aria-labelledby="footer-newsletter"
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex h-14 overflow-hidden rounded-lg border border-white/15 bg-white/5"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address for HUJ Consulting updates
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/70 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe to HUJ Consulting updates"
              className="grid w-14 shrink-0 place-items-center bg-[#1fb6e8] text-white transition hover:bg-[#3cc6f2]"
            >
              <ArrowRight size={22} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-8 text-sm md:flex-row md:px-16">
          <p className="text-white/85">
            © 2026 HUJ Consulting. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center">
              {legal.map((item) => (
                <li key={item.href} className="border-l border-white/20 px-4 first:border-l-0 last:pr-0">
                  <Link href={item.href} className="text-white/85 transition hover:text-[#1fb6e8]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}