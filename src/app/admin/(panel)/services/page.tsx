"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import IconPicker from "@/components/IconPicker";
import ServiceIcon from "@/components/ServiceIcon";
import { DEFAULT_SERVICE_ICON } from "@/lib/serviceIcons";
import {
  adminCreateService,
  adminDeleteService,
  adminListServices,
  adminUpdateService,
  type Service,
  type ServiceInput,
} from "@/lib/servicesApi";

const PER_PAGE = 9; // must match PER_PAGE in the backend's serviceController.js

const emptyForm: ServiceInput = {
  title: "",
  description: "",
  icon: DEFAULT_SERVICE_ICON,
  sort_order: 0,
  is_active: true,
};

const inputClass =
  "w-full rounded-lg border border-[#d9dde6] bg-white px-4 text-sm text-[#1a2236] placeholder:text-[#9aa3b2] focus:border-[#2bb5f5] focus:outline-none focus:ring-2 focus:ring-[#2bb5f5]/30";

function PageHead() {
  return (
    <>
      {/* React 19 hoists these into <head> */}
      <title>Services | HUJ Admin</title>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState<ServiceInput>(emptyForm);
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

  const loadServices = useCallback(async () => {
    const res = await adminListServices();
    if (handleUnauthorized(res.status)) return;
    if (res.ok && res.data) {
      setServices(res.data.services);
      setLoadError("");
    } else {
      setLoadError(res.error ?? "Could not load services.");
    }
    setLoading(false);
  }, [handleUnauthorized]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormError("");
    setFieldErrors({});
  };

  const startEdit = (s: Service) => {
    setEditingId(s.id);
    setForm({
      title: s.title,
      description: s.description,
      icon: s.icon || DEFAULT_SERVICE_ICON,
      sort_order: s.sort_order,
      is_active: s.is_active,
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

    const res = editingId ? await adminUpdateService(editingId, form) : await adminCreateService(form);
    setSaving(false);
    if (handleUnauthorized(res.status)) return;

    if (res.ok) {
      setNotice(editingId ? "Service updated." : "Service added.");
      resetForm();
      loadServices();
    } else {
      setFormError(res.error ?? "Could not save the service.");
      setFieldErrors(res.errors ?? {});
    }
  };

  const handleDelete = async (s: Service) => {
    if (!window.confirm(`Delete this service?\n\n"${s.title}"`)) return;
    setNotice("");

    const res = await adminDeleteService(s.id);
    if (handleUnauthorized(res.status)) return;

    if (res.ok) {
      if (editingId === s.id) resetForm();
      setNotice("Service deleted.");
      loadServices();
    } else {
      setNotice(res.error ?? "Could not delete the service.");
    }
  };

  const toggleActive = async (s: Service) => {
    setNotice("");
    const res = await adminUpdateService(s.id, {
      title: s.title,
      description: s.description,
      icon: s.icon || DEFAULT_SERVICE_ICON,
      sort_order: s.sort_order,
      is_active: !s.is_active,
    });
    if (handleUnauthorized(res.status)) return;

    if (res.ok) loadServices();
    else setNotice(res.error ?? "Could not update the service.");
  };

  // Which website page each visible service lands on (9 per page)
  const visible = services.filter((s) => s.is_active);
  const pageOf = (s: Service) => Math.floor(visible.indexOf(s) / PER_PAGE) + 1;
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));

  return (
    <div>
      <PageHead />
      <h1 className="text-2xl font-bold text-[#0f1f47]">Services</h1>
      <p className="mt-1 text-sm text-[#5b6472]">
        Cards shown in the &ldquo;What We Do&rdquo; section of the Services page, {PER_PAGE} per page.
      </p>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[400px_1fr]">
        {/* Add / edit form */}
        <form
          onSubmit={handleSubmit}
          aria-labelledby="service-form-heading"
          className="rounded-2xl border border-[#e6e9ee] bg-white p-5 shadow-[0_6px_20px_rgba(15,31,71,0.04)] xl:sticky xl:top-[96px]"
        >
          <h2 id="service-form-heading" className="text-lg font-semibold text-[#0f1f47]">
            {editingId ? "Edit service" : "Add service"}
          </h2>

          <div className="mt-4">
            <label htmlFor="service-icon" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
              Icon
            </label>
            <IconPicker id="service-icon" value={form.icon} onChange={(icon) => setForm({ ...form, icon })} />
            {fieldErrors.icon && <p className="mt-1 text-xs text-red-600">{fieldErrors.icon}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="service-title" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
              Title
            </label>
            <input
              id="service-title"
              type="text"
              required
              maxLength={150}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. GxP System Validation"
              className={`${inputClass} h-11`}
            />
            {fieldErrors.title && <p className="mt-1 text-xs text-red-600">{fieldErrors.title}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="service-description" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
              Description
            </label>
            <textarea
              id="service-description"
              required
              rows={5}
              maxLength={1000}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write a short description..."
              className={`${inputClass} resize-y py-3`}
            />
            {fieldErrors.description && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.description}</p>
            )}
          </div>

          <div className="mt-4 flex items-end gap-4">
            <div className="w-28">
              <label htmlFor="service-order" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
                Order
              </label>
              <input
                id="service-order"
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
              {saving ? "Saving..." : editingId ? "Save changes" : "Add service"}
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
        <section aria-labelledby="service-list-heading">
          <h2 id="service-list-heading" className="text-lg font-semibold text-[#0f1f47]">
            All services{" "}
            {!loading && (
              <span className="text-sm font-normal text-[#5b6472]">
                ({services.length} total, {visible.length} visible on {totalPages}{" "}
                {totalPages === 1 ? "page" : "pages"})
              </span>
            )}
          </h2>

          <p role="status" className={`mt-2 text-sm text-[#0f7a5e] ${notice ? "" : "sr-only"}`}>
            {notice}
          </p>

          <div className="mt-3 rounded-2xl border border-[#e6e9ee] bg-white shadow-[0_6px_20px_rgba(15,31,71,0.04)]">
            {loading ? (
              <p className="p-6 text-sm text-[#5b6472]">Loading services...</p>
            ) : loadError ? (
              <p role="alert" className="m-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {loadError}
              </p>
            ) : services.length === 0 ? (
              <p className="p-6 text-sm text-[#5b6472]">No services yet. Add your first one.</p>
            ) : (
              <ul className="divide-y divide-[#eef0f4]">
                {services.map((s) => (
                  <li
                    key={s.id}
                    className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-start ${
                      editingId === s.id ? "bg-[#f2fbff]" : ""
                    }`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0f1b3d] text-white">
                      <ServiceIcon name={s.icon} size={20} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#eef0f4] px-2.5 py-0.5 text-xs font-medium text-[#5b6472]">
                          #{s.sort_order}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            s.is_active ? "bg-[#e3f8f1] text-[#0f7a5e]" : "bg-[#fdecec] text-[#b42318]"
                          }`}
                        >
                          {s.is_active ? `Visible · Page ${pageOf(s)}` : "Hidden"}
                        </span>
                      </div>
                      <p className="mt-2 font-semibold text-[#0f1f47]">{s.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-[#5b6472]">{s.description}</p>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => toggleActive(s)}
                        aria-label={s.is_active ? `Hide "${s.title}"` : `Show "${s.title}"`}
                        title={s.is_active ? "Hide from website" : "Show on website"}
                        className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#5b6472] transition hover:bg-[#f4f6fa] hover:text-[#0f1f47]"
                      >
                        {s.is_active ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(s)}
                        aria-label={`Edit "${s.title}"`}
                        title="Edit"
                        className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#5b6472] transition hover:bg-[#f4f6fa] hover:text-[#0f1f47]"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s)}
                        aria-label={`Delete "${s.title}"`}
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