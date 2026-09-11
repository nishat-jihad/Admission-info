"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GPA_OPTIONS = [
  { value: "5.00", grade: "A+" },
  { value: "4.00", grade: "A" },
  { value: "3.50", grade: "A-" },
  { value: "3.00", grade: "B" },
  { value: "2.00", grade: "C" },
  { value: "1.00", grade: "D" },
];

const GRADING_SCALE = [
  { marks: "৮০-১০০", grade: "A+", points: "৫.০০" },
  { marks: "৭০-৭৯", grade: "A", points: "৪.০০" },
  { marks: "৬০-৬৯", grade: "A-", points: "৩.৫০" },
  { marks: "৫০-৫৯", grade: "B", points: "৩.০০" },
  { marks: "৪০-৪৯", grade: "C", points: "২.০০" },
  { marks: "৩৩-৩৯", grade: "D", points: "১.০০" },
  { marks: "০-৩২", grade: "F", points: "০.০০" },
];

function GradingScaleTable() {
  return (
    <table className="grading-table">
      <thead>
        <tr>
          <th>মার্কস</th>
          <th>গ্রেড</th>
          <th>পয়েন্ট</th>
        </tr>
      </thead>
      <tbody>
        {GRADING_SCALE.map((row) => (
          <tr key={row.grade}>
            <td>{row.marks}</td>
            <td>{row.grade}</td>
            <td>{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function gpaToGrade(gpa) {
  if (gpa >= 5) return "A+";
  if (gpa >= 4) return "A";
  if (gpa >= 3.5) return "A-";
  if (gpa >= 3) return "B";
  if (gpa >= 2) return "C";
  if (gpa >= 1) return "D";
  return "F";
}

function GpaSelect({ id, label, value, onChange, fullWidth }) {
  return (
    <div className={`field${fullWidth ? " field-span-full" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          GPA সিলেক্ট করো
        </option>
        {GPA_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.value} ({opt.grade})
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
    const optionalVal = optionalSubject === "bio" ? v("bio") : v("hm");
    const requiredVal = optionalSubject === "bio" ? v("hm") : v("bio");
    // অফিসিয়াল বোর্ড রুল: ৬টা মূল বিষয় = বাংলা, ইংরেজি, ICT, পদার্থ, রসায়ন +
    // (উচ্চতর গণিত/জীববিজ্ঞান-এর মধ্যে যেটা ঐচ্ছিক না, সেটার পুরো মান)।
    // ঐচ্ছিক (৪র্থ) হিসেবে বেছে নেওয়াটা শুধু (GPA - 2) বোনাস হিসেবে যোগ হয়।
    const bonus = Math.max(0, optionalVal - 2);
    const mainTotal = v("bn") + v("en") + v("ict") + v("phy") + v("chem") + requiredVal;
    const netGpa = Math.min(5, (mainTotal + bonus) / 6);
    setResult({ type: "info", gpa: netGpa.toFixed(2), grade: gpaToGrade(netGpa) });
  }

  return (
    <>
      <Navbar />
      <section className="general-page hsc-calc-page open">
        <div className="general-page-inner hsc-page-inner">
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

          <div className="hsc-layout">
            <div className="general-card hsc-main-card">
              <div className="general-intro">
                সবগুলো বিষয়ের GPA দাও — <b>Higher Math</b> আর <b>Biology</b> দুটোই HSC-তে
                পড়ে থাকলে দুটোই দিয়ে দাও। এরপর নিচে কোনটা তোমার <b>ঐচ্ছিক (৪র্থ) বিষয়</b>{" "}
                ছিল সেটা বেছে নাও — বোর্ডের নিয়ম অনুযায়ী সেটার GPA থেকে ২ বাদ দিয়ে বোনাস
                হিসেবে যোগ হবে (২-এর কম হলে বোনাস শূন্য)।
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

              {result && (
                <div className={`result-box ${result.type}`}>
                  {result.gpa ? (
                    <>
                      <div className="hsc-result-title">তোমার HSC মোট GPA</div>
                      <div className="hsc-result-number">
                        {result.gpa} <span className="hsc-result-grade">({result.grade})</span>
                      </div>
                    </>
                  ) : (
                    result.msg
                  )}
                </div>
              )}

              <div className="hsc-grading-mobile">
                <div className="grading-panel-title">গ্রেডিং স্কেল</div>
                <GradingScaleTable />
              </div>
            </div>

            <aside className="hsc-grading-panel hsc-about-panel">
              <div className="grading-panel-title">About HSC GPA Calculation</div>
              <p>
                The Higher Secondary Certificate (HSC) examination is a crucial milestone in
                Bangladesh&apos;s education system. This calculator helps students accurately
                determine their Grade Point Average (GPA) based on the standardized grading
                system used by all education boards in Bangladesh.
              </p>
              <p>The HSC GPA calculation considers:</p>
              <ul>
                <li>
                  Compulsory subjects: Bangla, English, and Information &amp; Communication
                  Technology
                </li>
                <li>Group-specific subjects: Different for Science, Humanities, and Business Studies groups</li>
                <li>Fourth subject: Additional grade points if scored above grade C (2.00)</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
