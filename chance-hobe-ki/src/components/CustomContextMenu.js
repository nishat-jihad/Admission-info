"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// রাইট-ক্লিক মেনুতে যা যা থাকবে
const MENU_ITEMS = [
  { label: "Go to Homepage", href: "/" },
  { label: "News", href: "/news" },
  { label: "Ad. Calendar", href: "/exam-dates" },
  { label: "Updates", href: "/updates" },
  { label: "General Check", href: "/general-check" },
];

const MENU_WIDTH = 220;
const MENU_HEIGHT = MENU_ITEMS.length * 40 + 16;

export default function CustomContextMenu() {
  const router = useRouter();
  const menuRef = useRef(null);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    const onContextMenu = (e) => {
      // ইনপুট/টেক্সট বক্সে ডিফল্ট মেনু থাকুক (Paste ইত্যাদির জন্য)
      const t = e.target;
      if (t && t.closest && t.closest("input, textarea, select, [contenteditable='true']")) {
        setPos(null);
        return;
      }
      // মোবাইলে long-press-এ টেক্সট সিলেকশন নষ্ট না করতে শুধু মাউসের ডিভাইসে চালু
      if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) return;

      e.preventDefault();
      const x = Math.min(e.clientX, window.innerWidth - MENU_WIDTH - 8);
      const y = Math.min(e.clientY, window.innerHeight - MENU_HEIGHT - 8);
      setPos({ x: Math.max(8, x), y: Math.max(8, y) });
    };

    const close = () => setPos(null);
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) close();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    window.addEventListener("blur", close);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      window.removeEventListener("blur", close);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      ref={menuRef}
      className="ctx-menu"
      role="menu"
      style={{ left: pos.x, top: pos.y }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {MENU_ITEMS.map((item) => (
        <button
          key={item.href}
          type="button"
          role="menuitem"
          className="ctx-menu-item"
          onClick={() => {
            setPos(null);
            router.push(item.href);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
