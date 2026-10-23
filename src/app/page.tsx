import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import TrustedBy from "@/components/TrustedBy";
import Industries from "@/components/Industries";
import WhyHuj from "@/components/WhyHuj";
import ContactCta from "@/components/ContactCta";

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs

export const metadata: Metadata = {
  title: "HUJ Consulting | Regulatory, QMS & Compliance for Life Sciences",
  description:
    "Compliance for a healthier tomorrow. HUJ Consulting maps FDA requirements to global frameworks (EU MDR, TGA, PMDA, NMPA, Health Canada) so life sciences and medical device teams enter new markets with confidence.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "HUJ Consulting | Regulatory, QMS & Compliance for Life Sciences",
    description:
      "Regulatory strategy, QMS design, GxP validation and audit readiness for life sciences and medical device companies.",
    url: SITE_URL,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "HUJ Consulting | Regulatory, QMS & Compliance for Life Sciences",
  description:
    "HUJ Consulting maps FDA requirements to the regulatory frameworks that matter globally, so life sciences and medical device teams move into new markets with confidence.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <WhatWeDo />
      <TrustedBy />
      <Industries />
      <WhyHuj />
      <ContactCta />
    </main>
  );
}