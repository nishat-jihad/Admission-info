import { Bangers, Hind_Siliguri, Baloo_Da_2 } from "next/font/google";
import SplashScreen from "@/components/SplashScreen";
import { Analytics } from "@vercel/analytics/next"
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

export const metadata = {
  title: "Admission Info",
  description:
    "তোমার SSC আর HSC-র GPA দিয়ে তুমি কোন কোন ভার্সিটি, ইঞ্জিনিয়ারিং আর মেডিকেলে আবেদন করতে পারবে — সেটা এক নজরে জানিয়ে দেয় Admission Info",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${bangers.variable} ${hindSiliguri.variable} ${balooDa2.variable}`}>
        <SplashScreen>{children}</SplashScreen>
      </body>
    </html>
  );
}
