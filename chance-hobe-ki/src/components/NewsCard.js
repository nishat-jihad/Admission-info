import Link from "next/link";
import NewsImage from "@/components/NewsImage";
import { formatBnDate } from "@/data/news";

const CLOCK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// হোমের News Corner-এর সিম্পল নিউজ: ওপরে ছবি, নিচে শিরোনাম (ক্লিক করলে বিস্তারিত নিউজে যায়) ও তারিখ।
export default function NewsCard({ item, variant = "home", priority = false }) {
  const href = `/news/${item.slug}`;

  return (
    <article className={`news-card news-card-${variant}`}>
      <Link href={href} className="news-card-media" aria-label={item.title} tabIndex={-1}>
        <NewsImage
          src={item.image}
          alt={item.imageAlt || item.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 400px"
          priority={priority}
        />
      </Link>

      <div className="news-card-body">
        <h3 className="news-card-title">
          <Link href={href}>{item.title}</Link>
        </h3>
        <span className="news-date">
          {CLOCK_ICON}
          <time dateTime={item.date}>{formatBnDate(item.date)}</time>
        </span>
      </div>
    </article>
  );
}
