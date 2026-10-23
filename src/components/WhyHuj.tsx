import Reveal from "@/components/Reveal";

const reasons = [
  {
    title: "Precision",
    text: "Compliance work leaves no room for guesswork.",
  },
  {
    title: "AI-Powered Insight",
    text: "Smart tools that monitor regulatory change and flag gaps early.",
  },
  {
    title: "Partnership",
    text: "We work alongside your team, not just around it.",
  },
];

export default function WhyHuj() {
  return (
    <section aria-labelledby="why-huj-heading" className="bg-white px-5 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        {/* Heading (appears first) */}
        <Reveal>
          <h2
            id="why-huj-heading"
            className="text-center text-3xl font-bold tracking-tight text-[#0f1f47] md:text-4xl"
          >
            Why HUJ
          </h2>
        </Reveal>

        {/* Cards: left, then center, then right */}
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {reasons.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={150 + i * 150} className="h-full">
                <article className="h-full rounded-2xl border border-[#e6e9ee] bg-white px-6 py-8 shadow-[0_6px_24px_rgba(15,31,71,0.04)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,31,71,0.1)]">
                  <span aria-hidden="true" className="block h-1 w-7 rounded-full bg-[#4fe3d0]" />
                  <h3 className="mt-5 text-xl font-bold text-[#0f1f47]">{r.title}</h3>
                  <p className="mt-2 text-base leading-6 text-[#5b6472]">{r.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}