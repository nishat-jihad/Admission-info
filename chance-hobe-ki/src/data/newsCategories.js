// ============================================================================
// NEWS CATEGORIES — সকল নিউজ পেজের ক্যাটাগরি বার।
// ============================================================================
// "সর্বশেষ" = সব নিউজ (ফিল্টার নেই)। বাকিগুলো নিচের তালিকা অনুযায়ী ফিল্টার হয়।
// বারের ক্রম এই CATEGORIES অ্যারের ক্রমই।
//
// নতুন নিউজ যোগ করলে NEWS_CATEGORIES-এ slug দিয়ে ক্যাটাগরি বসাও (একাধিক হতে পারে)।
// slug এখানে না থাকলে শিরোনাম/ক্যাটাগরি দেখে আন্দাজে ঠিক হবে (guessCategories)।
// ============================================================================

export const ALL_CATEGORY = "সর্বশেষ";

export const CATEGORIES = [
  "পরীক্ষা",
  "ফলাফল",
  "সর্বশেষ",
  "ক্যাম্পাস",
  "সার্কুলার",
  "গুচ্ছ",
  "কৃষি গুচ্ছ",
  "ইঞ্জিনিয়ারিং",
  "ভার্সিটি",
  "মেডিকেল",
];

export const NEWS_CATEGORIES = {
  "ju-admission-2026-27-circular-1848-seats-apply-22-november": ["সার্কুলার", "ভার্সিটি", "পরীক্ষা"],
  "du-science-unit-admission-2026-27-1891-seats-12-december": ["পরীক্ষা", "ভার্সিটি", "সার্কুলার"],
  "kuet-admission-2026-27-circular-1105-seats": ["সার্কুলার", "ইঞ্জিনিয়ারিং", "ভার্সিটি"],
  "du-admission-2026-27-fee-admit-card-schedule": ["পরীক্ষা", "ভার্সিটি"],
  "ku-admission-test-rescheduled-4-5-february": ["পরীক্ষা", "ভার্সিটি"],
  "university-admission-application-from-1-january": ["পরীক্ষা", "ভার্সিটি"],
  "medical-admission-test-on-18-december": ["মেডিকেল", "পরীক্ষা"],
  "cu-tsc-construction-49-crore": ["ক্যাম্পাস", "ভার্সিটি"],
  "medical-admission-test-not-on-4-december": ["মেডিকেল", "পরীক্ষা"],
  "du-admission-test-december-schedule-unchanged": ["পরীক্ষা", "ভার্সিটি"],
  "uni-medical-admission-may-be-postponed": ["পরীক্ষা", "ভার্সিটি", "মেডিকেল"],
  "ru-admission-eligibility-lowered": ["ভার্সিটি", "পরীক্ষা"],
  "jnu-admission-eligibility-may-be-lowered": ["ভার্সিটি"],
};

// তালিকায় না থাকা নিউজের জন্য আন্দাজ (শিরোনাম + category ফিল্ডে শব্দ খুঁজে)
const GUESS_RULES = [
  ["কৃষি গুচ্ছ", /কৃষি\s*গুচ্ছ/],
  ["গুচ্ছ", /গুচ্ছ/],
  ["মেডিকেল", /মেডিকেল|ডেন্টাল/],
  ["ইঞ্জিনিয়ারিং", /ইঞ্জিনিয়ারিং|প্রকৌশল|বুয়েট|কুয়েট|রুয়েট|চুয়েট/],
  ["ফলাফল", /ফল(াফল)?\b|রেজাল্ট|মেধাতালিকা প্রকাশ/],
  ["সার্কুলার", /বিজ্ঞপ্তি|সার্কুলার/],
  ["পরীক্ষা", /পরীক্ষা/],
  ["ক্যাম্পাস", /ক্যাম্পাস|টিএসসি|হল\b/],
  ["ভার্সিটি", /বিশ্ববিদ্যালয়|ভার্সিটি|ঢাবি|জাবি|রাবি|চবি|খুবি|জবি/],
];

export function getNewsCategories(item) {
  if (NEWS_CATEGORIES[item.slug]) return NEWS_CATEGORIES[item.slug];
  const text = `${item.title} ${item.category || ""}`;
  return GUESS_RULES.filter(([, re]) => re.test(text)).map(([name]) => name);
}
