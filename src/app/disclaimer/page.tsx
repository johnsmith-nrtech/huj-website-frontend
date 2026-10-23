import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs
const CONTACT_EMAIL = "info@hujconsulting.com";
const PATH = "/disclaimer";

const linkClass = "font-medium text-[#14527a] underline underline-offset-2 hover:text-[#1fb6e8]";

type LegalSection = { title: string; content: ReactNode };

export const metadata: Metadata = {
  title: "Disclaimer | HUJ Consulting",
  description:
    "Important information about the content on the HUJ Technologies LLC (HUJ Consulting) website, including the limits of regulatory and compliance information.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const sections: LegalSection[] = [
  {
    title: "General Information Only",
    content: (
      <p>
        The content on this website, including articles, service descriptions, and answers to common
        questions, is provided for general information purposes only. It is intended to explain our services
        and general topics in quality, regulatory, and compliance work.
      </p>
    ),
  },
  {
    title: "Not Legal or Regulatory Advice",
    content: (
      <p>
        Nothing on this website is legal advice or a substitute for professional regulatory advice tailored to
        your products, risk classification, and target markets. Regulatory requirements from authorities such
        as the FDA, EU MDR, Health Canada, and others change over time and depend on specific facts. You
        should not act on information from this website without obtaining advice for your situation.
      </p>
    ),
  },
  {
    title: "No Guarantee of Regulatory Outcomes",
    content: (
      <p>
        Regulatory approvals, certifications, clearances, and audit results are decided by the relevant
        authorities and notified bodies. While we work to help clients prepare thoroughly, we cannot guarantee
        any particular outcome, timeline, or decision.
      </p>
    ),
  },
  {
    title: "No Client Relationship",
    content: (
      <p>
        Using this website or contacting us through it does not create a consulting or client relationship.
        A client relationship begins only when both parties sign a written agreement that sets out the scope
        of work.
      </p>
    ),
  },
  {
    title: "AI-Powered Tools",
    content: (
      <p>
        Where we describe AI-powered monitoring, document review, or risk modeling, these tools support the
        work of our experts and do not replace professional judgment. Results are reviewed by qualified people
        before being relied on in client work.
      </p>
    ),
  },
  {
    title: "Accuracy of Information",
    content: (
      <p>
        We try to keep the information on this website accurate and up to date, but we make no
        representations or warranties about its completeness, accuracy, or timeliness. Information may be
        changed or removed at any time without notice.
      </p>
    ),
  },
  {
    title: "External Links",
    content: (
      <p>
        This website may link to external websites, including those of regulatory authorities and standards
        bodies. We are not responsible for the content or accuracy of external websites, and a link does not
        mean we endorse them.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, HUJ Technologies LLC will not be liable for any loss or damage
        arising from reliance on information on this website. Our full terms are set out in our{" "}
        <Link href="/terms-of-use" className={linkClass}>
          Terms of Use
        </Link>
        .
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <>
        <p>For questions about this Disclaimer, contact us at:</p>
        <p>
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
          </a>
          <br />
          Website:{" "}
          <a href={SITE_URL} className={linkClass}>
            {SITE_URL}
          </a>
        </p>
      </>
    ),
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Disclaimer | HUJ Consulting",
      url: `${SITE_URL}${PATH}`,
      publisher: { "@type": "Organization", name: "HUJ Technologies LLC", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Disclaimer", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

export default function DisclaimerPage() {
  return (
    <main className="bg-white text-[#0f1f47]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header band */}
      <section aria-labelledby="legal-heading" className="bg-[#253C97] px-5 pb-16 pt-36 text-center md:pb-20 md:pt-40">
        <h1 id="legal-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Disclaimer
        </h1>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-[860px] px-5 py-14 text-base leading-7 text-[#3f4a5c] md:py-20">
        <div className="space-y-4">
          <p>
            Please read this Disclaimer carefully before using{" "}
            <a href={SITE_URL} className={linkClass}>
              {SITE_URL}
            </a>
            , operated by HUJ Technologies LLC
          </p>
        </div>

        {sections.map((s, i) => (
          <section key={s.title} aria-labelledby={`legal-${i + 1}`} className="mt-10">
            <h2 id={`legal-${i + 1}`} className="text-xl font-bold text-[#0f1f47] md:text-2xl">
              {i + 1}. {s.title}
            </h2>
            <div className="mt-3 space-y-4">{s.content}</div>
          </section>
        ))}
      </article>
    </main>
  );
}