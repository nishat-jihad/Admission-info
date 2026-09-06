"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generalCriteria } from "@/data/generalCriteria";

export default function GeneralCheckPage() {
  const [ssc, setSsc] = useState("");
  const [hsc, setHsc] = useState("");
  const [result, setResult] = useState(null);

  function handleCheck() {
    const sscVal = parseFloat(ssc) || 0;
    const hscVal = parseFloat(hsc) || 0;
    const combined = sscVal + hscVal;

    const eligibleUnis = [];
    const excludedUnis = [];

    Object.values(generalCriteria).forEach((c) => {
      if (c.requiresScience) {
        excludedUnis.push(c.name);
        return;
      }
      let eligible;
      if (c.minSsc !== undefined || c.minHsc !== undefined) {
        eligible =
          sscVal >= (c.minSsc || 0) &&
          hscVal >= (c.minHsc || 0) &&
          (c.minCombined === undefined || combined >= c.minCombined);
      } else {
        eligible = combined >= c.minCombined;
      }
      if (eligible) eligibleUnis.push(c.name);
    });

    setResult({ eligibleUnis, excludedUnis });
  }

  return (
    <>
      <Navbar />
      <section className="general-page open">
        <div className="general-page-inner">
          <Link className="general-back-btn" href="/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            হোমে ফিরে যাও
          </Link>

          <div className="general-page-header">
            <span className="hero-eyebrow">শুধু SSC + HSC দিয়ে</span>
            <h2 className="general-page-title">সব ভার্সিটি এক নজরে দেখো</h2>
            <p className="general-page-sub">নিচে GPA বসাও — ফলাফল সাথে সাথে নিচে দেখতে পাবে</p>
          </div>

          <div className="general-card">
            <div className="general-intro">
              যেসব ভার্সিটিতে ভর্তির জন্য <b>Physics / Chemistry / Higher&nbsp;Math</b>-এ
              আলাদা ন্যূনতম GPA (বিষয়ভিত্তিক যোগ্যতা) লাগে — যেমন BUET, BUTex, IUT,
              Medical — সেগুলো এই তালিকা থেকে বাদ দিয়ে বাকি ভার্সিটিগুলো দেখানো হবে।
            </div>

            <div className="general-fields">
              <div className="field">
                <label>SSC GPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  placeholder="যেমন: 5.00"
                  value={ssc}
                  onChange={(e) => setSsc(e.target.value)}
                />
              </div>
              <div className="field">
                <label>HSC GPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  placeholder="যেমন: 5.00"
                  value={hsc}
                  onChange={(e) => setHsc(e.target.value)}
                />
              </div>
            </div>

            <button className="check-btn wide" onClick={handleCheck}>
              দেখাও
            </button>
          </div>

          {result && result.eligibleUnis.length > 0 && (
            <div className="uni-chip-grid">
              {result.eligibleUnis.map((name) => (
                <div className="uni-chip" key={name}>
                  <span>{name}</span>
                  <span className="tick">✅</span>
                </div>
              ))}
            </div>
          )}

          {result && result.eligibleUnis.length === 0 && (
            <div className="general-empty">
              তোমার দেওয়া GPA দিয়ে এই তালিকার কোনো ভার্সিটিতে সাধারণভাবে আবেদনযোগ্যতা
              পূরণ হচ্ছে না।
            </div>
          )}

          {result && (
            <div className="excluded-note">
              ⚠️ এই তালিকায় নেই: <b>{result.excludedUnis.join(", ")}</b> — ইঞ্জিনিয়ারিং,
              মেডিকেল ও এরকম আরও কিছু নির্দিষ্ট বিশ্ববিদ্যালয়ে Physics, Chemistry, Higher
              Math/Biology-তে আলাদা GPA বা নম্বর লাগে, তাই এগুলো এখানে সাধারণভাবে দেখানো
              হচ্ছে না। এগুলোর জন্য নির্দিষ্ট ভার্সিটি চেক করো।
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
