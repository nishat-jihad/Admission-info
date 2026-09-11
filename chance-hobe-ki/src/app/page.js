"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { universities } from "@/data/universities";
import { engineeringUniIds, medicalUniIds } from "@/data/generalCriteria";
import UniversityCard from "@/components/UniversityCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VISIBLE_COUNT = 6;

// হোমপেজে "সকল ভার্সিটি দেখো"-এর আগে এই ৬টাই সবার প্রথমে দেখানো হয় — বাকিগুলো
// এর পরে আগের মতোই universities.js-এর original অর্ডারে থাকে। মোবাইলে এখান
// থেকে ৫টা দেখানো হয় (৬ নম্বরটা CSS দিয়ে লুকানো, globals.css দেখো), ডেস্কটপে
// ৬টাই ৩+৩ করে দুই সারিতে দেখা যায়।
const FEATURED_IDS = ["medical", "du", "buet", "gst", "cu", "sust"];
const ALL_IDS = (() => {
  const featured = FEATURED_IDS.filter((id) => universities[id]);
  const rest = Object.keys(universities).filter((id) => !featured.includes(id));
  return [...featured, ...rest];
})();

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  // Re-runs every time the ?category= / ?q= params change, even when
  // navigating client-side between "/" and "/?category=...#cards-wrap"
  // (a plain window.location.search read only fires once on mount).
  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("q");
    setCategory(cat || "all");
    setQuery(q || "");
    if (cat || q) {
      setShowAll(true);
    }
    if (window.location.hash === "#cards-wrap") {
      document.getElementById("cards-wrap")?.scrollIntoView({ block: "start" });
    }
  }, [searchParams]);

  const allIds = ALL_IDS;

  const filteredIds = useMemo(() => {
    let ids = allIds;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      ids = ids.filter((id) => {
        const uni = universities[id];
        const nameMatch = uni.name.toLowerCase().includes(q);
        const fullNameMatch = uni.fullName ? uni.fullName.toLowerCase().includes(q) : false;
        return nameMatch || fullNameMatch;
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
  }, [query, category, allIds]);

  const isFiltering = query.trim().length > 0 || category !== "all";
  const visibleIds = isFiltering || showAll ? filteredIds : filteredIds.slice(0, VISIBLE_COUNT);
  const hiddenCount = filteredIds.length - visibleIds.length;

  function handleSearchSubmit(e) {
    e.preventDefault();
    setShowAll(true);
    document.getElementById("cards-wrap")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              তুমি কোথায় কোথায় <span className="accent">পরীক্ষা দিতে পারবে</span>
            </h1>
            <div className="sub">— দেখে নাও</div>
            <p className="hero-desc">
              তোমার SSC আর HSC-র রেজাল্ট বসিয়ে দাও, আমরা দেখিয়ে দেব BUET, BUTex, মেডিকেল
              আর Dhaka University-সহ কোন কোন জায়গায় তুমি আবেদন করতে পারবে।
            </p>

            <form className="hero-search" onSubmit={handleSearchSubmit}>
              <div className="search-box">
                <svg
                  className="search-box-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="ভার্সিটিগুলোর সংক্ষিপ্ত নাম লিখে খুঁজো — যেমন BUET, DU..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-icon-btn">
                  খুঁজো
                </button>
              </div>
            </form>

            <div className="hero-cta">
              <button
                type="button"
                className="primary"
                onClick={() =>
                  document.getElementById("cards-wrap")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                এখনই চেক করো
              </button>
              <Link href="/general-check" className="fill-btn" style={{ textDecoration: "none" }}>
                SSC+HSC দিয়ে ভার্সিটির যোগ্যতা চেক করো
              </Link>
              <Link href="/exam-dates" className="tia-btn" style={{ textDecoration: "none" }}>
                একত্রে ভর্তি পরীক্ষার তারিখসমূহ
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="vc-1"
              src="/images/hero-1.jpg"
              alt="BUET ক্যাম্পাস"
              loading="lazy"
            />
            <img
              className="vc-2"
              src="/images/hero-2.jpg"
              alt="ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস"
              loading="lazy"
            />
            <img
              className="vc-3"
              src="/images/hero-3.jpg"
              alt="ঢাকা মেডিকেল কলেজ"
              loading="lazy"
            />
            <img
              className="vc-4"
              src="/images/hero-4.jpg"
              alt="CUET ক্যাম্পাস"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="cards-wrap" id="cards-wrap">
        <div
          className={`cards-grid${
            !isFiltering && !showAll ? " cards-grid-preview" : ""
          }`}
        >
          {visibleIds.map((id) => (
            <UniversityCard key={id} id={id} uni={universities[id]} />
          ))}
        </div>

        {!isFiltering && hiddenCount > 0 && (
          <div className="see-more-wrap">
            <button
              className={`view-posts-btn${showAll ? " expanded" : ""}`}
              onClick={() => setShowAll((s) => !s)}
            >
              <span className="btn-text">
                {showAll ? "কম দেখাও" : "সকল ভার্সিটি দেখো"}
              </span>
              <span className="btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {isFiltering && filteredIds.length === 0 && (
          <p style={{ textAlign: "center", color: "#777", marginTop: 24 }}>
            কোনো ভার্সিটি খুঁজে পাওয়া যায়নি।
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
