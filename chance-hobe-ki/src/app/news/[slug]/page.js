import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsImage from "@/components/NewsImage";
import NewsRichText from "@/components/NewsRichText";
import ShareButtons from "@/components/ShareButtons";
import { news, getNewsMeta, getMoreNews, formatBnDate, toBn } from "@/data/news";
import { newsContent } from "@/data/newsContent";
import "../../../styles/news.css";

const SITE_URL = "https://admissioninfo.vercel.app";
const LOGO_URL = `${SITE_URL}/images/admission-info-logo.png`;

// তালিকার বাইরের slug হলে সরাসরি 404 (build-এ তৈরি হওয়া নিউজ ছাড়া কিছু খোলে না)।
export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

// ছবি এখনো public/news-এ না থাকলে share-preview-তে লোগো দেখাবে (ভাঙা ছবি না)।
function imageExists(src) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

function shareImage(item) {
  return imageExists(item.image)
    ? { url: `${SITE_URL}${item.image}`, hasPhoto: true }
    : { url: LOGO_URL, hasPhoto: false };
}

export function generateMetadata({ params }) {
  const item = getNewsMeta(params.slug);
  if (!item) return {};

  const url = `/news/${item.slug}`;
  const img = shareImage(item);

  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.summary,
    keywords: [item.title, "ভর্তি পরীক্ষা ২০২৬-২৭", "admission news", "ভর্তি নিউজ"],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "bn_BD",
      url,
      siteName: "Admission Info",
      title: item.title,
      description: item.summary,
      publishedTime: `${item.date}T00:00:00+06:00`,
      images: [{ url: img.url, alt: item.imageAlt || item.title }],
    },
    twitter: {
      card: img.hasPhoto ? "summary_large_image" : "summary",
      title: item.title,
      description: item.summary,
      images: [img.url],
    },
  };
}

// লেখার প্রথম অক্ষর (grapheme) আলাদা করে — drop-cap বানানোর জন্য।
function splitFirstGrapheme(text) {
  try {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const seg = new Intl.Segmenter("bn", { granularity: "grapheme" });
      const first = seg.segment(text)[Symbol.iterator]().next().value;
      if (first) return [first.segment, text.slice(first.segment.length)];
    }
  } catch {
    // fall through
  }
  return ["", text];
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return (
        <p>
          <NewsRichText text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((t, i) => (
            <li key={i}>
              <NewsRichText text={t} />
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="news-callout">
          <div className="news-callout-text-wrap">
            <strong className="news-callout-title">{block.title}</strong>
            <p className="news-callout-text">{block.text}</p>
          </div>
          <Link href={block.href} className="news-callout-btn">
            {block.label}
          </Link>
        </aside>
      );
    default:
      return null;
  }
}

// মোবাইলে লেখার মাঝে "আরও পড়ুন" (PC-তে ডানের সাইডবার থাকায় CSS দিয়ে লুকানো)।
function InlineRelated({ items }) {
  if (!items.length) return null;
  return (
    <div className="news-inline-related">
      <span className="news-inline-related-label">আরও পড়ুন</span>
      <ul>
        {items.map((n) => (
          <li key={n.slug}>
            <Link href={`/news/${n.slug}`}>{n.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NewsArticlePage({ params }) {
  const item = getNewsMeta(params.slug);
  const content = newsContent[params.slug];
  if (!item || !content) notFound();

  const url = `${SITE_URL}/news/${item.slug}`;
  const img = shareImage(item);
  const more = getMoreNews(item.slug, 5);

  const related = (content.related || [])
    .map((slug) => getNewsMeta(slug))
    .filter(Boolean)
    .slice(0, 2);
  const inlineRelated = related.length ? related : more.slice(0, 2);
  const insertAfter = content.body.length > 3 ? 1 : 0;

  const [cap, rest] = splitFirstGrapheme(content.lead);
  const references = content.references || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary,
    inLanguage: "bn",
    datePublished: `${item.date}T00:00:00+06:00`,
    dateModified: `${item.date}T00:00:00+06:00`,
    image: [img.url],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Admission Info", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Admission Info",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  };

  return (
    <>
      <Navbar />
      <main className="news-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />

        <nav className="news-crumbs" aria-label="breadcrumb">
          <Link href="/">হোম</Link>
          <span aria-hidden="true">›</span>
          <Link href="/news">সকল নিউজ</Link>
        </nav>

        <div className="news-layout">
          <article className="news-article">
            <h1 className="news-title">{item.title}</h1>
            <p className="news-standfirst">{item.summary}</p>

            <div className="news-byline">
              <span className="news-byline-by">Admission Info ডেস্ক</span>
              <span className="news-date">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <time dateTime={item.date}>{formatBnDate(item.date)}</time>
              </span>
            </div>

            <figure className="news-hero">
              <div className="news-hero-frame">
                <NewsImage
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  sizes="(max-width: 1023px) 100vw, 820px"
                  priority
                />
              </div>
              <figcaption>
                <span className="news-caption-text">{content.imageCaption}</span>
                {content.imageCredit && (
                  <span className="news-credit">{content.imageCredit}</span>
                )}
              </figcaption>
            </figure>

            <p className="news-lead">
              {cap && <span className="news-dropcap">{cap}</span>}
              {rest}
            </p>

            <div className="news-body">
              {content.body.map((block, i) => (
                <div key={i} className="news-block">
                  <Block block={block} />
                  {i === insertAfter && <InlineRelated items={inlineRelated} />}
                </div>
              ))}
            </div>

            <ShareButtons url={url} title={item.title} />

            <section className="news-refs" aria-labelledby="news-refs-title">
              <h2 id="news-refs-title">তথ্যসূত্র</h2>
              {references.length > 0 ? (
                <ol className="news-refs-list">
                  {references.map((r, i) => (
                    <li key={i} id={`ref-${i + 1}`}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        {r.text}
                      </a>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="news-refs-note">
                  এই সংবাদের রেফারেন্স এখনো সংগ্রহ করা সম্ভব হয়নি। নির্ভরযোগ্য সূত্র পাওয়া গেলে
                  এখানে যুক্ত করা হবে।
                </p>
              )}
            </section>
          </article>

          {/* PC: ডানের সাইডবার · Mobile: লেখা ও তথ্যসূত্রের নিচে, footer-এর আগে (একই এলিমেন্ট) */}
          <aside className="news-aside" aria-labelledby="news-more-title">
            <div className="news-aside-box">
              <h2 className="news-aside-title" id="news-more-title">
                আরও নিউজ
              </h2>
              <ol className="news-more-list">
                {more.map((n, i) => (
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
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
