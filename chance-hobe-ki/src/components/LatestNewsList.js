import Link from "next/link";
import { getLatestNews, formatBnDate, toBn } from "@/data/news";
import "../styles/news.css";

// "Latest News" তালিকা — নিউজ পেজের ডানের "আরও নিউজ"-এর মতো দেখতে।
// PC: Updates / Exam Dates পেজের ডানে (স্ক্রলবার ছাড়া, যতগুলো একসাথে ধরে — ৫টা)
// Mobile: প্রথম বক্সের পরে (২টা নিউজ)।
export default function LatestNewsList({ count = 5 }) {
  const items = getLatestNews(count);
  if (items.length === 0) return null;

  return (
    <div className="news-aside-box">
      <div className="latest-list-head">
        <h2 className="news-aside-title">Latest News</h2>
        <Link href="/news" className="hero-latest-all">
          সকল নিউজ
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <ol className="news-more-list">
        {items.map((n, i) => (
          <li key={n.slug}>
            <span className="news-more-num" aria-hidden="true">
              {toBn(i + 1)}
            </span>
            <div className="news-more-body">
              <Link href={`/news/${n.slug}`}>
                <span className="news-more-title">{n.title}</span>
              </Link>
              <span className="news-more-meta">
                <time dateTime={n.date}>{formatBnDate(n.date)}</time>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
