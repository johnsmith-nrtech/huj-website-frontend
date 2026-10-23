import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
// import ImageSlot from "@components/ImageSlot";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import { getPageImages, resolveImageUrl } from "@/lib/pageImagesApi";
import { getPageImage } from "@/lib/pageImages";

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
const ARIAL = "font-[family-name:Arial,Helvetica,sans-serif]";

/* ---------- SEO ---------- */

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs

export const metadata: Metadata = {
  title: "About Us | HUJ Consulting",
  description:
    "HUJ Technologies combines regulatory compliance expertise with hands-on technical delivery. Learn about our mission, vision, approach and values for life sciences and medical device organizations.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Us | HUJ Consulting",
    description:
      "Innovation meets compliance. Meet the team helping life sciences organizations assess, advise, build and sustain regulatory compliance.",
    url: `${SITE_URL}/about`,
    siteName: "HUJ Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | HUJ Consulting",
    description:
      "Innovation meets compliance. Meet the team helping life sciences organizations assess, advise, build and sustain regulatory compliance.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About HUJ Consulting",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "HUJ Technologies LLC",
    alternateName: "HUJ Consulting",
    url: SITE_URL,
    email: "info@hujconsulting.com",
    description:
      "Regulatory compliance expertise and technical delivery for life sciences and medical device organizations.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      addressCountry: "US",
    },
  },
};

/* ---------- Data ---------- */

const iconClass = "h-7 w-7 text-[#3fb6f0]";
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: iconClass,
  "aria-hidden": true,
};

const specializations = [
  {
    title: "GxP System Validation",
    text: "Aligning complex enterprise IT infrastructure with strict international regulatory standards to ensure absolute GxP validation readiness.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      </svg>
    ),
  },
  {
    title: "Remediation Protocols",
    text: "Deploying rapid response remediation protocols to resolve critical audit vulnerabilities and restore operational integrity under intense regulatory pressure.",
    icon: (
      <svg {...iconProps}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    text: "Establishing continuous technical oversight and proactive quality assurance to mitigate compliance risks before they trigger audit disasters.",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a9 9 0 1 1-4.5-7.8" />
        <path d="M8 12l3 3 9-10" />
      </svg>
    ),
  },
];

const strengths = [
  { label: "Regulatory Expertise", text: "Deep knowledge of FDA, EU MDR, and global compliance frameworks" },
  { label: "Technical Execution", text: "Not just recommendations , we build the systems too" },
  { label: "Global Reach", text: "Supporting organizations navigating multi-jurisdiction requirements" },
];

const steps = [
  { n: 1, title: "Assess", text: "Understand your systems, risk exposure, and regulatory scope." },
  { n: 2, title: "Advise", text: "Provide a clear, prioritized remediation or validation plan." },
  { n: 3, title: "Build", text: "Implement the technical work needed, when required." },
  { n: 4, title: "Sustain", text: "Ongoing QA and oversight so compliance holds over time." },
];

const values = [
  { title: "Precision", text: "Compliance work leaves no room for guesswork." },
  { title: "Transparency", text: "Clear communication at every stage of an engagement." },
  { title: "Partnership", text: "We work alongside your team, not just around it." },
];

/* ---------- Page ---------- */

/* ---------- Large image (uploaded in /admin/images, or the default) ---------- */

async function AboutImage() {
  const { defaultSrc, alt } = getPageImage("about_main");
  const uploaded = (await getPageImages())["about_main"];

  return (
    <Image
      src={uploaded ? resolveImageUrl(uploaded) : defaultSrc}
      alt={alt}
      width={1836}
      height={760}
      priority
      quality={90}
      sizes="(min-width: 1224px) 1224px, 100vw"
      unoptimized={Boolean(uploaded)} // uploaded images come from the backend, served as-is
      className="h-auto w-full"
    />
  );
}

/* ---------- Page ---------- */

export default function AboutPage() {
  return (
    <main
      className={`${headingFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)] bg-white text-[#111]`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Specializations band */}
      <section className="bg-[#3495D2] px-5 pb-8 pt-28 md:pt-32">
        <div className="mx-auto max-w-[1060px]">
          <Reveal>
            <p className={`${H} text-base font-bold uppercase tracking-tight text-white md:text-[17px]`}>
              Our Specializations
            </p>
            <h1 className={`${H} mt-4 text-4xl font-medium tracking-tight text-white md:text-[54px] md:leading-[1.1]`}>
              Rigorous compliance frameworks
            </h1>
            <p className="mt-7 text-base text-white md:text-[17px]">
              We align complex IT infrastructure with strict regulatory standards and resolve
              critical compliance failures before they trigger audit disasters.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3.5 md:grid-cols-3">
            {specializations.map((s, i) => (
              <Reveal key={s.title} delay={i * 150} className="h-full">
                <article className="h-full rounded-3xl bg-black px-6 pb-14 pt-10 shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#1a3357]">
                    {s.icon}
                  </span>
                  <h2 className={`${H} mt-8 text-3xl font-medium leading-[1.2] text-white md:text-[34px]`}>
                    {s.title}
                  </h2>
                  <p className="mt-9 text-base leading-[27px] text-white md:text-[17px]">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Get to know us */}
      <section className="px-5 pt-16 md:pt-24">
        <div className="mx-auto max-w-[1224px]">
          <Reveal>
            <h2 className={`${H} text-5xl font-medium tracking-tight md:text-[4.2rem] md:leading-none`}>
              Get to know us
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-12 max-w-[700px] text-base leading-[27px] md:text-[17px]">
            <p>
              We bring together regulatory compliance expertise and technical delivery capability
              under one team. Rather than offering advice in isolation, we work end-to-end, from
              identifying compliance gaps to designing and implementing the systems that close them.
            </p>
            <p className="mt-8">
              Our work spans quality management systems, global regulatory pathways, and the digital
              tools organizations need to stay audit-ready, combining hands-on compliance experience
              with real engineering capability.
            </p>
            <ul className="mt-8 list-disc space-y-0 pl-7">
              {strengths.map((s) => (
                <li key={s.label}>
                  <strong className="font-semibold">{s.label}</strong> : {s.text}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="mt-3">
            {/* Changeable from the admin panel (/admin/images) */}
            <Suspense fallback={<div className="aspect-[1836/760] w-full bg-[#eceef4]" />}>
              <AboutImage />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="px-5 pt-14">
        <div className="mx-auto grid max-w-[1224px] gap-12 md:grid-cols-2 md:gap-0">
          <Reveal>
            <h2 className={`${H} text-4xl font-medium tracking-tight`}>Our mission</h2>
            <div className="mt-8 max-w-[520px] text-base leading-[27px] md:text-[17px]">
              <p>
                Our mission is to make regulatory compliance manageable for life sciences and medical
                device organizations, replacing fragmented advisory work with a single team that can
                assess, recommend, and build.
              </p>
              <p className="mt-3">
                We believe compliance shouldn&apos;t be treated as a one-time hurdle before a launch or
                audit. It should be built into how an organization operates, so teams can move fast
                without constantly worrying about what might trip them up later.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="md:pt-1">
            <h2 className={`${H} text-4xl font-medium tracking-tight`}>Our vision</h2>
            <div className="mt-8 max-w-[520px] text-base leading-[27px] md:text-[17px]">
              <p>
                We want regulated organizations to treat compliance as a foundation for growth, not a
                recurring crisis. That means giving them tools and processes that hold up over time,
                not just a report that sits in a drawer after an audit.
              </p>
              <p className="mt-3">
                As regulatory environments grow more complex and more global, we see our role
                expanding too, from advisory support to hands-on technical partnership, wherever an
                organization needs it most.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Approach */}
      <section className={`${ARIAL} px-5 pt-28`}>
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#12224a]">Our Approach</h2>
            <p className="mt-3 text-lg text-[#4b5563]">
              How we work with every client, from first conversation to long-term support.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="h-full">
                <div className="h-full rounded-3xl border border-[#e6e9ee] bg-white px-6 py-8 text-center shadow-[0_8px_26px_rgba(15,31,71,0.06)]">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#09183C] font-serif text-lg font-bold text-white">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-[#12224a]">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.45] text-[#4b5563]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className={`${ARIAL} px-5 pt-24`}>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[#12224a]">Who We Work With</h2>
          <p className="mt-6 text-lg leading-[1.5] text-[#4b5563]">
            We work with medical device manufacturers, biotech companies, pharmaceutical
            organizations, and other regulated life sciences enterprises navigating complex,
            multi-jurisdiction compliance requirements.
          </p>
        </Reveal>
      </section>

      {/* Our Values */}
      <section className={`${ARIAL} px-5 pt-24`}>
        <div className="mx-auto max-w-[1060px]">
          <Reveal>
            <h2 className="text-center text-4xl font-bold tracking-tight text-[#12224a]">
              Our Values
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-[30px] md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 120} className="h-full">
                <div className="h-full rounded-3xl border border-[#e6e9ee] bg-white px-6 py-7 shadow-[0_6px_22px_rgba(15,31,71,0.04)]">
                  <h3 className="text-[22px] font-bold text-[#12224a]">{v.title}</h3>
                  <p className="mt-1 text-base leading-[1.15] text-[#4b5563]">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${ARIAL} px-5 pb-1 pt-12`}>
        <Reveal className="mx-auto max-w-[1224px]">
          <div className="bg-[#09183C] px-5 py-20 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Ready to talk about your compliance needs?
            </h2>
            <p className="mt-2 text-base text-white/90 md:text-lg">
              Get in touch to discuss how we can support your organization.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block rounded-md bg-white px-8 py-3 font-serif text-lg font-bold text-black transition hover:bg-[#e8ecf5]"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}