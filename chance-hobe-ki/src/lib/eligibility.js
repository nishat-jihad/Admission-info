import { universities } from "@/data/universities";

/**
 * Checks whether a given set of subject GPAs meets a university's
 * admission-eligibility rules. `vals` is a map of field -> GPA number,
 * using the same field keys as universities[id].fields (ssc, hsc, phy, ...).
 */
export function checkEligibility(uniId, vals) {
  const c = universities[uniId].calc;
  const combined = (vals.ssc || 0) + (vals.hsc || 0);

  if (uniId === "buet") {
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      (vals.phy || 0) >= c.minSubject &&
      (vals.chem || 0) >= c.minSubject &&
      (vals.hm || 0) >= c.minSubject
    );
  }

  if (uniId === "butex") {
    const net = (vals.hm || 0) + (vals.phy || 0) + (vals.chem || 0) + (vals.eng || 0);
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      (vals.hm || 0) >= c.minSubject &&
      (vals.phy || 0) >= c.minSubject &&
      (vals.chem || 0) >= c.minSubject &&
      (vals.eng || 0) >= c.minSubject &&
      net >= c.minNet
    );
  }

  if (uniId === "mist") {
    const net = (vals.phy || 0) + (vals.chem || 0) + (vals.math || 0) + (vals.eng || 0);
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      (vals.phy || 0) >= c.minSubject &&
      (vals.chem || 0) >= c.minSubject &&
      (vals.math || 0) >= c.minSubject &&
      (vals.eng || 0) >= c.minSubject &&
      net >= c.minNet
    );
  }

  if (uniId === "ruet") {
    const net = (vals.hm || 0) + (vals.phy || 0) + (vals.chem || 0);
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      (vals.hm || 0) >= c.minSubject &&
      (vals.phy || 0) >= c.minSubject &&
      (vals.chem || 0) >= c.minSubject &&
      net >= c.minNet
    );
  }

  if (uniId === "kuet") {
    const net = (vals.hm || 0) + (vals.phy || 0) + (vals.chem || 0) + (vals.eng || 0);
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      (vals.hm || 0) >= c.minSubject &&
      (vals.phy || 0) >= c.minSubject &&
      (vals.chem || 0) >= c.minSubject &&
      (vals.eng || 0) >= c.minSubject &&
      net >= c.minNet
    );
  }

  if (uniId === "cuet") {
    const net = (vals.hm || 0) + (vals.phy || 0) + (vals.chem || 0);
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      net >= c.minNet &&
      (vals.eng || 0) >= c.minEng
    );
  }

  if (uniId === "medical") {
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      (vals.bio || 0) >= c.minBio &&
      combined >= c.minCombined
    );
  }

  if (uniId === "afmc") {
    return (
      (vals.ssc || 0) >= c.minSsc &&
      (vals.hsc || 0) >= c.minHsc &&
      (vals.bio || 0) >= c.minBio &&
      combined >= c.minCombined
    );
  }

  // Generic path: du, jnu, ju_a, ju_d, mist, cou, ku_a, ku_b, bup, gst, krishi
  // — enforce whichever min fields this uni's calc object defines.
  let ok = true;
  if (c.minSsc !== undefined) ok = ok && (vals.ssc || 0) >= c.minSsc;
  if (c.minHsc !== undefined) ok = ok && (vals.hsc || 0) >= c.minHsc;
  if (c.minBio !== undefined) ok = ok && (vals.bio || 0) >= c.minBio;
  if (c.minHm !== undefined) ok = ok && (vals.hm || 0) >= c.minHm;
  if (c.minHmBio !== undefined) ok = ok && (vals.hmbio || 0) >= c.minHmBio;
  if (c.minPhy !== undefined) ok = ok && (vals.phy || 0) >= c.minPhy;
  if (c.minChem !== undefined) ok = ok && (vals.chem || 0) >= c.minChem;
  if (c.minEng !== undefined) ok = ok && (vals.eng || 0) >= c.minEng;
  if (c.minCombined !== undefined) ok = ok && combined >= c.minCombined;
  return ok;
}
