import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { updates } from "@/data/updates";

export const metadata = {
  title: "আপডেট — Admission Info",
  description: "সর্বশেষ ভর্তি পরীক্ষার সময়সূচি ও admission-related আপডেট।",
};

export default function UpdatesPage() {
  return (
    <>
      <Navbar />
      <main className="page updates-page">
        <h1 className="about-title">Update (Admission 26)</h1>
        <p className="about-lead">
          এখানে বিভিন্ন বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার সময়সূচি ও গুরুত্বপূর্ণ তথ্য
          পাওয়ার সাথে সাথেই আপডেট করা হয়।
        </p>

        <div className="updates-list">
          {updates.map((u) => (
            <article key={u.id} className="update-card">
              <h2 className="update-title">{u.title}</h2>
              <p className="update-date">{u.date}</p>
              <p className="update-uni">
                <Link href={`/university/${u.universityId}`} className="about-link">
                  {u.universityName}
                </Link>
              </p>
              <p className="update-app-dates">
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
