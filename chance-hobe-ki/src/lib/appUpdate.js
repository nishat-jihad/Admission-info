// ============================================================================
// অ্যাপের "নতুন ভার্সন" ব্যবস্থা।
// GitHub Releases-এর সর্বশেষ রিলিজের ট্যাগ (যেমন v1.0.1) দেখে বর্তমান ভার্সনের সাথে মেলায়।
// নতুন থাকলে showUpdate(...) দিয়ে AppUpdatePrompt পপ-আপ দেখানো হয়।
// ============================================================================
import { APP_VERSION, APK_URL, GITHUB_REPO } from "@/lib/appConfig";

// "1.2.3" বনাম "1.2.10" তুলনা
export function isNewer(latest, current) {
  const a = latest.split(".").map((n) => parseInt(n, 10) || 0);
  const b = current.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] || 0) > (b[i] || 0)) return true;
    if ((a[i] || 0) < (b[i] || 0)) return false;
  }
  return false;
}

// ফেরত দেয়: { status: "new" | "latest" | "error" | "off", info? }
export async function fetchLatestRelease() {
  if (!GITHUB_REPO) return { status: "off" };
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return { status: "error" };
    const data = await res.json();
    const version = String(data.tag_name || "").replace(/^v/i, "");
    if (!version) return { status: "error" };
    const assets = data.assets || [];
    const apk = assets.find((a) => a.name === "admission-info.apk");
    const bundle = assets.find((a) => a.name === "bundle.zip");
    const info = {
      version,
      notes: String(data.body || "").trim(),
      apkUrl: apk ? apk.browser_download_url : APK_URL,
      bundleUrl: bundle ? bundle.browser_download_url : "",
    };
    return isNewer(version, APP_VERSION) ? { status: "new", info } : { status: "latest", info };
  } catch (e) {
    return { status: "error" };
  }
}

// অ্যাপের ভেতরেই নতুন ভার্সন (সাইটের ফাইলগুলো) নামিয়ে চালু করা — APK ইন্সটল লাগে না।
// সফল হলে অ্যাপ নিজে নতুন করে লোড হয়। ব্যর্থ হলে error ছোঁড়ে (পপ-আপ তখন APK ডাউনলোডের লিংক দেখায়)।
export async function installBundleUpdate(info) {
  if (!info.bundleUrl) throw new Error("bundle নেই");
  const { CapacitorUpdater } = await import("@capgo/capacitor-updater");
  const bundle = await CapacitorUpdater.download({ url: info.bundleUrl, version: info.version });
  await CapacitorUpdater.set({ id: bundle.id });
}

// ---- পপ-আপের অবস্থা (খোলা/বন্ধ) ----
let current = null;
const listeners = new Set();

export function getUpdateInfo() {
  return current;
}
export function showUpdate(info) {
  current = info;
  listeners.forEach((fn) => fn());
}
export function hideUpdate() {
  showUpdate(null);
}
export function subscribeUpdate(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// ---- "পরে" চাপলে ২৪ ঘণ্টা ওই ভার্সনের পপ-আপ আর আসে না ----
const SNOOZE_KEY = "admissionInfoUpdateSnooze";

export function isSnoozed(version) {
  try {
    const v = JSON.parse(localStorage.getItem(SNOOZE_KEY) || "null");
    return !!v && v.version === version && v.until > Date.now();
  } catch (e) {
    return false;
  }
}
export function snooze(version) {
  try {
    localStorage.setItem(SNOOZE_KEY, JSON.stringify({ version, until: Date.now() + 24 * 3600 * 1000 }));
  } catch (e) {
    /* localStorage না থাকলে সমস্যা নেই */
  }
}
