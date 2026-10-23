import type { Metadata } from "next";

// Keep every admin page out of Google
export const metadata: Metadata = {
  title: "Admin | HUJ Consulting",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}