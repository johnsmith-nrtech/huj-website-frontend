// FAQ API calls for the admin panel and the Services page.
// TODO: use the same base URL your src/lib/adminApi.ts uses.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type Faq = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type FaqInput = {
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
};

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include", // sends the admin login cookie
      headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok || body.success === false) {
      return {
        ok: false,
        status: res.status,
        error: body.message ?? "Request failed. Please try again.",
        errors: body.errors,
      };
    }
    return { ok: true, status: res.status, data: body as T };
  } catch {
    return { ok: false, status: 0, error: "Could not reach the server." };
  }
}

/* ---------- Admin ---------- */

export const adminListFaqs = () => request<{ faqs: Faq[] }>("/api/faqs/admin");

export const adminCreateFaq = (input: FaqInput) =>
  request<{ faq: Faq }>("/api/faqs", { method: "POST", body: JSON.stringify(input) });

export const adminUpdateFaq = (id: number, input: FaqInput) =>
  request<{ faq: Faq }>(`/api/faqs/${id}`, { method: "PUT", body: JSON.stringify(input) });

export const adminDeleteFaq = (id: number) =>
  request<{ message: string }>(`/api/faqs/${id}`, { method: "DELETE" });

/* ---------- Public (used by the Services page on the server) ---------- */

export async function getPublicFaqs(): Promise<Faq[] | null> {
  try {
    const res = await fetch(`${API_URL}/api/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const body = await res.json();
    return Array.isArray(body.faqs) ? body.faqs : null;
  } catch {
    return null; // backend down -> page uses its fallback FAQs
  }
}