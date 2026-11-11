import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExamDatesFilterList from "@/components/ExamDatesFilterList";
import LatestNewsList from "@/components/LatestNewsList";
import { examDates } from "@/data/examDates";

export const metadata = {
  title: "ভর্তি পরীক্ষার তারিখ ২০২৬-২৭ — সব ভার্সিটি একসাথে",
  description:
    "২০২৬-২৭ সেশনের সব বিশ্ববিদ্যালয়, ইঞ্জিনিয়ারিং ও মেডিকেলের আবেদন শুরু-শেষের তারিখ আর ইউনিট অনুযায়ী ভর্তি পরীক্ষার তারিখ একসাথে এক পেজে।",
  alternates: { canonical: "/exam-dates" },
};

export default function ExamDatesPage() {
  return (
    <>
      <Navbar />
      <main className="page exam-dates-page page-with-news">
        <div className="news-layout">
          <div className="page-main">
            <Link href="/" className="back-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>হোমে ফিরে যাও</span>
            </Link>

            <h1 className="about-title">একত্রে ভর্তি পরীক্ষার তারিখসমূহ</h1>
            <p className="about-lead">
              সব বিশ্ববিদ্যালয়ের আবেদন শুরু-শেষের তারিখ আর ইউনিট অনুযায়ী পরীক্ষার তারিখ
              এক জায়গায় গুছিয়ে দেওয়া হলো। বিশ্ববিদ্যালয়ের নামে ক্লিক করলে সেই
              বিশ্ববিদ্যালয়ের বিস্তারিত তথ্য পাবে।
            </p>

            <p className="exam-notice">
              এখানে শুধু পরীক্ষার তারিখ দেওয়া আছে। আরও বেশি তথ্যের জন্য নজর রাখো{" "}
              <Link href="/updates" className="exam-notice-link">
                Updates(admission)
              </Link>{" "}
              পেজে।
            </p>

            <ExamDatesFilterList
              examDates={examDates}
              inlineNews={
                <section className="news-inline-box">
                  <LatestNewsList count={2} />
                </section>
              }
            />
          </div>

          <aside className="news-aside page-news-aside" aria-label="Latest News">
            <LatestNewsList />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
