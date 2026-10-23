"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", title: "HUJ Consulting – Regulatory & Compliance Home" },
  { href: "/about", label: "About", title: "About HUJ Technologies – Our Mission, Vision & Approach" },
  { href: "/services", label: "Services", title: "Regulatory, QMS & Compliance Services" },
  { href: "/contact", label: "Contact", title: "Contact HUJ Consulting" },
];

// Pages where the navbar always has a solid background (no transparency)
const solidPages: Record<string, string> = {
  "/services": "#09183C",
  "/contact": "#09183C",
  "/about": "#09183C",
  "/privacy-policy": "#09183C",
  "/terms-of-use": "#09183C",
  "/cookie-policy": "#09183C",
  "/disclaimer": "#09183C",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const fixedColor = Object.entries(solidPages).find(([path]) =>
    pathname.startsWith(path)
  )?.[1];
  const bgColor = fixedColor ?? "#09183C";
  const showBg = Boolean(fixedColor) || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      style={{ backgroundColor: showBg ? bgColor : "transparent" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        showBg ? "shadow-lg" : ""
      }`}
    >
      <div className="relative mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-5 md:h-[74px] md:px-8">
        <Link
          href="/"
          aria-label="HUJ Technologies LLC – AI, IT and Health Risk Management, home page"
          title="HUJ Technologies LLC – Home"
        >
          <Image
            src="/images/hujj-logo.png"
            alt="HUJ Technologies LLC – AI, IT and Health Risk Management"
            width={120}
            height={80}
            priority
            className="h-auto w-[140px] md:w-[190px]"
          />
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close main menu" : "Open main menu"}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>

        {/* Links */}
        <nav
          id="main-menu"
          aria-label="Main navigation"
          style={{ backgroundColor: open ? bgColor : undefined }}
          className={`absolute left-0 right-0 top-full flex-col md:left-1/2 md:right-auto md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2 md:flex-row md:gap-14 md:bg-transparent ${
            open ? "flex" : "hidden"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              title={l.title}
              aria-current={pathname === l.href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`border-b-2 px-5 py-4 text-md font-medium text-white transition hover:opacity-80 md:px-0 md:py-0 md:pb-1 md:text-[15px] ${
                pathname === l.href ? "md:border-white" : "border-transparent"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}