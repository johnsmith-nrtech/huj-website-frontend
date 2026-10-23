import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPageImages, resolveImageUrl } from "@/lib/pageImagesApi";
import { getPageImage } from "@/lib/pageImages";
import {
  Globe,
  Layers,
  ShieldCheck,
  Settings,
  FileCheck,
  BarChart3,
  Users,
  ArrowRight,
  Play,
} from "lucide-react";

const stats = [
  { icon: Globe, value: "20+", label: "Regulatory Authorities Mapped" },
  { icon: Layers, value: "8", label: "Core Service Offerings" },
  { icon: ShieldCheck, value: "24/7", label: "AI-Powered Monitoring" },
];

const pillars = [
  { icon: Settings, label: "Strategy" },
  { icon: FileCheck, label: "Compliance" },
  { icon: BarChart3, label: "Market Access" },
  { icon: Users, label: "Better Patient Outcomes" },
];

const regulators = [
  "PMDA",
  "NMPA",
  "TGA",
  "SFDA",
  "MDSAP",
  "ISO 13485",
  "FDA",
  "EU MDR",
  "IVDR",
  "MHRA",
  "HEALTH CANADA",
];

const regulatorItemClass =
  "whitespace-nowrap border-r border-[#e6ecef] px-7 text-sm font-bold tracking-[0.15em] text-[#6a7f9a]";

// Text fades up one line after another, top to bottom
const revealCss = `
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}
.hero-reveal { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
@media (prefers-reduced-motion: reduce) {
  .hero-reveal { animation: none; }
}
`;

// Delay (ms) for each line, in order from top to bottom
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

// Hero background: the image uploaded in /admin/images, or the default
async function HeroImage() {
  const { defaultSrc, alt } = getPageImage("home_hero");
  const uploaded = (await getPageImages())["home_hero"];

  return (
    <Image
      src={uploaded ? resolveImageUrl(uploaded) : defaultSrc}
      alt={alt}
      fill
      priority
      quality={85}
      sizes="100vw"
      unoptimized={Boolean(uploaded)} // uploaded images come from the backend, served as-is
      className="object-cover object-center"
    />
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-white">
      <style>{revealCss}</style>

      {/* Hero (shorter than full screen) */}
      <div className="relative flex min-h-[560px] items-center overflow-hidden bg-[#061628] px-5 pb-12 pt-28 text-white md:min-h-[78vh] md:px-16">
        {/* Background photo, changeable from the admin panel (/admin/images) */}
        <Suspense fallback={null}>
          <HeroImage />
        </Suspense>
        {/* Dark gradient so the text stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,22,40,0.95)_0%,rgba(6,22,40,0.75)_40%,rgba(6,22,40,0.1)_75%)]"
        />

        <div className="relative max-w-2xl">
          <p className="hero-reveal mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#35d9c4]" style={delay(0)}>
            AI · IT · Health Risk Management
          </p>

          <h1
            id="hero-heading"
            className="hero-reveal text-4xl font-bold leading-13 md:w-[330px] md:text-5xl"
            style={delay(150)}
          >
            Compliance for a{" "}
            <span className="bg-gradient-to-r from-[#4fe3c8] to-[#4cc3f5] bg-clip-text text-transparent">
              healthier
            </span>{" "}
            tomorrow.
          </h1>

          <p className="hero-reveal mt-5 max-w-xl text-sm leading-relaxed text-white/90 md:text-base" style={delay(300)}>
            HUJ Consulting maps FDA requirements to the regulatory frameworks that
            matter globally, so life sciences and medical device teams move into
            new markets with confidence, not guesswork.
          </p>

          <div className="hero-reveal mt-7 flex flex-wrap items-center gap-6" style={delay(450)}>
            <Link
              href="/services"
              title="Regulatory, QMS & Compliance Services"
              className="inline-flex items-center gap-3 rounded-full bg-[#4fe3d0] px-6 py-3 text-sm font-bold text-[#06263a] transition hover:bg-[#6cf0de] md:text-base"
            >
              Explore Our Services <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <button
              type="button"
              aria-label="Watch our story video"
              className="group inline-flex items-center gap-3 text-sm font-semibold md:text-base"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border-1 border-[#4fe3d0] transition group-hover:bg-[#4fe3d0]/20">
                <Play size={14} fill="currentColor" aria-hidden="true" />
              </span>
              Watch Our Story
            </button>
          </div>

          <ul aria-label="HUJ Consulting at a glance" className="hero-reveal mt-10 flex flex-wrap gap-y-5" style={delay(600)}>
            {stats.map(({ icon: Icon, value, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 pr-6 md:border-l md:border-white/20 md:px-6 md:first:border-l-0 md:first:pl-0"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#2fb8a6] text-[#4fe3d0]">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong className="block text-xl leading-tight">{value}</strong>
                  <small className="block max-w-[100px] text-[10px] text-white/75">
                    {label}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trusted expertise strip */}
      <div
        aria-label="Trusted expertise and global impact"
        className="flex flex-nowrap items-center border-b border-[#e6ecef] px-4 py-4 text-[#0a2f45] lg:px-8"
      >
        <div className="flex shrink-0 flex-col gap-0.5 border-r border-[#e6ecef] pr-4 text-[10px] font-semibold uppercase tracking-[0.15em]">
          <span>Trusted Expertise</span>
          <span>Global Impact</span>
        </div>

        <p className="max-w-[220px] px-4 text-[11px] leading-snug text-[#3f5a6b]">
          From strategy to submission, we help you navigate regulatory complexity
          with clarity, speed, and confidence.
        </p>

        <ul className="flex min-w-0 flex-1 flex-nowrap items-center">
          {pillars.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex min-w-0 flex-1 items-center gap-2 border-l border-[#e6ecef] px-3 text-[11px] font-semibold leading-tight text-[#14527a]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e6f3f8] text-[#1b7fa6]">
                <Icon size={14} aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <ArrowRight size={18} aria-hidden="true" className="ml-3 shrink-0 text-[#0a2f45]" />
      </div>

      {/* Regulator marquee: first list is real content, the copy is hidden decoration */}
      <div className="overflow-hidden border-b border-[#e6ecef] py-5">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          <ul aria-label="Regulatory authorities and standards we support" className="flex">
            {regulators.map((r) => (
              <li key={r} className={regulatorItemClass}>{r}</li>
            ))}
          </ul>
          <ul aria-hidden="true" className="flex">
            {regulators.map((r) => (
              <li key={`copy-${r}`} className={regulatorItemClass}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}