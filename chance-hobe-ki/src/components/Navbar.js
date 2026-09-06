"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORY_LINKS = [
  { category: "all", label: "হোম" },
  { category: "versity", label: "সকল ভার্সিটি" },
  { category: "engineering", label: "ইঞ্জিনিয়ারিং" },
  { category: "medical", label: "মেডিক্যাল" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const pathname = usePathname();

  // Read the ?category= param client-side (avoids needing a Suspense
  // boundary around every page just for a nav highlight).
  useEffect(() => {
    if (pathname !== "/") return;
    const params = new URLSearchParams(window.location.search);
    setActiveCategory(params.get("category") || "all");
  }, [pathname]);

  return (
    <header className="navbar">
      <button
        className="hamburger-btn"
        aria-label="মেনু"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      <Link href="/" className="logo-block">
        <span className="brand">Chance</span>
        <span className="tagline">hobe ki?</span>
      </Link>

      <nav className={`nav-links${open ? " open" : ""}`}>
        {CATEGORY_LINKS.map((link) => (
          <Link
            key={link.category}
            href={link.category === "all" ? "/" : `/?category=${link.category}#cards-wrap`}
            className={pathname === "/" && activeCategory === link.category ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/hsc-gpa-calculator"
          className={pathname === "/hsc-gpa-calculator" ? "active" : ""}
          onClick={() => setOpen(false)}
        >
          HSC GPA Calculator
        </Link>
      </nav>
    </header>
  );
}
