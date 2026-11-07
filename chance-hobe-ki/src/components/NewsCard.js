import Link from "next/link";
import NewsImage from "@/components/NewsImage";
import { formatBnDate } from "@/data/news";

const CLOCK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// variant: "home" (হোমের News Corner) | "large" (সকল নিউজ পেজ — একটু বড়)
export default function NewsCard({ item, isNew = false, variant = "home", priority = false }) {
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
        {isNew && <span className="news-new-badge">নতুন</span>}
      </Link>

      <div className="news-card-body">
        <div className="news-card-meta">
          <span className="news-cat">{item.category}</span>
          <span className="news-date">
            {CLOCK_ICON}
            <time dateTime={item.date}>{formatBnDate(item.date)}</time>
          </span>
        </div>

        <h3 className="news-card-title">
          <Link href={href}>{item.title}</Link>
        </h3>

        <p className="news-card-excerpt">{item.excerpt}</p>

        <Link href={href} className="news-card-btn">
          <span>সম্পূর্ণ</span>
          {ARROW_ICON}
        </Link>
      </div>
    </article>
  );
}
