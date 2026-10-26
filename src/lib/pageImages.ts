// All website images that can be changed from the admin panel, grouped by page.
// `defaultSrc` is shown until the admin uploads a replacement (or after "Reset to default").
// Every `slot` must also be listed in VALID_SLOTS in the backend's controllers/pageImageController.js

export const PAGE_IMAGE_GROUPS = [
  {
    page: "Home page",
    href: "/",
    images: [
      {
        slot: "home_hero",
        label: "Hero section (top banner)",
        defaultSrc: "/images/hero-img.jpeg",
        alt: "Scientist reviewing a global regulatory intelligence map covering FDA, TGA, EU MDR, PMDA, NMPA and Health Canada",
      },
    ],
  },
  {
    page: "About page",
    href: "/about",
    images: [
      {
        slot: "about_main",
        label: "Large image (below \"Get to know us\")",
        defaultSrc: "/images/about-img.webp",
        alt: "HUJ Technologies: innovation meets compliance",
      },
    ],
  },
  {
    page: "Services page",
    href: "/services",
    images: [
      {
        slot: "services_qms",
        label: "QMS Design card",
        defaultSrc: "/images/service1.jpg",
        alt: "Consultant reviewing a quality management system document aligned with ISO 13485",
      },
      {
        slot: "services_regulatory",
        label: "Regulatory card",
        defaultSrc: "/images/service2.jpg",
        alt: "Regulatory analytics dashboard on a monitor for global market entry",
      },
      {
        slot: "services_digital",
        label: "Digital card",
        defaultSrc: "/images/service3.jpg",
        alt: "Team working on laptops during a compliance gap assessment",
      },
      {
        slot: "services_get_in_touch",
        label: "Get in Touch section",
        defaultSrc: "/images/getintouch.jpg",
        alt: "HUJ Consulting team ready to discuss quality and regulatory solutions",
      },
    ],
  },
] as const;

export type PageImageSlot = (typeof PAGE_IMAGE_GROUPS)[number]["images"][number]["slot"];

export type PageImageInfo = {
  slot: PageImageSlot;
  label: string;
  defaultSrc: string;
  alt: string;
};

const ALL_IMAGES: PageImageInfo[] = PAGE_IMAGE_GROUPS.flatMap((g) => [...g.images]);

export function getPageImage(slot: PageImageSlot): PageImageInfo {
  return ALL_IMAGES.find((img) => img.slot === slot)!;
}