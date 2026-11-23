// ============================================================================
// অ্যাপের "নতুন ভার্সন" ব্যবস্থা।
// GitHub Releases-এর সর্বশেষ রিলিজের ট্যাগ (যেমন v1.0.1) দেখে বর্তমান ভার্সনের সাথে মেলায়।
// নতুন থাকলে showUpdate(...) দিয়ে AppUpdatePrompt পপ-আপ দেখানো হয়।
// ============================================================================
import { CapacitorHttp } from "@capacitor/core";
import { APP_VERSION, APK_URL, GITHUB_REPO } from "@/lib/appConfig";
import { diagLog } from "@/lib/diag";

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

// সর্বশেষ রিলিজের ট্যাগ (যেমন v1.0.30) বের করা — GitHub API ব্যবহার না করে (API-র limit ঘণ্টায় ~৬০, ফোনের নেটে সহজেই শেষ হয়ে যায়)।
// github.com/<repo>/releases/latest পেজটা সর্বশেষ রিলিজের ট্যাগ-পেজে redirect করে; সেই শেষ URL থেকে ট্যাগ পড়া হয়।
// CapacitorHttp অ্যাপের নিজস্ব (native) রিকোয়েস্ট, তাই ব্রাউজারের CORS বাধা নেই।
async function latestTagViaWeb() {
  const res = await CapacitorHttp.get({
    url: `https://github.com/${GITHUB_REPO}/releases/latest`,
    headers: { Accept: "text/html" },
    responseType: "text",
    connectTimeout: 10000,
    readTimeout: 10000,
  });
  if (res.status < 200 || res.status >= 400) return "";
  const m1 = String(res.url || "").match(/\/releases\/tag\/([^/?#]+)/);
  if (m1) return decodeURIComponent(m1[1]);
  const m2 = String(res.data || "").match(/\/releases\/tag\/(v?[0-9][^"'/?#<\s]*)/);
  return m2 ? decodeURIComponent(m2[1]) : "";
}

// ফেরত দেয়: { status: "new" | "latest" | "error" | "off", info? }
export async function fetchLatestRelease() {
  if (!GITHUB_REPO) return { status: "off" };

  // ১) ওয়েব পেজ থেকে (limit নেই)
  try {
    const tag = await latestTagViaWeb();
    const version = tag.replace(/^v/i, "");
    if (version) {
      const base = `https://github.com/${GITHUB_REPO}/releases/download/${tag}`;
      const info = {
        version,
        notes: "",
        apkUrl: `${base}/admission-info.apk`,
        bundleUrl: `${base}/bundle.zip`,
      };
      return isNewer(version, APP_VERSION) ? { status: "new", info } : { status: "latest", info };
    }
  } catch (e) {
    /* ব্যর্থ হলে নিচের API পদ্ধতিতে যাবে */
  }

  // ২) বিকল্প: GitHub API (limit শেষ হলে ব্যর্থ হবে)
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

// ============================================================================
// bundle (সাইটের ফাইল) নামানো ও চালু করার অংশ — @capgo/capacitor-updater দিয়ে।
// নিয়ম:
//  • একই ভার্সন আগে নামানো থাকলে (অটো-আপডেটে) আবার নামানো হয় না, সেটাই চালু করা হয়।
//  • আগের ব্যর্থ/অসম্পূর্ণ/পুরনো bundle মুছে ফেলা হয়, যাতে আটকে না যায়।
//  • নামানো ব্যর্থ হলে একবার আবার চেষ্টা করে। এরপরও ব্যর্থ হলে error-এ "download:" বা "set:" লেখা থাকে,
//    তাই পপ-আপের "কারণ:" দেখেই বোঝা যায় কোন ধাপে সমস্যা।
// ============================================================================
const PENDING_KEY = "admissionInfoPendingBundle"; // {version, id} — নামানো আছে, কিন্তু এখনো চালু হয়নি
const FAIL_KEY = "admissionInfoBundleFail"; // {version, count} — চালু করে ফেরত চলে আসার হিসাব

function lsGet(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch (e) {
    return null;
  }
}
function lsSet(key, val) {
  try {
    if (val === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    /* localStorage না থাকলে সমস্যা নেই */
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const msg = (e) => String((e && (e.message || e.errorMessage)) || e || "").slice(0, 150);

async function getUpdater() {
  const { CapacitorUpdater } = await import("@capgo/capacitor-updater");
  return CapacitorUpdater;
}

async function listBundles(U) {
  try {
    const r = await U.list();
    return (r && r.bundles) || [];
  } catch (e) {
    return [];
  }
}

async function currentBundleId(U) {
  try {
    const r = await U.current();
    return r && r.bundle ? r.bundle.id : "";
  } catch (e) {
    return "";
  }
}

// এই ভার্সনের ঠিকঠাক নামানো bundle থাকলে সেটা ফেরত দেয়; বাকি পুরনো/ব্যর্থগুলো মুছে ফেলে।
async function findAndCleanup(U, version) {
  const curId = await currentBundleId(U);
  let reusable = null;
  for (const b of await listBundles(U)) {
    if (!b || !b.id || b.id === "builtin" || b.id === curId) continue;
    const ok = b.version === version && (b.status === "pending" || b.status === "success");
    if (ok && !reusable) {
      reusable = b;
      continue;
    }
    try {
      await U.delete({ id: b.id });
    } catch (e) {
      /* মুছতে না পারলে সমস্যা নেই */
    }
  }
  return reusable;
}

async function freshDownload(U, info) {
  let lastErr;
  for (let i = 0; i < 2; i++) {
    try {
      return await U.download({ url: info.bundleUrl, version: info.version });
    } catch (e) {
      lastErr = e;
      diagLog(`download চেষ্টা ${i + 1} ব্যর্থ: ` + msg(e));
      if (i === 0) await sleep(1500);
    }
  }
  throw new Error("download: " + msg(lastErr));
}

async function ensureBundle(U, info) {
  const found = await findAndCleanup(U, info.version);
  return found || (await freshDownload(U, info));
}

// "আপডেট করো" চাপলে: নামিয়ে (বা আগে নামানো থাকলে সেটা) সাথে সাথে চালু করে — অ্যাপ নিজে রিলোড হয়।
export async function installBundleUpdate(info) {
  if (!info.bundleUrl) throw new Error("bundle নেই");
  const U = await getUpdater();
  let bundle = await ensureBundle(U, info);
  diagLog(`install: bundle তৈরি id=${String(bundle.id).slice(0, 6)} v${bundle.version} status=${bundle.status}`);
  try {
    diagLog("install: set() ডাকছি (এরপর রিলোড হওয়ার কথা)");
    await U.set({ id: bundle.id });
    diagLog("install: set() ফিরেছে");
  } catch (e) {
    diagLog("install: set() ব্যর্থ: " + msg(e));
    // নামানো ফাইল নষ্ট থাকতে পারে — মুছে নতুন করে নামিয়ে আরেকবার
    try {
      await U.delete({ id: bundle.id });
    } catch (e2) {
      /* সমস্যা নেই */
    }
    bundle = await freshDownload(U, info);
    try {
      await U.set({ id: bundle.id });
    } catch (e3) {
      throw new Error("set: " + msg(e3));
    }
  }
  lsSet(PENDING_KEY, null);
}

// নোটিফিকেশনে চাপ দিয়ে অ্যাপ খুললে: নতুন ভার্সন থাকলে সাথে সাথে নামিয়ে চালু করে (অ্যাপ নিজে একবার রিলোড হয়)।
// ফেরত দেয় true — রিলোড শুরু হয়েছে; false — নতুন কিছু নেই বা ব্যর্থ (তখন যেমন ছিল তেমনই চলবে)।
export async function applyLatestNow() {
  try {
    const r = await fetchLatestRelease();
    if (r.status !== "new" || !r.info.bundleUrl) return false;
    await installBundleUpdate(r.info);
    return true;
  } catch (e) {
    return false;
  }
}

// অটো-আপডেট (কোনো পপ-আপ ছাড়া): নতুন ভার্সন চুপচাপ নামিয়ে রাখে।
// চালু হয় — অ্যাপ ব্যাকগ্রাউন্ডে গেলে বা পরেরবার খুললে (নিচের applyPendingUpdate / startUpdateWatcher)।
// ব্যর্থ হলে error ছোঁড়ে।
export async function downloadBundleForNextLaunch(info) {
  if (!info.bundleUrl) throw new Error("bundle নেই");
  // এই ভার্সন চালু করে দুইবার ফেরত চলে এসেছে (bundle ভাঙা) — আর চুপচাপ চেষ্টা নয়; হাতে চেক করলে পপ-আপ আসবে
  const fail = lsGet(FAIL_KEY);
  if (fail && fail.version === info.version && fail.count >= 2) return "skipped";
  const U = await getUpdater();
  const bundle = await ensureBundle(U, info);
  await U.next({ id: bundle.id });
  diagLog(`auto: v${info.version} নামানো, next() বসানো (id=${String(bundle.id).slice(0, 6)}, status=${bundle.status})`);
  lsSet(PENDING_KEY, { version: info.version, id: bundle.id });
  return "downloaded";
}

// নামানো থাকা নতুন bundle এখনই চালু করে (রিলোড হয়)। ফেরত দেয় true — রিলোড শুরু হয়েছে।
export async function applyPendingUpdate() {
  const p = lsGet(PENDING_KEY);
  if (!p) return false;
  // চলতি ভার্সনই যদি ওটা বা তার চেয়ে নতুন হয়, তবে হিসাব মিটে গেছে
  if (!isNewer(p.version, APP_VERSION)) {
    lsSet(PENDING_KEY, null);
    lsSet(FAIL_KEY, null);
    return false;
  }
  try {
    const U = await getUpdater();
    if ((await currentBundleId(U)) === p.id) return false;
    const b = (await listBundles(U)).find((x) => x.id === p.id);
    if (!b || b.status === "error") {
      // চালু হওয়ার পর ফেরত চলে এসেছে (rollback) — হিসাব রাখা
      diagLog(`rollback ধরা পড়েছে: v${p.version} bundle ${b ? "status=" + b.status : "তালিকায় নেই"}`);
      const fail = lsGet(FAIL_KEY);
      lsSet(FAIL_KEY, { version: p.version, count: fail && fail.version === p.version ? fail.count + 1 : 1 });
      lsSet(PENDING_KEY, null);
      return false;
    }
    diagLog(`applyPending: v${p.version}-এর জন্য set() ডাকছি`);
    await U.set({ id: p.id });
    return true;
  } catch (e) {
    lsSet(PENDING_KEY, null);
    return false;
  }
}

// অ্যাপ ব্যাকগ্রাউন্ডে গেলে (হোম/রিসেন্টে) নামানো bundle চালু করে — ইউজার কিছু টের পায় না।
// ফেরত দেয় বন্ধ করার ফাংশন।
export function startUpdateWatcher() {
  let cancelled = false;
  let handle = null;
  import("@capacitor/app")
    .then(async ({ App }) => {
      const h = await App.addListener("appStateChange", ({ isActive }) => {
        if (!isActive) setTimeout(() => applyPendingUpdate().catch(() => {}), 1500);
      });
      if (cancelled) h.remove();
      else handle = h;
    })
    .catch(() => {});
  return () => {
    cancelled = true;
    if (handle) handle.remove();
  };
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
