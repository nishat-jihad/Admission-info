// IndexNow — বদলানো পেজের URL Bing (ও IndexNow সাপোর্ট করা অন্য সার্চ ইঞ্জিন)-কে জানানোর স্ক্রিপ্ট।
//
// ব্যবহার (প্রজেক্টের রুট ফোল্ডার chance-hobe-ki থেকে):
//   node scripts/indexnow.mjs                      → নিচের DEFAULT_PATHS তালিকা পাঠায়
//   node scripts/indexnow.mjs /updates /news       → শুধু এই পেজগুলো পাঠায়
//   node scripts/indexnow.mjs --sitemap            → লাইভ sitemap.xml-এর সব URL পাঠায় (সাবধানে, বারবার নয়)
//
// নিয়ম:
//   • আগে সাইট Vercel-এ deploy করো, তারপর চালাও — Bing key ফাইল আর পেজ দুটোই ক্রল করে দেখে।
//   • শুধু যে পেজ নতুন/বদলানো/মুছে ফেলা হয়েছে সেগুলোই পাঠাও।
//   • সাড়া ২০০ মানে শুধু "URL পেয়েছে" — ইন্ডেক্স হওয়ার গ্যারান্টি নয়।

const HOST = "admissioninfo.vercel.app";
const KEY = "a51f8b41afd84758a94ab55ba528b68a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// সর্বশেষ বদলানো পেজ (JnU, কৃষি গুচ্ছ আপডেটের পর)। নতুন কাজ হলে এই তালিকা বদলে নাও।
const DEFAULT_PATHS = [
  "/updates",
  "/exam-dates",
  "/general-check",
  "/university/jnu",
  "/university/krishi",
];

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap পাওয়া যায়নি (HTTP ${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function toFullUrl(p) {
  if (/^https?:\/\//i.test(p)) return p;
  return `https://${HOST}${p.startsWith("/") ? p : "/" + p}`;
}

async function main() {
  const args = process.argv.slice(2);
  let urlList;
  if (args.includes("--sitemap")) urlList = await urlsFromSitemap();
  else if (args.length > 0) urlList = args.map(toFullUrl);
  else urlList = DEFAULT_PATHS.map(toFullUrl);

  // শুধু নিজের host-এর URL — অন্য host হলে IndexNow ফেরত দেবে (422)
  urlList = [...new Set(urlList)].filter((u) => new URL(u).host === HOST);
  if (urlList.length === 0) {
    console.error("পাঠানোর মতো কোনো URL নেই।");
    process.exit(1);
  }
  if (urlList.length > 10000) urlList = urlList.slice(0, 10000);

  console.log(`${urlList.length}টা URL পাঠানো হচ্ছে:`);
  urlList.forEach((u) => console.log("  " + u));

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  const meaning = {
    200: "OK — URL জমা হয়েছে",
    202: "Accepted — জমা হয়েছে, key যাচাই বাকি",
    400: "Bad request — ফরম্যাট ভুল",
    403: "Forbidden — key ফাইল পাওয়া যায়নি বা ভেতরের key মেলেনি (আগে deploy করেছ তো?)",
    422: "URL এই host-এর না, অথবা key স্কিমা মেলেনি",
    429: "Too many requests — বেশি পাঠানো হয়েছে, পরে চেষ্টা করো",
  };
  console.log(`\nসাড়া: HTTP ${res.status} — ${meaning[res.status] || res.statusText}`);
  process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
}

main().catch((e) => {
  console.error("ব্যর্থ:", e.message);
  process.exit(1);
});
