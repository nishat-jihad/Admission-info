"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuOpen, setMenuOpen, subscribeMenu } from "@/lib/appMenuStore";
import { APP_VERSION, APK_URL, GITHUB_REPO, SITE_URL } from "@/lib/appConfig";

const FACEBOOK_URL = "https://www.facebook.com/admissioninfo26";
const TELEGRAM_URL = "https://t.me/admissioninfo26";

// ছোট আইকন সেট (stroke আইকন, Lucide-স্টাইল)
const ICONS = {
  check: ["M9 11l3 3L22 4", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
  leaf: [
    "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
    "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
  ],
  uni: ["M3 22h18", "M6 18v-7M10 18v-7M14 18v-7M18 18v-7", "M12 2l8 5H4z"],
  wrench: [
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  ],
  heart: [
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
  ],
  info: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 16v-4", "M12 8h.01"],
  phone: [
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  ],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  share: ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "M16 6l-4-4-4 4", "M12 2v13"],
  refresh: [
    "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
    "M21 3v5h-5",
    "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
    "M8 16H3v5",
  ],
  tag: ["M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z", "M7 7h.01"],
  close: ["M18 6L6 18", "M6 6l12 12"],
  facebook: ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"],
  telegram: ["M22 2L11 13", "M22 2l-7 20-4-9-9-4 20-7z"],
};

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

// ☰ বাটন — হেডারে (Navbar.js) বসে
export function AppMenuButton() {
  return (
    <button
      type="button"
      className="app-menu-btn"
      aria-label="মেনু খোলো"
      onClick={() => setMenuOpen(true)}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}

const SECTIONS = [
  {
    title: "টুলস",
    items: [
      { href: "/general-check", label: "জেনারেল চেক (SSC+HSC)", icon: "check" },
      { href: "/agri-cluster-calculator", label: "কৃষি গুচ্ছ ক্যালকুলেটর", icon: "leaf" },
    ],
  },
  {
    title: "ব্রাউজ",
    items: [
      { href: "/?category=all#cards-wrap", label: "সকল ভার্সিটি", icon: "uni" },
      { href: "/?category=engineering#cards-wrap", label: "ইঞ্জিনিয়ারিং", icon: "wrench" },
      { href: "/?category=medical#cards-wrap", label: "মেডিক্যাল", icon: "heart" },
    ],
  },
  {
    title: "তথ্য",
    items: [
      { href: "/about", label: "আমাদের সম্পর্কে", icon: "info" },
      { href: "/contact", label: "যোগাযোগ করুন", icon: "phone" },
      { href: "/privacy-policy", label: "Privacy Policy", icon: "shield" },
    ],
  },
  {
    title: "ফলো",
    items: [
      { href: FACEBOOK_URL, label: "Facebook", icon: "facebook", external: true },
      { href: TELEGRAM_URL, label: "Telegram", icon: "telegram", external: true },
    ],
  },
];

// "1.2.3" বনাম "1.2.10" তুলনা
function isNewer(latest, current) {
  const a = latest.split(".").map((n) => parseInt(n, 10) || 0);
  const b = current.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] || 0) > (b[i] || 0)) return true;
    if ((a[i] || 0) < (b[i] || 0)) return false;
  }
  return false;
}

// বাঁ দিক থেকে আসা ড্রয়ার (AppBootstrap-এ একবার বসে)
export default function AppMenu() {
  const open = useSyncExternalStore(subscribeMenu, getMenuOpen, () => false);
  const pathname = usePathname();
  const [update, setUpdate] = useState({ state: "idle" });

  const close = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function shareApp() {
    const text = "Admission Info — ভর্তির সব তথ্য এক জায়গায়";
    let mod = null;
    try {
      mod = await import("@capacitor/share");
    } catch (e) {
      mod = null;
    }
    if (mod) {
      try {
        await mod.Share.share({ title: "Admission Info", text, url: SITE_URL, dialogTitle: "অ্যাপ শেয়ার করো" });
      } catch (e) {
        /* ইউজার শেয়ার বাতিল করলে এখানে আসে */
      }
      return;
    }
    try {
      if (navigator.share) await navigator.share({ title: "Admission Info", text, url: SITE_URL });
      else await navigator.clipboard.writeText(SITE_URL);
    } catch (e) {
      /* কিছু করার নেই */
    }
  }

  async function checkUpdate() {
    if (!GITHUB_REPO) {
      setUpdate({ state: "off" });
      return;
    }
    setUpdate({ state: "loading" });
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!res.ok) throw new Error("bad status");
      const data = await res.json();
      const latest = String(data.tag_name || "").replace(/^v/i, "");
      if (latest && isNewer(latest, APP_VERSION)) setUpdate({ state: "new", version: latest });
      else setUpdate({ state: "latest" });
    } catch (e) {
      setUpdate({ state: "error" });
    }
  }

  return (
    <div className={`app-drawer-root${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="app-drawer-overlay" onClick={close} />
      <aside className="app-drawer" role="dialog" aria-modal="true" aria-label="মেনু">
        <div className="app-drawer-head">
          <span className="app-drawer-title">মেনু</span>
          <button type="button" className="app-drawer-close" aria-label="মেনু বন্ধ করো" onClick={close}>
            <Icon name="close" />
          </button>
        </div>

        <div className="app-drawer-body">
          {SECTIONS.map((sec) => (
            <div key={sec.title} className="app-drawer-sec">
              <div className="app-drawer-sec-title">{sec.title}</div>
              {sec.items.map((it) =>
                it.external ? (
                  <a
                    key={it.label}
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-drawer-item"
                    onClick={close}
                  >
                    <Icon name={it.icon} />
                    <span>{it.label}</span>
                  </a>
                ) : (
                  <Link key={it.label} href={it.href} className="app-drawer-item" onClick={close}>
                    <Icon name={it.icon} />
                    <span>{it.label}</span>
                  </Link>
                )
              )}
            </div>
          ))}

          <div className="app-drawer-sec">
            <div className="app-drawer-sec-title">অ্যাপ</div>
            <button type="button" className="app-drawer-item" onClick={shareApp}>
              <Icon name="share" />
              <span>অ্যাপ শেয়ার করো</span>
            </button>
            <button type="button" className="app-drawer-item" onClick={checkUpdate}>
              <Icon name="refresh" />
              <span>নতুন ভার্সন আছে কি না দেখো</span>
            </button>
            {update.state !== "idle" && (
              <div className="app-drawer-note" role="status">
                {update.state === "loading" && "দেখা হচ্ছে…"}
                {update.state === "latest" && "তুমি সর্বশেষ ভার্সনেই আছ।"}
                {update.state === "error" && "এখন দেখা যাচ্ছে না। ইন্টারনেট চেক করে আবার চেষ্টা করো।"}
                {update.state === "off" && "এই বিল্ডে আপডেট চেক চালু নেই।"}
                {update.state === "new" && (
                  <>
                    নতুন ভার্সন {update.version} এসেছে।{" "}
                    <a href={APK_URL} target="_blank" rel="noopener noreferrer">
                      ডাউনলোড করো
                    </a>
                  </>
                )}
              </div>
            )}
            <div className="app-drawer-item app-drawer-static">
              <Icon name="tag" />
              <span>ভার্সন {APP_VERSION}</span>
            </div>
          </div>
        </div>

        <div className="app-drawer-foot">© Admission Info</div>
      </aside>
    </div>
  );
}
