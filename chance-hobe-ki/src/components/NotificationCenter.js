"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setMenuOpen } from "@/lib/appMenuStore";
import {
  MAX_NOTIFICATIONS,
  clearAllNotifs,
  getNotifState,
  getPanelOpen,
  getServerNotifState,
  markAllSeen,
  setPanelOpen,
  subscribeNotifs,
  subscribePanel,
  unreadCount,
} from "@/lib/notificationStore";

const BELL_PATHS = ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"];

function BellIcon() {
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
      {BELL_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const bn = (n) => String(n).replace(/\d/g, (d) => BN_DIGITS[d]);

function timeAgo(t) {
  const diff = Math.max(0, Date.now() - t);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "এইমাত্র";
  if (min < 60) return `${bn(min)} মিনিট আগে`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${bn(hr)} ঘণ্টা আগে`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${bn(day)} দিন আগে`;
  return new Date(t).toLocaleDateString("bn-BD", { day: "numeric", month: "short", year: "numeric" });
}

function useNotifs() {
  return useSyncExternalStore(subscribeNotifs, getNotifState, getServerNotifState);
}

// 🔔 বেল বাটন — হেডারে (Navbar.js) FB + Telegram আইকনের পাশে বসে
export function NotificationBell() {
  const s = useNotifs();
  const open = useSyncExternalStore(subscribePanel, getPanelOpen, () => false);
  const count = unreadCount(s);

  return (
    <button
      type="button"
      className="app-bell-btn"
      aria-label={count > 0 ? `নোটিফিকেশন, ${bn(count)}টি নতুন` : "নোটিফিকেশন"}
      aria-expanded={open}
      onClick={() => {
        setMenuOpen(false);
        setPanelOpen(!open);
      }}
    >
      <BellIcon />
      {count > 0 && <span className="app-bell-badge">{count > 9 ? "৯+" : bn(count)}</span>}
    </button>
  );
}

// নোটিফিকেশনের প্যানেল (AppBootstrap-এ একবার বসে) — শেষ ১৬টা নোটিফিকেশন
export default function NotificationPanel() {
  const s = useNotifs();
  const open = useSyncExternalStore(subscribePanel, getPanelOpen, () => false);
  const router = useRouter();
  const pathname = usePathname();
  // প্যানেল খোলার আগে পর্যন্ত যা দেখা হয়েছিল — এর পরের নোটিফিকেশনে "নতুন" ডট দেখায়
  const [prevSeen, setPrevSeen] = useState(0);

  useEffect(() => {
    setPanelOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    setPrevSeen(getNotifState().lastSeen);
  }, [open]);

  useEffect(() => {
    if (open) markAllSeen();
  }, [open, s.items.length]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setPanelOpen(false);

  function openItem(item) {
    if (!item.url) return;
    close();
    router.push(item.url);
  }

  return (
    <div className={`app-notif-root${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="app-notif-overlay" onClick={close} />
      <section className="app-notif" role="dialog" aria-modal="true" aria-label="নোটিফিকেশন">
        <div className="app-notif-head">
          <span className="app-notif-title">
            নোটিফিকেশন <small>(সর্বশেষ {bn(MAX_NOTIFICATIONS)}টি)</small>
          </span>
          {s.items.length > 0 && (
            <button type="button" className="app-notif-clear" onClick={clearAllNotifs}>
              সব মুছুন
            </button>
          )}
          <button type="button" className="app-notif-close" aria-label="বন্ধ করো" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="app-notif-list">
          {s.items.length === 0 ? (
            <p className="app-notif-empty">এখনো কোনো নোটিফিকেশন নেই।</p>
          ) : (
            s.items.map((item) => {
              const isNew = item.time > prevSeen;
              const cls = `app-notif-item${isNew ? " is-new" : ""}${item.url ? " is-link" : ""}`;
              const inner = (
                <>
                  <span className="app-notif-dot" aria-hidden="true" />
                  <span className="app-notif-text">
                    {item.title && <span className="app-notif-item-title">{item.title}</span>}
                    {item.body && <span className="app-notif-item-body">{item.body}</span>}
                    <span className="app-notif-time">{timeAgo(item.time)}</span>
                  </span>
                </>
              );
              return item.url ? (
                <button key={item.id} type="button" className={cls} onClick={() => openItem(item)}>
                  {inner}
                </button>
              ) : (
                <div key={item.id} className={cls}>
                  {inner}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
