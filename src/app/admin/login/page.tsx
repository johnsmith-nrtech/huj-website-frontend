"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { adminLogin, adminMe } from "@/lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Already logged in? Go straight to the dashboard
  useEffect(() => {
    adminMe().then((res) => {
      if (res.ok) router.replace("/admin/dashboard");
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await adminLogin(email, password);
    setLoading(false);

    if (result.ok) {
      router.replace("/admin/dashboard");
    } else {
      setError(result.error ?? "Login failed. Please try again.");
    }
  };

  return (
    <>
      {/* React 19 hoists these into <head> (replaces the metadata export) */}
      <title>Admin Login | HUJ Consulting</title>
      <meta name="robots" content="noindex, nofollow" />

      <main className="grid min-h-screen place-items-center bg-[#09183C] px-5 py-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/hujj-logo.png"
              alt="HUJ Technologies LLC"
              width={200}
              height={70}
              priority
              className="h-auto w-[200px]"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            aria-labelledby="admin-login-heading"
            className="rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <h1 id="admin-login-heading" className="text-2xl font-bold text-[#0f1f47]">
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-[#5b6472]">Sign in to manage your website.</p>

            <div className="mt-6">
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-12 w-full rounded-lg border border-[#d9dde6] bg-white px-4 text-base text-[#1a2236] placeholder:text-[#9aa3b2] focus:border-[#2bb5f5] focus:outline-none focus:ring-2 focus:ring-[#2bb5f5]/30"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-[#1a2236]">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-lg border border-[#d9dde6] bg-white px-4 pr-12 text-base text-[#1a2236] placeholder:text-[#9aa3b2] focus:border-[#2bb5f5] focus:outline-none focus:ring-2 focus:ring-[#2bb5f5]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-[#5b6472] transition hover:bg-[#f4f6fa] hover:text-[#0f1f47]"
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
            </div>

            <p role="alert" className={`mt-4 text-sm text-red-600 ${error ? "" : "sr-only"}`}>
              {error}
            </p>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 h-12 w-full cursor-pointer rounded-lg bg-[#2bb5f5] text-base font-semibold text-[#0f1729] transition hover:bg-[#52c6fa] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}