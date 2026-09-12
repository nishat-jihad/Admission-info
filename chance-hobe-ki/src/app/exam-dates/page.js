import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { examDates } from "@/data/examDates";

export const metadata = {
  title: "একত্রে ভর্তি পরীক্ষার তারিখসমূহ — Admission Info",
  description:
    "সব বিশ্ববিদ্যালয়ের আবেদন শুরু-শেষের তারিখ আর ইউনিট অনুযায়ী পরীক্ষার তারিখ একসাথে এক পেজে।",
};

// examDates.js (per-university) থেকে ইউনিট অনুযায়ী গ্রুপ করা হচ্ছে, যাতে
// একই ইউনিটের ভার্সিটিগুলো একটা টেবিলের নিচে একসাথে দেখানো যায় (যেমন
// 'এ' ইউনিট-এ ঢাবি, জবি, চবি — সবাই একই টেবিলে)।
function groupByUnit(data) {
  const groups = [];
  const indexByUnit = {};
  data.forEach((u) => {
    u.schedule.forEach((row) => {
      if (!(row.unit in indexByUnit)) {
        indexByUnit[row.unit] = groups.length;
        groups.push({ unit: row.unit, rows: [] });
      }
      groups[indexByUnit[row.unit]].rows.push({
        universityId: u.universityId,
        universityName: u.universityName,
        shortName: u.shortName,
        examDate: row.date,
        applicationRange: `${u.applicationStart} - ${u.applicationEnd}`,
      });
    });
  });
  return groups;
}

// পেজে তিনটা আলাদা সেকশন — ভার্সিটি, ইঞ্জিনিয়ারিং, মেডিকেল — দেখানোর জন্য।
// examDates.js-এর প্রতিটা এন্ট্রির category ফিল্ড অনুযায়ী ভাগ করা হয়।
const examCategories = [
  { key: "university", label: "ভার্সিটি" },
  { key: "engineering", label: "ইঞ্জিনিয়ারিং" },
  { key: "medical", label: "মেডিকেল" },
];

function ExamUnitTable({ group }) {
  return (
    <div className="exam-unit-table-wrap">
      <table className="exam-unit-table">
        <thead>
          <tr>
            <th colSpan={3} className="exam-unit-header">
              Unit {group.unit}
            </th>
          </tr>
          <tr>
            <th>বিশ্ববিদ্যালয়</th>
            <th>পরীক্ষার তারিখ</th>
            <th>আবেদন (শুরু-শেষ)</th>
          </tr>
        </thead>
        <tbody>
          {group.rows.map((row) => (
            <tr key={row.universityId}>
              <td className="exam-uni-cell">
                <Link href={`/university/${row.universityId}`} className="exam-uni-link">
                  <span className="exam-uni-full">{row.universityName}</span>
                  <span className="exam-uni-short">{row.shortName}</span>
                </Link>
              </td>
              <td>{row.examDate}</td>
              <td>{row.applicationRange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

        <div className="exam-notice">
          এখানে শুধু পরীক্ষার তারিখ দেওয়া আছে। আরও বেশি তথ্যের জন্য নজর রাখুন{" "}
          <Link href="/updates" className="exam-notice-link">
            Updates(admission)
          </Link>{" "}
          পেজে।
        </div>

        {examCategories.map((cat) => {
          const catData = examDates.filter((u) => u.category === cat.key);
          const unitGroups = groupByUnit(catData);

          return (
            <section key={cat.key} className="exam-category-section">
              <h2 className="exam-category-title">{cat.label}</h2>
              {unitGroups.length === 0 ? (
                <p className="exam-category-empty">শীঘ্রই যোগ করা হবে</p>
              ) : (
                <div className="exam-unit-groups">
                  {unitGroups.map((group) => (
                    <ExamUnitTable key={group.unit} group={group} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
