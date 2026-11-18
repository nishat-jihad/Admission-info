"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { getApplicationLines, getApplicationStatus, getRemaining } from "@/lib/examCalendar";
import "../styles/admission-calendar.css";

// পেজে তিনটা ট্যাব — ভার্সিটি, ইঞ্জিনিয়ারিং, মেডিকেল — আগের মতোই।
const CATEGORIES = [
  { key: "university", label: "ভার্সিটি" },
  { key: "engineering", label: "ইঞ্জিনিয়ারিং" },
  { key: "medical", label: "মেডিকেল" },
];

// মোবাইলে inline news বক্স কতটা ভার্সিটির পরে বসবে (PC-তে ডানের sidebar-এ থাকে, তাই লুকানো)
const NEWS_AFTER_BLOCK = 3;

// তিনটা কলামের প্রস্থ — মূল টেবিল, ভেতরের টেবিল আর আবেদনের টেবিল সবখানে একই,
// তাই সব কলাম সোজা একই লাইনে থাকে।
function ColGroup() {
  return (
    <colgroup>
      <col className="cal-col-uni" />
      <col className="cal-col-date" />
      <col className="cal-col-left" />
    </colgroup>
  );
}

function CalendarBlock({ block, nowMs }) {
  const [open, setOpen] = useState(false);
  const panelId = `cal-apply-${block.id}`;

  const status = nowMs == null ? null : getApplicationStatus(block.application, nowMs);
  const lines = getApplicationLines(block.application);

  return (
    <div className="cal-block">
      {/* ভার্সিটির নিজের টেবিল — তার সব ইউনিট নিচে নিচে, আর সবার শেষে আবেদনের সময় দেখার বাটন */}
      <div className="cal-inner-wrap">
        <table className="cal-inner">
          <ColGroup />
          <tbody>
            {block.rows.map((row) => {
              const remaining = nowMs == null ? null : getRemaining(row, nowMs);
              const rowName = `${block.shortName}${row.label ? ` (${row.label})` : ""}`;
              // "10:00 am"-এর am যেন আলাদা লাইনে একা না পড়ে — তাই সময় আর am-এর মাঝে non-breaking space
              const dateText = row.dateText.replace(/\s(am|pm)$/i, "\u00A0$1");
              return (
                <tr key={row.key}>
                  <td className="cal-cell-uni">
                    {row.pageId ? (
                      <Link href={`/university/${row.pageId}`} className="cal-uni-link">
                        {rowName}
                      </Link>
                    ) : (
                      <span className="cal-uni-name">{rowName}</span>
                    )}
                    {row.note && <span className="cal-note">{row.note}</span>}
                  </td>
                  <td className={"cal-cell-date" + (row.tentative ? " cal-tentative" : "")}>
                    {dateText}
                  </td>
                  <td
                    className={
                      "cal-cell-left" + (remaining ? ` cal-left-${remaining.tone}` : "")
                    }
                  >
                    {remaining ? remaining.text : "—"}
                  </td>
                </tr>
              );
            })}

            <tr className="cal-apply-row">
              <td colSpan={3}>
                <button
                  type="button"
                  className="cal-apply-btn"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpen((o) => !o)}
                >
                  আবেদনের সময় দেখুন
                  <svg className="cal-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {open && (
                  <div className="cal-apply-wrap" id={panelId}>
                    <table className="cal-apply">
                      <ColGroup />
                      <thead>
                        <tr>
                          <th>বিশ্ববিদ্যালয়</th>
                          <th>আবেদনের সময়সীমা</th>
                          <th>আবেদনের অবস্থা</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="cal-cell-uni">
                            {block.pageId ? (
                              <Link href={`/university/${block.pageId}`} className="cal-uni-link">
                                {block.shortName}
                              </Link>
                            ) : (
                              <span className="cal-uni-name">{block.shortName}</span>
                            )}
                          </td>
                          <td className="cal-cell-date">
                            {lines.map((l, i) => (
                              <span className="cal-apply-line" key={i}>
                                {l.label && <b>{l.label}: </b>}
                                {l.value}
                              </span>
                            ))}
                          </td>
                          <td className="cal-cell-left">
                            {!status ? (
                              "—"
                            ) : status.key === "started" && block.applyUrl ? (
                              <a
                                className="cal-apply-now"
                                href={block.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                আবেদন করুন
                              </a>
                            ) : (
                              <span className={`cal-status cal-status-${status.key}`}>
                                {status.text}
                              </span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ExamDatesFilterList({ calendar, inlineNews = null }) {
  const [activeCategory, setActiveCategory] = useState("university");
  // বর্তমান সময় শুধু ব্রাউজারে বসে (সার্ভারের সাথে hydration mismatch এড়াতে), প্রতি ৩০ সেকেন্ডে আপডেট হয়।
  const [nowMs, setNowMs] = useState(null);

  useEffect(() => {
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const blocks = calendar.filter((b) => b.category === activeCategory);
  const newsIndex = Math.min(NEWS_AFTER_BLOCK, blocks.length) - 1;

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
        {blocks.length === 0 ? (
          <p className="exam-category-empty">শীঘ্রই যোগ করা হবে</p>
        ) : (
          <div className="cal-wrap">
            <table className="cal-main">
              <ColGroup />
              <thead>
                <tr>
                  <th>বিশ্ববিদ্যালয়</th>
                  <th>পরীক্ষার তারিখ</th>
                  <th>সময় বাকি</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block, i) => (
                  <Fragment key={block.id}>
                    <tr>
                      <td colSpan={3} className="cal-uni-block-cell">
                        <CalendarBlock block={block} nowMs={nowMs} />
                      </td>
                    </tr>
                    {i === newsIndex && inlineNews && (
                      <tr className="cal-news-row">
                        <td colSpan={3}>{inlineNews}</td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
