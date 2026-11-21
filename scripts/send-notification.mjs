// ============================================================================
// অ্যাপের সব ইউজারকে (topic "all") পুশ নোটিফিকেশন পাঠায়। GitHub Actions থেকে চলে।
//
// কখন পাঠায়:
//   • main-এ commit করলে — শুধু যদি commit message-এর শুরুতে [notify] লেখা থাকে।
//     [notify] বাদে commit message-এর প্রথম লাইন = টাইটেল, "Extended description" = নিচের লেখা।
//     Extended description না দিলে টাইটেল "Admission Info", নিচের লেখা = প্রথম লাইন।
//   • হাতে Run workflow চালালে — শুধু যদি "notify" টিক দেওয়া থাকে। লেখা = notes ঘর।
// Secret FIREBASE_SERVICE_ACCOUNT_JSON না থাকলে কিছু না করেই বেরিয়ে যায়।
// ============================================================================
import { createSign } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const {
  FIREBASE_SERVICE_ACCOUNT_JSON: saRaw = "",
  EVENT_NAME = "",
  COMMIT_MESSAGE = "",
  INPUT_NOTIFY = "",
  INPUT_NOTES = "",
} = process.env;

function decideText() {
  if (EVENT_NAME === "workflow_dispatch") {
    if (INPUT_NOTIFY !== "true") return null;
    return INPUT_NOTES.trim() || "অ্যাপের নতুন আপডেট এসেছে।";
  }
  const m = COMMIT_MESSAGE.match(/^\s*\[notify\]\s*([\s\S]*)$/i);
  if (!m) return null;
  return m[1].trim() || "অ্যাপের নতুন আপডেট এসেছে।";
}

const text = decideText();
if (!text) {
  console.log("এবার নোটিফিকেশন পাঠানো হচ্ছে না (commit message-এ [notify] নেই বা notify টিক নেই)।");
  process.exit(0);
}
if (!saRaw.trim()) {
  console.log("::warning::FIREBASE_SERVICE_ACCOUNT_JSON secret নেই — নোটিফিকেশন পাঠানো হলো না।");
  process.exit(0);
}

const sa = JSON.parse(saRaw);
const b64url = (x) => Buffer.from(typeof x === "string" ? x : JSON.stringify(x)).toString("base64url");

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url({ alg: "RS256", typ: "JWT" }) +
    "." +
    b64url({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    });
  const signature = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) throw new Error("টোকেন পাওয়া গেল না: " + JSON.stringify(data));
  return data.access_token;
}

// লেখার প্রথম লাইন = টাইটেল, বাকিটা = নিচের লেখা (body)।
// শুধু এক লাইন থাকলে টাইটেল হবে "Admission Info" আর সেই লাইনটাই body।
const lines = text.split(/\r?\n/);
const first = lines[0].trim();
const rest = lines.slice(1).join(" ").replace(/\s+/g, " ").trim();
const title = (rest ? first : "Admission Info").slice(0, 100);
const body = (rest || first).replace(/\s+/g, " ").slice(0, 200);
// প্রতিটা নোটিফিকেশনের নিজস্ব id + পাঠানোর সময় — অ্যাপের 🔔 তালিকায় একই নোটিফিকেশন দুইবার না আসার জন্য
const sentAt = Date.now();
const nid = sentAt.toString(36) + Math.random().toString(36).slice(2, 6);
const token = await getAccessToken();
const res = await fetch(`https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    message: {
      topic: "all",
      notification: { title, body },
      data: { nid, sentAt: String(sentAt) },
      android: { priority: "HIGH" },
    },
  }),
});
const out = await res.text();
if (!res.ok) {
  console.error("নোটিফিকেশন পাঠানো ব্যর্থ:", res.status, out);
  process.exit(1);
}
console.log("নোটিফিকেশন পাঠানো হয়েছে:", title, "|", body);

// অ্যাপের 🔔 নোটিফিকেশন তালিকা: repo-র মূল ফোল্ডারের notifications.json-এ শুধু শেষ ১৬টা রাখা।
// (workflow-র পরের ধাপ এই ফাইল commit করে দেয়; অ্যাপ বন্ধ থাকলেও মিস হওয়া নোটিফিকেশন তাই তালিকায় আসে)
const FEED_FILE = "notifications.json";
const FEED_MAX = 16;
let feed = [];
try {
  if (existsSync(FEED_FILE)) feed = JSON.parse(readFileSync(FEED_FILE, "utf8"));
  if (!Array.isArray(feed)) feed = [];
} catch (e) {
  feed = [];
}
feed.unshift({ id: nid, title, body, time: sentAt });
writeFileSync(FEED_FILE, JSON.stringify(feed.slice(0, FEED_MAX), null, 2) + "\n");
console.log("notifications.json আপডেট হয়েছে (শেষ", FEED_MAX, "টা)।");
