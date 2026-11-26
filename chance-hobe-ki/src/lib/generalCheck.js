import { universities } from "@/data/universities";
import { checkEligibility } from "@/lib/eligibility";
import { engineeringUniIds, medicalUniIds } from "@/data/generalCriteria";

/**
 * General Check পেজের লজিক।
 * প্রতিটি ভার্সিটির আসল শর্ত আসে universities[id].calc থেকে (checkEligibility দিয়ে),
 * কোনো আলাদা কপি রাখা হয়নি — তাই ভার্সিটির পেজ আর এই পেজ সবসময় একই শর্ত দেখাবে।
 *
 * ফলাফল তিন রকম:
 *   "yes"     — দেওয়া GPA দিয়ে নিশ্চিতভাবে আবেদন করা যাবে
 *   "no"      — যে বিষয়ের GPA খালি আছে সেগুলোতে ৫.০০ ধরলেও যোগ্যতা পূরণ হয় না
 *   "unknown" — বিষয়ভিত্তিক GPA না দিলে বলা সম্ভব না
 *
 * সব শর্তই "GPA যত বেশি তত ভালো" ধরনের, তাই খালি ঘর ০ ধরলে (সবচেয়ে খারাপ) পাস করলে
 * নিশ্চিত "yes", আর ৫ ধরলে (সবচেয়ে ভালো) ফেল করলে নিশ্চিত "no"; মাঝখানে "unknown"।
 */

// CU-এর শর্ত: উচ্চতর গণিত/জীববিজ্ঞানের যেকোনো একটিতে ন্যূনতম ৩.৫০ (ভার্সিটির eligibilityText অনুযায়ী)
const EXTRA_RULES = {
  cu: (v) => Math.max(v.hm || 0, v.bio || 0) >= 3.5,
};

// মেডিকেল কলাম: শুধু MBBS আর AFMC
const DISPLAY_NAMES = {
  medical: "MBBS",
  afmc: "AFMC",
};

const SUBJECT_KEYS = ["phy", "chem", "hm", "bio", "eng"];

function evaluate(id, vals) {
  const pess = { ...vals };
  const opt = { ...vals };
  SUBJECT_KEYS.forEach((k) => {
    if (vals[k] === undefined) {
      pess[k] = 0;
      opt[k] = 5;
    }
  });
  // MIST-এর ক্যালকুলেটর "math" কী ব্যবহার করে — এটাও HSC-র গণিত (উচ্চতর গণিত)
  pess.math = pess.hm;
  opt.math = opt.hm;

  const extra = EXTRA_RULES[id];
  const passWith = (v) => checkEligibility(id, v) && (!extra || extra(v));

  if (passWith(pess)) return "yes";
  if (!passWith(opt)) return "no";
  return "unknown";
}

export function runGeneralCheck({ ssc, hsc, subjects }) {
  const vals = { ssc, hsc };
  Object.entries(subjects).forEach(([k, v]) => {
    if (v !== undefined && !isNaN(v)) vals[k] = v;
  });

  const build = (ids) =>
    ids
      .filter((id) => universities[id])
      .map((id) => ({
        id,
        name: DISPLAY_NAMES[id] || universities[id].name,
        status: evaluate(id, vals),
      }));

  const engineering = build(engineeringUniIds);
  const medical = build(medicalUniIds);
  const versity = build(
    Object.keys(universities).filter(
      (id) => !engineeringUniIds.includes(id) && !medicalUniIds.includes(id)
    )
  );

  const all = [...versity, ...engineering, ...medical];
  return {
    versity,
    engineering,
    medical,
    yesCount: all.filter((u) => u.status === "yes").length,
    noCount: all.filter((u) => u.status === "no").length,
    unknownCount: all.filter((u) => u.status === "unknown").length,
  };
}
