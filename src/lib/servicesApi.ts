// Services API calls for the admin panel and the Services page.
// TODO: use the same base URL as src/lib/adminApi.ts and src/lib/faqApi.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ServiceInput = {
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
};

export type ServicesPage = {
  services: Service[];
  pagination: { page: number; perPage: number; total: number; totalPages: number };
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

export const adminListServices = () => request<{ services: Service[] }>("/api/services/admin");

export const adminCreateService = (input: ServiceInput) =>
  request<{ service: Service }>("/api/services", { method: "POST", body: JSON.stringify(input) });

export const adminUpdateService = (id: number, input: ServiceInput) =>
  request<{ service: Service }>(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(input) });

export const adminDeleteService = (id: number) =>
  request<{ message: string }>(`/api/services/${id}`, { method: "DELETE" });

/* ---------- Public (used by the Services page on the server) ---------- */

export async function getPublicServices(page: number): Promise<ServicesPage | null> {
  try {
    const res = await fetch(`${API_URL}/api/services?page=${page}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const body = await res.json();
    return Array.isArray(body.services) ? (body as ServicesPage) : null;
  } catch {
    return null;
  }
}