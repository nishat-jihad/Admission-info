"use client";

import Image from "next/image";
import { useState } from "react";

// ছবি না থাকলে (বা লোড না হলে) সাইট ভাঙবে না — তার বদলে সুন্দর একটা ব্যাকগ্রাউন্ড
// দেখাবে। প্যারেন্ট এলিমেন্টে `position: relative` + নির্দিষ্ট aspect-ratio থাকতে হবে
// (news.css-এর .news-card-media / .news-hero-frame-এ আছে)।
const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4" aria-hidden="true">
    <path
      d="M4 5h13a1 1 0 0 1 1 1v13H5a1 1 0 0 1-1-1V5zM18 9h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2M7 9h7M7 12.5h7M7 16h4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function NewsImage({ src, alt, sizes, priority = false }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className="news-img-fallback">{FALLBACK_ICON}</div>;
  }

  return (
    <Image
      src={src}
      alt={alt || ""}
      fill
      sizes={sizes}
      priority={priority}
      className="news-img"
      onError={() => setFailed(true)}
    />
  );
}
