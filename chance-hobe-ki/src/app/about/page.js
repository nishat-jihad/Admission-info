import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Admission Info",
  description:
    "Admission Info ওয়েবসাইট কী, কীভাবে কাজ করে?",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="page about-page">
        <h1 className="about-title">About this website :</h1>

        <p className="about-lead">
          Admission Info একটা GPA-ভিত্তিক টুল, যেটা বাংলাদেশের HSC শিক্ষার্থীদের সাহায্য
          করে বুঝতে — তাদের SSC ও HSC রেজাল্ট দিয়ে কোন কোন বিশ্ববিদ্যালয়, ইঞ্জিনিয়ারিং ও
          মেডিকেল কলেজে তারা আবেদন করার যোগ্যতা রাখে। এখানে পাবে একটা{" "}
          <Link href="/hsc-gpa-calculator" className="about-link">
            HSC GPA calculator
          </Link>
          , প্রতিটা ভার্সিটির নিজস্ব ভর্তি-যোগ্যতা বিস্তারিতভাবে, আর একটা কুইক
          চেকার — যেখানে শুধু SSC ও HSC GPA বসিয়ে এক নজরে দেখা যায় কোন কোন সাধারণ
          ভার্সিটিতে আবেদন করা যাবে।
        </p>

        <section className="about-section">
          <h2 className="about-sub">HSC GPA Calculator</h2>
          <p>
            তোমার{" "}
            <Link href="/hsc-gpa-calculator" className="about-link">
              HSC GPA calculator
            </Link>{" "}
            এ প্রতিটা বিষয়ের গ্রেড বসালেই এটা তোমার আসল (নেট) HSC GPA বের করে দেয়।
            ৪র্থ বিষয়ের অতিরিক্ত গ্রেড পয়েন্ট (২-এর বেশি অংশ) সঠিকভাবে যোগ করে হিসাব
            করে, GPA-র পাশাপাশি লেটার গ্রেডও (A+, A, A- ইত্যাদি) দেখিয়ে দেয়। কোনো
            ম্যানুয়াল হিসাব-নিকাশ ছাড়াই সাথে সাথে রেজাল্ট পেয়ে যাবে।
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-sub">একসাথে অনেক ভার্সিটির যোগ্যতা চেক</h2>
          <p>
            <Link href="/general-check" className="about-link">
              SSC+HSC দিয়ে ভার্সিটির যোগ্যতা চেক করো
            </Link>{" "}
            বাটনে ক্লিক করে তোমার SSC আর HSC GPA বসিয়ে দিলে সাথে সাথে দেখতে পাবে কোন
            কোন সাধারণ (জেনারেল) ভার্সিটিতে তুমি আবেদনের ন্যূনতম যোগ্যতা পূরণ করছ। এখানে
            মেডিকেল ও ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয়গুলো (যেমন BUET, RUET, KUET, মেডিকেল
            কলেজ) দেখানো হয় না — কারণ এদের ভর্তি-যোগ্যতায় শুধু SSC-HSC GPA যথেষ্ট না,
            পদার্থবিজ্ঞান/রসায়ন/উচ্চতর গণিতের মতো নির্দিষ্ট বিষয়ে আলাদা ন্যূনতম GPA-ও
            লাগে, যেটা এই কুইক চেকারে ধরা সম্ভব না। ওইসব ভার্সিটির জন্য প্রতিটার নিজস্ব
            ডিটেইল পেজে গিয়ে হিসাব করতে হবে।
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-sub">ভার্সিটি ডিটেইলস পেজে ক্যালকুলেটর</h2>
          <p>
            প্রতিটা ভার্সিটির নিজস্ব পেজে ঢুকলে সেই ভার্সিটির নির্দিষ্ট ভর্তি-যোগ্যতা
            অনুযায়ী GPA বসানোর বক্স পাবে (যেমন SSC, HSC, আর প্রয়োজনে পদার্থ/রসায়ন/উচ্চতর
            গণিত)। যেসব ভার্সিটির ক্ষেত্রে ক্যালকুলেটর ব্যবহার করা যায়, সেখানে পেজের
            ভেতরেই স্পষ্ট করে "ক্যালকুলেটর ব্যবহার করা যাবে" নোটটা দেখতে পাবে। যেসব
            ভার্সিটিতে মেধাক্রম সম্পূর্ণভাবে পরীক্ষার নম্বরের উপর নির্ভর করে, GPA দিয়ে
            আগে থেকে নির্ণয় করা যায় না, সেখানে এই নোট দেখানো হয় না।
          </p>
        </section>

        <section className="about-section">
          <p>
            কোনো ভুল চোখে পড়লে, বা নতুন কিছু যোগ করার আইডিয়া থাকলে,{" "}
            <Link href="/contact" className="about-link">
              যোগাযোগ করুন
            </Link>{" "}
            পেজে গিয়ে জানাও — আমরা পড়ি এবং রিপ্লাই করি।
          </p>
        </section>

        <h2 className="about-title about-devs-title">About Creators :</h2>

        <div className="dev-grid">
          <div className="dev-card">
              <h3 className="dev-sub-title">developer</h3>
            <h3 className="dev-name">নিশাত আলম</h3>
            <p>
              I am Nishat Alam, an admission candidate of HSC 2026 batch, in Comilla.
              I created this whole website myself. 
              If you want to contact me, please mail us.
            </p>
          </div>

          <div className="dev-card">
            <h3 className="dev-sub-title">Marketing Manager</h3>
            <h3 className="dev-name">আমানুল্লাহ আমান</h3>
            <p>
              I am Amanullah Aman, I am also an admission candidate of HSC 2026 batch.
              This I work on website marketing. 
              If you want to contact me, please contact with us, we will reply as soon as possible.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
