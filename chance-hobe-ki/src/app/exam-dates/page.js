import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

        <div className="updates-list exam-dates-list">
          {examDates.map((u) => (
            <article key={u.id} className="update-card">
              <h2 className="update-title">
                <Link href={`/university/${u.universityId}`} className="about-link">
                  {u.universityName}
                </Link>
              </h2>
              <p className="update-app-dates exam-dates-app-dates">
                <strong>আবেদন শুরু:</strong> {u.applicationStart}
                {"  "}
                <strong>আবেদন শেষ:</strong> {u.applicationEnd}
              </p>
              <div className="update-table-wrap">
                <table className="update-table">
                  <thead>
                    <tr>
                      <th>ইউনিট</th>
                      <th>পরীক্ষার তারিখ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {u.schedule.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "row-white" : "row-grey"}>
                        <td>{row.unit}</td>
                        <td>{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
