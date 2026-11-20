import { universities } from "@/data/universities";
import { news } from "@/data/news";

const SITE_URL = "https://admissioninfo.vercel.app";

// প্রতিবার build-এ new Date() দিলে Google বুঝে যায় তারিখটা আসল না, তাই lastmod-কে গুরুত্ব দেয় না।
// এখানে সবচেয়ে নতুন নিউজের তারিখ ব্যবহার হচ্ছে — নতুন নিউজ যোগ করলেই নিজে থেকে বদলাবে।
const latestNewsDate = news
  .map((n) => n.updated || n.date)
  .sort()
  .pop();
const LATEST = new Date(latestNewsDate || "2026-11-01");
const STATIC_DATE = new Date("2026-11-01");

export default function sitemap() {
  const dynamicRoutes = ["", "/updates", "/news", "/exam-dates"];
  const staticRoutes = [
    "",
    "/hsc-gpa-calculator",
    "/agri-cluster-calculator",
    "/general-check",
    "/exam-dates",
    "/updates",
    "/news",
    "/about",
    "/contact",
    "/privacy-policy",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: dynamicRoutes.includes(route) ? LATEST : STATIC_DATE,
  }));

  const universityRoutes = Object.keys(universities).map((slug) => ({
    url: `${SITE_URL}/university/${slug}`,
    lastModified: LATEST,
  }));

  const newsRoutes = news.map((item) => ({
    url: `${SITE_URL}/news/${item.slug}`,
    lastModified: new Date(item.updated || item.date),
  }));

  return [...staticRoutes, ...universityRoutes, ...newsRoutes];
}
