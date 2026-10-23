const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type ContactPayload = {
  name?: string;
  email: string;
  message?: string;
  /** which form sent it */
  source: "contact" | "services" | "home";
  /** hidden spam-trap field (leave empty) */
  website?: string;
};

export async function sendContact(
  payload: ContactPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const firstFieldError = data?.errors && Object.values(data.errors)[0];
      return {
        ok: false,
        error:
          (firstFieldError as string) ??
          data?.message ??
          "Something went wrong. Please try again.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again." };
  }
}