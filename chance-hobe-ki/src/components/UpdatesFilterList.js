"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { universities } from "@/data/universities";

const CATEGORIES = [
  { key: "versity", label: "ভার্সিটি" },
  { key: "medical", label: "মেডিকেল" },
  { key: "engineering", label: "ইঞ্জিনিয়ারিং" },
];

// Hand-curated extra search terms per universityId, keyed the same way as
// updates.js/universities.js. These cover the English full names / common
// Banglish spellings that don't otherwise appear anywhere in the Bangla
// data (e.g. "du"'s own fullName is Bangla-only, so "Dhaka University"
// wouldn't match without this). Keep this in sync whenever a new
// university is added to updates.js.
const EXTRA_ALIASES = {
  du: "dhaka university dhaka bishwabiddyalay dhaka bissho bidyaloy",
  ru: "rajshahi university rajshahi bishwabiddyalay",
  jnu: "jagannath university jagannath bishwabiddyalay",
  cu: "chittagong university chattogram university chattogram bishwabiddyalay",
  bup: "bangladesh university of professionals",
  krishi:
    "krishi guccho krishi gutcho agriculture cluster agricultural university sher e bangla agricultural university shekrishi",
  mist: "military institute of science and technology",
  kuet: "khulna university of engineering and technology",
  ruet: "rajshahi university of engineering and technology",
  sust: "shahjalal university of science and technology",
  hstu_a: "hajee mohammad danesh science and technology university hstu",
  buet: "bangladesh university of engineering and technology",
  butex: "bangladesh textile university bangladesh university of textiles",
  medical: "medical mbbs government medical college dental college dhaka medical",
};

// Generic words added to every update so a search like "exam date",
// "abedon suru" (Banglish) or "আবেদন শেষ" (Bangla) works regardless of
// which university it's paired with. These never narrow results on their
// own beyond what's already shown in a card — every update already
// contains its own exam date / circular / application dates — they only
// exist so those words don't fail to match when combined with a
// university name.
const GENERIC_KEYWORDS =
  "exam date porikkha pariksha tarikh schedule somoysuchi সময়সূচি সময় সূচি circular sarkular সার্কুলার বিজ্ঞপ্তি notice application start end abedon adebon suru sesh আবেদন শুরু শেষ admission bhorti ভর্তি update আপডেট result folafol ফলাফল";

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[()'"।,.\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordsOf(str) {
  const n = normalize(str);
  return n ? n.split(" ") : [];
}

// Builds one big normalized "haystack" of words per update: its own
// fields (title/dates/schedule), the matching university's short + full
// name from universities.js, the hand-curated aliases above, and the
// generic keyword list.
function buildSearchWords(update) {
  const uni = universities?.[update.universityId];
  const parts = [
    update.universityId,
    update.universityName,
    uni?.name,
    uni?.fullName,
    EXTRA_ALIASES[update.universityId] || "",
    update.title,
    update.date,
    update.applicationStart,
    update.applicationEnd,
    ...(update.schedule || []).flatMap((row) => [row.unit, row.date]),
    GENERIC_KEYWORDS,
  ];
  return wordsOf(parts.filter(Boolean).join(" "));
}

// A query word matches a haystack word if they're equal, or (for longer
// words) one is a prefix of the other, so partial typing like "dhak"
// still works. 2-letter codes (du/ru/cu/...) require an EXACT word match
// — otherwise "RU" would also match "RUET"'s own id, and a stray 1-letter
// word from a schedule row (e.g. "B" from "A ও B ইউনিট") would let short
// queries match everything.
function matchesQuery(haystackWords, query) {
  const qWords = wordsOf(query);
  if (qWords.length === 0) return true;
  return qWords.every((qw) => {
    if (qw.length <= 2) {
      return haystackWords.includes(qw);
    }
    return haystackWords.some(
      (hw) => hw === qw || hw.startsWith(qw) || (hw.length >= 3 && qw.startsWith(hw))
    );
  });
}

export default function UpdatesFilterList({ updates }) {
  const [activeCategory, setActiveCategory] = useState("versity");
  const [query, setQuery] = useState("");

  const searchIndex = useMemo(
    () => updates.map((u) => ({ update: u, words: buildSearchWords(u) })),
    [updates]
  );

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0;

  const filtered = useMemo(() => {
    if (isSearching) {
      return searchIndex
        .filter(({ words }) => matchesQuery(words, trimmedQuery))
        .map(({ update }) => update);
    }
    return updates.filter((u) => u.category === activeCategory);
  }, [searchIndex, updates, isSearching, trimmedQuery, activeCategory]);

  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form
        className="updates-search-wrap"
        onSubmit={handleSearchSubmit}
        style={{ maxWidth: 480, margin: "0 auto 22px" }}
      >
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
            placeholder="ভার্সিটির নাম লিখে খুঁজো — যেমন Dhaka University, DU, RU exam date..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="ভার্সিটি অনুযায়ী আপডেট খুঁজুন"
          />
          <button
            type="submit"
            className="search-icon-btn"
            style={{ background: "#F5C518", color: "#1a1a1a" }}
          >
            খুঁজো
          </button>
        </div>
      </form>

      {!isSearching && (
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
      )}

      <div className="updates-list">
        {filtered.length === 0 && (
          <p className="updates-empty">
            {isSearching
              ? "কোনো আপডেট খুঁজে পাওয়া যায়নি।"
              : "এই মুহূর্তে এই বিভাগে কোনো আপডেট নেই।"}
          </p>
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
