import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "যোগাযোগ করুন",
  alternates: { canonical: "/contact" },
};

const SITE_EMAIL = "admissioninfo26@gmail.com";
const DEV_EMAIL = "alamnishat456@gmail.com";
const TELEGRAM_URL = "https://t.me/admissioninfo26";
const FACEBOOK_URL = "https://www.facebook.com/admissioninfo26";

const FACEBOOK_PATH =
  "M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z";
const TELEGRAM_PATH =
  "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z";

const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6l9 7 9-7" />
    <path d="M3 6v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z" />
  </svg>
);

const codeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 7l-5 5 5 5" />
    <path d="M16 7l5 5-5 5" />
    <path d="M14 4l-4 16" />
  </svg>
);

const labelStyle = { minWidth: 0, overflowWrap: "anywhere" };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="page">
        <div className="contact-hero">
          <h1>কিছু বলার আছে?</h1>
          <p>
            প্রশ্ন থাকলে, কোনো ভুল চোখে পড়লে, বা নতুন কিছু যোগ করার আইডিয়া থাকলে — ইমেইল
            করো, অথবা আমাদের পেজ ও চ্যানেলে মেসেজ দাও। আমরা পড়ি, রিপ্লাইও দিই।
          </p>
        </div>

        <div className="reach-row">
          <a className="sticker" href={`mailto:${SITE_EMAIL}`}>
            <span className="sticker-icon">{mailIcon}</span>
            <span className="label" style={labelStyle}>
              <span className="k">ইমেইল</span>
              <span className="v">{SITE_EMAIL}</span>
            </span>
          </a>

          <a className="sticker" href={`mailto:${DEV_EMAIL}`}>
            <span className="sticker-icon">{codeIcon}</span>
            <span className="label" style={labelStyle}>
              <span className="k">ডেভেলপার ইমেইল</span>
              <span className="v">{DEV_EMAIL}</span>
            </span>
          </a>
        </div>

        <h2
          style={{
            marginTop: 40,
            fontFamily: "var(--font-noto-bn), sans-serif",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          আমাদের সাথে যুক্ত থাকো
        </h2>
        <p style={{ marginTop: 6, fontSize: 14, color: "#555", lineHeight: 1.6 }}>
          ভর্তির লেটেস্ট আপডেট সবার আগে পেতে ফেসবুক পেজ আর টেলিগ্রাম চ্যানেলে জয়েন করো।
        </p>

        <div className="reach-row" style={{ marginTop: 16 }}>
          <a className="sticker" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            <span className="sticker-icon" style={{ background: "#1877f2" }}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d={FACEBOOK_PATH} />
              </svg>
            </span>
            <span className="label" style={labelStyle}>
              <span className="k">Facebook পেজ</span>
              <span className="v">Admission Info</span>
            </span>
          </a>

          <a className="sticker" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            <span className="sticker-icon" style={{ background: "#229ed9" }}>
              <svg viewBox="0 0 496 512" fill="currentColor">
                <path d={TELEGRAM_PATH} />
              </svg>
            </span>
            <span className="label" style={labelStyle}>
              <span className="k">Telegram চ্যানেল</span>
              <span className="v">t.me/admissioninfo26</span>
            </span>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
