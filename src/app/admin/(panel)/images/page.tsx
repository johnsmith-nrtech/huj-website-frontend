"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, RotateCcw, Upload } from "lucide-react";
import { PAGE_IMAGE_GROUPS } from "@/lib/pageImages";
import { refreshImagePages } from "./actions";
import {
  adminGetPageImages,
  adminResetPageImage,
  adminUploadPageImage,
  resolveImageUrl,
  type PageImageMap,
} from "@/lib/pageImagesApi";

const MAX_SIZE = 5 * 1024 * 1024; // must match the backend limit
const ACCEPT = "image/jpeg,image/png,image/webp";

function PageHead() {
  return (
    <>
      {/* React 19 hoists these into <head> */}
      <title>Images | HUJ Admin</title>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}

export default function AdminImagesPage() {
  const router = useRouter();
  const [images, setImages] = useState<PageImageMap>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, { text: string; error: boolean }>>({});
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const loadImages = useCallback(async () => {
    const res = await adminGetPageImages();
    if (handleUnauthorized(res.status)) return;
    if (res.ok && res.data) {
      setImages(res.data.images);
      setLoadError("");
    } else {
      setLoadError(res.error ?? "Could not load images.");
    }
    setLoading(false);
  }, [handleUnauthorized]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const setMessage = (slot: string, text: string, error = false) =>
    setMessages((m) => ({ ...m, [slot]: { text, error } }));

  const handleFile = async (slot: string, file: File | undefined) => {
    if (!file) return;

    if (!ACCEPT.split(",").includes(file.type)) {
      setMessage(slot, "Only JPG, PNG or WebP images are allowed.", true);
      return;
    }
    if (file.size > MAX_SIZE) {
      setMessage(slot, "Image must be 5 MB or smaller.", true);
      return;
    }

    setBusySlot(slot);
    setMessage(slot, "Uploading...");
    const res = await adminUploadPageImage(slot, file);
    setBusySlot(null);
    if (fileInputs.current[slot]) fileInputs.current[slot]!.value = ""; // allow choosing the same file again
    if (handleUnauthorized(res.status)) return;

    if (res.ok) {
      await refreshImagePages();
      setMessage(slot, "Image updated.");
      loadImages();
    } else {
      setMessage(slot, res.error ?? "Upload failed.", true);
    }
  };

  const handleReset = async (slot: string, label: string) => {
    if (!window.confirm(`Reset "${label}" to the default image?`)) return;

    setBusySlot(slot);
    const res = await adminResetPageImage(slot);
    setBusySlot(null);
    if (handleUnauthorized(res.status)) return;

    if (res.ok) {
      await refreshImagePages(); // show the default image on the website right away
      setMessage(slot, "Back to the default image.");
      loadImages();
    } else {
      setMessage(slot, res.error ?? "Could not reset the image.", true);
    }
  };

  return (
    <div>
      <PageHead />
      <h1 className="text-2xl font-bold text-[#0f1f47]">Images</h1>
      <p className="mt-1 text-sm text-[#5b6472]">
        Change the images on your website pages. Upload a new one to replace it, or reset to the
        original. JPG, PNG or WebP, up to 5 MB.
      </p>

      {loadError && (
        <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {loadError}
        </p>
      )}

      {PAGE_IMAGE_GROUPS.map((group) => (
        <section
          key={group.page}
          aria-labelledby={`group-${group.href}`}
          className="mt-8 first-of-type:mt-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#e6e9ee] pb-2">
            <h2 id={`group-${group.href}`} className="text-lg font-semibold text-[#0f1f47]">
              {group.page}
              <span className="ml-2 text-sm font-normal text-[#5b6472]">
                ({group.images.length} {group.images.length === 1 ? "image" : "images"})
              </span>
            </h2>
            <Link
              href={group.href}
              target="_blank"
              className="flex items-center gap-1 text-sm font-medium text-[#14527a] hover:underline"
            >
              View page <ExternalLink size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {group.images.map((img) => {
              const custom = images[img.slot];
              const src = custom ? resolveImageUrl(custom) : img.defaultSrc;
              const busy = busySlot === img.slot;
              const msg = messages[img.slot];

              return (
                <div
                  key={img.slot}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#e6e9ee] bg-white shadow-[0_6px_20px_rgba(15,31,71,0.04)]"
                >
                  <div className="relative h-[180px] bg-gradient-to-br from-[#dfe4ee] to-[#c9d1e0]">
                    {!loading && (
                      // Plain <img> so uploaded images from the backend need no next.config setup
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={img.alt} className="h-full w-full object-cover" />
                    )}
                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        custom ? "bg-[#e8f0ff] text-[#2f4fb0]" : "bg-white/90 text-[#5b6472]"
                      }`}
                    >
                      {custom ? "Custom" : "Default"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#9aa3b2]">
                      {group.page}
                    </p>
                    <p className="font-semibold text-[#0f1f47]">{img.label}</p>

                    <p
                      role="status"
                      className={`mt-1 min-h-[20px] text-xs ${msg?.error ? "text-red-600" : "text-[#0f7a5e]"}`}
                    >
                      {msg?.text ?? ""}
                    </p>

                    <div className="mt-auto flex gap-2 pt-3">
                      <input
                        ref={(el) => {
                          fileInputs.current[img.slot] = el;
                        }}
                        id={`file-${img.slot}`}
                        type="file"
                        accept={ACCEPT}
                        className="sr-only"
                        onChange={(e) => handleFile(img.slot, e.target.files?.[0])}
                      />
                      <button
                        type="button"
                        disabled={busy || loading}
                        onClick={() => fileInputs.current[img.slot]?.click()}
                        aria-label={`Upload new image for ${group.page}: ${img.label}`}
                        className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2bb5f5] text-sm font-semibold text-[#0f1729] transition hover:bg-[#52c6fa] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Upload size={16} aria-hidden="true" />
                        {busy ? "Working..." : "Upload"}
                      </button>
                      {custom && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handleReset(img.slot, `${group.page}: ${img.label}`)}
                          aria-label={`Reset ${group.page}: ${img.label} to default image`}
                          title="Reset to default"
                          className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-[#d9dde6] text-[#5b6472] transition hover:bg-[#f4f6fa] hover:text-[#0f1f47] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <RotateCcw size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}