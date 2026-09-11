"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generalCriteria } from "@/data/generalCriteria";

const GPA_SCALE = [
  { marks: "80-100", grade: "A+", points: "5.00" },
  { marks: "70-79", grade: "A", points: "4.00" },
  { marks: "60-69", grade: "A-", points: "3.50" },
  { marks: "50-59", grade: "B", points: "3.00" },
  { marks: "40-49", grade: "C", points: "2.00" },
  { marks: "33-39", grade: "D", points: "1.00" },
  { marks: "0-32", grade: "F", points: "0.00" },
];

function GpaScaleChart() {
  return (
    <div className="gpa-scale-block">
      <div className="grading-panel-title">GPA Scale</div>
      <table className="grading-table">
        <thead>
          <tr>
            <th>Marks (%)</th>
            <th>Grade</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {GPA_SCALE.map((row) => (
            <tr key={row.grade}>
              <td>{row.marks}</td>
              <td>{row.grade}</td>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GeneralCheckPage() {
  const [ssc, setSsc] = useState("");
  const [hsc, setHsc] = useState("");
  const [result, setResult] = useState(null);

  // GPA বাস্তবে কখনো 5 এর বেশি হয় না, তাই টাইপ করার সময়ই 5 এর বেশি হলে আটকে দেওয়া হচ্ছে
  function handleGpaChange(setter, raw) {
    if (raw !== "") {
      const num = parseFloat(raw);
      if (!isNaN(num) && num > 5) {
        raw = "5";
      }
    }
    setter(raw);
  }

  // ফিল্ড থেকে বের হওয়ার সময় 1 এর কম হলে 1 এ ঠিক করে দেওয়া হচ্ছে (GPA এর সর্বনিম্ন মান 1)
  function handleGpaBlur(value, setter) {
    if (value === "") return;
    const num = parseFloat(value);
    if (!isNaN(num) && num < 1) {
      setter("1");
    }
  }

  function handleCheck() {
    const sscVal = parseFloat(ssc) || 0;
    const hscVal = parseFloat(hsc) || 0;
    const combined = sscVal + hscVal;

    const eligibleUnis = [];
    const excludedUnis = [];

    Object.entries(generalCriteria).forEach(([slug, c]) => {
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
      if (eligible) eligibleUnis.push({ name: c.name, slug });
    });

    setResult({ eligibleUnis, excludedUnis });
  }

  return (
    <>
      <Navbar />
      <section className="general-page open">
        <div className="general-page-inner general-check-page-inner">
          <Link className="general-back-btn" href="/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            হোমে ফিরে যাও
          </Link>

          <div className="general-page-header">
            <h2 className="general-page-title">সব ভার্সিটি এক নজরে দেখো</h2>
            <p className="general-page-sub">নিচে GPA বসাও — ফলাফল সাথে সাথে নিচে দেখতে পাবে</p>
          </div>

          <div className="general-check-layout">
            <div className="general-check-main">
              <div className="general-card general-check-card">
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
                      min="1"
                      max="5"
                      placeholder="যেমন: 5.00"
                      value={ssc}
                      onChange={(e) => handleGpaChange(setSsc, e.target.value)}
                      onBlur={() => handleGpaBlur(ssc, setSsc)}
                    />
                  </div>
                  <div className="field">
                    <label>HSC GPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      max="5"
                      placeholder="যেমন: 5.00"
                      value={hsc}
                      onChange={(e) => handleGpaChange(setHsc, e.target.value)}
                      onBlur={() => handleGpaBlur(hsc, setHsc)}
                    />
                  </div>
                </div>

                <button className="check-btn wide" onClick={handleCheck}>
                  দেখাও
                </button>
              </div>

              {!result && <GpaScaleChart />}

              {result && (
                <div className="result-heading-block">
                  <div className="result-heading-title">ফলাফল:</div>
                  <p className="result-heading-sub">
                    তোমার এই SSC and HSC GPA দিয়ে সাধারণভাবে যেখানে যেখানে পরীক্ষা দিতে পারবে —
                  </p>
                </div>
              )}

              {result && result.eligibleUnis.length > 0 && (
                <div className="general-result-table-wrap">
                  <table className="general-result-table">
                    <tbody>
                      {result.eligibleUnis.map((u) => (
                        <tr key={u.slug}>
                          <td>
                            <Link href={`/university/${u.slug}`} className="general-result-link">
                              {u.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

              {result && <GpaScaleChart />}
            </div>

            <aside className="general-check-about">
              <div className="general-about-title">About Universitys</div>
              <p>
                বাংলাদেশে প্রতি বছর HSC/সমমান পাস করা শিক্ষার্থীর সংখ্যা লাখের বেশি, অথচ
                সরকারি বিশ্ববিদ্যালয়গুলোতে মোট আসনসংখ্যা তুলনামূলকভাবে অনেক কম — তাই
                পাবলিক ভার্সিটি ভর্তি পরীক্ষা প্রতি বছরই বেশ প্রতিযোগিতামূলক থাকে।
              </p>
              <p>
                বিশ্ববিদ্যালয়ভেদে আসনসংখ্যা অনেক তারতম্য হয় — কোনোটায় কয়েকশ, আবার কোনোটায়
                (যেমন DU, RU, CU) হাজারের বেশি। বড় গুচ্ছ পরীক্ষাগুলোতে (GST, কৃষি গুচ্ছ)
                একসাথে অনেকগুলো বিশ্ববিদ্যালয়ের আসন থাকায় প্রতি আসনে প্রতিযোগীর সংখ্যা
                তুলনামূলক কম থাকে।
              </p>
              <p>
                তুলনামূলক কম GPA নিয়েও আবেদনযোগ্যতা পাওয়া যায় এমন কয়েকটা ভার্সিটির উদাহরণ:
              </p>
              <ul>
                <li>SUST — SSC+HSC মোট GPA ৬.৫০ হলেই আবেদন করা যায়</li>
                <li>Comilla University — মোট GPA ৭.০০</li>
                <li>GST গুচ্ছ (২০টি বিশ্ববিদ্যালয়) — মোট GPA ৭.০০</li>
                <li>Jagannath University — মোট GPA ৭.৫০</li>
                <li>HSTU — মোট GPA ৭.৫০</li>
              </ul>
              <p>
                তবে শুধু আবেদনযোগ্যতা পূরণ হওয়া মানেই চান্স পাওয়া নিশ্চিত না — আসনসংখ্যা,
                প্রতিযোগীর সংখ্যা ও ভর্তি পরীক্ষার প্রস্তুতির উপর আসল ফলাফল নির্ভর করে।
              </p>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
