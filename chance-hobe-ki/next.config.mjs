// Android অ্যাপের বিল্ডে (NEXT_PUBLIC_APP=1) সাইটটা static ফাইল (out/ ফোল্ডার) হিসেবে বের হয়,
// যেটা Capacitor অ্যাপের ভেতরে ঢোকে। ওয়েবসাইটের (Vercel) বিল্ডে এই বদলগুলো কাজ করে না।
const isApp = process.env.NEXT_PUBLIC_APP === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isApp ? { output: "export", trailingSlash: true } : {}),
  // [ডায়াগনস্টিক — ক্র্যাশের কারণ খুঁজে পাওয়ার পর এই অংশ মুছে দিও]
  // অ্যাপ বিল্ডে JS ছোট (minify) না করা, যাতে error-এর লেখায় আসল ফাংশন/ফাইলের নাম আসে।
  ...(isApp
    ? {
        webpack: (config) => {
          config.optimization.minimize = false;
          return config;
        },
      }
    : {}),
  images: {
    ...(isApp ? { unoptimized: true } : {}),
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "thumb.wikimedia.org" },
      { protocol: "https", hostname: "wallpaperaccess.com" },
      { protocol: "https", hostname: "1.bp.blogspot.com" },
      { protocol: "https", hostname: "bdtalika.com" },
      { protocol: "https", hostname: "ecdn.dhakatribune.net" },
      { protocol: "https", hostname: "files.thedailycampus.com" },
      { protocol: "https", hostname: "just.edu.bd" },
      { protocol: "https", hostname: "ku.ac.bd" },
      { protocol: "https", hostname: "www.hstu.ac.bd" },
    ],
  },
};

export default nextConfig;
