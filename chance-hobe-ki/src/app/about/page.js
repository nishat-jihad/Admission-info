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
    paths: [
      "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z",
    ],
  },
  facebook: {
    viewBox: "0 0 24 24",
    circle: true,
    paths: [
      "M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z",
    ],
  },
  linkedin: {
    viewBox: "0 0 24 24",
    paths: [
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    ],
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
      aria-label={label}
    >
      <svg viewBox={icon.viewBox} aria-hidden="true">
        {icon.circle && <circle cx="12" cy="12" r="12" className="ab-ico-bg" />}
        {icon.paths.map((d) => (
          <path key={d.slice(0, 12)} d={d} className="ab-ico-fg" />
        ))}
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
    text: "আমি নিশাত আলম, HSC 2026 ব্যাচের একজন admission candidate। এই website-এর UI পুরোটাই আমি নিজে design করেছি, তবে আমি coding জানি না, তাই vibe coding আর AI tools দিয়ে code করিয়েছি। EdTech, UI design, business, startup আর engineering আমার আগ্রহের জায়গা।",
  },
  {
    title: "My vision",
    text: "আমি এমন একটা platform চাই যেখানে admission-এর সব তথ্য সঠিক, গোছানো আর বিনামূল্যে পাওয়া যায়। coaching বা পরিচিত কারও কাছে যাওয়ার সুযোগ না থাকলেও যেন কোনো student পিছিয়ে না পড়ে।",
  },
  {
    title: "My philosophy about admission exams",
    text: "Admission exam তোমার সব যোগ্যতার মাপকাঠি নয়। সঠিক তথ্য, ঠান্ডা মাথায় plan আর নিয়মিত preparation থাকলে সবাই নিজের জায়গা খুঁজে নিতে পারে। অনিশ্চয়তা কমলে preparation-এ মন বসে।",
  },
  {
    title: "My dream for Bangladesh",
    text: "আমি বাংলাদেশেই থেকে কিছু গড়তে চাই। entrepreneur হয়ে এমন technology আর venture বানাতে চাই যা এ দেশের তরুণদের জন্য সুযোগ তৈরি করবে, আর কাজ খুঁজতে নয়, কাজ দিতে শেখাবে।",
  },
  {
    title: "Designed by me, built with vibe coding",
    text: "এই website-এর প্রতিটা page-এর UI আমি নিজে design করেছি। আমি traditional coding জানি না, তাই vibe coding আর AI tools ব্যবহার করে সেই design-কে code-এ রূপ দিয়েছি। Idea, design আর প্রতিটা সিদ্ধান্ত আমার, শুধু code লেখায় AI আমাকে সাহায্য করেছে।",
    wide: true,
  },
];

const MKT_BOXES = [
  {
    title: "About me",
    text: "আমি আমান উল্লাহ, HSC 2026 ব্যাচের একজন admission candidate। Admission Info-র marketing ও outreach আমি দেখি, যাতে আরও বেশি student platform-টার খোঁজ পায়। আমার প্রিয় বিষয় art, সাথে business, startup, robotics আর coding-এ আগ্রহ আছে।",
  },
  {
    title: "My vision",
    text: "আমি চাই প্রতিটা admission candidate-এর কাছে যেন এই site-এর কথা পৌঁছায়। সঠিক তথ্য শুধু তৈরি করলেই হয় না, সেটা সময়মতো সঠিক মানুষের হাতে পৌঁছাতে হবে।",
  },
  {
    title: "My philosophy about admission exams",
    text: "আমি নিজেও এই পথেরই যাত্রী, তাই জানি admission season-এ চাপ কেমন হয়। নিজের মতো করে preparation নাও, অন্যের সাথে তুলনা করে নিজেকে ছোট ভেবো না। চেষ্টাই আসল।",
  },
  {
    title: "My dream for Bangladesh",
    text: "ভবিষ্যতে নিজের একটা venture দাঁড় করানোই আমার স্বপ্ন। art, technology আর business-কে একসাথে নিয়ে এমন কিছু বানাতে চাই যা বাংলাদেশের জন্য গর্বের হয়।",
  },
];

const REASON_BOXES = [
  {
    title: "Admission season অনেক গুরুত্বপূর্ণ",
    text: "HSC-র পর কয়েক মাসের মধ্যেই অনেকটা ভবিষ্যৎ ঠিক হয়ে যায়। এই সময়ে একটা ভুল সিদ্ধান্ত বা একটা মিস করা তারিখই বড় ক্ষতি করতে পারে।",
  },
  {
    title: "তথ্য এলোমেলো, খুঁজতে সময় নষ্ট",
    text: "circular একদিকে, যোগ্যতা অন্যদিকে, তারিখ আরেক জায়গায়। Facebook group, university site আর পুরোনো post ঘুরে সঠিক তথ্য খুঁজতে পড়াশোনার সময়ই চলে যায়। আমরা এই অপচয়টাই কমাতে চাই।",
  },
  {
    title: "আমরা নিজেরাই admission candidate",
    text: "আমরা দুজনেই এই বছরের admission candidate। যে ঝামেলা নিজেরা পোহাচ্ছি, সেটা অন্যদের যেন পোহাতে না হয়, সেই ভাবনা থেকেই শুরু।",
  },
  {
    title: "সময় বাঁচবে",
    points: [
      "এক জায়গাতেই exam date, যোগ্যতা আর news",
      "আলাদা আলাদা website ঘুরতে হবে না",
      "মিনিটের মধ্যে জানা যাবে কোথায় apply করা যাবে",
    ],
  },
  {
    title: "ঝামেলা ছাড়া হিসাব",
    points: [
      "নিজে GPA হিসাব করতে গিয়ে ভুলের ভয় নেই",
      "৪র্থ বিষয়ের পয়েন্টসহ net GPA সাথে সাথে",
      "আবেদনের আগেই যোগ্যতা নিশ্চিত হওয়া যাবে",
    ],
  },
  {
    title: "সবার জন্য free",
    points: [
      "registration বা fee ছাড়াই ব্যবহার করা যায়",
      "mobile থেকেও সহজে চলে",
      "নতুন update আসলে Facebook ও Telegram-এ জানানো হয়",
    ],
  },
];

function InfoBox({ title, text, points, wide }) {
  return (
    <div className={`ab-box${wide ? " ab-box-wide" : ""}`}>
      <h4 className="ab-box-title">{title}</h4>
      {text && <p>{text}</p>}
      {points && (
        <ul className="ab-list">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
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
      <Navbar showBreaking={false} />
      <main className="page about-page">
        <Link className="general-back-btn" href="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          হোমে ফিরে যাও
        </Link>
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
              <img
                src="/images/website-preview.png"
                alt="Admission Info website preview"
                loading="lazy"
              />
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

        {/* 3. Reason to make this website (reason + how it helps) */}
        <section className="ab-segment" aria-labelledby="ab-reason-title">
          <h2 className="ab-title" id="ab-reason-title">
            Reason to make this website
          </h2>
          <div className="ab-grid-3">
            {REASON_BOXES.map((b) => (
              <InfoBox key={b.title} {...b} />
            ))}
          </div>
        </section>

        <p className="ab-foot ab-foot-out">
          কোনো ভুল চোখে পড়লে বা নতুন idea থাকলে{" "}
          <Link href="/contact" className="ab-box-link">
            যোগাযোগ পেজে
          </Link>{" "}
          জানাও। আমরা পড়ি এবং রিপ্লাই করি।
        </p>
      </main>
      <Footer />
    </>
  );
}
