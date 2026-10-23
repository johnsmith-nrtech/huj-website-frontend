"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Reply, X } from "lucide-react";
import { adminStats, type AdminStats } from "@/lib/adminApi";
import {
  adminListMessages,
  adminReplyToMessage,
  type ContactMessage,
  type MessagesPagination,
} from "@/lib/messagesApi";

const sourceLabels: Record<string, string> = {
  contact: "Contact page",
  services: "Services page",
  home: "Home page",
};

const sourceBadge: Record<string, string> = {
  contact: "bg-[#e6f3f8] text-[#14527a]",
  services: "bg-[#e8f0ff] text-[#2f4fb0]",
  home: "bg-[#e3f8f1] text-[#0f7a5e]",
};

// One message row in the table (includes replied_at, so "Replied" stays after refresh)
type MessageRow = ContactMessage;

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#e6e9ee] bg-white p-5 shadow-[0_6px_20px_rgba(15,31,71,0.04)]">
      <p className="text-sm text-[#5b6472]">{label}</p>
      <p className="mt-2 text-3xl font-bold text-[#0f1f47]">{value}</p>
    </div>
  );
}

function PageHead() {
  return (
    <>
      {/* React 19 hoists these into <head> (replaces the metadata export) */}
      <title>Dashboard | HUJ Admin</title>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}

/* ---------- Reply dialog ---------- */

function ReplyDialog({
  message,
  onClose,
  onSent,
  onUnauthorized,
}: {
  message: MessageRow;
  onClose: () => void;
  onSent: (id: number | string, repliedAt: string) => void;
  onUnauthorized: () => void;
}) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !sending) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, sending]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const res = await adminReplyToMessage(message.id, reply.trim());
    setSending(false);

    if (res.status === 401) {
      onUnauthorized();
      return;
    }
    if (res.ok) onSent(message.id, res.repliedAt ?? new Date().toISOString());
    else setError(res.error ?? "The reply could not be sent.");
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="presentation" onClick={() => !sending && onClose()}>
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="reply-heading"
        onSubmit={handleSend}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="reply-heading" className="text-lg font-semibold text-[#0f1f47]">
              Reply to {message.name || message.email}
            </h2>
            <p className="mt-0.5 text-sm text-[#5b6472]">{message.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            aria-label="Close"
            className="rounded p-1 text-[#5b6472] hover:bg-[#f4f6fa] hover:text-[#0f1f47]"
          >
            <X size={20} />
          </button>
        </div>

        {message.message && (
          <div className="mt-4 max-h-[140px] overflow-y-auto rounded-lg border-l-[3px] border-[#d9dde6] bg-[#f6f7fa] p-3 text-sm leading-6 text-[#5b6472] whitespace-pre-line">
            {message.message}
          </div>
        )}

        <label htmlFor="reply-text" className="mb-1.5 mt-4 block text-sm font-medium text-[#1a2236]">
          Your reply
        </label>
        <textarea
          ref={textareaRef}
          id="reply-text"
          required
          rows={7}
          maxLength={5000}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
          className="w-full resize-y rounded-lg border border-[#d9dde6] px-4 py-3 text-sm text-[#1a2236] placeholder:text-[#9aa3b2] focus:border-[#2bb5f5] focus:outline-none focus:ring-2 focus:ring-[#2bb5f5]/30"
        />
        <p className="mt-1 text-xs text-[#9aa3b2]">
          Sent from info@hujconsulting.com. &ldquo;Hi {message.name || "there"},&rdquo; and the sign-off are added automatically.
        </p>

        <p role="alert" className={`mt-3 text-sm text-red-600 ${error ? "" : "sr-only"}`}>
          {error}
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="h-11 cursor-pointer rounded-lg border border-[#d9dde6] px-4 text-sm font-medium text-[#5b6472] transition hover:bg-[#f4f6fa]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={sending || reply.trim().length < 2}
            className="flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-[#2bb5f5] px-5 text-sm font-semibold text-[#0f1729] transition hover:bg-[#52c6fa] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Reply size={16} aria-hidden="true" />
            {sending ? "Sending..." : "Send reply"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Full message dialog ---------- */

function MessageDialog({ message, onClose }: { message: MessageRow; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-heading"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-[640px] flex-col rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id="message-heading" className="text-lg font-semibold text-[#0f1f47]">
              Message from {message.name || message.email}
            </h2>
            <p className="mt-0.5 break-words text-sm text-[#5b6472]">
              {message.email} &middot; {sourceLabels[message.source ?? ""] ?? "Unknown"} &middot;{" "}
              {new Date(message.created_at).toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded p-1 text-[#5b6472] hover:bg-[#f4f6fa] hover:text-[#0f1f47]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrolls when the message is very long */}
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-[#f6f7fa] p-4 text-sm leading-6 text-[#1a2236]">
          {message.message}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 cursor-pointer rounded-lg border border-[#d9dde6] px-4 text-sm font-medium text-[#5b6472] transition hover:bg-[#f4f6fa]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState<MessageRow | null>(null);
  const [viewing, setViewing] = useState<MessageRow | null>(null);
  const [notice, setNotice] = useState("");

  // Messages table: loaded 10 at a time from the server
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [pagination, setPagination] = useState<MessagesPagination | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  useEffect(() => {
    adminStats().then((res) => {
      if (res.status === 401) {
        router.replace("/admin/login"); // session expired
        return;
      }
      if (res.ok && res.data) setStats(res.data);
        else setError(res.error ?? "Could not load dashboard data.");
    });
  }, [router]);

  // Load the current page of messages
  useEffect(() => {
    let cancelled = false;
    adminListMessages(page).then((res) => {
      if (cancelled) return;
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (res.ok && res.data) {
        setMessages(res.data.messages);
        setPagination(res.data.pagination);
        setListError("");
      } else {
        setListError(res.error ?? "Could not load messages.");
      }
      setListLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [page, router]);

  const goToPage = (n: number) => {
    setListLoading(true);
    setNotice("");
    setPage(n);
  };

  if (error) {
    return (
      <>
        <PageHead />
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      </>
    );
  }

  if (!stats) {
    return (
      <>
        <PageHead />
        <p className="text-sm text-[#5b6472]">Loading dashboard...</p>
      </>
    );
  }

  const countFor = (source: string) => stats.bySource.find((s) => s.source === source)?.count ?? 0;
  const from = pagination ? (pagination.page - 1) * pagination.perPage + 1 : 0;
  const to = pagination ? from + messages.length - 1 : 0;

  return (
    <div>
      <PageHead />
      <h1 className="text-2xl font-bold text-[#0f1f47]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#5b6472]">Messages received from your website forms.</p>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total messages" value={stats.total} />
        <StatCard label="Last 7 days" value={stats.last7Days} />
        <StatCard label="Contact page" value={countFor("contact")} />
        <StatCard label="Services page" value={countFor("services")} />
        <StatCard label="Home page" value={countFor("home")} />
      </div>

      {/* Messages (10 per page) */}
      <section aria-labelledby="recent-heading" className="mt-8">
        <h2 id="recent-heading" className="text-lg font-semibold text-[#0f1f47]">
          Messages
        </h2>

        <p role="status" className={`mt-2 text-sm text-[#0f7a5e] ${notice ? "" : "sr-only"}`}>
          {notice}
        </p>

        <div className="mt-3 overflow-x-auto rounded-2xl border border-[#e6e9ee] bg-white shadow-[0_6px_20px_rgba(15,31,71,0.04)]">
          {listError ? (
            <p role="alert" className="m-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {listError}
            </p>
          ) : listLoading && messages.length === 0 ? (
            <p className="p-6 text-sm text-[#5b6472]">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="p-6 text-sm text-[#5b6472]">No messages yet.</p>
          ) : (
            <table className={`w-full min-w-[820px] text-left text-sm transition-opacity ${listLoading ? "opacity-50" : ""}`}>
              <thead className="border-b border-[#e6e9ee] bg-[#f9fafc] text-xs uppercase tracking-wide text-[#5b6472]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Name</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Email</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Source</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Message</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Received</th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    <span className="sr-only">Reply</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef0f4]">
                {messages.map((m) => {
                  const replied = m.replied_at;
                  return (
                    <tr key={m.id} className="align-top">
                      <td className="px-5 py-3.5 font-medium text-[#0f1f47]">{m.name || "-"}</td>
                      <td className="px-5 py-3.5 text-[#1a2236]">{m.email}</td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                            sourceBadge[m.source ?? ""] ?? "bg-[#eef0f4] text-[#5b6472]"
                          }`}
                        >
                          {sourceLabels[m.source ?? ""] ?? "Unknown"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[#5b6472]">
                        {m.message ? (
                          // One line with "..."; click to read the whole message
                          <button
                            type="button"
                            onClick={() => setViewing(m)}
                            title="Click to read the full message"
                            className="block max-w-[320px] cursor-pointer truncate text-left hover:text-[#0f1f47] hover:underline"
                          >
                            {m.message}
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-[#5b6472]">
                        {new Date(m.created_at).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        {replied && (
                          <span
                            className="mr-2 rounded-full bg-[#e3f8f1] px-2.5 py-1 text-xs font-medium text-[#0f7a5e]"
                            title={`Replied ${new Date(replied).toLocaleString()}`}
                          >
                            Replied
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setNotice("");
                            setReplyingTo(m);
                          }}
                          aria-label={`Reply to ${m.name || m.email}`}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#d9dde6] px-3 py-1.5 text-xs font-semibold text-[#0f1f47] transition hover:bg-[#f4f6fa]"
                        >
                          <Reply size={14} aria-hidden="true" />
                          {replied ? "Reply again" : "Reply"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {pagination && messages.length > 0 && !listError && (
            <nav
              aria-label="Messages pages"
              className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef0f4] px-5 py-3 text-sm text-[#5b6472]"
            >
              <p>
                Showing {from}&ndash;{to} of {pagination.total}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(pagination.page - 1)}
                  disabled={pagination.page <= 1 || listLoading}
                  className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg border border-[#d9dde6] px-3 font-medium text-[#0f1f47] transition hover:bg-[#f4f6fa] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Previous
                </button>
                <span className="px-1">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages || listLoading}
                  className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg border border-[#d9dde6] px-3 font-medium text-[#0f1f47] transition hover:bg-[#f4f6fa] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </nav>
          )}
        </div>
      </section>

      {replyingTo && (
        <ReplyDialog
          message={replyingTo}
          onClose={() => setReplyingTo(null)}
          onUnauthorized={() => router.replace("/admin/login")}
          onSent={(id, at) => {
            setMessages((list) => list.map((m) => (String(m.id) === String(id) ? { ...m, replied_at: at } : m)));
            setNotice(`Reply sent to ${replyingTo.email}.`);
            setReplyingTo(null);
          }}
        />
      )}

      {viewing && <MessageDialog message={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}