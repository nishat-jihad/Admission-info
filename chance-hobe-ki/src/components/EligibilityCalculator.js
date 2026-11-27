"use client";

import { useState } from "react";
import { fieldLabels } from "@/data/universities";
import { checkEligibility } from "@/lib/eligibility";

export default function EligibilityCalculator({ id, uni }) {
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  const fieldRows = uni.fields.length > 2 ? [uni.fields.slice(0, 2), uni.fields.slice(2)] : [uni.fields];

  function handleChange(field, raw) {
    // GPA বাস্তবে কখনো 5 এর বেশি হয় না, তাই টাইপ করার সময়ই 5 এর বেশি হলে আটকে দেওয়া হচ্ছে
    if (raw !== "") {
      const num = parseFloat(raw);
      if (!isNaN(num) && num > 5) {
        raw = "5";
      }
    }
    setValues((v) => ({ ...v, [field]: raw }));
  }

  function handleBlur(field) {
    // ফিল্ড থেকে বের হওয়ার সময় 1 এর কম হলে 1 এ ঠিক করে দেওয়া হচ্ছে (GPA এর সর্বনিম্ন মান 1)
    setValues((v) => {
      const raw = v[field];
      if (raw === undefined || raw === "") return v;
      const num = parseFloat(raw);
      if (!isNaN(num) && num < 1) {
        return { ...v, [field]: "1" };
      }
      return v;
    });
  }

  function handleCheck() {
    const vals = {};
    uni.fields.forEach((f) => {
      vals[f] = parseFloat(values[f]) || 0;
    });
    const eligible = checkEligibility(id, vals, {});

    let msg = eligible
      ? `তোমার GPA অনুযায়ী তুমি ${uni.name} এ পরীক্ষা দেওয়ার যোগ্যতা রাখো।`
      : `দুঃখিত, তোমার GPA ${uni.name} এর ন্যূনতম শর্ত পূরণ করছে না।`;

    // BUET: ২০২৬-২৭ বিজ্ঞপ্তি অনুযায়ী — কোন শর্ত পূরণ হয়নি সেটা আলাদা করে দেখানো হয়,
    // আর যোগ্য হলেও ১০,০০০ জন বাছাইয়ের নিয়মটা মনে করিয়ে দেওয়া হয়।
    if (id === "buet") {
      const c = uni.calc;
      const bn = (n) => Number(n).toFixed(2).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
      if (eligible) {
        msg =
          "তোমার GPA অনুযায়ী তুমি বুয়েটে আবেদনের ন্যূনতম যোগ্যতা পূরণ করছো (SSC বিজ্ঞান বিভাগ থেকে হতে হবে)। " +
          "তবে সব আবেদনকারীর মধ্য থেকে HSC-তে উচ্চতর গণিত, পদার্থবিজ্ঞান ও রসায়নের মোট নম্বরে সেরা ১০,০০০ জন ভর্তি পরীক্ষায় বসার সুযোগ পাবে।";
      } else {
        const fails = [];
        if ((vals.ssc || 0) < c.minSsc) fails.push(`SSC GPA ন্যূনতম ${bn(c.minSsc)}`);
        if ((vals.hsc || 0) < c.minHsc) fails.push(`HSC GPA ন্যূনতম ${bn(c.minHsc)}`);
        if ((vals.hm || 0) < c.minSubject) fails.push(`উচ্চতর গণিতে ন্যূনতম ${bn(c.minSubject)}`);
        if ((vals.phy || 0) < c.minSubject) fails.push(`পদার্থবিজ্ঞানে ন্যূনতম ${bn(c.minSubject)}`);
        if ((vals.chem || 0) < c.minSubject) fails.push(`রসায়নে ন্যূনতম ${bn(c.minSubject)}`);
        msg = `দুঃখিত, তোমার GPA বুয়েটের ন্যূনতম শর্ত পূরণ করছে না। লাগবে: ${fails.join("; ")}।`;
      }
    }

    // মেডিকেল (MBBS/BDS): ২০২৬-২৭ বিজ্ঞপ্তি অনুযায়ী — কোন শর্ত পূরণ হয়নি আলাদা করে দেখানো হয়,
    // আর GPA থেকে প্রাপ্ত নম্বর (SSC×৮ + HSC×১২, সর্বোচ্চ ১০০) থেকে কর্তন বাদ দিয়ে দেখানো হয়।
    if (id === "medical") {
      const c = uni.calc;
      const bn = (n) => Number(n).toFixed(2).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
      const minCombined = c.minCombined;
      const minBio = c.minBio;
      const combined = (vals.ssc || 0) + (vals.hsc || 0);
      if (eligible) {
        const gpaMarks = (vals.ssc || 0) * 8 + (vals.hsc || 0) * 12;
        msg =
          `তোমার GPA অনুযায়ী তুমি মেডিকেল/ডেন্টাল ভর্তি পরীক্ষায় অংশ নেওয়ার ন্যূনতম GPA শর্ত পূরণ করছো। ` +
          `GPA থেকে তোমার প্রাপ্ত নম্বর ${bn(gpaMarks)}/১০০ (SSC×৮ + HSC×১২); ` +
          `এর সাথে ভর্তি পরীক্ষার ১০০ নম্বর যোগ হয়ে মোট ২০০-তে মেধাতালিকা হবে।`;
      } else {
        const fails = [];
        if (combined < minCombined) fails.push(`SSC+HSC মোট GPA ন্যূনতম ${bn(minCombined)} (তোমার ${bn(combined)})`);
        if ((vals.bio || 0) < minBio) fails.push(`HSC জীববিজ্ঞানে ন্যূনতম ${bn(minBio)}`);
        msg = `দুঃখিত, তোমার GPA ন্যূনতম শর্ত পূরণ করছে না। লাগবে: ${fails.join("; ")}।`;
      }
    }

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
                    min="1"
                    max="5"
                    id={`f_${f}`}
                    placeholder="0.00"
                    value={values[f] || ""}
                    onChange={(e) => handleChange(f, e.target.value)}
                    onBlur={() => handleBlur(f)}
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
      {id === "du" ? (
        <div className="circular-update-note" style={{ color: "var(--green-dark)" }}>
          এই তথ্য ২০২৬ সালের তথ্য অনুযায়ী আপডেট করা হয়েছে।
        </div>
      ) : id === "ru" ? (
        <div className="circular-update-note" style={{ color: "var(--green-dark)" }}>
          এই তথ্য ২০২৬ সালের সার্কুলার অনুযায়ী আপডেট করা হয়েছে।
        </div>
      ) : id === "ju_a" || id === "ju_d" ? (
        <div className="circular-update-note" style={{ color: "var(--green-dark)" }}>
          এই তথ্য ২০২৬ সালের সার্কুলার অনুযায়ী আপডেট করা হয়েছে।
        </div>
      ) : id === "buet" ? (
        <div className="circular-update-note" style={{ color: "var(--green-dark)" }}>
          এই তথ্য ২০২৬ সালের সার্কুলার অনুযায়ী আপডেট করা হয়েছে।
        </div>
      ) : id === "jnu" || id === "krishi" ? (
        <div className="circular-update-note" style={{ color: "var(--green-dark)" }}>
          এই তথ্য ২০২৬ সালের সার্কুলার অনুযায়ী আপডেট করা হয়েছে।
        </div>
      ) : id === "medical" ? (
        <div className="circular-update-note" style={{ color: "var(--green-dark)" }}>
          এই তথ্য ২০২৬ সালের সার্কুলার অনুযায়ী আপডেট করা হয়েছে।
        </div>
      ) : id === "kuet" ? (
        <div className="circular-update-note" style={{ color: "var(--green-dark)" }}>
          এই তথ্য ২০২৬ সালের সার্কুলার অনুযায়ী দেওয়া হয়েছে।
        </div>
      ) : (
        <div className="circular-update-note">
          ২০২৬ সালের আপডেটেড সার্কুলার প্রকাশ হলে এই তথ্য আপডেট করা হবে।
        </div>
      )}
    </section>
  );
}
