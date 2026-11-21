"use client";

import { useEffect, useState } from "react";
import { IS_APP, WEB_APK_URL } from "@/lib/appConfig";

// ওয়েবসাইটের হোমে "কৃষি গুচ্ছ GPA Calculator" কার্ডের ঠিক ওপরের বার — অফিসিয়াল অ্যাপ ডাউনলোডের জন্য।
// ওয়েবসাইটে (PC + মোবাইল ব্রাউজার) দেখায়; অ্যাপের ভেতরে দেখায় না।
export default function AppDownloadBar() {
  const [show, setShow] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setShow(!IS_APP && !/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  if (!show) return null;

  return (
    <section className="app-dl-bar" aria-label="অফিসিয়াল অ্যাপ ডাউনলোড">
      <div>
        <h2 className="app-dl-bar-title">Admission Info অফিসিয়াল অ্যাপ</h2>
        <p className={`app-dl-bar-sub${started ? " app-dl-started" : ""}`}>
          {started
            ? "ডাউনলোড শুরু হয়েছে। শেষ হলে ফোনের নোটিফিকেশন বার বা Downloads ফোল্ডার থেকে admission-info.apk ফাইলটা চেপে ইনস্টল করুন।"
            : "সার্কুলার, সর্বশেষ আপডেটসহ গুরুত্বপূর্ণ নোটিফিকেশন পেতে ও আরও ভালো ইউজার এক্সপেরিয়েন্সের জন্য আমাদের অফিসিয়াল অ্যাপ ইনস্টল করুন।"}
        </p>
      </div>
      <a className="app-dl-btn app-dl-btn-dark" href={WEB_APK_URL} download onClick={() => setStarted(true)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="M12 4v11M7 11l5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {started ? "ডাউনলোড শুরু হয়েছে" : "Download"}
      </a>
    </section>
  );
}
