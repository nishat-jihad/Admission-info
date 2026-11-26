"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { runGeneralCheck } from "@/lib/generalCheck";

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
    <>
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
    </>
  );
}

const SUBJECT_FIELDS = [
  { key: "phy", label: "Physics" },
  { key: "chem", label: "Chemistry" },
  { key: "hm", label: "Higher Math" },
  { key: "bio", label: "Biology" },
  { key: "eng", label: "English" },
];

const STATUS_UI = {
  yes: { icon: "✓", text: "পারবে", cls: "yes" },
  no: { icon: "✕", text: "পারবে না", cls: "no" },
  unknown: { icon: "?", text: "বিষয়ের GPA দাও", cls: "unknown" },
};

const toBn = (n) => Number(n).toLocaleString("bn-BD");

function ResultColumn({ title, items, emptyText }) {
  return (
    <div className="gc-col">
      <div className="gc-col-title">{title}</div>
      {items.length === 0 && <div className="gc-col-empty">{emptyText}</div>}
      <ul className="gc-col-list">
        {items.map((u) => {
          const ui = STATUS_UI[u.status];
          return (
            <li key={u.id} className={`gc-row ${ui.cls}`}>
              <div className="gc-cell gc-cell-name">
                <Link href={`/university/${u.id}`} className="gc-row-name">
                  {u.name}
                </Link>
              </div>
              <div className="gc-cell gc-cell-status">
                <span className={`gc-badge ${ui.cls}`}>
                  <span className="gc-badge-icon">{ui.icon}</span>
                  {ui.text}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function GeneralCheckPage() {
  const [ssc, setSsc] = useState("");
  const [hsc, setHsc] = useState("");
  const [subjects, setSubjects] = useState({ phy: "", chem: "", hm: "", bio: "", eng: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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

  function setSubject(key, raw) {
    handleGpaChange((v) => setSubjects((prev) => ({ ...prev, [key]: v })), raw);
  }

  function handleCheck() {
    const sscVal = parseFloat(ssc);
    const hscVal = parseFloat(hsc);
    if (isNaN(sscVal) || isNaN(hscVal)) {
      setError("আগে SSC আর HSC দুটোর GPA বসাও।");
      setResult(null);
      return;
    }
    setError("");

    // খালি রাখা বিষয়ের GPA বাদ যাবে (undefined) — এগুলো লাগলে ফলাফলে "বিষয়ের GPA দাও" দেখাবে
    const subjectVals = {};
    SUBJECT_FIELDS.forEach(({ key }) => {
      const n = parseFloat(subjects[key]);
      if (!isNaN(n)) subjectVals[key] = n;
    });

    setResult(runGeneralCheck({ ssc: sscVal, hsc: hscVal, subjects: subjectVals }));
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

                <div className="gc-subject-title">HSC-র বিষয়ভিত্তিক GPA</div>
                <div className="gc-subject-grid">
                  {SUBJECT_FIELDS.map(({ key, label }) => (
                    <div className="field" key={key}>
                      <label>{label}</label>
                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        max="5"
                        placeholder="GPA"
                        value={subjects[key]}
                        onChange={(e) => setSubject(key, e.target.value)}
                        onBlur={() =>
                          handleGpaBlur(subjects[key], (v) =>
                            setSubjects((prev) => ({ ...prev, [key]: v }))
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                {error && <div className="gc-error">{error}</div>}

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

              {result && (
                <>
                  <div className="gc-summary">
                    <div className="gc-summary-card yes">
                      <div className="gc-summary-num">{toBn(result.yesCount)}</div>
                      <div className="gc-summary-label">টা জায়গায় পরীক্ষা দিতে পারবে</div>
                    </div>
                    <div className="gc-summary-card no">
                      <div className="gc-summary-num">{toBn(result.noCount)}</div>
                      <div className="gc-summary-label">টা জায়গায় পরীক্ষা দিতে পারবে না</div>
                    </div>
                  </div>

                  {result.unknownCount > 0 && (
                    <div className="gc-unknown-note">
                      {toBn(result.unknownCount)}টা জায়গার জন্য উপরের বিষয়ভিত্তিক GPA লাগবে — ওগুলো
                      বসালে এখানে পারবে/পারবে না দেখাবে, আপাতত কোনো কার্ডে গোনা হয়নি।
                    </div>
                  )}

                  <div className="gc-table-heading yes">যেখানে যেখানে পরীক্ষা দিতে পারবে</div>
                  <div className="gc-columns">
                    <ResultColumn
                      title="ভার্সিটি"
                      items={result.versity.filter((u) => u.status !== "no")}
                      emptyText="কোনোটাতে নেই"
                    />
                    <ResultColumn
                      title="ইঞ্জিনিয়ারিং"
                      items={result.engineering.filter((u) => u.status !== "no")}
                      emptyText="কোনোটাতে নেই"
                    />
                    <ResultColumn
                      title="মেডিকেল"
                      items={result.medical.filter((u) => u.status !== "no")}
                      emptyText="কোনোটাতে নেই"
                    />
                  </div>

                  {result.noCount > 0 && (
                    <>
                      <div className="gc-table-heading no">যেখানে যেখানে পরীক্ষা দিতে পারবে না</div>
                      <div className="gc-columns">
                        <ResultColumn
                          title="ভার্সিটি"
                          items={result.versity.filter((u) => u.status === "no")}
                          emptyText="সবগুলোতে পারবে"
                        />
                        <ResultColumn
                          title="ইঞ্জিনিয়ারিং"
                          items={result.engineering.filter((u) => u.status === "no")}
                          emptyText="সবগুলোতে পারবে"
                        />
                        <ResultColumn
                          title="মেডিকেল"
                          items={result.medical.filter((u) => u.status === "no")}
                          emptyText="সবগুলোতে পারবে"
                        />
                      </div>
                    </>
                  )}
                </>
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
