"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GPA_SCALE = [
  { min: 80, grade: "A+", points: 5.0 },
  { min: 70, grade: "A", points: 4.0 },
  { min: 60, grade: "A-", points: 3.5 },
  { min: 50, grade: "B", points: 3.0 },
  { min: 40, grade: "C", points: 2.0 },
  { min: 33, grade: "D", points: 1.0 },
  { min: 0, grade: "F", points: 0.0 },
];

function getGrade(marks) {
  const m = Math.max(0, Math.min(100, parseFloat(marks) || 0));
  const row = GPA_SCALE.find((r) => m >= r.min);
  return { grade: row.grade, points: row.points };
}

let idCounter = 5;
const DEFAULT_SUBJECTS = [
  { id: 1, name: "বাংলা ১ম পত্র", marks: "", isFourth: false },
  { id: 2, name: "বাংলা ২য় পত্র", marks: "", isFourth: false },
  { id: 3, name: "English 1st Paper", marks: "", isFourth: false },
  { id: 4, name: "English 2nd Paper", marks: "", isFourth: false },
  { id: 5, name: "ICT", marks: "", isFourth: false },
];

export default function HscGpaCalculatorPage() {
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [result, setResult] = useState(null);

  function updateSubject(id, field, value) {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
    setResult(null);
  }

  function setFourth(id) {
    setSubjects((prev) =>
      prev.map((s) => ({ ...s, isFourth: s.id === id ? !s.isFourth : false }))
    );
    setResult(null);
  }

  function addSubject() {
    idCounter += 1;
    setSubjects((prev) => [
      ...prev,
      { id: idCounter, name: "", marks: "", isFourth: false },
    ]);
    setResult(null);
  }

  function removeSubject(id) {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    setResult(null);
  }

  function handleCalculate() {
    const valid = subjects.filter((s) => s.name.trim() !== "" && s.marks !== "");
    if (valid.length === 0) return;

    const fourth = valid.find((s) => s.isFourth);
    const mainSubjects = valid.filter((s) => !s.isFourth);

    const mainGrades = mainSubjects.map((s) => ({
      ...s,
      ...getGrade(s.marks),
    }));

    let totalPoints = mainGrades.reduce((sum, s) => sum + s.points, 0);
    let divisor = mainGrades.length;
    let fourthGrade = null;

    if (fourth) {
      fourthGrade = { ...fourth, ...getGrade(fourth.marks) };
      totalPoints += Math.max(0, fourthGrade.points - 2);
    }

    const gpa = divisor > 0 ? totalPoints / divisor : 0;
    const hasFail = mainGrades.some((s) => s.grade === "F");

    setResult({
      gpa: hasFail ? 0 : Math.min(5, gpa),
      hasFail,
      mainGrades,
      fourthGrade,
    });
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
            <h2 className="general-page-title">HSC GPA Calculator</h2>
            <p className="general-page-sub">
              প্রতিটি বিষয়ের নম্বর বসাও — নিচে তাৎক্ষণিক GPA দেখতে পাবে
            </p>
          </div>

          <div className="general-check-layout">
            <div className="general-check-main">
              <div className="general-card general-check-card">
                <div className="general-intro">
                  ৪র্থ / ঐচ্ছিক বিষয় থাকলে সেই বিষয়ের পাশের{" "}
                  <b>&quot;৪র্থ বিষয়&quot;</b> বাটনে ক্লিক করো — নিয়ম অনুযায়ী ৪র্থ
                  বিষয়ের গ্রেড পয়েন্ট থেকে ২ বাদ দিয়ে (ধনাত্মক হলে) যোগ করা হবে।
                </div>

                <div className="hsc-subject-group">
                  {subjects.map((s) => (
                    <div className="hsc-fields-grid" key={s.id}>
                      <div className="field field-span-full">
                        <label>বিষয়ের নাম</label>
                        <input
                          type="text"
                          placeholder="যেমন: পদার্থবিজ্ঞান"
                          value={s.name}
                          onChange={(e) =>
                            updateSubject(s.id, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="field">
                        <label>নম্বর (০-১০০)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="যেমন: 85"
                          value={s.marks}
                          onChange={(e) =>
                            updateSubject(s.id, "marks", e.target.value)
                          }
                        />
                      </div>
                      <div className="field">
                        <label>&nbsp;</label>
                        <button
                          type="button"
                          className={`optional-toggle${s.isFourth ? " selected" : ""}`}
                          onClick={() => setFourth(s.id)}
                        >
                          ৪র্থ বিষয়
                        </button>
                      </div>
                      <div className="field">
                        <label>&nbsp;</label>
                        <button
                          type="button"
                          className="optional-toggle"
                          onClick={() => removeSubject(s.id)}
                        >
                          বাদ দাও
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="optional-toggle-row">
                  <button
                    type="button"
                    className="optional-toggle"
                    onClick={addSubject}
                  >
                    + আরেকটা বিষয় যোগ করো
                  </button>
                </div>

                <button className="check-btn wide" onClick={handleCalculate}>
                  GPA বের করো
                </button>
              </div>

              {result && (
                <div className="result-heading-block">
                  <div className="result-heading-title">
                    তোমার GPA: {result.hasFail ? "0.00" : result.gpa.toFixed(2)}
                  </div>
                  {result.hasFail && (
                    <p className="result-heading-sub">
                      একটা বিষয়ে F (অকৃতকার্য) থাকায় সামগ্রিক GPA 0.00 দেখানো হচ্ছে —
                      সব বিষয়ে পাশ করা বাধ্যতামূলক।
                    </p>
                  )}
                </div>
              )}

              {result && (
                <div className="general-result-table-wrap">
                  <table className="general-result-table">
                    <tbody>
                      {result.mainGrades.map((s) => (
                        <tr key={s.id}>
                          <td>
                            {s.name} — {s.marks} নম্বর — গ্রেড {s.grade} (
                            {s.points.toFixed(2)})
                          </td>
                        </tr>
                      ))}
                      {result.fourthGrade && (
                        <tr>
                          <td>
                            {result.fourthGrade.name} (৪র্থ বিষয়) — {result.fourthGrade.marks}{" "}
                            নম্বর — গ্রেড {result.fourthGrade.grade} (
                            {result.fourthGrade.points.toFixed(2)}) — যোগ হয়েছে{" "}
                            {Math.max(0, result.fourthGrade.points - 2).toFixed(2)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

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
                    <tr><td>80-100</td><td>A+</td><td>5.00</td></tr>
                    <tr><td>70-79</td><td>A</td><td>4.00</td></tr>
                    <tr><td>60-69</td><td>A-</td><td>3.50</td></tr>
                    <tr><td>50-59</td><td>B</td><td>3.00</td></tr>
                    <tr><td>40-49</td><td>C</td><td>2.00</td></tr>
                    <tr><td>33-39</td><td>D</td><td>1.00</td></tr>
                    <tr><td>0-32</td><td>F</td><td>0.00</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="general-check-about">
              <div className="general-about-title">GPA হিসাবের নিয়ম</div>
              <p>
                প্রতিটি বিষয়ের প্রাপ্ত নম্বরকে গ্রেড পয়েন্টে রূপান্তর করে সবগুলোর
                গড় করে GPA বের করা হয়।
              </p>
              <p>
                ৪র্থ / ঐচ্ছিক বিষয় থাকলে তার গ্রেড পয়েন্ট থেকে ২ বাদ দিয়ে (ফলাফল
                ঋণাত্মক হলে ০ ধরে) মূল বিষয়গুলোর সমষ্টির সাথে যোগ করা হয়, এবং মূল
                বিষয়সংখ্যা দিয়ে ভাগ করা হয়।
              </p>
              <p>
                যেকোনো একটা মূল বিষয়ে F (অকৃতকার্য) পেলে সামগ্রিক ফলাফল 0.00
                দেখানো হয়।
              </p>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
