import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpdatesFilterList from "@/components/UpdatesFilterList";
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

        <UpdatesFilterList updates={updates} />
      </main>
      <Footer />
    </>
  );
}
