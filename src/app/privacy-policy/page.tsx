import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs
const CONTACT_EMAIL = "info@hujconsulting.com";
const PATH = "/privacy-policy";

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
  title: "Privacy Policy | HUJ Consulting",
  description:
    "How HUJ Technologies LLC (HUJ Consulting) collects, uses, shares and protects your personal information when you use our website.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const sections: LegalSection[] = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p>We collect several types of information from and about users of our website:</p>
        <Bullets
          items={[
            [
              "Personal Information",
              "Name, email address, phone number, company name, and project requirements submitted voluntarily through contact forms, quote requests, or direct correspondence.",
            ],
            [
              "Automated Data / Usage Details",
              "IP addresses, browser types, operating systems, referring URLs, pages visited, and duration of visits collected via cookies and tracking technology.",
            ],
            [
              "Client & Job Applicant Data",
              "Resumes, work history, or client onboarding details submitted for employment or business engagement.",
            ],
          ]}
        />
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <Bullets
          items={[
            "Respond to inquiries, send service quotes, and deliver requested technical services.",
            "Improve our website layout, user experience, and service offerings.",
            "Send administrative communications, technical notices, or promotional updates (you may opt out at any time).",
            "Maintain website security, prevent fraud, and comply with legal obligations.",
          ]}
        />
      </>
    ),
  },
  {
    title: "Cookies and Tracking Technologies",
    content: (
      <p>
        We use cookies, web beacons, and similar tracking tools (such as Google Analytics) to analyze web
        traffic and user behavior. You can set your browser to refuse all or some cookies, but doing so may
        limit certain site functionalities. See our{" "}
        <Link href="/cookie-policy" className={linkClass}>
          Cookie Policy
        </Link>{" "}
        for more details.
      </p>
    ),
  },
  {
    title: "Disclosure & Sharing of Information",
    content: (
      <>
        <p>We do not sell, rent, or trade your personal information. We may share data with:</p>
        <Bullets
          items={[
            [
              "Service Providers",
              "Trusted third-party vendors who assist in website hosting, analytics, CRM management, or communication (under confidentiality obligations).",
            ],
            [
              "Legal Compliance",
              "Authorities or regulators if required by law, court order, or governmental regulation.",
            ],
            ["Business Transfers", "Parties involved in a merger, acquisition, or sale of company assets."],
          ]}
        />
      </>
    ),
  },
  {
    title: "Data Security",
    content: (
      <p>
        We implement appropriate technical and organizational measures (such as SSL encryption and access
        controls) to protect your personal data against unauthorized access, loss, or disclosure. However, no
        internet transmission is 100% secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <p>
        We retain personal information only for as long as necessary to fulfill the purposes outlined in this
        policy, complete business contracts, or comply with statutory requirements.
      </p>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <>
        <p>
          Depending on your location (e.g., under GDPR, CCPA, or applicable data protection laws), you may
          have the following rights:
        </p>
        <Bullets
          items={[
            ["Access", "Request a copy of the personal data we hold about you."],
            ["Correction", "Request correction of inaccurate or incomplete data."],
            ["Deletion", "Request erasure of your personal data (“Right to be Forgotten”)."],
            [
              "Opt-Out",
              "Unsubscribe from marketing communications at any time via the “Unsubscribe” link in emails.",
            ],
          ]}
        />
        <p>
          To exercise these rights, please contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "Third-Party Links",
    content: (
      <p>
        Our website may contain links to external sites not operated by us. We encourage you to review the
        privacy policies of every site you visit, as we have no control over third-party practices.
      </p>
    ),
  },
  {
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update our Privacy Policy periodically. Any changes will be posted on this page.
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <>
        <p>For questions or concerns regarding this Privacy Policy, reach out to us at:</p>
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
      name: "Privacy Policy | HUJ Consulting",
      url: `${SITE_URL}${PATH}`,
      publisher: { "@type": "Organization", name: "HUJ Technologies LLC", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-[#0f1f47]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header band */}
      <section aria-labelledby="legal-heading" className="bg-[#253C97] px-5 pb-16 pt-36 text-center md:pb-20 md:pt-40">
        <h1 id="legal-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Privacy Policy
        </h1>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-[860px] px-5 py-14 text-base leading-7 text-[#3f4a5c] md:py-20">
        <div className="space-y-4">
          <p>
            At HUJ Technologies LLC we value your privacy and are committed to protecting your personal data. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit{" "}
            <a href={SITE_URL} className={linkClass}>
              {SITE_URL}
            </a>
            .
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