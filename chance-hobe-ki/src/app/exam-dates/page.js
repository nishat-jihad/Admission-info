import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExamDatesFilterList from "@/components/ExamDatesFilterList";
import { examDates } from "@/data/examDates";

export const metadata = {
  title: "একত্রে ভর্তি পরীক্ষার তারিখসমূহ — Admission Info",
  description:
    "সব বিশ্ববিদ্যালয়ের আবেদন শুরু-শেষের তারিখ আর ইউনিট অনুযায়ী পরীক্ষার তারিখ একসাথে এক পেজে।",
};

export default function ExamDatesPage() {
  return (
    <>
      <Navbar />
      <main className="page exam-dates-page">
        <h1 className="about-title">একত্রে ভর্তি পরীক্ষার তারিখসমূহ</h1>
        <p className="about-lead">
          সব বিশ্ববিদ্যালয়ের আবেদন শুরু-শেষের তারিখ আর ইউনিট অনুযায়ী পরীক্ষার তারিখ
          এক জায়গায় গুছিয়ে দেওয়া হলো। বিশ্ববিদ্যালয়ের নামে ক্লিক করলে সেই
          বিশ্ববিদ্যালয়ের বিস্তারিত তথ্য পাবে।
        </p>

        <p className="exam-notice">
          এখানে শুধু পরীক্ষার তারিখ দেওয়া আছে। আরও বেশি তথ্যের জন্য নজর রাখুন{" "}
          <Link href="/updates" className="exam-notice-link">
            Updates(admission)
          </Link>{" "}
          পেজে।
        </p>

        <ExamDatesFilterList examDates={examDates} />
      </main>
      <Footer />
    </>
  );
}
