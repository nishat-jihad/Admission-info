import Image from "next/image";

const TELEGRAM_URL = "https://t.me/admissioninfo26";
const FACEBOOK_URL = "https://www.facebook.com/admissioninfo26";

// নিউজের লেখার মাঝে Telegram ও Facebook পেজের প্রমোশনাল ছবি।
// ছবি দুটো public/images/-এ (promo-telegram.webp, promo-facebook.webp), ৮০০×৬৬৭ px।
// PC: পাশাপাশি · Mobile: একটার নিচে একটা। ছবিতে ক্লিক করলে পেজ/চ্যানেল খোলে।
export default function NewsSocialPromo() {
  return (
    <aside className="news-promo" aria-label="Admission Info-এর Telegram ও Facebook">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="news-promo-item"
      >
        <Image
          src="/images/promo-telegram.webp"
          alt="Telegram-এ Admission Info-এ যুক্ত হও — @admissioninfo26"
          width={800}
          height={667}
          sizes="(max-width: 560px) 100vw, 410px"
        />
      </a>
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="news-promo-item"
      >
        <Image
          src="/images/promo-facebook.webp"
          alt="Facebook-এ Admission Info পেজ লাইক ও ফলো করো — /admissioninfo26"
          width={800}
          height={667}
          sizes="(max-width: 560px) 100vw, 410px"
        />
      </a>
    </aside>
  );
}
