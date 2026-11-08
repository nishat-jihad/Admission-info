import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About",
  description: "Admission Info ওয়েবসাইট কী, কেন বানানো হয়েছে এবং কারা বানিয়েছে।",
};

const ICONS = {
  telegram: {
    viewBox: "0 0 496 512",
    d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z",
  },
  facebook: {
    viewBox: "0 0 24 24",
    d: "M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z",
  },
  linkedin: {
    viewBox: "0 0 24 24",
    d: "M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4v11.5H3V9.75zm6.5 0h3.8v1.6h.06c.53-.95 1.84-1.95 3.8-1.95 4.06 0 4.84 2.67 4.84 6.14v5.71h-4v-5.07c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68v5.16h-4V9.75z",
  },
};

function SocialBtn({ type, label, href }) {
  const icon = ICONS[type];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ab-social ab-social-${type}`}
    >
      <svg viewBox={icon.viewBox} aria-hidden="true">
        <path d={icon.d} />
      </svg>
      <span>{label}</span>
    </a>
  );
}

const SITE_BOXES = [
  {
    title: "HSC GPA Calculator",
    text: "প্রতিটা বিষয়ের গ্রেড বসালেই আসল (নেট) HSC GPA আর লেটার গ্রেড বের করে দেয়। ৪র্থ বিষয়ের অতিরিক্ত পয়েন্টও (২-এর বেশি অংশ) সঠিকভাবে যোগ হয়।",
    href: "/hsc-gpa-calculator",
    cta: "ক্যালকুলেটর খুলুন",
  },
  {
    title: "General Check",
    text: "শুধু SSC আর HSC GPA বসিয়ে এক নজরে দেখো কোন কোন সাধারণ ভার্সিটিতে আবেদনের ন্যূনতম যোগ্যতা পূরণ করছ। BUET, মেডিকেল ইত্যাদি এখানে নেই, কারণ সেগুলোতে নির্দিষ্ট বিষয়ের আলাদা GPA লাগে।",
    href: "/general-check",
    cta: "যোগ্যতা চেক করুন",
  },
  {
    title: "University Details",
    text: "প্রতিটা ভার্সিটির নিজস্ব পেজে সেই ভার্সিটির ভর্তি-যোগ্যতা অনুযায়ী GPA বসানোর বক্স আছে। যেখানে ক্যালকুলেটর ব্যবহার করা যায়, সেখানে পেজেই তা স্পষ্ট লেখা থাকে।",
    href: "/#cards-wrap",
    cta: "ভার্সিটি দেখুন",
  },
  {
    title: "News Corner",
    text: "ভর্তি পরীক্ষার তারিখ, সার্কুলার আর সর্বশেষ আপডেট এক জায়গায়। আলাদা আলাদা সাইট ঘুরে খবর খুঁজতে হবে না।",
    href: "/news",
    cta: "নিউজ পড়ুন",
  },
];

const DEV_BOXES = [
  {
    title: "About me",
    text: "আমি নিশাত আলম, HSC 2026 ব্যাচের শিক্ষার্থী। এই পুরো প্ল্যাটফর্ম, ক্যালকুলেটর থেকে ভার্সিটি ডেটাবেস, আমি নিজে ডিজাইন করে কোড করেছি। EdTech, ওয়েব ডেভেলপমেন্ট, বিজনেস, স্টার্টআপ আর ইঞ্জিনিয়ারিং আমার আগ্রহের জায়গা।",
  },
  {
    title: "My vision",
    text: "আমি এমন একটা প্ল্যাটফর্ম চাই যেখানে ভর্তি-সংক্রান্ত সব তথ্য সঠিক, গোছানো আর বিনামূল্যে পাওয়া যায়। কোচিং বা পরিচিত কারও কাছে যাওয়ার সুযোগ না থাকলেও যেন কোনো শিক্ষার্থী পিছিয়ে না পড়ে।",
  },
  {
    title: "My philosophy about admission exams",
    text: "ভর্তি পরীক্ষা তোমার সব যোগ্যতার মাপকাঠি নয়। সঠিক তথ্য, ঠান্ডা মাথায় পরিকল্পনা আর নিয়মিত প্রস্তুতি থাকলে সবাই নিজের জায়গা খুঁজে নিতে পারে। অনিশ্চয়তা কমলে প্রস্তুতিতে মন বসে।",
  },
  {
    title: "My dream for Bangladesh",
    text: "আমি বাংলাদেশেই থেকে কিছু গড়তে চাই। উদ্যোক্তা হয়ে এমন প্রযুক্তি ও প্রতিষ্ঠান বানাতে চাই যা এ দেশের তরুণদের জন্য সুযোগ তৈরি করবে, আর কাজ খুঁজতে নয়, কাজ দিতে শেখাবে।",
  },
];

const MKT_BOXES = [
  {
    title: "About me",
    text: "আমি আমান উল্লাহ, HSC 2026 ব্যাচের একজন ভর্তি-প্রার্থী। Admission Info-র মার্কেটিং ও আউটরিচ আমি দেখি, যাতে আরও বেশি শিক্ষার্থী প্ল্যাটফর্মটার খোঁজ পায়। আমার প্রিয় বিষয় আর্ট, সাথে বিজনেস, স্টার্টআপ, রোবোটিক্স আর কোডিংয়ে আগ্রহ আছে।",
  },
  {
    title: "My vision",
    text: "আমি চাই প্রতিটা ভর্তি-প্রার্থীর কাছে যেন এই সাইটের কথা পৌঁছায়। সঠিক তথ্য শুধু তৈরি করলেই হয় না, সেটা সময়মতো সঠিক মানুষের হাতে পৌঁছাতে হবে।",
  },
  {
    title: "My philosophy about admission exams",
    text: "আমি নিজেও এই পথেরই যাত্রী, তাই জানি ভর্তির মৌসুমে চাপ কেমন হয়। নিজের মতো করে প্রস্তুতি নাও, অন্যের সাথে তুলনা করে নিজেকে ছোট ভেবো না। চেষ্টাই আসল।",
  },
  {
    title: "My dream for Bangladesh",
    text: "ভবিষ্যতে নিজের একটা ভেঞ্চার দাঁড় করানোই আমার স্বপ্ন। আর্ট, প্রযুক্তি আর বিজনেসকে একসাথে নিয়ে এমন কিছু বানাতে চাই যা বাংলাদেশের জন্য গর্বের হয়।",
  },
];

const REASON_BOXES = [
  {
    title: "ভর্তির মৌসুম অনেক গুরুত্বপূর্ণ",
    text: "HSC-র পর কয়েক মাসের মধ্যেই ভাগ্য অনেকটা নির্ধারিত হয়ে যায়। এই সময়ে একটা ভুল সিদ্ধান্ত বা একটা মিস করা তারিখই বড় ক্ষতি করতে পারে।",
  },
  {
    title: "তথ্য এলোমেলো ছড়ানো",
    text: "সার্কুলার একদিকে, যোগ্যতা অন্যদিকে, তারিখ আবার আরেক জায়গায়। ফেসবুক গ্রুপ, ভার্সিটির সাইট আর পুরোনো পোস্টে ঘুরে সঠিক তথ্য পাওয়া কঠিন।",
  },
  {
    title: "খুঁজতে গিয়ে সময় নষ্ট",
    text: "যে সময়টা পড়াশোনায় দেওয়ার কথা, তার বড় অংশ চলে যায় তথ্য খুঁজতে আর মেলাতে। আমরা ঠিক এই অপচয়টাই কমাতে চাই।",
  },
  {
    title: "আমরা নিজেরাই ভুক্তভোগী",
    text: "আমরা দুজনেই এই বছরের ভর্তি-প্রার্থী। যে ঝামেলা নিজেরা পোহাচ্ছি, সেটা অন্যদের যেন পোহাতে না হয়, সেই ভাবনা থেকেই শুরু।",
  },
];

const HELP_BOXES = [
  {
    title: "সময় বাঁচবে",
    points: [
      "এক জায়গাতেই ভর্তির তারিখ, যোগ্যতা আর নিউজ",
      "আলাদা আলাদা ওয়েবসাইট ঘুরতে হবে না",
      "মিনিটের মধ্যে জানা যাবে কোথায় আবেদন করা যাবে",
    ],
  },
  {
    title: "ঝামেলা ছাড়া হিসাব",
    points: [
      "নিজে নিজে GPA হিসাব করতে গিয়ে ভুলের ভয় নেই",
      "৪র্থ বিষয়ের পয়েন্টসহ নেট GPA সাথে সাথে",
      "ভার্সিটিভেদে নির্দিষ্ট বিষয়ের GPA-ও মেলানো যাবে",
    ],
  },
  {
    title: "সঠিক সিদ্ধান্ত",
    points: [
      "নিজের GPA অনুযায়ী বাস্তব সুযোগগুলো এক নজরে",
      "আবেদনের আগেই যোগ্যতা নিশ্চিত হওয়া যাবে",
      "ভার্সিটির বিস্তারিত যোগ্যতা সহজ ভাষায়",
    ],
  },
  {
    title: "সবার জন্য ফ্রি",
    points: [
      "কোনো রেজিস্ট্রেশন বা ফি ছাড়াই ব্যবহার করা যায়",
      "মোবাইল থেকেও সহজে চলে",
      "নতুন আপডেট আসলে ফেসবুক ও টেলিগ্রামে জানানো হয়",
    ],
  },
];

function InfoBox({ title, text, children }) {
  return (
    <div className="ab-box">
      <h4 className="ab-box-title">{title}</h4>
      {text && <p>{text}</p>}
      {children}
    </div>
  );
}

function Person({ name, role, image, boxes, socials, imageRight }) {
  return (
    <div className={`ab-person${imageRight ? " ab-person-right" : ""}`}>
      <div className="ab-person-head">
        <h3 className="ab-person-name">{name}</h3>
        <span className="ab-person-role">{role}</span>
      </div>
      <figure className="ab-figure">
        <div className="ab-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={`${name}, ${role}`} loading="lazy" />
        </div>
        <div className="ab-socials">
          {socials.map((s) => (
            <SocialBtn key={s.type} {...s} />
          ))}
        </div>
      </figure>
      <div className="ab-grid-2 ab-person-boxes">
        {boxes.map((b) => (
          <InfoBox key={b.title} {...b} />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="page about-page">
        {/* 1. About this website */}
        <section className="ab-segment" aria-labelledby="ab-site-title">
          <h1 className="ab-title" id="ab-site-title">
            About this website
          </h1>
          <p className="ab-lead">
            Admission Info একটা GPA-ভিত্তিক টুল, যা বাংলাদেশের HSC শিক্ষার্থীদের বুঝতে
            সাহায্য করে SSC ও HSC রেজাল্ট দিয়ে কোন কোন বিশ্ববিদ্যালয়, ইঞ্জিনিয়ারিং ও
            মেডিকেল কলেজে আবেদন করা যাবে।
          </p>
          <div className="ab-site">
            <div className="ab-site-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero-2.jpg" alt="Curzon Hall, University of Dhaka" />
            </div>
            <div className="ab-grid-2 ab-site-boxes">
              {SITE_BOXES.map((b) => (
                <div className="ab-box" key={b.title}>
                  <h4 className="ab-box-title">{b.title}</h4>
                  <p>{b.text}</p>
                  <Link href={b.href} className="ab-box-link">
                    {b.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. About us */}
        <section className="ab-segment" aria-labelledby="ab-us-title">
          <h2 className="ab-title" id="ab-us-title">
            About us
          </h2>
          <Person
            name="নিশাত আলম"
            role="Developer"
            image="/images/nishat.jpg"
            boxes={DEV_BOXES}
            socials={[
              { type: "telegram", label: "Telegram", href: "https://t.me/nishatalam" },
              {
                type: "linkedin",
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/nishat-alam-57a2a83ab",
              },
            ]}
          />
          <Person
            name="আমান উল্লাহ"
            role="Marketing Manager"
            image="/images/aman.jpg"
            imageRight
            boxes={MKT_BOXES}
            socials={[
              {
                type: "facebook",
                label: "Facebook",
                href: "https://www.facebook.com/share/1F9mfaSu6b",
              },
              { type: "telegram", label: "Telegram", href: "https://t.me/amanullah_618" },
            ]}
          />
        </section>

        {/* 3. Reason to make this website */}
        <section className="ab-segment" aria-labelledby="ab-reason-title">
          <h2 className="ab-title" id="ab-reason-title">
            Reason to make this website
          </h2>
          <div className="ab-grid-4">
            {REASON_BOXES.map((b) => (
              <InfoBox key={b.title} {...b} />
            ))}
          </div>
        </section>

        {/* 4. Why we built it / how it helps */}
        <section className="ab-segment" aria-labelledby="ab-help-title">
          <h2 className="ab-title" id="ab-help-title">
            Why we built this website
          </h2>
          <p className="ab-lead">
            ভর্তি-প্রার্থীদের কাজ সহজ করতে আমরা এই ওয়েবসাইট বানিয়েছি। এটা তোমাকে যেভাবে সাহায্য করবে:
          </p>
          <div className="ab-grid-4">
            {HELP_BOXES.map((b) => (
              <InfoBox key={b.title} title={b.title}>
                <ul className="ab-list">
                  {b.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </InfoBox>
            ))}
          </div>
          <p className="ab-foot">
            কোনো ভুল চোখে পড়লে বা নতুন আইডিয়া থাকলে{" "}
            <Link href="/contact" className="ab-box-link">
              যোগাযোগ পেজে
            </Link>{" "}
            জানাও। আমরা পড়ি এবং রিপ্লাই করি।
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
