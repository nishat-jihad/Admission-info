"use client";

import Image from "next/image";
import Link from "next/link";

// Single source for the icon set so the same markup can be rendered twice
// (once for desktop placement under the logo, once for mobile placement at
// the very bottom of the footer) without duplicating the raw SVG paths.
const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z",
  },
  {
    name: "YouTube",
    href: "#",
    viewBox: "0 0 576 512",
    path: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232.42 337.5V178.5l142.739 79.5L232.42 337.5z",
  },
  {
    name: "Telegram",
    href: "#",
    viewBox: "0 0 496 512",
    path: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z",
  },
  {
    name: "WhatsApp",
    href: "#",
    viewBox: "0 0 16 16",
    path: "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z",
  },
];

function SocialIcons() {
  return (
    <div className="footer-social-new">
      {SOCIAL_LINKS.map((s) => (
        <a key={s.name} href={s.href} className="icon-btn" aria-label={s.name} title={s.name}>
          <svg className="icon" viewBox={s.viewBox}>
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Image
              src="/images/admission-info-logo.png"
              alt="Admission Info"
              width={346}
              height={145}
              className="footer-logo-img"
            />
          </Link>
          <p>
            তোমার SSC আর HSC-র GPA দিয়ে তুমি কোন কোন ভার্সিটি, ইঞ্জিনিয়ারিং আর মেডিকেলে
            আবেদন করতে পারবে — সেটা এক নজরে জানিয়ে দেয় Admission Info। সিট সংখ্যা,
            পরীক্ষার নিয়ম আর GPA ক্যালকুলেটর — সব একসাথে, একদম সহজ ভাষায়।
          </p>
          {/* Desktop: sits right under the logo + description */}
          <div className="footer-social-desktop">
            <SocialIcons />
          </div>
        </div>

        <div className="footer-col">
          <h4>কুইক লিংক</h4>
          <Link href="/">হোম</Link>
          <Link href="/?category=versity#cards-wrap">সকল ভার্সিটি</Link>
          <Link href="/?category=engineering#cards-wrap">ইঞ্জিনিয়ারিং</Link>
          <Link href="/?category=medical#cards-wrap">মেডিক্যাল</Link>
        </div>

        <div className="footer-col">
          <h4>আরও</h4>
          <Link href="/hsc-gpa-calculator">HSC GPA ক্যালকুলেটর</Link>
          <Link href="/general-check">শুধু SSC+HSC দিয়ে চেক করো</Link>
          <Link href="/contact">যোগাযোগ করুন</Link>
        </div>
      </div>

      {/* Mobile: pushed to the very bottom of the footer, above the copyright line */}
      <div className="footer-social-mobile">
        <SocialIcons />
      </div>

      <div className="footer-bottom">© ২০২৬ Admission Info — সব স্বত্ব সংরক্ষিত।</div>
    </footer>
  );
}
