import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs
const CONTACT_EMAIL = "info@hujconsulting.com";
const PATH = "/cookie-policy";

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
  title: "Cookie Policy | HUJ Consulting",
  description:
    "How HUJ Technologies LLC (HUJ Consulting) uses cookies and similar technologies on its website, and how you can control them.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const sections: LegalSection[] = [
  {
    title: "What Are Cookies",
    content: (
      <p>
        Cookies are small text files that a website stores on your computer or mobile device when you visit
        it. They help the website remember your actions and preferences and help us understand how visitors
        use the site. Similar technologies, such as web beacons and pixels, work in a comparable way.
      </p>
    ),
  },
  {
    title: "How We Use Cookies",
    content: (
      <>
        <p>We use the following types of cookies:</p>
        <Bullets
          items={[
            [
              "Essential Cookies",
              "Needed for the website to work properly and securely, for example to protect forms against spam and keep authorized users signed in. These cannot be switched off in our systems.",
            ],
            [
              "Analytics Cookies",
              "Help us understand how visitors find and use the website, such as which pages are visited most and how long visitors stay. We use tools such as Google Analytics for this. The data is aggregated and does not directly identify you.",
            ],
            [
              "Preference Cookies",
              "Remember choices you make, such as your settings, so the website works the way you expect on your next visit.",
            ],
          ]}
        />
      </>
    ),
  },
  {
    title: "Third-Party Cookies",
    content: (
      <p>
        Some cookies are set by third-party services that appear on our pages, such as analytics providers.
        These third parties have their own privacy and cookie policies, and we do not control the cookies
        they set.
      </p>
    ),
  },
  {
    title: "Managing Cookies",
    content: (
      <>
        <p>You can control and delete cookies at any time:</p>
        <Bullets
          items={[
            [
              "Browser Settings",
              "Most browsers let you block or delete cookies through their settings. Look under “Privacy” or “Cookies” in your browser’s settings menu.",
            ],
            [
              "Google Analytics Opt-Out",
              "You can prevent Google Analytics from using your data by installing the Google Analytics Opt-out Browser Add-on.",
            ],
          ]}
        />
        <p>
          The Google Analytics opt-out add-on is available at{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            tools.google.com/dlpage/gaoptout
          </a>
          . Please note that blocking some cookies may affect how parts of the website work.
        </p>
      </>
    ),
  },
  {
    title: "More About Your Data",
    content: (
      <p>
        For more information on how we collect and use personal information, including your rights, please
        read our{" "}
        <Link href="/privacy-policy" className={linkClass}>
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    title: "Changes to This Cookie Policy",
    content: (
      <p>
        We may update this Cookie Policy from time to time, for example if we add new tools to the website.
        Any changes will be posted on this page.
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <>
        <p>For questions about our use of cookies, contact us at:</p>
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
      name: "Cookie Policy | HUJ Consulting",
      url: `${SITE_URL}${PATH}`,
      publisher: { "@type": "Organization", name: "HUJ Technologies LLC", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Cookie Policy", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-white text-[#0f1f47]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header band */}
      <section aria-labelledby="legal-heading" className="bg-[#253C97] px-5 pb-16 pt-36 text-center md:pb-20 md:pt-40">
        <h1 id="legal-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Cookie Policy
        </h1>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-[860px] px-5 py-14 text-base leading-7 text-[#3f4a5c] md:py-20">
        <div className="space-y-4">
          <p>
            This Cookie Policy explains how HUJ Technologies LLC uses cookies and similar technologies when you visit{" "}
            <a href={SITE_URL} className={linkClass}>
              {SITE_URL}
            </a>
            , and the choices you have.
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