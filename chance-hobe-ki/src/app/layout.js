import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import { Bangers, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import "../styles/popup-nav.css";
import "../styles/context-menu.css";
import "../styles/app.css";
import AppBootstrap from "@/components/AppBootstrap";
import { IS_APP } from "@/lib/appConfig";
import ApplyPopup from "@/components/ApplyPopup";
import CustomContextMenu from "@/components/CustomContextMenu";
import { updates } from "@/data/updates";
import { examDates } from "@/data/examDates";
import { buildAdmissionCalendar } from "@/lib/examCalendar";

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-bn",
});

const SITE_URL = "https://admissioninfo.vercel.app";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Admission Info",
  alternateName: "ভর্তি তথ্য",
  url: SITE_URL,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Admission Info",
  url: SITE_URL,
  logo: `${SITE_URL}/images/admission-info-logo.png`,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HSC GPA Calculator ও ভর্তি যোগ্যতা যাচাই ২০২৬-২৭ | Admission Info",
    template: "%s | Admission Info",
  },
  description:
    "SSC ও HSC-র GPA দিয়ে জানো কোন ভার্সিটি, ইঞ্জিনিয়ারিং ও মেডিকেলে আবেদন করা যাবে। বিনামূল্যে HSC GPA Calculator, ভর্তি যোগ্যতা যাচাই ও ২০২৬-২৭ ভর্তি পরীক্ষার তারিখ।",
  keywords: [
    "HSC GPA Calculator",
    "SSC HSC GPA দিয়ে ভর্তি যোগ্যতা",
    "ভার্সিটি ভর্তি যোগ্যতা যাচাই",
    "BUET admission requirement",
    "BUTEX admission requirement",
    "মেডিকেল ভর্তি পরীক্ষার তারিখ",
    "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার সময়সূচি ২০২৬-২৭",
    "চান্স হবে কিনা",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: SITE_URL,
    siteName: "Admission Info",
    title: "HSC GPA Calculator ও ভর্তি যোগ্যতা যাচাই ২০২৬-২৭ | Admission Info",
    description:
      "SSC ও HSC-র GPA দিয়ে কোন কোন ভার্সিটি, ইঞ্জিনিয়ারিং ও মেডিকেলে আবেদন করা যাবে তা যাচাই করো, সাথে ২০২৬-২৭ ভর্তি পরীক্ষার তারিখ — বিনামূল্যে।",
    images: [
      {
        url: "/images/admission-info-logo.png",
        width: 512,
        height: 512,
        alt: "Admission Info",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "HSC GPA Calculator ও ভর্তি যোগ্যতা যাচাই ২০২৬-২৭ | Admission Info",
    description:
      "SSC ও HSC-র GPA দিয়ে কোন কোন ভার্সিটিতে আবেদন করা যাবে তা যাচাই করো, সাথে ২০২৬-২৭ ভর্তি পরীক্ষার তারিখ — বিনামূল্যে।",
    images: ["/images/admission-info-logo.png"],
  },
};

// Pop-up-এ যে ভার্সিটির নাম আলাদা করে দেখাতে চাই (শুধু pop-up-এ বদলায়, বাকি পেজে নয়)।
// জাবি-র সব ইউনিটের আবেদন একসাথে শুরু হয়েছে, তাই ইউনিটের নাম ছাড়া শুধু ভার্সিটির নাম।
const POPUP_NAME_OVERRIDE = {
  ju_a: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (জাবি)",
};

export default function RootLayout({ children }) {
  // যেসব ভার্সিটির "Apply Now" লিংক আছে (APPLY_LINKS, Admission Calendar-এর সাথে একই) — pop-up-এর ডেটা।
  // কোনটার আবেদন এখন চলছে সেটা ব্রাউজারে বর্তমান সময় দেখে ঠিক হয়।
  const seen = new Set();
  const applyItems = buildAdmissionCalendar({ updates, examDates })
    .filter((b) => b.applyUrl && !seen.has(b.universityId) && seen.add(b.universityId))
    .map((b) => ({
      id: b.universityId,
      name:
        POPUP_NAME_OVERRIDE[b.universityId] ||
        (updates.find((u) => u.universityId === b.universityId) || {}).universityName ||
        b.shortName,
      applyUrl: b.applyUrl,
      application: b.application,
    }));

  return (
    <html lang="bn" className={IS_APP ? "is-app" : undefined}>
      <body className={`${bangers.variable} ${notoBengali.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <ApplyPopup items={applyItems} />
        {IS_APP ? (
          // অ্যাপে: ☰ মেনু/back বাটন/স্ট্যাটাস বার (AppBootstrap)। Analytics, Clarity, ডান-ক্লিক মেনু নেই।
          <AppBootstrap />
        ) : (
          <>
            <CustomContextMenu />
            <Analytics />
            <Script id="microsoft-clarity" strategy="afterInteractive">
              {`
            (function(c,l,a,r,i,t,y){
              c[a] = c[a] || function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ygp6jepq9e");
          `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
