// Approximate reference values for the "শুধু SSC+HSC দিয়ে" quick checker.
// Verify with the official circular before relying on this for a real decision.
// requiresScience: true means the university needs separate Physics/Chemistry/
// Higher Math GPAs (subject-wise eligibility) — those are excluded from this
// general SSC+HSC-only check.
export const generalCriteria = {
  buet: { name: "BUET", minSsc: 5.0, minHsc: 5.0, minSubject: 4.0, requiresScience: true },
  butex: { name: "BUTex", minCombined: 8.0, minSubject: 3.5, requiresScience: true },
  medical: { name: "Medical", minSsc: 5.0, minHsc: 5.0, minCombined: 9.0, requiresScience: true },
  du: { name: "Dhaka University", minCombined: 7.0 },
  iut: { name: "IUT", minCombined: 8.5, minSubject: 3.5, requiresScience: true },
  mist: { name: "MIST", minCombined: 8.5 },
  jnu: { name: "Jagannath University", minCombined: 7.0 },
  cou: { name: "Comilla University", minCombined: 6.5 },
  afmc: { name: "সামরিক মেডিকেল কলেজ", minSsc: 5.0, minHsc: 5.0, minCombined: 9.0, requiresScience: true },
  ruet: { name: "RUET", minCombined: 8.0, minSubject: 3.5, requiresScience: true },
  kuet: { name: "KUET", minCombined: 8.0, minSubject: 3.5, requiresScience: true },
  cuet: { name: "CUET", minCombined: 8.0, minSubject: 3.5, requiresScience: true },
  sust: { name: "SUST", minCombined: 7.0 },
  ju: { name: "Jahangirnagar University", minCombined: 7.0 },
  ru: { name: "Rajshahi University", minCombined: 7.0 },
  cu: { name: "Chattagram University", minCombined: 7.0 },
  bup: { name: "BUP (FST)", minCombined: 7.5 },
  ku: { name: "Khulna University", minCombined: 7.0 },
};

// GST গুচ্ছ ও কৃষি গুচ্ছ ইচ্ছাকৃতভাবে এই তালিকায় নেই — এগুলোর জন্য GPA
// ক্যালকুলেটর ব্যবহার করা যায় না।
export const engineeringUniIds = ["buet", "butex", "iut", "mist", "cuet", "kuet", "ruet", "sust"];
export const medicalUniIds = ["medical", "afmc"];
