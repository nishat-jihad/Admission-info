import Image from "next/image";

const BANNERS = {
  telegram: {
    href: "https://t.me/admissioninfo26",
    src: "/images/promo-telegram.webp",
    alt: "Telegram-এ Admission Info-এ যুক্ত হও — @admissioninfo26",
  },
  facebook: {
    href: "https://www.facebook.com/admissioninfo26",
    src: "/images/promo-facebook.webp",
    alt: "Facebook-এ Admission Info পেজ লাইক ও ফলো করো — /admissioninfo26",
  },
};

// নিউজের লেখার মাঝে একটা করে প্রমো ব্যানার (type: "telegram" | "facebook")।
// ছবি public/images/-এ, ৮০০×৬৬৭ px; পর্দায় সর্বোচ্চ ৩০০px চওড়া দেখায়, মাঝখানে।
export default function NewsSocialPromo({ type = "telegram" }) {
  const b = BANNERS[type] || BANNERS.telegram;
  return (
    <aside className="news-promo" aria-label="Admission Info">
      <a href={b.href} target="_blank" rel="noopener noreferrer" className="news-promo-item">
        <Image src={b.src} alt={b.alt} width={800} height={667} sizes="300px" />
      </a>
    </aside>
  );
}
