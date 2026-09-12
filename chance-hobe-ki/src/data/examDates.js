// "একত্রে ভর্তি পরীক্ষার তারিখসমূহ" পেজের ডেটা — হোমপেজের বাটন থেকে এখানে
// আসা হয়। universityId অবশ্যই src/data/universities.js-এর key-এর সাথে মিলতে
// হবে, যাতে বিশ্ববিদ্যালয়ের নামটা /university/[slug] পেজের লিংক হিসেবে কাজ করে।
// তারিখ ফরম্যাট: dd/mm (বছর ছাড়া, ইংরেজি সংখ্যায়)। ইউনিটের নাম ইংরেজি অক্ষরে।
export const examDates = [
  {
    id: "du",
    universityId: "du",
    universityName: "ঢাকা বিশ্ববিদ্যালয় (ঢাবি)",
    shortName: "DU",
    applicationStart: "11/11",
    applicationEnd: "25/11",
    schedule: [{ unit: "A", date: "12/12" }],
  },
  {
    id: "ru",
    universityId: "ru",
    universityName: "রাজশাহী বিশ্ববিদ্যালয় (রাবি)",
    shortName: "RU",
    applicationStart: "12/11",
    applicationEnd: "27/11",
    schedule: [{ unit: "B", date: "08/01" }],
  },
  {
    id: "jnu",
    universityId: "jnu",
    universityName: "জগন্নাথ বিশ্ববিদ্যালয় (জবি)",
    shortName: "JnU",
    applicationStart: "15/11",
    applicationEnd: "10/12",
    schedule: [{ unit: "A", date: "01/01" }],
  },
  {
    id: "cu",
    universityId: "cu",
    universityName: "চট্টগ্রাম বিশ্ববিদ্যালয় (চবি)",
    shortName: "CU",
    applicationStart: "15/11",
    applicationEnd: "10/12",
    schedule: [{ unit: "A", date: "30/01" }],
  },
  {
    id: "bup",
    universityId: "bup",
    universityName: "বাংলাদেশ ইউনিভার্সিটি অব প্রফেশনালস (BUP)",
    shortName: "BUP",
    applicationStart: "শীঘ্রই জানানো হবে",
    applicationEnd: "শীঘ্রই জানানো হবে",
    schedule: [{ unit: "D (FST)", date: "08/01" }],
  },
];
