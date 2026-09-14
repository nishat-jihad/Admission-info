"use client";

import { useState } from "react";

const TELEGRAM_URL = "https://t.me/admissioninfo26";
const FACEBOOK_URL = "https://www.facebook.com/admissioninfo26";

// একই আইকন-পাথ Footer.js-এও আছে (SVG হিসেবে ইনলাইন রাখা, কোনো আইকন-ফন্টের
// উপর নির্ভর না করার জন্য), এখানে আলাদা করে রাখা হলো যাতে দুই কম্পোনেন্ট
// একে অপরের উপর নির্ভর না করে।
const TELEGRAM_PATH =
  "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z";
const FACEBOOK_PATH =
  "M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z";

export default function SocialPromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="social-promo-banner">
      <span className="social-promo-text social-promo-text-full">
        ভর্তি পরীক্ষার নির্ভুল আপডেট পেতে যুক্ত থাকুন
      </span>
      <span className="social-promo-text social-promo-text-short">
        আপডেট পেতে যুক্ত থাকুন
      </span>

      <div className="social-promo-actions">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-promo-icon-btn social-promo-telegram"
          aria-label="Telegram জয়েন করুন"
          title="Telegram জয়েন করুন"
        >
          <svg viewBox="0 0 496 512" className="social-promo-icon">
            <path d={TELEGRAM_PATH} />
          </svg>
        </a>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-promo-icon-btn social-promo-facebook"
          aria-label="Facebook পেজ ফলো করুন"
          title="Facebook পেজ ফলো করুন"
        >
          <svg viewBox="0 0 24 24" className="social-promo-icon">
            <path d={FACEBOOK_PATH} />
          </svg>
        </a>
        <button
          type="button"
          className="social-promo-close-btn"
          aria-label="বন্ধ করুন"
          title="বন্ধ করুন"
          onClick={() => setVisible(false)}
        >
          <svg viewBox="0 0 24 24" className="social-promo-icon">
            <path
              d="M18 6L6 18M6 6l12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
