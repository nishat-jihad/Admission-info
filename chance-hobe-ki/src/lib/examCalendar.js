// "Admission Calendar" (/exam-dates) পেজের ডেটা বানানো আর কাউন্টডাউন হিসাব করার কাজ এই ফাইলে।
//
// ডেটার উৎস (নতুন করে কোথাও তারিখ লিখতে হবে না):
//   • src/data/updates.js   — মূল উৎস: সব ইউনিট, পরীক্ষার তারিখ + সময়, আবেদনের শুরু-শেষ।
//   • src/data/examDates.js — শর্ট নাম (DU, RU...) ও ক্যাটাগরি; আর updates-এ যে ভার্সিটি নেই
//                             সেটার জন্য fallback।
// তাই updates.js বা examDates.js-এ তারিখ বদলালেই এই পেজেও নিজে থেকে বদলে যাবে।
//
// সময়ের হিসাব সবসময় বাংলাদেশ সময় (UTC+6) ধরে — ভিজিটর যে দেশ/টাইমজোনেই থাকুক।

const BD_OFFSET_MS = 6 * 60 * 60 * 1000; // বাংলাদেশে DST নেই
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export function bnToEn(value) {
  return String(value ?? "").replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

const MONTH_BN = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];
const MONTH_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "১২ ডিসেম্বর ২০২৬" | "০১ ও ০৯ জানুয়ারি" | "২৪ থেকে ২৮ জানুয়ারি" | "17-18 জানুয়ারি"
// মাসের নামের পরে আর কোনো বাংলা অক্ষর থাকলে (যেমন "নভেম্বরের মধ্যে") সেটাকে নিশ্চিত তারিখ ধরা হয় না।
const DATE_RE = new RegExp(
  "(\\d{1,2}(?:\\s*(?:ও|থেকে|-|–|—|,)\\s*\\d{1,2})*)\\s*(" +
    MONTH_BN.join("|") +
    ")(?![\\u0980-\\u09FF])(?:\\s*,?\\s*(\\d{4}))?"
);

const TIME_RE = /(সকাল|ভোর|দুপুর|বিকেল|বিকাল|সন্ধ্যা|রাত)\s*(\d{1,2})(?:[:.](\d{2}))?/;

const pad2 = (n) => String(n).padStart(2, "0");

// "সকাল ১১:০০টা" / "বিকেল ৩টা" / "রাত ১১:৫৯টা" → { hour (0-23), min }
function parseTime(text) {
  const m = bnToEn(text).match(TIME_RE);
  if (!m) return null;
  const period = m[1];
  const h = Number(m[2]);
  const min = m[3] ? Number(m[3]) : 0;
  let hour;
  if (period === "সকাল" || period === "ভোর") hour = h === 12 ? 0 : h;
  else if (period === "দুপুর") hour = h === 12 ? 12 : h < 6 ? h + 12 : h;
  else if (period === "রাত") hour = h === 12 ? 0 : h >= 6 && h < 12 ? h + 12 : h;
  else hour = h < 12 ? h + 12 : h; // বিকেল / বিকাল / সন্ধ্যা
  return { hour, min };
}

// তারিখের টেক্সট থেকে দিন/মাস/বছর বের করা। বছর না থাকলে সেশন অনুযায়ী ধরা হয়
// (২০২৬-২৭ সেশনে জুলাই–ডিসেম্বর = ২০২৬, জানুয়ারি–জুন = ২০২৭)।
function parseDateText(text, sessionStartYear) {
  const m = bnToEn(text).match(DATE_RE);
  if (!m) return null;
  const nums = m[1].match(/\d+/g).map(Number);
  const mon = MONTH_BN.indexOf(m[2]);
  const year = m[3] ? Number(m[3]) : mon >= 6 ? sessionStartYear : sessionStartYear + 1;
  const isRange = nums.length >= 2 && /থেকে|-|–|—/.test(m[1]);
  let days = nums;
  if (isRange) {
    const [a, b] = [nums[0], nums[nums.length - 1]];
    days = b - a <= 14 && b >= a ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : [a, b];
  }
  return { days, isRange, first: nums[0], last: nums[nums.length - 1], mon, year };
}

function bdInstant(year, mon, day, hour = 0, min = 0, sec = 0) {
  return Date.UTC(year, mon, day, hour, min, sec) - BD_OFFSET_MS;
}

// শিরোনাম থেকে সেশনের শুরুর বছর ("২০২৬-২৭" → 2026)
function sessionYearFrom(title) {
  const m = bnToEn(title).match(/(\d{4})\s*[-–]\s*\d{2}/);
  return m ? Number(m[1]) : 2026;
}

function formatDateDisplay(p) {
  const d = p.isRange
    ? `${pad2(p.first)}-${pad2(p.last)}`
    : p.days.map(pad2).join(" & ");
  return `${d} ${MONTH_EN[p.mon]} ${p.year}`;
}

function formatTimeDisplay(t) {
  const h12 = t.hour % 12 === 0 ? 12 : t.hour % 12;
  return `${pad2(h12)}:${pad2(t.min)} ${t.hour >= 12 ? "pm" : "am"}`;
}

// ---------- ইউনিটের নাম ছোট করা ----------
const LETTER_MAP = { এ: "A", বি: "B", সি: "C", ডি: "D", ই: "E", এফ: "F", জি: "G", এইচ: "H" };
const LABEL_MAP = { আইবিএ: "IBA" };

function toLetter(token) {
  const m = String(token).trim().match(/^([^\d]+)(\d*)$/);
  if (!m) return token;
  return (LETTER_MAP[m[1].trim()] || m[1].trim()) + m[2];
}

// "'বি' ইউনিট (বাণিজ্য)" → { label: "B", note: "বাণিজ্য" }
// "ভর্তি পরীক্ষা" → { label: "", note: "" }  (শুধু ভার্সিটির নামই দেখাবে)
function unitInfo(unitRaw) {
  const raw = bnToEn(unitRaw).trim();
  const short = (s) => (s && s.length <= 16 ? s : "");

  const quoted = [...raw.matchAll(/'([^']+)'/g)].map((m) => toLetter(m[1]));
  if (quoted.length) {
    let rest = raw
      .replace(/'[^']+'/g, " ")
      .replace(/ইউনিট/g, " ")
      .replace(/[()—–]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (rest === "ও") rest = "";
    rest = rest.replace(/^ও\s+/, "").replace(/\s+ও$/, "").trim();
    return { label: quoted.join(", "), note: short(rest) };
  }

  const paren = (raw.match(/\(([^)]*)\)/) || [])[1] || "";

  if (/^ভর্তি পরীক্ষা/.test(raw)) {
    const tokens = paren.match(/\b[A-Z][A-Z0-9]*\b/g);
    if (tokens) return { label: tokens.join(", "), note: "" };
    return { label: "", note: short(paren.trim()) };
  }

  const pre = raw.split("(")[0].trim();
  return { label: LABEL_MAP[pre] || pre, note: short(paren.trim()) };
}

// ---------- আবেদনের শুরু/শেষ ----------
// একটাই নির্দিষ্ট তারিখ থাকলে সময়ের মুহূর্ত (epoch ms) দেয়; "শীঘ্রই জানানো হবে", "সম্ভাব্য" বা
// রেঞ্জ হলে null (অর্থাৎ এখনো নিশ্চিত না)।
function parseMoment(text, sessionStartYear, endOfDay) {
  if (!text || /শীঘ্রই|সম্ভাব্য/.test(text)) return null;
  const p = parseDateText(text, sessionStartYear);
  if (!p || p.days.length !== 1) return null;
  const t = parseTime(text);
  if (t) return bdInstant(p.year, p.mon, p.first, t.hour, t.min);
  return endOfDay
    ? bdInstant(p.year, p.mon, p.first, 23, 59, 59)
    : bdInstant(p.year, p.mon, p.first, 0, 0, 0);
}

const isUnknownText = (s) => !s || /শীঘ্রই/.test(s) || !/[\d০-৯]/.test(s);

// যে ভার্সিটির আবেদন সত্যিই চালু হয়েছে, শুধু তাদের লিংক এখানে থাকবে।
// নতুন ভার্সিটির আবেদন শুরু হলে এখানে universityId (updates.js-এর universityId) আর লিংক
// যোগ করলেই "আবেদন করুন" বাটন আর "আবেদন শুরু হয়েছে" অবস্থা চালু হয়ে যাবে।
// এখানে যাদের নাম নেই, তাদের আবেদনের তারিখ ডেটায় থাকলেও অবস্থা "আবেদন শুরু হয়নি" দেখাবে
// (কারণ তাদের আবেদন আসলে এখনো চালু হয়নি, তারিখগুলো সম্ভাব্য)।
export const APPLY_LINKS = {
  du: "https://admission.eis.du.ac.bd/",
  ru: "https://admission.ru.ac.bd/",
  kuet: "https://admission.kuet.ac.bd/",
  // BUET: আবেদন শুরু ১ ডিসেম্বর ২০২৬ সকাল ১০টা (বিজ্ঞপ্তি অনুযায়ী অনলাইন আবেদনের ওয়েবসাইট www.buet.ac.bd)
  buet: "https://www.buet.ac.bd/",
  // JU: আবেদন শুরু ২২ নভেম্বর ২০২৬ সকাল ১০টা — তার আগে "আবেদন শুরু হয়নি", সময় হলে নিজে থেকে বাটন আসবে
  ju_a: "https://admission.juniv.edu/",
  ju_d: "https://admission.juniv.edu/",
};

// কোন সারির ইউনিটের জন্য বিস্তারিত পেজ (/university/[slug]) আছে, সেটা ঠিক করার নিয়ম।
// - এখানে যে ভার্সিটির নাম নেই: তার সব সারি নিজের পেজে যাবে (যদি পেজ থাকে)।
// - এখানে যাদের নাম আছে: শুধু লেখা ইউনিটগুলোর পেজ আছে — বাকি সারিতে কোনো লিংক থাকবে না।
//   (ডানে পেজের slug, যেটা src/data/universities.js-এর key)
const UNIT_PAGES = {
  du: { A: "du" },
  ru: { C: "ru" },
  cu: { A: "cu" },
  jnu: { A: "jnu" },
  cou: { A: "cou" },
  bup: { D: "bup" }, // শুধু FST ('ডি' ইউনিট)-এর পেজ আছে
  ku_a: { A: "ku_a", B: "ku_b", "A, B": "ku_a" },
};

function pageIdFor(universityId, label, pageIds) {
  const map = UNIT_PAGES[universityId];
  const id = map ? map[label] : universityId;
  return id && pageIds.includes(id) ? id : null;
}

const CATEGORY_MAP = { versity: "university", university: "university", engineering: "engineering", medical: "medical" };

function shortNameOf(universityId, universityName, examDates) {
  const ex = examDates.find((e) => e.universityId === universityId);
  if (ex && ex.shortName) return ex.shortName;
  const paren = String(universityName || "").match(/\(([^)]+)\)/);
  return paren ? paren[1] : universityName || universityId;
}

function buildRows(schedule, sessionYear) {
  const rows = [];
  (schedule || []).forEach((r, i) => {
    const p = parseDateText(r.date, sessionYear);
    if (!p) return; // "পরীক্ষার কেন্দ্র" টাইপের যে সারিতে তারিখ নেই, সেটা বাদ
    const t = parseTime(r.time || "") || parseTime(r.date || "");
    const info = unitInfo(r.unit);
    rows.push({
      key: `${i}-${r.unit}`,
      label: info.label,
      note: info.note,
      tentative: !!r.tentative,
      dateText: formatDateDisplay(p) + (t ? `, ${formatTimeDisplay(t)}` : ""),
      hasTime: !!t,
      instants: p.days.map((d) => bdInstant(p.year, p.mon, d, t ? t.hour : 0, t ? t.min : 0)),
    });
  });
  rows.sort((a, b) => a.instants[0] - b.instants[0]);
  return rows;
}

// ---------- মূল ফাংশন: সার্ভারে একবার চালানো হয়, ক্লায়েন্টে শুধু ছোট ডেটা যায় ----------
// pageIds = যেসব ভার্সিটির বিস্তারিত পেজ আছে তাদের slug-এর তালিকা (universities.js-এর key)।
export function buildAdmissionCalendar({ updates = [], examDates = [], pageIds = [] }) {
  const blocks = [];
  const usedShortNames = new Set();

  updates.forEach((u) => {
    const sessionYear = sessionYearFrom(u.title);
    const rows = buildRows(u.schedule, sessionYear);
    if (rows.length === 0) return;
    rows.forEach((r) => {
      r.pageId = pageIdFor(u.universityId, r.label, pageIds);
    });
    const shortName = shortNameOf(u.universityId, u.universityName, examDates);
    const ex = examDates.find((e) => e.universityId === u.universityId);
    // একই ভার্সিটির একাধিক ইউনিটের আলাদা আপডেট (যেমন JU-এর A ও D) একই কার্ডে মিলে যাবে
    const same = blocks.find((blk) => blk.shortName === shortName);
    if (same) {
      same.rows.push(...rows);
      same.rows.sort((x, y) => x.instants[0] - y.instants[0]);
      return;
    }
    usedShortNames.add(shortName);
    blocks.push({
      id: u.id,
      universityId: u.universityId,
      shortName,
      category: (ex && ex.category) || CATEGORY_MAP[u.category] || "university",
      applyUrl: APPLY_LINKS[u.universityId] || null,
      rows,
      application: {
        startText: u.applicationStart || "",
        endText: u.applicationEnd || "",
        startAt: parseMoment(u.applicationStart, sessionYear, false),
        endAt: parseMoment(u.applicationEnd, sessionYear, true),
        confirmed: Boolean(APPLY_LINKS[u.universityId]),
      },
    });
  });

  // updates.js-এ নেই কিন্তু examDates.js-এ আছে — এমন ভার্সিটির fallback
  // (একই shortName আগেই এসে গেলে বাদ, যেমন KU-এর ku_b, HSTU-এর hstu_b)।
  examDates.forEach((e) => {
    if (usedShortNames.has(e.shortName)) return;
    const rows = buildRows(e.schedule, 2026);
    if (rows.length === 0) return;
    rows.forEach((r) => {
      r.pageId = pageIdFor(e.universityId, r.label, pageIds);
    });
    usedShortNames.add(e.shortName);
    blocks.push({
      id: e.id,
      universityId: e.universityId,
      shortName: e.shortName,
      category: e.category,
      applyUrl: APPLY_LINKS[e.universityId] || null,
      rows,
      application: {
        startText: e.applicationStart || "",
        endText: e.applicationEnd || "",
        startAt: parseMoment(e.applicationStart, 2026, false),
        endAt: parseMoment(e.applicationEnd, 2026, true),
        confirmed: Boolean(APPLY_LINKS[e.universityId]),
      },
    });
  });

  // ভার্সিটির নামে (আবেদনের টেবিলে) লিংক দেওয়ার জন্য: কোনো একটা সারির পেজ থাকলে সেটাই, না থাকলে null
  blocks.forEach((b) => {
    b.pageId = (b.rows.find((r) => r.pageId) || {}).pageId || null;
  });

  // যার পরীক্ষা আগে, সে উপরে (স্ক্রিনশটের অ্যাপের মতো)
  blocks.sort((a, b) => a.rows[0].instants[0] - b.rows[0].instants[0]);
  return blocks;
}

// ---------- রানটাইম হিসাব (ক্লায়েন্টে, বর্তমান সময় অনুযায়ী) ----------
const bdDayIndex = (ms) => Math.floor((ms + BD_OFFSET_MS) / DAY_MS);

// শুধু দিন + ঘণ্টা — মিনিট দেখানো হয় না।
export function getRemaining(row, nowMs) {
  if (!row.hasTime) {
    // সময় জানা নেই: শুধু দিন গণনা (বাংলাদেশের তারিখ ধরে)
    const today = bdDayIndex(nowMs);
    const next = row.instants.map(bdDayIndex).find((d) => d >= today);
    if (next === undefined) return { text: "শেষ", tone: "past" };
    const diff = next - today;
    if (diff === 0) return { text: "আজ", tone: "today" };
    return { text: `${diff} দিন`, tone: "upcoming" };
  }

  const next = row.instants.find((t) => t >= nowMs);
  if (next === undefined) {
    const last = row.instants[row.instants.length - 1];
    if (nowMs - last < 3 * HOUR_MS) return { text: "চলছে", tone: "today" };
    return { text: "শেষ", tone: "past" };
  }
  const diff = next - nowMs;
  const days = Math.floor(diff / DAY_MS);
  const hours = Math.floor((diff % DAY_MS) / HOUR_MS);
  if (days > 0) return { text: `${days} দিন ${hours} ঘণ্টা`, tone: "upcoming" };
  if (hours > 0) return { text: `${hours} ঘণ্টা`, tone: "today" };
  return { text: "১ ঘণ্টার কম", tone: "today" };
}

export function getApplicationStatus(application, nowMs) {
  if (application.endAt != null && nowMs > application.endAt) {
    return { key: "closed", text: "আবেদন শেষ" };
  }
  if (application.confirmed && application.startAt != null && nowMs >= application.startAt) {
    return { key: "started", text: "আবেদন শুরু হয়েছে" };
  }
  return { key: "notStarted", text: "আবেদন শুরু হয়নি" };
}

// আবেদনের সময়সীমা দেখানোর লাইন — [{ label, value }]
export function getApplicationLines(application) {
  const startUnknown = isUnknownText(application.startText);
  const endUnknown = isUnknownText(application.endText);
  if (startUnknown && endUnknown && !/সম্ভাব্য/.test(application.startText)) {
    return [{ label: "", value: "শীঘ্রই জানানো হবে" }];
  }
  return [
    { label: "শুরু", value: application.startText || "শীঘ্রই জানানো হবে" },
    { label: "শেষ", value: application.endText || "শীঘ্রই জানানো হবে" },
  ];
}
