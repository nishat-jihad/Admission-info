// ============================================================================
// অ্যাপ-আপডেট ডায়াগনস্টিক লগ (সমস্যা ধরার জন্য)।
// লগ localStorage-এ জমে — নতুন bundle চালু হয়ে ফেরত চলে গেলেও লগ থেকে যায়
// (দুই bundle-ই একই origin-এ চলে), তাই ফেরত যাওয়ার কারণ পরে দেখা যায়।
// মেনু → "আপডেট লগ দেখো" থেকে দেখা ও কপি করা যায়।
// layout.js-এর শুরুর স্ক্রিপ্টও একই KEY ও একই ফরম্যাটে লেখে।
// ============================================================================
import { APP_VERSION } from "@/lib/appConfig";

export const DIAG_KEY = "admissionInfoDiag";
const MAX = 150;

export function diagGet() {
  try {
    const a = JSON.parse(localStorage.getItem(DIAG_KEY) || "[]");
    return Array.isArray(a) ? a : [];
  } catch (e) {
    return [];
  }
}

export function diagLog(m) {
  try {
    let a = diagGet();
    a.push({ t: Date.now(), v: APP_VERSION, m: String(m).slice(0, 300) });
    if (a.length > MAX) a = a.slice(-MAX);
    localStorage.setItem(DIAG_KEY, JSON.stringify(a));
  } catch (e) {
    /* লগ লিখতে না পারলে অ্যাপের কাজে বাধা নেই */
  }
}

export function diagClear() {
  try {
    localStorage.removeItem(DIAG_KEY);
  } catch (e) {
    /* সমস্যা নেই */
  }
}

export function diagText() {
  return diagGet()
    .map((x) => {
      let time = "";
      try {
        time = new Date(x.t).toLocaleTimeString("en-GB");
      } catch (e) {
        time = String(x.t);
      }
      return `${time} [v${x.v}] ${x.m}`;
    })
    .join("\n");
}

const em = (e) => String((e && (e.message || e.errorMessage)) || e || "").slice(0, 120);

// notifyAppReady-র পরে একবার: প্লাগইনের ভার্সন, চলতি bundle, সব bundle-এর অবস্থা, আগের ব্যর্থ আপডেট — সব লগে।
// এটা শুধু পড়ে, কিছু বদলায় না; কোনো ধাপ ব্যর্থ হলে বাকিগুলো চলে।
export async function diagProbe(U) {
  try {
    const r = await U.getPluginVersion();
    diagLog("native plugin version: " + (r && r.version));
  } catch (e) {
    diagLog("pluginVersion err: " + em(e));
  }
  try {
    const r = await U.current();
    const b = r && r.bundle;
    diagLog("current bundle: " + (b ? `${b.id} v${b.version} ${b.status}` : "?") + " | native: " + (r && r.native));
  } catch (e) {
    diagLog("current err: " + em(e));
  }
  try {
    const r = await U.list();
    const l = (r && r.bundles) || [];
    diagLog("bundles: " + (l.length ? l.map((b) => `${b.version}/${b.status}/${String(b.id || "").slice(0, 6)}`).join(", ") : "(none)"));
  } catch (e) {
    diagLog("list err: " + em(e));
  }
  try {
    const r = await U.getFailedUpdate();
    if (r && r.bundle) diagLog(`FAILED update recorded: v${r.bundle.version} status=${r.bundle.status}`);
    else diagLog("no failed update recorded");
  } catch (e) {
    diagLog("getFailedUpdate err: " + em(e));
  }
  if (typeof window !== "undefined" && !window.__diagEv) {
    window.__diagEv = true;
    ["updateAvailable", "downloadComplete", "downloadFailed", "updateFailed", "appReady", "appReloaded", "noNeedUpdate"].forEach((n) => {
      try {
        const p = U.addListener(n, (d) => diagLog("event " + n + ": " + JSON.stringify(d || {}).slice(0, 160)));
        if (p && p.catch) p.catch(() => {});
      } catch (e) {
        /* এই নামের ইভেন্ট না থাকলে সমস্যা নেই */
      }
    });
  }
}

// ---- লগ প্যানেল খোলা/বন্ধ (মেনুর বাটন আর প্যানেল এই একই জায়গা থেকে চলে) ----
let panelOpen = false;
const panelListeners = new Set();
export const getDiagPanelOpen = () => panelOpen;
export function setDiagPanelOpen(v) {
  if (panelOpen === v) return;
  panelOpen = v;
  panelListeners.forEach((fn) => fn());
}
export function subscribeDiagPanel(fn) {
  panelListeners.add(fn);
  return () => panelListeners.delete(fn);
}
