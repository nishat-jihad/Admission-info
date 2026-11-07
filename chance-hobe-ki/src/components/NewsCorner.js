import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { getLatestNews } from "@/data/news";
import "../styles/news.css";

// হোমপেজের "সকল ভার্সিটি দেখো"-এর নিচের News Corner: সর্বশেষ ৫টা নিউজ।
// PC: ওপরে ৩টা, নিচে ২টা বড় card (পাশাপাশি) · Tablet: ২ কলাম · Mobile: একটার নিচে একটা।
export default function NewsCorner() {
  const items = getLatestNews(5);
  if (items.length === 0) return null;

  return (
    <section className="news-corner" id="news-corner" aria-labelledby="news-corner-title">
      <div className="news-section-head">
        <h2 className="news-section-title" id="news-corner-title">
          News Corner
        </h2>
        <Link href="/news" className="news-all-link">
          সকল নিউজ
        </Link>
      </div>

      <div className="news-home-grid">
        {items.map((item) => (
          <NewsCard key={item.slug} item={item} isNew variant="home" />
        ))}
      </div>

      <div className="see-more-wrap">
        <Link href="/news" className="view-posts-btn news-all-btn">
          <span className="btn-text">সকল নিউজ দেখো</span>
          <span className="btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
