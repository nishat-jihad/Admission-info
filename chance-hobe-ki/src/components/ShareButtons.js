"use client";

import { useEffect, useRef, useState } from "react";

// আইকনের path Footer.js-এর সাথে একই (কোনো আইকন-ফন্টের উপর নির্ভর নেই)।
const FACEBOOK_PATH =
  "M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z";
const TELEGRAM_PATH =
  "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z";
const WHATSAPP_PATH =
  "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      // পুরোনো ব্রাউজার / নিরাপত্তা সীমাবদ্ধতায় fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    }
  }

  const links = [
    {
      key: "facebook",
      name: "Facebook-এ শেয়ার করুন",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      viewBox: "0 0 24 24",
      path: FACEBOOK_PATH,
    },
    {
      key: "whatsapp",
      name: "WhatsApp-এ শেয়ার করুন",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      viewBox: "0 0 16 16",
      path: WHATSAPP_PATH,
    },
    {
      key: "telegram",
      name: "Telegram-এ শেয়ার করুন",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      viewBox: "0 0 496 512",
      path: TELEGRAM_PATH,
    },
  ];

  return (
    <div className="news-share">
      <span className="news-share-label">শেয়ার করুন</span>

      <div className="news-share-actions">
        <button
          type="button"
          onClick={copyLink}
          className="news-share-btn news-share-copy"
          aria-label="লিংক কপি করুন"
          title="লিংক কপি করুন"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {links.map((l) => (
          <a
            key={l.key}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`news-share-btn news-share-${l.key}`}
            aria-label={l.name}
            title={l.name}
          >
            <svg viewBox={l.viewBox} fill="currentColor">
              <path d={l.path} />
            </svg>
          </a>
        ))}

        <span className="news-share-status" role="status" aria-live="polite">
          {copied ? "লিংক কপি হয়েছে" : ""}
        </span>
      </div>
    </div>
  );
}
