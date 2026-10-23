"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICE_ICON_NAMES, iconLabel } from "@/lib/serviceIcons";

/** Dropdown that shows lucide icons in a searchable grid. */
export default function IconPicker({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (name: string) => void;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    searchRef.current?.focus();
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const names = q
    ? SERVICE_ICON_NAMES.filter((n) => iconLabel(n).toLowerCase().includes(q) || n.toLowerCase().includes(q))
    : SERVICE_ICON_NAMES;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg border border-[#d9dde6] bg-white px-3 text-left text-sm text-[#1a2236] focus:border-[#2bb5f5] focus:outline-none focus:ring-2 focus:ring-[#2bb5f5]/30"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#0f1b3d] text-white">
          <ServiceIcon name={value} size={16} />
        </span>
        <span className="flex-1 truncate">{iconLabel(value)}</span>
        <ChevronDown size={16} aria-hidden="true" className={`text-[#5b6472] transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-[#e6e9ee] bg-white p-3 shadow-[0_16px_40px_rgba(15,31,71,0.15)]"
        >
          <div className="relative">
            <Search size={15} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]" />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons..."
              aria-label="Search icons"
              className="h-9 w-full rounded-lg border border-[#d9dde6] pl-9 pr-3 text-sm focus:border-[#2bb5f5] focus:outline-none"
            />
          </div>

          {names.length === 0 ? (
            <p className="py-6 text-center text-sm text-[#5b6472]">No icons match &ldquo;{query}&rdquo;.</p>
          ) : (
            <div className="mt-3 grid max-h-[240px] grid-cols-6 gap-1.5 overflow-y-auto">
              {names.map((name) => {
                const selected = name === value;
                return (
                  <button
                    key={name}
                    type="button"
                    title={iconLabel(name)}
                    aria-label={iconLabel(name)}
                    aria-pressed={selected}
                    onClick={() => {
                      onChange(name);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`grid h-11 cursor-pointer place-items-center rounded-lg transition ${
                      selected
                        ? "bg-[#0f1b3d] text-white"
                        : "text-[#1a2236] hover:bg-[#eef6fb] hover:text-[#14527a]"
                    }`}
                  >
                    <ServiceIcon name={name} size={20} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}