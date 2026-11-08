"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import BreakingNewsBar from "@/components/BreakingNewsBar";

const CATEGORY_LINKS = [
  { category: "all", label: "হোম" },
];

const FACEBOOK_URL = "https://www.facebook.com/admissioninfo26";
const TELEGRAM_URL = "https://t.me/admissioninfo26";
const FACEBOOK_PATH =
  "M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z";
const TELEGRAM_PATH =
  "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z";

// গোল FB + Telegram আইকন (PC: nav-এর ভেতরে Updates-এর পাশে, Mobile: navbar-এর ডানে)
function SocialIcons({ className }) {
  return (
    <div className={className}>
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-social-btn nav-social-facebook"
        aria-label="Facebook পেজ"
        title="Facebook পেজ"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={FACEBOOK_PATH} />
        </svg>
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-social-btn nav-social-telegram"
        aria-label="Telegram চ্যানেল"
        title="Telegram চ্যানেল"
      >
        <svg viewBox="0 0 496 512" aria-hidden="true">
          <path d={TELEGRAM_PATH} />
        </svg>
      </a>
    </div>
  );
}

export default function Navbar({ showBreaking = true }) {
  return (
    <>
      <Suspense fallback={<NavbarShell />}>
        <NavbarInner />
      </Suspense>
      {/* সব পেজে navbar-এর ঠিক নিচে ব্রেকিং নিউজ বার */}
      {showBreaking && <BreakingNewsBar />}
    </>
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
          href="/exam-dates"
          className={pathname === "/exam-dates" ? "active" : ""}
          onClick={() => setOpen(false)}
        >
          Exam Dates
        </Link>
        <Link
          href="/news"
          className={pathname.startsWith("/news") ? "active" : ""}
          onClick={() => setOpen(false)}
        >
          News
        </Link>
        <Link
          href="/hsc-gpa-calculator"
          className={pathname === "/hsc-gpa-calculator" ? "active" : ""}
          onClick={() => setOpen(false)}
        >
          HSC GPA Calculator
        </Link>
        <Link
          href="/updates"
          className={pathname === "/updates" ? "active" : ""}
          onClick={() => setOpen(false)}
        >
          Updates(admission)
        </Link>
        <SocialIcons className="nav-social nav-social-inline" />
      </nav>

      <SocialIcons className="nav-social nav-social-mobile" />
    </header>
  );
}
