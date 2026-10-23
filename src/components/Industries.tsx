import Reveal from "@/components/Reveal";

const industries = [
  {
    title: "Medical Device Manufacturers",
    text: "From 510(k) submissions through post-market surveillance.",
  },
  {
    title: "Biotechnology Companies",
    text: "Validation and quality systems built for fast-moving R&D.",
  },
  {
    title: "Pharmaceutical Organizations",
    text: "GxP compliance across manufacturing and clinical operations.",
  },
  {
    title: "Regulated Life Sciences Enterprises",
    text: "Multi-jurisdiction compliance support at every stage.",
  },
];

export default function Industries() {
  return (
    <section aria-labelledby="industries-heading" className="bg-[#DDE9F7] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1500px]">
        {/* Heading (appears first) */}
        <Reveal className="text-center">
          <h2
            id="industries-heading"
            className="text-3xl font-bold tracking-tight text-[#0f1f47] md:text-3xl"
          >
            Industries We Serve
          </h2>
          <p className="mt-2 text-base text-[#5b6472]">
            Global regulatory expertise across the life sciences landscape.
          </p>
        </Reveal>

        {/* Cards: left to right, one after another */}
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={150 + i * 150} className="h-full">
                <article className="h-full min-h-[160px] rounded-2xl border border-[#e6e9ee] bg-white px-6 py-6 text-center shadow-[0_6px_24px_rgba(15,31,71,0.04)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,31,71,0.1)]">
                  <h3 className="text-[15px] font-semibold leading-snug text-[#0f1f47]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-5.5 text-[#5b6472]">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}