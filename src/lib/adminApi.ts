const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type RecentMessage = {
  id: string | number;
  name: string | null;
  email: string;
  message: string;
  source: string | null;
  created_at: string;
};

export type AdminStats = {
  total: number;
  last7Days: number;
  bySource: { source: string; count: number }[];
  recent: RecentMessage[];
};

type ApiResult<T> = { ok: boolean; status: number; data?: T; error?: string };

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include", // sends / receives the admin login cookie
      headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data?.message ?? "Something went wrong. Please try again.",
      };
    }
    return { ok: true, status: res.status, data: data as T };
  } catch {
    return { ok: false, status: 0, error: "Could not reach the server. Please try again." };
  }
}

export const adminLogin = (email: string, password: string) =>
  request<{ success: boolean; admin: { email: string } }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const adminLogout = () => request<{ success: boolean }>("/api/auth/logout", { method: "POST" });

export const adminMe = () => request<{ success: boolean; admin: { email: string } }>("/api/auth/me");

export const adminStats = () => request<AdminStats & { success: boolean }>("/api/admin/stats");