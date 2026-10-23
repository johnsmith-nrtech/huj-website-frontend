import { Suspense } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPublicServices } from "@/lib/servicesApi";

// Top 3 visible services from the admin panel (/admin/services), in their order
async function ServiceCards() {
  const result = await getPublicServices(1);
  const services = result?.services.slice(0, 3) ?? [];
  if (services.length === 0) return null;

  return (
    <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <li key={s.id}>
          {/* Left card first, then center, then right */}
          <Reveal delay={150 + i * 150} className="h-full">
            <article className="h-full cursor-pointer rounded-xl border border-[#e6e9ee] hover:border-green-400 bg-white px-7 py-8 shadow-[0_8px_30px_rgba(15,31,71,0.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,31,71,0.12)]">
              <h3 className="text-lg font-semibold text-[#0f1f47]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-5.5 text-[#5b6472]">{s.description}</p>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export default function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do-heading" className="bg-white px-5 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading (appears first) */}
        <Reveal className="text-center">
          <h2
            id="what-we-do-heading"
            className="text-3xl font-bold tracking-tight text-[#0f1f47] md:text-4xl"
          >
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#5b6472] md:text-lg">
            Rigorous compliance frameworks for enterprises that cannot afford to get it wrong.
          </p>
        </Reveal>

        {/* Cards (managed in /admin/services) */}
        <Suspense fallback={<p className="mt-14 text-center text-[#5b6472]">Loading services...</p>}>
          <ServiceCards />
        </Suspense>

        {/* Link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            title="See all regulatory, QMS and compliance services"
            className="inline-block border-b-[3px] border-[#4fe3d0] pb-1 text-lg font-semibold text-[#0f1f47] transition hover:opacity-80"
          >
            See All Services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}