"use client";

import { useState } from "react";
import { sendContact } from "@/lib/api";

const labelClass = "mb-1.5 block text-base text-[#0a0a0a]";
const inputClass =
  "w-full bg-[#f0f0f0] px-4 text-base text-[#0a0a0a] placeholder:text-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]/40";

// Required-field star: visible, but screen readers use aria-required instead
const Star = () => <span aria-hidden="true">*</span>;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSent(false);
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return; // spam, ignore silently

    setSending(true);
    setError("");
    const result = await sendContact({ ...form, source: "contact", website: honeypot });
    setSending(false);

    if (result.ok) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="form-heading" /* the hidden "Send us a message" h2 on the page */
      aria-describedby="form-status"
      className="mx-auto w-full max-w-[606px]"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          Name<Star />
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          autoComplete="name"
          minLength={2}
          maxLength={100}
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className={`${inputClass} h-12`}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="email" className={labelClass}>
          Your email<Star />
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          required
          aria-required="true"
          autoComplete="email"
          spellCheck={false}
          maxLength={254}
          placeholder="Your email address"
          value={form.email}
          onChange={handleChange}
          className={`${inputClass} h-12`}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          Message<Star />
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          autoComplete="off"
          minLength={10}
          maxLength={2000}
          placeholder="Enter your message"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} h-[120px] resize-none py-3`}
        />
      </div>

      {/* Honeypot: hidden from people and screen readers, catches spam bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={sending}
          aria-label="Submit your message to HUJ Consulting"
          className="bg-black cursor-pointer px-7 py-3 text-base font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending..." : "Submit"}
        </button>

        <p
          id="form-status"
          role="status"
          aria-live="polite"
          className={`mt-4 text-sm ${error ? "text-red-600" : "text-[#2f7a4f]"} ${sent || error ? "" : "sr-only"}`}
        >
          {error || (sent ? "Thank you! Your message has been sent." : "")}
        </p>
      </div>
    </form>
  );
}