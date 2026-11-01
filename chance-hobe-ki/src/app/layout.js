import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import { Bangers, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${bangers.variable} ${notoBengali.variable}`}>
        {children}
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
      </body>
    </html>
  );
}
