"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import {
  adminCreateFaq,
  adminDeleteFaq,
  adminListFaqs,
  adminUpdateFaq,
  type Faq,
  type FaqInput,
} from "@/lib/faqApi";

const emptyForm: FaqInput = { question: "", answer: "", sort_order: 0, is_active: true };

const inputClass =
  "w-full rounded-lg border border-[#d9dde6] bg-white px-4 text-sm text-[#1a2236] placeholder:text-[#9aa3b2] focus:border-[#2bb5f5] focus:outline-none focus:ring-2 focus:ring-[#2bb5f5]/30";

function PageHead() {
  return (
    <>
      {/* React 19 hoists these into <head> */}
      <title>FAQ | HUJ Admin</title>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}

export default function AdminFaqPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState<FaqInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  // 401 anywhere -> session expired
  const handleUnauthorized = useCallback(
    (status: number) => {
      if (status === 401) {
        router.replace("/admin/login");
        return true;
      }
      return false;
    },
    [router]
  );

  const loadFaqs = useCallback(async () => {
    const res = await adminListFaqs();
    if (handleUnauthorized(res.status)) return;
    if (res.ok && res.data) {
      setFaqs(res.data.faqs);
      setLoadError("");
    } else {
      setLoadError(res.error ?? "Could not load FAQs.");
    }
    setLoading(false);
  }, [handleUnauthorized]);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormError("");
    setFieldErrors({});
  };

  const startEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setForm({
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order,
      is_active: faq.is_active,
    });
    setFormError("");
    setFieldErrors({});
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    setFieldErrors({});
    setNotice("");

    const res = editingId ? await adminUpdateFaq(editingId, form) : await adminCreateFaq(form);
    setSaving(false);
    if (handleUnauthorized(res.status)) return;

    if (res.ok) {
      setNotice(editingId ? "FAQ updated." : "FAQ added.");
      resetForm();
      loadFaqs();
    } else {
      setFormError(res.error ?? "Could not save the FAQ.");
      setFieldErrors(res.errors ?? {});
    }
  };

  const handleDelete = async (faq: Faq) => {
    if (!window.confirm(`Delete this FAQ?\n\n"${faq.question}"`)) return;
    setNotice("");

    const res = await adminDeleteFaq(faq.id);
    if (handleUnauthorized(res.status)) return;

    if (res.ok) {
      if (editingId === faq.id) resetForm();
      setNotice("FAQ deleted.");
      loadFaqs();
    } else {
      setNotice(res.error ?? "Could not delete the FAQ.");
    }
  };

  const toggleActive = async (faq: Faq) => {
    setNotice("");
    const res = await adminUpdateFaq(faq.id, {
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order,
      is_active: !faq.is_active,
    });
    if (handleUnauthorized(res.status)) return;

    if (res.ok) loadFaqs();
    else setNotice(res.error ?? "Could not update the FAQ.");
  };

  return (
    <div>
      <PageHead />
      <h1 className="text-2xl font-bold text-[#0f1f47]">FAQ</h1>
      <p className="mt-1 text-sm text-[#5b6472]">
        Questions shown in the &ldquo;Common Questions&rdquo; section of the Services page.
      </p>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[400px_1fr]">
        {/* Add / edit form */}
        <form
          onSubmit={handleSubmit}
          aria-labelledby="faq-form-heading"
          className="rounded-2xl border border-[#e6e9ee] bg-white p-5 shadow-[0_6px_20px_rgba(15,31,71,0.04)] xl:sticky xl:top-[96px]"
        >
          <h2 id="faq-form-heading" className="text-lg font-semibold text-[#0f1f47]">
            {editingId ? "Edit FAQ" : "Add FAQ"}
          </h2>

          <div className="mt-4">
            <label htmlFor="faq-question" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
              Question
            </label>
            <input
              id="faq-question"
              type="text"
              required
              maxLength={300}
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="e.g. What is a QMS?"
              className={`${inputClass} h-11`}
            />
            {fieldErrors.question && <p className="mt-1 text-xs text-red-600">{fieldErrors.question}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="faq-answer" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
              Answer
            </label>
            <textarea
              id="faq-answer"
              required
              rows={6}
              maxLength={5000}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              placeholder="Write the answer..."
              className={`${inputClass} resize-y py-3`}
            />
            {fieldErrors.answer && <p className="mt-1 text-xs text-red-600">{fieldErrors.answer}</p>}
          </div>

          <div className="mt-4 flex items-end gap-4">
            <div className="w-28">
              <label htmlFor="faq-order" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
                Order
              </label>
              <input
                id="faq-order"
                type="number"
                min={0}
                step={1}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                className={`${inputClass} h-11`}
              />
            </div>

            <label className="flex h-11 cursor-pointer items-center gap-2 text-sm text-[#1a2236]">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="h-4 w-4 accent-[#2bb5f5]"
              />
              Show on website
            </label>
          </div>
          {fieldErrors.sort_order && <p className="mt-1 text-xs text-red-600">{fieldErrors.sort_order}</p>}
          <p className="mt-1 text-xs text-[#9aa3b2]">Lower order numbers appear first.</p>

          <p role="alert" className={`mt-4 text-sm text-red-600 ${formError ? "" : "sr-only"}`}>
            {formError}
          </p>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2bb5f5] text-sm font-semibold text-[#0f1729] transition hover:bg-[#52c6fa] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {!editingId && <Plus size={16} aria-hidden="true" />}
              {saving ? "Saving..." : editingId ? "Save changes" : "Add FAQ"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="h-11 cursor-pointer rounded-lg border border-[#d9dde6] px-4 text-sm font-medium text-[#5b6472] transition hover:bg-[#f4f6fa]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <section aria-labelledby="faq-list-heading">
          <div className="flex items-center justify-between">
            <h2 id="faq-list-heading" className="text-lg font-semibold text-[#0f1f47]">
              All FAQs {!loading && <span className="text-sm font-normal text-[#5b6472]">({faqs.length})</span>}
            </h2>
          </div>

          <p role="status" className={`mt-2 text-sm text-[#0f7a5e] ${notice ? "" : "sr-only"}`}>
            {notice}
          </p>

          <div className="mt-3 rounded-2xl border border-[#e6e9ee] bg-white shadow-[0_6px_20px_rgba(15,31,71,0.04)]">
            {loading ? (
              <p className="p-6 text-sm text-[#5b6472]">Loading FAQs...</p>
            ) : loadError ? (
              <p role="alert" className="m-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {loadError}
              </p>
            ) : faqs.length === 0 ? (
              <p className="p-6 text-sm text-[#5b6472]">No FAQs yet. Add your first one.</p>
            ) : (
              <ul className="divide-y divide-[#eef0f4]">
                {faqs.map((faq) => (
                  <li
                    key={faq.id}
                    className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-start ${
                      editingId === faq.id ? "bg-[#f2fbff]" : ""
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#eef0f4] px-2.5 py-0.5 text-xs font-medium text-[#5b6472]">
                          #{faq.sort_order}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            faq.is_active ? "bg-[#e3f8f1] text-[#0f7a5e]" : "bg-[#fdecec] text-[#b42318]"
                          }`}
                        >
                          {faq.is_active ? "Visible" : "Hidden"}
                        </span>
                      </div>
                      <p className="mt-2 font-semibold text-[#0f1f47]">{faq.question}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-[#5b6472]">{faq.answer}</p>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => toggleActive(faq)}
                        aria-label={faq.is_active ? `Hide "${faq.question}"` : `Show "${faq.question}"`}
                        title={faq.is_active ? "Hide from website" : "Show on website"}
                        className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#5b6472] transition hover:bg-[#f4f6fa] hover:text-[#0f1f47]"
                      >
                        {faq.is_active ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(faq)}
                        aria-label={`Edit "${faq.question}"`}
                        title="Edit"
                        className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#5b6472] transition hover:bg-[#f4f6fa] hover:text-[#0f1f47]"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(faq)}
                        aria-label={`Delete "${faq.question}"`}
                        title="Delete"
                        className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#5b6472] transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}