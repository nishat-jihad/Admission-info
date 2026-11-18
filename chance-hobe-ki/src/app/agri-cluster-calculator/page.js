"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LatestNewsList from "@/components/LatestNewsList";
import "../../styles/agri-calc.css";

const MAX_MARK = 25; // SSC থেকে ২৫, HSC থেকে ২৫

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// বাংলা অঙ্কে লিখলেও যেন কাজ করে — ইংরেজি অঙ্কে বদলে parse করা হয়
function parseNumber(raw) {
  const en = String(raw ?? "")
    .trim()
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, ".");
  if (en === "") return NaN;
  return Number(en);
}

// দেখানোর সময় বাংলা অঙ্ক
function bn(value, digits = 2) {
  const s = Number.isInteger(value) ? String(value) : value.toFixed(digits);
  return s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

function bn2(value) {
  return value.toFixed(2).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

function NumberField({ id, label, placeholder, value, onChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function AgriClusterCalculatorPage() {
  const [form, setForm] = useState({ sscGot: "", sscFull: "", hscGot: "", hscFull: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleCalculate() {
    const sscGot = parseNumber(form.sscGot);
    const sscFull = parseNumber(form.sscFull);
    const hscGot = parseNumber(form.hscGot);
    const hscFull = parseNumber(form.hscFull);

    setResult(null);

    if ([sscGot, sscFull, hscGot, hscFull].some((n) => Number.isNaN(n))) {
      setError("চারটা ঘরেই নম্বর লিখো (শুধু সংখ্যা)।");
      return;
    }
    if (sscFull <= 0 || hscFull <= 0) {
      setError("পূর্ণমান ০-এর বেশি হতে হবে।");
      return;
    }
    if (sscGot < 0 || hscGot < 0) {
      setError("প্রাপ্ত নম্বর ঋণাত্মক হতে পারে না।");
      return;
    }
    if (sscGot > sscFull) {
      setError("SSC-র প্রাপ্ত নম্বর পূর্ণমানের চেয়ে বেশি হতে পারে না।");
      return;
    }
    if (hscGot > hscFull) {
      setError("HSC-র প্রাপ্ত নম্বর পূর্ণমানের চেয়ে বেশি হতে পারে না।");
      return;
    }

    setError("");

    // ফর্মুলা: (প্রাপ্ত নম্বর × ২৫) ÷ পূর্ণমান
    const sscScore = (sscGot * MAX_MARK) / sscFull;
    const hscScore = (hscGot * MAX_MARK) / hscFull;
    const total = sscScore + hscScore;

    setResult({
      sscGot,
      sscFull,
      hscGot,
      hscFull,
      sscScore,
      hscScore,
      sscCut: MAX_MARK - sscScore,
      hscCut: MAX_MARK - hscScore,
      total,
      totalCut: MAX_MARK * 2 - total,
    });
  }

  return (
    <>
      <Navbar />
      <section className="general-page hsc-calc-page open">
        <div className="agri-layout">
        <aside className="agri-news-aside" aria-label="Latest News">
          <LatestNewsList />
        </aside>
        <div className="general-page-inner">
          <Link className="general-back-btn" href="/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            হোমে ফিরে যাও
          </Link>

          <div className="general-page-header">
            <span className="hero-eyebrow">কৃষি গুচ্ছ ভর্তি ২০২৬</span>
            <h2 className="general-page-title">কৃষি গুচ্ছ GPA Calculator</h2>
            <p className="general-page-sub">
              SSC ও HSC-র নম্বর বসাও — ২৫ + ২৫ এর মধ্যে কত পাবে আর কত কাটা যাবে নিচে দেখতে পাবে
            </p>
          </div>

          <div className="general-card">
            <div className="agri-note">
              দ্রষ্টব্য: <b>SSC-র</b> ক্ষেত্রে <b>শারীরিক শিক্ষা</b> ও <b>কর্মমুখী শিক্ষার</b> নম্বর
              কাটা যাবে — অর্থাৎ SSC-র প্রাপ্ত নম্বর আর পূর্ণমান, দুটো থেকেই ওই বিষয়ের নম্বর বাদ
              দিয়ে লিখবে। ২০২৬ সালে <b>চতুর্থ বিষয়ের নম্বর সহ</b> গণনা হবে।
            </div>

            <div className="agri-group-title">SSC</div>
            <div className="agri-fields-grid">
              <NumberField
                id="sscGot"
                label="প্রাপ্ত মোট নম্বর"
                placeholder="যেমন: ৯৫০"
                value={form.sscGot}
                onChange={(v) => setField("sscGot", v)}
              />
              <NumberField
                id="sscFull"
                label="মোট পূর্ণমান"
                placeholder="যেমন: ১০৫০"
                value={form.sscFull}
                onChange={(v) => setField("sscFull", v)}
              />
            </div>

            <div className="agri-group-title">HSC</div>
            <div className="agri-fields-grid">
              <NumberField
                id="hscGot"
                label="প্রাপ্ত মোট নম্বর"
                placeholder="যেমন: ১০২০"
                value={form.hscGot}
                onChange={(v) => setField("hscGot", v)}
              />
              <NumberField
                id="hscFull"
                label="মোট পূর্ণমান"
                placeholder="যেমন: ১১০০"
                value={form.hscFull}
                onChange={(v) => setField("hscFull", v)}
              />
            </div>

            <button type="button" className="check-btn wide" onClick={handleCalculate}>
              Calculate
            </button>

            {error && <div className="agri-error">{error}</div>}

            {result && (
              <div className="agri-result">
                <div className="agri-result-title">তোমার হিসাব</div>

                <div className="agri-summary">
                  <div className="agri-summary-label">তোমার মোট স্কোর</div>
                  <div className="agri-summary-score">
                    <span>{bn2(result.total)}</span> / {bn(MAX_MARK * 2)}
                  </div>
                  <div className="agri-meter" aria-hidden="true">
                    <div
                      className="agri-meter-fill"
                      style={{ width: `${(result.total / (MAX_MARK * 2)) * 100}%` }}
                    />
                  </div>
                  <div className="agri-summary-cut">
                    কাটা গেছে: <b>{bn2(result.totalCut)}</b>
                  </div>
                </div>

                <div className="agri-table-wrap">
                  <table className="agri-table">
                    <thead>
                      <tr>
                        <th>পরীক্ষা</th>
                        <th>প্রাপ্ত নম্বর</th>
                        <th>পূর্ণমান</th>
                        <th>হিসাব</th>
                        <th>পাবে (২৫-এর মধ্যে)</th>
                        <th>কাটা যাবে</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="agri-exam">SSC</td>
                        <td>{bn(result.sscGot)}</td>
                        <td>{bn(result.sscFull)}</td>
                        <td className="agri-calc">
                          ({bn(result.sscGot)} × ২৫) ÷ {bn(result.sscFull)}
                        </td>
                        <td className="agri-got">{bn2(result.sscScore)}</td>
                        <td className="agri-cut">{bn2(result.sscCut)}</td>
                      </tr>
                      <tr>
                        <td className="agri-exam">HSC</td>
                        <td>{bn(result.hscGot)}</td>
                        <td>{bn(result.hscFull)}</td>
                        <td className="agri-calc">
                          ({bn(result.hscGot)} × ২৫) ÷ {bn(result.hscFull)}
                        </td>
                        <td className="agri-got">{bn2(result.hscScore)}</td>
                        <td className="agri-cut">{bn2(result.hscCut)}</td>
                      </tr>
                      <tr className="agri-total">
                        <td colSpan={4}>মোট (৫০-এর মধ্যে)</td>
                        <td className="agri-got">{bn2(result.total)}</td>
                        <td className="agri-cut">{bn2(result.totalCut)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="agri-formula">
                  <div className="agri-formula-title">কোন ফর্মুলায় হিসাব করা হয়েছে</div>

                  <div className="agri-formula-step">ধাপ ১ — মূল ফর্মুলা (SSC ও HSC দুটোর জন্যই একই)</div>
                  <code>পাবে = (প্রাপ্ত নম্বর × ২৫) ÷ মোট পূর্ণমান</code>

                  <div className="agri-formula-step">ধাপ ২ — SSC</div>
                  <code>
                    ({bn(result.sscGot)} × ২৫) ÷ {bn(result.sscFull)} = {bn2(result.sscScore)}
                  </code>

                  <div className="agri-formula-step">ধাপ ৩ — HSC</div>
                  <code>
                    ({bn(result.hscGot)} × ২৫) ÷ {bn(result.hscFull)} = {bn2(result.hscScore)}
                  </code>

                  <div className="agri-formula-step">ধাপ ৪ — মোট স্কোর (৫০-এর মধ্যে)</div>
                  <code>
                    {bn2(result.sscScore)} + {bn2(result.hscScore)} = {bn2(result.total)}
                  </code>

                  <div className="agri-formula-step">ধাপ ৫ — কাটা যাবে</div>
                  <code>
                    কাটা যাবে = ২৫ − পাওয়া নম্বর (SSC: {bn2(result.sscCut)}, HSC: {bn2(result.hscCut)})
                  </code>

                  <ul>
                    <li>২০২৬ সালে চতুর্থ বিষয়ের নম্বর সহ ধরা হয়েছে।</li>
                    <li>SSC-র শারীরিক শিক্ষা ও কর্মমুখী শিক্ষার নম্বর বাদ দিয়ে হিসাব করা হয়েছে।</li>
                    <li>এই ২৫ + ২৫ নম্বর ১০০ নম্বরের ভর্তি পরীক্ষার সাথে যোগ হয়ে মোট ১৫০-এর মেধা স্কোর হয়।</li>
                  </ul>
                </div>
                <p className="agri-disclaimer">
                  এটা আনুমানিক হিসাব। চূড়ান্ত নিয়ম কৃষি গুচ্ছের অফিসিয়াল সার্কুলারে (acas.edu.bd)
                  মিলিয়ে নিও।
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
