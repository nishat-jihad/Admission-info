// Approximate reference values for the "শুধু SSC+HSC দিয়ে" quick checker.
// Verify with the official circular before relying on this for a real decision.
// requiresScience: true means the university needs separate Physics/Chemistry/
// Higher Math (or other subject-specific) GPA — those are excluded from this
// general SSC+HSC-only check.
//
// Object keys match the university's actual slug in `universities.js`, so the
// general-check page can link each result straight to its detail page.
export const generalCriteria = {
  buet: { name: "BUET", requiresScience: true },
  butex: { name: "BUTex", requiresScience: true },
  medical: { name: "Medical", requiresScience: true },
  afmc: { name: "সামরিক মেডিকেল কলেজ", requiresScience: true },
  ruet: { name: "RUET", requiresScience: true },
  kuet: { name: "KUET", requiresScience: true },
  cuet: { name: "CUET", requiresScience: true },
  iut: { name: "IUT", requiresScience: true },
  mist: { name: "MIST", requiresScience: true },
  sust: { name: "SUST", requiresScience: true },

  bup: { name: "BUP (FST)", minSsc: 3.5, minHsc: 3.5, minCombined: 9.0 },
  du: { name: "Dhaka University", minSsc: 3.5, minHsc: 3.5, minCombined: 8.0 },
  jnu: { name: "Jagannath University", minSsc: 3.25, minHsc: 3.25, minCombined: 7.5 },
  cou: { name: "Comilla University", minSsc: 3.0, minHsc: 3.0, minCombined: 7.0 },
  ju_a: { name: "JU (A Unit)", minSsc: 4.0, minHsc: 4.0, minCombined: 8.5 },
  ju_d: { name: "JU (D Unit)", minSsc: 4.0, minHsc: 4.0, minCombined: 9.0 },
  ru: { name: "RU (C Unit)", minSsc: 3.5, minHsc: 3.5, minCombined: 8.0 },
  cu: { name: "CU (A Unit)", minSsc: 4.0, minHsc: 3.0, minCombined: 8.0 },
  ku_a: { name: "KU (A Unit)", minSsc: 3.0, minHsc: 3.0, minCombined: 8.0 },
  ku_b: { name: "KU (B Unit)", minSsc: 3.0, minHsc: 3.0, minCombined: 8.0 },
  gst: { name: "GST গুচ্ছ", minSsc: 3.25, minHsc: 3.25, minCombined: 7.0 },
  krishi: { name: "কৃষি গুচ্ছ", minSsc: 4.0, minHsc: 4.0, minCombined: 8.5 },
  hstu_a: { name: "HSTU (A Unit)", minSsc: 3.5, minHsc: 3.5, minCombined: 7.5 },
  hstu_b: { name: "HSTU (B Unit)", minSsc: 3.5, minHsc: 3.5, minCombined: 7.5 },
};

// GST গুচ্ছ ও কৃষি গুচ্ছ — এদেরও SSC+HSC ভিত্তিক সাধারণ যোগ্যতা শর্ত থাকায়
// এই তালিকায় যুক্ত করা হয়েছে; পরীক্ষার বিষয়ভিত্তিক জটিলতা এখানে প্রযোজ্য না,
// কারণ এই checker শুধু ভর্তির ন্যূনতম GPA যোগ্যতা যাচাই করে, পরীক্ষার প্রশ্নবিন্যাস না।
export const engineeringUniIds = ["buet", "butex", "iut", "mist", "cuet", "kuet", "ruet", "sust"];
export const medicalUniIds = ["medical", "afmc"];
