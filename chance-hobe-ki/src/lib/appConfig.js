// ============================================================================
// অ্যাপ (Android) সংক্রান্ত সেটিংস।
// NEXT_PUBLIC_APP=1 দিয়ে বিল্ড করলে IS_APP সত্য হয় — তখন সাইটটা "অ্যাপ মোডে" চলে
// (নিচের বারের সাথে ☰ মেনু, footer নেই, নতুন হোম)। সাধারণ ওয়েবসাইটে এটা মিথ্যা, কিছুই বদলায় না।
// GitHub Actions (.github/workflows/build-apk.yml) নিচের ৩টা মান নিজে বসিয়ে দেয়।
// ============================================================================

export const IS_APP = process.env.NEXT_PUBLIC_APP === "1";

export const SITE_URL = "https://admissioninfo.vercel.app";

// অ্যাপের ভার্সন (package.json-এর version, workflow থেকে আসে)
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";

// "মালিক/রিপো-নাম" — workflow নিজে বসায়। এটা দিয়ে নতুন ভার্সন আছে কি না দেখা হয়।
export const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || "";

// সর্বশেষ APK-র সরাসরি ডাউনলোড লিংক (GitHub Releases)
export const APK_URL = GITHUB_REPO
  ? `https://github.com/${GITHUB_REPO}/releases/latest/download/admission-info.apk`
  : SITE_URL;

// ওয়েবসাইটের "অ্যাপ ডাউনলোড" বাটনের লিংক। ওয়েব বিল্ডে GITHUB_REPO ফাঁকা থাকে, তাই এখানে সরাসরি রিপো-নাম বসাও।
const WEB_APK_REPO = GITHUB_REPO || "nishat-jihad/Admission-info";
export const WEB_APK_URL = `https://github.com/${WEB_APK_REPO}/releases/latest/download/admission-info.apk`;
