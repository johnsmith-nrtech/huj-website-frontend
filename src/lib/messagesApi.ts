// Admin actions on contact messages.
// TODO: use the same base URL as src/lib/adminApi.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type ContactMessage = {
  id: number | string;
  name: string | null;
  email: string;
  message: string;
  source: string | null;
  created_at: string;
  reply_message: string | null;
  replied_at: string | null;
};

export type MessagesPagination = { page: number; perPage: number; total: number; totalPages: number };

export type MessagesResult = {
  ok: boolean;
  status: number;
  data?: { messages: ContactMessage[]; pagination: MessagesPagination };
  error?: string;
};

/** Loads one page of messages (10 per page, newest first). */
export async function adminListMessages(page: number): Promise<MessagesResult> {
  try {
    const res = await fetch(`${API_URL}/api/contact/admin?page=${page}`, {
      credentials: "include", // sends the admin login cookie
      cache: "no-store",
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok || body.success === false) {
      return { ok: false, status: res.status, error: body.message ?? "Could not load messages." };
    }
    return { ok: true, status: res.status, data: { messages: body.messages, pagination: body.pagination } };
  } catch {
    return { ok: false, status: 0, error: "Could not reach the server." };
  }
}

export type ReplyResult = {
  ok: boolean;
  status: number;
  message?: string;
  repliedAt?: string;
  error?: string;
};

/** Emails a reply to the visitor who sent message `id`. */
export async function adminReplyToMessage(id: number | string, reply: string): Promise<ReplyResult> {
  try {
    const res = await fetch(`${API_URL}/api/contact/${id}/reply`, {
      method: "POST",
      credentials: "include", // sends the admin login cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok || body.success === false) {
      return { ok: false, status: res.status, error: body.message ?? "The reply could not be sent." };
    }
    return { ok: true, status: res.status, message: body.message, repliedAt: body.replied_at };
  } catch {
    return { ok: false, status: 0, error: "Could not reach the server." };
  }
}