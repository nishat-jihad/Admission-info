// "একত্রে ভর্তি পরীক্ষার তারিখসমূহ" পেজের ডেটা — হোমপেজের বাটন থেকে এখানে
// আসা হয়। universityId অবশ্যই src/data/universities.js-এর key-এর সাথে মিলতে
// হবে, যাতে বিশ্ববিদ্যালয়ের নামটা /university/[slug] পেজের লিংক হিসেবে কাজ করে।
// তারিখ ফরম্যাট: দিন ইংরেজি সংখ্যায় + মাস বাংলায় (যেমন "11 ডিসেম্বর")।
// ইউনিটের নাম ইংরেজি অক্ষরে।
export const examDates = [
  {
    id: "du",
    universityId: "du",
    universityName: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
    shortName: "DU",
    applicationStart: "11 নভেম্বর",
    applicationEnd: "25 নভেম্বর",
    schedule: [{ unit: "A", date: "12 ডিসেম্বর" }],
  },
  {
    id: "ru",
    universityId: "ru",
    universityName: "রাজশাহী বিশ্ববিদ্যালয় (রাবি)",
    shortName: "RU",
    applicationStart: "12 নভেম্বর",
    applicationEnd: "27 নভেম্বর",
    schedule: [{ unit: "B", date: "8 জানুয়ারি" }],
  },
  {
    id: "jnu",
    universityId: "jnu",
    universityName: "জগন্নাথ বিশ্ববিদ্যালয় (জবি)",
    shortName: "JnU",
    applicationStart: "15 নভেম্বর",
    applicationEnd: "10 ডিসেম্বর",
    schedule: [{ unit: "A", date: "1 জানুয়ারি" }],
  },
  {
    id: "cu",
    universityId: "cu",
    universityName: "চট্টগ্রাম বিশ্ববিদ্যালয় (চবি)",
    shortName: "CU",
    applicationStart: "15 নভেম্বর",
    applicationEnd: "10 ডিসেম্বর",
    schedule: [{ unit: "A", date: "30 জানুয়ারি" }],
  },
  {
    id: "bup",
    universityId: "bup",
    universityName: "বাংলাদেশ ইউনিভার্সিটি অব প্রফেশনালস (BUP)",
    shortName: "BUP",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [{ unit: "D (FST)", date: "8 জানুয়ারি" }],
  },
];
