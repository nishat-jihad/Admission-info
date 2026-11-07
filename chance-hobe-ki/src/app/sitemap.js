import { universities } from "@/data/universities";
import { news } from "@/data/news";

const SITE_URL = "https://admissioninfo.vercel.app";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/hsc-gpa-calculator",
    "/general-check",
    "/exam-dates",
    "/updates",
    "/news",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/updates" || route === "/news" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const universityRoutes = Object.keys(universities).map((slug) => ({
    url: `${SITE_URL}/university/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const newsRoutes = news.map((item) => ({
    url: `${SITE_URL}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...universityRoutes, ...newsRoutes];
}
