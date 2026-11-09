import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Admission Info ওয়েবসাইটে কোন তথ্য সংগ্রহ হয়, কুকি ও বিজ্ঞাপন কীভাবে কাজ করে এবং তোমার তথ্য কীভাবে সুরক্ষিত থাকে তার বিস্তারিত।",
  alternates: { canonical: "/privacy-policy" },
};

const SITE_EMAIL = "admissioninfo26@gmail.com";
const LAST_UPDATED = "৯ নভেম্বর ২০২৬";

function ExtLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="ab-box-link">
      {children}
    </a>
  );
}

function Section({ title, children }) {
  return (
    <section className="ab-box" style={{ padding: "18px 20px", gap: 10 }}>
      <h2 className="ab-box-title" style={{ fontSize: 18 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="ab-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar showBreaking={false} />
      <main className="page about-page">
        <div
          style={{
            width: "100%",
            maxWidth: 860,
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <Link className="general-back-btn" href="/" style={{ alignSelf: "flex-start" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            হোমে ফিরে যাও
          </Link>

          {/* Header */}
          <section className="ab-segment" aria-labelledby="pp-title">
            <h1 className="ab-title" id="pp-title">
              Privacy Policy
            </h1>
            <p className="ab-lead">
              Admission Info ব্যবহার করতে তোমাকে কোনো একাউন্ট খুলতে হয় না, কোনো ফর্ম পূরণ করতে হয়
              না, কোনো তথ্যও দিতে হয় না। এই পেজে সহজ ভাষায় লেখা আছে, সাইট চালানোর জন্য ঠিক কোন
              তথ্য স্বয়ংক্রিয়ভাবে ব্যবহার হয়, কেন হয় এবং তোমার হাতে কী কী নিয়ন্ত্রণ আছে।
            </p>
            <p className="ab-foot" style={{ marginTop: 10 }}>
              সর্বশেষ আপডেট: <strong>{LAST_UPDATED}</strong>
            </p>
          </section>

          {/* Quick summary */}
          <section className="ab-box" style={{ padding: "18px 20px", gap: 10 }}>
            <h2 className="ab-box-title" style={{ fontSize: 18 }}>
              এক নজরে
            </h2>
            <List
              items={[
                "লগইন, সাইন আপ বা পেমেন্ট নেই। সাইটটা পুরোপুরি বিনামূল্যে।",
                "নাম, ফোন নম্বর, ইমেইল বা ঠিকানা আমরা চাই না এবং সংগ্রহও করি না।",
                "তুমি GPA বা গ্রেড বসালে হিসাবটা তোমার ব্রাউজারেই হয়। সেই তথ্য আমাদের সার্ভারে পাঠানো বা জমা রাখা হয় না।",
                "সাইট কেমন চলছে বোঝার জন্য অ্যানালিটিক্স টুল এবং বিজ্ঞাপনের জন্য তৃতীয় পক্ষের সার্ভিস ব্যবহার হতে পারে। এগুলো কুকি ব্যবহার করতে পারে।",
              ]}
            />
          </section>

          <Section title="১. এই পলিসি কার জন্য">
            <p>
              এই Privacy Policy Admission Info ওয়েবসাইটের (admissioninfo.vercel.app) সব পেজের জন্য
              প্রযোজ্য। এখানে হোম পেজ, HSC GPA Calculator, General Check, ভার্সিটির বিস্তারিত পেজ,
              Updates, Exam Dates এবং News Corner সবই আছে। সাইটটি ব্যবহার করলে তুমি এই পলিসির সাথে
              সম্মত আছ বলে ধরা হবে। সম্মত না হলে সাইট ব্যবহার না করার অনুরোধ রইল।
            </p>
          </Section>

          <Section title="২. যে তথ্য আমরা সংগ্রহ করি না">
            <List
              items={[
                "তোমার নাম, ফোন নম্বর, ইমেইল, ঠিকানা বা অন্য কোনো ব্যক্তিগত পরিচয়ের তথ্য",
                "কোনো পাসওয়ার্ড, কারণ সাইটে লগইন বা একাউন্ট ব্যবস্থাই নেই",
                "পেমেন্ট বা ব্যাংকের কোনো তথ্য",
                "ক্যালকুলেটর বা যোগ্যতা যাচাইয়ে তুমি যে SSC/HSC GPA, গ্রেড বা পয়েন্ট বসাও, সেগুলো। এই হিসাব তোমার ডিভাইসের ব্রাউজারেই হয়, আমাদের কোনো ডাটাবেসে জমা হয় না।",
              ]}
            />
          </Section>

          <Section title="৩. যে তথ্য স্বয়ংক্রিয়ভাবে সংগ্রহ হতে পারে">
            <p>
              প্রায় সব ওয়েবসাইটের মতো, তুমি সাইটে ঢুকলে কিছু প্রযুক্তিগত তথ্য স্বয়ংক্রিয়ভাবে
              রেকর্ড হয়। এগুলো দিয়ে তোমাকে ব্যক্তিগতভাবে চেনা যায় না।
            </p>
            <List
              items={[
                "ব্রাউজারের ধরন, অপারেটিং সিস্টেম, ডিভাইসের ধরন (মোবাইল বা কম্পিউটার) ও স্ক্রিনের মাপ",
                "IP অ্যাড্রেস থেকে পাওয়া আনুমানিক অবস্থান (দেশ বা অঞ্চল পর্যন্ত)",
                "কোন পেজ দেখেছ, কত সময় ছিলে, কোথা থেকে এসেছ (যেমন Google, Facebook, Telegram)",
                "পেজে কোথায় ক্লিক বা স্ক্রল করেছ",
                "হোস্টিং সার্ভারের সাধারণ লগ, যেমন অনুরোধের সময় ও পেজের ঠিকানা",
              ]}
            />
            <p>
              এই তথ্য আমরা শুধু সাইট ঠিকঠাক চালাতে, ভুল বা ধীর পেজ খুঁজে বের করতে এবং কোন
              ফিচার শিক্ষার্থীদের কাজে লাগছে তা বুঝে সাইট আরও ভালো করতে ব্যবহার করি।
            </p>
          </Section>

          <Section title="৪. আমরা যে সার্ভিসগুলো ব্যবহার করি">
            <List
              items={[
                "Vercel (হোস্টিং ও Web Analytics): সাইটটি Vercel-এ হোস্ট করা। Vercel Web Analytics পেজ ভিউয়ের মতো সামগ্রিক পরিসংখ্যান দেখায় এবং এর জন্য আলাদা করে ব্যক্তিগত প্রোফাইল তৈরি করা হয় না।",
                "Microsoft Clarity: ভিজিটররা সাইটে কীভাবে ক্লিক ও স্ক্রল করেন তা বুঝতে হিটম্যাপ ও সেশন রিপ্লে দেখায়। এটি কুকি ব্যবহার করতে পারে এবং Microsoft-এর নিজস্ব নীতি অনুযায়ী তথ্য প্রক্রিয়া করে।",
                "Google AdSense বা অনুরূপ বিজ্ঞাপন সার্ভিস: সাইটের খরচ চালাতে বিজ্ঞাপন দেখানো হতে পারে। বিস্তারিত নিচের ‘বিজ্ঞাপন’ অংশে।",
              ]}
            />
            <p>
              Clarity-র বিস্তারিত জানতে দেখো{" "}
              <ExtLink href="https://privacy.microsoft.com/privacystatement">
                Microsoft Privacy Statement
              </ExtLink>
              , আর Vercel-এর জন্য{" "}
              <ExtLink href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy</ExtLink>।
            </p>
          </Section>

          <Section title="৫. কুকি (Cookies)">
            <p>
              কুকি হলো ছোট একটা টেক্সট ফাইল, যা তোমার ব্রাউজারে জমা থাকে। আমাদের সাইট নিজে থেকে
              লগইন বা একাউন্টের জন্য কোনো কুকি ব্যবহার করে না। তবে উপরে উল্লেখ করা তৃতীয় পক্ষের
              সার্ভিস (যেমন Microsoft Clarity ও বিজ্ঞাপন সার্ভিস) নিজেদের কুকি বা অনুরূপ প্রযুক্তি
              ব্যবহার করতে পারে।
            </p>
            <p>
              তুমি চাইলে ব্রাউজারের সেটিংস থেকে যেকোনো সময় কুকি মুছে ফেলতে বা বন্ধ রাখতে পারো। এতে
              সাইটের ক্যালকুলেটর ও অন্য ফিচার সাধারণত আগের মতোই কাজ করবে, তবে কিছু বিজ্ঞাপন কম
              প্রাসঙ্গিক দেখাতে পারে।
            </p>
          </Section>

          <Section title="৬. বিজ্ঞাপন">
            <p>
              Admission Info বিনামূল্যে চালানোর খরচ মেটাতে আমরা Google AdSense-এর মতো তৃতীয় পক্ষের
              বিজ্ঞাপন ব্যবহার করি বা ভবিষ্যতে করতে পারি। এসব বিজ্ঞাপন প্রদানকারী, Google সহ, তোমার
              আগের ভিজিটের ভিত্তিতে বিজ্ঞাপন দেখাতে কুকি ব্যবহার করতে পারে।
            </p>
            <List
              items={[
                "Google-এর মতো তৃতীয় পক্ষের বিক্রেতারা এই সাইটে ও ইন্টারনেটের অন্যান্য সাইটে তোমার আগের ভিজিটের ভিত্তিতে বিজ্ঞাপন দেখাতে কুকি ব্যবহার করে।",
                "Google-এর বিজ্ঞাপন কুকির কারণে Google ও তার অংশীদাররা তোমাকে ইন্টারনেটের নানা সাইটে প্রাসঙ্গিক বিজ্ঞাপন দেখাতে পারে।",
                "কোন বিজ্ঞাপন দেখানো হবে তা আমরা নিজেরা বাছাই করি না। সেটা বিজ্ঞাপন প্রদানকারীর সিস্টেম ঠিক করে।",
              ]}
            />
            <p>
              ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করতে চাইলে{" "}
              <ExtLink href="https://adssettings.google.com">Google Ads Settings</ExtLink> পেজে গিয়ে বন্ধ
              করতে পারো। এছাড়া{" "}
              <ExtLink href="https://www.aboutads.info/choices/">aboutads.info</ExtLink> থেকে অনেক
              তৃতীয় পক্ষের বিজ্ঞাপন প্রদানকারীর ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করা যায়। Google কীভাবে
              ডেটা ব্যবহার করে তা জানতে দেখো{" "}
              <ExtLink href="https://policies.google.com/technologies/partner-sites">
                Google-এর নীতি
              </ExtLink>
              ।
            </p>
          </Section>

          <Section title="৭. তৃতীয় পক্ষের লিংক ও শেয়ার বাটন">
            <p>
              সাইটে Facebook, Telegram, WhatsApp ও LinkedIn-এর লিংক বা শেয়ার বাটন এবং বিভিন্ন
              বিশ্ববিদ্যালয়ের অফিসিয়াল ওয়েবসাইটের লিংক আছে। এসব লিংকে ক্লিক করলে তুমি আমাদের সাইট
              ছেড়ে অন্য সাইটে যাবে। সেই সাইটগুলোর কনটেন্ট ও প্রাইভেসি নীতির ওপর আমাদের কোনো
              নিয়ন্ত্রণ নেই। তাই সেখানে কোনো তথ্য দেওয়ার আগে তাদের পলিসি পড়ে নিও।
            </p>
          </Section>

          <Section title="৮. শিক্ষার্থী ও শিশুদের তথ্য">
            <p>
              আমাদের সাইট মূলত HSC পরীক্ষার্থী ও ভর্তি-ইচ্ছুকদের জন্য। আমরা জেনেশুনে ১৩ বছরের কম
              বয়সী কারও ব্যক্তিগত তথ্য সংগ্রহ করি না। আর যেহেতু সাইটে কোনো ব্যক্তিগত তথ্য চাওয়াই হয়
              না, তাই কোনো শিক্ষার্থীর ব্যক্তিগত তথ্য আমাদের কাছে জমা থাকে না। অভিভাবক মনে করলে
              তাঁর সন্তানের কোনো তথ্য কোথাও জমা হয়েছে, তাহলে নিচের ঠিকানায় জানাতে পারেন।
            </p>
          </Section>

          <Section title="৯. তথ্যের নিরাপত্তা">
            <p>
              সাইটটি HTTPS-এর মাধ্যমে চলে, ফলে তোমার ব্রাউজার ও সাইটের মধ্যের যোগাযোগ এনক্রিপ্টেড
              থাকে। তবে ইন্টারনেটে কোনো পদ্ধতিই শতভাগ নিরাপদ হয় না। আমরা কোনো ব্যক্তিগত তথ্য
              জমা রাখি না, তাই ঝুঁকির জায়গাও সীমিত।
            </p>
          </Section>

          <Section title="১০. তোমার পছন্দ ও অধিকার">
            <List
              items={[
                "ব্রাউজারের সেটিংস থেকে কুকি মুছে ফেলা বা ব্লক করা",
                "Google Ads Settings থেকে ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করা",
                "ব্রাউজারের Do Not Track বা অ্যাড-ব্লকার ব্যবহার করা",
                "আমাদের সম্পর্কে কোনো তথ্য জমা আছে বলে মনে হলে ইমেইল করে জানতে চাওয়া বা মুছে ফেলার অনুরোধ করা",
              ]}
            />
          </Section>

          <Section title="১১. পলিসিতে পরিবর্তন">
            <p>
              সাইটে নতুন ফিচার বা সার্ভিস যোগ হলে এই পলিসি বদলাতে পারে। যেকোনো পরিবর্তনের পর এই
              পেজের ওপরে ‘সর্বশেষ আপডেট’-এর তারিখও বদলে যাবে। তাই মাঝেমধ্যে পেজটি দেখে নিও।
            </p>
          </Section>

          <Section title="১২. যোগাযোগ">
            <p>
              এই পলিসি নিয়ে প্রশ্ন, মতামত বা অনুরোধ থাকলে ইমেইল করো:{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="ab-box-link">
                {SITE_EMAIL}
              </a>
              । অথবা{" "}
              <Link href="/contact" className="ab-box-link">
                যোগাযোগ পেজ
              </Link>{" "}
              থেকে Facebook বা Telegram-এও মেসেজ দিতে পারো।
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
