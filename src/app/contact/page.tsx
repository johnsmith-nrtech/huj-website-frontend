import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import ContactForm from "@/components/ContactForm";
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

export const metadata: Metadata = {
  title: "Contact Us | HUJ Consulting",
  description:
    "Contact HUJ Consulting for regulatory, QMS and compliance support. Email info@hujconsulting.com, send a message online or visit us in Philadelphia, PA. Open Mon–Sat.",
  alternates: { canonical: `${SITE_URL}/contact` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact Us | HUJ Consulting",
    description:
      "Questions about regulatory strategy, QMS design or compliance? Contact the HUJ Consulting team.",
    url: `${SITE_URL}/contact`,
    siteName: "HUJ Consulting",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | HUJ Consulting",
    description:
      "Questions about regulatory strategy, QMS design or compliance? Contact the HUJ Consulting team.",
  },
};

// Structured data so search engines understand the business details
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
      ],
    },
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#page`,
      name: "Contact HUJ Consulting",
      url: `${SITE_URL}/contact`,
      isPartOf: { "@type": "WebSite", name: "HUJ Consulting", url: SITE_URL },
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "HUJ Technologies LLC",
      alternateName: "HUJ Consulting",
      url: SITE_URL,
      email: "info@hujconsulting.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@hujconsulting.com",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Philadelphia",
        addressRegion: "PA",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "16:00",
        },
      ],
    },
  ],
};

/* ---------- Page ---------- */

export default function ContactPage() {
  return (
    <main
      className={`${headingFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)] bg-white text-[#0a0a0a]`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Heading */}
      <section aria-labelledby="contact-heading" className="px-5 pb-10 pt-28 text-center md:pt-24">
        <Reveal>
          <h1 id="contact-heading" className={`${H} text-5xl font-medium tracking-tight md:text-[5rem] md:leading-none`}>
            Contact us
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8">
            Feel free to contact us with any questions or concerns. You can use the form on
            our website or email us directly. We appreciate your interest and look forward
            to hearing from you.
          </p>
        </Reveal>
      </section>

      {/* Form */}
      <section className="px-5 pb-16 pt-6" aria-labelledby="form-heading">
        <h2 id="form-heading" className="sr-only">Send us a message</h2>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      {/* Contact details */}
      <section className="px-5 pb-10" aria-label="Contact details">
        <div className="mx-auto grid max-w-[1240px] gap-12 text-center md:grid-cols-3">
          <Reveal>
            <h2 className={`${H} text-2xl font-medium`}>Contacts</h2>
            <p className="mt-8 text-lg">
              <a href="mailto:info@hujconsulting.com" className="hover:underline">
                info@hujconsulting.com
              </a>
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2 className={`${H} text-2xl font-medium`}>Address</h2>
            <address className="mt-8 text-lg not-italic">Philadelphia, PA</address>
          </Reveal>

          <Reveal delay={300}>
            <h2 className={`${H} text-2xl font-medium`}>Opening hours</h2>
            <ul className="mt-8 space-y-4 text-lg">
              <li>Monday - Friday: 9:00 - 18:00</li>
              <li>Saturday: 9:00 - 16:00</li>
              <li>Sunday: Closed</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Map (use the mouse wheel, drag, or the on-map controls to zoom/move) */}
      <section className="px-5" aria-label="Our location in Philadelphia, PA">
        <Reveal className="mx-auto max-w-[1224px]">
          <iframe
            title="HUJ Consulting location in Philadelphia, PA"
            src="https://maps.google.com/maps?q=Philadelphia%2C%20PA%2C%20USA&z=12&ie=UTF8&output=embed"
            className="block h-[320px] w-full border-0 md:h-[424px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Philadelphia%2C+PA%2C+USA"
            target="_blank"
            rel="noopener noreferrer"
            className="sr-only"
          >
            View HUJ Consulting&apos;s location in Philadelphia, PA on Google Maps
          </a>
        </Reveal>
      </section>
    </main>
  );
}