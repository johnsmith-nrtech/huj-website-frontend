import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs
const CONTACT_EMAIL = "info@hujconsulting.com";
const PATH = "/terms-of-use";

const linkClass = "font-medium text-[#14527a] underline underline-offset-2 hover:text-[#1fb6e8]";

type LegalSection = { title: string; content: ReactNode };

/** Bulleted list: [bold label, text] pairs, or plain strings */
function Bullets({ items }: { items: (string | [string, string])[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-[#1fb6e8]">
      {items.map((item) =>
        typeof item === "string" ? (
          <li key={item}>{item}</li>
        ) : (
          <li key={item[0]}>
            <strong className="font-semibold text-[#0f1f47]">{item[0]}:</strong> {item[1]}
          </li>
        )
      )}
    </ul>
  );
}

export const metadata: Metadata = {
  title: "Terms of Use | HUJ Consulting",
  description:
    "The terms and conditions that apply when you access or use the HUJ Technologies LLC (HUJ Consulting) website.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const sections: LegalSection[] = [
  {
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using this website, you agree to be bound by these Terms of Use and our{" "}
        <Link href="/privacy-policy" className={linkClass}>
          Privacy Policy
        </Link>
        . If you do not agree with any part of these terms, please do not use the website.
      </p>
    ),
  },
  {
    title: "Use of the Website",
    content: (
      <>
        <p>You agree to use this website only for lawful purposes. You must not:</p>
        <Bullets
          items={[
            "Use the website in any way that breaches applicable local, national, or international laws or regulations.",
            "Attempt to gain unauthorized access to the website, its servers, or any connected systems or databases.",
            "Introduce viruses, malware, or any other harmful or malicious code.",
            "Submit false, misleading, or spam information through our contact or quote forms.",
            "Copy, scrape, or harvest content or data from the website using automated means without our written permission.",
          ]}
        />
      </>
    ),
  },
  {
    title: "No Professional Advice",
    content: (
      <p>
        Content on this website about quality management systems, regulatory pathways, GxP validation, audits,
        and related topics is provided for general information only. It is not legal, regulatory, or
        professional advice for your specific situation. Please read our{" "}
        <Link href="/disclaimer" className={linkClass}>
          Disclaimer
        </Link>{" "}
        for more details.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p>
        All content on this website, including text, graphics, logos, images, icons, and layout, is the
        property of HUJ Technologies LLC or its licensors and is protected by copyright, trademark, and other
        intellectual property laws. You may view and print pages for your personal or internal business
        reference, but you may not reproduce, distribute, modify, or republish any content without our prior
        written consent.
      </p>
    ),
  },
  {
    title: "Information You Submit",
    content: (
      <p>
        When you send us information through our forms or by email, you confirm that it is accurate and that
        you have the right to share it. Please do not submit confidential product, patient, or proprietary
        data through the website forms; we will arrange a secure channel for such information once an
        engagement begins. How we handle the information you submit is described in our Privacy Policy.
      </p>
    ),
  },
  {
    title: "Third-Party Links",
    content: (
      <p>
        This website may contain links to third-party websites, such as regulatory authority sites. These
        links are provided for convenience only. We do not control and are not responsible for the content,
        policies, or practices of any third-party website.
      </p>
    ),
  },
  {
    title: "Disclaimer of Warranties",
    content: (
      <p>
        The website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        basis. We make no warranties, express or implied, regarding the accuracy, completeness, reliability,
        or availability of the website, or that it will be free of errors or interruptions.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, HUJ Technologies LLC, its owners, employees, and partners will
        not be liable for any direct, indirect, incidental, consequential, or special damages arising from
        your use of, or inability to use, this website or any content on it.
      </p>
    ),
  },
  {
    title: "Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless HUJ Technologies LLC from any claims, losses, or expenses
        (including reasonable legal fees) arising from your misuse of the website or your breach of these
        Terms of Use.
      </p>
    ),
  },
  {
    title: "Governing Law",
    content: (
      <p>
        These Terms of Use are governed by the laws of the Commonwealth of Pennsylvania, United States,
        without regard to its conflict of law principles. Any disputes will be subject to the jurisdiction of
        the courts located in Pennsylvania.
      </p>
    ),
  },
  {
    title: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms of Use from time to time. Changes take effect when posted on this page. Your continued use of the website means you accept the
        updated terms.
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <>
        <p>For questions about these Terms of Use, contact us at:</p>
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
      name: "Terms of Use | HUJ Consulting",
      url: `${SITE_URL}${PATH}`,
      publisher: { "@type": "Organization", name: "HUJ Technologies LLC", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Terms of Use", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

export default function TermsOfUsePage() {
  return (
    <main className="bg-white text-[#0f1f47]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header band */}
      <section aria-labelledby="legal-heading" className="bg-[#253C97] px-5 pb-16 pt-36 text-center md:pb-20 md:pt-40">
        <h1 id="legal-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Terms of Use
        </h1>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-[860px] px-5 py-14 text-base leading-7 text-[#3f4a5c] md:py-20">
        <div className="space-y-4">
          <p>
            These Terms of Use govern your access to and use of{" "}
            <a href={SITE_URL} className={linkClass}>
              {SITE_URL}
            </a>
            , operated by HUJ Technologies LLC. Please read them carefully before using the website.
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