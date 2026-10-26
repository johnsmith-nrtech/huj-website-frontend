import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://hujconsulting.com"; // change if your domain differs

/* ---------- Site-wide SEO defaults (pages can override any of these) ---------- */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HUJ Consulting | Regulatory, QMS & Compliance for Life Sciences",
  description:
    "HUJ Consulting helps medical device and life sciences companies with QMS design, global regulatory strategy (FDA, EU MDR, Health Canada), GxP validation and audit readiness.",
  applicationName: "HUJ Consulting",
  authors: [{ name: "HUJ Technologies LLC" }],
  creator: "HUJ Technologies LLC",
  publisher: "HUJ Technologies LLC",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: "HUJ Consulting",
    locale: "en_US",
    url: SITE_URL,
    title: "HUJ Consulting | Regulatory, QMS & Compliance for Life Sciences",
    description:
      "Compliance for a healthier tomorrow. Regulatory strategy, QMS design and GxP validation for life sciences and medical device teams.",
    images: [
      {
        url: "/images/hero-bg.jpg", // TODO: replace with a 1200x630 share image, e.g. /images/og-image.jpg
        width: 1200,
        height: 630,
        alt: "HUJ Consulting – Compliance for a healthier tomorrow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUJ Consulting | Regulatory, QMS & Compliance for Life Sciences",
    description:
      "Compliance for a healthier tomorrow. Regulatory strategy, QMS design and GxP validation for life sciences teams.",
    images: ["/images/hero-bg.jpg"],
  },
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/images/hujj-icon.png",   // browser tab icon
    apple: "/images/hujj-icon.png",  // iPhone home-screen icon
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14698a",
};

/* ---------- Structured data shown on every page ---------- */

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "HUJ Technologies LLC",
      alternateName: "HUJ Consulting",
      url: SITE_URL,
      logo: `${SITE_URL}/images/hujj-logo.png`,
      email: "info@hujconsulting.com",
      slogan: "Compliance for a healthier tomorrow.",
      description:
        "AI, IT and health risk management: regulatory strategy, QMS design and GxP validation for life sciences and medical device organizations.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Philadelphia",
        addressRegion: "PA",
        addressCountry: "US",
      },
      sameAs: [
        "https://www.linkedin.com/company/huj-tech-consultancy",
        "https://www.instagram.com/hujconsulting/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "HUJ Consulting",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />

        {/* Lets keyboard / screen-reader users skip the navbar */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0f1f47]"
        >
          Skip to main content
        </a>

        {/* Navbar and Footer hide themselves on /admin pages */}
        <Navbar />
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}