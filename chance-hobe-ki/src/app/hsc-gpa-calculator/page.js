"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GPA_OPTIONS = ["5.00", "4.00", "3.50", "3.00", "2.00", "1.00"];

function GpaSelect({ id, label, value, onChange, fullWidth }) {
  return (
    <div className={`field${fullWidth ? " field-span-full" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          GPA সিলেক্ট করো
        </option>
        {GPA_OPTIONS.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function HscGpaCalculatorPage() {
  const [values, setValues] = useState({});
  const [optionalSubject, setOptionalSubject] = useState(null); // "hm" | "bio"
  const [result, setResult] = useState(null);

  function setField(id, val) {
    setValues((v) => ({ ...v, [id]: val }));
  }

  function handleCheck() {
    if (!optionalSubject) {
      setResult({
        type: "warning",
        msg: "⚠️ GPA বের করার আগে উচ্চতর গণিত বা জীববিজ্ঞান — যেকোনো একটা সিলেক্ট করো।",
      });
      return;
    }
    const v = (id) => parseFloat(values[id]) || 0;
    const optional = optionalSubject === "bio" ? v("bio") : v("hm");
    const netGpa = (v("bn") + v("en") + v("ict") + v("phy") + v("chem") + optional) / 6;
    setResult({ type: "info", msg: `তোমার নেট HSC GPA: ${netGpa.toFixed(2)}` });
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
            <span className="hero-eyebrow">বিষয়ভিত্তিক GPA দিয়ে</span>
            <h2 className="general-page-title">HSC GPA Calculator</h2>
            <p className="general-page-sub">
              প্রতিটা বিষয়ের GPA সিলেক্ট করো — নিচে তোমার নেট HSC GPA দেখতে পাবে
            </p>
          </div>

          <div className="general-card">
            <div className="general-intro">
              সবগুলো বিষয়ের GPA দাও — <b>Higher Math</b> আর <b>Biology</b> দুটোই HSC-তে
              পড়ে থাকলে দুটোই দিয়ে দাও। এরপর নিচে কোনটা তোমার <b>ঐচ্ছিক (৪র্থ) বিষয়</b>{" "}
              ছিল সেটা বেছে নাও — সেটার GPA দিয়েই নেট GPA হিসাব হবে।
            </div>

            <div className="hsc-subject-group">
              <div className="hsc-fields-grid">
                <GpaSelect id="bn" label="বাংলা" value={values.bn || ""} onChange={(v) => setField("bn", v)} />
                <GpaSelect id="en" label="ইংরেজি" value={values.en || ""} onChange={(v) => setField("en", v)} />
                <GpaSelect
                  id="ict"
                  label="ICT"
                  value={values.ict || ""}
                  onChange={(v) => setField("ict", v)}
                  fullWidth
                />
              </div>
            </div>

            <div className="hsc-subject-group">
              <div className="hsc-fields-grid">
                <GpaSelect id="phy" label="পদার্থবিজ্ঞান" value={values.phy || ""} onChange={(v) => setField("phy", v)} />
                <GpaSelect id="chem" label="রসায়ন" value={values.chem || ""} onChange={(v) => setField("chem", v)} />
              </div>
            </div>

            <div className="hsc-subject-group">
              <div className="hsc-fields-grid">
                <GpaSelect id="hm" label="উচ্চতর গণিত" value={values.hm || ""} onChange={(v) => setField("hm", v)} />
                <GpaSelect id="bio" label="জীববিজ্ঞান" value={values.bio || ""} onChange={(v) => setField("bio", v)} />
              </div>
            </div>

            <div className="optional-select">
              <div className="optional-select-title">
                উচ্চতর গণিত ও জীববিজ্ঞান — কোনটা তোমার ঐচ্ছিক (৪র্থ) বিষয় ছিল, সেটা বেছে নাও
              </div>
              <div className="optional-toggle-row">
                <div
                  className={`optional-toggle${optionalSubject === "hm" ? " selected" : ""}`}
                  onClick={() => setOptionalSubject("hm")}
                >
                  উচ্চতর গণিত
                </div>
                <div
                  className={`optional-toggle${optionalSubject === "bio" ? " selected" : ""}`}
                  onClick={() => setOptionalSubject("bio")}
                >
                  জীববিজ্ঞান
                </div>
              </div>
            </div>

            <button className="check-btn wide" onClick={handleCheck}>
              GPA বের করো
            </button>

            {result && <div className={`result-box ${result.type}`}>{result.msg}</div>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
