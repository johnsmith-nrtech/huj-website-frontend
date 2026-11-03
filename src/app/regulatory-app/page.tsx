import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  FileSearch,
  Globe,
  Radar,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});
const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const H = "font-[family-name:var(--font-heading)]";

/* ---------- SEO ---------- */

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs
const PATH = "/regulatory-app";

export const metadata: Metadata = {
  title: "Regulatory App | AI-Powered Regulatory Intelligence | HUJ Consulting",
  description:
    "HUJ Consulting's regulatory app tracks FDA, EU MDR, Health Canada and global regulatory updates around the clock, flags compliance gaps early and helps your team stay audit-ready.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "Regulatory App | HUJ Consulting",
    description:
      "AI-powered regulatory monitoring, gap analysis and audit readiness for life sciences and medical device teams.",
    url: `${SITE_URL}${PATH}`,
    siteName: "HUJ Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulatory App | HUJ Consulting",
    description:
      "AI-powered regulatory monitoring, gap analysis and audit readiness for life sciences and medical device teams.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Regulatory App | HUJ Consulting",
      url: `${SITE_URL}${PATH}`,
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Regulatory App", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

/* ---------- Content (edit freely) ---------- */

const authorities = ["FDA", "EU MDR", "IVDR", "Health Canada", "TGA", "PMDA", "NMPA", "MHRA"];

const features = [
  {
    icon: Radar,
    title: "Regulatory monitoring, around the clock",
    text: "Tracks FDA, EU MDR and global regulatory updates continuously, so your team hears about changes the moment they happen.",
  },
  {
    icon: FileSearch,
    title: "Intelligent document & gap analysis",
    text: "Reviews SOPs, protocols and technical files against current requirements in minutes, catching gaps before an auditor does.",
  },
  {
    icon: TrendingUp,
    title: "Predictive audit readiness",
    text: "Uses AI-driven risk modeling to show where an inspection is likely to dig deepest, so you walk in prepared.",
  },
  {
    icon: Globe,
    title: "One view across markets",
    text: "Maps requirements across regions, with clarity on which documentation can be reused in each market.",
  },
];

const steps = [
  {
    n: 1,
    title: "Define your scope",
    text: "Tell us your products, risk classes and target markets.",
  },
  {
    n: 2,
    title: "Monitor & analyse",
    text: "The app watches regulatory changes and checks your documents against them.",
  },
  {
    n: 3,
    title: "Act with confidence",
    text: "Get clear alerts and prioritised actions, backed by our regulatory experts.",
  },
];

/* Mock alerts shown in the hero preview (illustration only) */
const previewAlerts = [
  { tag: "FDA", text: "New guidance published", tone: "bg-[#4fe3d0]/15 text-[#4fe3d0]" },
  { tag: "EU MDR", text: "Requirement updated", tone: "bg-[#2bb5f5]/15 text-[#2bb5f5]" },
  { tag: "Gap", text: "SOP needs review", tone: "bg-amber-400/15 text-amber-300" },
];

/* ---------- Page ---------- */

export default function RegulatoryAppPage() {
  return (
    <main
      className={`${headingFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)] bg-white text-[#0f1f47]`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section
        aria-labelledby="regapp-heading"
        className="relative overflow-hidden bg-[#0f1729] px-5 pb-20 pt-36 text-white md:px-10 md:pb-24 md:pt-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(43,181,245,0.25),transparent_65%)]"
        />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#35d9c4]">
                AI-Powered Regulatory Intelligence
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h1
                id="regapp-heading"
                className={`${H} mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl`}
              >
                Stay ahead of every{" "}
                <span className="bg-gradient-to-r from-[#4fe3c8] to-[#4cc3f5] bg-clip-text text-transparent">
                  regulatory change
                </span>
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">
                Our regulatory app monitors global requirements, checks your documentation against them and
                flags gaps early, so compliance stays a step ahead instead of a scramble before the audit.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#4fe3d0] px-6 py-3 text-sm font-bold text-[#06263a] transition hover:bg-[#6cf0de] md:text-base"
                >
                  Request a Demo <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10 md:text-base"
                >
                  Explore Services
                </Link>
              </div>
            </Reveal>
          </div>

          {/* App preview (illustration) */}
          <Reveal delay={300}>
            <div
              aria-hidden="true"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <p className={`${H} text-sm font-semibold text-white/90`}>Regulatory Dashboard</p>
                <span className="flex items-center gap-1.5 rounded-full bg-[#4fe3d0]/15 px-2.5 py-1 text-[11px] font-semibold text-[#4fe3d0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4fe3d0]" /> Live
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Authorities", value: "20+" },
                  { label: "Open gaps", value: "3" },
                  { label: "Audit ready", value: "92%" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/[0.06] p-3">
                    <p className="text-[11px] text-white/60">{s.label}</p>
                    <p className={`${H} mt-1 text-xl font-semibold`}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2.5">
                {previewAlerts.map((a) => (
                  <div key={a.text} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3 py-3">
                    <BellRing size={16} className="shrink-0 text-white/60" />
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${a.tone}`}>{a.tag}</span>
                    <span className="truncate text-sm text-white/85">{a.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-white/[0.06] p-3">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span>Audit readiness</span>
                  <span>92%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-[#4fe3c8] to-[#4cc3f5]" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Authorities strip */}
      <section aria-label="Regulatory authorities covered" className="border-b border-[#e6ecef] px-5 py-6">
        <ul className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {authorities.map((a) => (
            <li key={a} className="text-sm font-bold tracking-[0.15em] text-[#6a7f9a]">
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading" className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1140px]">
          <Reveal className="text-center">
            <h2 id="features-heading" className={`${H} text-3xl font-semibold tracking-tight md:text-4xl`}>
              What the app does
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5b6472] md:text-lg">
              Smart tools built by regulatory experts, for teams that cannot afford to miss a change.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={150 + i * 150} className="h-full">
                  <article className="h-full rounded-2xl border border-[#e6e9ee] bg-white p-7 shadow-[0_8px_30px_rgba(15,31,71,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,31,71,0.1)]">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0f1b3d] text-[#4fe3d0]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className={`${H} mt-5 text-xl font-semibold`}>{title}</h3>
                    <p className="mt-2 text-base leading-6 text-[#5b6472]">{text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="bg-[#f6f7fa] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="text-center">
            <h2 id="how-heading" className={`${H} text-3xl font-semibold tracking-tight md:text-4xl`}>
              How it works
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={150 + i * 150} className="h-full">
                  <div className="h-full rounded-2xl border border-[#e6e9ee] bg-white px-6 py-8 text-center shadow-[0_6px_24px_rgba(15,31,71,0.04)]">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#0f1b3d] text-lg font-bold text-white">
                      {s.n}
                    </span>
                    <h3 className={`${H} mt-4 text-xl font-semibold`}>{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-6 text-[#5b6472]">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why */}
      <section aria-labelledby="why-heading" className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 id="why-heading" className={`${H} text-3xl font-semibold tracking-tight md:text-4xl`}>
              Technology and expertise, together
            </h2>
            <p className="mt-5 text-base leading-7 text-[#5b6472] md:text-lg">
              The app does the watching and the first review. Our regulatory team helps you decide what each
              change means for your products and what to do next.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ul className="space-y-4">
              {[
                "Fewer surprises when regulations change",
                "Gaps found early, not during an inspection",
                "Clear priorities instead of long reports",
                "Support from experienced regulatory consultants",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-[#1a2236]">
                  <CheckCircle2 size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-[#14987f]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-1">
        <Reveal className="mx-auto max-w-[1224px]">
          <div className="rounded-2xl bg-[#0f1729] px-6 py-16 text-center text-white md:py-20">
            <ShieldCheck size={36} aria-hidden="true" className="mx-auto text-[#4fe3d0]" />
            <h2 className={`${H} mt-4 text-2xl font-semibold tracking-tight md:text-3xl`}>
              See the regulatory app in action
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/85 md:text-lg">
              Book a short demo and we will show how it fits your products and markets.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#4fe3d0] px-7 py-3 text-base font-bold text-[#06263a] transition hover:bg-[#6cf0de]"
            >
              Request a Demo <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}