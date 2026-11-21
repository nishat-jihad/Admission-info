// ============================================================================
// অ্যাপের নোটিফিকেশন তালিকা (🔔 বেল)। শুধু শেষ MAX_NOTIFICATIONS (১৬) টা থাকে — নতুন এলে সবচেয়ে পুরনোটা বাদ।
// তিন জায়গা থেকে নোটিফিকেশন জমা হয় (একই নোটিফিকেশন একবারই থাকে):
//   ১) অ্যাপ খোলা থাকলে আসা নোটিফিকেশন  ২) ফোনের নোটিফিকেশন ট্রেতে থাকা নোটিফিকেশন
//   ৩) repo-র notifications.json (workflow যা পাঠিয়েছে) — অ্যাপ বন্ধ থাকলে মিস হওয়াগুলোও এখান থেকে আসে
// ============================================================================
import { NOTIF_FEED_URL } from "@/lib/appConfig";

export const MAX_NOTIFICATIONS = 16;
const KEY = "admissionInfoNotifications";
const EMPTY = { items: [], lastSeen: 0, clearedAt: 0 };

let state = EMPTY;
let loaded = false;
const listeners = new Set();

function load() {
  loaded = true;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null");
    if (raw && Array.isArray(raw.items)) {
      state = {
        items: raw.items.slice(0, MAX_NOTIFICATIONS),
        lastSeen: Number(raw.lastSeen) || 0,
        clearedAt: Number(raw.clearedAt) || 0,
      };
    }
  } catch (e) {
    /* সমস্যা নেই — খালি তালিকা দিয়ে শুরু */
  }
}

function commit(next) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* সমস্যা নেই */
  }
  listeners.forEach((fn) => fn());
}

export function getNotifState() {
  if (!loaded && typeof window !== "undefined") load();
  return state;
}
export function getServerNotifState() {
  return EMPTY;
}
export function subscribeNotifs(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// নোটিফিকেশন-প্যানেল খোলা/বন্ধ (হেডারের বেল, প্যানেল আর Android back বাটন একই জায়গা থেকে চলে)
let panelOpen = false;
const panelListeners = new Set();
export function getPanelOpen() {
  return panelOpen;
}
export function setPanelOpen(value) {
  if (panelOpen === value) return;
  panelOpen = value;
  panelListeners.forEach((fn) => fn());
}
export function subscribePanel(fn) {
  panelListeners.add(fn);
  return () => panelListeners.delete(fn);
}

function clean(n) {
  if (!n) return null;
  const title = String(n.title || "").trim();
  const body = String(n.body || "").trim();
  if (!title && !body) return null;
  return {
    id: String(n.id || `fp:${title}|${body}`),
    title,
    body,
    url: typeof n.url === "string" && n.url.startsWith("/") ? n.url : "",
    time: Number(n.time) || Date.now(),
  };
}

// একসাথে অনেকগুলো যোগ করা। আগে থেকে থাকা id বাদ, "সব মুছুন"-এর আগের পুরনোগুলো বাদ,
// নতুন → পুরনো সাজিয়ে শেষ ১৬টা রাখা।
export function addNotifications(list) {
  const cur = getNotifState();
  const have = new Set(cur.items.map((i) => i.id));
  const added = [];
  for (const raw of list || []) {
    const n = clean(raw);
    if (!n || have.has(n.id) || n.time <= cur.clearedAt) continue;
    have.add(n.id);
    added.push(n);
  }
  if (added.length === 0) return;
  const items = [...cur.items, ...added].sort((a, b) => b.time - a.time).slice(0, MAX_NOTIFICATIONS);
  commit({ ...cur, items });
}

// Firebase-এর নোটিফিকেশন অবজেক্ট (এসেছে / চাপা হয়েছে / ট্রেতে আছে) → আমাদের ফরম্যাট
export function fromFirebase(n) {
  const data = (n && n.data) || {};
  return {
    id: data.nid || "",
    title: (n && n.title) || "",
    body: (n && n.body) || "",
    url: data.url || "",
    time: Number(data.sentAt) || Date.now(),
  };
}

export function addFromFirebase(list) {
  addNotifications((list || []).map(fromFirebase));
}

export function markAllSeen() {
  const cur = getNotifState();
  const latest = cur.items.reduce((m, i) => Math.max(m, i.time), Date.now());
  if (cur.lastSeen >= latest) return;
  commit({ ...cur, lastSeen: latest });
}

export function clearAllNotifs() {
  const cur = getNotifState();
  const latest = cur.items.reduce((m, i) => Math.max(m, i.time), Date.now());
  commit({ items: [], lastSeen: latest, clearedAt: latest });
}

export function unreadCount(s) {
  return s.items.filter((i) => i.time > s.lastSeen).length;
}

// repo-র notifications.json থেকে তালিকা এনে মেলানো
export async function syncNotificationFeed() {
  if (!NOTIF_FEED_URL) return;
  try {
    const res = await fetch(`${NOTIF_FEED_URL}?t=${Math.floor(Date.now() / 60000)}`, { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data)) addNotifications(data);
  } catch (e) {
    /* ইন্টারনেট না থাকলে সমস্যা নেই — যা জমা আছে তাই দেখাবে */
  }
}
