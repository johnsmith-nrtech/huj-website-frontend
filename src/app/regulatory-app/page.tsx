import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  Award,
  Bell,
  FileText,
  Globe,
  History,
  Link2,
  MessageCircleQuestion,
  Scale,
  Search,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
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

// Display font for big headings, Arial bold for section headings (same as Home and About)
const H = "font-[family-name:var(--font-heading)]";
const ARIAL = "font-[family-name:Arial,Helvetica,sans-serif]";

/* ---------- SEO ---------- */

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs
const PATH = "/regulatory-app";
const APP_NAME = "Medical Device Compliance";
const DESCRIPTION =
  "FDA, ISO 13485, EU MDR and more in one app: search requirements, see expert-reviewed mappings across markets and compare them side by side.";

export const metadata: Metadata = {
  title: "Regulatory App | HUJ Consulting",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "Regulatory App | HUJ Consulting",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    siteName: "HUJ Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulatory App | HUJ Consulting",
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${PATH}#webpage`,
      name: "Regulatory App | HUJ Consulting",
      url: `${SITE_URL}${PATH}`,
      description: DESCRIPTION,
      about: { "@id": `${SITE_URL}${PATH}#app` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}${PATH}#app`,
      name: APP_NAME,
      operatingSystem: "iOS, Android",
      applicationCategory: "BusinessApplication",
      description:
        "A searchable library of FDA, ISO 13485, EU MDR and other medical device regulations, with expert-reviewed mappings and side-by-side comparisons across markets.",
      publisher: { "@id": `${SITE_URL}/#organization` },
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

/* ---------- Content (from "Regulatory App – Website Page Content") ---------- */

const SCREENS = {
  home: {
    src: "/images/regulatory-app-home.png",
    alt: "App dashboard with search bar, quick access tiles and popular searches",
  },
  mapping: {
    src: "/images/regulatory-app-mapping.png",
    alt: "FDA 820.30 Design Controls mapped to ISO 13485, EU MDR, Canada MDSAP and Japan PMDA",
  },
  compare: {
    src: "/images/regulatory-app-compare.png",
    alt: "Comparison of FDA 820.30 and ISO 13485:2016 clause 7.3 with shared requirements",
  },
};

const heroStats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Globe, value: "6", label: "Regulatory Authorities" },
  { icon: Award, value: "ISO 13485", label: "Global QMS Reference" },
  { icon: Smartphone, value: "iOS + Android", label: "Mobile App" },
];

const frameworks = ["FDA", "ISO 13485", "EU MDR", "MHRA", "HEALTH CANADA", "MDSAP", "PMDA", "TGA"];

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Globe,
    title: "Browse by Authority",
    text: "Move from authority to regulation to section to requirement, organized the way the regulations themselves are.",
  },
  {
    icon: Search,
    title: "Search Everything",
    text: "Search by keyword, clause number or topic. Filter by authority and content type, with the source reference on every result.",
  },
  {
    icon: FileText,
    title: "Plain-Language Requirements",
    text: "Each requirement opens with a clear summary, who it applies to, related guidance, a link to the official source and the date it was last reviewed.",
  },
  {
    icon: ArrowLeftRight,
    title: "Cross-Authority Mapping",
    text: "See the equivalent or related requirements in ISO 13485, EU MDR, MDSAP, PMDA and more, each mapping set by subject-matter experts.",
  },
  {
    icon: Scale,
    title: "Side-by-Side Comparison",
    text: "Put two requirements next to each other: summary, similarities, differences and details, ready to save for later.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Regulatory Assistant",
    text: "Ask a question in plain English. Answers come only from the reviewed library and always show their sources. If the library can’t support an answer, it says so.",
  },
];

const screens = [
  {
    ...SCREENS.home,
    title: "Your dashboard",
    text: "Search, quick access to authorities, comparisons, favorites and recent views, plus popular topics such as CAPA and Design Controls.",
  },
  {
    ...SCREENS.mapping,
    title: "Mapping across authorities",
    text: "One FDA requirement and its related clauses in ISO 13485, EU MDR, MDSAP and PMDA, each with an expert-set match level.",
  },
  {
    ...SCREENS.compare,
    title: "Side-by-side comparison",
    text: "FDA design controls next to ISO 13485 clause 7.3: what each one focuses on and where they agree.",
  },
];

const steps = [
  { n: 1, title: "Find", text: "Search or browse to the requirement you need." },
  { n: 2, title: "Understand", text: "Read the plain-language summary, scope and official source." },
  { n: 3, title: "Map", text: "See how the same requirement looks in other markets." },
  { n: 4, title: "Compare & Save", text: "Compare side by side and save it to your favorites." },
];

const trust: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Expert-Reviewed",
    text: "Every requirement, mapping and comparison goes through draft, review and publish before anyone sees it. Retired content leaves the app.",
  },
  {
    icon: Link2,
    title: "Sourced, Always",
    text: "Each item links to its official source and shows when it was last reviewed. The Assistant lists the sources behind every answer.",
  },
  {
    icon: History,
    title: "Fully Audited",
    text: "Every content change is recorded in an audit trail: who changed what, and when.",
  },
  {
    icon: Bell,
    title: "Always Current",
    text: "Favorites always open the latest version, and you are notified when an authority you follow publishes an update.",
  },
];

const audiences = [
  { title: "Regulatory Affairs Teams", text: "Check what each market expects before you enter it." },
  { title: "Quality & QMS Professionals", text: "See how the QMSR and ISO 13485 line up, clause by clause." },
  { title: "Consultants & Auditors", text: "A quick, sourced reference for audits, gap assessments and client work." },
  { title: "MedTech Startups", text: "Understand global requirements early, without a full regulatory department." },
];

/* ---------- Phone frame for screenshots ---------- */

function PhoneFrame({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.6rem] bg-[#0b1530] p-2.5 shadow-[0_14px_32px_rgba(15,31,71,0.16)] ring-1 ring-white/10 ${className}`}
    >
      <div className="overflow-hidden rounded-[2.1rem] bg-white">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={2580}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function RegulatoryAppPage() {
  return (
    <main
      className={`${headingFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)] bg-white text-[#0f1f47]`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero */}
      <section
        aria-labelledby="regapp-heading"
        className="relative overflow-hidden bg-[linear-gradient(160deg,#09183c_0%,#0a1f45_55%,#0c2d4f_100%)] px-5 pb-12 pt-24 text-white md:px-10 md:pb-14 md:pt-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(31,182,232,0.18),transparent_65%)]"
        />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#35d9c4]">
                Medical Device Compliance App
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h1
                id="regapp-heading"
                className={`${H} mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.6rem]`}
              >
                Global device regulations,
                <br className="hidden sm:block" />{" "}
                <span className="bg-gradient-to-r from-[#4fe3c8] to-[#4cc3f5] bg-clip-text text-transparent">
                  mapped
                </span>{" "}
                in one{"\u00a0"}app.
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-4 max-w-[560px] text-sm leading-6 text-white/85 md:text-base md:leading-7">
                Our {APP_NAME} app brings FDA, ISO 13485, EU MDR and other major frameworks into one searchable
                library. Open any requirement and see how it lines up with other markets, mapped and reviewed by
                regulatory experts.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#4fe3d0] px-6 py-2.5 text-sm font-bold md:text-base text-[#06263a] transition hover:bg-[#6cf0de]"
                >
                  Request Access <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a href="#how-it-works" className="group inline-flex items-center gap-3 text-sm font-semibold md:text-base">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#4fe3d0] transition group-hover:bg-[#4fe3d0]/20">
                    <ArrowDown size={18} aria-hidden="true" />
                  </span>
                  See How It Works
                </a>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <ul aria-label={`${APP_NAME} app at a glance`} className="mt-7 flex flex-wrap gap-y-4">
                {heroStats.map(({ icon: Icon, value, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 pr-6 md:border-l md:border-white/20 md:px-6 md:first:border-l-0 md:first:pl-0"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#2fb8a6] text-[#4fe3d0]">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong className={`${H} block text-lg leading-tight`}>{value}</strong>
                      <small className="block text-xs text-white/75">{label}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <PhoneFrame
              {...SCREENS.mapping}
              priority
              sizes="(min-width: 1024px) 230px, 200px"
              className="mx-auto w-[200px] md:w-[230px]"
            />
          </Reveal>
        </div>
      </section>

      {/* 2. Frameworks strip */}
      <section aria-label="Frameworks covered in the app" className="border-b border-[#e6ecef] bg-white px-5 py-4">
        <ul className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-y-3">
          {frameworks.map((f) => (
            <li
              key={f}
              className="whitespace-nowrap border-r border-[#e6ecef] px-4 text-xs font-bold tracking-[0.15em] text-[#6a7f9a] last:border-r-0 md:px-6"
            >
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. What the app does */}
      <section aria-labelledby="features-heading" className="bg-white px-5 py-12 md:px-16 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="text-center">
            <h2 id="features-heading" className={`${ARIAL} text-2xl font-bold tracking-tight md:text-3xl`}>
              What the App Does
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#5b6472] md:text-base">
              Everything a regulatory or quality professional needs to find, understand and compare requirements
              across markets.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={100 + (i % 3) * 150} className="h-full">
                  <article className="h-full rounded-2xl border border-[#e6e9ee] bg-white px-6 py-6 shadow-[0_8px_30px_rgba(15,31,71,0.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,31,71,0.12)]">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f3f8] text-[#14527a]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-[#0f1f47]">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#5b6472]">{text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="mt-7 text-center text-sm text-[#5b6472]">
              Also in the app: favorites, recent views, update alerts for the authorities you follow, and evidence
              checklists.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. See it in action */}
      <section aria-labelledby="screens-heading" className="bg-[#dde9f7] px-5 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="text-center">
            <h2 id="screens-heading" className={`${ARIAL} text-2xl font-bold tracking-tight md:text-3xl`}>
              See It in Action
            </h2>
            <p className="mt-3 text-sm text-[#5b6472] md:text-base">
              A quick look at the screens professionals use every day.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-10 md:grid-cols-3 md:gap-8">
            {screens.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={150 + i * 150}>
                  <figure>
                    <PhoneFrame
                      src={s.src}
                      alt={s.alt}
                      sizes="(min-width: 768px) 190px, 180px"
                      className="mx-auto w-[180px] transition-transform duration-300 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100 md:w-[190px]"
                    />
                    <figcaption className="mx-auto mt-4 max-w-[300px] text-center">
                      <span className="block text-base font-semibold text-[#0f1f47]">{s.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-[#5b6472]">{s.text}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. How it works */}
      <section
        id="how-it-works"
        aria-labelledby="how-heading"
        className="scroll-mt-24 bg-white px-5 py-12 md:px-16 md:py-16"
      >
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="text-center">
            <h2 id="how-heading" className={`${ARIAL} text-2xl font-bold tracking-tight md:text-3xl`}>
              How It Works
            </h2>
            <p className="mt-3 text-sm text-[#5b6472] md:text-base">From question to answer in four steps.</p>
          </Reveal>

          <ol className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={100 + i * 120} className="h-full">
                  <div className="h-full px-5 py-6 text-center">
                    <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#12224a] text-base font-bold text-white">
                      {s.n}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-[#12224a]">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#4b5563]">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Content you can rely on */}
      <section aria-labelledby="trust-heading" className="bg-[#09183c] px-5 py-12 text-white md:px-16 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="text-center">
            <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#35d9c4]">
              <span aria-hidden="true" className="h-px w-8 bg-[#35d9c4]" />
              Built for Regulated Work
              <span aria-hidden="true" className="h-px w-8 bg-[#35d9c4]" />
            </p>
            <h2 id="trust-heading" className={`${H} mt-3 text-2xl font-semibold tracking-tight md:text-3xl`}>
              Content you can rely on
            </h2>
          </Reveal>

          <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={100 + i * 120} className="h-full">
                  <article className="h-full rounded-2xl border border-white/10 bg-[#050d22] px-5 pb-6 pt-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1a3357] text-[#4fe3d0]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className={`${H} mt-4 text-lg font-semibold`}>{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/80">{text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Who it's for */}
      <section aria-labelledby="audience-heading" className="bg-white px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1040px]">
          <Reveal className="text-center">
            <h2 id="audience-heading" className={`${ARIAL} text-2xl font-bold tracking-tight md:text-3xl`}>
              Who It’s For
            </h2>
            <p className="mt-3 text-sm text-[#5b6472] md:text-base">
              Built for the people who keep medical devices compliant.
            </p>
          </Reveal>

          <ul className="mx-auto mt-9 grid max-w-[1040px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={100 + i * 120} className="h-full">
                  <article className="flex h-full min-h-[170px] flex-col items-center justify-start rounded-xl border border-[#e6e9ee] bg-white px-6 pb-6 pt-5 text-center shadow-[0_6px_24px_rgba(15,31,71,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,31,71,0.1)]">
                    <h3 className="text-[15px] font-bold leading-snug text-[#0f1f47]">{a.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-5 text-[#5b6472]">{a.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Call to action + small print (full width, sits directly on the footer) */}
      <section aria-labelledby="cta-heading" className={`${ARIAL} bg-[#0a1838] px-5 py-10 text-center md:py-14`}>
        <Reveal className="mx-auto max-w-[900px]">
          <h2 id="cta-heading" className="text-xl font-bold tracking-tight text-white md:text-2xl">
            Put global regulations in your pocket.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/90 md:text-base">
            Request access to the {APP_NAME} app, or book a walkthrough with our team.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-white px-7 py-2.5 text-base font-bold text-black transition hover:bg-[#e8ecf5]"
          >
            Request Access
          </Link>
          <p className="mx-auto mt-7 max-w-3xl text-xs leading-5 text-white/55">
            The {APP_NAME} app is a reference tool for professionals. It does not provide legal, regulatory or quality
            advice. A mapping or match level shows how requirements relate; it is not a claim of legal equivalence.
          </p>
        </Reveal>
      </section>
    </main>
  );
}