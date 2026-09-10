"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { key: "versity", label: "ভার্সিটি" },
  { key: "medical", label: "মেডিকেল" },
  { key: "engineering", label: "ইঞ্জিনিয়ারিং" },
];

export default function UpdatesFilterList({ updates }) {
  const [activeCategory, setActiveCategory] = useState("versity");

  const filtered = updates.filter((u) => u.category === activeCategory);

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

      <div className="updates-list">
        {filtered.length === 0 && (
          <p className="updates-empty">এই মুহূর্তে এই বিভাগে কোনো আপডেট নেই।</p>
        )}
        {filtered.map((u) => (
          <article key={u.id} className="update-card">
            <h2 className="update-title">{u.title}</h2>
            <p className="update-date">{u.date}</p>
            <p className="update-uni">
              <Link href={`/university/${u.universityId}`} className="about-link">
                {u.universityName}
              </Link>
            </p>
            <p className="update-app-dates">
              <strong>আবেদন শুরু:</strong> {u.applicationStart}
              {"  "}
              <strong>আবেদন শেষ:</strong> {u.applicationEnd}
            </p>
            <div className="update-table-wrap">
              <table className="update-table">
                <thead>
                  <tr>
                    <th>ইউনিট</th>
                    <th>পরীক্ষার তারিখ</th>
                  </tr>
                </thead>
                <tbody>
                  {u.schedule.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "row-white" : "row-grey"}>
                      <td>{row.unit}</td>
                      <td className={row.tentative ? "tentative-date" : undefined}>
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
