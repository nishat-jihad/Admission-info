// Hardcoded "Updates" feed — no DB, just add new objects to the top of
// this array whenever there's new admission info to publish.
// universityId must match a key in src/data/universities.js so the
// name links straight to that university's detail page.
// `schedule` renders as a table: each row is { unit, date }.

export const updates = [
  {
    id: "du-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    date: "১০ সেপ্টেম্বর, ২০২৬",
    universityId: "du",
    universityName: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
    applicationStart: "১১ নভেম্বর",
    applicationEnd: "২৫ নভেম্বর",
    schedule: [
      { unit: "আইবিএ", date: "০৫ ডিসেম্বর" },
      { unit: "'এ' ইউনিট", date: "১২ ডিসেম্বর" },
      { unit: "'বি' ইউনিট", date: "১৯ ডিসেম্বর" },
      { unit: "চারুকলা", date: "২২ ডিসেম্বর" },
      { unit: "'সি' ইউনিট", date: "২৬ ডিসেম্বর" },
    ],
  },
  {
    id: "ru-2026-27-schedule",
    title: "২০২৬-২৭ সেশনের ভর্তি পরীক্ষার সময়সূচি প্রকাশ",
    date: "১০ সেপ্টেম্বর, ২০২৬",
    universityId: "ru",
    universityName: "রাজশাহী বিশ্ববিদ্যালয় (রাবি)",
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
    date: "১০ সেপ্টেম্বর, ২০২৬",
    universityId: "jnu",
    universityName: "জগন্নাথ বিশ্ববিদ্যালয় (জবি)",
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
    date: "১০ সেপ্টেম্বর, ২০২৬",
    universityId: "cu",
    universityName: "চট্টগ্রাম বিশ্ববিদ্যালয় (চবি)",
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
];
