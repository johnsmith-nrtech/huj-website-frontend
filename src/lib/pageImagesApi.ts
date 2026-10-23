// Page image API calls for the admin panel and the Services page.
// TODO: use the same base URL as src/lib/adminApi.ts and src/lib/faqApi.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// { slot: "/uploads/page-images/..." } — only slots the admin has replaced
export type PageImageMap = Record<string, string>;

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
};

/** Turns "/uploads/..." from the backend into a full URL the browser can load. */
export function resolveImageUrl(imagePath: string) {
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include", // sends the admin login cookie
      cache: "no-store",
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok || body.success === false) {
      return { ok: false, status: res.status, error: body.message ?? "Request failed. Please try again." };
    }
    return { ok: true, status: res.status, data: body as T };
  } catch {
    return { ok: false, status: 0, error: "Could not reach the server." };
  }
}

/* ---------- Admin ---------- */

export const adminGetPageImages = () => request<{ images: PageImageMap }>("/api/page-images");

export function adminUploadPageImage(slot: string, file: File) {
  const form = new FormData();
  form.append("image", file); // no Content-Type header: the browser sets it for FormData
  return request<{ image_path: string }>(`/api/page-images/${slot}`, { method: "POST", body: form });
}

export const adminResetPageImage = (slot: string) =>
  request<{ message: string }>(`/api/page-images/${slot}`, { method: "DELETE" });

/* ---------- Public (used by the Services page on the server) ---------- */

export async function getPageImages(): Promise<PageImageMap> {
  try {
    const res = await fetch(`${API_URL}/api/page-images`, { next: { revalidate: 60 } });
    if (!res.ok) return {};
    const body = await res.json();
    return body.images ?? {};
  } catch {
    return {}; // backend down -> default images
  }
}