"use client";

import { useEffect, useState } from "react";
import { getApplicationStatus } from "@/lib/examCalendar";
import { IS_APP, WEB_APK_URL } from "@/lib/appConfig";

// সাইটে ঢুকলেই (Mobile + PC দুই জায়গাতেই) একটা pop-up আসবে — যেসব ভার্সিটিতে এখন আবেদন চলছে
// শুধু সেগুলো আর প্রত্যেকটার পাশে "Apply Now" বাটন। "Apply Now"-এর লিংক আসে
// src/lib/examCalendar.js-এর APPLY_LINKS থেকে (অর্থাৎ Admission Calendar-এর লিংকই)।
// এখানে বিস্তারিত পেজের কোনো লিংক নেই।
export default function ApplyPopup({ items = [] }) {
  const [list, setList] = useState([]);
  const open = list.length > 0;
  // ডাউনলোড/স্কিপ বাটন শুধু ওয়েবসাইটে (PC + মোবাইল ব্রাউজার); অ্যাপের ভেতরে নয়
  const [showDl, setShowDl] = useState(false);
  const [started, setStarted] = useState(false);

  // বর্তমান সময় শুধু ব্রাউজারে দেখা হয় (hydration mismatch এড়াতে)
  useEffect(() => {
    const now = Date.now();
    setShowDl(!IS_APP && !/iPhone|iPad|iPod/i.test(navigator.userAgent));
    setList(items.filter((it) => getApplicationStatus(it.application, now).key === "started"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setList([]);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const close = () => setList([]);

  return (
    <div
      className="apply-popup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="apply-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-popup-title"
      >
        <button
          type="button"
          className="apply-popup-close"
          aria-label="বন্ধ করো"
          onClick={close}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="apply-popup-title" className="apply-popup-title">
          আবেদন শুরু হয়েছে!
        </h2>
        <p className="apply-popup-sub">এই ভার্সিটিগুলোতে এখন আবেদন চলছে।</p>

        <ul className="apply-popup-list">
          {list.map((it) => (
            <li className="apply-popup-item" key={it.id}>
              <span className="apply-popup-name">{it.name}</span>
              <a
                className="apply-popup-btn"
                href={it.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </li>
          ))}
        </ul>

        {showDl && (
          <div className="apply-popup-dl">
            <p className="apply-popup-dl-title">
              {started
                ? "ডাউনলোড শুরু হয়েছে। শেষ হলে নোটিফিকেশন বার বা Downloads ফোল্ডার থেকে admission-info.apk চেপে ইনস্টল করুন।"
                : "সর্বশেষ আপডেট ও ভালো অভিজ্ঞতার জন্য আমাদের অফিসিয়াল অ্যাপ ইনস্টল করুন"}
            </p>
            <div className="apply-popup-dl-actions">
              <a className="app-dl-btn app-dl-btn-dark" href={WEB_APK_URL} download onClick={() => setStarted(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M12 4v11M7 11l5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {started ? "শুরু হয়েছে" : "Download"}
              </a>
              <button type="button" className="app-dl-btn app-dl-btn-light" onClick={close}>
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
