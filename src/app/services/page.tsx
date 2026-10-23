import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import FaqAccordion from "@/components/FaqAccordion";
import ServicesContactForm from "@/components/ServicesContactForm";
import { getPublicFaqs } from "@/lib/faqApi";
import { getPageImages, resolveImageUrl } from "@/lib/pageImagesApi";
import { getPageImage, type PageImageSlot } from "@/lib/pageImages";
import { getPublicServices } from "@/lib/servicesApi";
import ServiceIcon from "@/components/ServiceIcon";

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

// Use on headings that need the display font
const H = "font-[family-name:var(--font-heading)]";

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs

export const metadata: Metadata = {
  title: "Regulatory, QMS & Compliance Services | HUJ Consulting",
  description:
    "QMS design aligned with ISO 13485 and FDA QMSR, global regulatory strategy (FDA, EU MDR, Health Canada), GxP validation, audit support and AI-powered compliance for life sciences.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Regulatory, QMS & Compliance Services | HUJ Consulting",
    description:
      "Revamping quality and regulatory functions with customized digital solutions for medical device and life sciences companies.",
    url: `${SITE_URL}/services`,
    siteName: "HUJ Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulatory, QMS & Compliance Services | HUJ Consulting",
    description:
      "QMS design, global regulatory strategy, GxP validation and audit readiness for life sciences companies.",
  },
};

/* ---------- Data ---------- */

// Images are changed from the admin panel (/admin/images).
// Default images and alt text live in src/lib/pageImages.ts
const highlights: { title: string; text: string; slot: PageImageSlot }[] = [
  {
    title: "QMS Design",
    text: "Crafting tailored quality management systems aligned with ISO 13485 and FDA standards.",
    slot: "services_qms",
  },
  {
    title: "Regulatory",
    text: "Navigating FDA, EU MDR, Health Canada, and global regulations for smooth market entry.",
    slot: "services_regulatory",
  },
  {
    title: "Digital",
    text: "Ensuring compliance through gap assessments, risk management, and audit readiness.",
    slot: "services_digital",
  },
];

/* ---------- Structured data (helps Google show rich results) ---------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      ],
    },
  ],
};

/* ---------- FAQ (loaded from the admin panel) ---------- */

type FaqItem = { q: string; a: string };

// Hides the whole FAQ section when there are no FAQs in the admin panel
async function FaqSection() {
  const live = await getPublicFaqs();
  if (!live || live.length === 0) return null;
  const faqs: FaqItem[] = live.map((f) => ({ q: f.question, a: f.answer }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="bg-white px-5 font-[family-name:Arial,Helvetica,sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-[1170px] bg-[#DDE9F7] px-5 py-14 md:px-10">
        <h2 id="faq-heading" className="text-center text-4xl font-bold tracking-tight text-[#0b1a33]">
          Common Questions
        </h2>
        <div className="mx-auto mt-10 max-w-[1000px]">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Image slot (empty placeholder until you add an image) ---------- */

function ImageSlot({
  src,
  alt,
  className = "",
  unoptimized = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  unoptimized?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#dfe4ee] to-[#c9d1e0] ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill unoptimized={unoptimized} className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-[#9aa5bb]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="M21 16l-5-5-8 9" />
        </svg>
      )}
    </div>
  );
}

/* ---------- Admin-managed image (uploaded one, or the default) ---------- */

async function ManagedImage({ slot, className }: { slot: PageImageSlot; className: string }) {
  const { defaultSrc, alt } = getPageImage(slot);
  const uploaded = (await getPageImages())[slot];

  return (
    <ImageSlot
      src={uploaded ? resolveImageUrl(uploaded) : defaultSrc}
      alt={alt}
      className={className}
      unoptimized={Boolean(uploaded)} // uploaded images come from the backend, served as-is
    />
  );
}

function EditableImage({ slot, className }: { slot: PageImageSlot; className: string }) {
  return (
    <Suspense fallback={<ImageSlot alt={getPageImage(slot).alt} className={className} />}>
      <ManagedImage slot={slot} className={className} />
    </Suspense>
  );
}

/* ---------- What We Do cards (managed in /admin/services, 9 per page) ---------- */

type SearchParams = Promise<{ page?: string | string[] }>;

const pageHref = (n: number) => (n <= 1 ? "/services#what-we-do" : `/services?page=${n}#what-we-do`);

async function ServicesGrid({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const requested = Math.max(1, Number.parseInt(raw ?? "1", 10) || 1);

  const result = await getPublicServices(requested);
  if (!result || result.services.length === 0) return null;

  const { services, pagination } = result;
  const { page, perPage, totalPages } = pagination;

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HUJ Consulting services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: (page - 1) * perPage + i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: { "@type": "Organization", name: "HUJ Consulting", url: SITE_URL },
        areaServed: "Worldwide",
      },
    })),
  };

  const pageBtn =
    "grid h-10 min-w-10 place-items-center rounded-lg border px-3 text-sm font-semibold transition";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.id}
            className="rounded-3xl border border-[#e6e9ee] bg-white p-7 shadow-[0_8px_30px_rgba(15,31,71,0.05)]"
          >
            <span aria-hidden="true" className="grid h-[46px] w-[46px] place-items-center rounded-xl bg-[#0f1b3d] text-white">
              <ServiceIcon name={s.icon} size={22} />
            </span>
            <h3 className="mt-5 text-xl font-bold leading-snug text-[#0b1a33]">{s.title}</h3>
            <p className="mt-2 text-base leading-6 text-[#5b6472]">{s.description}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Services pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} rel="prev" className={`${pageBtn} border-[#d9dde6] text-[#0b1a33] hover:bg-[#f4f5f8]`}>
              Previous
            </Link>
          ) : (
            <span aria-hidden="true" className={`${pageBtn} border-[#eef0f4] text-[#c3c9d4]`}>Previous</span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={pageHref(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
              className={`${pageBtn} ${
                n === page
                  ? "border-[#0f1b3d] bg-[#0f1b3d] text-white"
                  : "border-[#d9dde6] text-[#0b1a33] hover:bg-[#f4f5f8]"
              }`}
            >
              {n}
            </Link>
          ))}

          {page < totalPages ? (
            <Link href={pageHref(page + 1)} rel="next" className={`${pageBtn} border-[#d9dde6] text-[#0b1a33] hover:bg-[#f4f5f8]`}>
              Next
            </Link>
          ) : (
            <span aria-hidden="true" className={`${pageBtn} border-[#eef0f4] text-[#c3c9d4]`}>Next</span>
          )}
        </nav>
      )}
    </>
  );
}

/* ---------- Page ---------- */

export default function ServicesPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main
      className={`${headingFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)] text-[#0f1f47]`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section aria-labelledby="services-hero" className="bg-[#253C97] px-5 pb-20 pt-40 text-center md:pb-24 md:pt-38">
        <h1 id="services-hero" className={`${H} text-5xl font-semibold tracking-tight text-white md:text-[5rem] md:leading-none`}>
          Quality First
        </h1>
        <p className="mx-auto mt-8 max-w-lg text-lg leading-6 text-white md:text-[16px]">
          Revamping quality and regulatory functions with customized digital solutions
        </p>
      </section>

      {/* Intro + 3 highlight cards */}
      <section aria-label="Core service areas" className="bg-[#DDE9F7] px-5 py-14 md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <p className="text-center text-[#4b5563] text-[16px]">
            Focused on elevating your quality management systems with precision and care.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.title}>
                <EditableImage slot={h.slot} className="h-[280px] w-full rounded-3xl" />
                <h2 className={`${H} mt-3 text-xl font-bold text-[#0f1f47]`}>{h.title}</h2>
                <p className="mt-3 text-[15px] w-[340px] leading-6 text-[#5b6472]">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" aria-labelledby="what-we-do-heading" className="scroll-mt-20 bg-white px-5 py-16 font-[family-name:Arial,Helvetica,sans-serif] md:py-20">
        <div className="mx-auto max-w-[1140px]">
          <h2 id="what-we-do-heading" className="text-center text-4xl font-bold tracking-tight text-[#0b1a33]">
            What We Do
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-[1.4] text-[#5b6472]">
            We help medical device and life sciences companies build quality and regulatory
            functions that scale, from initial QMS design through global market entry and
            ongoing audit readiness, powered by both deep regulatory expertise and smart
            technology.
          </p>

          <Suspense fallback={<p className="mt-14 text-center text-[#5b6472]">Loading services...</p>}>
            <ServicesGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      {/* FAQ (managed in /admin/faq) */}
      <Suspense fallback={null}>
        <FaqSection />
      </Suspense>

      {/* Get in Touch */}
      <section aria-labelledby="get-in-touch" className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-[1130px]">
          <h2 id="get-in-touch" className={`${H} text-center text-4xl font-semibold tracking-tight text-[#141414]`}>
            Get in Touch
          </h2>
          <p className="mt-5 text-center text-lg text-[#5b6472]">
            Reach out to discuss quality and regulatory solutions.
          </p>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[568fr_504fr] lg:gap-14">
            <div className="rounded-[2rem] bg-[#DDE9F7] p-6 md:p-10">
              <ServicesContactForm />
            </div>
            <EditableImage
              slot="services_get_in_touch"
              className="h-[300px] w-full rounded-[2rem] lg:h-[380px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}