"use client";

import { useEffect } from "react";

// কোনো পেজে JS ভেঙে গেলে ডিফল্ট "Application error" পেজের বদলে আসল error-টা পর্দায় দেখায়।
// (layout/AppBootstrap-এর error ধরে global-error.js।)
export default function Error({ error, reset }) {
  useEffect(() => {
    try {
      const K = "admissionInfoDiag";
      const a = JSON.parse(localStorage.getItem(K) || "[]");
      a.push({ t: Date.now(), v: "err", m: "page-error: " + String((error && error.message) || error).slice(0, 250) });
      localStorage.setItem(K, JSON.stringify(a.slice(-150)));
    } catch (e) {
      /* সমস্যা নেই */
    }
  }, [error]);

  const text = String((error && (error.stack || error.message)) || error || "অজানা error").slice(0, 1500);
  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: 18, margin: "0 0 8px" }}>কিছু একটা ভেঙে গেছে</h2>
      <p style={{ fontSize: 13, margin: "0 0 8px" }}>নিচের লেখাটা স্ক্রিনশট নিয়ে ডেভেলপারকে পাঠাও:</p>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 11, background: "#f3f3f3", padding: 8, maxHeight: 320, overflow: "auto" }}>
        {text}
      </pre>
      <button type="button" onClick={() => reset()} style={{ marginTop: 10, padding: "8px 14px" }}>
        আবার চেষ্টা করো
      </button>
    </div>
  );
}
