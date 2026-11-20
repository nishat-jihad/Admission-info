const SITE_URL = "https://admissioninfo.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // হোমের ?q= ও ?category= ফিল্টার URL গুলো আলাদা পেজ নয়, তাই ক্রল থেকে বাদ
        disallow: ["/*?q=", "/*?category="],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
