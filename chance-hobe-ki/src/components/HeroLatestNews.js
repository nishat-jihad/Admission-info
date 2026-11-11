import Link from "next/link";
import NewsImage from "@/components/NewsImage";
import { getLatestNews } from "@/data/news";
import "../styles/news.css";

// হিরোর বাটনের নিচে ছোট "Latest News": একদম সর্বশেষ ৪টা নিউজ।
// PC: ২ সারি × ২ কলাম · Mobile: একটার নিচে একটা, শুধু প্রথম ২টা (CSS দিয়ে বাকিগুলো লুকানো)।
// প্রতিটায় বাঁয়ে ছবি (১/৩ অংশ), ডানে শিরোনাম (২/৩ অংশ) — ক্লিক করলে ওই নিউজে যায়।
export default function HeroLatestNews() {
  const items = getLatestNews(4);
  if (items.length === 0) return null;

  return (
    <section className="hero-latest" aria-labelledby="hero-latest-title">
      <div className="hero-latest-head">
        <h2 className="hero-latest-label" id="hero-latest-title">
          Latest News
        </h2>
        <Link href="/news" className="hero-latest-all">
          সকল নিউজ
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <hr className="hero-latest-rule" />
      <div className="hero-latest-grid">
        {items.map((item) => (
          <Link key={item.slug} href={`/news/${item.slug}`} className="hero-latest-item">
            <span className="hero-latest-thumb">
              <NewsImage
                src={item.image}
                alt={item.imageAlt || item.title}
                sizes="(max-width: 900px) 34vw, 200px"
              />
            </span>
            <span className="hero-latest-title">{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
