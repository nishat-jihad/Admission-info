import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { getAllNews, isNewNews } from "@/data/news";
import "../../styles/news.css";

export const metadata = {
  title: "ভর্তি পরীক্ষার সর্বশেষ নিউজ ২০২৬-২৭ — News Corner",
  description:
    "২০২৬-২৭ সেশনের বিশ্ববিদ্যালয়, ইঞ্জিনিয়ারিং ও মেডিকেল ভর্তি পরীক্ষার সর্বশেষ খবর, আবেদনের যোগ্যতা, তারিখ ও সময়সূচির পরিবর্তন — এক জায়গায়।",
  alternates: { canonical: "/news" },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/news",
    siteName: "Admission Info",
    title: "ভর্তি পরীক্ষার সর্বশেষ নিউজ ২০২৬-২৭ — News Corner",
    description:
      "বিশ্ববিদ্যালয়, ইঞ্জিনিয়ারিং ও মেডিকেল ভর্তি পরীক্ষার সর্বশেষ খবর ও আপডেট।",
    images: [
      {
        url: "/images/admission-info-logo.png",
        width: 512,
        height: 512,
        alt: "Admission Info",
      },
    ],
  },
};

const QUICK_LINKS = [
  { href: "/exam-dates", label: "ভর্তি পরীক্ষার তারিখ" },
  { href: "/updates", label: "Updates(admission)" },
  { href: "/general-check", label: "SSC+HSC যোগ্যতা যাচাই" },
  { href: "/hsc-gpa-calculator", label: "HSC GPA ক্যালকুলেটর" },
];

export default function NewsPortalPage() {
  const items = getAllNews();

  return (
    <>
      <Navbar />
      <main className="news-page news-portal">
        <Link href="/" className="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>হোমে ফিরে যাও</span>
        </Link>

        <nav className="news-crumbs" aria-label="breadcrumb">
          <Link href="/">হোম</Link>
          <span aria-hidden="true">›</span>
          <span>সকল নিউজ</span>
        </nav>

        <header className="news-portal-head">
          <h1 className="news-portal-title">News Corner</h1>
          <p className="news-portal-lead">
            ভর্তি পরীক্ষার সর্বশেষ খবর, আবেদনের যোগ্যতায় বদল আর সময়সূচির নতুন সিদ্ধান্ত—
            সব এক জায়গায়, সহজ ভাষায়।
          </p>
          <div className="news-portal-chips">
            {QUICK_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="news-chip">
                {l.label}
              </Link>
            ))}
          </div>
        </header>

        <div className="news-grid">
          {items.map((item, i) => (
            <NewsCard
              key={item.slug}
              item={item}
              isNew={isNewNews(item.slug)}
              variant="large"
              priority={i < 3}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
