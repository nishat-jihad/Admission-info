"use client";

// layout.js বা তার ভেতরের কম্পোনেন্ট (AppBootstrap, মেনু ইত্যাদি) ভেঙে গেলে এটা দেখায়।
// এখানে সাইটের CSS/ফন্ট কিছুই লোড থাকে না, তাই শুধু সরল inline স্টাইল।
export default function GlobalError({ error, reset }) {
  try {
    const K = "admissionInfoDiag";
    const a = JSON.parse(localStorage.getItem(K) || "[]");
    a.push({ t: Date.now(), v: "err", m: "global-error: " + String((error && error.message) || error).slice(0, 250) });
    localStorage.setItem(K, JSON.stringify(a.slice(-150)));
  } catch (e) {
    /* সমস্যা নেই */
  }
  const text = String((error && (error.stack || error.message)) || error || "অজানা error").slice(0, 1500);
  return (
    <html lang="bn">
      <body style={{ padding: 16, fontFamily: "sans-serif" }}>
        <h2 style={{ fontSize: 18, margin: "0 0 8px" }}>অ্যাপ চালু হতে সমস্যা হয়েছে</h2>
        <p style={{ fontSize: 13, margin: "0 0 8px" }}>নিচের লেখাটা স্ক্রিনশট নিয়ে ডেভেলপারকে পাঠাও:</p>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 11, background: "#f3f3f3", padding: 8, maxHeight: 320, overflow: "auto" }}>
          {text}
        </pre>
        <button type="button" onClick={() => reset()} style={{ marginTop: 10, padding: "8px 14px" }}>
          আবার চেষ্টা করো
        </button>
      </body>
    </html>
  );
}
