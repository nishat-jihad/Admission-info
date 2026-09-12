"use client";

import { useState } from "react";
import Link from "next/link";

// পেজে তিনটা ট্যাব — ভার্সিটি, ইঞ্জিনিয়ারিং, মেডিকেল — Updates(admission)
// পেজের মতোই, একসাথে একটা ক্যাটাগরি দেখানোর জন্য।
const CATEGORIES = [
  { key: "university", label: "ভার্সিটি" },
  { key: "engineering", label: "ইঞ্জিনিয়ারিং" },
  { key: "medical", label: "মেডিকেল" },
];

// examDates.js (per-university) থেকে ইউনিট অনুযায়ী গ্রুপ করা হচ্ছে, যাতে
// একই ইউনিটের ভার্সিটিগুলো একটা টেবিলের নিচে একসাথে দেখানো যায় (যেমন
// 'এ' ইউনিট-এ ঢাবি, জবি, চবি — সবাই একই টেবিলে)।
function groupByUnit(data) {
  const groups = [];
  const indexByUnit = {};
  data.forEach((u) => {
    u.schedule.forEach((row) => {
      if (!(row.unit in indexByUnit)) {
        indexByUnit[row.unit] = groups.length;
        groups.push({ unit: row.unit, rows: [] });
      }
      groups[indexByUnit[row.unit]].rows.push({
        universityId: u.universityId,
        universityName: u.universityName,
        shortName: u.shortName,
        examDate: row.date,
        applicationRange: `${u.applicationStart} - ${u.applicationEnd}`,
      });
    });
  });
  return groups;
}

function ExamUnitTable({ group }) {
  return (
    <div className="exam-unit-table-wrap">
      <table className="exam-unit-table">
        <thead>
          <tr>
            <th colSpan={3} className="exam-unit-header">
              Unit {group.unit}
            </th>
          </tr>
          <tr>
            <th>বিশ্ববিদ্যালয়</th>
            <th>পরীক্ষার তারিখ</th>
            <th>আবেদন (শুরু-শেষ)</th>
          </tr>
        </thead>
        <tbody>
          {group.rows.map((row) => (
            <tr key={row.universityId}>
              <td className="exam-uni-cell">
                <Link href={`/university/${row.universityId}`} className="exam-uni-link">
                  <span className="exam-uni-full">{row.universityName}</span>
                  <span className="exam-uni-short">{row.shortName}</span>
                </Link>
              </td>
              <td>{row.examDate}</td>
              <td>{row.applicationRange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ExamDatesFilterList({ examDates }) {
  const [activeCategory, setActiveCategory] = useState("university");

  const catData = examDates.filter((u) => u.category === activeCategory);
  const unitGroups = groupByUnit(catData);

  return (
    <>
      <div className="updates-filter-row" role="tablist" aria-label="বিভাগ অনুযায়ী ফিল্টার">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.key}
            className={
              "updates-filter-btn" +
              (activeCategory === cat.key ? " updates-filter-btn-active" : "")
            }
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className="exam-category-section">
        {unitGroups.length === 0 ? (
          <p className="exam-category-empty">শীঘ্রই যোগ করা হবে</p>
        ) : (
          <div className="exam-unit-groups">
            {unitGroups.map((group) => (
              <ExamUnitTable key={group.unit} group={group} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
