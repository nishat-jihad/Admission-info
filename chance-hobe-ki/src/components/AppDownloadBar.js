"use client";

import { useEffect, useState } from "react";
import { IS_APP, WEB_APK_URL } from "@/lib/appConfig";

// ওয়েবসাইটের হোমে "কৃষি গুচ্ছ GPA Calculator" কার্ডের ঠিক ওপরের বার — অফিসিয়াল অ্যাপ ডাউনলোডের জন্য।
// অ্যাপের ভেতরে ও মোবাইল ব্রাউজারে দেখায় না।
export default function AppDownloadBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mobile = /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent) || window.innerWidth <= 768;
    setShow(!IS_APP && !mobile);
  }, []);

  if (!show) return null;

  return (
    <section className="app-dl-bar" aria-label="অফিসিয়াল অ্যাপ ডাউনলোড">
      <div>
        <h2 className="app-dl-bar-title">Admission Info অফিসিয়াল অ্যাপ</h2>
        <p className="app-dl-bar-sub">
          সার্কুলার, সর্বশেষ আপডেটসহ গুরুত্বপূর্ণ নোটিফিকেশন পেতে ও আরও ভালো এক্সপেরিয়েন্সের জন্য আমাদের official app ইনস্টল করুন।
        </p>
      </div>
      <a className="app-dl-btn app-dl-btn-dark" href={WEB_APK_URL} download>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="M12 4v11M7 11l5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Download
      </a>
    </section>
  );
}
