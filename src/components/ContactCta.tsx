"use client";

import { useState } from "react";
import { sendContact } from "@/lib/api";

const inputClass =
  "w-full rounded-md bg-[#eeeff2] px-5 text-lg text-[#1a2236] placeholder:text-[#7b8494] focus:outline-none focus:ring-2 focus:ring-[#2bb5f5]";
const labelClass = "mb-2 block text-lg font-medium text-white";

export default function ContactCta() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSending(true);
    setError("");
    setSent(false);
    const result = await sendContact({ ...form, source: "home" });
    setSending(false);

    if (result.ok) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {/* Banner */}
      <section aria-labelledby="roadmap-heading" className="bg-[#09183C] px-5 py-16 text-center md:py-20">
        <h2 id="roadmap-heading" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Let&apos;s talk about your compliance roadmap.
        </h2>
        <p className="mt-1 text-base text-white/85 md:text-lg">
          Your existing form goes right below this section.
        </p>
      </section>

      {/* Form section */}
      <section
        id="launch-access"
        aria-labelledby="launch-access-heading"
        className="bg-[#000000] px-5 py-16 md:px-16 md:py-24 lg:px-24"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div className="flex flex-col justify-between gap-10 lg:pt-12">
            <p className="text-base uppercase text-[#2bb5f5]">Secure Launch Access</p>

            <h2
              id="launch-access-heading"
              className="text-5xl font-medium leading-[1.15] text-white md:text-6xl"
            >
              Establish compliance readiness
            </h2>

            <p className="max-w-lg text-base leading-7 text-white/85 md:text-lg">
              Register to receive priority updates regarding our upcoming official
              launch and secure early advisory access for your enterprise IT
              compliance needs.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            aria-labelledby="launch-access-heading"
            className="w-full"
          >
            <div>
              <label htmlFor="cta-name" className={labelClass}>Full Name*</label>
              <input
                id="cta-name"
                name="name"
                type="text"
                required
                aria-required="true"
                autoComplete="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className={`${inputClass} h-14`}
              />
            </div>

            <div className="mt-7">
              <label htmlFor="cta-email" className={labelClass}>Enterprise Email*</label>
              <input
                id="cta-email"
                name="email"
                type="email"
                required
                aria-required="true"
                autoComplete="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={handleChange}
                className={`${inputClass} h-14`}
              />
            </div>

            <div className="mt-7">
              <label htmlFor="cta-message" className={labelClass}>Compliance Requirements</label>
              <textarea
                id="cta-message"
                name="message"
                rows={4}
                placeholder="Describe your system validation or remediation needs..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} h-[115px] resize-none py-4`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 cursor-pointer rounded-md bg-[#2bb5f5] px-8 py-4 text-base font-semibold text-[#0f1729] transition hover:bg-[#52c6fa] disabled:cursor-not-allowed disabled:opacity-60 md:text-lg"
            >
              {sending ? "Sending..." : "Register for Launch Updates"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`mt-4 text-sm ${error ? "text-red-400" : "text-[#4fe3d0]"} ${sent || error ? "" : "sr-only"}`}
            >
              {error || (sent ? "Thank you! We'll be in touch with launch updates soon." : "")}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}