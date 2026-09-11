// "একত্রে ভর্তি পরীক্ষার তারিখসমূহ" পেজের ডেটা — হোমপেজের বাটন থেকে এখানে
// আসা হয়। universityId অবশ্যই src/data/universities.js-এর key-এর সাথে মিলতে
// হবে, যাতে বিশ্ববিদ্যালয়ের নামটা /university/[slug] পেজের লিংক হিসেবে কাজ করে।
export const examDates = [
  {
    id: "du",
    universityId: "du",
    universityName: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
    applicationStart: "১১ নভেম্বর",
    applicationEnd: "২৫ নভেম্বর",
    schedule: [{ unit: "'এ' ইউনিট", date: "১২ ডিসেম্বর" }],
  },
  {
    id: "ru",
    universityId: "ru",
    universityName: "রাজশাহী বিশ্ববিদ্যালয় (রাবি)",
    applicationStart: "১২ নভেম্বর",
    applicationEnd: "২৭ নভেম্বর",
    schedule: [{ unit: "'বি' ইউনিট", date: "০৮ জানুয়ারি" }],
  },
  {
    id: "jnu",
    universityId: "jnu",
    universityName: "জগন্নাথ বিশ্ববিদ্যালয় (জবি)",
    applicationStart: "১৫ নভেম্বর",
    applicationEnd: "১০ ডিসেম্বর",
    schedule: [{ unit: "'এ' ইউনিট", date: "০১ জানুয়ারি" }],
  },
  {
    id: "cu",
    universityId: "cu",
    universityName: "চট্টগ্রাম বিশ্ববিদ্যালয় (চবি)",
    applicationStart: "১৫ নভেম্বর",
    applicationEnd: "১০ ডিসেম্বর",
    schedule: [{ unit: "'এ' ইউনিট", date: "৩০ জানুয়ারি" }],
  },
  {
    id: "bup",
    universityId: "bup",
    universityName: "বাংলাদেশ ইউনিভার্সিটি অব প্রফেশনালস (BUP)",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [{ unit: "'ডি' ইউনিট (FST)", date: "০৮ জানুয়ারি" }],
  },
];
