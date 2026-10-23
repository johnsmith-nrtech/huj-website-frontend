import Image from "next/image";

type Client = {
  /** Text shown on the card (until you add a logo) */
  name: string;
  /** Full name used for screen readers / alt text */
  label: string;
  /** Optional logo, e.g. "/images/clients/jnj.png" */
  logo?: string;
  className: string;
};

const clients: Client[] = [
  { logo:  "/images/mapple-tree.png", name: "Maple Tree Dental", label: "Maple Tree Dental", className: "font-serif text-lg text-[#9aa3ad]" },
  { logo:  "/images/logo-jnj.png", name: "J&J", label: "Johnson & Johnson", className: "text-4xl font-bold text-[#c8382f]" },
  { logo:  "/images/STERIMED_Logo.png", name: "STERILMED", label: "SterilMed", className: "text-base font-semibold tracking-[0.3em] text-[#6b7480]" },
  { logo:  "/images/cure-md-logo.png", name: "CureMD", label: "CureMD", className: "text-4xl font-semibold tracking-tight text-[#2f63ad]" },
  { logo:  "/images/NHS.webp", name: "NHS England", label: "NHS England", className: "text-2xl font-extrabold italic text-[#1c4f9c]" },
  { logo:  "/images/HSE-Logo.png", name: "HSE", label: "Health Service Executive (HSE)", className: "text-4xl font-bold italic text-[#2f7a4f]" },
  { logo:  "/images/indus-logo.jpg", name: "Indus Hospital", label: "Indus Hospital & Health Network", className: "text-base font-bold uppercase text-[#c8382f]" },
  { logo:  "/images/TUV-Logo-02.png", name: "TÜV Austria", label: "TÜV Austria", className: "text-2xl font-bold text-[#7a8794]" },
];

const cardClass =
  "mr-8 grid h-[150px] w-[260px] shrink-0 place-items-center rounded-3xl border border-[#e6e9ee] bg-white/70 shadow-[0_8px_30px_rgba(15,31,71,0.06)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,31,71,0.14)]";

function ClientCard({ c }: { c: Client }) {
  return (
    <li className={cardClass}>
      {c.logo ? (
        <Image
          src={c.logo}
          alt={`${c.label} logo`}
          width={180}
          height={90}
          className="h-auto max-h-[90px] w-auto max-w-[180px] object-contain"
        />
      ) : (
        <span className={c.className}>{c.name}</span>
      )}
    </li>
  );
}

export default function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="relative overflow-hidden px-5 py-16 md:py-20"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "radial-gradient(circle at 0% 20%, rgba(79,227,208,0.22), transparent 40%), radial-gradient(circle at 100% 90%, rgba(167,139,250,0.18), transparent 40%)",
      }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-1 w-8 rounded-full bg-[#4fe3d0]" />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0f9a86]">
              Trusted By
            </p>
            <span aria-hidden="true" className="h-1 w-8 rounded-full bg-[#4fe3d0]" />
          </div>

          <h2
            id="trusted-by-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-[#0f1f47] md:text-4xl"
          >
            Organizations That Rely On Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5b6472] md:text-lg">
            From global pharmaceutical leaders to national health systems — a track record
            built on discretion and rigor.
          </p>
        </div>

        {/* Slider: the first list is the real content, the second is a hidden copy for the loop */}
        <div
          className="mt-14 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee py-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
            <ul aria-label="Organizations that trust HUJ Consulting" className="flex">
              {clients.map((c) => (
                <ClientCard key={c.label} c={c} />
              ))}
            </ul>
            <ul aria-hidden="true" className="flex">
              {clients.map((c) => (
                <ClientCard key={`copy-${c.label}`} c={c} />
              ))}
            </ul>
          </div>
        </div>

        {/* Confidentiality note */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <span aria-hidden="true" className="hidden h-px w-16 bg-[#d5dae1] sm:block" />
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[#8a94a3] md:text-sm">
            Client relationships handled under strict confidentiality
          </p>
          <span aria-hidden="true" className="hidden h-px w-16 bg-[#d5dae1] sm:block" />
        </div>
      </div>
    </section>
  );
}