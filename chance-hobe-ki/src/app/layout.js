import { Analytics } from '@vercel/analytics/react';
import { Bangers, Hind_Siliguri, Baloo_Da_2 } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

const balooDa2 = Baloo_Da_2({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const SITE_URL = "https://admissioninfo.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Admission Info — HSC GPA Calculator ও ভর্তি যোগ্যতা যাচাই",
    template: "%s | Admission Info",
  },
  description:
    "তোমার SSC আর HSC-র GPA দিয়ে তুমি কোন কোন ভার্সিটি, ইঞ্জিনিয়ারিং আর মেডিকেলে আবেদন করতে পারবে — সেটা এক নজরে জানিয়ে দেয় Admission Info। বিনামূল্যে HSC GPA Calculator ও admission eligibility checker।",
  keywords: [
    "HSC GPA Calculator",
    "SSC HSC GPA দিয়ে ভর্তি যোগ্যতা",
    "ভার্সিটি ভর্তি যোগ্যতা যাচাই",
    "BUET admission requirement",
    "BUTEX admission requirement",
    "মেডিকেল ভর্তি পরীক্ষার তারিখ",
    "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার সময়সূচি ২০২৬",
    "চান্স হবে কিনা",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: SITE_URL,
    siteName: "Admission Info",
    title: "Admission Info — HSC GPA Calculator ও ভর্তি যোগ্যতা যাচাই",
    description:
      "SSC ও HSC-র GPA দিয়ে কোন কোন ভার্সিটি, ইঞ্জিনিয়ারিং ও মেডিকেলে আবেদন করা যাবে তা যাচাই করো — বিনামূল্যে ও তাৎক্ষণিক।",
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
    title: "Admission Info — HSC GPA Calculator ও ভর্তি যোগ্যতা যাচাই",
    description:
      "SSC ও HSC-র GPA দিয়ে কোন কোন ভার্সিটিতে আবেদন করা যাবে তা যাচাই করো — বিনামূল্যে।",
    images: ["/images/admission-info-logo.png"],
  },
  // TODO: Google Search Console থেকে পাওয়া verification কোডটি এখানে বসাও
  // (Settings > Ownership verification > HTML tag > শুধু content="..." ভ্যালুটুকু নাও)
  verification: {
    google: "PASTE_YOUR_GOOGLE_SITE_VERIFICATION_CODE_HERE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${bangers.variable} ${hindSiliguri.variable} ${balooDa2.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
