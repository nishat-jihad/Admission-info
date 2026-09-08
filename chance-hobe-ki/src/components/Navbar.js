"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const CATEGORY_LINKS = [
  { category: "all", label: "হোম" },
  { category: "versity", label: "সকল ভার্সিটি" },
  { category: "engineering", label: "ইঞ্জিনিয়ারিং" },
  { category: "medical", label: "মেডিক্যাল" },
];

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarShell />}>
      <NavbarInner />
    </Suspense>
  );
}

// Rendered for the instant before the real navbar hydrates, so there's
// no layout jump.
function NavbarShell() {
  return <header className="navbar" />;
}

function NavbarInner() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // useSearchParams is reactive, so this updates immediately on every
  // client-side Link navigation — including "/" -> "/?category=..." ones
  // that don't remount the page.
  const activeCategory = pathname === "/" ? searchParams.get("category") || "all" : "all";

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
        <Image
          src="/images/admission-info-logo.png"
          alt="Admission Info"
          width={346}
          height={145}
          className="navbar-logo"
          priority
        />
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
