import Link from "next/link";
import "../styles/agri-calc.css";

// হোমের হিরোতে "Latest News"-এর ঠিক ওপরে হালকা rounded কার্ড।
// ডানে "Calculate" বাটন — ক্লিক করলে /agri-cluster-calculator পেজে যায়।
export default function AgriCalcCard() {
  return (
    <section className="agri-card" aria-label="কৃষি গুচ্ছ GPA Calculator">
      <span className="agri-card-badge">🔥 কৃষি গুচ্ছ ক্যান্ডিডেটদের জন্য</span>
      <div className="agri-card-left">
        <span className="agri-card-icon" aria-hidden="true">
          🌾
        </span>
        <div className="agri-card-text">
          <h2 className="agri-card-title">কৃষি গুচ্ছ GPA Calculator</h2>
          <p className="agri-card-sub">
            SSC ও HSC-র নম্বর বসাও — ২৫ + ২৫ এর মধ্যে কত পাবে আর কত কাটা যাবে দেখো।
          </p>
        </div>
      </div>
      <Link href="/agri-cluster-calculator" className="agri-card-btn">
        Calculate
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  );
}
