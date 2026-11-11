// Hardcoded "Updates" feed — no DB, just add new objects to the top of
// this array whenever there's new admission info to publish.
// universityId must match a key in src/data/universities.js so the
// name links straight to that university's detail page.
// `schedule` renders as a table: each row is { unit, date }.
// `category` drives the filter buttons on the updates page:
//   "versity"     -> সাধারণ বিশ্ববিদ্যালয়
//   "medical"     -> মেডিকেল
//   "engineering" -> ইঞ্জিনিয়ারিং
// An update can set `sourceImage` (path under /public) to show a
// "View exam date source" box with the notice photo inside its card.
// A schedule row can set `tentative: true` when the date is a সম্ভাব্য
// (probable, not-yet-confirmed) date — it renders in blue for attention.
// A schedule row can also set `time` — when any row has it, a "সময়" column
// is added to the table (on /updates and on the university detail page).
// An update can set `extraTables` ([{ title, headers, rows }]) for extra
// tables such as fees / admit-card dates, and `notes` (array of strings)
// for a "গুরুত্বপূর্ণ তথ্য" bullet list. Both render inside the card (UpdatesFilterList.js) and the university detail page.
// An update can set `sourcePdf` (path under /public) to show a button that
// opens the original circular PDF in a new tab.

export const updates = [
  {
    id: "cou-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "cou",
    universityName: "কুমিল্লা বিশ্ববিদ্যালয় (কুবি)",
    category: "versity",
    applicationStart: "১৫ নভেম্বর",
    applicationEnd: "১০ ডিসেম্বর",
    schedule: [
      { unit: "'এ' ইউনিট — বিজ্ঞান ও প্রকৌশল অনুষদ", date: "০৫ ফেব্রুয়ারি, সকাল ১১:০০টা" },
      { unit: "'বি' ইউনিট — কলা ও মানবিক, সামাজিক বিজ্ঞান ও আইন অনুষদ", date: "০৬ ফেব্রুয়ারি, বিকেল ৩:০০টা" },
      { unit: "'সি' ইউনিট — বিজনেস স্টাডিজ অনুষদ", date: "০৭ ফেব্রুয়ারি, সকাল ১১:০০টা" },
    ],
  },
  {
    id: "gst-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের GST গুচ্ছ ভর্তি পরীক্ষার তারিখ ঘোষণা",
    universityId: "gst",
    universityName: "GST গুচ্ছ",
    category: "versity",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "'বি' ইউনিট", date: "১৯ মার্চ" },
      { unit: "'এ' ইউনিট (বিজ্ঞান)", date: "২৭ মার্চ" },
      { unit: "'সি' ইউনিট", date: "২০ মার্চ" },
    ],
  },
  {
    id: "medical-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষার তারিখ ঘোষণা",
    universityId: "medical",
    universityName: "সরকারি মেডিকেল ও ডেন্টাল কলেজ ভর্তি পরীক্ষা",
    category: "medical",
    applicationStart: "১৫–১৮ নভেম্বরের মধ্যে (সম্ভাব্য)",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা", date: "১৮ ডিসেম্বর" },
    ],
  },
  {
    id: "du-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি, আবেদন ফি ও প্রবেশপত্র ডাউনলোডের তারিখ",
    universityId: "du",
    universityName: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
    category: "versity",
    applicationStart: "১১ নভেম্বর ২০২৬, দুপুর ১২টা",
    applicationEnd: "২৫ নভেম্বর ২০২৬",
    schedule: [
      { unit: "আইবিএ", date: "০৫ ডিসেম্বর ২০২৬, শনিবার", time: "সকাল ১০:০০টা থেকে ১২:০০টা" },
      { unit: "বিজ্ঞান ('এ' ইউনিট)", date: "১২ ডিসেম্বর ২০২৬, শনিবার", time: "সকাল ১১:০০টা থেকে ১২:৩০টা" },
      { unit: "কলা, আইন ও সামাজিক বিজ্ঞান ('বি' ইউনিট)", date: "১৯ ডিসেম্বর ২০২৬, শনিবার", time: "সকাল ১১:০০টা থেকে ১২:৩০টা" },
      { unit: "চারুকলা (সাধারণ জ্ঞান ও অঙ্কন)", date: "২২ ডিসেম্বর ২০২৬, মঙ্গলবার", time: "সকাল ১১:০০টা থেকে ১২:৩০টা" },
      { unit: "ব্যবসায় শিক্ষা ('সি' ইউনিট)", date: "২৬ ডিসেম্বর ২০২৬, শনিবার", time: "সকাল ১১:০০টা থেকে ১২:৩০টা" },
    ],
    extraTables: [
      {
        title: "আবেদন ফি",
        headers: ["ইউনিট", "ফি"],
        rows: [
          ["আইবিএ", "১৫০০ টাকা"],
          ["বিজ্ঞান", "১২০০ টাকা"],
          ["কলা, আইন ও সামাজিক বিজ্ঞান", "১২০০ টাকা"],
          ["চারুকলা", "১৪০০ টাকা"],
          ["ব্যবসায় শিক্ষা", "১২০০ টাকা"],
        ],
      },
      {
        title: "প্রবেশপত্র ডাউনলোডের সময়সূচি",
        headers: ["ইউনিট", "ডাউনলোডের তারিখ"],
        rows: [
          ["আইবিএ + বিজ্ঞান ইউনিট", "২ ডিসেম্বর ২০২৬"],
          ["কলা, আইন ও সামাজিক বিজ্ঞান + ব্যবসায় শিক্ষা + চারুকলা", "৭ ডিসেম্বর ২০২৬"],
        ],
      },
    ],
  },
  {
    id: "ru-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "ru",
    universityName: "রাজশাহী বিশ্ববিদ্যালয় (রাবি)",
    category: "versity",
    applicationStart: "১২ নভেম্বর",
    applicationEnd: "২৭ নভেম্বর",
    schedule: [
      { unit: "'বি' ইউনিট", date: "০৮ জানুয়ারি" },
      { unit: "'সি' ইউনিট", date: "০৯ জানুয়ারি" },
      { unit: "'এ' ইউনিট", date: "১৬ জানুয়ারি" },
    ],
  },
  {
    id: "jnu-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "jnu",
    universityName: "জগন্নাথ বিশ্ববিদ্যালয় (জবি)",
    category: "versity",
    applicationStart: "১৫ নভেম্বর",
    applicationEnd: "১০ ডিসেম্বর",
    schedule: [
      { unit: "'এ' ইউনিট", date: "০১ জানুয়ারি" },
      { unit: "'ই' ইউনিট", date: "০৮ জানুয়ারি" },
      { unit: "'বি' ইউনিট", date: "১৫ জানুয়ারি" },
      { unit: "'সি' ইউনিট", date: "২২ জানুয়ারি" },
      { unit: "'ডি' ইউনিট", date: "২৩ জানুয়ারি" },
    ],
  },
  {
    id: "cu-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "cu",
    universityName: "চট্টগ্রাম বিশ্ববিদ্যালয় (চবি)",
    category: "versity",
    applicationStart: "১৫ নভেম্বর",
    applicationEnd: "১০ ডিসেম্বর",
    schedule: [
      { unit: "'সি' ইউনিট", date: "২৯ জানুয়ারি" },
      { unit: "'এ' ইউনিট", date: "৩০ জানুয়ারি" },
      { unit: "'বি১' ইউনিট", date: "০৩ জানুয়ারি" },
      { unit: "'বি২' ইউনিট", date: "০৪ জানুয়ারি" },
      { unit: "'বি' ইউনিট", date: "০৫ জানুয়ারি" },
      { unit: "'ডি' ইউনিট", date: "০৬ জানুয়ারি" },
      { unit: "'ডি১' ইউনিট", date: "০৮ জানুয়ারি" },
    ],
  },
  {
    id: "bup-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "bup",
    universityName: "বাংলাদেশ ইউনিভার্সিটি অব প্রফেশনালস (BUP)",
    category: "versity",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "FBS", date: "০১ ও ০৯ জানুয়ারি" },
      { unit: "FASS", date: "০২ জানুয়ারি" },
      { unit: "'ডি' ইউনিট (FST)", date: "০৮ জানুয়ারি" },
      { unit: "FET", date: "০৮ জানুয়ারি" },
      { unit: "FMS", date: "০৮ জানুয়ারি" },
      { unit: "FSSS", date: "০৮ জানুয়ারি" },
      { unit: "পরীক্ষার কেন্দ্র", date: "BUP ক্যাম্পাস ও অন্যান্য নির্ধারিত কলেজ" },
    ],
  },
  {
    id: "ku-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার পুনর্নির্ধারিত সময়সূচি",
    universityId: "ku_a",
    universityName: "খুলনা বিশ্ববিদ্যালয় (খুবি)",
    category: "versity",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "'এ' ও 'বি' ইউনিট", date: "০৪ ফেব্রুয়ারি" },
      { unit: "'সি' ও 'ডি' ইউনিট", date: "০৫ ফেব্রুয়ারি" },
    ],
  },
  {
    id: "krishi-guccho-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের কৃষি গুচ্ছ ভর্তি পরীক্ষার তারিখ ঘোষণা",
    universityId: "krishi",
    universityName: "কৃষি গুচ্ছ",
    category: "versity",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা", date: "০২ জানুয়ারি" },
      { unit: "নেতৃত্বদানকারী বিশ্ববিদ্যালয়", date: "শেরে-বাংলা কৃষি বিশ্ববিদ্যালয় (শেকৃবি)" },
    ],
  },
  {
    id: "sust-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "sust",
    universityName: "শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (SUST)",
    category: "engineering",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা", date: "১৭ ও ১৮ জানুয়ারি" },
    ],
    sourceImage: "/images/sust-exam-date-notice.jpg",
  },
  {
    id: "mist-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "mist",
    universityName: "মিলিটারি ইনস্টিটিউট অব সায়েন্স অ্যান্ড টেকনোলজি (MIST)",
    category: "engineering",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা", date: "৫ ও ৬ ফেব্রুয়ারি" },
    ],
  },
  {
    id: "kuet-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি বিজ্ঞপ্তি প্রকাশ: আসন ১১০৫টি, পরীক্ষা ৮ জানুয়ারি",
    universityId: "kuet",
    universityName: "খুলনা প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (KUET)",
    category: "engineering",
    applicationStart: "১০ নভেম্বর ২০২৬, সকাল ১০টা",
    applicationEnd: "১০ ডিসেম্বর ২০২৬, বিকাল ৫টা",
    schedule: [
      { unit: "ভর্তি পরীক্ষা", date: "০৮ জানুয়ারি ২০২৭, শুক্রবার", time: "সকাল ৯:৩০টা থেকে দুপুর ১২:৩০টা" },
      { unit: "পরীক্ষার কেন্দ্র", date: "খুলনা, ঢাকা ও রাজশাহী", time: "—" },
    ],
    extraTables: [
      {
        title: "গুরুত্বপূর্ণ তারিখ",
        headers: ["বিষয়", "তারিখ"],
        rows: [
          ["আবেদন শুরু", "১০ নভেম্বর ২০২৬, সকাল ১০টা"],
          ["আবেদন ও ফি জমার শেষ সময়", "১০ ডিসেম্বর ২০২৬, বিকাল ৫টা"],
          ["যোগ্য প্রার্থীদের তালিকা প্রকাশ", "২০ ডিসেম্বর ২০২৬"],
          ["প্রবেশপত্র ডাউনলোড", "৫ জানুয়ারি ২০২৭"],
          ["ভর্তি পরীক্ষা", "৮ জানুয়ারি ২০২৭"],
          ["ফলাফল", "২১ জানুয়ারি ২০২৭"],
        ],
      },
      {
        title: "আবেদন ফি (সার্ভিস চার্জ ব্যতীত)",
        headers: ["পরীক্ষার কেন্দ্র", "ফি"],
        rows: [
          ["খুলনা কেন্দ্র", "১৫০০ টাকা"],
          ["ঢাকা ও রাজশাহী কেন্দ্র", "১৮০০ টাকা"],
        ],
      },
    ],
    notes: [
      "মোট আসন ১১০৫টি (সংরক্ষিত ৫ সহ), ১৭টি বিভাগে।",
      "২০২৬ সালের সিলেবাসে পরীক্ষা হবে। শুধু MCQ — ৩ ঘণ্টায় মোট ৫০০ নম্বর।",
      "HSC-তে গণিত, পদার্থবিজ্ঞান, রসায়ন ও ইংরেজি (PCME) — এই চার বিষয়ে মোট জিপিএ ন্যূনতম ১৬।",
      "সেকেন্ড টাইম নেই।",
    ],
    sourcePdf: "/docs/KUET-Admission-2026-Circular.pdf",
  },
  {
    id: "cuet-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "cuet",
    universityName: "চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (CUET)",
    category: "engineering",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "'এ' ইউনিট", date: "২৩ জানুয়ারি" },
    ],
  },
  {
    id: "ruet-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "ruet",
    universityName: "রাজশাহী প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (RUET)",
    category: "engineering",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা (সম্ভাব্য তারিখ)", date: "১৪ জানুয়ারি", tentative: true },
      { unit: "পরীক্ষার কেন্দ্র", date: "রুয়েট ও বুয়েট" },
    ],
  },
  {
    id: "hstu-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "hstu_a",
    universityName: "হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (HSTU)",
    category: "engineering",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা (A ও B ইউনিট)", date: "২৪ থেকে ২৮ জানুয়ারি" },
    ],
  },
  {
    id: "buet-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "buet",
    universityName: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (BUET)",
    category: "engineering",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা", date: "১৬ জানুয়ারি" },
    ],
  },
  {
    id: "butex-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    universityId: "butex",
    universityName: "বাংলাদেশ টেক্সটাইল বিশ্ববিদ্যালয় (BUTex)",
    category: "engineering",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [
      { unit: "ভর্তি পরীক্ষা", date: "২৯ জানুয়ারি" },
    ],
  },
];
