"use client";

import { useState } from "react";

// ইউনিভার্সিটির ডিটেইল পেজে বড় টেবিল ফোল্ড করে রাখার জন্য।
// শুরুতে বন্ধ থাকে, শুধু মাঝখানে টাইটেল দেখায়; হোভার করলে হাইলাইট হয়,
// ক্লিক করলে টেবিল খোলে/বন্ধ হয় (/updates পেজের ফোল্ডেড টেবিলের মতোই)।
export default function DetailFoldTable({ title, children }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const active = open || hover;

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          margin: "20px 0 0",
          padding: "11px 14px",
          border: "1px solid " + (active ? "var(--blue)" : "#e2e2e2"),
          borderRadius: 8,
          background: active ? "#eaf2ff" : "#f5f6f8",
          color: "var(--black)",
          font: "inherit",
          fontFamily: "'SolaimanLipi', 'Nirmala UI', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          transition: "background 0.15s ease, border-color 0.15s ease",
        }}
      >
        <span>{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  );
}
