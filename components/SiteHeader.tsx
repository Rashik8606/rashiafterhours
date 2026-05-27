"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { siteContent } from "@/lib/site-content";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function syncThemeIcon() {
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.textContent = document.documentElement.classList.contains("dark")
      ? "🌞"
      : "🌙";
  }
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
    syncThemeIcon();
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    syncThemeIcon();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMobile]);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 bg-white/90 dark:bg-gray-950/80 border-b border-gray-100 dark:border-gray-800/60">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight flex-shrink-0">
            <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
              &lt;{siteContent.brand} /&gt;
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
            <button
              id="themeToggle"
              type="button"
              title="Toggle theme"
              onClick={toggleTheme}
              className="ml-2 w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 ring-primary transition flex items-center justify-center text-base"
            >
              <span id="themeIcon" suppressHydrationWarning>
                🌞
              </span>
            </button>
          </nav>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobileMenuPanel"
            onClick={() => (mobileOpen ? closeMobile() : openMobile())}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 transition hover:ring-primary"
          >
            {!mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div
        role="presentation"
        onClick={closeMobile}
        className={`fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <nav
        id="mobileMenuPanel"
        className={`fixed right-0 top-0 z-40 h-full w-72 max-w-[85%] transition-transform duration-300 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 py-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
              Menu
            </span>
            <button
              type="button"
              onClick={closeMobile}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mob-link"
                onClick={closeMobile}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:ring-2 ring-primary transition"
            >
              🌙 Toggle Theme
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
