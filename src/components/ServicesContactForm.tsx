"use client";

import { useState } from "react";
import { sendContact } from "@/lib/api";

const labelClass = "mb-2 block text-[15px] text-[#1a1f2b]";
const inputClass =
  "w-full rounded-xl border border-[#d9dde6] bg-white px-5 text-lg text-[#1a1f2b] placeholder:text-[#8a93a3] focus:border-[#0a5fd8] focus:outline-none";

// Required-field star: visible, but screen readers use aria-required instead
const Star = () => <span aria-hidden="true">*</span>;

export default function ServicesContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // bots fill this hidden field, people never see it
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSent(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return; // spam, ignore silently

    setSending(true);
    setError("");
    const result = await sendContact({ ...form, source: "services", website: honeypot });
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
      aria-labelledby="get-in-touch" /* the "Get in Touch" h2 on the Services page */
      aria-describedby="services-form-status"
    >
      <div>
        <label htmlFor="name" className={labelClass}>Your Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          placeholder="Enter full name"
          value={form.name}
          onChange={handleChange}
          className={`${inputClass} h-[55px]`}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={labelClass}>
          Email Address<Star />
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
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className={`${inputClass} h-[55px]`}
        />
      </div>

      <div className="mt-5">
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
          placeholder="Write your message"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} h-[96px] resize-none py-4`}
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

      <button
        type="submit"
        disabled={sending}
        className="mt-6 cursor-pointer rounded-full bg-[#0a5fd8] px-7 py-4 text-base font-semibold text-white shadow-[0_8px_20px_rgba(10,95,216,0.3)] transition hover:bg-[#0b6cf0] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>

      <p
        id="services-form-status"
        role="status"
        aria-live="polite"
        className={`mt-4 text-sm ${error ? "text-red-600" : "text-[#2f7a4f]"} ${sent || error ? "" : "sr-only"}`}
      >
        {error || (sent ? "Thank you! Your message has been sent." : "")}
      </p>
    </form>
  );
}