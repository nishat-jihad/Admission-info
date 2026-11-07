import Link from "next/link";
import { getLatestNews } from "@/data/news";
import "../styles/news.css";

// Navbar-এর ঠিক নিচে (PC + mobile, সব পেজে): বামে লাল "ব্রেকিং" বক্স, পাশে সর্বশেষ ৫টা
// নিউজের শিরোনাম বুলেট আকারে ধীরে ধীরে সরতে থাকে। প্রতিটায় ক্লিক করলে ওই নিউজের পেজে
// যায়, আর সর্বশেষ ৫টায় "নতুন" ট্যাগ থাকে। মাউস রাখলে থেমে যায়; reduced-motion
// চালু থাকলে নড়াচড়া বন্ধ হয়ে হাতে স্ক্রল করা যায়।
export default function BreakingNewsBar() {
  const items = getLatestNews(5);
  if (items.length === 0) return null;

  const renderList = (hidden) => (
    <ul className="news-breaking-list" aria-hidden={hidden ? "true" : undefined}>
      {items.map((n) => (
        <li key={n.slug}>
          <Link
            href={`/news/${n.slug}`}
            className="news-breaking-item"
            tabIndex={hidden ? -1 : undefined}
          >
            <span className="news-breaking-text">{n.ticker || n.title}</span>
            <span className="news-new-tag">নতুন</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="news-breaking" role="region" aria-label="ব্রেকিং নিউজ">
      <div className="news-breaking-label">
        <span className="news-breaking-pulse" aria-hidden="true" />
        ব্রেকিং
      </div>
      <div className="news-breaking-viewport">
        <div
          className="news-breaking-track"
          style={{ "--news-marquee-duration": `${Math.max(items.length * 11, 30)}s` }}
        >
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>
    </div>
  );
}
