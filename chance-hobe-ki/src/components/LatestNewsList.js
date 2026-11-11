import Link from "next/link";
import { getLatestNews, formatBnDate, toBn } from "@/data/news";
import "../styles/news.css";

// "Latest News" তালিকা — নিউজ পেজের ডানের "আরও নিউজ"-এর মতো দেখতে।
// PC: Updates / Exam Dates পেজের ডানে (সব নিউজ) · Mobile: প্রথম বক্সের পরে (২টা নিউজ)।
export default function LatestNewsList({ count = 9 }) {
  const items = getLatestNews(count);
  if (items.length === 0) return null;

  return (
    <div className="news-aside-box">
      <h2 className="news-aside-title">Latest News</h2>
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
      <Link href="/news" className="news-aside-all">
        সকল নিউজ দেখো →
      </Link>
    </div>
  );
}
