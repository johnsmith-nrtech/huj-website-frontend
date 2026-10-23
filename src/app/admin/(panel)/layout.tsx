"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import AdminSidebar, { navItems } from "@/components/AdminSidebar";
import { adminMe } from "@/lib/adminApi";

// Everything inside /admin/(panel)/... gets the sidebar and the login check
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protect every admin page: no valid login -> back to the login page
  useEffect(() => {
    adminMe().then((res) => {
      if (res.ok && res.data) {
        setAdminEmail(res.data.admin.email);
        setReady(true);
      } else {
        router.replace("/admin/login");
      }
    });
  }, [router]);

  const currentTitle =
    navItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.label ??
    "Admin";

    return (
      <div className="min-h-screen bg-[#f4f6fa]">
        {/* Covers the panel until the login check finishes (the page still renders underneath) */}
        {!ready && (
          <div className="fixed inset-0 z-[60] grid place-items-center bg-[#f4f6fa] text-sm text-[#5b6472]">
            Checking your session...
          </div>
        )}

        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e6e9ee] bg-white px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="rounded p-1.5 text-[#0f1f47] hover:bg-[#f4f6fa] lg:hidden"
            >
              <Menu size={22} />
            </button>
            <p className="text-lg font-semibold text-[#0f1f47]">{currentTitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#5b6472] sm:block">{adminEmail}</span>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#0f1729] text-sm font-semibold uppercase text-[#4fe3d0]"
            >
              {adminEmail.charAt(0)}
            </span>
          </div>
        </header>

        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}