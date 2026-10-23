"use client";

import { useState } from "react";

type Faq = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="rounded-2xl border border-[#e6e9ee] bg-white shadow-[0_2px_10px_rgba(15,31,71,0.03)]"
          >
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-[18px] text-left"
              >
                <span className="font-[family-name:var(--font-heading)] text-[17px] font-bold text-[#0f1f47]">
                  {item.q}
                </span>
                <span aria-hidden="true" className="text-2xl font-bold leading-none text-[#0f1f47]">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {/* Always in the HTML (so search engines can read it), only hidden visually */}
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              hidden={!isOpen}
            >
              <p className="px-6 pb-5 text-base leading-7 text-[#5b6472]">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}