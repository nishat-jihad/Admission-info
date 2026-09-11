import { universities } from "@/data/universities";

const SITE_URL = "https://admissioninfo.vercel.app";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/hsc-gpa-calculator",
    "/general-check",
    "/updates",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/updates" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const universityRoutes = Object.keys(universities).map((slug) => ({
    url: `${SITE_URL}/university/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...universityRoutes];
}
