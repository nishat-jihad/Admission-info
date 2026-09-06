"use client";

import { useState } from "react";
import { fieldLabels } from "@/data/universities";
import { checkEligibility } from "@/lib/eligibility";

export default function EligibilityCalculator({ id, uni }) {
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  const fieldRows = uni.fields.length > 2 ? [uni.fields.slice(0, 2), uni.fields.slice(2)] : [uni.fields];

  function handleChange(field, raw) {
    setValues((v) => ({ ...v, [field]: raw }));
  }

  function handleCheck() {
    const vals = {};
    uni.fields.forEach((f) => {
      vals[f] = parseFloat(values[f]) || 0;
    });
    const eligible = checkEligibility(id, vals);

    let msg = eligible
      ? `তোমার GPA অনুযায়ী তুমি ${uni.name} এ পরীক্ষা দেওয়ার যোগ্যতা রাখো।`
      : `দুঃখিত, তোমার GPA ${uni.name} এর ন্যূনতম শর্ত পূরণ করছে না।`;

    if (uni.extraNote) {
      const en = uni.extraNote;
      const rawVal = (values[en.field] || "").toString().trim();
      if (rawVal === "") {
        msg += ` (${en.emptyNote})`;
      } else {
        const v = parseFloat(rawVal) || 0;
        msg += " (" + (v >= en.min ? en.aboveNote : en.belowNote) + ")";
      }
    }

    setResult({ eligible, msg });
  }

  return (
    <section className="block">
      <div className="calc-box">
        <h2>GPA যোগ্যতা যাচাই করো</h2>
        <div className="calc-sub">
          তোমার GPA বসিয়ে দেখো {uni.name} এ পরীক্ষা দেওয়ার যোগ্যতা আছে কিনা
        </div>

        <div className="calc-fields">
          {fieldRows.map((row, i) => (
            <div
              key={i}
              className="calc-fields-row"
              style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
            >
              {row.map((f) => (
                <div className="calc-field" key={f}>
                  <label htmlFor={`f_${f}`}>{fieldLabels[f]}</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    id={`f_${f}`}
                    placeholder="0.00"
                    value={values[f] || ""}
                    onChange={(e) => handleChange(f, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <button className="calc-btn" onClick={handleCheck}>
          চেক করো
        </button>

        {result && (
          <div className={`result-box ${result.eligible ? "eligible" : "not-eligible"}`}>
            {result.msg}
          </div>
        )}

        <div className="calc-note">
          এখানে দেওয়া শর্তগুলো একটি সাধারণ ধারণা মাত্র। প্রকৃত ভর্তি বিজ্ঞপ্তি দেখে
          নিশ্চিত হয়ে নিও।
        </div>
      </div>
      <div className="circular-update-note">
        ২০২৬ সালের আপডেটেড সার্কুলার প্রকাশ হলে এই তথ্য আপডেট করা হবে।
      </div>
    </section>
  );
}
