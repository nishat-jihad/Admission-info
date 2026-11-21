"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import { AppMenuButton } from "@/components/AppMenu";
import { IS_APP } from "@/lib/appConfig";

// Mobile ও PC — দুই জায়গাতেই একই আইকন, একই ক্রম।
// PC: উপরের navbar-এ আইকন + নিচে পেজের নাম | Mobile: নিচের app-style bottom bar (আইকন + নাম)
// Home বাটনও দুই জায়গাতেই আছে (logo-তে ক্লিক করলেও Home-এ যাওয়া যায়)
const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    shortLabel: "Home",
    iconClass: "nav-icon-home",
    isActive: (pathname) => pathname === "/",
  },
  {
    href: "/exam-dates",
    label: "Ad. Calendar",
    shortLabel: "Ad. Calendar",
    iconClass: "nav-icon-exam",
    isActive: (pathname) => pathname === "/exam-dates",
  },
  {
    href: "/news",
    label: "News",
    shortLabel: "News",
    iconClass: "nav-icon-news",
    isActive: (pathname) => pathname.startsWith("/news"),
  },
  {
    href: "/hsc-gpa-calculator",
    label: "HSC GPA Calculator",
    shortLabel: "HSC GPA",
    iconClass: "nav-icon-gpa",
    isActive: (pathname) => pathname === "/hsc-gpa-calculator",
  },
  {
    href: "/updates",
    label: "Updates (Admission)",
    shortLabel: "Updates",
    iconClass: "nav-icon-updates",
    isActive: (pathname) => pathname === "/updates",
  },
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
      <NavbarInner />
      {/* সব পেজে navbar-এর ঠিক নিচে ব্রেকিং নিউজ বার */}
      {showBreaking && <BreakingNewsBar />}
    </>
  );
}

function NavbarInner() {
  // অ্যাপে (static export) পাথ শেষে "/" থাকে (যেমন "/exam-dates/") — সেটা বাদ দিয়ে মেলানো হয়,
  // নইলে Home আর News ছাড়া বাকি আইকন নীল হতো না।
  const rawPath = usePathname() || "/";
  const pathname = rawPath.length > 1 ? rawPath.replace(/\/+$/, "") : rawPath;

  return (
    <header className="navbar">
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

      <nav className="nav-links" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-icon-link${active ? " active" : ""}`}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              title={item.label}
            >
              <span className={`nav-icon ${item.iconClass}`} aria-hidden="true" />
              {/* আইকনের নিচে পেজের নাম (PC + Mobile দুই জায়গাতেই) */}
              <span className="nav-label">{item.shortLabel}</span>
            </Link>
          );
        })}
        <SocialIcons className="nav-social nav-social-inline" />
      </nav>

      {IS_APP ? (
        // অ্যাপে: FB + Telegram-এর পাশে ☰ মেনু বাটন
        <div className="app-header-right">
          <SocialIcons className="nav-social nav-social-mobile" />
          <AppMenuButton />
        </div>
      ) : (
        <SocialIcons className="nav-social nav-social-mobile" />
      )}
    </header>
  );
}
