"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { universities } from "@/data/universities";
import { engineeringUniIds, medicalUniIds } from "@/data/generalCriteria";
import { getLatestNews, formatBnDate } from "@/data/news";
import Navbar from "@/components/Navbar";
import NewsImage from "@/components/NewsImage";

// ============================================================================
// অ্যাপের হোম স্ক্রিন (শুধু অ্যাপ বিল্ডে চলে; ওয়েবসাইটের হোম app/page.js-এ আগের মতোই আছে)।
// ওপর থেকে নিচে: Latest News (আড়াআড়ি সোয়াইপ) → ভার্সিটি (সার্চ + ক্যাটাগরি বার + ছোট কার্ড)
// → "সকল ভার্সিটি দেখো" বাটন। Footer নেই — footer-এর সব লিংক ☰ মেনুতে।
// ============================================================================

const VISIBLE_COUNT = 4;
const FEATURED_IDS = ["medical", "du", "buet", "gst", "cu", "sust"];
const ALL_IDS = (() => {
  const featured = FEATURED_IDS.filter((id) => universities[id]);
  const rest = Object.keys(universities).filter((id) => !featured.includes(id));
  return [...featured, ...rest];
})();

const CATEGORIES = [
  { id: "all", label: "সব" },
  { id: "versity", label: "ভার্সিটি" },
  { id: "engineering", label: "ইঞ্জিনিয়ারিং" },
  { id: "medical", label: "মেডিক্যাল" },
];

const CLOCK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ?category= পড়ে ক্যাটাগরি ঠিক করা (☰ মেনুর "ইঞ্জিনিয়ারিং" ইত্যাদি লিংক এখান দিয়ে কাজ করে)
function SearchParamsSync({ setCategory, setShowAll }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    const valid = CATEGORIES.some((c) => c.id === cat) ? cat : "all";
    setCategory(valid);
    if (cat) setShowAll(true);
    if (window.location.hash === "#cards-wrap") {
      requestAnimationFrame(() => {
        document.getElementById("cards-wrap")?.scrollIntoView({ block: "start" });
      });
    }
  }, [searchParams, setCategory, setShowAll]);

  return null;
}

function LatestNews() {
  const items = getLatestNews(6);
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  if (items.length === 0) return null;

  const pages = Math.ceil(items.length / 2);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth - 14, 1);
    setPage(Math.min(pages - 1, Math.round(el.scrollLeft / step)));
  }

  return (
    <section className="app-news" aria-labelledby="app-news-title">
      <div className="app-sec-head">
        <h2 className="app-sec-title" id="app-news-title">
          Latest News
        </h2>
        <Link href="/news" className="app-sec-link">
          সকল নিউজ
        </Link>
      </div>

      <div className="app-news-track" ref={trackRef} onScroll={onScroll}>
        {items.map((item, i) => (
          <Link key={item.slug} href={`/news/${item.slug}`} className="app-news-card">
            <span className="app-news-media">
              <NewsImage
                src={item.image}
                alt={item.imageAlt || item.title}
                sizes="50vw"
                priority={i < 2}
              />
            </span>
            <span className="app-news-title">{item.title}</span>
            <span className="news-date">
              {CLOCK_ICON}
              <time dateTime={item.date}>{formatBnDate(item.date)}</time>
            </span>
          </Link>
        ))}
      </div>

      {pages > 1 && (
        <div className="app-dots" aria-hidden="true">
          {Array.from({ length: pages }).map((_, i) => (
            <i key={i} className={i === page ? "on" : undefined} />
          ))}
        </div>
      )}
    </section>
  );
}

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.3" aria-hidden="true">
    <path
      d="M3 21h18M4 21V9l8-6 8 6v12M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ছোট ভার্সিটি কার্ড: ছবি, নাম, দুই লাইন তথ্য — আর "বিস্তারিত" বাটন তথ্যের সাথে একই লাইনে
function AppUniCard({ id, uni }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = uni.photo && !imgFailed;
  const seats = String(uni.seats || "").split("(")[0].trim();
  const href = `/university/${id}`;

  return (
    <article className="app-uni">
      <Link
        href={href}
        className="app-uni-photo"
        style={{ background: `linear-gradient(135deg, ${uni.color}, #101010)` }}
        aria-label={`${uni.name} — বিস্তারিত`}
        tabIndex={-1}
      >
        {showPhoto ? (
          <Image
            src={uni.photo}
            alt={`${uni.name} campus`}
            fill
            sizes="50vw"
            onError={() => setImgFailed(true)}
          />
        ) : (
          FALLBACK_ICON
        )}
      </Link>
      <div className="app-uni-body">
        <h3 className="app-uni-name">{uni.name}</h3>
        <div className="app-uni-row">
          <ul className="app-uni-info">
            {seats && <li>আসন {seats}</li>}
            {uni.examTime && <li>{uni.examTime}</li>}
          </ul>
          <Link href={href} className="app-uni-btn">
            বিস্তারিত
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function AppHome() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredIds = useMemo(() => {
    let ids = ALL_IDS;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      ids = ids.filter((id) => {
        const uni = universities[id];
        return (
          uni.name.toLowerCase().includes(q) ||
          (uni.fullName ? uni.fullName.toLowerCase().includes(q) : false)
        );
      });
    } else if (category !== "all") {
      ids = ids.filter((id) => {
        if (category === "engineering") return engineeringUniIds.includes(id);
        if (category === "medical") return medicalUniIds.includes(id);
        if (category === "versity")
          return !engineeringUniIds.includes(id) && !medicalUniIds.includes(id);
        return true;
      });
    }
    return ids;
  }, [query, category]);

  const isFiltering = query.trim().length > 0 || category !== "all";
  const visibleIds = isFiltering || showAll ? filteredIds : filteredIds.slice(0, VISIBLE_COUNT);
  const hiddenCount = filteredIds.length - visibleIds.length;

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsSync setCategory={setCategory} setShowAll={setShowAll} />
      </Suspense>

      <Navbar />

      <main className="app-home">
        <LatestNews />

        <section className="app-unis" id="cards-wrap" aria-labelledby="app-unis-title">
          <div className="app-sec-head" style={{ padding: "6px 0 8px" }}>
            <h2 className="app-sec-title" id="app-unis-title">
              ভার্সিটি
            </h2>
          </div>

          <div className="app-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="ভার্সিটি খুঁজো — যেমন BUET, DU"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="ভার্সিটি খুঁজো"
            />
          </div>

          <div className="app-cats" role="group" aria-label="ভার্সিটির ক্যাটাগরি">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`app-cat${category === c.id && !query.trim() ? " is-active" : ""}`}
                aria-pressed={category === c.id}
                onClick={() => {
                  setCategory(c.id);
                  setQuery("");
                  setShowAll(c.id !== "all");
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="app-uni-grid">
            {visibleIds.map((id) => (
              <AppUniCard key={id} id={id} uni={universities[id]} />
            ))}
          </div>

          {isFiltering && filteredIds.length === 0 && (
            <p className="app-empty">কোনো ভার্সিটি খুঁজে পাওয়া যায়নি।</p>
          )}

          {!isFiltering && (hiddenCount > 0 || showAll) && (
            <button type="button" className="app-all-btn" onClick={() => setShowAll((s) => !s)}>
              {showAll ? "কম দেখাও" : "সকল ভার্সিটি দেখো"}
            </button>
          )}
        </section>
      </main>
    </>
  );
}
