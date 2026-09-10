/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
