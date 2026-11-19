"use client";

import { useState } from "react";
import Link from "next/link";
import NewsImage from "@/components/NewsImage";
import { CATEGORIES, ALL_CATEGORY } from "@/data/newsCategories";

const CLOCK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function DateLine({ item }) {
  return (
    <span className="news-date">
      {CLOCK_ICON}
      <time dateTime={item.date}>{item.dateText}</time>
    </span>
  );
}

// ছবি ওপরে, নিচে শিরোনাম + তারিখ (২ কলামের গ্রিডে)
function Tile({ item }) {
  const href = `/news/${item.slug}`;
  return (
    <article className="np-tile">
      <Link href={href} className="np-tile-media" aria-label={item.title} tabIndex={-1}>
        <NewsImage
          src={item.image}
          alt={item.imageAlt || item.title}
          sizes="(max-width: 899px) 50vw, 300px"
        />
      </Link>
      <h3 className="np-tile-title">
        <Link href={href}>{item.title}</Link>
      </h3>
      <DateLine item={item} />
    </article>
  );
}

// PC: ওপরের বড় নিউজ (ছবি + শিরোনাম + সংক্ষেপ + তারিখ)
function Feature({ item, priority }) {
  const href = `/news/${item.slug}`;
  return (
    <article className="np-feature">
      <Link href={href} className="np-feature-media" aria-label={item.title} tabIndex={-1}>
        <NewsImage
          src={item.image}
          alt={item.imageAlt || item.title}
          sizes="(max-width: 1200px) 50vw, 570px"
          priority={priority}
        />
      </Link>
      <h2 className="np-feature-title">
        <Link href={href}>{item.title}</Link>
      </h2>
      <p className="np-feature-excerpt">{item.excerpt}</p>
      <DateLine item={item} />
    </article>
  );
}

// PC নিচের বাঁ দিকের তালিকা (হোমের Latest News-এর মতো: বাঁয়ে ছবি, ডানে শিরোনাম)
function ListItem({ item }) {
  return (
    <Link href={`/news/${item.slug}`} className="np-list-item">
      <span className="np-list-thumb">
        <NewsImage
          src={item.image}
          alt={item.imageAlt || item.title}
          sizes="(max-width: 1200px) 16vw, 200px"
        />
      </span>
      <span className="np-list-text">
        <span className="np-list-title">{item.title}</span>
        <DateLine item={item} />
      </span>
    </Link>
  );
}

// PC: ক্যাটাগরিতে মাত্র ১টা নিউজ থাকলে — বাঁয়ে স্ট্যান্ডার্ড সাইজের ছবি, ডানে শিরোনাম
function Single({ item }) {
  const href = `/news/${item.slug}`;
  return (
    <article className="np-single">
      <Link href={href} className="np-single-media" aria-label={item.title} tabIndex={-1}>
        <NewsImage
          src={item.image}
          alt={item.imageAlt || item.title}
          sizes="380px"
          priority
        />
      </Link>
      <div className="np-single-text">
        <h2 className="np-single-title">
          <Link href={href}>{item.title}</Link>
        </h2>
        <DateLine item={item} />
      </div>
    </article>
  );
}

// PC-র নিচের অংশে বাঁ (তালিকা) ও ডান (২ কলামের গ্রিড) দুই দিকের উচ্চতা সমান রাখতে
// কয়টা নিউজ কোন দিকে যাবে তা হিসাব করা। বাঁ দিক স্বাভাবিকভাবে ডানের চেয়ে ছোট হয়,
// CSS তাকে টেনে ডানের সমান করে দেয়।
const TILE_ROW_H = 301; // গ্রিডের এক সারি (ছবি + শিরোনাম + তারিখ + ফাঁক)
const GRID_GAP = 26;
const LIST_ITEM_H = 129; // তালিকার একটা আইটেম
function splitBottom(rest) {
  const R = rest.length;
  for (let k = 1; k * 2 <= R; k++) {
    const n = R - 2 * k;
    if (n < 3) break;
    if (n * LIST_ITEM_H <= k * TILE_ROW_H - GRID_GAP) {
      return { grid: rest.slice(0, 2 * k), older: rest.slice(2 * k) };
    }
  }
  // নিউজ কম হলে সব গ্রিডে (৩ কলামে), বাঁয়ে তালিকা থাকবে না
  return { grid: rest, older: [] };
}

// মোবাইলের বড় (প্রথম) নিউজ
function Lead({ item }) {
  const href = `/news/${item.slug}`;
  return (
    <article className="np-lead">
      <Link href={href} className="np-lead-media" aria-label={item.title} tabIndex={-1}>
        <NewsImage
          src={item.image}
          alt={item.imageAlt || item.title}
          sizes="100vw"
          priority
        />
      </Link>
      <h2 className="np-lead-title">
        <Link href={href}>{item.title}</Link>
      </h2>
      <p className="np-lead-excerpt">{item.excerpt}</p>
      <DateLine item={item} />
    </article>
  );
}

// মোবাইলের তালিকা: বাঁয়ে শিরোনাম + তারিখ, ডানে ছবি
function MobileRow({ item }) {
  return (
    <Link href={`/news/${item.slug}`} className="np-m-item">
      <span className="np-m-text">
        <span className="np-m-title">{item.title}</span>
        <DateLine item={item} />
      </span>
      <span className="np-m-thumb">
        <NewsImage
          src={item.image}
          alt={item.imageAlt || item.title}
          sizes="40vw"
        />
      </span>
    </Link>
  );
}

export default function NewsPortal({ items }) {
  const [cat, setCat] = useState(ALL_CATEGORY);

  const list = cat === ALL_CATEGORY ? items : items.filter((i) => i.cats.includes(cat));

  // PC: ওপরে ২টা বড় (১টা হলে ছবি বামে-শিরোনাম ডানে) · নিচে বামে পুরোনো তালিকা, ডানে ২ কলামের গ্রিড
  const top = list.slice(0, 2);
  const rest = list.slice(2);
  const { grid, older } = splitBottom(rest);

  // Mobile: ১টা বড় · ৩টা সারি (ডানে ছবি) · বাকিগুলো ২ কলামে
  const lead = list[0];
  const mRows = list.slice(1, 4);
  const mGrid = list.slice(4);

  return (
    <>
      <div className="np-catbar" role="group" aria-label="নিউজ ক্যাটাগরি">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`np-cat${c === cat ? " is-active" : ""}`}
            aria-pressed={c === cat}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="np-empty">এই ক্যাটাগরিতে এখন কোনো নিউজ নেই। শিগগিরই যুক্ত হবে।</p>
      ) : (
        <>
          {/* ---------- PC / বড় স্ক্রিন ---------- */}
          <div className="np-desktop">
            {top.length === 1 ? (
              <Single item={top[0]} />
            ) : (
              <div className="np-top">
                {top.map((item, i) => (
                  <Feature key={item.slug} item={item} priority={i < 2} />
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className={`np-bottom${older.length === 0 ? " np-bottom-solo" : ""}`}>
                {older.length > 0 && (
                  <div className="np-list">
                    {older.map((item) => (
                      <ListItem key={item.slug} item={item} />
                    ))}
                  </div>
                )}
                <div className={`np-grid${older.length === 0 ? " np-grid-wide" : ""}`}>
                  {grid.map((item) => (
                    <Tile key={item.slug} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ---------- মোবাইল ---------- */}
          <div className="np-mobile">
            <Lead item={lead} />
            {mRows.length > 0 && (
              <div className="np-m-list">
                {mRows.map((item) => (
                  <MobileRow key={item.slug} item={item} />
                ))}
              </div>
            )}
            {mGrid.length > 0 && (
              <div className="np-m-grid">
                {mGrid.map((item) => (
                  <Tile key={item.slug} item={item} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
